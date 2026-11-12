"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { profileSchema, type ProfileResult } from "./validation";
export async function saveProfile(input: unknown): Promise<ProfileResult> {
 const parsed = profileSchema.safeParse(input);
 if (!parsed.success) {
  const fields: ProfileResult["fields"] = {};
  for (const issue of parsed.error.issues) {
   const field = issue.path[0];
   if (field === "display_name" || field === "occupation" || field === "bio") fields[field] ??= issue.message;
  }
  return { error: "Confira os campos indicados.", fields };
 }
 try {
  const client = await createClient();
  const { data: session, error: authError } = await client.auth.getUser();
  if (authError || !session.user) return { requiresLogin: true, error: "Sua sessão terminou. Entre novamente para salvar o perfil." };
  // Identity comes exclusively from the verified session. Never accept a client-supplied ID.
  const { data, error } = await client.from("profiles").update({display_name:parsed.data.display_name,occupation:parsed.data.occupation,bio:parsed.data.bio}).eq("id", session.user.id).select("display_name,occupation,bio").maybeSingle();
  if (error) return { error: "Não foi possível salvar suas alterações. Seus dados permanecem no formulário para tentar novamente." };
  if (!data) return { error: "Seu perfil não foi encontrado. Atualize a página e tente novamente." };
  const profile = profileSchema.safeParse(data);
  if (!profile.success) return { error: "Não foi possível confirmar os dados salvos. Atualize a página para conferir seu perfil." };
  revalidatePath("/conta");
  revalidatePath(`/perfis/${session.user.id}`);
  return { profile: profile.data };
 } catch {
  return { error: "Não foi possível salvar suas alterações. Confira a conexão e tente novamente." };
 }
}
