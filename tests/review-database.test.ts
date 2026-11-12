import {PGlite} from "@electric-sql/pglite";
import {readFileSync} from "node:fs";
import {beforeAll,afterAll,test,expect} from "vitest";
const db=new PGlite();
const author="20000000-0000-0000-0000-000000000001";
const visitor="20000000-0000-0000-0000-000000000002";
const reviewer="20000000-0000-0000-0000-000000000003";
const other="20000000-0000-0000-0000-000000000004";
const third="20000000-0000-0000-0000-000000000005";
const materialId="20000000-0000-0000-0000-000000000011";
const rejectedId="20000000-0000-0000-0000-000000000012";
const commentId="20000000-0000-0000-0000-000000000020";
const unpublishedId="20000000-0000-0000-0000-000000000021";

beforeAll(async()=>{
 await db.exec(`create role anon; create role authenticated; create schema auth;
  create table auth.users(id uuid primary key,raw_user_meta_data jsonb,email text,email_confirmed_at timestamptz);
  create function auth.uid() returns uuid language sql stable as $$
   select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
  grant usage on schema auth to anon,authenticated;
  grant execute on function auth.uid() to anon,authenticated;`);
 await db.exec(readFileSync("supabase/migrations/202611080001_core.sql","utf8"));
 await db.exec(`create schema storage;
  create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
  create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text,metadata jsonb);
  alter table storage.objects enable row level security;
  grant usage on schema storage to anon,authenticated;
  grant select on storage.objects to anon,authenticated;`);
 await db.exec(readFileSync("supabase/migrations/202611080002_storage.sql","utf8"));
 await db.exec(`insert into auth.users(id) values ('${author}'),('${visitor}'),('${reviewer}'),('${other}'),('${third}');
  insert into public.reviewer_roles(user_id) values('${reviewer}');`);
 for(const path of ["202611090003_auth_profiles.sql","202611090004_library.sql","202611090005_saved_materials.sql","202611110006_material_submissions.sql","202611110007_review_moderation.sql"])
  await db.exec(readFileSync(`supabase/migrations/${path}`,"utf8"));
 await db.exec(`insert into public.materials(id,submitted_by,title,description,authorship,keywords,approach,rights_confirmed,review_status)
  values ('${materialId}','${author}','Sequência de algoritmos','Material de teste editorial','Professor',array['algoritmos'],'unplugged',true,'pending'),
  ('${rejectedId}','${author}','Material para recusa','Atividade para decisão','Professor',array['lógica'],'plugged',true,'pending'),
  ('${unpublishedId}','${author}','Rascunho','Aguardando publicação','Professor',array['dados'],'plugged',true,'pending');
  insert into public.material_files(material_id,object_path,original_name,mime_type,size_bytes)
   values('${materialId}','${author}/${materialId}/material.pdf','material.pdf','application/pdf',2000);`);
},30000);
afterAll(async()=>{await db.close();});
async function asUser<T>(user:string,fn:()=>Promise<T>):Promise<T>{
 await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub','${user}',false);`);
 try{return await fn();}
 finally{await db.exec("reset role; select set_config('request.jwt.claim.sub','',false);");}
}

test("somente revisor acessa fila e pode mudar estado; publicar é decisão distinta",async()=>{
 await asUser(author,async()=>{
  expect((await db.query<{is_reviewer:boolean}>("select public.is_reviewer()")).rows[0].is_reviewer).toBe(false);
  expect((await db.query("select id from public.materials where review_status='pending'")).rows).toHaveLength(3);
  await expect(db.query("select public.review_material($1,'start')",[materialId])).rejects.toThrow();
 });
 await asUser(visitor,async()=>{
  expect((await db.query("select id from public.materials where review_status='pending'")).rows).toHaveLength(0);
  await expect(db.query("select public.review_material($1,'start')",[materialId])).rejects.toThrow();
 });
 await asUser(reviewer,async()=>{
  expect((await db.query<{is_reviewer:boolean}>("select public.is_reviewer()")).rows[0].is_reviewer).toBe(true);
  expect((await db.query("select id from public.materials where review_status='pending'")).rows).toHaveLength(3);
  await expect(db.query("select public.review_material($1,'approve')",[materialId])).rejects.toThrow();
  await db.query("select public.review_material($1,'start')",[materialId]);
  await db.query("select public.review_material($1,'approve')",[materialId]);
  expect((await db.query<{is_published:boolean}>("select is_published from public.materials where id=$1",[materialId])).rows[0].is_published).toBe(false);
 });
 await asUser(visitor,async()=>expect((await db.query("select id from public.materials")).rows).toHaveLength(0));
 await asUser(reviewer,async()=>{
  await db.query("select public.review_material($1,'publish')",[materialId]);
  await expect(db.query("select public.review_material($1,'publish')",[materialId])).rejects.toThrow();
 });
 await asUser(visitor,async()=>expect((await db.query("select id from public.materials")).rows).toHaveLength(1));
 await asUser(reviewer,async()=>await db.query("select public.review_material($1,'unpublish')",[materialId]));
 await asUser(visitor,async()=>expect((await db.query("select id from public.materials")).rows).toHaveLength(0));
 await asUser(reviewer,async()=>{
  await expect(db.query("select public.review_material($1,'unpublish')",[materialId])).rejects.toThrow();
  await db.query("select public.review_material($1,'publish')",[materialId]);
  await db.query("select public.review_material($1,'start')",[rejectedId]);
  await expect(db.query("select public.review_material($1,'reject')",[rejectedId])).rejects.toThrow();
  await db.query("select public.review_material($1,'reject','Conteúdo incompleto')",[rejectedId]);
  await expect(db.query("select public.review_material($1,'publish')",[rejectedId])).rejects.toThrow();
  await db.query("select public.review_material($1,'start')",[unpublishedId]);
  await db.query("select public.review_material($1,'approve')",[unpublishedId]);
  await expect(db.query("select public.review_material($1,'publish')",[unpublishedId])).rejects.toThrow();
  expect((await db.query("select action from public.review_events where material_id=$1",[materialId])).rows).toHaveLength(5);
 });
 await asUser(author,async()=>{
  const reason=await db.query<{reason:string}>("select reason from public.review_events where material_id=$1 and action='reject'",[rejectedId]);
  expect(reason.rows[0]?.reason).toBe("Conteúdo incompleto");
 });
});

