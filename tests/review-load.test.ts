import { beforeEach, expect, test, vi } from "vitest";
vi.mock("server-only", () => ({}));
vi.mock("@/lib/auth/user", () => ({ currentUser: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient: vi.fn() }));
import { reportDetail } from "../src/lib/review/load";

const report = { id: "report", comment_id: "comment", status: "pending", reason: "spam" };
const rows: Record<string, unknown[]> = {};
const calls: [string, string, unknown[]][] = [];
const client = {
  from(table: string) {
    const query: Record<string, unknown> = {};
    for (const method of ["select", "eq", "in", "order"]) {
      query[method] = (...args: unknown[]) => {
        calls.push([table, method, args]);
        return query;
      };
    }
    query.maybeSingle = async () => ({ data: rows[table]?.[0] ?? null, error: null });
    query.then = (resolve: (result: unknown) => void) =>
      resolve({ data: rows[table] ?? [], error: null });
    return query;
  },
} as unknown as Parameters<typeof reportDetail>[0];

beforeEach(() => {
  calls.length = 0;
  for (const key of Object.keys(rows)) delete rows[key];
  rows.comment_reports = [report];
});

test("denúncia do acervo mantém título e vínculo sem consultar UUID nulo", async () => {
  rows.discussion_comments = [
    {
      id: "comment",
      body: "Texto",
      visibility: "visible",
      material_id: null,
      catalog_example_id: "catalog",
    },
  ];
  rows.catalog_examples = [{ id: "catalog", title: "Desafio dos algoritmos" }];
  const result = await reportDetail(client, "report");
  expect(result.material_title).toBe("Desafio dos algoritmos");
  expect(result.material_id).toBe("catalog");
  expect(calls.some(([table]) => table === "materials")).toBe(false);
});

test("denúncia de envio mantém a consulta ao material do professor", async () => {
  rows.discussion_comments = [
    {
      id: "comment",
      body: "Texto",
      visibility: "visible",
      material_id: "material",
      catalog_example_id: null,
    },
  ];
  rows.materials = [{ id: "material", title: "Jogo de lógica" }];
  const result = await reportDetail(client, "report");
  expect(result.material_title).toBe("Jogo de lógica");
  expect(result.material_id).toBe("material");
  expect(calls.some(([table]) => table === "catalog_examples")).toBe(false);
});
