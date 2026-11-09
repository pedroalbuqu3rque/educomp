"use client";
import { useState } from "react";
export function ShareButton() {
 const [message, setMessage] = useState("");
 async function share() {
  try {
   const url = new URL("/", window.location.href).href;
   if (navigator.share) await navigator.share({ title: "EduComp", text: "Materiais para ensinar Computação na Educação Básica.", url });
   else { await navigator.clipboard.writeText(url); setMessage("Link copiado!"); }
  } catch (error) {
   if (error instanceof Error && error.name === "AbortError") return;
   setMessage("Não foi possível compartilhar. Copie o endereço na barra do navegador.");
  }
 }
 return <span className="share-control"><button type="button" onClick={share}>Compartilhar</button><span className="share-status" role="status">{message}</span></span>;
}
