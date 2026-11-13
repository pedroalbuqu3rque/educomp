"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { formatPdfSize, getCatalogEditorial } from "@/lib/library/catalog-resources";
import { setMaterialSaved } from "@/lib/library/saved-actions";

export function ExampleAccessPanel({
  id, title, signedIn, saved, savedError,
}: {
  id: string;
  title: string;
  signedIn: boolean;
  saved: boolean;
  savedError?: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const editorial = getCatalogEditorial(id);
  if (!editorial) return null;
  const file = editorial.attachment;
  const login = `/entrar?next=${encodeURIComponent(`/materiais/${id}`)}`;

  function toggleSaved() {
    setError("");
    startTransition(async () => {
      const result = await setMaterialSaved(id, !saved);
      if (result.requiresLogin) {
        router.push(login);
        return;
      }
      if (result.error) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <aside className="material-access catalog-access" aria-labelledby="catalog-file-heading">
      {file.cover ? (
        signedIn ? (
          <a href={file.url} target="_blank" rel="noopener noreferrer" className="catalog-cover-link" aria-label={`Visualizar ${file.name} em uma nova aba`}>
            <img className="catalog-cover" src={file.cover} width="400" height="566" alt={`Capa do arquivo ${file.name}`} />
          </a>
        ) : (
          <img className="catalog-cover" src={file.cover} width="400" height="566" alt={`Capa do arquivo ${file.name}`} />
        )
      ) : (
        <div className="catalog-no-cover" aria-hidden="true">
          <span className="catalog-pdf-icon">PDF</span>
        </div>
      )}
      <div className="catalog-access-body">
        <p className="catalog-file-label">{signedIn ? "Arquivo disponível" : "Arquivo para usuários cadastrados"}</p>
        <h2 id="catalog-file-heading">Acesse o material</h2>
        <p className="catalog-file-title">{file.name}</p>
        <p className="catalog-file-meta">PDF <span aria-hidden="true">·</span> {file.pages} {file.pages === 1 ? "página" : "páginas"} <span aria-hidden="true">·</span> {formatPdfSize(file.sizeBytes)}</p>
        <div className="material-actions">
          {signedIn ? (
            <>
              <a className="button button-primary" href={file.url} target="_blank" rel="noopener noreferrer">Visualizar PDF <span aria-hidden="true">↗</span></a>
              <a className="button button-outline" href={`${file.url}?download=1`}>Baixar arquivo</a>
            </>
          ) : (
            <Link className="button button-primary" href={login}>Entrar para visualizar e baixar</Link>
          )}
        </div>
        {file.provisional && (
          <p className="catalog-provisional-note">Este arquivo é provisório e não contém a atividade descrita. A ficha pedagógica já pode ser consultada; o material definitivo ainda será anexado.</p>
        )}
        <div className="catalog-save-section">
          <p className="catalog-file-label">Sua coleção</p>
          {signedIn ? (
            <button className="button button-outline" type="button" onClick={toggleSaved} disabled={pending || savedError} aria-pressed={saved}>
              {pending ? "Atualizando…" : saved ? "Remover dos salvos" : "Salvar material"}
            </button>
          ) : (
            <Link className="button button-outline" href={login}>Entrar para salvar</Link>
          )}
          {(error || savedError) && <p role="alert" className="material-feedback">{error || "Não foi possível consultar os materiais salvos."}</p>}
        </div>
      </div>
    </aside>
  );
}
