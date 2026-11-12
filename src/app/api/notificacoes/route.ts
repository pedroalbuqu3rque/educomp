import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { loadNotifications } from "@/lib/notifications/load";
import { notificationActionSchema } from "@/lib/notifications/shared";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store" };
const fail = (status: number, error: string) => NextResponse.json({ error }, { status, headers });

export async function GET(request: NextRequest) {
 const value = (key: string, fallback: number, maximum: number) => {
  const raw = request.nextUrl.searchParams.get(key);
  if (raw === null) return fallback;
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, maximum) : fallback;
 };
 try {
  const client = await createClient();
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) return fail(401, "Entre na sua conta para consultar as notificações.");
  const result = await loadNotifications(client, value("page", 1, 1000), value("limit", 8, 30));
  return NextResponse.json(result, { headers });
 } catch { return fail(503, "Não foi possível consultar as notificações. Confira a migration 009 no Supabase."); }
}

export async function POST(request: NextRequest) {
 const site = request.headers.get("sec-fetch-site");
 const origin = request.headers.get("origin");
 if (site === "cross-site" || (origin && origin !== request.nextUrl.origin))
  return fail(403, "Origem não autorizada.");
 if (!request.headers.get("content-type")?.startsWith("application/json"))
  return fail(415, "Envie dados em JSON.");
 if (Number(request.headers.get("content-length") ?? 0) > 2_048)
  return fail(413, "Solicitação muito grande.");
 let body: unknown;
 try {
  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > 2_048) return fail(413, "Solicitação muito grande.");
  body = JSON.parse(raw);
 } catch { return fail(400, "Não foi possível ler a solicitação."); }
 const parsed = notificationActionSchema.safeParse(body);
 if (!parsed.success) return fail(400, "Ação ou identificador de notificação inválido.");
 try {
  const client = await createClient();
  const { data: auth, error: authError } = await client.auth.getUser();
  if (authError || !auth.user) return fail(401, "Entre na sua conta para atualizar as notificações.");
  if (parsed.data.action === "read_all") {
   const { data, error } = await client.rpc("mark_all_notifications_read");
   if (error) throw error;
   return NextResponse.json({ ok: true, updated: data }, { headers });
  }
  const { data, error } = await client.rpc("set_notification_read", {
   p_id: parsed.data.id, p_read: parsed.data.action === "read",
  });
  if (error) throw error;
  if (!data) return fail(404, "Notificação não encontrada.");
  return NextResponse.json({ ok: true }, { headers });
 } catch { return fail(503, "Não foi possível atualizar as notificações. Tente novamente."); }
}
