/**
 * Shared tag vocabulary.
 *
 * Skills are free to carry any tags they like, but every skill should also
 * carry at least one WORKFLOW_TAG and one DOMAIN_TAG. Without a shared spine
 * the tag filter degenerates into a per-skill selector, since a tag used by
 * exactly one skill is not a filter — it is a name.
 *
 * When adding a skill, reuse these where they fit and add specific tags
 * alongside them. When adding a new shared tag, add it here too.
 */

/** What kind of work the skill does. */
export const WORKFLOW_TAGS = [
  'assessment',
  'drafting',
  'review',
  'extraction',
  'research',
  'screening',
  'incident-response',
  'programme-design',
] as const;

/** The area of practice the skill sits in. */
export const DOMAIN_TAGS = [
  'contract-lifecycle',
  'data-protection',
  'workforce',
  'financial-services',
  'disputes',
  'regulatory-change',
  'corporate-transactions',
] as const;

export const SHARED_TAGS: readonly string[] = [...WORKFLOW_TAGS, ...DOMAIN_TAGS];
