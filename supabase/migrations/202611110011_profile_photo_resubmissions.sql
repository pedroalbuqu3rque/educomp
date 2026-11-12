-- Fotos públicas do perfil e revisões de submissões.
-- Aplicar após a migration 010. Não concede permissões de revisor.
begin;

-- Foto de perfil: o caminho é do titular; nenhuma URL externa arbitrária é aceita.
alter table public.profiles add column avatar_path text;
alter table public.profiles add constraint profiles_avatar_path_owner_check
 check (avatar_path is null or avatar_path ~ ('^' || id::text || '/[0-9a-f-]{36}\.(png|jpg)$'));

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('avatars','avatars',true,5242880,array['image/jpeg','image/png'])
on conflict(id) do update set public=true,file_size_limit=5242880,
 allowed_mime_types=excluded.allowed_mime_types;

create policy avatar_public_read on storage.objects for select
 using(bucket_id='avatars');
create policy avatar_owner_insert on storage.objects for insert to authenticated
 with check(bucket_id='avatars' and split_part(name,'/',1)=auth.uid()::text
  and name ~ ('^' || auth.uid()::text || '/[0-9a-f-]{36}\.(png|jpg)$'));
create policy avatar_owner_delete on storage.objects for delete to authenticated
 using(bucket_id='avatars' and split_part(name,'/',1)=auth.uid()::text);

-- Uma nova versão recebe outro ID; o envio anterior e seu histórico são preservados.
alter table public.materials add column resubmission_of uuid references public.materials(id) on delete restrict;
create index materials_resubmission_of on public.materials(resubmission_of)
 where resubmission_of is not null;
-- Somente uma versão efetivamente submetida por origem. Rascunhos fracassados
-- podem ser removidos, sem bloquear novas tentativas.
create unique index materials_one_resubmission_per_origin on public.materials(resubmission_of)
 where resubmission_of is not null and review_status <> 'draft';
alter table public.materials drop constraint materials_review_status_check;
alter table public.materials add constraint materials_review_status_check
 check(review_status in ('draft','pending','in_review','changes_requested','approved','rejected'));

-- A política de INSERT não pode consultar a própria tabela sob RLS:
-- usar uma função SECURITY DEFINER específica para a consulta à versão anterior.
create function private.can_resubmit(p_original uuid) returns boolean
 language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.materials original
  where original.id=p_original and original.submitted_by=auth.uid()
   and original.review_status in ('changes_requested','rejected') and not original.is_published);
$$;
revoke all on function private.can_resubmit(uuid) from public;
grant execute on function private.can_resubmit(uuid) to authenticated;

drop policy materials_insert_draft on public.materials;
create policy materials_insert_draft on public.materials for insert to authenticated
 with check(submitted_by=auth.uid() and review_status='draft'
 and not is_published and rights_confirmed
 and (resubmission_of is null or private.can_resubmit(resubmission_of)));

alter table public.review_events drop constraint review_events_action_check;
alter table public.review_events add constraint review_events_action_check
 check(action in ('start','approve','request_changes','reject','publish','unpublish'));

-- Só revisores podem solicitar ajustes; é obrigatório justificar o pedido.
create or replace function public.review_material(p_id uuid, p_action text, p_reason text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare m public.materials;
begin
 if not private.is_reviewer() then raise exception 'Reviewer required' using errcode='42501'; end if;
 select * into strict m from public.materials where id=p_id for update;
 if p_action='start' and m.review_status='pending' then
  update public.materials set review_status='in_review' where id=p_id;
 elsif p_action='approve' and m.review_status='in_review' then
  update public.materials set review_status='approved' where id=p_id;
 elsif p_action='request_changes' and m.review_status='in_review'
  and length(btrim(coalesce(p_reason,''))) between 10 and 1000 then
  update public.materials set review_status='changes_requested',is_published=false where id=p_id;
 elsif p_action='reject' and m.review_status='in_review'
  and length(btrim(coalesce(p_reason,''))) between 10 and 1000 then
  update public.materials set review_status='rejected',is_published=false where id=p_id;
 elsif p_action='publish' and m.review_status='approved' and not m.is_published then
  if not exists(select 1 from public.material_files where material_id=p_id) then
   raise exception 'File required'; end if;
  update public.materials set is_published=true where id=p_id;
 elsif p_action='unpublish' and m.is_published then
  update public.materials set is_published=false where id=p_id;
 else raise exception 'Invalid transition or missing reason';
 end if;
 insert into public.review_events(material_id,reviewer_id,action,reason)
 values(p_id,auth.uid(),p_action,p_reason);
end;
$$;

alter table public.notifications drop constraint notifications_kind_check;
alter table public.notifications add constraint notifications_kind_check check(kind in (
 'material_submitted','review_pending','material_in_review','material_approved',
 'material_rejected','material_changes_requested','material_published','material_unpublished','new_material',
 'comment_reply','material_comment','moderation','report_resolved','announcement'
));

-- Preserva notificações existentes e inclui o novo evento editorial.
create or replace function private.notify_review_event() returns trigger
language plpgsql security definer set search_path='' as $$
declare m public.materials; k text; title_text text; description_text text; url_text text;
begin
 select * into m from public.materials where id=new.material_id;
 if not found then return new; end if;
 k:='review:'||new.id::text;
 url_text:='/meus-envios?material='||m.id::text;
 if new.action='start' then
  title_text:='Seu material está em análise'; description_text:='A equipe iniciou a revisão da sua contribuição.';
 elsif new.action='approve' then
  title_text:='Seu material foi aprovado'; description_text:='A contribuição foi aprovada. A publicação ocorrerá em uma etapa separada.';
 elsif new.action='request_changes' then
  title_text:='Ajustes solicitados no seu material'; description_text:='A equipe solicitou ajustes. Confira a justificativa e prepare uma nova versão.';
 elsif new.action='reject' then
  title_text:='Seu material foi recusado'; description_text:='Consulte a justificativa em Meus envios.';
 elsif new.action='publish' then
  title_text:='Seu material foi publicado'; description_text:='Seu recurso agora está disponível na Biblioteca.';
  url_text:='/materiais/'||m.id::text;
 elsif new.action='unpublish' then
  title_text:='Publicação suspensa'; description_text:='Seu material não está mais disponível publicamente. Consulte Meus envios.';
 else return new;
 end if;
 perform private.push_notification(m.submitted_by,k,
  case new.action when 'start' then 'material_in_review' when 'approve' then 'material_approved'
   when 'request_changes' then 'material_changes_requested' when 'reject' then 'material_rejected'
   when 'publish' then 'material_published' else 'material_unpublished' end,
  title_text,description_text,url_text);
 if new.action='publish' and m.is_published and m.review_status='approved' then
  insert into public.notifications(recipient_id,event_key,kind,title,body,target_url)
  select p.id,'new-material:'||m.id::text,'new_material',
   'Novo material na Biblioteca','Um recurso pedagógico de Computação acaba de ser publicado.',
   '/materiais/'||m.id::text
  from public.profiles p where p.id<>m.submitted_by
  on conflict(recipient_id,event_key) do nothing;
 end if;
 return new;
end;
$$;
commit;
