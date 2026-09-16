import type { Skill } from '../../../types/skill';

/**
 * UK privacy and compliance skills — data breaches, bribery and fraud prevention.
 */
export const ukPrivacyComplianceSkills: Skill[] = [
  {
    id: 'uk-gdpr-breach-assessor',
    name: 'UK GDPR Breach & ICO Notification Assessor',
    description: 'Assesses a personal data breach against the UK GDPR thresholds and drafts the ICO and individual notifications.',
    jurisdiction: 'uk',
    category: 'privacy',
    tags: ['data-protection', 'incident-response', 'uk-gdpr', 'ico', 'breach-notification', 'personal-data', 'incident'],
    sources: [
      { citation: 'UK General Data Protection Regulation', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'The retained and amended domestic instrument. It is not the EU GDPR and diverges from it; both the text and the case law must be checked against the UK version.' },
      { citation: 'Data Protection Act 2018', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the domestic exemptions, the law enforcement regime and the penalty framework.' },
      { citation: 'ICO guidance on personal data breaches and reporting', authority: 'regulator', publisher: 'Information Commissioner’s Office', jurisdiction: 'uk', url: 'https://ico.org.uk' },
      { citation: 'Privacy and Electronic Communications Regulations 2003', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relevant where the entity is a communications service provider, which carries a separate and stricter notification regime.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['au-privacy-ndb-assessor', 'sg-pdpc-breach-notifier', 'global-data-rights-request-handler'],
    whatItDoes:
      'Runs an incident against the two separate notification thresholds the UK GDPR sets — risk to rights and freedoms for the regulator, and high risk for the individuals themselves — which are different tests producing different answers. It fixes the moment of awareness that starts the 72-hour clock, establishes whether the organisation is acting as controller or processor because that decides who notifies whom, drafts both notifications, and separates the underlying compliance failures the incident exposes from the notification question itself.',
    whenToUse:
      'Within hours of suspecting any loss, unauthorised access to or unauthorised disclosure of personal data, when a processor reports an incident to you, and when building the breach response plan before an incident happens.',
    inputs: [
      { name: 'Incident description', description: 'What happened, when it occurred, when it was discovered, and how it came to light.', required: true },
      { name: 'Data involved', description: 'Categories of personal data, whether special category or criminal offence data is included, and volume.', required: true },
      { name: 'Role', description: 'Whether you are controller, joint controller or processor for this data, and who the other parties are.', required: true },
      { name: 'Individuals affected', description: 'How many, who they are, whether children are involved, and any particular vulnerability.' },
      { name: 'Technical measures', description: 'Whether the data was encrypted or pseudonymised, and whether the protection is likely to have held.' },
      { name: 'Containment', description: 'What has been done, when, and whether it reduces the risk to individuals.' },
    ],
    outputs: [
      { name: 'Breach determination', description: 'Whether this is a personal data breach at all, and which of the three types it is.' },
      { name: 'Clock analysis', description: 'When awareness occurred, when the 72 hours expires, and what to do if the deadline cannot be met with full information.' },
      { name: 'Regulator threshold assessment', description: 'The risk test applied to the facts, with the reasoning recorded either way.' },
      { name: 'Individual threshold assessment', description: 'The separate high-risk test, and the exemptions that can remove the duty to tell individuals.' },
      { name: 'Draft ICO notification', description: 'A notification containing each element the regulation requires, with gaps flagged rather than filled.' },
      { name: 'Draft individual communication', description: 'Plain-language notification meeting the content requirements.' },
      { name: 'Underlying compliance review', description: 'The obligations the incident exposes independently of the breach, and the record that must be kept.' },
    ],
    prompt: `You are a UK data protection lawyer assessing a personal data breach under the UK GDPR and the Data Protection Act.

INPUTS
- Incident: <what happened, when it occurred, when it was discovered, how, and whether it is contained>
- Data involved: <categories of personal data; any special category data such as health, biometric, racial or ethnic origin, political opinions, religious beliefs, trade union membership, sex life or sexual orientation; any criminal offence data; credentials; financial data>
- Our role: <controller, joint controller or processor for this data; identify the other parties>
- Individuals affected: <number, who they are, whether any are children, any vulnerability>
- Technical measures: <was the data encrypted or pseudonymised? is the protection likely to have held? where are the keys?>
- Containment: <what has been done, when, and whether it reduces risk to individuals>

TASK
1. IS THIS A PERSONAL DATA BREACH? Apply the definition: a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data. Classify it as a confidentiality, integrity or availability breach, and note that a ransomware incident or an accidental deletion is a breach even where nobody outside has seen the data. If it is not a personal data breach, say so and stop the notification analysis — but continue with the compliance review at step 7.
2. ROLE AND WHO NOTIFIES. Establish whether the organisation is controller or processor for this data. A processor notifies the controller without undue delay and does not notify the regulator; a controller notifies the regulator and, where the threshold is met, the individuals. For joint controllers, identify who discharges the duty under the arrangement between them. Where a processor has reported to you, the clock analysis in step 3 runs from your awareness, not theirs.
3. THE CLOCK. Fix the moment of awareness — when the organisation had a reasonable degree of certainty that a security incident had occurred leading to personal data being compromised, which may be later than first suspicion but is not deferred by an unhurried investigation. State the date and time awareness occurred, the date and time 72 hours expires, and note that the period runs in clock hours including weekends. Where full information will not be available in time, state plainly that the notification must still be made within the deadline and may be provided in phases, and that a late notification must explain the delay.
4. REGULATOR THRESHOLD. Apply the test: is the breach likely to result in a risk to the rights and freedoms of natural persons? Assess against the factors — the type of breach, the nature, sensitivity and volume of the data, the ease of identifying individuals, the severity of consequences, any special characteristics of the individuals or of the controller, and the number of people affected. Address whether encryption or pseudonymisation removes the risk, and be specific about whether the protection actually held rather than whether it existed. Conclude NOTIFY or DO NOT NOTIFY. Where the conclusion is not to notify, state that the reasoning must be documented, because the record is what the regulator will examine.
5. INDIVIDUAL THRESHOLD. Apply the separate and higher test: is the breach likely to result in a HIGH risk to the rights and freedoms of individuals? This is a different question with a different answer, and conflating the two is the most common error in breach response. Where the threshold is met, communication must be without undue delay. Then consider the exemptions: appropriate technical and organisational protection rendering the data unintelligible, subsequent measures ensuring the high risk is no longer likely to materialise, and disproportionate effort — which requires a public communication instead rather than silence. Apply each to these facts rather than listing them.
6. DRAFT THE NOTIFICATIONS.
   a. ICO notification, containing: the nature of the breach including the categories and approximate numbers of individuals and records concerned; the name and contact details of the data protection officer or other contact point; the likely consequences; and the measures taken or proposed, including measures to mitigate adverse effects. Where a fact is not yet known, write it as not yet established with the date it is expected — do not fill a gap with an assumption.
   b. Individual communication, in clear and plain language, describing the nature of the breach and containing the contact point, the likely consequences, and the measures taken or proposed. Do not minimise. Say what the individual should do now and where to get help.
7. UNDERLYING COMPLIANCE REVIEW. Separately from notification, identify what the incident exposes: the security obligation and whether the measures were appropriate to the risk; storage limitation, where data that should have been deleted was involved; data minimisation; the lawful basis for the processing; the adequacy of the processor contract; whether a data protection impact assessment should have been carried out; and international transfers if data left the UK. A breach usually reveals a problem that outlives the incident — name it.
8. OTHER OBLIGATIONS AND RECORD KEEPING. Flag anything else the facts trigger: the separate and stricter regime for communications service providers; sector regulators; contractual notification duties to customers; obligations under other regimes if affected individuals are outside the UK, including the EU GDPR where it applies in parallel; law enforcement reporting; and insurance notification. Then state the internal record requirement: every breach must be documented whether or not it is notified, recording the facts, the effects and the remedial action.

RULES
- Keep the two thresholds separate and answer both. Risk to individuals triggers the regulator; high risk triggers the individuals.
- Do not treat encryption as an automatic answer. Ask whether the protection actually held, where the keys were, and whether the algorithm and implementation were sound.
- The UK GDPR is a domestic instrument that has diverged from the EU GDPR. Do not import EU guidance or thresholds without saying so, and mark anything that turns on the current UK text [VERIFY].
- Where facts are unknown, treat the gap as a reason for urgency rather than delay, and notify within the deadline with what is known.
- Never recommend delaying notification to complete an investigation. Phased notification exists for exactly this situation.

OUTPUT FORMAT
Open with the bottom line, the notification deadline as a date and time, and whether individuals must be told. Then the sections above, with the two draft notifications as separate ready-to-use blocks.`,
    example: {
      scenario:
        'A misdirected email sends a spreadsheet of employee absence records, including sickness reasons, to an external distribution list.',
      result:
        'Confirmed as a confidentiality breach involving special category data, awareness fixed at the point the sender reported it rather than when the investigation concluded, regulator threshold met and notification drafted with two facts marked as not yet established, the high-risk threshold also met so individual communication required, and a separate finding that the absence data had been retained well beyond the stated retention period independently of the incident.',
    },
  },
  {
    id: 'uk-bribery-act-reviewer',
    name: 'Bribery Act Adequate Procedures Reviewer',
    description: 'Reviews an anti-bribery programme against the six principles that make up the adequate procedures defence.',
    jurisdiction: 'uk',
    category: 'compliance',
    tags: ['programme-design', 'assessment', 'bribery-act', 'anti-corruption', 'adequate-procedures', 'third-party-risk', 'compliance'],
    sources: [
      { citation: 'Bribery Act 2010', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the general offences, the offence of bribing a foreign public official, the corporate failure to prevent offence and its adequate procedures defence.' },
      { citation: 'Ministry of Justice guidance on procedures to prevent bribery', authority: 'guidance', publisher: 'Ministry of Justice', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'The statutory guidance setting out the six principles. Persuasive rather than binding, and adequacy is ultimately decided by a court.' },
      { citation: 'Deferred Prosecution Agreement Code of Practice', authority: 'regulator', publisher: 'Serious Fraud Office; Crown Prosecution Service', jurisdiction: 'uk', url: 'https://www.sfo.gov.uk', note: 'Relied on for the weight given to self-reporting, cooperation and the state of the compliance programme.' },
      { citation: 'Economic Crime and Corporate Transparency Act 2023', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relevant for the failure to prevent fraud offence and the reformed identification doctrine, which sit alongside the bribery regime and should be assessed together.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['energy-infrastructure', 'financial-services', 'professional-services'],
    relatedSkills: ['us-ofac-export-screener', 'global-obligation-extraction', 'us-antitrust-interaction-checker'],
    whatItDoes:
      'Tests an anti-bribery programme against the six principles that constitute the only defence to the corporate failure to prevent offence, which is a strict liability offence with no requirement that anyone senior knew. It works out first whether the organisation is caught at all, since the jurisdictional reach extends to foreign companies carrying on business in the UK, then identifies who counts as an associated person, and grades each principle against what the programme actually does rather than what the policy says — because the defence turns on operation, not documentation.',
    whenToUse:
      'When building or auditing an anti-bribery programme, before entering a market or sector with elevated risk, when onboarding intermediaries or agents, during transaction diligence, and immediately on any allegation or red flag.',
    inputs: [
      { name: 'Programme documents', description: 'Anti-bribery policy, procedures, code of conduct, and any gifts and hospitality rules.', required: true },
      { name: 'Business profile', description: 'Sectors, countries of operation, public sector interaction, and use of agents or intermediaries.', required: true },
      { name: 'Corporate structure', description: 'Entities, where they are incorporated, and whether any part of the group carries on business in the UK.', required: true },
      { name: 'Third-party population', description: 'Agents, distributors, consultants, joint venture partners and their remuneration models.' },
      { name: 'Controls in operation', description: 'Diligence performed, training delivered, approvals required, and monitoring actually carried out.' },
      { name: 'Incidents and red flags', description: 'Any allegation, audit finding, refused payment or unexplained expense.' },
    ],
    outputs: [
      { name: 'Jurisdictional analysis', description: 'Whether the organisation is caught by the corporate offence, and which entities are in scope.' },
      { name: 'Associated persons map', description: 'Who performs services for or on behalf of the organisation, and the risk each population presents.' },
      { name: 'Principle-by-principle grading', description: 'Each of the six principles rated with the evidence supporting the rating.' },
      { name: 'Risk assessment review', description: 'Whether the underlying risk assessment is documented, current and actually drives the controls.' },
      { name: 'Gap register', description: 'Each gap with its exposure, the fix, an owner and a priority.' },
      { name: 'Hospitality and facilitation position', description: 'Where the current rules sit against the law, which recognises no facilitation payment exception.' },
      { name: 'Incident response readiness', description: 'What happens on an allegation, including the self-reporting decision framework.' },
    ],
    prompt: `You are a UK anti-corruption lawyer reviewing an anti-bribery compliance programme against the adequate procedures defence.

INPUTS
- Programme documents: <anti-bribery policy, procedures, code of conduct, gifts and hospitality rules, third-party onboarding process>
- Business profile: <sectors, countries of operation, extent of public sector interaction, licences and permits required, use of agents or intermediaries>
- Corporate structure: <entities, places of incorporation, and whether any part of the group carries on a business or part of a business in the UK>
- Third parties: <agents, distributors, consultants, joint venture partners, their remuneration models, and how they were appointed>
- Controls in operation: <diligence actually performed, training actually delivered and to whom, approvals required, monitoring and audit actually carried out>
- Incidents: <any allegation, audit finding, refused payment, unexplained expense or red flag>

TASK
1. JURISDICTION AND SCOPE. Determine whether the corporate failure to prevent offence applies. It catches a relevant commercial organisation, which includes a body incorporated or a partnership formed in the UK wherever it carries on business, and also a body incorporated anywhere that carries on a business or part of a business in the UK. State which group entities are in scope and note that the offence then reaches bribery committed anywhere in the world by an associated person. Separately note the reach of the general offences and the foreign public official offence, and that individuals face liability independently of the company. Explain that the corporate offence is strict liability: it is committed where an associated person bribes intending to obtain or retain business or an advantage for the organisation, whether or not anyone senior knew, and that adequate procedures is the only defence.
2. ASSOCIATED PERSONS. Map who performs services for or on behalf of the organisation. This is deliberately broad and is determined by the substance of the relationship, not its label: employees are presumed to be associated persons, and it extends to agents, distributors in some structures, consultants, contractors, joint venture partners and subsidiaries depending on how they operate. Produce the population and rate the bribery risk each presents. Flag any population currently outside the programme's scope.
3. PRINCIPLE-BY-PRINCIPLE GRADING. Grade each of the six principles as adequate, partial or inadequate, stating the evidence for the grade and what would move it up. Assess what the organisation actually does, not what the policy says it does — the distinction is the whole point of the review.
   a. PROPORTIONATE PROCEDURES: are procedures proportionate to the risk faced and to the scale and complexity of the business? Are they clear, practical, accessible and enforced? Is there a real difference in treatment between high and low risk activities, or is the same process applied to everything?
   b. TOP-LEVEL COMMITMENT: is top-level management genuinely engaged, and is that visible to staff and to third parties? Look for evidence beyond a signed foreword — board time, decisions actually taken, business declined, and consequences applied to senior people.
   c. RISK ASSESSMENT: is there a documented, periodic and informed assessment of external and internal risk? External risk covers country, sectoral, transaction, business opportunity and business partnership risk. Internal risk covers deficient training, a bonus culture rewarding excessive risk taking, a lack of clarity on hospitality, a lack of a clear reporting route, and no disciplinary follow-through. Check that the assessment is current, that it names specific risks rather than generic ones, and above all that the controls actually trace back to it.
   d. DUE DILIGENCE: is proportionate and risk-based diligence applied to those who perform services for or on behalf of the organisation? Check that it is done before appointment rather than after, that it is refreshed, that findings are escalated and can result in refusal, and that the remuneration model of intermediaries is examined — success fees and commissions that are out of line with the service performed are the classic red flag.
   e. COMMUNICATION AND TRAINING: are the procedures communicated and understood, internally and externally? Is training targeted by role and risk rather than uniform, does it reach third parties where warranted, and is completion tracked and enforced? Is there a confidential reporting route that people know about and believe in?
   f. MONITORING AND REVIEW: are the procedures monitored, tested and improved? Look for audit, financial controls that would actually detect an improper payment, review triggered by incidents and by changes in the business, and evidence that findings led to change.
4. HOSPITALITY, GIFTS AND FACILITATION. Assess the current rules. Reasonable and proportionate hospitality is not prohibited, but state where the line sits and how to evidence intention, since the offence turns on intending to induce improper performance. Then address facilitation payments directly: the law contains no exception for them however small and however customary, which frequently differs from the position staff assume and from other regimes the organisation may follow. Check the rules cover the practical cases — public officials, travel and accommodation, charitable and political donations, and payments demanded under duress, where the safety exception is about immediate threat to life or limb and must be reported and recorded.
5. GAP REGISTER. List each gap with the exposure it creates, the specific fix, an owner and a priority. Rank by the contribution each makes to the adequate procedures defence, not by ease.
6. INCIDENT READINESS AND SELF-REPORTING. Set out what happens on an allegation: how it is escalated, how privilege is established over the investigation and how easily it can be lost, how evidence is preserved, and who decides. Then set out the self-reporting decision framework and the factors that weigh on whether a deferred prosecution agreement is available, including the timing and genuineness of the report, the extent of cooperation, and the state of the compliance programme at the time of the conduct and now. Be clear that this is a decision requiring specialist advice at the time and that the analysis here is a framework, not a recommendation to report or not.
7. ADJACENT OFFENCES. Note that the failure to prevent fraud offence and the reformed approach to attributing criminal liability to companies sit alongside this regime, that the control frameworks overlap substantially, and that a programme built only around bribery may leave the adjacent exposure unaddressed. Mark scope and commencement [VERIFY].

RULES
- Grade what operates, not what is written. A comprehensive policy that nobody applies makes the position worse, not better, because it evidences awareness of the risk.
- Adequacy is proportionate to risk. Do not recommend uniform controls across populations with different risk profiles, and do not treat a small organisation as needing what a large one needs.
- Never suggest a facilitation payment is permissible because it is small, customary or expected locally.
- The guidance is persuasive, not binding, and adequacy is ultimately decided by a court on the facts. Do not state that following the six principles guarantees the defence.
- Mark penalty levels, commencement dates and anything turning on the newer offences [VERIFY].

OUTPUT FORMAT
Open with the overall adequacy position and the three gaps that most weaken the defence. Then the sections above, with a grading table for the six principles and the gap register as a prioritised table with owners.`,
    example: {
      scenario:
        'A UK-listed engineering group bidding for public infrastructure work in higher-risk markets audits its anti-bribery programme through local agents.',
      result:
        'Corporate offence confirmed to apply across the group including two foreign subsidiaries, agents mapped as associated persons with four appointed before any diligence process existed, risk assessment graded inadequate because it was three years old and generic so no control traced back to a named risk, commission structures on two agents flagged as disproportionate to the service performed, and a gap register ranked by contribution to the defence rather than by ease of fix.',
    },
  },
  {
    id: 'uk-failure-to-prevent-fraud',
    name: 'Failure to Prevent Fraud Assessor',
    description: 'Tests whether the corporate fraud offence applies and grades the reasonable procedures defence.',
    jurisdiction: 'uk',
    category: 'compliance',
    tags: ['programme-design', 'assessment', 'failure-to-prevent', 'fraud', 'adequate-procedures', 'anti-corruption', 'third-party-risk'],
    sources: [
      { citation: 'Economic Crime and Corporate Transparency Act 2023', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Creates the failure to prevent fraud offence and its reasonable procedures defence, and reforms the identification doctrine for attributing criminal liability to bodies corporate. Commencement of individual provisions must be confirmed.' },
      { citation: 'Home Office guidance on procedures to prevent fraud', authority: 'guidance', publisher: 'Home Office', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'The statutory guidance setting out the reasonable procedures principles. Persuasive rather than binding; reasonableness is ultimately decided by a court on the facts.' },
      { citation: 'Fraud Act 2006 and Theft Act 1968', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the base fraud offences capable of triggering the corporate offence. The list of specified offences is closed and must be read from the current schedule.' },
      { citation: 'Deferred Prosecution Agreement Code of Practice', authority: 'regulator', publisher: 'Serious Fraud Office; Crown Prosecution Service', jurisdiction: 'uk', url: 'https://www.sfo.gov.uk', note: 'Relied on for the weight given to self-reporting, cooperation and the state of the compliance programme.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'professional-services', 'retail-consumer', 'technology'],
    relatedSkills: ['uk-bribery-act-reviewer', 'eu-whistleblowing-channel-checker', 'us-ofac-export-screener'],
    whatItDoes:
      'Tests an organisation against the corporate failure to prevent fraud offence, which differs from the bribery offence in two ways that change the analysis: the fraud must be intended to benefit the organisation or its clients rather than being committed against it, and only large organisations are caught. It works out whether the size threshold is met, maps who counts as an associated person, and grades the reasonable procedures defence on what actually operates. It also covers the reformed identification doctrine, which creates direct corporate liability with no defence at all.',
    whenToUse:
      'When building or auditing a fraud prevention programme, when the organisation crosses the size threshold, when onboarding agents or intermediaries who sell or raise money on your behalf, during transaction diligence, and immediately on any allegation or red flag.',
    inputs: [
      { name: 'Organisation profile', description: 'Turnover, balance sheet total and employee numbers, group structure, and UK nexus.', required: true },
      { name: 'Fraud risk profile', description: 'Where a fraud committed for the organisation could plausibly arise, by function and by product.', required: true },
      { name: 'Existing programme', description: 'Fraud policy, controls, training, and how it relates to any anti-bribery programme.', required: true },
      { name: 'Associated persons', description: 'Employees, agents, subsidiaries and anyone who performs services for or on behalf of the organisation.' },
      { name: 'Incentive structures', description: 'Sales targets, commissions, bonuses and the pressure points they create.' },
      { name: 'Detection and response', description: 'Reporting routes, monitoring, past incidents and what happened to them.' },
    ],
    outputs: [
      { name: 'Applicability analysis', description: 'Whether the size threshold and UK nexus are met, and which entities are in scope.' },
      { name: 'Base offence mapping', description: 'Which specified fraud offences are realistically in scope for this business.' },
      { name: 'Associated persons map', description: 'Who could commit a fraud intended to benefit the organisation, and the risk each population presents.' },
      { name: 'Risk assessment review', description: 'Whether the fraud risk assessment is documented, current and actually drives the controls.' },
      { name: 'Principle-by-principle grading', description: 'Each reasonable procedures principle rated against the evidence.' },
      { name: 'Identification doctrine exposure', description: 'Who counts as senior management, and the direct liability that carries no defence.' },
      { name: 'Gap register', description: 'Each gap with its exposure, the fix, an owner and a priority.' },
    ],
    prompt: `You are a UK corporate crime lawyer assessing an organisation against the failure to prevent fraud offence and the reformed identification doctrine.

INPUTS
- Organisation: <turnover, balance sheet total, employee numbers; group structure and whether thresholds are met at group or entity level; UK nexus>
- Business model: <what is sold, to whom, how revenue is recognised, how performance is reported, what is said to customers, investors, lenders and regulators>
- Fraud risk profile: <where a fraud committed FOR the organisation could plausibly arise — sales, bid and tender processes, financial reporting, investor and lender representations, invoicing, product claims, subsidy and grant applications>
- Existing programme: <fraud policy, controls, training, relationship to any anti-bribery programme, who owns it>
- Associated persons: <employees, agents, distributors, introducers, subsidiaries, contractors; who acts for or on behalf of the organisation>
- Incentives: <sales targets, commission structures, bonuses, earn-outs, and the pressure they create>
- Detection: <reporting routes, monitoring, audit, past incidents and what happened to them>

TASK
1. APPLICABILITY. Determine whether the organisation is caught. Unlike the bribery offence, this one applies only to large organisations, tested against turnover, balance sheet total and employee numbers, and the test is applied on a group basis where relevant. Mark the thresholds and the counting rules [VERIFY]. Identify which entities in the group are in scope. Then address the UK nexus: the offence can reach conduct where there is a relevant UK connection even for an organisation incorporated elsewhere, and a UK-incorporated organisation can be exposed to conduct occurring abroad. State the position for each entity. Where the organisation is below the threshold today, note that growth brings it into scope and that the programme should be built before the threshold is crossed.
2. THE CRITICAL DISTINCTION. State plainly how this offence differs from fraud committed against the organisation, because getting this backwards is the most common analytical error. The offence bites where an associated person commits a specified fraud intending to benefit the organisation, or to benefit a person to whom the associated person provides services on the organisation's behalf, such as its clients. Fraud committed against the organisation by its own staff is not this offence. The consequence is counter-intuitive and must be spelled out: the organisation is a victim in the second case and a defendant in the first, and existing anti-fraud controls are usually built entirely around the second. Assess whether the current programme has that orientation problem.
3. BASE OFFENCE MAPPING. The offence is triggered only by the specified underlying offences, which form a closed list. Work through those realistically in scope for this business, typically including fraud by false representation, fraud by failing to disclose information where there is a legal duty, fraud by abuse of position, obtaining services dishonestly, false statements by company directors, false accounting, fraudulent trading, and cheating the public revenue. For each, give a concrete scenario grounded in this business rather than an abstract description — what the misrepresentation would be, who would make it and to whom. Confirm the current list from the schedule and mark it [VERIFY].
4. ASSOCIATED PERSONS. Map who could commit such a fraud: employees, agents and subsidiaries, and anyone else who performs services for or on behalf of the organisation. Note that an employee of a subsidiary can expose the parent where the fraud was intended to benefit the parent. Produce the population with a fraud risk rating for each, focusing on those who make representations to third parties — sales, bid teams, finance and reporting, investor relations, and any intermediary selling or raising money on the organisation's behalf.
5. RISK ASSESSMENT. Test whether a fraud risk assessment exists that is documented, current, specific and actually connected to the controls. Distinguish it clearly from a bribery risk assessment and from an anti-fraud assessment oriented at losses to the organisation, since neither addresses this exposure. Check that it covers the opportunity, motive and rationalisation dimensions, that it examines incentive structures as a driver, and that each significant risk traces to a named control. A generic assessment that names no specific risk is graded inadequate.
6. PRINCIPLE-BY-PRINCIPLE GRADING. Grade each reasonable procedures principle as adequate, partial or inadequate, stating the evidence and what would move the grade. Assess what operates, not what is written:
   - TOP LEVEL COMMITMENT: is senior management genuinely engaged, is that visible, and is there evidence of business declined or revenue foregone because of it?
   - RISK ASSESSMENT: as above, and whether it is refreshed on a defined cycle and on trigger events.
   - PROPORTIONATE RISK-BASED PREVENTION PROCEDURES: are controls proportionate to the risk and differentiated between high and low risk activities? Do they address the specific points where a representation to a third party could be falsified?
   - DUE DILIGENCE: is risk-based diligence applied to those performing services for or on behalf of the organisation, before appointment and refreshed?
   - COMMUNICATION AND TRAINING: is training targeted by role and risk, and does it actually address fraud committed for the organisation rather than against it? Is there a confidential reporting route that people use and trust?
   - MONITORING AND REVIEW: is the programme tested, are findings acted on, and does anything independently verify that the controls operate?
7. INCENTIVES AND CULTURE. Examine the incentive structures directly, since they are the most common root cause and the one compliance programmes least often address. Identify targets, commissions, bonuses and earn-outs that could reward a false representation, whether any control breaks the link between the incentive and the representation, and whether anyone has ever been disciplined for how a target was met rather than for missing it. Note that a documented internal warning about pressure that was not acted on is among the most damaging facts available to a prosecutor.
8. IDENTIFICATION DOCTRINE. Address the separate and broader reform. Attribution of criminal liability to a body corporate now extends to conduct by senior management, meaning those who play a significant role in decision-making about a substantial part of the organisation's activities or in the actual managing or organising of them. Explain that this is a functional test rather than a question of job title, and that it applies across a wide range of economic crime offences with no reasonable procedures defence available — so unlike the failure to prevent offence, there is nothing to rely on after the fact. Identify who is likely to fall within senior management here, including at divisional and subsidiary level, and assess the controls, delegated authorities and oversight around those individuals.
9. DETECTION, INVESTIGATION AND SELF-REPORTING. Set out what happens on an allegation: escalation, preservation of evidence, how privilege is established over the investigation and how readily it is lost, and who decides. Then set out the self-reporting framework and the factors bearing on whether a deferred prosecution agreement is available, including the timing and genuineness of any report, the extent of cooperation, and the state of the programme both at the time of the conduct and now. Be clear that this decision requires specialist advice at the time and that the analysis here is a framework rather than a recommendation to report.
10. GAP REGISTER. List each gap with the exposure it creates, the specific fix, an owner and a priority, ranked by contribution to the defence rather than by ease. Where an anti-bribery programme already exists, identify what can be extended and what genuinely cannot — the associated persons mapping and diligence usually transfer, while the risk assessment, the training content and the controls around representations to third parties generally do not.

RULES
- Keep the direction of the fraud straight throughout. This offence concerns fraud intended to benefit the organisation, not fraud against it. Most existing controls address the wrong direction.
- Grade what operates, not what is documented. A comprehensive unused policy worsens the position by evidencing awareness of the risk.
- Do not assume an existing anti-bribery programme covers this. Identify precisely what transfers and what does not.
- Treat the identification doctrine as a separate exposure with no defence, and do not let the reasonable procedures analysis imply otherwise.
- The guidance is persuasive, not binding, and reasonableness is decided by a court on the facts. Do not state that following the principles guarantees the defence.
- Mark size thresholds, the schedule of specified offences, commencement and penalty levels [VERIFY].

OUTPUT FORMAT
Open with whether the offence applies, the overall adequacy position and the three gaps that most weaken the defence. Then the sections above, with a grading table for the principles and the gap register as a prioritised table with owners.`,
    example: {
      scenario:
        'A large software group with a commission-driven sales team and a network of resellers audits its fraud controls, having built its programme around preventing losses to the business.',
      result:
        'Size threshold met at group level with two subsidiaries in scope, the existing programme found to be oriented almost entirely at fraud against the organisation and therefore addressing the wrong exposure, resellers mapped as associated persons capable of making false performance representations to win deals, accelerator commissions identified as an unmitigated driver with no control linking incentive to the accuracy of statements made to customers, divisional heads assessed as likely senior management for the identification doctrine where no defence is available, and a gap register ranked by contribution to the defence.',
    },
  },
];
