import {PGlite} from "@electric-sql/pglite";
import {readFileSync} from "node:fs";
import {beforeAll,afterAll,expect,test} from "vitest";

const db=new PGlite();
const author="50000000-0000-0000-0000-000000000001";
const stranger="50000000-0000-0000-0000-000000000002";
const reviewer="50000000-0000-0000-0000-000000000003";
const original="50000000-0000-0000-0000-000000000011";
const draft="50000000-0000-0000-0000-000000000012";
const another="50000000-0000-0000-0000-000000000013";
const avatar=`${author}/50000000-0000-4000-8000-000000000001.png`;
const migrations=["202611080001_core.sql","202611080002_storage.sql","202611090003_auth_profiles.sql","202611090004_library.sql","202611090005_saved_materials.sql","202611110006_material_submissions.sql","202611110007_review_moderation.sql","202611110008_community.sql","202611110009_notifications.sql","202611110010_contact.sql","202611110011_profile_photo_resubmissions.sql"];

beforeAll(async()=>{
 await db.exec(`create role anon;create role authenticated;create schema auth;
 create table auth.users(id uuid primary key,raw_user_meta_data jsonb,email text,email_confirmed_at timestamptz);
 create function auth.uid() returns uuid language sql stable as $$
 select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
 grant usage on schema auth to anon,authenticated;
 grant execute on function auth.uid() to anon,authenticated;`);
 await db.exec(readFileSync(`supabase/migrations/${migrations[0]}`,"utf8"));
 await db.exec(`create schema storage;
  create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
  create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text,metadata jsonb);
  alter table storage.objects enable row level security;
  grant usage on schema storage to anon,authenticated;
  grant select,insert,delete on storage.objects to anon,authenticated;`);
 await db.exec(readFileSync(`supabase/migrations/${migrations[1]}`,"utf8"));
 await db.exec(`insert into auth.users(id) values ('${author}'),('${stranger}'),('${reviewer}');
 insert into public.reviewer_roles(user_id) values('${reviewer}');`);
 for(const migration of migrations.slice(2))await db.exec(readFileSync(`supabase/migrations/${migration}`,"utf8"));
 await db.exec(`insert into public.materials(id,submitted_by,title,description,authorship,keywords,approach,rights_confirmed,review_status)
  values ('${original}','${author}','Algoritmos','Atividade com sequências de instruções.','Professor',array['algoritmos'],'unplugged',true,'pending');`);
},30000);
afterAll(async()=>db.close());
async function asUser<T>(id:string,run:()=>Promise<T>):Promise<T> {
 await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${id}',false);`);
 try{return await run();}finally{await db.exec("reset role;select set_config('request.jwt.claim.sub','',false);");}
}
const draftInsert=`insert into public.materials(id,submitted_by,title,description,authorship,keywords,approach,rights_confirmed,review_status,resubmission_of)
 values($1,$2,'Algoritmos revistos','Atividade revisada com novas instruções.','Professor',array['algoritmos'],'unplugged',true,'draft',$3)`;

test("foto pública pertence à pasta do usuário e somente o titular pode alterá-la",async()=>{
 await asUser(stranger,async()=>{
  await expect(db.query("update public.profiles set avatar_path=$1 where id=$2",[avatar,author])).resolves.toBeDefined();
  expect((await db.query("select avatar_path from public.profiles where id=$1",[author])).rows[0]).toBeDefined();
  await expect(db.query("insert into storage.objects(bucket_id,name) values('avatars',$1)",[avatar])).rejects.toThrow();
 });
 await asUser(author,async()=>{
  await db.query("insert into storage.objects(bucket_id,name) values('avatars',$1)",[avatar]);
  await db.query("update public.profiles set avatar_path=$1 where id=$2",[avatar,author]);
  await expect(db.query("update public.profiles set avatar_path=$1 where id=$2",[`${stranger}/other.jpg`,author])).rejects.toThrow();
 });
 await asUser(stranger,async()=>{
  expect((await db.query<{avatar_path:string|null}>("select avatar_path from public.profiles where id=$1",[author])).rows[0].avatar_path).toBe(avatar);
 });
});

test("revisor solicita ajustes com justificativa; outro usuário não pode criar nova versão",async()=>{
 await asUser(reviewer,async()=>{
  await db.query("select public.review_material($1,'start')",[original]);
  await expect(db.query("select public.review_material($1,'request_changes','curto')",[original])).rejects.toThrow();
  await db.query("select public.review_material($1,'request_changes','Adicione os objetivos e revise as questões.')",[original]);
 });
 const status=await db.query<{review_status:string}>("select review_status from public.materials where id=$1",[original]);
 expect(status.rows[0].review_status).toBe("changes_requested");
 await asUser(stranger,async()=>await expect(db.query(draftInsert,[draft,stranger,original])).rejects.toThrow());
 await asUser(author,async()=>await db.query(draftInsert,[draft,author,original]));
 const notification=await asUser(author,async()=>db.query<{kind:string}>("select kind from public.notifications where kind='material_changes_requested'"));
 expect(notification.rows).toHaveLength(1);
});

test("novo envio só vira pendente após arquivos e classificações; impede duas versões simultâneas",async()=>{
 await asUser(author,async()=>{
  await db.query(`insert into public.material_taxonomies(material_id,taxonomy_id)
   select $1,id from public.taxonomies where (category='type' and label='Jogo')
   or (category='stage' and label='Ensino Fundamental — Anos iniciais')
   or (category='grade' and label='4º ano')
   or (category='axis' and label='Pensamento Computacional')`,[draft]);
  await expect(db.query("select public.submit_material($1)",[draft])).rejects.toThrow();
  await db.query(`insert into public.material_files(material_id,object_path,original_name,mime_type,size_bytes)
  values($1,$2,'atividade.pdf','application/pdf',2000)`,[draft,`${author}/${draft}/atividade.pdf`]);
 });
 await db.query("insert into storage.objects(bucket_id,name) values('materials',$1)",[`${author}/${draft}/atividade.pdf`]);
 await asUser(author,async()=>await db.query("select public.submit_material($1)",[draft]));
 expect((await db.query<{review_status:string;resubmission_of:string}>("select review_status,resubmission_of from public.materials where id=$1",[draft])).rows[0]).toEqual({review_status:"pending",resubmission_of:original});
 await asUser(author,async()=>{
  await db.query(draftInsert,[another,author,original]);
  await db.query(`insert into public.material_taxonomies(material_id,taxonomy_id)
   select $1,id from public.taxonomies where (category='type' and label='Jogo')
   or (category='stage' and label='Ensino Fundamental — Anos iniciais')
   or (category='grade' and label='4º ano')
   or (category='axis' and label='Pensamento Computacional')`,[another]);
  await db.query(`insert into public.material_files(material_id,object_path,original_name,mime_type,size_bytes)
   values($1,$2,'arquivo.pdf','application/pdf',2000)`,[another,`${author}/${another}/arquivo.pdf`]);
 });
 await db.query("insert into storage.objects(bucket_id,name) values('materials',$1)",[`${author}/${another}/arquivo.pdf`]);
 await asUser(author,async()=>await expect(db.query("select public.submit_material($1)",[another])).rejects.toThrow());
});
