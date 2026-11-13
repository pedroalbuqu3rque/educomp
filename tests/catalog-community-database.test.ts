import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { beforeAll, afterAll, expect, test } from "vitest";

const db = new PGlite();
const uploader = "38000000-0000-4000-8000-000000000001";
const contributor = "38000000-0000-4000-8000-000000000002";
const reviewer = "38000000-0000-4000-8000-000000000003";
const catalog = "d3000000-0000-4000-8000-000000000001";
const secondCatalog = "d3000000-0000-4000-8000-000000000002";
const published = "38000000-0000-4000-8000-000000000004";
const migrations = [
 "202611080001_core.sql", "202611080002_storage.sql", "202611090003_auth_profiles.sql",
 "202611090004_library.sql", "202611090005_saved_materials.sql",
 "202611110006_material_submissions.sql", "202611110007_review_moderation.sql",
 "202611110008_community.sql", "202611110009_notifications.sql", "202611110010_contact.sql",
 "202611110011_profile_photo_resubmissions.sql", "202611110012_library_showcase.sql",
 "202611130013_catalog_editorial.sql", "202611130014_catalog_community.sql",
];

beforeAll(async () => {
 await db.exec(`create role anon; create role authenticated; create schema auth;
  create table auth.users(id uuid primary key,raw_user_meta_data jsonb,email text,email_confirmed_at timestamptz);
  create function auth.uid() returns uuid language sql stable as $$
    select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
  grant usage on schema auth to anon,authenticated;
  grant execute on function auth.uid() to anon,authenticated;`);
 await db.exec(readFileSync(`supabase/migrations/${migrations[0]}`, "utf8"));
 await db.exec(`create schema storage;
  create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
  create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text,metadata jsonb);
  alter table storage.objects enable row level security;
  grant usage on schema storage to anon,authenticated;
  grant select,insert,delete on storage.objects to anon,authenticated;`);
 await db.exec(readFileSync(`supabase/migrations/${migrations[1]}`, "utf8"));
 await db.exec(`insert into auth.users(id) values ('${uploader}'),('${contributor}'),('${reviewer}');
  insert into public.reviewer_roles(user_id) values ('${reviewer}');`);
 for (const name of migrations.slice(2)) await db.exec(readFileSync(`supabase/migrations/${name}`, "utf8"));
 await db.exec(`insert into public.materials(id,submitted_by,title,description,authorship,keywords,approach,rights_confirmed,review_status,is_published)
 values ('${published}','${uploader}','Material publicado','Para discutir','Professor',array['computação'],'plugged',true,'approved',true);`);
}, 30000);

afterAll(async () => db.close());

async function asUser<T>(id: string, fn: () => Promise<T>): Promise<T> {
 await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub','${id}',false);`);
 try { return await fn(); }
 finally { await db.exec("reset role; select set_config('request.jwt.claim.sub','',false);"); }
}

async function catalogComment(author: string, body: string, parent: string | null = null) {
 return asUser(author, async () => {
  const response = await db.query<{ id: string }>(
   "select public.create_catalog_comment($1,$2,'discussion',$3) as id",
   [catalog, body, parent],
  );
  return response.rows[0].id;
 });
}

test("contribuições públicas do acervo não se misturam às dos materiais enviados", async () => {
 const catalogId = await catalogComment(uploader, "Como adaptar a sequência?");
 const materialId = await asUser(contributor, async () => {
  const result = await db.query<{ id: string }>(
   "select public.create_community_comment($1,$2) as id", [published, "Também usei cartões"],
  );
  return result.rows[0].id;
 });
 await db.exec("set role anon");
 try {
  const catalogRows = await db.query("select id from public.discussion_comments where catalog_example_id=$1", [catalog]);
  const materialRows = await db.query("select id from public.discussion_comments where material_id=$1", [published]);
  expect(catalogRows.rows).toHaveLength(1);
  expect(materialRows.rows).toHaveLength(1);
  expect(catalogRows.rows[0]).toMatchObject({ id: catalogId });
  expect(materialRows.rows[0]).toMatchObject({ id: materialId });
 } finally { await db.exec("reset role"); }
});

test("respostas do acervo não aceitam outra ficha, material docente ou segundo nível", async () => {
 const root = await catalogComment(uploader, "Troca de experiências");
 const reply = await catalogComment(contributor, "Trabalhei com grupos", root);
 await asUser(contributor, async () => {
  await expect(db.query("select public.create_catalog_comment($1,$2,'discussion',$3)", [secondCatalog, "Outra ficha", root])).rejects.toThrow();
  await expect(db.query("select public.create_catalog_comment($1,$2,'discussion',$3)", [catalog, "Outra camada", reply])).rejects.toThrow();
  await expect(db.query("select public.create_community_comment($1,$2,'discussion',$3)", [published, "Outro acervo", root])).rejects.toThrow();
 });
 const notices = await db.query<{ target_url: string }>(
  "select target_url from public.notifications where kind='comment_reply' and recipient_id=$1 order by created_at desc", [uploader],
 );
 expect(notices.rows.some(({ target_url }) => target_url.includes(`/materiais/${catalog}#`) || target_url.includes(`/materiais/${catalog}?`))).toBe(true);
});

test("somente o autor edita e não é permitido publicar em ficha desativada", async () => {
 const id = await catalogComment(uploader, "Versão inicial");
 await asUser(contributor, async () => {
  await expect(db.query("select public.edit_community_comment($1,$2)", [id, "Alteração indevida"])).rejects.toThrow();
  await expect(db.query("insert into public.discussion_comments(catalog_example_id,author_id,body) values($1,$2,'Direto')", [catalog, contributor])).rejects.toThrow();
 });
 await asUser(uploader, async () => {
  await db.query("select public.edit_community_comment($1,$2)", [id, "Versão revisada"]);
 });
 expect((await db.query<{ body: string }>("select body from public.discussion_comments where id=$1", [id])).rows[0].body).toBe("Versão revisada");
 await db.query("update public.catalog_examples set is_active=false where id=$1", [secondCatalog]);
 await asUser(contributor, async () => {
  await expect(db.query("select public.create_catalog_comment($1,'Não disponível')", [secondCatalog])).rejects.toThrow();
 });
 await db.query("update public.catalog_examples set is_active=true where id=$1", [secondCatalog]);
});

test("denúncias sobre o acervo seguem a moderação existente e notificam o denunciante", async () => {
 const id = await catalogComment(uploader, "Comentário que precisa de revisão");
 const report = await asUser(contributor, async () => {
  const result = await db.query<{ id: string }>("select public.report_comment($1,'spam','Fora do tema') as id", [id]);
  return result.rows[0].id;
 });
 await asUser(reviewer, async () => {
  await db.query("select public.moderate_report($1,'start')", [report]);
  await db.query("select public.moderate_report($1,'hide','Ocultado depois de avaliação editorial')", [report]);
 });
 await db.exec("set role anon");
 try { expect((await db.query("select id from public.discussion_comments where id=$1", [id])).rows).toHaveLength(0); }
 finally { await db.exec("reset role"); }
 const result = await db.query<{ target_url: string }>(
  "select target_url from public.notifications where recipient_id=$1 and kind='report_resolved'", [contributor],
 );
 expect(result.rows.some(({ target_url }) => target_url === `/materiais/${catalog}#comunidade`)).toBe(true);
});
