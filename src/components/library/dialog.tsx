"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function Modal({ titleId, onDismiss, children, className = "" }: { titleId:string; onDismiss:()=>void; children:ReactNode; className?:string }) {
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{
  const dialog=ref.current!;
  const trigger=document.activeElement as HTMLElement | null;
  const overflow=document.body.style.overflow;
  document.body.style.overflow="hidden";
  dialog.showModal();
  return ()=>{ dialog.close(); document.body.style.overflow=overflow; trigger?.focus(); };
 },[]);
 return <dialog ref={ref} className={`library-dialog ${className}`} aria-labelledby={titleId}
  onCancel={event=>{event.preventDefault();onDismiss();}}
  onClick={event=>{if(event.target!==event.currentTarget)return; const b=event.currentTarget.getBoundingClientRect(); if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)onDismiss();}}>
  <button className="dialog-close" type="button" onClick={onDismiss} aria-label="Fechar">×</button>{children}
 </dialog>;
}
