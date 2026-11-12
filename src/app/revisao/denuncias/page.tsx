import Link from "next/link";
import { redirect } from "next/navigation";
import {requireReviewer,reportsQueue} from "@/lib/review/load";
import {reportReasonLabel,reportStatusLabel,type ReportStatus} from "@/lib/review/shared";
import {ReviewHeader,ReviewTabs,ReviewSummary,ReportStatusBadge,ReviewInfo,ReviewPagination} from "@/components/review/review-layout";
export const metadata={title:"Moderação de discussões | EduComp"};
export default async function Page({searchParams}:{searchParams:Promise<{status?:string;page?:string}>}){
 const client=await requireReviewer("/revisao/denuncias");
 const params=await searchParams;
 const allowed=["all","pending","in_review","resolved"] as const;
 const status:(typeof allowed)[number]=allowed.includes(params.status as typeof allowed[number])?params.status as typeof allowed[number]:"all";
 const raw=Number(params.page??1);
 const page=Number.isSafeInteger(raw)&&raw>0?Math.min(raw,1000):1;
 const reports=await reportsQueue(client,status,page);
 if (page > reports.pages) redirect(`/revisao/denuncias?status=${status}&page=${reports.pages}`);
 const metrics=[
  {label:"Pendentes",count:reports.pending,href:"/revisao/denuncias?status=pending",active:status==="pending"},
  {label:"Em análise",count:reports.inReview,href:"/revisao/denuncias?status=in_review",active:status==="in_review"},
  {label:"Concluídas",count:reports.completed,href:"/revisao/denuncias?status=resolved",active:status==="resolved"},
 ];
 return <>
  <ReviewHeader title="Moderação de discussões" description="Analise denúncias recebidas e tome decisões sobre comentários publicados."/>
  <ReviewTabs active="reports"/>
  <ReviewInfo title="Moderação de comentários">Denúncias não ocultam automaticamente um comentário. Um revisor precisa avaliar o contexto.</ReviewInfo>
  <ReviewSummary items={metrics}/>
  <section className="review-list-section"><div className="review-section-heading"><h2>Denúncias recebidas</h2>{status!=="all"&&<Link href="/revisao/denuncias" className="review-reset">Mostrar todas</Link>}</div>
   {reports.items.length?<div className="review-queue">{reports.items.map(item=><article className="review-queue-item" key={item.id}>
    <div className="review-queue-description"><h3>Comentário em {item.material_title}</h3><p>Motivo: {reportReasonLabel(item.reason)} · {new Date(item.created_at).toLocaleDateString("pt-BR")}</p></div>
    <ReportStatusBadge status={item.status}/>
    <Link className="button button-outline" href={`/revisao/denuncias/${item.id}`}>Analisar denúncia<span className="sr-only"> — {reportStatusLabel(item.status as ReportStatus)}</span></Link>
   </article>)}</div>:<div className="review-empty"><h3>Nenhuma denúncia nesta situação</h3><p>Quando professores denunciarem comentários, as denúncias aparecerão aqui para avaliação.</p></div>}
   <ReviewPagination base="/revisao/denuncias" filter={status} page={page} pages={reports.pages}/>
  </section>
  <ReviewInfo title="Ações disponíveis">Ocultar, restaurar ou excluir comentário. Cada decisão registra responsável, data e motivo. A exclusão é irreversível.</ReviewInfo>
 </>;
}
