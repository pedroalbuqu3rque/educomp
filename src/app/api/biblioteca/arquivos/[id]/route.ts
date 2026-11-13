import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { isCatalogExampleId } from "@/lib/library/catalog";
import { getCatalogEditorial } from "@/lib/library/catalog-resources";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const privateHeaders = {
  "Cache-Control": "private, no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isCatalogExampleId(id)) {
    return new NextResponse("Arquivo não encontrado.", { status: 404, headers: privateHeaders });
  }

  const resource = getCatalogEditorial(id);
  if (!resource) {
    return new NextResponse("Arquivo não encontrado.", { status: 404, headers: privateHeaders });
  }

  try {
    const client = await createClient();
    const { data: session, error: authError } = await client.auth.getUser();
    if (authError || !session.user) {
      const returnTo = `/materiais/${id}`;
      const login = new URL(`/entrar?next=${encodeURIComponent(returnTo)}`, request.url);
      return NextResponse.redirect(login, { headers: privateHeaders });
    }

    const { data: example, error: lookupError } = await client
      .from("catalog_examples")
      .select("id")
      .eq("id", id)
      .eq("is_active", true)
      .maybeSingle();
    if (lookupError) {
      return new NextResponse("Não foi possível consultar o material.", { status: 503, headers: privateHeaders });
    }
    if (!example) {
      return new NextResponse("Material indisponível.", { status: 404, headers: privateHeaders });
    }

    // Only mapped institutional PDF names reach this path (never user input).
    const file = resource.attachment;
    const path = join(process.cwd(), "private", "biblioteca", "arquivos", file.fileName);
    const bytes = await readFile(path);
    const disposition = request.nextUrl.searchParams.get("download") === "1" ? "attachment" : "inline";
    const headers = {
      ...privateHeaders,
      "Content-Type": "application/pdf",
      "Content-Length": String(bytes.byteLength),
      "Content-Disposition": `${disposition}; filename="${file.fileName}"; filename*=UTF-8''${encodeURIComponent(file.name)}`,
    };
    return new NextResponse(new Uint8Array(bytes), { status: 200, headers });
  } catch {
    return new NextResponse("Arquivo indisponível no momento.", { status: 503, headers: privateHeaders });
  }
}
