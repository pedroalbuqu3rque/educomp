export function supabaseEnv() {
 const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if (!url || !key) throw new Error("Preencha as variáveis do Supabase em .env.local.");
 return { url, key };
}
