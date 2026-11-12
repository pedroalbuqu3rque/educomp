-- Painel editorial e base de denúncias da comunidade.
-- Aplicar após 202611110006_material_submissions.sql.
-- Não cria revisores nem dados fictícios. O bucket materials continua privado.
begin;

-- É a única informação sobre privilégios disponibilizada à interface.
create function public.is_reviewer() returns boolean
language sql stable security definer set search_path = '' as $$
 select private.is_reviewer();
$$;
revoke all on function public.is_reviewer() from public;
grant execute on function public.is_reviewer() to authenticated;

-- Os eventos de revisão existentes e os controles de material permanecem
-- exclusivamente no procedimento public.review_material (migration 001).
create index if not exists materials_review_queue
 on public.materials(review_status,created_at desc,id desc) where review_status <> 'draft';
create index if not exists review_events_material_history
 on public.review_events(material_id,created_at desc,id desc);

-- Base para a moderação de discussões. A publicação de comentários pelo
-- professor será ativada ao implementar a comunidade (etapa separada).
create table public.discussion_comments (
 id uuid primary key default gen_random_uuid(),
 material_id uuid not null references public.materials(id) on delete cascade,
 author_id uuid not null default auth.uid() references auth.users(id),
 parent_id uuid references public.discussion_comments(id),
 kind text not null default 'discussion' check(kind in ('discussion','application_report')),
 body text not null check(length(btrim(body)) between 1 and 1000),
 visibility text not null default 'visible' check(visibility in ('visible','hidden','deleted')),
 hidden_by_parent boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 check(parent_id is distinct from id),
 check(not hidden_by_parent or visibility='hidden')
);
create index discussion_comments_material on public.discussion_comments(material_id,created_at desc);
create index discussion_comments_parent on public.discussion_comments(parent_id) where parent_id is not null;

create table public.comment_reports (
 id uuid primary key default gen_random_uuid(),
 comment_id uuid not null references public.discussion_comments(id) on delete cascade,
 reporter_id uuid not null references auth.users(id),
 reason text not null check(reason in ('personal_data','harassment','spam')),
 details text not null default '' check(length(details)<=1000),
 status text not null default 'pending' check(status in ('pending','in_review','resolved')),
 outcome text check(outcome in ('dismissed','hidden','restored','deleted')),
 created_at timestamptz not null default now(),
 resolved_at timestamptz,
 unique(comment_id,reporter_id),
 check((status='resolved') = (outcome is not null))
);
create index comment_reports_queue on public.comment_reports(status,created_at desc,id desc);

create table public.moderation_events (
 id bigint generated always as identity primary key,
 report_id uuid not null references public.comment_reports(id),
 comment_id uuid not null references public.discussion_comments(id),
 reviewer_id uuid not null references auth.users(id),
 action text not null check(action in ('start','dismiss','hide','restore','delete')),
 reason text,
 created_at timestamptz not null default now()
);
create index moderation_events_report_history on public.moderation_events(report_id,created_at desc,id desc);

alter table public.discussion_comments enable row level security;
alter table public.comment_reports enable row level security;
alter table public.moderation_events enable row level security;
revoke all on public.discussion_comments,public.comment_reports,public.moderation_events from anon,authenticated;
grant select on public.discussion_comments to anon,authenticated;
grant select on public.comment_reports,public.moderation_events to authenticated;

create policy comments_read on public.discussion_comments for select using (
 private.is_reviewer() or author_id=auth.uid() or (
  visibility='visible' and exists (
   select 1 from public.materials m where m.id=material_id
    and m.review_status='approved' and m.is_published
  )
 )
);
create policy reports_read on public.comment_reports for select to authenticated
 using(private.is_reviewer() or reporter_id=auth.uid());
create policy moderation_events_read on public.moderation_events for select to authenticated
 using(private.is_reviewer());

