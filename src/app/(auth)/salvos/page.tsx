import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth/user";
import { LibraryHeader } from "@/components/library/library-header";
import { LibraryResults } from "@/components/library/library-results";
import { Suspense } from "react";
import "../../biblioteca/library.css";
export const metadata={title:"Materiais salvos | EduComp",robots:{index:false}};
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
 if(!await currentUser()) redirect("/entrar?next=/salvos");
 return <div className="library-page saved-page"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><LibraryHeader active="salvos"/><main className="library-container" id="conteudo"><section className="library-welcome" aria-labelledby="library-heading"><h1 id="library-heading">Materiais salvos</h1><p>Seus favoritos, reunidos para consultar quando precisar.</p></section><Suspense fallback={<p role="status">Carregando seus materiais…</p>}><LibraryResults params={searchParams} savedOnly/></Suspense></main></div>;
}
