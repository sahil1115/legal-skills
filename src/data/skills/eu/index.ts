import type { Skill } from '../../../types/skill';
import { euPrivacySkills } from './privacy';
import { euRegulatorySkills } from './regulatory';
import { euEmploymentSkills } from './employment';
import { euComplianceSkills } from './compliance';

/**
 * European Union skills — EU-level instruments plus member-state implementation.
 *
 * Split by practice area once the pack outgrew a single file. The registry
 * imports `euSkills` from this directory exactly as it previously imported it
 * from `eu.ts`, so nothing outside this folder depends on the split.
 *
 * To add an EU skill: append it to the practice-area file it belongs in. No
 * change is needed here.
 */
export const euSkills: Skill[] = [
  ...euPrivacySkills,
  ...euRegulatorySkills,
  ...euEmploymentSkills,
  ...euComplianceSkills,
];
