import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { CommunityComment, CommunityFilter, CommunityPageData } from "./types";

const size = 10;
type Raw = {
 id:string; author_id:string; parent_id:string|null;
 kind:"discussion"|"application_report"; body:string;
 report_grade:string|null; report_adaptations:string|null;
 created_at:string; updated_at:string;
};

export async function loadCommunity(materialId:string,filter:CommunityFilter,page:number,source:"material"|"catalog"="material"):Promise<CommunityPageData> {
 const empty:CommunityPageData={items:[],total:0,page,pages:1,viewerId:null};
 try {
  const client=await createClient();
  const {data:auth}=await client.auth.getUser();
  const viewerId=auth.user?.id??null;
  let query=client.from("discussion_comments")
   .select("id,author_id,parent_id,kind,body,report_grade,report_adaptations,created_at,updated_at",{count:"exact"})
   .eq(source==="catalog"?"catalog_example_id":"material_id",materialId).is("parent_id",null).eq("visibility","visible")
   .order("created_at",{ascending:false}).order("id",{ascending:false});
  if(filter!=="all") query=query.eq("kind",filter);
  const {data:roots,error,count}=await query.range((page-1)*size,page*size-1);
  if(error) {
   if(source==="catalog" && (error.code==="42703" || error.message.includes("catalog_example_id"))) {
    return {...empty,viewerId,error:"A Comunidade do acervo precisa da migration 014 no Supabase."};
   }
   throw error;
  }
  const actualPages=Math.max(1,Math.ceil((count??0)/size));
  if(page>actualPages)return loadCommunity(materialId,filter,actualPages,source);
  const rootRows=(roots??[]) as Raw[];
  const rootIds=rootRows.map(post=>post.id);
  const replyResponse=rootIds.length ? await client.from("discussion_comments")
   .select("id,author_id,parent_id,kind,body,report_grade,report_adaptations,created_at,updated_at")
   .in("parent_id",rootIds).eq("visibility","visible")
   .order("created_at",{ascending:true}).order("id",{ascending:true}).limit(500)
   : {data:[],error:null};
  if(replyResponse.error)throw replyResponse.error;
  const replies=(replyResponse.data??[]) as Raw[];
  const authorIds=[...new Set([...rootRows,...replies].map(comment=>comment.author_id))];
  const profiles=authorIds.length ? await client.from("profiles").select("id,display_name,occupation,avatar_path").in("id",authorIds) : {data:[],error:null};
  if(profiles.error)throw profiles.error;
  const authors=new Map((profiles.data??[]).map(profile=>[profile.id,profile]));
  const hydrate=(raw:Raw):CommunityComment=>({
   id:raw.id,authorId:raw.author_id,parentId:raw.parent_id,kind:raw.kind,body:raw.body,
   grade:raw.report_grade,adaptations:raw.report_adaptations,createdAt:raw.created_at,
   updatedAt:raw.updated_at,authorName:authors.get(raw.author_id)?.display_name??"Professor(a)",
   authorOccupation:authors.get(raw.author_id)?.occupation??"",authorAvatar:authors.get(raw.author_id)?.avatar_path??null,replies:[],
  });
  const byId=new Map(rootRows.map(row=>[row.id,hydrate(row)]));
  for(const reply of replies){const root=byId.get(reply.parent_id??"");if(root)root.replies.push(hydrate(reply));}
  return {items:[...byId.values()],total:count??0,page,pages:actualPages,viewerId,
   ...(replies.length===500 ? {error:"Há muitas respostas nesta página. Parte das respostas mais recentes não está sendo exibida."} : {})};
 } catch {
  return {...empty,error:"Não foi possível carregar as contribuições. Verifique a configuração da Comunidade no Supabase."};
 }
}
