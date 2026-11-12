"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/library/dialog";
import {materialActionSchema,reportActionSchema,type MaterialAction,type ReportAction,type ReviewStatus,type ReportStatus} from "@/lib/review/shared";

const materialLabels:Record<MaterialAction,{title:string;button:string;description:string}>={
 start:{title:"Iniciar análise",button:"Iniciar análise",description:"O material passará para Em análise. A decisão editorial virá depois."},
 approve:{title:"Confirmar aprovação",button:"Aprovar material",description:"A aprovação não publica o recurso. Ele só ficará visível na Biblioteca após a publicação."},
 reject:{title:"Recusar material",button:"Registrar recusa",description:"A justificativa ficará disponível para o professor em Meus envios."},
 request_changes:{title:"Solicitar ajustes",button:"Registrar solicitação",description:"O professor poderá corrigir os dados e reenviar uma nova versão. Informe claramente o que precisa melhorar."},
 publish:{title:"Publicar material",button:"Confirmar publicação",description:"Após confirmar, o material e os arquivos poderão ser acessados na Biblioteca por usuários autorizados."},
 unpublish:{title:"Retirar da Biblioteca",button:"Confirmar retirada",description:"O recurso deixará de aparecer na Biblioteca e seu download público será bloqueado."},
};
const reportLabels:Record<ReportAction,{title:string;button:string;description:string}>={
 start:{title:"Iniciar análise da denúncia",button:"Iniciar análise",description:"A denúncia ficará Em análise até uma decisão ser registrada."},
 dismiss:{title:"Descartar denúncia",button:"Confirmar descarte",description:"Registra que a denúncia foi analisada e o comentário não precisa ser alterado."},
 hide:{title:"Ocultar comentário",button:"Confirmar ocultação",description:"O comentário e suas respostas ficarão ocultos nas consultas públicas."},
 restore:{title:"Restaurar comentário",button:"Confirmar restauração",description:"O comentário voltará a ficar visível, desde que o material esteja publicado."},
 delete:{title:"Excluir conteúdo definitivamente",button:"Confirmar exclusão",description:"Esta ação é irreversível: o texto original será apagado do banco e não poderá ser restaurado."},
};

function useReviewSubmit(path:string) {
 const router=useRouter();
 const [busy,setBusy]=useState(false);
 const [locked,setLocked]=useState(false);
 const [feedback,setFeedback]=useState("");
 const submit=async(data:{action:string;reason?:string})=>{
  if(busy||locked)return false;
  setBusy(true);setFeedback("");
  try{
   const response=await fetch(path,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(data),cache:"no-store"});
   const result=await response.json() as {ok?:boolean;error?:string};
   if(!response.ok||!result.ok){setFeedback(result.error??"Não foi possível registrar a decisão.");return false;}
   setLocked(true);
   setFeedback("Decisão registrada. Atualizando informações...");
   router.refresh();
   return true;
  }catch{setFeedback("Não foi possível conectar à plataforma. Tente novamente.");return false;}
  finally{setBusy(false);}
 };
 return {busy,locked,feedback,submit};
}

