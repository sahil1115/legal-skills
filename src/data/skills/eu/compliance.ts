import type { Skill } from '../../../types/skill';

/**
 * EU compliance skills — whistleblowing and the national measures transposing it.
 */
export const euComplianceSkills: Skill[] = [
  {
    id: 'eu-whistleblowing-channel-checker',
    name: 'Whistleblowing Channel Checker',
    description: 'Audits internal reporting channels and case handling against the EU whistleblower protection rules.',
    jurisdiction: 'eu',
    category: 'compliance',
    tags: ['programme-design', 'review', 'whistleblowing', 'reporting-channels', 'retaliation', 'speak-up', 'case-management'],
    sources: [
      { citation: 'Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'A minimum-standards directive operating through national transposition. Several Member States have gone materially further, including on the scope of reportable breaches and on anonymous reporting.' },
      { citation: 'National transposing measures of the Member States', authority: 'primary', publisher: 'Member State legislatures', jurisdiction: 'eu', note: 'The operative rules. They differ on whether anonymous reports must be accepted, whether group-level shared channels are permitted, on sanctions, and on whether scope extends beyond Union law to national law.' },
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Governs the handling of reporter and subject personal data, including the rights of the person reported on and the limits on deferring them.' },
      { citation: 'National data protection authority guidance on whistleblowing schemes', authority: 'guidance', publisher: 'Member State supervisory authorities', jurisdiction: 'eu', note: 'Several authorities impose specific requirements on retention, notification of the accused person and cross-border transfer of case files. These are not uniform.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'professional-services', 'technology', 'public-sector'],
    relatedSkills: ['uk-failure-to-prevent-fraud', 'uk-bribery-act-reviewer', 'eu-member-state-delta'],
    whatItDoes:
      'Audits a speak-up programme against the obligations that actually get enforced: whether the channel exists where it must, whether acknowledgement and feedback happen inside the deadlines, whether confidentiality is protected at the standard required, and whether the retaliation protections are understood by the people who make personnel decisions. It treats the national transposing measure as the operative law rather than the directive, which matters because Member States diverge sharply on anonymous reporting and on whether group-wide shared channels are permitted at all.',
    whenToUse:
      'When establishing or auditing a speak-up programme, when headcount in a Member State crosses the threshold, when centralising channels across a group, and after any report where the handling or the treatment of the reporter is questioned.',
    inputs: [
      { name: 'Entity and headcount map', description: 'Each legal entity, the Member State it operates in, and its headcount.', required: true },
      { name: 'Current channels', description: 'How reports can be made, who receives them, and whether the channel is internal or outsourced.', required: true },
      { name: 'Case handling process', description: 'Acknowledgement, triage, investigation, feedback and closure, with the timeframes actually achieved.', required: true },
      { name: 'Policy and communication', description: 'The policy, how it is published, and what reporters are told about external routes.' },
      { name: 'Data handling', description: 'Where case files are stored, who can access them, retention periods, and any cross-border transfer.' },
      { name: 'Case history', description: 'Report volumes, outcomes, and any allegation of retaliation or breach of confidentiality.' },
    ],
    outputs: [
      { name: 'Obligation map by entity', description: 'Which entities must have a channel, under which national measure, and by when.' },
      { name: 'Channel design assessment', description: 'Format, accessibility, independence and the personnel or function operating it.' },
      { name: 'Timeline compliance', description: 'Acknowledgement and feedback deadlines against what is actually achieved.' },
      { name: 'Confidentiality and anonymity review', description: 'Identity protection against the required standard, and the national position on anonymous reports.' },
      { name: 'Retaliation framework', description: 'The protections, the reversed burden of proof, and whether decision-makers understand them.' },
      { name: 'Data protection assessment', description: 'Lawful basis, the rights of the person reported on, retention and cross-border transfer of case files.' },
      { name: 'Remediation plan', description: 'Gaps with owners, dates and the sanctions exposure each one carries.' },
    ],
    prompt: `You are an EU compliance lawyer auditing an organisation's whistleblowing arrangements against the national measures transposing the whistleblower protection directive.

INPUTS
- Entities and headcount: <each legal entity, its Member State, and its headcount; note how headcount is counted locally and whether it fluctuates around the threshold>
- Current channels: <how reports can be made — portal, hotline, email, in person; who receives them; internal team or outsourced provider; languages offered>
- Case handling: <acknowledgement, triage, investigation, feedback and closure steps, and the timeframes actually achieved rather than those in the policy>
- Policy and communication: <the policy text, where it is published, whether it is given to staff and to third parties, and what it says about external reporting>
- Data handling: <where case files sit, who has access, retention periods, and any transfer outside the Member State or the Union>
- History: <report volumes, outcomes, and any allegation of retaliation, breach of confidentiality or reporter identification>

TASK
1. OPERATIVE LAW AND SCOPE. State that this is a minimum-standards directive operating through national transposition, and that Member States have gone further in several respects — some requiring anonymous reports to be accepted, some extending the material scope beyond breaches of Union law to national law generally, and some prohibiting or restricting shared group-level channels. Identify the applicable national measure for each entity and mark each divergence [VERIFY]. Do not audit against the directive text where a national measure exists.
2. OBLIGATION MAP. Determine which entities must establish an internal channel, applying the national headcount threshold and the way headcount is counted locally, which is not uniform. Address entities below the general threshold that are nonetheless caught regardless of size because of their sector, notably financial services, anti-money laundering, transport safety and environmental protection. Address public sector entities separately where relevant. Produce a table of entity, Member State, headcount, obligation, deadline and current status.
3. GROUP AND SHARING ARRANGEMENTS. Assess any centralised or group-wide channel carefully, since this is the most common structural defect in multinational programmes. Identify the national position on whether entities may share resources for receiving and investigating reports, the headcount band in which sharing is permitted where it is, and whether the local entity must in any event retain the ability to receive reports locally and to provide feedback locally. Note that several Member States have taken a restrictive position and that a single group hotline routed to headquarters may not discharge the local obligation. Where an outsourced provider is used, confirm the contractual terms meet the confidentiality and independence requirements.
4. CHANNEL DESIGN. Test the channel against the requirements: that it permits reporting in writing, orally, or both; that oral reporting is possible by telephone or other voice messaging and, on request, by physical meeting within a reasonable period; that any recording of an oral report is made lawfully and the reporter is given the opportunity to check, correct and sign the record; that the channel is secure so that confidentiality of the identity of the reporter and of any third party mentioned is protected; and that access is restricted to authorised staff. Check that an impartial person or function is designated to follow up, that they are genuinely independent of the areas they may investigate, and that conflicts are addressed where the report concerns senior management. Check accessibility for the people entitled to use it, which extends beyond employees to job applicants, former workers, shareholders, board members, contractors, subcontractors and suppliers — and confirm the channel is actually reachable by those groups and offered in the languages they use.
5. TIMELINE COMPLIANCE. Test the two deadlines against what the organisation actually achieves rather than what the policy states: acknowledgement of receipt within the prescribed period after the report, and feedback to the reporter within the prescribed maximum period. Mark both periods [VERIFY]. Set out what feedback must contain, which is information on the action envisaged or taken and the reasons for it, and note that the confidentiality of the investigation does not remove the feedback obligation. Identify whether the case management system measures and evidences these timings, because an organisation that cannot demonstrate them is treated as having missed them.
6. CONFIDENTIALITY AND ANONYMITY. Distinguish the two clearly, because they are routinely conflated. Confidentiality of the reporter's identity is required in all cases and may be disclosed only where that is a necessary and proportionate obligation imposed by Union or national law in the context of investigations or judicial proceedings — and the reporter must generally be informed before disclosure unless that would jeopardise the matter. Anonymity is different: whether anonymous reports must be accepted is left to Member States, and they have diverged. State the position for each relevant Member State. Then test the practical controls: access rights in the case system, whether identity is visible to line management, how reports about senior people are routed, and whether any prior case resulted in identification.
7. RETALIATION FRAMEWORK. Assess the protections and, more importantly, whether the people who make personnel decisions understand them. Cover the prohibited forms of retaliation, which extend well beyond dismissal to suspension, demotion, withheld promotion, duties transfer, reduced pay, changed hours, negative performance assessment, disciplinary measures, coercion, harassment, discrimination, non-conversion of a temporary contract, non-renewal, damage to reputation, blacklisting, early termination of a contract for goods or services, and withdrawal of a licence. Explain the reversal of the burden of proof: where a reporter shows they reported and suffered a detriment, it is for the organisation to prove the measure was based on duly justified grounds. Set out the practical consequence — that any adverse action affecting a known reporter requires a documented, independent and contemporaneous justification — and check whether decision-makers are told when someone is a reporter and whether there is a check before adverse action. Cover protection of facilitators and connected persons, and the prohibition on waiving these rights.
8. EXTERNAL AND PUBLIC REPORTING. Confirm the policy tells reporters clearly that they may report externally to the competent national authority, and that they are not required to report internally first. State the narrower conditions under which public disclosure attracts protection. Note that a policy discouraging external reporting, or implying internal reporting is mandatory, is itself a defect and undermines the organisation's position.
9. DATA PROTECTION. Assess the case handling against data protection obligations: the lawful basis, the prohibition on collecting data not relevant to handling the report and the requirement to delete it where inadvertently collected, retention periods for reports and for case files, security and access control, transfers of case files outside the Member State or outside the Union, and whether an impact assessment was carried out. Address the rights of the person reported on, including notification and access, and the limited and time-bound grounds for deferring them to protect the investigation — this is where national supervisory authorities have been most active. Confirm whether the record-keeping obligation for reports is met.
10. REMEDIATION. List each gap with an owner, a date and the sanctions exposure it carries, covering both penalties for failing to establish channels or for hindering reporting and the consequences of retaliation, which in several Member States include personal liability. Rank by exposure rather than by ease. Identify the cultural indicator worth tracking: a channel receiving no reports at all is more often evidence that people do not trust it than evidence that nothing is wrong.

RULES
- Audit against the national transposing measure for each entity, never the directive alone. Divergence on anonymous reporting and on group sharing is the point where multinational programmes most often fail.
- Keep confidentiality and anonymity separate throughout.
- Test the timelines against evidence of what actually happened, not against the policy.
- Never treat a single group-level hotline as automatically discharging local obligations.
- Treat the reversed burden of proof as the operative fact in any retaliation question, and check that decision-makers know who the reporters are before adverse action is taken.
- Mark acknowledgement and feedback periods, headcount thresholds, retention periods and penalty levels [VERIFY].

OUTPUT FORMAT
Open with which entities are non-compliant and the highest-exposure gap. Then the sections above, with the obligation map and timeline compliance as tables, closing with a ranked remediation plan showing owners, dates and sanctions exposure.`,
    example: {
      scenario:
        'A group with entities in five Member States routes all speak-up reports to a single headquarters hotline and reviews the arrangement after a reporter alleges they were identified.',
      result:
        'Three entities found obliged to maintain a locally reachable channel that the central hotline did not satisfy, with one Member State restricting group sharing outright, anonymous reporting mandatory in two of the five and unsupported by the current portal, acknowledgement met but feedback exceeding the maximum period in most cases with no system evidence of timing, the identification incident traced to case-system access granted to local line management, and the retaliation framework flagged because decision-makers were never told when an employee was a reporter before adverse action.',
    },
  },
];
