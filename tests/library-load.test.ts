import { beforeEach,expect,test,vi } from "vitest";
const {client}=vi.hoisted(()=>({client:{rpc:vi.fn(),auth:{getUser:vi.fn()},from:vi.fn()}}));
vi.mock("server-only",()=>({}));
vi.mock("@/lib/supabase/server",()=>({createClient:async()=>client}));
import {loadLibrary} from "../src/lib/library/load";
import {emptySelections} from "../src/lib/library/catalog";
const query={q:"lógica",selections:emptySelections(),page:2};
beforeEach(()=>{vi.resetAllMocks();process.env.NEXT_PUBLIC_SUPABASE_URL="https://example.supabase.co";process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="test";client.auth.getUser.mockResolvedValue({data:{user:null}});});
test("envia consulta e página ao banco sem carregar exemplos",async()=>{
 client.rpc.mockResolvedValue({data:{total:0,page:1,pages:1,items:[]},error:null});
 const result=await loadLibrary(query);expect(result.result.items).toEqual([]);expect(result.error).toBeUndefined();
 expect(client.rpc).toHaveBeenCalledWith("search_library",expect.objectContaining({p_q:"lógica",p_page:2,p_types:[]}));expect(client.from).not.toHaveBeenCalled();
});
test("migração ausente tem mensagem própria, não é acervo vazio",async()=>{
 client.rpc.mockResolvedValue({data:null,error:{code:"PGRST202"}});expect((await loadLibrary(query)).error).toContain("202611090004_library.sql");
});
test("falha de rede não é substituída por dados de demonstração",async()=>{
 client.rpc.mockRejectedValue(new Error("network"));const result=await loadLibrary(query);expect(result.error).toBeTruthy();expect(result.result.items).toEqual([]);
});
test("Salvos consulta apenas a função da coleção privada",async()=>{
 client.auth.getUser.mockResolvedValue({data:{user:{id:"user"}}});
 client.rpc.mockResolvedValue({data:{total:0,page:1,pages:1,items:[]},error:null});
 await loadLibrary(query,true);expect(client.rpc).toHaveBeenCalledWith("search_saved_library",expect.objectContaining({p_q:"lógica"}));
});
test("migração dos salvos ausente aponta o arquivo 005",async()=>{
 client.rpc.mockResolvedValue({data:null,error:{code:"PGRST202"}});expect((await loadLibrary(query,true)).error).toContain("202611090005_saved_materials.sql");
});
test("biblioteca carrega estado salvo do usuário verificado",async()=>{
 const id="10000000-0000-4000-8000-000000000001";
 client.auth.getUser.mockResolvedValue({data:{user:{id:"verified-user"}}});
 client.rpc.mockResolvedValue({data:{total:1,page:1,pages:1,items:[{id,title:"Aula",description:"Descrição",keywords:[],year:"4º ano",type:[],stage:[],axis:[],approach:[],authorship:"Autor",objectives:""}]},error:null});
 const favorites={select:vi.fn(),eq:vi.fn(),in:vi.fn()};favorites.select.mockReturnValue(favorites);favorites.eq.mockReturnValue(favorites);favorites.in.mockResolvedValue({data:[{material_id:id}],error:null});
 const files={select:vi.fn(),in:vi.fn(),order:vi.fn()};files.select.mockReturnValue(files);files.in.mockReturnValue(files);files.order.mockResolvedValue({data:[],error:null});
 client.from.mockImplementation((table:string)=>table==="saved_materials"?favorites:files);
 const result=await loadLibrary(query);expect(result.result.items[0].saved).toBe(true);expect(favorites.eq).toHaveBeenCalledWith("user_id","verified-user");
 favorites.in.mockResolvedValue({data:null,error:{message:"unavailable"}});
 const failed=await loadLibrary(query);expect(failed.savedError).toBe(true);expect(failed.result.items[0].saved).toBeUndefined();
});
