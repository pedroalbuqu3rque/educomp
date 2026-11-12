import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth/user";
import { createClient } from "@/lib/supabase/server";
import { loadNotifications } from "@/lib/notifications/load";
import { NotificationsFull } from "@/components/notifications/notifications-full";
import "@/components/notifications/notifications.css";

export const metadata={title:"Notificações | EduComp",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default async function Page(){
 if(!await currentUser())redirect("/entrar?next=/notificacoes");
 let initial: Awaited<ReturnType<typeof loadNotifications>> | null = null;
 try {
  const client = await createClient();
  initial = await loadNotifications(client, 1, 12);
 } catch { /* Mensagem de indisponibilidade mostrada abaixo. */ }
 if (initial) return <NotificationsFull initial={initial}/>;
 return <div className="notifications-full-backdrop"><main className="notifications-full-card" id="conteudo">
  <h1>Notificações indisponíveis</h1>
  <p className="notification-error" role="alert">Não foi possível consultar as notificações. Confirme que a migration 009 foi aplicada no Supabase.</p>
  <Link className="button button-outline" href="/biblioteca">Voltar à Biblioteca</Link>
 </main></div>;
}
