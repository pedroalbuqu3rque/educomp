import { isSameOrigin, readJson } from "@/lib/http/request";
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
  } catch {
    return fail(503, "Não foi possível consultar as notificações. Tente novamente mais tarde.");
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return fail(403, "Origem não autorizada.");
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return fail(415, "Envie os dados em JSON.");
  const input = await readJson(request, 2048);
  if (!input.ok)
    return fail(
      input.status,
      input.status === 413 ? "Solicitação muito grande." : "Não foi possível ler a solicitação.",
    );
  const body = input.data;
  const parsed = notificationActionSchema.safeParse(body);
  if (!parsed.success) return fail(400, "Ação ou identificador de notificação inválido.");
  try {
    const client = await createClient();
    const { data: auth, error: authError } = await client.auth.getUser();
    if (authError || !auth.user)
      return fail(401, "Entre na sua conta para atualizar as notificações.");
    if (parsed.data.action === "read_all") {
      const { data, error } = await client.rpc("mark_all_notifications_read");
      if (error) throw error;
      return NextResponse.json({ ok: true, updated: data }, { headers });
    }
    const { data, error } = await client.rpc("set_notification_read", {
      p_id: parsed.data.id,
      p_read: parsed.data.action === "read",
    });
    if (error) throw error;
    if (!data) return fail(404, "Notificação não encontrada.");
    return NextResponse.json({ ok: true }, { headers });
  } catch {
    return fail(503, "Não foi possível atualizar as notificações. Tente novamente.");
  }
}
