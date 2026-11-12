import "server-only";
import { createClient } from "@/lib/supabase/server";
import { safeNotificationPath, type NotificationItem, type NotificationKind, type NotificationPageData } from "./shared";

type Supabase = Awaited<ReturnType<typeof createClient>>;
type Row = {
 id: string; kind: NotificationKind; title: string; body: string; target_url: string;
 read_at: string | null; created_at: string;
};

export async function unreadNotificationsCount(client: Supabase): Promise<number> {
 const { count, error } = await client.from("notifications")
  .select("id", { count: "exact", head: true }).is("read_at", null);
 if (error) throw error;
 return count ?? 0;
}

export async function loadNotifications(client: Supabase, page = 1, limit = 8): Promise<NotificationPageData> {
 const size = Math.min(30, Math.max(1, limit));
 const selectedPage = Math.min(1000, Math.max(1, page));
 const [rows, unread] = await Promise.all([
  client.from("notifications")
   .select("id,kind,title,body,target_url,read_at,created_at", { count: "exact" })
   .order("created_at", { ascending: false }).order("id", { ascending: false })
   .range((selectedPage - 1) * size, selectedPage * size - 1),
  unreadNotificationsCount(client),
 ]);
 if (rows.error) throw rows.error;
 const total = rows.count ?? 0;
 const pages = Math.max(1, Math.ceil(total / size));
 if (selectedPage > pages) return loadNotifications(client, pages, size);
 return {
  items: ((rows.data ?? []) as Row[]).map((row): NotificationItem => ({
   id: row.id, kind: row.kind, title: row.title, body: row.body,
   targetUrl: safeNotificationPath(row.target_url), createdAt: row.created_at, readAt: row.read_at,
  })),
  unread, total, page: selectedPage, pages,
 };
}
