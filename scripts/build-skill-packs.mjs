/**
 * Generates distributable skill packs — `npm run packs`.
 *
 * Emits, into `dist-packs/`:
 *   skills/<id>/SKILL.md   Agent Skills-compatible package, one directory each
 *   skills/<id>/skill.json Machine-readable export
 *   index.json             The whole catalogue, for programmatic consumers
 *
 * This is the same registry and the same transforms the web app uses — see
 * `src/lib/export.ts`. Nothing here is browser-specific, so a package can be
 * produced in CI and attached to a release without the app being involved.
 */
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { createServer } from 'vite';

const OUT = 'dist-packs';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const { skills } = await server.ssrLoadModule('/src/data/skills/index.ts');
const { toSkillMarkdown, toSkillJson } = await server.ssrLoadModule('/src/lib/export.ts');
const { LEGAL_SAFETY_BLOCK } = await server.ssrLoadModule('/src/data/safety.ts');

await rm(OUT, { recursive: true, force: true });
await mkdir(join(OUT, 'skills'), { recursive: true });

for (const skill of skills) {
  const dir = join(OUT, 'skills', skill.id);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'SKILL.md'), toSkillMarkdown(skill), 'utf8');
  await writeFile(join(dir, 'skill.json'), toSkillJson(skill), 'utf8');
}

await writeFile(
  join(OUT, 'index.json'),
  `${JSON.stringify(
    {
      specVersion: '1.0',
      generated: new Date().toISOString().slice(0, 10),
      license: 'MIT',
      count: skills.length,
      skills: skills.map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        jurisdiction: s.jurisdiction,
        category: s.category,
        industries: s.industries ?? [],
        tags: s.tags,
        version: s.version,
        lastReviewed: s.lastReviewed,
        reviewStatus: s.reviewStatus,
        sourceCount: s.sources.length,
        relatedSkills: s.relatedSkills ?? [],
        path: `skills/${s.id}/SKILL.md`,
      })),
    },
    null,
    2,
  )}\n`,
  'utf8',
);

await writeFile(join(OUT, 'LEGAL-SAFETY.md'), `# Shared legal-safety rules

Every skill package in this directory has these rules composed into its
instructions. They are reproduced here so the guarantee is auditable in one
place rather than only inside 38 files.

${LEGAL_SAFETY_BLOCK}
`, 'utf8');

console.log(`Wrote ${skills.length} skill packs to ${OUT}/`);
await server.close();
