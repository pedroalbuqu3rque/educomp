import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function compile(file) { return ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText; }
const validation = {};
vm.runInNewContext(compile('../src/lib/profile/validation.ts'), { exports: validation, require });
const code = compile('../src/lib/profile/actions.ts');
const valid = { display_name: 'Professor', occupation: 'Docente', bio: 'Ensino de Computação.' };
function setup({ user = { id: 'verified-user' }, write = { data: valid }, authError = null, fail = false } = {}) {
 const calls = [], paths = [];
 const client = { auth: { getUser: async () => ({ data: { user }, error: authError }) }, from(table) {
  calls.push(['from', table]); const query = {};
  for (const name of ['update', 'eq', 'select']) query[name] = (...args) => { calls.push([name, ...args]); return query; };
  query.maybeSingle = async () => { if (fail) throw Error('offline'); return write; };
  return query;
 } };
 const exports = {};
 vm.runInNewContext(code, { exports, require: name => name === './validation' ? validation : name === 'next/cache' ? { revalidatePath: path => paths.push(path) } : name === '@/lib/supabase/server' ? { createClient: async () => client } : require(name) });
 return { save: exports.saveProfile, calls, paths };
}
test('blank name and excessive bio are rejected before database access', async () => {
 const api = setup(); const result = await api.save({ ...valid, display_name: '   ', bio: 'x'.repeat(301) });
 assert.ok(result.fields.display_name); assert.ok(result.fields.bio); assert.equal(api.calls.length, 0);
});
test('occupation and name limits are enforced on the server', async () => {
 const api = setup(); const result = await api.save({ ...valid, display_name: 'x'.repeat(121), occupation: 'x'.repeat(121) });
 assert.ok(result.fields.display_name); assert.ok(result.fields.occupation); assert.equal(api.calls.length, 0);
});
test('expired session never writes a profile', async () => {
 const api = setup({ user: null }); const result = await api.save(valid);
 assert.equal(result.requiresLogin, true); assert.equal(api.calls.length, 0);
});
test('auth errors block writes even when a user object is returned', async () => {
 const api = setup({ authError: { message: 'invalid' } });
 assert.equal((await api.save(valid)).requiresLogin, true); assert.equal(api.calls.length, 0);
});
test('forged identity and private fields are ignored; only verified user is updated', async () => {
 const api = setup(); const result = await api.save({ ...valid, id: 'another-user', email: 'attacker@example.invalid', role: 'reviewer', display_name: ' Professor ' });
 assert.equal(result.profile.display_name, 'Professor');
 const update = api.calls.find(c => c[0] === 'update')[1];
 assert.deepEqual(Object.keys(update).sort(), ['bio', 'display_name', 'occupation']);
 assert.equal(update.display_name, 'Professor');
 assert.ok(api.calls.some(c => c[0] === 'eq' && c[1] === 'id' && c[2] === 'verified-user'));
 assert.ok(api.paths.includes('/conta')); assert.ok(api.paths.includes('/perfis/verified-user'));
});
test('empty optional fields and 300-character bio are accepted', async () => {
 const value = { display_name: 'Professor', occupation: '', bio: 'x'.repeat(300) };
 const result = await setup({ write: { data: value } }).save(value); assert.equal(result.profile.bio.length, 300);
});
test('write error and zero updated rows never report success', async () => {
 for (const write of [{ error: { message: 'denied' } }, { data: null }]) {
  const api = setup({ write }); const result = await api.save(valid);
  assert.ok(result.error); assert.equal(result.profile, undefined); assert.equal(api.paths.length, 0);
 }
});
test('network failures preserve an actionable error', async () => {
 const result = await setup({ fail: true }).save(valid); assert.ok(result.error); assert.equal(result.profile, undefined);
});
