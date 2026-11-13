import { beforeEach, expect, test, vi } from "vitest";
import { NextRequest } from "next/server";

const { client, query } = vi.hoisted(() => {
  const query = { select: vi.fn(), eq: vi.fn(), maybeSingle: vi.fn() };
  const client = { auth: { getUser: vi.fn() }, from: vi.fn() };
  return { client, query };
});

vi.mock("@/lib/supabase/server", () => ({ createClient: async () => client }));

import { GET } from "../src/app/api/biblioteca/arquivos/[id]/route";

const id = "d3000000-0000-4000-8000-000000000001";
function request(materialId = id, suffix = "") {
  const url = new NextRequest(`http://localhost:3000/api/biblioteca/arquivos/${materialId}${suffix}`);
  return GET(url, { params: Promise.resolve({ id: materialId }) });
}

beforeEach(() => {
  vi.resetAllMocks();
  query.select.mockReturnValue(query);
  query.eq.mockReturnValue(query);
  query.maybeSingle.mockResolvedValue({ data: { id }, error: null });
  client.from.mockReturnValue(query);
  client.auth.getUser.mockResolvedValue({ data: { user: { id: "user" } }, error: null });
});

test("visitante nao recebe o PDF e segue para a tela de login", async () => {
  client.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });
  const response = await request();
  expect(response.status).toBe(307);
  expect(response.headers.get("location")).toContain("/entrar?next=%2Fmateriais%2F");
  expect(response.headers.get("cache-control")).toBe("private, no-store");
  expect(client.from).not.toHaveBeenCalled();
});

test("ID desconhecido nao permite buscar arquivos", async () => {
  const response = await request("../../etc/passwd");
  expect(response.status).toBe(404);
  expect(client.auth.getUser).not.toHaveBeenCalled();
});

test("material institucional inativo nao pode ser baixado", async () => {
  query.maybeSingle.mockResolvedValue({ data: null, error: null });
  expect((await request()).status).toBe(404);
  expect(query.eq).toHaveBeenCalledWith("is_active", true);
});

test("usuario autenticado pode visualizar o PDF sem cache publico", async () => {
  const response = await request();
  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toBe("application/pdf");
  expect(response.headers.get("content-disposition")).toContain("inline;");
  expect(response.headers.get("cache-control")).toBe("private, no-store");
  expect(response.headers.get("x-content-type-options")).toBe("nosniff");
  expect(Buffer.from(await response.arrayBuffer()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("download exige autenticacao e envia PDF como anexo", async () => {
  const response = await request(id, "?download=1");
  expect(response.status).toBe(200);
  expect(response.headers.get("content-disposition")).toContain("attachment;");
});

test("falha ao consultar o acervo nao expoe detalhes internos", async () => {
  query.maybeSingle.mockResolvedValue({ data: null, error: { message: "internal DB issue" } });
  const response = await request();
  expect(response.status).toBe(503);
  expect(await response.text()).not.toContain("internal DB issue");
});
