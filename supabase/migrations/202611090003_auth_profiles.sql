-- Execute uma vez, após as duas migrações anteriores.
begin;
create or replace function private.create_profile_for_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
 insert into public.profiles(id, display_name)
 values(new.id, coalesce(nullif(left(btrim(new.raw_user_meta_data->>'display_name'),120),''),'Professor(a)'))
 on conflict(id) do nothing;
 return new;
end;
$$;
revoke all on function private.create_profile_for_user() from public, anon, authenticated;
drop trigger if exists educomp_create_profile on auth.users;
create trigger educomp_create_profile after insert on auth.users
for each row execute function private.create_profile_for_user();
insert into public.profiles(id,display_name)
select id,coalesce(nullif(left(btrim(raw_user_meta_data->>'display_name'),120),''),'Professor(a)') from auth.users
on conflict(id) do nothing;
commit;
