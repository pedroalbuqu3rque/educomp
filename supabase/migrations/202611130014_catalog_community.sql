-- Conversas nos materiais do acervo inicial.
-- Aplicar depois de 202611130013_catalog_editorial.sql; preserva discussões existentes.
-- A comunidade usa as mesmas regras de autoria, denúncia e moderação dos envios docentes.
begin;

-- Até agora os comentários só podiam apontar para public.materials.
-- Cada contribuição deve pertencer exatamente a um dos dois acervos.
alter table public.discussion_comments
  alter column material_id drop not null,
  add column catalog_example_id uuid references public.catalog_examples(id) on delete cascade;
alter table public.discussion_comments
  add constraint discussion_comments_one_target check (
    (material_id is not null) <> (catalog_example_id is not null)
  );
create index community_catalog_visible_roots
  on public.discussion_comments(catalog_example_id,kind,created_at desc,id desc)
  where catalog_example_id is not null and parent_id is null and visibility='visible';

-- A visualização pública continua restrita a materiais publicados ou fichas ativas.
drop policy comments_read on public.discussion_comments;
create policy comments_read on public.discussion_comments for select using (
 private.is_reviewer() or author_id=auth.uid() or (
  visibility='visible' and (
    (material_id is not null and exists (
      select 1 from public.materials m where m.id=material_id
      and m.review_status='approved' and m.is_published
    )) or
    (catalog_example_id is not null and exists (
      select 1 from public.catalog_examples e
      where e.id=catalog_example_id and e.is_active
    ))
  )
 )
);

