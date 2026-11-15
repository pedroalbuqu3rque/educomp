import { readJson } from "@/lib/http/request";
import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const reviewResponseHeaders = { "Cache-Control": "private, no-store" };
export function reviewError(status: number, message: string) {
  return NextResponse.json({ error: message }, { status, headers: reviewResponseHeaders });
}
export { isSameOrigin } from "@/lib/http/request";
export async function reviewerForRequest() {
  const client = await createClient();
  const { data: auth, error: authError } = await client.auth.getUser();
  if (authError || !auth.user) return { client, user: null, authorized: false, error: null };
  const { data, error } = await client.rpc("is_reviewer");
  return { client, user: auth.user, authorized: data === true, error };
}

export function reviewJson(request: NextRequest) {
  return readJson(request, 4096);
}
