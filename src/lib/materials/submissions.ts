import "server-only";
import { createClient } from "@/lib/supabase/server";
import { taxonomyTags } from "@/lib/materials/taxonomy-tags";

import type { SentMaterial } from "@/lib/materials/submission-status";

export async function loadSubmissions(userId: string, page: number) {
 try {
  const client = await createClient();
  const offset = (page - 1) * 10;
  const { data, error, count } = await client.from("materials")
   .select("id,title,created_at,review_status,is_published,resubmission_of,material_taxonomies(taxonomies(category,label))", {count:"exact"})
   .eq("submitted_by", userId).neq("review_status", "draft")
   .order("created_at", {ascending:false}).order("id", {ascending:false}).range(offset, offset + 9);
  if (error) throw error;
  const total = count ?? 0;
  const pages = Math.max(1, Math.ceil(total / 10));
  const selectedPage = Math.min(page, pages);
  let materials = data ?? [];
  // URLs antigas ou alteradas manualmente não devem exibir um falso estado vazio.
  if (selectedPage !== page) {
   const corrected = await client.from("materials")
    .select("id,title,created_at,review_status,is_published,resubmission_of,material_taxonomies(taxonomies(category,label))")
    .eq("submitted_by", userId).neq("review_status", "draft")
    .order("created_at", {ascending:false}).order("id", {ascending:false})
    .range((selectedPage - 1) * 10, selectedPage * 10 - 1);
   if (corrected.error) throw corrected.error;
   materials = corrected.data ?? [];
  }
  const ids = materials.map(m => m.id);
  const revisions = ids.length ? await client.from("materials").select("id,resubmission_of").in("resubmission_of",ids).neq("review_status","draft") : {data:[],error:null};
  if(revisions.error)throw revisions.error;
  const childByOrigin = new Map((revisions.data??[]).filter(row=>row.resubmission_of).map(row=>[row.resubmission_of!,row.id]));
  const events = ids.length ? await client.from("review_events").select("material_id,reason,created_at")
   .in("action",["reject","request_changes"]).in("material_id", ids).order("created_at", {ascending:false}) : {data:[],error:null};
  if (events.error) throw events.error;
  const reasonById = new Map<string,string>();
  for (const event of events.data ?? []) if (!reasonById.has(event.material_id) && event.reason) reasonById.set(event.material_id,event.reason);
  const items: SentMaterial[] = materials.map(item => {
   const tags = taxonomyTags(item.material_taxonomies);
   return {id:item.id,title:item.title,created_at:item.created_at,
    review_status: item.review_status as SentMaterial["review_status"],is_published:item.is_published,
    type:tags.find(tag=>tag.category==="type")?.label ?? "Material",
    grade:tags.filter(tag=>tag.category==="grade").map(tag=>tag.label).join(" · "),
    reason:reasonById.get(item.id) ?? null, resubmission_of:item.resubmission_of??null, revision_id:childByOrigin.get(item.id)??null};
  });
  return {items,total,pages,page:selectedPage,error:""};
 } catch { return {items:[] as SentMaterial[],total:0,pages:1,page:1,error:"Não foi possível consultar seus envios. Atualize a página e tente novamente."}; }
}
