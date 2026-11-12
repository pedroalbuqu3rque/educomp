import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const source = ts.transpileModule(readFileSync(new URL('../src/lib/materials/load.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const id = '10000000-0000-4000-8000-000000000001';
const owner = '10000000-0000-4000-8000-000000000002';
const material = { id, submitted_by: owner, title: 'Algoritmos', description: 'Descrição', authorship: 'Fonte', objectives: null, keywords: ['algoritmos'], approach: 'unplugged', material_taxonomies: [{ taxonomies: { category: 'type', label: 'Jogo' } }] };
const profile = { id: owner, display_name: 'Professor', occupation: '', bio: '' };
function setup(results = {}, user = null) {
 const calls = [];
 const client = { auth: { getUser: async () => ({ data: { user } }) }, from(table) {
  calls.push([table, 'from']);
  const query = {};
  for (const method of ['select', 'eq', 'order', 'range', 'maybeSingle']) query[method] = (...args) => { calls.push([table, method, ...args]); return query; };
  query.then = (resolve, reject) => Promise.resolve(results[table] ?? { data: null, error: null }).then(resolve, reject);
  return query;
 } };
 const exports = {};
 vm.runInNewContext(source, { exports, require: name => name === 'server-only' ? {} : name === '@/lib/supabase/server' ? { createClient: async () => client } : require(name) });
 return { ...exports, calls };
}
test('invalid material id avoids database calls', async () => {
 const api = setup(); assert.equal((await api.loadMaterial('invalid')).material, null); assert.equal(api.calls.length, 0);
});
test('public material lookup explicitly requires approval and publication', async () => {
 const api = setup({ materials: { data: material }, profiles: { data: profile } });
 const data = await api.loadMaterial(id);
 assert.equal(data.material.title, 'Algoritmos');
 assert.ok(api.calls.some(c => c[0] === 'materials' && c[1] === 'eq' && c[2] === 'is_published' && c[3] === true));
 assert.ok(api.calls.some(c => c[0] === 'materials' && c[1] === 'eq' && c[2] === 'review_status' && c[3] === 'approved'));
 assert.ok(!api.calls.some(c => ['material_files', 'saved_materials'].includes(c[0])));
});
test('missing material is distinct from service error', async () => {
 const missing = await setup().loadMaterial(id); assert.equal(missing.material, null); assert.equal(missing.error, undefined);
 const failed = await setup({ materials: { error: { message: 'offline' } } }).loadMaterial(id); assert.ok(failed.error);
});
test('signed-in file failures retain readable material and flag error', async () => {
 const api = setup({ materials: { data: material }, profiles: { data: profile }, material_files: { error: { message: 'offline' } }, saved_materials: { data: { material_id: id } } }, { id: owner });
 const data = await api.loadMaterial(id); assert.equal(data.material.id, id); assert.equal(data.saved, true); assert.equal(data.filesError, true);
 assert.ok(api.calls.some(c => c[0] === 'saved_materials' && c[2] === 'user_id' && c[3] === owner));
});
test('favorites failure is not silently presented as an unsaved state', async () => {
 const api = setup({ materials: { data: material }, saved_materials: { error: { message: 'offline' } } }, { id: owner });
 assert.equal((await api.loadMaterial(id)).savedError, true);
});
test('public profile reads only public fields and paginates published material', async () => {
 const api = setup({ profiles: { data: profile }, materials: { data: [material], count: 13 } });
 const data = await api.loadPublicProfile(owner, 2); assert.equal(data.total, 13);
 assert.ok(api.calls.some(c => c[0] === 'profiles' && c[1] === 'select' && c[2] === 'id,display_name,occupation,bio,avatar_path'));
 assert.ok(api.calls.some(c => c[0] === 'materials' && c[1] === 'range' && c[2] === 12 && c[3] === 23));
 assert.ok(api.calls.some(c => c[0] === 'materials' && c[2] === 'submitted_by' && c[3] === owner));
 assert.ok(api.calls.some(c => c[0] === 'materials' && c[2] === 'is_published' && c[3] === true));
 assert.ok(api.calls.some(c => c[0] === 'materials' && c[2] === 'review_status' && c[3] === 'approved'));
});
test('profile remains visible when its material query fails', async () => {
 const data = await setup({ profiles: { data: profile }, materials: { error: { message: 'offline' } } }).loadPublicProfile(owner, 1);
 assert.equal(data.profile.id, owner); assert.ok(data.error);
});
test('invalid profile id avoids database calls', async () => {
 const api = setup(); assert.equal((await api.loadPublicProfile('invalid', 1)).profile, null); assert.equal(api.calls.length, 0);
});

test('login return allows material UUID routes and rejects external or malformed targets', () => {
 const exports = {};
 const authSource = ts.transpileModule(readFileSync(new URL('../src/lib/auth/validation.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
 vm.runInNewContext(authSource, { exports, require });
 assert.equal(exports.safeNext(`/materiais/${id}`), `/materiais/${id}`);
 for (const target of ['https://example.com', '//example.com', '/materiais/invalid', `/materiais/${id}?next=https://example.com`, `/materiais/${id}/arquivos/file`, undefined]) assert.equal(exports.safeNext(target), '/biblioteca');
});

test('PostgREST array and object taxonomies both render in material details', async () => {
 const changed = { ...material, material_taxonomies: [
  { taxonomies: [{ category: 'type', label: 'Jogo' }, { category: 'axis', label: 'Pensamento Computacional' }] },
  { taxonomies: { category: 'grade', label: '7º ano' } },
  { taxonomies: null },
 ] };
 const api = setup({ materials: { data: changed }, profiles: { data: profile } });
 const data = await api.loadMaterial(id);
 assert.equal(data.error, undefined);
 assert.deepEqual(Array.from(api.labels(data.material, 'type')), ['Jogo']);
 assert.deepEqual(Array.from(api.labels(data.material, 'axis')), ['Pensamento Computacional']);
 assert.deepEqual(Array.from(api.labels(data.material, 'grade')), ['7º ano']);
});

test('login return to a valid resubmission retains its revision context', () => {
 const exports = {};
 const source = ts.transpileModule(readFileSync(new URL('../src/lib/auth/validation.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
 vm.runInNewContext(source, { exports, require });
 assert.equal(exports.safeNext(`/enviar?revisao=${id}`), `/enviar?revisao=${id}`);
 for(const target of ['/enviar?revisao=invalid', `/enviar?revisao=${id}&next=https://example.com`, '/enviar?revisao=//example.com'])
  assert.equal(exports.safeNext(target), '/biblioteca');
});
