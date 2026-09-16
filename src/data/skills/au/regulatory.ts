import type { Skill } from '../../../types/skill';

/**
 * Australian regulatory and compliance skills — privacy, critical infrastructure, product governance and safety.
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
    relatedSkills: ['au-director-duties-checker', 'au-unfair-dismissal-assessor', 'au-soci-obligations-mapper'],
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
];
