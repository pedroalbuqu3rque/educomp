import Link from "next/link";
import {notFound} from "next/navigation";
import {z} from "zod";
import {requireReviewer,reportDetail} from "@/lib/review/load";
import {reportReasonLabel,reportOutcomeLabel} from "@/lib/review/shared";
import {ReportReviewActions} from "@/components/review/review-actions";
import {ReviewHeader,ReviewInfo,ReportStatusBadge} from "@/components/review/review-layout";
export const metadata={title:"Analisar denúncia | EduComp"};
const eventLabels:Record<string,string>={start:"Análise iniciada",dismiss:"Denúncia descartada",hide:"Comentário ocultado",restore:"Comentário restaurado",delete:"Comentário excluído definitivamente"};
export default async function Page({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const client=await requireReviewer("/revisao/denuncias");
 if(!z.uuid().safeParse(id).success)notFound();
 const report=await reportDetail(client,id);
 return <>
  <ReviewHeader title="Analisar denúncia" description="Confira o contexto, a situação do comentário e registre uma decisão."/>
  <div className="review-back-row"><Link href="/revisao/denuncias" className="button button-outline">Voltar às denúncias</Link><ReportStatusBadge status={report.status}/></div>
  <div className="review-detail-grid"><article className="review-details"><h2>Comentário em {report.material_title}</h2>
   <p className="review-detail-subtitle">Motivo da denúncia: {reportReasonLabel(report.reason)}</p><hr/>
   <h3>Conteúdo denunciado</h3><blockquote className="review-quoted-comment">{report.comment_body}</blockquote>
   <p>Visibilidade atual: <strong>{{visible:"Visível",hidden:"Oculto",deleted:"Excluído"}[report.visibility as "visible"|"hidden"|"deleted"]}</strong></p>
   {report.details&&<><h3>Informações da denúncia</h3><p>{report.details}</p></>}
   <h3>Registro</h3><p>Enviada em {new Date(report.created_at).toLocaleString("pt-BR")}</p>
   {report.outcome&&<p>Resultado: {reportOutcomeLabel(report.outcome)}</p>}
   <p className="review-file-note">A identidade do denunciante não é exibida publicamente.</p>
  </article><ReportReviewActions id={report.id} status={report.status} visibility={report.visibility} outcome={report.outcome}/></div>
  <ReviewInfo title="Segurança da comunidade">Ocultar e restaurar alteram a visibilidade pública. Excluir definitivamente apaga o texto original, sem apagar o registro da decisão.</ReviewInfo>
  <section className="review-event-section"><h2>Histórico da moderação</h2>
   {report.events.length?<ol className="review-event-list">{report.events.map(event=><li key={event.id}><strong>{eventLabels[event.action]??event.action}</strong>
    <span>{event.reviewer} · {new Date(event.created_at).toLocaleString("pt-BR")}</span>{event.reason&&<p>Motivo: {event.reason}</p>}</li>)}</ol>:<p>A denúncia ainda não possui decisões registradas.</p>}
  </section>
 </>;
}
