import Link from "next/link";
import { Brand } from "@/components/brand";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { currentUser } from "@/lib/auth/user";
import { createClient } from "@/lib/supabase/server";
import { unreadNotificationsCount } from "@/lib/notifications/load";
import { ProfileAvatar } from "@/components/profile/profile-avatar";

type ActivePage = "biblioteca" | "salvos" | "enviar" | "conta" | "revisao" | "notificacoes";

export async function LibraryHeader({ active = "biblioteca" }: { active?: ActivePage }) {
  const user = await currentUser();
  let reviewer = false;
  let unread = 0;
  let accountName = "Professor(a)";
  let avatarPath: string | null = null;

  if (user) {
    try {
      const client = await createClient();
      const [role, count, profile] = await Promise.all([
        client.rpc("is_reviewer"),
        unreadNotificationsCount(client).catch(() => 0),
        client.from("profiles").select("display_name,avatar_path").eq("id", user.id).maybeSingle(),
      ]);
      reviewer = !role.error && role.data === true;
      unread = count;
      if (profile.data) {
        accountName = profile.data.display_name;
        avatarPath = profile.data.avatar_path;
      }
    } catch {
      reviewer = false;
    }
  }

  return (
    <header className="library-header">
      <div className="library-header-inner">
        <Brand footer />
        <nav aria-label="Menu principal">
          <Link href="/biblioteca" aria-current={active === "biblioteca" ? "page" : undefined}>Biblioteca</Link>
          <Link href="/salvos" aria-current={active === "salvos" ? "page" : undefined}>Salvos</Link>
          <Link href="/enviar" aria-current={active === "enviar" ? "page" : undefined}>Enviar material</Link>
          {reviewer && (
            <Link href="/revisao" aria-current={active === "revisao" ? "page" : undefined}>Revisão</Link>
          )}
        </nav>
        <div className="library-header-tools">
          {user && <NotificationBell initialCount={unread} />}
          <Link
            className="button button-outline guest-login"
            aria-current={active === "conta" ? "page" : undefined}
            href={user ? "/conta" : "/entrar"}
          >
            {user && <ProfileAvatar name={accountName} path={avatarPath} className="header-profile-avatar" />}
            {user ? "Minha conta" : "Entrar"}
          </Link>
        </div>
      </div>
    </header>
  );
}
