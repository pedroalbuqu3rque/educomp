import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
const headers={"Cache-Control":"private, no-store","Referrer-Policy":"no-referrer"};
export async function GET(request:NextRequest,{params}:{params:Promise<{id:string;fileId:string}>}) {
 const {id,fileId}=await params;
 if(!z.uuid().safeParse(id).success || !z.uuid().safeParse(fileId).success) return new NextResponse("Arquivo não encontrado.",{status:404,headers});
 try {
  const client=await createClient();
  const {data:session,error:authError}=await client.auth.getUser();
  if(authError || !session.user) return NextResponse.redirect(new URL("/entrar?next=/biblioteca",request.url),{headers});
  const {data:material,error:materialError}=await client.from("materials").select("id").eq("id",id).eq("is_published",true).eq("review_status","approved").maybeSingle();
  if(materialError) return new NextResponse("Não foi possível consultar o material. Tente novamente.",{status:503,headers});
  if(!material) return new NextResponse("Material indisponível ou retirado da biblioteca.",{status:404,headers});
  const {data:file,error:fileError}=await client.from("material_files").select("object_path,original_name").eq("id",fileId).eq("material_id",id).maybeSingle();
  if(fileError) return new NextResponse("Não foi possível consultar o arquivo. Tente novamente.",{status:503,headers});
  if(!file) return new NextResponse("Arquivo não encontrado.",{status:404,headers});
  const {data,error}=await client.storage.from("materials").createSignedUrl(file.object_path,60,{download:file.original_name});
  if(error || !data?.signedUrl) return new NextResponse("Não foi possível baixar o arquivo. Volte à biblioteca e tente novamente.",{status:503,headers});
  return NextResponse.redirect(data.signedUrl,{headers});
 } catch { return new NextResponse("Serviço indisponível. Tente novamente em alguns instantes.",{status:503,headers}); }
}
