import Link from "next/link";
import { z } from "zod";
import { notFound } from "next/navigation";
import {requireReviewer,reviewDetail} from "@/lib/review/load";
import {readableSize} from "@/lib/review/shared";
import {MaterialReviewActions} from "@/components/review/review-actions";
import {ReviewHeader,ReviewInfo,ReviewStatusBadge} from "@/components/review/review-layout";
export const metadata={title:"Analisar submissão | EduComp"};
const eventLabels:Record<string,string>={start:"Análise iniciada",approve:"Material aprovado",reject:"Material recusado",request_changes:"Ajustes solicitados",publish:"Material publicado",unpublish:"Publicação retirada"};
const mimeLabels:Record<string,string>={"application/pdf":"PDF","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"DOCX","application/vnd.openxmlformats-officedocument.presentationml.presentation":"PPTX","image/png":"PNG","image/jpeg":"JPG"};
export default async function Page({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const client=await requireReviewer("/revisao");
 if(!z.uuid().safeParse(id).success)notFound();
 const material=await reviewDetail(client,id);
 const submittedDate=new Date(material.created_at).toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"});
 return <>
  <ReviewHeader title="Analisar submissão" description="Confira as informações do material e registre uma decisão editorial."/>
  <div className="review-back-row"><Link href="/revisao" className="button button-outline">Voltar aos envios</Link>
   <ReviewStatusBadge status={material.status} published={material.is_published}/></div>
  <div className="review-detail-grid"><article className="review-details">
   <h2>{material.title}</h2><p className="review-detail-subtitle">{material.category} · {material.axis} · {material.stage}{material.grade?` · ${material.grade}`:""}</p>
   {material.resubmission_of&&<p className="review-revision-origin">Esta é uma nova versão de uma submissão anterior. <Link href={`/revisao/${material.resubmission_of}`}>Consultar avaliação original</Link></p>}
   <hr/><h3>Descrição</h3><p>{material.description}</p>
   {material.objectives&&<><h3>Objetivos</h3><p>{material.objectives}</p></>}
   <h3>Autor ou fonte</h3><p>{material.authorship} · envio realizado por {material.submitter}</p>
   <h3>Palavras-chave</h3><div className="review-keywords">{material.keywords.map(word=><span key={word}>{word}</span>)}</div>
   <h3>Abordagem</h3><p>{{plugged:"Plugada",unplugged:"Desplugada",both:"Plugada e desplugada"}[material.approach as "plugged"|"unplugged"|"both"]}</p>
   <h3>Direitos de compartilhamento</h3><p>{material.rights_confirmed?"Declaração de autoria ou autorização confirmada pelo remetente.":"Declaração não confirmada."}</p>
   <h3>Arquivos anexados</h3><ul className="review-file-list">{material.files.map(file=><li key={file.id}>
    <a href={`/revisao/${material.id}/arquivos/${file.id}`}>{file.original_name}</a>
    <span> · {mimeLabels[file.mime_type]??"Arquivo"} · {readableSize(file.size_bytes)}</span>
   </li>)}</ul><p className="review-file-note">Arquivos privados: o download requer uma conta com permissão de revisão.</p>
   <p className="review-detail-date">Recebido em {submittedDate}</p>
  </article>
  <MaterialReviewActions id={material.id} status={material.status} published={material.is_published}/></div>
  <ReviewInfo title="Regras da avaliação">Conferir dados, classificações, autoria, direito de uso e segurança dos arquivos. Registrar responsável e data da decisão.</ReviewInfo>
  <section className="review-event-section"><h2>Histórico editorial</h2>
   {material.events.length?<ol className="review-event-list">{material.events.map(event=><li key={event.id}>
    <strong>{eventLabels[event.action]??event.action}</strong>
    <span>{event.reviewer} · {new Date(event.created_at).toLocaleString("pt-BR")}</span>
    {event.reason&&<p>Justificativa: {event.reason}</p>}
   </li>)}</ol>:<p>Nenhuma decisão editorial registrada até o momento.</p>}
  </section>
 </>;
}
