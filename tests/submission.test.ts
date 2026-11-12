import { expect, test } from "vitest";
import {
 fileInfo,
 isValidFileSignature,
 submissionSchema,
 validateFiles,
} from "../src/lib/materials/submission";

const validSubmission = {
 title: "Desafio dos algoritmos",
 description: "Atividades de lógica para explorar sequências e instruções em sala de aula.",
 keywords: ["algoritmos", "lógica"],
 types: ["Sequência didática", "Jogo"],
 stages: ["Ensino Fundamental — Anos iniciais"],
 grades: ["4º ano", "5º ano"],
 axes: ["Pensamento Computacional"],
 approach: "unplugged",
 authorship: "Professor(a) colaborador(a)",
 objectives: "Elaborar e testar algoritmos.",
 rights_confirmed: true,
};

test("o envio exige classificação, autoria e confirmação dos direitos", () => {
 expect(submissionSchema.safeParse(validSubmission).success).toBe(true);
 expect(submissionSchema.safeParse({ ...validSubmission, rights_confirmed: false }).success).toBe(false);
 expect(submissionSchema.safeParse({ ...validSubmission, types: [] }).success).toBe(false);
 expect(submissionSchema.safeParse({ ...validSubmission, keywords: ["lógica", "LÓGICA"] }).success).toBe(false);
 expect(submissionSchema.safeParse({ ...validSubmission, stages: ["Ensino Médio"] }).success).toBe(false);
 expect(submissionSchema.safeParse({ ...validSubmission, grades: ["8º ano"] }).success).toBe(false);
});

test("arquivos respeitam extensões, quantidade e tamanho máximo", () => {
 const pdf = { name: "atividade.pdf", size: 12 * 1024 };
 expect(() => validateFiles([pdf])).not.toThrow();
 expect(fileInfo({ name: "plano.PDF", size: 42 }).mime).toBe("application/pdf");
 expect(() => validateFiles([])).toThrow(/ao menos um arquivo/);
 expect(() => validateFiles(Array(6).fill(pdf))).toThrow(/máximo 5/);
 expect(() => validateFiles([{ name: "teste.exe", size: 1024 }])).toThrow(/Formato não aceito/);
 expect(() => validateFiles([{ name: "teste.pdf", size: 20 * 1024 * 1024 + 1 }])).toThrow(/20 MB/);
 expect(() => validateFiles([{ name: "teste.png", size: 0 }])).toThrow(/vazio/);
});

test("a assinatura real precisa corresponder à extensão", () => {
 const pdf = new TextEncoder().encode("%PDF-1.7\n");
 const png = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0]);
 const jpeg = new Uint8Array([255, 216, 255, 224, 0, 255, 217]);
 expect(isValidFileSignature(pdf, "pdf")).toBe(true);
 expect(isValidFileSignature(png, "png")).toBe(true);
 expect(isValidFileSignature(jpeg, "jpg")).toBe(true);
 expect(isValidFileSignature(png, "pdf")).toBe(false);
 expect(isValidFileSignature(new Uint8Array([80, 75, 3, 4]), "docx")).toBe(false);
});
