/**
 * Roadmap content for the Agents and Connectors tabs.
 *
 * These surfaces are not built yet. The items below describe where each is
 * heading so the tabs say something honest rather than sitting empty — keeping
 * them as data means the panels stay presentational.
 */

export interface RoadmapItem {
  name: string;
  description: string;
}

export const AGENT_ITEMS: RoadmapItem[] = [
  {
    name: 'Contract review agent',
    description:
      'Chains triage, redline and obligation extraction over an inbound agreement, then hands a reviewer a single briefing.',
  },
  {
    name: 'Privacy request agent',
    description:
      'Routes a data subject request across regimes, tracks the response clock, and drafts correspondence at each stage.',
  },
  {
    name: 'Horizon scanning agent',
    description:
      'Runs the scanner on a schedule against a saved business profile and reports only what changed since the last run.',
  },
  {
    name: 'Multi-jurisdiction analyst',
    description:
      'Fans a single question out across jurisdiction skills, then reconciles the answers with the strictest-rule resolver.',
  },
];

export const CONNECTOR_ITEMS: RoadmapItem[] = [
  {
    name: 'Document storage',
    description:
      'Read contracts from a folder or document management system so a skill can run over a real corpus instead of pasted text.',
  },
  {
    name: 'Contract lifecycle tools',
    description:
      'Pull executed agreements and push obligation registers and playbook positions back into an existing CLM.',
  },
  {
    name: 'Regulatory feeds',
    description:
      'Subscribe to regulator publications and consultations so the horizon scanner has a source rather than a paste buffer.',
  },
  {
    name: 'Ticketing and intake',
    description:
      'Accept legal requests from a helpdesk or intake form and return the triage result to the same thread.',
  },
];
