"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NotificationFeed } from "./notification-feed";
import type { NotificationItem, NotificationPageData } from "@/lib/notifications/shared";
import { requestNotifications, changeNotification } from "@/lib/notifications/client";
import "./notifications.css";

function BellIcon(){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
 <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/>
 </svg>;}

function NotificationPopover({onClose,onCount}:{onClose:()=>void;onCount:(count:number)=>void}){
 const router=useRouter();
 const dialogRef=useRef<HTMLDialogElement>(null);
 const [data,setData]=useState<NotificationPageData|null>(null);
 const [busyId,setBusyId]=useState<string|null>(null);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState("");
 const refresh=useCallback(async()=>{
  try{const next=await requestNotifications(5);setData(next);onCount(next.unread);setError("");}
  catch(e){setError(e instanceof Error?e.message:"Não foi possível carregar as notificações.");}
  finally{setLoading(false);}
 },[onCount]);
 useEffect(()=>{
  const node=dialogRef.current;
  if(!node)return;
  const focus=document.activeElement as HTMLElement|null;
  const overflow=document.body.style.overflow;
  document.body.style.overflow="hidden";
  node.showModal();
  void refresh();
  return()=>{if(node.open)node.close();document.body.style.overflow=overflow;focus?.focus();};
 },[refresh]);
 async function toggle(item:NotificationItem){
  if(busyId)return;
  setBusyId(item.id);
  try{await changeNotification(item.readAt?"unread":"read",item.id);await refresh();}
  catch{setError("Não foi possível alterar a leitura. Tente novamente.");}
  finally{setBusyId(null);}
 }
 async function markAll(){
  if(busyId)return;
  setBusyId("all");
  try{await changeNotification("read_all");await refresh();}
  catch{setError("Não foi possível marcar todas como lidas.");}
  finally{setBusyId(null);}
 }
 async function openItem(item:NotificationItem){
  if(item.readAt===null){
   try{await changeNotification("read",item.id);}catch{ /* A navegação permanece disponível mesmo se a leitura falhar. */ }
  }
  onClose();router.push(item.targetUrl);
 }
 return <dialog ref={dialogRef} className="notification-dialog" aria-labelledby="notification-popover-title"
  onCancel={event=>{event.preventDefault();onClose();}}
  onClick={event=>{if(event.target!==event.currentTarget)return;const rect=event.currentTarget.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)onClose();}}>
  <div className="notification-dialog-head"><div className="notification-title-row">
   <h2 id="notification-popover-title">Notificações</h2>
   {data&&<span className="notification-count-pill">{data.unread} {data.unread===1?"nova":"novas"}</span>}
  </div><button type="button" className="notification-close" onClick={onClose} aria-label="Fechar notificações">×</button></div>
  <div className="notification-toolbar">
   {data?.unread ? <button type="button" onClick={()=>void markAll()} disabled={!!busyId}>Marcar todas como lidas</button>
    : <span>Todas as notificações foram lidas</span>}
  </div>
  {error&&<p className="notification-error" role="alert">{error} <button type="button" onClick={()=>void refresh()}>Tentar novamente</button></p>}
  {loading?<p className="notification-loading" role="status">Carregando notificações…</p>
   :data?<NotificationFeed items={data.items} onOpen={item=>void openItem(item)} onToggle={item=>void toggle(item)} busyId={busyId}/>:null}
  <div className="notification-footer"><Link href="/notificacoes" onClick={onClose}>Ver todas as notificações</Link></div>
 </dialog>;
}

export function NotificationBell({initialCount}:{initialCount:number}){
 const [count,setCount]=useState(initialCount);
 const [open,setOpen]=useState(false);
 useEffect(()=>{
  let alive=true;
  const reload=async()=>{
   if(document.visibilityState==="hidden")return;
   try{const result=await requestNotifications(1);if(alive)setCount(result.unread);}catch{ /* Count is best effort; inbox reports load errors. */ }
  };
  const timer=window.setInterval(()=>void reload(),60_000);
  const onFocus=()=>void reload();
  window.addEventListener("focus",onFocus);
  document.addEventListener("visibilitychange",onFocus);
  return()=>{alive=false;window.clearInterval(timer);window.removeEventListener("focus",onFocus);document.removeEventListener("visibilitychange",onFocus);};
 },[]);
 const onCount=useCallback((value:number)=>setCount(value),[]);
 return <div className="notification-bell-wrap">
  <button type="button" className="notification-bell" onClick={()=>setOpen(true)}
   aria-label={count>0?`Notificações, ${count} não ${count===1?"lida":"lidas"}`:"Notificações"}
   aria-haspopup="dialog" aria-expanded={open}>
   <BellIcon/>{count>0&&<span className="notification-bell-badge" aria-hidden="true">{count>99?"99+":count}</span>}
  </button>
  {open&&<NotificationPopover onClose={()=>setOpen(false)} onCount={onCount}/>}</div>;
}
