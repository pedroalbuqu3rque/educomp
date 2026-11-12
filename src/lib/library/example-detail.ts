import "server-only";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isCatalogExampleId } from "./catalog";

const schema = z.object({
 id:z.uuid(), title:z.string(), description:z.string(), keywords:z.array(z.string()),
 objectives:z.string(), authorship:z.string(), year:z.string(),
 type:z.array(z.string()), stage:z.array(z.string()), axis:z.array(z.string()),
 approach:z.array(z.string()),
});
export type CatalogExample = z.infer<typeof schema>;
export type ExampleDetail = {example:CatalogExample|null;signedIn:boolean;saved:boolean;error?:string;savedError?:boolean};
export async function loadCatalogExample(id:string):Promise<ExampleDetail> {
 const empty:ExampleDetail={example:null,signedIn:false,saved:false};
 if(!isCatalogExampleId(id)) return empty;
 try {
  const client=await createClient();
  const {data,error}=await client.from("catalog_examples")
   .select("id,title,description,keywords,objectives,authorship,year,type,stage,axis,approach")
   .eq("id",id).eq("is_active",true).maybeSingle();
  if(error) return {...empty,error:"Não foi possível carregar o exemplo. Verifique se a migration 012 foi aplicada."};
  if(!data) return empty;
  const example=schema.parse(data);
  const {data:session}=await client.auth.getUser();
  if(!session.user) return {...empty,example};
  const saved=await client.from("saved_catalog_examples").select("example_id")
   .eq("user_id",session.user.id).eq("example_id",id).maybeSingle();
  return {example,signedIn:true,saved:Boolean(saved.data),savedError:Boolean(saved.error)};
 } catch {
  return {...empty,error:"Não foi possível carregar o exemplo. Verifique a conexão com o Supabase."};
 }
}
