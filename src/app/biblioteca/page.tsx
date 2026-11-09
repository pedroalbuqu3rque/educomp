import { Suspense } from "react";
import { LibraryHeader } from "@/components/library/library-header";
import "./library.css";
import { LibraryResults } from "@/components/library/library-results";
export const metadata={title:"Biblioteca | EduComp",description:"Explore materiais pedagógicos de Computação por tema, etapa, eixo e abordagem."};
export default function LibraryPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
 return <div className="library-page"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><LibraryHeader/><main className="library-container" id="conteudo"><section className="library-welcome" aria-labelledby="library-heading"><h1 id="library-heading">Biblioteca</h1><p>Encontre recursos pedagógicos para ensinar Computação na Educação Básica.</p></section><Suspense fallback={<p role="status" className="library-loading">Carregando materiais…</p>}><LibraryResults params={searchParams}/></Suspense></main></div>;
}
