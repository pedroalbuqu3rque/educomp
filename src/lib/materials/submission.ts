import { z } from "zod";

export const MAX_FILE_BYTES = 20 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 50 * 1024 * 1024;
export const MAX_FILES = 5;

export const types = ["Plano de aula", "Slides", "Material de apoio", "Atividade", "Sequência didática", "Sequência de atividades", "Aula completa", "Jogo"] as const;
export const stages = ["Educação Infantil", "Ensino Fundamental — Anos iniciais", "Ensino Fundamental — Anos finais", "Ensino Médio"] as const;
export const axes = ["Pensamento Computacional", "Mundo Digital", "Cultura Digital"] as const;
export const gradesByStage: Record<(typeof stages)[number], readonly string[]> = {
 "Educação Infantil": ["Educação Infantil"],
 "Ensino Fundamental — Anos iniciais": ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"],
 "Ensino Fundamental — Anos finais": ["6º ano", "7º ano", "8º ano", "9º ano"],
 "Ensino Médio": ["1ª série do Ensino Médio", "2ª série do Ensino Médio", "3ª série do Ensino Médio"],
};
const grades = Object.values(gradesByStage).flat();

export const submissionSchema = z.object({
 title: z.string().trim().min(3, "Informe um título com pelo menos 3 caracteres.").max(200, "O título deve ter até 200 caracteres."),
 description: z.string().trim().min(20, "Escreva uma descrição com pelo menos 20 caracteres.").max(10000),
 keywords: z.array(z.string().trim().min(2).max(40)).min(1, "Adicione uma palavra-chave.").max(12, "Use até 12 palavras-chave."),
 types: z.array(z.enum(types)).min(1, "Selecione um tipo de material."),
 stages: z.array(z.enum(stages)).min(1, "Selecione uma etapa de ensino."),
 grades: z.array(z.enum(grades as [string, ...string[]])).min(1, "Selecione um ano ou série."),
 axes: z.array(z.enum(axes)).min(1, "Selecione um eixo da Computação."),
 approach: z.enum(["plugged", "unplugged", "both"], { error: "Selecione uma abordagem." }),
 authorship: z.string().trim().min(2, "Informe o autor ou a fonte.").max(200),
 objectives: z.string().trim().max(2000, "Use até 2.000 caracteres nos objetivos."),
 rights_confirmed: z.literal(true, { error: "Confirme os direitos de compartilhamento." }),
}).superRefine((value, context) => {
 const unique = (items: string[]) => items.length === new Set(items.map(item => item.toLocaleLowerCase("pt-BR"))).size;
 if (!unique(value.keywords)) context.addIssue({ code: "custom", path: ["keywords"], message: "Remova as palavras-chave repetidas." });
 for (const key of ["types", "stages", "grades", "axes"] as const) {
  if (!unique(value[key])) context.addIssue({ code: "custom", path: [key], message: "Há seleções repetidas." });
 }
 const allowed = new Set(value.stages.flatMap(stage => gradesByStage[stage]));
 if (value.grades.some(grade => !allowed.has(grade)) || value.stages.some(stage => !value.grades.some(grade => gradesByStage[stage].includes(grade)))) {
  context.addIssue({ code: "custom", path: ["grades"], message: "Selecione anos ou séries compatíveis com todas as etapas escolhidas." });
 }
});
export const resubmissionSchema = submissionSchema.and(z.object({resubmission_of:z.uuid().optional()}));
export type SubmissionValues = z.input<typeof submissionSchema>;

const allowedFiles: Record<string, string> = {
 pdf: "application/pdf",
 docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
 pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
 png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
};

export function fileInfo(file: Pick<File, "name" | "size">): { extension: string; mime: string; name: string } {
 const name = file.name.normalize("NFC").replace(/[\\/\u0000-\u001f\u007f]/g, "_").trim();
 const extension = (name.split(".").pop() ?? "").toLowerCase();
 if (!allowedFiles[extension]) throw new Error(`Formato não aceito: ${name}. Use PDF, DOCX, PPTX, PNG ou JPG.`);
 if (!name || name.length > 180) throw new Error("Use nomes de arquivo com até 180 caracteres.");
 if (file.size === 0) throw new Error(`O arquivo ${name} está vazio.`);
 if (file.size > MAX_FILE_BYTES) throw new Error(`${name} excede o limite de 20 MB por arquivo.`);
 return { extension, mime: allowedFiles[extension], name };
}

export function validateFiles(files: Pick<File, "name" | "size">[]): void {
 if (!files.length) throw new Error("Adicione ao menos um arquivo.");
 if (files.length > MAX_FILES) throw new Error(`Você pode adicionar no máximo ${MAX_FILES} arquivos.`);
 files.forEach(fileInfo);
 if (files.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES) throw new Error("Os arquivos somados não podem ultrapassar 50 MB.");
}

// Validate actual bytes, not the MIME supplied by the browser. Office documents
// must contain the expected OOXML package entries, not merely a ZIP signature.
export function isValidFileSignature(bytes: Uint8Array, extension: string): boolean {
 if (extension === "pdf") return startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d]);
 if (extension === "png") return startsWith(bytes, [137, 80, 78, 71, 13, 10, 26, 10]);
 if (extension === "jpg" || extension === "jpeg") return startsWith(bytes, [0xff, 0xd8, 0xff]) && bytes.length >= 4 && bytes.at(-2) === 0xff && bytes.at(-1) === 0xd9;
 if (extension !== "docx" && extension !== "pptx") return false;
 if (!startsWith(bytes, [0x50, 0x4b, 0x03, 0x04]) || bytes.length < 22) return false;
 const decoder = new TextDecoder();
 const expected = extension === "docx" ? "word/document.xml" : "ppt/presentation.xml";
 try {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let end = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
   if (view.getUint32(i, true) === 0x06054b50 && i + 22 + view.getUint16(i + 20, true) === bytes.length) { end = i; break; }
  }
  if (end < 0 || view.getUint16(end + 4, true) !== 0 || view.getUint16(end + 6, true) !== 0) return false;
  const entries = view.getUint16(end + 10, true), size = view.getUint32(end + 12, true), start = view.getUint32(end + 16, true);
  if (!entries || entries > 5000 || start + size > end) return false;
  let offset = start;
  const found = new Set<string>();
  for (let i = 0; i < entries; i++) {
   if (offset + 46 > bytes.length || view.getUint32(offset, true) !== 0x02014b50) return false;
   const nameLen = view.getUint16(offset + 28, true), extraLen = view.getUint16(offset + 30, true), commentLen = view.getUint16(offset + 32, true);
   const next = offset + 46 + nameLen + extraLen + commentLen;
   if (next > bytes.length) return false;
   found.add(decoder.decode(bytes.subarray(offset + 46, offset + 46 + nameLen)));
   offset = next;
  }
  return offset === start + size && found.has("[Content_Types].xml") && found.has(expected);
 } catch { return false; }
}
function startsWith(bytes: Uint8Array, signature: number[]) { return signature.every((part, i) => bytes[i] === part); }
