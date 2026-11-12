import { expect, test } from "vitest";
import { taxonomyTags } from "../src/lib/materials/taxonomy-tags";

test("normalizes PostgREST object, array, null and invalid taxonomy relations", () => {
 expect(taxonomyTags([
  { taxonomies: { category: "type", label: "Jogo" } },
  { taxonomies: [{ category: "axis", label: "Pensamento Computacional" }, { category: "stage", label: "Ensino Médio" }] },
  { taxonomies: null },
  { taxonomies: [{ category: 2, label: "Inválido" }, null] },
 ])).toEqual([
  { category: "type", label: "Jogo" },
  { category: "axis", label: "Pensamento Computacional" },
  { category: "stage", label: "Ensino Médio" },
 ]);
 expect(taxonomyTags(undefined)).toEqual([]);
});
