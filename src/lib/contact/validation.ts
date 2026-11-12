import { z } from "zod";

// Reutilizado pela API e pelos testes; o servidor nunca confia na validação HTML.
export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(120, "O nome deve ter no máximo 120 caracteres."),
  email: z.email("Informe um e-mail válido.").trim().max(254, "O e-mail é muito longo."),
  subject: z.string().trim().min(3, "Informe o assunto.").max(160, "O assunto deve ter no máximo 160 caracteres."),
  message: z.string().trim().min(10, "Escreva uma mensagem com pelo menos 10 caracteres.").max(4000, "A mensagem deve ter no máximo 4.000 caracteres."),
  // Campo antispam invisível para visitantes. Não grava nada se preenchido.
  website: z.string().max(200).optional().default(""),
}).strict();

export type ContactMessage = z.infer<typeof contactMessageSchema>;
