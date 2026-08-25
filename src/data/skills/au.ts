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
];
