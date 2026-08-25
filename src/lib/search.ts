import type { FilterState, Skill } from '../types/skill';

/**
 * Client-side search and filtering. Deliberately dependency-free: the whole
 * registry is a few dozen objects, so a scored linear scan is instant and
 * avoids shipping an index library.
 */

/** Weighting per field. Name matches should always outrank prompt-body matches. */
const WEIGHTS = {
  name: 100,
  tag: 40,
  description: 25,
  category: 15,
  whatItDoes: 8,
  whenToUse: 8,
  body: 3,
} as const;

interface IndexedSkill {
  skill: Skill;
  name: string;
  description: string;
  tags: string[];
  whatItDoes: string;
  whenToUse: string;
  body: string;
}

/** Lowercased haystacks, built once so keystrokes don't re-lowercase the corpus. */
export function buildIndex(skills: Skill[]): IndexedSkill[] {
  return skills.map((skill) => ({
    skill,
    name: skill.name.toLowerCase(),
    description: skill.description.toLowerCase(),
    tags: skill.tags.map((t) => t.toLowerCase()),
    whatItDoes: skill.whatItDoes.toLowerCase(),
    whenToUse: skill.whenToUse.toLowerCase(),
    body: [
      skill.prompt,
      skill.example.scenario,
      skill.example.result,
      ...skill.inputs.map((i) => `${i.name} ${i.description}`),
      ...skill.outputs.map((o) => `${o.name} ${o.description}`),
    ]
      .join(' ')
      .toLowerCase(),
  }));
}

/** Splits a query into terms. Every term must match somewhere (AND semantics). */
function terms(query: string): string[] {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function scoreTerm(entry: IndexedSkill, term: string): number {
  let score = 0;
  if (entry.name.includes(term)) {
    score += WEIGHTS.name;
    // A prefix match on the name is a stronger signal than a match mid-word.
    if (entry.name.startsWith(term)) score += 40;
  }
  if (entry.tags.some((t) => t.includes(term))) score += WEIGHTS.tag;
  if (entry.description.includes(term)) score += WEIGHTS.description;
  if (entry.skill.category.includes(term)) score += WEIGHTS.category;
  if (entry.whatItDoes.includes(term)) score += WEIGHTS.whatItDoes;
  if (entry.whenToUse.includes(term)) score += WEIGHTS.whenToUse;
  if (entry.body.includes(term)) score += WEIGHTS.body;
  return score;
}

export interface SearchResult {
  skill: Skill;
  score: number;
}

/**
 * Applies filters first (cheap, exact) then the text query (scored). Returns
 * results sorted by score, falling back to registry order for equal scores so
 * the grid is stable while typing.
 */
export function searchSkills(index: IndexedSkill[], filters: FilterState): SearchResult[] {
  const queryTerms = terms(filters.query);

  const results: SearchResult[] = [];

  for (let i = 0; i < index.length; i++) {
    const entry = index[i];
    const { skill } = entry;

    if (filters.jurisdiction !== 'all' && skill.jurisdiction !== filters.jurisdiction) continue;
    if (filters.category !== 'all' && skill.category !== filters.category) continue;
    // A skill with no declared industries is industry-agnostic and matches
    // every industry filter, so the dimension is additive over old skills.
    if (
      filters.industry !== 'all' &&
      skill.industries !== undefined &&
      skill.industries.length > 0 &&
      !skill.industries.includes(filters.industry)
    ) {
      continue;
    }
    if (filters.tags.length > 0 && !filters.tags.every((t) => skill.tags.includes(t))) continue;

    if (queryTerms.length === 0) {
      results.push({ skill, score: 0 });
      continue;
    }

    let total = 0;
    let matchedAll = true;
    for (const term of queryTerms) {
      const termScore = scoreTerm(entry, term);
      if (termScore === 0) {
        matchedAll = false;
        break;
      }
      total += termScore;
    }
    if (matchedAll) results.push({ skill, score: total });
  }

  return results.sort((a, b) => b.score - a.score);
}

/**
 * Tags available given the current filters, so tag chips never lead to an
 * empty result set. Counts reflect the currently visible skills.
 */
export function availableTags(results: SearchResult[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const { skill } of results) {
    for (const tag of skill.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
