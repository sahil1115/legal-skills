import type { Skill } from '../../../types/skill';
import { usLitigationSkills } from './litigation';
import { usEmploymentSkills } from './employment';
import { usPrivacyComplianceSkills } from './privacy-compliance';
import { usCorporateSkills } from './corporate';
import { usCommercialSkills } from './commercial';
import { usLegalOpsSkills } from './legal-ops';

/**
 * United States skills — federal law and the 50-state patchwork.
 *
 * Split by practice area rather than held in one file: the US pack is the
 * largest in the catalogue, and a single file would be several times the size
 * of any other jurisdiction's. The registry imports `usSkills` from this
 * directory exactly as it previously imported it from `us.ts`, so nothing
 * outside this folder depends on the split.
 *
 * To add a US skill: append it to the practice-area file it belongs in. No
 * change is needed here.
 */
export const usSkills: Skill[] = [
  ...usLitigationSkills,
  ...usEmploymentSkills,
  ...usPrivacyComplianceSkills,
  ...usCorporateSkills,
  ...usCommercialSkills,
  ...usLegalOpsSkills,
];
