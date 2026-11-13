export const filters = {
 type: { label: "Tipo", title: "Tipo de material", icon: "type.png", options: ["Plano de aula", "Slides", "Material de apoio", "Atividade", "Sequência didática", "Sequência de atividades", "Aula completa", "Jogo"] },
 stage: { label: "Etapa", title: "Etapa de ensino", icon: "stage.png", options: ["Educação Infantil", "Ensino Fundamental — Anos iniciais", "Ensino Fundamental — Anos finais", "Ensino Médio"] },
 axis: { label: "Eixo", title: "Eixo da Computação", icon: "axis.png", options: ["Pensamento Computacional", "Mundo Digital", "Cultura Digital"] },
 approach: { label: "Abordagem", title: "Abordagem da atividade", icon: "approach.svg", options: ["Plugada", "Desplugada"] },
};
export type FilterKey = keyof typeof filters;
export const filterKeys = Object.keys(filters) as FilterKey[];
export type Selections = Record<FilterKey, string[]>;
export interface Material {
 is_demo?: boolean;
 saved?: boolean; authorship?: string; objectives?: string; files?: {id:string;name:string;size:number}[];
 id: string; title: string; description: string; keywords: string[]; year: string;
 type: string[]; stage: string[]; axis: string[]; approach: string[];
}
export interface Query { q: string; selections: Selections; page: number }
export function emptySelections(): Selections { return {type:[],stage:[],axis:[],approach:[]}; }
export function normalize(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR"); }
export function parseQuery(params: URLSearchParams): Query {
 const selections = emptySelections();
 for (const key of filterKeys) selections[key] = [...new Set(params.getAll(key))].filter(v=>filters[key].options.includes(v));
 const page=Number(params.get("page") ?? 1);
 return { q: (params.get("q") ?? "").slice(0,200), selections, page: Number.isSafeInteger(page) && page>0 ? page : 1 };
}
export function serializeQuery(query: Query) {
 const params=new URLSearchParams();
 if(query.q.trim()) params.set("q",query.q.trim());
 for(const key of filterKeys) for(const value of query.selections[key]) params.append(key,value);
 if(query.page>1) params.set("page",String(query.page));
 return params.toString();
}
export function applyCategory(query: Query, key: FilterKey, values: string[]): Query {
 return {...query,page:1,selections:{...query.selections,[key]:[...new Set(values)].filter(v=>filters[key].options.includes(v))}};
}
export function searchCatalog(materials: Material[], query: Query) {
 const terms=normalize(query.q).trim().split(/\s+/).filter(Boolean);
 const matches=materials.filter(m=> {
  const haystack=normalize([m.title,...m.keywords].join(" "));
  return terms.every(t=>haystack.includes(t)) && filterKeys.every(key=>!query.selections[key].length || query.selections[key].some(v=>m[key].includes(v)));
 });
 const pages=Math.max(1,Math.ceil(matches.length/12));
 const page=Math.min(query.page,pages);
 return { total:matches.length,pages,page,items:matches.slice((page-1)*12,page*12) };
}

/** IDs dos 24 registros institucionais do acervo inicial, separados de envios docentes. */
export function isCatalogExampleId(id: string): boolean {
 if(!/^d3000000-0000-4000-8000-[0-9]{12}$/i.test(id)) return false;
 const number=Number(id.slice(-12));
 return number>=1 && number<=24;
}
