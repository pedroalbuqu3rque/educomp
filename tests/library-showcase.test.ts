import { describe,expect,test } from "vitest";
import { demoMaterials } from "../src/lib/library/demo-materials";
import { applyCategory, emptySelections, isCatalogExampleId, searchCatalog } from "../src/lib/library/catalog";

const q={q:"",selections:emptySelections(),page:1};
const titles=[
 "Algoritmos no dia a dia","Privacidade e segurança na internet","Jogos de lógica","Histórias no Scratch",
 "Redes e conexões","Segurança na internet","Padrões e formas","Dados e privacidade",
 "Comandos com blocos","Mensagens codificadas","Cidadania digital","Caminhos e movimentos",
];
describe("Catálogo ilustrativo alinhado ao Figma",()=>{
 test("primeira página possui exatamente os 12 cards e a ordem do protótipo",()=>{
  expect(searchCatalog(demoMaterials,q).items.map(x=>x.title)).toEqual(titles);
  expect(searchCatalog(demoMaterials,{...q,page:2}).items).toHaveLength(12);
 });
 test("cada card possui classificação, descrição e objetivos próprios",()=>{
  expect(new Set(demoMaterials.map(m=>m.title)).size).toBe(24);
  for(const item of demoMaterials){
   expect(item.description.trim().length).toBeGreaterThan(20);
   expect(item.objectives?.trim().length).toBeGreaterThan(20);
   expect(item.type.length).toBeGreaterThan(0);
   expect(item.stage.length).toBeGreaterThan(0);
   expect(item.axis.length).toBeGreaterThan(0);
   expect(item.approach.length).toBeGreaterThan(0);
  }
 });
 test("novos tipos funcionam com busca e abordagem",()=>{
  const classes=searchCatalog(demoMaterials,applyCategory(q,"type",["Aula completa"]));
  expect(classes.items.map(m=>m.title)).toContain("Privacidade e segurança na internet");
  expect(searchCatalog(demoMaterials,applyCategory(q,"type",["Sequência de atividades"])).items[0].title).toBe("Algoritmos no dia a dia");
  expect(searchCatalog(demoMaterials,{...q,q:"criptografia"}).items[0].title).toBe("Mensagens codificadas");
 });
 test("IDs determinísticos distinguem demos de publicações reais",()=>{
  expect(isCatalogExampleId("d3000000-0000-4000-8000-000000000001")).toBe(true);
  expect(isCatalogExampleId("d3000000-0000-4000-8000-000000000024")).toBe(true);
  expect(isCatalogExampleId("d3000000-0000-4000-8000-000000000025")).toBe(false);
  expect(isCatalogExampleId("10000000-0000-4000-8000-000000000001")).toBe(false);
 });
});
