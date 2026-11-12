"use client";
import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/library/dialog";
import type {RevisionSource} from "@/lib/materials/revision-shared";
import { axes, gradesByStage, MAX_FILES, MAX_TOTAL_BYTES, stages, resubmissionSchema, types, validateFiles } from "@/lib/materials/submission";

type MultiKey = "types" | "stages" | "grades" | "axes";
type FieldKey = MultiKey | "title" | "description" | "keywords" | "authorship" | "objectives" | "approach" | "rights_confirmed";
type State = {
 title:string;description:string;keywords:string[];types:string[];stages:string[];grades:string[];axes:string[];
 authorship:string;objectives:string;approach:string;rights_confirmed:boolean;
};
const emptyState:State={title:"",description:"",keywords:[],types:[],stages:[],grades:[],axes:[],authorship:"",objectives:"",approach:"",rights_confirmed:false};
const formatSize=(size:number) => size>=1024*1024?`${(size/(1024*1024)).toLocaleString("pt-BR",{maximumFractionDigits:1})} MB`:`${Math.ceil(size/1024)} KB`;

function Choices({title,choices,selected,onToggle,error,disabled}:{title:string;choices:readonly string[];selected:string[];onToggle:(v:string)=>void;error?:string;disabled:boolean}) {
 return <div className="submission-field"><span className="submission-label">{title} <span aria-hidden="true">*</span></span>
  <details className="submission-choice"><summary aria-label={`${title}: ${selected.length} selecionado(s)`}>{selected.length?selected.join(", "):"Selecione uma ou mais opções"}<span aria-hidden="true">⌄</span></summary>
  <fieldset disabled={disabled} aria-label={title}>
   <legend className="sr-only">{title}</legend>
   {choices.map(option=><label key={option}><input type="checkbox" checked={selected.includes(option)} onChange={()=>onToggle(option)}/>{option}</label>)}
  </fieldset></details>{error&&<p className="submission-field-error" role="alert">{error}</p>}</div>;
}

