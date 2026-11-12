import {describe,expect,it} from "vitest";
import {communityActionSchema} from "../src/lib/community/validation";
const materialId="8c410a6c-4ec0-4d97-8d7b-71b96bfd8b09";
const commentId="7202ec30-d7aa-4a55-8022-5b3655670f4a";

describe("validação da Comunidade",()=>{
 it("valida comentário e limite de texto",()=>{
  const base={action:"create",materialId,kind:"discussion"};
  expect(communityActionSchema.safeParse({...base,body:"Dúvida sobre algoritmos"}).success).toBe(true);
  expect(communityActionSchema.safeParse({...base,body:"  "}).success).toBe(false);
  expect(communityActionSchema.safeParse({...base,body:"a".repeat(1001)}).success).toBe(false);
  expect(communityActionSchema.safeParse({...base,body:"Ok",grade:"5º ano"}).success).toBe(false);
 });
 it("requer ano escolar nos relatos e impede relatos como resposta",()=>{
  const base={action:"create",materialId,kind:"application_report",body:"Turma fez a atividade"};
  expect(communityActionSchema.safeParse({...base,grade:"5º ano",adaptations:"Grupos menores"}).success).toBe(true);
  expect(communityActionSchema.safeParse(base).success).toBe(false);
  expect(communityActionSchema.safeParse({...base,grade:"3º ano",parentId:commentId}).success).toBe(false);
  expect(communityActionSchema.safeParse({...base,grade:"x".repeat(81)}).success).toBe(false);
 });
 it("permite edição, exclusão e denúncia com valores autorizados",()=>{
  expect(communityActionSchema.safeParse({action:"edit",commentId,body:"Nova versão"}).success).toBe(true);
  expect(communityActionSchema.safeParse({action:"delete",commentId}).success).toBe(true);
  expect(communityActionSchema.safeParse({action:"report",commentId,reason:"personal_data",details:"Sem consentimento"}).success).toBe(true);
  expect(communityActionSchema.safeParse({action:"report",commentId,reason:"outro"}).success).toBe(false);
  expect(communityActionSchema.safeParse({action:"report",commentId,reason:"spam",details:"x".repeat(1001)}).success).toBe(false);
 });
});
