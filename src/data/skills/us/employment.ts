import type { Skill } from '../../../types/skill';

/**
 * US employment and workforce skills — classification, workforce reductions,
 * restrictive covenants, handbook policy and employer-side immigration.
 */
export const usEmploymentSkills: Skill[] = [
  {
    id: 'us-worker-classification',
    name: 'Worker Classification Tester',
    description: 'Tests a working arrangement against federal and state contractor-classification standards.',
    jurisdiction: 'us',
    category: 'employment',
    tags: ['workforce', 'assessment', 'worker-classification', 'independent-contractor', 'abc-test', 'employment', 'misclassification'],
    sources: [
      { citation: 'Fair Labor Standards Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.govinfo.gov' },
      { citation: 'IRS common-law control test for worker status', authority: 'regulator', publisher: 'Internal Revenue Service', jurisdiction: 'us', url: 'https://www.irs.gov' },
      { citation: 'US Department of Labor wage and hour guidance on worker classification', authority: 'guidance', publisher: 'Wage and Hour Division, US Department of Labor', jurisdiction: 'us', url: 'https://www.dol.gov', note: 'Agency position on the federal standard has changed with successive administrations and has been the subject of litigation. Confirm the position in force before relying on it.' },
      { citation: 'State independent-contractor statutes, including ABC-style tests', authority: 'primary', jurisdiction: 'us', note: 'The governing test differs by state and by purpose (wage, tax, benefits, unemployment insurance). Confirm the test for the worker’s state.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.1.0',
    relatedSkills: ['us-fifty-state-survey', 'au-modern-award-matcher', 'us-employment-policy-checker'],
    whatItDoes:
      'Runs a described working arrangement through the classification tests that actually apply to it — the federal economic-reality analysis, the IRS common-law factors, and whichever state test governs where the worker sits, including the stricter ABC-style tests. It reports each test separately, because an arrangement can pass one and fail another, and identifies the specific facts that drive the risk so they can be changed rather than merely worried about.',
    whenToUse:
      'Before engaging a contractor, when a contractor relationship has quietly grown into something full-time, during an audit or a benefits claim, or when finance asks why a "vendor" has a company laptop and a manager.',
    inputs: [
      { name: 'Working arrangement', description: 'How the work is actually performed: control, schedule, tools, supervision, exclusivity, duration.', required: true },
      { name: 'Worker location', description: 'The state where the worker performs the work — this selects the applicable test.', required: true },
      { name: 'Business type', description: 'Your industry and what your usual course of business is.' },
      { name: 'Contract terms', description: 'The written agreement, if there is one.' },
      { name: 'Payment structure', description: 'Hourly, per project, retainer, expenses, benefits.' },
    ],
    outputs: [
      { name: 'Test-by-test analysis', description: 'Result under each applicable federal and state test, run separately.' },
      { name: 'Risk factors', description: 'The specific facts pushing toward employee status, ranked by weight.' },
      { name: 'Remediation options', description: 'Changes that would strengthen contractor status, and what each costs operationally.' },
      { name: 'Exposure estimate', description: 'The categories of liability that follow from misclassification.' },
      { name: 'Facts to confirm', description: 'Where the analysis depends on facts not supplied.' },
    ],
    prompt: `You are a US employment lawyer assessing worker classification risk.

INPUTS
- How the work is actually performed: <control over how/when work is done, schedule, location, tools and equipment, supervision, exclusivity, duration, integration into teams>
- Worker's state: <required — this selects the state test>
- Our industry and usual course of business: <required for ABC-style prong B>
- Written agreement: <paste, or "none">
- Payment structure: <hourly / project / retainer; expenses; benefits; other clients>

TASK
1. IDENTIFY THE TESTS that apply: the federal standard for wage-and-hour purposes, the IRS common-law analysis for tax purposes, and the test used by the worker's state. Name each and say what it governs — misclassification exposure is not a single question. Do not assume one universal test exists; if the worker's state has not been supplied, treat that as the threshold question and say the state analysis cannot proceed without it.
2. RUN EACH TEST SEPARATELY. For each factor or prong: the facts supplied, which way they point, and how much weight the factor carries. Conclude per test: likely employee / likely contractor / genuinely uncertain.
3. RISK FACTORS: rank the specific facts driving employee status. Be concrete — "the worker attends the daily standup and reports to a named manager" beats "there is some control".
4. REMEDIATION: for each risk factor, the change that would help, and the operational cost of making it. Distinguish changes to the paperwork from changes to how the work is actually done — and say plainly that only the latter changes the analysis.
5. EXPOSURE: the categories of liability if the classification is wrong (unpaid wages and overtime, employment taxes, benefits, penalties, and any state-specific consequences). Describe categories; do not invent penalty figures.
6. FACTS TO CONFIRM: what you would need to know to firm up an uncertain conclusion.

RULES
- Never state a state's test as settled unless you are confident; mark uncertain rules [VERIFY] and say what to check.
- The federal standard has moved with successive agency positions and litigation. Mark it [VERIFY] and say the current position must be confirmed rather than assumed.
- Under ABC-style tests, treat prong B (outside the usual course of business) as usually decisive, and analyse it first.
- A written contract calling someone a contractor carries little weight; say so, and analyse the substance.
- Do not give a single overall verdict when the tests genuinely diverge. Report the divergence.

OUTPUT FORMAT
Six sections matching the tasks above, opening with a one-paragraph bottom line.`,
    example: {
      scenario:
        'A design agency has used the same "contractor" for two years, 35 hours a week, on client work, with an agency email address and a manager.',
      result:
        'Likely employee under every test run, with prong B identified as decisive because the work is the agency’s core service — plus a remediation list separating cosmetic contract fixes from the substantive changes that would actually matter.',
    },
  },
  {
    id: 'us-warn-act-trigger-spotter',
    name: 'WARN Act Trigger Spotter',
    description: 'Tests whether a workforce reduction may trigger federal WARN or a state mini-WARN duty.',
    jurisdiction: 'us',
    category: 'employment',
    tags: ['workforce', 'assessment', 'warn-act', 'layoffs', 'reduction-in-force', 'plant-closing', 'notice'],
    sources: [
      { citation: 'Worker Adjustment and Retraining Notification Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.govinfo.gov', note: 'Coverage thresholds, the definition of an employment loss, the notice period and the exceptions all come from the statute and its regulations. Read the current text; do not rely on a remembered figure.' },
      { citation: 'US Department of Labor regulations and guidance on WARN', authority: 'regulator', publisher: 'Employment and Training Administration, US Department of Labor', jurisdiction: 'us', url: 'https://www.dol.gov', note: 'The regulations define counting rules and aggregation. Departmental guidance is persuasive, not binding, and courts have not always followed it.' },
      { citation: 'State mini-WARN statutes', authority: 'primary', jurisdiction: 'us', note: 'Several states impose lower coverage thresholds, longer notice periods, additional recipients or severance obligations, and some have no analogue at all. Identify every state with affected employees and check each separately.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-fifty-state-survey', 'us-employment-policy-checker'],
    whatItDoes:
      'Takes a planned or already-executed workforce action and works out whether a notice obligation may exist — federally and in every state where affected employees sit. The analysis that catches people out is rarely the headline layoff: it is the aggregation of smaller reductions across a rolling window, the treatment of a site with remote workers assigned to it, and the employees whose reduced hours or transfer refusal counts as a loss. It runs coverage, site, employment-loss counting, timing and the exceptions as separate questions, and it treats every threshold as something to verify rather than recall.',
    whenToUse:
      'While a restructuring is still being modelled, before any reduction is announced, when a series of smaller cuts is starting to add up, or when a site closure, sale or relocation is contemplated.',
    inputs: [
      { name: 'The planned action', description: 'What is happening — layoff, site closure, relocation, sale, furlough or hours reduction — and the intended dates.', required: true },
      { name: 'Affected employees', description: 'Numbers by location and state, with full-time versus part-time status and hours worked.', required: true },
      { name: 'Employer profile', description: 'Total headcount, corporate structure, affiliates, and total hours worked across the workforce.', required: true },
      { name: 'Site information', description: 'Physical locations, which employees report to which site, and how remote employees are assigned.' },
      { name: 'Prior and planned reductions', description: 'Any other separations in the preceding and following months, with dates and numbers.' },
      { name: 'Circumstances', description: 'Anything bearing on an exception — unforeseeable business circumstances, a failing company, a natural disaster, or a strike or lockout.' },
    ],
    outputs: [
      { name: 'Coverage analysis', description: 'Whether the employer appears covered, with the counting rules applied and the single-employer question addressed.' },
      { name: 'Site determination', description: 'What the site of employment appears to be for each group, including remote and mobile workers.' },
      { name: 'Employment-loss count', description: 'Who counts as suffering an employment loss, with aggregation across the rolling window shown as working.' },
      { name: 'Trigger assessment', description: 'Whether a plant closing or mass layoff threshold appears to be met, per site and per state.' },
      { name: 'State mini-WARN analysis', description: 'A separate answer for every state with affected employees, including states with no analogue.' },
      { name: 'Notice plan', description: 'Who must be notified, what the notice must contain, and the timing working backwards from the action date.' },
      { name: 'Exception analysis', description: 'Whether any exception is arguable, and what it would and would not excuse.' },
      { name: 'Structuring options', description: 'Changes to timing or sequencing that alter the analysis, with the risk of each flagged.' },
    ],
    prompt: `You are a US employment lawyer assessing whether a workforce reduction triggers a notice obligation under the federal WARN Act and any state mini-WARN law. Every threshold, count and period in this area is set by statute and regulation and must be verified at source. Do not state a number from memory.

INPUTS
- The action: <layoff / site closure / relocation / sale of business / furlough / hours reduction>, planned dates
- Affected employees: <numbers by location and state; full-time vs part-time; average hours; length of service>
- Employer: <total US headcount, total hours worked across the workforce, corporate structure, affiliates and common ownership>
- Sites: <physical locations; which employees report to which site; how remote and mobile employees are assigned>
- Other reductions: <any separations in the months before and after, with dates and numbers>
- Circumstances: <anything relevant to an exception — unforeseen events, company financial position, disaster, labour dispute>

TASK
1. COVERAGE. Is the employer covered? Set out the coverage test as the statute and regulations frame it — headcount and, where relevant, aggregate hours — and apply the supplied figures. Address whether affiliated entities may be treated as a single employer, and identify which facts drive that. Mark every threshold [VERIFY] and name the source to check.
2. SITE OF EMPLOYMENT. Determine the site for each affected group. This is where the analysis most often goes wrong: separate buildings may or may not be one site, and remote, travelling and outstationed workers are assigned by rule rather than by where they physically sit. Give your determination for each group with a confidence marker and say what would change it.
3. EMPLOYMENT LOSS. For each affected employee or group, does the action amount to an employment loss as defined? Address terminations, layoffs exceeding the defined duration, and reductions in hours meeting the defined test. Then apply the aggregation rule: separations across a rolling look-back and look-forward window count together unless they are genuinely separate causes. Show the counting as working, not as a conclusion.
4. TRIGGER ASSESSMENT. Per site and per state, does the count appear to reach a plant closing or a mass layoff as defined? Give the answer as "appears to trigger / appears not to trigger / cannot determine on these facts", never as a certainty, and state which figure the answer turns on.
5. STATE MINI-WARN. List every state with affected employees. For each, address separately: whether that state has an analogue at all, whether its coverage threshold is lower, whether its notice period is longer, whether it requires additional recipients or content, and whether it imposes any severance or continuation obligation. Mark each answer [VERIFY] against that state's own statute — never generalise one state's rule to another, and never assume a state has or lacks a law.
6. NOTICE PLAN. If notice appears required: who must receive it (affected employees or their representatives, and the state and local recipients the law designates), what the notice must contain, and the timing worked backwards from the intended action date. Show the calendar and mark the counting convention [VERIFY].
7. EXCEPTIONS. Assess each exception the statute provides on these facts. For each: whether it is arguable, what it requires the employer to prove, and — critically — that most exceptions shorten notice rather than eliminate it, and generally still require notice with a statement of the reason for the reduced period. Never conclude an exception applies; state the argument and what evidence would be needed.
8. STRUCTURING OPTIONS. Changes to timing, sequencing, phasing or scope that would change the analysis, each with a plain warning: an action structured specifically to evade the counting rules can be aggregated anyway and can itself become evidence. Present these as options for counsel, not recommendations.

RULES
- Never state a coverage threshold, an employee count, a notice period, a look-back window or an hours figure from memory. Describe what the rule measures, mark it [VERIFY], and name the source.
- Identify every state with affected employees and analyse each one separately. Do not answer for "the states" collectively.
- Never conclude that no notice is required. The correct output is "on these figures the threshold does not appear to be met, subject to verification of X and Y".
- Where a reduction has already occurred or is imminent and the analysis suggests notice may have been required, say so in the first line and recommend immediate qualified counsel.
- Do not invent penalty or damages figures. Describe the categories of exposure.
- Flag that a sale of business, a relocation, or a furlough later extended can each convert into a notice event, and that a decision maker's announcement date is not always the operative date.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with a bottom line stating whether a trigger appears likely, the earliest date notice would need to go out if so, and the single figure the answer most depends on.`,
    example: {
      scenario:
        'A company plans to close one distribution centre and separately reduce hours for staff at two other sites in different states, all within the same quarter.',
      result:
        'A site determination treating one group of remote workers as assigned to the closing site, an aggregation analysis combining the three actions across the rolling window so the count appears to reach the mass-layoff threshold, separate answers for all three states including one with a longer notice period, a backwards-worked notice calendar, and a warning that phasing the cuts to avoid aggregation would not necessarily work.',
    },
  },
  {
    id: 'us-non-compete-mapper',
    name: 'Non-Compete Enforceability Mapper',
    description: 'Maps a restrictive covenant against the governing state’s law and flags the volatile parts.',
    jurisdiction: 'us',
    category: 'employment',
    tags: ['workforce', 'assessment', 'non-compete', 'restrictive-covenants', 'non-solicit', 'state-law', 'regulatory-change'],
    sources: [
      { citation: 'State statutes and case law governing restrictive covenants', authority: 'primary', jurisdiction: 'us', note: 'This is state law, it differs sharply between states, and several states have amended it in recent legislative sessions. The governing state must be identified before any rule is applied, and the current text must be checked every time.' },
      { citation: 'Federal Trade Commission activity concerning non-compete clauses', authority: 'regulator', publisher: 'Federal Trade Commission', jurisdiction: 'us', url: 'https://www.ftc.gov', note: 'Federal action in this area has been contested and its status has changed over time. Confirm the current position before treating any federal measure as operative — and note that federal activity does not by itself determine enforceability under state law.' },
      { citation: 'State trade secret statutes and the federal trade secret cause of action', authority: 'primary', jurisdiction: 'us', url: 'https://www.govinfo.gov', note: 'Trade secret protection is a separate route that survives independently of covenant enforceability, and is often the more durable protection.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-fifty-state-survey', 'us-employment-policy-checker'],
    whatItDoes:
      'Structures the enforceability question for a restrictive covenant without pretending the answer is stable. It fixes the governing state first — which is not always the state named in the contract — then separates the covenant types, because a non-compete, a customer non-solicit, an employee non-solicit and a confidentiality clause are governed differently and often survive each other. It works through the role, consideration, duration, geography and activity scope, identifies which state-specific conditions may apply, and treats the whole area as legally volatile: every rule is presented as something to check against current law rather than recalled.',
    whenToUse:
      'Before presenting an agreement to a candidate or employee, when someone with a covenant is leaving or being hired, when standardising covenants across a multi-state workforce, or when a covenant is entered as part of a sale of a business.',
    inputs: [
      { name: 'The covenant text', description: 'The restrictive covenant clauses in full, including definitions and any severability or reformation language.', required: true },
      { name: 'Governing state', description: 'The state where the employee works and lives, plus any choice-of-law and forum clause in the agreement.', required: true },
      { name: 'Employee details', description: 'Role, seniority, access to confidential information or customer relationships, and whether they are exempt or non-exempt.', required: true },
      { name: 'Compensation', description: 'Salary and total compensation — several states condition enforceability on a compensation level.' },
      { name: 'Restriction parameters', description: 'Duration, geographic scope, and the activities or customers restricted.' },
      { name: 'Context', description: 'When and why it was signed — at hire, mid-employment, on promotion, on severance, or as part of a sale of a business or equity.' },
    ],
    outputs: [
      { name: 'Governing law analysis', description: 'Which state’s law is likely to apply and whether the choice-of-law clause will be respected.' },
      { name: 'Covenant breakdown', description: 'Each covenant type separated out, since they are assessed and survive independently.' },
      { name: 'Enforceability factors', description: 'The factors the governing state weighs, applied to the supplied facts with confidence markers.' },
      { name: 'State-specific conditions', description: 'Notice, compensation, role or sector conditions the state may impose, each flagged for verification.' },
      { name: 'Volatility flags', description: 'Which parts of the analysis are most likely to have changed, and the federal-versus-state distinction stated plainly.' },
      { name: 'Redraft options', description: 'Narrowing that would improve the position, and what protection is lost by each narrowing.' },
      { name: 'Alternative protections', description: 'Trade secret, confidentiality, garden leave and forfeiture routes that do not depend on covenant enforceability.' },
    ],
    prompt: `You are a US employment lawyer assessing a restrictive covenant. Treat this as one of the most volatile areas of US employment law: it is governed by state law, it differs sharply from state to state, it changes with almost every legislative session, and there has been contested federal activity. Assume nothing you recall is current.

INPUTS
- Covenant text: <paste the clauses in full, with definitions, severability and reformation language>
- Employee's state of residence and work: <required>
- Choice of law and forum in the agreement: <state, or "none">
- Employee: <role, seniority, duties, access to confidential information, customer relationships, exempt or non-exempt>
- Compensation: <base and total; note if it changed when the covenant was signed>
- Restriction parameters: <duration, geographic scope, restricted activities, restricted customers or accounts>
- Context of signing: <at hire / mid-employment / on promotion / on severance / as part of a sale of a business or equity>

TASK
1. GOVERNING LAW. Determine which state's law is likely to govern. Address the choice-of-law clause, whether the employee's home state would respect it — some states refuse to enforce a foreign choice of law for their resident employees, and some give employees a forum right — and what happens if the employee has moved. If the state has not been supplied, stop: the analysis cannot proceed, and say so rather than picking a default.
2. SEPARATE THE COVENANTS. Break the clause set into its distinct restraints: non-compete, customer non-solicit, employee non-solicit or anti-raid, confidentiality, invention assignment, and any forfeiture or repayment provision. These are assessed under different standards, and one can fall while the others stand. Analyse each separately from here on.
3. ENFORCEABILITY FACTORS. For the governing state, set out the framework it applies — whether by statute, by case law, or both — and apply it to the facts. Address at least: whether a protectable interest exists on these facts; whether consideration was adequate for the timing of signing, particularly if signed mid-employment; whether the duration is proportionate; whether the geographic scope is proportionate to where the employee actually worked; and whether the activity scope is tied to what the employee actually did rather than to everything the employer does. Mark each conclusion [CONFIRMED], [INFERRED], [UNKNOWN] or [VERIFY].
4. STATE-SPECIFIC CONDITIONS. Identify conditions the governing state may impose that operate independently of reasonableness — for example a compensation floor, a role or sector exclusion, an advance-notice or review-period requirement before signing, a requirement that the covenant be provided with an offer, a garden-leave or continued-payment condition, or a rule about which employees may be bound at all. Mark every one [VERIFY] and say what to read. Never state such a condition exists, or does not exist, unless you are confident.
5. VOLATILITY. State plainly which parts of this analysis are most likely to be out of date, and separate federal from state clearly: federal activity concerning non-competes has been contested and changeable, and no federal measure by itself determines whether a covenant is enforceable under the governing state's law. Do not assert the current status of any federal measure. Say what must be checked and where.
6. REFORMATION. Say how the governing state is likely to treat an overbroad covenant — whether courts there may narrow it, strike the offending part, or void it entirely — because this determines whether aggressive drafting is merely unenforceable or actively harmful. Mark it [VERIFY].
7. REDRAFT OPTIONS. Concrete narrowing that would improve the position: shorter duration, geography tied to the employee's actual territory, activity scope tied to actual duties, a customer list limited to those the employee served within a defined period. For each, state the protection given up. Where the sale-of-a-business context applies, note that covenants there are commonly assessed differently and say that separately.
8. ALTERNATIVE PROTECTIONS. Routes that do not depend on covenant enforceability: trade secret protection, a properly scoped confidentiality obligation, invention assignment, garden leave, deferred compensation and forfeiture structures, and exit processes that actually evidence what the employee took. In many states these are the durable protection and the covenant is the fragile one.

RULES
- Identify the governing state before applying any rule. Never answer for "most states" or generalise one state's rule to another.
- Never state a state's position as settled unless you are confident. Prefer [UNKNOWN] and a research instruction to a plausible statement of a rule that may have been amended.
- Never claim that a federal rule determines enforceability, and never assert the current status of contested federal activity. Describe the question and mark it [VERIFY].
- Do not invent a duration limit, a compensation threshold, a notice period or a statutory section.
- Never conclude a covenant is enforceable or unenforceable. Produce the analysis and state that current state law must be confirmed by a qualified lawyer in that state.
- Where the employee is already at a competitor, or a deadline for seeking relief may be running, say so first and recommend immediate counsel.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with a bottom line that names the governing state, the weakest covenant in the set, and the single point most in need of current verification.`,
    example: {
      scenario:
        'A senior sales employee based in one state, under an agreement choosing another state’s law, has a twelve-month nationwide non-compete and a customer non-solicit, and has resigned to join a competitor.',
      result:
        'A governing-law analysis concluding the home state is likely to apply its own rule despite the clause, the non-compete and the non-solicit assessed separately with the nationwide geography flagged as the weakest element, three state-specific conditions marked for verification, an explicit statement that contested federal activity does not resolve the state question, and an alternative-protection section pointing at trade secret and customer-list routes.',
    },
  },
  {
    id: 'us-employment-policy-checker',
    name: 'Employment Policy Compliance Checker',
    description: 'Reviews a handbook or policy against federal, state and local employment requirements.',
    jurisdiction: 'us',
    category: 'employment',
    tags: ['workforce', 'review', 'handbook', 'policy', 'wage-and-hour', 'leave', 'accommodations'],
    sources: [
      { citation: 'Fair Labor Standards Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.govinfo.gov', note: 'Federal wage and hour baseline. State and local law frequently imposes more, and the stricter rule generally governs.' },
      { citation: 'Family and Medical Leave Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.dol.gov' },
      { citation: 'Federal anti-discrimination statutes enforced by the EEOC', authority: 'primary', publisher: 'US Equal Employment Opportunity Commission', jurisdiction: 'us', url: 'https://www.eeoc.gov', note: 'Includes accommodation obligations. Commission guidance is persuasive rather than binding; distinguish the two.' },
      { citation: 'National Labor Relations Act', authority: 'primary', publisher: 'National Labor Relations Board', jurisdiction: 'us', url: 'https://www.nlrb.gov', note: 'Protected concerted activity constrains handbook language for non-union as well as union workforces. Board doctrine on facially neutral rules has shifted repeatedly.' },
      { citation: 'State and local employment statutes and ordinances', authority: 'primary', jurisdiction: 'us', note: 'Leave, pay transparency, scheduling, monitoring and final-pay rules vary by state and often by city. Identify every jurisdiction where employees work before applying any rule.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-worker-classification', 'us-fifty-state-survey', 'us-warn-act-trigger-spotter'],
    whatItDoes:
      'Reads a handbook or a specific policy and produces an issue list organised by the area of law it touches — wage and hour, leave, termination and final pay, accommodations, monitoring and privacy, and protected employee rights — with a separate pass for the state and local layer, which is where most multi-state handbooks fail. It distinguishes a policy that is unlawful from one that is merely risky or unclear, flags language that is lawful in one state and not in another, and identifies the policies that are missing altogether rather than only reviewing what is on the page.',
    whenToUse:
      'On an annual handbook review, when expanding into a new state or city, after an employee complaint or agency charge, or when rolling out a monitoring, remote-work or leave policy.',
    inputs: [
      { name: 'The policy text', description: 'The handbook or the specific policies to review, in full.', required: true },
      { name: 'Employee locations', description: 'Every state and, where relevant, city where employees work — including remote workers.', required: true },
      { name: 'Workforce profile', description: 'Headcount overall and per location, exempt and non-exempt mix, and any union representation.', required: true },
      { name: 'Business context', description: 'Industry, whether the employer is a federal contractor, and any sector-specific regime that applies.' },
      { name: 'Known issues', description: 'Complaints, charges, audits or disputes that prompted the review.' },
    ],
    outputs: [
      { name: 'Issue list by area', description: 'Findings grouped by area of law, each rated as likely unlawful, risky, unclear or acceptable.' },
      { name: 'Jurisdiction overlay', description: 'Where a policy works in one location and fails in another, listed per state or city.' },
      { name: 'Missing policies', description: 'Required or expected policies that are absent, with what triggers the requirement.' },
      { name: 'Protected-rights review', description: 'Language that may chill protected concerted activity or lawful off-duty conduct.' },
      { name: 'Suggested language', description: 'Redrafts for the highest-risk provisions, marked for legal review.' },
      { name: 'Prioritised remediation plan', description: 'What to fix first, weighted by exposure and by how many employees the policy touches.' },
    ],
    prompt: `You are a US employment lawyer reviewing an employee handbook or policy set. Employment law here is federal, state and local at once, and the stricter rule usually governs — so identify every jurisdiction where employees work before applying any rule.

INPUTS
- Policy text: <paste the handbook or the specific policies>
- Employee locations: <every state and city where employees work, including remote workers; note headcount at each>
- Workforce: <total headcount, exempt vs non-exempt, union representation, contractor population>
- Business context: <industry, federal contractor status, sector-specific regimes>
- Known issues: <complaints, charges, audits, disputes prompting the review>

TASK
1. JURISDICTION MAP. List every jurisdiction whose law may apply, based on where employees actually work. Flag any location with a distinctive local ordinance layer. State that headcount thresholds differ between statutes and that the same employer can be covered by one and not another — mark each coverage question [VERIFY].
2. WAGE AND HOUR. Review: exempt classification statements, overtime, meal and rest breaks, timekeeping and rounding, off-the-clock and remote work, on-call and travel time, expense reimbursement, deductions, pay frequency, final pay timing, pay transparency and disclosure requirements. For each finding say whether the federal baseline or a state rule is the operative constraint.
3. LEAVE AND TIME OFF. Review the federal leave framework alongside state and local paid sick leave, family leave, and any leave for jury duty, voting, bereavement, domestic violence, military service or school activities. Address accrual, carryover, payout on termination, and interaction between overlapping entitlements. Note where a policy is lawful in one location and non-compliant in another.
4. TERMINATION AND SEPARATION. At-will language and any statements that could undercut it, progressive discipline language that may create a contractual expectation, final-pay timing, accrued leave payout, references, and post-employment obligations referenced in the handbook.
5. ACCOMMODATIONS AND NON-DISCRIMINATION. Disability accommodation and the interactive process, religious accommodation, pregnancy and related accommodation, protected characteristics under state and local law that go beyond the federal list, harassment policy content, and reporting and investigation procedures.
6. MONITORING AND PRIVACY. Electronic monitoring and any notice or consent requirement, bring-your-own-device, biometric data, background checks and consumer report notices, drug and alcohol testing including the interaction with state cannabis laws, video and location tracking, and personnel file access rights.
7. PROTECTED RIGHTS. Language that may unlawfully chill protected concerted activity for union and non-union workforces alike: confidentiality of wages and working conditions, social media and communications rules, non-disparagement, restrictions on discussing investigations, and any confidentiality or non-disparagement language in separation documents. Note that doctrine here has shifted repeatedly and mark it [VERIFY].
8. MISSING POLICIES. What is absent that the workforce profile suggests should be present, with the trigger for each — a specific state, a headcount threshold, contractor status, or an industry regime.
9. SUGGESTED LANGUAGE. Redrafts for the highest-risk provisions. Mark every redraft as requiring review by a qualified employment lawyer in the relevant jurisdiction before adoption.
10. REMEDIATION PLAN. Prioritise every finding by exposure and by how many employees the policy touches. Separate "fix before the next pay cycle" from "fix at the next annual review".

RULES
- Rate every finding: LIKELY UNLAWFUL / RISKY / UNCLEAR / ACCEPTABLE. Do not present a drafting preference as a legal violation.
- Never state a state or local requirement as settled unless you are confident. Mark it [VERIFY] and name what to check. Local ordinances are the layer most often missed and most often misremembered.
- Do not invent a headcount threshold, an accrual rate, a notice period or a penalty figure.
- Where a policy is lawful in one location and unlawful in another, say so explicitly rather than giving a single answer.
- Where the review discloses a possible existing violation — unpaid wages, a denied accommodation, an unlawful deduction — say so plainly at the top and recommend qualified counsel before the policy is changed, because a change can be evidence.
- This is a policy review, not an audit of practice. Note where the real risk depends on what the organisation actually does rather than on what the handbook says.

OUTPUT FORMAT
Ten sections matching the tasks above, opening with the five findings carrying the greatest exposure.`,
    example: {
      scenario:
        'A 900-person employer with staff in eleven states and two cities with their own ordinances is refreshing a handbook written when the company operated in a single state.',
      result:
        'A jurisdiction map surfacing two city ordinances the handbook ignores, a leave section showing the single accrual policy fails in three states, a confidentiality clause and a social media rule flagged as potentially chilling protected activity, four missing policies triggered by specific states, and a remediation plan putting final-pay timing and the wage-discussion clause in the immediate bucket.',
    },
  },
  {
    id: 'us-work-visa-lca-checker',
    name: 'Work Visa & LCA Compliance Checker',
    description: 'Maps the employer-side compliance steps and records for a sponsored work visa.',
    jurisdiction: 'us',
    category: 'employment',
    tags: ['workforce', 'assessment', 'immigration', 'work-visa', 'lca', 'public-access-file', 'recordkeeping'],
    sources: [
      { citation: 'Immigration and Nationality Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.govinfo.gov', note: 'The statutory basis for the employment-based non-immigrant categories. Category requirements are elaborated in regulation.' },
      { citation: 'Code of Federal Regulations provisions on employment-based non-immigrant classifications and labor condition applications', authority: 'primary', publisher: 'US Government Publishing Office', jurisdiction: 'us', url: 'https://www.ecfr.gov', note: 'Read the current text. Requirements including wage obligations, notice and file contents are set by regulation and are amended.' },
      { citation: 'US Department of Labor Office of Foreign Labor Certification programme requirements', authority: 'regulator', publisher: 'Office of Foreign Labor Certification, US Department of Labor', jurisdiction: 'us', url: 'https://www.dol.gov', note: 'Governs the labor condition application, prevailing wage determinations and the public access file. Wage data and filing systems change; check the current source each time.' },
      { citation: 'US Citizenship and Immigration Services petition requirements and policy manual', authority: 'regulator', publisher: 'US Citizenship and Immigration Services', jurisdiction: 'us', url: 'https://www.uscis.gov', note: 'Petition forms, fees, filing windows and adjudication policy change frequently. The policy manual is agency policy, not statute.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-employment-policy-checker', 'sg-work-pass-planner'],
    whatItDoes:
      'Builds the employer-side workflow for a sponsored work visa: which category the facts point to, the sequence of steps and who owns each, the wage obligation and where the prevailing wage figure has to come from, the notice or posting requirement, the contents of the public access file where one is required, and the ongoing recordkeeping and material-change triggers that outlast the filing. It is an employer compliance and process tool, not immigration advice — it identifies obligations and the authorities that set them, and routes the substantive questions to immigration counsel.',
    whenToUse:
      'Before sponsoring a new hire or transfer, when an existing sponsored employee changes role, location, hours or salary, when preparing for an audit or site visit, or when auditing public access files across a sponsored population.',
    inputs: [
      { name: 'Role and candidate profile', description: 'Job title, duties, requirements, qualifications, and the candidate’s current status if any.', required: true },
      { name: 'Work locations', description: 'Every place the work will be performed, including client sites, remote locations and any planned change.', required: true },
      { name: 'Compensation', description: 'Offered salary and benefits, and how it was set.', required: true },
      { name: 'Employer profile', description: 'Entity, corporate relationships relevant to a transfer, headcount, and any dependent or prior-violation status.' },
      { name: 'Timeline', description: 'Intended start date and any constraint such as a filing window, a status expiry or a project date.' },
      { name: 'Existing records', description: 'Any current filings, public access files or prior determinations for this employee or role.' },
    ],
    outputs: [
      { name: 'Category assessment', description: 'The categories the facts point toward and the questions that decide between them, for counsel to resolve.' },
      { name: 'Step sequence', description: 'The employer-side steps in order, with owners, dependencies and the authority that requires each.' },
      { name: 'Wage obligation analysis', description: 'What the wage obligation appears to be, where the prevailing wage figure must come from, and what triggers a re-check.' },
      { name: 'Notice and posting checklist', description: 'Any notice or posting obligation, where and for how long, marked for verification.' },
      { name: 'Public access file contents', description: 'The file’s required contents where one applies, with retention and inspection considerations.' },
      { name: 'Recordkeeping plan', description: 'What to retain, for how long, and who owns it, including audit and site-visit readiness.' },
      { name: 'Material change triggers', description: 'The changes — location, role, hours, salary, entity — that require a new or amended filing.' },
      { name: 'Counsel referral list', description: 'The substantive determinations that must go to immigration counsel rather than being resolved here.' },
    ],
    prompt: `You are a US immigration compliance analyst working on the employer side of a sponsored work visa. You handle process, obligations and records. You do NOT determine eligibility, advise the individual, or predict an adjudication outcome — those go to immigration counsel.

INPUTS
- Role: <title, duties, minimum requirements, degree or experience required>
- Candidate: <qualifications, current immigration status if any, prior filings>
- Work locations: <every location where work will be performed, including client sites, home-based work and planned changes>
- Compensation: <offered salary, bonus, benefits; how the figure was set>
- Employer: <entity name, corporate relationships relevant to an intracompany transfer, headcount, any dependent-employer or prior-violation status>
- Timeline: <intended start date, filing window constraints, current status expiry, project dates>
- Existing records: <current filings, public access files, prior wage determinations>

TASK
1. CATEGORY ASSESSMENT. Identify the employment-based non-immigrant categories the facts point toward, and the questions that decide between them — the nature of the role, the qualification requirement, the corporate relationship, the duration and whether the work is project-based. Present these as questions for immigration counsel to resolve. Do not conclude that the candidate qualifies for any category, and do not assess the individual's eligibility.
2. STEP SEQUENCE. For the likely category, set out the employer-side steps in order, with the owner of each, its dependencies, and which authority imposes it. Include any wage determination, any labor condition or certification step, the petition filing itself, and any post-approval step. Where a step has a filing window, a lottery or a cap, say so and mark the current mechanics [VERIFY] — these change and are widely misremembered.
3. WAGE OBLIGATION. Where the category carries a wage obligation, explain what it requires in substance: that the employee be paid at least the applicable required wage, and how that required wage is determined by reference to the official wage source and the actual wage paid to comparable employees. State that the figure must be taken from the current official source for the specific occupation, level and area of employment on the date it is needed. Never state or estimate a wage figure or a wage level. Identify what triggers a re-determination — a new location, a changed role, a new filing period.
4. NOTICE AND POSTING. Where the category requires notice to the workforce or a posting at the place of employment, set out what has to be provided, where it must appear, for how long, and what evidence of it must be retained. Include locations beyond the primary worksite where work will be performed. Mark the specifics [VERIFY] against the current regulation.
5. PUBLIC ACCESS FILE. Where a public access file is required, list its contents item by item, who may inspect it, where it must be kept, when it must be created relative to the filing, and how long it must be retained. Distinguish the public file from the separate internal records that are not part of it. Mark contents and retention periods [VERIFY].
6. RECORDKEEPING AND AUDIT READINESS. What to retain beyond the public file — the wage evidence, the offer and any amendments, itineraries or client agreements where work is at a third-party site, and evidence of compliance with each obligation above. Address readiness for an agency audit, an investigation or an unannounced site visit: who receives the visitor, what is produced, and who is called.
7. MATERIAL CHANGE TRIGGERS. The changes that can require an amended or new filing before they take effect — a new work location or a location outside the area of the current filing, a change in duties or job title, a change from full-time to part-time, a material salary change, a change of employing entity through reorganisation, and a termination or a period of non-productive status. For each, state what must happen and that it generally must happen before the change, not after. Mark each [VERIFY].
8. COUNSEL REFERRAL LIST. Everything in this matter that must be decided by immigration counsel rather than here: category eligibility, the specialty-occupation or comparable qualifying analysis, any question about the individual's status or history, any prior violation, any adjudication risk, and any termination or withdrawal question.

RULES
- Stay on the employer's side. Do not advise the individual, and do not opine on their eligibility, status or immigration options.
- Do not state a filing fee, a wage figure, a wage level, a cap number, a filing window date, a processing time or a retention period from memory. Name what it is, say where it is published, and mark it [VERIFY].
- Do not name a specific form number or edition unless you are confident it exists as described; prefer describing the filing and marking it [VERIFY].
- Requirements in this area change often and agency policy is not the same as regulation. Distinguish statute, regulation and agency policy explicitly whenever you rely on one.
- Never conclude that a filing is or is not required, or that an arrangement is compliant. Produce the obligation map and route the determination to counsel.
- If the facts suggest an existing non-compliance — work at an unfiled location, a salary below the required wage, a missing public access file, or work performed after a status change — say so in the first line and recommend immediate immigration counsel before any further step, including before making a correction.
- Where work will be performed at a third party's site or at multiple locations, treat that as a distinct compliance question and address it explicitly.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with a bottom line naming the likely category, the earliest date-sensitive step, and any compliance gap visible on the facts.`,
    example: {
      scenario:
        'A company wants to move an existing sponsored employee from headquarters to a client site in another state and increase their hours, starting in three weeks.',
      result:
        'A material-change analysis identifying the new location and the hours change as separate triggers that generally require action before the move, a wage section requiring a fresh determination for the new area of employment rather than reuse of the existing figure, a notice and public-access-file checklist for the new site, and a counsel referral flagging that the move should not proceed on the current timeline without an immigration lawyer confirming the filing position.',
    },
  },
  {
    id: 'us-separation-agreement-reviewer',
    name: 'Separation & Release Reviewer',
    description: 'Tests a US separation and release agreement against the federal and state rules that decide whether a waiver holds.',
    jurisdiction: 'us',
    category: 'employment',
    tags: ['workforce', 'review', 'separation-agreement', 'release', 'severance', 'waiver', 'reduction-in-force'],
    sources: [
      { citation: 'Age Discrimination in Employment Act (29 U.S.C. ch. 14), as amended by the Older Workers Benefit Protection Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.congress.gov', note: 'Sets the conditions a waiver of age claims must satisfy to be knowing and voluntary, including the consideration, review and revocation periods and the group disclosure schedule.' },
      { citation: 'National Labor Relations Act (29 U.S.C. ch. 7)', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.congress.gov', note: 'Relied on for the limits protected concerted activity places on confidentiality and non-disparagement terms, including for non-union workforces.' },
      { citation: 'Speak Out Act (Pub. L. 117-224)', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.congress.gov' },
      { citation: 'Ending Forced Arbitration of Sexual Assault and Sexual Harassment Act of 2021 (Pub. L. 117-90)', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.congress.gov' },
      { citation: 'Fair Labor Standards Act (29 U.S.C. ch. 8)', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.congress.gov', note: 'Relied on for the limits on private release of wage claims.' },
      { citation: 'EEOC guidance on waivers of discrimination claims in employee severance agreements', authority: 'guidance', publisher: 'Equal Employment Opportunity Commission', jurisdiction: 'us', url: 'https://www.eeoc.gov' },
      { citation: 'State severance, settlement and non-disclosure statutes', authority: 'primary', publisher: 'State legislatures', jurisdiction: 'us', note: 'Several states impose their own review periods, mandatory disclaimers and limits on non-disclosure of harassment or discrimination allegations. These are additional to the federal requirements, not alternatives to them.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-warn-act-trigger-spotter', 'us-non-compete-mapper', 'us-employment-policy-checker'],
    whatItDoes:
      'Runs a separation agreement against the conditions that actually determine whether the release is enforceable: whether the age-claim waiver requirements are met including the group disclosure schedule where the exit is part of a programme, which claims cannot be released by private agreement at all, whether the confidentiality and non-disparagement terms reach protected activity, and whether the state where the employee worked adds requirements of its own. It also checks that the consideration is genuinely additional, that the payment mechanics are workable, and that the operative dates are internally consistent.',
    whenToUse:
      'Before a separation agreement is presented to any departing employee, when building a template for a reduction in force, and when an employee returns a marked-up agreement or asks for more time to consider it.',
    inputs: [
      { name: 'Agreement text', description: 'The separation and release agreement as it would be presented.', required: true },
      { name: 'Employee details', description: 'Age, role, work location or locations, length of service, and whether they are exempt or non-exempt.', required: true },
      { name: 'Circumstances of separation', description: 'Reason for the exit, whether it is individual or part of a programme, and how many others are affected.', required: true },
      { name: 'Known claims and complaints', description: 'Any internal complaint, agency charge, accommodation request, leave, or open dispute involving this employee.' },
      { name: 'Consideration offered', description: 'Severance amount, benefits continuation, equity treatment, and what the employee would receive without signing.' },
      { name: 'Other agreements', description: 'Existing confidentiality, invention assignment, arbitration, non-compete or non-solicit agreements that will survive.' },
    ],
    outputs: [
      { name: 'Enforceability verdict', description: 'Whether the release as drafted is likely to hold, and what specifically puts it at risk.' },
      { name: 'Waiver requirements checklist', description: 'Each age-waiver condition marked met, not met or not applicable, including the group disclosure schedule where relevant.' },
      { name: 'Non-releasable claims', description: 'Claims the agreement purports to release that cannot be released by private agreement, and how to carve them out.' },
      { name: 'Protected activity review', description: 'Confidentiality, non-disparagement, cooperation and arbitration terms tested against protected reporting and concerted activity.' },
      { name: 'State overlay', description: 'Requirements added by the state or states where the employee worked.' },
      { name: 'Revised language', description: 'Replacement wording for every term that fails, with the required carve-outs and notices.' },
      { name: 'Timeline and mechanics', description: 'The dates that must hold, the order of signature, revocation and payment, and what invalidates the release if done out of order.' },
    ],
    prompt: `You are a US employment lawyer reviewing a separation and release agreement before it is presented to a departing employee.

INPUTS
- Agreement text: <paste in full>
- Employee: <age, role, state or states worked in, length of service, exempt or non-exempt>
- Separation: <reason; individual exit or part of a group programme; if a programme, how many people and what the decisional unit is>
- Known issues: <any internal complaint, agency charge, accommodation request, protected leave, safety report or open dispute>
- Consideration: <severance, benefits continuation, equity treatment — and what the employee gets if they do not sign>
- Surviving agreements: <confidentiality, invention assignment, arbitration, non-compete, non-solicit>

TASK
1. CONSIDERATION. Confirm the employee is receiving something they are not already entitled to. A release supported only by amounts already owed — earned wages, accrued vacation where state law requires payout, a contractual severance already promised — is not supported by consideration. State plainly whether the consideration is genuinely additional.
2. AGE CLAIM WAIVER. If the employee is 40 or older, work through each condition for a knowing and voluntary waiver: that the agreement is written so it can be understood; that it specifically refers to age discrimination rights; that it does not waive claims arising after signature; that consideration is additional; that the employee is advised in writing to consult an attorney; that the statutory consideration period is given; and that a revocation period follows signature with payment not made until it expires. Mark the current periods [VERIFY] and note that the consideration period is longer where the exit is part of a group programme.
3. GROUP PROGRAMME DISCLOSURE. If this is an exit incentive or other employment termination programme offered to a group, the age waiver also requires a written disclosure identifying the decisional unit, the eligibility factors, the time limits, and the job titles and ages of everyone selected and everyone in the same unit not selected. Check whether that schedule exists, whether the decisional unit is defined defensibly, and whether ages are given individually rather than in bands. A missing or wrongly scoped schedule is one of the most common reasons these releases fail.
4. NON-RELEASABLE CLAIMS. Identify what the release purports to cover but cannot reach by private agreement, and specify the carve-outs required. Address at least: the right to file a charge with or participate in an investigation by a government agency, even where recovery of individual relief can be waived; unemployment and workers compensation claims; vested benefits; claims arising after the effective date; wage claims to the extent state or federal law restricts private release; indemnification and insurance rights; and whistleblower awards, which cannot be conditioned or waived.
5. CONFIDENTIALITY AND NON-DISPARAGEMENT. Test these against protected concerted activity and protected reporting. A confidentiality or non-disparagement term drawn broadly enough to discourage employees from discussing terms and conditions of employment with each other, or from reporting to an agency, is a problem in a non-union workplace as much as a union one. Check whether the terms are mutual, whether they carve out truthful statements to agencies and in legal proceedings, and whether they are narrowed to what a legitimate interest supports.
6. HARASSMENT AND ASSAULT TERMS. Check for any non-disclosure or non-disparagement provision that would cover a sexual harassment or sexual assault dispute, and any pre-dispute arbitration or class waiver that would apply to one. Federal law limits both. Distinguish pre-dispute from post-dispute terms, and state which this agreement contains.
7. STATE OVERLAY. For each state the employee worked in, identify additional requirements: independent review periods, mandatory disclaimer language preserving the right to report or testify, restrictions on non-disclosure of harassment or discrimination allegations, limits on non-compete and non-solicit terms, timing rules for final pay, and any requirement that the agreement be provided in a particular language. Mark each [VERIFY]. Where the employee worked remotely across states, say which law is likely to apply and do not assume one.
8. THE REMAINING TERMS. Cover: the scope of the release and whether it is mutual; a covenant not to sue and its interaction with the agency carve-out; no-rehire terms and where they are restricted; return of property; cooperation clauses and whether they are paid; references; equity treatment and whether the agreement matches the plan documents; restrictive covenants being reaffirmed or newly imposed; tax treatment, allocation of the payment, and whether deferred compensation timing rules are engaged; no-admission language; and severability with a carve-back preserving the release if another term fails.
9. TIMELINE AND MECHANICS. Lay out the dates that must hold: presentation, the consideration period, signature, the revocation window, the effective date, and payment after the revocation window closes. Flag any date in the draft that is internally inconsistent, any effective date that precedes the end of the revocation period, and any payment scheduled before the release becomes effective. Note that a material change to the offer can restart the consideration period, and that the employee may sign early but cannot be pressured to.
10. REVISED LANGUAGE. Give replacement wording for every term that fails, including the carve-out paragraph, the advice-of-counsel and consideration-period recitals, and the narrowed confidentiality and non-disparagement terms.

RULES
- Treat a defect in the waiver conditions as fatal to that part of the release, not as a drafting preference. Say which claims survive if the defect is not fixed.
- Do not state the consideration, revocation or disclosure requirements as fixed numbers from memory. Give the structure, mark the figures [VERIFY], and say where to confirm them.
- Where the employee has raised a complaint, requested an accommodation, taken protected leave, or reported a safety or legal concern, treat the timing as a live retaliation issue and address it separately from the release.
- Remote and multi-state employment is common and the state overlay is where these agreements most often fail. Never default to a single state without saying why.
- Do not advise the employee. This is a review for the employer, and the agreement itself must advise the employee to obtain their own counsel.

OUTPUT FORMAT
Open with a verdict — present as drafted, present with changes, or do not present — and the single biggest risk. Then a waiver requirements checklist table, the sections above in order, the revised language, and a dated timeline.`,
    example: {
      scenario:
        'A company preparing a fifteen-person reduction in force across three states asks for its standard separation agreement to be checked before rollout.',
      result:
        'Release found unenforceable as to age claims for the eleven employees over 40 because no group disclosure schedule was prepared and the decisional unit had never been defined, a confidentiality clause narrowed after it was found to reach discussion of severance terms among employees, wage claims and agency participation carved out of an otherwise general release, and one state identified as requiring disclaimer language the template omitted.',
    },
  },
  {
    id: 'us-ada-fmla-interactive-process',
    name: 'ADA & FMLA Interactive Process Mapper',
    description: 'Structures the interactive process for an accommodation or leave request and builds the record.',
    jurisdiction: 'us',
    category: 'employment',
    tags: ['workforce', 'assessment', 'accommodations', 'leave', 'disability', 'interactive-process', 'undue-hardship'],
    sources: [
      { citation: 'Americans with Disabilities Act (42 U.S.C. ch. 126), as amended', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.congress.gov', note: 'The amendments broadened the definition of disability substantially and directed that it not demand extensive analysis. Coverage is rarely the contested question it once was.' },
      { citation: 'Family and Medical Leave Act (29 U.S.C. ch. 28) and its implementing regulations', authority: 'primary', publisher: 'United States Congress; Department of Labor', jurisdiction: 'us', url: 'https://www.dol.gov', note: 'Relied on for eligibility, qualifying reasons, notice and certification, and the designation and tracking rules.' },
      { citation: 'EEOC enforcement guidance on reasonable accommodation and undue hardship', authority: 'regulator', publisher: 'Equal Employment Opportunity Commission', jurisdiction: 'us', url: 'https://www.eeoc.gov' },
      { citation: 'Pregnant Workers Fairness Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.congress.gov', note: 'Creates a separate accommodation duty for known limitations related to pregnancy and childbirth, on a lower threshold than disability and without requiring an impairment.' },
      { citation: 'State and local disability, leave and accommodation statutes', authority: 'primary', publisher: 'State and local legislatures', jurisdiction: 'us', note: 'Many impose broader definitions, additional leave entitlements, paid leave and separate notice obligations. These stack with the federal duties rather than replacing them.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-employment-policy-checker', 'us-separation-agreement-reviewer', 'us-worker-classification'],
    whatItDoes:
      'Takes an accommodation or leave request and runs the parallel analyses that actually apply to it, because a single request routinely engages disability accommodation, federal leave and a state entitlement at the same time with different tests and different clocks. It identifies what has been triggered even where the employee never used any legal term, determines what medical information may lawfully be requested and from whom, structures the dialogue itself, and tests any proposed denial against the undue hardship standard rather than against inconvenience.',
    whenToUse:
      'The moment an employee mentions a medical condition affecting their work, requests a schedule or duty change, exhausts leave, returns with restrictions, or when a performance process is about to begin against someone who has raised a health issue.',
    inputs: [
      { name: 'The request', description: 'What the employee said or wrote, in their own words, and when.', required: true },
      { name: 'Role and essential functions', description: 'The job, its actual essential functions, and the job description if one exists.', required: true },
      { name: 'Limitation described', description: 'The condition or restriction as described, and any medical documentation already provided.', required: true },
      { name: 'Employment details', description: 'Tenure, hours worked, worksite headcount, and leave already taken this year.' },
      { name: 'Operational context', description: 'Coverage, cost, team size, and what accommodating would actually require.' },
      { name: 'Prior history', description: 'Earlier requests, accommodations in place, performance issues, and any complaint or leave preceding this.' },
    ],
    outputs: [
      { name: 'Trigger analysis', description: 'Every statute engaged by the request, including those the employee did not name.' },
      { name: 'Coverage and eligibility', description: 'Disability coverage and leave eligibility assessed separately, with the headcount and hours tests shown.' },
      { name: 'Essential functions analysis', description: 'Which functions are genuinely essential and which are marginal, tested against evidence rather than the job description alone.' },
      { name: 'Permitted medical inquiries', description: 'What may lawfully be asked, of whom, in what form, and what may not.' },
      { name: 'Accommodation options', description: 'Options to consider including leave as an accommodation, with the effectiveness of each.' },
      { name: 'Undue hardship assessment', description: 'Any proposed denial tested against the statutory factors, with the evidence required to support it.' },
      { name: 'Process record and timeline', description: 'The dated documentation trail, the notices due and when, and the next scheduled step.' },
    ],
    prompt: `You are a US employment lawyer structuring the interactive process for an accommodation or leave request.

INPUTS
- The request: <exactly what the employee said or wrote, in their words, and the date; note if it came through a manager rather than HR>
- Role: <job title, actual duties, the job description if one exists, and how the role is really performed day to day>
- Limitation: <the condition or restriction as described, duration if known, and any medical documentation already provided>
- Employment: <start date, hours worked in the last 12 months, headcount at and within 75 miles of the worksite, leave already taken this leave year>
- Operations: <coverage requirements, team size, cost of the accommodation, what it would actually require>
- History: <prior requests, accommodations already in place, performance issues, and any complaint, injury or leave preceding this request>

TASK
1. TRIGGER ANALYSIS. Establish what the request set in motion, and do this before anything else. An employee need not use the words accommodation, disability or leave, need not cite any statute, and need not make the request in writing. A manager being told about a medical problem affecting work is usually enough, and knowledge held by a manager is generally imputed to the employer. Identify every regime engaged: disability accommodation; federal leave; pregnancy-related accommodation, which applies on a lower threshold and does not require an impairment; workers compensation if the condition is work-related; state and local disability, leave and paid-leave statutes; and any collective agreement or company policy that is more generous. List which ones the employee named and which they did not, and state that the employer's duty does not depend on the employee identifying the right one.
2. COVERAGE AND ELIGIBILITY, SEPARATELY. These are different tests and a person can satisfy one and not the other.
   a. Disability: does the condition substantially limit a major life activity, including major bodily functions? Apply the broadened standard and note that the analysis is not meant to be demanding, that episodic conditions and conditions in remission are assessed in their active state, and that mitigating measures other than ordinary eyeglasses are disregarded. Also consider the record-of and regarded-as routes.
   b. Leave eligibility: months of service, hours worked in the preceding twelve months, and the worksite headcount test. Show the arithmetic. Then check whether the reason qualifies.
   Where leave eligibility fails, say plainly that the accommodation duty continues regardless and that leave may still be required as an accommodation.
3. ESSENTIAL FUNCTIONS. Identify which functions are genuinely essential and which are marginal. Test against the evidence rather than the job description alone: the reason the position exists, the number of employees available to perform the function, the degree of specialisation, time actually spent on it, and how the role is really performed. A written job description is evidence but is not conclusive, and one that has not been updated in years usually is not persuasive. Address attendance and on-site presence directly and on these facts rather than asserting either as inherently essential.
4. MEDICAL INQUIRIES. State precisely what may lawfully be requested and what may not. Where the disability or the need for accommodation is not obvious, reasonable documentation of the limitation and the need may be sought — but not an unrestricted medical history, not the full file, and not a diagnosis where the limitation is what matters. Cover: certification for leave and the separate, narrow route for seeking clarification or a second opinion; who may make contact and the restrictions on doing so; the confidentiality requirement that medical information be kept separate from the personnel file; and who inside the business may be told what, which is ordinarily only the restriction and not the condition. Flag any inquiry already made that exceeded these limits.
5. THE DIALOGUE. Structure the process itself. It is an interactive obligation, and a breakdown attributable to the employer is itself actionable even where no accommodation was ultimately required. Set out who meets whom, what is asked, how the employee's own proposal is considered, how alternatives are generated, and the cadence of follow-up. Emphasise that delay is the most common failure: a request left unanswered for weeks while documentation is chased is a breakdown. Where the employee's proposal is not workable, the employer must consider alternatives rather than simply refusing — and it may choose among effective accommodations, but the one it chooses must actually be effective.
6. ACCOMMODATION OPTIONS. Generate concrete options for these facts, covering schedule and hours changes, remote or hybrid arrangements, equipment and software, workplace modification, adjustment of marginal functions, temporary reassignment of duties, and reassignment to a vacant position as an accommodation of last resort. Treat leave as an accommodation explicitly, including leave beyond any statutory entitlement and leave after entitlement is exhausted. Address indefinite leave separately and honestly: a request with no expected end date is treated differently from a defined extension, and the distinction turns on the medical evidence. Assess each option for effectiveness rather than convenience.
7. UNDUE HARDSHIP. Any denial must rest on this standard, and it is significant difficulty or expense judged against the employer's overall resources — not inconvenience, not a preference, not that other employees may resent it, and not that no one has done it before. Work through the factors: the nature and net cost after tax credits and outside funding, the financial resources of the facility and of the whole employer, the type of operation, and the impact on operations and on other employees' ability to do their jobs. State exactly what evidence would have to be assembled to support a denial here, and say plainly if it does not exist. Address any conflict with a collective agreement or a seniority system separately.
8. RECORD AND TIMELINE. Build the dated trail: the request, acknowledgement, documentation requested and received, meetings and what was discussed, options considered and why each was accepted or rejected, the decision and its reasons, the trial period if any, and the review date. Then list the notices due and when — eligibility and rights notices, designation, certification deadlines — and mark each period [VERIFY]. Note that these records must be kept separately from the personnel file.
9. RELATED EXPOSURE. Flag risks the accommodation analysis does not resolve: retaliation, especially where a performance process is starting against someone who has just made a request; interference with leave rights, including discouraging use; the treatment of intermittent leave and attendance policies that count protected absences; no-fault attendance and maximum-leave policies, which are a recurring source of enforcement; return-to-work and fitness-for-duty requirements; and the interaction with any separation being contemplated. Where a performance or disciplinary process is in train, address the timing directly rather than leaving it implicit.

RULES
- Run the statutes in parallel, never in sequence. Leave ineligibility does not end the accommodation duty, and exhausting leave does not end it either.
- Never require the employee to have used legal terminology, a form, or a written request to have triggered the duty.
- Do not treat a stale job description as settling what is essential.
- Undue hardship is significant difficulty or expense, evidenced. Do not let inconvenience, cost assumptions or fairness complaints stand in for it.
- State and local law frequently gives more. Identify the jurisdiction and treat the federal analysis as a floor, marking state entitlements [VERIFY].
- Treat delay as a live risk in its own right and give a next date for every open step.
- Do not advise on the medical merits. The question is the limitation and its effect on essential functions, not the diagnosis.

OUTPUT FORMAT
Open with every statute triggered and the single most urgent step with its date. Then the sections above, with tables for the essential functions analysis and the accommodation options, closing with the dated process record and notice schedule.`,
    example: {
      scenario:
        'An employee tells their manager they are struggling with a flare-up of a chronic condition and asks to start later some mornings; a performance review is scheduled the following week.',
      result:
        'Request identified as triggering the accommodation duty despite no legal terminology being used and the mention going to a manager rather than HR, leave eligibility failing the hours test while the accommodation duty continued regardless, punctuality assessed as a marginal rather than essential function for this role on the evidence, the scope of permitted medical inquiry narrowed after an overbroad records request had already gone out, a trial flexible-start arrangement structured with a review date, and the scheduled review flagged as a retaliation risk requiring documented independent grounds.',
    },
  },
];
