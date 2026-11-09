import { z } from "zod";
export type AuthMode = "login" | "signup" | "recover" | "reset";
export type AuthState = { error?: string; success?: string; email?: string; name?: string };
export const emailSchema = z.email("Informe um e-mail válido.").max(254);
export const passwordSchema = z.string().min(12,"Use pelo menos 12 caracteres na senha.").max(128,"Use no máximo 128 caracteres na senha.");
export function safeNext(value: unknown) {
 return typeof value === "string" && ["/biblioteca","/conta","/salvos"].includes(value) ? value : "/biblioteca";
}
export function appUrl() {
 const url = new URL(process.env.APP_URL || "http://localhost:3000");
 if (!["http:","https:"].includes(url.protocol)) throw new Error("APP_URL inválida");
 return url.origin;
}
