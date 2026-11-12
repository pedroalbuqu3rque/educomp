/** Normaliza os relacionamentos embutidos devolvidos pelo PostgREST.
 * Dependendo da inferência de tipos/relacionamento, `taxonomies` pode vir como
 * objeto (N:1), lista ou nulo. Os consumidores devem receber sempre tags planas.
 */
export interface TaxonomyTag { category: string; label: string }

export function taxonomyTags(rows: readonly { taxonomies: unknown }[] | null | undefined): TaxonomyTag[] {
 const tags: TaxonomyTag[] = [];
 for (const row of rows ?? []) {
  const related = Array.isArray(row.taxonomies) ? row.taxonomies : row.taxonomies ? [row.taxonomies] : [];
  for (const item of related) {
   if (item !== null && typeof item === "object" && "category" in item && "label" in item &&
       typeof item.category === "string" && typeof item.label === "string") {
    tags.push({category: item.category, label: item.label});
   }
  }
 }
 return tags;
}
