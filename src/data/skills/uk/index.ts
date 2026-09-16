import type { Skill } from '../../../types/skill';
import { ukEmploymentSkills } from './employment';
import { ukPrivacyComplianceSkills } from './privacy-compliance';
import { ukCorporateSkills } from './corporate';
import { ukCommercialSkills } from './commercial';

/**
 * United Kingdom skills — post-Brexit domestic law.
 *
 * Deliberately separate from the EU pack rather than folded into it. The UK
 * GDPR, the Companies Act, the Consumer Rights Act and the Bribery Act are domestic instruments
 * with their own regulator and their own case law, and treating them as EU
 * law with a different name is the single most common error in this area.
 *
 * Split by practice area once the pack outgrew a single file. The registry
 * imports `ukSkills` from this directory exactly as it previously imported it
 * from `uk.ts`, so nothing outside this folder depends on the split.
 */
export const ukSkills: Skill[] = [
  ...ukEmploymentSkills,
  ...ukPrivacyComplianceSkills,
  ...ukCorporateSkills,
  ...ukCommercialSkills,
];
