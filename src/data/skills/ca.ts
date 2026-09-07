import type { Skill } from '../../types/skill';

/**
 * Canada skills — federal law over a provincial patchwork.
 *
 * Almost nothing here is answered by federal law alone. Employment, consumer
 * protection and much of privacy are provincial, and Quebec operates a civil
 * law system with its own privacy and language statutes. Every skill in this
 * pack therefore establishes which jurisdiction governs before it analyses
 * anything, and none of them states a single national rule.
 */
export const caSkills: Skill[] = [
  {
    id: 'ca-termination-entitlements',
    name: 'Termination Entitlements Assessor',
    description: 'Assesses a Canadian termination against statutory minimums, common law notice and the enforceability of the clause.',
    jurisdiction: 'ca',
    category: 'employment',
    tags: ['workforce', 'assessment', 'termination', 'reasonable-notice', 'employment-standards', 'severance', 'wrongful-dismissal'],
    sources: [
      { citation: 'Provincial and territorial employment standards legislation', authority: 'primary', publisher: 'Provincial and territorial legislatures', jurisdiction: 'ca', note: 'Each province and territory sets its own notice, severance, mass termination and final pay rules. These are floors that cannot be contracted below, and they differ materially between jurisdictions.' },
      { citation: 'Canada Labour Code', authority: 'primary', publisher: 'Justice Laws Website', jurisdiction: 'ca', url: 'https://laws-lois.justice.gc.ca', note: 'Applies only to federally regulated employers, which have a distinct regime including an unjust dismissal complaint route not available provincially.' },
      { citation: 'Common law of reasonable notice', authority: 'primary', publisher: 'Canadian courts', jurisdiction: 'ca', note: 'Reasonable notice is judge-made and sits above the statutory minimum unless it has been validly displaced by an enforceable contractual term. It is assessed on the individual facts and is not calculated by a formula.' },
      { citation: 'Civil Code of Québec', authority: 'primary', publisher: 'Légis Québec', jurisdiction: 'ca', url: 'https://www.legisquebec.gouv.qc.ca', note: 'Quebec applies a civil law framework to termination, alongside a statutory recourse for dismissal without good and sufficient cause after a qualifying period of service.' },
      { citation: 'Provincial and federal human rights legislation', authority: 'primary', publisher: 'Provincial and federal legislatures', jurisdiction: 'ca', note: 'A termination touching a protected ground raises a separate complaint route with its own remedies and no cap comparable to the common law measure.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-separation-agreement-reviewer', 'uk-employment-tribunal-risk', 'au-unfair-dismissal-assessor'],
    whatItDoes:
      'Works out what a departing Canadian employee is actually owed, which depends first on whether the termination clause in their contract is enforceable at all. It fixes the governing jurisdiction and whether the employer is federally or provincially regulated, calculates the statutory floor, tests the termination provision against the grounds that routinely void such clauses, and where the clause fails assesses common law reasonable notice on the individual factors. It then screens separately for human rights and reprisal exposure, which no notice payment resolves.',
    whenToUse:
      'Before a termination is communicated and an offer made, when structuring a departure package or a restructuring, when drafting or refreshing employment agreements, and when a demand letter arrives from a former employee.',
    inputs: [
      { name: 'Employment details', description: 'Province or territory of employment, start date, age, role and seniority, and compensation including variable pay.', required: true },
      { name: 'Employment agreement', description: 'The contract and any amendments, with the termination provision in full.', required: true },
      { name: 'Reason and circumstances', description: 'Why the employment is ending, and whether cause is being alleged.', required: true },
      { name: 'Regulatory status', description: 'Whether the employer is federally regulated, since that changes the entire framework.' },
      { name: 'Protected grounds and complaints', description: 'Any disability, leave, accommodation request, complaint or safety report preceding the decision.' },
      { name: 'Group context', description: 'Whether this is part of a larger reduction, and how many are affected in the same location.' },
    ],
    outputs: [
      { name: 'Governing framework', description: 'Which jurisdiction and which statute apply, settled before any calculation.' },
      { name: 'Statutory minimum calculation', description: 'Notice, severance where it exists, and the final pay and benefit continuation rules.' },
      { name: 'Clause enforceability analysis', description: 'The termination provision tested against the grounds that commonly void it.' },
      { name: 'Reasonable notice range', description: 'Where the clause fails, a range with the factors that drive it and the offsets that reduce it.' },
      { name: 'Human rights and reprisal screen', description: 'Exposure that a notice payment does not resolve, assessed separately.' },
      { name: 'Mass termination check', description: 'Whether group thresholds are triggered, and the enhanced notice and filing duties.' },
      { name: 'Offer structure', description: 'A defensible package and release strategy, with what must be paid regardless of signature.' },
    ],
    prompt: `You are a Canadian employment lawyer assessing what is owed on a termination.

INPUTS
- Employment: <province or territory where the employee works, start date, age, position and level of responsibility, base salary, bonus, commission, benefits, pension, equity>
- Employment agreement: <paste the contract and any amendments, including the termination provision in full; note whether the employee signed before or after starting work and what they received for signing any amendment>
- Circumstances: <why the employment is ending; is cause alleged, and on what facts?>
- Employer: <industry and whether federally regulated — banking, telecommunications, broadcasting, interprovincial transport, and similar>
- Protected grounds: <any disability, illness, accommodation request, protected leave, complaint, or safety report before the decision>
- Group context: <is this part of a larger reduction? how many employees at the same location within what period?>

TASK
1. GOVERNING FRAMEWORK. Settle this first, because everything downstream depends on it. Identify the province or territory of employment and whether the employer is federally regulated. Federally regulated employers are governed by the Canada Labour Code and non-managerial employees there have an unjust dismissal complaint route with reinstatement available that has no provincial equivalent — if that applies, say so immediately because it changes the entire risk profile. For Quebec, note the civil law framework and the statutory recourse for dismissal without good and sufficient cause after the qualifying period of service. Where the employee worked remotely or across provinces, address which jurisdiction governs rather than assuming one.
2. STATUTORY MINIMUM. Calculate the floor under the applicable statute: notice or pay in lieu, statutory severance pay where the jurisdiction provides it separately from notice and the conditions for it, continuation of benefits through the notice period, vacation pay and accrued entitlements, and the deadline for final pay. State clearly that these are minimums that cannot be contracted below and are owed regardless of whether any release is signed. Mark every figure and threshold [VERIFY] — they differ by jurisdiction and are amended.
3. CLAUSE ENFORCEABILITY. This is the decisive question and usually the whole case. Test the termination provision against the grounds that commonly void it:
   - Whether it purports, on any reading, to provide less than the statutory minimum at any point during the employment, including at hypothetical future dates rather than only today.
   - Whether a just cause provision sets a standard lower than the statutory standard for disentitlement, and whether an invalid cause provision invalidates the whole termination scheme including the without cause part, even where the employee was terminated without cause.
   - Whether benefits and all forms of compensation continue through the statutory notice period, or are cut off at termination.
   - Whether the language is clear and unambiguous in displacing the common law, since ambiguity is resolved in the employee's favour.
   - Whether there was consideration: a term imposed after employment began, without fresh consideration, is vulnerable.
   - Whether the contract has been superseded by changed duties or by a later agreement, or whether a saving or severability clause is being relied on to rescue an offending term, which generally does not work.
   State the conclusion as ENFORCEABLE, UNENFORCEABLE or AT RISK, and give the reasoning for each ground. If unenforceable, the entitlement is common law reasonable notice.
4. REASONABLE NOTICE. Where the clause fails or there is no written agreement, assess common law reasonable notice on the individual factors: character of the employment, length of service, age, and availability of similar employment having regard to experience, training and qualifications. Address the practical realities of the market for this role. Give a RANGE and be explicit that reasonable notice is assessed on the whole of the circumstances and is not produced by a formula such as a month per year of service — say so plainly, because that assumption drives most bad settlements. Note the rough upper limit reserved for exceptional cases and mark it [VERIFY]. Then address what is included in the damages: base salary, bonus and whether the plan language validly excludes an employee who is not actively employed, commission, benefits and the value of lost coverage, pension, and equity vesting during the notice period. Finally address mitigation: the employee's obligation to look for comparable work, the employer's burden to prove a failure to mitigate, and the effect of re-employment during the notice period.
5. CAUSE. If cause is alleged, assess it against the contextual standard, which asks whether the misconduct is so serious that it gives rise to a breakdown in the employment relationship, and note that this is a high threshold rarely met. Distinguish the common law standard from the higher statutory standard for disentitlement to minimum entitlements, since an employee dismissed for cause at common law may still be owed the statutory minimum. Where cause is weak, say so and price the risk of alleging it, including the exposure that a failed and aggressively pursued cause allegation creates.
6. HUMAN RIGHTS AND REPRISAL SCREEN. Assess separately, because a notice payment does not resolve it. Screen for any protected ground engaged, whether the duty to accommodate to the point of undue hardship was discharged, and whether the timing relative to a leave, an illness, an accommodation request, a complaint or a safety report supports an inference. Note that human rights remedies are separate from notice, include compensation for injury to dignity, feelings and self-respect, can include reinstatement, and are not capped by the notice analysis. Then screen for reprisal under employment standards and occupational health and safety legislation.
7. MASS TERMINATION. Where this is part of a group reduction, check whether the jurisdiction's group termination thresholds are triggered by the number of employees at a location within the defined period. If so, set out the enhanced notice, any requirement to file notice with the ministry, any joint planning or adjustment committee obligation, and the fact that the enhanced notice may run from the filing rather than from individual notice. Mark thresholds and periods [VERIFY].
8. OFFER STRUCTURE. Build the package: what must be paid regardless of any release, what is offered above that in exchange for a release, and how it is structured — salary continuation with a clawback on re-employment, or a lump sum. Address the release itself, including that it cannot waive statutory minimums or, in most jurisdictions, the right to file a human rights complaint. Cover the timing and the reasonable opportunity to obtain independent legal advice, the record of employment and its accuracy, benefit continuation and conversion deadlines, references, and the treatment of any restrictive covenants and whether they survive a dismissal without cause.

RULES
- Never state a national rule. Employment standards, human rights and much of the analysis are provincial, and the federal regime is a separate world. Identify the governing jurisdiction before calculating anything.
- Test the termination clause before assessing reasonable notice. If the clause holds, the reasonable notice analysis is irrelevant; if it fails, the statutory minimum is irrelevant as a measure of exposure.
- Do not calculate reasonable notice by formula. Give a range on the individual factors and say what moves it within that range.
- The statutory minimum is owed whether or not a release is signed. Never present it as consideration for the release.
- Mark every threshold, cap and period [VERIFY]. They vary by jurisdiction and are amended.

OUTPUT FORMAT
Open with the governing jurisdiction, whether the termination clause holds, and the resulting exposure as a range. Then the sections above, with a table comparing the statutory minimum against the reasonable notice range, and the offer structure as a concrete proposal.`,
    example: {
      scenario:
        'A twelve-year Ontario sales director is being terminated without cause under a contract limiting them to statutory minimums.',
      result:
        'Termination provision found unenforceable because the just cause clause set a lower standard than the statute and invalidated the whole scheme despite the dismissal being without cause, exposure reassessed on common law reasonable notice as a range driven by age, seniority and length of service, the bonus plan active-employment exclusion flagged as vulnerable, and an offer structured as salary continuation with the statutory minimum paid immediately regardless of the release.',
    },
  },
  {
    id: 'ca-privacy-breach-assessor',
    name: 'Privacy Breach & Reporting Assessor',
    description: 'Assesses a Canadian privacy breach against the federal and provincial reporting thresholds and drafts the notifications.',
    jurisdiction: 'ca',
    category: 'privacy',
    tags: ['data-protection', 'incident-response', 'pipeda', 'breach-notification', 'real-risk-of-significant-harm', 'law-25', 'incident'],
    sources: [
      { citation: 'Personal Information Protection and Electronic Documents Act', authority: 'primary', publisher: 'Justice Laws Website', jurisdiction: 'ca', url: 'https://laws-lois.justice.gc.ca', note: 'Relied on for the real risk of significant harm threshold, the reporting and notification duties, the notice to other organisations, and the breach record-keeping obligation.' },
      { citation: 'Breach of Security Safeguards Regulations', authority: 'primary', publisher: 'Justice Laws Website', jurisdiction: 'ca', url: 'https://laws-lois.justice.gc.ca', note: 'Relied on for the required content of reports and notifications and the record retention period.' },
      { citation: 'Act respecting the protection of personal information in the private sector (Quebec)', authority: 'primary', publisher: 'Légis Québec', jurisdiction: 'ca', url: 'https://www.legisquebec.gouv.qc.ca', note: 'As amended by Law 25. Uses a serious injury threshold and its own register, and applies to organisations operating in Quebec regardless of where they are based.' },
      { citation: 'Provincial private sector privacy legislation of Alberta, British Columbia and Quebec', authority: 'primary', publisher: 'Provincial legislatures', jurisdiction: 'ca', note: 'Declared substantially similar for commercial activity within those provinces, so the applicable statute depends on where the affected individuals are.' },
      { citation: 'Office of the Privacy Commissioner of Canada guidance on privacy breaches', authority: 'regulator', publisher: 'Office of the Privacy Commissioner of Canada', jurisdiction: 'ca', url: 'https://www.priv.gc.ca' },
      { citation: 'Provincial health information privacy legislation', authority: 'primary', publisher: 'Provincial legislatures', jurisdiction: 'ca', note: 'Health information is governed by separate provincial statutes with their own thresholds, timelines and mandatory reporting, which override the general analysis for that data.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-gdpr-breach-assessor', 'au-privacy-ndb-assessor', 'ca-quebec-compliance-checker'],
    whatItDoes:
      'Establishes which privacy statutes apply to an incident before assessing it, because Canadian breach reporting is not one regime: the federal Act, three substantially similar provincial statutes, separate health information legislation and the Quebec regime under Law 25 can all apply to the same incident with different thresholds and different clocks. It then applies the real risk of significant harm test to the facts, works out who must be told and in what order, drafts the reports, and covers the record-keeping duty that applies to every breach whether or not it is reportable.',
    whenToUse:
      'Within hours of any loss of or unauthorised access to personal information, when a service provider reports an incident, and when building a breach response plan for an organisation operating in more than one province.',
    inputs: [
      { name: 'Incident description', description: 'What happened, when it occurred, when it was discovered, and how.', required: true },
      { name: 'Information involved', description: 'Categories of personal information, whether health or financial data is included, and volume.', required: true },
      { name: 'Where individuals are', description: 'Which provinces the affected individuals are in, since that decides which statutes apply.', required: true },
      { name: 'Organisation profile', description: 'Sector, whether federally regulated, where you operate, and whether you hold health information.' },
      { name: 'Safeguards', description: 'Whether the information was encrypted and whether the protection is likely to have held.' },
      { name: 'Containment and cause', description: 'What has been done, whether the cause is known, and whether it is a systemic issue.' },
    ],
    outputs: [
      { name: 'Applicable statutes', description: 'Which regimes apply to this incident and to which affected individuals.' },
      { name: 'Harm assessment', description: 'The real risk of significant harm test applied to the facts, with each factor addressed.' },
      { name: 'Reporting matrix', description: 'Each regulator and each notification duty, with its threshold, deadline and content requirement.' },
      { name: 'Draft regulator reports', description: 'Reports containing the elements each applicable regime requires.' },
      { name: 'Draft individual notification', description: 'Plain-language notice with the required content and a direct delivery assessment.' },
      { name: 'Third-party notifications', description: 'Other organisations and institutions that must or should be told to reduce the risk of harm.' },
      { name: 'Breach register entry', description: 'The record that must be kept whether or not the breach is reportable.' },
    ],
    prompt: `You are a Canadian privacy lawyer assessing a breach of security safeguards and the resulting reporting obligations.

INPUTS
- Incident: <what happened, when it occurred, when discovered, how discovered, whether contained>
- Information involved: <categories of personal information; any health information, financial account data, government identifiers, credentials; volume>
- Affected individuals: <numbers by province or territory, and any outside Canada; any minors or vulnerable individuals>
- Our organisation: <sector, federally regulated or not, provinces of operation, whether we hold health information, whether we are a service provider to another organisation>
- Safeguards: <was the information encrypted? is the protection likely to have held? where were the keys?>
- Containment and cause: <what has been done, is the cause known, is it systemic?>

TASK
1. APPLICABLE STATUTES. Determine which regimes apply before assessing anything else, and set them out as a list rather than choosing one:
   - The federal Act for personal information collected, used or disclosed in the course of commercial activity, and for federally regulated employers in respect of employee information.
   - The private sector statutes of Alberta, British Columbia and Quebec for activity within those provinces, which have been declared substantially similar and displace the federal Act for intra-provincial commercial activity.
   - Quebec's regime as amended, which applies to organisations operating in Quebec regardless of where they are based, uses its own threshold and requires its own register.
   - Provincial health information legislation where health information is involved, which has its own thresholds and timelines and overrides the general analysis for that data.
   - Public sector legislation if any affected party is a public body or you act for one.
   - Foreign regimes where affected individuals are outside Canada.
   State plainly that a single incident commonly triggers several of these at once with different tests and different deadlines, and that the analysis must be run separately for each.
2. IS THIS A REPORTABLE KIND OF INCIDENT? Apply the definition of a breach of security safeguards: loss of, unauthorised access to, or unauthorised disclosure of personal information resulting from a breach of an organisation's security safeguards or from a failure to establish them. Note that loss and inaccessibility count, so ransomware and accidental destruction qualify even with no exfiltration.
3. REAL RISK OF SIGNIFICANT HARM. Apply the federal threshold properly, in two parts.
   a. SIGNIFICANT HARM: does the harm in contemplation include bodily harm, humiliation, damage to reputation or relationships, loss of employment, business or professional opportunities, financial loss, identity theft, negative effects on the credit record, or damage to or loss of property?
   b. REAL RISK: assess the sensitivity of the information and the probability that it has been, is being, or will be misused. Address the two together — sensitivity is contextual and information that is innocuous in one setting is sensitive in another, and combinations of otherwise ordinary data elements can enable identity theft.
   Then address whether encryption or other safeguards remove the risk, being specific about whether the protection actually held rather than whether it was nominally in place. Conclude REPORTABLE or NOT REPORTABLE, and state that the reasoning must be documented either way. Separately apply Quebec's serious injury threshold and any applicable health information threshold, and say where the answers differ — they can and do.
4. REPORTING MATRIX. Build a table with a row for each obligation: the regime, who must be notified, the threshold, the deadline, the required content, and the method. Cover reports to each applicable regulator, notification to affected individuals, and notification to any other organisation or government institution that may be able to reduce the risk of harm or mitigate it. State that the federal duty is to report and notify as soon as feasible after determining that the breach has occurred, that there is no fixed number of days, and that delay must be justifiable. Give the Quebec timing and register requirements separately.
5. WHO ELSE. Identify the other parties: if you are a service provider, the controlling organisation and the terms of your contract with it; if a service provider caused this, your rights against them and their obligations to you; payment card networks; law enforcement; insurers; affected business customers under contractual notification clauses; and credit bureaus or other organisations that could reduce the risk to individuals.
6. DRAFT THE REPORTS AND NOTIFICATIONS.
   a. Regulator report, containing the required elements: a description of the circumstances and the cause if known, the day or period of the breach, the personal information involved, the number of individuals affected or an estimate, the steps taken to reduce or mitigate the risk of harm, the steps taken or intended to notify individuals, and the name and contact of someone who can answer questions.
   b. Individual notification, containing a description of the circumstances, the day or period, the information involved, the steps the organisation has taken to reduce the risk of harm, the steps the individual could take to reduce or mitigate the harm, and contact information. It must be conspicuous and given directly to the individual unless direct notification would cause further harm, cause undue hardship, or the organisation lacks contact information — in which case indirect notification by public communication is required. State which method applies here and why. Where any fact is not yet known, write it as not yet established with an expected date rather than filling the gap.
7. RECORD KEEPING. State that a record must be kept of EVERY breach of security safeguards involving personal information, whether or not it met the threshold, that the regulator can require production of those records, and that the record must contain enough detail to allow the regulator to verify compliance with the assessment. Give the retention period and mark it [VERIFY]. Draft the register entry for this incident. Note the separate Quebec register requirement.
8. UNDERLYING COMPLIANCE. Separately from reporting, identify what the incident exposes: whether the safeguards were appropriate to the sensitivity of the information, retention and disposal practice where data that should have been destroyed was involved, accountability and the designated individual, the adequacy of service provider contracts and oversight, consent and identified purposes for the collection, and cross-border transfer disclosure. Also assess class action exposure, since privacy breaches in Canada attract certified class proceedings and the statutory torts recognised in several provinces do not require proof of pecuniary loss.

RULES
- Never treat this as a single-regime question. Establish every applicable statute first and run the threshold separately under each.
- Do not import the threshold from another country's regime. The Canadian test is real risk of significant harm, Quebec's is serious injury, and neither maps onto a foreign standard.
- Assess sensitivity in context and for the most exposed individual, not the average one.
- Encryption is not an automatic answer. Ask whether the protection held and where the keys were.
- The record-keeping duty applies to every breach, including those you conclude are not reportable. Never omit it because the threshold was not met.
- Mark retention periods, deadlines and Quebec-specific requirements [VERIFY].

OUTPUT FORMAT
Open with the bottom line: which regimes apply, whether the threshold is met under each, and what must happen first. Then the sections above, with the reporting matrix as a table and the draft report, notification and register entry as separate ready-to-use blocks.`,
    example: {
      scenario:
        'A retailer discovers that a misconfigured vendor system exposed customer names, addresses and partial payment data for customers across four provinces including Quebec.',
      result:
        'Federal Act, Alberta, British Columbia and Quebec regimes all identified as applying to different parts of the affected population, real risk of significant harm met on the combination of address and partial payment data, Quebec assessed separately under its serious injury threshold with its register requirement flagged, notification method assessed as direct for customers with email on file and indirect for the rest, and the vendor contract found to lack any notification deadline back to the retailer.',
    },
  },
  {
    id: 'ca-casl-compliance-checker',
    name: 'CASL Compliance Checker',
    description: 'Checks commercial electronic messages and consent records against the Canadian anti-spam regime.',
    jurisdiction: 'ca',
    category: 'compliance',
    tags: ['programme-design', 'review', 'casl', 'anti-spam', 'consent', 'marketing', 'electronic-messages'],
    sources: [
      { citation: "Canada's Anti-Spam Legislation (An Act to promote the efficiency and adaptability of the Canadian economy by regulating certain activities that discourage reliance on electronic means of carrying out commercial activities)", authority: 'primary', publisher: 'Justice Laws Website', jurisdiction: 'ca', url: 'https://laws-lois.justice.gc.ca', note: 'Relied on for the consent requirement, the identification and unsubscribe requirements, the exemptions, and the liability of directors and officers.' },
      { citation: 'Electronic Commerce Protection Regulations', authority: 'primary', publisher: 'Justice Laws Website', jurisdiction: 'ca', url: 'https://laws-lois.justice.gc.ca', note: 'Relied on for the prescribed content of messages and consent requests and for several exemptions.' },
      { citation: 'CRTC guidance and enforcement decisions on commercial electronic messages', authority: 'regulator', publisher: 'Canadian Radio-television and Telecommunications Commission', jurisdiction: 'ca', url: 'https://crtc.gc.ca', note: 'The primary enforcement body. Its undertakings and decisions are the best available indication of how the regime is applied in practice.' },
      { citation: 'Competition Act', authority: 'primary', publisher: 'Justice Laws Website', jurisdiction: 'ca', url: 'https://laws-lois.justice.gc.ca', note: 'Relevant because false or misleading representations in electronic messages, including sender information and subject lines, are enforced separately from the anti-spam regime.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'technology', 'financial-services'],
    relatedSkills: ['ca-advertising-claims-reviewer', 'global-obligation-extraction'],
    whatItDoes:
      'Tests an organisation against a regime that is opt-in by default, applies to far more than marketing email, and carries penalties that reach directors and officers personally. It works out which messages are commercial electronic messages at all, sorts the consent basis for each recipient population into express, implied and expired implied consent, checks the identification and unsubscribe mechanics that must appear in every message, and audits whether the consent records would actually discharge the burden of proof — which sits on the sender, not the regulator.',
    whenToUse:
      'Before a campaign or a new messaging flow launches, when acquiring a list or a business with one, when auditing an existing programme, when implied consent from earlier transactions is approaching expiry, and on any complaint or regulator contact.',
    inputs: [
      { name: 'Message samples', description: 'The messages sent, including the sender details, footer and unsubscribe mechanism.', required: true },
      { name: 'Recipient populations', description: 'Each list or segment, how the addresses were obtained, and when.', required: true },
      { name: 'Consent records', description: 'What is stored evidencing consent for each population, and in what form.', required: true },
      { name: 'Message purposes', description: 'What the messages do — marketing, transactional, service, relationship or a mixture.' },
      { name: 'Channels', description: 'Email, SMS, in-app or social messaging, and whether any software is installed on user devices.' },
      { name: 'Governance', description: 'Policies, training, approval steps and who is accountable for sending decisions.' },
    ],
    outputs: [
      { name: 'Message classification', description: 'Which messages are commercial electronic messages and which fall outside or within an exemption.' },
      { name: 'Consent audit', description: 'Each population mapped to express, implied or no consent, with expiry dates for implied consent.' },
      { name: 'Record adequacy assessment', description: 'Whether the stored evidence would discharge the burden of proof, which sits on the sender.' },
      { name: 'Message mechanics review', description: 'Identification, contact and unsubscribe requirements checked line by line.' },
      { name: 'Exemption analysis', description: 'Which exemptions apply, their limits, and where reliance on them is unsafe.' },
      { name: 'Remediation plan', description: 'What to stop, what to fix, and how to re-permission a list without breaching the regime.' },
      { name: 'Liability exposure', description: 'Penalty range, vicarious liability and personal exposure for directors and officers.' },
    ],
    prompt: `You are a Canadian regulatory lawyer auditing an organisation's compliance with the anti-spam legislation.

INPUTS
- Message samples: <paste the messages, including sender name, from address, footer, and the unsubscribe mechanism>
- Recipient populations: <each list or segment: how addresses were obtained, when, and what the person was told at the time>
- Consent records: <what is stored for each population — timestamps, source, wording shown, and in what system>
- Purposes: <marketing, transactional, service, relationship, survey, or a mixture>
- Channels: <email, SMS, in-app, social messaging; and whether the organisation installs any software on users' computers or devices>
- Governance: <policies, training, approval steps, who decides what gets sent>

TASK
1. CLASSIFICATION. Determine which messages are commercial electronic messages, meaning messages sent by any means of telecommunication that, having regard to their content, any hyperlinks in them, or the contact information in them, it would be reasonable to conclude have as one of their purposes to encourage participation in a commercial activity. Emphasise that one purpose is enough: a service or transactional message carrying a promotional link or a marketing footer is caught. Address the jurisdictional reach — the regime applies where a computer system in Canada is used to send or access the message, so location of the sender is not the test. Sort the messages into caught, exempt and outside scope, and explain each classification.
2. EXEMPTIONS. Work through the exemptions that apply to full compliance and those that apply only to the consent requirement, keeping them separate because the difference is routinely missed. Cover messages between individuals with a personal or family relationship as defined; messages to a person engaged in a commercial activity consisting solely of an enquiry about that activity; messages sent within an organisation or between organisations with a relationship, concerning the activities of the recipient organisation; messages responding to a request, enquiry or complaint or otherwise solicited; messages providing a quote requested by the recipient; messages completing or confirming a commercial transaction already agreed; messages providing warranty, product recall, safety or security information; messages giving factual information about a subscription, membership, account, loan or ongoing relationship; and messages delivering a product or service including updates and upgrades. For each that is relied on, state its limits precisely and say whether reliance is safe here, because these are narrower than they appear.
3. CONSENT AUDIT. For each recipient population, identify the consent basis:
   - EXPRESS CONSENT: was it obtained through a positive action, with the required disclosures at the time — the purpose, the identity of the person seeking consent and on whose behalf, contact information, and a statement that consent can be withdrawn? Flag pre-checked boxes, consent bundled into terms of service, and consent obtained without the prescribed disclosures. Note that valid express consent does not expire.
   - IMPLIED CONSENT from an existing business relationship: identify the triggering event — a purchase or lease, acceptance of a business or investment opportunity, a written contract, or an enquiry — and calculate the expiry date from that event. Produce the expiry date for each population and flag those approaching it. Note that an enquiry gives a shorter period than a transaction, and mark both periods [VERIFY].
   - IMPLIED CONSENT from an existing non-business relationship, and from conspicuous publication or disclosure of an address, noting that the latter requires the message to be relevant to the person's business role and that no statement refusing such messages was published.
   - NO CONSENT: identify populations with no defensible basis, including purchased lists, scraped addresses, and addresses acquired with a business where the consent did not transfer or was never documented.
   Produce a table with columns Population, Size, Basis, Evidence, Expiry and Risk.
4. RECORD ADEQUACY. Assess whether the stored evidence would actually discharge the burden, which is on the person who sent the message to prove consent — not on the regulator to disprove it. Check what is captured: the date and time, the source and method, the exact wording displayed, the version of the form, the IP address or equivalent, and whether the record survives system migrations and is retrievable per individual on request. State plainly that a list with no provenance is a list with no consent, whatever the organisation believes about how it was built.
5. MESSAGE MECHANICS. Check every message against the prescribed content requirements, line by line:
   - Identification of the sender, and of the person on whose behalf the message is sent where different.
   - Contact information — a mailing address, and either a telephone number with an active response voicemail, an email address or a web address — valid and monitored for the prescribed minimum period after the message is sent.
   - An unsubscribe mechanism that is clearly and prominently set out, can be readily performed, is at no cost, and uses the same or a comparable electronic means as the message.
   - Whether unsubscribe requests are given effect without delay and no later than the prescribed period, and whether that is actually achieved in practice across every system that sends.
   Mark the periods [VERIFY]. Flag any mechanism requiring a login, a reason, a survey, or more than a minimal number of steps.
6. ADJACENT PROHIBITIONS. Address the parts of the regime beyond messaging: the prohibition on altering transmission data so a message is delivered to a different destination without consent, and the prohibition on installing a computer program on another person's computer system in the course of commercial activity without consent, including the enhanced disclosure required for programs with specified functions. If the organisation ships software, an app or anything that updates itself, assess this — it is frequently overlooked and carries the same penalty regime. Separately, check sender names and subject lines against the prohibition on false or misleading representations, which is enforced under competition law independently.
7. REMEDIATION. Set out what to stop immediately, what to fix, and in what order. Where a list must be re-permissioned, explain the central constraint: a message asking for consent is itself a commercial electronic message, so it cannot lawfully be sent to people for whom no consent basis exists. Give the routes that do work — collecting consent through channels outside the regime, relying on an unexpired implied consent window while it lasts, and capturing express consent at every future touchpoint.
8. LIABILITY. Set out the exposure: the maximum administrative monetary penalties for individuals and for organisations, the factors relevant to the amount, vicarious liability for the acts of employees acting within the scope of their employment and of agents acting within their authority, and personal liability for directors, officers and agents who directed, authorised, assented to, acquiesced in or participated in the contravention. Note the due diligence defence and what an organisation must be able to show to rely on it. Mark penalty figures [VERIFY].

RULES
- The regime is opt-in. Absence of a complaint is not evidence of consent, and neither is a long-standing list.
- One commercial purpose is enough to bring a message into scope. Do not treat a message as transactional because that is its main purpose.
- Keep the exemptions from full compliance separate from the exemptions from consent only. Conflating them produces messages that are exempt from consent but still missing mandatory content.
- The burden of proving consent is on the sender. Assess the records, not the organisation's belief about how the list was built.
- Never recommend sending a consent request to a population with no existing consent basis.
- Mark all periods and penalty figures [VERIFY].

OUTPUT FORMAT
Open with the populations that must stop receiving messages immediately and the highest-value fix. Then the sections above, with the consent audit and message mechanics as tables, and the remediation plan sequenced with owners.`,
    example: {
      scenario:
        'A retailer preparing a promotional campaign audits four email lists, one of which came with a small business it acquired two years ago.',
      result:
        'The acquired list found to have no documented consent basis and removed from the campaign, implied consent from purchases calculated per recipient with a third of one list already expired, a service email carrying a promotional footer reclassified as a commercial electronic message subject to full requirements, the unsubscribe mechanism flagged for requiring account login, and a re-permissioning plan that avoided sending consent requests to the population with no lawful basis.',
    },
  },
  {
    id: 'ca-quebec-compliance-checker',
    name: 'Quebec Law 25 & Language Compliance Checker',
    description: 'Maps Quebec privacy and French language obligations for an organisation doing business in the province.',
    jurisdiction: 'ca',
    category: 'regulatory',
    tags: ['data-protection', 'assessment', 'law-25', 'quebec', 'french-language', 'privacy', 'consent'],
    sources: [
      { citation: 'Act respecting the protection of personal information in the private sector (Quebec)', authority: 'primary', publisher: 'Légis Québec', jurisdiction: 'ca', url: 'https://www.legisquebec.gouv.qc.ca', note: 'As amended by Law 25. Relied on for governance, consent, transparency, automated decision-making, portability, de-indexing, privacy impact assessments and the transfer assessment.' },
      { citation: 'Charter of the French language (Quebec)', authority: 'primary', publisher: 'Légis Québec', jurisdiction: 'ca', url: 'https://www.legisquebec.gouv.qc.ca', note: 'As amended by Law 96. Relied on for contracts of adhesion, commercial publications, websites, employment documents, signage and francisation obligations.' },
      { citation: 'Commission d’accès à l’information guidance', authority: 'regulator', publisher: "Commission d'accès à l'information du Québec", jurisdiction: 'ca', url: 'https://www.cai.gouv.qc.ca' },
      { citation: 'Office québécois de la langue française guidance', authority: 'regulator', publisher: 'Office québécois de la langue française', jurisdiction: 'ca', url: 'https://www.oqlf.gouv.qc.ca' },
      { citation: 'Civil Code of Québec', authority: 'primary', publisher: 'Légis Québec', jurisdiction: 'ca', url: 'https://www.legisquebec.gouv.qc.ca', note: 'Relevant to consent, personality rights and the interpretation of contracts of adhesion.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['technology', 'retail-consumer', 'financial-services'],
    relatedSkills: ['ca-privacy-breach-assessor', 'eu-dpia-ropa-builder', 'cross-transfer-mechanism-picker'],
    whatItDoes:
      'Covers the two Quebec regimes that catch out organisations based elsewhere in Canada, both of which apply on the basis of doing business in Quebec rather than being established there. On privacy it maps the Law 25 obligations that go beyond the rest of Canada — a designated privacy officer, privacy impact assessments, the transfer assessment, automated decision transparency, portability and de-indexing. On language it works through the French requirements for contracts, websites, marketing, employment documents, signage and trademarks, and the enforcement routes that attach to each.',
    whenToUse:
      'Before offering products or services in Quebec, when hiring or engaging anyone based there, when adding a Quebec entity or premises, when launching a website or campaign reaching Quebec, and when auditing an existing programme against the two regimes together.',
    inputs: [
      { name: 'Quebec footprint', description: 'Whether you have premises, employees, customers or users in Quebec, and how many.', required: true },
      { name: 'Personal information handling', description: 'What you collect, why, where it is stored, and which service providers touch it.', required: true },
      { name: 'Customer-facing materials', description: 'Website, contracts, terms, marketing materials, invoices and signage, with the languages each is offered in.', required: true },
      { name: 'Privacy governance', description: 'Who is accountable for privacy, what policies exist, and whether they are published.' },
      { name: 'Automated decisions', description: 'Any decision about an individual made exclusively by automated processing, and what it determines.' },
      { name: 'Employment documents', description: 'Offer letters, contracts, policies and internal communications, and the languages used.' },
    ],
    outputs: [
      { name: 'Applicability determination', description: 'Whether each regime applies, on the doing-business test rather than place of establishment.' },
      { name: 'Privacy obligations map', description: 'Each Law 25 obligation mapped to what the organisation currently does, with gaps marked.' },
      { name: 'Consent and transparency review', description: 'Consent mechanics, the required disclosures, and the treatment of sensitive information.' },
      { name: 'Transfer assessment requirement', description: 'Where information leaves Quebec, the assessment that must be conducted and documented.' },
      { name: 'Language compliance matrix', description: 'Each document and surface against its French requirement, with the standard that applies.' },
      { name: 'Remediation plan', description: 'Sequenced fixes across both regimes with owners and dependencies.' },
      { name: 'Enforcement exposure', description: 'Penalties, the private right of action, and the complaint routes under each regime.' },
    ],
    prompt: `You are a Quebec-qualified lawyer advising an organisation on its obligations under the province's privacy and French language regimes.

INPUTS
- Quebec footprint: <premises, employees, contractors, customers or users in Quebec, and approximate numbers; where the organisation is established>
- Personal information: <what is collected, purposes, where stored, which service providers touch it, and whether any leaves Quebec>
- Customer-facing materials: <website, contracts and terms, marketing, invoices, receipts, product documentation, signage — and the languages each is currently offered in>
- Privacy governance: <who is accountable, what policies exist, whether published, incident register, retention schedule>
- Automated decisions: <any decision about an individual made exclusively by automated processing, and what it determines>
- Employment documents: <offer letters, contracts, policies, internal communications, and the languages used>

TASK
1. APPLICABILITY. Address both regimes separately and state plainly that each turns on doing business in Quebec rather than on being established there, so an organisation based in another province or country is caught by its Quebec activity. For the language regime, identify which obligations turn on employee headcount thresholds in Quebec, which apply regardless of size, and which attach to holding a business registration. Mark all thresholds [VERIFY].
2. PRIVACY GOVERNANCE. Map the structural obligations: the requirement to designate a person in charge of the protection of personal information, that the role defaults to the person with the highest authority unless delegated in writing, and that the title and contact details must be published. Then cover governance policies and practices — that they must be established, approved, framed in clear and simple language and published on the website — the retention and destruction requirement, the confidentiality incident register, and the obligation to report incidents presenting a risk of serious injury.
3. CONSENT AND TRANSPARENCY. Work through what must be disclosed at or before collection: the purposes, the means of collection, the rights of access and rectification, and the right to withdraw consent. Then assess the consent standard: that consent must be clear, free and informed and given for specific purposes, that it must be requested separately from any other information, and that it must be manifestly clear where sensitive information is involved. Address sensitive information and what makes information sensitive by its nature or context. Cover the requirement that privacy settings for technology providing identification, location or profiling be set to the highest level of confidentiality by default, and the obligation to notify individuals when such technology is used. Assess the current consent flows against each and identify what fails.
4. INDIVIDUAL RIGHTS. Map the rights the organisation must be able to service and the operational readiness for each: access and rectification, withdrawal of consent, portability in a structured and commonly used technological format, and de-indexing or ceasing dissemination in the defined circumstances. State the response deadline and mark it [VERIFY]. Identify which of these the organisation cannot currently deliver.
5. AUTOMATED DECISIONS AND PROFILING. Where a decision is based exclusively on automated processing, set out the obligation to inform the individual at or before the decision, and on request to inform them of the personal information used, the reasons and principal factors that led to the decision, and their right to have it corrected — together with the right to submit observations to a person able to review the decision. Assess whether any current process is caught, including scoring, eligibility and pricing decisions.
6. PRIVACY IMPACT ASSESSMENTS AND TRANSFERS. Identify when an assessment is required, including for the acquisition, development or overhaul of an information system or electronic service delivery involving personal information, and for communication outside Quebec. For transfers out of Quebec, set out the assessment that must be conducted: whether the information would receive adequate protection in light of generally recognised principles, taking into account the sensitivity of the information, the purposes, the protection measures including contractual ones, and the legal framework of the destination. State that the transfer must be the subject of a written agreement and that the assessment must be documented. Identify every current flow out of Quebec, including service providers and intra-group transfers, and mark those with no assessment.
7. LANGUAGE — CONTRACTS AND CONSUMER DOCUMENTS. Work through the French requirements. Contracts of adhesion must be presented in French, and the party may only be bound by a version in another language after examining the French version — address what that means for click-through and online flows, and the narrow exceptions. Cover invoices, receipts and other commercial documents, product documentation and warranties, and application forms. State that where a document exists in both languages the French version must be available on terms at least as favourable.
8. LANGUAGE — WEBSITES, MARKETING AND SIGNAGE. Cover commercial publications, catalogues, brochures and websites available in another language needing a French version of at least equal prominence and quality, public signage and the requirement for markedly predominant French where a trademark in another language appears, product inscriptions, and the treatment of trademarks including the conditions for the recognised trademark position and the requirement for a French generic term or description on public signage. Mark the trademark conditions [VERIFY], since this has been amended and is enforced actively.
9. LANGUAGE — EMPLOYMENT. Cover the requirement to draw up offers of employment, individual employment contracts and other employment-related documents in French, the conditions on requiring knowledge of a language other than French including the obligation to take reasonable means to avoid imposing that requirement, written communications to employees, and francisation obligations where the Quebec headcount threshold is met, including registration and the certification process. Assess the organisation's current practice against each.
10. REMEDIATION AND EXPOSURE. Sequence the fixes across both regimes, identifying dependencies — for example that a published governance policy and a designated officer are prerequisites for much of the rest, and that translation work has a lead time that gates the language items. Then set out enforcement: the administrative and penal penalties under each regime, the private right of action and the availability of punitive damages for unlawful infringement of a right, the regulator complaint routes, and the practical consequences of non-compliance for business registration and public contracts. Mark all penalty figures [VERIFY].

RULES
- Treat the two regimes separately and then sequence them together. They have different regulators, different tests and different penalties, and an organisation can be fully compliant with one and exposed under the other.
- Do not advise that being established outside Quebec removes the obligations. Both regimes reach organisations doing business in Quebec.
- Do not treat Law 25 as the Quebec implementation of a foreign privacy regime. It has requirements with no counterpart elsewhere, and its thresholds and vocabulary are its own.
- Where a French obligation applies, translation alone is not compliance. Address prominence, timing, and the order in which versions are presented.
- Mark every threshold, deadline and penalty [VERIFY], and note where a provision has a delayed or staged commencement.

OUTPUT FORMAT
Open with whether each regime applies and the three highest-exposure gaps. Then the sections above, with the privacy obligations map and the language compliance matrix as tables, closing with a sequenced remediation plan showing dependencies.`,
    example: {
      scenario:
        'An Ontario-based software company with several thousand Quebec users and four remote Quebec employees reviews its position before a provincial marketing push.',
      result:
        'Both regimes confirmed to apply despite no Quebec establishment, no designated privacy officer or published governance policy identified as blocking prerequisites, transfers to two US sub-processors flagged as requiring documented transfer assessments and written agreements that did not exist, the click-through terms found not to satisfy the contract of adhesion requirement because no French version was presented first, employment offers issued only in English, and a sequenced plan placing the officer designation and translation lead time ahead of the campaign date.',
    },
  },
  {
    id: 'ca-advertising-claims-reviewer',
    name: 'Advertising & Claims Reviewer',
    description: 'Reviews Canadian marketing claims and pricing for misleading representations under the Competition Act.',
    jurisdiction: 'ca',
    category: 'compliance',
    tags: ['programme-design', 'review', 'competition-act', 'advertising', 'misleading-representations', 'drip-pricing', 'greenwashing'],
    sources: [
      { citation: 'Competition Act', authority: 'primary', publisher: 'Justice Laws Website', jurisdiction: 'ca', url: 'https://laws-lois.justice.gc.ca', note: 'Relied on for the civil and criminal misleading representations provisions, ordinary selling price, drip pricing, performance claims requiring adequate and proper testing, environmental claims, and the private access regime.' },
      { citation: 'Competition Bureau enforcement guidance on deceptive marketing practices', authority: 'regulator', publisher: 'Competition Bureau Canada', jurisdiction: 'ca', url: 'https://competition-bureau.canada.ca' },
      { citation: 'Consumer Packaging and Labelling Act and the Textile Labelling Act', authority: 'primary', publisher: 'Justice Laws Website', jurisdiction: 'ca', url: 'https://laws-lois.justice.gc.ca', note: 'Relevant where claims appear on packaging or labels, which carry their own requirements including bilingual labelling.' },
      { citation: 'Provincial consumer protection legislation', authority: 'primary', publisher: 'Provincial legislatures', jurisdiction: 'ca', note: 'Each province prohibits unfair practices with its own remedies, including rescission rights, and applies in parallel with the federal regime.' },
      { citation: 'Canadian Code of Advertising Standards', authority: 'guidance', publisher: 'Ad Standards', jurisdiction: 'ca', url: 'https://adstandards.ca', note: 'Industry self-regulation. Not law, but the complaint route most likely to be used against a consumer campaign.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'technology'],
    relatedSkills: ['ca-casl-compliance-checker', 'au-consumer-guarantees-checker', 'uk-consumer-rights-checker'],
    whatItDoes:
      'Reviews marketing material against the standard Canadian law actually applies: the general impression conveyed as well as the literal meaning, judged from the perspective of an ordinary consumer, with no need to prove anyone was actually misled. It separates claims by the substantiation each requires, applies the specific regimes for savings claims, all-in pricing, performance claims needing testing done before the claim is made, and environmental claims where the burden of substantiation now sits on the advertiser, and prices the exposure including the private access route now open to complainants.',
    whenToUse:
      'Before a campaign, packaging or pricing change goes live, when introducing a sale or savings claim, when making a performance, comparative or environmental claim, and on any complaint, competitor challenge or Bureau enquiry.',
    inputs: [
      { name: 'Marketing material', description: 'The advertisements, landing pages, packaging, emails and any disclaimers, as the consumer will see them.', required: true },
      { name: 'Claims made', description: 'Each performance, comparative, savings or environmental claim stated or implied.', required: true },
      { name: 'Substantiation held', description: 'The testing, data or evidence supporting each claim, and when it was obtained.', required: true },
      { name: 'Pricing structure', description: 'Headline price, all mandatory fees and charges, and what is added later in the flow.' },
      { name: 'Savings claim basis', description: 'For any sale or was-now claim, the reference price and the period and volume it was offered at.' },
      { name: 'Channels and audience', description: 'Where the material runs, and whether it targets children or a vulnerable audience.' },
    ],
    outputs: [
      { name: 'General impression analysis', description: 'What an ordinary consumer would take from the material, separate from its literal accuracy.' },
      { name: 'Claim substantiation matrix', description: 'Each claim against the evidence required and the evidence held, with the timing checked.' },
      { name: 'Pricing review', description: 'All-in pricing and savings claims tested against the specific statutory rules.' },
      { name: 'Environmental claims assessment', description: 'Each green claim against the substantiation standard and methodology requirement.' },
      { name: 'Disclaimer effectiveness', description: 'Whether qualifying language actually cures the general impression or merely contradicts it.' },
      { name: 'Revised copy', description: 'Rewritten claims and pricing presentation that keep the message and are supportable.' },
      { name: 'Exposure and enforcement routes', description: 'Penalties, remedies and who can bring a challenge, including private applicants.' },
    ],
    prompt: `You are a Canadian competition and advertising lawyer reviewing marketing material before it runs.

INPUTS
- Material: <paste the advertisements, landing page copy, packaging text, email subject lines and body, and any disclaimers or fine print, described as the consumer will encounter them>
- Claims: <each performance, comparative, savings or environmental claim, stated or implied>
- Substantiation: <the testing, study or data behind each claim, when it was obtained, by whom, and under what conditions>
- Pricing: <headline price, every mandatory fee and charge, and at what point in the purchase flow each is disclosed>
- Savings basis: <for any sale or was-now claim: the reference price, how long it was offered at that price, and what volume sold at it>
- Channels and audience: <where the material runs; does it target children or a vulnerable audience?>

TASK
1. GENERAL IMPRESSION. Assess what an ordinary consumer, credulous and inexperienced, would take from the material as a whole — the general impression conveyed by the layout, imagery, emphasis and sequence, as well as the literal meaning of the words. Both are assessed, and a representation that is literally true can still be misleading in its general impression. State plainly that it is not necessary to prove any person was actually misled, and that intention is not an element of the civil provision. Identify every implied claim the material makes but does not state.
2. CLAIM SUBSTANTIATION MATRIX. Build a table with a row for each claim: the claim as consumers will understand it, the type of claim, the substantiation required, the substantiation held, whether it was obtained before the claim was made, and the resulting rating. Address specifically:
   - PERFORMANCE CLAIMS: any representation as to the performance, efficacy or length of life of a product must be based on an adequate and proper test made before the representation is made. Emphasise the timing: substantiation assembled afterwards does not cure the contravention. Assess whether the testing is adequate and proper for what the claim actually asserts, whether it tests the claim made rather than an adjacent one, and whether the conditions reflect real-world use.
   - COMPARATIVE CLAIMS: whether the comparison is like for like, current, and fairly represents the competing product, and whether the basis of comparison is disclosed.
   - TESTIMONIALS AND REVIEWS: whether they are genuine, whether the person has been compensated and whether that is disclosed, and whether any review manipulation or undisclosed material connection is involved.
   - GUARANTEE AND WARRANTY CLAIMS: whether the terms are as represented and whether they are honoured in practice.
3. PRICING. Apply the specific pricing rules:
   - ALL-IN PRICING: assess whether the headline price is attainable, given every mandatory fee. Making a representation of a price that is not attainable because of fixed obligatory charges added later is prohibited, subject to the narrow carve-out for amounts imposed by law. Walk the actual purchase flow and identify each point where a mandatory charge appears after the headline.
   - ORDINARY SELLING PRICE: for any savings, sale, or was-now claim, test the reference price against both the volume test and the time test — whether a substantial volume was sold at that price or higher within a reasonable period, or whether it was offered in good faith at that price or higher for a substantial period. State which test is being relied on and whether the evidence supports it. Flag inflated reference prices, permanent sales, and reference prices never genuinely offered.
   - BAIT AND SWITCH: whether advertised product is supplied in reasonable quantities having regard to the nature of the market and the advertisement, and whether the flow steers consumers to a higher-priced alternative.
   - ORDINARY PRICE AND FEE DISCLOSURE across subscriptions, renewals and negative option billing.
4. ENVIRONMENTAL CLAIMS. Assess each green claim under the specific regime. A representation about a product's environmental benefit must be based on an adequate and proper test, and a representation about a business or business activity's environmental benefits must be based on adequate and proper substantiation in accordance with an internationally recognised methodology — with the burden of establishing that resting on the person making the claim. Address vague and unqualified claims such as eco-friendly, green, sustainable, carbon neutral and net zero, whether the claim relates to the product, the packaging or the business as a whole, whether offsets are relied on and disclosed, and whether future commitments are presented as present achievements. Mark the methodology requirement [VERIFY] and note that this area is newly and actively enforced.
5. DISCLAIMERS AND FINE PRINT. Assess whether qualifying language works. A disclaimer cannot contradict or cure a false general impression; it can only clarify one that is ambiguous. Check prominence, proximity to the claim, legibility, and whether the consumer would encounter it before forming the impression or acting. Flag asterisked terms leading to material limitations, disclaimers below the fold, and time-limited terms disclosed only after purchase begins.
6. CRIMINAL AND CIVIL TRACKS. Distinguish the civil deceptive marketing provisions from the criminal offence, which requires knowledge or recklessness, and identify which track the conduct here sits in. Note that most enforcement is civil but that the criminal track exists and the choice is the Bureau's.
7. ADJACENT REGIMES. Screen the same material against: provincial consumer protection legislation, which prohibits unfair practices with its own remedies including rescission and applies in parallel; packaging and labelling requirements including bilingual labelling; the Quebec language and consumer rules if the material runs there; sector-specific advertising rules; and the industry self-regulatory code, which is not law but is the route a competitor or consumer complaint most often takes.
8. REVISED COPY. Rewrite each failing claim so that it keeps the marketing message and is supportable. Where a claim cannot be supported, say so plainly and offer the strongest claim the evidence does support rather than a softened version of the unsupportable one.
9. EXPOSURE. Set out the remedies and penalties: administrative monetary penalties and how they are calculated including the revenue-based measures, restitution to purchasers, prohibition orders, corrective notices, and the cost of a recall or campaign withdrawal. Then identify who can bring a challenge — the Bureau, and private applicants who may now seek leave to bring an application directly, which materially changes the risk from competitors. Mark all penalty figures [VERIFY].

RULES
- Assess the general impression first and separately from literal accuracy. Most contraventions are literally true statements arranged misleadingly.
- Substantiation for performance claims must exist before the claim is made. Never treat evidence obtained later as curing the problem.
- Do not accept a disclaimer as fixing a claim whose general impression is false.
- Apply the ordinary selling price tests to the actual sales data. A reference price nobody paid is not a reference price.
- For environmental claims, the burden of substantiation is on the advertiser. Do not treat a plausible-sounding green claim as acceptable because it is common in the market.
- Mark penalty figures, the methodology requirement and anything turning on recent amendments [VERIFY].

OUTPUT FORMAT
Open with the claims that cannot run as drafted and why. Then the sections above, with the substantiation matrix and pricing review as tables, and the revised copy as usable text.`,
    example: {
      scenario:
        'A consumer electronics brand prepares a national campaign with a was-now price, a battery life claim and a recycled packaging message.',
      result:
        'Battery life claim found to rest on testing conducted under conditions not reflecting normal use and commissioned after the copy was written, so unsupportable on the timing requirement alone, the reference price found to have been offered for only nine days with negligible volume so failing both ordinary selling price tests, mandatory activation and shipping fees appearing after the headline flagged under all-in pricing, the recycled packaging claim narrowed to the specific component it applied to, and revised copy supplied for each.',
    },
  },
];
