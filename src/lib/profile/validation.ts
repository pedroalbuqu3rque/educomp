import { z } from "zod";
export const profileSchema = z.object({
 display_name: z.string().trim().min(1, "Informe seu nome.").max(120, "Use até 120 caracteres no nome."),
 occupation: z.string().trim().max(120, "Use até 120 caracteres no cargo ou função."),
 bio: z.string().trim().max(300, "Use até 300 caracteres na apresentação."),
});
export type ProfileValues = z.infer<typeof profileSchema>;
export type ProfileResult = { profile?: ProfileValues; error?: string; fields?: Partial<Record<keyof ProfileValues, string>>; requiresLogin?: boolean };
