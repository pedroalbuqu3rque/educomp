import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { beforeAll, afterAll, expect, test } from "vitest";

const db=new PGlite();
const teacher="10000000-0000-4000-8000-000000000001";
const another="10000000-0000-4000-8000-000000000002";
const first="d3000000-0000-4000-8000-000000000001";
const second="d3000000-0000-4000-8000-000000000002";
const migrations=["202611080001_core.sql","202611080002_storage.sql","202611090003_auth_profiles.sql","202611090004_library.sql","202611090005_saved_materials.sql","202611110006_material_submissions.sql","202611110007_review_moderation.sql","202611110008_community.sql","202611110009_notifications.sql","202611110010_contact.sql","202611110011_profile_photo_resubmissions.sql","202611110012_library_showcase.sql"];

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
 await db.exec(`insert into auth.users(id) values ('${teacher}'),('${another}');`);
 for(const migration of migrations.slice(2))await db.exec(readFileSync(`supabase/migrations/${migration}`,"utf8"));
},30000);
afterAll(async()=>db.close());
async function asUser<T>(userId:string,run:()=>Promise<T>):Promise<T> {
 await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${userId}',false);`);
 try{return await run();}finally{await db.exec("reset role;select set_config('request.jwt.claim.sub','',false);");}
}
type Results={total:number;pages:number;page:number;items:{id:string;title:string;is_demo:boolean;type:string[];approach:string[]}[]};
const search=async(page=1,q="",types:string[]=[]) => (await db.query<{result:Results}>("select public.search_library(p_page=>$1,p_q=>$2,p_types=>$3) as result",[page,q,types])).rows[0].result;

test("os 24 exemplos estão no banco, sem se passarem por material publicado",async()=>{
 const count=(await db.query<{count:number}>("select count(*)::integer as count from public.catalog_examples")).rows[0].count;
 expect(count).toBe(24);
 expect((await db.query("select * from public.materials where id=$1",[first])).rows).toHaveLength(0);
 await db.exec("set role anon");
 try{
  const page1=await search();const page2=await search(2);
  expect(page1.total).toBe(24);expect(page1.pages).toBe(2);
  expect(page1.items).toHaveLength(12);expect(page2.items).toHaveLength(12);
  expect(page1.items[0]).toMatchObject({id:first,title:"Algoritmos no dia a dia",is_demo:true,type:["Sequência de atividades"]});
  expect(page1.items[1]).toMatchObject({id:second,title:"Privacidade e segurança na internet",is_demo:true,type:["Aula completa"]});
  expect(new Set([...page1.items,...page2.items].map(x=>x.id)).size).toBe(24);
  expect((await search(1,"privacidade",["Aula completa"])).items.map(x=>x.id)).toEqual([second]);
  await expect(db.exec(`insert into public.catalog_examples(id,position,title,description,keywords,objectives,year,type,stage,axis,approach) values(gen_random_uuid(),40,'X','Y',array['x'],'X','EF',array['Jogo'],array['Ensino Médio'],array['Cultura Digital'],array['Plugada'])`)).rejects.toThrow();
 }finally{await db.exec("reset role");}
});

test("salvos de exemplos usam RLS por usuário e aparecem em Salvos",async()=>{
 await asUser(teacher,async()=>{
  await db.query("insert into public.saved_catalog_examples(user_id,example_id) values($1,$2)",[teacher,first]);
  await expect(db.query("insert into public.saved_catalog_examples(user_id,example_id) values($1,$2)",[another,second])).rejects.toThrow();
  const results=(await db.query<{result:Results}>("select public.search_saved_library() as result")).rows[0].result;
  expect(results.total).toBe(1);expect(results.items[0].id).toBe(first);
 });
 await asUser(another,async()=>{
  expect((await db.query<{result:Results}>("select public.search_saved_library() as result")).rows[0].result.total).toBe(0);
  expect((await db.query("select * from public.saved_catalog_examples")).rows).toHaveLength(0);
 });
});

test("um material real aprovado substitui seu exemplo com mesmo título",async()=>{
 await db.exec("begin");
 try{
  await db.query(`insert into public.materials(submitted_by,title,description,authorship,keywords,approach,rights_confirmed,review_status,is_published)
  values($1,'Algoritmos no dia a dia','Um material real para testes.','Professora Teste',array['algoritmos'],'unplugged',true,'approved',true)`,[teacher]);
  await db.exec("set role anon");
  const result=await search();
  expect(result.total).toBe(24);
  expect(result.items[0]).toMatchObject({title:"Algoritmos no dia a dia",is_demo:false});
  expect(result.items.filter(item=>item.id===first)).toHaveLength(0);
 }finally{await db.exec("reset role;rollback");}
});
