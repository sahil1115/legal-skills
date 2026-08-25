import type { Skill } from '../types/skill';
import { composePrompt } from '../data/safety';
import { DEFAULT_DISCLAIMER } from '../data/disclaimer';
import { getJurisdiction } from '../data/jurisdictions';
import { getCategory } from '../data/categories';

/**
 * Export formats.
 *
 * The registry is the single source of truth; these functions are pure
 * transforms over one `Skill`. That is deliberate — the same functions can be
 * called from a Node script to emit a directory of packages for distribution
 * without the browser being involved. See `scripts/build-skill-packs.mjs`.
 *
 * SKILL.md follows the reusable Agent Skills convention: YAML frontmatter with
 * at least `name` and `description`, then Markdown instructions. The extra
 * frontmatter keys are additive metadata — a consumer that only understands
 * `name` and `description` ignores them, so the file stays compatible while
 * carrying the provenance a legal skill needs.
 */

/** Escapes a value for safe use as a double-quoted YAML scalar. */
function yamlString(value: string): string {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function yamlList(values: string[]): string {
  return `[${values.map(yamlString).join(', ')}]`;
}

/**
 * Agent Skills-compatible Markdown package.
 *
 * The body is the composed prompt (skill instructions + the shared legal-safety
 * rules), so a file exported from here carries its safety rules with it and
 * cannot be separated from them by accident.
 */
export function toSkillMarkdown(skill: Skill): string {
  const jurisdiction = getJurisdiction(skill.jurisdiction);
  const category = getCategory(skill.category);

  const frontmatter = [
    '---',
    `name: ${yamlString(skill.id)}`,
    `description: ${yamlString(skill.description)}`,
    `version: ${yamlString(skill.version)}`,
    `license: ${yamlString('MIT')}`,
    `title: ${yamlString(skill.name)}`,
    `jurisdiction: ${yamlString(jurisdiction.name)}`,
    `legal_area: ${yamlString(category.name)}`,
    `tags: ${yamlList(skill.tags)}`,
    ...(skill.industries?.length ? [`industries: ${yamlList(skill.industries)}`] : []),
    `last_reviewed: ${yamlString(skill.lastReviewed)}`,
    `review_status: ${yamlString(skill.reviewStatus)}`,
    ...(skill.relatedSkills?.length ? [`related_skills: ${yamlList(skill.relatedSkills)}`] : []),
    '---',
  ].join('\n');

  const inputs = skill.inputs
    .map((i) => `- **${i.name}**${i.required ? '' : ' _(optional)_'} — ${i.description}`)
    .join('\n');
  const outputs = skill.outputs.map((o) => `- **${o.name}** — ${o.description}`).join('\n');
  const sources = skill.sources
    .map((s) => {
      const bits = [`- **${s.citation}** — _${s.authority}_`];
      if (s.publisher) bits.push(` · ${s.publisher}`);
      if (s.url) bits.push(` · <${s.url}>`);
      if (s.note) bits.push(`\n  - ${s.note}`);
      return bits.join('');
    })
    .join('\n');

  return `${frontmatter}

# ${skill.name}

${skill.description}

## What this skill does

${skill.whatItDoes}

## When to use it

${skill.whenToUse}

## Inputs

${inputs}

## Expected output

${outputs}

## Instructions

${composePrompt(skill).trimEnd()}

## Example

**Scenario.** ${skill.example.scenario}

**What you get back.** ${skill.example.result}

## Sources

${sources}

- Last reviewed: ${skill.lastReviewed}
- Review status: **${skill.reviewStatus}**
- Version: ${skill.version}

## Disclaimer

${skill.disclaimer ?? DEFAULT_DISCLAIMER}
`;
}

/**
 * Machine-readable export. `prompt` is the composed prompt including the
 * safety rules; `promptBody` is the skill-specific half, so a consumer that
 * wants to recompose with its own preamble can, without losing either piece.
 */
export function toSkillJson(skill: Skill): string {
  return `${JSON.stringify(
    {
      $schema: 'https://github.com/sahil1115/legal-skills/blob/main/docs/skill.schema.md',
      specVersion: '1.0',
      id: skill.id,
      name: skill.name,
      description: skill.description,
      version: skill.version,
      license: 'MIT',
      jurisdiction: skill.jurisdiction,
      category: skill.category,
      industries: skill.industries ?? [],
      tags: skill.tags,
      whatItDoes: skill.whatItDoes,
      whenToUse: skill.whenToUse,
      inputs: skill.inputs,
      outputs: skill.outputs,
      prompt: composePrompt(skill),
      promptBody: skill.prompt,
      example: skill.example,
      sources: skill.sources,
      lastReviewed: skill.lastReviewed,
      reviewStatus: skill.reviewStatus,
      relatedSkills: skill.relatedSkills ?? [],
      disclaimer: skill.disclaimer ?? DEFAULT_DISCLAIMER,
    },
    null,
    2,
  )}\n`;
}

/**
 * Triggers a client-side file download. Uses an object URL and a synthetic
 * click — no network, no backend, nothing leaves the browser.
 */
export function downloadFile(filename: string, contents: string, mime: string): void {
  const blob = new Blob([contents], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoked on the next tick so the download has started before the URL dies.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function downloadSkillMarkdown(skill: Skill): void {
  downloadFile(`${skill.id}.SKILL.md`, toSkillMarkdown(skill), 'text/markdown');
}

export function downloadSkillJson(skill: Skill): void {
  downloadFile(`${skill.id}.json`, toSkillJson(skill), 'application/json');
}
