import "server-only";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@/lib/auth/user";
import { createClient } from "@/lib/supabase/server";
import type { ReviewStatus, ReviewFilter, ReportStatus } from "@/lib/review/shared";
import {taxonomyTags} from "@/lib/materials/taxonomy-tags";

export async function requireReviewer(next: string = "/revisao") {
 const user = await currentUser();
 if (!user) redirect(`/entrar?next=${encodeURIComponent(next)}`);
 const client = await createClient();
 const { data, error } = await client.rpc("is_reviewer");
 if (error) throw new Error("Não foi possível verificar a permissão de revisão. Confira a migration 007.");
 if (!data) notFound();
 return client;
}
type Client = Awaited<ReturnType<typeof createClient>>;

export interface ReviewListItem {
 id:string; title:string; created_at:string; status:ReviewStatus; is_published:boolean; category:string; stage:string; grade:string;
}
function tagsFor(item: {material_taxonomies?: readonly {taxonomies: unknown}[]|null}) {
 const labels=taxonomyTags(item.material_taxonomies);
 const category=(key:string)=>labels.filter(item=>item.category===key).map(item=>item.label).join(" · ");
 return {category:category("type")||"Material",stage:category("stage")||"Etapa não informada",grade:category("grade"),axis:category("axis")};
}
export async function reviewQueue(client:Client,status:ReviewFilter,page:number) {
 const countFor=async(state:"pending"|"in_review"|"completed")=>{
  const query=client.from("materials").select("id",{count:"exact",head:true});
  const result=state==="completed" ? await query.in("review_status",["approved","rejected","changes_requested"]) : await query.eq("review_status",state);
  if(result.error) throw result.error;
  return result.count??0;
 };
 const [pending,inReview,completed]=await Promise.all([countFor("pending"),countFor("in_review"),countFor("completed")]);
 let query=client.from("materials")
  .select("id,title,created_at,review_status,is_published,material_taxonomies(taxonomies(category,label))",{count:"exact"})
  .neq("review_status","draft").order("created_at",{ascending:false}).order("id",{ascending:false});
 if(status==="completed") query=query.in("review_status",["approved","rejected","changes_requested"]);
 else if(status!=="all") query=query.eq("review_status",status);
 const {data,error,count}=await query.range((page-1)*10,(page-1)*10+9);
 if(error) throw error;
 return {pending,inReview,completed,total:count??0,pages:Math.max(1,Math.ceil((count??0)/10)),items:(data??[]).map((item):ReviewListItem=>({
  id:item.id,title:item.title,created_at:item.created_at,status:item.review_status as ReviewStatus,is_published:item.is_published,
  ...tagsFor(item),
 }))};
}
export interface ReviewFile {id:string;original_name:string;mime_type:string;size_bytes:number;}
export interface ReviewEvent {id:number;action:string;reason:string|null;created_at:string;reviewer:string;}
export async function reviewDetail(client:Client,id:string) {
 const {data,error}=await client.from("materials")
  .select("id,title,description,authorship,objectives,keywords,approach,rights_confirmed,submitted_by,resubmission_of,created_at,review_status,is_published,material_taxonomies(taxonomies(category,label)),material_files(id,original_name,mime_type,size_bytes)")
  .eq("id",id).neq("review_status","draft").maybeSingle();
 if(error) throw error;
 if(!data) notFound();
 const {data:profile,error:profileError}=await client.from("profiles").select("display_name").eq("id",data.submitted_by).maybeSingle();
 if(profileError) throw profileError;
 const {data:events,error:eventsError}=await client.from("review_events").select("id,action,reason,created_at,reviewer_id")
  .eq("material_id",id).order("created_at",{ascending:false}).limit(40);
 if(eventsError) throw eventsError;
 const ids=[...new Set((events??[]).map(event=>event.reviewer_id))];
 const {data:reviewers,error:namesError}=ids.length ? await client.from("profiles").select("id,display_name").in("id",ids) : {data:[],error:null};
 if(namesError) throw namesError;
 const names=new Map((reviewers??[]).map(item=>[item.id,item.display_name]));
 return {
  id:data.id,title:data.title,description:data.description,authorship:data.authorship,objectives:data.objectives??"",
  keywords:(Array.isArray(data.keywords) ? data.keywords : []).filter((word:unknown):word is string=>typeof word==="string"),approach:data.approach,rights_confirmed:data.rights_confirmed,created_at:data.created_at,
  status:data.review_status as ReviewStatus,is_published:data.is_published,submitted_by:data.submitted_by,resubmission_of:data.resubmission_of??null,
  submitter:profile?.display_name??"Perfil indisponível",files:(data.material_files??[]) as ReviewFile[],...tagsFor(data),
  events:(events??[]).map((event):ReviewEvent=>({id:event.id,action:event.action,reason:event.reason,created_at:event.created_at,reviewer:names.get(event.reviewer_id)??"Revisor autorizado"})),
 };
}

