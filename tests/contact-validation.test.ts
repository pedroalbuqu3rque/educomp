import { describe, it, expect } from "vitest";
import { contactMessageSchema } from "../src/lib/contact/validation";

const valid = {
  name: "Maria Silva",
  email: "maria@example.org",
  subject: "Dúvida sobre um material",
  message: "Quero saber como utilizar os arquivos da Biblioteca.",
};

describe("formulário de contato", () => {
  it("aceita dados válidos e normaliza espaços", () => {
    const result = contactMessageSchema.safeParse({ ...valid, name: "  Maria Silva  ", subject: "  Olá  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Maria Silva");
  });
  it("rejeita nome, e-mail, assunto e mensagem inválidos", () => {
    expect(contactMessageSchema.safeParse({ ...valid, name: " " }).success).toBe(false);
    expect(contactMessageSchema.safeParse({ ...valid, email: "invalido" }).success).toBe(false);
    expect(contactMessageSchema.safeParse({ ...valid, subject: " " }).success).toBe(false);
    expect(contactMessageSchema.safeParse({ ...valid, message: "curta" }).success).toBe(false);
  });
  it("impõe limites, restringe campos não reconhecidos e aceita honeypot vazio", () => {
    expect(contactMessageSchema.safeParse({ ...valid, message: "x".repeat(4001) }).success).toBe(false);
    expect(contactMessageSchema.safeParse({ ...valid, extra: "não esperado" }).success).toBe(false);
    expect(contactMessageSchema.safeParse({ ...valid, website: "" }).success).toBe(true);
  });
});
