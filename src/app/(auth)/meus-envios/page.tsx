import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth/user";
import { LibraryHeader } from "@/components/library/library-header";
import { MySubmissions } from "@/components/submissions/my-submissions";
import { loadSubmissions } from "@/lib/materials/submissions";
import "../../biblioteca/library.css";
import "../submission.css";
export const metadata={title:"Meus envios | EduComp",robots:{index:false}};
export default async function Page({searchParams}:{searchParams:Promise<{page?:string;material?:string}>}){
 const user=await currentUser();
 if(!user)redirect("/entrar?next=/meus-envios");
 const params=await searchParams;
 const rawPage=Number(params.page??1);
 const page=Number.isSafeInteger(rawPage)&&rawPage>0?Math.min(rawPage,1000):1;
 const data=await loadSubmissions(user.id,page);
 const currentPage=data.page;
 return <div className="library-page submissions-page"><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><LibraryHeader active="enviar"/>
  <main className="submissions-container" id="conteudo"><header className="submissions-heading"><h1>Meus envios</h1><p>Acompanhe o andamento das suas contribuições e consulte os recursos publicados.</p>
   <nav className="submissions-tabs" aria-label="Envios"><Link href="/enviar">Enviar material</Link><span aria-current="page">Meus envios</span></nav></header>
   <section className="submissions-list-section"><h2>Materiais enviados</h2><p>Consulte o status das contribuições realizadas por você.</p>
    {data.error?<p role="alert" className="submission-field-error">{data.error}</p>:<><div className="submissions-total">{data.total} {data.total===1?"material enviado":"materiais enviados"}</div>
     {data.items.length?<MySubmissions items={data.items} initialId={params.material}/>:<div className="submissions-no-items"><h3>Você ainda não enviou materiais</h3><p>Compartilhe sua primeira atividade, aula, sequência didática ou jogo com outros professores.</p><Link href="/enviar" className="button button-primary">Enviar material</Link></div>}
     {data.pages>1&&<nav className="submissions-pages" aria-label="Páginas de envios"><Link aria-disabled={currentPage<=1} href={currentPage<=1?"/meus-envios":`/meus-envios?page=${currentPage-1}`}>Anterior</Link><span>Página {currentPage} de {data.pages}</span><Link aria-disabled={currentPage>=data.pages} href={currentPage>=data.pages?"/meus-envios":`/meus-envios?page=${currentPage+1}`}>Próxima</Link></nav>}
    </>}
    <p className="submissions-note">Recursos em revisão só ficam disponíveis na Biblioteca após a publicação.</p>
   </section>
  </main></div>;
}