-- Endpoint exclusivo para o acervo institucional; não admite IDs arbitrários
-- e não concede inserção direta à tabela de comentários.
create function public.create_catalog_comment(
 p_catalog_example_id uuid,p_body text,p_kind text default 'discussion',
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
 perform 1 from public.catalog_examples where id=p_catalog_example_id and is_active for share;
 if not found then raise exception 'Material not available' using errcode='42501'; end if;
 if p_parent_id is not null then
  if p_kind<>'discussion' or p_grade is not null or p_adaptations is not null then
   raise exception 'Replies must be simple text';
  end if;
  select * into parent from public.discussion_comments where id=p_parent_id for share;
  if not found or parent.catalog_example_id is distinct from p_catalog_example_id
    or parent.material_id is not null or parent.parent_id is not null
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
 if (select count(*) from public.discussion_comments
     where author_id=auth.uid() and created_at>now()-interval '1 hour') >= 12 then
  raise exception 'Hourly comment limit reached' using errcode='P0001';
 end if;
 insert into public.discussion_comments(
   material_id,catalog_example_id,author_id,parent_id,kind,body,report_grade,report_adaptations
 ) values (
   null,p_catalog_example_id,auth.uid(),p_parent_id,p_kind,btrim(p_body),
   case when p_kind='application_report' then btrim(p_grade) else null end,
   case when p_kind='application_report' then btrim(coalesce(p_adaptations,'')) else null end
 ) returning id into new_id;
 return new_id;
end;
$$;
revoke all on function public.create_catalog_comment(uuid,text,text,uuid,text,text) from public;
grant execute on function public.create_catalog_comment(uuid,text,text,uuid,text,text) to authenticated;

-- Mantém a rotina de envio docente, mas impede respostas cruzadas entre
-- comentários do acervo e comentários de materiais enviados por usuários.
create or replace function public.create_community_comment(
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
 perform 1 from public.materials m where m.id=p_material_id
  and m.review_status='approved' and m.is_published for share;
 if not found then raise exception 'Material not published' using errcode='42501'; end if;
 if p_parent_id is not null then
  if p_kind<>'discussion' or p_grade is not null or p_adaptations is not null then
   raise exception 'Replies must be simple text';
  end if;
  select * into parent from public.discussion_comments where id=p_parent_id for share;
  if not found or parent.material_id is distinct from p_material_id
    or parent.catalog_example_id is not null or parent.parent_id is not null
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
 if (select count(*) from public.discussion_comments
     where author_id=auth.uid() and created_at>now()-interval '1 hour') >= 12 then
  raise exception 'Hourly comment limit reached' using errcode='P0001';
 end if;
 insert into public.discussion_comments(material_id,catalog_example_id,author_id,parent_id,kind,body,report_grade,report_adaptations)
 values(p_material_id,null,auth.uid(),p_parent_id,p_kind,btrim(p_body),
  case when p_kind='application_report' then btrim(p_grade) else null end,
  case when p_kind='application_report' then btrim(coalesce(p_adaptations,'')) else null end)
 returning id into new_id;
 return new_id;
end;
$$;

-- Edição permanece exclusiva do autor e depende de ficha ainda pública.
create or replace function public.edit_community_comment(
 p_id uuid,p_body text,p_grade text default null,p_adaptations text default null
) returns void language plpgsql security definer set search_path='' as $$
declare c public.discussion_comments;
begin
 if auth.uid() is null then raise exception 'Login required' using errcode='42501'; end if;
 select * into c from public.discussion_comments where id=p_id for update;
 if not found or c.author_id<>auth.uid() or c.visibility<>'visible' then
  raise exception 'Comment cannot be edited' using errcode='42501';
 end if;
 if not (
    (c.material_id is not null and exists (
      select 1 from public.materials m where m.id=c.material_id
       and m.review_status='approved' and m.is_published
    )) or
    (c.catalog_example_id is not null and exists (
      select 1 from public.catalog_examples e
      where e.id=c.catalog_example_id and e.is_active
    ))
 ) then raise exception 'Material not available' using errcode='42501'; end if;
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

-- Denúncias do acervo entram na mesma fila editorial de denúncias já existente.
create or replace function public.report_comment(p_comment_id uuid,p_reason text,p_details text default '')
returns uuid language plpgsql security definer set search_path='' as $$
declare c public.discussion_comments; report_id uuid;
begin
 if auth.uid() is null then raise exception 'Login required' using errcode='42501'; end if;
 if p_reason not in ('personal_data','harassment','spam') or length(coalesce(p_details,''))>1000
 then raise exception 'Invalid report'; end if;
 select * into c from public.discussion_comments where id=p_comment_id;
 if not found or c.visibility<>'visible' or c.author_id=auth.uid() or not (
   (c.material_id is not null and exists(
     select 1 from public.materials m where m.id=c.material_id
     and m.is_published and m.review_status='approved'
   )) or
   (c.catalog_example_id is not null and exists(
     select 1 from public.catalog_examples e where e.id=c.catalog_example_id and e.is_active
   ))
 ) then raise exception 'Comment not reportable' using errcode='42501'; end if;
 if (select count(*) from public.comment_reports
     where reporter_id=auth.uid() and created_at>now()-interval '1 hour') >= 5
 then raise exception 'Too many reports'; end if;
 insert into public.comment_reports(comment_id,reporter_id,reason,details)
 values(p_comment_id,auth.uid(),p_reason,coalesce(p_details,'')) returning id into report_id;
 return report_id;
end;
$$;

-- Respostas aos materiais do acervo geram notificação para o autor do comentário.
-- A ficha não possui user_id do responsável editorial, então comentários-raiz
-- não geram aviso dirigido a uma identidade inventada.
create or replace function private.notify_community_comment() returns trigger
language plpgsql security definer set search_path='' as $$
declare recipient uuid; target_id uuid;
begin
 target_id:=coalesce(new.material_id,new.catalog_example_id);
 if new.parent_id is not null then
  select author_id into recipient from public.discussion_comments where id=new.parent_id;
  if recipient is distinct from new.author_id then
   perform private.push_notification(recipient,'reply:'||new.id::text,'comment_reply',
    'Nova resposta ao seu comentário','Um professor respondeu à sua contribuição.',
    '/materiais/'||target_id::text||'?contribuicoes=discussion#comunidade');
  end if;
 elsif new.material_id is not null then
  select submitted_by into recipient from public.materials where id=new.material_id;
  if recipient is distinct from new.author_id then
   perform private.push_notification(recipient,'comment:'||new.id::text,'material_comment',
    case when new.kind='application_report' then 'Novo relato de aplicação' else 'Novo comentário no seu material' end,
    'Um professor compartilhou uma contribuição sobre seu recurso.',
    '/materiais/'||target_id::text||'?contribuicoes=all#comunidade');
  end if;
 end if;
 return new;
end;
$$;

-- A moderação usa o mesmo caminho de retorno para os dois tipos de material.
create or replace function private.notify_moderation_event() returns trigger
language plpgsql security definer set search_path='' as $$
declare reporter uuid; author uuid; target_id uuid; outcome_text text;
begin
 if new.action='start' then return new; end if;
 select r.reporter_id,c.author_id,coalesce(c.material_id,c.catalog_example_id)
  into reporter,author,target_id
 from public.comment_reports r join public.discussion_comments c on c.id=r.comment_id
 where r.id=new.report_id;
 if not found then return new; end if;
 outcome_text:=case new.action when 'dismiss' then 'A denúncia foi analisada e encerrada.'
  when 'hide' then 'O conteúdo denunciado foi ocultado após análise.'
  when 'restore' then 'O conteúdo foi restaurado após uma nova avaliação.'
  else 'O conteúdo denunciado foi excluído após análise.' end;
 perform private.push_notification(reporter,'moderation-reporter:'||new.id::text,'report_resolved',
  'Atualização da sua denúncia',outcome_text,'/materiais/'||target_id::text||'#comunidade');
 if new.action in ('hide','restore','delete') then
  perform private.push_notification(author,'moderation-author:'||new.id::text,'moderation',
   'Moderação de comentário',
   'Uma contribuição sua passou por uma decisão de moderação.',
   '/materiais/'||target_id::text||'#comunidade');
 end if;
 return new;
end;
$$;
commit;
