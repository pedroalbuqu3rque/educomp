export class RequestBodyError extends Error {
  constructor(public readonly status: 400 | 413) {
    super(status === 413 ? "Solicitação muito grande." : "Solicitação inválida.");
  }
}

export function isSameOrigin(request: Request): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function readLimitedBody(
  request: Request,
  maxBytes: number,
): Promise<Uint8Array<ArrayBuffer>> {
  if (Number(request.headers.get("content-length") ?? 0) > maxBytes) {
    throw new RequestBodyError(413);
  }
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel().catch(() => undefined);
        throw new RequestBodyError(413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

export async function readJson(
  request: Request,
  maxBytes: number,
): Promise<{ ok: true; data: unknown } | { ok: false; status: 400 | 413 }> {
  try {
    const bytes = await readLimitedBody(request, maxBytes);
    return { ok: true, data: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch (error) {
    return { ok: false, status: error instanceof RequestBodyError ? error.status : 400 };
  }
}

export async function readFormData(request: Request, maxBytes: number): Promise<FormData> {
  const bytes = await readLimitedBody(request, maxBytes);
  return new Response(bytes, {
    headers: { "Content-Type": request.headers.get("content-type") ?? "" },
  }).formData();
}
