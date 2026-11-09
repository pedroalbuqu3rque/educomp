import "server-only";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { Query, Material } from "./catalog";
const materialSchema = z.object({id:z.uuid(),title:z.string(),description:z.string(),keywords:z.array(z.string()),year:z.string(),type:z.array(z.string()),stage:z.array(z.string()),axis:z.array(z.string()),approach:z.array(z.string()),authorship:z.string(),objectives:z.string()});
const resultSchema = z.object({total:z.number().int().nonnegative(),pages:z.number().int().positive(),page:z.number().int().positive(),items:z.array(materialSchema).max(12)});
export type CatalogResult = {total:number;pages:number;page:number;items:Material[]};
export type LibraryData = {result:CatalogResult; signedIn:boolean; error?:string; filesError?:boolean; savedError?:boolean};
export async function loadLibrary(query:Query,savedOnly=false):Promise<LibraryData> {
 const empty:LibraryData={result:{total:0,pages:1,page:1,items:[]},signedIn:false};
 if(!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return {...empty,error:"A biblioteca ainda não foi conectada. Configure o Supabase em .env.local e reinicie a plataforma."};
 try {
  const client=await createClient();
  const {data,error}=await client.rpc(savedOnly ? "search_saved_library" : "search_library",{p_q:query.q,p_types:query.selections.type,p_stages:query.selections.stage,p_axes:query.selections.axis,p_approaches:query.selections.approach,p_page:query.page});
  if(error) return {...empty,error:error.code === "PGRST202" ? `Falta atualizar o banco. Execute a migração ${savedOnly ? "202611090005_saved_materials.sql" : "202611090004_library.sql"} no Supabase.` : "Não foi possível carregar a biblioteca. Tente novamente em alguns instantes."};
  const result:CatalogResult=resultSchema.parse(data);
  const {data:session}=await client.auth.getUser();
  const signedIn=Boolean(session.user);
  let savedError=false;
  if(signedIn && result.items.length){
   if(savedOnly) result.items=result.items.map(m=>({...m,saved:true}));
   else {
    const {data:saved,error}=await client.from("saved_materials").select("material_id").eq("user_id",session.user!.id).in("material_id",result.items.map(m=>m.id));
    savedError=Boolean(error);
    if(!error){const ids=new Set((saved??[]).map(s=>s.material_id));result.items=result.items.map(m=>({...m,saved:ids.has(m.id)}));}
   }
   const {data:files,error:filesError}=await client.from("material_files").select("id,material_id,original_name,size_bytes").in("material_id",result.items.map(m=>m.id)).order("created_at");
   if(filesError) return {result,signedIn,savedError,filesError:true};
   result.items=result.items.map(m=>({...m,files:(files??[]).filter(f=>f.material_id===m.id).map(f=>({id:f.id,name:f.original_name,size:f.size_bytes}))}));
  }
  return {result,signedIn,savedError};
 } catch { return {...empty,error:"Não foi possível carregar a biblioteca. Confira sua conexão e tente novamente."}; }
}
