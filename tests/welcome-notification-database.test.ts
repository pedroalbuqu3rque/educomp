import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { afterAll, beforeAll, expect, test } from "vitest";

const db = new PGlite();
const existing = "75000000-0000-4000-8000-000000000001";
const newcomer = "75000000-0000-4000-8000-000000000002";
const migration = "supabase/migrations/202611130015_welcome_notification.sql";
const prerequisites = [
 "202611080001_core.sql", "202611080002_storage.sql", "202611090003_auth_profiles.sql",
 "202611090004_library.sql", "202611090005_saved_materials.sql",
 "202611110006_material_submissions.sql", "202611110007_review_moderation.sql",
 "202611110008_community.sql", "202611110009_notifications.sql",
 "202611110010_contact.sql", "202611110011_profile_photo_resubmissions.sql",
];

beforeAll(async () => {
 await db.exec(`create role anon; create role authenticated; create schema auth;
  create table auth.users(id uuid primary key,raw_user_meta_data jsonb,email text,email_confirmed_at timestamptz);
  create function auth.uid() returns uuid language sql stable as $$
   select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
  grant usage on schema auth to anon,authenticated;
  grant execute on function auth.uid() to anon,authenticated;`);
 await db.exec(readFileSync(`supabase/migrations/${prerequisites[0]}`, "utf8"));
 await db.exec(`create schema storage;
  create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
  create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text,metadata jsonb);
  alter table storage.objects enable row level security;
  grant usage on schema storage to anon,authenticated;
  grant select,insert,delete on storage.objects to anon,authenticated;`);
 await db.exec(readFileSync(`supabase/migrations/${prerequisites[1]}`, "utf8"));
 await db.query("insert into auth.users(id,raw_user_meta_data) values($1,$2)",
  [existing, JSON.stringify({display_name:"Professor antigo"})]);
 for (const file of prerequisites.slice(2)) await db.exec(readFileSync(`supabase/migrations/${file}`, "utf8"));
 await db.exec(readFileSync(migration, "utf8"));
}, 30_000);

afterAll(async () => { await db.close(); });

test("perfis existentes recebem uma única mensagem de boas-vindas", async () => {
 const rows = await db.query<{event_key:string;kind:string;target_url:string;read_at:string|null}>(
  "select event_key,kind,target_url,read_at from public.notifications where recipient_id=$1", [existing],
 );
 expect(rows.rows).toEqual([{event_key:"welcome:v1",kind:"welcome",target_url:"/biblioteca",read_at:null}]);
});

test("novas contas recebem o aviso automaticamente, sem privilégio editorial", async () => {
 await db.query("insert into auth.users(id,raw_user_meta_data) values($1,$2)",
  [newcomer,JSON.stringify({display_name:"Novo professor"})]);
 expect((await db.query("select id from public.profiles where id=$1",[newcomer])).rows).toHaveLength(1);
 const notifications = await db.query<{kind:string;title:string}>(
  "select kind,title from public.notifications where recipient_id=$1",[newcomer]);
 expect(notifications.rows).toEqual([{kind:"welcome",title:"Boas-vindas ao EduComp"}]);
 expect((await db.query("select user_id from public.reviewer_roles where user_id=$1",[newcomer])).rows).toHaveLength(0);
});

test("reaplicar o SQL não duplica mensagens", async () => {
 await db.exec(readFileSync(migration,"utf8"));
 const rows = await db.query<{recipient_id:string;total:number}>(
  "select recipient_id,count(*)::int as total from public.notifications where event_key='welcome:v1' group by recipient_id order by recipient_id");
 expect(rows.rows).toEqual([
  {recipient_id:existing,total:1}, {recipient_id:newcomer,total:1},
 ]);
});

test("uma conta não pode ler as boas-vindas da outra nem forjar novos avisos", async () => {
 await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub','${newcomer}',false);`);
 try {
  const visible = await db.query<{recipient_id:string}>("select recipient_id from public.notifications");
  expect(visible.rows).toEqual([{recipient_id:newcomer}]);
  await expect(db.query("insert into public.notifications(recipient_id,event_key,kind,title,body) values($1,'fake','welcome','Teste','Aviso falso')",[newcomer])).rejects.toThrow();
 } finally {
  await db.exec("reset role; select set_config('request.jwt.claim.sub','',false);");
 }
});
