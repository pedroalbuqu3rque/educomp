import Link from "next/link";
import { Brand } from "./brand";
import { currentUser } from "@/lib/auth/user";
import { createClient } from "@/lib/supabase/server";
import { unreadNotificationsCount } from "@/lib/notifications/load";
import { NotificationBell } from "./notifications/notification-bell";

export async function SiteHeader() {
  const user = await currentUser();
  let unread = 0;

  if (user) {
    try {
      unread = await unreadNotificationsCount(await createClient());
    } catch {
      unread = 0;
    }
  }

  return (
    <header className="site-header">
      <div className={`header-inner${user ? " is-signed-in" : ""}`}>
        <Brand />
        <nav className="account-nav" aria-label="Acesso à conta">
          {user && <NotificationBell initialCount={unread} />}
          <div className="account-nav-actions">
            <Link href={user ? "/conta" : "/entrar"} className="button button-outline">
              {user ? "Minha conta" : "Entrar"}
            </Link>
            <Link href={user ? "/biblioteca" : "/cadastro"} className="button button-primary">
              {user ? "Biblioteca" : "Criar conta"}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Brand footer />
          <p>Projeto de portfólio · Pedro Albuquerque</p>
        </div>
        <nav aria-label="Links de rodapé">
          <Link href="/termos">Termos de uso</Link>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/contato">Fale conosco</Link>
        </nav>
      </div>
    </footer>
  );
}
