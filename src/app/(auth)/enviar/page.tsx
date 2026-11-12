import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth/user";
import { loadRevisionSource } from "@/lib/materials/revisions";
import Link from "next/link";
import { LibraryHeader } from "@/components/library/library-header";
import { SubmissionForm } from "@/components/submissions/submission-form";
import "../../biblioteca/library.css";
import "../submission.css";
export const metadata={title:"Enviar material | EduComp",robots:{index:false}};
export default async function Page({searchParams}:{searchParams:Promise<{revisao?:string}>}){
 const {revisao}=await searchParams;
 const user=await currentUser();
 if(!user)redirect(`/entrar?next=${encodeURIComponent(revisao?`/enviar?revisao=${revisao}`:"/enviar")}`);
 const revision=revisao?await loadRevisionSource(user.id,revisao):null;
 return <div className="library-page submissions-page"><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><LibraryHeader active="enviar"/>
  <main id="conteudo" className="submissions-container"><header className="submissions-heading"><h1>{revision?"Editar e reenviar":"Enviar material"}</h1><p>{revision?"Revise os dados e prepare uma nova versão para avaliação editorial.":"Compartilhe recursos pedagógicos de Computação com outros professores."}</p>
   <nav className="submissions-tabs" aria-label="Envios"><span aria-current="page">Enviar material</span><Link href="/meus-envios">Meus envios</Link></nav>
   <p className="submissions-notice">Os materiais enviados passam por revisão antes de serem publicados na Biblioteca.</p></header>
   {revisao&&!revision?<section className="submission-panel" role="alert"><h2>Esta submissão não pode ser reenviada</h2><p>Confirme que o envio é seu, recebeu uma solicitação de ajustes ou foi recusado e ainda não possui uma nova versão.</p><Link href="/meus-envios" className="button button-outline">Ver meus envios</Link></section>:<SubmissionForm revision={revision??undefined}/> }
  </main></div>;
}
