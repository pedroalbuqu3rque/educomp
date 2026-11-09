import "server-only";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
export async function currentUser() {
 await cookies(); // Never cache account-dependent UI, even when build-time env is absent.
 if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return null;
 try { const client = await createClient(); const {data,error} = await client.auth.getUser(); return error ? null : data.user; }
 catch { return null; }
}
