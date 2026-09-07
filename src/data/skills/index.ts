import type { CategoryId, IndustryId, JurisdictionId, Skill } from '../../types/skill';
import { SHARED_TAGS } from '../tags';
import { globalSkills } from './global';
import { usSkills } from './us';
import { ukSkills } from './uk';
import { euSkills } from './eu';
import { caSkills } from './ca';
import { auSkills } from './au';
import { sgSkills } from './sg';
import { crossSkills } from './cross';

/**
 * The skill registry.
 *
 * To add a skill: append an object to the relevant file above. To add a whole
 * jurisdiction: create a file, register it here, and add the jurisdiction to
 * `src/data/jurisdictions.ts`. Nothing in the UI needs to change either way.
 */
export const skills: Skill[] = [
  ...globalSkills,
  ...usSkills,
  ...ukSkills,
  ...euSkills,
  ...caSkills,
  ...auSkills,
  ...sgSkills,
  ...crossSkills,
];

/**
 * Retired ids, mapped to their replacements.
 *
 * A skill id is a published deep link, so renaming one breaks every URL anyone
 * has shared. When a rename is genuinely warranted, the old id is recorded here
 * and `getSkill()` keeps resolving it. Never delete an entry from this map.
 */
export const ID_ALIASES: Record<string, string> = {
  // Renamed 2026-08-26: "DSAR" is UK/EU vocabulary, but the skill always
  // covered US, Singapore and Australian rights regimes too.
  'global-dsar-handler': 'global-data-rights-request-handler',
};

export const skillsById = new Map<string, Skill>(skills.map((s) => [s.id, s]));

/** Resolves a current id, or a retired one via {@link ID_ALIASES}. */
export function getSkill(id: string): Skill | undefined {
  return skillsById.get(id) ?? skillsById.get(ID_ALIASES[id] ?? '');
}

/** Skill counts per jurisdiction, used for the filter chips. */
export const countsByJurisdiction = skills.reduce<Record<string, number>>((acc, skill) => {
  acc[skill.jurisdiction] = (acc[skill.jurisdiction] ?? 0) + 1;
  return acc;
}, {});

/** Skill counts per category, used for the filter chips. */
export const countsByCategory = skills.reduce<Record<string, number>>((acc, skill) => {
  acc[skill.category] = (acc[skill.category] ?? 0) + 1;
  return acc;
}, {});

/**
 * Skill counts per industry. A skill with no `industries` is industry-agnostic
 * and counts toward every industry, matching how the filter treats it.
 */
export const countsByIndustry = skills.reduce<Record<string, number>>((acc, skill) => {
  const ids: IndustryId[] = skill.industries ?? [];
  for (const id of ids) acc[id] = (acc[id] ?? 0) + 1;
  return acc;
}, {});

/** Every tag in use, sorted by frequency then alphabetically. */
export const allTags: { tag: string; count: number }[] = (() => {
  const counts = new Map<string, number>();
  for (const skill of skills) {
    for (const tag of skill.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
})();

/**
 * Development-only registry checks. These run in `npm run dev` and are dropped
 * from the production bundle, so a contributor sees the problem immediately.
 * `npm run audit` runs the full set of checks — this is the fast subset.
 */
if (import.meta.env.DEV) {
  const seen = new Set<string>();
  for (const skill of skills) {
    if (seen.has(skill.id)) {
      console.error(`[legal-skills] Duplicate skill id: ${skill.id}`);
    }
    seen.add(skill.id);

    if (!skill.tags.some((t) => SHARED_TAGS.includes(t))) {
      console.warn(
        `[legal-skills] "${skill.name}" has no tag from the shared vocabulary ` +
          `in src/data/tags.ts — it will be hard to find by tag.`,
      );
    }
  }

  // Broken relatedSkills references would render as dead links in the UI.
  for (const skill of skills) {
    for (const ref of skill.relatedSkills ?? []) {
      if (ref === skill.id) {
        console.error(`[legal-skills] "${skill.id}" lists itself in relatedSkills.`);
      } else if (!skillsById.has(ref)) {
        console.error(`[legal-skills] "${skill.id}" references unknown skill "${ref}".`);
      }
    }
  }
}

export type { CategoryId, IndustryId, JurisdictionId, Skill };
