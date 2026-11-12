import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { reportActionSchema } from "@/lib/review/shared";
import { isSameOrigin,reviewError,reviewerForRequest,reviewResponseHeaders,reviewJson } from "@/lib/review/request";
export const runtime="nodejs";
export async function POST(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
 const {id}=await params;
 if(!isSameOrigin(request))return reviewError(403,"Origem não autorizada.");
 if(!z.uuid().safeParse(id).success)return reviewError(404,"Denúncia não encontrada.");
 if(!request.headers.get("content-type")?.startsWith("application/json"))return reviewError(415,"Formato não aceito.");
 const body=await reviewJson(request);
 if(!body.ok)return reviewError(body.status,body.status===413?"Solicitação muito grande.":"Solicitação inválida.");
 const input=reportActionSchema.safeParse(body.data);
 if(!input.success)return reviewError(400,input.error.issues[0]?.message??"Dados inválidos.");
 try{
  const {client,user,authorized,error}=await reviewerForRequest();
  if(!user)return reviewError(401,"Entre na sua conta para continuar.");
  if(error)return reviewError(503,"Não foi possível verificar sua permissão.");
  if(!authorized)return reviewError(403,"Acesso restrito a revisores.");
  const {error:moderateError}=await client.rpc("moderate_report",{
   p_id:id,p_action:input.data.action,p_reason:input.data.reason||null,
  });
  if(moderateError)return reviewError(409,"A denúncia mudou de situação ou a decisão não é permitida. Atualize a página.");
  revalidatePath("/revisao/denuncias");revalidatePath(`/revisao/denuncias/${id}`);
  return NextResponse.json({ok:true},{headers:reviewResponseHeaders});
 }catch{return reviewError(503,"Serviço indisponível. Tente novamente.");}
}