export interface ReportListItem {
 id:string;created_at:string;status:ReportStatus;outcome:string|null;reason:string;details:string;
 comment_id:string;comment_body:string;visibility:string;material_title:string;material_id:string;
}
export async function reportsQueue(client:Client,status:"all"|ReportStatus,page:number) {
 const countFor=async(value:ReportStatus)=>{
  const result=await client.from("comment_reports").select("id",{head:true,count:"exact"}).eq("status",value);
  if(result.error) throw result.error;
  return result.count??0;
 };
 const counts=await Promise.all([countFor("pending"),countFor("in_review"),countFor("resolved")]);
 let query=client.from("comment_reports").select("id,created_at,status,outcome,reason,details,comment_id",{count:"exact"})
  .order("created_at",{ascending:false}).order("id",{ascending:false});
 if(status!=="all")query=query.eq("status",status);
 const {data,error,count}=await query.range((page-1)*10,(page-1)*10+9);
 if(error) throw error;
 const items=await hydrateReports(client,data??[]);
 return {pending:counts[0],inReview:counts[1],completed:counts[2],total:count??0,pages:Math.max(1,Math.ceil((count??0)/10)),items};
}
async function hydrateReports(client:Client, rows:{id:string;created_at:string;status:string;outcome:string|null;reason:string;details:string;comment_id:string}[]):Promise<ReportListItem[]> {
 const commentIds=[...new Set(rows.map(item=>item.comment_id))];
 if(!commentIds.length)return [];
 const {data:comments,error:commentsError}=await client.from("discussion_comments").select("id,body,visibility,material_id")
  .in("id",commentIds);
 if(commentsError) throw commentsError;
 const materialsIds=[...new Set((comments??[]).map(item=>item.material_id))];
 const {data:materials,error:materialsError}=materialsIds.length ? await client.from("materials").select("id,title").in("id",materialsIds):{data:[],error:null};
 if(materialsError)throw materialsError;
 const commentsById=new Map((comments??[]).map(item=>[item.id,item]));
 const materialsById=new Map((materials??[]).map(item=>[item.id,item.title]));
 return rows.map(item=>{
  const comment=commentsById.get(item.comment_id);
  return {id:item.id,created_at:item.created_at,status:item.status as ReportStatus,outcome:item.outcome,reason:item.reason,
   details:item.details,comment_id:item.comment_id,comment_body:comment?.body??"Conteúdo indisponível",visibility:comment?.visibility??"deleted",
   material_title:materialsById.get(comment?.material_id??"")??"Material indisponível",material_id:comment?.material_id??""};
 });
}
export async function reportDetail(client:Client,id:string) {
 const {data,error}=await client.from("comment_reports").select("id,created_at,status,outcome,reason,details,comment_id,reporter_id,resolved_at")
  .eq("id",id).maybeSingle();
 if(error) throw error;
 if(!data) notFound();
 const [item]=await hydrateReports(client,[data]);
 if(!item)notFound();
 const {data:events,error:historyError}=await client.from("moderation_events")
  .select("id,action,reason,created_at,reviewer_id").eq("report_id",id).order("created_at",{ascending:false});
 if(historyError)throw historyError;
 const ids=[...new Set((events??[]).map(event=>event.reviewer_id))];
 const {data:reviewers,error:namesError}=ids.length ? await client.from("profiles").select("id,display_name").in("id",ids) : {data:[],error:null};
 if(namesError)throw namesError;
 const names=new Map((reviewers??[]).map(row=>[row.id,row.display_name]));
 return {...item,events:(events??[]).map(event=>({
  id:event.id,action:event.action,reason:event.reason,created_at:event.created_at,reviewer:names.get(event.reviewer_id)??"Revisor autorizado",
 }))};
}
