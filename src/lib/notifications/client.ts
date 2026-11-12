import type { NotificationPageData } from "./shared";

export async function requestNotifications(limit: number, page = 1): Promise<NotificationPageData> {
 const response = await fetch(`/api/notificacoes?limit=${limit}&page=${page}`, {cache:"no-store",credentials:"same-origin"});
 if (!response.ok) throw new Error(response.status===401
  ? "Sua sessão expirou. Entre novamente."
  : "Não foi possível carregar as notificações.");
 return response.json() as Promise<NotificationPageData>;
}

export async function changeNotification(action: "read" | "unread" | "read_all", id?: string): Promise<void> {
 const response = await fetch("/api/notificacoes", {
  method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},
  body:JSON.stringify(id?{action,id}:{action}),
 });
 if (!response.ok) throw new Error("Não foi possível atualizar as notificações.");
}
