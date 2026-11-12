import {PGlite} from "@electric-sql/pglite";
import {readFileSync} from "node:fs";
import {afterAll,beforeAll,expect,test} from "vitest";

const db=new PGlite();
const professor="37000000-0000-0000-0000-000000000001";
const other="37000000-0000-0000-0000-000000000002";
const moderator="37000000-0000-0000-0000-000000000003";
const third="37000000-0000-0000-0000-000000000004";
const published="37000000-0000-0000-0000-000000000010";
const draft="37000000-0000-0000-0000-000000000011";
const migrationNames=["202611080001_core.sql","202611080002_storage.sql","202611090003_auth_profiles.sql","202611090004_library.sql","202611090005_saved_materials.sql","202611110006_material_submissions.sql","202611110007_review_moderation.sql","202611110008_community.sql"];

beforeAll(async()=>{
 await db.exec(`create role anon;create role authenticated;create schema auth;
 create table auth.users(id uuid primary key,raw_user_meta_data jsonb,email text,email_confirmed_at timestamptz);
 create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 grant usage on schema auth to anon,authenticated;grant execute on function auth.uid() to anon,authenticated;`);
 await db.exec(readFileSync(`supabase/migrations/${migrationNames[0]}`,"utf8"));
 await db.exec(`create schema storage;
 create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
 create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text,metadata jsonb);
 alter table storage.objects enable row level security;
 grant usage on schema storage to anon,authenticated;grant select on storage.objects to anon,authenticated;`);
 await db.exec(readFileSync(`supabase/migrations/${migrationNames[1]}`,"utf8"));
 await db.exec(`insert into auth.users(id) values('${professor}'),('${other}'),('${moderator}'),('${third}');
 insert into public.reviewer_roles(user_id) values('${moderator}');`);
 for(const name of migrationNames.slice(2))await db.exec(readFileSync(`supabase/migrations/${name}`,"utf8"));
 await db.exec(`insert into public.materials(id,submitted_by,title,description,authorship,keywords,approach,rights_confirmed,review_status,is_published)
 values ('${published}','${professor}','Algoritmos','Atividade de programação','Professor',array['lógica'],'unplugged',true,'approved',true),
 ('${draft}','${professor}','Aguardando revisão','Rascunho','Professor',array['computação'],'plugged',true,'pending',false);`);
},30000);
afterAll(async()=>{await db.close();});
async function asUser<T>(id:string,fn:()=>Promise<T>):Promise<T>{
 await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${id}',false);`);
 try{return await fn();}
 finally{await db.exec("reset role;select set_config('request.jwt.claim.sub','',false);");}
}
async function create(id:string,body:string,kind="discussion",parent:string|null=null,grade:string|null=null,adaptations:string|null=null){
 return asUser(id,async()=>{
  const result=await db.query<{id:string}>("select public.create_community_comment($1,$2,$3,$4,$5,$6) as id",[published,body,kind,parent,grade,adaptations]);
  return result.rows[0].id;
 });
}

test("publicação de texto e relato apenas por usuário autenticado em material público",async()=>{
 const discussion=await create(professor,"Como aplicar sequências de instruções?");
 const relato=await create(other,"Testei em grupos de cinco crianças","application_report",null,"4º ano","Distribuí cartões.");
 expect(discussion).toMatch(/^[0-9a-f-]{36}$/);
 expect(relato).toMatch(/^[0-9a-f-]{36}$/);
 await asUser(professor,async()=>{
  const post=await db.query<{report_grade:string;report_adaptations:string}>("select report_grade,report_adaptations from public.discussion_comments where id=$1",[relato]);
  expect(post.rows[0]).toMatchObject({report_grade:"4º ano",report_adaptations:"Distribuí cartões."});
  await expect(db.query("select public.create_community_comment($1,'Não publicado')",[draft])).rejects.toThrow();
  await expect(db.query("select public.create_community_comment($1,$2)",[published,"x".repeat(1001)])).rejects.toThrow();
  await expect(db.query("select public.create_community_comment($1,$2,'application_report')",[published,"Falta o ano"])) .rejects.toThrow();
 });
 await db.exec("set role anon");
 try{
  const rows=await db.query("select id from public.discussion_comments where material_id=$1",[published]);
  expect(rows.rows.length).toBe(2);
  await expect(db.query("select public.create_community_comment($1,'Visitante')",[published])).rejects.toThrow();
 }finally{await db.exec("reset role");}
});

