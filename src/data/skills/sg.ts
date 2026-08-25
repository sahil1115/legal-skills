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
];
