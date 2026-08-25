/**
 * Legal Skills — core data model.
 *
 * Everything the UI renders is derived from these types. Adding a skill means
 * adding one object to a file in `src/data/skills/` — no component changes.
 *
 * Fields marked `@future` are intentionally optional today. They exist so that
 * versioning, ratings, connectors and real LLM execution can be layered on
 * later without a breaking migration.
 */

/** Stable jurisdiction identifiers. Used as filter keys and in skill ids. */
export type JurisdictionId =
  | 'global'
  | 'us'
  | 'eu'
  | 'au'
  | 'sg'
  | 'cross';

export interface Jurisdiction {
  id: JurisdictionId;
  /** Display name, e.g. "European Union". */
  name: string;
  /** Short label for chips and compact UI, e.g. "EU". */
  short: string;
  /** One line explaining what falls under this jurisdiction. */
  blurb: string;
  /**
   * CSS colour for the jurisdiction dot. Deliberately not a flag emoji:
   * flag emoji do not render on Windows and degrade into letter pairs.
   */
  color: string;
}

/**
 * Practice areas. Kept as a string union so that a typo in a skill file is a
 * compile error rather than a silently broken filter.
 */
export type CategoryId =
  | 'contracts'
  | 'privacy'
  | 'employment'
  | 'litigation'
  | 'regulatory'
  | 'compliance'
  | 'research'
  | 'corporate';

export interface Category {
  id: CategoryId;
  name: string;
  /** One line describing the practice area. */
  blurb: string;
}

/** A single input the user (or a calling agent) must supply. */
export interface SkillInput {
  /** Human-readable name, e.g. "Contract text". */
  name: string;
  /** What to provide and in what shape. */
  description: string;
  /** Optional inputs are surfaced as "optional" in the detail view. */
  required?: boolean;
}

/** A distinct artefact the skill produces. */
export interface SkillOutput {
  name: string;
  description: string;
}

export interface SkillExample {
  /** The scenario, in one or two sentences. */
  scenario: string;
  /** What a lawyer or legal ops person gets back. */
  result: string;
}

export interface Skill {
  /** Stable, URL-safe identifier. Convention: `<jurisdiction>-<slug>`. */
  id: string;
  name: string;
  /** One line, shown on the card. Keep under ~110 characters. */
  description: string;
  jurisdiction: JurisdictionId;
  category: CategoryId;
  /** Lowercase, hyphenated keywords. Drives tag filtering and search. */
  tags: string[];
  /** "What this skill does" — 2-4 sentences of substance. */
  whatItDoes: string;
  /** "When to use it" — the trigger situation. */
  whenToUse: string;
  inputs: SkillInput[];
  outputs: SkillOutput[];
  /** The provider-neutral prompt users copy into any LLM. */
  prompt: string;
  example: SkillExample;
  /**
   * Skill-specific caveat. Falls back to the shared disclaimer in
   * `src/data/disclaimer.ts` when omitted.
   */
  disclaimer?: string;

  /** @future Semantic version, for skill versioning. */
  version?: string;
  /** @future GitHub handle(s) of contributors. */
  authors?: string[];
  /** @future Community rating, 0-5. */
  rating?: number;
  /** @future ids of connectors this skill can draw data from. */
  connectors?: string[];
  /** @future ids of related skills, for "works well with". */
  relatedSkills?: string[];
}

/** The three workspace tabs. Agents and Connectors are roadmap surfaces. */
export type TabId = 'agents' | 'skills' | 'connectors';

/** Everything the filter UI can express, in one serialisable object. */
export interface FilterState {
  query: string;
  jurisdiction: JurisdictionId | 'all';
  category: CategoryId | 'all';
  tags: string[];
}
