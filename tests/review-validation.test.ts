import {describe,expect,it} from "vitest";
import {materialActionSchema,reportActionSchema,materialStatusLabel,reportReasonLabel} from "../src/lib/review/shared";
import {safeNext} from "../src/lib/auth/validation";

describe("decisões editoriais",()=>{
 it("recusa exige justificativa e tamanho máximo",()=>{
  expect(materialActionSchema.safeParse({action:"reject",reason:""}).success).toBe(false);
  expect(materialActionSchema.safeParse({action:"reject",reason:"  "}).success).toBe(false);
  expect(materialActionSchema.safeParse({action:"reject",reason:"Falta informar a fonte"}).success).toBe(true);
  expect(materialActionSchema.safeParse({action:"reject",reason:"x".repeat(1001)}).success).toBe(false);
  expect(materialActionSchema.safeParse({action:"publish",reason:""}).success).toBe(true);
  expect(materialActionSchema.safeParse({action:"start"}).success).toBe(true);
  expect(materialActionSchema.safeParse({action:"delete"}).success).toBe(false);
 });
 it("exclusão e outras decisões de moderação exigem motivo",()=>{
  for(const action of ["hide","restore","delete","dismiss"]){
   expect(reportActionSchema.safeParse({action,reason:"curta"}).success).toBe(false);
   expect(reportActionSchema.safeParse({action,reason:"Exposição de dados pessoais"}).success).toBe(true);
  }
  expect(reportActionSchema.safeParse({action:"start"}).success).toBe(true);
  expect(reportActionSchema.safeParse({action:"approve"}).success).toBe(false);
 });
 it("separa aprovação de publicação e rotula denúncias",()=>{
  expect(materialStatusLabel("approved",false)).toBe("Aprovado");
  expect(materialStatusLabel("approved",true)).toBe("Publicado");
  expect(reportReasonLabel("personal_data")).toBe("Dados pessoais");
 });
 it("permite retorno ao painel após login, sem aceitar redirecionamentos arbitrários",()=>{
  const id="d7cc4f33-a32b-4dd8-97fe-134c8042f049";
  expect(safeNext("/revisao")).toBe("/revisao");
  expect(safeNext("/revisao/denuncias")).toBe("/revisao/denuncias");
  expect(safeNext(`/revisao/${id}`)).toBe(`/revisao/${id}`);
  expect(safeNext(`/revisao/denuncias/${id}`)).toBe(`/revisao/denuncias/${id}`);
  for(const invalid of ["//evil.com", "/revisao/../../conta", "/revisao/denuncias?data=x", "https://site.com/revisao", "/revisao/abc"])
   expect(safeNext(invalid)).toBe("/biblioteca");
 });
});
