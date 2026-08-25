/**
 * Skill registry audit — `npm run audit`.
 *
 * Checks every skill in the registry for the things TypeScript cannot catch:
 * thin content, missing prompt sections, malformed ids and tags, provider
 * names leaking into prompts, and orphan tags. Run it before opening a PR.
 *
 * Loads the TypeScript registry through Vite's SSR pipeline so there is no
 * separate build step and no extra dependency.
 */
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { skills } = await server.ssrLoadModule('/src/data/skills/index.ts');
const { jurisdictions } = await server.ssrLoadModule('/src/data/jurisdictions.ts');
const { categories } = await server.ssrLoadModule('/src/data/categories.ts');
const { SHARED_TAGS } = await server.ssrLoadModule('/src/data/tags.ts');

const problems = [];
const P = (m) => problems.push(m);
const ids = new Set();
const names = new Set();

const jIds = new Set(jurisdictions.map((j) => j.id));
const cIds = new Set(categories.map((c) => c.id));

for (const s of skills) {
  const at = `[${s.id}]`;
  if (ids.has(s.id)) P(`${at} duplicate id`);
  ids.add(s.id);
  if (names.has(s.name)) P(`${at} duplicate name`);
  names.add(s.name);

  if (!/^[a-z]+-[a-z0-9-]+$/.test(s.id)) P(`${at} id not slug-shaped`);
  if (!s.id.startsWith(s.jurisdiction + '-')) P(`${at} id does not start with jurisdiction`);
  if (!jIds.has(s.jurisdiction)) P(`${at} unknown jurisdiction`);
  if (!cIds.has(s.category)) P(`${at} unknown category`);

  if (s.description.length > 120) P(`${at} description ${s.description.length} chars (>120)`);
  if (s.description.length < 40) P(`${at} description too short`);
  if (!s.description.endsWith('.')) P(`${at} description not a sentence`);

  if (s.whatItDoes.length < 250) P(`${at} whatItDoes thin (${s.whatItDoes.length})`);
  if (s.whenToUse.length < 80) P(`${at} whenToUse thin (${s.whenToUse.length})`);

  if (s.inputs.length < 3) P(`${at} only ${s.inputs.length} inputs`);
  if (s.outputs.length < 3) P(`${at} only ${s.outputs.length} outputs`);
  if (!s.inputs.some((i) => i.required)) P(`${at} no required input`);
  for (const i of s.inputs) if (!i.description?.trim()) P(`${at} input "${i.name}" has no description`);
  for (const o of s.outputs) if (!o.description?.trim()) P(`${at} output "${o.name}" has no description`);

  if (s.prompt.length < 900) P(`${at} prompt short (${s.prompt.length})`);
  for (const marker of ['INPUTS', 'TASK', 'RULES', 'OUTPUT FORMAT']) {
    if (!s.prompt.includes(marker)) P(`${at} prompt missing ${marker} section`);
  }
  if (!/^You are /.test(s.prompt)) P(`${at} prompt does not open with a role`);
  if (/\bTODO\b|\bTBD\b|Lorem ipsum|XXX/i.test(s.prompt)) P(`${at} placeholder text in prompt`);
  if (/\b(ChatGPT|GPT-4|Claude|Gemini|OpenAI|Anthropic)\b/.test(s.prompt)) P(`${at} prompt names a provider`);

  if (!s.example?.scenario || s.example.scenario.length < 60) P(`${at} example scenario thin`);
  if (!s.example?.result || s.example.result.length < 80) P(`${at} example result thin`);

  if (s.tags.length < 4) P(`${at} only ${s.tags.length} tags`);
  if (!s.tags.some((t) => SHARED_TAGS.includes(t))) P(`${at} no shared-vocabulary tag`);
  for (const t of s.tags) if (!/^[a-z0-9-]+$/.test(t)) P(`${at} malformed tag "${t}"`);
  if (new Set(s.tags).size !== s.tags.length) P(`${at} duplicate tags`);
}

// Every jurisdiction and every declared category should actually be populated.
for (const j of jurisdictions) {
  const n = skills.filter((s) => s.jurisdiction === j.id).length;
  if (n === 0) P(`jurisdiction "${j.id}" has no skills`);
  console.log(`  ${j.name.padEnd(20)} ${String(n).padStart(2)} skills`);
}
console.log('');
for (const c of categories) {
  const n = skills.filter((s) => s.category === c.id).length;
  console.log(`  ${c.name.padEnd(20)} ${String(n).padStart(2)} skills${n === 0 ? '   <- declared but unused' : ''}`);
}

console.log(`\n${skills.length} skills audited.`);
const promptLens = skills.map((s) => s.prompt.length);
console.log(`prompt length: min ${Math.min(...promptLens)}, max ${Math.max(...promptLens)}, avg ${Math.round(promptLens.reduce((a, b) => a + b) / promptLens.length)}`);

if (problems.length) {
  console.log(`\n${problems.length} PROBLEMS:`);
  for (const p of problems) console.log('  - ' + p);
} else {
  console.log('\nNo problems found.');
}
await server.close();
process.exit(problems.length ? 1 : 0);
