import { describe, expect, it } from "vitest";
import { notificationActionSchema, notificationCategory, safeNotificationPath } from "@/lib/notifications/shared";

describe("central de notificações",()=>{
 it("aceita somente ações bem formadas e identificadores UUID",()=>{
  const id="7fc0c9c7-1eb8-4788-aad1-111111111111";
  expect(notificationActionSchema.safeParse({action:"read",id}).success).toBe(true);
  expect(notificationActionSchema.safeParse({action:"unread",id}).success).toBe(true);
  expect(notificationActionSchema.safeParse({action:"read_all"}).success).toBe(true);
  for(const payload of [{action:"delete",id},{action:"read",id:"invalid"},{action:"read_all",id},{action:"read",id,url:"https://evil.example"}])
   expect(notificationActionSchema.safeParse(payload).success).toBe(false);
 });
 it("permite somente navegação local ao abrir avisos",()=>{
  expect(safeNotificationPath("/meus-envios?material=abc")).toBe("/meus-envios?material=abc");
  expect(safeNotificationPath("/materiais/123#comunidade")).toBe("/materiais/123#comunidade");
  for(const url of ["https://evil.example","//evil.example","/\\evil","/a\nb",null,42])
   expect(safeNotificationPath(url)).toBe("/biblioteca");
 });
 it("exibe categorias compreensíveis por tipo",()=>{
  expect(notificationCategory("material_approved")).toBe("Meus envios");
  expect(notificationCategory("comment_reply")).toBe("Comunidade");
  expect(notificationCategory("announcement")).toBe("Atualização");
  expect(notificationCategory("welcome")).toBe("Boas-vindas");
 });
});
