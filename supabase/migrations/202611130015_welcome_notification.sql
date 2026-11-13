-- Boas-vindas: uma notificação por perfil, sem ampliar permissões.
-- Executar após 009 e 011; inclui as contas já cadastradas.
begin;

alter table public.notifications drop constraint if exists notifications_kind_check;
alter table public.notifications add constraint notifications_kind_check check (kind in (
 'material_submitted','review_pending','material_in_review','material_approved',
 'material_rejected','material_changes_requested','material_published',
 'material_unpublished','new_material','comment_reply','material_comment',
 'moderation','report_resolved','announcement','welcome'
));

create or replace function private.notify_profile_welcome()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
 perform private.push_notification(
  new.id,
  'welcome:v1',
  'welcome',
  'Boas-vindas ao EduComp',
  'Sua conta está pronta. Explore a Biblioteca, salve materiais e compartilhe experiências com outros professores.',
  '/biblioteca'
 );
 return new;
end;
$$;
revoke all on function private.notify_profile_welcome() from public, anon, authenticated;

drop trigger if exists notify_profile_welcome on public.profiles;
create trigger notify_profile_welcome
 after insert on public.profiles
 for each row execute function private.notify_profile_welcome();

-- Entrega única também às contas anteriores à instalação da migration.
insert into public.notifications(recipient_id,event_key,kind,title,body,target_url)
select
 p.id,
 'welcome:v1',
 'welcome',
 'Boas-vindas ao EduComp',
 'Sua conta está pronta. Explore a Biblioteca, salve materiais e compartilhe experiências com outros professores.',
 '/biblioteca'
from public.profiles p
on conflict(recipient_id,event_key) do nothing;

commit;
