import {beforeEach,expect,test,vi} from "vitest";
const {client,showcase,saved,revalidate}=vi.hoisted(()=>( {
 client:{auth:{getUser:vi.fn()},from:vi.fn()},
 showcase:{select:vi.fn(),eq:vi.fn(),maybeSingle:vi.fn()},
 saved:{insert:vi.fn(),delete:vi.fn(),eq:vi.fn()},revalidate:vi.fn()
}));
vi.mock("@/lib/supabase/server",()=>({createClient:async()=>client}));
vi.mock("next/cache",()=>({revalidatePath:revalidate}));
import {setMaterialSaved} from "../src/lib/library/saved-actions";
const id="d3000000-0000-4000-8000-000000000001";
beforeEach(()=>{
 vi.resetAllMocks();
 client.auth.getUser.mockResolvedValue({data:{user:{id:"teacher"}},error:null});
 client.from.mockImplementation((table:string)=>table==="catalog_examples"?showcase:table==="saved_catalog_examples"?saved:null);
 showcase.select.mockReturnValue(showcase);showcase.eq.mockReturnValue(showcase);
 showcase.maybeSingle.mockResolvedValue({data:{id},error:null});
 saved.insert.mockResolvedValue({error:null});
 saved.delete.mockReturnValue(saved);saved.eq.mockReturnValue(saved);
 saved.eq.mockImplementationOnce(()=>saved).mockImplementationOnce(()=>Promise.resolve({error:null}));
});
test("salvar exemplo consulta apenas tabela própria e respeita identidade autenticada",async()=>{
 expect(await setMaterialSaved(id,true)).toEqual({saved:true});
 expect(client.from).toHaveBeenCalledWith("catalog_examples");
 expect(client.from).toHaveBeenCalledWith("saved_catalog_examples");
 expect(saved.insert).toHaveBeenCalledWith({user_id:"teacher",example_id:id});
 expect(revalidate).toHaveBeenCalledWith("/salvos");
});
test("retirar exemplo remove somente favorito do titular",async()=>{
 expect(await setMaterialSaved(id,false)).toEqual({saved:false});
 expect(saved.eq).toHaveBeenCalledWith("user_id","teacher");
 expect(saved.eq).toHaveBeenCalledWith("example_id",id);
});
test("visitante não pode salvar um exemplo",async()=>{
 client.auth.getUser.mockResolvedValue({data:{user:null},error:null});
 expect((await setMaterialSaved(id,true)).requiresLogin).toBe(true);
 expect(client.from).not.toHaveBeenCalled();
});
test("exemplo desativado não é salvo",async()=>{
 showcase.maybeSingle.mockResolvedValue({data:null,error:null});
 expect((await setMaterialSaved(id,true)).error).toContain("não está mais disponível");
 expect(saved.insert).not.toHaveBeenCalled();
});
