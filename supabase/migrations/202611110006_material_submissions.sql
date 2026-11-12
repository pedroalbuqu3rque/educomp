-- Envio protegido: rascunho temporário -> arquivos/classificações -> pendente.
-- Executar após 001-005. Revisores continuam os únicos a aprovar e publicar.
begin;
alter table public.materials drop constraint if exists materials_review_status_check;
alter table public.materials add constraint materials_review_status_check
 check(review_status in ('draft','pending','in_review','approved','rejected'));

grant insert,delete on public.materials to authenticated;
create policy materials_insert_draft on public.materials for insert to authenticated
 with check(submitted_by=auth.uid() and review_status='draft' and not is_published and rights_confirmed);
create policy materials_delete_draft on public.materials for delete to authenticated
 using(submitted_by=auth.uid() and review_status='draft' and not is_published);

grant insert on public.material_taxonomies,public.material_files to authenticated;
create policy taxonomy_insert_draft on public.material_taxonomies for insert to authenticated
 with check(exists(select 1 from public.materials m where m.id=material_id
   and m.submitted_by=auth.uid() and m.review_status='draft' and not m.is_published));
create policy files_insert_draft on public.material_files for insert to authenticated
 with check(object_path like auth.uid()::text || '/' || material_id::text || '/%'
   and exists(select 1 from public.materials m where m.id=material_id
     and m.submitted_by=auth.uid() and m.review_status='draft' and not m.is_published));

-- O usuário só pode gravar/remover arquivos da própria submissão ainda em rascunho.
grant insert,delete on storage.objects to authenticated;
create policy material_upload_draft on storage.objects for insert to authenticated
 with check(bucket_id='materials' and exists(
  select 1 from public.materials m where m.submitted_by=auth.uid() and m.review_status='draft'
  and m.id::text=split_part(name,'/',2) and split_part(name,'/',1)=auth.uid()::text
  and name like auth.uid()::text || '/' || m.id::text || '/%'
 ));
create policy material_select_own_draft on storage.objects for select to authenticated
 using(bucket_id='materials' and exists(
  select 1 from public.materials m where m.submitted_by=auth.uid() and m.review_status='draft'
  and name like auth.uid()::text || '/' || m.id::text || '/%'
 ));
create policy material_delete_own_draft on storage.objects for delete to authenticated
 using(bucket_id='materials' and exists(
  select 1 from public.materials m where m.submitted_by=auth.uid() and m.review_status='draft'
  and name like auth.uid()::text || '/' || m.id::text || '/%'
 ));

-- Não basta conhecer o caminho de um arquivo não publicado para baixá-lo.
drop policy if exists material_download on storage.objects;
create policy material_download on storage.objects for select to authenticated using(
 bucket_id='materials' and exists(
  select 1 from public.material_files f join public.materials m on m.id=f.material_id
  where f.object_path=name and (
   (m.review_status='approved' and m.is_published)
   or m.submitted_by=auth.uid() or private.is_reviewer()
  )
 )
);

create function public.submit_material(p_id uuid) returns void
language plpgsql security definer set search_path='' as $$
declare m public.materials;
begin
 select * into strict m from public.materials where id=p_id for update;
 if auth.uid() is null or m.submitted_by<>auth.uid() or m.review_status<>'draft' or m.is_published
 then raise exception 'Unauthorized submission' using errcode='42501'; end if;
 if not m.rights_confirmed then raise exception 'Rights required'; end if;
 if (select count(*) from public.material_files where material_id=p_id) not between 1 and 5
  or (select coalesce(sum(size_bytes),0) from public.material_files where material_id=p_id)>52428800
 then raise exception 'File limit exceeded or files missing'; end if;
 if exists(select 1 from public.material_files f where f.material_id=p_id
   and not exists(select 1 from storage.objects s where s.bucket_id='materials' and s.name=f.object_path))
 then raise exception 'Stored file missing'; end if;
 if exists(select 1 from public.material_files f where f.material_id=p_id
   and f.object_path not like auth.uid()::text || '/' || p_id::text || '/%')
 then raise exception 'Invalid file path'; end if;
 if exists(
  select 1 from (values ('type'),('stage'),('axis'),('grade')) required(category)
  where not exists(select 1 from public.material_taxonomies mt
    join public.taxonomies t on t.id=mt.taxonomy_id
    where mt.material_id=p_id and t.category=required.category)
 ) then raise exception 'Required classifications missing'; end if;
 -- Anos/séries precisam corresponder às etapas indicadas, em ambas as direções.
 if exists(
  with selected as (
   select t.category,t.label from public.material_taxonomies mt
   join public.taxonomies t on t.id=mt.taxonomy_id where mt.material_id=p_id
  ), pairs as (
   select s.label stage,g.label grade from selected s cross join selected g
   where s.category='stage' and g.category='grade'
   and ((s.label='Educação Infantil' and g.label='Educação Infantil')
    or (s.label='Ensino Fundamental — Anos iniciais' and g.label in ('1º ano','2º ano','3º ano','4º ano','5º ano'))
    or (s.label='Ensino Fundamental — Anos finais' and g.label in ('6º ano','7º ano','8º ano','9º ano'))
    or (s.label='Ensino Médio' and g.label in ('1ª série do Ensino Médio','2ª série do Ensino Médio','3ª série do Ensino Médio')))
  )
  select 1 from selected item where (item.category='stage' and not exists(select 1 from pairs where stage=item.label))
   or (item.category='grade' and not exists(select 1 from pairs where grade=item.label))
 ) then raise exception 'Grade not compatible with selected stage'; end if;
 update public.materials set review_status='pending' where id=p_id;
end;
$$;
revoke all on function public.submit_material(uuid) from public;
grant execute on function public.submit_material(uuid) to authenticated;
commit;
