-- Comunidade: comentários, respostas e relatos associados a materiais publicados.
-- Aplicar após 202611110007_review_moderation.sql.
-- Todas as escritas passam por funções SECURITY DEFINER que validam auth.uid().
begin;

alter table public.discussion_comments
 add column report_grade text,
 add column report_adaptations text;

-- Compatibilidade caso a base já contenha relatos de teste antigos.
update public.discussion_comments
 set report_grade='Ano não informado',report_adaptations=''
 where kind='application_report' and report_grade is null;

create index if not exists community_visible_roots
 on public.discussion_comments(material_id,kind,created_at desc,id desc)
 where parent_id is null and visibility='visible';
create index if not exists community_visible_replies
 on public.discussion_comments(parent_id,created_at asc,id asc)
 where parent_id is not null and visibility='visible';
create index if not exists community_author_recent
 on public.discussion_comments(author_id,created_at desc);

create function public.create_community_comment(
 p_material_id uuid,p_body text,p_kind text default 'discussion',
 p_parent_id uuid default null,p_grade text default null,p_adaptations text default null
) returns uuid language plpgsql security definer set search_path='' as $$
declare parent public.discussion_comments; new_id uuid;
begin
 if auth.uid() is null then raise exception 'Login required' using errcode='42501'; end if;
 if length(btrim(coalesce(p_body,''))) not between 1 and 1000 then
  raise exception 'Comment must have 1 to 1000 characters';
 end if;
 if p_kind not in ('discussion','application_report') or p_kind is null then
  raise exception 'Invalid comment type';
 end if;
 -- Evita incluir comentários durante uma despublicação concorrente.
 perform 1 from public.materials m where m.id=p_material_id
  and m.review_status='approved' and m.is_published for share;
 if not found then raise exception 'Material not published' using errcode='42501'; end if;
 if p_parent_id is not null then
  if p_kind<>'discussion' or p_grade is not null or p_adaptations is not null then
   raise exception 'Replies must be simple text';
  end if;
  select * into parent from public.discussion_comments where id=p_parent_id for share;
  if not found or parent.material_id<>p_material_id or parent.parent_id is not null
   or parent.visibility<>'visible' then
   raise exception 'Invalid parent comment';
  end if;
 elsif p_kind='application_report' then
  if length(btrim(coalesce(p_grade,''))) not between 1 and 80 or
   length(coalesce(p_adaptations,''))>1000 then
   raise exception 'Application report requires a grade (max 80 characters)';
  end if;
 elsif p_grade is not null or p_adaptations is not null then
  raise exception 'Discussion cannot have application report fields';
 end if;
 -- Limite simples por usuário, inclusive respostas (não impede criação de conta).
 if (select count(*) from public.discussion_comments
     where author_id=auth.uid() and created_at>now()-interval '1 hour') >= 12 then
  raise exception 'Hourly comment limit reached' using errcode='P0001';
 end if;
 insert into public.discussion_comments(material_id,author_id,parent_id,kind,body,report_grade,report_adaptations)
 values(p_material_id,auth.uid(),p_parent_id,p_kind,btrim(p_body),
  case when p_kind='application_report' then btrim(p_grade) else null end,
  case when p_kind='application_report' then btrim(coalesce(p_adaptations,'')) else null end)
 returning id into new_id;
 return new_id;
end;
$$;
revoke all on function public.create_community_comment(uuid,text,text,uuid,text,text) from public;
grant execute on function public.create_community_comment(uuid,text,text,uuid,text,text) to authenticated;

create function public.edit_community_comment(
 p_id uuid,p_body text,p_grade text default null,p_adaptations text default null
) returns void language plpgsql security definer set search_path='' as $$
declare c public.discussion_comments;
begin
 if auth.uid() is null then raise exception 'Login required' using errcode='42501'; end if;
 select * into c from public.discussion_comments where id=p_id for update;
 if not found or c.author_id<>auth.uid() or c.visibility<>'visible' then
  raise exception 'Comment cannot be edited' using errcode='42501';
 end if;
 if not exists(select 1 from public.materials m where m.id=c.material_id
     and m.review_status='approved' and m.is_published) then
  raise exception 'Material not published' using errcode='42501';
 end if;
 if length(btrim(coalesce(p_body,''))) not between 1 and 1000 then
  raise exception 'Comment must have 1 to 1000 characters';
 end if;
 if c.kind='application_report' then
  if length(btrim(coalesce(p_grade,''))) not between 1 and 80 or
   length(coalesce(p_adaptations,''))>1000 then
   raise exception 'Invalid application report';
  end if;
 elsif p_grade is not null or p_adaptations is not null then
  raise exception 'Discussion cannot have application report fields';
 end if;
 update public.discussion_comments
 set body=btrim(p_body),report_grade=case when c.kind='application_report' then btrim(p_grade) else null end,
 report_adaptations=case when c.kind='application_report' then btrim(coalesce(p_adaptations,'')) else null end,
 updated_at=now() where id=p_id;
end;
$$;
revoke all on function public.edit_community_comment(uuid,text,text,text) from public;
grant execute on function public.edit_community_comment(uuid,text,text,text) to authenticated;

-- Exclusão do próprio comentário preserva a referência e oculta respostas.
-- Exclusão feita pela moderação permanece exclusiva de moderate_report().
create function public.delete_community_comment(p_id uuid)
returns void language plpgsql security definer set search_path='' as $$
declare c public.discussion_comments;
begin
 if auth.uid() is null then raise exception 'Login required' using errcode='42501'; end if;
 select * into c from public.discussion_comments where id=p_id for update;
 if not found or c.author_id<>auth.uid() or c.visibility<>'visible' then
  raise exception 'Comment cannot be deleted' using errcode='42501';
 end if;
 update public.discussion_comments
 set visibility='deleted',body='[Comentário excluído pelo autor]',
  report_grade=null,report_adaptations=null,updated_at=now() where id=p_id;
 -- Respostas não ficam soltas em uma conversa excluída.
 if c.parent_id is null then
  update public.discussion_comments
   set visibility='hidden',hidden_by_parent=true,updated_at=now()
   where parent_id=p_id and visibility='visible';
 end if;
end;
$$;
-- A restrição de metadados dos relatos exige manter grade enquanto o relato
-- existir. Relaxa apenas para registros excluídos, sem reexpor conteúdo.
alter table public.discussion_comments add constraint discussion_metadata_valid check (
 visibility='deleted' or
 (kind='discussion' and report_grade is null and report_adaptations is null)
 or (kind='application_report' and parent_id is null and
  length(btrim(coalesce(report_grade,''))) between 1 and 80 and
  length(coalesce(report_adaptations,''))<=1000)
);
revoke all on function public.delete_community_comment(uuid) from public;
grant execute on function public.delete_community_comment(uuid) to authenticated;

-- A migration 007 também pode excluir definitivamente um relato através de
-- moderate_report(). Este gatilho apaga os metadados textuais adicionais
-- junto do corpo, inclusive se a exclusão ocorrer pela moderação.
create function public.scrub_deleted_community_metadata()
returns trigger language plpgsql set search_path='' as $$
begin
 if new.visibility='deleted' then
  new.report_grade=null;
  new.report_adaptations=null;
 end if;
 return new;
end;
$$;
revoke all on function public.scrub_deleted_community_metadata() from public;
create trigger scrub_community_metadata_before_delete
 before update of visibility on public.discussion_comments
 for each row when (new.visibility='deleted')
 execute function public.scrub_deleted_community_metadata();
commit;
