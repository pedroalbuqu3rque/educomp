import { z } from "zod";
export type AuthMode = "login" | "signup" | "recover" | "reset";
export type AuthState = { error?: string; success?: string; email?: string; name?: string };
export const emailSchema = z.email("Informe um e-mail válido.").max(254);
export const passwordSchema = z.string().min(12,"Use pelo menos 12 caracteres na senha.").max(128,"Use no máximo 128 caracteres na senha.");
export function safeNext(value: unknown) {
 if (typeof value !== "string") return "/biblioteca";
 if (["/biblioteca", "/conta", "/salvos", "/enviar", "/meus-envios", "/revisao", "/revisao/denuncias", "/notificacoes"].includes(value)) return value;
 // Permit only a local material route with a validated UUID, never arbitrary URLs.
 const revisionMatch = /^\/enviar\?revisao=([^&#/?]+)$/.exec(value);
 if (revisionMatch && z.uuid().safeParse(revisionMatch[1]).success) return value;
 const match = /^\/materiais\/([^/?#]+)$/.exec(value);
 if (match && z.uuid().safeParse(match[1]).success) return value;
 const reviewMatch = /^\/revisao\/(?:denuncias\/)?([^/?#]+)$/.exec(value);
 return reviewMatch && z.uuid().safeParse(reviewMatch[1]).success ? value : "/biblioteca";
}
export function appUrl() {
 const url = new URL(process.env.APP_URL || "http://localhost:3000");
 if (!["http:","https:"].includes(url.protocol)) throw new Error("APP_URL inválida");
 return url.origin;
}
