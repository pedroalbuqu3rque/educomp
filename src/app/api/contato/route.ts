import { isSameOrigin, readJson } from "@/lib/http/request";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { contactMessageSchema } from "@/lib/contact/validation";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
const fail = (status: number, error: string) => NextResponse.json({ error }, { status, headers });

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return fail(403, "Origem não autorizada.");
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return fail(415, "Envie os dados em JSON.");
  const input = await readJson(request, 8192);
  if (!input.ok)
    return fail(
      input.status,
      input.status === 413 ? "Solicitação muito grande." : "Não foi possível ler a solicitação.",
    );
  const payload = input.data;
  const result = contactMessageSchema.safeParse(payload);
  if (!result.success)
    return fail(400, result.error.issues[0]?.message ?? "Verifique os campos do formulário.");

  if (result.data.website) return fail(400, "Revise os campos do formulário.");

  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("submit_contact_message", {
      p_name: result.data.name,
      p_email: result.data.email,
      p_subject: result.data.subject,
      p_message: result.data.message,
    });
    if (error) {
      if (error.message.includes("Contact rate limit"))
        return fail(
          429,
          "Você já enviou algumas mensagens recentemente. Tente novamente mais tarde.",
        );
      if (error.code === "42883" || error.code === "42P01" || error.code === "PGRST202")
        return fail(503, "O canal de contato está temporariamente indisponível.");
      return fail(503, "Não foi possível registrar sua mensagem. Tente novamente.");
    }
    return NextResponse.json({ ok: true }, { status: 201, headers });
  } catch {
    return fail(503, "O canal de contato está temporariamente indisponível.");
  }
}
