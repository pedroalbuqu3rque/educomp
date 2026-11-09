begin;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('materials','materials',false,20971520,array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.presentationml.presentation','image/png','image/jpeg']);
create policy material_download on storage.objects for select to authenticated
using(bucket_id='materials' and exists(select 1 from public.material_files f where f.object_path=name));
-- Upload bloqueado até implementar validação de conteúdo e finalização atômica do envio.
commit;
