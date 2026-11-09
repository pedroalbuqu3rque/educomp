"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { filters, filterKeys, parseQuery, serializeQuery, emptySelections, applyCategory, type FilterKey, type Query, type Material } from "@/lib/library/catalog";
import type { LibraryData } from "@/lib/library/load";
import { setMaterialSaved } from "@/lib/library/saved-actions";
import { Modal } from "./dialog";
function Asset({name, className=""}: {name:string;className?:string}) { return <img src={`/library/${name}`} alt="" className={className} />; }
function Approaches({values}: {values:string[]}) { return <span className="approach-icons">{values.map(v=><span key={v} role="img" aria-label={v} title={v}><Asset name={v==="Plugada"?"plugged.png":"unplugged.png"} /></span>)}</span>; }
function FilterDialog({ category, initial, onApply, onDismiss }: {category:FilterKey;initial:string[];onApply:(v:string[])=>void;onDismiss:()=>void}) {
 const [draft,setDraft]=useState(initial);
 const config=filters[category];
 return <Modal titleId="filter-title" onDismiss={onDismiss} className="filter-dialog"><h2 id="filter-title">{config.title}</h2><p>Selecione uma ou mais opções.</p>
 <fieldset><legend className="sr-only">{config.title}</legend>{config.options.map(option=><label key={option}><input type="checkbox" checked={draft.includes(option)} onChange={e=>setDraft(e.target.checked?[...draft,option]:draft.filter(v=>v!==option))}/><span>{option}</span></label>)}</fieldset>
 <div className="filter-dialog-actions"><button className="text-action" onClick={()=>setDraft([])} type="button">Limpar</button><button type="button" className="button button-primary" onClick={()=>onApply(draft)}>Aplicar</button></div></Modal>;
}
function SearchInput({q}: {q:string}) { return <label className="library-search"><span className="sr-only">Buscar por título ou tema</span><Asset name="search.svg"/><input name="q" defaultValue={q} maxLength={200} placeholder="Buscar por título ou tema..." type="search" /></label>; }
export function LibraryBrowser({data,savedOnly=false}:{data:LibraryData;savedOnly?:boolean}) {
 const params=useSearchParams();
 const router=useRouter();
 const [pending,startTransition]=useTransition();
 const query=parseQuery(new URLSearchParams(params.toString()));
 const result=data.result;
 const [category,setCategory]=useState<FilterKey|null>(null);
 const [preview,setPreview]=useState<Material|null>(null);
 const [saveMaterial,setSaveMaterial]=useState<Material|null>(null);
 const [notice,setNotice]=useState("");
 const [saveError,setSaveError]=useState("");
 const basePath=savedOnly?"/salvos":"/biblioteca";
 async function save(material:Material) {
  if(!data.signedIn){setSaveMaterial(material);return;}
  setNotice("");setSaveError("");
  startTransition(async()=>{
   try {
    const response=await setMaterialSaved(material.id,!material.saved);
    if(response.requiresLogin){setSaveMaterial(material);return;}
    if(response.error){setSaveError(response.error);return;}
    setNotice(response.saved?`“${material.title}” foi salvo.`:`“${material.title}” foi removido dos salvos.`);
    router.refresh();
    if(savedOnly && !response.saved) document.getElementById("materials-title")?.focus({preventScroll:true});
   } catch {setSaveError("Não foi possível atualizar seus salvos. Tente novamente.");}
  });
 }
 const hasFilters=filterKeys.some(key=>query.selections[key].length);
 function navigate(next:Query) { const search=serializeQuery(next);startTransition(()=>router.push(`${basePath}${search?`?${search}`:""}`,{scroll:false})); }
 function search(event:FormEvent<HTMLFormElement>) { event.preventDefault();navigate({...query,q:String(new FormData(event.currentTarget).get("q")??""),page:1}); }
 function goToPage(page:number) { navigate({...query,page});document.getElementById("materials-title")?.focus({preventScroll:true}); }
 return <>
  {data.error && <div className="demo-notice" role="alert"><p>{data.error}</p><button className="text-action" type="button" onClick={()=>startTransition(()=>router.refresh())}>Tentar novamente</button></div>}
  {data.savedError && <p role="alert" className="demo-notice">Não foi possível carregar seus favoritos. Atualize a página para tentar novamente.</p>}
  <p className="saved-feedback" role="status">{notice}</p>
  {saveError && <p role="alert" className="demo-notice">{saveError}</p>}
  <form className="library-toolbar" role="search" onSubmit={search}>
   <SearchInput key={query.q} q={query.q}/>
   <div className="library-filters">{filterKeys.map(key=><button type="button" className={`filter-trigger ${query.selections[key].length?"is-active":""}`} key={key} onClick={()=>setCategory(key)} aria-haspopup="dialog" aria-expanded={category===key} aria-label={`${filters[key].title}${query.selections[key].length?`, ${query.selections[key].length} selecionados`:""}`}><Asset name={filters[key].icon} className="filter-icon"/>{filters[key].label}{query.selections[key].length>0&&<span className="filter-count">{query.selections[key].length}</span>}<Asset name="chevron.svg"/></button>)}</div>
   <button type="submit" className="button button-primary search-submit" disabled={pending}>Buscar</button>
  </form>
  {hasFilters&&<div className="active-filters" aria-label="Filtros aplicados">{filterKeys.flatMap(key=>query.selections[key].map(value=><button key={key+value} type="button" onClick={()=>navigate(applyCategory(query,key,query.selections[key].filter(v=>v!==value)))} aria-label={`Remover filtro ${value}`}>{value}<span aria-hidden="true"> ×</span></button>))}<button className="text-action" type="button" onClick={()=>navigate({...query,selections:emptySelections(),page:1})}>Limpar filtros</button></div>}
  <section className="library-results" aria-labelledby="materials-title" aria-busy={pending}>
   <h2 id="materials-title" tabIndex={-1}>{savedOnly ? "Sua coleção" : "Explore os materiais"}</h2><p className="library-results-description">Confira recursos organizados por tema, etapa e tipo de material.</p>
   <p className="sr-only" role="status">{pending?"Atualizando resultados":`${result.total} materiais encontrados. Página ${result.page} de ${result.pages}.`}</p>
   {data.error ? null : result.total>0?<div className="materials-grid">{result.items.map(material=><article key={material.id} className="library-card">
    <div className="library-card-top"><span>{material.type.join(" · ")}</span><button type="button" onClick={()=>save(material)} disabled={pending||data.savedError} className="save-material" aria-pressed={Boolean(material.saved)} aria-label={`${material.saved?"Remover dos salvos:":"Salvar"} ${material.title}`} title={material.saved?"Remover dos salvos":"Salvar material"}><Asset name="save.png"/>{material.saved&&<span className="saved-check" aria-hidden="true">✓</span>}</button></div>
    <h3><button type="button" className="material-open" onClick={()=>setPreview(material)}>{material.title}</button></h3><p>{material.description}</p>
    <div className="library-card-bottom"><span>{material.year}</span><span className="metadata-divider"/><Approaches values={material.approach}/><Asset name="arrow.png" className="card-arrow"/></div>
   </article>)}</div>:<div className="library-empty"><div className="empty-symbol"><Asset name="empty-search.svg"/></div><h3>{!query.q && !hasFilters ? (savedOnly ? "Você ainda não tem materiais salvos" : "A biblioteca está começando") : "Nenhum material encontrado"}</h3><p>{!query.q && !hasFilters ? (savedOnly ? "Salve materiais na biblioteca para encontrá-los aqui. Materiais retirados de publicação não aparecem na coleção." : "Ainda não há materiais publicados. Volte em breve para consultar o acervo.") : <>{query.q?`Não há resultados para “${query.q}”. `:"Não há resultados para os filtros selecionados. "}Experimente termos mais amplos ou ajuste os filtros selecionados.</>}</p><div>{savedOnly&&<Link href="/biblioteca" className="button button-primary">Explorar biblioteca</Link>}<button type="button" className="button button-outline" onClick={()=>navigate({...query,selections:emptySelections(),page:1})}>Limpar filtros</button><button type="button" className="button button-primary" onClick={()=>navigate({q:"",selections:emptySelections(),page:1})}>{savedOnly?"Ver todos os salvos":"Ver todos os materiais"}</button></div></div>}
  </section>
  {result.total>0&&<div className="library-list-footer"><p>Mostrando {result.items.length} de {result.total} materiais</p><div className="approach-legend"><span><Approaches values={["Plugada"]}/>Plugada</span><span><Approaches values={["Desplugada"]}/>Desplugada</span></div>
  {result.pages>1&&<nav aria-label="Paginação" className="library-pagination"><button type="button" aria-label="Página anterior" disabled={pending||result.page===1} onClick={()=>goToPage(result.page-1)}><Asset name="page.svg"/><span>‹</span></button>{Array.from(new Set([1,...Array.from({length:5},(_,i)=>result.page-2+i).filter(p=>p>1&&p<result.pages),result.pages])).map(page=><button key={page} type="button" disabled={pending} aria-label={`Página ${page}`} aria-current={result.page===page?"page":undefined} onClick={()=>goToPage(page)}><Asset name={page===result.page?"page-active.svg":page===2?"page-two.svg":"page.svg"}/><span>{page}</span></button>)}<button type="button" aria-label="Próxima página" disabled={pending||result.page===result.pages} onClick={()=>goToPage(result.page+1)}><Asset name="page.svg"/><span>›</span></button></nav>}</div>}
  {category&&<FilterDialog category={category} initial={query.selections[category]} onDismiss={()=>setCategory(null)} onApply={values=>{navigate(applyCategory(query,category,values));setCategory(null);}}/>}
  {preview&&<Modal titleId="preview-title" onDismiss={()=>setPreview(null)} className="preview-dialog"><p className="eyebrow">MATERIAL PEDAGÓGICO</p><h2 id="preview-title">{preview.title}</h2><p>{preview.description}</p><dl><dt>Tipo</dt><dd>{preview.type.join(", ")}</dd><dt>Etapa</dt><dd>{preview.stage.join(", ")} · {preview.year}</dd><dt>Eixo</dt><dd>{preview.axis.join(", ")}</dd><dt>Abordagem</dt><dd>{preview.approach.join(" e ")}</dd></dl><dl><dt>Autoria</dt><dd>{preview.authorship}</dd>{preview.objectives && <><dt>Objetivos de aprendizagem</dt><dd>{preview.objectives}</dd></>}</dl>
   {data.signedIn ? <section aria-label="Arquivos do material"><h3>Arquivos</h3>{data.filesError ? <p role="alert">Não foi possível carregar os arquivos. Feche esta janela e atualize a página para tentar novamente.</p> : preview.files?.length ? <ul>{preview.files.map(file=><li key={file.id}><a href={`/materiais/${preview.id}/arquivos/${file.id}`}>{file.name} — Baixar ({(file.size/1024/1024).toLocaleString("pt-BR",{maximumFractionDigits:1})} MB)</a></li>)}</ul> : <p>Nenhum arquivo disponível para download.</p>}</section> : <p className="preview-note"><Link href="/entrar?next=/biblioteca">Entre na sua conta</Link> para baixar os arquivos deste material.</p>}<button type="button" className="button button-outline" onClick={()=>setPreview(null)}>Voltar à Biblioteca</button></Modal>}
  {saveMaterial&&<Modal titleId="save-title" onDismiss={()=>setSaveMaterial(null)} className="preview-dialog"><h2 id="save-title">Entre para salvar materiais</h2><p>Entre na sua conta para salvar “{saveMaterial.title}” na sua coleção.</p><Link href={`/entrar?next=${basePath}`} className="button button-primary">Entrar</Link><button className="text-action" type="button" onClick={()=>setSaveMaterial(null)}>Voltar à Biblioteca</button></Modal>}
 </>;
}
