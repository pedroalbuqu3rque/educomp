import { beforeEach,expect,test,vi } from "vitest";
import { NextRequest } from "next/server";
const {client,material,file,sign} = vi.hoisted(()=>{
 const material={select:vi.fn(),eq:vi.fn(),maybeSingle:vi.fn()};
 const file={select:vi.fn(),eq:vi.fn(),maybeSingle:vi.fn()};
 const sign=vi.fn();
 return {material,file,sign,client:{auth:{getUser:vi.fn()},from:vi.fn(),storage:{from:vi.fn()}}};
});
vi.mock("@/lib/supabase/server",()=>({createClient:async()=>client}));
import { GET } from "../src/app/materiais/[id]/arquivos/[fileId]/route";
const id="10000000-0000-4000-8000-000000000001";
const fileId="20000000-0000-4000-8000-000000000001";
function request(){return GET(new NextRequest(`http://localhost:3000/materiais/${id}/arquivos/${fileId}`),{params:Promise.resolve({id,fileId})});}
beforeEach(()=>{
 vi.resetAllMocks();
 for(const q of [material,file]) {q.select.mockReturnValue(q);q.eq.mockReturnValue(q);}
 client.auth.getUser.mockResolvedValue({data:{user:{id:"user"}},error:null});
 client.from.mockImplementation((table:string)=>table==="materials"?material:file);
 client.storage.from.mockReturnValue({createSignedUrl:sign});
 material.maybeSingle.mockResolvedValue({data:{id},error:null});
 file.maybeSingle.mockResolvedValue({data:{object_path:"aula/material.pdf",original_name:"material.pdf"},error:null});
 sign.mockResolvedValue({data:{signedUrl:"https://example.supabase.co/signed/file"},error:null});
});
test("visitante precisa entrar e não recebe URL assinada",async()=>{
 client.auth.getUser.mockResolvedValue({data:{user:null},error:null});
 const result=await request();expect(result.headers.get("location")).toContain("/entrar");expect(sign).not.toHaveBeenCalled();
});
test("material retirado não pode gerar novos links",async()=>{
 material.maybeSingle.mockResolvedValue({data:null,error:null});
 expect((await request()).status).toBe(404);expect(sign).not.toHaveBeenCalled();
 expect(material.eq).toHaveBeenCalledWith("is_published",true);
});
test("arquivo precisa pertencer ao material solicitado",async()=>{
 file.maybeSingle.mockResolvedValue({data:null,error:null});expect((await request()).status).toBe(404);
 expect(file.eq).toHaveBeenCalledWith("material_id",id);expect(sign).not.toHaveBeenCalled();
});
test("download usa caminho do banco e expira em 60 segundos",async()=>{
 const result=await request();expect(result.status).toBe(307);
 expect(client.storage.from).toHaveBeenCalledWith("materials");
 expect(sign).toHaveBeenCalledWith("aula/material.pdf",60,{download:"material.pdf"});
 expect(result.headers.get("cache-control")).toBe("private, no-store");
});
test("falha do Storage é tratada sem expor erro interno",async()=>{
 sign.mockResolvedValue({data:null,error:{message:"internal details"}});
 const result=await request();expect(result.status).toBe(503);expect(await result.text()).not.toContain("internal details");
});
