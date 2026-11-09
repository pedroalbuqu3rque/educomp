"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
export async function setMaterialSaved(id:string,saved:boolean):Promise<{error?:string;requiresLogin?:boolean;saved?:boolean}> {
 if(!z.uuid().safeParse(id).success || typeof saved!=="boolean") return {error:"Material inválido."};
 try {
  const client=await createClient();
  const {data,error}=await client.auth.getUser();
  if(error || !data.user) return {requiresLogin:true,error:"Entre na sua conta para salvar materiais."};
  if(saved){
   const {data:material,error:readError}=await client.from("materials").select("id").eq("id",id).eq("is_published",true).eq("review_status","approved").maybeSingle();
   if(readError) return {error:"Não foi possível verificar o material. Tente novamente."};
   if(!material) return {error:"Este material não está mais disponível na biblioteca."};
   const {error:writeError}=await client.from("saved_materials").insert({user_id:data.user.id,material_id:id});
   // Explicit desired state: retries/duplicate requests must not toggle an existing favorite off.
   if(writeError && writeError.code!=="23505") return {error:"Não foi possível salvar. Atualize a página e tente novamente."};
  } else {
   const {error:deleteError}=await client.from("saved_materials").delete().eq("user_id",data.user.id).eq("material_id",id);
   if(deleteError) return {error:"Não foi possível remover dos salvos. Tente novamente."};
  }
  revalidatePath("/biblioteca");revalidatePath("/salvos");
  return {saved};
 } catch {return {error:"Não foi possível atualizar seus salvos. Confira sua conexão e tente novamente."};}
}