-- Denunciar não muda a visibilidade do comentário. Limite por conta,
-- impedimento de autodenúncia e unicidade por comentário.
create function public.report_comment(p_comment_id uuid,p_reason text,p_details text default '')
returns uuid language plpgsql security definer set search_path='' as $$
declare c public.discussion_comments; report_id uuid;
begin
 if auth.uid() is null then raise exception 'Login required' using errcode='42501'; end if;
 if p_reason not in ('personal_data','harassment','spam') or length(coalesce(p_details,''))>1000
 then raise exception 'Invalid report'; end if;
 select * into c from public.discussion_comments where id=p_comment_id;
 if not found or c.visibility<>'visible' or c.author_id=auth.uid() or not exists(
  select 1 from public.materials m where m.id=c.material_id and m.is_published and m.review_status='approved'
 ) then raise exception 'Comment not reportable' using errcode='42501'; end if;
 if (select count(*) from public.comment_reports where reporter_id=auth.uid() and created_at>now()-interval '1 hour') >= 5
 then raise exception 'Too many reports'; end if;
 insert into public.comment_reports(comment_id,reporter_id,reason,details)
 values(p_comment_id,auth.uid(),p_reason,coalesce(p_details,'')) returning id into report_id;
 return report_id;
end;
$$;
revoke all on function public.report_comment(uuid,text,text) from public;
grant execute on function public.report_comment(uuid,text,text) to authenticated;

-- A transição editorial é atômica, bloqueia disputas sobre o mesmo relato
-- e registra cada ação. Excluir elimina o texto original sem permitir restauração.
create function public.moderate_report(p_id uuid,p_action text,p_reason text default null)
returns void language plpgsql security definer set search_path='' as $$
declare r public.comment_reports; c public.discussion_comments; motive text;
begin
 if not private.is_reviewer() then raise exception 'Reviewer required' using errcode='42501'; end if;
 select * into r from public.comment_reports where id=p_id for update;
 if not found then raise exception 'Report not found'; end if;
 select * into c from public.discussion_comments where id=r.comment_id for update;
 if not found then raise exception 'Comment not found'; end if;
 motive:=nullif(btrim(coalesce(p_reason,'')),'');
 if p_action='start' and r.status='pending' then
  update public.comment_reports set status='in_review' where id=p_id;
 elsif (
   (r.status='in_review' and p_action in ('dismiss','hide','restore','delete'))
   or (r.status='resolved' and r.outcome='hidden' and p_action in ('restore','delete'))
   or (r.status='resolved' and r.outcome='restored' and p_action in ('hide','delete'))
  ) and motive is not null and length(motive) between 10 and 1000 then
  if p_action='hide' and c.visibility='visible' then
   update public.discussion_comments set visibility='hidden',updated_at=now() where id=c.id;
   update public.discussion_comments set visibility='hidden',hidden_by_parent=true,updated_at=now()
    where parent_id=c.id and visibility='visible';
  elsif p_action='restore' and c.visibility='hidden' and not c.hidden_by_parent then
   update public.discussion_comments set visibility='visible',updated_at=now() where id=c.id;
   update public.discussion_comments set visibility='visible',hidden_by_parent=false,updated_at=now()
    where parent_id=c.id and hidden_by_parent;
  elsif p_action='delete' and c.visibility<>'deleted' then
   update public.discussion_comments
    set visibility='deleted',body='[Conteúdo excluído pela moderação]',updated_at=now(),hidden_by_parent=false
    where id=c.id;
   update public.discussion_comments set visibility='hidden',hidden_by_parent=true,updated_at=now()
    where parent_id=c.id and visibility='visible';
  elsif p_action<>'dismiss' then
   raise exception 'Invalid comment transition';
  end if;
  update public.comment_reports set status='resolved',outcome=case p_action
   when 'dismiss' then 'dismissed' when 'hide' then 'hidden'
   when 'restore' then 'restored' else 'deleted' end,resolved_at=now() where id=p_id;
 else
  raise exception 'Invalid transition or reason (10 to 1000 characters)';
 end if;
 insert into public.moderation_events(report_id,comment_id,reviewer_id,action,reason)
 values(p_id,c.id,auth.uid(),p_action,motive);
end;
$$;
revoke all on function public.moderate_report(uuid,text,text) from public;
grant execute on function public.moderate_report(uuid,text,text) to authenticated;
commit;
