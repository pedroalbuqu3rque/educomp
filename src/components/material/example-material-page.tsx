/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { LibraryHeader } from "@/components/library/library-header";
import { loadCatalogExample } from "@/lib/library/example-detail";
import { ExampleAccessPanel } from "./example-access-panel";

export async function ExampleMaterialPage({id}:{id:string}) {
 const data=await loadCatalogExample(id);
 if(!data.example && !data.error) notFound();
 const example=data.example;
 return <div className="material-page">
  <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <LibraryHeader />
  <main id="conteudo" className="material-container"><Link className="material-back" href="/biblioteca">‹ Voltar à Biblioteca</Link>
   {data.error ? <section className="material-content" role="alert"><h1>Não foi possível abrir o exemplo</h1><p>{data.error}</p><Link className="button button-primary" href="/biblioteca">Voltar à Biblioteca</Link></section> : example &&
   <div className="material-columns"><article className="material-content">
    <header><p className="material-example-label">Exemplo de interface · Figma EduComp</p><div className="material-tags">{example.type.map(type=><span key={type}>{type}</span>)}</div><h1>{example.title}</h1></header>
    <section className="material-pedagogy"><h2>Informações pedagógicas</h2>
     <dl className="material-metadata">
      {[{title:"Etapa de ensino",value:example.stage.join(" · "),icon:"stage.png"},{title:"Ano escolar",value:example.year,icon:"calendar.png"},{title:"Eixo da Computação",value:example.axis.join(" · "),icon:"axis.png"}].map(item=><div key={item.title}><img src={`/material/${item.icon}`} alt="" width="19" height="19" /><div><dt>{item.title}</dt><dd>{item.value}</dd></div></div>)}
     </dl><dl><dt>Abordagem da atividade</dt><dd>{example.approach.join(" e ")}</dd></dl>
    </section>
    <section className="material-text"><h2>Sobre este exemplo</h2><p>{example.description}</p></section>
    <section className="material-text"><h2>Objetivo de aprendizagem sugerido</h2><p>{example.objectives}</p></section>
    <section className="material-text"><h2>Palavras-chave</h2><div className="material-tags">{example.keywords.map(word=><span key={word}>{word}</span>)}</div></section>
    <section className="material-text"><h2>Sobre a autoria</h2><p>Conteúdo ilustrativo do EduComp para demonstrar como os materiais são apresentados. Não representa uma contribuição enviada por um professor e não inclui anexos.</p></section>
   </article><ExampleAccessPanel id={example.id} signedIn={data.signedIn} saved={data.saved} savedError={data.savedError}/></div>}
  </main>
 </div>;
}
