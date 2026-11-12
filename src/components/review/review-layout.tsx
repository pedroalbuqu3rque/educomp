import Link from "next/link";
import {materialStatusLabel,reportReasonLabel,reportStatusLabel,type ReviewStatus,type ReportStatus} from "@/lib/review/shared";

export function ReviewHeader({title,description}:{title:string;description:string}){
 return <header className="review-heading"><h1>{title}</h1><p>{description}</p></header>;
}
export function ReviewTabs({active}:{active:"materials"|"reports"}){
 return <nav className="review-tabs" aria-label="Seções de revisão">
  <Link aria-current={active==="materials"?"page":undefined} href="/revisao">Envios</Link>
  <Link aria-current={active==="reports"?"page":undefined} href="/revisao/denuncias">Denúncias</Link>
 </nav>;
}
export function ReviewSummary({items}:{items:{label:string;count:number;href:string;active:boolean}[]}){
 return <nav className="review-summary" aria-label="Filtrar por situação">
  {items.map(item=><Link href={item.href} aria-current={item.active?"true":undefined} key={item.label}>
   <span>{item.label}</span><strong>{item.count}</strong><span className="review-summary-arrow" aria-hidden="true">›</span>
  </Link>)}
 </nav>;
}
export function ReviewStatusBadge({status,published}:{status:ReviewStatus;published:boolean}){
 return <span className={`review-status-badge ${published?"published":status}`}>{materialStatusLabel(status,published)}</span>;
}
export function ReportStatusBadge({status}:{status:ReportStatus}){
 return <span className={`review-status-badge ${status}`}>{reportStatusLabel(status)}</span>;
}
export function ReviewPagination({page,pages,base,filter}:{page:number;pages:number;base:string;filter:string}){
 if(pages<=1)return null;
 const url=(value:number)=>`${base}?status=${encodeURIComponent(filter)}&page=${value}`;
 return <nav className="review-pagination" aria-label="Páginas da lista">
  {page>1?<Link href={url(page-1)}>Anterior</Link>:<span aria-disabled="true">Anterior</span>}
  <span>Página {page} de {pages}</span>
  {page<pages?<Link href={url(page+1)}>Próxima</Link>:<span aria-disabled="true">Próxima</span>}
 </nav>;
}
export function ReportReason({reason}:{reason:string}){
 return <span>{reportReasonLabel(reason)}</span>;
}
export function ReviewInfo({title,children}:{title:string;children:React.ReactNode}){
 return <aside className="review-info"><strong>{title}</strong><p>{children}</p></aside>;
}
