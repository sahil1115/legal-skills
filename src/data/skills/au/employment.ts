import type { Skill } from '../../../types/skill';

/**
 * Australian employment skills — award coverage and compliance, dismissal, superannuation, disconnection and the positive duty.
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
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.1.0',
    relatedSkills: ['au-modern-award-matcher', 'au-payday-super-compliance', 'au-unfair-dismissal-assessor'],
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
      { name: 'Criminal-offence review indicators', description: 'Facts that a lawyer must assess under the intentional underpayment offence, without any conclusion on intent.' },
      { name: 'Small business code check', description: 'Whether the Voluntary Small Business Wage Compliance Code is available and what compliance with it requires.' },
    ],
    prompt: `You are conducting an Australian modern award compliance audit. Methodology matters as much as arithmetic — build it so a regulator could follow it.

INPUTS
- Award and classification level: <as determined>
- Pay records: <per pay period: gross, base, overtime, penalties, allowances, loadings, superannuation>
- Time and roster records: <hours actually worked with start/finish times, breaks taken, public holidays, on-call>
- Employment terms: <contract, annualised wage arrangement or set-off clause, agreed allowances>
- Audit period: <from - to>

TASK
1. METHODOLOGY STATEMENT. Before any numbers, confirm the classification the reconstruction rests on. If the award or level has not been verified, or the duties actually performed may fit a different level, stop and run the award matcher first, because a wrong classification invalidates every figure that follows. Then set out the approach:
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
8. CRIMINAL-OFFENCE REVIEW INDICATORS. Since 1 January 2025, intentionally underpaying wages or entitlements can be a criminal offence; honest mistakes are not [CONFIRMED, Fair Work Ombudsman]. Do not conclude whether any conduct was intentional — that is a legal judgment on evidence and is outside this skill. Instead list factual indicators a lawyer must review before any disclosure decision: underpayments continuing after the issue was raised or known; payroll settings changed away from award rates; entitlements known to apply but not paid; inconsistent treatment of similar employees; records altered, missing or not kept; and the response to earlier complaints or audits. Record each indicator neutrally with its source, and flag that self-disclosure and legal advice decisions must be made with that advice. Do not state penalty figures.
9. SMALL BUSINESS CODE AND ENGAGEMENT. If the employer has fewer than 15 employees, assess whether the Voluntary Small Business Wage Compliance Code is available and what compliance with it requires, noting that the Fair Work Ombudsman cannot refer a small business employer for criminal prosecution where satisfied the employer complied with the Code for the underpayment [CONFIRMED; VERIFY Code conditions]. For all employers, identify engagement options with the Fair Work Ombudsman, including cooperation and self-reporting frameworks [VERIFY current policy].

RULES
- Never invent a pay rate, allowance amount or threshold. Use [RATE FROM CURRENT PAY GUIDE] and tell the user which pay guide and period to look up.
- Never net overpayments against underpayments without first establishing that a compliant set-off arrangement permits it.
- Show every calculation. An unexplained total is useless in a remediation or a disclosure.
- If the audit reveals a systemic issue rather than an individual one, say so and recommend widening the scope.
- Recommend legal advice before any disclosure to a regulator or any communication to affected employees.

OUTPUT FORMAT
Nine sections matching the tasks above, opening with the methodology statement. Close with a list of items requiring lawyer review, including every criminal-offence indicator.`,
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
  {
    id: 'au-payday-super-compliance',
    name: 'Payday Super Compliance Checker',
    description: 'Checks superannuation guarantee payments against Payday Super timing, qualifying earnings and remediation rules.',
    jurisdiction: 'au',
    category: 'employment',
    tags: ['workforce', 'review', 'superannuation', 'payroll', 'wage-compliance', 'underpayment'],
    sources: [
      { citation: 'Treasury Laws Amendment (Payday Superannuation) Act 2025 and Superannuation Guarantee Charge Amendment Act 2025', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'In force from 1 July 2026. Employers must pay superannuation guarantee for each payday, calculated on qualifying earnings, with contributions received by the fund within 7 business days subject to exceptions. Confirmed as at 2026-09-16.' },
      { citation: 'Superannuation Guarantee (Administration) Act 1992, as amended', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'The superannuation guarantee framework, charge, choice of fund and stapled fund rules.' },
      { citation: 'ATO Payday Super guidance, Payday Super Regulations and PCG 2026/1 (first-year compliance approach)', authority: 'regulator', publisher: 'Australian Taxation Office', jurisdiction: 'au', url: 'https://www.ato.gov.au', note: 'PCG 2026/1 was finalised on 28 January 2026 and sets the ATO’s compliance approach for the first year. Regulations released February 2026.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['au-award-compliance-checker', 'au-modern-award-matcher', 'au-unfair-dismissal-assessor'],
    whatItDoes:
      'Checks an employer’s superannuation guarantee practice against the Payday Super regime that replaced quarterly payment from 1 July 2026: whether super is calculated on qualifying earnings at the current rate for every payday, whether contributions reach the employee’s fund within the required window, how exceptions such as new employees and rejected contributions are handled, and whether choice of fund and stapled fund records support the payments. Where contributions are late or short, it structures the correction, the charge exposure and the records, taking account of the ATO’s first-year compliance approach.',
    whenToUse:
      'When moving payroll to Payday Super, after each pay run as a control check, when contributions are rejected or returned by funds, when a clearing house or payroll provider changes, and when remediating late or short payments. Not for: award wage underpayments (use the award compliance checker) or self-managed fund trustee obligations.',
    inputs: [
      { name: 'Pay run data', description: 'Paydays, employees, earnings components and superannuation calculated for each pay run.', required: true },
      { name: 'Payment timing records', description: 'When contributions were sent and when funds received or rejected them.', required: true },
      { name: 'Employee fund records', description: 'Choice of fund forms, stapled fund requests and fund details held.' },
      { name: 'Earnings definitions', description: 'How payroll classifies ordinary time earnings, allowances, overtime, bonuses and salary sacrifice.' },
      { name: 'Payment channel', description: 'Clearing house, payroll software or direct payment arrangements.' },
    ],
    outputs: [
      { name: 'Regime check', description: 'Which rules apply to each pay period, including periods straddling 1 July 2026.' },
      { name: 'Qualifying earnings review', description: 'Earnings components tested for inclusion, with calculation errors identified.' },
      { name: 'Timing compliance table', description: 'Each contribution’s payday, receipt date and whether it met the window or an exception.' },
      { name: 'Exceptions log', description: 'New employee, rejected contribution and other exception cases with their treatment.' },
      { name: 'Shortfall and charge exposure', description: 'Late or short contributions and the charge components that may apply.' },
      { name: 'Remediation plan', description: 'Correction steps, records and process fixes, taking account of the first-year approach.' },
    ],
    prompt: `You are an Australian superannuation and payroll compliance specialist checking superannuation guarantee practice under Payday Super.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- Payday Super from 1 July 2026: superannuation guarantee must be paid for each payday, calculated as a percentage of qualifying earnings, and received by the employee's fund within 7 business days, subject to exceptions [CONFIRMED, ato.gov.au].
- The rate is 12% of qualifying earnings [CONFIRMED]; qualifying earnings is a new concept bringing together ordinary time earnings and other payments [CONFIRMED; VERIFY component-level rules].
- Payday Super Regulations released February 2026 [CONFIRMED].
Compliance approach:
- PCG 2026/1 sets the ATO's first-year compliance approach, finalised 28 January 2026 [CONFIRMED; VERIFY its conditions before relying on it].

INPUTS
- Pay run data: <paydays, employees, earnings components, super calculated>
- Timing: <when contributions sent, received or rejected>
- Fund records: <choice forms, stapled fund requests, fund details>
- Earnings definitions: <how payroll classifies each component>
- Payment channel: <clearing house, software, direct>

TASK
1. SCOPE GATE. Confirm the payer is an employer with superannuation guarantee obligations for the workers in question. Where contractor status is in doubt, flag it rather than assuming. Separate pay periods before and after 1 July 2026, because earlier quarters remain under the previous rules.
2. MISSING INFORMATION. Identify pay runs without receipt dates and employees without fund details. A contribution cannot be shown to be on time without the fund's receipt date.
3. QUALIFYING EARNINGS. Test each earnings component against the definition of qualifying earnings — ordinary hours pay, allowances, overtime, bonuses, leave payments and salary sacrifice — and identify miscalculations. Mark any uncertain component [VERIFY].
4. TIMING. For each contribution, record the payday, the date sent and the fund receipt date, and test whether it was received within 7 business days of the payday. Show the business-day calculation, excluding weekends and public holidays in the applicable jurisdiction [VERIFY which holidays count].
5. EXCEPTIONS. Apply the exceptions with their own timing rules — for example new employees whose fund details are being obtained, contributions rejected and returned by a fund, and payments made outside the regular pay cycle [VERIFY the full list and timing]. Log each case and its treatment.
6. FUND RECORDS. Check that choice of fund was offered where required, that stapled fund requests were made for new employees without a nominated fund, and that records support the fund paid.
7. SHORTFALL AND CHARGE EXPOSURE. Identify late or short contributions and set out the charge components that may apply under the amended charge rules — the shortfall, any notional earnings or interest component, and administrative uplift — without calculating figures unless the user supplies the amounts [VERIFY components].
8. REMEDIATION. Set out correction steps: pay the shortfall, lodge any required statement or disclosure, fix payroll configuration and clearing house timing, and document. Assess whether the conditions of the first-year compliance approach apply.
9. LAWYER AND TAX ADVISER REVIEW TRIGGERS. Escalate: systemic shortfalls; contractor status questions; salary sacrifice arrangements; director penalty notice exposure; and disputes with employees about unpaid super.

RULES
- Separate periods before and after 1 July 2026.
- Label each item LAW, REGULATION, ATO GUIDANCE or BEST PRACTICE.
- Do not calculate charge amounts from assumed figures.
- Show every business-day calculation.

OUTPUT FORMAT
Open with the number of late or short contributions and the oldest unremediated item. Then the sections above, with qualifying earnings and timing as tables. Close with: Assumptions made; [VERIFY] points; Lawyer and tax adviser review items.`,
    example: {
      scenario:
        'A 250-employee retailer moving from quarterly to payday contributions finds its clearing house batches payments weekly and several funds rejected contributions for new starters.',
      result:
        'Pre and post 1 July 2026 periods separated, overtime found wrongly excluded from qualifying earnings for casual staff, weekly batching shown to push some contributions past the 7-business-day window with the calculations set out, rejected new-starter contributions logged under the relevant exception with stapled fund requests missing for three employees, charge components identified without inventing amounts, and remediation steps assessed against the first-year compliance approach.',
    },
  },
  {
    id: 'au-right-to-disconnect-triage',
    name: 'Right to Disconnect Triage',
    description: 'Applies the Fair Work reasonableness factors to an out-of-hours contact dispute and plans resolution steps.',
    jurisdiction: 'au',
    category: 'employment',
    tags: ['workforce', 'assessment', 'fair-work', 'right-to-disconnect', 'workplace-disputes', 'working-hours'],
    sources: [
      { citation: 'Fair Work Act 2009 (Cth), right to disconnect provisions', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'An employee may refuse to monitor, read or respond to out-of-hours contact unless the refusal is unreasonable, assessed against statutory factors. In force from 26 August 2024, and for employees of small business employers from 26 August 2025. Confirmed as at 2026-09-16.' },
      { citation: 'Modern award right to disconnect terms', authority: 'regulator', publisher: 'Fair Work Commission', jurisdiction: 'au', url: 'https://www.fwc.gov.au', note: 'Modern awards were varied to include a right to disconnect term.' },
      { citation: 'Fair Work Commission guidelines and Fair Work Ombudsman guidance on the right to disconnect', authority: 'guidance', publisher: 'Fair Work Commission; Fair Work Ombudsman', jurisdiction: 'au', url: 'https://www.fairwork.gov.au' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['au-unfair-dismissal-assessor', 'au-whs-psychosocial-hazard-assessor', 'au-modern-award-matcher'],
    whatItDoes:
      'Takes a disagreement about contact outside working hours and applies the statutory test: whether the employee’s refusal to monitor, read or respond was unreasonable, weighing the reason for the contact, how it was made and how disruptive it was, whether the employee is compensated for being available, the nature and seniority of the role, and the employee’s personal circumstances including caring responsibilities. It builds an auditable record for internal resolution and, if that fails, the path to the Fair Work Commission, and flags adverse action risk if the employer is considering discipline.',
    whenToUse:
      'When an employee refuses out-of-hours contact and the manager considers the refusal unreasonable, when an employee complains about excessive contact, before taking any disciplinary step connected to a refusal, and when designing availability, on-call or escalation arrangements. Not for: on-call pay disputes under an award (use the award compliance checker) or dismissals already made (use the unfair dismissal assessor).',
    inputs: [
      { name: 'The contact', description: 'Each contact or attempt, its time, channel, sender, content and urgency.', required: true },
      { name: 'The employee', description: 'Role, seniority, hours, award or agreement coverage, and employer size.', required: true },
      { name: 'Compensation for availability', description: 'Any allowance, on-call payment or salary loading for being available.' },
      { name: 'Personal circumstances', description: 'Caring or family responsibilities and other circumstances the employee has raised.' },
      { name: 'Steps taken', description: 'Discussions, directions, complaints and any disciplinary action considered.' },
    ],
    outputs: [
      { name: 'Coverage check', description: 'Whether the right applies to this employee and employer on the relevant dates.' },
      { name: 'Reasonableness analysis', description: 'Each statutory factor applied to the facts, with a balanced conclusion.' },
      { name: 'Adverse action risk', description: 'Whether contemplated action could be taken because the employee exercised a workplace right.' },
      { name: 'Resolution plan', description: 'Internal discussion steps and proposed arrangements.' },
      { name: 'FWC pathway', description: 'When and how either party may take the dispute to the Commission.' },
      { name: 'Decision record', description: 'An auditable record of facts, factors and outcome.' },
    ],
    prompt: `You are an Australian employment lawyer applying the Fair Work Act right to disconnect to an out-of-hours contact dispute.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- Right to disconnect for employees of non-small business employers from 26 August 2024, and for employees of small business employers (fewer than 15 employees) from 26 August 2025 [CONFIRMED, Fair Work Ombudsman].
- Refusal is permitted unless unreasonable, assessed by reference to the reason for the contact, how it is made and the disruption caused, whether the employee is compensated for remaining available or working additional hours, the nature of the role and level of responsibility, the employee's personal circumstances including family or caring responsibilities, and other relevant matters [CONFIRMED, Fair Work Commission].
- A refusal is unreasonable if the contact is required under a law [VERIFY wording].

INPUTS
- Contact: <each contact: time, channel, sender, content, urgency>
- Employee: <role, seniority, hours, award or agreement, employer size>
- Compensation: <allowance, on-call pay, loading>
- Personal circumstances: <caring or family responsibilities, other>
- Steps taken: <discussions, directions, complaints, disciplinary action considered>

TASK
1. SCOPE GATE. Confirm the worker is an employee of a national system employer and apply the commencement date for the employer's size to the dates of the contact. Contact from third parties such as clients is covered, as well as contact from the employer.
2. MISSING INFORMATION. Identify missing facts about the reason for each contact and compensation for availability. These factors often decide the outcome.
3. REASONABLENESS ANALYSIS. Apply each factor separately with the evidence, then weigh them together. Treat genuine emergencies, contact required by law, and roles that are paid to be available as pointing toward reasonable contact; treat routine non-urgent matters, repeated or disruptive contact, and significant caring responsibilities as pointing toward a reasonable refusal. Do not treat seniority alone as decisive.
4. ADVERSE ACTION RISK. The right to disconnect is a workplace right. Assess whether any contemplated discipline or detriment could be taken because the employee exercised it, and note the reversed onus in general protections claims.
5. RESOLUTION PLAN. Propose internal steps: a discussion, clarifying genuine after-hours needs, rostering an on-call arrangement with compensation, escalation protocols, and communication norms. Record agreed outcomes.
6. FWC PATHWAY. Set out that either party may apply to the Commission if the dispute is not resolved at the workplace level after genuine discussion, and the orders it can make [VERIFY procedure]. Note any dispute resolution term in the applicable award or agreement.
7. DECISION RECORD. Produce a dated record of the facts, each factor, the conclusion and the agreed outcome.
8. LAWYER REVIEW TRIGGERS. Escalate: any disciplinary step connected to a refusal; roles where contact is required by law; enterprise agreement terms that conflict; repeated disputes suggesting a psychosocial hazard; and any FWC application.

RULES
- Apply every factor; do not decide on a single one.
- Label each item LAW, AWARD OR AGREEMENT TERM, FWC GUIDELINES or BEST PRACTICE.
- Never recommend disciplining an employee for a refusal without the reasonableness analysis and adverse action assessment.

OUTPUT FORMAT
Open with the coverage conclusion and the reasonableness conclusion. Then the sections above, with the factor analysis as a table and the decision record as usable text. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A mid-level account manager with school-age children stops replying to client messages after 7pm, and her manager wants to issue a warning.',
      result:
        'Coverage confirmed for a non-small business employer, contact found mostly routine client queries with one genuine urgent outage, no availability allowance paid, caring responsibilities weighing toward a reasonable refusal, a warning assessed as carrying significant adverse action risk, and a resolution plan with a compensated on-call roster for genuine outages and a client communication protocol.',
    },
  },
  {
    id: 'au-positive-duty-sexual-harassment-assessment',
    name: 'Positive Duty Harassment Assessment',
    description: 'Assesses an organisation against the Sex Discrimination Act positive duty and the AHRC standards.',
    jurisdiction: 'au',
    category: 'employment',
    tags: ['workforce', 'programme-design', 'sexual-harassment', 'positive-duty', 'respect-at-work', 'risk-assessment'],
    sources: [
      { citation: 'Sex Discrimination Act 1984 (Cth), section 47C (positive duty)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Since 12 December 2022, employers and PCBUs must take reasonable and proportionate measures to eliminate, as far as possible, sex discrimination, sexual harassment, sex-based harassment, hostile work environments and related victimisation. Confirmed as at 2026-09-16.' },
      { citation: 'Australian Human Rights Commission Act 1986 (Cth), compliance functions', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Since 12 December 2023 the Commission can inquire into compliance, issue compliance notices, apply to court and accept enforceable undertakings. Confirmed.' },
      { citation: 'AHRC Guidelines for complying with the positive duty, including the Guiding Principles and Standards', authority: 'guidance', publisher: 'Australian Human Rights Commission', jurisdiction: 'au', url: 'https://humanrights.gov.au', note: 'The seven standards: leadership, culture, knowledge, risk management, support, reporting and response, and monitoring, evaluation and transparency.' },
      { citation: 'WHS laws on psychosocial hazards', authority: 'primary', publisher: 'State and Territory legislatures', jurisdiction: 'au', note: 'Sexual harassment is also a WHS hazard; the duties run in parallel.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['au-whs-psychosocial-hazard-assessor', 'uk-worker-protection-harassment-audit', 'au-unfair-dismissal-assessor'],
    whatItDoes:
      'Assesses an organisation’s prevention and response systems against the positive duty in the Sex Discrimination Act, using the Commission’s seven standards as the structure: leadership, culture, knowledge, risk management, support, reporting and response, and monitoring, evaluation and transparency. It works from a risk assessment of the organisation’s actual risk factors, tests what operates rather than what is written, identifies where the duty overlaps with WHS psychosocial obligations, and produces a prioritised plan proportionate to the organisation’s size and resources.',
    whenToUse:
      'When building or reviewing a harassment prevention programme, after a complaint or incident, when the Commission makes an inquiry, before a board reviews culture and conduct risk, and when entering higher-risk operating environments. Not for: investigating an individual complaint or UK preventative duty obligations (use the UK audit).',
    inputs: [
      { name: 'Organisation profile', description: 'Size, sectors, workforce composition, locations, and power structures.', required: true },
      { name: 'Risk factors', description: 'Customer or client-facing work, remote or isolated work, alcohol at events, gender imbalance, and hierarchy.', required: true },
      { name: 'Current systems', description: 'Policies, training, reporting channels, investigation process, support and data collected.', required: true },
      { name: 'Incident and survey data', description: 'Complaints, outcomes, exit and engagement survey findings.' },
      { name: 'Governance', description: 'Leadership accountability and board reporting on conduct.' },
    ],
    outputs: [
      { name: 'Duty scope check', description: 'The conduct covered and the organisation’s duty holders.' },
      { name: 'Risk assessment', description: 'Risk factors and where harm is most likely.' },
      { name: 'Standards assessment', description: 'Each of the seven standards rated on evidence.' },
      { name: 'WHS overlap map', description: 'Where psychosocial hazard duties apply to the same risks.' },
      { name: 'Prioritised action plan', description: 'Proportionate actions with owners and dates.' },
      { name: 'Evidence file', description: 'Records demonstrating measures taken.' },
    ],
    prompt: `You are an Australian discrimination and employment lawyer assessing compliance with the positive duty in the Sex Discrimination Act.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- Section 47C positive duty since 12 December 2022: take reasonable and proportionate measures to eliminate, as far as possible, sex discrimination, sexual harassment, sex-based harassment, hostile work environments on the ground of sex, and related victimisation [CONFIRMED, humanrights.gov.au].
- AHRC compliance functions since 12 December 2023: inquiries, compliance notices, court applications and enforceable undertakings [CONFIRMED].
Guidance:
- AHRC Guidelines, Guiding Principles and the seven Standards [CONFIRMED as guidance, not law].

INPUTS
- Organisation: <size, sectors, workforce, locations, power structures>
- Risk factors: <client-facing, remote or isolated work, alcohol, gender imbalance, hierarchy>
- Current systems: <policies, training, reporting, investigations, support, data>
- Data: <complaints, outcomes, surveys>
- Governance: <leadership accountability, board reporting>

TASK
1. SCOPE GATE. Confirm the organisation is an employer or PCBU subject to the Act and identify the conduct the duty covers, including conduct by workers, clients and customers where the organisation can influence it.
2. MISSING INFORMATION. Identify whether a risk assessment exists and what data is collected. Measures cannot be shown to be reasonable and proportionate without understanding the risks.
3. PROPORTIONALITY. Record the factors bearing on what is reasonable and proportionate: size, nature and circumstances of the business, resources, business and operational priorities, practicability and cost, and all other relevant facts.
4. RISK ASSESSMENT. Identify risk factors and where harm is most likely, including power imbalances, third-party exposure, isolated or remote work, events and travel, and workforce composition.
5. STANDARDS ASSESSMENT. Rate each of the seven standards on evidence of operation — leadership; culture; knowledge; risk management; support; reporting and response; and monitoring, evaluation and transparency — and state what would improve each rating.
6. WHS OVERLAP. Map where the same risks are psychosocial hazards under the applicable WHS or OHS laws, so controls serve both duties and are not duplicated. Route hazard management detail to the psychosocial hazard skill.
7. ACTION PLAN. Prioritise actions proportionate to the organisation, with owners and dates, beginning with the risks most likely to cause harm.
8. EVIDENCE FILE. List records that demonstrate measures taken and their review.
9. LAWYER REVIEW TRIGGERS. Escalate: open complaints; patterns involving senior people; any AHRC inquiry or notice; settlement terms restricting disclosure; and third-party harassment incidents.

RULES
- Assess operation on evidence, not policy existence.
- Label each item LAW, AHRC GUIDELINES, WHS LAW or BEST PRACTICE.
- Keep proportionality explicit; do not impose a large-enterprise programme on a small business.
- Do not decide individual complaints.

OUTPUT FORMAT
Open with the overall assessment and the three highest-risk gaps. Then the sections above, with the standards assessment as a table and a dated action plan. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A mining services company with fly-in fly-out camps and a predominantly male workforce reviews its prevention measures after two complaints involving supervisors.',
      result:
        'Duty scope confirmed including contractors at camp sites, risk assessment identifying camp accommodation, alcohol and supervisor power as the highest risks, standards rated with leadership and reporting weakest because complaints went to the supervisors’ own managers, WHS psychosocial overlap mapped, and a proportionate action plan starting with an independent reporting route and camp-specific controls.',
    },
  },
];
