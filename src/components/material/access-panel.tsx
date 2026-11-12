"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { DetailData } from "@/lib/materials/load";
import { setMaterialSaved } from "@/lib/library/saved-actions";
import { Modal } from "@/components/library/dialog";
import { ProfileAvatar } from "@/components/profile/profile-avatar";

export function AccessPanel({ data }: { data: DetailData }) {
 const router = useRouter();
 const [open, setOpen] = useState(false);
 const [pending, startTransition] = useTransition();
 const [feedback, setFeedback] = useState("");
 const [error, setError] = useState("");
 const material = data.material!;
 const login = `/entrar?next=${encodeURIComponent(`/materiais/${material.id}`)}`;
 function save() {
  setError(""); setFeedback("");
  startTransition(async () => {
   try {
    const result = await setMaterialSaved(material.id, !data.saved);
    if (result.requiresLogin) { router.push(login); return; }
    if (result.error) { setError(result.error); return; }
    setFeedback(result.saved ? "Material adicionado aos salvos." : "Material removido dos salvos.");
    router.refresh();
   } catch { setError("Não foi possível atualizar seus salvos. Tente novamente."); }
  });
 }
 return <aside className="material-access">
  <div className="material-illustration"><img src="/material/sheets.svg" alt="" /></div>
  <h2>Acesse este material</h2><p>Acesse os arquivos e use este recurso nas suas aulas.</p>
  <div className="material-actions">
   {data.signedIn ? <button className="button button-primary" onClick={() => setOpen(true)}><img src="/material/download.svg" alt="" />Acessar material</button> : <Link className="button button-primary" href={login}><img src="/material/download.svg" alt="" />Entrar para acessar</Link>}
   {data.signedIn ? <button className="button button-outline" aria-pressed={data.saved} disabled={pending || data.savedError} onClick={save}><img src="/material/save.png" width="19" height="19" alt="" />{pending ? "Atualizando…" : data.saved ? "Remover dos salvos" : "Adicionar aos salvos"}</button> : <Link className="button button-outline" href={login}><img src="/material/save.png" width="19" height="19" alt="" />Entrar para salvar</Link>}
  </div>
  <p role="status" className="material-feedback">{feedback}</p>
  {(error || data.savedError) && <p role="alert">{error || "Não foi possível consultar seus salvos. Atualize a página para tentar novamente."}</p>}
  <div className="material-author"><span>Compartilhado por</span>{data.profile ? <div><ProfileAvatar name={data.profile.display_name} path={data.profile.avatar_path} className="profile-initials"/><div><strong>{data.profile.display_name}</strong><small>{data.profile.occupation}</small></div><Link href={`/perfis/${data.profile.id}?material=${material.id}`}>Ver perfil</Link></div> : <p>Perfil indisponível no momento.</p>}</div>
  {open && <Modal titleId="material-files-title" onDismiss={() => setOpen(false)} className="preview-dialog"><h2 id="material-files-title">Arquivos do material</h2><p>{material.title}</p>{data.filesError ? <div role="alert"><p>Não foi possível carregar os arquivos.</p><button className="button button-outline" onClick={() => router.refresh()}>Tentar novamente</button></div> : data.files.length ? <ul className="material-file-list">{data.files.map(file => <li key={file.id}><div><strong>{file.original_name}</strong><small>{(file.size_bytes / 1024 / 1024).toLocaleString("pt-BR", { maximumFractionDigits: 2 })} MB</small></div><a className="button button-primary" href={`/materiais/${material.id}/arquivos/${file.id}`} aria-label={`Baixar ${file.original_name}`}>Baixar</a></li>)}</ul> : <p>Nenhum arquivo disponível para download.</p>}<button className="button button-outline" onClick={() => setOpen(false)}>Voltar ao material</button></Modal>}
 </aside>;
}