export function SubmissionForm({revision}:{revision?:RevisionSource}) {
 const router=useRouter();
 const inputRef=useRef<HTMLInputElement>(null);
 const [values,setValues]=useState<State>(revision?{
  title:revision.title,description:revision.description,keywords:revision.keywords,types:revision.types,
  stages:revision.stages,grades:revision.grades,axes:revision.axes,authorship:revision.authorship,
  objectives:revision.objectives,approach:revision.approach,rights_confirmed:false,
 }:emptyState);
 const [keyword,setKeyword]=useState("");
 const [files,setFiles]=useState<File[]>([]);
 const [errors,setErrors]=useState<Partial<Record<FieldKey | "files",string>>>({});
 const [notice,setNotice]=useState("");
 const [busy,setBusy]=useState(false);
 const [success,setSuccess]=useState<string|null>(null);
 const [confirmCancel,setConfirmCancel]=useState(false);
 const visibleGrades=stages.flatMap(stage=>values.stages.includes(stage)?gradesByStage[stage]:[]);

 function update(key:FieldKey,value:string|boolean) {setValues(old=>({...old,[key]:value}));setErrors(old=>({...old,[key]:undefined}));}
 function toggle(key:MultiKey,option:string) {
  setValues(old=>{
   const current=old[key];
   const values=current.includes(option)?current.filter(value=>value!==option):[...current,option];
   const next={...old,[key]:values};
   if(key==="stages"){
    const allowed=new Set(values.flatMap(stage=>gradesByStage[stage as keyof typeof gradesByStage]??[]));
    next.grades=old.grades.filter(grade=>allowed.has(grade));
   }
   return next;
  });
  setErrors(old=>({...old,[key]:undefined,grades:undefined}));
 }
 function collectKeywords(extra:string) {
  return [...values.keywords,...extra.split(",").map(term=>term.trim()).filter(Boolean)];
 }
 function addKeyword() {
  if(!keyword.trim())return;
  const all=collectKeywords(keyword);
  if(all.length>12){setErrors(old=>({...old,keywords:"Use até 12 palavras-chave."}));return;}
  if(all.some((tag,index)=>all.findIndex(other=>other.toLocaleLowerCase("pt-BR")===tag.toLocaleLowerCase("pt-BR"))!==index)){
   setErrors(old=>({...old,keywords:"Essa palavra-chave já foi adicionada."}));return;
  }
  if(all.some(tag=>tag.length<2||tag.length>40)){setErrors(old=>({...old,keywords:"Use palavras-chave entre 2 e 40 caracteres."}));return;}
  setValues(old=>({...old,keywords:all}));setKeyword("");setErrors(old=>({...old,keywords:undefined}));
 }
 function keywordKeyDown(event:KeyboardEvent<HTMLInputElement>) {
  if(event.key==="Enter"||event.key===","){event.preventDefault();addKeyword();}
 }
 function chooseFiles(additions:File[]) {
  if(!additions.length)return;
  const next=[...files,...additions.filter(file=>!files.some(existing=>existing.name===file.name&&existing.size===file.size&&existing.lastModified===file.lastModified))];
  try { validateFiles(next);setFiles(next);setErrors(old=>({...old,files:undefined}));setNotice(""); }
  catch(error){setErrors(old=>({...old,files:error instanceof Error?error.message:"Confira os arquivos."}));}
 }
 function chooseInput(event:ChangeEvent<HTMLInputElement>){chooseFiles(Array.from(event.currentTarget.files??[]));event.currentTarget.value="";}
 function onDrop(event:DragEvent<HTMLDivElement>){event.preventDefault();if(!busy)chooseFiles(Array.from(event.dataTransfer.files));}
 async function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if(busy)return;
  setNotice("");
  const candidate={...values,keywords:collectKeywords(keyword),...(revision?{resubmission_of:revision.id}:{})};
  const parsed=resubmissionSchema.safeParse(candidate);
  const errorsNext:typeof errors={};
  if(!parsed.success)for(const issue of parsed.error.issues){const key=issue.path[0] as FieldKey; if(!errorsNext[key])errorsNext[key]=issue.message;}
  try {validateFiles(files);}catch(error){errorsNext.files=error instanceof Error?error.message:"Adicione arquivos válidos.";}
  if(Object.keys(errorsNext).length){setErrors(errorsNext);setNotice("Confira os campos e arquivos indicados antes de enviar.");return;}
  setErrors({});setBusy(true);setNotice("Validando os arquivos e enviando o material…");
  try {
   const form=new FormData();
   form.set("payload",JSON.stringify(parsed.data));
   files.forEach(file=>form.append("files",file,file.name));
   const response=await fetch("/api/materiais",{method:"POST",body:form,cache:"no-store"});
   const payload: {id?:string;error?:string}=await response.json();
   if(!response.ok||!payload.id){setNotice(payload.error??"Não foi possível enviar. Tente novamente.");return;}
   setSuccess(payload.id);
   setValues({...emptyState});setFiles([]);setKeyword("");setNotice("");
   router.refresh();
  } catch {setNotice("O envio foi interrompido. Verifique sua conexão e consulte Meus envios antes de tentar novamente.");}
  finally {setBusy(false);}
 }
 return <>
  {revision&&<div className="submission-revision-banner" role="note"><strong>{revision.status==="changes_requested"?"Ajustes solicitados":"Material recusado"} — nova versão</strong><p>{revision.reason??"Confira as orientações da revisão antes de reenviar."}</p><small>Os campos foram preenchidos com o envio anterior. Adicione novos arquivos e confirme os direitos de compartilhamento. A versão anterior permanece no histórico.</small>{revision.fileNames.length>0&&<p>Arquivos anteriores: {revision.fileNames.join(", ")}</p>}</div>}
  <form className="submission-form" onSubmit={submit} noValidate>
   <section className="submission-panel submission-details" aria-labelledby="submission-details-title">
    <h2 id="submission-details-title">Informações do material</h2><p className="submission-caption">Preencha os dados para que outros professores encontrem e avaliem o recurso.</p>
    <label className="submission-field"><span className="submission-label">Título do material *</span>
     <input type="text" required disabled={busy} maxLength={200} value={values.title} onChange={e=>update("title",e.target.value)} placeholder="Ex.: Algoritmos no dia a dia" aria-invalid={Boolean(errors.title)}/>
     {errors.title&&<span className="submission-field-error">{errors.title}</span>}</label>
    <label className="submission-field"><span className="submission-label">Descrição *</span>
     <textarea required disabled={busy} rows={3} maxLength={10000} value={values.description} onChange={e=>update("description",e.target.value)} placeholder="Explique o conteúdo, o objetivo e como usar em aula." aria-invalid={Boolean(errors.description)}/>
     {errors.description&&<span className="submission-field-error">{errors.description}</span>}</label>
    <div className="submission-field"><label htmlFor="submission-keyword" className="submission-label">Tema / palavras-chave *</label>
     <input id="submission-keyword" disabled={busy} value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={keywordKeyDown} onBlur={addKeyword} placeholder="Adicione palavras-chave e pressione Enter" maxLength={120} aria-invalid={Boolean(errors.keywords)}/>
     <div className="submission-keywords" aria-label="Palavras-chave selecionadas">{values.keywords.map(tag=><button type="button" key={tag} title={`Remover ${tag}`} disabled={busy} onClick={()=>setValues(old=>({...old,keywords:old.keywords.filter(item=>item!==tag)}))}>{tag}<span aria-hidden="true"> ×</span></button>)}</div>
     {errors.keywords&&<p className="submission-field-error" role="alert">{errors.keywords}</p>}</div>
    <div className="submission-field-grid">
     <Choices title="Tipos de material" choices={types} selected={values.types} onToggle={v=>toggle("types",v)} error={errors.types} disabled={busy}/>
     <Choices title="Etapas de ensino" choices={stages} selected={values.stages} onToggle={v=>toggle("stages",v)} error={errors.stages} disabled={busy}/>
     <Choices title="Anos / séries" choices={visibleGrades} selected={values.grades} onToggle={v=>toggle("grades",v)} error={errors.grades} disabled={busy}/>
     <Choices title="Eixos da Computação" choices={axes} selected={values.axes} onToggle={v=>toggle("axes",v)} error={errors.axes} disabled={busy}/>
    </div>
    <fieldset className="submission-approach" disabled={busy}><legend className="submission-label">Abordagem da atividade *</legend>
     <div>{([ ["plugged","Plugada"], ["unplugged","Desplugada"], ["both","Ambas"] ] as const).map(([value,label])=><label key={value}><input type="radio" name="approach" value={value} checked={values.approach===value} onChange={()=>update("approach",value)}/>{label}</label>)}</div>
     {errors.approach&&<p className="submission-field-error" role="alert">{errors.approach}</p>}</fieldset>
    <label className="submission-field"><span className="submission-label">Autor ou fonte *</span>
     <input required disabled={busy} type="text" maxLength={200} value={values.authorship} onChange={e=>update("authorship",e.target.value)} placeholder="Nome da pessoa, grupo ou instituição" aria-invalid={Boolean(errors.authorship)}/>
     {errors.authorship&&<span className="submission-field-error">{errors.authorship}</span>}</label>
    <label className="submission-field"><span className="submission-label">Objetivos de aprendizagem <em>(opcional)</em></span>
     <textarea disabled={busy} rows={3} maxLength={2000} value={values.objectives} onChange={e=>update("objectives",e.target.value)} placeholder="Quais aprendizagens este material pretende desenvolver?" aria-invalid={Boolean(errors.objectives)}/>
     {errors.objectives&&<span className="submission-field-error">{errors.objectives}</span>}</label>
   </section>
   <aside className="submission-panel submission-files" aria-labelledby="submission-files-title"><h2 id="submission-files-title">Arquivos do material</h2>
    <p className="submission-caption">Adicione um ou mais arquivos à submissão.</p>
    <div className="submission-dropzone" onDragOver={e=>e.preventDefault()} onDrop={onDrop}>
     <h3>Selecione ou arraste arquivos aqui</h3><p>PDF, DOCX, PPTX, PNG ou JPG · até 20 MB por arquivo</p>
     <input ref={inputRef} className="sr-only" type="file" accept=".pdf,.docx,.pptx,.png,.jpg,.jpeg" multiple onChange={chooseInput} aria-label="Selecionar arquivos para enviar" disabled={busy}/>
     <button type="button" className="button button-outline" onClick={()=>inputRef.current?.click()} disabled={busy}>Selecionar arquivos</button>
    </div>
    <div className="submission-upload-heading"><h3>Arquivos selecionados</h3><span>{files.length}/{MAX_FILES}</span></div>
    <div className="submission-selected" aria-live="polite">{files.length?files.map((file,index)=><div className="submission-file" key={`${file.name}-${file.lastModified}-${index}`}>
     <strong>{file.name}</strong><p>{formatSize(file.size)} · formato e tamanho aceitos</p><button type="button" onClick={()=>setFiles(files.filter((_,i)=>i!==index))} disabled={busy} aria-label={`Remover ${file.name}`}>Remover</button>
    </div>):<p className="submission-empty-files">Nenhum arquivo selecionado.</p>}</div>
    <p className="submission-upload-limit">Máximo de {MAX_FILES} arquivos e {Math.floor(MAX_TOTAL_BYTES/1024/1024)} MB no total.</p>
    {errors.files&&<p className="submission-field-error" role="alert">{errors.files}</p>}
    <fieldset className="submission-rights"><legend className="submission-label">Direitos de compartilhamento *</legend>
     <label><input type="checkbox" checked={values.rights_confirmed} disabled={busy} onChange={e=>update("rights_confirmed",e.target.checked)}/>
      <span>Confirmo que sou autor(a) ou tenho autorização para compartilhar estes arquivos, respeitando direitos autorais e privacidade.</span></label>
     {errors.rights_confirmed&&<p className="submission-field-error" role="alert">{errors.rights_confirmed}</p>}</fieldset>
    <div className="submission-actions"><button type="button" className="button button-outline" onClick={()=>setConfirmCancel(true)} disabled={busy}>Cancelar</button>
     <button type="submit" className="button button-primary" disabled={busy}>{busy?"Enviando…":"Enviar para revisão"}</button></div>
    {notice&&<p className={busy?"submission-feedback":"submission-field-error"} role="status">{notice}</p>}
   </aside>
  </form>
  <p className="submission-footnote">* Campos obrigatórios. O envio somente será concluído após a validação dos dados e dos arquivos.</p>
  {success&&<Modal titleId="submission-success-title" className="submission-success-dialog" onDismiss={()=>setSuccess(null)}><div className="submission-success-icon" aria-hidden="true">✓</div><h2 id="submission-success-title">Material enviado para revisão</h2><p>Recebemos sua contribuição. O recurso passará por análise antes de ficar disponível na Biblioteca.</p>
   <div className="submission-success-actions"><Link className="button button-outline" href="/meus-envios">Meus envios</Link><Link className="button button-primary" href={`/meus-envios?material=${success}`}>Acompanhar envio</Link></div></Modal>}
  {confirmCancel&&<Modal titleId="submission-cancel-title" className="submission-success-dialog" onDismiss={()=>setConfirmCancel(false)}><h2 id="submission-cancel-title">Descartar preenchimento?</h2><p>Os dados e arquivos selecionados serão perdidos se você sair deste formulário.</p><div className="submission-success-actions"><button type="button" className="button button-outline" onClick={()=>setConfirmCancel(false)}>Continuar preenchendo</button><button type="button" className="button button-primary" onClick={()=>router.push("/biblioteca")}>Descartar e sair</button></div></Modal>}
 </>;
}
