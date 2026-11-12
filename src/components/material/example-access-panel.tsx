"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { setMaterialSaved } from "@/lib/library/saved-actions";

export function ExampleAccessPanel({id,signedIn,saved,savedError}:{id:string;signedIn:boolean;saved:boolean;savedError?:boolean}) {
 const router=useRouter();
 const [pending,startTransition]=useTransition();
 const [error,setError]=useState("");
 const login=`/entrar?next=${encodeURIComponent(`/materiais/${id}`)}`;
 function toggle() {
  setError("");
  startTransition(async()=>{
   const result=await setMaterialSaved(id,!saved);
   if(result.requiresLogin){router.push(login);return;}
   if(result.error){setError(result.error);return;}
   router.refresh();
  });
 }
 return <aside className="material-access">
  <div className="material-illustration" aria-hidden="true"><span className="material-example-symbol">E</span></div>
  <h2>Exemplo do acervo</h2>
  <p>Este card reproduz o protótipo da Biblioteca. Ainda não possui arquivos para download nem foi publicado como recurso pedagógico revisado.</p>
  <div className="material-actions">
   {signedIn?<button className="button button-outline" type="button" onClick={toggle} disabled={pending||savedError} aria-pressed={saved}>{pending?"Atualizando…":saved?"Remover dos salvos":"Salvar este exemplo"}</button>:<Link className="button button-outline" href={login}>Entrar para salvar</Link>}
   <Link className="button button-primary" href="/biblioteca">Explorar outros materiais</Link>
  </div>
  {(error||savedError)&&<p role="alert" className="material-feedback">{error||"Não foi possível consultar seus salvos."}</p>}
 </aside>;
}
