-- Núcleo inicial. Aplicar em um projeto Supabase novo.
begin;
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null check (length(btrim(display_name)) between 1 and 120),
 bio text not null default '' check (length(bio) <= 300),
 occupation text not null default '',
 created_at timestamptz not null default now()
);
create table public.reviewer_roles (
 user_id uuid primary key references auth.users(id) on delete cascade
);
create function private.is_reviewer() returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.reviewer_roles where user_id = auth.uid());
$$;
revoke all on function private.is_reviewer() from public;
grant execute on function private.is_reviewer() to anon, authenticated;
create table public.materials (
 id uuid primary key default gen_random_uuid(),
 submitted_by uuid not null default auth.uid() references auth.users(id),
 title text not null check (length(btrim(title)) between 1 and 200),
 description text not null check (length(btrim(description)) between 1 and 10000),
 authorship text not null check (length(btrim(authorship)) > 0),
 keywords text[] not null check (cardinality(keywords) > 0),
 objectives text,
 approach text not null check (approach in ('plugged','unplugged','both')),
 rights_confirmed boolean not null check (rights_confirmed),
 review_status text not null default 'pending' check (review_status in ('pending','in_review','approved','rejected')),
 is_published boolean not null default false,
 created_at timestamptz not null default now(),
 check (not is_published or review_status = 'approved')
);
create index materials_public_listing on public.materials(created_at desc, id desc) where is_published;
create index materials_owner on public.materials(submitted_by);
create table public.taxonomies (
 id bigint generated always as identity primary key,
 category text not null check (category in ('type','stage','axis','grade')),
 label text not null,
 unique(category,label)
);
create table public.material_taxonomies (
 material_id uuid not null references public.materials(id) on delete cascade,
 taxonomy_id bigint not null references public.taxonomies(id),
 primary key(material_id,taxonomy_id)
);
create table public.material_files (
 id uuid primary key default gen_random_uuid(),
 material_id uuid not null references public.materials(id) on delete cascade,
 object_path text not null unique,
 original_name text not null,
 mime_type text not null check (mime_type in ('application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.presentationml.presentation','image/png','image/jpeg')),
 size_bytes bigint not null check (size_bytes between 1 and 20971520),
 created_at timestamptz not null default now()
);
create table public.saved_materials (
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 material_id uuid not null references public.materials(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key(user_id,material_id)
);
create table public.review_events (
 id bigint generated always as identity primary key,
 material_id uuid not null references public.materials(id),
 reviewer_id uuid not null references auth.users(id),
 action text not null check (action in ('start','approve','reject','publish','unpublish')),
 reason text,
 created_at timestamptz not null default now()
);
-- Escritas editoriais somente por esta função; cliente não altera status diretamente.
create function public.review_material(p_id uuid, p_action text, p_reason text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare m public.materials;
begin
 if not private.is_reviewer() then raise exception 'Reviewer required' using errcode='42501'; end if;
 select * into strict m from public.materials where id=p_id for update;
 if p_action='start' and m.review_status='pending' then
  update public.materials set review_status='in_review' where id=p_id;
 elsif p_action='approve' and m.review_status='in_review' then
  update public.materials set review_status='approved' where id=p_id;
 elsif p_action='reject' and m.review_status='in_review' and length(btrim(coalesce(p_reason,'')))>0 then
  update public.materials set review_status='rejected', is_published=false where id=p_id;
 elsif p_action='publish' and m.review_status='approved' and not m.is_published then
  if not exists(select 1 from public.material_files where material_id=p_id) then raise exception 'File required'; end if;
  update public.materials set is_published=true where id=p_id;
 elsif p_action='unpublish' and m.is_published then
  update public.materials set is_published=false where id=p_id;
 else raise exception 'Invalid transition or missing reason';
 end if;
 insert into public.review_events(material_id,reviewer_id,action,reason) values(p_id,auth.uid(),p_action,p_reason);
end;
$$;
revoke all on function public.review_material(uuid,text,text) from public;
grant execute on function public.review_material(uuid,text,text) to authenticated;
-- Política explícita e concessões mínimas: todo o restante permanece bloqueado.
alter table public.profiles enable row level security;
alter table public.reviewer_roles enable row level security;
alter table public.materials enable row level security;
alter table public.taxonomies enable row level security;
alter table public.material_taxonomies enable row level security;
alter table public.material_files enable row level security;
alter table public.saved_materials enable row level security;
alter table public.review_events enable row level security;
revoke all on public.profiles, public.reviewer_roles, public.materials, public.taxonomies, public.material_taxonomies, public.material_files, public.saved_materials, public.review_events from anon, authenticated;
grant select on public.profiles, public.materials, public.taxonomies, public.material_taxonomies to anon, authenticated;
grant insert, update on public.profiles to authenticated;
grant select on public.material_files, public.review_events to authenticated;
grant select, insert, delete on public.saved_materials to authenticated;
create policy profiles_read on public.profiles for select using (true);
create policy profiles_insert on public.profiles for insert to authenticated with check(id=auth.uid());
create policy profiles_update on public.profiles for update to authenticated using(id=auth.uid()) with check(id=auth.uid());
create policy materials_read on public.materials for select using(is_published or submitted_by=auth.uid() or private.is_reviewer());
create policy taxonomy_read on public.taxonomies for select using(true);
create policy classifications_read on public.material_taxonomies for select using(exists(select 1 from public.materials m where m.id=material_id));
create policy files_read on public.material_files for select to authenticated using(exists(select 1 from public.materials m where m.id=material_id));
create policy saved_read on public.saved_materials for select to authenticated using(user_id=auth.uid());
create policy saved_insert on public.saved_materials for insert to authenticated with check(user_id=auth.uid() and exists(select 1 from public.materials m where m.id=material_id and m.is_published));
create policy saved_delete on public.saved_materials for delete to authenticated using(user_id=auth.uid());
create policy events_read on public.review_events for select to authenticated using(private.is_reviewer() or exists(select 1 from public.materials m where m.id=material_id and m.submitted_by=auth.uid()));
commit;
