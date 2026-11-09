import { describe, expect, test } from "vitest";
import { applyCategory, emptySelections, parseQuery, searchCatalog, serializeQuery, type Query } from "../src/lib/library/catalog";
import { demoMaterials } from "../src/lib/library/demo-materials";
function query(q=""):Query {return {q,page:1,selections:emptySelections()};}
describe("Biblioteca: regras de busca",()=>{
 test("normaliza caixa/acentos e combina termos entre título e palavras-chave",()=>{
  expect(searchCatalog(demoMaterials,query("LOGICA")).items.map(m=>m.title)).toEqual(["Jogos de lógica"]);
  expect(searchCatalog(demoMaterials,query("codificadas CRIPTOGRAFIA")).items.map(m=>m.id)).toEqual(["demo-10"]);
  expect(searchCatalog(demoMaterials,query("criptografia impossível")).total).toBe(0);
 });
 test("não pesquisa a descrição",()=>{
  expect(searchCatalog(demoMaterials,query("ilustrado")).total).toBe(0);
 });
 test("usa OU dentro da categoria e E entre categorias e texto",()=>{
  let q=applyCategory(query(),"type",["Atividade","Jogo"]);
  q=applyCategory(q,"stage",["Ensino Fundamental — Anos iniciais"]);
  q=applyCategory(q,"approach",["Desplugada"]);
  expect(searchCatalog(demoMaterials,q).items.map(m=>m.id)).toEqual(["demo-02","demo-03","demo-09","demo-17"]);
  expect(searchCatalog(demoMaterials,{...q,q:"blocos"}).items.map(m=>m.id)).toEqual(["demo-09"]);
 });
 test("materiais com ambas as abordagens correspondem a cada filtro",()=>{
  for(const approach of ["Plugada","Desplugada"]) expect(searchCatalog(demoMaterials,applyCategory(query("privacidade"),"approach",[approach])).items.some(m=>m.id==="demo-08")).toBe(true);
 });
 test("24 itens em duas páginas estáveis, sem repetição ou omissão",()=>{
  const first=searchCatalog(demoMaterials,query());
  const second=searchCatalog(demoMaterials,{...query(),page:2});
  expect(first.items).toHaveLength(12);expect(second.items).toHaveLength(12);
  expect([...first.items,...second.items].map(m=>m.id)).toEqual(demoMaterials.map(m=>m.id));
  expect(new Set([...first.items,...second.items].map(m=>m.id)).size).toBe(24);
  expect(searchCatalog(demoMaterials,{...query(),page:999}).page).toBe(2);
 });
 test("aplicar categoria preserva as demais e reinicia página; não altera consulta anterior",()=>{
  const old={...applyCategory(query("dados"),"type",["Plano de aula"]),page:2};
  const next=applyCategory(old,"axis",["Cultura Digital"]);
  expect(next.page).toBe(1);expect(next.q).toBe("dados");expect(next.selections.type).toEqual(["Plano de aula"]);
  expect(old.selections.axis).toEqual([]);expect(old.page).toBe(2);
 });
 test("URL restaura filtros, termos e página; descarta opções inválidas",()=>{
  const q={...applyCategory(query("padrões e formas"),"type",["Jogo","Atividade"]),page:2};
  expect(parseQuery(new URLSearchParams(serializeQuery(q)))).toEqual(q);
  expect(parseQuery(new URLSearchParams("page=-1&type=Outro&type=Jogo&type=Jogo")).selections.type).toEqual(["Jogo"]);
  for(const page of ["-1","0","NaN","1.4","Infinity"])expect(parseQuery(new URLSearchParams({page})).page).toBe(1);
 });
 test("acervo vazio e nenhum resultado não causam paginação inválida",()=>{
  expect(searchCatalog([],query())).toEqual({total:0,pages:1,page:1,items:[]});
  expect(searchCatalog(demoMaterials,query("inexistente")).items).toEqual([]);
 });
});
