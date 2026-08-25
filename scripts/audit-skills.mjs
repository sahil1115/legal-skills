/**
 * Skill registry audit — `npm run audit`.
 *
 * Checks every skill for the things TypeScript cannot catch: thin content,
 * missing prompt sections, malformed ids and tags, absent or implausible
 * source metadata, stale review dates, bad semver, broken related-skill
 * references, and provider names leaking into prompts.
 *
 * Loads the TypeScript registry through Vite's SSR pipeline so there is no
 * separate build step and no extra dependency.
 *
 * Exit code 1 on any ERROR. Warnings are reported but do not fail the build,
 * so that "this skill has not been reviewed in a year" nags without blocking.
 */
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const { skills, skillsById, ID_ALIASES } = await server.ssrLoadModule('/src/data/skills/index.ts');
const { jurisdictions } = await server.ssrLoadModule('/src/data/jurisdictions.ts');
const { categories } = await server.ssrLoadModule('/src/data/categories.ts');
const { industries } = await server.ssrLoadModule('/src/data/industries.ts');
const { SHARED_TAGS } = await server.ssrLoadModule('/src/data/tags.ts');
const { LEGAL_SAFETY_BLOCK, composePrompt } = await server.ssrLoadModule('/src/data/safety.ts');
const { toSkillMarkdown, toSkillJson } = await server.ssrLoadModule('/src/lib/export.ts');

const errors = [];
const warnings = [];
const E = (m) => errors.push(m);
const W = (m) => warnings.push(m);

const jIds = new Set(jurisdictions.map((j) => j.id));
const cIds = new Set(categories.map((c) => c.id));
const iIds = new Set(industries.map((i) => i.id));
const VALID_AUTHORITY = new Set(['primary', 'regulator', 'guidance', 'secondary']);
const VALID_REVIEW = new Set(['unverified', 'community-reviewed', 'practitioner-reviewed']);

const ids = new Set();
const names = new Set();
// `lastReviewed` is date-only and therefore timezone-less. Comparing it against
// a UTC instant flags a date entered "today" in a UTC+N zone as being in the
// future, so compare whole UTC days and allow one day of skew.
const DAY_MS = 86400000;
const todayUtcDay = Math.floor(Date.now() / DAY_MS);

// ---------------------------------------------------------------- safety block
// The shared block is the backbone of the catalogue's honesty guarantees, so it
// is validated as a first-class artefact rather than trusted.
for (const required of [
  'NEVER INVENT AUTHORITY',
  'LABEL EVERY SUBSTANTIVE PROPOSITION',
  'PREFER PRIMARY AUTHORITY',
  'DISTINGUISH BINDING LAW FROM GUIDANCE',
  'FIX JURISDICTION AND TIME BEFORE ANSWERING',
  'NEVER SILENTLY FILL A MISSING FACT',
  'FLAG CONFLICTS BETWEEN SOURCES',
  'VERIFICATION CHECKLIST',
  '[CONFIRMED]',
  '[INFERRED]',
  '[UNKNOWN]',
  '[VERIFY]',
]) {
  if (!LEGAL_SAFETY_BLOCK.includes(required)) {
    E(`[safety block] missing required rule or marker: ${required}`);
  }
}

