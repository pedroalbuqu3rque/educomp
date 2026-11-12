import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { afterAll, beforeAll, expect, test } from "vitest";

const db = new PGlite();
const author = "00000000-0000-0000-0000-000000000001";
const stranger = "00000000-0000-0000-0000-000000000002";
const reviewer = "00000000-0000-0000-0000-000000000003";
const materialId = "10000000-0000-0000-0000-000000000011";
const filePath = `${author}/${materialId}/atividade.pdf`;

beforeAll(async () => {
 await db.exec(`create role anon; create role authenticated; create schema auth;
  create table auth.users(id uuid primary key,raw_user_meta_data jsonb,email text,email_confirmed_at timestamptz);
  create function auth.uid() returns uuid language sql stable as $$
   select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
  grant usage on schema auth to anon,authenticated;
  grant execute on function auth.uid() to anon,authenticated;`);
 await db.exec(readFileSync("supabase/migrations/202611080001_core.sql", "utf8"));
 await db.exec(`create schema storage;
  create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
  create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text,metadata jsonb);
  alter table storage.objects enable row level security;
  grant usage on schema storage to anon,authenticated;
  grant select on storage.objects to anon,authenticated;`);
 await db.exec(readFileSync("supabase/migrations/202611080002_storage.sql", "utf8"));
 await db.exec(`insert into auth.users(id) values ('${author}'),('${stranger}'),('${reviewer}');
  insert into public.reviewer_roles(user_id) values('${reviewer}');`);
 for (const path of [
  "202611090003_auth_profiles.sql",
  "202611090004_library.sql",
  "202611090005_saved_materials.sql",
  "202611110006_material_submissions.sql",
 ]) await db.exec(readFileSync(`supabase/migrations/${path}`, "utf8"));
}, 30000);
afterAll(async () => { await db.close(); });

async function asUser<T>(id: string, fn: () => Promise<T>): Promise<T> {
 await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub','${id}',false);`);
 try { return await fn(); }
 finally { await db.exec("reset role; select set_config('request.jwt.claim.sub','',false);"); }
}

test("envio mantém material privado até a revisão e a publicação", async () => {
 await asUser(stranger, async () => {
  await expect(db.query(`insert into public.materials(id,submitted_by,title,description,authorship,keywords,approach,rights_confirmed,review_status)
   values($1,$2,'Teste','Descrição','Autora',array['lógica'],'unplugged',true,'draft')`, [materialId, author])).rejects.toThrow();
 });
 await asUser(author, async () => {
  await db.query(`insert into public.materials(id,submitted_by,title,description,authorship,keywords,approach,rights_confirmed,review_status)
   values($1,$2,'Desafio dos algoritmos','Sequência de atividades','Autor',array['lógica'],'unplugged',true,'draft')`, [materialId, author]);
  await db.query(`insert into public.material_taxonomies(material_id,taxonomy_id)
   select $1,id from public.taxonomies where (category='type' and label='Jogo')
   or (category='stage' and label='Ensino Fundamental — Anos iniciais')
   or (category='grade' and label='4º ano')
   or (category='axis' and label='Pensamento Computacional')`, [materialId]);
  await expect(db.query("select public.submit_material($1)", [materialId])).rejects.toThrow();
  await db.query(`insert into public.material_files(material_id,object_path,original_name,mime_type,size_bytes)
   values($1,$2,'atividade.pdf','application/pdf',25)`, [materialId, filePath]);
  await expect(db.query("select public.submit_material($1)", [materialId])).rejects.toThrow();
  await db.query("insert into storage.objects(bucket_id,name) values('materials',$1)", [filePath]);
  await db.query("select public.submit_material($1)", [materialId]);
  const result = await db.query<{review_status:string;is_published:boolean}>(
   "select review_status,is_published from public.materials where id=$1", [materialId]);
  expect(result.rows[0]).toMatchObject({review_status:"pending",is_published:false});
  await expect(db.query("select public.submit_material($1)", [materialId])).rejects.toThrow();
  await expect(db.query("update public.materials set is_published=true where id=$1", [materialId])).rejects.toThrow();
 });
 await db.exec("set role anon");
 try { expect((await db.query("select id from public.materials")).rows).toHaveLength(0); }
 finally { await db.exec("reset role"); }
 await asUser(stranger, async () => {
  expect((await db.query("select id from public.materials")).rows).toHaveLength(0);
  expect((await db.query("select name from storage.objects")).rows).toHaveLength(0);
 });
 await asUser(reviewer, async () => {
  await db.query("select public.review_material($1,'start')", [materialId]);
  await db.query("select public.review_material($1,'approve')", [materialId]);
  expect((await db.query<{is_published:boolean}>("select is_published from public.materials where id=$1", [materialId])).rows[0].is_published).toBe(false);
  await db.query("select public.review_material($1,'publish')", [materialId]);
 });
 await asUser(stranger, async () => {
  expect((await db.query("select id from public.materials")).rows).toHaveLength(1);
  expect((await db.query("select name from storage.objects")).rows).toHaveLength(1);
 });
});
