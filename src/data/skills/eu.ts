import type { Skill } from '../../types/skill';

/**
 * European Union skills — EU-level instruments plus member-state implementation.
 */
export const euSkills: Skill[] = [
  {
    id: 'eu-ai-act-classifier',
    name: 'AI Act Classifier',
    description: 'Classifies an AI system under the EU AI Act risk tiers and maps the resulting obligations.',
    jurisdiction: 'eu',
    category: 'regulatory',
    tags: ['regulatory-change', 'assessment', 'ai-act', 'ai-governance', 'risk-classification', 'compliance', 'eu-regulation'],
    sources: [
      { citation: 'Regulation (EU) 2024/1689 (Artificial Intelligence Act)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Obligations phase in on staggered dates and implementing guidance continues to issue. Confirm the applicable date.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['technology'],
    relatedSkills: ['global-horizon-scanner', 'eu-dpia-ropa-builder'],
    whatItDoes:
      'Works through the AI Act analysis in the order that actually matters: first whether the system is in scope at all, then what role you play (provider, deployer, importer, distributor) — because the obligations differ enormously by role — then the risk tier, and only then the obligation set. It handles the general-purpose AI model questions separately, since those follow their own track, and flags the transparency duties that bite even for systems that are otherwise low-risk.',
    whenToUse:
      'Before launching or procuring an AI feature in the EU market, when building an AI system inventory, or when a customer\'s procurement questionnaire asks which risk tier your product falls into.',
    inputs: [
      { name: 'System description', description: 'What the AI system does, its intended purpose, and how outputs are used.', required: true },
      { name: 'Your role', description: 'Whether you develop, deploy, import or distribute the system — this drives the obligations.', required: true },
      { name: 'Deployment context', description: 'Sector, users, and whether decisions affect individuals\' rights, access or livelihood.', required: true },
      { name: 'Technical characteristics', description: 'Model type, training data, autonomy, and whether it is built on a general-purpose model.' },
      { name: 'Geographic scope', description: 'Where the system is placed on the market or where its output is used in the EU.' },
    ],
    outputs: [
      { name: 'Scope determination', description: 'Whether the system falls within the Act, and whether an exclusion applies.' },
      { name: 'Role analysis', description: 'Your role, and whether any action would convert you into a provider.' },
      { name: 'Risk classification', description: 'The tier, with the reasoning and the competing classification if it is arguable.' },
      { name: 'Obligation map', description: 'What you must do given the role and tier combination.' },
      { name: 'GPAI analysis', description: 'Separate treatment of general-purpose model obligations where relevant.' },
      { name: 'Evidence pack', description: 'The documentation to assemble to support the classification.' },
    ],
    prompt: `You are an EU technology lawyer classifying an AI system under the AI Act.

INPUTS
- System description: <what it does, intended purpose, how outputs are used, degree of human oversight>
- Our role: <we develop it / we use it / we import it / we distribute it / we resell it under our name>
- Deployment context: <sector, users, whether outputs affect individuals' rights, access to services, employment, education, credit or essential services>
- Technical characteristics: <model type, training data, autonomy, built on a general-purpose model?>
- Geographic scope: <placed on the EU market? output used in the EU? users located where?>

TASK
1. SCOPE: is this an AI system within the Act's definition, and is it in territorial scope? Consider the exclusions (for example purely personal non-professional use, and certain research and defence contexts) and say whether any applies. If it is out of scope, say so clearly and stop the tier analysis there — but still cover any residual transparency duties.
2. ROLE: confirm the role. Then check the conversion traps: putting your name or trade mark on a system, making a substantial modification to it, or changing its intended purpose can make a deployer into a provider with the full provider obligation set. Flag any planned activity that risks this.
3. RISK TIER: work through the tiers in order —
   - Prohibited practices: check these first; if one applies, nothing else matters.
   - High risk: consider both routes — the system being a safety component of a regulated product, and the system falling in a listed high-risk use area. Where a listed area is engaged, address the exemption for systems performing narrow procedural or preparatory tasks, and say whether it applies here.
   - Transparency-obligation systems: those interacting with people, generating synthetic content, or performing emotion recognition or biometric categorisation.
   - Minimal risk: everything else.
   State the tier, the reasoning, and — where the classification is genuinely arguable — the competing reading and what fact would settle it.
4. OBLIGATION MAP: given role x tier, list what must be done. Group into: risk management, data governance, technical documentation, record-keeping and logging, transparency and instructions for use, human oversight, accuracy and robustness, quality management, conformity assessment and registration, and post-market monitoring. For a deployer, the set is different and smaller — do not hand a deployer the provider list.
5. GPAI: if the system is or is built on a general-purpose AI model, address that separate track — including the additional duties that attach to models presenting systemic risk, and what a downstream builder must obtain from the upstream model provider.
6. TIMELINE: the Act's obligations phase in on different dates for different categories. Give the sequence and mark every date [VERIFY] — the phasing has been subject to amendment.
7. EVIDENCE PACK: the documentation to assemble to support this classification if a regulator or a customer asks.

RULES
- Do the prohibited-practices check first, always.
- Never state the tier as settled where the use case sits near a boundary. Say what fact would settle it.
- Distinguish clearly between provider and deployer obligations. Conflating them is the most common and most expensive error.
- Mark all dates and thresholds [VERIFY]; this regime is still being implemented and guidance continues to issue.

OUTPUT FORMAT
Seven sections matching the tasks above, opening with a one-paragraph bottom line.`,
    example: {
      scenario:
        'A recruitment platform adds a feature that ranks job applicants and sells it to EU employers.',
      result:
        'A provider-role finding, a high-risk classification via the employment use area with the narrow-procedural-task exemption analysed and rejected, a full provider obligation map, and a flag that each employer customer takes on its own deployer duties which the contract should address.',
    },
  },
  {
    id: 'eu-dpia-ropa-builder',
    name: 'DPIA & ROPA Builder',
    description: 'Builds a data protection impact assessment and processing record from a described activity.',
    jurisdiction: 'eu',
    category: 'privacy',
    tags: ['data-protection', 'drafting', 'gdpr', 'dpia', 'ropa', 'privacy', 'documentation'],
    sources: [
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu' },
      { citation: 'European Data Protection Board guidelines and recommendations', authority: 'guidance', publisher: 'European Data Protection Board', jurisdiction: 'eu', url: 'https://www.edpb.europa.eu', note: 'Persuasive, not binding. Identify where it exceeds the strict legal requirement.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['eu-transfer-impact-assessor', 'global-data-rights-request-handler'],
    whatItDoes:
      'Takes a description of a processing activity and produces both of the documents the GDPR expects to see: the Article 30 record of processing, and — where the activity clears the threshold — a full impact assessment. It first tests whether a DPIA is actually required rather than assuming one is, then works through necessity and proportionality, risks to individuals, and mitigations, ending with an honest view on whether the residual risk would require consultation with the supervisory authority.',
    whenToUse:
      'Before launching a new processing activity, when materially changing an existing one, when building or refreshing your processing register, or when a customer\'s security review asks for your DPIA.',
    inputs: [
      { name: 'Processing description', description: 'What data, about whom, for what purpose, by what means.', required: true },
      { name: 'Legal basis', description: 'The Article 6 basis, plus an Article 9 condition if special category data is involved.' },
      { name: 'Data flows', description: 'Sources, systems, recipients, processors and any transfers outside the EEA.' },
      { name: 'Retention', description: 'How long each category is kept and why.' },
      { name: 'Safeguards', description: 'Technical and organisational measures already in place.' },
    ],
    outputs: [
      { name: 'DPIA threshold test', description: 'Whether an assessment is required, against the recognised criteria.' },
      { name: 'ROPA entry', description: 'A complete Article 30 record, field by field.' },
      { name: 'Necessity and proportionality', description: 'Whether the purpose could be achieved in a less intrusive way.' },
      { name: 'Risk register', description: 'Risks to individuals, scored by likelihood and severity, from their perspective.' },
      { name: 'Mitigation plan', description: 'Measures, residual risk after each, and owners.' },
      { name: 'Consultation view', description: 'Whether residual high risk would require prior consultation.' },
    ],
    prompt: `You are a data protection officer preparing GDPR documentation for a processing activity.

INPUTS
- Processing activity: <what personal data, about whom, for what purpose, by what means, at what scale>
- Legal basis: <Article 6 basis; plus Article 9 condition if special category data; plus any Article 10 criminal-offence data>
- Data flows: <sources, systems, internal recipients, processors and sub-processors, transfers outside the EEA>
- Retention: <per category, with the justification>
- Existing safeguards: <encryption, access control, pseudonymisation, minimisation, training, contracts>
- Controller/processor role: <are we controller, joint controller, or processor?>

TASK
1. ROLE CHECK: are we controller, joint controller or processor for this activity? The answer changes which documents are required and what they must contain. Where it is a joint controllership, flag the arrangement that must be in place.
2. DPIA THRESHOLD TEST: is a DPIA required? Work through the recognised criteria — evaluation or scoring, automated decision-making with legal or similarly significant effect, systematic monitoring, special category or highly personal data, data processed on a large scale, matched or combined datasets, vulnerable data subjects (including children and employees), innovative use of technology, and processing that prevents data subjects exercising a right or using a service. State how many criteria are met and conclude REQUIRED / NOT REQUIRED / ADVISABLE, noting that supervisory authorities publish their own mandatory lists which must be checked [VERIFY].
3. ROPA ENTRY: produce a complete Article 30 record — controller and DPO contact details, purposes, categories of data subject, categories of personal data, categories of recipient, third-country transfers with the mechanism relied on, retention periods, and a general description of the security measures. Mark any field you cannot complete as [TO BE COMPLETED BY THE BUSINESS] rather than inventing content.
4. If a DPIA is required or advisable, produce it:
   a. Systematic description of the processing, including a data flow narrative.
   b. NECESSITY AND PROPORTIONALITY: is each data element necessary for the stated purpose? Could the purpose be achieved with less data, less identifiability, or shorter retention? Assess the lawful basis, and if relying on legitimate interests include the three-part balancing test.
   c. RISKS TO INDIVIDUALS: build a register scored on likelihood and severity. Assess risk to the data subject, not risk to the business — this is the single most common error in DPIAs. Cover illegitimate access, unwanted modification, disappearance of data, discrimination, loss of control, reputational harm, financial loss, and chilling effects.
   d. MITIGATIONS: for each risk, the measure, the residual risk after it, and the owner.
   e. RESIDUAL RISK: is any risk still high after mitigation? If so, say that prior consultation with the supervisory authority is likely required before processing begins.
5. GAPS: everything you could not assess from the information supplied, phrased as questions for the business.

RULES
- Never assume a lawful basis. If one was not supplied, say the analysis cannot be completed and name the candidates with their consequences.
- Score risks from the individual's point of view.
- Do not mark a risk mitigated by a measure that is merely planned. Distinguish in place from planned.
- Where transfers outside the EEA occur, flag that a transfer mechanism and a transfer impact assessment are separate requirements.
- Where children's data is involved, flag the heightened expectations and any age-assurance question.

OUTPUT FORMAT
Five sections matching the tasks above.`,
    example: {
      scenario:
        'A retailer plans to introduce a loyalty programme that profiles purchase history to target offers, including inferred dietary and health preferences.',
      result:
        'A DPIA marked required on four criteria, a completed ROPA entry, a finding that inferred health preferences engage Article 9 and need a distinct condition, and a residual-risk conclusion that the profiling can proceed only with an opt-out and a shortened retention period.',
    },
  },
  {
    id: 'eu-transfer-impact-assessor',
    name: 'Transfer Impact Assessor',
    description: 'Assesses a personal data transfer out of the EEA and documents the safeguards relied on.',
    jurisdiction: 'eu',
    category: 'privacy',
    tags: ['data-protection', 'assessment', 'gdpr', 'international-transfers', 'sccs', 'tia', 'chapter-v'],
    sources: [
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu' },
      { citation: 'European Data Protection Board guidelines and recommendations', authority: 'guidance', publisher: 'European Data Protection Board', jurisdiction: 'eu', url: 'https://www.edpb.europa.eu', note: 'Persuasive, not binding. Identify where it exceeds the strict legal requirement.' },
      { citation: 'Court of Justice of the European Union judgment in Case C-311/18 (Schrems II)', authority: 'primary', publisher: 'Court of Justice of the European Union', jurisdiction: 'eu', url: 'https://curia.europa.eu' },
      { citation: 'European Commission adequacy decisions and standard contractual clauses', authority: 'regulator', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Adequacy decisions are added, amended and annulled. Confirm current status.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['cross-transfer-mechanism-picker', 'eu-dpia-ropa-builder'],
    whatItDoes:
      'Works through the Chapter V analysis for a specific transfer: whether an adequacy decision covers it, and if not which transfer tool applies, followed by the assessment of whether the destination country\'s law actually undermines that tool in practice. It focuses on the part teams usually skip — the concrete assessment of government access powers and available redress in the destination, and the supplementary measures that would genuinely address the gap rather than a generic list appended to the file.',
    whenToUse:
      'Before onboarding a processor outside the EEA, when a sub-processor changes location, when adequacy status for a country changes, and on the periodic review cycle for existing transfers.',
    inputs: [
      { name: 'Transfer description', description: 'What data, from whom, to whom, and for what purpose.', required: true },
      { name: 'Destination country', description: 'Where the data goes, and where it is accessible from — including remote support.', required: true },
      { name: 'Importer details', description: 'The recipient, its sector, and whether it is subject to particular access regimes.' },
      { name: 'Transfer tool', description: 'Adequacy, standard contractual clauses, binding corporate rules, or a derogation.' },
      { name: 'Technical measures', description: 'Encryption, key management, pseudonymisation and access controls in place.' },
    ],
    outputs: [
      { name: 'Transfer map', description: 'Every leg of the transfer, including onward transfers and remote access.' },
      { name: 'Tool selection', description: 'Which Chapter V mechanism applies, and why the alternatives do not.' },
      { name: 'Destination law assessment', description: 'Government access powers and redress in the destination, applied to this transfer.' },
      { name: 'Supplementary measures', description: 'Specific technical, contractual and organisational measures that address the identified gap.' },
      { name: 'Conclusion', description: 'Whether the transfer can proceed, and on what conditions.' },
      { name: 'Review triggers', description: 'The events that require the assessment to be redone.' },
    ],
    prompt: `You are a data protection lawyer conducting a transfer impact assessment for a transfer of personal data out of the EEA.

INPUTS
- Transfer: <what personal data, whose, from which entity to which entity, for what purpose, at what volume and frequency>
- Destination country: <and every country from which the data can be accessed, including remote support and follow-the-sun operations>
- Importer: <entity, sector, size, whether it is an electronic communications provider or otherwise subject to specific access regimes>
- Transfer tool in mind: <adequacy / SCCs / BCRs / derogation / not decided>
- Technical measures: <encryption in transit and at rest, who holds the keys, pseudonymisation, access controls>
- Onward transfers: <any sub-processors and their locations>

TASK
1. TRANSFER MAP: identify every leg, including onward transfers, remote access from a third country, and any support or backup arrangement. Remote access from a third country is a transfer — check for it explicitly, because it is the leg most often missed.
2. TOOL SELECTION:
   a. Is there an adequacy decision covering the destination and this recipient? Some adequacy decisions are partial or framework-dependent — say so and mark [VERIFY].
   b. If not, which Article 46 tool applies, and is it correctly implemented (right module, right annexes, right parties)?
   c. If a derogation is being considered, address that derogations are for occasional and non-repetitive transfers and are generally unavailable for systematic ones. Say plainly if the intended use does not fit.
3. DESTINATION LAW ASSESSMENT: this is the part that must be specific to this transfer.
   - What government access powers exist in the destination that could reach this data, and are they limited to what is necessary and proportionate?
   - Is the importer within scope of those powers, given its sector and activities?
   - What redress is available to an EEA data subject in practice?
   - Is there any evidence of how these powers are used in practice for data of this type?
   Mark this whole section [REQUIRES LOCAL LEGAL INPUT] — a defensible assessment needs a source on the destination country's law, not a general impression. Say what specifically must be sourced.
4. SUPPLEMENTARY MEASURES: for the gap identified, what would actually address it?
   - Technical: strong encryption with keys held only in the EEA, pseudonymisation where the additional information stays in the EEA, split processing. Be honest about which measures work where the importer needs the data in the clear to perform the service — in that case most technical measures do not help.
   - Contractual: notification of access requests, transparency reporting, challenge obligations, audit rights.
   - Organisational: access governance, internal policies, minimisation of what is sent at all.
   Do not produce a generic list. For each measure say whether it addresses THIS risk.
5. CONCLUSION: can the transfer proceed? One of: PROCEED, PROCEED WITH THE MEASURES LISTED, or SUSPEND / DO NOT START. If measures are required, say which are conditions precedent.
6. DOCUMENTATION AND REVIEW: what to record, and the events that trigger a fresh assessment — a change in the destination's law, a change of sub-processor or location, an access request received, or the scheduled periodic review.

RULES
- Never state that a country has or lacks an adequacy decision as settled fact — adequacy decisions are added, amended and annulled. Mark [VERIFY].
- Do not conclude that a transfer is fine because "everyone does it". Assess it.
- Where the importer must access data in the clear, say so and do not claim encryption solves the problem.
- Flag if the transfer involves special category data, since that raises the severity of every identified risk.

OUTPUT FORMAT
Six sections matching the tasks above.`,
    example: {
      scenario:
        'A European SaaS company moves customer support ticketing to a vendor whose support team works from three countries outside the EEA.',
      result:
        'A transfer map that surfaces two unnoticed remote-access legs, an SCC module check that finds the wrong module in use, a destination-law section listing exactly what local input must be sourced, and a conclusion allowing the transfer only once access is restricted and the correct module is executed.',
    },
  },
  {
    id: 'eu-nis2-scope-tester',
    name: 'NIS2 Scope Tester',
    description: 'Tests whether an entity falls within NIS2 and maps its resulting security and reporting duties.',
    jurisdiction: 'eu',
    category: 'regulatory',
    tags: ['regulatory-change', 'assessment', 'nis2', 'cybersecurity', 'incident-reporting', 'critical-infrastructure', 'compliance'],
    sources: [
      { citation: 'Directive (EU) 2022/2555 (NIS2 Directive)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'A directive: the binding rules are in each member state\'s implementing law, and transposition differs.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['energy-infrastructure', 'technology'],
    relatedSkills: ['au-soci-obligations-mapper', 'eu-dora-third-party-reviewer'],
    whatItDoes:
      'Determines whether an organisation is in scope of the NIS2 Directive — by sector, by size, and by the special cases that pull entities in regardless of size — and whether it is essential or important, which changes the supervisory regime. It then maps the risk-management measures required, the multi-stage incident reporting timeline that catches teams out, and the management-body accountability that makes this a board issue rather than an IT one. Because NIS2 is a directive, it flags throughout that the binding detail lives in each member state\'s implementing law.',
    whenToUse:
      'When assessing whether NIS2 applies to your organisation or to a supplier, when a customer in a regulated sector starts pushing security obligations down the chain, or when building an incident response plan that has to meet the reporting clock.',
    inputs: [
      { name: 'Entity description', description: 'What the organisation does, its sector, and its services.', required: true },
      { name: 'Size data', description: 'Headcount, annual turnover and balance sheet total.', required: true },
      { name: 'Member states', description: 'Where the entity is established or provides services.', required: true },
      { name: 'Services provided', description: 'Especially any digital infrastructure, ICT service management or public-facing digital services.' },
      { name: 'Existing security posture', description: 'Certifications, frameworks and incident response capability already in place.' },
    ],
    outputs: [
      { name: 'Scope determination', description: 'In or out, with the sector and size analysis shown.' },
      { name: 'Entity classification', description: 'Essential or important, and what the difference means in supervision and penalties.' },
      { name: 'Jurisdiction analysis', description: 'Which member state supervises, and where registration is required.' },
      { name: 'Risk-management measures', description: 'The required measures mapped against your existing posture.' },
      { name: 'Reporting timeline', description: 'The early warning, notification and final report clock, as an operational runbook.' },
      { name: 'Governance duties', description: 'Management-body approval, oversight and training obligations.' },
    ],
    prompt: `You are an EU cybersecurity regulation specialist assessing NIS2 applicability. NIS2 is a directive: the binding rules are in each member state's implementing law, and those differ. Say so throughout.

INPUTS
- Entity: <what it does, sector, services provided, customers served>
- Size: <headcount, annual turnover, balance sheet total>
- Member states: <where established, where services are provided, where the main establishment sits>
- Digital services: <cloud, data centre, managed services, MSSP, DNS, TLD, marketplace, search, social platform>
- Existing posture: <ISO 27001, SOC 2, other certifications, incident response capability, supplier security programme>

TASK
1. SECTOR TEST: does the entity fall in a sector covered by NIS2, whether as a sector of high criticality or another critical sector? Name the sector and sub-sector, and quote the activity description you are matching against. If it sits near a boundary, give both readings.
2. SIZE TEST: apply the size-cap rule using the supplied figures. Show the arithmetic. Then check the SPECIAL CASES that bring an entity into scope regardless of size — including sole providers of a service essential to societal or economic activity, providers whose disruption could have significant systemic impact, certain public administration entities, and specific digital infrastructure providers. These exceptions catch small entities that assume they are out.
3. CLASSIFICATION: essential or important? Explain what turns on it — supervision is proactive for essential entities and reactive for important ones, and the penalty ceilings differ. Mark specific figures [VERIFY AGAINST THE LOCAL IMPLEMENTING LAW].
4. JURISDICTION: which member state has supervisory competence, applying the main-establishment rule and the special rules for certain digital providers. Note the registration obligation and where it must be filed. Where the entity operates in several member states, address the differences.
5. RISK-MANAGEMENT MEASURES: map the required measures — policies on risk analysis and information system security, incident handling, business continuity and crisis management, supply chain security, security in acquisition and development, effectiveness assessment, cyber hygiene and training, cryptography, human resources security and access control, and multi-factor or continuous authentication. For each, state what the entity already has from its existing posture and what the gap is. Be specific that an existing certification helps but does not automatically satisfy the obligation.
6. INCIDENT REPORTING RUNBOOK: build the multi-stage timeline as an operational procedure —
   - Early warning within 24 hours of becoming aware of a significant incident.
   - Incident notification within 72 hours, with an initial assessment.
   - Intermediate reports on request.
   - Final report within one month.
   For each stage: who decides, what must be in it, to whom it goes. Address the hardest question directly — what "becoming aware" means and who in the organisation is authorised to start the clock. Include the threshold for a significant incident and the duty to inform recipients of services where relevant. Mark timings [VERIFY] against the local implementing law.
7. GOVERNANCE: the management body's duty to approve the risk-management measures, oversee their implementation, and undergo training — plus the personal accountability that attaches. Say plainly that this makes NIS2 a board-level obligation.
8. SUPPLY CHAIN: how the obligations flow to suppliers, and what to put in supplier contracts.

RULES
- Repeat at the top and in the conclusion that the local implementing law governs, and that transposition differs by member state.
- Do not state penalty figures or exact thresholds as settled; mark [VERIFY].
- If the entity is out of scope, say so clearly — but check whether it is nonetheless in scope contractually, as a supplier to an in-scope entity.
- Distinguish carefully between the directive's requirements and general good security practice.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with a bottom-line scope answer.`,
    example: {
      scenario:
        'A 90-person managed IT services provider with clients in three member states wants to know whether NIS2 applies to it.',
      result:
        'In scope as a managed service provider, classified important on the size test, with a jurisdiction analysis pointing to a single main establishment, a gap map showing its ISO 27001 covers roughly two-thirds of the required measures, and a 24/72-hour reporting runbook naming who can start the clock.',
    },
  },
  {
    id: 'eu-dora-third-party-reviewer',
    name: 'DORA Third-Party Reviewer',
    description: 'Reviews an ICT provider contract against DORA requirements and flags critical-function issues.',
    jurisdiction: 'eu',
    category: 'regulatory',
    tags: ['financial-services', 'review', 'dora', 'third-party-risk', 'ict', 'outsourcing'],
    sources: [
      { citation: 'Regulation (EU) 2022/2554 (Digital Operational Resilience Act)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu' },
      { citation: 'Regulatory technical standards made under DORA', authority: 'regulator', jurisdiction: 'eu', note: 'The technical standards continue to develop. Confirm the current text.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services'],
    relatedSkills: ['eu-nis2-scope-tester', 'global-smart-redline'],
    whatItDoes:
      'Assesses an ICT third-party arrangement the way a financial entity must under DORA: first deciding whether the service supports a critical or important function, since that determines how demanding the contract must be, then testing the agreement clause by clause against the required contractual provisions, and finally addressing the register of information, exit strategy and concentration risk that examiners look for. It produces the missing clause language rather than a list of gaps.',
    whenToUse:
      'Before signing or renewing an ICT contract at a financial entity, when populating the register of information, or when a provider pushes back on DORA clauses and you need to know which of them you cannot concede.',
    inputs: [
      { name: 'Service description', description: 'What ICT service the provider supplies and which business processes rely on it.', required: true },
      { name: 'Contract', description: 'The current or proposed agreement.', required: true },
      { name: 'Entity type', description: 'The kind of financial entity you are — scope and proportionality depend on it.', required: true },
      { name: 'Criticality assessment', description: 'Whether the service supports a critical or important function, if already assessed.' },
      { name: 'Provider details', description: 'Location, sub-contractors, data locations, and whether the provider is designated critical.' },
    ],
    outputs: [
      { name: 'Criticality determination', description: 'Whether the function is critical or important, with the reasoning.' },
      { name: 'Contract gap analysis', description: 'Each required provision tested against the agreement, with the clause reference or a gap.' },
      { name: 'Proposed clauses', description: 'Drafted language for every gap found.' },
      { name: 'Register fields', description: 'The register-of-information entries this arrangement generates.' },
      { name: 'Exit strategy assessment', description: 'Whether a genuine exit is possible, and what is missing.' },
      { name: 'Concentration risk', description: 'Where this arrangement adds to an existing dependency.' },
    ],
    prompt: `You are a financial services lawyer reviewing an ICT third-party arrangement under DORA.

INPUTS
- ICT service: <what the provider supplies, which business processes depend on it, what happens if it fails>
- Contract: <paste the agreement>
- Our entity type: <bank, insurer, investment firm, payment institution, crypto-asset service provider, etc.>
- Criticality: <assessed as supporting a critical or important function? yes / no / not assessed>
- Provider: <name, location, group structure, sub-contractors and their locations, data locations, designated critical ICT third-party provider?>

TASK
1. CRITICALITY DETERMINATION: does this ICT service support a critical or important function? Assess by consequence of failure — impact on continuity of services, on regulatory obligations, on financial soundness, on customers, and on the entity's ability to meet its authorisation conditions. This determination sets the contractual bar, so state the reasoning explicitly and note that supervisors will test it.
2. CONTRACT GAP ANALYSIS. Test the agreement against the required contractual provisions and produce a table: | Requirement | Present? | Clause reference | Adequacy | Gap |
   Cover at minimum:
   - Clear and complete description of functions and services, and whether sub-contracting of a critical or important function is permitted and on what conditions
   - Locations where functions are provided and data is processed and stored, and notice of any change
   - Data availability, integrity, confidentiality and access provisions
   - Access, inspection and audit rights for the entity, its auditors and the competent authority — including unrestricted rights of access and full access to premises
   - Assistance at no additional cost, or at a cost determined ex ante, on an ICT incident
   - Obligation to cooperate fully with competent authorities
   - Termination rights and minimum notice periods, including the entity's right to terminate on specified grounds
   - Exit strategies: a mandatory transition period during which the provider continues to provide the service, and orderly transfer or return of data
   - Service level descriptions with precise quantitative and qualitative performance targets
   - Reporting obligations, incident notification, and participation in the entity's ICT security awareness and training programmes where relevant
   For arrangements supporting a critical or important function, the bar is higher on several of these — say which and how.
3. PROPOSED CLAUSES: draft insertable language for every gap. Complete clauses, not descriptions of clauses. Mark which are non-negotiable under DORA and which have room to move — the audit and access rights and the exit provisions are where providers push hardest and where concession is least available.
4. SUB-CONTRACTING CHAIN: identify sub-contractors supporting the critical or important function, whether the contract controls them adequately, and whether the entity has visibility down the chain.
5. REGISTER OF INFORMATION: list the fields this arrangement generates for the register, and flag any field you cannot populate from the information supplied.
6. EXIT STRATEGY: is a genuine, tested exit possible? Assess data portability and format, transition assistance, whether a substitutable provider exists, and the realistic time to migrate. State plainly if the arrangement creates a dependency that cannot practically be exited, since that is a finding in itself.
7. CONCENTRATION RISK: whether this arrangement adds to an existing dependency on the same provider, group, or underlying infrastructure.

RULES
- Do not treat a general outsourcing clause as satisfying a specific DORA requirement. Test each requirement individually.
- Where the contract is silent, say GAP — do not read a requirement into general language.
- Flag any provision that purports to limit audit or access rights; those are the ones supervisors examine first.
- Mark implementation detail and technical-standard requirements [VERIFY], since the regulatory technical standards continue to develop.

OUTPUT FORMAT
Seven sections matching the tasks above, opening with the criticality determination.`,
    example: {
      scenario:
        'A payment institution renews a cloud hosting contract that runs its core transaction processing.',
      result:
        'A critical-function determination, a gap table showing the provider\'s standard terms cap audit rights and omit a transition period entirely, drafted replacement clauses for both, and an exit assessment concluding that migration is realistically a nine-month project that must be documented as such.',
    },
  },
  {
    id: 'eu-member-state-delta',
    name: 'Member-State Delta Finder',
    description: 'Finds where member-state implementation of an EU instrument diverges from the baseline.',
    jurisdiction: 'eu',
    category: 'regulatory',
    tags: ['regulatory-change', 'research', 'member-state', 'implementation', 'gold-plating', 'divergence', 'multi-country'],
    sources: [
      { citation: 'EU regulations and directives, and national implementing measures', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'National implementation detail is exactly where confident answers go wrong. This skill targets local verification rather than replacing it.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['cross-four-regime-gap-analyzer', 'global-horizon-scanner'],
    whatItDoes:
      'Addresses the problem that reading an EU directive tells you what is roughly required, not what any particular country actually demands. It maps where an instrument leaves room for national choice — derogations, opening clauses, minimum-harmonisation headroom, and the areas where gold-plating is common — and builds a structured comparison across the member states you operate in, so you can see whether a single group-wide approach is possible or whether specific countries need their own treatment.',
    whenToUse:
      'When rolling out a policy or product across several member states, when a group-wide compliance programme has to work locally, or when scoping how much local counsel input a project genuinely needs.',
    inputs: [
      { name: 'EU instrument', description: 'The regulation or directive in question.', required: true },
      { name: 'Member states', description: 'The countries you operate in or plan to enter.', required: true },
      { name: 'Topic focus', description: 'The specific provisions that matter to you — the whole instrument is rarely the question.', required: true },
      { name: 'Business context', description: 'What you are trying to do, so divergence can be assessed for practical impact.' },
    ],
    outputs: [
      { name: 'Divergence map', description: 'Where the instrument permits national variation, and what kind.' },
      { name: 'Comparison grid', description: 'Member state by topic, with the known or likely local position and a confidence marker.' },
      { name: 'Common-denominator position', description: 'A single approach that would work across all the states in scope.' },
      { name: 'Country-specific exceptions', description: 'Where a group-wide approach cannot work, and what is needed instead.' },
      { name: 'Local counsel brief', description: 'The precise questions to send to local firms, so their time is spent well.' },
    ],
    prompt: `You are an EU regulatory lawyer mapping member-state divergence. Be rigorous about the limits of what you can state: national implementation detail is exactly where confident-sounding answers go wrong.

INPUTS
- EU instrument: <regulation or directive>
- Member states in scope: <list>
- Topic focus: <the specific provisions that matter to us>
- Business context: <what we are trying to do and why the divergence matters>

TASK
1. INSTRUMENT TYPE: is this a regulation (directly applicable, less room for divergence but often still containing opening clauses) or a directive (transposed into national law, divergence expected)? Explain what that means for how much local variation to expect.
2. DIVERGENCE MAP: for the topics in focus, identify every place the instrument permits national variation:
   - Express derogations and opening clauses
   - Minimum-harmonisation provisions where states may go further
   - Provisions left to national procedural law
   - Areas where enforcement, penalties and supervisory practice are set nationally
   - Areas where gold-plating is commonly reported
   For each, describe the range of positions a member state could take.
3. COMPARISON GRID: member state (rows) x topic (columns). Fill each cell with the local position and a confidence marker:
   [HIGH] I am confident of this
   [MEDIUM] believed to be the position — verify with local counsel
   [LOW] I have a general impression only
   [UNKNOWN] I do not know; this is a research task
   Use [UNKNOWN] freely. A grid of confident-looking but unverified answers is worse than an honest one.
4. COMMON-DENOMINATOR POSITION: the approach that would comply in every state in scope. State what it costs relative to the minimum, and be honest about whether one exists at all.
5. COUNTRY-SPECIFIC EXCEPTIONS: states where a group-wide approach cannot work, what makes them different, and what a local variant would need.
6. LOCAL COUNSEL BRIEF: for each state where you marked MEDIUM, LOW or UNKNOWN, write the precise questions to send local counsel. Good questions are specific and closed — "does the local implementing law require a works council consultation before deploying this system, and if so at what stage?" beats "how does this work in your country?". Group them so one instruction can cover several.
7. STABILITY WARNING: which parts of the picture are most likely to change, and what would trigger a refresh.

RULES
- Never state a national implementation detail as settled unless you are genuinely confident. The purpose of this analysis is to target verification, not to replace it.
- Distinguish clearly between what the EU instrument requires and what a member state has added.
- Where transposition is late, incomplete or subject to infringement proceedings, flag it.
- Structure the output so it can be handed to local counsel as-is.

OUTPUT FORMAT
Seven sections matching the tasks above.`,
    example: {
      scenario:
        'A group employer plans a single whistleblowing channel across six member states and wants to know whether one design can work everywhere.',
      result:
        'A divergence map identifying group-level channel sharing, anonymous reporting and feedback deadlines as the variable points, a grid with two states marked unknown, a common-denominator design, and a six-question brief ready to send to local counsel.',
    },
  },
];
