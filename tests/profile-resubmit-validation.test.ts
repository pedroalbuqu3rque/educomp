import {expect,describe,it} from "vitest";
import {avatarType,isAvatarSignature,publicAvatarUrl,MAX_AVATAR_BYTES} from "@/lib/profile/avatar";
import {resubmissionSchema} from "@/lib/materials/submission";
import {materialActionSchema} from "@/lib/review/shared";
import {statusLabels} from "@/lib/materials/submission-status";
import {notificationCategory} from "@/lib/notifications/shared";

const valid={title:"Desafio dos algoritmos",description:"Atividade para ensinar sequências de instruções.",
 keywords:["lógica"],types:["Jogo"],stages:["Ensino Fundamental — Anos iniciais"],
 grades:["4º ano"],axes:["Pensamento Computacional"],approach:"unplugged",
 authorship:"Professor(a) do EduComp",objectives:"Experimentar algoritmos.",rights_confirmed:true};
const source="aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
describe("foto de perfil",()=>{
 it("aceita JPG e PNG de até 5 MB com extensão correspondente",()=>{
  expect(avatarType({name:"foto.jpg",size:100,type:"image/jpeg"}).extension).toBe("jpg");
  expect(avatarType({name:"foto.jpeg",size:100,type:"image/jpeg"}).extension).toBe("jpg");
  expect(avatarType({name:"foto.png",size:100,type:"image/png"}).extension).toBe("png");
  expect(()=>avatarType({name:"foto.svg",size:100,type:"image/svg+xml"})).toThrow();
  expect(()=>avatarType({name:"foto.png",size:100,type:"image/jpeg"})).toThrow();
  expect(()=>avatarType({name:"foto.png",size:MAX_AVATAR_BYTES+1,type:"image/png"})).toThrow();
  expect(()=>avatarType({name:"foto.png",size:0,type:"image/png"})).toThrow();
 });
 it("confere assinatura binária além do MIME",()=>{
  expect(isAvatarSignature(Uint8Array.from([137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1]),"image/png")).toBe(true);
  expect(isAvatarSignature(Uint8Array.from([255,216,255,224]),"image/jpeg")).toBe(true);
  expect(isAvatarSignature(Uint8Array.from([60,115,118,103]),"image/png")).toBe(false);
  expect(isAvatarSignature(Uint8Array.from([255,216,255,224]),"image/png")).toBe(false);
 });
 it("não gera URL para caminho fora do padrão",()=>{
  expect(publicAvatarUrl("https://hostile.example/x.jpg")).toBeNull();
  expect(publicAvatarUrl("../../admin/secret.jpg")).toBeNull();
  expect(publicAvatarUrl("aaa.svg")).toBeNull();
 });
});
describe("reenvio e revisão",()=>{
 it("permite reenvio vinculado a UUID válido, com campos completos",()=>{
  expect(resubmissionSchema.safeParse(valid).success).toBe(true);
  expect(resubmissionSchema.safeParse({...valid,resubmission_of:source}).success).toBe(true);
  expect(resubmissionSchema.safeParse({...valid,resubmission_of:"nada"}).success).toBe(false);
  expect(resubmissionSchema.safeParse({...valid,resubmission_of:source,rights_confirmed:false}).success).toBe(false);
 });
 it("exige uma justificativa válida para solicitar ajustes ou recusar",()=>{
  expect(materialActionSchema.safeParse({action:"request_changes",reason:"Inclua a atividade e a avaliação."}).success).toBe(true);
  expect(materialActionSchema.safeParse({action:"request_changes",reason:"curto"}).success).toBe(false);
  expect(materialActionSchema.safeParse({action:"reject",reason:"curto"}).success).toBe(false);
  expect(materialActionSchema.safeParse({action:"approve"}).success).toBe(true);
  expect(statusLabels.changes_requested).toBe("Ajustes solicitados");
  expect(notificationCategory("material_changes_requested")).toBe("Meus envios");
 });
});
