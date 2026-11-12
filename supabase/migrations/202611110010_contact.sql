-- EduComp: mensagens enviadas pelo formulário público de contato.
-- Executar APÓS a migration 009. Não altera o acervo, papéis de revisão ou usuários.
-- Mensagens são privadas e NÃO são encaminhadas por e-mail nesta versão.
begin;

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null check (char_length(btrim(name)) between 2 and 120),
  email text not null check (char_length(btrim(email)) between 3 and 254),
  subject text not null check (char_length(btrim(subject)) between 3 and 160),
  message text not null check (char_length(btrim(message)) between 10 and 4000),
  created_at timestamptz not null default now()
);

create index contact_messages_email_recent on public.contact_messages (lower(email), created_at desc);
create index contact_messages_created_at on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;
revoke all on public.contact_messages from anon, authenticated;
-- Nenhuma policy de SELECT/INSERT/UPDATE/DELETE para visitantes ou usuários comuns.
-- A equipe responsável consulta a tabela exclusivamente no SQL Editor privilegiado.

create function public.submit_contact_message(
  p_name text, p_email text, p_subject text, p_message text
) returns uuid language plpgsql security definer set search_path = '' as $$
declare
  clean_name text := btrim(coalesce(p_name,''));
  clean_email text := lower(btrim(coalesce(p_email,'')));
  clean_subject text := btrim(coalesce(p_subject,''));
  clean_message text := btrim(coalesce(p_message,''));
  result uuid;
begin
  if char_length(clean_name) not between 2 and 120
    or char_length(clean_email) not between 3 and 254
    or clean_email !~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    or char_length(clean_subject) not between 3 and 160
    or char_length(clean_message) not between 10 and 4000 then
    raise exception 'Invalid contact fields' using errcode = '22023';
  end if;

  -- Rate limit transacional por e-mail normalizado para evitar corridas simultâneas.
  -- Não substitui proteção anti-bot e limite de requisições na borda em produção.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext('educomp-contact:' || clean_email));
  if (select count(*) from public.contact_messages
      where lower(email) = clean_email and created_at > now() - interval '24 hours') >= 3 then
    raise exception 'Contact rate limit reached' using errcode = 'P0001';
  end if;

  insert into public.contact_messages(user_id, name, email, subject, message)
  values (auth.uid(), clean_name, clean_email, clean_subject, clean_message)
  returning id into result;
  return result;
end;
$$;
revoke all on function public.submit_contact_message(text,text,text,text) from public;
grant execute on function public.submit_contact_message(text,text,text,text) to anon, authenticated;

commit;
