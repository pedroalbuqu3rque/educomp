-- Central de notificações do EduComp (aplicar após a migration 008).
-- Entregas internas e persistidas; não envia e-mails nem notificações push.
-- O autor recebe eventos dos seus envios, o leitor recebe novas publicações,
-- e a Comunidade gera avisos de respostas e comentários. Nenhuma conta
-- recebe acesso editorial por causa desta migration.
begin;

create table public.notifications (
 id uuid primary key default gen_random_uuid(),
 recipient_id uuid not null references auth.users(id) on delete cascade,
 event_key text not null check(length(event_key) between 1 and 240),
 kind text not null check(kind in (
  'material_submitted','review_pending','material_in_review','material_approved',
  'material_rejected','material_published','material_unpublished','new_material',
  'comment_reply','material_comment','moderation','report_resolved','announcement'
 )),
 title text not null check(length(btrim(title)) between 1 and 140),
 body text not null check(length(btrim(body)) between 1 and 500),
 target_url text not null default '/biblioteca' check (
  length(target_url) between 1 and 300 and left(target_url,1)='/'
  and left(target_url,2)<>'//' and position(chr(92) in target_url)=0
  and position(chr(10) in target_url)=0 and position(chr(13) in target_url)=0
 ),
 read_at timestamptz,
 created_at timestamptz not null default now(),
 unique(recipient_id,event_key)
);
create index notifications_inbox on public.notifications(recipient_id,created_at desc,id desc);
create index notifications_unread on public.notifications(recipient_id,created_at desc) where read_at is null;

alter table public.notifications enable row level security;
revoke all on public.notifications from anon,authenticated;
grant select on public.notifications to authenticated;
create policy notifications_read_own on public.notifications for select to authenticated
 using(recipient_id=auth.uid());

-- O cliente NÃO tem UPDATE direto: altera somente o estado de leitura via RPC.
create function public.set_notification_read(p_id uuid,p_read boolean default true)
returns boolean language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null then raise exception 'Login required' using errcode='42501'; end if;
 update public.notifications set read_at=case when coalesce(p_read,true) then coalesce(read_at,now()) else null end
 where id=p_id and recipient_id=auth.uid();
 return found;
end;
$$;
revoke all on function public.set_notification_read(uuid,boolean) from public;
grant execute on function public.set_notification_read(uuid,boolean) to authenticated;

create function public.mark_all_notifications_read()
returns integer language plpgsql security definer set search_path='' as $$
declare updated_count integer;
begin
 if auth.uid() is null then raise exception 'Login required' using errcode='42501'; end if;
 update public.notifications set read_at=now()
 where recipient_id=auth.uid() and read_at is null;
 get diagnostics updated_count=row_count;
 return updated_count;
end;
$$;
revoke all on function public.mark_all_notifications_read() from public;
grant execute on function public.mark_all_notifications_read() to authenticated;

-- Somente os gatilhos controlados pelo banco chamam esta função privada.
create function private.push_notification(
 p_recipient uuid,p_key text,p_kind text,p_title text,p_body text,p_target text
) returns void language plpgsql security definer set search_path='' as $$
begin
 if p_recipient is null then return; end if;
 insert into public.notifications(recipient_id,event_key,kind,title,body,target_url)
 values(p_recipient,p_key,p_kind,p_title,p_body,p_target)
 on conflict(recipient_id,event_key) do nothing;
end;
$$;
revoke all on function private.push_notification(uuid,text,text,text,text,text) from public;

-- Ao concluir o envio, o autor recebe o protocolo, e os revisores já
-- cadastrados recebem um aviso para consultar a fila.
create function private.notify_submission() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 perform private.push_notification(
  new.submitted_by,'submission:'||new.id::text,'material_submitted',
  'Material enviado para revisão','Recebemos seu material. Acompanhe o andamento em Meus envios.',
  '/meus-envios?material='||new.id::text
 );
 insert into public.notifications(recipient_id,event_key,kind,title,body,target_url)
 select r.user_id,'queue:'||new.id::text,'review_pending',
  'Novo material aguardando revisão','Há uma contribuição na fila de análise editorial.',
  '/revisao/'||new.id::text
 from public.reviewer_roles r where r.user_id<>new.submitted_by
 on conflict(recipient_id,event_key) do nothing;
 return new;
end;
$$;
revoke all on function private.notify_submission() from public;
create trigger notify_material_submitted after update of review_status on public.materials
 for each row when(old.review_status='draft' and new.review_status='pending')
 execute function private.notify_submission();

