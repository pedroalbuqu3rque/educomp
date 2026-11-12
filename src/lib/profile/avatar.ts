/** Fotos públicas: o caminho sempre pertence ao titular do perfil. */
export const MAX_AVATAR_BYTES = 5 * 1024 * 1024;
const imageTypes: Record<string, {extension: "png" | "jpg"; mime: string}> = {
 "image/png": {extension:"png",mime:"image/png"},
 "image/jpeg": {extension:"jpg",mime:"image/jpeg"},
};
export function avatarType(file: Pick<File,"name"|"type"|"size">) {
 const suffix=file.name.toLowerCase().split(".").pop();
 const image=imageTypes[file.type];
 if(!image || (image.extension==="png" ? suffix!=="png" : !["jpg","jpeg"].includes(suffix??"")))
  throw new Error("Escolha uma imagem JPG ou PNG.");
 if(!file.size || file.size>MAX_AVATAR_BYTES) throw new Error("A foto deve ter até 5 MB.");
 return image;
}
export function isAvatarSignature(bytes: Uint8Array,mime:string) {
 if(mime==="image/png") return bytes.length>=24 &&
  [137,80,78,71,13,10,26,10].every((part,i)=>bytes[i]===part) &&
  bytes[12]===73&&bytes[13]===72&&bytes[14]===68&&bytes[15]===82;
 if(mime==="image/jpeg") return bytes.length>=4&&bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
 return false;
}
export function publicAvatarUrl(path: string | null | undefined): string | null {
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/,"");
 if(!base||!path||!/^[0-9a-f-]{36}\/[0-9a-f-]{36}\.(png|jpg)$/.test(path))return null;
 return `${base}/storage/v1/object/public/avatars/${path}`;
}
