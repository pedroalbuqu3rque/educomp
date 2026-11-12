/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { isCatalogExampleId } from "@/lib/library/catalog";
import { ExampleMaterialPage } from "@/components/material/example-material-page";
import { notFound } from "next/navigation";
import { LibraryHeader } from "@/components/library/library-header";
import { AccessPanel } from "@/components/material/access-panel";
import { CommunityPanel } from "@/components/community/community-panel";
import { loadCommunity } from "@/lib/community/load";
import type { CommunityFilter } from "@/lib/community/types";
import { loadMaterial, labels } from "@/lib/materials/load";
import "@/app/biblioteca/library.css";
import "@/components/material/material.css";
export const metadata = { title: "Material | EduComp" };
export default async function MaterialPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ contribuicoes?: string; pagina?: string }> }) {
 const { id } = await params;
 if(isCatalogExampleId(id)) return <ExampleMaterialPage id={id} />;
 const query = await searchParams;
 const filter: CommunityFilter = query.contribuicoes === "application_report" || query.contribuicoes === "discussion" ? query.contribuicoes : "all";
 const number = Number(query.pagina ?? "1");
 const page = Number.isSafeInteger(number) && number > 0 ? Math.min(number, 1000) : 1;
 const data = await loadMaterial(id);
 const community = data.material ? await loadCommunity(id, filter, page) : null;
 if (!data.material && !data.error) notFound();
 const material = data.material;
 return <div className="material-page"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><LibraryHeader /><main id="conteudo" className="material-container"><Link className="material-back" href="/biblioteca">‹ Voltar à Biblioteca</Link>
 {data.error ? <section className="material-content" role="alert"><h1>Não foi possível abrir o material</h1><p>{data.error}</p><Link className="button button-primary" href={`/materiais/${id}`}>Tentar novamente</Link></section> : material && <div className="material-columns"><article className="material-content">
 <header><div className="material-tags">{labels(material, "type").map(type => <span key={type}>{type}</span>)}</div><h1>{material.title}</h1></header>
 <section className="material-pedagogy"><h2>Informações pedagógicas</h2><dl className="material-metadata">{[{ category: "stage", title: "Etapa de ensino", icon: "stage.png" }, { category: "grade", title: "Ano escolar", icon: "calendar.png" }, { category: "axis", title: "Eixo da Computação", icon: "axis.png" }].map(item => <div key={item.category}><img src={`/material/${item.icon}`} alt="" width="19" height="19" /><div><dt>{item.title}</dt><dd>{labels(material, item.category).join(" · ") || "Não informado"}</dd></div></div>)}</dl><dl><dt>Abordagem da atividade</dt><dd>{material.approach === "both" ? "Plugada e desplugada" : material.approach === "plugged" ? "Plugada" : "Desplugada"}</dd></dl></section>
 <section className="material-text"><h2>Sobre este material</h2><p>{material.description}</p></section>
 <section className="material-text"><h2>Objetivos de aprendizagem</h2><p>{material.objectives || "Objetivos não informados."}</p></section>
 <section className="material-text"><h2>Autoria ou fonte</h2><p>{material.authorship}</p><div className="material-tags">{material.keywords.map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}</div></section>
 {community && <CommunityPanel materialId={id} data={community} filter={filter} />}
 </article><AccessPanel data={data} /></div>}
 </main></div>;
}
