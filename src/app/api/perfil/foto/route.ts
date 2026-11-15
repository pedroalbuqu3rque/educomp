import { isSameOrigin, readFormData, RequestBodyError } from "@/lib/http/request";
import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  avatarType,
  isAvatarSignature,
  MAX_AVATAR_BYTES,
  publicAvatarUrl,
} from "@/lib/profile/avatar";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
function error(status: number, message: string) {
  return NextResponse.json({ error: message }, { status, headers });
}
function refresh(id: string) {
  revalidatePath("/conta");
  revalidatePath(`/perfis/${id}`);
  revalidatePath("/biblioteca");
}

async function uploadPhoto(request: NextRequest) {
  if (!isSameOrigin(request)) return error(403, "Origem de solicitação não autorizada.");
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data"))
    return error(415, "Selecione uma imagem JPG ou PNG.");
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_AVATAR_BYTES + 100_000) return error(413, "A foto deve ter até 5 MB.");
  const client = await createClient();
  const { data: auth, error: authError } = await client.auth.getUser();
  if (authError || !auth.user) return error(401, "Sua sessão expirou. Entre novamente.");
  const user = auth.user;
  let file: File;
  try {
    const body = await readFormData(request, MAX_AVATAR_BYTES + 100_000);
    const files = body.getAll("file");
    if (files.length !== 1 || !(files[0] instanceof File))
      return error(422, "Selecione uma imagem válida.");
    file = files[0];
  } catch (cause) {
    return error(
      cause instanceof RequestBodyError ? cause.status : 400,
      "Não foi possível ler a imagem. Confira o limite de 5 MB.",
    );
  }
  let extension: "png" | "jpg";
  try {
    extension = avatarType(file).extension;
  } catch (e) {
    return error(422, e instanceof Error ? e.message : "Formato de imagem inválido.");
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!isAvatarSignature(bytes, file.type))
    return error(422, "O arquivo não corresponde ao formato de imagem informado.");
  const { data: profile, error: readError } = await client
    .from("profiles")
    .select("avatar_path")
    .eq("id", user.id)
    .maybeSingle();
  if (readError || !profile)
    return error(503, "Não foi possível carregar a foto atual. Tente novamente.");
  const path = `${user.id}/${randomUUID()}.${extension}`;
  const { error: uploadError } = await client.storage
    .from("avatars")
    .upload(path, bytes, { upsert: false, contentType: file.type, cacheControl: "31536000" });
  if (uploadError)
    return error(503, "Não foi possível enviar a imagem. Tente novamente mais tarde.");
  const { data: updated, error: saveError } = await client
    .from("profiles")
    .update({ avatar_path: path })
    .eq("id", user.id)
    .select("avatar_path")
    .maybeSingle();
  if (saveError || updated?.avatar_path !== path) {
    await client.storage.from("avatars").remove([path]);
    return error(503, "Não foi possível salvar sua foto. Tente novamente.");
  }
  if (profile.avatar_path) await client.storage.from("avatars").remove([profile.avatar_path]);
  refresh(user.id);
  return NextResponse.json({ url: publicAvatarUrl(path), path }, { status: 200, headers });
}
async function deletePhoto(request: NextRequest) {
  if (!isSameOrigin(request)) return error(403, "Origem de solicitação não autorizada.");
  const client = await createClient();
  const { data: auth, error: authError } = await client.auth.getUser();
  if (authError || !auth.user) return error(401, "Sua sessão expirou. Entre novamente.");
  const { data: profile, error: readError } = await client
    .from("profiles")
    .select("avatar_path")
    .eq("id", auth.user.id)
    .maybeSingle();
  if (readError || !profile) return error(503, "Não foi possível consultar seu perfil.");

  if (profile.avatar_path) {
    const { error: storageError } = await client.storage
      .from("avatars")
      .remove([profile.avatar_path]);
    if (storageError) return error(503, "Não foi possível excluir a foto. Tente novamente.");
  }
  const { error: updateError } = await client
    .from("profiles")
    .update({ avatar_path: null })
    .eq("id", auth.user.id);
  if (updateError)
    return error(
      503,
      "A foto foi excluída, mas não foi possível atualizar seu perfil. Tente novamente.",
    );
  refresh(auth.user.id);
  return NextResponse.json({ ok: true }, { headers });
}

export async function POST(request: NextRequest) {
  try {
    return await uploadPhoto(request);
  } catch {
    return error(503, "Não foi possível atualizar a foto. Tente novamente.");
  }
}
export async function DELETE(request: NextRequest) {
  try {
    return await deletePhoto(request);
  } catch {
    return error(503, "Não foi possível excluir a foto. Tente novamente.");
  }
}
