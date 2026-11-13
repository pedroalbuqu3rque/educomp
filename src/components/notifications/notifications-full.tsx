"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { NotificationItem, NotificationPageData } from "@/lib/notifications/shared";
import { changeNotification, requestNotifications } from "@/lib/notifications/client";
import { NotificationFeed } from "./notification-feed";
import "./notifications.css";

export function NotificationsFull({ initial }: { initial: NotificationPageData }) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function refresh(page = data.page) {
    setLoading(true);
    try {
      setData(await requestNotifications(12, page));
      setError("");
    } catch {
      setError("Não foi possível atualizar a lista. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function toggle(item: NotificationItem) {
    if (busyId) return;
    setBusyId(item.id);
    try {
      await changeNotification(item.readAt ? "unread" : "read", item.id);
      await refresh();
    } catch {
      setError("Não foi possível alterar a leitura.");
    } finally {
      setBusyId(null);
    }
  }

  async function markAll() {
    if (busyId) return;
    setBusyId("all");
    try {
      await changeNotification("read_all");
      await refresh();
    } catch {
      setError("Não foi possível marcar todas como lidas.");
    } finally {
      setBusyId(null);
    }
  }

  async function openItem(item: NotificationItem) {
    if (!item.readAt) {
      try {
        await changeNotification("read", item.id);
      } catch {
        // A leitura não deve impedir o acesso à página de destino.
      }
    }
    router.push(item.targetUrl);
  }

  return (
    <div className="notifications-full-backdrop">
      <main className="notifications-full-card" id="conteudo">
        <header className="notifications-full-heading">
          <h1>Notificações</h1>
          <p>Acompanhe atualizações da sua conta e dos materiais.</p>
        </header>

        <div className="notifications-full-actions">
          <span>
            {data.unread === 0
              ? "Todas as notificações foram lidas"
              : `${data.unread} ${data.unread === 1 ? "não lida" : "não lidas"}`}
          </span>
          {data.unread > 0 && (
            <button type="button" onClick={() => void markAll()} disabled={!!busyId}>
              Marcar todas como lidas
            </button>
          )}
        </div>

        {error && (
          <p className="notification-error" role="alert">
            {error}{" "}
            <button type="button" onClick={() => void refresh()}>
              Tentar novamente
            </button>
          </p>
        )}
        {loading && <p className="notification-loading" role="status">Atualizando notificações…</p>}

        <NotificationFeed
          items={data.items}
          onOpen={(item) => void openItem(item)}
          onToggle={(item) => void toggle(item)}
          busyId={busyId}
        />

        {data.pages > 1 && (
          <nav className="notifications-pagination" aria-label="Páginas de notificações">
            <button
              type="button"
              disabled={loading || data.page === 1}
              onClick={() => void refresh(data.page - 1)}
            >
              Anterior
            </button>
            <span>Página {data.page} de {data.pages}</span>
            <button
              type="button"
              disabled={loading || data.page === data.pages}
              onClick={() => void refresh(data.page + 1)}
            >
              Próxima
            </button>
          </nav>
        )}

        <footer className="notifications-full-footer">
          <Link href="/biblioteca" className="button button-outline">Voltar à Biblioteca</Link>
        </footer>
      </main>
    </div>
  );
}
