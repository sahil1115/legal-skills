import type { Skill } from '../../types/skill';

/**
 * Singapore skills — PDPA, MAS notices, employment and arbitration practice.
 */
export const sgSkills: Skill[] = [
  {
    id: 'sg-pdpa-obligation-mapper',
    name: 'PDPA Obligation Mapper',
    description: 'Maps Singapore PDPA obligations to a described processing activity.',
    jurisdiction: 'sg',
    category: 'privacy',
    tags: ['data-protection', 'assessment', 'pdpa', 'singapore', 'consent', 'legitimate-interests'],
    sources: [
      { citation: 'Personal Data Protection Act 2012 (Singapore)', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg' },
      { citation: 'PDPC Advisory Guidelines', authority: 'guidance', publisher: 'Personal Data Protection Commission', jurisdiction: 'sg', url: 'https://www.pdpc.gov.sg' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['sg-pdpc-breach-notifier', 'global-data-rights-request-handler'],
    whatItDoes:
      'Walks a processing activity through the PDPA obligation set and lands on the question that matters most in practice: what the lawful basis is. Singapore\'s framework is not consent-only — deemed consent by notification and the legitimate interests and business improvement exceptions each carry their own conditions and assessment requirements — so the analysis picks a basis, tests its conditions, and documents the assessment the regime expects you to have on file. It also covers the Do Not Call obligations, which sit in the same Act and are frequently overlooked.',
    whenToUse:
      'Before launching a new processing activity in Singapore, when reviewing whether a consent-based approach is sustainable, when appointing a data protection officer and building the programme, or when a customer asks how you comply.',
    inputs: [
      { name: 'Processing description', description: 'What personal data, about whom, for what purposes, by what means.', required: true },
      { name: 'Collection method', description: 'How the data is collected and what notice is given at the time.', required: true },
      { name: 'Current basis', description: 'What you rely on now — consent, deemed consent, or an exception.' },
      { name: 'Disclosures and transfers', description: 'Third parties who receive the data, including any transfer outside Singapore.' },
      { name: 'Marketing activity', description: 'Whether Singapore telephone numbers are used for marketing messages.' },
    ],
    outputs: [
      { name: 'Obligation map', description: 'Each PDPA obligation applied to the activity, with what compliance requires.' },
      { name: 'Lawful basis analysis', description: 'Consent, deemed consent or exception, with the conditions for each tested.' },
      { name: 'Assessment documentation', description: 'The written assessment the chosen basis requires you to hold.' },
      { name: 'Notification drafting', description: 'Notice language matched to the basis relied on.' },
      { name: 'Transfer analysis', description: 'The transfer limitation obligation applied to any offshore recipient.' },
      { name: 'DNC compliance', description: 'Do Not Call obligations where marketing to Singapore numbers is involved.' },
    ],
    prompt: `You are a Singapore data protection lawyer mapping PDPA obligations to a processing activity.

INPUTS
- Processing activity: <what personal data, whose, for what purposes, by what means, at what scale>
- Collection: <how collected, what notice is given at the point of collection, what the individual is told>
- Current lawful basis: <consent / deemed consent by conduct / deemed consent by notification / an exception / not decided>
- Disclosures and transfers: <third parties receiving the data, including any recipient outside Singapore>
- Marketing: <do we send marketing messages to Singapore telephone numbers? by what channel?>
- Our role: <are we the organisation, or a data intermediary processing on behalf of another?>

TASK
1. ROLE CHECK: are we the organisation or a data intermediary? A data intermediary processing on behalf of another organisation has a reduced obligation set focused on protection and retention, so establish this first.
2. LAWFUL BASIS ANALYSIS. This is the core of the assessment. Work through the available bases and pick one per purpose:
   a. CONSENT: was it validly obtained? Consent must not be a condition of providing a product or service beyond what is reasonable to provide it, must not be obtained by false or misleading information, and the individual must be notified of the purposes. Note the right to withdraw consent and the obligation to inform the individual of the likely consequences of withdrawal.
   b. DEEMED CONSENT BY CONDUCT: where the individual voluntarily provides the data for a purpose and it is reasonable that they would do so.
   c. DEEMED CONSENT BY NOTIFICATION: available only if the conditions are satisfied — an assessment that the collection, use or disclosure is not likely to have an adverse effect on the individual, taking reasonable steps to notify, and giving a reasonable opt-out period. Set out each condition and whether it is met.
   d. LEGITIMATE INTERESTS EXCEPTION: requires an assessment that the benefit to the organisation or another person outweighs any adverse effect on the individual, identification and mitigation of adverse effects, and disclosure of reliance on the exception. Note it is not available for sending marketing messages.
   e. BUSINESS IMPROVEMENT EXCEPTION: available for defined internal purposes where the conditions are met.
   f. OTHER EXCEPTIONS: including those for evaluative purposes, employment, and vital interests.
   Conclude with the basis for each purpose and what must be documented.
3. OBLIGATION MAP. Apply each obligation to the activity and say what compliance requires here:
   - Consent obligation
   - Purpose limitation: purposes a reasonable person would consider appropriate
   - Notification: telling individuals the purposes on or before collection
   - Access and correction: responding to requests, applicable exceptions, and timeframes
   - Accuracy
   - Protection: reasonable security arrangements
   - Retention limitation: ceasing retention when the purpose is no longer served and retention is no longer necessary for legal or business purposes
   - Transfer limitation
   - Accountability: policies, practices, complaints handling, and the requirement to designate at least one individual as a data protection officer whose business contact information is made available
   - Data breach notification
   - Data portability, where applicable
4. ASSESSMENT DOCUMENTATION: draft the written assessment the chosen basis requires. For deemed consent by notification and the legitimate interests exception, this document is the compliance artefact — if it does not exist, the basis is not properly available. Include the benefit identified, the adverse effects considered, the mitigations, and the conclusion.
5. NOTIFICATION DRAFTING: draft notice language matched to the basis. Where the legitimate interests exception is relied on, the reliance must be disclosed — draft that disclosure.
6. TRANSFER ANALYSIS: for any recipient outside Singapore, apply the transfer limitation obligation — the transferring organisation must take appropriate steps to ensure the recipient is bound by legally enforceable obligations to provide a comparable standard of protection. Identify which mechanism is being used (contract, binding corporate rules, certification, or another basis) and what it must contain.
7. DNC COMPLIANCE: if marketing messages are sent to Singapore telephone numbers, address the Do Not Call obligations — checking the relevant registers before sending, the validity period of a check, the exemptions including for an ongoing relationship, and the required sender identification and contact information in the message. Note that the legitimate interests exception does not cover marketing.
8. GAPS AND ACTIONS: what is missing, prioritised, with owners.

RULES
- Do not default to consent. Singapore's framework offers alternatives, and consent that cannot practically be withdrawn or refused is weak. Recommend the basis that actually fits.
- Where an exception is relied on, insist on the written assessment. Say plainly that the exception is not available without it.
- Distinguish clearly between the organisation's obligations and a data intermediary's reduced set.
- Mark specific timeframes and thresholds [VERIFY] against current advisory guidelines.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with the lawful basis conclusion.`,
    example: {
      scenario:
        'A Singapore fintech wants to use transaction data to build fraud-detection models and to send product offers to existing customers.',
      result:
        'Two purposes separated: the fraud-detection use analysed under the business improvement and legitimate interests routes with a drafted assessment, and the marketing use held to require consent plus DNC register checks — with a note that the legitimate interests exception cannot carry the marketing.',
    },
  },
  {
    id: 'sg-pdpc-breach-notifier',
    name: 'PDPC Breach Notifier',
    description: 'Assesses a data breach against the PDPA notification thresholds and drafts the notifications.',
    jurisdiction: 'sg',
    category: 'privacy',
    tags: ['data-protection', 'incident-response', 'pdpa', 'data-breach', 'pdpc', 'notification'],
    sources: [
      { citation: 'Personal Data Protection Act 2012 (Singapore)', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg' },
      { citation: 'Subsidiary legislation on data breach notification made under the PDPA', authority: 'primary', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg', note: 'Prescribed thresholds and periods must be confirmed against the current instrument.' },
      { citation: 'PDPC Advisory Guidelines', authority: 'guidance', publisher: 'Personal Data Protection Commission', jurisdiction: 'sg', url: 'https://www.pdpc.gov.sg' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['sg-pdpa-obligation-mapper', 'au-privacy-ndb-assessor'],
    whatItDoes:
      'Runs the notifiable data breach analysis under the PDPA: whether the incident is a data breach, whether it meets either notification threshold — significant harm to affected individuals, or significant scale — and what the assessment and notification clocks require. It manages the tight timelines the regime imposes, drafts both the regulator and the individual notifications, and handles the data intermediary\'s separate duty to notify the organisation it processes for, which is often missed in a vendor incident.',
    whenToUse:
      'Immediately on discovering or being told of a possible breach affecting personal data in Singapore, including when the breach happened at a vendor rather than at you.',
    inputs: [
      { name: 'Incident description', description: 'What happened, when, how discovered, and whether it is contained.', required: true },
      { name: 'Data involved', description: 'Categories of personal data and whether any falls into the prescribed harm categories.', required: true },
      { name: 'Scale', description: 'Number of affected individuals, or the best current estimate.', required: true },
      { name: 'Your role', description: 'Whether you are the organisation or a data intermediary — the duties differ.', required: true },
      { name: 'Remedial action', description: 'Steps taken and whether they eliminate the risk of harm.' },
    ],
    outputs: [
      { name: 'Breach determination', description: 'Whether this is a data breach within the definition.' },
      { name: 'Threshold assessment', description: 'Both notification thresholds tested against the facts.' },
      { name: 'Timeline', description: 'The assessment period and notification deadlines, with dates calculated.' },
      { name: 'Intermediary duty', description: 'The separate notification duty where a data intermediary is involved.' },
      { name: 'Draft notifications', description: 'Regulator notification and individual notification with the required content.' },
      { name: 'Exceptions analysis', description: 'Where notification to individuals may not be required.' },
    ],
    prompt: `You are a Singapore privacy lawyer assessing a data breach under the PDPA notification obligations. The timelines here are short — lead with the dates.

INPUTS
- Incident: <what happened, when it occurred, when we became aware, how discovered, containment status>
- Data involved: <categories of personal data; any identity documents, financial account details, credentials, health data, or other sensitive categories>
- Scale: <number of affected individuals, or current estimate and how it was derived>
- Our role: <organisation / data intermediary processing for another organisation>
- Remedial action: <what was done, when, and whether it eliminates the risk of harm>
- Vendor involvement: <did this occur at a vendor or sub-processor?>

TASK
1. BREACH DETERMINATION: is this a data breach — unauthorised access, collection, use, disclosure, copying, modification or disposal of personal data, or a loss of storage media or a device on which personal data is stored in circumstances where unauthorised access is likely? State which limb applies.
2. ROLE AND DUTY:
   - If we are a DATA INTERMEDIARY: our primary duty is to notify the organisation on whose behalf we process, WITHOUT UNDUE DELAY, once we have credible grounds to believe a breach has occurred. We do not assess the notification thresholds — the organisation does. Say this plainly and give the notification wording. This duty is frequently missed in vendor incidents.
   - If we are the ORGANISATION: continue with the full assessment, including a breach that occurred at our vendor.
3. ASSESSMENT OBLIGATION: on having reason to believe a breach has occurred, the organisation must conduct a reasonable and expeditious assessment of whether it is a notifiable breach. State the date this obligation started and note the expectation that the assessment is completed within a short period — mark the specific period [VERIFY] against current guidance. Record what the assessment must cover.
4. THRESHOLD ASSESSMENT. A breach is notifiable if EITHER threshold is met — assess both, independently:
   a. SIGNIFICANT HARM: the breach results in, or is likely to result in, significant harm to affected individuals. The regulations prescribe categories of personal data where significant harm is deemed or presumed — including identity and financial information of specified kinds. Work through whether the data involved falls into a prescribed category, and separately assess likely harm on the facts if it does not.
   b. SIGNIFICANT SCALE: the breach affects, or is likely to affect, a number of individuals at or above the prescribed threshold. Apply the threshold to the estimate supplied and mark it [VERIFY].
   Conclude NOTIFIABLE / NOT NOTIFIABLE, with the reasoning for each threshold separately.
5. EXCEPTIONS TO INDIVIDUAL NOTIFICATION: even where a breach is notifiable, notification to affected individuals may not be required where remedial action has been taken that renders it unlikely the breach will result in significant harm, or where technological protection such as strong encryption was applied so that the data is unlikely to be usable. Assess whether either applies here — but be rigorous: partial or planned remediation does not qualify, and the reasoning must be documented. Note that these exceptions do not remove the duty to notify the regulator.
6. TIMELINE: calculate and present the key dates — when we became aware, when the assessment must be complete, when the regulator must be notified (as soon as practicable, and in any case within the prescribed period from determining the breach is notifiable), and when individuals must be notified. Present these as a dated schedule, not as a description of the rules. Mark the prescribed periods [VERIFY].
7. DRAFT THE REGULATOR NOTIFICATION with the required content: the circumstances and cause, the personal data and individuals affected, the potential harm, the remedial and mitigation actions taken or planned, and contact details for the person handling it.
8. DRAFT THE INDIVIDUAL NOTIFICATION: plain language, what happened, what data was involved, the potential harm, what we are doing, what the individual should do, and how to contact us. Do not minimise.
9. RELATED OBLIGATIONS: flag anything else the facts may engage — sector regulator notification for regulated entities, contractual notification duties, law enforcement engagement where criminal activity is suspected, and other privacy regimes if affected individuals are outside Singapore.

RULES
- Open with the dates. Under this regime the timeline drives everything.
- Assess both thresholds independently. Meeting either makes the breach notifiable.
- Do not rely on remedial action or encryption to avoid individual notification unless the protection is genuinely complete — and say what would need to be true.
- Where the number affected is an estimate, treat the threshold question as unresolved and act on the basis that it may be met.
- Recommend documenting the assessment contemporaneously whatever the conclusion.

OUTPUT FORMAT
Nine sections matching the tasks above, opening with a dated timeline.`,
    example: {
      scenario:
        'A SaaS vendor tells its Singapore client that a misconfiguration exposed a customer table; the client does not yet know how many records were involved.',
      result:
        'The vendor\'s own duty to notify the client identified as immediate and separate, the client\'s assessment clock dated from the vendor\'s notice, both thresholds assessed with the scale limb left open pending the count, and a recommendation to prepare notifications on the assumption the threshold is met rather than waiting.',
    },
  },
  {
    id: 'sg-work-pass-planner',
    name: 'Work Pass Planner',
    description: 'Plans the right Singapore work pass route for a hire and maps the employer conditions.',
    jurisdiction: 'sg',
    category: 'employment',
    tags: ['workforce', 'assessment', 'work-pass', 'employment-pass', 'immigration', 'singapore', 'hiring'],
    sources: [
      { citation: 'Employment of Foreign Manpower Act 1990 (Singapore)', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg' },
      { citation: 'Ministry of Manpower work pass criteria and published thresholds', authority: 'regulator', publisher: 'Ministry of Manpower', jurisdiction: 'sg', url: 'https://www.mom.gov.sg', note: 'Qualifying salaries, levies and quotas change on announced cycles. Always check the current published figures.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['sg-workplace-fairness-reviewer'],
    whatItDoes:
      'Works out which work pass route fits a proposed hire, tests the candidate against the criteria that actually gate approval — qualifying salary by age and sector, the points-based assessment, and the quota and levy position for the passes that carry them — and then sets out the employer-side conditions that follow, including advertising requirements and the workforce ratios that constrain future hiring. It treats every threshold as a figure to verify, since these change on announced cycles.',
    whenToUse:
      'Before making an offer to a foreign candidate, when planning headcount that depends on pass approvals, when a renewal is approaching, or when assessing whether a role can realistically be filled from overseas at all.',
    inputs: [
      { name: 'Role details', description: 'Job title, duties, seniority, and the salary offered.', required: true },
      { name: 'Candidate profile', description: 'Nationality, age, qualifications, institution, and years of relevant experience.', required: true },
      { name: 'Employer profile', description: 'Sector, total headcount, and the local-to-foreign workforce composition.', required: true },
      { name: 'Timing', description: 'Intended start date and any hard deadline.' },
      { name: 'Dependants', description: 'Whether family members would need to accompany the candidate.' },
    ],
    outputs: [
      { name: 'Route options', description: 'The pass types available for this role and candidate, compared.' },
      { name: 'Eligibility assessment', description: 'The candidate tested against the criteria for each viable route.' },
      { name: 'Employer conditions', description: 'Advertising, quota, levy and workforce-ratio requirements that follow.' },
      { name: 'Application roadmap', description: 'Sequence, documents and realistic timeline.' },
      { name: 'Risk factors', description: 'What could cause a rejection, and what strengthens the application.' },
      { name: 'Dependants and renewal', description: 'Family pass eligibility and what renewal will require.' },
    ],
    prompt: `You are a Singapore employment and immigration adviser planning a work pass application. Every salary threshold, quota and levy rate in this area changes on announced cycles — treat all figures as [VERIFY].

INPUTS
- Role: <job title, actual duties, seniority, fixed monthly salary offered, other components>
- Candidate: <nationality, age, highest qualification and awarding institution, years of relevant experience, current location>
- Employer: <sector, total headcount, number of local employees, current foreign worker numbers by pass type, any existing quota position>
- Timing: <intended start date, hard deadlines>
- Dependants: <spouse, children — ages>

TASK
1. ROUTE OPTIONS: identify the pass types that could fit this role and candidate — the professional/managerial/executive route, the mid-skilled route, the semi-skilled route, the routes for exceptional talent and for entrepreneurs, and short-term options where the engagement is brief. For each, state in one line who it is for and whether it is plausible here. Rule out the ones that do not fit, with the reason.
2. ELIGIBILITY ASSESSMENT for each viable route:
   a. QUALIFYING SALARY: apply the fixed monthly salary threshold. State that the threshold rises with age and differs by sector, that it is benchmarked to local professional salaries, and that meeting the minimum is a floor rather than a predictor of approval. Mark all figures [VERIFY].
   b. POINTS-BASED ASSESSMENT: where the route uses a points framework, work through the criteria — salary benchmarked against local professionals in the sector, qualifications, the employer's workforce diversity, and the employer's support for local employment — plus any bonus criteria for skills in shortage or for roles supporting economic priorities. Estimate the position and identify the criteria most within the employer's control.
   c. QUALIFICATIONS AND EXPERIENCE: how the candidate's qualification and institution are likely to be assessed, and whether experience can compensate.
   d. QUOTA AND LEVY: for routes that carry them, apply the dependency ratio ceiling to the employer's workforce composition, calculate the local headcount required to support this hire, and identify the levy tier. Show the arithmetic.
3. EMPLOYER CONDITIONS: what the employer must do —
   - Advertising requirements: where the role must be advertised, for how long, and the exemptions available. Explain that fair consideration of local candidates must be genuine and that the record of it matters.
   - Workforce ratio implications: how this hire changes the ratio and what it constrains next.
   - Ongoing obligations: notifying changes in salary, role or employment status; cancellation on termination; medical insurance and other conditions where the route requires them.
   - Fair consideration expectations and the consequences of an adverse assessment of the employer's hiring practices.
4. APPLICATION ROADMAP: the sequence — advertising period, application, likely processing time, in-principle approval, entry, medical examination if required, pass issuance. Give a realistic end-to-end timeline against the intended start date and flag if it does not fit.
5. RISK FACTORS: what could cause rejection — salary near the threshold, a qualification from an institution likely to attract scrutiny, a weak workforce ratio, a role description that reads as junior, or a mismatch between the title and the duties. For each, what would strengthen the application.
6. DEPENDANTS: which family passes the candidate's salary level supports, and what each permits.
7. RENEWAL OUTLOOK: what renewal will require, and what could change before then — salary progression, threshold increases, and workforce composition.

RULES
- Never state a salary threshold, levy rate, quota percentage or processing time as fact. Mark every figure [VERIFY] and name the source to check.
- Do not present the qualifying salary as a likelihood of approval. Say clearly that meeting it is necessary but not sufficient.
- If the role is unlikely to be approved, say so directly and set out the alternatives, including restructuring the role or hiring locally.
- Where the employer's workforce composition is the binding constraint rather than the candidate, make that the headline.

OUTPUT FORMAT
Seven sections matching the tasks above, opening with a recommended route and a candid likelihood assessment.`,
    example: {
      scenario:
        'A 40-person Singapore company wants to hire an overseas data engineer with five years of experience and a degree from a mid-ranked university.',
      result:
        'The professional route identified as the only realistic option, the salary offered found to sit close to the age-adjusted threshold and flagged as a rejection risk, the points assessment showing workforce diversity as the weakest employer-controlled criterion, and a timeline that misses the intended start date by three weeks.',
    },
  },
  {
    id: 'sg-mas-notice-checker',
    name: 'MAS Notice Checker',
    description: 'Identifies which MAS notices and guidelines apply to an activity and maps the obligations.',
    jurisdiction: 'sg',
    category: 'regulatory',
    tags: ['financial-services', 'assessment', 'mas', 'singapore', 'regulatory', 'licensing'],
    sources: [
      { citation: 'Securities and Futures Act 2001, Financial Advisers Act 2001 and Payment Services Act 2019 (Singapore)', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg' },
      { citation: 'MAS notices', authority: 'regulator', publisher: 'Monetary Authority of Singapore', jurisdiction: 'sg', url: 'https://www.mas.gov.sg', note: 'Binding on the entities they address.' },
      { citation: 'MAS guidelines', authority: 'guidance', publisher: 'Monetary Authority of Singapore', jurisdiction: 'sg', url: 'https://www.mas.gov.sg', note: 'Not law, but departure must be justified and documented. Do not conflate with notices.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services'],
    relatedSkills: ['eu-dora-third-party-reviewer', 'au-ddo-tmd-builder'],
    whatItDoes:
      'Determines which regulatory perimeter a proposed financial activity falls inside, what licence or exemption is required, and which of the Monetary Authority of Singapore\'s notices and guidelines then apply to the licence held. It distinguishes carefully between notices, which are binding, and guidelines, which set out supervisory expectations — a distinction that changes how you must respond to each — and builds an obligation map with the recurring reporting and governance duties that follow.',
    whenToUse:
      'When assessing whether a product or activity requires a licence, during a licence application, when launching a new product line under an existing licence, or when preparing for a supervisory review.',
    inputs: [
      { name: 'Activity description', description: 'What the business does or proposes to do, in operational detail.', required: true },
      { name: 'Licence status', description: 'Any licence, registration or exemption currently held.', required: true },
      { name: 'Customer types', description: 'Retail, accredited, institutional, or a mix — this changes the obligation set.', required: true },
      { name: 'Products or instruments', description: 'What is offered, including any digital or tokenised instruments.' },
      { name: 'Operating model', description: 'Where functions are performed, outsourcing arrangements, and technology dependencies.' },
    ],
    outputs: [
      { name: 'Perimeter analysis', description: 'Whether the activity is regulated, and under which framework.' },
      { name: 'Licensing assessment', description: 'The licence or exemption required, with the conditions attached.' },
      { name: 'Applicable notices', description: 'Binding notices that apply, with what each requires.' },
      { name: 'Applicable guidelines', description: 'Supervisory expectations that apply, and how they differ in force from notices.' },
      { name: 'Obligation calendar', description: 'Recurring reporting, submission and review obligations with their frequencies.' },
      { name: 'Verification plan', description: 'Exactly what to confirm on the regulator\'s published instruments.' },
    ],
    prompt: `You are a Singapore financial services regulatory lawyer mapping the obligations that apply to an activity. MAS instruments are amended frequently — everything you produce must be framed as a checklist to verify against the current published instrument.

INPUTS
- Activity: <what the business does or proposes to do, in operational detail — describe the actual flow of money, instruments and instructions>
- Current status: <licence, registration, exemption, or none>
- Customers: <retail / accredited / expert / institutional; Singapore-based or offshore>
- Products: <instruments offered, including any digital payment tokens or tokenised instruments>
- Operating model: <where functions are performed, outsourcing, cloud and technology dependencies, group structure>

TASK
1. PERIMETER ANALYSIS: is the activity regulated, and under which framework? Work through the candidates — the securities and futures framework for dealing in capital markets products, fund management and custody; the financial advisory framework; the payment services framework for the defined payment service types; the banking and insurance frameworks; and the trust business framework. Match the described activity to the defined regulated activity and quote the definition you are applying. Where the activity sits near a boundary, give both readings and identify the fact that settles it. If more than one framework is engaged, say so — this is common and often missed.
2. LICENSING ASSESSMENT: which licence, registration or exemption is required? Cover the base capital and financial resources requirements, the fit and proper requirements for shareholders, directors and key individuals, the required appointments and their competency requirements, and the professional indemnity insurance expectations. Where an exemption is being relied on, set out its conditions precisely and note that exemptions are narrow and conditional.
3. APPLICABLE NOTICES (binding): identify the notices that would apply to this licence type and activity, and what each requires. Expect to cover, as applicable to the activity: anti-money laundering and countering the financing of terrorism obligations including customer due diligence, screening, ongoing monitoring, record keeping and suspicious transaction reporting; technology risk management; notification of cyber incidents; business continuity; reporting of misconduct; disclosure and conduct obligations toward customers; and prescribed periodic returns. For each, state what it requires in practical terms.
4. APPLICABLE GUIDELINES (supervisory expectations): identify the guidelines that apply — outsourcing, technology risk management, fair dealing, individual accountability and conduct, environmental risk management, and any product-specific guidance. Explain clearly that guidelines are not law but that the regulator expects observance and will ask why any departure was reasonable. Say that departing from a guideline is a decision to be documented, not a free choice.
5. CUSTOMER CLASSIFICATION: how the obligation set changes with customer type. Retail customers attract the fullest conduct, disclosure and suitability obligations; accredited and institutional customers attract a reduced set, subject to the opt-in and opt-out requirements. Note that misclassifying a customer is a compliance failure in itself, and set out what the classification process must record.
6. OBLIGATION CALENDAR: build a table of recurring obligations — periodic regulatory returns and their frequencies, annual audited accounts, compliance and internal audit reporting, key appointment notifications, changes in shareholding or control, and incident and breach reporting timelines. Mark every frequency and deadline [VERIFY].
7. OUTSOURCING AND TECHNOLOGY: if functions are outsourced or cloud-hosted, address the outsourcing expectations — materiality assessment, due diligence, contractual requirements including audit and access rights, monitoring, and the register of outsourcing arrangements. Note that responsibility cannot be outsourced.
8. VERIFICATION PLAN: a numbered list of exactly what to confirm on the regulator's published instruments, in priority order — the specific notice or guideline number and title where you can identify it, and what to check in each.

RULES
- Distinguish binding notices from guidelines everywhere. Conflating them either overstates or understates the obligation.
- Never state a capital requirement, deadline or threshold as fact. Mark [VERIFY].
- Do not assert a specific notice number unless you are confident; describe the instrument by subject matter and let the verification step confirm the reference.
- Where the activity may be unlicensed and already operating, say so plainly and recommend immediate specialist advice before continuing.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with the perimeter conclusion.`,
    example: {
      scenario:
        'A startup plans to let Singapore users hold balances, convert between currencies and pay merchants, and wants to know what it needs before launching.',
      result:
        'Perimeter analysis identifying several distinct payment service types engaged by one product flow, a licensing assessment covering base capital and key appointments, binding AML and technology risk notices mapped to practical requirements, guidelines separated out as expectations to document departures from, and a verification list of instruments to confirm before the application.',
    },
  },
  {
    id: 'sg-workplace-fairness-reviewer',
    name: 'Workplace Fairness Reviewer',
    description: 'Reviews hiring and employment practices against Singapore workplace fairness requirements.',
    jurisdiction: 'sg',
    category: 'employment',
    tags: ['workforce', 'review', 'workplace-fairness', 'discrimination', 'hiring', 'tafep', 'singapore'],
    sources: [
      { citation: 'Tripartite Guidelines on Fair Employment Practices', authority: 'guidance', publisher: 'Tripartite Alliance for Fair and Progressive Employment Practices', jurisdiction: 'sg' },
      { citation: 'Singapore workplace fairness legislation', authority: 'primary', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg', note: 'This framework has been undergoing legislative change. Confirm the current text, commencement date and covered characteristics before relying on the analysis.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['sg-work-pass-planner'],
    whatItDoes:
      'Audits recruitment materials, selection processes and employment decisions against Singapore\'s fair employment framework and the protected characteristics the workplace fairness legislation addresses. It reviews job advertisements and criteria for language that signals a protected characteristic, tests whether selection criteria are genuinely job-related, checks the grievance-handling process the framework expects employers to maintain, and rewrites problematic material rather than only flagging it.',
    whenToUse:
      'Before publishing job advertisements, when reviewing recruitment processes, when preparing for a workforce audit, when building the grievance-handling process, or when a complaint has been raised.',
    inputs: [
      { name: 'Job advertisements', description: 'The postings and any recruiter briefs or screening scripts.', required: true },
      { name: 'Selection criteria', description: 'Requirements, screening questions and how candidates are assessed.', required: true },
      { name: 'Employment decisions', description: 'How promotion, training, transfer and dismissal decisions are made and recorded.' },
      { name: 'Grievance process', description: 'The current process for handling workplace discrimination complaints.' },
      { name: 'Workforce composition', description: 'Optional. Relevant to the fair consideration expectations for local hiring.' },
    ],
    outputs: [
      { name: 'Advertisement review', description: 'Each posting flagged for language touching a protected characteristic, with rewrites.' },
      { name: 'Criteria analysis', description: 'Whether each requirement is genuinely job-related and proportionate.' },
      { name: 'Process findings', description: 'Where selection or promotion practice creates unjustified disadvantage.' },
      { name: 'Grievance process assessment', description: 'Whether the process meets the expectations placed on employers.' },
      { name: 'Documentation gaps', description: 'Records needed to defend a decision if it is challenged.' },
      { name: 'Remediation plan', description: 'Prioritised fixes with rewritten materials attached.' },
    ],
    prompt: `You are a Singapore employment lawyer reviewing workplace practices against the fair employment framework and workplace fairness requirements.

INPUTS
- Job advertisements: <paste, including recruiter briefs, screening scripts and any agency instructions>
- Selection criteria: <requirements, screening questions, assessment method, who decides>
- Employment decisions: <how promotion, training, transfer, redeployment and dismissal decisions are made and recorded>
- Grievance process: <current process for workplace discrimination complaints, if any>
- Workforce composition: <optional — local and foreign headcount, relevant to fair consideration expectations>

TASK
1. PROTECTED CHARACTERISTICS FRAMEWORK: set out the characteristics the workplace fairness framework protects — including age, nationality, sex, marital status, pregnancy status, caregiving responsibilities, race, religion, language, disability and mental health condition. Note that the framework distinguishes discrimination in employment decisions from harassment, and that specific exceptions exist for genuine occupational requirements and for certain defined circumstances. Mark the detail [VERIFY] against the current legislation and guidelines, since this area has been undergoing legislative change.
2. ADVERTISEMENT REVIEW. For each advertisement, flag any language that states or signals a preference tied to a protected characteristic. Cover the obvious cases and the coded ones — age proxies ("young and dynamic", "digital native", "recent graduate", a maximum years-of-experience cap), nationality or language preferences not tied to a genuine job requirement, sex-coded language and gendered job titles, marital or family status ("no travel restrictions", "able to commit long hours"), physical requirements not essential to the role, and religion or race references. For each flag: quote the text, name the characteristic engaged, explain the risk, and provide a REWRITE that preserves the legitimate underlying requirement.
3. CRITERIA ANALYSIS: for each selection requirement, ask whether it is genuinely related to the job and proportionate to it. Distinguish a genuine occupational requirement, which can justify a criterion that would otherwise be problematic, from a preference dressed up as a requirement. Pay attention to criteria that are neutral on their face but disadvantage a protected group — a requirement for continuous employment history disadvantages carers; a strength or mobility requirement disadvantages people with disabilities; an "excellent English and native-level fluency" requirement may function as a nationality proxy. For each, state whether it is defensible and what evidence would support it.
4. PROCESS FINDINGS: assess the selection and promotion process itself — whether criteria are applied consistently, whether decision-makers record reasons, whether there is a single decision-maker with unreviewed discretion, whether interview questions stray into protected territory (family plans, pregnancy, religious observance, age, caregiving), and whether reasonable adjustments are offered to candidates with disabilities. Flag each specific problem.
5. FAIR CONSIDERATION: where relevant, address the expectation that employers consider local candidates fairly, including advertising requirements before certain work pass applications and the consequences of an adverse assessment of hiring practices.
6. GRIEVANCE PROCESS ASSESSMENT: assess the current process against what employers are expected to maintain — an accessible channel for raising workplace discrimination and harassment complaints, a process for inquiring into them, protection against retaliation for those who raise them in good faith, and confidentiality appropriate to the circumstances. Identify what is missing and draft the missing elements.
7. DOCUMENTATION GAPS: what records should exist to defend a decision if it is challenged — the criteria set before the search began, the assessment against those criteria for each candidate, the reasons recorded at the time, and interview notes. Contemporaneous records are the difference between a defensible decision and an indefensible one; say so.
8. REMEDIATION PLAN: prioritised fixes, with the rewritten advertisements and drafted grievance process attached.

RULES
- Provide rewrites, not just flags. A flagged advertisement with no replacement gets published unchanged.
- Distinguish a genuine occupational requirement from a preference, and insist on evidence for the former.
- Look for indirect disadvantage from neutral-seeming criteria; direct discrimination is usually the easier half of the problem.
- Mark specific statutory detail and commencement timing [VERIFY], as this framework has been changing.
- Where a complaint has already been raised, recommend that the inquiry be handled by someone independent of the decision under challenge.

OUTPUT FORMAT
Eight sections matching the tasks above, with rewritten materials in an annex.`,
    example: {
      scenario:
        'A company reviews twelve job advertisements and its interview process after a candidate complains about a question asked at interview.',
      result:
        'Seven advertisements flagged — mostly age proxies and an unjustified language requirement — each rewritten, an interview process finding that family-plan questions were being asked routinely by one hiring manager, a grievance process assessed as missing any retaliation protection, and a documentation gap showing no contemporaneous criteria records existed for the challenged decision.',
    },
  },
  {
    id: 'sg-siac-clause-builder',
    name: 'SIAC Clause Builder',
    description: 'Drafts a Singapore-seated arbitration clause and stress-tests it for enforceability.',
    jurisdiction: 'sg',
    category: 'litigation',
    tags: ['disputes', 'drafting', 'arbitration', 'siac', 'dispute-resolution', 'enforcement'],
    sources: [
      { citation: 'International Arbitration Act 1994 (Singapore)', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg' },
      { citation: 'SIAC Arbitration Rules', authority: 'regulator', publisher: 'Singapore International Arbitration Centre', jurisdiction: 'sg', url: 'https://www.siac.org.sg', note: 'Rules are revised periodically; the applicable edition matters.' },
      { citation: 'Convention on the Recognition and Enforcement of Foreign Arbitral Awards (New York, 1958)', authority: 'primary', publisher: 'United Nations', url: 'https://uncitral.un.org' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['cross-contract-localizer'],
    whatItDoes:
      'Builds a dispute resolution clause for a Singapore-seated arbitration with every parameter chosen deliberately — seat, governing law of the contract and of the arbitration agreement, number of arbitrators, language, confidentiality, and whether an escalation tier or emergency relief is wanted — and then stress-tests the result against the ways arbitration clauses actually fail: internal contradiction, optional wording, unclear scope, and mismatch with where enforcement will have to happen.',
    whenToUse:
      'When drafting or negotiating the dispute resolution clause of a cross-border contract, when reviewing a counterparty\'s clause, or when auditing existing contracts after a dispute has exposed a defective clause.',
    inputs: [
      { name: 'Contract context', description: 'Parties, their locations, the transaction type and its value.', required: true },
      { name: 'Governing law', description: 'The substantive law of the contract, which is a separate question from the seat.' },
      { name: 'Enforcement expectation', description: 'Where an award would most likely need to be enforced, and where assets sit.', required: true },
      { name: 'Preferences', description: 'Tribunal size, language, confidentiality, expedition and cost sensitivity.' },
      { name: 'Existing clause', description: 'Optional. Supplying it turns this into a review.' },
    ],
    outputs: [
      { name: 'Recommended clause', description: 'A complete, drafted clause with every parameter chosen.' },
      { name: 'Parameter rationale', description: 'Why each choice was made and what the alternative would cost.' },
      { name: 'Pathology check', description: 'The clause tested against the common defects that break arbitration agreements.' },
      { name: 'Enforcement analysis', description: 'Whether an award would be enforceable where it needs to be.' },
      { name: 'Interim relief', description: 'Emergency arbitrator and court-ordered interim measures, and how they interact.' },
      { name: 'Escalation design', description: 'Whether a pre-arbitration tier helps or creates a jurisdictional fight.' },
    ],
    prompt: `You are an international arbitration practitioner drafting a Singapore-seated arbitration clause.

INPUTS
- Contract context: <parties and their jurisdictions, transaction type, value, term, relationship>
- Governing law of the contract: <if chosen>
- Enforcement expectation: <where would an award need to be enforced? where are the counterparty's assets?>
- Preferences: <one or three arbitrators, language, confidentiality, speed, cost sensitivity, appetite for expedited procedure>
- Existing clause (optional): <paste for review>

TASK
1. THRESHOLD QUESTION: is arbitration the right choice here at all? Address it honestly against litigation — enforceability across borders, confidentiality, neutrality of forum, arbitrator expertise, cost, speed, the availability of summary disposal, and the absence of a general right of appeal. For a low-value domestic contract between two parties in the same jurisdiction, arbitration is often the wrong answer. Say so if it is.
2. PARAMETER SELECTION. Choose each and explain the reasoning and the alternative:
   a. INSTITUTION AND RULES: the institution and rule set, and the version applicable.
   b. SEAT: Singapore. Explain what the seat actually does — it fixes the lex arbitri, the supervisory court, and the grounds and forum for setting aside. Make clear the seat is a legal concept, not a venue, and that hearings can be held elsewhere without changing it.
   c. GOVERNING LAW OF THE CONTRACT: distinguish it from the seat.
   d. GOVERNING LAW OF THE ARBITRATION AGREEMENT: address this expressly. It is a distinct question from both the seat and the contract law, it is the source of a well-known line of disputes, and an express choice removes the problem in a sentence. Recommend stating it.
   e. NUMBER OF ARBITRATORS: one or three, with the cost and speed trade-off, and the appointment mechanism.
   f. LANGUAGE: and the consequence for document production and translation cost.
   g. CONFIDENTIALITY: what the rules and the seat already provide, and whether an express clause adds anything.
   h. EXPEDITED PROCEDURE AND EMERGENCY ARBITRATOR: whether to opt in, out, or stay silent.
3. DRAFT THE CLAUSE: produce the complete clause, built from the institution's recommended model clause with the chosen parameters filled in. Keep it tight — most defects come from additions, not omissions.
4. PATHOLOGY CHECK. Test the draft against the defects that actually break arbitration clauses:
   - Optional or permissive wording ("may refer to arbitration") creating a fight about whether arbitration is mandatory
   - Referring to a non-existent institution, a misnamed one, or rules that do not exist
   - Naming both a court and an arbitral tribunal without a clear hierarchy
   - Unclear or narrow scope ("disputes arising under" versus "arising out of or in connection with")
   - Conditions precedent that are mandatory but unworkable
   - Inconsistency with a dispute clause elsewhere in the contract or in a related agreement in the same transaction
   - Multi-contract transactions where related agreements have inconsistent clauses, defeating consolidation
   For each: is the draft clean? If reviewing an existing clause, flag every defect found and give the fix.
5. ENFORCEMENT ANALYSIS: where would an award need to be enforced, and is that jurisdiction a party to the New York Convention? Note any reservation or practical enforcement difficulty in the relevant jurisdiction, and flag it as requiring local confirmation. If the counterparty's assets are in a jurisdiction where enforcement is difficult, say that the clause choice may matter less than security or a parent guarantee — and recommend addressing that separately.
6. INTERIM RELIEF: how emergency arbitrator relief and court-ordered interim measures interact, whether the parties should preserve the right to seek court measures without breaching the arbitration agreement, and how to draft that carve-out so it does not undermine the clause.
7. ESCALATION DESIGN: if a negotiation or mediation tier is wanted, draft it with a defined trigger, a defined period and an automatic right to proceed on expiry. Warn plainly that a mandatory but vague escalation tier is one of the most common sources of jurisdictional challenge, and that "the parties shall attempt to resolve amicably" with no defined endpoint is worse than nothing.
8. MULTI-CONTRACT CHECK: if the transaction involves several related agreements, confirm the clauses are compatible and that consolidation or joinder would be available.

RULES
- Use the institution's model clause as the base. Bespoke drafting is where clauses go wrong.
- Address the governing law of the arbitration agreement expressly — it is the single highest-value line in the clause.
- Never say an award "will be enforceable". Say what is required for enforcement and what to confirm locally.
- If the inputs point away from arbitration, say so rather than drafting the clause anyway.

OUTPUT FORMAT
Eight sections matching the tasks above, with the drafted clause presented as a clean block ready to paste.`,
    example: {
      scenario:
        'A Singapore supplier and a European customer negotiate a supply agreement governed by English law, with the customer\'s assets in two jurisdictions.',
      result:
        'A Singapore-seated three-arbitrator clause with the governing law of the arbitration agreement stated expressly, a pathology check that catches a conflicting jurisdiction clause in the linked services agreement, an enforcement note on both asset jurisdictions flagged for local confirmation, and an escalation tier redrafted with a defined 30-day endpoint.',
    },
  },
  {
    id: 'sg-employment-act-compliance-checker',
    name: 'Employment Act Compliance Checker',
    description: 'Checks Singapore employment terms and payroll practices against the Employment Act, including Part IV protections.',
    jurisdiction: 'sg',
    category: 'employment',
    tags: ['assessment', 'workforce', 'singapore', 'wage-compliance', 'employment-contract'],
    sources: [
      { citation: 'Employment Act 1968', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg', note: 'Core provisions for employees, with additional protections on hours, overtime and rest days for workmen and non-workmen below salary thresholds.' },
      { citation: 'Employment (Employment Records and Payslips) Regulations and key employment terms requirements', authority: 'regulator', publisher: 'Ministry of Manpower', jurisdiction: 'sg', url: 'https://www.mom.gov.sg', note: 'Written key employment terms, itemised payslips and employment records.' },
      { citation: 'Ministry of Manpower guidance', authority: 'guidance', publisher: 'Ministry of Manpower', jurisdiction: 'sg', url: 'https://www.mom.gov.sg', note: 'Salary thresholds, leave, public holidays and calculation guidance; check for updates.' },
    ],
    lastReviewed: '2026-11-19',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['sg-workplace-fairness-reviewer', 'sg-work-pass-planner', 'global-employment-contract-reviewer'],
    whatItDoes:
      'Checks a Singapore employer’s contracts and payroll practices against the Employment Act. It determines which employees are covered by the core provisions and which also receive the additional protections on hours of work, overtime, rest days and public holidays based on their role and salary. It then tests key employment terms, salary payment timing and permitted deductions, payslips and records, annual leave, sick leave and hospitalisation leave, public holidays, overtime calculation and caps, and termination notice. It produces a gap list and corrected terms.',
    whenToUse:
      'When setting up a Singapore entity, when updating employment contract templates, during a payroll audit, when salary thresholds change, and when a Ministry of Manpower inspection or employee claim arises. Managers and executives above a salary threshold are treated differently in parts of the Act.',
    inputs: [
      { name: 'Workforce profile', description: 'Roles, monthly basic salaries and whether workmen or not.', required: true },
      { name: 'Contracts and key terms', description: 'Contract templates and the key employment terms issued.', required: true },
      { name: 'Payroll practices', description: 'Salary period, payment dates, deductions, overtime and payslips.', required: true },
      { name: 'Leave and hours', description: 'Working hours, rest days, leave policies and public holiday practice.' },
    ],
    outputs: [
      { name: 'Coverage map', description: 'Who is covered by the core provisions and the additional protections.' },
      { name: 'Requirement-by-requirement gap list', description: 'Key terms, payments, deductions, records, leave and hours.' },
      { name: 'Overtime and rest day checks', description: 'Calculations and caps for covered employees.' },
      { name: 'Termination terms review', description: 'Notice and payment on termination.' },
      { name: 'Corrected terms', description: 'Proposed wording for templates and policies.' },
    ],
    prompt: `You are a Singapore employment lawyer checking compliance with the Employment Act.

CURRENT-LAW STATUS (as drafted 2026-11-19 — confirm each point before relying on it)
- Part IV protections on hours, overtime and rest days apply to workmen and to non-workmen earning below salary thresholds, which are revised from time to time [VERIFY current thresholds]. The Workplace Fairness Act 2025 and tripartite guidelines on flexible work arrangements affect related practices [VERIFY commencement].

INPUTS
- Workforce: <roles, monthly basic salaries, workman or not>
- Contracts and key terms: <templates and KETs issued>
- Payroll: <salary period, payment dates, deductions, overtime, payslips>
- Leave and hours: <working hours, rest days, leave, public holidays>

TASK
1. MISSING INFORMATION. List what you need.
2. COVERAGE. For each group, state whether the core provisions apply and whether Part IV protections apply, by role and salary [VERIFY thresholds].
3. KEY EMPLOYMENT TERMS. Check that written key employment terms are issued within the required time and contain the required items [VERIFY].
4. SALARY. Check the salary period, payment within the required time after the period ends, overtime payment timing, and that deductions are authorised and within limits [VERIFY].
5. PAYSLIPS AND RECORDS. Check itemised payslips and records retention.
6. HOURS, OVERTIME AND REST DAYS. For Part IV employees, check normal hours, overtime rate and monthly cap, rest day work and pay [VERIFY].
7. LEAVE AND PUBLIC HOLIDAYS. Check annual leave, sick and hospitalisation leave after the qualifying period, public holiday entitlements and childcare-related leave under other statutes [VERIFY].
8. TERMINATION. Check notice periods, salary in lieu, and payment of final salary within time.
9. CORRECTED TERMS. Propose wording.

RULES
- Never state the employer complies; report gaps.
- Mark thresholds, rates and deadlines [VERIFY].
- Do not draft terms below statutory minimums.

OUTPUT FORMAT
Missing information; coverage map; gap table (Requirement | Status | Gap); overtime and rest day checks; termination review; corrected terms. Close with: Assumptions made; [VERIFY] points.`,
    example: {
      scenario:
        'A Singapore logistics firm pays warehouse workers monthly on the 15th of the following month, issues no written key employment terms, and pays overtime at a flat hourly rate.',
      result:
        'Warehouse workers mapped as covered by Part IV as workmen, payment timing and missing key employment terms flagged as gaps, overtime rate and monthly cap checks failing, and corrected template wording for key terms and payroll.',
    },
  },
  {
    id: 'sg-companies-act-compliance-calendar',
    name: 'Companies Act Compliance Calendar',
    description: 'Builds a Singapore company’s annual compliance calendar and checks registers, AGM and annual return obligations.',
    jurisdiction: 'sg',
    category: 'corporate',
    tags: ['programme-design', 'corporate-governance', 'singapore', 'annual-reporting', 'deadlines'],
    sources: [
      { citation: 'Companies Act 1967', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg', note: 'AGM and financial statements, annual return, registers including registers of registrable controllers and nominee directors, company secretary and resident director requirements.' },
      { citation: 'ACRA guidance and filing requirements', authority: 'regulator', publisher: 'Accounting and Corporate Regulatory Authority', jurisdiction: 'sg', url: 'https://www.acra.gov.sg', note: 'Filing timelines, exemptions for private companies, and recent changes to registers and to nominee arrangements.' },
    ],
    lastReviewed: '2026-11-19',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-board-minutes-drafter', 'uk-companies-house-idv-psc-tracker', 'sg-mas-notice-checker'],
    whatItDoes:
      'Builds a compliance calendar for a Singapore company from its financial year end and status: when financial statements must be prepared and circulated, whether and when an AGM is required or can be dispensed with, the annual return filing date, XBRL or other filing format requirements, and the tax filings that follow. It also checks the standing obligations that cause penalties: a resident director, a company secretary appointed within time, registered office, statutory registers including the register of registrable controllers and the register of nominee directors, and filings for changes in officers, shares and constitution.',
    whenToUse:
      'When a Singapore company is incorporated or acquired, at the start of each financial year, when changing financial year end or company status, before an ACRA filing deadline, and during due diligence. Small and dormant companies have exemptions with conditions.',
    inputs: [
      { name: 'Company profile', description: 'Name, UEN, incorporation date, type (private, exempt private, public), financial year end and whether listed.', required: true },
      { name: 'Officers and controllers', description: 'Directors, secretary, shareholders and registrable controllers.', required: true },
      { name: 'Registers and filings', description: 'Current registers and recent ACRA filings.' },
      { name: 'Size and status', description: 'Revenue, assets, employees and whether dormant.' },
    ],
    outputs: [
      { name: 'Annual calendar', description: 'Dates for financial statements, AGM, annual return and tax filings.' },
      { name: 'AGM decision', description: 'Whether an AGM is required or can be dispensed with, and how.' },
      { name: 'Standing obligations check', description: 'Resident director, secretary, registered office and registers.' },
      { name: 'Event filings list', description: 'Filings triggered by changes in officers, shares or constitution.' },
      { name: 'Exemptions review', description: 'Audit and filing exemptions and their conditions.' },
    ],
    prompt: `You are a Singapore corporate secretarial lawyer building a compliance calendar under the Companies Act.

CURRENT-LAW STATUS (as drafted 2026-11-19 — confirm each point before relying on it)
- AGM and annual return timelines depend on whether the company is listed or private and on its financial year end; private companies may dispense with AGMs on conditions [VERIFY]. ACRA has changed register and nominee director requirements in recent years [VERIFY current requirements].

INPUTS
- Company: <name, UEN, incorporation date, type, financial year end, listed or not>
- Officers and controllers: <directors, secretary, shareholders, registrable controllers>
- Registers and filings: <current registers, recent filings>
- Size and status: <revenue, assets, employees, dormancy>

TASK
1. MISSING INFORMATION. List what you need.
2. CALENDAR. From the financial year end, calculate the deadlines for: holding the AGM or circulating financial statements, filing the annual return, and corporate tax filings, showing the calculation [VERIFY].
3. AGM. State whether an AGM is required, whether it can be dispensed with and the conditions, including sending financial statements to members [VERIFY].
4. AUDIT AND FILING EXEMPTIONS. Assess the small company audit exemption and dormant company exemptions and their conditions [VERIFY].
5. STANDING OBLIGATIONS. Check at least one ordinarily resident director, a company secretary appointed within the required time, a registered office, and registers of members, directors and officers, registrable controllers and nominee directors, and whether information is lodged with ACRA where required [VERIFY].
6. EVENT FILINGS. List filings triggered by changes in directors, secretary, registered office, shares, controllers and constitution, with time limits [VERIFY].
7. PENALTY RISKS. Flag current or past late filings and remediation.

RULES
- Never state a deadline as settled; show the calculation and mark [VERIFY].
- Do not invent register contents; mark [NOT SUPPLIED].

OUTPUT FORMAT
Missing information; calendar table (Obligation | Deadline | Calculation); AGM decision; exemptions review; standing obligations table (Requirement | Status | Gap); event filings list; penalty risks. Close with: Assumptions made; [VERIFY] points.`,
    example: {
      scenario:
        'A foreign group acquires a Singapore private company with a 31 March year end, discovers no register of registrable controllers, and its only resident director is about to resign.',
      result:
        'An annual calendar with AGM and annual return dates calculated from 31 March, a recommendation to dispense with the AGM if conditions are met, standing-obligation gaps for the missing controllers register and the resident director, and the event filings needed for the change of director.',
    },
  },
  {
    id: 'sg-pdpa-dnc-marketing-checker',
    name: 'PDPA Do Not Call Checker',
    description: 'Checks Singapore marketing messages and calls against the PDPA Do Not Call provisions and the Spam Control Act.',
    jurisdiction: 'sg',
    category: 'privacy',
    tags: ['screening', 'data-protection', 'singapore', 'direct-marketing', 'consent'],
    sources: [
      { citation: 'Personal Data Protection Act 2012 (Do Not Call provisions) and related regulations', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg', note: 'Checking the Do Not Call Registry before sending specified messages to Singapore numbers, clear and unambiguous consent, identification, and prohibitions on dictionary attacks and address harvesting.' },
      { citation: 'Spam Control Act 2007', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg', note: 'Unsolicited commercial electronic messages sent in bulk by email or SMS, with labelling and unsubscribe requirements.' },
      { citation: 'PDPC advisory guidelines on the Do Not Call provisions', authority: 'guidance', publisher: 'Personal Data Protection Commission', jurisdiction: 'sg', url: 'https://www.pdpc.gov.sg', note: 'Exemptions, consent evidence and checking periods.' },
    ],
    lastReviewed: '2026-11-19',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'financial-services'],
    relatedSkills: ['sg-pdpa-obligation-mapper', 'au-spam-dncr-marketing-checker', 'us-tcpa-marketing-compliance'],
    whatItDoes:
      'Reviews marketing calls, SMS, messaging-app and fax campaigns to Singapore numbers against the PDPA Do Not Call provisions, and bulk email and SMS against the Spam Control Act. It decides whether each message is a specified message, whether the organisation must check the Do Not Call Registry or holds clear and unambiguous consent in evidential form, whether exemptions apply for ongoing relationships, and whether identification and contact information are included. It also checks practices that are prohibited outright, such as sending to numbers generated by dictionary attacks, and the use of third-party vendors.',
    whenToUse:
      'Before a telemarketing or SMS campaign to Singapore numbers, when buying or sharing lists, when engaging vendors to send messages, and after a PDPC investigation or complaint. The checking obligation applies to each number and each campaign period.',
    inputs: [
      { name: 'Campaigns', description: 'Message type, channel, content and audience.', required: true },
      { name: 'Consent and relationship', description: 'How numbers were obtained, consent wording and existing relationships.', required: true },
      { name: 'Registry checks', description: 'How and when numbers are checked against the Do Not Call Registry.', required: true },
      { name: 'Vendors', description: 'Third parties sending messages.' },
    ],
    outputs: [
      { name: 'Message classification', description: 'Specified message or not, and Spam Control Act coverage.' },
      { name: 'Consent and exemption review', description: 'Evidential consent and exemptions applied.' },
      { name: 'Registry check review', description: 'Timing and validity of checks.' },
      { name: 'Content checks', description: 'Identification, contact details and caller ID.' },
      { name: 'Remediation list', description: 'Fixes for consent records, checking and vendors.' },
    ],
    prompt: `You are a Singapore data protection lawyer reviewing compliance with the PDPA Do Not Call provisions.

CURRENT-LAW STATUS (as drafted 2026-11-19 — confirm each point before relying on it)
- The PDPA requires checking the Do Not Call Registry before sending specified messages to Singapore numbers unless clear and unambiguous consent in evidential form exists, with checks valid for a set period [VERIFY]. Amendments in 2020 added prohibitions on dictionary attacks and address harvesting and moved DNC enforcement to an administrative penalty regime [VERIFY].

INPUTS
- Campaigns: <type, channel, content, audience>
- Consent and relationship: <how numbers were obtained, consent wording, existing relationships>
- Registry checks: <method and timing>
- Vendors: <third-party senders>

TASK
1. MISSING INFORMATION. List what you need.
2. CLASSIFY. Decide whether each message is a specified message (offering goods, services, land or business opportunities), noting exclusions, and whether bulk email or SMS falls under the Spam Control Act.
3. CONSENT. Check whether clear and unambiguous consent was obtained in written or other accessible form for each number, and that it was not a condition of supply beyond what is reasonable.
4. EXEMPTIONS. Assess any exemption for ongoing relationships and its conditions [VERIFY].
5. REGISTRY CHECKS. Check that numbers were checked within the valid period before sending, for each register type (voice, text, fax), and that records are kept [VERIFY].
6. CONTENT. Check identification of the sender, contact information and that caller ID is not concealed.
7. PROHIBITED PRACTICES. Check for dictionary attacks, address-harvesting software and messages to numbers obtained by such means.
8. VENDORS. Check responsibility where vendors send on the organisation’s behalf and contract controls.
9. REMEDIATION. Order fixes by risk.

RULES
- Never state that a campaign complies; report findings.
- Mark periods and penalties [VERIFY].
- Do not treat a vendor’s list as consented without evidence.

OUTPUT FORMAT
Missing information; classification table; consent and exemption findings; registry check review; content checks; prohibited practice findings; vendor controls; remediation. Close with: Assumptions made; [VERIFY] points.`,
    example: {
      scenario:
        'A Singapore property agency sends WhatsApp messages about new launches to 20,000 numbers from a list bought from a former colleague, checking the Registry once every quarter.',
      result:
        'Messages classified as specified messages, the bought list lacking evidential consent, quarterly checks flagged as exceeding the validity period, a risk that some numbers were harvested, and remediation including suppressing the list and checking before each campaign.',
    },
  },
  {
    id: 'sg-payment-services-licensing-triage',
    name: 'Payment Services Act Licensing Triage',
    description: 'Triages whether a Singapore payments or digital token business needs a licence under the Payment Services Act.',
    jurisdiction: 'sg',
    category: 'regulatory',
    tags: ['screening', 'financial-services', 'singapore', 'licensing', 'digital-assets'],
    sources: [
      { citation: 'Payment Services Act 2019', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg', note: 'Regulated payment services, licence classes (money-changing, standard payment institution, major payment institution), thresholds, exclusions and user protection.' },
      { citation: 'MAS notices and guidelines under the Payment Services Act, including on digital payment token services', authority: 'regulator', publisher: 'Monetary Authority of Singapore', jurisdiction: 'sg', url: 'https://www.mas.gov.sg', note: 'AML/CFT notices, technology risk, consumer protection measures for digital payment tokens, and the regime for services provided outside Singapore.' },
    ],
    lastReviewed: '2026-11-19',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'technology'],
    relatedSkills: ['sg-mas-notice-checker', 'global-regulation-obligation-mapper', 'uk-aml-cdd-edd-assessor'],
    whatItDoes:
      'Takes a description of a business model and maps each activity to the payment services the Payment Services Act regulates — account issuance, domestic money transfer, cross-border money transfer, merchant acquisition, e-money issuance, digital payment token services and money-changing — and the exclusions. It then estimates which licence class is likely needed from the volumes and float you supply, flags the regime for digital token services offered from Singapore to customers outside it, and lists the main obligations that follow: AML/CFT, safeguarding, technology risk management and consumer protection.',
    whenToUse:
      'When launching a wallet, remittance, acquiring, crypto or embedded-payments product in or from Singapore, when changing the business model or volumes, before applying to MAS, and during due diligence. Operating without a required licence is an offence; the answer turns on precise facts about who holds funds and when.',
    inputs: [
      { name: 'Business model', description: 'Products, customer types, flows of funds and tokens, and who holds customer money.', required: true },
      { name: 'Volumes and float', description: 'Monthly transaction values by service and average e-money float.', required: true },
      { name: 'Location of customers and operations', description: 'Where the business is incorporated, operates and serves customers.', required: true },
      { name: 'Partners', description: 'Banks, licensed partners and their roles.' },
    ],
    outputs: [
      { name: 'Activity-to-service map', description: 'Each activity matched to a regulated service or exclusion.' },
      { name: 'Licence class assessment', description: 'Likely licence class with the thresholds used.' },
      { name: 'Cross-border and digital token flags', description: 'Special regimes that may apply.' },
      { name: 'Key obligations', description: 'AML/CFT, safeguarding, technology risk and conduct.' },
      { name: 'Questions for MAS or counsel', description: 'Points needing confirmation.' },
    ],
    prompt: `You are a Singapore fintech regulatory lawyer triaging Payment Services Act licensing.

CURRENT-LAW STATUS (as drafted 2026-11-19 — confirm each point before relying on it)
- The Payment Services Act regulates seven payment services through three licence classes, with thresholds distinguishing standard and major payment institutions [VERIFY thresholds]. Amendments extended regulation to digital token services provided from Singapore to customers outside it, with a strict approach to licensing [VERIFY current position]. MAS has introduced consumer protection measures for digital payment token services [VERIFY].

INPUTS
- Business model: <products, customers, flows, who holds funds>
- Volumes and float: <monthly values by service, average e-money float>
- Location: <incorporation, operations, customer locations>
- Partners: <banks, licensed partners, roles>

TASK
1. MISSING INFORMATION. List what you need.
2. MAP ACTIVITIES. For each activity, decide whether it is account issuance, domestic money transfer, cross-border money transfer, merchant acquisition, e-money issuance, a digital payment token service or money-changing, and check exclusions such as limited-purpose e-money or incidental services [VERIFY]. Explain the facts that decide it, especially who receives and holds funds.
3. LICENCE CLASS. Using the volumes and float, assess whether a standard or major payment institution licence, a money-changing licence or none is likely needed [VERIFY thresholds].
4. PARTNER MODELS. Assess whether relying on a licensed partner removes the need for a licence or only shifts some obligations.
5. CROSS-BORDER AND TOKENS. Flag the regime for digital token services provided from Singapore to overseas customers and any restrictions on retail token services [VERIFY].
6. OBLIGATIONS. List key obligations: AML/CFT notices, safeguarding of customer money for major institutions, technology risk management, user protection and disclosures, and consumer protection for token services.
7. QUESTIONS. List points to confirm with counsel or MAS.

RULES
- Never conclude that no licence is needed without testing each activity.
- Mark thresholds and regimes [VERIFY].
- Do not suggest structuring to avoid regulation without genuine changes to the activity.

OUTPUT FORMAT
Missing information; activity map (Activity | Service or exclusion | Deciding facts); licence class assessment; partner model analysis; cross-border and token flags; obligations list; questions. Close with: Assumptions made; [VERIFY] points.`,
    example: {
      scenario:
        'A start-up plans a multi-currency wallet for migrant workers that holds stored value, sends remittances abroad and lets users buy stablecoins, with projected monthly flows growing quickly.',
      result:
        'Account issuance, e-money issuance, cross-border money transfer and digital payment token services all mapped, a likely major payment institution licence once the projected volumes and float exceed thresholds to verify, safeguarding and technology risk obligations, and consumer protection measures for the stablecoin feature flagged.',
    },
  },
  {
    id: 'sg-retrenchment-exercise-planner',
    name: 'Retrenchment Exercise Planner',
    description: 'Plans a Singapore retrenchment: tripartite advisory steps, MOM notification, selection, benefits and communication.',
    jurisdiction: 'sg',
    category: 'employment',
    tags: ['programme-design', 'workforce', 'singapore', 'redundancy', 'deadlines'],
    sources: [
      { citation: 'Employment Act 1968 and the Mandatory Retrenchment Notification requirements', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg', note: 'Employers meeting a size threshold must notify the Ministry of Manpower of retrenchments within a set number of working days.' },
      { citation: 'Tripartite Advisory on Managing Excess Manpower and Responsible Retrenchment', authority: 'guidance', publisher: 'Ministry of Manpower, NTUC and SNEF', jurisdiction: 'sg', url: 'https://www.mom.gov.sg', note: 'Expectations on alternatives to retrenchment, consultation with unions, selection criteria, notice and retrenchment benefits.' },
      { citation: 'Tripartite Guidelines on Fair Employment Practices and the Workplace Fairness Act 2025', authority: 'regulator', publisher: 'Ministry of Manpower', jurisdiction: 'sg', url: 'https://www.mom.gov.sg', note: 'Selection must not discriminate; the Workplace Fairness Act is commencing on a date to be confirmed.' },
    ],
    lastReviewed: '2026-11-19',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['sg-employment-act-compliance-checker', 'sg-workplace-fairness-reviewer', 'uk-redundancy-consultation-planner'],
    whatItDoes:
      'Plans a retrenchment exercise in Singapore in line with the Employment Act and the tripartite advisory. It records the business reasons and the alternatives considered, checks whether a union must be consulted and how early, builds objective and non-discriminatory selection criteria, sets out notice and retrenchment benefit terms with reference to contract, collective agreement and prevailing norms, and calculates the Mandatory Retrenchment Notification deadline. It also covers support for affected employees, communication sequencing and the treatment of work pass holders.',
    whenToUse:
      'When a Singapore employer is considering headcount reductions, before any announcement, when unionised employees are affected, and when a retrenchment includes foreign employees on work passes. Tripartite guidance is not law in the same way as the Act, but it is the standard by which retrenchments are judged and wrongful dismissal claims assessed.',
    inputs: [
      { name: 'Proposal', description: 'Business reasons, roles affected, numbers and proposed dates.', required: true },
      { name: 'Workforce data', description: 'Employer headcount, union recognition, service length, work pass holders and protected groups.', required: true },
      { name: 'Terms', description: 'Employment contracts, collective agreements and past retrenchment practice.' },
      { name: 'Alternatives considered', description: 'Measures considered before retrenchment.' },
    ],
    outputs: [
      { name: 'Process plan', description: 'Steps in order, including alternatives, consultation and notification.' },
      { name: 'Union consultation plan', description: 'When and how to consult where a union is recognised.' },
      { name: 'Selection review', description: 'Criteria tested for objectivity and fairness.' },
      { name: 'Benefits and notice', description: 'Notice and retrenchment benefits by group.' },
      { name: 'MOM notification and timeline', description: 'Deadline calculation and communication sequence.' },
    ],
    prompt: `You are a Singapore employment lawyer planning a retrenchment exercise.

CURRENT-LAW STATUS (as drafted 2026-11-19 — confirm each point before relying on it)
- Employers with at least a stated number of employees must notify MOM of retrenchments within a set number of working days after notifying affected employees [VERIFY threshold and deadline]. Retrenchment benefits are not mandated by statute for most employees but are expected by the tripartite advisory, with norms referenced to service [VERIFY]. The Workplace Fairness Act 2025 will make some discriminatory selection unlawful from its commencement [VERIFY date].

INPUTS
- Proposal: <business reasons, roles, numbers, dates>
- Workforce: <headcount, union recognition, service, work pass holders, protected groups>
- Terms: <contracts, collective agreements, past practice>
- Alternatives: <measures considered>

TASK
1. MISSING INFORMATION. List what you need.
2. BUSINESS CASE AND ALTERNATIVES. Record the reasons and the alternatives considered, such as redeployment, reduced hours or training, as the advisory expects.
3. UNION CONSULTATION. If a union is recognised, set out when to inform and consult and on what, under the collective agreement and the advisory [VERIFY timing].
4. SELECTION. Test the criteria for objectivity, relevance to business needs and absence of discrimination on protected characteristics, and flag criteria that may disadvantage older workers, women returning from maternity leave or others.
5. NOTICE AND BENEFITS. Set out notice under contract or the Act, and retrenchment benefits under contract, collective agreement or prevailing norms; calculate from supplied figures only.
6. WORK PASS HOLDERS. Note steps to cancel passes and repatriation duties.
7. MOM NOTIFICATION. Calculate the notification deadline from the date employees are notified, showing the calculation [VERIFY].
8. COMMUNICATION AND SUPPORT. Sequence communications and list support such as job placement assistance and Workforce Singapore programmes.
9. RISKS. Note wrongful dismissal claims and reputational risk.

RULES
- Never treat the tripartite advisory as optional for planning purposes.
- Mark thresholds, deadlines and benefit norms [VERIFY].
- Do not draft selection criteria that target protected groups.

OUTPUT FORMAT
Missing information; process plan table (Step | Timing | Owner); union consultation plan; selection review; benefits and notice table; work pass steps; MOM notification calculation; communication plan; risks. Close with: Assumptions made; [VERIFY] points.`,
    example: {
      scenario:
        'A unionised electronics manufacturer with 300 Singapore staff plans to cut 40 roles after losing a customer, including 12 work pass holders, and wants to announce next week.',
      result:
        'A process plan requiring union consultation before the announcement, a selection review flagging a "last in, first out" plus age-linked criterion, benefits calculated from the collective agreement, work pass cancellation steps, and the MOM notification deadline calculated from the date employees are told.',
    },
  },
];
