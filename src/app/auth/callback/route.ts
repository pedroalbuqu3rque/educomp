import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { appUrl } from "@/lib/auth/validation";
export async function GET(request: NextRequest) {
 const code = request.nextUrl.searchParams.get("code");
 let destination = "/recuperar-senha?error=link";
 if (code) { try {const client = await createClient();const {error} = await client.auth.exchangeCodeForSession(code);
  if (!error) destination = request.nextUrl.searchParams.get("next") === "/redefinir-senha" ? "/redefinir-senha" : "/biblioteca";
 } catch { /* Show retry page without exposing credentials. */ } }
 const response = NextResponse.redirect(new URL(destination,appUrl()));response.headers.set("Cache-Control","no-store");response.headers.set("Referrer-Policy","no-referrer");return response;
}
