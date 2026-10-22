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

export type WorkflowTag = (typeof WORKFLOW_TAGS)[number];

/** Display names for the workflow tags, shown as the "Task type" filter. */
export const WORKFLOW_LABELS: Record<WorkflowTag, string> = {
  assessment: 'Assessment',
  drafting: 'Drafting',
  review: 'Review',
  extraction: 'Extraction',
  research: 'Research',
  screening: 'Screening',
  'incident-response': 'Incident response',
  'programme-design': 'Programme design',
};

export function isWorkflowTag(tag: string): tag is WorkflowTag {
  return (WORKFLOW_TAGS as readonly string[]).includes(tag);
}

/** The first workflow tag a skill carries, used as its headline task type. */
export function primaryTask(tags: string[]): WorkflowTag | undefined {
  return tags.find(isWorkflowTag);
}

/** The area of practice the skill sits in. */
export const DOMAIN_TAGS = [
  'contract-lifecycle',
  'data-protection',
  'workforce',
  'financial-services',
  'disputes',
  'regulatory-change',
  'corporate-transactions',
  'mergers-acquisitions',
  'legal-ops',
  'third-party-risk',
  'cybersecurity',
  'supply-chain',
  'ai-governance',
] as const;

export const SHARED_TAGS: readonly string[] = [...WORKFLOW_TAGS, ...DOMAIN_TAGS];
