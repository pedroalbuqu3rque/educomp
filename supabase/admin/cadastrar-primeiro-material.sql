-- CADASTRO ADMINISTRATIVO: execute somente no SQL Editor do Supabase.
-- Primeiro envie seu arquivo real ao bucket privado materials pelo painel Storage.
-- Edite os valores abaixo. Nada é gravado enquanto os dois campos booleanos forem false.
-- Não use este script como uma API. Não compartilhe credenciais administrativas.
begin;
do $$
declare
 administrador_email text := 'PREENCHA O EMAIL DA SUA CONTA EDUCOMP';
 titulo text := 'PREENCHA O TITULO';
 descricao text := 'PREENCHA A DESCRICAO';
 autoria text := 'PREENCHA O NOME DO AUTOR';
 palavras_chave text[] := array['PREENCHA AS PALAVRAS CHAVE'];
 objetivos text := 'PREENCHA OS OBJETIVOS DE APRENDIZAGEM';
 tipo text := 'Plano de aula';
 etapa text := 'Ensino Fundamental — Anos iniciais';
 eixo text := 'Pensamento Computacional';
 ano text := '4º ano';
 abordagem text := 'unplugged'; -- plugged=plugada; unplugged=desplugada; both=ambas
 caminho_arquivo text := 'PREENCHA O CAMINHO EXATO DENTRO DO BUCKET materials';
 direitos_confirmados boolean := false; -- true somente se tem autorização para distribuir o arquivo
 revisado_e_aprovado boolean := false; -- true somente após revisar o conteúdo e os dados acima
 administrador_id uuid;
 material_id uuid;
 arquivo storage.objects;
 tamanho bigint;
 mime text;
 classificacoes bigint[];
begin
 if not direitos_confirmados or not revisado_e_aprovado then
  raise exception 'Confirme os direitos e a revisão do material antes de publicar.';
 end if;
 if position('PREENCHA' in concat_ws(' ',administrador_email,titulo,descricao,autoria,objetivos,caminho_arquivo,array_to_string(palavras_chave,' ')))>0 then
  raise exception 'Substitua todos os campos PREENCHA pelos dados reais.';
 end if;
 select id into administrador_id from auth.users where lower(email)=lower(btrim(administrador_email)) and email_confirmed_at is not null;
 if administrador_id is null then raise exception 'Conta EduComp não encontrada ou e-mail não confirmado.'; end if;
 select * into arquivo from storage.objects where bucket_id='materials' and name=caminho_arquivo;
 if arquivo.id is null then raise exception 'Arquivo não encontrado. Envie primeiro pelo painel Storage, no bucket materials.'; end if;
 if exists(select 1 from public.material_files where object_path=caminho_arquivo) then raise exception 'Este arquivo já está cadastrado. Não foi criado outro material.'; end if;
 tamanho := (arquivo.metadata->>'size')::bigint;
 mime := arquivo.metadata->>'mimetype';
 if tamanho is null or tamanho not between 1 and 20971520 then raise exception 'O arquivo deve ter até 20 MB e não pode estar vazio.'; end if;
 if mime is null or mime not in ('application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.presentationml.presentation','image/png','image/jpeg') then
  raise exception 'Formato não permitido. Use PDF, DOCX, PPTX, PNG ou JPG.';
 end if;
 select array_agg(t.id) into classificacoes from public.taxonomies t
 where (t.category='type' and t.label=tipo) or (t.category='stage' and t.label=etapa) or (t.category='axis' and t.label=eixo) or (t.category='grade' and t.label=ano);
 if coalesce(cardinality(classificacoes),0)<>4 then raise exception 'Confira tipo, etapa, eixo e ano: use os valores do guia.'; end if;
 insert into public.materials(submitted_by,title,description,authorship,keywords,objectives,approach,rights_confirmed,review_status,is_published)
 values(administrador_id,titulo,descricao,autoria,palavras_chave,objetivos,abordagem,true,'approved',false) returning id into material_id;
 insert into public.material_taxonomies(material_id,taxonomy_id) select material_id,unnest(classificacoes);
 insert into public.material_files(material_id,object_path,original_name,mime_type,size_bytes)
 values(material_id,caminho_arquivo,regexp_replace(caminho_arquivo,'^.*/',''),mime,tamanho);
 update public.materials set is_published=true where id=material_id;
 insert into public.review_events(material_id,reviewer_id,action,reason)
 values(material_id,administrador_id,'approve','Cadastro administrativo revisado no SQL Editor'),
       (material_id,administrador_id,'publish','Publicação administrativa inicial');
 raise notice 'Material cadastrado: %',material_id;
end;
$$;
commit;
