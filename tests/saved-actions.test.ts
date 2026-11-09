import {beforeEach,expect,test,vi} from "vitest";
const {client,material,saved,revalidate}=vi.hoisted(()=>({
 client:{auth:{getUser:vi.fn()},from:vi.fn()},material:{select:vi.fn(),eq:vi.fn(),maybeSingle:vi.fn()},
 saved:{insert:vi.fn(),delete:vi.fn(),eq:vi.fn()},revalidate:vi.fn()
}));
vi.mock("@/lib/supabase/server",()=>({createClient:async()=>client}));
vi.mock("next/cache",()=>({revalidatePath:revalidate}));
import {setMaterialSaved} from "../src/lib/library/saved-actions";
const id="10000000-0000-4000-8000-000000000001";
beforeEach(()=>{
 vi.resetAllMocks();client.auth.getUser.mockResolvedValue({data:{user:{id:"verified-user"}},error:null});
 client.from.mockImplementation((table:string)=>table==="materials"?material:saved);
 material.select.mockReturnValue(material);material.eq.mockReturnValue(material);material.maybeSingle.mockResolvedValue({data:{id},error:null});
 saved.insert.mockResolvedValue({error:null});saved.delete.mockReturnValue(saved);saved.eq.mockReturnValue(saved);
 // The second delete filter completes the request.
 saved.eq.mockImplementationOnce(()=>saved).mockImplementationOnce(()=>Promise.resolve({error:null}));
});
test("visitante não grava favoritos",async()=>{
 client.auth.getUser.mockResolvedValue({data:{user:null},error:null});expect((await setMaterialSaved(id,true)).requiresLogin).toBe(true);expect(client.from).not.toHaveBeenCalled();
});
test("salvar usa usuário verificado e invalida as duas páginas",async()=>{
 expect(await setMaterialSaved(id,true)).toEqual({saved:true});expect(saved.insert).toHaveBeenCalledWith({user_id:"verified-user",material_id:id});
 expect(revalidate).toHaveBeenCalledWith("/biblioteca");expect(revalidate).toHaveBeenCalledWith("/salvos");
});
test("repetir salvar é idempotente, sem remover ou duplicar",async()=>{
 saved.insert.mockResolvedValue({error:{code:"23505"}});expect(await setMaterialSaved(id,true)).toEqual({saved:true});expect(saved.delete).not.toHaveBeenCalled();
});
test("remover sempre limita a exclusão à conta autenticada",async()=>{
 expect(await setMaterialSaved(id,false)).toEqual({saved:false});expect(saved.eq).toHaveBeenCalledWith("user_id","verified-user");expect(saved.eq).toHaveBeenCalledWith("material_id",id);expect(material.select).not.toHaveBeenCalled();
});
test("rascunho ou material retirado não é salvo",async()=>{
 material.maybeSingle.mockResolvedValue({data:null,error:null});expect((await setMaterialSaved(id,true)).error).toContain("não está mais disponível");expect(saved.insert).not.toHaveBeenCalled();
});
test("erro de gravação não vira sucesso",async()=>{
 saved.insert.mockResolvedValue({error:{code:"42501",message:"private details"}});const result=await setMaterialSaved(id,true);expect(result.saved).toBeUndefined();expect(result.error).toContain("Não foi possível salvar");expect(revalidate).not.toHaveBeenCalled();
});
test("entrada inválida não consulta o banco",async()=>{
 expect((await setMaterialSaved("not-a-uuid",true)).error).toBeTruthy();expect(client.auth.getUser).not.toHaveBeenCalled();
});
