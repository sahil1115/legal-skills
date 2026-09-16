import type { Skill } from '../../../types/skill';

/**
 * Australian regulatory and compliance skills — privacy, cyber, critical infrastructure, product governance, safety and corporate reporting.
 */
export const auRegulatorySkills: Skill[] = [
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
    id: 'au-whs-incident-assessor',
    name: 'WHS Incident & Officer Duties Assessor',
    description: 'Tests a workplace incident for notifiability and maps officer due diligence duties under the WHS laws.',
    jurisdiction: 'au',
    category: 'compliance',
    tags: ['workforce', 'incident-response', 'work-health-safety', 'notifiable-incident', 'officer-duties', 'due-diligence', 'psychosocial'],
    sources: [
      { citation: 'Model Work Health and Safety Act, as enacted in each State and Territory', authority: 'primary', publisher: 'State and Territory legislatures', jurisdiction: 'au', note: 'Harmonised in most jurisdictions but not uniform. Western Australia and Victoria differ materially, Victoria having never adopted the model law. The jurisdiction of the workplace governs.' },
      { citation: 'Model Work Health and Safety Regulations, as enacted', authority: 'primary', publisher: 'State and Territory legislatures', jurisdiction: 'au', note: 'Prescribe hazard-specific duties, including the psychosocial hazard provisions, which have been adopted on different timetables across jurisdictions.' },
      { citation: 'Safe Work Australia model codes of practice and guidance', authority: 'guidance', publisher: 'Safe Work Australia', jurisdiction: 'au', url: 'https://www.safeworkaustralia.gov.au', note: 'Codes of practice are admissible in proceedings and a court may rely on them as evidence of what is known about a hazard. Approval and status differ by jurisdiction.' },
      { citation: 'State and Territory industrial manslaughter provisions', authority: 'primary', publisher: 'State and Territory legislatures', jurisdiction: 'au', note: 'Enacted in most jurisdictions with different elements, thresholds and penalties. Personal exposure for officers is real and is not insurable in the way commercial penalties often are.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['energy-infrastructure', 'healthcare', 'retail-consumer', 'public-sector'],
    relatedSkills: ['au-director-duties-checker', 'au-unfair-dismissal-assessor', 'au-soci-obligations-mapper', 'au-whs-psychosocial-hazard-assessor'],
    whatItDoes:
      'Handles the two things that run on completely different clocks after a workplace incident: the immediate notification and site-preservation duties, which are criminal obligations measured in minutes, and the slower question of whether the duty holder and its officers can show they discharged their duties beforehand. It applies the notifiable incident definitions of the governing jurisdiction rather than a national rule, and treats psychosocial hazards as squarely within the duty rather than as an adjacent wellbeing matter.',
    whenToUse:
      'Immediately after any serious workplace injury, illness, near miss or dangerous incident, when a regulator attends or issues a notice, and as a standing review of officer due diligence before anything goes wrong.',
    inputs: [
      { name: 'The incident', description: 'What happened, when, where, to whom, and what injury or exposure resulted.', required: true },
      { name: 'Jurisdiction and workplace', description: 'The State or Territory, the site, and who controls it.', required: true },
      { name: 'Who was involved', description: 'Workers, contractors, labour hire, visitors or members of the public, and their engagement status.', required: true },
      { name: 'Response so far', description: 'What was done, whether the site was disturbed, and whether anyone has been notified.' },
      { name: 'Existing controls', description: 'Risk assessments, safe work procedures, training, maintenance and consultation records for this hazard.' },
      { name: 'Officer information', description: 'Who the officers are, what safety information reached them, and what resources they approved.' },
    ],
    outputs: [
      { name: 'Notifiability determination', description: 'Whether the incident is notifiable in the governing jurisdiction, against each limb of the definition.' },
      { name: 'Immediate obligations', description: 'Notification, site preservation and record-keeping duties, with who must do what and by when.' },
      { name: 'Duty holder map', description: 'Every person conducting a business or undertaking with a duty here, including overlapping and shared duties.' },
      { name: 'Control adequacy review', description: 'The hazard controls tested against the hierarchy of controls and the reasonably practicable standard.' },
      { name: 'Officer due diligence assessment', description: 'Each due diligence element assessed against the evidence that actually exists.' },
      { name: 'Regulator engagement plan', description: 'Powers of inspectors, notices, interviews, and how privilege and self-incrimination protections operate.' },
      { name: 'Remediation actions', description: 'Immediate and systemic fixes with owners and dates.' },
    ],
    prompt: `You are an Australian work health and safety lawyer responding to a workplace incident.

INPUTS
- The incident: <what happened, date and time, location, who was injured or exposed, the injury or illness, and what treatment was required>
- Jurisdiction: <State or Territory of the workplace; is the business operating across more than one?>
- Workplace: <site, who controls it, whether it is a shared or multi-employer workplace, principal contractor arrangements>
- Who was involved: <employees, contractors, subcontractors, labour hire, apprentices, volunteers, visitors, members of the public — and how each is engaged>
- Response so far: <what was done, whether anything was moved or cleaned up, whether the plant is still in place, who has been told>
- Existing controls: <risk assessment, safe work method statement, training records, maintenance records, consultation records, prior incidents or reports involving this hazard>
- Officers: <who they are, what safety information reached them and how, what resources they approved, what they were told about this hazard before>

TASK
1. JURISDICTION. Identify the governing Act before applying any definition. The model law is harmonised across most jurisdictions but is not uniform, Western Australia differs, and Victoria never adopted it and operates a separate regime with its own terminology and notification triggers. Name the applicable Act and regulator. If the business operates across jurisdictions, say that duties and definitions must be run separately for each site and do not assume the model position applies everywhere.
2. NOTIFIABILITY. Apply the notifiable incident definition of the governing jurisdiction, limb by limb, and show the reasoning on the facts:
   a. Death of a person.
   b. Serious injury or illness — work through the enumerated categories, which typically include immediate treatment as an in-patient in a hospital, immediate treatment for specified injuries such as amputation, serious head or eye injury, serious burn, degloving or scalping, spinal injury, loss of bodily function or serious laceration, and medical treatment within a set period of exposure to a substance. Mark the categories and periods [VERIFY].
   c. Dangerous incident — an incident exposing any person to a serious risk from an immediate or imminent exposure, including uncontrolled escape or spill, uncontrolled implosion explosion or fire, electric shock, falling objects, plant collapse, and similar. Emphasise that a dangerous incident is notifiable even where nobody was injured, which is the limb most often missed.
   Conclude NOTIFIABLE or NOT NOTIFIABLE. Where it is finely balanced, say that the safer course is to notify and explain why: failing to notify is an offence, while notifying an incident that turns out not to require it is not.
3. IMMEDIATE OBLIGATIONS. If notifiable, set out the duties as a clock:
   - Notify the regulator immediately after becoming aware, by the fastest means, and confirm in writing within the prescribed period. Mark it [VERIFY].
   - Preserve the site so far as is reasonably practicable until an inspector arrives or directs otherwise. Set out the narrow exceptions — assisting an injured person, removing a deceased person, making the site safe, and acts under police direction. State plainly that disturbing the site outside those exceptions is a separate offence, and if the site has already been disturbed, say what to record now about who did what and why.
   - Keep the record of the notifiable incident for the prescribed period.
   Also cover notification to insurers and to any principal contractor, and workers compensation reporting, which is a separate obligation on a different timeframe and does not satisfy the WHS duty.
4. DUTY HOLDER MAP. Identify every person conducting a business or undertaking with a duty in relation to this incident, and note that duties are concurrent and cannot be contracted out of or delegated away. Cover the primary duty to workers and to others affected, and the specific duties of a person with management or control of a workplace, of plant or structures, and of a designer, manufacturer, importer or supplier where relevant. Address the duty to consult, cooperate and coordinate with other duty holders, which is a distinct obligation and a common failure at shared sites. Note that worker is defined broadly and includes contractors, subcontractors, labour hire and volunteers, so an injured contractor is not outside the duty.
5. CONTROL ADEQUACY. Test what was in place against the reasonably practicable standard: the likelihood of the hazard occurring, the degree of harm, what the person knew or ought reasonably to have known about the hazard and about ways of eliminating or minimising it, the availability and suitability of those ways, and — only after weighing those — the cost, including whether it is grossly disproportionate to the risk. Apply the hierarchy of controls in order and identify where the response stopped short: administrative controls and personal protective equipment where elimination or engineering controls were available is the recurring finding. Check the consultation obligation with workers and health and safety representatives, and check whether prior reports, near misses or hazard reports had flagged this hazard and what was done about them. A documented prior warning that was not acted on is the most damaging single fact in this area.
6. PSYCHOSOCIAL HAZARDS. Where the incident involves psychological injury, bullying, harassment, occupational violence, fatigue or excessive workload, assess it under the psychosocial provisions rather than treating it as a wellbeing or human resources matter. These are WHS hazards subject to the same duty, the same hierarchy of controls and the same enforcement. Note that adoption timetables differ by jurisdiction and mark them [VERIFY], and address the overlap with sexual harassment duties, which carry a separate positive obligation.
7. OFFICER DUE DILIGENCE. Assess each element against evidence that actually exists rather than against intentions, because this duty is personal, is owed by each officer individually, and is not discharged by the organisation having done the right thing:
   - Acquiring and keeping up to date knowledge of work health and safety matters.
   - Gaining an understanding of the operations and of the hazards and risks associated with them.
   - Ensuring the business has and uses appropriate resources and processes to eliminate or minimise risks.
   - Ensuring the business has appropriate processes for receiving and considering information about incidents, hazards and risks, and for responding in a timely way.
   - Ensuring the business has and implements processes for complying with its duties.
   - Verifying the provision and use of those resources and processes.
   For each, state what evidence exists, what is missing, and what should be created going forward. Emphasise the verification element, which is the one most often absent — receiving a report is not verifying. Then identify the personal exposure, including the industrial manslaughter offence in the governing jurisdiction where the elements may be engaged, and mark elements and penalties [VERIFY].
8. REGULATOR ENGAGEMENT. Set out what to expect: inspector powers of entry, inspection, seizure and to require production of documents and answers; improvement, prohibition and non-disturbance notices and the response and appeal routes for each; and how interviews are conducted. Address legal professional privilege over any internal investigation and how easily it is lost, the limited protection against self-incrimination and the fact that it generally differs between individuals and bodies corporate, and the need to obtain advice before anyone gives an account. Recommend that any internal investigation be structured for privilege from the outset, and warn against creating an unprivileged root cause analysis that becomes the regulator's brief of evidence.
9. REMEDIATION. Separate the immediate fix from the systemic one. Give actions with owners and dates, covering the specific hazard, the control that failed, the process that allowed it, the consultation gap if any, and the officer-level reporting change needed. Note that steps taken after an incident do not undo the offence but are relevant to penalty and to the regulator's enforcement decision.

RULES
- Identify the governing jurisdiction first and apply its definitions. Never state a national notifiability rule; the model law is not uniform and Victoria is not a model jurisdiction.
- Deal with notification and site preservation before anything else. They are criminal obligations running immediately and cannot be deferred pending investigation.
- Where notifiability is finely balanced, advise notifying and explain the asymmetry of the risk.
- Treat psychosocial hazards as WHS hazards subject to the same duty. Do not route them to human resources.
- Assess officer due diligence on evidence, element by element. Do not infer diligence from seniority, good intentions or the absence of prior incidents.
- Never advise disturbing a site outside the statutory exceptions, or delaying notification to complete an internal inquiry.
- Flag privilege before any investigation begins, not after.

OUTPUT FORMAT
Open with the notifiability conclusion, the notification deadline as a time, and whether the site must be preserved. Then the sections above, with a duty holder table and a due diligence table showing evidence against each element, closing with dated remediation actions.`,
    example: {
      scenario:
        'A contractor receives an electric shock from unisolated plant at a shared site; the area was tidied before anyone considered the regulator, and a near-miss report on the same plant had been filed two months earlier.',
      result:
        'Governing State Act identified and the incident found notifiable as a dangerous incident regardless of injury severity, the site disturbance flagged as a probable separate offence with a contemporaneous record of who moved what directed immediately, concurrent duties mapped across the principal contractor and the contractor entity with the consultation duty unmet, the earlier near-miss report assessed as the most damaging fact against the reasonably practicable standard, officer due diligence failing on the verification element because incident reports reached officers but no verification process existed, and privilege structured over the investigation before it began.',
    },
  },
  {
    id: 'au-wgea-gender-pay-gap-reporting',
    name: 'WGEA Gender Pay Gap Reporting',
    description: 'Validates WGEA workforce data, calculations, targets and submission steps for the annual reporting cycle.',
    jurisdiction: 'au',
    category: 'compliance',
    tags: ['workforce', 'review', 'gender-pay-gap', 'annual-reporting', 'equal-pay', 'reporting'],
    sources: [
      { citation: 'Workplace Gender Equality Act 2012 (Cth), as amended', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Applies to relevant employers with 100 or more employees. Amendments require employers with 500 or more employees to select and progress gender equality targets, and redefine designated relevant employers as those directly employing 500 or more in Australia from 2026.' },
      { citation: 'Workplace Gender Equality Agency reporting guide, dates and gender equality standards', authority: 'regulator', publisher: 'Workplace Gender Equality Agency', jurisdiction: 'au', url: 'https://www.wgea.gov.au', note: 'Private sector lodgement for the 2025-26 program opened 1 April 2026; targets are selected in that cycle. Employer gender pay gaps were published on 3 March 2026. Confirmed as at 2026-09-16; check lodgement deadlines and any extensions on the WGEA site.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['eu-pay-transparency-gap-analysis', 'au-positive-duty-sexual-harassment-assessment', 'us-pay-transparency-multistate-checker'],
    whatItDoes:
      'Prepares an employer’s annual Workplace Gender Equality Agency report so the data is right before it is lodged and later published: it confirms which reporting obligations apply by headcount, validates the workforce and remuneration data against the Agency’s definitions, reproduces the gender pay gap calculations so unexpected results are explained before publication, checks the questionnaire answers and the gender equality standards for larger employers, handles the target selection now required of employers with 500 or more staff, and plans the publication response.',
    whenToUse:
      'Before each annual lodgement window, when payroll or HR systems change, when the employer crosses the 100 or 500 employee thresholds, when selecting gender equality targets, and before the Agency publishes employer gender pay gaps. Not for: EU pay transparency obligations (use the EU skill) or equal pay claims by individuals.',
    inputs: [
      { name: 'Workforce data', description: 'Employee records for the snapshot date with gender, occupation, manager category, employment status and location.', required: true },
      { name: 'Remuneration data', description: 'Base salary, allowances, overtime, bonuses and superannuation for the reporting period, annualised as required.', required: true },
      { name: 'Employer structure', description: 'Entities, direct employee counts and any corporate group reporting.', required: true },
      { name: 'Policies and actions', description: 'Policies and strategies relevant to the questionnaire and standards.' },
      { name: 'Prior reports', description: 'Last year’s submission and published gaps.' },
    ],
    outputs: [
      { name: 'Obligation map', description: 'Reporting obligations by entity and headcount band, including standards and targets.' },
      { name: 'Data validation report', description: 'Records failing the Agency definitions or internal consistency checks.' },
      { name: 'Pay gap reconciliation', description: 'Recalculated gaps with drivers of change from the prior year.' },
      { name: 'Targets plan', description: 'Target options, baseline and selection rationale for 500+ employers.' },
      { name: 'Submission checklist', description: 'Lodgement steps, sign-off and deadlines.' },
      { name: 'Publication plan', description: 'Explanation of results and any employer statement.' },
    ],
    prompt: `You are an Australian workplace compliance specialist preparing an employer's annual Workplace Gender Equality Agency report.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
- Reporting applies to relevant employers with 100 or more employees [CONFIRMED].
- From 2026, designated relevant employers are those directly employing 500 or more employees in Australia; they must meet the gender equality standards and select three gender equality targets, with private sector employers selecting targets in the 2025-26 reporting cycle [CONFIRMED, wgea.gov.au].
- The Agency published employer gender pay gaps on 3 March 2026 [CONFIRMED].
- Lodgement window and final deadline for the current cycle [VERIFY on the WGEA reporting dates page; the Agency has published both a 1 April to 31 May window and a later final lodgement date].

INPUTS
- Workforce data: <snapshot records: gender, occupation, manager category, status, location>
- Remuneration: <components for the period, annualised>
- Structure: <entities, direct employee counts, group reporting>
- Policies and actions: <relevant to questionnaire and standards>
- Prior reports: <last submission and published gaps>

TASK
1. SCOPE GATE. Determine which entities are relevant employers and which are designated relevant employers under the current definitions, counting direct employees as defined. Record the obligation set for each.
2. MISSING INFORMATION. Identify missing gender, occupation or remuneration fields. Missing data distorts published gaps.
3. DATA VALIDATION. Check records against the Agency's definitions: employment status categories, manager categories, occupation coding, annualisation of part-time and part-year remuneration, and inclusion of all remuneration components required. Flag outliers and inconsistencies.
4. PAY GAP RECONCILIATION. Recalculate the headline measures the Agency uses, such as average and median gaps on base and total remuneration [VERIFY current measures], and explain year-on-year movement by driver: workforce composition, bonus timing, promotions and pay review outcomes.
5. QUESTIONNAIRE AND STANDARDS. Check questionnaire answers are supported by evidence, and for designated relevant employers, test compliance with the gender equality standards.
6. TARGETS. For employers with 500 or more direct employees, set out the menu of targets, establish baselines from the data, assess which three are meaningful and achievable, and record the rationale.
7. SUBMISSION. Build the lodgement checklist, CEO or equivalent sign-off, and the requirement to share the report with employees and shareholders where applicable [VERIFY].
8. PUBLICATION PLAN. Prepare an explanation of results and any employer statement the Agency allows alongside published gaps, grounded in the drivers analysis.
9. LAWYER REVIEW TRIGGERS. Escalate: large unexplained gaps; potential equal pay issues; disputed employee counts at thresholds; and any non-compliance notice.

RULES
- Use the Agency's definitions, not internal HR categories.
- Label each item LAW, WGEA INSTRUMENT OR GUIDANCE, or BEST PRACTICE.
- Never adjust data to improve a published result; explain it instead.

OUTPUT FORMAT
Open with the obligation set, the lodgement deadline to verify, and any data issue that blocks lodgement. Then the sections above, with validation and reconciliation as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A professional services group with 620 direct employees prepares its first report as a designated relevant employer, with a total remuneration gap that widened after a partner bonus round.',
      result:
        'Designated relevant employer status confirmed for the operating entity, partners excluded or included according to the Agency’s definitions, annualisation errors fixed for part-time staff, the widened gap explained by bonus timing and senior composition, three targets selected with baselines, the lodgement deadline flagged for verification, and a published-results explanation drafted.',
    },
  },
  {
    id: 'au-modern-slavery-statement-builder',
    name: 'AU Modern Slavery Statement Builder',
    description: 'Builds the annual Australian modern slavery statement against the mandatory criteria and approval rules.',
    jurisdiction: 'au',
    category: 'compliance',
    tags: ['programme-design', 'drafting', 'modern-slavery', 'supply-chain', 'third-party-risk', 'annual-reporting'],
    sources: [
      { citation: 'Modern Slavery Act 2018 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Applies to reporting entities with consolidated revenue of at least A$100 million. Sets the mandatory criteria and principal governing body approval and signing requirements. Confirmed as at 2026-09-16.' },
      { citation: 'Commonwealth Modern Slavery Act guidance for reporting entities', authority: 'guidance', publisher: 'Attorney-General’s Department', jurisdiction: 'au', url: 'https://www.ag.gov.au' },
      { citation: 'Australian Government response to the statutory review of the Modern Slavery Act 2018', authority: 'secondary', publisher: 'Attorney-General’s Department', jurisdiction: 'au', url: 'https://www.ag.gov.au', note: 'December 2024 response agreeing in full, part or principle to most recommendations, including a lower A$50 million threshold and penalties. These are proposals; no amending legislation was found in force as at 2026-09-16.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'energy-infrastructure', 'financial-services'],
    relatedSkills: ['uk-modern-slavery-statement-builder', 'us-uflpa-supply-chain-traceability', 'au-director-duties-checker'],
    whatItDoes:
      'Runs the annual Australian modern slavery statement cycle against the mandatory criteria in the Act: identifying the reporting entity and any entities it owns or controls, describing structure, operations and supply chains, identifying modern slavery risks, describing actions taken including due diligence and remediation, assessing effectiveness, describing consultation with owned or controlled entities, and obtaining principal governing body approval and signature. It keeps the Act’s current requirements separate from reforms the government has agreed to but not legislated.',
    whenToUse:
      'At the start of each reporting cycle, when a group crosses the revenue threshold, when preparing a joint statement for several entities, and when the reform bill is introduced or enacted. Not for: UK section 54 statements (use the UK builder) or import detention under US forced labour law (use the UFLPA skill).',
    inputs: [
      { name: 'Entity profile', description: 'Consolidated revenue, reporting period, group structure and entities owned or controlled.', required: true },
      { name: 'Operations and supply chains', description: 'Operations, sectors, countries, supplier categories and spend.', required: true },
      { name: 'Actions and evidence', description: 'Policies, due diligence, audits, training, grievance mechanisms and remediation during the period.' },
      { name: 'Consultation record', description: 'How owned or controlled entities were consulted.' },
      { name: 'Prior statement', description: 'Last year’s statement and commitments.' },
    ],
    outputs: [
      { name: 'Reporting entity determination', description: 'Whether the entity must report, and whether a joint statement is used.' },
      { name: 'Mandatory criteria map', description: 'Each criterion with the content and evidence addressing it.' },
      { name: 'Risk identification', description: 'Operations and supply chain risks by sector, geography and relationship.' },
      { name: 'Actions and effectiveness record', description: 'Actions taken and how effectiveness was assessed.' },
      { name: 'Draft statement', description: 'Statement text addressing each mandatory criterion.' },
      { name: 'Approval and lodgement checklist', description: 'Board approval, signature and registry submission steps.' },
      { name: 'Reform watch', description: 'Agreed reforms not yet law, and what to prepare.' },
    ],
    prompt: `You are an Australian business and human rights lawyer preparing an annual modern slavery statement under the Modern Slavery Act 2018 (Cth).

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
Law in force:
- Reporting entities: consolidated revenue of at least A$100 million for the reporting period [CONFIRMED].
- The statement must address each mandatory criterion and be approved by the principal governing body and signed by a responsible member, then provided for the public register [CONFIRMED; VERIFY lodgement timing].
Agreed but not legislated:
- The December 2024 government response agreed, in whole, in part or in principle, to most statutory review recommendations, including a lower A$50 million threshold and penalties [CONFIRMED as policy]. No amending legislation found in force as at 2026-09-16 [VERIFY].

INPUTS
- Entity: <consolidated revenue, reporting period, group structure, owned or controlled entities>
- Operations and supply chains: <operations, sectors, countries, supplier categories, spend>
- Actions: <policies, due diligence, audits, training, grievance, remediation>
- Consultation: <how entities were consulted>
- Prior statement: <paste or "none">

TASK
1. SCOPE GATE. Test whether the entity is a reporting entity on consolidated revenue, and whether it is an Australian entity or carries on business in Australia [VERIFY test]. Identify whether a joint statement will cover several reporting entities. If below threshold, note voluntary reporting.
2. MISSING INFORMATION. Identify gaps in supply chain data, actions and evidence. Do not substitute generic language for missing evidence.
3. MANDATORY CRITERIA MAP. Address each: identify the reporting entity; describe its structure, operations and supply chains; describe the risks of modern slavery practices in its operations and supply chains and those of entities it owns or controls; describe actions taken to assess and address those risks, including due diligence and remediation; describe how it assesses the effectiveness of those actions; describe the process of consultation with entities it owns or controls; and include any other relevant information.
4. RISK IDENTIFICATION. Map risks by sector, geography, product and business model, and distinguish causing, contributing to and being directly linked to harm.
5. ACTIONS AND EFFECTIVENESS. Record actions and effectiveness measures, separating activity from outcome, and state plainly where effectiveness has not been measured.
6. DRAFT STATEMENT. Draft the statement addressing each criterion with specifics.
7. APPROVAL AND LODGEMENT. Checklist for principal governing body approval, signature by a responsible member, and submission to the register within the required period [VERIFY].
8. REFORM WATCH. List agreed reforms separately, labelled as not yet law, with preparatory steps such as due diligence systems that proposed penalties would target.
9. LAWYER REVIEW TRIGGERS. Escalate: identified cases of modern slavery; exposure to state-imposed forced labour; statements that could be misleading; joint statement governance; and enactment of reform legislation.

RULES
- Distinguish LAW, GOVERNMENT GUIDANCE and AGREED REFORM throughout.
- Never state that operations or supply chains are free of modern slavery.
- Address every mandatory criterion explicitly.

OUTPUT FORMAT
Open with the reporting entity conclusion and the lodgement date to verify. Then the sections above, with the criteria map and risk identification as tables and the draft statement as usable text. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'An Australian food manufacturer with A$180 million revenue and offshore packaging suppliers prepares its fifth statement, while the board asks what the proposed reforms would change.',
      result:
        'Reporting entity status confirmed, each mandatory criterion mapped with the consultation criterion found weak for two subsidiaries, packaging and seasonal labour hire identified as highest risk, effectiveness separated into activity and outcome measures, a draft statement avoiding any claim of a slavery-free supply chain, and a reform watch explaining the proposed lower threshold and penalties as not yet law.',
    },
  },
  {
    id: 'au-climate-disclosure-aasb-s2',
    name: 'AASB S2 Climate Disclosure Readiness',
    description: 'Determines the mandatory climate reporting group and assesses readiness against AASB S2 and assurance phasing.',
    jurisdiction: 'au',
    category: 'compliance',
    tags: ['regulatory-change', 'assessment', 'climate-disclosure', 'sustainability-reporting', 'corporations-act', 'assurance'],
    sources: [
      { citation: 'Corporations Act 2001 (Cth), Chapter 2M sustainability reporting provisions', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Requires entities meeting the size and other criteria to prepare a sustainability report with climate-related financial information, phased by group.' },
      { citation: 'AASB S2 Climate-related Disclosures', authority: 'regulator', publisher: 'Australian Accounting Standards Board', jurisdiction: 'au', url: 'https://aasb.gov.au', note: 'Group 1 applies for annual reporting periods beginning on or after 1 January 2025, Group 2 on or after 1 July 2026, and Group 3 on or after 1 July 2027. Confirmed as at 2026-09-16.' },
      { citation: 'ASIC Regulatory Guide 280 Sustainability reporting', authority: 'guidance', publisher: 'Australian Securities and Investments Commission', jurisdiction: 'au', url: 'https://asic.gov.au' },
      { citation: 'AUASB sustainability assurance standards and phasing', authority: 'regulator', publisher: 'Auditing and Assurance Standards Board', jurisdiction: 'au', url: 'https://www.auasb.gov.au', note: 'Phases limited and reasonable assurance over sustainability report content across the groups.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'energy-infrastructure', 'retail-consumer'],
    relatedSkills: ['eu-csrd-double-materiality-assessor', 'au-director-duties-checker', 'global-horizon-scanner'],
    whatItDoes:
      'Works out which mandatory climate reporting group an entity falls into and when its first reporting period starts, then assesses readiness against AASB S2 across governance, strategy including scenario analysis, risk management, and metrics and targets including scope 1, 2 and 3 emissions. It maps the assurance that applies to each disclosure in each year, flags where the modified liability arrangements do and do not apply, and produces a gap analysis and implementation plan aligned to the first report.',
    whenToUse:
      'When confirming reporting group and timing, when preparing the first sustainability report, before engaging an assurance provider, when entity size or NGER registration changes, and when directors need to understand what they will be signing. Not for: EU CSRD reporting (use the CSRD assessor) or greenwashing claims in marketing.',
    inputs: [
      { name: 'Entity profile', description: 'Consolidated revenue, gross assets, employees, financial year, and whether a registered corporation or asset owner.', required: true },
      { name: 'Emissions reporting status', description: 'Whether the entity or group is an NGER reporter and existing emissions data.', required: true },
      { name: 'Current climate work', description: 'Governance, risk registers, scenario analysis and any voluntary disclosures.' },
      { name: 'Data systems', description: 'Sources for scope 1, 2 and 3 data and their quality.' },
      { name: 'Assurance arrangements', description: 'Current auditor and any sustainability assurance engaged.' },
    ],
    outputs: [
      { name: 'Group determination', description: 'Reporting group, first reporting period and the criteria applied.' },
      { name: 'Readiness assessment', description: 'Each AASB S2 pillar rated with the evidence available.' },
      { name: 'Scenario analysis plan', description: 'Required scenarios and method for the first report.' },
      { name: 'Emissions gap analysis', description: 'Scope 1, 2 and 3 data availability and quality.' },
      { name: 'Assurance map', description: 'Assurance level applying to each disclosure by year.' },
      { name: 'Liability note', description: 'Where modified liability applies and where it does not.' },
      { name: 'Implementation plan', description: 'Workstreams, owners and dates to the first report.' },
    ],
    prompt: `You are an Australian corporate reporting lawyer assessing readiness for mandatory climate-related financial disclosure.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- Chapter 2M Corporations Act sustainability reporting, phased by group [CONFIRMED].
- AASB S2 first application: Group 1 for annual reporting periods beginning on or after 1 January 2025; Group 2 on or after 1 July 2026; Group 3 on or after 1 July 2027 [CONFIRMED, AASB].
- Group criteria (revenue, assets, employees, NGER registration, asset owners) [VERIFY against RG 280 and the Act].
- Assurance phasing under AUASB standards and the modified liability period [VERIFY].

INPUTS
- Entity: <revenue, gross assets, employees, financial year, registered corporation or asset owner>
- Emissions reporting: <NGER status, data>
- Current climate work: <governance, risks, scenarios, voluntary disclosures>
- Data systems: <scope 1, 2, 3 sources and quality>
- Assurance: <auditor, sustainability assurance>

TASK
1. SCOPE GATE. Confirm the entity must prepare a financial report under Chapter 2M, then apply the group criteria at the consolidated level and record the first reporting period start date. If below all group thresholds, stop and note voluntary options.
2. MISSING INFORMATION. Identify missing size data and emissions data. The group determination and scope 3 readiness depend on them.
3. GOVERNANCE. Assess board and management oversight of climate-related risks and opportunities, skills, and how climate is integrated into strategy and remuneration.
4. STRATEGY AND SCENARIO ANALYSIS. Assess identification of climate-related risks and opportunities, effects on business model and value chain, transition planning, and climate resilience using scenario analysis, including the scenarios the Act requires [VERIFY].
5. RISK MANAGEMENT. Assess processes to identify, assess, prioritise and monitor climate-related risks and their integration into enterprise risk management.
6. METRICS AND TARGETS. Assess scope 1, 2 and 3 emissions measurement, the timing relief for scope 3 in the first year [VERIFY], industry-based metrics, and targets.
7. ASSURANCE MAP. Map the level of assurance required for each disclosure in each reporting year under the phasing, and the readiness of evidence.
8. LIABILITY NOTE. Explain which statements fall within the modified liability arrangements for the initial period and which do not, and what directors should understand before signing [VERIFY scope and duration].
9. IMPLEMENTATION PLAN. Workstreams, owners and dates to the first report, sequenced by the assurance timeline.
10. LAWYER REVIEW TRIGGERS. Escalate: uncertain group classification; forward-looking statements outside modified liability; transition plan claims; scope 3 estimates; and director sign-off concerns.

RULES
- Determine group and first period before assessing readiness.
- Label each item CORPORATIONS ACT, AASB S2, ASIC GUIDANCE, AUASB STANDARD or BEST PRACTICE.
- Do not describe the modified liability period as broader immunity than the Act provides.

OUTPUT FORMAT
Open with the reporting group, first reporting period and first assurance requirement. Then the sections above, with readiness and assurance map as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A private logistics group with A$420 million revenue and NGER reporting obligations needs to know when it must first report and whether its data is ready.',
      result:
        'Group classification tested against the criteria with the group flagged for verification, the first reporting period start calculated, governance rated partly ready, scenario analysis not yet performed, scope 1 and 2 data strong from NGER but scope 3 largely absent with first-year relief noted for verification, an assurance map by year, and an implementation plan sequenced to the first assured disclosures.',
    },
  },
  {
    id: 'au-whs-psychosocial-hazard-assessor',
    name: 'WHS Psychosocial Hazard Assessor',
    description: 'Identifies psychosocial hazards and assesses controls under the applicable WHS or OHS jurisdiction.',
    jurisdiction: 'au',
    category: 'compliance',
    tags: ['workforce', 'assessment', 'work-health-safety', 'psychosocial', 'risk-assessment', 'due-diligence'],
    sources: [
      { citation: 'Model Work Health and Safety Regulations psychosocial risk provisions, as adopted in each jurisdiction', authority: 'primary', publisher: 'State and Territory legislatures', jurisdiction: 'au', note: 'Require PCBUs to manage psychosocial risks using the hierarchy of controls, with adoption on different dates across jurisdictions.' },
      { citation: 'Occupational Health and Safety (Psychological Health) Regulations 2025 (Vic)', authority: 'primary', publisher: 'Victorian Parliament', jurisdiction: 'au', note: 'Commenced 1 December 2025 with a supporting compliance code. Victoria has not adopted the model WHS laws. Confirmed as at 2026-09-16.' },
      { citation: 'Safe Work Australia model Code of Practice on managing psychosocial hazards at work', authority: 'guidance', publisher: 'Safe Work Australia', jurisdiction: 'au', url: 'https://www.safeworkaustralia.gov.au', note: 'Approved codes may be admissible as evidence of what is known about a hazard; status varies by jurisdiction.' },
      { citation: 'WorkSafe Victoria psychological health compliance code', authority: 'regulator', publisher: 'WorkSafe Victoria', jurisdiction: 'au', url: 'https://www.worksafe.vic.gov.au' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['au-whs-incident-assessor', 'au-positive-duty-sexual-harassment-assessment', 'au-right-to-disconnect-triage'],
    whatItDoes:
      'Runs a proactive psychosocial risk assessment under the WHS or OHS law of the jurisdiction where the work is done: identifying hazards such as job demands, low job control, poor support, poor organisational change management, inadequate reward and recognition, poor organisational justice, traumatic events, remote or isolated work, poor physical environment, violence and aggression, bullying, harassment including sexual harassment, and conflict or poor workplace relationships. It assesses the risk from their duration, frequency and severity and how they interact, tests existing controls against the hierarchy of controls, and produces a control register with consultation and review steps.',
    whenToUse:
      'As a standing risk assessment, when work design or structure changes, after complaints, surveys or claims point to psychological harm, when entering a new jurisdiction, and when a regulator requests the psychosocial risk assessment. Not for: responding to a specific notifiable incident (use the WHS incident assessor) or assessing compliance with the Sex Discrimination Act positive duty (use the positive duty assessment).',
    inputs: [
      { name: 'Jurisdiction and workplaces', description: 'The State or Territory for each workplace, and remote or hybrid work locations.', required: true },
      { name: 'Work design', description: 'Roles, workloads, hours, rostering, change programmes and reporting lines.', required: true },
      { name: 'Indicators', description: 'Surveys, complaints, turnover, absence, workers compensation claims and incident data.', required: true },
      { name: 'Existing controls', description: 'Policies, EAP, training, workload management and design controls.' },
      { name: 'Consultation record', description: 'How workers and health and safety representatives have been consulted.' },
    ],
    outputs: [
      { name: 'Jurisdiction map', description: 'The applicable law and regulator for each workplace.' },
      { name: 'Hazard register', description: 'Hazards identified by role, team and location.' },
      { name: 'Risk assessment', description: 'Risk rated on duration, frequency, severity and interaction.' },
      { name: 'Control evaluation', description: 'Existing controls tested against the hierarchy of controls.' },
      { name: 'Control plan', description: 'New and improved controls with owners and dates.' },
      { name: 'Consultation and review plan', description: 'Worker consultation steps and review triggers.' },
      { name: 'Officer reporting summary', description: 'What officers need to know to exercise due diligence.' },
    ],
    prompt: `You are an Australian work health and safety lawyer running a psychosocial risk assessment.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- Model WHS Regulations psychosocial provisions as adopted in the model jurisdictions, with adoption dates varying [VERIFY for the jurisdiction in issue].
- Victoria: Occupational Health and Safety (Psychological Health) Regulations 2025, commenced 1 December 2025, with a compliance code [CONFIRMED, WorkSafe Victoria]. Victoria is not a model WHS jurisdiction; use its terminology and duties.
Guidance:
- Safe Work Australia model Code of Practice on managing psychosocial hazards; approval status varies by jurisdiction [VERIFY].

INPUTS
- Jurisdiction and workplaces: <State or Territory per workplace, remote locations>
- Work design: <roles, workloads, hours, rosters, change, reporting lines>
- Indicators: <surveys, complaints, turnover, absence, claims, incidents>
- Existing controls: <policies, EAP, training, workload management, design>
- Consultation: <workers and HSRs consulted>

TASK
1. SCOPE GATE. Identify the governing law and regulator for each workplace. Where work is performed in several jurisdictions, run the assessment per jurisdiction and note differences in terminology and duties.
2. MISSING INFORMATION. Identify missing indicators and missing consultation. Consultation with workers is a duty in its own right and necessary for a credible assessment.
3. HAZARD IDENTIFICATION. Identify psychosocial hazards by role, team and location, including job demands, low control, poor support, poor change management, poor reward and recognition, poor organisational justice, traumatic events, remote or isolated work, poor physical environment, violence and aggression, bullying, harassment including sexual and gender-based harassment, and conflict.
4. RISK ASSESSMENT. Assess risk considering duration, frequency and severity of exposure, how hazards interact or combine, work design and systems, and the physical environment.
5. CONTROL EVALUATION. Test existing controls against the hierarchy: eliminate the hazard where reasonably practicable, then minimise through work design and engineering controls before relying on administrative controls. Treat reliance on an employee assistance programme or resilience training as a low-order control that does not address the hazard.
6. CONTROL PLAN. Propose controls addressing the source of each hazard, with owners and dates.
7. CONSULTATION AND REVIEW. Plan worker and HSR consultation and set review triggers: changes to work, new information about hazards, incidents, and control failures, plus any jurisdiction-specific requirements such as prevention plans [VERIFY].
8. OFFICER REPORTING. Summarise what officers need to know about hazards, controls and resourcing to discharge due diligence.
9. LAWYER REVIEW TRIGGERS. Escalate: serious or systemic harm indicators; bullying or harassment involving senior people; regulator notices; claims trends; and hazards that are also Sex Discrimination Act positive duty issues.

RULES
- Apply the law of each workplace's jurisdiction; never apply one national rule.
- Label each item WHS OR OHS LAW, REGULATION, CODE OF PRACTICE, REGULATOR GUIDANCE or BEST PRACTICE.
- Prefer controls that change work design over individual coping measures.

OUTPUT FORMAT
Open with the highest-rated hazards and the jurisdictions involved. Then the sections above, with the hazard register, risk assessment and control plan as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A contact centre operator with sites in Victoria and New South Wales sees rising stress claims after introducing call-handling targets and remote rostering.',
      result:
        'Victorian and NSW frameworks mapped separately, high job demands, low control and customer aggression identified as the highest-rated hazards and assessed as interacting, the existing EAP and resilience training assessed as low-order controls, a control plan redesigning targets and adding call-escalation rights, consultation with health and safety representatives planned, and an officer summary for due diligence.',
    },
  },
  {
    id: 'au-ransomware-payment-notification-triage',
    name: 'Ransomware Payment Reporting Triage',
    description: 'Determines Cyber Security Act ransomware payment reporting duties and prepares the 72-hour report.',
    jurisdiction: 'au',
    category: 'regulatory',
    tags: ['regulatory-change', 'incident-response', 'cybersecurity', 'ransomware', 'cyber-extortion', 'regulatory-notification'],
    sources: [
      { citation: 'Cyber Security Act 2024 (Cth), Part 3 (ransomware payment reporting)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Reporting commenced 30 May 2025. A reporting business entity must report within 72 hours of making a ransomware or cyber extortion payment, or becoming aware a payment was made on its behalf. Confirmed as at 2026-09-16.' },
      { citation: 'Cyber Security (Ransomware Payment Reporting) Rules 2025', authority: 'regulator', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Sets the A$3 million annual turnover threshold, with a pro-rata formula for part-year businesses, and required information.' },
      { citation: 'Department of Home Affairs and Australian Signals Directorate reporting guidance', authority: 'guidance', publisher: 'Department of Home Affairs; Australian Signals Directorate', jurisdiction: 'au', url: 'https://www.cyber.gov.au', note: 'Reports are made through the ASD reporting form. Implementation was phased; check current compliance posture.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['technology', 'healthcare', 'financial-services', 'energy-infrastructure'],
    relatedSkills: ['au-soci-obligations-mapper', 'au-privacy-ndb-assessor', 'eu-nis2-incident-reporting'],
    whatItDoes:
      'Works out whether a business that has paid, or had a payment made on its behalf, in response to ransomware or cyber extortion must report it under the Cyber Security Act, and if so builds the 72-hour report with the information required. It separates the payment report from the other obligations the same incident usually triggers — notifiable data breach assessment, critical infrastructure incident reporting, insurer notice, and sanctions and law enforcement considerations — so none is missed and none is mistaken for another.',
    whenToUse:
      'Immediately after any ransomware or cyber extortion payment is made or becomes known, and during incident planning so the reporting path is ready before a payment decision. Not for: deciding whether to pay, notifiable data breach assessment itself (use the NDB assessor), or critical infrastructure incident reporting (use the SOCI mapper).',
    inputs: [
      { name: 'Payment facts', description: 'Whether a payment was made, when, by whom, amount, form and to whom.', required: true },
      { name: 'Entity profile', description: 'Annual turnover for the last financial year or part-year, and whether a responsible entity for critical infrastructure.', required: true },
      { name: 'Incident facts', description: 'The attack, systems affected, data involved, demands and communications with the extortionist.', required: true },
      { name: 'Third parties', description: 'Incident responders, negotiators, insurers or others who made or facilitated payment.' },
      { name: 'Other notifications', description: 'Notices already made to regulators, law enforcement or insurers.' },
    ],
    outputs: [
      { name: 'Reporting obligation determination', description: 'Whether the entity is a reporting business entity and a report is required.' },
      { name: 'Clock', description: 'The 72-hour deadline calculated from payment or awareness.' },
      { name: 'Report content draft', description: 'The information required, with gaps marked.' },
      { name: 'Parallel obligations map', description: 'NDB, SOCI, sector, insurer, sanctions and law enforcement steps.' },
      { name: 'Record of decisions', description: 'A contemporaneous log of facts and reporting decisions.' },
      { name: 'Lawyer review list', description: 'Sanctions exposure, privilege and legal limits on use of the report.' },
    ],
    prompt: `You are an Australian cyber and regulatory lawyer triaging ransomware payment reporting under the Cyber Security Act 2024.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- Mandatory ransomware and cyber extortion payment reporting commenced 30 May 2025 [CONFIRMED, Home Affairs and cyber.gov.au].
- Reporting business entities include businesses with annual turnover of A$3 million or more in the previous financial year, with a pro-rata formula for part-year businesses [CONFIRMED]; responsible entities for critical infrastructure assets are also captured [VERIFY scope].
- Report within 72 hours of making the payment or becoming aware that a payment was made on the entity's behalf, using the ASD reporting form [CONFIRMED].
- Limits on how reported information may be used and disclosed [VERIFY].

INPUTS
- Payment: <made or not, when, by whom, amount, form, recipient>
- Entity: <turnover last financial year or part-year, critical infrastructure status>
- Incident: <attack, systems, data, demands, communications>
- Third parties: <responders, negotiators, insurers who paid or facilitated>
- Other notices: <already made>

TASK
1. SCOPE GATE. Confirm a ransomware or cyber extortion payment was made by or on behalf of the entity in connection with a cyber security incident. A demand without payment does not trigger this report, though voluntary reporting may be encouraged.
2. REPORTING BUSINESS ENTITY. Apply the turnover threshold, showing the pro-rata calculation for part-year businesses, and check critical infrastructure responsible entity status. Record the conclusion.
3. CLOCK. Fix the time of payment or of becoming aware of a payment made on the entity's behalf, and calculate the 72-hour deadline. Where a negotiator or insurer paid, identify when the entity became aware.
4. MISSING INFORMATION. List required details not yet known and prepare to report within the deadline with what is known.
5. REPORT CONTENT. Draft the information required under the Rules, typically including entity details, incident details and impact, the demand, the payment amount and method, and communications with the extortionist [VERIFY field list].
6. PARALLEL OBLIGATIONS. Map separately: notifiable data breach assessment under the Privacy Act; critical infrastructure incident reporting; sector regulator notifications; insurer notice; law enforcement reporting; and sanctions considerations, since a payment to a sanctioned person may be an offence regardless of reporting.
7. RECORD OF DECISIONS. Keep a log of facts, times, decisions and who made them.
8. LAWYER REVIEW TRIGGERS. Escalate: any sanctions nexus; payments made without board authority; privilege over forensic work; conflicting obligations across regimes; and any regulator follow-up.

RULES
- The payment report does not satisfy any other obligation, and none of them satisfies it.
- Label each item ACT, RULES, GOVERNMENT GUIDANCE or BEST PRACTICE.
- Do not advise on whether to pay.
- Never delay the report beyond 72 hours to complete an investigation.

OUTPUT FORMAT
Open with whether a report is required and the deadline as a date and time. Then the sections above, with the parallel obligations map as a table and the report content as a usable draft. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A healthcare provider’s insurer-appointed negotiator paid a ransom on a Friday evening and told the provider on Saturday morning; patient records were exfiltrated.',
      result:
        'Reporting business entity status confirmed on turnover, the 72-hour clock fixed from Saturday morning awareness rather than the Friday payment with the reasoning recorded, a report drafted with open fields marked, a parallel notifiable data breach assessment flagged as likely eligible given health information, insurer and law enforcement steps mapped, and a sanctions check on the recipient escalated before anything else.',
    },
  },
];
