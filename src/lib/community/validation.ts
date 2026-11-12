import { z } from "zod";

const text = z.string().trim().min(1, "Escreva ao menos um caractere.").max(1000, "O limite é de 1.000 caracteres.");
const grade = z.string().trim().min(1, "Informe o ano escolar da turma.").max(80);
const optionalAdaptations = z.string().trim().max(1000).optional();

export const communityActionSchema = z.discriminatedUnion("action", [
 z.object({
  action: z.literal("create"), materialId: z.uuid(), body: text,
  kind: z.enum(["discussion", "application_report"]), parentId: z.uuid().nullable().optional(),
  grade: grade.optional(), adaptations: optionalAdaptations,
 }).superRefine((value, context) => {
  if (value.kind === "application_report" && (value.parentId || !value.grade)) {
   context.addIssue({ code: "custom", message: "O relato deve informar a turma e não pode ser uma resposta.", path: ["grade"] });
  }
  if (value.kind === "discussion" && (value.grade !== undefined || value.adaptations !== undefined)) {
   context.addIssue({ code: "custom", message: "Esses campos são exclusivos dos relatos.", path: ["grade"] });
  }
 }),
 z.object({ action: z.literal("edit"), commentId: z.uuid(), body: text, grade: grade.optional(), adaptations: optionalAdaptations }),
 z.object({ action: z.literal("delete"), commentId: z.uuid() }),
 z.object({ action: z.literal("report"), commentId: z.uuid(), reason: z.enum(["personal_data", "harassment", "spam"]), details: z.string().trim().max(1000).optional() }),
]);
export type CommunityAction = z.infer<typeof communityActionSchema>;