// ---------------------------------------------------------------- per skill
for (const s of skills) {
  const at = `[${s.id}]`;

  // --- identity ---
  if (ids.has(s.id)) E(`${at} duplicate id`);
  ids.add(s.id);
  if (names.has(s.name)) E(`${at} duplicate name "${s.name}"`);
  names.add(s.name);
  if (!/^[a-z]+-[a-z0-9-]+$/.test(s.id)) E(`${at} id is not slug-shaped`);
  if (!s.id.startsWith(`${s.jurisdiction}-`)) E(`${at} id does not start with its jurisdiction`);
  if (!jIds.has(s.jurisdiction)) E(`${at} unknown jurisdiction "${s.jurisdiction}"`);
  if (!cIds.has(s.category)) E(`${at} unknown category "${s.category}"`);

  // --- copy quality ---
  if (!s.description?.endsWith('.')) E(`${at} description is not a sentence`);
  if (s.description?.length > 130) W(`${at} description ${s.description.length} chars (>130)`);
  if (s.description?.length < 40) E(`${at} description too short`);
  if (!s.whatItDoes || s.whatItDoes.length < 250) E(`${at} whatItDoes is thin`);
  if (!s.whenToUse || s.whenToUse.length < 80) E(`${at} whenToUse is thin`);
  if (!s.example?.scenario || s.example.scenario.length < 60) E(`${at} example scenario is thin`);
  if (!s.example?.result || s.example.result.length < 80) E(`${at} example result is thin`);

  // --- inputs and outputs ---
  if (!Array.isArray(s.inputs) || s.inputs.length < 3) E(`${at} fewer than 3 inputs`);
  if (!Array.isArray(s.outputs) || s.outputs.length < 3) E(`${at} fewer than 3 outputs`);
  if (!s.inputs?.some((i) => i.required)) E(`${at} has no required input`);
  for (const i of s.inputs ?? []) {
    if (!i.name?.trim()) E(`${at} an input has no name`);
    if (!i.description?.trim()) E(`${at} input "${i.name}" has no description`);
  }
  for (const o of s.outputs ?? []) {
    if (!o.name?.trim()) E(`${at} an output has no name`);
    if (!o.description?.trim()) E(`${at} output "${o.name}" has no description`);
  }

  // --- prompt structure ---
  if (!s.prompt || s.prompt.length < 900) E(`${at} prompt is short (${s.prompt?.length ?? 0})`);
  for (const marker of ['INPUTS', 'TASK', 'RULES', 'OUTPUT FORMAT']) {
    if (!s.prompt?.includes(marker)) E(`${at} prompt is missing its ${marker} section`);
  }
  if (!/^You are /.test(s.prompt ?? '')) E(`${at} prompt does not open with a role`);
  if (/\bTODO\b|\bTBD\b|Lorem ipsum|XXX/i.test(s.prompt ?? '')) E(`${at} placeholder text in prompt`);
  if (/\b(ChatGPT|GPT-4|Claude|Gemini|OpenAI|Anthropic|Copilot)\b/.test(s.prompt ?? '')) {
    E(`${at} prompt names an LLM provider — prompts must stay provider-neutral`);
  }
  // The safety block is composed on, so it must not also be pasted inline.
  if (s.prompt?.includes('STANDING RULES')) {
    E(`${at} prompt inlines the shared safety block; it is composed on automatically`);
  }
  const composed = composePrompt(s);
  if (!composed.includes('NEVER INVENT AUTHORITY')) {
    E(`${at} composed prompt is missing the legal-safety block`);
  }

  // --- source metadata ---
  if (!Array.isArray(s.sources) || s.sources.length === 0) {
    E(`${at} has no sources`);
  } else {
    const seenCitations = new Set();
    for (const src of s.sources) {
      if (!src.citation?.trim()) E(`${at} a source has no citation`);
      if (seenCitations.has(src.citation)) E(`${at} duplicate source "${src.citation}"`);
      seenCitations.add(src.citation);
      if (!VALID_AUTHORITY.has(src.authority)) {
        E(`${at} source "${src.citation}" has invalid authority "${src.authority}"`);
      }
      if (src.jurisdiction && !jIds.has(src.jurisdiction)) {
        E(`${at} source "${src.citation}" has unknown jurisdiction "${src.jurisdiction}"`);
      }
      if (src.url) {
        if (!/^https:\/\/[^\s]+$/.test(src.url)) {
          E(`${at} source "${src.citation}" has a malformed or non-HTTPS url`);
        }
        // Deep links are the classic vector for fabricated citations. The
        // catalogue publishes landing pages only; see SkillSource in types.
        const path = src.url.replace(/^https:\/\/[^/]+/, '');
        if (path.replace(/\/$/, '').length > 0) {
          E(`${at} source "${src.citation}" uses a deep link (${path}) — landing pages only`);
        }
      }
    }
    // A skill claiming to state law should rest on something better than
    // commentary. Workflow skills legitimately do not, hence a warning.
    const hasHardAuthority = s.sources.some(
      (x) => x.authority === 'primary' || x.authority === 'regulator',
    );
    if (!hasHardAuthority && s.jurisdiction !== 'global' && s.jurisdiction !== 'cross') {
      W(`${at} jurisdiction-specific skill rests only on guidance/secondary sources`);
    }
  }

  // --- review metadata ---
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s.lastReviewed ?? '')) {
    E(`${at} lastReviewed must be an ISO date (YYYY-MM-DD)`);
  } else {
    const d = new Date(`${s.lastReviewed}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) {
      E(`${at} lastReviewed is not a real date`);
    } else {
      const days = todayUtcDay - Math.floor(d.getTime() / DAY_MS);
      if (days < -1) E(`${at} lastReviewed is in the future`);
      else if (days > 365) W(`${at} last reviewed ${days} days ago — legal content goes stale`);
    }
  }
  if (!VALID_REVIEW.has(s.reviewStatus)) E(`${at} invalid reviewStatus "${s.reviewStatus}"`);
  if (!/^\d+\.\d+\.\d+$/.test(s.version ?? '')) E(`${at} version must be semver (e.g. 1.0.0)`);

  // --- optional dimensions ---
  for (const ind of s.industries ?? []) {
    if (!iIds.has(ind)) E(`${at} unknown industry "${ind}"`);
  }
  if (s.industries && s.industries.length === 0) {
    W(`${at} has an empty industries array — omit the field instead`);
  }

  // --- related skills ---
  const seenRel = new Set();
  for (const ref of s.relatedSkills ?? []) {
    if (ref === s.id) E(`${at} lists itself in relatedSkills`);
    else if (!skillsById.has(ref)) E(`${at} relatedSkills references unknown skill "${ref}"`);
    if (seenRel.has(ref)) E(`${at} duplicate relatedSkills entry "${ref}"`);
    seenRel.add(ref);
  }

  // --- tags ---
  if (!Array.isArray(s.tags) || s.tags.length < 4) E(`${at} fewer than 4 tags`);
  if (!s.tags?.some((t) => SHARED_TAGS.includes(t))) {
    E(`${at} no tag from the shared vocabulary in src/data/tags.ts`);
  }
  for (const t of s.tags ?? []) {
    if (!/^[a-z0-9-]+$/.test(t)) E(`${at} malformed tag "${t}"`);
  }
  if (new Set(s.tags ?? []).size !== (s.tags ?? []).length) E(`${at} duplicate tags`);

  // --- exports must not throw and must carry provenance ---
  try {
    const md = toSkillMarkdown(s);
    if (!md.startsWith('---\n')) E(`${at} SKILL.md export has no frontmatter`);
    if (!md.includes(`name: "${s.id}"`)) E(`${at} SKILL.md frontmatter is missing name`);
    if (!md.includes('NEVER INVENT AUTHORITY')) E(`${at} SKILL.md export lost the safety block`);
    const json = JSON.parse(toSkillJson(s));
    if (json.id !== s.id) E(`${at} JSON export id mismatch`);
    if (!json.prompt.includes('NEVER INVENT AUTHORITY')) {
      E(`${at} JSON export lost the safety block`);
    }
  } catch (err) {
    E(`${at} export threw: ${err.message}`);
  }
}

// ---------------------------------------------------------------- aliases
for (const [old, target] of Object.entries(ID_ALIASES)) {
  if (skillsById.has(old)) E(`[aliases] "${old}" is aliased but still exists as a live id`);
  if (!skillsById.has(target)) E(`[aliases] "${old}" points at unknown skill "${target}"`);
}

// ---------------------------------------------------------------- coverage
console.log('Jurisdictions');
for (const j of jurisdictions) {
  const n = skills.filter((s) => s.jurisdiction === j.id).length;
  if (n === 0) E(`jurisdiction "${j.id}" has no skills`);
  console.log(`  ${j.name.padEnd(20)} ${String(n).padStart(2)}`);
}

console.log('\nCategories');
for (const c of categories) {
  const n = skills.filter((s) => s.category === c.id).length;
  console.log(`  ${c.name.padEnd(20)} ${String(n).padStart(2)}${n === 0 ? '   (declared, unused)' : ''}`);
}

console.log('\nIndustries (skills without an industry are agnostic and match all)');
for (const i of industries) {
  const n = skills.filter((s) => s.industries?.includes(i.id)).length;
  console.log(`  ${i.name.padEnd(26)} ${String(n).padStart(2)}`);
}

const byStatus = {};
for (const s of skills) byStatus[s.reviewStatus] = (byStatus[s.reviewStatus] ?? 0) + 1;
console.log('\nReview status');
for (const [k, v] of Object.entries(byStatus)) console.log(`  ${k.padEnd(26)} ${String(v).padStart(2)}`);

const srcCount = skills.reduce((a, s) => a + s.sources.length, 0);
const relCount = skills.reduce((a, s) => a + (s.relatedSkills?.length ?? 0), 0);
const promptLens = skills.map((s) => composePrompt(s).length);
console.log(
  `\n${skills.length} skills · ${srcCount} sources · ${relCount} related links · ` +
    `composed prompt avg ${Math.round(promptLens.reduce((a, b) => a + b, 0) / promptLens.length)} chars`,
);

if (warnings.length) {
  console.log(`\n${warnings.length} WARNING(S):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}
if (errors.length) {
  console.log(`\n${errors.length} ERROR(S):`);
  for (const e of errors) console.log(`  x ${e}`);
} else {
  console.log('\nNo errors.');
}

await server.close();
process.exit(errors.length ? 1 : 0);
