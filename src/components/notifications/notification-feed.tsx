"use client";

import type { NotificationItem } from "@/lib/notifications/shared";
import { notificationCategory, notificationDate } from "@/lib/notifications/shared";

export function NotificationFeed({items,onOpen,onToggle,busyId}:{
 items:NotificationItem[];
 onOpen:(item:NotificationItem)=>void;
 onToggle:(item:NotificationItem)=>void;
 busyId:string|null;
}) {
 if (!items.length) return <div className="notification-empty" role="status">
  <strong>Nenhuma notificação por enquanto</strong>
  <p>Novidades sobre seus materiais e sua conta aparecerão aqui.</p>
 </div>;
 return <ul className="notification-feed" aria-label="Notificações">
  {items.map(item => <li className={`notification-item ${item.readAt?"is-read":"is-unread"}`} key={item.id}>
   <button type="button" className="notification-open" onClick={()=>onOpen(item)}
    aria-label={`${item.readAt?"Lida":"Não lida"}: ${item.title}. Abrir notificação.`}>
    <span className="notification-indicator" aria-hidden="true" />
    <span className="notification-copy">
     <span className="notification-category">{notificationCategory(item.kind)}</span>
     <strong>{item.title}</strong>
     <span className="notification-description">{item.body}</span>
     <time dateTime={item.createdAt}>{notificationDate(item.createdAt)}</time>
    </span>
   </button>
   <button type="button" className="notification-toggle" onClick={()=>onToggle(item)}
    aria-label={item.readAt?`Marcar ${item.title} como não lida`:`Marcar ${item.title} como lida`}
    title={item.readAt?"Marcar como não lida":"Marcar como lida"} disabled={busyId===item.id}>
    {item.readAt?<span aria-hidden="true">○</span>:<span aria-hidden="true">✓</span>}
   </button>
  </li>)}
 </ul>;
}
