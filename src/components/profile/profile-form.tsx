"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { saveProfile } from "@/lib/profile/actions";
import type { ProfileValues, ProfileResult } from "@/lib/profile/validation";
export function ProfileForm({ initial, email }: { initial: ProfileValues; email: string }) {
 const [values, setValues] = useState(initial);
 const [saved, setSaved] = useState(initial);
 const [result, setResult] = useState<ProfileResult>({});
 const [pending, startTransition] = useTransition();
 const formRef = useRef<HTMLFormElement>(null);
 const router = useRouter();
 useEffect(() => {
  if (pending || !result.fields) return;
  const first = Object.keys(result.fields)[0];
  const field = first ? formRef.current?.elements.namedItem(first) : null;
  if (field instanceof HTMLElement) field.focus();
 }, [pending, result]);
 const dirty = (Object.keys(values) as (keyof ProfileValues)[]).some(key => values[key] !== saved[key]);
 function change(field: keyof ProfileValues, value: string) {
  setValues(previous => ({ ...previous, [field]: value }));
  setResult({});
 }
 function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault(); setResult({});
  startTransition(async () => {
   try {
    const response = await saveProfile(values);
    setResult(response);
    if (response.profile) {
     setSaved(response.profile); setValues(response.profile); router.refresh();
    }
   } catch { setResult({ error: "Não foi possível salvar suas alterações. Tente novamente." }); }
  });
 }
 return <form ref={formRef} className="profile-card profile-form" onSubmit={submit} aria-busy={pending}>
  <header><h2>Informações pessoais</h2><p>Dados básicos associados à sua conta.</p></header>
  <fieldset disabled={pending}><legend className="sr-only">Dados do perfil</legend><div className="profile-fields">
   <div><label htmlFor="profile-name">Nome completo</label><input id="profile-name" name="display_name" autoComplete="name" required maxLength={120} value={values.display_name} onChange={event => change("display_name", event.target.value)} aria-invalid={Boolean(result.fields?.display_name)} aria-describedby={result.fields?.display_name ? "profile-name-error" : undefined} />{result.fields?.display_name && <p className="profile-field-error" id="profile-name-error">{result.fields.display_name}</p>}</div>
   <div><label htmlFor="profile-email">E-mail</label><input id="profile-email" type="email" value={email} readOnly aria-describedby="profile-email-help" /><p className="profile-help" id="profile-email-help">Usado para acessar sua conta. Não aparece no perfil público.</p></div>
   <div><label htmlFor="profile-occupation">Cargo e/ou função <span>(opcional)</span></label><input id="profile-occupation" name="occupation" autoComplete="organization-title" maxLength={120} value={values.occupation} onChange={event => change("occupation", event.target.value)} placeholder="Professor de Computação" aria-invalid={Boolean(result.fields?.occupation)} aria-describedby={result.fields?.occupation ? "profile-occupation-error" : undefined} />{result.fields?.occupation && <p className="profile-field-error" id="profile-occupation-error">{result.fields.occupation}</p>}</div>
  </div>
  <div className="profile-bio"><label htmlFor="profile-bio">Sobre mim <span>(opcional)</span></label><textarea id="profile-bio" name="bio" maxLength={300} rows={4} value={values.bio} onChange={event => change("bio", event.target.value)} placeholder="Conte um pouco sobre sua experiência, áreas de interesse e o que gosta de compartilhar com outros professores..." aria-invalid={Boolean(result.fields?.bio)} aria-describedby={`profile-bio-help profile-bio-count${result.fields?.bio ? " profile-bio-error" : ""}`} />{result.fields?.bio && <p className="profile-field-error" id="profile-bio-error">{result.fields.bio}</p>}<div className="profile-bio-caption"><p id="profile-bio-help">Seu nome, cargo e apresentação aparecem no perfil público.</p><span id="profile-bio-count">{values.bio.length}/300 caracteres</span></div></div>
  </fieldset>
  {result.error && <p className="profile-error" role="alert">{result.error} {result.requiresLogin && <Link href="/entrar?next=/conta">Entrar novamente</Link>}</p>}
  <div className="profile-form-footer"><p className="profile-feedback" role="status">{result.profile ? "Perfil atualizado com sucesso." : dirty ? "Você tem alterações não salvas." : ""}</p><button className="button button-primary" type="submit" disabled={pending || !dirty}>{pending ? "Salvando…" : "Salvar alterações"}</button></div>
 </form>;
}
