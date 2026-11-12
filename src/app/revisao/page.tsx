import Link from "next/link";
import { redirect } from "next/navigation";
import {requireReviewer,reviewQueue} from "@/lib/review/load";
import {materialStatusLabel,reviewFilters,type ReviewFilter} from "@/lib/review/shared";
import {ReviewHeader,ReviewTabs,ReviewSummary,ReviewStatusBadge,ReviewInfo,ReviewPagination} from "@/components/review/review-layout";
export const metadata={title:"Revisão de materiais | EduComp"};
export default async function Page({searchParams}:{searchParams:Promise<{status?:string;page?:string}>}) {
 const client=await requireReviewer("/revisao");
 const params=await searchParams;
 const status:ReviewFilter=reviewFilters.includes(params.status as ReviewFilter)?params.status as ReviewFilter:"all";
 const raw=Number(params.page??1);
 const page=Number.isSafeInteger(raw)&&raw>0?Math.min(raw,1000):1;
 const queue=await reviewQueue(client,status,page);
 if (page > queue.pages) redirect(`/revisao?status=${status}&page=${queue.pages}`);
 const metrics=[
  {label:"Pendentes",count:queue.pending,href:"/revisao?status=pending",active:status==="pending"},
  {label:"Em análise",count:queue.inReview,href:"/revisao?status=in_review",active:status==="in_review"},
  {label:"Concluídas",count:queue.completed,href:"/revisao?status=completed",active:status==="completed"},
 ];
 return <>
  <ReviewHeader title="Revisão de materiais" description="Área restrita para analisar contribuições antes de disponibilizá-las no acervo."/>
  <ReviewTabs active="materials"/><ReviewSummary items={metrics}/>
  <section className="review-list-section" aria-labelledby="review-queue-title"><div className="review-section-heading">
   <h2 id="review-queue-title">Submissões para revisão</h2>{status!=="all"&&<Link href="/revisao" className="review-reset">Mostrar todas</Link>}</div>
   {queue.items.length?<div className="review-queue">
    {queue.items.map(item=><article key={item.id} className="review-queue-item">
     <div className="review-queue-description"><h3>{item.title}</h3><p>{item.category} · {item.stage}{item.grade?` · ${item.grade}`:""}</p></div>
     <ReviewStatusBadge status={item.status} published={item.is_published}/>
     <Link href={`/revisao/${item.id}`} className="button button-outline">{item.status==="in_review"?"Continuar":"Abrir envio"}<span className="sr-only"> — {item.title}, {materialStatusLabel(item.status,item.is_published)}</span></Link>
    </article>)}
   </div>:<div className="review-empty"><h3>Nenhuma submissão nesta situação</h3><p>Quando houver contribuições com este status, elas aparecerão aqui.</p></div>}
   <ReviewPagination base="/revisao" filter={status} page={page} pages={queue.pages}/>
  </section>
  <ReviewInfo title="Acesso restrito">Somente revisores autorizados podem iniciar análise, aprovar, recusar ou despublicar materiais.</ReviewInfo>
 </>;
}
