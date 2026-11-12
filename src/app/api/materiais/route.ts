import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fileInfo, isValidFileSignature, MAX_FILES, MAX_TOTAL_BYTES, resubmissionSchema, validateFiles } from "@/lib/materials/submission";

export const runtime = "nodejs";
const responseHeaders = { "Cache-Control": "private, no-store" };
function respond(status: number, error: string) { return NextResponse.json({ error }, { status, headers: responseHeaders }); }

export async function POST(request: NextRequest) {
 // Impede que outra origem use os cookies de sessão para iniciar um upload.
 if (request.headers.get("sec-fetch-site") === "cross-site") return respond(403, "Origem de solicitação não autorizada.");
 const origin = request.headers.get("origin");
 if (origin) {
  try {
   if (new URL(origin).origin !== new URL(request.url).origin) return respond(403, "Origem de solicitação não autorizada.");
  } catch { return respond(403, "Origem de solicitação inválida."); }
 }
 if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) return respond(415, "Envie os dados e os arquivos pelo formulário.");
 const length = Number(request.headers.get("content-length") ?? 0);
 if (length > MAX_TOTAL_BYTES + 200_000) return respond(413, "Os arquivos somados não podem ultrapassar 50 MB.");
 let client: Awaited<ReturnType<typeof createClient>>;
 try { client = await createClient(); }
 catch { return respond(503, "Não foi possível conectar ao EduComp. Tente novamente."); }
 const { data: session, error: authError } = await client.auth.getUser();
 if (authError || !session.user) return respond(401, "Sua sessão expirou. Entre novamente para enviar o material.");

 let body: FormData;
 try { body = await request.formData(); }
 catch { return respond(400, "Não foi possível ler o formulário. Confira os arquivos e tente novamente."); }
 const raw = body.get("payload");
 if (typeof raw !== "string") return respond(400, "Preencha os dados do material.");
 let input: unknown;
 try { input = JSON.parse(raw); }
 catch { return respond(400, "Os dados do formulário estão inválidos."); }
 const parsed = resubmissionSchema.safeParse(input);
 if (!parsed.success) return respond(422, parsed.error.issues[0].message);
 const values = parsed.data;
 if(values.resubmission_of){
  const {data:previous,error:previousError}=await client.from("materials")
   .select("id").eq("id",values.resubmission_of).eq("submitted_by",session.user.id)
   .in("review_status",["changes_requested","rejected"]).eq("is_published",false).maybeSingle();
  if(previousError||!previous)return respond(403,"Este envio não está disponível para ajustes ou não pertence à sua conta.");
  const {data:newer,error:newerError}=await client.from("materials")
   .select("id").eq("resubmission_of",values.resubmission_of).neq("review_status","draft").limit(1);
  if(newerError)return respond(503,"Não foi possível verificar as versões anteriores.");
  if(newer?.length)return respond(409,"Uma nova versão deste material já foi enviada. Consulte Meus envios.");
 }
 const incoming = body.getAll("files");
 if (incoming.some(file => !(file instanceof File))) return respond(422, "Selecione arquivos válidos.");
 const files = incoming as File[];
 try { validateFiles(files); }
 catch (error) { return respond(422, error instanceof Error ? error.message : "Confira seus arquivos."); }
 if (files.length > MAX_FILES) return respond(422, "Foram selecionados arquivos demais.");

 // Verificamos a assinatura de cada arquivo no servidor antes de gravar qualquer dado.
 for (const file of files) {
  const info = fileInfo(file);
  try {
   const bytes = new Uint8Array(await file.arrayBuffer());
   if (!isValidFileSignature(bytes, info.extension)) return respond(422, `O conteúdo de ${info.name} não corresponde ao formato informado.`);
  } catch { return respond(422, `Não foi possível validar o arquivo ${info.name}.`); }
 }

 const selected = [...values.types.map(label => ["type", label]), ...values.stages.map(label => ["stage", label]),
  ...values.grades.map(label => ["grade", label]), ...values.axes.map(label => ["axis", label])];
 const { data: taxonomies, error: lookupError } = await client.from("taxonomies").select("id,category,label");
 if (lookupError || !taxonomies) return respond(503, "Não foi possível carregar as classificações. Tente novamente.");
 const ids: number[] = [];
 for (const [category, label] of selected) {
  const item = taxonomies.find(row => row.category === category && row.label === label);
  if (!item) return respond(422, "Uma classificação ainda não está cadastrada no Supabase. Confira as migrations.");
  ids.push(item.id);
 }

 let draftId: string | null = null;
 const storedPaths: string[] = [];
 try {
  const { data: draft, error: insertError } = await client.from("materials").insert({
   submitted_by: session.user.id, title: values.title, description: values.description,
   keywords: values.keywords, authorship: values.authorship, objectives: values.objectives || null,
   approach: values.approach, rights_confirmed: true, review_status: "draft", is_published: false,
   resubmission_of: values.resubmission_of??null,
  }).select("id").single();
  if (insertError || !draft) throw new Error("draft");
  const createdId: string = draft.id;
  draftId = createdId;

  const { error: categoriesError } = await client.from("material_taxonomies").insert(
   ids.map(taxonomy_id => ({ material_id: createdId, taxonomy_id }))
  );
  if (categoriesError) throw new Error("classifications");

  const records: {material_id:string;object_path:string;original_name:string;mime_type:string;size_bytes:number}[] = [];
  for (const file of files) {
   const info = fileInfo(file);
   const path = `${session.user.id}/${draftId}/${randomUUID()}.${info.extension}`;
   const { error: uploadError } = await client.storage.from("materials").upload(path, file, {
    cacheControl: "3600", upsert: false, contentType: info.mime,
   });
   if (uploadError) throw new Error("storage");
   storedPaths.push(path);
   records.push({ material_id: createdId, object_path: path, original_name: info.name, mime_type: info.mime, size_bytes: file.size });
  }
  const { error: filesError } = await client.from("material_files").insert(records);
  if (filesError) throw new Error("files");
  const { error: finalizeError } = await client.rpc("submit_material", { p_id: draftId });
  if (finalizeError) throw new Error(finalizeError.code==="23505"?"duplicate":"finalize");
  return NextResponse.json({ id: draftId, status: "pending" }, { status: 201, headers: responseHeaders });
 } catch (caught) {
  // A publicação nunca é automática. Se uma etapa falhar, retiramos o que foi
  // gravado; um eventual rascunho remanescente não entra na fila editorial.
  if (storedPaths.length) await client.storage.from("materials").remove(storedPaths).catch(() => {});
  if (draftId) await client.from("materials").delete().eq("id", draftId).eq("review_status", "draft");
  if(caught instanceof Error && caught.message==="duplicate")return respond(409,"Já existe uma nova versão enviada para este material. Consulte Meus envios.");
  return respond(503, "Não foi possível concluir o envio. Seus dados continuam no formulário para tentar novamente. Confira se a migration 011 foi aplicada.");
 }
}
