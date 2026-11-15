"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="system-state" id="conteudo">
      <h1>Não foi possível carregar a página</h1>
      <p>
        Tente novamente em alguns instantes. Se o problema continuar, entre em contato com o
        EduComp.
      </p>
      <div className="system-state-actions">
        <button type="button" className="button button-primary" onClick={reset}>
          Tentar novamente
        </button>
        <Link href="/contato" className="button button-outline">
          Fale conosco
        </Link>
      </div>
    </main>
  );
}
