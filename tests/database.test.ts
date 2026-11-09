import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { beforeAll, afterAll, expect, test } from "vitest";
const db = new PGlite();
const owner = "00000000-0000-0000-0000-000000000001";
const other = "00000000-0000-0000-0000-000000000002";
const reviewer = "00000000-0000-0000-0000-000000000003";
const material = "10000000-0000-0000-0000-000000000001";
beforeAll(async () => {
 await db.exec(`create role anon; create role authenticated; create schema auth;
 create table auth.users(id uuid primary key,raw_user_meta_data jsonb,email text,email_confirmed_at timestamptz);
 create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
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
 await db.exec(`insert into auth.users(id) values ('${owner}'),('${other}'),('${reviewer}');
 insert into public.reviewer_roles values ('${reviewer}');
 insert into public.materials(id,submitted_by,title,description,authorship,keywords,approach,rights_confirmed)
 values('${material}','${owner}','Blocos','Atividade','Autor',array['sequência'],'unplugged',true);`);
 await db.exec(readFileSync("supabase/migrations/202611090003_auth_profiles.sql", "utf8"));
 await db.exec(readFileSync("supabase/migrations/202611090004_library.sql", "utf8"));
 await db.exec(readFileSync("supabase/migrations/202611090005_saved_materials.sql", "utf8"));
}, 30000);
afterAll(async () => { await db.close(); });
async function asUser<T>(id: string, work: () => Promise<T>) {
 await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub','${id}',false);`);
 try { return await work(); } finally { await db.exec("reset role; select set_config('request.jwt.claim.sub','',false);"); }
}
test("RLS: visitante e outra conta não veem pendente; autor e revisor veem", async () => {
 await db.exec("set role anon");
 try { expect((await db.query("select * from public.materials")).rows).toHaveLength(0); }
 finally { await db.exec("reset role"); }
 for (const [id,count] of [[owner,1],[other,0],[reviewer,1]] as const) {
  await asUser(id,async()=>expect((await db.query("select * from public.materials")).rows).toHaveLength(count));
 }
});
test("conta comum não promove papel, altera status nem revisa", async () => {
 await asUser(owner, async () => {
  await expect(db.exec(`insert into public.reviewer_roles values ('${owner}')`)).rejects.toThrow();
  await expect(db.exec(`update public.materials set is_published=true where id='${material}'`)).rejects.toThrow();
  await expect(db.query("select public.review_material($1,'start')",[material])).rejects.toThrow();
 });
});
test("revisão exige sequência, motivo e arquivo; aprovação não publica; histórico é protegido", async () => {
 await asUser(reviewer, async () => {
  await expect(db.query("select public.review_material($1,'approve')",[material])).rejects.toThrow();
  await db.query("select public.review_material($1,'start')",[material]);
  await expect(db.query("select public.review_material($1,'reject','  ')",[material])).rejects.toThrow();
  await db.query("select public.review_material($1,'approve')",[material]);
  expect((await db.query<{is_published:boolean}>("select is_published from public.materials")).rows[0].is_published).toBe(false);
  await expect(db.query("select public.review_material($1,'publish')",[material])).rejects.toThrow();
  await expect(db.exec("delete from public.review_events")).rejects.toThrow();
 });
 await db.exec(`insert into public.material_files(material_id,object_path,original_name,mime_type,size_bytes) values('${material}','test/file.pdf','file.pdf','application/pdf',20);`);
 await asUser(reviewer,()=>db.query("select public.review_material($1,'publish')",[material]));
 await db.exec("set role anon");
 try { expect((await db.query("select * from public.materials")).rows).toHaveLength(1); }
 finally { await db.exec("reset role"); }
 expect((await db.query("select * from public.review_events")).rows).toHaveLength(3);
});
test("favoritos são privados e não aceitam duplicação nem escrita em outra conta", async () => {
 await asUser(owner, async()=> {
  await db.query("insert into public.saved_materials(material_id) values($1)",[material]);
  await expect(db.query("insert into public.saved_materials(material_id) values($1)",[material])).rejects.toThrow();
  await expect(db.query("insert into public.saved_materials(user_id,material_id) values($1,$2)",[other,material])).rejects.toThrow();
 });
 await asUser(other,async()=>expect((await db.query("select * from public.saved_materials")).rows).toHaveLength(0));
});

test("Storage exige sessão e visibilidade do material; retirada revoga acesso público", async () => {
 await db.exec("insert into storage.objects(bucket_id,name) values('materials','test/file.pdf')");
 await db.exec("set role anon");
 try { expect((await db.query("select * from storage.objects")).rows).toHaveLength(0); }
 finally { await db.exec("reset role"); }
 await asUser(other,async()=>expect((await db.query("select * from storage.objects")).rows).toHaveLength(1));
 await asUser(reviewer,()=>db.query("select public.review_material($1,'unpublish')",[material]));
 await asUser(other,async()=>expect((await db.query("select * from storage.objects")).rows).toHaveLength(0));
 await asUser(owner,async()=>expect((await db.query("select * from storage.objects")).rows).toHaveLength(1));
});

test("cadastro cria perfil, limita nome e não promove papel", async () => {
 const id = "00000000-0000-0000-0000-000000000009";
 await db.query("insert into auth.users(id,raw_user_meta_data) values($1,$2)",[id,JSON.stringify({display_name:"a".repeat(150),role:"reviewer"})]);
 expect((await db.query<{display_name:string}>("select display_name from public.profiles where id=$1",[id])).rows[0].display_name).toHaveLength(120);
 expect((await db.query("select * from public.reviewer_roles where user_id=$1",[id])).rows).toHaveLength(0);
 expect((await db.query("select * from public.profiles where id=$1",[owner])).rows).toHaveLength(1);
});

test("busca real pagina no banco e não revela rascunhos ao próprio autor", async () => {
 await db.exec("begin");
 try {
  await db.query(`insert into public.materials(submitted_by,title,description,authorship,keywords,approach,rights_confirmed,review_status,is_published)
   select $1,'Lógica testeacervo '||n,'Descrição','Autora',array['algoritmos'],'both',true,'approved',true from generate_series(1,25) n`,[owner]);
  await db.query(`insert into public.materials(submitted_by,title,description,authorship,keywords,approach,rights_confirmed) values($1,'Lógica testeacervo secreto','Descrição','Autora',array['algoritmos'],'both',true)`,[owner]);
  await db.exec(`insert into public.material_taxonomies select m.id,t.id from public.materials m cross join public.taxonomies t where m.title like 'Lógica testeacervo%' and ((t.category='type' and t.label='Jogo') or (t.category='axis' and t.label='Pensamento Computacional'))`);
  type Result={total:number;page:number;pages:number;items:{id:string;title:string}[]};
  const search=async(page:number,types:string[]=[])=> (await db.query<{result:Result}>("select public.search_library(p_q=>$1,p_page=>$2,p_types=>$3) as result",["LOGICA testeacervo algoritmos",page,types])).rows[0].result;
  await db.exec("set role anon");
  const first=await search(1);const second=await search(2);const last=await search(999);
  expect(first.total).toBe(25);expect(first.items).toHaveLength(12);expect(last.page).toBe(3);expect(last.items).toHaveLength(1);
  expect(new Set([...first.items,...second.items,...last.items].map(m=>m.id)).size).toBe(25);
  expect((await search(1,['Jogo','Atividade'])).total).toBe(25);
  expect((await search(1,['Slides'])).total).toBe(0);
  await db.exec("reset role");
  await asUser(owner,async()=>expect((await search(1)).total).toBe(25));
  await asUser(reviewer,async()=>expect((await search(1)).total).toBe(25));
 } finally {await db.exec("reset role; rollback");}
});
test("importação administrativa exige confirmação, arquivo e cadastro único",async()=>{
 const script=readFileSync("supabase/admin/cadastrar-primeiro-material.sql","utf8");
 await expect(db.exec(script)).rejects.toThrow("Confirme os direitos");await db.exec("rollback");
 const filled=script.replace("PREENCHA O EMAIL DA SUA CONTA EDUCOMP","admin@example.com").replace("PREENCHA O TITULO","Material real").replace("PREENCHA A DESCRICAO","Descrição real").replace("PREENCHA O NOME DO AUTOR","Autor real").replace("PREENCHA AS PALAVRAS CHAVE","computação").replace("PREENCHA OS OBJETIVOS DE APRENDIZAGEM","Aprender lógica").replace("PREENCHA O CAMINHO EXATO DENTRO DO BUCKET materials","real.pdf").replace("direitos_confirmados boolean := false","direitos_confirmados boolean := true").replace("revisado_e_aprovado boolean := false","revisado_e_aprovado boolean := true");
 await db.query("update auth.users set email='admin@example.com',email_confirmed_at=now() where id=$1",[owner]);
 await expect(db.exec(filled)).rejects.toThrow("Arquivo não encontrado");await db.exec("rollback");
 await db.exec(`insert into storage.objects(bucket_id,name,metadata) values('materials','real.pdf','{"size":500,"mimetype":"application/pdf"}')`);
 await db.exec(filled);
 expect((await db.query("select * from public.materials where title='Material real' and is_published")).rows).toHaveLength(1);
 await expect(db.exec(filled)).rejects.toThrow("já está cadastrado");await db.exec("rollback");
});

test("coleção pessoal usa identidade da sessão, pagina e oculta despublicados",async()=>{
 await db.exec("begin");
 try {
  await db.query(`insert into public.materials(submitted_by,title,description,authorship,keywords,approach,rights_confirmed,review_status,is_published)
   select $1,'Favorito privado '||n,'Descrição','Autor',array['teste'],'unplugged',true,'approved',true from generate_series(1,14) n`,[owner]);
  await db.query(`insert into public.saved_materials(user_id,material_id) select $1,id from public.materials where title like 'Favorito privado%'`,[owner]);
  await db.exec(`insert into public.material_taxonomies select m.id,t.id from public.materials m cross join public.taxonomies t where m.title like 'Favorito privado%' and t.category='type' and t.label='Atividade'`);
  type Result={total:number;page:number;items:{id:string}[]};
  const search=async(page=1,types:string[]=[]) => (await db.query<{r:Result}>("select public.search_saved_library(p_q=>'favorito privado',p_page=>$1,p_types=>$2) r",[page,types])).rows[0].r;
  await db.exec("savepoint visitor; set role anon");await expect(search()).rejects.toThrow();await db.exec("rollback to savepoint visitor; reset role");
  await asUser(other,async()=>expect((await search()).total).toBe(0));
  await asUser(reviewer,async()=>expect((await search()).total).toBe(0));
  let firstId="";
  await asUser(owner,async()=>{
   const first=await search();const last=await search(999);firstId=first.items[0].id;
   expect(first.total).toBe(14);expect(first.items).toHaveLength(12);expect(last.items).toHaveLength(2);expect(last.page).toBe(2);
   expect(new Set([...first.items,...last.items].map(m=>m.id)).size).toBe(14);
   expect((await search(1,['Slides'])).total).toBe(0);expect((await search(1,['Atividade'])).total).toBe(14);
  });
  await asUser(other,()=>db.query("delete from public.saved_materials where user_id=$1 and material_id=$2",[owner,firstId]));
  await asUser(owner,async()=>expect((await search()).total).toBe(14));
  await db.query("update public.materials set is_published=false where id=$1",[firstId]);
  await asUser(owner,async()=>{
   expect((await search()).total).toBe(13);
   await db.query("delete from public.saved_materials where user_id=$1 and material_id=$2",[owner,firstId]);
   await db.exec("savepoint denied_insert");
   await expect(db.query("insert into public.saved_materials(material_id) values($1)",[firstId])).rejects.toThrow();
   await db.exec("rollback to savepoint denied_insert");
  });
 }finally{await db.exec("reset role; rollback");}
});
