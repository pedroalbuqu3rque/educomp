import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const db = new PGlite();
const id = "d20a6c55-2f11-4a33-bf56-f0ab1406ef2a";

beforeAll(async () => {
  await db.exec(`
    create role anon;
    create role authenticated;
    create schema auth;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as
      $$select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid$$;
    grant usage on schema auth, public to anon, authenticated;
    grant execute on function auth.uid() to anon, authenticated;
    insert into auth.users(id) values('${id}');
  `);
  await db.exec(readFileSync("supabase/migrations/202611110010_contact.sql", "utf8"));
}, 30000);
afterAll(async () => { await db.close(); });

async function asRole<T>(role: "anon" | "authenticated", callback: () => Promise<T>, userId = "") {
  await db.exec(`set role ${role}; select set_config('request.jwt.claim.sub', '${userId}', false);`);
  try { return await callback(); }
  finally { await db.exec("reset role; select set_config('request.jwt.claim.sub', '', false);"); }
}

const submit = () => db.query<{ id: string }>(
  "select public.submit_contact_message($1,$2,$3,$4) as id",
  ["Maria Silva", "maria@escola.org", "Dúvida", "Preciso de ajuda para acessar os materiais."],
);

describe("mensagens de contato e privacidade do banco", () => {
  it("visitante pode enviar mas não listar, atualizar ou apagar mensagens", async () => {
    await asRole("anon", async () => {
      expect((await submit()).rows[0].id).toMatch(/^[0-9a-f-]{36}$/);
      await expect(db.query("select * from public.contact_messages")).rejects.toThrow();
      await expect(db.query("delete from public.contact_messages")).rejects.toThrow();
    });
  });
  it("vincula a conta autenticada sem conceder leitura de mensagens", async () => {
    await asRole("authenticated", async () => {
      await db.query("select public.submit_contact_message($1,$2,$3,$4)",
        ["Docente", "professor@escola.org", "Conta", "Minha conta não está carregando corretamente."]);
      await expect(db.query("select * from public.contact_messages")).rejects.toThrow();
    }, id);
    const result = await db.query<{ user_id: string }>("select user_id from public.contact_messages where email = 'professor@escola.org'");
    expect(result.rows[0].user_id).toBe(id);
  });
  it("rejeita dados inválidos e limita mensagens de um mesmo e-mail a três em 24 horas", async () => {
    await asRole("anon", async () => {
      await expect(db.query("select public.submit_contact_message($1,$2,$3,$4)",
        ["M", "invalido", "Oi", "Curta"])) .rejects.toThrow();
      await submit();
      await submit();
      await expect(submit()).rejects.toThrow(/Contact rate limit/);
    });
  });
});
