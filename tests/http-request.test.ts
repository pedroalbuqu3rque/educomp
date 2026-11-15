import { describe, expect, it } from "vitest";
import { isSameOrigin, readFormData, readJson, readLimitedBody } from "../src/lib/http/request";

function streamed(chunks: string[]) {
  let cancelled = false;
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    pull(controller) {
      const chunk = chunks.shift();
      if (chunk === undefined) controller.close();
      else controller.enqueue(encoder.encode(chunk));
    },
    cancel() {
      cancelled = true;
    },
  });
  const request = new Request("https://educomp.test/api", {
    method: "POST",
    body: stream,
    duplex: "half",
  } as RequestInit);
  return { request, cancelled: () => cancelled };
}

describe("leitura limitada de requisições", () => {
  it("interrompe um corpo sem Content-Length ao ultrapassar o limite", async () => {
    const source = streamed(["1234", "5678", "9"]);
    await expect(readLimitedBody(source.request, 5)).rejects.toMatchObject({ status: 413 });
    expect(source.cancelled()).toBe(true);
  });
  it("conta bytes UTF-8 e rejeita um Content-Length menor que o corpo", async () => {
    const source = streamed(["áá", "á"]);
    source.request.headers.set("content-length", "1");
    expect(await readJson(source.request, 5)).toEqual({ ok: false, status: 413 });
  });
  it("aceita JSON no limite e distingue conteúdo inválido", async () => {
    expect(await readJson(streamed(['{"ok":', "true}"]).request, 11)).toEqual({
      ok: true,
      data: { ok: true },
    });
    expect(await readJson(streamed(["{"]).request, 11)).toEqual({ ok: false, status: 400 });
  });
  it("preserva os arquivos ao ler multipart", async () => {
    const form = new FormData();
    form.append("payload", '{"title":"Material"}');
    form.append("files", new File(["%PDF-test"], "atividade.pdf", { type: "application/pdf" }));
    const request = new Request("https://educomp.test/api", { method: "POST", body: form });
    const body = await readFormData(request, 4096);
    expect(body.get("payload")).toBe('{"title":"Material"}');
    expect(await (body.get("files") as File).text()).toBe("%PDF-test");
  });
  it("rejeita origens externas e cabeçalhos inconsistentes", () => {
    for (const headers of [
      { origin: "https://other.test" },
      { origin: "invalid" },
      { "sec-fetch-site": "cross-site" },
    ] as Record<string, string>[]) {
      expect(isSameOrigin(new Request("https://educomp.test/api", { headers }))).toBe(false);
    }
    expect(
      isSameOrigin(
        new Request("https://educomp.test/api", { headers: { origin: "https://educomp.test" } }),
      ),
    ).toBe(true);
  });
});
