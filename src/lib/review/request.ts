import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const reviewResponseHeaders = {"Cache-Control":"private, no-store"};
export function reviewError(status:number,message:string) {
 return NextResponse.json({error:message},{status,headers:reviewResponseHeaders});
}
export function isSameOrigin(request:NextRequest) {
 const origin=request.headers.get("origin");
 if(request.headers.get("sec-fetch-site") === "cross-site") return false;
 if(!origin) return true;
 try {return new URL(origin).origin===new URL(request.url).origin;} catch {return false;}
}
export async function reviewerForRequest() {
 const client=await createClient();
 const {data:auth,error:authError}=await client.auth.getUser();
 if(authError||!auth.user) return {client,user:null,authorized:false,error:null};
 const {data,error}=await client.rpc("is_reviewer");
 return {client,user:auth.user,authorized:data===true,error};
}

/** Lê um corpo JSON pequeno sem confiar apenas no Content-Length enviado pelo cliente. */
export async function reviewJson(request: NextRequest): Promise<
 {ok:true;data:unknown} | {ok:false;status:400|413}
> {
 const maxBytes = 4096;
 if (Number(request.headers.get("content-length") ?? 0) > maxBytes) return {ok:false,status:413};
 try {
  const raw = await request.text();
  if (Buffer.byteLength(raw,"utf8") > maxBytes) return {ok:false,status:413};
  return {ok:true,data:JSON.parse(raw)};
 } catch { return {ok:false,status:400}; }
}
