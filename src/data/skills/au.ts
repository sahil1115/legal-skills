import type { Skill } from '../../types/skill';

/**
 * Australia skills — Commonwealth law: ACL, Fair Work, Privacy Act, SOCI, DDO.
 */
export const auSkills: Skill[] = [
  {
    id: 'au-acl-unfair-terms',
    name: 'ACL Unfair Terms Screener',
    description: 'Screens standard-form contract terms against the Australian unfair contract terms regime.',
    jurisdiction: 'au',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'australian-consumer-law', 'unfair-terms', 'standard-form', 'consumer', 'small-business'],
    sources: [
      { citation: 'Competition and Consumer Act 2010 (Cth), Schedule 2 (Australian Consumer Law)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au' },
      { citation: 'ACCC guidance on unfair contract terms', authority: 'guidance', publisher: 'Australian Competition and Consumer Commission', jurisdiction: 'au', url: 'https://www.accc.gov.au' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer'],
    relatedSkills: ['global-smart-redline', 'cross-contract-localizer'],
    whatItDoes:
      'Tests whether a contract is caught by the unfair contract terms regime at all — which turns on whether it is standard form and whether the counterparty is a consumer or a small business — and then screens each term against the statutory test: significant imbalance, not reasonably necessary to protect legitimate interests, and detriment if relied on. Since the regime moved to a civil penalty model, the analysis treats a problematic term as an exposure to be fixed rather than merely a clause that might be unenforceable, and proposes replacement wording for each.',
    whenToUse:
      'Before publishing or updating standard terms used in Australia, when expanding into the Australian market, when reviewing terms a small-business customer has queried, or as a periodic audit of terms drafted before the penalty regime changed.',
    inputs: [
      { name: 'Contract terms', description: 'The standard-form terms to screen.', required: true },
      { name: 'Counterparty profile', description: 'Whether customers are consumers, small businesses, or larger entities.', required: true },
      { name: 'Negotiation practice', description: 'Whether terms are ever actually negotiated in practice, and with whom.' },
      { name: 'Commercial rationale', description: 'Why each protective term exists — this is what the legitimate-interest limb turns on.' },
      { name: 'Contract value', description: 'Upfront price payable, relevant to the small-business threshold analysis.' },
    ],
    outputs: [
      { name: 'Applicability analysis', description: 'Whether the regime applies at all, tested against both the standard-form and counterparty limbs.' },
      { name: 'Term-by-term risk table', description: 'Each term rated high, medium or low risk against the three-part test.' },
      { name: 'Statutory examples matched', description: 'Terms matching the examples the legislation itself lists.' },
      { name: 'Proposed replacements', description: 'Redrafted wording that preserves the commercial purpose within the safe zone.' },
      { name: 'Legitimate-interest justifications', description: 'The argument to record for terms you decide to keep.' },
      { name: 'Penalty exposure note', description: 'What a contravention now means, per term and per contract.' },
    ],
    prompt: `You are an Australian consumer law specialist screening standard-form contract terms under the unfair contract terms regime in the Australian Consumer Law.

INPUTS
- Contract terms: <paste>
- Who we contract with: <consumers / small businesses / larger businesses; describe the typical counterparty>
- Negotiation practice: <are these terms ever actually negotiated? by whom? give examples>
- Commercial rationale: <why each protective term exists — what legitimate interest does it protect?>
- Upfront price payable: <typical contract value>

TASK
1. APPLICABILITY. Two limbs, both required:
   a. STANDARD FORM: is this a standard-form contract? Consider whether one party has all or most of the bargaining power, whether the contract was prepared before any discussion, whether the other party was effectively required to accept or reject, whether there was any real opportunity to negotiate, and whether the terms take account of the other party's specific circumstances. Note that the burden is on the party asserting the contract is not standard form, and that offering minor negotiation on price does not usually take a contract out of the definition.
   b. COUNTERPARTY: is the counterparty a consumer or a small business within the statutory thresholds? Apply the thresholds to the supplied facts and show the working. Mark the current thresholds [VERIFY] — they have been amended.
   Conclude: regime APPLIES / DOES NOT APPLY / APPLIES TO SOME COUNTERPARTIES. If it applies to only some, say the terms must be assessed on the basis that it does apply, unless you segregate contracts.
2. TERM-BY-TERM SCREEN. For each term apply the three-part test:
   - Would it cause a significant imbalance in the parties' rights and obligations?
   - Is it reasonably necessary to protect the legitimate interests of the party advantaged by it? (The party relying on the term bears this.)
   - Would it cause detriment — financial or otherwise — to the other party if applied or relied on?
   Remember the transparency and overall-context requirements: a term must be assessed in the context of the contract as a whole, and lack of transparency counts against it.
   Produce a table: | Term | Clause | Imbalance | Reasonably necessary? | Detriment | Risk rating | Reason |
3. STATUTORY EXAMPLES: flag terms matching the kinds of term the legislation itself lists as potentially unfair — including terms permitting one party but not the other to avoid or limit performance, to terminate, to vary the terms, to renew or not renew, to vary the price without a right to terminate, to unilaterally determine whether the contract has been breached or to interpret its meaning, and terms limiting one party's right to sue or the evidence it can adduce. Matching an example is not automatically fatal, but it shifts the analysis.
4. PROPOSED REPLACEMENTS: for every high and medium risk term, draft replacement wording that keeps the commercial purpose but survives the test. Usually this means making the right mutual, adding notice and a corresponding termination right, tying a discretion to an objective standard, or narrowing the term to what the legitimate interest actually requires.
5. LEGITIMATE-INTEREST JUSTIFICATIONS: for terms you recommend keeping, write the justification to record now — evidence of the interest protected and why a narrower term would not do. Contemporaneous reasoning is far more persuasive than reconstructed reasoning.
6. PENALTY EXPOSURE: explain that proposing, applying or relying on an unfair term is now itself a contravention attracting civil penalties, that each unfair term can be a separate contravention, and that a court can make orders including declaring the term void, injunctions and remedial orders. Do not state penalty figures as settled — mark [VERIFY].

RULES
- Apply the three limbs separately. Most analyses collapse them, and the legitimate-interest limb is where a term is usually saved or lost.
- Transparency is not a defence on its own, but opacity is an aggravating factor. Note terms buried, cross-referenced elsewhere, or written obscurely.
- Do not assume a term is safe because it is common in the market. Widespread use has not protected these terms.
- Where a term is required by other law, say so — that is a strong legitimate-interest argument.

OUTPUT FORMAT
Six sections matching the tasks above, opening with the applicability conclusion.`,
    example: {
      scenario:
        'A software company selling subscriptions to Australian small businesses reviews terms drafted for its home market.',
      result:
        'Regime confirmed to apply, four high-risk terms identified including a unilateral variation right and an auto-renewal with no exit window, redrafted wording for each that preserves the commercial intent, and recorded legitimate-interest reasoning for two terms retained unchanged.',
    },
  },
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
    id: 'au-privacy-ndb-assessor',
    name: 'Privacy Act / NDB Assessor',
    description: 'Assesses a data breach against the Notifiable Data Breaches scheme and drafts the notifications.',
    jurisdiction: 'au',
    category: 'privacy',
    tags: ['data-protection', 'incident-response', 'privacy-act', 'notifiable-data-breaches', 'breach-response', 'oaic', 'incident'],
    sources: [
      { citation: 'Privacy Act 1988 (Cth) and the Australian Privacy Principles', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au' },
      { citation: 'OAIC guidance on the Privacy Act and the Notifiable Data Breaches scheme', authority: 'guidance', publisher: 'Office of the Australian Information Commissioner', jurisdiction: 'au', url: 'https://www.oaic.gov.au' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['sg-pdpc-breach-notifier', 'cross-four-regime-gap-analyzer'],
    whatItDoes:
      'Runs the eligible-data-breach analysis under the Notifiable Data Breaches scheme: whether the entity is covered by the Privacy Act at all, whether there has been unauthorised access, disclosure or loss, whether serious harm is likely, and whether remedial action taken has removed that likelihood. It manages the assessment clock, drafts both the regulator notification and the individual notification, and separates the Australian Privacy Principles that the incident may also have breached from the notification question itself.',
    whenToUse:
      'Within hours of suspecting a breach involving personal information of individuals in Australia, and when building the breach response plan before anything goes wrong.',
    inputs: [
      { name: 'Incident description', description: 'What happened, when it was discovered, and how.', required: true },
      { name: 'Data involved', description: 'Categories of personal information, whether sensitive information is included, and volume.', required: true },
      { name: 'Individuals affected', description: 'How many, who they are, and any vulnerability among them.' },
      { name: 'Entity profile', description: 'Turnover, sector, and whether any specific coverage rule applies to you.', required: true },
      { name: 'Remedial action', description: 'What has been done, and whether it removes the likelihood of serious harm.' },
    ],
    outputs: [
      { name: 'Coverage check', description: 'Whether the Privacy Act and the NDB scheme apply to the entity at all.' },
      { name: 'Eligible breach assessment', description: 'Each element of the test worked through on the facts.' },
      { name: 'Serious harm analysis', description: 'The likelihood assessment against the statutory factors.' },
      { name: 'Assessment clock', description: 'The 30-day assessment obligation and what must happen within it.' },
      { name: 'Draft notifications', description: 'Regulator statement and individual notification, with the required content.' },
      { name: 'APP compliance review', description: 'Separate assessment of which Australian Privacy Principles the incident implicates.' },
    ],
    prompt: `You are an Australian privacy lawyer assessing a data breach under the Notifiable Data Breaches scheme in the Privacy Act.

INPUTS
- Incident: <what happened, when it occurred, when it was discovered, how it was discovered, whether it is contained>
- Data involved: <categories of personal information; is any of it sensitive information? credentials? identity documents? financial data? health data?>
- Individuals affected: <number, who they are, any vulnerability — children, people at risk of family violence, people whose location is sensitive>
- Our entity: <annual turnover, sector, whether we are a health service provider, credit provider, TFN recipient, or otherwise covered regardless of turnover>
- Remedial action taken: <what, when, and whether it prevents the harm>

TASK
1. COVERAGE CHECK: is the entity an APP entity subject to the Privacy Act? Apply the turnover threshold and then check the categories covered regardless of turnover — including health service providers, entities trading in personal information, credit providers and reporting bodies, TFN recipients, and contracted service providers under a Commonwealth contract. If the entity is not covered, say so — but check contractual notification obligations and any sector-specific regime separately, and note that reforms have been narrowing exemptions [VERIFY].
2. ELIGIBLE DATA BREACH TEST. Work through each element:
   a. Has there been unauthorised access to, unauthorised disclosure of, or loss of personal information held by the entity? Note that loss includes situations where the information is likely to be accessed by an unauthorised person.
   b. Would a reasonable person conclude that the access, disclosure or loss would be likely to result in serious harm to any of the individuals to whom the information relates?
   c. Has remedial action been taken such that the access, disclosure or loss is not likely to result in serious harm? If so, it is not an eligible data breach — but the remedial action must genuinely remove the likelihood, and the reasoning must be documented.
3. SERIOUS HARM ANALYSIS. Assess likelihood against the statutory factors: the kind and sensitivity of the information; whether it is protected by security measures and the likelihood those could be overcome; the persons who have obtained or could obtain the information and the likelihood they intend to cause harm; and the nature of the harm. Cover the harm types — physical, psychological, emotional, financial and reputational. Note that "serious harm" is judged for ANY affected individual, so a small cohort of high-risk individuals can make the whole breach notifiable. Address whether the information could be combined with other available information to enable identity theft.
4. ASSESSMENT CLOCK: if there are reasonable grounds to SUSPECT but not yet to BELIEVE an eligible data breach has occurred, a reasonable and expeditious assessment must be carried out within 30 days of becoming aware of those grounds. State the date the clock started, the date it expires, what the assessment must cover, and that the assessment itself must be documented. If there are already reasonable grounds to BELIEVE, notification must be made as soon as practicable — the 30 days is not a waiting period, and say so plainly.
5. DRAFT THE REGULATOR STATEMENT with the required content: the entity's identity and contact details, a description of the breach, the kinds of information concerned, and the steps the entity recommends individuals take in response.
6. DRAFT THE INDIVIDUAL NOTIFICATION: plain language, no minimising, what happened, what information was involved, what the entity is doing, what the individual should do now, and where to get help. Address the method — notifying affected individuals directly where practicable, and publishing a statement where it is not. Then say which method fits these facts and why.
7. APP COMPLIANCE REVIEW (separate from notification): which Australian Privacy Principles does the incident implicate? Consider security of personal information, retention and destruction of information no longer needed, collection minimisation, and cross-border disclosure if an overseas recipient is involved. A breach often exposes an underlying APP problem that outlives the incident — identify it.
8. OTHER OBLIGATIONS: flag anything else the facts may trigger — contractual notification duties, sector regulators, overseas privacy regimes if affected individuals are outside Australia, and cyber incident reporting obligations if critical infrastructure assets are involved.

RULES
- Do not conclude "not notifiable" on thin remedial action. State exactly why the harm is no longer likely, or do not rely on it.
- Assess serious harm for the most vulnerable affected individual, not the average one.
- Where facts are unknown, say what must be established and treat the unknown as a reason for urgency rather than delay.
- Recommend that the assessment and the reasoning be documented contemporaneously, whatever the conclusion.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with a bottom line and the key date.`,
    example: {
      scenario:
        'A misconfigured storage bucket exposed a spreadsheet of customer names, addresses and partial payment details for an unknown period.',
      result:
        'Coverage confirmed, an eligible data breach assessment finding serious harm likely because address data raises risk for a subset of customers, the 30-day assessment clock dated from discovery with a recommendation not to use it as a waiting period, drafted regulator and individual notifications, and a separate finding that the retention practice breached an APP independently of the incident.',
    },
  },
  {
    id: 'au-soci-obligations-mapper',
    name: 'SOCI Obligations Mapper',
    description: 'Maps critical infrastructure obligations to an asset under the SOCI regime.',
    jurisdiction: 'au',
    category: 'regulatory',
    tags: ['regulatory-change', 'programme-design', 'soci', 'critical-infrastructure', 'security', 'cirmp', 'incident-reporting'],
    sources: [
      { citation: 'Security of Critical Infrastructure Act 2018 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au' },
      { citation: 'Rules made under the Security of Critical Infrastructure Act', authority: 'regulator', jurisdiction: 'au', note: 'Obligations are switched on for particular asset classes by rules rather than applying uniformly. Confirm which are active for the asset class.' },
      { citation: 'Australian Cyber Security Centre and Department of Home Affairs guidance', authority: 'guidance', jurisdiction: 'au', url: 'https://www.cyber.gov.au' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['energy-infrastructure', 'technology'],
    relatedSkills: ['eu-nis2-scope-tester'],
    whatItDoes:
      'Determines whether an asset is a critical infrastructure asset under the Security of Critical Infrastructure regime, which sector rules apply to it, and which of the layered obligations have actually been switched on for that sector — since the regime applies obligations selectively by sector rather than uniformly. It then maps the register, risk management programme, incident reporting and enhanced obligations to the asset, with a reporting runbook built around the 12 and 72-hour clocks.',
    whenToUse:
      'When assessing whether the SOCI regime applies to your assets, when acquiring an asset that may be critical infrastructure, when building an incident response plan, or when a customer in a regulated sector asks about your obligations.',
    inputs: [
      { name: 'Asset description', description: 'What the asset is, what it does, and who depends on it.', required: true },
      { name: 'Sector', description: 'The sector the asset sits in — obligations are switched on sector by sector.', required: true },
      { name: 'Ownership and control', description: 'Who owns and operates it, including any offshore interests.' },
      { name: 'Interdependencies', description: 'What other infrastructure depends on this asset, and what it depends on.' },
      { name: 'Existing programme', description: 'Current security frameworks, risk management and incident response capability.' },
    ],
    outputs: [
      { name: 'Asset determination', description: 'Whether it is a critical infrastructure asset, and of which class.' },
      { name: 'Switched-on obligations', description: 'Which obligation layers apply to this sector, since they are applied selectively.' },
      { name: 'Register obligations', description: 'Reporting of ownership and operational information, and when updates are due.' },
      { name: 'Risk management programme', description: 'The four hazard domains mapped against existing controls.' },
      { name: 'Reporting runbook', description: 'The 12 and 72-hour incident reporting clocks as an operational procedure.' },
      { name: 'Enhanced obligations', description: 'What applies if the asset is declared a system of national significance.' },
    ],
    prompt: `You are an Australian critical infrastructure regulation specialist mapping obligations under the Security of Critical Infrastructure regime.

INPUTS
- Asset: <what it is, what it does, capacity or scale, who depends on it>
- Sector: <e.g. energy, communications, data storage or processing, financial services and markets, water and sewerage, health care and medical, higher education and research, transport, food and grocery, defence industry, space technology>
- Ownership and control: <owner, operator, direct interest holders, offshore ownership or control>
- Interdependencies: <what depends on this asset; what this asset depends on>
- Existing programme: <security frameworks, certifications, risk management, incident response>

TASK
1. ASSET DETERMINATION: is this a critical infrastructure asset, and which defined class does it fall into? Match the asset against the class definition and quote the criteria you are applying. Many classes have capacity, volume or criticality thresholds — apply them to the supplied facts and mark them [VERIFY]. Where the asset is near a threshold, give both readings and say what would settle it.
2. SWITCHED-ON OBLIGATIONS. This is the point most analyses miss: the regime contains layered obligations that are turned on for particular asset classes by rules, not applied uniformly. For this sector, work through which of these apply:
   - Register of critical infrastructure assets (ownership and operational information)
   - Mandatory cyber incident reporting
   - Critical infrastructure risk management programme
   - Enhanced cyber security obligations (for systems of national significance)
   - Government assistance and information-gathering powers
   State clearly that whether each applies to this asset class must be confirmed against the current rules, and mark [VERIFY].
3. REGISTER OBLIGATIONS: what must be reported — interest and control information, and operational information — who must report it (the direct interest holder and the responsible entity have different duties), the timeframes for initial reporting and for notifying changes, and the confidentiality of the register.
4. RISK MANAGEMENT PROGRAMME: if it applies, map it across the four hazard domains:
   - Cyber and information security
   - Personnel (including insider risk and background checking)
   - Supply chain
   - Physical security and natural hazards
   For each: what the programme must identify, minimise or eliminate, and mitigate; what the entity already has; and the gap. Cover the annual reporting requirement and the board or governing body approval of the annual report. Note that a recognised framework can be used to satisfy parts of the cyber domain — say which and what it does not cover.
5. INCIDENT REPORTING RUNBOOK. Build the operational procedure:
   - Critical cyber security incident (significant impact on availability): report within 12 hours of becoming aware.
   - Other cyber security incident (relevant impact): report within 72 hours of becoming aware.
   - Where an oral report is made, a written record follows within the required period.
   For each: what triggers it, who decides, what the report must contain, and to whom it goes. Address the hardest operational question — what "becoming aware" means and who is authorised to start the clock at 2am. Mark timings [VERIFY].
6. ENHANCED OBLIGATIONS: what applies if the asset is declared a system of national significance — statutory incident response planning, cyber security exercises, vulnerability assessments, and system information provision. Note this requires a ministerial declaration and that the entity would be notified.
7. GOVERNMENT ASSISTANCE POWERS: explain the step-in and information-gathering powers that exist for serious incidents, and what the entity should have ready — technical contacts, an escalation path, and a decision-maker available out of hours.
8. GAP SUMMARY AND PLAN: prioritised list of what to do, with owners.

RULES
- Emphasise repeatedly that obligations are applied by rules sector by sector, and that the current rules must be checked. Assuming uniform application is the classic error.
- Do not state thresholds or penalty amounts as settled; mark [VERIFY].
- Where the asset may be caught in more than one class, address each.
- Flag foreign ownership or control, which engages separate considerations.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with the asset determination.`,
    example: {
      scenario:
        'A data centre operator hosting government and financial services workloads assesses its position under the regime.',
      result:
        'Likely a critical data storage or processing asset, a checklist of which obligation layers must be confirmed as switched on for that class, a risk management programme mapped across the four hazard domains showing supply chain and personnel as the weakest, and a 12/72-hour runbook naming the on-call role authorised to start the clock.',
    },
  },
  {
    id: 'au-ddo-tmd-builder',
    name: 'DDO & TMD Builder',
    description: 'Builds a target market determination and distribution controls under the design and distribution obligations.',
    jurisdiction: 'au',
    category: 'regulatory',
    tags: ['financial-services', 'drafting', 'ddo', 'tmd', 'financial-products', 'asic', 'distribution'],
    sources: [
      { citation: 'Corporations Act 2001 (Cth), design and distribution obligations', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au' },
      { citation: 'ASIC regulatory guidance on design and distribution obligations', authority: 'guidance', publisher: 'Australian Securities and Investments Commission', jurisdiction: 'au', url: 'https://www.asic.gov.au' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services'],
    relatedSkills: ['sg-mas-notice-checker'],
    whatItDoes:
      'Produces a target market determination for a financial product that describes the class of consumers the product is likely to be consistent with, in enough detail to actually constrain distribution, plus the distribution conditions, review triggers and reporting arrangements the regime requires. It is written to avoid the failure mode regulators have criticised most: a target market drawn so broadly that it excludes nobody and therefore does no work.',
    whenToUse:
      'Before issuing or distributing a financial product to retail clients in Australia, when a review trigger fires, on the scheduled review cycle, or when distributor reporting suggests the product is reaching the wrong consumers.',
    inputs: [
      { name: 'Product description', description: 'What the product is, its key features, risks, costs and benefits.', required: true },
      { name: 'Product type', description: 'The regulatory characterisation of the product and whether it is a retail product.', required: true },
      { name: 'Distribution channels', description: 'How it reaches consumers — direct, adviser, broker, platform, comparison site.', required: true },
      { name: 'Consumer needs addressed', description: 'The objectives, financial situation and needs the product is designed to meet.' },
      { name: 'Existing data', description: 'Complaints, claims, sales and outcome data from a comparable product, if any.' },
    ],
    outputs: [
      { name: 'Target market description', description: 'The class of consumers, with likely objectives, financial situation and needs.' },
      { name: 'Excluded consumers', description: 'Who the product is expressly not for — the section that gives a TMD its force.' },
      { name: 'Distribution conditions', description: 'Controls making it likely distribution is consistent with the target market.' },
      { name: 'Review triggers', description: 'Events that would suggest the determination is no longer appropriate.' },
      { name: 'Reporting arrangements', description: 'Information required from distributors and the periods for it.' },
      { name: 'Draft TMD', description: 'A complete determination document ready for internal review.' },
    ],
    prompt: `You are an Australian financial services lawyer preparing a target market determination under the design and distribution obligations.

INPUTS
- Product: <what it is, key features, benefits, risks, costs, fees, term, liquidity, complexity>
- Product type and status: <regulatory characterisation; is it a retail product requiring a TMD? any exemption?>
- Distribution: <channels — direct, personal advice, general advice, broker, platform, comparison site, referral partners>
- Consumer needs the product is designed to meet: <objectives, financial situation, needs>
- Existing data: <complaints, claims, lapse rates, sales data, consumer outcomes for this or a comparable product>

TASK
1. SCOPE CHECK: does this product require a TMD? Confirm it is a product to which the obligations apply and that no exemption is available. If a TMD is not required, say so and stop — but flag any other design or distribution duty that still applies.
2. PRODUCT ANALYSIS: before describing the market, analyse the product honestly — what problem it solves, who it genuinely suits, and, critically, who it would harm. Identify the features that make it unsuitable for particular consumers: complexity, illiquidity, leverage, capital risk, long lock-in, high or contingent fees, or reliance on the consumer understanding a mechanism. This analysis is what makes the rest of the TMD defensible.
3. TARGET MARKET DESCRIPTION. Describe the class of retail clients the product is likely to be consistent with, across:
   - Likely objectives: what the consumer is trying to achieve
   - Likely financial situation: income, assets, liquidity needs, capacity to bear loss, investment timeframe
   - Likely needs: what need the product meets and how the product's features meet it
   Be specific enough that the description actually excludes people. A target market of "consumers seeking to grow their wealth" is not a target market — regulators have said so repeatedly. For each element, tie it back to a product feature.
4. EXCLUDED CONSUMERS: state expressly who the product is NOT for. This section does more work than any other, so make it concrete — consumers who need access to capital within a defined period, consumers who cannot bear a loss of principal, consumers relying on the product for income, consumers without the relevant experience where the product requires it.
5. DISTRIBUTION CONDITIONS: what conditions and restrictions make it likely that distribution is directed to the target market? Address each channel separately, because they carry different risks — a comparison site funnel and an advised sale need different controls. Cover eligibility questions and filters, training requirements for distributors, restrictions on channels not suited to the product, prohibitions on mass marketing where relevant, and any question set that must be asked before a sale.
6. REVIEW TRIGGERS: the events that would reasonably suggest the determination is no longer appropriate. Make them specific and measurable — complaint volumes above a stated threshold, claims or lapse ratios outside a stated range, significant dealings outside the target market, a material product change, a regulatory intervention, or distributor reporting showing a pattern. Vague triggers do not fire.
7. REVIEW PERIODS: the initial review period and the maximum periods between reviews, with the rationale for each.
8. REPORTING ARRANGEMENTS: what information distributors must give the issuer and how often — complaints and their substance, significant dealings outside the target market, and sales data. Include the timeframes and the obligation to report significant dealings promptly.
9. DRAFT THE TMD: assemble the above into a complete determination document with all the required sections, ready for internal review.

RULES
- Refuse to write a target market so broad it excludes nobody. If the inputs push toward one, say plainly that the description does not do the work the regime requires and explain what narrowing is needed.
- Tie every element of the target market to a product feature. An untied element is decoration.
- Make review triggers measurable. "Increased complaints" is not a trigger; a stated threshold is.
- Mark specific regulatory timeframes and thresholds [VERIFY] against current guidance.
- Note that record-keeping supporting the TMD and its reviews is itself an obligation.

OUTPUT FORMAT
Nine sections matching the tasks above, with the draft TMD last.`,
    example: {
      scenario:
        'An issuer prepares a TMD for a five-year fixed-term investment product with limited early withdrawal rights.',
      result:
        'A product analysis identifying illiquidity as the defining risk, a target market tied to a five-year-plus timeframe and no reliance on the capital for interim needs, an excluded-consumers section naming anyone likely to need access before maturity, channel-specific distribution conditions, and measurable review triggers based on early-withdrawal request volumes.',
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
    id: 'au-consumer-guarantees-checker',
    name: 'Consumer Guarantees & Warranty Checker',
    description: 'Checks product terms, warranties and refund policies against the Australian Consumer Law guarantee regime.',
    jurisdiction: 'au',
    category: 'compliance',
    tags: ['contract-lifecycle', 'review', 'australian-consumer-law', 'consumer-guarantees', 'warranty', 'refunds', 'accc'],
    sources: [
      { citation: 'Competition and Consumer Act 2010 (Cth), Schedule 2 (Australian Consumer Law)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Relied on for the consumer guarantees, the remedies for major and non-major failure, the prohibition on contracting out, and the prohibitions on misleading conduct and on misrepresenting consumer rights.' },
      { citation: 'Competition and Consumer Regulations 2010 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Relied on for the prescribed text a warranty against defects must contain.' },
      { citation: 'ACCC guidance on consumer guarantees, warranties and refunds', authority: 'guidance', publisher: 'Australian Competition and Consumer Commission', jurisdiction: 'au', url: 'https://www.accc.gov.au' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'technology'],
    relatedSkills: ['au-acl-unfair-terms', 'global-smart-redline'],
    whatItDoes:
      'Separates the two things suppliers routinely conflate: the consumer guarantees that attach by law and cannot be excluded, and the voluntary warranty the supplier chooses to offer on top. It tests who counts as a consumer for the goods or services in question, works out which guarantees apply, distinguishes a major failure from a non-major one because the remedy and who chooses it differ, checks any warranty against defects for the prescribed wording, and audits the customer-facing language — policies, signage, scripts and terms — for statements that misrepresent what the law already gives.',
    whenToUse:
      'Before publishing or revising a returns policy, warranty or terms of sale for the Australian market, when training or scripting a support team, when launching a product or extended warranty, and after a complaint about a refund refusal.',
    inputs: [
      { name: 'Customer-facing terms', description: 'Terms of sale, returns and refunds policy, warranty document, and any in-store or on-site signage.', required: true },
      { name: 'What is supplied', description: 'The goods or services, their price, and their expected life or duration.', required: true },
      { name: 'Customer type', description: 'Whether customers are individuals, businesses, or both, and whether goods are acquired for resale or for use in production.', required: true },
      { name: 'Support scripts', description: 'What staff or support agents are told to say about refunds, repairs and replacements.' },
      { name: 'Marketing claims', description: 'Representations about performance, durability, availability of parts or repair, and any express warranty given.' },
      { name: 'Supply chain position', description: 'Whether you are the manufacturer, importer, retailer or reseller, and what your supplier agreements say about recovery.' },
    ],
    outputs: [
      { name: 'Coverage analysis', description: 'Which supplies attract the guarantees, tested against the consumer definition and the exclusions.' },
      { name: 'Guarantee map', description: 'Each applicable guarantee for goods and for services, applied to what is actually supplied.' },
      { name: 'Remedy matrix', description: 'What the customer is entitled to for a major and a non-major failure, and who chooses.' },
      { name: 'Warranty document review', description: 'Whether a warranty against defects carries the prescribed text and is presented as required.' },
      { name: 'Misrepresentation findings', description: 'Statements in policies, signage or scripts that misstate or diminish consumer rights.' },
      { name: 'Corrected wording', description: 'Redrafted policy, warranty and script language that is accurate and still commercially usable.' },
      { name: 'Recovery position', description: 'What can be recovered up the supply chain, and what the supplier agreements need to say.' },
    ],
    prompt: `You are an Australian consumer law specialist auditing a supplier's terms, warranties and refund practices against the consumer guarantees in the Australian Consumer Law.

INPUTS
- Customer-facing terms: <terms of sale, returns and refunds policy, warranty document, signage>
- What is supplied: <goods or services, price point, expected life or duration>
- Customers: <individuals, businesses, or both; are goods ever acquired for resale or for use in production or repair?>
- Support scripts: <what staff are told to say about refunds, repairs and replacements>
- Marketing claims: <representations about performance, durability, spare parts, repair availability, and any express warranty>
- Our position: <manufacturer, importer, retailer or reseller; what supplier agreements say about recovery>

TASK
1. COVERAGE. Establish which supplies attract the guarantees. Apply the consumer definition: acquisition below the monetary threshold, or of a kind ordinarily acquired for personal, domestic or household use or consumption, or a vehicle or trailer used mainly to transport goods on public roads. Mark the threshold [VERIFY]. Address the exclusion for goods acquired for resupply or for use up or transformation in production or repair. State clearly that a business customer can still be a consumer, which is the point most often got wrong, and identify which parts of the customer base are covered.
2. GUARANTEE MAP. Set out the guarantees that apply to what is actually supplied, and apply each to the facts rather than listing them. For goods: clear title, undisturbed possession, no undisclosed securities, acceptable quality, fitness for any disclosed purpose, correspondence with description or sample, compliance with express warranties, and the availability of repair facilities and spare parts for a reasonable period unless that was disclosed otherwise before supply. For services: due care and skill, fitness for a particular purpose made known, and supply within a reasonable time where no time is fixed. For acceptable quality, work through the factors — fit for all purposes goods of that kind are commonly supplied for, acceptable in appearance and finish, free from defects, safe and durable — as a reasonable consumer fully acquainted with their condition would regard them, taking account of price and any statements on packaging or labelling.
3. NO CONTRACTING OUT. Identify every term in the documents that purports to exclude, restrict or modify a guarantee or a remedy, whether directly or by structure — a returns window shorter than the guarantee lasts, a condition of original packaging, a requirement to deal only with the manufacturer, an exclusion of consequential loss, a term making a remedy discretionary or conditional on proof of purchase in one specific form. State that such terms are void to that extent, and that including them can itself be a contravention. Address separately where liability may be limited for goods or services not of a kind ordinarily acquired for personal, domestic or household use, and the conditions on which that limitation is available.
4. MAJOR AND NON-MAJOR FAILURE. This drives everything customer-facing. Explain the distinction on the facts: a failure is major where the goods would not have been acquired by a reasonable consumer fully acquainted with the nature and extent of the failure, are substantially unfit for their common purpose and cannot easily be remedied within a reasonable time, do not match the description or sample, or are unsafe. For a major failure the consumer chooses between a refund and a replacement and may also recover damages for reasonably foreseeable loss. For a non-major failure the supplier may choose to repair, replace or refund, but must do so within a reasonable time, and if it does not the consumer can have it fixed elsewhere and recover the cost or reject the goods. Note that multiple non-major failures can together be major. Produce a remedy matrix showing the entitlement and who chooses.
5. WARRANTY AGAINST DEFECTS. If a warranty against defects is given, check it against the prescribed requirements: that it is in a document the consumer can understand, sets out what the warrantor will do and what the consumer must do to claim, gives the warrantor's contact details, states the claim period and who bears the expense of claiming, and includes the prescribed mandatory text stating that the benefits are in addition to other rights and remedies under the law. Mark the exact prescribed wording [VERIFY] and say it must be reproduced, not paraphrased. Flag any warranty presented in a way that implies it is the customer's only recourse.
6. MISREPRESENTING CONSUMER RIGHTS. Audit the policies, signage, scripts and marketing for statements that misstate rights. Common contraventions include no refunds statements, refunds only within a stated number of days, credit note only, no returns on sale items, referring a customer to the manufacturer as their only option, requiring the original packaging, and telling a customer a warranty has expired when the guarantees still apply. Treat each as a potential contravention of the prohibition on misleading representations concerning a guarantee, right or remedy, and note that this is enforced actively and attracts civil penalties. Assess the same material against the general prohibition on misleading or deceptive conduct.
7. MANUFACTURER AND SUPPLY CHAIN. Identify what a consumer can claim directly against a manufacturer or importer, and what a retailer who provides a remedy can recover from the manufacturer by way of indemnity. Then check whether the supplier agreements actually support that recovery, and say what they should say.
8. CORRECTED WORDING. Redraft the returns policy, the warranty statement and the key support script lines so that they are accurate, and keep them usable — an accurate policy can still set out the process, the evidence of purchase the supplier prefers, and what falls outside the guarantees, such as damage caused by misuse or ordinary wear.

RULES
- Keep the guarantees and any voluntary warranty separate throughout. Conflating them is the source of most contraventions in this area.
- Never state or imply that a guarantee has a fixed duration. Its duration depends on the nature of the goods, the price paid and what a reasonable consumer would expect, and it can outlast a voluntary warranty.
- Do not treat a business customer as automatically outside the regime. Apply the threshold and the kind-of-goods test to the facts.
- Where an exclusion of liability might be available for non-household supplies, state the conditions rather than assuming it applies.
- Mark monetary thresholds, prescribed wording and penalty levels [VERIFY]. They are amended and must be confirmed against the current instrument.

OUTPUT FORMAT
Open with the contraventions that most need fixing and why. Then the sections above, with tables for the guarantee map, the remedy matrix and the misrepresentation findings, closing with the corrected wording as ready-to-use text.`,
    example: {
      scenario:
        'An online retailer selling appliances to both households and small businesses reviews its returns policy and warranty card before a national campaign.',
      result:
        'A thirty-day returns window and a store-credit-only clause identified as void attempts to contract out of the guarantees and as misrepresentations of consumer rights, business customers buying single units found to be consumers despite a terms clause saying otherwise, the warranty card missing the prescribed mandatory text, and redrafted policy and warranty wording that keeps the proof-of-purchase process while stating the position accurately.',
    },
  },
  {
    id: 'au-director-duties-checker',
    name: 'Director Duties & Insolvent Trading Checker',
    description: 'Tests a board decision against Australian director duties, insolvent trading exposure and the safe harbour.',
    jurisdiction: 'au',
    category: 'corporate',
    tags: ['corporate-transactions', 'assessment', 'directors-duties', 'insolvent-trading', 'safe-harbour', 'corporations-act', 'governance'],
    sources: [
      { citation: 'Corporations Act 2001 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Relied on for the statutory duties of care and diligence, good faith and proper purpose, use of position and information, the business judgment rule, insolvent trading and its defences, the safe harbour, related party rules and continuous disclosure.' },
      { citation: 'ASIC regulatory guidance on directors, insolvency and disclosure', authority: 'guidance', publisher: 'Australian Securities and Investments Commission', jurisdiction: 'au', url: 'https://asic.gov.au' },
      { citation: 'ASX Listing Rules', authority: 'regulator', publisher: 'ASX Limited', jurisdiction: 'au', url: 'https://www.asx.com.au', note: 'Applies only to listed entities; relied on for the continuous disclosure obligation that sits alongside the statutory one.' },
      { citation: 'General law duties of directors', authority: 'primary', publisher: 'Australian courts', jurisdiction: 'au', note: 'The general law duties run in parallel with the statutory duties and are not displaced by them. Different consequences follow from each.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-sec-disclosure-trigger', 'au-soci-obligations-mapper'],
    whatItDoes:
      'Takes a specific board decision and tests it against each statutory and general law duty separately, because they have different elements, different defences and different consequences. It assesses whether the business judgment rule is actually available on the facts, works through solvency and the elements of insolvent trading including the defences and the safe harbour, identifies the conflicts, related party and financial assistance issues that need a process rather than a view, and states what the minute has to record for the reasoning to be defensible later rather than reconstructed.',
    whenToUse:
      'Before a board resolves on a transaction, a distribution, continued trading in financial difficulty, or a related party dealing, and when a director asks what their personal exposure is.',
    inputs: [
      { name: 'The decision', description: 'What the board is being asked to approve, and the alternatives considered.', required: true },
      { name: 'Company financial position', description: 'Current and forecast cash, debts falling due, facilities, covenants, and any arrears.', required: true },
      { name: 'Board composition and interests', description: 'Directors, their other roles, and any interest any of them has in the matter.', required: true },
      { name: 'Information before the board', description: 'The papers, advice and forecasts provided, and when directors received them.' },
      { name: 'Entity type', description: 'Proprietary or public, listed or unlisted, and whether the company is part of a group.' },
      { name: 'Process to date', description: 'Prior discussions, delegations, management recommendations and any advice obtained.' },
    ],
    outputs: [
      { name: 'Duty-by-duty analysis', description: 'Each statutory and general law duty applied to the decision, with the elements set out.' },
      { name: 'Business judgment rule assessment', description: 'Whether the protection is available here, tested against each of its conditions.' },
      { name: 'Solvency assessment', description: 'The solvency question addressed directly, with the indicators and the reasonable grounds test.' },
      { name: 'Insolvent trading exposure', description: 'Each element of the liability, the available defences, and whether the safe harbour applies.' },
      { name: 'Conflicts and approvals', description: 'Related party, financial assistance and interest disclosure issues, with the approval path for each.' },
      { name: 'Disclosure obligations', description: 'Whether the decision triggers continuous disclosure or other reporting.' },
      { name: 'Minute requirements', description: 'What the board paper and minute must record for the reasoning to stand up later.' },
    ],
    prompt: `You are an Australian corporate lawyer advising a board on directors duties and insolvent trading exposure under the Corporations Act in relation to a specific decision.

INPUTS
- The decision: <what the board is being asked to approve, and what alternatives were considered>
- Financial position: <current cash, forecast cash by month, debts falling due and when, facilities and headroom, covenant position, any arrears including tax and superannuation>
- Board: <directors, their other directorships and roles, and any interest any of them has in this matter>
- Information before the board: <papers, advice, forecasts, and when directors received them>
- Entity: <proprietary or public, listed or unlisted, position in any group structure>
- Process to date: <prior discussions, delegations, management recommendation, advice obtained>

TASK
1. DUTY-BY-DUTY ANALYSIS. Take each duty in turn, state its elements, and apply them to this decision:
   - Care and diligence: the standard of a reasonable person in that company's circumstances holding that office with those responsibilities. Address what enquiry a director should have made here, and note that the standard is objective and does not fall because a director is non-executive or was not given the papers in time.
   - Good faith in the best interests of the company, and for a proper purpose. Identify whose interests the company's interests refer to on these facts, and address the shift toward creditors interests as insolvency becomes a real possibility.
   - Use of position and use of information: whether any director stands to gain an advantage, or another person does, or the company could be harmed.
   - The equivalent general law duties, which run in parallel and are not displaced by the statutory provisions.
   For each, state whether the risk is low, moderate or high on the facts, and what would reduce it.
2. BUSINESS JUDGMENT RULE. Test whether the protection is actually available for the care and diligence duty here. Work through each condition: that the judgment was made in good faith for a proper purpose; that the director has no material personal interest in the subject matter; that they informed themselves about the subject matter to the extent they reasonably believed appropriate; and that they rationally believe the judgment is in the best interests of the company. Say plainly where the informed-decision condition is not met on the information actually before the board, and note that the rule does not protect a failure to make any decision at all.
3. SOLVENCY. Address solvency directly rather than assuming it. State the test — whether the company is able to pay all its debts as and when they become due and payable — and apply it. Work through the usual indicators: continuing losses, liquidity ratios, overdue tax and superannuation, no access to further finance, creditors unpaid outside terms, suppliers on cash-on-delivery, dishonoured payments, inability to produce timely financial records, and reliance on informal or unenforceable support. Reach a conclusion: solvent, doubtful, or insolvent, and say what evidence would change it. Note that support from a parent or shareholder counts only to the extent it is legally enforceable and the supporter is itself able to provide it.
4. INSOLVENT TRADING. Set out each element: that the person was a director at the time; that the company incurred a debt; that the company was insolvent at that time or became insolvent by incurring it; that there were reasonable grounds to suspect insolvency; and that the director was aware of grounds for suspecting, or a reasonable person in a like position would have been. Address when a debt is incurred for these purposes, which is not always when it is paid. Then work through the defences — reasonable grounds to expect solvency and an expectation based on reliance on a competent and reliable person providing adequate information, non-participation because of illness or other good reason, and reasonable steps to prevent the debt being incurred. Say which, if any, is realistically available here, and note that hope is not expectation and that a director who is simply absent is not excused. State that liability is personal, and identify the other personal exposures that travel with it, including director penalty notices for unpaid tax and superannuation.
5. SAFE HARBOUR. Assess whether the safe harbour from insolvent trading is available or could be established. It requires that the director start developing one or more courses of action reasonably likely to lead to a better outcome for the company than immediate administration or liquidation, and that the debt be incurred directly or indirectly in connection with that course. Work through the indicative factors: keeping properly informed of the company's financial position, taking steps to prevent misconduct by officers and employees, keeping appropriate financial records, obtaining advice from an appropriately qualified entity, and developing or implementing a restructuring plan. Then state the conditions that must be maintained for it to remain available, including payment of employee entitlements as they fall due and compliance with tax reporting obligations, and note that the burden of establishing it falls on the director and that the contemporaneous record is what discharges it.
6. CONFLICTS, RELATED PARTIES AND CAPITAL. Identify anything that requires a process rather than a judgment: disclosure of material personal interests and the restrictions on a conflicted director voting or being present, which differ for proprietary and public companies; the related party rules and whether an exception such as arm's length terms applies or member approval is required; financial assistance by a company for the acquisition of shares in itself or its holding company; the requirements for a dividend; any reduction of capital or buy-back; and any transaction that could be examined later as an unreasonable director-related transaction or a voidable transaction if the company fails. For each, give the approval path rather than a conclusion.
7. DISCLOSURE AND REPORTING. For a listed entity, assess continuous disclosure, including whether the decision or the underlying circumstances are market sensitive and whether an exception applies. For any entity, identify reporting obligations triggered — to financiers under covenants, to auditors, to insurers, to regulators, and to the members.
8. MINUTE REQUIREMENTS. Specify what the board paper and the minute must record for this reasoning to stand up when it is examined later, potentially by a liquidator with the benefit of hindsight: the alternatives considered and rejected with reasons, the information relied on and its source, the enquiries made and the answers received, the solvency assessment and its basis, any advice obtained and whether it was followed, interests disclosed and how they were handled, and any dissent. State that reconstructing this after the fact carries little weight and that the minute should be settled promptly.

RULES
- Analyse each duty separately. They have different elements, different defences and different consequences, and collapsing them produces advice that is wrong about all of them.
- Do not assume the business judgment rule protects the decision. Test its conditions, especially whether the board was adequately informed.
- Address solvency explicitly in every assessment where the financial position is anything short of comfortable. Not raising it is itself a failing.
- Distinguish what the company must do from what each director must do. Exposure under these provisions is personal and is not answered by a company-level conclusion.
- Mark thresholds, penalty levels and any procedural time limit [VERIFY]. Do not state them from memory.
- Where the facts suggest the company may already be insolvent, say so plainly and say that formal insolvency advice is required now rather than after the next decision.

OUTPUT FORMAT
Open with a risk rating for the decision and for the directors personally, and the single step that most reduces it. Then the eight sections above, with a table for the duty-by-duty analysis and a checklist for the minute requirements.`,
    example: {
      scenario:
        'The board of a private company with three months of cash and overdue superannuation is asked to approve a new supply contract and a loan from a director-related entity.',
      result:
        'Solvency assessed as doubtful with overdue superannuation and supplier arrears identified as indicators, insolvent trading exposure explained for each new debt with the reliance defence found unavailable on the information actually provided to the board, the safe harbour identified as potentially available but requiring adviser engagement and superannuation to be brought current first, the director loan flagged as a related party transaction needing an arms length assessment or member approval, and a list of what the minute had to record.',
    },
  },
  {
    id: 'au-retail-lease-reviewer',
    name: 'Retail & Commercial Lease Reviewer',
    description: 'Reviews an Australian retail or commercial lease against the retail leases legislation of the relevant State.',
    jurisdiction: 'au',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'retail-lease', 'commercial-lease', 'outgoings', 'make-good', 'property'],
    sources: [
      { citation: 'Retail leases legislation of the States and Territories', authority: 'primary', publisher: 'State and Territory legislatures', jurisdiction: 'au', note: 'Eight separate statutes with materially different coverage tests, disclosure regimes, minimum terms, prohibited terms and dispute procedures. The location of the premises determines which applies, and a lease drafted for one State frequently breaches another.' },
      { citation: 'Competition and Consumer Act 2010 (Cth), Schedule 2 (Australian Consumer Law)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Relied on for the unfair contract terms regime, which can apply to a standard-form lease with a small business tenant, and for misleading conduct in pre-lease representations.' },
      { citation: 'State small business commissioner guidance on retail leasing', authority: 'guidance', publisher: 'State small business commissioners', jurisdiction: 'au', note: 'Several States channel retail tenancy disputes through a commissioner before a tribunal. Guidance differs by State and is not binding.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'professional-services'],
    relatedSkills: ['au-acl-unfair-terms', 'us-commercial-lease-reviewer'],
    whatItDoes:
      'Starts with the question that decides everything else: whether the premises are caught by the retail leases legislation of the State they sit in, because that legislation overrides the lease and voids terms the parties agreed. It then checks the disclosure statement and its timing, tests the rent review, outgoings and recovery terms against the prohibitions that apply in that State, and works through the terms that decide what the tenancy costs to hold and to leave — make good, assignment, relocation and demolition, security and any personal guarantee.',
    whenToUse:
      'Before signing a lease, an assignment or a renewal, when a landlord issues its form after heads of agreement, when an outgoings reconciliation or a rent review looks wrong, and before exercising or letting an option lapse.',
    inputs: [
      { name: 'Lease document', description: 'The lease with every annexure, plan and special condition, and any agreement for lease.', required: true },
      { name: 'Premises location', description: 'The State or Territory and the address, since the applicable Act turns on where the premises are.', required: true },
      { name: 'Premises use and setting', description: 'The permitted use, and whether the premises are in a shopping centre, a strip location or a standalone building.', required: true },
      { name: 'Disclosure statement', description: 'The disclosure statement given, and the date it was provided relative to signing.' },
      { name: 'Tenant profile', description: 'Entity, whether it is a small business, and whether a guarantee or bank guarantee is sought.' },
      { name: 'Commercial terms agreed', description: 'The heads of agreement, so the lease can be tested against what was negotiated, plus any fit-out contribution.' },
    ],
    outputs: [
      { name: 'Coverage determination', description: 'Whether the retail leases legislation of the relevant State applies, and what follows either way.' },
      { name: 'Disclosure compliance', description: 'Whether the disclosure statement was given, in time and complete, and the remedies where it was not.' },
      { name: 'Prohibited terms', description: 'Terms void or unenforceable under the applicable Act, including ratchet clauses and prohibited recoveries.' },
      { name: 'Occupancy cost analysis', description: 'Rent, reviews and outgoings as drafted, with the recovery mechanism tested against the estimates given.' },
      { name: 'Exit and end-of-term analysis', description: 'Assignment, options, relocation and demolition, make good and holding over.' },
      { name: 'Unfair terms overlay', description: 'Where the lease is standard form and the tenant a small business, terms exposed under the unfair contract terms regime.' },
      { name: 'Negotiation priorities', description: 'Proposed changes ranked by value, with replacement wording for the priorities.' },
    ],
    prompt: `You are an Australian property lawyer reviewing a retail or commercial lease for the tenant.

INPUTS
- Lease and annexures: <paste, including plans, special conditions and any agreement for lease>
- Premises: <State or Territory, address, lettable area, and whether in a shopping centre, a strip location or standalone>
- Use: <permitted use, and what the tenant will actually do>
- Disclosure statement: <paste, with the date given relative to the date of signing — or state that none was given>
- Tenant: <entity, whether a small business, turnover, whether a personal or bank guarantee is sought>
- Agreed terms: <heads of agreement, incentives, fit-out contribution>

TASK
1. COVERAGE. Determine whether the retail leases legislation of the State or Territory where the premises are located applies. Each jurisdiction has its own Act with its own test, turning on some combination of the use of the premises, their location in a retail shopping centre, the lettable area, the rent, and whether the tenant is a listed corporation or its subsidiary. Identify the applicable Act by name, apply its coverage test to these facts, and mark every threshold [VERIFY]. State the consequence plainly: where the Act applies it overrides inconsistent lease terms and cannot be contracted out of, so coverage is the first question and not a formality. If coverage is uncertain, advise proceeding as though the Act applies.
2. DISCLOSURE STATEMENT. Where the Act applies, check whether a disclosure statement was given, whether it was given within the required period before the lease was entered into, and whether it is complete and accurate. Identify the remedies available for a statement that was late, missing, incomplete or misleading — which vary by State and can include a right to terminate within a limited window, compensation, or the tenant being excused from certain payments. Compare the disclosure statement against the lease and list every inconsistency, since the tenant may be able to rely on the statement.
3. TERM AND MINIMUM TERM. State the term, the commencement mechanism and whether any minimum term applies in that jurisdiction, including how options count toward it and whether a waiver certified by a lawyer is available. Check registration requirements and who bears the cost.
4. RENT AND REVIEWS. Set out the base rent and every review mechanism. Test each against the applicable Act:
   - Whether a ratchet clause preventing rent falling on review is void in that jurisdiction.
   - Whether more than one review basis in the same period is prohibited.
   - Whether turnover rent is permitted, what turnover is defined to include and exclude, and what information the landlord may require.
   - How a market review is determined, the timing, whether a valuer determination is binding, who appoints and who pays, and whether the tenant can trigger the review or only respond.
   - Whether a review on the exercise of an option is permitted and how it interacts with the option notice dates.
5. OUTGOINGS AND RECOVERIES. This is where retail tenants are most often overcharged. Assess:
   - Whether outgoings are recoverable at all under the Act unless estimated and disclosed in advance, and the consequence where the estimate was not given.
   - The annual estimate, the audited statement, the reconciliation, and the tenant's rights when the actual figures exceed the estimate.
   - Prohibited recoveries in that jurisdiction, which commonly include land tax in some States but not others, capital costs, landlord contributions to a sinking fund in some jurisdictions, and the landlord's own finance or management costs. Do not assume a national position — state the rule for this State and mark it [VERIFY].
   - Whether the tenant is charged a proportion calculated on a stated and verifiable basis.
   - Legal and lease preparation costs, and whether the Act limits what the landlord can pass on.
   - Any promotion or marketing levy, what the landlord must account for, and whether an expenditure statement is required.
6. FIT-OUT, INCENTIVES AND MAKE GOOD. Check the fit-out obligation, the incentive or contribution and any clawback on early termination or default, and the make good obligation. Assess whether make good requires removal of the fit-out the landlord required and contributed to, whether the standard is defined or left open, whether it is limited to the condition at commencement fair wear and tear excepted, and whether a photographic condition report exists. Recommend agreeing the make good scope and any exclusions in writing now, since an open-ended obligation is priced by the landlord at the end of the term when the tenant has no leverage.
7. ASSIGNMENT, RELOCATION AND DEMOLITION. Assess the assignment procedure, the grounds on which consent may be withheld, and whether the Act limits them or releases the assignor and any guarantor on a compliant assignment. Then assess any relocation clause — the notice required, the alternative premises standard, the compensation payable and the tenant's right to terminate instead — and any demolition clause, including whether genuine demolition is required and what notice and compensation apply. These clauses are heavily regulated and the lease version is frequently narrower than the Act allows.
8. SECURITY, GUARANTEES AND INSURANCE. Bank guarantee or bond amount, when it must be returned and any statutory time limit on return, whether the amount ratchets with rent, and any personal guarantee — its cap, its duration, and whether it survives assignment. Then the insurance obligations, public liability limits, plate glass, and whether the tenant pays for the landlord's insurance.
9. THE REMAINING TERMS. Cover: permitted use and any exclusivity or restriction; trading hours and any obligation to trade; core trading hours costs; repair and maintenance and the split between structure and services; landlord access; damage and destruction and rent abatement; default, notice and cure; holding over and the rent that then applies; option exercise dates and the consequences of late notice; and dispute resolution, including any requirement to go through a small business commissioner or tribunal before a court.
10. UNFAIR TERMS OVERLAY. Where the lease is standard form and the tenant is a small business, assess the terms most exposed under the unfair contract terms regime — unilateral variation, one-sided termination, automatic renewal without an exit, unlimited indemnities and one-way liability caps — and note that this applies whether or not the retail leases Act does.
11. NEGOTIATION PRIORITIES. Rank the proposed changes by value, separating what the Act already gives the tenant, which need not be negotiated, from what must be won in the document. Give replacement wording for the priorities.

RULES
- Identify the applicable State Act by name before analysing anything else, and never state a national rule. The Acts differ on coverage, on prohibited recoveries, on minimum terms and on remedies, and applying the wrong one produces confidently wrong advice.
- Where the Act applies, say which lease terms it overrides. Do not negotiate for something the legislation already gives the tenant.
- Mark every threshold, time limit and prohibited recovery [VERIFY] against the current version of the applicable Act.
- Read the disclosure statement against the lease. Inconsistencies between them are among the most useful findings available to a tenant and are routinely overlooked.
- Where the premises fall outside the retail Act, say so and note that the tenant then has only the lease and the general law, plus the unfair terms regime if it is a small business on standard-form paper.

OUTPUT FORMAT
Open with the coverage determination and the five terms that most need to change. Then the sections above in order, with tables for the outgoings analysis, the disclosure comparison and the negotiation priorities.`,
    example: {
      scenario:
        'A hospitality operator is handed the landlord form for a shopping centre tenancy with a disclosure statement provided two days before signing.',
      result:
        'Applicable State Act identified and coverage confirmed, the disclosure statement found to have been given later than the applicable Act requires, with the remedy explained, a ratchet clause on the market review identified as void in that jurisdiction, land tax recovery flagged as prohibited there despite appearing in the outgoings schedule, and make good found to require removal of a fit-out the landlord had contributed to, with wording proposed to limit it.',
    },
  },
];
