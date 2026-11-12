"use client";
/* eslint-disable @next/next/no-img-element -- Prévia local via blob: sem otimização no servidor. */
import {useEffect,useRef,useState} from "react";
import {useRouter} from "next/navigation";
import {Modal} from "@/components/library/dialog";
import {ProfileAvatar} from "@/components/profile/profile-avatar";
import {avatarType} from "@/lib/profile/avatar";

export function ProfilePhotoControl({name,path}:{name:string;path:string|null}) {
 const [current,setCurrent]=useState(path);
 const [dialog,setDialog]=useState<"choose"|"preview"|"remove"|null>(null);
 const [file,setFile]=useState<File|null>(null);
 const [preview,setPreview]=useState<string|null>(null);
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState("");
 const input=useRef<HTMLInputElement>(null);
 const router=useRouter();
 useEffect(()=>()=>{if(preview)URL.revokeObjectURL(preview);},[preview]);
 function choose(files:FileList|null) {
  const picked=files?.[0];
  if(!picked)return;
  try {avatarType(picked);}catch(e){setMessage(e instanceof Error?e.message:"Arquivo inválido.");return;}
  const url=URL.createObjectURL(picked);
  setFile(picked);setPreview(url);setMessage("");setDialog("preview");
 }
 async function save() {
  if(!file||busy)return;
  setBusy(true);setMessage("");
  try {
   const body=new FormData();body.set("file",file);
   const response=await fetch("/api/perfil/foto",{method:"POST",body,cache:"no-store"});
   const result=await response.json() as {error?:string;path?:string};
   if(!response.ok||!result.path){setMessage(result.error??"Não foi possível salvar a foto.");return;}
   setCurrent(result.path);setDialog(null);setFile(null);setPreview(null);router.refresh();
  }catch{setMessage("Falha na conexão. Confira a internet e tente novamente.");}
  finally{setBusy(false);}
 }
 async function remove() {
  if(busy)return;
  setBusy(true);setMessage("");
  try {
   const response=await fetch("/api/perfil/foto",{method:"DELETE",cache:"no-store"});
   const result=await response.json() as {error?:string;ok?:boolean};
   if(!response.ok||!result.ok){setMessage(result.error??"Não foi possível remover a foto.");return;}
   setCurrent(null);setDialog(null);router.refresh();
  }catch{setMessage("Falha na conexão. Tente novamente.");}
  finally{setBusy(false);}
 }
 function close(){if(!busy){setDialog(null);setFile(null);setPreview(null);setMessage("");}}
 return <>
  <ProfileAvatar name={name} path={current} className="profile-avatar"/>
  <div className="profile-photo-actions">
   <button type="button" className="button button-outline" onClick={()=>{setMessage("");setDialog("choose");}}>Alterar foto</button>
   {current&&<button type="button" className="profile-remove-photo" onClick={()=>{setMessage("");setDialog("remove");}}>Remover foto</button>}
  </div>
  {message&&!dialog&&<p role="alert" className="profile-error">{message}</p>}
  {dialog&&<Modal titleId="profile-photo-title" onDismiss={close} className="profile-photo-dialog">
   <h2 id="profile-photo-title">{dialog==="choose"?"Alterar foto do perfil":dialog==="remove"?"Remover foto do perfil":"Confirme sua foto"}</h2>
   {dialog==="choose"?<><p>Escolha uma imagem JPG ou PNG de até 5 MB. Você poderá conferir a prévia antes de salvar. A foto ficará pública no seu perfil.</p>
    <input ref={input} type="file" className="sr-only" accept="image/jpeg,image/png,.jpg,.jpeg,.png" onChange={event=>{choose(event.target.files);event.target.value="";}} aria-label="Escolher imagem do perfil"/>
    <button type="button" className="button button-primary" onClick={()=>input.current?.click()}>Selecionar imagem</button></>
   :dialog==="preview"?<><p>Confira a prévia antes de salvar. Se preferir, escolha outra imagem.</p>
    <div className="profile-photo-preview">{preview&&<img src={preview} alt="Prévia da foto selecionada"/>}<span>Sua foto aparecerá no perfil público.</span></div>
    <div className="profile-photo-dialog-actions"><button type="button" className="button button-outline" disabled={busy} onClick={()=>input.current?.click()}>Escolher outra imagem</button><button type="button" className="button button-primary" disabled={busy} onClick={save}>{busy?"Salvando…":"Salvar foto"}</button></div>
    <input ref={input} className="sr-only" type="file" accept="image/jpeg,image/png,.jpg,.jpeg,.png" onChange={event=>{choose(event.target.files);event.target.value="";}} aria-label="Escolher outra imagem"/></>
   :<><p>A foto será removida do seu perfil público e substituída pelas iniciais. Essa ação não altera seu nome ou suas contribuições.</p>
    <div className="profile-photo-dialog-actions"><button type="button" className="button button-outline" disabled={busy} onClick={close}>Cancelar</button><button type="button" className="button button-primary" disabled={busy} onClick={remove}>{busy?"Removendo…":"Confirmar remoção"}</button></div></>}
   {message&&<p className="profile-error" role="alert">{message}</p>}
  </Modal>}
 </>;
}
