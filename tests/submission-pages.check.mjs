import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const transpile = (relative) => ts.transpileModule(readFileSync(new URL(relative, import.meta.url), 'utf8'), {
 compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const tagExports = {};
vm.runInNewContext(transpile('../src/lib/materials/taxonomy-tags.ts'), { exports: tagExports });
const id = '10000000-0000-4000-8000-000000000001';
function makeLoader(rows) {
 const calls = [];
 const client = { from(table) {
  const operations = [];
  const query = {};
  for (const method of ['select','eq','neq','order','range','in']) {
   query[method] = (...args) => { operations.push([method, ...args]); calls.push([table,method,...args]); return query; };
  }
  query.then = (resolve, reject) => {
   const isRevisions = operations.some(op => op[0]==='in' && op[1] === 'resubmission_of');
   const range = operations.find(op => op[0] === 'range');
   let result;
   if(table === 'review_events' || isRevisions) result = {data:[],error:null};
   else if(table==='materials') result = { data:range?.[1] === 0 ? rows : [], count:rows.length,error:null };
   else throw new Error(`Unexpected table ${table}`);
   return Promise.resolve(result).then(resolve,reject);
  };
  return query;
 } };
 const exports = {};
 vm.runInNewContext(transpile('../src/lib/materials/submissions.ts'), { exports, require(name) {
  if(name==='server-only') return {};
  if(name==='@/lib/supabase/server') return {createClient:async()=>client};
  if(name==='@/lib/materials/taxonomy-tags') return tagExports;
  return require(name);
 } });
 return {load: exports.loadSubmissions,calls};
}
test('Meus envios corrige paginação fora do intervalo sem mostrar falso estado vazio', async()=>{
 const material = {id,title:'Desafio dos algoritmos',created_at:'2026-11-12T00:00:00Z',review_status:'pending',is_published:false,resubmission_of:null,
  material_taxonomies:[{taxonomies:{category:'type',label:'Jogo'}}]};
 const api=makeLoader([material]);
 const data=await api.load(id, 1000);
 assert.equal(data.error,'');
 assert.equal(data.page,1);
 assert.equal(data.pages,1);
 assert.equal(data.total,1);
 assert.equal(data.items.length,1);
 assert.equal(data.items[0].type,'Jogo');
 assert.ok(api.calls.some(c=>c[0]==='materials'&&c[1]==='range'&&c[2]===9990));
 assert.ok(api.calls.some(c=>c[0]==='materials'&&c[1]==='range'&&c[2]===0));
});
test('Meus envios realmente vazio permanece vazio', async()=>{
 const api=makeLoader([]);
 const data=await api.load(id, 1000);
 assert.equal(data.error,'');
 assert.equal(data.page,1);
 assert.equal(data.pages,1);
 assert.equal(data.items.length,0);
});
