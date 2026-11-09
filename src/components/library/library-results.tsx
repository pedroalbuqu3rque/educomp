import { loadLibrary } from "@/lib/library/load";
import { parseQuery } from "@/lib/library/catalog";
import { LibraryBrowser } from "./library-browser";
export async function LibraryResults({params,savedOnly=false}:{params:Promise<Record<string,string|string[]|undefined>>;savedOnly?:boolean}) {
 const values=await params;const search=new URLSearchParams();
 for(const [key,value] of Object.entries(values)) for(const item of Array.isArray(value)?value:value?[value]:[]) search.append(key,item);
 const data=await loadLibrary(parseQuery(search),savedOnly);
 return <LibraryBrowser data={data} savedOnly={savedOnly}/>;
}
