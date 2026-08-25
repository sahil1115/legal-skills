import type { Jurisdiction, JurisdictionId } from '../types/skill';

/**
 * Jurisdiction registry. Order here is the order shown in the filter bar.
 * To add a jurisdiction: add an entry, add its id to `JurisdictionId`, then
 * drop a new file into `src/data/skills/`.
 */
export const jurisdictions: Jurisdiction[] = [
  {
    id: 'global',
    name: 'Global',
    short: 'Global',
    blurb: 'Jurisdiction-neutral workflows that apply to any legal team.',
    color: '#6b7f8f',
  },
  {
    id: 'us',
    name: 'United States',
    short: 'US',
    blurb: 'Federal and state-level US law, including the 50-state patchwork.',
    color: '#3d6fb4',
  },
  {
    id: 'eu',
    name: 'European Union',
    short: 'EU',
    blurb: 'EU regulations and directives, plus member-state implementation.',
    color: '#4a5bb8',
  },
  {
    id: 'au',
    name: 'Australia',
    short: 'AU',
    blurb: 'Commonwealth law: ACL, Fair Work, Privacy Act, SOCI and more.',
    color: '#2f8f6f',
  },
  {
    id: 'sg',
    name: 'Singapore',
    short: 'SG',
    blurb: 'PDPA, MAS notices, employment and arbitration practice.',
    color: '#c0553f',
  },
  {
    id: 'cross',
    name: 'Cross-jurisdiction',
    short: 'Cross',
    blurb: 'Skills that reconcile two or more regimes into a single answer.',
    color: '#8a6ab0',
  },
];

const byId = new Map<JurisdictionId, Jurisdiction>(
  jurisdictions.map((j) => [j.id, j]),
);

export function getJurisdiction(id: JurisdictionId): Jurisdiction {
  const found = byId.get(id);
  if (!found) throw new Error(`Unknown jurisdiction: ${id}`);
  return found;
}
