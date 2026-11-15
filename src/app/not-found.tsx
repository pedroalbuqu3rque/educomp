import Link from "next/link";

export default function NotFound() {
  return (
    <main className="system-state" id="conteudo">
      <h1>Página não encontrada</h1>
      <p>O endereço pode ter mudado ou o conteúdo não está mais disponível.</p>
      <div className="system-state-actions">
        <Link href="/" className="button button-outline">
          Voltar ao início
        </Link>
        <Link href="/biblioteca" className="button button-primary">
          Explorar biblioteca
        </Link>
      </div>
    </main>
  );
}
