import type { Industry, IndustryId } from '../types/skill';

/**
 * Optional industry dimension.
 *
 * A skill with no `industries` is industry-agnostic and matches every filter
 * value, so this dimension is additive: the filter works correctly over a
 * registry where most skills declare nothing.
 */
export const industries: Industry[] = [
  { id: 'financial-services', name: 'Financial services', blurb: 'Banking, insurance, payments, capital markets and asset management.' },
  { id: 'technology', name: 'Technology', blurb: 'Software, SaaS, platforms, AI products and digital infrastructure.' },
  { id: 'healthcare', name: 'Healthcare & life sciences', blurb: 'Providers, medtech, pharma and health data.' },
  { id: 'retail-consumer', name: 'Retail & consumer', blurb: 'Consumer-facing goods, services and marketplaces.' },
  { id: 'energy-infrastructure', name: 'Energy & infrastructure', blurb: 'Utilities, transport, telecoms and critical infrastructure.' },
  { id: 'professional-services', name: 'Professional services', blurb: 'Law, accounting, consulting and agencies.' },
  { id: 'public-sector', name: 'Public sector', blurb: 'Government, education and public bodies.' },
];

const byId = new Map<IndustryId, Industry>(industries.map((i) => [i.id, i]));

export function getIndustry(id: IndustryId): Industry {
  const found = byId.get(id);
  if (!found) throw new Error(`Unknown industry: ${id}`);
  return found;
}
