import type { FacetId, FilterState, IndustryId, Skill, SortId } from '../types/skill';
import { industries } from '../data/industries';
import { isWorkflowTag } from '../data/tags';

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
 * Scores every skill against the text query, in registry order. An empty
 * query matches everything with a score of zero.
 */
export function matchQuery(index: IndexedSkill[], query: string): SearchResult[] {
  const queryTerms = terms(query);
  if (queryTerms.length === 0) return index.map(({ skill }) => ({ skill, score: 0 }));

  const results: SearchResult[] = [];
  for (const entry of index) {
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
    if (matchedAll) results.push({ skill: entry.skill, score: total });
  }
  return results;
}

const FACETS: FacetId[] = ['jurisdictions', 'categories', 'industries', 'tasks', 'tags'];

const ALL_INDUSTRIES: IndustryId[] = industries.map((i) => i.id);

function passesFacet(skill: Skill, filters: FilterState, facet: FacetId): boolean {
  switch (facet) {
    case 'jurisdictions':
      return filters.jurisdictions.length === 0 || filters.jurisdictions.includes(skill.jurisdiction);
    case 'categories':
      return filters.categories.length === 0 || filters.categories.includes(skill.category);
    case 'industries':
      // A skill with no declared industries is industry-agnostic and matches
      // every industry filter, so the dimension is additive over old skills.
      return (
        filters.industries.length === 0 ||
        !skill.industries?.length ||
        skill.industries.some((i) => filters.industries.includes(i))
      );
    case 'tasks':
      return filters.tasks.length === 0 || filters.tasks.some((t) => skill.tags.includes(t));
    case 'tags':
      return filters.tags.every((t) => skill.tags.includes(t));
  }
}

/** True when the skill passes every facet, optionally ignoring one of them. */
function passesFacets(skill: Skill, filters: FilterState, except?: FacetId): boolean {
  return FACETS.every((facet) => facet === except || passesFacet(skill, filters, facet));
}

export function applyFacets(results: SearchResult[], filters: FilterState): SearchResult[] {
  return results.filter(({ skill }) => passesFacets(skill, filters));
}

/** The values a skill contributes to a facet's counts. */
function facetValues(skill: Skill, facet: FacetId): string[] {
  switch (facet) {
    case 'jurisdictions':
      return [skill.jurisdiction];
    case 'categories':
      return [skill.category];
    case 'industries':
      // Counted the same way the filter treats it: agnostic counts everywhere.
      return skill.industries?.length ? skill.industries : ALL_INDUSTRIES;
    case 'tasks':
      return skill.tags.filter(isWorkflowTag);
    case 'tags':
      // Workflow tags have their own facet, so they are not repeated here.
      return skill.tags.filter((t) => !isWorkflowTag(t));
  }
}

export type FacetCounts = Record<FacetId, Map<string, number>>;

/**
 * Live counts for every facet value, given the query and the other filters.
 *
 * Each facet is counted with its own selection ignored, so choosing "US" does
 * not zero out "UK" — the count beside each option is the number of results
 * you would get by ticking it. Tags narrow rather than widen, so tag counts
 * are taken over the fully filtered results instead.
 */
export function facetCounts(matched: SearchResult[], filters: FilterState): FacetCounts {
  const counts: FacetCounts = {
    jurisdictions: new Map(),
    categories: new Map(),
    industries: new Map(),
    tasks: new Map(),
    tags: new Map(),
  };
  for (const { skill } of matched) {
    for (const facet of FACETS) {
      const passes =
        facet === 'tags' ? passesFacets(skill, filters) : passesFacets(skill, filters, facet);
      if (!passes) continue;
      for (const value of facetValues(skill, facet)) {
        counts[facet].set(value, (counts[facet].get(value) ?? 0) + 1);
      }
    }
  }
  return counts;
}

/**
 * Orders results. Sorting is stable, so equal scores — including every skill
 * when there is no query — keep registry order and the grid does not shuffle
 * while typing.
 */
export function sortResults(results: SearchResult[], sort: SortId): SearchResult[] {
  const sorted = [...results];
  switch (sort) {
    case 'name':
      return sorted.sort((a, b) => a.skill.name.localeCompare(b.skill.name));
    case 'reviewed':
      return sorted.sort((a, b) => b.skill.lastReviewed.localeCompare(a.skill.lastReviewed));
    case 'relevance':
      return sorted.sort((a, b) => b.score - a.score);
  }
}