test("denúncia não oculta automaticamente; somente o revisor pode moderar",async()=>{
 await db.exec(`insert into public.discussion_comments(id,material_id,author_id,body)
  values('${commentId}','${materialId}','${author}','Mensagem que inclui dados pessoais em comentário de teste');`);
 await asUser(author,async()=>{
  await expect(db.query("select public.report_comment($1,'personal_data','')",[commentId])).rejects.toThrow();
 });
 let reportId="";
 let secondId="";
 let thirdId="";
 await asUser(visitor,async()=>{
  const created=await db.query<{report_comment:string}>("select public.report_comment($1,'personal_data','Precisa de avaliação')",[commentId]);
  reportId=created.rows[0].report_comment;
  await expect(db.query("select public.report_comment($1,'personal_data','')",[commentId])).rejects.toThrow();
  expect((await db.query("select visibility from public.discussion_comments where id=$1",[commentId])).rows[0]).toHaveProperty("visibility","visible");
  await expect(db.query("select public.moderate_report($1,'start')",[reportId])).rejects.toThrow();
 });
 await asUser(other,async()=>{
  const created=await db.query<{report_comment:string}>("select public.report_comment($1,'harassment')",[commentId]);
  secondId=created.rows[0].report_comment;
 });
 await asUser(third,async()=>{
  const created=await db.query<{report_comment:string}>("select public.report_comment($1,'spam')",[commentId]);
  thirdId=created.rows[0].report_comment;
 });
 await asUser(reviewer,async()=>{
  await db.query("select public.moderate_report($1,'start')",[reportId]);
  await expect(db.query("select public.moderate_report($1,'hide','Curta')",[reportId])).rejects.toThrow();
  await db.query("select public.moderate_report($1,'hide','Contém informações de alunos')",[reportId]);
  await db.query("select public.moderate_report($1,'restore','Revisado e permitido novamente')",[reportId]);
  await db.query("select public.moderate_report($1,'hide','Nova evidência de exposição')",[reportId]);
  const status=await db.query<{status:string;outcome:string}>("select status,outcome from public.comment_reports where id=$1",[reportId]);
  expect(status.rows[0]).toMatchObject({status:"resolved",outcome:"hidden"});
  await db.query("select public.moderate_report($1,'start')",[secondId]);
  await db.query("select public.moderate_report($1,'restore','Conteúdo reavaliado com cuidado')",[secondId]);
  await db.query("select public.moderate_report($1,'start')",[thirdId]);
  await db.query("select public.moderate_report($1,'delete','Exclusão definitiva após análise')",[thirdId]);
  await expect(db.query("select public.moderate_report($1,'restore','Texto deveria voltar')",[thirdId])).rejects.toThrow();
  const result=await db.query<{body:string;visibility:string}>("select body,visibility from public.discussion_comments where id=$1",[commentId]);
  expect(result.rows[0]).toMatchObject({visibility:"deleted",body:"[Conteúdo excluído pela moderação]"});
  expect((await db.query("select action from public.moderation_events where comment_id=$1",[commentId])).rows).toHaveLength(8);
 });
 await asUser(visitor,async()=>{
  expect((await db.query("select id from public.discussion_comments where id=$1",[commentId])).rows).toHaveLength(0);
  expect((await db.query("select id from public.comment_reports")).rows).toHaveLength(1);
  expect((await db.query("select id from public.moderation_events")).rows).toHaveLength(0);
  await expect(db.query("update public.discussion_comments set visibility='visible' where id=$1",[commentId])).rejects.toThrow();
 });
 await asUser(author,async()=>{
  expect((await db.query("select id from public.comment_reports")).rows).toHaveLength(0);
  expect((await db.query("select id from public.discussion_comments where id=$1",[commentId])).rows).toHaveLength(1);
 });
});
