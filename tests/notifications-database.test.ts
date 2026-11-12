import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { afterAll, beforeAll, expect, test } from "vitest";

const db=new PGlite();
const author="49000000-0000-0000-0000-000000000001";
const reader="49000000-0000-0000-0000-000000000002";
const reviewer="49000000-0000-0000-0000-000000000003";
const other="49000000-0000-0000-0000-000000000004";
const material="49000000-0000-0000-0000-000000000011";
const secondMaterial="49000000-0000-0000-0000-000000000012";
const migrations=["202611080001_core.sql","202611080002_storage.sql","202611090003_auth_profiles.sql", "202611090004_library.sql","202611090005_saved_materials.sql", "202611110006_material_submissions.sql","202611110007_review_moderation.sql","202611110008_community.sql","202611110009_notifications.sql"];

beforeAll(async()=>{
 await db.exec(`create role anon;create role authenticated;create schema auth;
  create table auth.users(id uuid primary key,raw_user_meta_data jsonb,email text,email_confirmed_at timestamptz);
  create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
  grant usage on schema auth to anon,authenticated;grant execute on function auth.uid() to anon,authenticated;`);
 await db.exec(readFileSync(`supabase/migrations/${migrations[0]}`,"utf8"));
 await db.exec(`create schema storage;
  create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
  create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text,metadata jsonb);
  alter table storage.objects enable row level security;
  grant usage on schema storage to anon,authenticated;grant select on storage.objects to anon,authenticated;`);
 await db.exec(readFileSync(`supabase/migrations/${migrations[1]}`,"utf8"));
 await db.exec(`insert into auth.users(id) values('${author}'),('${reader}'),('${reviewer}'),('${other}');
  insert into public.reviewer_roles(user_id) values('${reviewer}');`);
 for(const migration of migrations.slice(2))await db.exec(readFileSync(`supabase/migrations/${migration}`,"utf8"));
 await db.exec(`insert into public.materials(id,submitted_by,title,description,authorship,keywords,approach,rights_confirmed,review_status)
  values('${material}','${author}','Material publicado em breve','Material de teste','Professor(a)',array['lógica'],'unplugged',true,'pending'),
  ('${secondMaterial}','${author}','Outro material','Material em elaboração','Professor(a)',array['lógica'],'plugged',true,'draft');
  insert into public.material_files(material_id,object_path,original_name,mime_type,size_bytes)
  values('${material}','${author}/${material}/material.pdf','material.pdf','application/pdf',1234);`);
},30_000);
afterAll(async()=>{await db.close();});
async function asUser<T>(uid:string,fn:()=>Promise<T>):Promise<T>{
 await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${uid}',false);`);
 try{return await fn();}finally{await db.exec("reset role;select set_config('request.jwt.claim.sub','',false);");}
}
async function inbox(id:string){return asUser(id,async()=>{
 const result=await db.query<{kind:string;title:string;id:string;read_at:string|null}>("select id,kind,title,read_at from public.notifications order by created_at,id");
 return result.rows;
});}

test("envio gera avisos apenas ao autor e aos revisores, sem publicação pública",async()=>{
 await db.exec(`update public.materials set review_status='pending' where id='${secondMaterial}';`);
 expect((await inbox(author)).map(x=>x.kind)).toContain("material_submitted");
 expect((await inbox(reviewer)).map(x=>x.kind)).toContain("review_pending");
 expect(await inbox(reader)).toHaveLength(0);
});

test("mudanças editoriais diferenciam aprovação e publicação, sem enviar avisos duplicados",async()=>{
 await asUser(reviewer,async()=>{
  await db.query("select public.review_material($1,'start')",[material]);
  await db.query("select public.review_material($1,'approve')",[material]);
 });
 expect((await inbox(author)).map(x=>x.kind)).toContain("material_approved");
 expect((await inbox(reader)).map(x=>x.kind)).not.toContain("new_material");
 await asUser(reviewer,async()=>await db.query("select public.review_material($1,'publish')",[material]));
 expect((await inbox(author)).map(x=>x.kind)).toContain("material_published");
 expect((await inbox(reader)).filter(x=>x.kind==="new_material")).toHaveLength(1);
 await asUser(reviewer,async()=>{
  await db.query("select public.review_material($1,'unpublish')",[material]);
  await db.query("select public.review_material($1,'publish')",[material]);
 });
 expect((await inbox(reader)).filter(x=>x.kind==="new_material")).toHaveLength(1);
});

