"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Modal } from "@/components/library/dialog";
import {ProfileAvatar} from "@/components/profile/profile-avatar";
import type { CommunityComment, CommunityFilter, CommunityPageData } from "@/lib/community/types";
import "./community.css";

type DialogMode = "comment"|"reply"|"application"|"edit"|"delete"|"report";
type DialogState = {mode:DialogMode; target?:CommunityComment};
const tabs: {key:CommunityFilter;label:string}[] = [
 {key:"all",label:"Todos"},
 {key:"application_report",label:"Relatos de aplicação"},
 {key:"discussion",label:"Discussões"},
];
const reasons=[
 {value:"personal_data",label:"Exposição de dados pessoais"},
 {value:"harassment",label:"Ofensa, assédio ou discurso inadequado"},
 {value:"spam",label:"Spam ou conteúdo fora do assunto"},
] as const;
const dateText=(value:string)=>new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"short",year:"numeric",timeZone:"America/Sao_Paulo"}).format(new Date(value));

export function CommunityPanel({materialId,data,filter}:{materialId:string;data:CommunityPageData;filter:CommunityFilter}){
 const router=useRouter();
 const [dialog,setDialog]=useState<DialogState|null>(null);
 const [body,setBody]=useState("");
 const [grade,setGrade]=useState("");
 const [adaptations,setAdaptations]=useState("");
 const [reason,setReason]=useState<(typeof reasons)[number]["value"]>("personal_data");
 const [details,setDetails]=useState("");
 const [pending,setPending]=useState(false);
 const [error,setError]=useState("");
 const [notice,setNotice]=useState("");
 const login=`/entrar?next=${encodeURIComponent(`/materiais/${materialId}`)}`;
 const hrefFor=(selected:CommunityFilter,page=1)=>`/materiais/${materialId}?contribuicoes=${selected}&pagina=${page}#comunidade`;

 function open(mode:DialogMode,target?:CommunityComment){
  if(!data.viewerId){router.push(login);return;}
  setError("");setNotice("");
  setBody(mode==="edit"?target?.body??"":"");
  setGrade(mode==="edit"?target?.grade??"":"");
  setAdaptations(mode==="edit"?target?.adaptations??"":"");
  setReason("personal_data");setDetails("");setDialog({mode,target});
 }
 function close(){if(!pending){setError("");setDialog(null);}}
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(!dialog||pending)return;
  setPending(true);setError("");
  const {mode,target}=dialog;
  let payload:Record<string,unknown>;
  if(mode==="comment"||mode==="reply"||mode==="application"){
   payload={action:"create",materialId,body:body.trim(),kind:mode==="application"?"application_report":"discussion"};
   if(mode==="reply")payload.parentId=target?.id;
   if(mode==="application"){payload.grade=grade.trim();payload.adaptations=adaptations.trim();}
  }else if(mode==="edit"){
   payload={action:"edit",commentId:target?.id,body:body.trim()};
   if(target?.kind==="application_report"){
    payload.grade=grade.trim();payload.adaptations=adaptations.trim();
   }
  }else if(mode==="delete")payload={action:"delete",commentId:target?.id};
  else payload={action:"report",commentId:target?.id,reason,details:details.trim()};
  try{
   const response=await fetch("/api/comunidade",{
    method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},
    body:JSON.stringify(payload),cache:"no-store",
   });
   const result=await response.json() as {error?:string};
   if(!response.ok){setError(result.error??"Não foi possível concluir. Tente novamente.");return;}
   setDialog(null);
   setNotice(mode==="report"?"Denúncia enviada para avaliação. O comentário permanece visível até a análise.":
    mode==="delete"?"Comentário excluído.":mode==="edit"?"Comentário atualizado.":
    mode==="application"?"Seu relato foi publicado.":mode==="reply"?"Resposta publicada.":"Comentário publicado.");
   router.refresh();
  }catch{setError("Não foi possível conectar. Verifique sua conexão e tente novamente.");}
  finally{setPending(false);}
 }

 function commentActions(comment:CommunityComment,reply=false){
  const mine=data.viewerId===comment.authorId;
  return <div className="community-record-actions">
   {!reply&&<button type="button" onClick={()=>open("reply",comment)}>Responder</button>}
   {mine ? <><button type="button" onClick={()=>open("edit",comment)}>Editar</button><button type="button" onClick={()=>open("delete",comment)}>Excluir</button></>:
    <button type="button" onClick={()=>open("report",comment)}>Denunciar</button>}
  </div>;
 }
 function commentCard(comment:CommunityComment,reply=false){
  return <article className={reply?"community-reply":"community-post"} key={comment.id}>
   <div className="community-post-head">
    <ProfileAvatar name={comment.authorName} path={comment.authorAvatar} className="community-avatar"/>
    <div className="community-post-identity">
     <div className="community-post-name"><Link href={`/perfis/${comment.authorId}`}>{comment.authorName}</Link>{data.viewerId===comment.authorId&&<span className="community-mine">Seu comentário</span>}</div>
     <time dateTime={comment.createdAt}>{dateText(comment.createdAt)}</time>
    </div>
    {!reply&&comment.kind==="application_report"&&<span className="community-kind">Relato de aplicação</span>}
   </div>
   <div className="community-post-body">
    <p>{comment.body}</p>
    {comment.kind==="application_report"&&comment.grade&&<p className="community-grade">Turma: {comment.grade}</p>}
    {comment.kind==="application_report"&&comment.adaptations&&<div className="community-adaptations"><strong>Adaptações realizadas</strong><p>{comment.adaptations}</p></div>}
    {comment.updatedAt!==comment.createdAt&&<span className="community-edited">Editado</span>}
   </div>
   {commentActions(comment,reply)}
   {!reply&&comment.replies.length>0&&<div className="community-replies" aria-label={`Respostas ao comentário de ${comment.authorName}`}>
    {comment.replies.map(item=>commentCard(item,true))}
   </div>}
  </article>;
 }

 const title=dialog?.mode==="comment"?"Escrever comentário":dialog?.mode==="reply"?"Responder comentário":dialog?.mode==="application"?"Relatar aplicação":dialog?.mode==="edit"?"Editar comentário":dialog?.mode==="delete"?"Excluir comentário":"Denunciar conteúdo";
 const explanation=dialog?.mode==="comment"?"Compartilhe uma dúvida, sugestão ou adaptação relacionada ao material.":
  dialog?.mode==="reply"?"Sua resposta ficará associada à conversa original.":
  dialog?.mode==="application"?"Conte como a proposta funcionou com sua turma.":
  dialog?.mode==="edit"?"Revise sua contribuição antes de salvar.":
  dialog?.mode==="delete"?"Essa ação não pode ser desfeita. Se houver respostas ao comentário, elas deixarão de aparecer.":
  "Ajude a manter um ambiente respeitoso e útil para docentes.";
 const applicationForm=dialog?.mode==="application"||(dialog?.mode==="edit"&&dialog.target?.kind==="application_report");
 const isWriting=dialog?.mode==="comment"||dialog?.mode==="reply"||dialog?.mode==="application"||dialog?.mode==="edit";
 const canSubmit=dialog?.mode==="delete"||dialog?.mode==="report"||(
  body.trim().length>=1&&body.trim().length<=1000&&(!applicationForm||(grade.trim().length>=1&&grade.trim().length<=80))
 );
 return <section className="community-section" id="comunidade" aria-labelledby="community-heading">
  <div className="community-heading"><div><h2 id="community-heading">Discussões</h2><p>Dúvidas, adaptações e sugestões de professores sobre este material.</p></div>
   <div className="community-primary-actions"><button type="button" className="button button-outline" onClick={()=>open("comment")}>Comentar</button><button type="button" className="button button-primary" onClick={()=>open("application")}>Relatar aplicação</button></div>
  </div>
  <p className="community-guidelines">Comentários de até 1.000 caracteres, apenas texto. Respostas em um único nível. Não compartilhe dados pessoais de estudantes.</p>
  {!data.viewerId&&<div className="community-auth-message"><Link href={login}>Entre na sua conta</Link> para compartilhar experiências, responder ou denunciar.</div>}
  <nav className="community-filters" aria-label="Filtrar contribuições">
   {tabs.map(tab=><Link key={tab.key} href={hrefFor(tab.key)} aria-current={tab.key===filter?"page":undefined}>{tab.label}</Link>)}
  </nav>
  <p className="community-count">{data.total} {data.total===1?"contribuição encontrada":"contribuições encontradas"}</p>
  <p role="status" aria-live="polite" className="community-status">{notice}</p>
  {data.error&&<p className="community-error" role="alert">{data.error}</p>}
  {!data.error||data.items.length>0 ? data.items.length>0 ? <div className="community-posts">{data.items.map(post=>commentCard(post))}</div> : <div className="community-empty"><h3>A conversa começa aqui</h3><p>{filter==="application_report"?"Ainda não há relatos de aplicação deste material.":filter==="discussion"?"Ainda não há discussões sobre este material.":"Seja a primeira pessoa a comentar ou contar como utilizou este material."}</p></div> : null}
  {data.pages>1&&<nav className="community-pagination" aria-label="Páginas das contribuições"><span>Página {data.page} de {data.pages}</span><div>
   {data.page>1&&<Link href={hrefFor(filter,data.page-1)}>‹ Anterior</Link>}
   {data.page<data.pages&&<Link href={hrefFor(filter,data.page+1)}>Próxima ›</Link>}
  </div></nav>}
  {notice && !dialog && <Modal titleId="community-success-title" onDismiss={()=>setNotice("")} className="community-dialog community-success-dialog"><span className="community-dialog-eyebrow">COMUNIDADE EDUCOMP</span><h2 id="community-success-title">{notice.split(".")[0]}</h2><p className="community-dialog-description">{notice}</p><button type="button" className="button button-primary" onClick={()=>setNotice("")}>Voltar à conversa</button></Modal>}
  {dialog&&<Modal titleId="community-dialog-title" onDismiss={close} className="community-dialog">
   <span className="community-dialog-eyebrow">COMUNIDADE EDUCOMP</span>
   <h2 id="community-dialog-title">{title}</h2>
   <p className="community-dialog-description">{explanation}</p>
   <form onSubmit={submit}>
    {isWriting&&<>
     {applicationForm&&<label className="community-field"><span className="community-field-label">Ano escolar da turma <strong aria-hidden="true">*</strong></span><input value={grade} onChange={event=>setGrade(event.target.value)} required maxLength={80} placeholder="Ex.: 4º ano" disabled={pending}/></label>}
     <label className="community-field"><span className="community-field-label">{dialog.mode==="reply"?"Sua resposta":dialog.mode==="application"?"Como foi a aplicação?":"Seu comentário"} <strong aria-hidden="true">*</strong></span><textarea value={body} onChange={event=>setBody(event.target.value)} required maxLength={1000} rows={5} disabled={pending} placeholder={dialog.mode==="reply"?"Escreva uma resposta para continuar a conversa…":dialog.mode==="application"?"Descreva a atividade, o que funcionou e os desafios encontrados…":"Compartilhe sua dúvida, experiência ou sugestão…"}/><small>{body.length}/1.000 caracteres</small></label>
     {applicationForm&&<label className="community-field">Adaptações realizadas (opcional)<textarea value={adaptations} onChange={event=>setAdaptations(event.target.value)} maxLength={1000} rows={3} disabled={pending} placeholder="Que mudanças você fez na proposta?"/><small>{adaptations.length}/1.000 caracteres</small></label>}
     <p className="community-modal-note">Não inclua nomes, fotos ou dados pessoais de estudantes.</p>
    </>}
    {dialog.mode==="report"&&<>
     <fieldset className="community-report-reasons"><legend>Motivo da denúncia</legend>
      {reasons.map(option=><label key={option.value}><input type="radio" name="community-report-reason" value={option.value} checked={reason===option.value} onChange={()=>setReason(option.value)} disabled={pending}/>{option.label}</label>)}
     </fieldset>
     <label className="community-field">Informações adicionais (opcional)<textarea value={details} onChange={event=>setDetails(event.target.value)} maxLength={1000} rows={3} disabled={pending} placeholder="Explique brevemente o problema."/></label>
     <p className="community-modal-note">A denúncia será avaliada por uma pessoa autorizada. O conteúdo não será ocultado automaticamente.</p>
    </>}
    {error&&<p className="community-error" role="alert">{error}</p>}
    <div className="community-modal-actions"><button type="button" className="button button-outline" disabled={pending} onClick={close}>Cancelar</button><button type="submit" className="button button-primary" disabled={pending||!canSubmit}>
     {pending?"Salvando…":dialog.mode==="comment"?"Publicar":dialog.mode==="reply"?"Publicar resposta":dialog.mode==="application"?"Publicar relato":dialog.mode==="edit"?"Salvar alterações":dialog.mode==="delete"?"Excluir comentário":"Enviar denúncia"}
    </button></div>
   </form>
  </Modal>}
 </section>;
}
