import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { getCatalogEditorial, presentCatalogRecord } from "../src/lib/library/catalog-resources";
import { demoMaterials } from "../src/lib/library/demo-materials";

function uuidAt(index: number) {
  return `d3000000-0000-4000-8000-${String(index).padStart(12, "0")}`;
}

describe("Arquivos do acervo institucional", () => {
  test("as 24 fichas possuem um arquivo PDF existente e com assinatura válida", () => {
    for (let index = 1; index <= 24; index++) {
      const resource = getCatalogEditorial(uuidAt(index));
      expect(resource).not.toBeNull();
      const attachment = resource!.attachment;
      expect(attachment.url.startsWith("/biblioteca/arquivos/")).toBe(true);
      const pdf = readFileSync(`public${attachment.url}`);
      expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
      expect(pdf.byteLength).toBe(attachment.sizeBytes);
      expect(attachment.pages).toBeGreaterThan(0);
    }
  });

  test("quatro fichas têm conteúdo didático próprio e as restantes têm arquivo provisório", () => {
    const complete = [1, 2, 4, 5];
    for (let index = 1; index <= 24; index++) {
      const resource = getCatalogEditorial(uuidAt(index));
      expect(resource!.attachment.provisional).toBe(!complete.includes(index));
      if (complete.includes(index)) {
        expect(resource!.contents?.length).toBeGreaterThan(0);
        expect(resource!.attachment.cover).toBeTruthy();
        expect(readFileSync(`public${resource!.attachment.cover}`).byteLength).toBeGreaterThan(1000);
      }
    }
  });

  test("dados visíveis correspondem aos PDFs de Scratch e internet", () => {
    const scratch = presentCatalogRecord({ ...demoMaterials[3], id: uuidAt(4) });
    const internet = presentCatalogRecord({ ...demoMaterials[4], id: uuidAt(5) });
    expect(scratch).toMatchObject({title: "Quiz interativo no Scratch", type: ["Atividade"], year: "EF · 6º ano"});
    expect(internet).toMatchObject({title: "Como funciona a internet?", year: "EF · 8º ano", approach: ["Plugada", "Desplugada"]});
    expect(getCatalogEditorial("../../etc/passwd")).toBeNull();
  });
});
