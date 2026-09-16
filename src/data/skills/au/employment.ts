import type { Skill } from '../../../types/skill';

/**
 * Australian employment skills — award coverage and compliance, dismissal, pay and workplace duties.
 */
export const auEmploymentSkills: Skill[] = [
  {
    id: 'au-modern-award-matcher',
    name: 'Modern Award Matcher',
    description: 'Identifies which modern award covers a role and what classification level applies.',
    jurisdiction: 'au',
    category: 'employment',
    tags: ['workforce', 'assessment', 'modern-award', 'fair-work', 'classification', 'employment', 'coverage'],
    sources: [
      { citation: 'Fair Work Act 2009 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au' },
      { citation: 'Modern awards made by the Fair Work Commission', authority: 'regulator', publisher: 'Fair Work Commission', jurisdiction: 'au', url: 'https://www.fwc.gov.au', note: 'Award text and rates are varied at least annually. Always use the current published award.' },
      { citation: 'Fair Work Ombudsman guidance and pay guides', authority: 'guidance', publisher: 'Fair Work Ombudsman', jurisdiction: 'au', url: 'https://www.fairwork.gov.au' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['au-award-compliance-checker', 'us-worker-classification'],
    whatItDoes:
      'Answers the question Australian employers most often get wrong: whether an employee is covered by a modern award, which one, and at what classification level. It works through industry coverage and occupational coverage separately, tests the award-free arguments properly rather than assuming a salaried professional is automatically exempt, and lands on a classification level by matching the actual duties against the level descriptors — which is where the real money is, since a level error compounds across every entitlement.',
    whenToUse:
      'When hiring into a new role, when a role\'s duties have drifted, before setting a salary or an annualised wage arrangement, during a pay audit, or when an employee queries their classification.',
    inputs: [
      { name: 'Role description', description: 'Actual duties performed, not the job title — titles are unreliable for classification.', required: true },
      { name: 'Employer industry', description: 'The principal business activity of the employer, which drives industry coverage.', required: true },
      { name: 'Qualifications and experience', description: 'Formal qualifications, years of experience, and any required licences.' },
      { name: 'Supervision and autonomy', description: 'Who they report to, who they supervise, and how much discretion they exercise.' },
      { name: 'Current pay arrangement', description: 'Salary, hours, and any annualised wage or set-off clause.' },
    ],
    outputs: [
      { name: 'Coverage analysis', description: 'Industry and occupational coverage tested separately, with the candidate awards.' },
      { name: 'Award determination', description: 'The likely award, with the reasoning and any competing candidate.' },
      { name: 'Classification level', description: 'The level, matched to the descriptors against actual duties.' },
      { name: 'Award-free assessment', description: 'Whether an award-free argument is genuinely available.' },
      { name: 'Entitlements triggered', description: 'What follows from coverage — penalties, loadings, allowances, overtime.' },
      { name: 'Verification steps', description: 'Exactly what to check on the Fair Work Commission\'s published award text.' },
    ],
    prompt: `You are an Australian workplace relations adviser determining modern award coverage and classification.

INPUTS
- Actual duties performed: <describe the work in detail — not the job title>
- Employer's principal business activity: <required for industry coverage>
- Qualifications, licences and experience: <formal qualifications, years in the role>
- Reporting and supervision: <who they report to, who they supervise, level of autonomy and discretion>
- Current arrangement: <salary, hours worked, annualised wage arrangement or set-off clause, allowances paid>

TASK
1. COVERAGE ANALYSIS. Test both routes separately, because an employee can be covered by either:
   a. INDUSTRY COVERAGE: does the employer's principal business fall within an industry award's coverage clause? Identify the candidate industry award and quote the coverage description you are matching.
   b. OCCUPATIONAL COVERAGE: does the employee's occupation fall within an occupational award that applies across industries — for example clerical, professional, or trade-based awards? Identify candidates.
   Where both routes produce candidates, address which prevails and why. Where two industry awards could apply, apply the principal-purpose reasoning and say which is more likely.
2. AWARD-FREE ASSESSMENT: is there a genuine argument the employee is award-free? Address the real routes — no award covers the industry or occupation, the employee is a genuine manager or professional outside every classification descriptor, or the employee earns above the high income threshold AND has been given a guarantee of annual earnings that meets the statutory requirements. Be strict: paying a high salary does not by itself make someone award-free, and this is the most common and most expensive misconception. Mark the current high income threshold [VERIFY] — it is indexed annually.
3. CLASSIFICATION LEVEL: if covered, work through the classification descriptors and match the ACTUAL duties, qualifications, autonomy and supervisory responsibility to a level. Show the match descriptor by descriptor. Where the role straddles two levels, say so and identify the fact that would settle it — usually the level of independent judgement or the supervision exercised. Note that a job title is irrelevant to classification.
4. ENTITLEMENTS TRIGGERED: what coverage means in practice — minimum rate for the level, casual loading if relevant, overtime and penalty rates and when they apply, allowances (tool, vehicle, meal, first aid, travel, laundry), leave loading, span of ordinary hours, breaks, and rostering and notice rules. Then check the current pay arrangement: does it plausibly cover these entitlements? If there is an annualised wage arrangement or a set-off clause, address the conditions the award attaches to it, including any reconciliation and record-keeping requirements.
5. RISK: if the classification has been wrong, describe the exposure — the underpayment is calculated per pay period across the period of employment, plus superannuation, plus interest, and there are record-keeping consequences and civil penalty exposure including for accessorial liability. Do not state penalty figures; mark [VERIFY].
6. VERIFICATION: name exactly what to check — the current award text and coverage clause, the classification definitions in the relevant schedule, the current pay guide and rates, and any recent variation to the award. Say that award rates change at least annually and that the published award text governs.

RULES
- Never state a specific pay rate. Rates change annually and vary by level, age and employment type. Direct the user to the current pay guide.
- Classify on duties actually performed. Say this explicitly — reliance on the job title is the second most common error after assuming award-free status.
- If coverage is genuinely arguable, present both readings rather than picking one for neatness.
- Where the employee may be covered by an enterprise agreement instead, flag that it displaces the award and must be checked first.

OUTPUT FORMAT
Six sections matching the tasks above, opening with the coverage bottom line.`,
    example: {
      scenario:
        'A growing agency has hired a "Client Success Manager" on a salary and assumed the role is award-free because it is a professional position.',
      result:
        'Award-free argument rejected because the salary is below the high income threshold and no guarantee of annual earnings exists, likely clerical award coverage identified, a classification level matched from the duties with a note that the supervisory element could push it one level higher, and a set-off analysis showing the current salary may not cover overtime worked.',
    },
  },
  {
    id: 'au-award-compliance-checker',
    name: 'Award Compliance Checker',
    description: 'Audits pay and roster practice against award entitlements and quantifies any shortfall.',
    jurisdiction: 'au',
    category: 'employment',
    tags: ['workforce', 'assessment', 'wage-compliance', 'underpayment', 'audit', 'fair-work', 'payroll'],
    sources: [
      { citation: 'Fair Work Act 2009 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au' },
      { citation: 'Modern awards made by the Fair Work Commission', authority: 'regulator', publisher: 'Fair Work Commission', jurisdiction: 'au', url: 'https://www.fwc.gov.au', note: 'Award text and rates are varied at least annually. Always use the current published award.' },
      { citation: 'Fair Work Ombudsman guidance and pay guides', authority: 'guidance', publisher: 'Fair Work Ombudsman', jurisdiction: 'au', url: 'https://www.fairwork.gov.au', note: 'Rates change at least annually. Never rely on a remembered rate.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['au-modern-award-matcher'],
    whatItDoes:
      'Takes actual pay and roster data and reconstructs what the award required for the same period, entitlement by entitlement, so any shortfall can be quantified rather than estimated. It builds the methodology in the form Fair Work expects — per pay period, per entitlement, no netting of overpayments against underpayments unless properly available — and covers the parts most often missed: superannuation on the corrected figure, interest, record-keeping deficiencies, and the reconciliation duties attached to annualised wage arrangements.',
    whenToUse:
      'On a proactive pay audit, after a classification error is discovered, before a due-diligence process, when an employee raises a query, or when preparing a self-disclosure.',
    inputs: [
      { name: 'Applicable award and level', description: 'The award and classification level determined for the employee.', required: true },
      { name: 'Pay records', description: 'What was actually paid, per pay period, with the components broken out.', required: true },
      { name: 'Time and roster records', description: 'Hours actually worked, including start and finish times, breaks and public holidays.', required: true },
      { name: 'Employment terms', description: 'Contract, any annualised wage arrangement, set-off clause and allowances agreed.' },
      { name: 'Audit period', description: 'The period under review.' },
    ],
    outputs: [
      { name: 'Entitlement reconstruction', description: 'What the award required, per pay period, per entitlement.' },
      { name: 'Variance analysis', description: 'Actual versus required, with the gap shown and the calculation exposed.' },
      { name: 'Shortfall quantification', description: 'The total, broken down by entitlement type and period.' },
      { name: 'Consequential amounts', description: 'Superannuation on the corrected figure, interest and leave recalculations.' },
      { name: 'Record-keeping findings', description: 'Where records are inadequate, and what follows from that.' },
      { name: 'Remediation plan', description: 'The sequence for correcting, disclosing and preventing recurrence.' },
    ],
    prompt: `You are conducting an Australian modern award compliance audit. Methodology matters as much as arithmetic — build it so a regulator could follow it.

INPUTS
- Award and classification level: <as determined>
- Pay records: <per pay period: gross, base, overtime, penalties, allowances, loadings, superannuation>
- Time and roster records: <hours actually worked with start/finish times, breaks taken, public holidays, on-call>
- Employment terms: <contract, annualised wage arrangement or set-off clause, agreed allowances>
- Audit period: <from - to>

TASK
1. METHODOLOGY STATEMENT. Set out the approach before any numbers:
   - Reconstruct the entitlement PER PAY PERIOD, not as an annual average. This is the single most important methodological point: an employee paid an annual salary can be underpaid in some periods and overpaid in others, and the shortfall is generally not offset by the surplus unless a compliant set-off arrangement genuinely allows it.
   - Assess each entitlement separately — base rate, overtime, penalties, allowances, loadings.
   - State any assumption you must make because a record is missing, and flag that where records are inadequate the position is generally resolved against the employer.
2. ENTITLEMENT RECONSTRUCTION. For each pay period, calculate what the award required:
   - Ordinary hours at the minimum rate for the level, and hours falling outside the span of ordinary hours
   - Overtime, at the applicable rates and thresholds (daily and weekly)
   - Penalty rates: evenings, weekends, public holidays, shift work
   - Allowances: tool, vehicle, travel, meal, first aid, laundry, higher duties — check which the award provides and whether the facts trigger them
   - Loadings: casual loading, annual leave loading
   - Breaks: whether breaks were taken and the consequence in the award if they were not
   Show the calculation for each. Where you need the current rate, insert [RATE FROM CURRENT PAY GUIDE] rather than inventing a figure.
3. VARIANCE ANALYSIS: a table per pay period — required, actual, variance, and the entitlement driving it. Total by entitlement type and by period.
4. SET-OFF ANALYSIS: if there is an annualised wage arrangement or a set-off clause, assess whether it is effective — whether it is clear about which entitlements it absorbs, whether the award's conditions for such an arrangement are satisfied (including any notification, record-keeping and annual reconciliation requirements), and whether the reconciliation was actually performed. An ineffective set-off clause means the entitlements were payable in addition.
5. CONSEQUENTIAL AMOUNTS:
   - Superannuation recalculated on the corrected earnings, with the shortfall per quarter, and a note that unpaid superannuation carries its own consequences and charges
   - Interest
   - Annual leave and leave loading recalculated on the corrected rate
   - Termination payments recalculated where employment has ended
6. RECORD-KEEPING FINDINGS: assess the records against the statutory requirements — what must be kept, for how long, and in what form, including pay slip content and timing. Note that inadequate records shift the practical burden and are a separate contravention.
7. REMEDIATION PLAN: sequence the steps — complete the calculation, decide on scope (this employee or a cohort), correct payments, notify affected employees, consider self-disclosure, fix payroll configuration, fix classification, and set a review cadence. Note that self-disclosure and cooperation are relevant to how a regulator responds, and recommend obtaining advice before disclosing.

RULES
- Never invent a pay rate, allowance amount or threshold. Use [RATE FROM CURRENT PAY GUIDE] and tell the user which pay guide and period to look up.
- Never net overpayments against underpayments without first establishing that a compliant set-off arrangement permits it.
- Show every calculation. An unexplained total is useless in a remediation or a disclosure.
- If the audit reveals a systemic issue rather than an individual one, say so and recommend widening the scope.
- Recommend legal advice before any disclosure to a regulator or any communication to affected employees.

OUTPUT FORMAT
Seven sections matching the tasks above, opening with the methodology statement.`,
    example: {
      scenario:
        'A hospitality operator audits eighteen months of pay for a salaried supervisor who regularly worked Sundays and late evenings.',
      result:
        'A per-period reconstruction showing compliance in quiet months and shortfalls in every peak month, a set-off clause found ineffective because the required annual reconciliation was never performed, a quantified gap by entitlement type, and superannuation and interest calculated on the corrected figure.',
    },
  },
  {
    id: 'au-unfair-dismissal-assessor',
    name: 'Unfair Dismissal Risk Assessor',
    description: 'Assesses a proposed or completed termination against the unfair dismissal, redundancy and general protections regimes.',
    jurisdiction: 'au',
    category: 'employment',
    tags: ['workforce', 'assessment', 'unfair-dismissal', 'fair-work', 'redundancy', 'general-protections', 'termination'],
    sources: [
      { citation: 'Fair Work Act 2009 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Relied on for unfair dismissal eligibility and criteria, the genuine redundancy exception, general protections, and the National Employment Standards on notice and redundancy pay.' },
      { citation: 'Fair Work Regulations 2009 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au' },
      { citation: 'Small Business Fair Dismissal Code', authority: 'regulator', publisher: 'Fair Work Commission', jurisdiction: 'au', url: 'https://www.fwc.gov.au', note: 'Compliance with the Code makes a small business dismissal not unfair, but the Code is narrow and compliance must be demonstrable.' },
      { citation: 'Fair Work Commission guidance and benchbooks on dismissal applications', authority: 'guidance', publisher: 'Fair Work Commission', jurisdiction: 'au', url: 'https://www.fwc.gov.au' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['au-modern-award-matcher', 'au-award-compliance-checker'],
    whatItDoes:
      'Works a termination through the three regimes that can be run against it, which have different tests, different time limits and different remedies. It first settles eligibility to bring an unfair dismissal claim at all, then applies the harsh, unjust or unreasonable criteria to the process actually followed, then tests whether a redundancy is genuine including the consultation and redeployment limbs, and separately assesses general protections exposure where the employee has exercised a workplace right or has an attribute the decision may have touched. Where the dismissal has not yet happened, it identifies what to fix first.',
    whenToUse:
      'Before a dismissal is communicated, immediately after a termination where a claim looks likely, when planning a redundancy or restructure, and when an application has been filed and the response is being prepared.',
    inputs: [
      { name: 'Employment details', description: 'Start date, role, employer size, earnings, and whether an award or enterprise agreement covers the role.', required: true },
      { name: 'Reason for termination', description: 'The reason relied on, and any other reason that formed part of the decision.', required: true },
      { name: 'Process followed', description: 'Warnings, meetings, allegations put, opportunity to respond, support person, and the documents at each step.', required: true },
      { name: 'Employment type', description: 'Permanent, fixed term, casual, probationary, or a contractor arrangement being treated as employment.' },
      { name: 'Workplace rights exercised', description: 'Complaints, enquiries about entitlements, leave taken, union involvement, or claims made before the decision.' },
      { name: 'Redundancy facts', description: 'For a redundancy: what changed operationally, what consultation occurred, and what redeployment was considered across the group.' },
    ],
    outputs: [
      { name: 'Eligibility analysis', description: 'Whether the employee can bring an unfair dismissal claim, each threshold worked through on the facts.' },
      { name: 'Merits assessment', description: 'Each statutory criterion applied to the process actually followed, with the evidence for each.' },
      { name: 'Genuine redundancy test', description: 'For redundancies: the operational, consultation and redeployment limbs assessed separately.' },
      { name: 'General protections exposure', description: 'A separate assessment where a workplace right or protected attribute is in play, including the reversed onus.' },
      { name: 'Remedies and range', description: 'What could be ordered, and the drivers of any compensation figure.' },
      { name: 'Time limits', description: 'The application deadlines and what they mean for how long exposure stays open.' },
      { name: 'Remediation steps', description: 'Where the dismissal has not yet occurred, what to do before it does; where it has, what to document now.' },
    ],
    prompt: `You are an Australian employment lawyer assessing termination risk under the Fair Work Act.

INPUTS
- Employment: <start date, role, employer headcount including associated entities, annual earnings, award or enterprise agreement coverage>
- Employment type: <permanent, fixed term, casual, probationary, or a contractor arrangement>
- Reason relied on: <the stated reason, and any other reason that in fact formed part of the decision>
- Process: <warnings and their dates, meetings, allegations put in writing, opportunity to respond, support person offered, investigation, decision-maker>
- Workplace rights: <any complaint or enquiry about entitlements, leave taken, injury or claim, union involvement, discrimination complaint, or protected attribute relevant to the decision>
- Redundancy facts if applicable: <what changed operationally, when consultation began and with whom, what redeployment was considered across the employer and related entities>

TASK
1. ELIGIBILITY FOR UNFAIR DISMISSAL. Work through each threshold on the facts and show the reasoning:
   - Was the person dismissed, and when did the dismissal take effect? Address forced resignation and the non-renewal of a fixed term where that is in issue.
   - Has the minimum employment period been served? Note that the period is longer for a small business employer, how small business is counted including associated entities and casuals engaged on a regular and systematic basis, and how prior service transfers on a transfer of business.
   - Is the person covered by a modern award or enterprise agreement, or do their earnings sit below the high income threshold? Mark the threshold [VERIFY] and state what counts toward it.
   - Is the employer a national system employer?
   Conclude ELIGIBLE, NOT ELIGIBLE or UNCERTAIN, and say which fact would settle any uncertainty.
2. SMALL BUSINESS CODE. If the employer is a small business, assess compliance with the Small Business Fair Dismissal Code separately. Compliance makes the dismissal not unfair, but the Code is narrow: address summary dismissal for serious misconduct against dismissal for other reasons, the warning and opportunity requirements, and the evidentiary record needed to demonstrate compliance rather than assert it.
3. MERITS. Apply the harsh, unjust or unreasonable criteria one by one and state the evidence supporting each:
   - Was there a valid reason related to capacity or conduct, sound and defensible on the evidence rather than on assertion?
   - Was the person notified of that reason, before the decision was made?
   - Were they given an opportunity to respond, and was it a real one?
   - Was any request for a support person unreasonably refused?
   - For unsatisfactory performance, had they been warned about it beforehand?
   - What is the effect of the employer's size and of the presence or absence of dedicated human resources expertise?
   - Any other relevant matter, including length of service, the personal and economic consequences of dismissal, and disproportion between the conduct and the outcome.
   Then state the overall conclusion. Note that a valid reason does not save a dismissal where the process was deficient, and that a fair process does not save a dismissal without a valid reason.
4. GENUINE REDUNDANCY. If redundancy is relied on, test all three limbs, because failing any one puts the dismissal back into unfair dismissal territory:
   - Does the employer no longer require the job to be performed by anyone because of changes in operational requirements? Distinguish the job from the person, and address whether the same work is now being done under a different title or by a contractor.
   - Has the employer complied with any consultation obligation in the applicable award or enterprise agreement? Identify what that obligation requires, when it is triggered, and whether consultation happened before the decision was settled rather than after.
   - Would it have been reasonable in all the circumstances to redeploy the person within the employer or an associated entity? Address the whole group, and note that this is assessed objectively rather than by reference to what the employer chose to look at.
5. GENERAL PROTECTIONS. Assess this separately, whatever the unfair dismissal conclusion. Identify any workplace right exercised, any industrial activity, and any protected attribute. Ask whether adverse action was taken and whether any part of the reason for it was the right or attribute — a substantial and operative reason is enough, and it need not be the only one. Address the reverse onus: once the applicant establishes the adverse action and the right, it is for the employer to prove the reason. That makes contemporaneous documentation of the actual reasons, and the availability of the decision-maker to give evidence, decisive. Note that the eligibility thresholds and time limits differ from unfair dismissal, that there is no cap on compensation, and that penalties can apply.
6. NOTICE AND ENTITLEMENTS. Check notice against the National Employment Standards and any longer contractual or award notice, whether payment in lieu was correctly calculated, redundancy pay and any exclusion or reduction, accrued leave, and any award or agreement term adding severance or consultation payments.
7. TIME LIMITS AND REMEDIES. State the application periods and that they are short and run from the date the dismissal took effect. Set out the available remedies: reinstatement as the primary remedy, and compensation for lost remuneration subject to the statutory cap and to the criteria the Commission applies, including misconduct, mitigation and contingencies. Mark the cap [VERIFY]. Note that non-economic loss is not compensable in unfair dismissal but the position differs under general protections.
8. RECOMMENDATION. If the dismissal has not happened, list what to do before it does, in order. If it has, list what to document now, what not to do, and how the risks across the three regimes combine.

RULES
- Assess all three regimes. A dismissal that survives unfair dismissal can still be a general protections claim, and the applicant chooses the path.
- Do not treat a valid reason as sufficient. Process failures are the most common reason these dismissals are found unfair.
- Thresholds, caps and periods change. Give the structure and the test, mark every figure [VERIFY], and do not state one from memory as settled.
- Where the reason given differs from the real reason, say so. A reconstructed reason rarely survives the reverse onus.
- Never advise proceeding on the basis that the employee is unlikely to apply. Assess the merits.

OUTPUT FORMAT
Open with a risk rating across the three regimes and the single most important step to take next. Then the eight sections above, with a table for the merits criteria and a dated list of time limits.`,
    example: {
      scenario:
        'A mid-sized employer plans to dismiss a four-year employee for performance two weeks after they queried unpaid overtime.',
      result:
        'Eligibility confirmed with the minimum period well exceeded, only one of the required performance warnings found to be documented, and a finding that the timing against the overtime query created substantial general protections exposure with the burden falling on the employer to prove the reason — with a recommendation to pause, run a documented performance process, and have the decision made by someone who was not told about the query.',
    },
  },
];
