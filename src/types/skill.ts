/**
 * Legal Skills — core data model.
 *
 * Everything the UI renders is derived from these types. Adding a skill means
 * adding one object to a file in `src/data/skills/` — no component changes.
 *
 * Fields marked `@future` are intentionally optional today. They exist so that
 * ratings, connectors and real LLM execution can be layered on later without a
 * breaking migration.
 */

/** Stable jurisdiction identifiers. Used as filter keys and in skill ids. */
export type JurisdictionId =
  | 'global'
  | 'us'
  | 'uk'
  | 'eu'
  | 'ca'
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

/**
 * Optional industry dimension. A skill with no `industries` is treated as
 * industry-agnostic and matches every industry filter, so adding this field
 * to a skill is backward compatible and adding the filter did not require
 * touching the skills that predate it.
 */
export type IndustryId =
  | 'financial-services'
  | 'technology'
  | 'healthcare'
  | 'retail-consumer'
  | 'energy-infrastructure'
  | 'professional-services'
  | 'public-sector';

export interface Industry {
  id: IndustryId;
  name: string;
  blurb: string;
}

/**
 * How much weight a source carries.
 *
 * - `primary`    — the law itself: statutes, regulations, directives, decided cases.
 * - `regulator`  — binding instruments issued by a supervisory body (notices, rules).
 * - `guidance`   — non-binding but persuasive: regulator guidance, opinions, codes.
 * - `secondary`  — commentary, practice notes, textbooks.
 *
 * The distinction is load-bearing: a skill that leans on `guidance` where a
 * `primary` source exists is telling you something about its own reliability.
 */
export type SourceAuthority = 'primary' | 'regulator' | 'guidance' | 'secondary';

/**
 * A legal source the skill's content is built on.
 *
 * IMPORTANT — deliberate constraint on `url`: this catalogue does not publish
 * deep links into legal databases, because a fabricated or rotted deep link is
 * worse than none. Where a URL is given it is the official landing page of the
 * publishing body, from which the instrument can be navigated to. Section
 * numbers and pinpoint references are intentionally absent from this metadata:
 * they belong in verified content, not in machine-generated citations.
 */
export interface SkillSource {
  /** The instrument or document, named as a practitioner would name it. */
  citation: string;
  authority: SourceAuthority;
  /** The body that issues or maintains the source. */
  publisher?: string;
  /** Which jurisdiction the source belongs to, for multi-jurisdiction skills. */
  jurisdiction?: JurisdictionId;
  /** Official landing page only — never a fabricated deep link. */
  url?: string;
  /** What this source is relied on for, or a caveat about it. */
  note?: string;
}

/**
 * How thoroughly a skill's legal content has been checked.
 *
 * Every skill in this repository currently sits at `unverified`, and that is
 * an honest statement rather than a placeholder: the content was drafted
 * against named sources but has not been signed off by a practitioner in the
 * relevant jurisdiction. Raising a skill's status is a human act — see
 * CONTRIBUTING.md. Do not raise it in a bulk edit.
 */
export type ReviewStatus =
  /** Drafted against the named sources; no practitioner sign-off. */
  | 'unverified'
  /** Checked by a contributor with relevant knowledge, not a practitioner. */
  | 'community-reviewed'
  /** Checked by a lawyer qualified in the skill's jurisdiction. */
  | 'practitioner-reviewed';

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
  /**
   * The skill-specific prompt body, provider-neutral.
   *
   * This is NOT the whole prompt the user copies. The shared legal-safety
   * rules in `src/data/safety.ts` are composed onto it by `composePrompt()`
   * at copy and export time, so the rules live in exactly one place and
   * updating them updates every skill at once.
   */
  prompt: string;
  example: SkillExample;

  /** Legal sources the content is built on. At least one is required. */
  sources: SkillSource[];
  /** ISO date (YYYY-MM-DD) the content was last checked against its sources. */
  lastReviewed: string;
  reviewStatus: ReviewStatus;
  /** Semantic version. Bump minor for content changes, major for a rewrite. */
  version: string;

  /** Optional industry narrowing. Absent means industry-agnostic. */
  industries?: IndustryId[];
  /** Ids of skills that pair with this one. Validated by `npm run audit`. */
  relatedSkills?: string[];
  /**
   * Skill-specific caveat. Falls back to the shared disclaimer in
   * `src/data/disclaimer.ts` when omitted.
   */
  disclaimer?: string;

  /** @future GitHub handle(s) of contributors. */
  authors?: string[];
  /** @future Community rating, 0-5. */
  rating?: number;
  /** @future ids of connectors this skill can draw data from. */
  connectors?: string[];
}

/** The three workspace tabs. Agents and Connectors are roadmap surfaces. */
export type TabId = 'agents' | 'skills' | 'connectors';

/** Everything the filter UI can express, in one serialisable object. */
export interface FilterState {
  query: string;
  jurisdiction: JurisdictionId | 'all';
  category: CategoryId | 'all';
  industry: IndustryId | 'all';
  tags: string[];
}
