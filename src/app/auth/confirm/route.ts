import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { appUrl } from "@/lib/auth/validation";
export async function GET(request: NextRequest) {
 const token_hash = request.nextUrl.searchParams.get("token_hash");
 const type = request.nextUrl.searchParams.get("type");
 let destination = "/recuperar-senha?error=link";
 if (token_hash && (type === "signup" || type === "email" || type === "recovery")) {
  try { const client = await createClient(); const {error} = await client.auth.verifyOtp({token_hash,type});
   if (!error) destination = type === "recovery" ? "/redefinir-senha" : "/biblioteca";
  } catch { /* Invalid configuration or unavailable service: show retry page. */ }
 }
 const response = NextResponse.redirect(new URL(destination,appUrl()));
 response.headers.set("Cache-Control","no-store");response.headers.set("Referrer-Policy","no-referrer");return response;
}
