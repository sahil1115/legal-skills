import type { Skill } from '../../../types/skill';
import { auEmploymentSkills } from './employment';
import { auCommercialSkills } from './commercial';
import { auCorporateSkills } from './corporate';
import { auRegulatorySkills } from './regulatory';

/**
 * Australia skills — Commonwealth law: ACL, Fair Work, Privacy, SOCI, DDO,
 * corporations, merger control and foreign investment.
 *
 * Split by practice area once the pack outgrew a single file. The registry
 * imports `auSkills` from this directory exactly as it previously imported it
 * from `au.ts`, so nothing outside this folder depends on the split.
 *
 * To add an Australian skill: append it to the practice-area file it belongs
 * in. No change is needed here.
 */
export const auSkills: Skill[] = [
  ...auEmploymentSkills,
  ...auCommercialSkills,
  ...auCorporateSkills,
  ...auRegulatorySkills,
];
