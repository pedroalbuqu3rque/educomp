import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { reviewerForRequest } from "@/lib/review/request";
const headers={"Cache-Control":"private, no-store","Referrer-Policy":"no-referrer"};
export async function GET(request:NextRequest,{params}:{params:Promise<{id:string;fileId:string}>}) {
 const {id,fileId}=await params;
 if(!z.uuid().safeParse(id).success||!z.uuid().safeParse(fileId).success)
  return new NextResponse("Arquivo não encontrado.",{status:404,headers});
 try{
  const {client,user,authorized,error}=await reviewerForRequest();
  if(!user)return NextResponse.redirect(new URL("/entrar?next=/revisao",request.url),{headers});
  if(error)return new NextResponse("Não foi possível verificar o acesso.",{status:503,headers});
  if(!authorized)return new NextResponse("Acesso restrito.",{status:403,headers});
  const {data:material,error:materialError}=await client.from("materials").select("id").eq("id",id).neq("review_status","draft").maybeSingle();
  if(materialError)return new NextResponse("Falha ao consultar o material.",{status:503,headers});
  if(!material)return new NextResponse("Material indisponível.",{status:404,headers});
  const {data:file,error:fileError}=await client.from("material_files").select("object_path,original_name")
   .eq("id",fileId).eq("material_id",id).maybeSingle();
  if(fileError)return new NextResponse("Falha ao consultar o arquivo.",{status:503,headers});
  if(!file)return new NextResponse("Arquivo não encontrado.",{status:404,headers});
  const {data,error:signError}=await client.storage.from("materials").createSignedUrl(file.object_path,60,{download:file.original_name});
  if(signError||!data?.signedUrl)return new NextResponse("Download indisponível.",{status:503,headers});
  return NextResponse.redirect(data.signedUrl,{headers});
 }catch{return new NextResponse("Serviço indisponível.",{status:503,headers});}
}
