import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { communityActionSchema } from "@/lib/community/validation";

export const dynamic="force-dynamic";
const noStore={"Cache-Control":"private, no-store"};
const fail=(status:number,error:string)=>NextResponse.json({error},{status,headers:noStore});
export async function POST(request:NextRequest){
 const origin=request.headers.get("origin");
 const site=request.headers.get("sec-fetch-site");
 if(site==="cross-site"|| (origin && origin!==request.nextUrl.origin))return fail(403,"Origem não autorizada.");
 if(Number(request.headers.get("content-length")??0)>12_000)return fail(413,"Solicitação muito grande.");
 if(!request.headers.get("content-type")?.startsWith("application/json"))return fail(415,"Envie dados em JSON.");
 let body:unknown;
 try{const raw=await request.text();if(Buffer.byteLength(raw,"utf8")>12_000)return fail(413,"Solicitação muito grande.");body=JSON.parse(raw);}catch{return fail(400,"Não foi possível ler a solicitação.");}
 const parsed=communityActionSchema.safeParse(body);
 if(!parsed.success)return fail(400,parsed.error.issues[0]?.message??"Dados inválidos.");
 try{
  const client=await createClient();
  const {data:auth,error:authError}=await client.auth.getUser();
  if(authError||!auth.user)return fail(401,"Entre na sua conta para participar.");
  const data=parsed.data;
  let error: {code?:string;message:string}|null=null;
  let id:string|null=null;
  if(data.action==="create"){
   const params={
    p_body:data.body,p_kind:data.kind,p_parent_id:data.parentId??null,
    p_grade:data.kind==="application_report"?(data.grade??null):null,
    p_adaptations:data.kind==="application_report"?(data.adaptations??""):null,
   };
   const result=data.catalogExampleId
    ? await client.rpc("create_catalog_comment",{p_catalog_example_id:data.catalogExampleId,...params})
    : await client.rpc("create_community_comment",{p_material_id:data.materialId!,...params});
   error=result.error;id=result.data;
  }else if(data.action==="edit"){
   const result=await client.rpc("edit_community_comment",{
    p_id:data.commentId,p_body:data.body,p_grade:data.grade??null,p_adaptations:data.grade!==undefined?(data.adaptations??""):null,
   });
   error=result.error;
  }else if(data.action==="delete"){
   const result=await client.rpc("delete_community_comment",{p_id:data.commentId});error=result.error;
  }else{
   const result=await client.rpc("report_comment",{
    p_comment_id:data.commentId,p_reason:data.reason,p_details:data.details??"",
   });error=result.error;id=result.data;
  }
  if(error){
   if(error.code==="23505")return fail(409,"Você já denunciou este comentário.");
   if(error.code==="42501")return fail(403,"Esta ação não está disponível para sua conta ou para este conteúdo.");
   if(error.message.includes("Hourly comment limit"))return fail(429,"Limite de 12 contribuições por hora. Tente novamente mais tarde.");
   if(error.message.includes("Too many reports"))return fail(429,"Limite de denúncias por hora atingido.");
   if(error.code==="42883"||error.code==="42P01"||error.code==="PGRST202")return fail(503,"A Comunidade ainda precisa das migrations 008 e 014 no Supabase.");
   if(error.message.includes("Comment cannot be edited")||error.message.includes("Comment cannot be deleted"))return fail(403,"Você não pode alterar este comentário.");
   return fail(400,"Não foi possível concluir a ação. Confira os dados e tente novamente.");
  }
  return NextResponse.json({ok:true,...(id?{id}:{})},{status:data.action==="create"?201:200,headers:noStore});
 }catch{return fail(503,"A Comunidade está temporariamente indisponível.");}
}