-- review_events é gravada exclusivamente por review_material(), que valida
-- o papel e executa a transição. Um evento = uma notificação por destinatário.
create function private.notify_review_event() returns trigger
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
   when 'reject' then 'material_rejected' when 'publish' then 'material_published'
   else 'material_unpublished' end,title_text,description_text,url_text);
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
revoke all on function private.notify_review_event() from public;
create trigger notify_review_event after insert on public.review_events
 for each row execute function private.notify_review_event();

-- Respostas notificam o autor da conversa. Comentários e relatos novos
-- avisam o autor do material; não se manda aviso para a própria pessoa.
create function private.notify_community_comment() returns trigger
language plpgsql security definer set search_path='' as $$
declare recipient uuid;
begin
 if new.parent_id is not null then
  select author_id into recipient from public.discussion_comments where id=new.parent_id;
  if recipient is distinct from new.author_id then
   perform private.push_notification(recipient,'reply:'||new.id::text,'comment_reply',
    'Nova resposta ao seu comentário','Um professor respondeu à sua contribuição.',
    '/materiais/'||new.material_id::text||'?contribuicoes=discussion#comunidade');
  end if;
 else
  select submitted_by into recipient from public.materials where id=new.material_id;
  if recipient is distinct from new.author_id then
   perform private.push_notification(recipient,'comment:'||new.id::text,'material_comment',
    case when new.kind='application_report' then 'Novo relato de aplicação' else 'Novo comentário no seu material' end,
    'Um professor compartilhou uma contribuição sobre seu recurso.',
    '/materiais/'||new.material_id::text||'?contribuicoes=all#comunidade');
  end if;
 end if;
 return new;
end;
$$;
revoke all on function private.notify_community_comment() from public;
create trigger notify_community_comment after insert on public.discussion_comments
 for each row execute function private.notify_community_comment();

-- O resultado da moderação informa a quem denunciou o conteúdo; quando
-- houver ocultação/restauração/exclusão, informa também o autor afetado.
-- Os avisos não expõem a identidade de quem denunciou.
create function private.notify_moderation_event() returns trigger
language plpgsql security definer set search_path='' as $$
declare reporter uuid; author uuid; material uuid; outcome_text text;
begin
 if new.action='start' then return new; end if;
 select r.reporter_id,c.author_id,c.material_id into reporter,author,material
 from public.comment_reports r join public.discussion_comments c on c.id=r.comment_id
 where r.id=new.report_id;
 if not found then return new; end if;
 outcome_text:=case new.action when 'dismiss' then 'A denúncia foi analisada e encerrada.'
  when 'hide' then 'O conteúdo denunciado foi ocultado após análise.'
  when 'restore' then 'O conteúdo foi restaurado após uma nova avaliação.'
  else 'O conteúdo denunciado foi excluído após análise.' end;
 perform private.push_notification(reporter,'moderation-reporter:'||new.id::text,'report_resolved',
  'Atualização da sua denúncia',outcome_text,'/materiais/'||material::text||'#comunidade');
 if new.action in ('hide','restore','delete') then
  perform private.push_notification(author,'moderation-author:'||new.id::text,'moderation',
   'Moderação de comentário',
   'Uma contribuição sua passou por uma decisão de moderação.',
   '/materiais/'||material::text||'#comunidade');
 end if;
 return new;
end;
$$;
revoke all on function private.notify_moderation_event() from public;
create trigger notify_moderation_event after insert on public.moderation_events
 for each row execute function private.notify_moderation_event();

-- Comunicados institucionais: nenhum usuário comum pode criá-los.
-- A equipe administradora publica via SQL Editor (papel privilegiado).
create table public.platform_announcements (
 id uuid primary key default gen_random_uuid(),
 title text not null check(length(btrim(title)) between 1 and 140),
 body text not null check(length(btrim(body)) between 1 and 500),
 target_url text not null default '/biblioteca' check (
  length(target_url) between 1 and 300 and left(target_url,1)='/'
  and left(target_url,2)<>'//' and position(chr(92) in target_url)=0
  and position(chr(10) in target_url)=0 and position(chr(13) in target_url)=0
 ),
 published_at timestamptz,
 created_at timestamptz not null default now()
);
alter table public.platform_announcements enable row level security;
revoke all on public.platform_announcements from anon,authenticated;

create function private.notify_announcement() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 if new.published_at is null then return new; end if;
 if tg_op='UPDATE' then
  if old.published_at is not null then return new; end if;
 end if;
 insert into public.notifications(recipient_id,event_key,kind,title,body,target_url)
 select p.id,'announcement:'||new.id::text,'announcement',new.title,new.body,new.target_url
 from public.profiles p
 on conflict(recipient_id,event_key) do nothing;
 return new;
end;
$$;
revoke all on function private.notify_announcement() from public;
create trigger notify_announcement after insert or update of published_at on public.platform_announcements
 for each row execute function private.notify_announcement();

commit;