export function MaterialReviewActions({id,status,published}:{id:string;status:ReviewStatus;published:boolean}){
 const [action,setAction]=useState<MaterialAction|null>(null);
 const [reason,setReason]=useState("");
 const [dialogError,setDialogError]=useState("");
 const {busy,locked,feedback,submit}=useReviewSubmit(`/api/revisao/materiais/${id}`);
 const disabled=busy||locked;
 const showAction=(value:MaterialAction)=>{setReason("");setDialogError("");setAction(value);};
 const confirm=async()=>{
  if(!action)return;
  const parsed=materialActionSchema.safeParse({action,reason});
  if(!parsed.success){setDialogError(parsed.error.issues[0]?.message??"Verifique a justificativa.");return;}
  if(await submit(parsed.data)){setAction(null);setReason("");}else setDialogError("Não foi possível concluir. Consulte a mensagem de erro abaixo.");
 };
 return <section className="review-decision" aria-label="Análise editorial">
  <h2>Análise editorial</h2><ReviewState status={status} published={published}/>
  {status==="pending"&&<><p>Inicie a análise explicitamente antes de registrar aprovação ou recusa.</p>
   <button type="button" disabled={disabled} className="button button-primary review-wide" onClick={()=>showAction("start")}>Iniciar análise</button>
   <hr/><strong>Após iniciar a análise</strong><div className="review-actions-row"><button disabled className="button button-primary">Aprovar</button><button disabled className="button button-outline">Recusar</button></div>
   <p className="review-help">Ao recusar, é obrigatório informar uma justificativa para o professor.</p></>}
  {status==="in_review"&&<><p>Confira autoria, descrição, classificações, direitos e arquivos antes de decidir.</p>
   <div className="review-actions-row"><button type="button" disabled={disabled} className="button button-primary" onClick={()=>showAction("approve")}>Aprovar</button>
   <button type="button" disabled={disabled} className="button button-outline" onClick={()=>showAction("request_changes")}>Solicitar ajustes</button>
   <button type="button" disabled={disabled} className="button button-outline" onClick={()=>showAction("reject")}>Recusar</button></div>
   <p className="review-help">A recusa exige justificativa, que poderá ser consultada pelo professor.</p></>}
  {status==="approved"&&<><p>Aprovação editorial registrada. A disponibilidade pública é uma decisão separada.</p>
   <button type="button" className={`button ${published?"button-outline":"button-primary"} review-wide`} disabled={disabled} onClick={()=>showAction(published?"unpublish":"publish")}>{published?"Despublicar material":"Publicar na Biblioteca"}</button></>}
  {status==="rejected"&&<p>Material recusado. A justificativa e a decisão foram registradas no histórico.</p>}
  {status==="changes_requested"&&<p>Aguardando nova versão do professor. A justificativa foi registrada no histórico.</p>}
  <ReviewInfoBox title="Publicação">Aprovação editorial e disponibilidade pública são controles distintos.</ReviewInfoBox>
  {feedback&&<p className={locked?"review-feedback":"review-error"} role="status">{feedback}</p>}
  {action&&<Modal titleId="review-action-title" onDismiss={()=>{if(!busy)setAction(null);}} className="review-confirm-dialog">
   <h2 id="review-action-title">{materialLabels[action].title}</h2><p>{materialLabels[action].description}</p>
   {(action==="reject"||action==="request_changes")&&<label className="review-reason-field">Justificativa para o professor *<textarea value={reason} onChange={event=>setReason(event.target.value)} maxLength={1000} rows={4} placeholder={action==="request_changes"?"Indique quais pontos devem ser ajustados...":"Explique o motivo da recusa..."} required aria-invalid={!!dialogError}/></label>}
   {dialogError&&<p className="review-error" role="alert">{dialogError}</p>}
   <div className="review-dialog-actions"><button type="button" className="button button-outline" disabled={busy} onClick={()=>setAction(null)}>Cancelar</button>
    <button type="button" className={`button ${action==="reject"||action==="unpublish"?"button-danger":"button-primary"}`} disabled={busy} onClick={confirm}>{busy?"Registrando...":materialLabels[action].button}</button></div>
  </Modal>}
 </section>;
}
export function ReportReviewActions({id,status,visibility,outcome}:{id:string;status:ReportStatus;visibility:string;outcome:string|null}){
 const [action,setAction]=useState<ReportAction|null>(null);
 const [reason,setReason]=useState("");
 const [dialogError,setDialogError]=useState("");
 const {busy,locked,feedback,submit}=useReviewSubmit(`/api/revisao/denuncias/${id}`);
 const disabled=busy||locked;
 const showAction=(value:ReportAction)=>{setReason("");setDialogError("");setAction(value);};
 const confirm=async()=>{
  if(!action)return;
  const parsed=reportActionSchema.safeParse({action,reason});
  if(!parsed.success){setDialogError(parsed.error.issues[0]?.message??"Verifique a justificativa.");return;}
  if(await submit(parsed.data)){setAction(null);setReason("");}else setDialogError("Não foi possível concluir. Consulte a mensagem de erro abaixo.");
 };
 return <section className="review-decision" aria-label="Decisão sobre denúncia">
  <h2>Moderação do comentário</h2><span className={`review-status-badge ${status}`}>{({pending:"Pendente",in_review:"Em análise",resolved:"Concluída"})[status]}</span>
  {status==="pending"&&<><p>A denúncia não oculta automaticamente o comentário. Inicie a análise para decidir.</p>
   <button type="button" className="button button-primary review-wide" disabled={disabled} onClick={()=>showAction("start")}>Iniciar análise</button></>}
  {status==="in_review"&&<><p>Considere o contexto da publicação e registre o motivo da decisão.</p>
   <div className="review-action-stack">
    {visibility==="visible"&&<button type="button" className="button button-outline" disabled={disabled} onClick={()=>showAction("hide")}>Ocultar comentário</button>}
    {visibility==="hidden"&&<button type="button" className="button button-outline" disabled={disabled} onClick={()=>showAction("restore")}>Restaurar comentário</button>}
    {visibility!=="deleted"&&<button type="button" className="button button-danger" disabled={disabled} onClick={()=>showAction("delete")}>Excluir definitivamente</button>}
    <button type="button" className="button button-outline" disabled={disabled} onClick={()=>showAction("dismiss")}>Descartar denúncia</button>
   </div></>}
  {status==="resolved"&&<>
   <p>A denúncia foi concluída. Consulte o histórico da moderação.</p>
   {((outcome==="hidden"&&visibility==="hidden")||(outcome==="restored"&&visibility==="visible"))&&
    <div className="review-action-stack">
     {visibility==="hidden"?<button type="button" className="button button-outline" disabled={disabled} onClick={()=>showAction("restore")}>Restaurar comentário</button>
      :<button type="button" className="button button-outline" disabled={disabled} onClick={()=>showAction("hide")}>Ocultar novamente</button>}
     <button type="button" className="button button-danger" disabled={disabled} onClick={()=>showAction("delete")}>Excluir definitivamente</button>
    </div>}
  </>}
  <ReviewInfoBox title="Registros de moderação">Todas as decisões registram responsável, data e justificativa. Uma exclusão é irreversível.</ReviewInfoBox>
  {feedback&&<p role="status" className={locked?"review-feedback":"review-error"}>{feedback}</p>}
  {action&&<Modal titleId="moderation-action-title" onDismiss={()=>{if(!busy)setAction(null);}} className="review-confirm-dialog">
   <h2 id="moderation-action-title">{reportLabels[action].title}</h2><p>{reportLabels[action].description}</p>
   {action!=="start"&&<label className="review-reason-field">Justificativa da decisão *<textarea rows={4} maxLength={1000} value={reason} onChange={event=>setReason(event.target.value)} placeholder="Explique a decisão e o contexto..." required aria-invalid={!!dialogError}/></label>}
   {dialogError&&<p className="review-error" role="alert">{dialogError}</p>}
   <div className="review-dialog-actions"><button type="button" className="button button-outline" onClick={()=>setAction(null)} disabled={busy}>Cancelar</button>
    <button type="button" className={`button ${action==="delete"?"button-danger":"button-primary"}`} disabled={busy} onClick={confirm}>{busy?"Registrando...":reportLabels[action].button}</button></div>
  </Modal>}
 </section>;
}
function ReviewState({status,published}:{status:ReviewStatus;published:boolean}) {
 const labels={pending:"Pendente",in_review:"Em análise",approved:"Aprovado",rejected:"Recusado",changes_requested:"Ajustes solicitados"};
 return <span className={`review-status-badge ${published?"published":status}`}>{published?"Publicado":labels[status]}</span>;
}
function ReviewInfoBox({title,children}:{title:string;children:React.ReactNode}) {
 return <div className="review-info-box"><strong>{title}</strong><p>{children}</p></div>;
}
