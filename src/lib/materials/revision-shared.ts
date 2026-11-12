/** Dados públicos ao próprio autor para preparar uma nova versão do envio. */
export interface RevisionSource {
 id: string;
 title: string;
 description: string;
 keywords: string[];
 types: string[];
 stages: string[];
 grades: string[];
 axes: string[];
 authorship: string;
 objectives: string;
 approach: string;
 reason: string | null;
 status: "changes_requested" | "rejected";
 fileNames: string[];
}
