import type { CategoryId, JurisdictionId, Skill } from '../../types/skill';
import { SHARED_TAGS } from '../tags';
import { globalSkills } from './global';
import { usSkills } from './us';
import { euSkills } from './eu';
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
  ...euSkills,
  ...auSkills,
  ...sgSkills,
  ...crossSkills,
];

/**
 * Development-only registry checks. These run in `npm run dev` and are dropped
 * from the production bundle, so a contributor sees the problem immediately
 * without the app needing a test runner to catch it.
 */
if (import.meta.env.DEV) {
  const seen = new Set<string>();
  for (const skill of skills) {
    // Ids are React keys and deep-link fragments, so they must be unique.
    if (seen.has(skill.id)) {
      console.error(`[legal-skills] Duplicate skill id: ${skill.id}`);
    }
    seen.add(skill.id);

    // A skill tagged only with words no other skill uses is unfilterable.
    if (!skill.tags.some((t) => SHARED_TAGS.includes(t))) {
      console.warn(
        `[legal-skills] "${skill.name}" has no tag from the shared vocabulary ` +
          `in src/data/tags.ts — it will be hard to find by tag.`,
      );
    }
  }
}

export const skillsById = new Map<string, Skill>(skills.map((s) => [s.id, s]));

export function getSkill(id: string): Skill | undefined {
  return skillsById.get(id);
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

export type { CategoryId, JurisdictionId, Skill };
