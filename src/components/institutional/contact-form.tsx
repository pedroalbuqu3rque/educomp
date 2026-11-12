"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactMessageSchema } from "@/lib/contact/validation";

type FormStatus = "idle" | "sending";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (sent && dialog && !dialog.open) dialog.showModal();
  }, [sent]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setError("");
    const values = new FormData(event.currentTarget);
    const payload = {
      name: String(values.get("name") ?? ""),
      email: String(values.get("email") ?? ""),
      subject: String(values.get("subject") ?? ""),
      message: String(values.get("message") ?? ""),
      website: String(values.get("website") ?? ""),
    };
    const parsed = contactMessageSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revise sua mensagem antes de enviar.");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        cache: "no-store",
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        setError(result.error ?? "Não foi possível enviar a mensagem. Tente novamente.");
        return;
      }
      formRef.current?.reset();
      setSent(true);
    } catch {
      setError("O serviço não respondeu. Verifique sua conexão e tente novamente.");
    } finally {
      setStatus("idle");
    }
  }

  function closeConfirmation() {
    dialogRef.current?.close();
    setSent(false);
  }

  return <>
    <form className="contact-card" ref={formRef} onSubmit={submit} aria-busy={status === "sending"}>
      <div className="contact-card-header">
        <h2>Envie sua mensagem</h2>
        <p>Preencha os campos abaixo para descrever sua solicitação.</p>
      </div>
      <div className="contact-field-row">
        <label className="contact-field" htmlFor="contact-name">Nome <span aria-hidden="true">*</span>
          <input id="contact-name" name="name" placeholder="Seu nome" type="text" autoComplete="name" minLength={2} maxLength={120} required disabled={status === "sending"}/>
        </label>
        <label className="contact-field" htmlFor="contact-email">E-mail <span aria-hidden="true">*</span>
          <input id="contact-email" name="email" placeholder="seu.email@exemplo.com" type="email" autoComplete="email" maxLength={254} required disabled={status === "sending"}/>
        </label>
      </div>
      <label className="contact-field" htmlFor="contact-subject">Assunto <span aria-hidden="true">*</span>
        <input id="contact-subject" name="subject" placeholder="Descreva o assunto" type="text" minLength={3} maxLength={160} required disabled={status === "sending"}/>
      </label>
      <label className="contact-field" htmlFor="contact-message">Mensagem <span aria-hidden="true">*</span>
        <textarea id="contact-message" name="message" placeholder="Descreva sua dúvida ou sugestão com o máximo de contexto possível." minLength={10} maxLength={4000} rows={6} required disabled={status === "sending"} aria-describedby="contact-length-note"/>
      </label>
      <label className="contact-honeypot" aria-hidden="true">Site da empresa
        <input name="website" autoComplete="off" tabIndex={-1}/>
      </label>
      <div className="contact-support-notes">
        <p id="contact-length-note">* Campos obrigatórios · Até 4.000 caracteres.</p>
        <p>Não inclua senhas nem dados pessoais de estudantes. Saiba mais em <Link href="/privacidade">Privacidade</Link>.</p>
      </div>
      {error && <p className="contact-error" role="alert">{error}</p>}
      <div className="contact-actions">
        <Link href="/" className="button button-outline">Voltar ao início</Link>
        <button type="submit" className="button button-primary" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar mensagem"}</button>
      </div>
    </form>
    <dialog ref={dialogRef} className="contact-dialog" onClose={() => setSent(false)} aria-labelledby="contact-success-title" aria-describedby="contact-success-description">
      <div className="contact-dialog-top"><span>MENSAGEM ENVIADA</span><button type="button" className="contact-dialog-close" onClick={closeConfirmation} aria-label="Fechar confirmação">×</button></div>
      <div className="contact-dialog-main"><span className="contact-dialog-check" aria-hidden="true">✓</span><div><h2 id="contact-success-title">Mensagem enviada com sucesso!</h2><p id="contact-success-description">Sua mensagem foi registrada. Obrigado por entrar em contato com o EduComp.</p></div></div>
      <div className="contact-dialog-actions"><button type="button" className="button button-outline" onClick={closeConfirmation}>Fechar</button><Link href="/biblioteca" className="button button-primary" onClick={closeConfirmation}>Explorar biblioteca</Link></div>
    </dialog>
  </>;
}
