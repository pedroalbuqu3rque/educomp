"use client";
import { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/library/dialog";
import { statusLabels, type SentMaterial } from "@/lib/materials/submission-status";

const date = (value:string) => new Intl.DateTimeFormat("pt-BR",{dateStyle:"medium"}).format(new Date(value));
function getStatus(material:SentMaterial){return material.is_published?"Publicado":statusLabels[material.review_status];}
function getDescription(material:SentMaterial){
 if(material.is_published)return "Conteúdo publicado e disponível no acervo.";
 if(material.review_status==="pending")return "Material recebido e aguardando a avaliação.";
 if(material.review_status==="in_review")return "Material em avaliação pela equipe de revisão.";
 if(material.review_status==="changes_requested")return "A equipe solicitou ajustes. Leia a justificativa e prepare uma nova versão.";
 if(material.review_status==="approved")return "Material aprovado. A publicação ainda não foi realizada.";
 return "Material não aprovado. Consulte a justificativa da revisão.";
}
export function MySubmissions({items,initialId}:{items:SentMaterial[];initialId?:string}) {
 const [selected,setSelected]=useState<SentMaterial|null>(items.find(item=>item.id===initialId)??null);
 return <><div className="submissions-history">
  {items.map(material=><article className="submissions-history-card" key={material.id}>
   <span className="submissions-type">{material.type}</span><h3>{material.title}</h3><p className="submissions-grade">{material.grade || "Classificação não informada"} · Enviado em {date(material.created_at)}</p>
   <p>{getDescription(material)}</p>
   {material.resubmission_of&&<p className="submission-revision-reference">Nova versão de um envio anterior.</p>}
   <div className="submissions-history-bottom"><span className={`submissions-status ${material.is_published?"published":material.review_status}`}>{getStatus(material)}</span>
    {material.is_published?<Link className="button button-outline" href={`/materiais/${material.id}`}>Ver material</Link>:<button type="button" className="button button-outline" onClick={()=>setSelected(material)}>Acompanhar envio</button>}</div>
  </article>)}
 </div>
 {selected&&<Modal titleId="submissions-tracking-title" onDismiss={()=>setSelected(null)} className="submission-tracking-dialog">
  <p className="submission-modal-eyebrow">ACOMPANHAMENTO DO MATERIAL</p><h2 id="submissions-tracking-title">Acompanhar envio</h2><p>Consulte o andamento do material compartilhado.</p>
  <div className="submission-tracking-item"><strong>{selected.title}</strong><span>{selected.type}</span><span className={`submissions-status ${selected.review_status}`}>{getStatus(selected)}</span></div>
  <h3>Etapas do envio</h3>
  <ol className="submission-tracking-stages">
   <li><strong>Enviado</strong><span>Material recebido pela plataforma</span></li>
   <li><strong>Em revisão</strong><span>{selected.review_status==="pending"?"Aguardando avaliação": "Avaliação iniciada"}</span></li>
   <li><strong>{selected.review_status==="rejected"?"Recusado":selected.review_status==="changes_requested"?"Ajustes solicitados":"Aprovado"}</strong><span>{selected.review_status==="rejected"?"Material não aprovado":selected.review_status==="changes_requested"?"Nova versão necessária":"Decisão editorial"}</span></li>
   <li><strong>Publicado</strong><span>Disponível na Biblioteca após publicação</span></li>
  </ol>
  {(selected.review_status==="rejected"||selected.review_status==="changes_requested")&&<div className="submission-review-reason"><strong>{selected.review_status==="changes_requested"?"Ajustes solicitados":"Justificativa da recusa"}</strong><p>{selected.reason??"A justificativa ainda não está disponível. Entre em contato com a equipe."}</p></div>}
  {(selected.review_status==="rejected"||selected.review_status==="changes_requested")&&
   (selected.revision_id?<p className="submission-revision-sent"><strong>Nova versão enviada</strong><br/>A versão atualizada está registrada em Meus envios.</p>
    :<Link className="button button-primary" href={`/enviar?revisao=${selected.id}`}>Editar e reenviar</Link>)}
  <button type="button" className="button button-outline" onClick={()=>setSelected(null)}>Fechar acompanhamento</button>
 </Modal>}
 </>;
}
