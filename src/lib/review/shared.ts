import { z } from "zod";

export const materialActionSchema = z.object({
 action: z.enum(["start", "approve", "reject", "request_changes", "publish", "unpublish"]),
 reason: z.string().trim().max(1000).optional(),
}).superRefine((input, ctx) => {
 if ((input.action === "reject" || input.action === "request_changes") && (input.reason?.trim().length ?? 0)<10)
  ctx.addIssue({code:"custom", path:["reason"], message:"Informe uma justificativa de pelo menos 10 caracteres."});
});
export const reportActionSchema = z.object({
 action: z.enum(["start", "dismiss", "hide", "restore", "delete"]),
 reason: z.string().trim().max(1000).optional(),
}).superRefine((input, ctx) => {
 if (input.action !== "start" && (input.reason?.trim().length ?? 0) < 10)
  ctx.addIssue({code:"custom", path:["reason"], message:"Explique a decisão em pelo menos 10 caracteres."});
});

export type MaterialAction = z.infer<typeof materialActionSchema>["action"];
export type ReportAction = z.infer<typeof reportActionSchema>["action"];
export type ReviewStatus = "pending" | "in_review" | "approved" | "rejected" | "changes_requested";
export type ReportStatus = "pending" | "in_review" | "resolved";
export type ReviewFilter = "all" | "pending" | "in_review" | "completed";
export const reviewFilters: ReviewFilter[] = ["all","pending","in_review","completed"];
export const materialStatusLabel = (status: ReviewStatus, published: boolean) => published ? "Publicado" : ({
 pending:"Pendente", in_review:"Em análise", approved:"Aprovado", rejected:"Recusado", changes_requested:"Ajustes solicitados",
}[status] ?? "Indefinido");
export const reportStatusLabel = (status: ReportStatus) => ({
 pending:"Pendente", in_review:"Em análise", resolved:"Concluída",
}[status]);
export const reportReasonLabel = (reason: string) => ({
 personal_data:"Dados pessoais", harassment:"Ofensa ou assédio", spam:"Spam ou desvio de assunto",
} as Record<string,string>)[reason] ?? "Outro";
export const reportOutcomeLabel = (outcome: string | null) => ({
 dismissed:"Denúncia descartada", hidden:"Comentário ocultado", restored:"Comentário restaurado", deleted:"Comentário excluído",
} as Record<string,string>)[outcome ?? ""] ?? "Não concluída";
export function readableSize(bytes: number) { return bytes < 1024*1024 ? `${(bytes/1024).toLocaleString("pt-BR",{maximumFractionDigits:1})} KB` : `${(bytes/(1024*1024)).toLocaleString("pt-BR",{maximumFractionDigits:1})} MB`; }
