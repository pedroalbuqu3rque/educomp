"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { appUrl, emailSchema, passwordSchema, safeNext, type AuthMode, type AuthState } from "./validation";
export async function authenticate(mode: AuthMode, _state: AuthState, form: FormData): Promise<AuthState> {
 const email = String(form.get("email") || "").trim();
 const name = String(form.get("name") || "").trim();
 const password = String(form.get("password") || "");
 const fail = (error: string): AuthState => ({error,email,name});
 if (!["login","signup","recover","reset"].includes(mode)) return fail("Solicitação inválida.");
 if (mode !== "reset" && !emailSchema.safeParse(email).success) return fail("Informe um e-mail válido.");
 if (mode === "signup" && (!name || name.length > 120)) return fail("Informe seu nome com até 120 caracteres.");
 if (mode === "signup" || mode === "reset") {
  const result = passwordSchema.safeParse(password);
  if (!result.success) return fail(result.error.issues[0].message);
 }
 if (mode === "login" && !password) return fail("Digite sua senha.");
 if (mode === "reset" && password !== form.get("confirmation")) return fail("As senhas não coincidem.");
 if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return fail("Configure as variáveis do Supabase em .env.local e reinicie o servidor.");
 let destination = "";
 try {
  const client = await createClient();
  if (mode === "login") {
   const {error} = await client.auth.signInWithPassword({email,password});
   if (error) return fail(error.code === "email_not_confirmed" ? "Confirme seu e-mail antes de entrar. Confira também a pasta de spam." : "Não foi possível entrar. Confira seu e-mail e sua senha e tente novamente.");
   destination = safeNext(form.get("next"));
  } else if (mode === "signup") {
   const {data,error} = await client.auth.signUp({email,password,options:{data:{display_name:name},emailRedirectTo:`${appUrl()}/auth/callback`}});
   if (error) return fail("Não foi possível concluir o cadastro. Tente novamente em alguns minutos. Se já possui conta, entre ou recupere sua senha.");
   if (data.session) destination = "/biblioteca";
   else return {success:"Confira seu e-mail para confirmar o cadastro. Se já possui uma conta, faça login ou recupere sua senha."};
  } else if (mode === "recover") {
   const {error} = await client.auth.resetPasswordForEmail(email,{redirectTo:`${appUrl()}/auth/callback?next=/redefinir-senha`});
   if (error) return fail("Não foi possível enviar agora. Aguarde alguns minutos e tente novamente.");
   return {success:"Se houver uma conta com esse e-mail, você receberá as instruções para redefinir a senha. Confira também a pasta de spam."};
  } else {
   const {data,error:sessionError} = await client.auth.getUser();
   if (sessionError || !data.user) return fail("Sua sessão expirou. Solicite um novo link de recuperação.");
   const {error} = await client.auth.updateUser({password});
   if (error) return fail("Não foi possível alterar a senha. Use uma senha diferente da anterior ou solicite um novo link.");
   return {success:"Senha redefinida. Você já pode acessar a biblioteca."};
  }
 } catch { return fail("Não foi possível conectar ao serviço. Confira sua conexão e tente novamente."); }
 if (destination) { revalidatePath("/","layout"); redirect(destination); }
 return fail("Tente novamente.");
}
export async function signOut() {
 const client = await createClient();
 const {error} = await client.auth.signOut({scope:"local"});
 if (error) redirect("/conta?error=sair");
 revalidatePath("/","layout"); redirect("/entrar");
}
