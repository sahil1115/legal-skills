import type { Category, CategoryId } from '../types/skill';

/**
 * Practice-area registry. Order here is the order shown in the category filter.
 *
 * A category with no skills is hidden from the filter dropdown rather than
 * offered as a dead option, so it is safe to declare one ahead of the skills
 * that will use it.
 */
export const categories: Category[] = [
  { id: 'contracts', name: 'Contracts', blurb: 'Drafting, review, negotiation and lifecycle work.' },
  { id: 'privacy', name: 'Privacy & Data', blurb: 'Data protection, transfers, breach and data-subject rights.' },
  { id: 'employment', name: 'Employment', blurb: 'Workforce classification, awards, pay and workplace rights.' },
  { id: 'litigation', name: 'Litigation', blurb: 'Disputes, discovery, privilege and court practice.' },
  { id: 'regulatory', name: 'Regulatory', blurb: 'Sector regulators, licensing and supervisory expectations.' },
  { id: 'compliance', name: 'Compliance', blurb: 'Programme design, screening, controls and attestation.' },
  { id: 'research', name: 'Research', blurb: 'Legal research, surveys and horizon scanning.' },
  { id: 'corporate', name: 'Corporate', blurb: 'Entity, governance and transactional support.' },
];

const byId = new Map<CategoryId, Category>(categories.map((c) => [c.id, c]));

export function getCategory(id: CategoryId): Category {
  const found = byId.get(id);
  if (!found) throw new Error(`Unknown category: ${id}`);
  return found;
}
