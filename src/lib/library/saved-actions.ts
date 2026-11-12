"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isCatalogExampleId } from "@/lib/library/catalog";
export async function setMaterialSaved(id:string,saved:boolean):Promise<{error?:string;requiresLogin?:boolean;saved?:boolean}> {
 if(!z.uuid().safeParse(id).success || typeof saved!=="boolean") return {error:"Material inválido."};
 try {
  const client=await createClient();
  const {data,error}=await client.auth.getUser();
  if(error || !data.user) return {requiresLogin:true,error:"Entre na sua conta para salvar materiais."};
  const example=isCatalogExampleId(id);
  const favoritesTable=example?"saved_catalog_examples":"saved_materials";
  const idColumn=example?"example_id":"material_id";
  if(saved){
   const lookup=client.from(example?"catalog_examples":"materials").select("id").eq("id",id);
   const {data:material,error:readError}=await (example?lookup.eq("is_active",true):lookup.eq("is_published",true).eq("review_status","approved")).maybeSingle();
   if(readError) return {error:"Não foi possível verificar o material. Tente novamente."};
   if(!material) return {error:"Este material não está mais disponível na biblioteca."};
   const {error:writeError}=await client.from(favoritesTable).insert({user_id:data.user.id,[idColumn]:id});
   // Explicit desired state: retries/duplicate requests must not toggle an existing favorite off.
   if(writeError && writeError.code!=="23505") return {error:"Não foi possível salvar. Atualize a página e tente novamente."};
  } else {
   const {error:deleteError}=await client.from(favoritesTable).delete().eq("user_id",data.user.id).eq(idColumn,id);
   if(deleteError) return {error:"Não foi possível remover dos salvos. Tente novamente."};
  }
  revalidatePath("/biblioteca");revalidatePath("/salvos");revalidatePath(`/materiais/${id}`);
  return {saved};
 } catch {return {error:"Não foi possível atualizar seus salvos. Confira sua conexão e tente novamente."};}
}