test("respostas e comentários disparam avisos apenas ao destinatário relacionado",async()=>{
 let post="";
 await asUser(reader,async()=>{
  post=(await db.query<{id:string}>("select public.create_community_comment($1,$2) as id",[material,"Que bom material!"])).rows[0].id;
 });
 expect((await inbox(author)).map(x=>x.kind)).toContain("material_comment");
 await asUser(author,async()=>await db.query("select public.create_community_comment($1,$2,'discussion',$3)",[material,"Obrigado pelo comentário!",post]));
 expect((await inbox(reader)).map(x=>x.kind)).toContain("comment_reply");
 expect((await inbox(other)).map(x=>x.kind)).not.toContain("comment_reply");
});

test("RLS protege caixas de entrada, marcação de leitura e alterações do próprio usuário",async()=>{
 const own=await inbox(author);
 const readerItems=await inbox(reader);
 expect(own.length).toBeGreaterThan(1);
 expect(readerItems.length).toBeGreaterThan(0);
 const target=own[0].id;
 await asUser(reader,async()=>{
  expect((await db.query("select id from public.notifications where id=$1",[target])).rows).toHaveLength(0);
  const result=await db.query<{set_notification_read:boolean}>("select public.set_notification_read($1,true)",[target]);
  expect(result.rows[0].set_notification_read).toBe(false);
  await expect(db.query("update public.notifications set read_at=now() where id=$1",[readerItems[0].id])).rejects.toThrow();
  await expect(db.query("insert into public.notifications(recipient_id,event_key,kind,title,body) values($1,'spoof','announcement','Falso','Mensagem falsa')",[reader])).rejects.toThrow();
 });
 await asUser(author,async()=>{
  expect((await db.query<{set_notification_read:boolean}>("select public.set_notification_read($1,true)",[target])).rows[0].set_notification_read).toBe(true);
  expect((await db.query<{read_at:string|null}>("select read_at from public.notifications where id=$1",[target])).rows[0].read_at).not.toBeNull();
  await db.query("select public.set_notification_read($1,false)",[target]);
  expect((await db.query<{read_at:string|null}>("select read_at from public.notifications where id=$1",[target])).rows[0].read_at).toBeNull();
  const affected=await db.query<{mark_all_notifications_read:number}>("select public.mark_all_notifications_read()");
  expect(affected.rows[0].mark_all_notifications_read).toBeGreaterThan(0);
  expect((await db.query("select id from public.notifications where read_at is null")).rows).toHaveLength(0);
 });
 expect((await inbox(reader)).some(x=>x.read_at===null)).toBe(true);
 await db.exec("set role anon");
 try{await expect(db.query("select id from public.notifications")).rejects.toThrow();}
 finally{await db.exec("reset role");}
});

test("comunicados são apenas administrativos e disparados uma vez",async()=>{
 await asUser(reader,async()=>await expect(db.query("insert into public.platform_announcements(title,body) values('Novo','Comunicado')")).rejects.toThrow());
 const res=await db.query<{id:string}>("insert into public.platform_announcements(title,body,target_url) values('Novidades do EduComp','Uma nova versão está disponível.','/biblioteca') returning id");
 const announcement=res.rows[0].id;
 expect((await inbox(reader)).filter(x=>x.kind==="announcement")).toHaveLength(0);
 await db.query("update public.platform_announcements set published_at=now() where id=$1",[announcement]);
 expect((await inbox(reader)).filter(x=>x.kind==="announcement")).toHaveLength(1);
 await db.query("update public.platform_announcements set published_at=now() where id=$1",[announcement]);
 expect((await inbox(reader)).filter(x=>x.kind==="announcement")).toHaveLength(1);
});
