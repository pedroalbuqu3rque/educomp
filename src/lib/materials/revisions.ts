import "server-only";
import {z} from "zod";
import {createClient} from "@/lib/supabase/server";
import {taxonomyTags} from "@/lib/materials/taxonomy-tags";
import type {RevisionSource} from "@/lib/materials/revision-shared";

export async function loadRevisionSource(userId:string,id:string):Promise<RevisionSource|null> {
 if(!z.uuid().safeParse(id).success)return null;
 const client=await createClient();
 const {data,error}=await client.from("materials")
  .select("id,title,description,keywords,authorship,objectives,approach,review_status,submitted_by,is_published,material_taxonomies(taxonomies(category,label)),material_files(original_name)")
  .eq("id",id).eq("submitted_by",userId).in("review_status",["changes_requested","rejected"])
  .eq("is_published",false).maybeSingle();
 if(error||!data)return null;
 // Uma versão já submetida não pode ser reenviada novamente a partir da mesma origem.
 const {data:later,error:laterError}=await client.from("materials").select("id").eq("resubmission_of",id).neq("review_status","draft").limit(1);
 if(laterError||later?.length)return null;
 const {data:events,error:reasonError}=await client.from("review_events")
  .select("action,reason").eq("material_id",id).in("action",["reject","request_changes"])
  .order("created_at",{ascending:false}).limit(1);
 if(reasonError)return null;
 const tags=taxonomyTags(data.material_taxonomies);
 const labels=(category:string)=>tags.filter(tag=>tag.category===category).map(tag=>tag.label);
 return {id:data.id,title:data.title,description:data.description,keywords:data.keywords??[],authorship:data.authorship,
  objectives:data.objectives??"",approach:data.approach,types:labels("type"),stages:labels("stage"),
  grades:labels("grade"),axes:labels("axis"),status:data.review_status as RevisionSource["status"],
  reason:events?.[0]?.reason??null,fileNames:(data.material_files??[]).map(file=>file.original_name)};
}
