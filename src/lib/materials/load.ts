import "server-only";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// PostgREST pode serializar a taxonomia associada como objeto ou lista.
const taxonomyLabel = z.object({ category: z.string(), label: z.string() });
const taxonomy = z.object({ taxonomies: z.union([taxonomyLabel, z.array(taxonomyLabel)]).nullable() });
const materialSchema = z.object({
 id: z.uuid(), submitted_by: z.uuid(), title: z.string(), description: z.string(),
 authorship: z.string(), objectives: z.string().nullable(), keywords: z.array(z.string()),
 approach: z.enum(["plugged", "unplugged", "both"]),
 material_taxonomies: z.array(taxonomy),
});
const profileSchema = z.object({ id: z.uuid(), display_name: z.string(), occupation: z.string(), bio: z.string(), avatar_path:z.string().nullable().optional() });
export type PublicProfile = z.infer<typeof profileSchema>;
export type MaterialDetail = z.infer<typeof materialSchema>;
export const materialColumns = "id,submitted_by,title,description,authorship,objectives,keywords,approach,material_taxonomies(taxonomies(category,label))";
export function labels(material: MaterialDetail, category: string) {
 return material.material_taxonomies.flatMap(item => {
  const rows = Array.isArray(item.taxonomies) ? item.taxonomies : item.taxonomies ? [item.taxonomies] : [];
  return rows.filter(row => row.category === category).map(row => row.label);
 });
}
export type DetailData = {
 material: MaterialDetail | null; profile?: PublicProfile | null; signedIn: boolean; saved: boolean;
 files: { id: string; original_name: string; size_bytes: number }[];
 error?: string; filesError?: boolean; savedError?: boolean;
};
export async function loadMaterial(id: string): Promise<DetailData> {
 const empty: DetailData = { material: null, signedIn: false, saved: false, files: [] };
 if (!z.uuid().safeParse(id).success) return empty;
 try {
  const client = await createClient();
  const { data, error } = await client.from("materials").select(materialColumns).eq("id", id).eq("is_published", true).eq("review_status", "approved").maybeSingle();
  if (error) throw error;
  if (!data) return empty;
  const material = materialSchema.parse(data);
  const [{ data: session }, profileResult] = await Promise.all([
   client.auth.getUser(),
   client.from("profiles").select("id,display_name,occupation,bio,avatar_path").eq("id", material.submitted_by).maybeSingle(),
  ]);
  const parsedProfile = profileSchema.safeParse(profileResult.data);
  const result: DetailData = { ...empty, material, profile: parsedProfile.success ? parsedProfile.data : null, signedIn: Boolean(session.user) };
  if (!session.user) return result;
  const [saved, files] = await Promise.all([
   client.from("saved_materials").select("material_id").eq("user_id", session.user.id).eq("material_id", id).maybeSingle(),
   client.from("material_files").select("id,original_name,size_bytes").eq("material_id", id).order("created_at"),
  ]);
  return { ...result, saved: Boolean(saved.data), savedError: Boolean(saved.error), filesError: Boolean(files.error), files: files.data ?? [] };
 } catch {
  return { ...empty, error: "Não foi possível carregar este material. Tente novamente em alguns instantes." };
 }
}
export async function loadPublicProfile(id: string, page: number) {
 if (!z.uuid().safeParse(id).success) return { profile: null, materials: [], total: 0 };
 try {
  const client = await createClient();
  const result = await client.from("profiles").select("id,display_name,occupation,bio,avatar_path").eq("id", id).maybeSingle();
  if (result.error) throw result.error;
  if (!result.data) return { profile: null, materials: [], total: 0 };
  const profile = profileSchema.parse(result.data);
  const materials = await client.from("materials").select(materialColumns, { count: "exact" }).eq("submitted_by", id).eq("is_published", true).eq("review_status", "approved").order("created_at", { ascending: false }).order("id", { ascending: false }).range((page - 1) * 12, page * 12 - 1);
  if (materials.error) return { profile, materials: [], total: 0, error: "Não foi possível carregar os materiais deste professor. Tente novamente." };
  return { profile, materials: z.array(materialSchema).parse(materials.data), total: materials.count ?? 0 };
 } catch {
  return { profile: null, materials: [], total: 0, error: "Não foi possível carregar este perfil. Tente novamente em alguns instantes." };
 }
}