test("respostas têm somente um nível e autoria controla edição/exclusão",async()=>{
 const root=await create(professor,"Dúvida sobre o plano");
 const reply=await create(other,"Sugiro cartões em duplas","discussion",root);
 await asUser(professor,async()=>{
  await expect(db.query("select public.create_community_comment($1,$2,'discussion',$3)",[published,"Nível extra",reply])).rejects.toThrow();
  await expect(db.query("select public.edit_community_comment($1,$2)",[reply,"Tentativa de alteração"])) .rejects.toThrow();
  await expect(db.query("select public.delete_community_comment($1)",[reply])).rejects.toThrow();
 });
 await asUser(other,async()=>{
  await db.query("select public.edit_community_comment($1,$2)",[reply,"Atualizei a resposta"]);
  expect((await db.query<{body:string}>("select body from public.discussion_comments where id=$1",[reply])).rows[0].body).toBe("Atualizei a resposta");
 });
 await asUser(professor,async()=>await db.query("select public.delete_community_comment($1)",[root]));
 await asUser(other,async()=>{
  const r=await db.query("select visibility,hidden_by_parent from public.discussion_comments where id=$1",[reply]);
  expect(r.rows[0]).toMatchObject({visibility:"hidden",hidden_by_parent:true});
  await expect(db.query("select public.create_community_comment($1,$2,'discussion',$3)",[published,"Não deve responder",root])).rejects.toThrow();
 });
 await db.exec("set role anon");
 try{expect((await db.query("select id from public.discussion_comments where id=$1 or id=$2",[root,reply])).rows).toHaveLength(0);}
 finally{await db.exec("reset role");}
});

test("denúncias reais alimentam a moderação sem ocultar conteúdo automaticamente",async()=>{
 const post=await create(professor,"Conteúdo com dados pessoais para revisão");
 let report="";
 await asUser(other,async()=>{
  report=(await db.query<{id:string}>("select public.report_comment($1,'personal_data','Informação sensível') as id",[post])).rows[0].id;
  expect((await db.query<{visibility:string}>("select visibility from public.discussion_comments where id=$1",[post])).rows[0].visibility).toBe("visible");
  await expect(db.query("select public.report_comment($1,'personal_data')",[post])).rejects.toThrow();
  await expect(db.query("select public.moderate_report($1,'start')",[report])).rejects.toThrow();
 });
 await asUser(moderator,async()=>{
  await db.query("select public.moderate_report($1,'start')",[report]);
  await db.query("select public.moderate_report($1,'hide',$2)",[report,"Exposição de informações pessoais"]);
 });
 await db.exec("set role anon");
 try{expect((await db.query("select id from public.discussion_comments where id=$1",[post])).rows).toHaveLength(0);}
 finally{await db.exec("reset role");}
 await asUser(professor,async()=>await expect(db.query("select public.edit_community_comment($1,'Tentativa')",[post])).rejects.toThrow());
 await asUser(moderator,async()=>await db.query("select public.moderate_report($1,'restore',$2)",[report,"Conteúdo revisado e autorizado"]));
 await db.exec("set role anon");
 try{expect((await db.query("select id from public.discussion_comments where id=$1",[post])).rows).toHaveLength(1);}
 finally{await db.exec("reset role");}
});

test("exclusão editorial de um relato remove também os metadados de turma e adaptações",async()=>{
 const id=await create(professor,"Relato com informações que devem ser removidas","application_report",null,"5º ano","Dados privados registrados indevidamente");
 let report="";
 await asUser(third,async()=>{
  report=(await db.query<{id:string}>("select public.report_comment($1,'personal_data','Conteúdo expõe informações') as id",[id])).rows[0].id;
 });
 await asUser(moderator,async()=>{
  await db.query("select public.moderate_report($1,'start')",[report]);
  await db.query("select public.moderate_report($1,'delete','Exclusão definitiva dos metadados')",[report]);
  const data=await db.query<{body:string;report_grade:string|null;report_adaptations:string|null}>("select body,report_grade,report_adaptations from public.discussion_comments where id=$1",[id]);
  expect(data.rows[0].body).toBe("[Conteúdo excluído pela moderação]");
  expect(data.rows[0].report_grade).toBeNull();
  expect(data.rows[0].report_adaptations).toBeNull();
 });
});

test("limita o volume de comentários por conta por hora",async()=>{
 for(let i=0;i<12;i++)await create(third,`Mensagem ${i+1}`);
 await asUser(third,async()=>await expect(db.query("select public.create_community_comment($1,$2)",[published,"Mensagem excedente"])) .rejects.toThrow());
});
