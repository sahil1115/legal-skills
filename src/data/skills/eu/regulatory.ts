import type { Skill } from '../../../types/skill';

/**
 * EU regulatory skills — AI, cybersecurity, platforms, operational resilience and member-state divergence.
 */
export const euRegulatorySkills: Skill[] = [
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
    relatedSkills: ['global-horizon-scanner', 'eu-dpia-ropa-builder', 'eu-ai-act-annex-iv-technical-documentation'],
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
    relatedSkills: ['au-soci-obligations-mapper', 'eu-dora-third-party-reviewer', 'eu-nis2-incident-reporting', 'eu-nis2-supply-chain-vendor-risk'],
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
  {
    id: 'eu-nis2-incident-reporting',
    name: 'NIS2 Incident Reporting Workflow',
    description: 'Runs a live NIS2 incident through the significance test, national routing and each reporting stage.',
    jurisdiction: 'eu',
    category: 'regulatory',
    tags: ['regulatory-change', 'incident-response', 'nis2', 'cybersecurity', 'csirt', 'transposition'],
    sources: [
      { citation: 'Directive (EU) 2022/2555 (NIS2), Article 23', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Early warning within 24 hours of becoming aware of a significant incident, an incident notification within 72 hours, intermediate reports on request, and a final report within one month of the notification. Confirmed as at 2026-09-16. The operative obligations are national.' },
      { citation: 'Commission Implementing Regulation (EU) 2024/2690', authority: 'regulator', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Specifies when an incident is significant for certain digital infrastructure, ICT service management and digital provider entities, including cloud, data centre, DNS and managed service providers.' },
      { citation: 'National measures transposing NIS2 and competent authority or CSIRT reporting procedures', authority: 'primary', publisher: 'Member State legislatures and authorities', jurisdiction: 'eu', note: 'Reporting portals, recipient bodies, templates and some thresholds are national. Transposition status varies by Member State.' },
      { citation: 'ENISA guidance on NIS2 implementation', authority: 'guidance', publisher: 'European Union Agency for Cybersecurity', jurisdiction: 'eu', url: 'https://www.enisa.europa.eu' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['energy-infrastructure', 'technology', 'healthcare', 'public-sector'],
    relatedSkills: ['eu-nis2-scope-tester', 'eu-gdpr-breach-notification', 'au-soci-obligations-mapper'],
    whatItDoes:
      'Runs a live cybersecurity incident at an essential or important entity through the NIS2 reporting process on its actual clock. It applies the significance test — including the specific criteria for digital infrastructure and ICT service entities — identifies the competent authority or CSIRT in each relevant Member State, drafts the early warning, incident notification and final report with the content each stage requires, handles recipient notification where services are affected, and keeps an evidence log recording when awareness occurred and why each reporting decision was taken.',
    whenToUse:
      'From the moment a cyber incident affecting the services of an entity in NIS2 scope is detected, at each reporting stage, and when an incident spans several Member States. Not for: deciding whether the entity is in NIS2 scope at all (use the scope tester), personal data breach notification (use the GDPR breach skill), or DORA reporting for financial entities.',
    inputs: [
      { name: 'Incident facts', description: 'What happened, detection time, systems and services affected, and current status.', required: true },
      { name: 'Entity profile', description: 'Sector, essential or important classification, and Member States where services are provided.', required: true },
      { name: 'Impact data', description: 'Service disruption, users affected, duration, financial loss and cross-border effects.', required: true },
      { name: 'Cause indicators', description: 'Whether malicious or unlawful action is suspected, and threat intelligence.' },
      { name: 'Prior reports', description: 'Any early warning or notification already sent and feedback received.' },
    ],
    outputs: [
      { name: 'Significance determination', description: 'Whether the incident is significant, with the criteria applied.' },
      { name: 'Routing map', description: 'The competent authority or CSIRT and portal in each relevant Member State.' },
      { name: 'Reporting clock', description: 'Awareness time and each stage deadline.' },
      { name: 'Draft reports', description: 'Early warning, incident notification and final report drafts.' },
      { name: 'Recipient communications', description: 'Notices to service recipients where required.' },
      { name: 'Evidence log', description: 'A contemporaneous record of facts, decisions and timings.' },
    ],
    prompt: `You are an EU cybersecurity regulatory lawyer running NIS2 incident reporting for an essential or important entity.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force (directive level):
- Article 23: early warning within 24 hours of becoming aware of a significant incident; incident notification within 72 hours of becoming aware; intermediate reports on request; final report within one month after the incident notification. The CSIRT or authority provides initial feedback within 24 hours where possible [CONFIRMED].
- Implementing Regulation (EU) 2024/2690 sets significance criteria for certain digital infrastructure and ICT service entities [CONFIRMED].
National:
- The binding obligations, recipients, portals and templates are in each Member State's transposing law. Transposition status varies [VERIFY per Member State].

INPUTS
- Incident: <what happened, detection time, systems and services affected, status>
- Entity: <sector, essential or important, Member States where services are provided>
- Impact: <disruption, users affected, duration, financial loss, cross-border effects>
- Cause: <suspected malicious or unlawful action, threat intelligence>
- Prior reports: <what has been sent and feedback received>

TASK
1. SCOPE GATE. Confirm the entity has been assessed as essential or important. If not, stop and redirect to the scope tester. If the entity is a financial entity under DORA, note that DORA incident reporting applies instead for ICT incidents [VERIFY lex specialis position].
2. AWARENESS AND CLOCK. Fix when the entity became aware of a significant incident, recording who knew what and when, and calculate each deadline from that point. Record that uncertainty about significance should not delay the early warning where indicators are present.
3. SIGNIFICANCE. Apply the test: the incident has caused or is capable of causing severe operational disruption of services or financial loss to the entity, or has affected or is capable of affecting other persons by causing considerable material or non-material damage. For entities covered by Implementing Regulation (EU) 2024/2690, apply its specific criteria. Record each criterion as met, not met or unknown.
4. ROUTING MAP. For each Member State where the entity is established or provides the affected services, identify the competent authority or CSIRT, the portal and any national template [VERIFY]. Note the rules on which Member State has jurisdiction.
5. EARLY WARNING. Draft it: whether the incident is suspected of being caused by unlawful or malicious acts and whether it could have a cross-border impact. Keep it short; it is not a full analysis.
6. INCIDENT NOTIFICATION. Draft it: update the early warning, give an initial assessment of severity and impact, and indicators of compromise where available.
7. INTERMEDIATE AND FINAL REPORTS. Plan intermediate reports on request. Draft the final report structure: detailed description, severity and impact, type of threat or root cause likely to have triggered the incident, mitigation measures applied and ongoing, and cross-border impact. If the incident is ongoing at one month, provide a progress report then and a final report within one month of handling it [VERIFY].
8. RECIPIENTS. Where appropriate and required, notify recipients of services of significant incidents likely to affect their service, and communicate measures they can take in response to significant cyber threats.
9. PARALLEL REGIMES. Flag GDPR breach notification, sector rules, contractual notices and law enforcement. These run on separate clocks.
10. EVIDENCE LOG. Maintain a log of facts, decisions, timings, recipients and sources for every report.
11. LAWYER REVIEW TRIGGERS. Escalate: disputed significance; multi-country incidents; suspected state-sponsored activity; ransomware payment decisions; personal data involvement; and any public statement.

RULES
- The national transposing law is operative. Use the directive for structure and the national law for detail.
- Label each item DIRECTIVE, IMPLEMENTING REGULATION, NATIONAL LAW, AUTHORITY GUIDANCE or BEST PRACTICE.
- Do not delay the early warning to finish significance analysis where indicators of significance are present.
- Never treat a GDPR notification as satisfying NIS2, or the reverse.

OUTPUT FORMAT
Open with the significance conclusion, the next reporting deadline as a date and time, and the recipient authority. Then the sections above, with the routing map and evidence log as tables and the reports as usable drafts. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A managed service provider operating in three Member States detects ransomware that has disrupted client environments for six hours.',
      result:
        'Entity confirmed in scope and covered by the Implementing Regulation criteria, significance assessed as met on service disruption and client impact, awareness fixed at the time the security team confirmed encryption with the 24-hour and 72-hour deadlines calculated, the competent CSIRT identified for the main establishment with national portals marked for verification, an early warning drafted flagging suspected malicious action and cross-border impact, client notifications prepared, and GDPR breach analysis flagged in parallel.',
    },
  },
  {
    id: 'eu-nis2-supply-chain-vendor-risk',
    name: 'NIS2 Supplier Security Assessor',
    description: 'Tiers suppliers by criticality and assesses their security obligations, contracts and evidence under NIS2.',
    jurisdiction: 'eu',
    category: 'regulatory',
    tags: ['regulatory-change', 'assessment', 'nis2', 'third-party-risk', 'cybersecurity', 'supplier-management'],
    sources: [
      { citation: 'Directive (EU) 2022/2555 (NIS2), Article 21', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Requires cybersecurity risk-management measures including supply chain security and security-related aspects of relationships with direct suppliers and service providers, taking into account supplier vulnerabilities, product quality and secure development practices.' },
      { citation: 'Commission Implementing Regulation (EU) 2024/2690, Annex', authority: 'regulator', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Sets detailed supply chain security requirements for the digital infrastructure and ICT service entities it covers.' },
      { citation: 'National transposing measures and competent authority guidance', authority: 'primary', publisher: 'Member State legislatures and authorities', jurisdiction: 'eu', note: 'The operative detail for most entities. Some Member States specify supplier requirements further.' },
      { citation: 'ENISA technical implementation guidance on cybersecurity risk-management measures', authority: 'guidance', publisher: 'European Union Agency for Cybersecurity', jurisdiction: 'eu', url: 'https://www.enisa.europa.eu' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['energy-infrastructure', 'technology', 'healthcare', 'public-sector'],
    relatedSkills: ['eu-nis2-scope-tester', 'eu-dora-third-party-reviewer', 'eu-gdpr-art28-dpa-auditor'],
    whatItDoes:
      'Builds the supplier security workflow an entity in NIS2 scope needs: tiering direct suppliers and service providers by how critical they are to the entity’s services, setting the security obligations each tier must meet, reviewing contracts for the terms that make those obligations enforceable, collecting evidence rather than assurances, and scheduling reassessment. It distinguishes what the directive and, where applicable, the Implementing Regulation require from what is good practice, and treats national transposition as the operative detail.',
    whenToUse:
      'When building or auditing a NIS2 supply chain security programme, onboarding a supplier that touches critical services, renewing supplier contracts, after a supplier security incident, and on the periodic reassessment cycle. Not for: DORA ICT third-party risk for financial entities (use the DORA reviewer) or processor data protection terms (use the Article 28 auditor).',
    inputs: [
      { name: 'Entity profile', description: 'Sector, essential or important classification, Member States and whether the Implementing Regulation applies.', required: true },
      { name: 'Supplier inventory', description: 'Suppliers and service providers with the services, systems and data each touches.', required: true },
      { name: 'Contracts', description: 'Security, incident notification, audit, subcontracting and termination terms.' },
      { name: 'Evidence held', description: 'Certifications, audit reports, questionnaires and testing results per supplier.' },
      { name: 'Incident history', description: 'Supplier-related incidents and vulnerabilities.' },
    ],
    outputs: [
      { name: 'Criticality tiers', description: 'Suppliers tiered by impact on the entity’s services, with reasoning.' },
      { name: 'Obligation matrix', description: 'Security requirements per tier, labelled by source.' },
      { name: 'Contract gap review', description: 'Missing or weak terms per critical supplier, with replacement wording.' },
      { name: 'Evidence assessment', description: 'Whether evidence held supports each requirement.' },
      { name: 'Remediation plan', description: 'Actions per supplier with owners and dates.' },
      { name: 'Reassessment schedule', description: 'Review frequency per tier and trigger events.' },
    ],
    prompt: `You are an EU cybersecurity regulatory lawyer building supply chain security for an entity subject to NIS2.

CURRENT-LAW STATUS (as at 2026-09-16)
- Article 21 NIS2 requires supply chain security measures, including security-related aspects of relationships with direct suppliers and service providers [CONFIRMED].
- Implementing Regulation (EU) 2024/2690 sets detailed supply chain requirements for the digital infrastructure and ICT service entities it covers [CONFIRMED].
- National transposing laws and authority guidance supply the operative detail for other entities [VERIFY per Member State].

INPUTS
- Entity: <sector, essential or important, Member States, whether the Implementing Regulation applies>
- Supplier inventory: <suppliers, services, systems and data touched>
- Contracts: <security, incident notice, audit, subcontracting, termination terms>
- Evidence held: <certifications, audits, questionnaires, testing>
- Incident history: <supplier incidents and vulnerabilities>

TASK
1. SCOPE GATE. Confirm the entity is essential or important under NIS2 and identify whether the Implementing Regulation applies. If the entity is a financial entity under DORA, redirect ICT third-party risk to the DORA reviewer.
2. MISSING INFORMATION. Identify suppliers whose access to systems or data is unknown. An unmapped supplier cannot be tiered.
3. CRITICALITY TIERS. Tier suppliers by impact on the entity's services: access to network and information systems, role in delivering essential services, data handled, substitutability and concentration. Record the reasoning for each tier.
4. OBLIGATION MATRIX. For each tier, set security requirements covering supplier vulnerabilities, product and service quality, secure development practices, access control, incident notification to the entity, vulnerability handling, subcontractor control, and exit. Label each as DIRECTIVE, IMPLEMENTING REGULATION, NATIONAL LAW or BEST PRACTICE.
5. CONTRACT GAP REVIEW. For critical suppliers, check contracts for security obligations, incident notification to the entity (a contractual period is a CONTRACTUAL PREFERENCE unless national law sets one), audit and information rights, subcontracting controls, vulnerability disclosure, and termination and exit support. Give replacement wording.
6. EVIDENCE ASSESSMENT. Assess whether evidence supports each requirement: independent certifications and their scope, audit reports, penetration tests and remediation records. Treat a self-assessment questionnaire alone as weak evidence for critical suppliers.
7. REMEDIATION PLAN. Actions per supplier with owners and dates, prioritised by tier and gap severity.
8. REASSESSMENT SCHEDULE. Set frequency by tier and triggers: supplier incidents, material changes in service, ownership changes and new vulnerabilities.
9. LAWYER REVIEW TRIGGERS. Escalate: critical suppliers refusing audit or notification terms; suppliers from jurisdictions subject to national security restrictions; concentration risk; and supplier incidents that may be reportable.

RULES
- Label each requirement by its source.
- Do not present a fixed supplier notification period as a legal requirement unless national law sets one.
- Evidence outweighs assurances; record which is held.

OUTPUT FORMAT
Open with the number of critical suppliers and the most serious gap. Then the sections above, with tiers, obligation matrix and contract gaps as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A regional energy distributor classified as essential maps 140 suppliers after a remote-access vendor was compromised.',
      result:
        'Twelve suppliers tiered critical including the compromised remote-access vendor, an obligation matrix labelling each requirement by source, contract gaps showing no incident notification term for five critical suppliers with wording proposed as a contractual preference, questionnaire-only evidence flagged as insufficient for critical tiers, a remediation plan, and reassessment triggers including supplier incidents.',
    },
  },
  {
    id: 'eu-dsa-notice-action-triage',
    name: 'DSA Notice & Action Triage',
    description: 'Triages a Digital Services Act notice, decides the action and drafts the statement of reasons and redress steps.',
    jurisdiction: 'eu',
    category: 'regulatory',
    tags: ['regulatory-change', 'review', 'dsa', 'content-moderation', 'platform-governance', 'statement-of-reasons'],
    sources: [
      { citation: 'Regulation (EU) 2022/2065 (Digital Services Act), including Articles 16, 17, 20, 21 and 24', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Notice and action mechanisms for hosting services, statements of reasons, internal complaint handling and out-of-court dispute settlement for online platforms, and submission of statements of reasons to the transparency database.' },
      { citation: 'European Commission DSA Transparency Database documentation', authority: 'regulator', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://transparency.dsa.ec.europa.eu', note: 'Defines the fields and formats for submitting statements of reasons. Fields change; check the current documentation.' },
      { citation: 'National law defining illegal content and Digital Services Coordinator guidance', authority: 'primary', publisher: 'Member State legislatures and Digital Services Coordinators', jurisdiction: 'eu', note: 'Whether content is illegal is determined by Union or national law, which varies.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['technology', 'retail-consumer'],
    relatedSkills: ['uk-online-safety-risk-assessment', 'eu-ai-act-classifier', 'global-legal-research'],
    whatItDoes:
      'Takes a notice alleging illegal content on a hosting service or online platform and works it through the Digital Services Act process: whether the notice is sufficiently precise and substantiated to give actual knowledge, which law makes the content illegal if any, whether terms of service are also engaged, the proportionate action, the statement of reasons to the affected user, the complaint and redress routes available, and the transparency database record. It keeps the illegality assessment, which depends on national law, separate from the procedural obligations, which are uniform.',
    whenToUse:
      'For each notice about allegedly illegal content, for each moderation decision that restricts content or an account on illegal-content or terms grounds, and when auditing notice-and-action workflows. Not for: UK Online Safety Act risk assessments (use the UK skill), orders from authorities under Articles 9 and 10, or very large platform systemic risk duties.',
    inputs: [
      { name: 'The notice', description: 'The notice as received, with notifier details, URL or location, explanation and date.', required: true },
      { name: 'The content', description: 'The content, its context, and the account or user that posted it.', required: true },
      { name: 'Service profile', description: 'Hosting service, online platform or marketplace, size and Member States served.', required: true },
      { name: 'Terms of service', description: 'The relevant terms and community guidelines.' },
      { name: 'Prior history', description: 'Previous notices, actions and complaints involving the content or user.' },
      { name: 'Notifier status', description: 'Whether the notifier is a trusted flagger.' },
    ],
    outputs: [
      { name: 'Notice validity', description: 'Whether the notice meets the required elements and gives actual knowledge.' },
      { name: 'Illegality and terms analysis', description: 'The law invoked, whether the content appears illegal, and any terms breach.' },
      { name: 'Action decision record', description: 'The proportionate action and its reasoning.' },
      { name: 'Statement of reasons', description: 'A draft statement containing the required elements.' },
      { name: 'Redress information', description: 'Internal complaint, out-of-court and judicial routes available.' },
      { name: 'Transparency database fields', description: 'The record for submission where the provider is an online platform.' },
      { name: 'Notifier response', description: 'Confirmation and decision notice to the notifier.' },
    ],
    prompt: `You are an EU platform regulation lawyer triaging a notice under the Digital Services Act.

CURRENT-LAW STATUS (as at 2026-09-16)
- DSA obligations for all intermediary services apply, including notice and action for hosting services, statements of reasons, and internal complaint handling and out-of-court dispute settlement for online platforms [CONFIRMED].
- Transparency database field definitions are set in Commission documentation and change over time [VERIFY current fields].
- Illegality is defined by Union or national law, not by the DSA [CONFIRMED].

INPUTS
- Notice: <text, notifier, location, explanation, date>
- Content: <content, context, account>
- Service: <hosting, platform, marketplace; size; Member States served>
- Terms: <relevant terms and guidelines>
- History: <prior notices, actions, complaints>
- Notifier: <trusted flagger or not>

TASK
1. SCOPE GATE. Confirm the provider is a hosting service and whether it is an online platform, marketplace or very large platform, since obligations differ. Note any micro or small enterprise exemptions from platform-specific duties [VERIFY]. If this is an authority order, redirect.
2. NOTICE VALIDITY. Check the required elements: a sufficiently substantiated explanation of why the content is illegal, the exact electronic location, the notifier's name and email except for certain offences, and a statement of good-faith belief. Decide whether the notice gives actual knowledge — whether a diligent provider could identify illegality without detailed legal examination.
3. PRIORITY. If the notifier is a trusted flagger, the notice must be prioritised and processed without undue delay.
4. ILLEGALITY ANALYSIS. Identify the Union or national law invoked, the Member State whose law is relevant, and whether the content appears illegal under it. Record uncertainty. Separately assess whether the content breaches the terms of service.
5. ACTION DECISION. Decide the proportionate action: removal, disabling access, geo-restriction, demotion, demonetisation, account suspension, or no action. Consider freedom of expression and other fundamental rights. Record whether automated means were used.
6. STATEMENT OF REASONS. Draft it with the required content: the action taken and its territorial scope and duration; the facts and circumstances relied on including whether a notice triggered it; whether automated means were used; the legal ground or the terms-of-service ground with explanation; and the redress available.
7. REDRESS. Set out the internal complaint route for online platforms and its handling expectations, out-of-court dispute settlement, and judicial redress.
8. TRANSPARENCY DATABASE. For online platforms, prepare the record for submission without personal data, using the current field set [VERIFY].
9. NOTIFIER RESPONSE. Draft confirmation of receipt and notice of the decision with redress information.
10. LAWYER REVIEW TRIGGERS. Escalate: uncertain illegality; political, journalistic or public-interest content; government or law enforcement notifiers; repeat-infringer suspension; and cross-border conflicts of law.

RULES
- Keep illegality analysis, which depends on national law, separate from DSA procedure.
- Label each item DSA, NATIONAL LAW, TERMS OF SERVICE, COMMISSION GUIDANCE or BEST PRACTICE.
- Never state content is illegal without identifying the specific law.
- Record every decision so the statement of reasons can be defended.

OUTPUT FORMAT
Open with notice validity, the action recommended and whether escalation is needed. Then the sections above, with the statement of reasons and notifier response as usable text and the database record as a table. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'An online marketplace receives a notice from a brand owner alleging that a listing sells counterfeit goods, with a link but no explanation of which trademark is infringed.',
      result:
        'Notice found incomplete for lack of a substantiated explanation so not giving actual knowledge, a request for information sent to the notifier, a parallel terms-of-service review finding the listing uses restricted brand terms, a proportionate interim action of demoting the listing with a statement of reasons citing the terms ground, redress routes set out, and a transparency database record prepared.',
    },
  },
  {
    id: 'eu-ai-act-annex-iv-technical-documentation',
    name: 'AI Act Annex IV Documentation Builder',
    description: 'Builds the Annex IV technical documentation for a high-risk AI system ahead of the postponed application dates.',
    jurisdiction: 'eu',
    category: 'regulatory',
    tags: ['regulatory-change', 'drafting', 'ai-act', 'ai-governance', 'documentation', 'conformity-assessment'],
    sources: [
      { citation: 'Regulation (EU) 2024/1689 (Artificial Intelligence Act), Article 11 and Annex IV', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Providers of high-risk AI systems must draw up technical documentation before placing on the market or putting into service, containing at least the elements in Annex IV.' },
      { citation: 'Regulation amending the AI Act (Digital Omnibus on AI)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'In force 27 July 2026. High-risk obligations apply from 2 December 2027 for stand-alone systems and 2 August 2028 for systems embedded in products. Confirmed as at 2026-09-16.' },
      { citation: 'Harmonised standards, common specifications and Commission guidelines under the AI Act', authority: 'guidance', publisher: 'European Commission; European standardisation organisations', jurisdiction: 'eu', url: 'https://digital-strategy.ec.europa.eu', note: 'Standards were not final by the original deadline, which was one reason for the postponement. Check which have been published before relying on presumption of conformity.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['technology', 'healthcare', 'financial-services'],
    relatedSkills: ['eu-ai-act-classifier', 'eu-dpia-ropa-builder', 'us-cppa-risk-admt-cyber-compliance'],
    whatItDoes:
      'Takes an AI system that has already been classified as high-risk and builds the technical documentation file Annex IV requires, section by section, from the evidence the provider actually holds: general description, development process and design choices, data governance, monitoring and control, performance and accuracy metrics, risk management, lifecycle changes, standards applied, the declaration of conformity and the post-market monitoring plan. It records what is missing, links each section to the underlying records, and frames the work against the postponed application dates rather than the original ones.',
    whenToUse:
      'After a system has been classified as high-risk and the organisation is the provider, when preparing for conformity assessment, when a substantial modification is planned, and when building documentation during development rather than retrofitting it. Not for: deciding whether a system is high-risk or what role the organisation plays (use the AI Act classifier) or deployer-only obligations.',
    inputs: [
      { name: 'Classification record', description: 'The high-risk classification, the Annex or product legislation route, and the provider role.', required: true },
      { name: 'System description', description: 'Intended purpose, versions, hardware and software, and how it is placed on the market.', required: true },
      { name: 'Development records', description: 'Design specifications, architecture, training methods, data sources and validation.', required: true },
      { name: 'Testing evidence', description: 'Accuracy, robustness, cybersecurity and bias testing results.' },
      { name: 'Governance records', description: 'Risk management system, quality management system, human oversight design and logging.' },
      { name: 'Standards used', description: 'Harmonised standards, common specifications or other solutions applied.' },
    ],
    outputs: [
      { name: 'Applicability and timing', description: 'Confirmed high-risk status, provider role and the application date that applies.' },
      { name: 'Annex IV file structure', description: 'Each required section with its content drawn from the records supplied.' },
      { name: 'Evidence map', description: 'Each section linked to the underlying records.' },
      { name: 'Gap register', description: 'Missing or insufficient elements with owners and dates.' },
      { name: 'Standards position', description: 'Standards relied on and their publication status.' },
      { name: 'Maintenance plan', description: 'How the file stays current through changes and post-market monitoring.' },
    ],
    prompt: `You are an EU AI regulatory lawyer building the technical documentation for a high-risk AI system under Article 11 and Annex IV of the AI Act.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- The AI Act, and the Digital Omnibus on AI amending it, in force 27 July 2026 [CONFIRMED].
Scheduled:
- High-risk obligations apply from 2 December 2027 for stand-alone high-risk systems and from 2 August 2028 for high-risk systems embedded in products [CONFIRMED, Council and AI Act Service Desk].
- Any simplified documentation arrangements for smaller providers introduced by the amendments [VERIFY scope and conditions].
- Harmonised standards and common specifications [VERIFY which are published].

INPUTS
- Classification record: <high-risk route, provider role>
- System description: <intended purpose, versions, hardware and software, market placement>
- Development records: <design, architecture, training methods, data sources, validation>
- Testing evidence: <accuracy, robustness, cybersecurity, bias>
- Governance: <risk management, quality management, human oversight, logging>
- Standards: <harmonised standards, common specifications, other solutions>

TASK
1. SCOPE GATE. Confirm a high-risk classification exists and the organisation is the provider. If classification is missing or the organisation is only a deployer, stop and redirect to the classifier.
2. TIMING. Identify which application date applies to this system and record it. Note that documentation must exist before placing on the market or putting into service, so it should be built during development.
3. MISSING INFORMATION. List absent records. Annex IV requires evidence; mark missing elements rather than drafting content that is not supported by records.
4. ANNEX IV FILE. Build each section from the records: a general description including intended purpose, provider, version, interactions with other systems, forms of market placement, hardware, user interface and instructions for use; a detailed description of elements and development process, including methods and steps, design specifications and key choices, system architecture and computational resources, data requirements and datasheets covering provenance, scope, characteristics, collection, labelling and cleaning, human oversight measures, pre-determined changes, and validation and testing procedures with metrics and test logs; monitoring, functioning and control information including capabilities, limitations, foreseeable unintended outcomes and input data specifications; appropriateness of performance metrics; the risk management system; relevant changes over the lifecycle; the harmonised standards or other solutions applied; a copy of the EU declaration of conformity; and the post-market monitoring plan [VERIFY against the current text of Annex IV as amended].
5. EVIDENCE MAP. Link each section to the underlying document, version and owner.
6. GAP REGISTER. Record each missing or weak element with severity, owner and date, ordered by dependency.
7. STANDARDS POSITION. Record which standards or common specifications are relied on and whether they are published, and what alternative evidence is needed where they are not.
8. MAINTENANCE. Set out how the file is updated for substantial modifications, retained for the required period, and connected to post-market monitoring and serious incident reporting [VERIFY retention period].
9. LAWYER REVIEW TRIGGERS. Escalate: uncertain classification; substantial modification questions; reliance on unpublished standards; third-party conformity assessment routes; and any use of personal data in training requiring a separate data protection assessment.

RULES
- Build from records. Never draft technical content that is not supported by evidence.
- Label each item AI ACT, AMENDING REGULATION, HARMONISED STANDARD, COMMISSION GUIDANCE or BEST PRACTICE.
- Use the postponed application dates confirmed above, not the original dates.

OUTPUT FORMAT
Open with the applicable application date and the number of Annex IV sections with gaps. Then the sections above, with the evidence map and gap register as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A provider of a CV-screening system classified as high-risk under Annex III starts building its documentation file eighteen months before the stand-alone application date.',
      result:
        'Provider role and Annex III route confirmed with the 2 December 2027 date recorded, the file structured from existing model cards and validation reports, data governance sections found missing provenance and labelling records for one training dataset, bias testing present but without subgroup metrics, harmonised standards marked unpublished with alternative evidence identified, and a gap register ordered by dependency.',
    },
  },
  {
    id: 'eu-data-act-readiness',
    name: 'Data Act Readiness Assessment',
    description: 'Maps EU Data Act duties for connected products, data sharing and cloud switching into a compliance plan.',
    jurisdiction: 'eu',
    category: 'regulatory',
    tags: ['assessment', 'regulatory-change', 'data-act', 'connected-products', 'cloud-switching', 'data-sharing'],
    sources: [
      { citation: 'Regulation (EU) 2023/2854 (Data Act)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Applies from 12 September 2025. The access-by-design duty applies to connected products and related services placed on the market after 12 September 2026; cloud switching charges must be removed entirely from 12 January 2027. Confirmed as at 2026-10-23.' },
      { citation: 'European Commission guidance, FAQs and model contractual terms under the Data Act', authority: 'guidance', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://digital-strategy.ec.europa.eu', note: 'Non-binding FAQs, recommended model contractual terms for data sharing and standard contractual clauses for cloud contracts. Check the current versions.' },
      { citation: 'European Commission Digital Omnibus proposal (November 2025)', authority: 'guidance', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://digital-strategy.ec.europa.eu', note: 'A legislative proposal under negotiation, not law. It would amend parts of the Data Act, including cloud switching for some pre-September 2025 contracts. Listed so its status is checked, not relied on.' },
    ],
    lastReviewed: '2026-10-23',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['technology', 'energy-infrastructure', 'retail-consumer'],
    relatedSkills: ['eu-member-state-delta', 'eu-gdpr-art28-dpa-auditor', 'eu-nis2-scope-tester', 'global-ai-vendor-terms-reviewer'],
    whatItDoes:
      'Works out which roles a business plays under the Data Act — manufacturer of a connected product, provider of a related service, data holder, data recipient, user, or provider of data processing (cloud) services — and maps the obligations each brings: user access to product and related-service data, pre-contract information, sharing with third parties, conditions and compensation for making data available, the unfair-terms regime for B2B data clauses, trade secret safeguards, public-sector exceptional-need requests, and cloud switching and interoperability. It sequences the dates that matter and keeps the GDPR analysis separate wherever the data is personal.',
    whenToUse:
      'Now that access by design applies to products placed on the market after 12 September 2026, ahead of the 12 January 2027 removal of switching charges, when negotiating data-sharing or cloud contracts, and when a user or third party asks for access to product data.',
    inputs: [
      { name: 'Products and services', description: 'Connected products, related services and data processing services offered in the EU.', required: true },
      { name: 'Data inventory', description: 'What product and related-service data is generated, where it goes, who can access it, and whether it is personal.', required: true },
      { name: 'Contracts', description: 'User terms, data-sharing agreements and cloud contracts, with their dates.' },
      { name: 'Market dates', description: 'When each product model was or will be placed on the EU market.' },
      { name: 'Company size', description: 'Whether the business or its counterparties are micro, small or medium-sized enterprises.' },
    ],
    outputs: [
      { name: 'Role map', description: 'Every product and service with the Data Act roles it engages.' },
      { name: 'Obligation register', description: 'Obligations by role, with the date each applies.' },
      { name: 'Timeline', description: 'The milestones that matter for this business, past and coming.' },
      { name: 'Contract gap list', description: 'Clauses to add, amend or remove, including unfair-terms risks.' },
      { name: 'GDPR interface notes', description: 'Where personal data needs its own lawful basis and rights analysis.' },
      { name: 'Action plan', description: 'Prioritised actions with owners across product, legal and operations.' },
    ],
    prompt: `You are an EU technology regulatory lawyer assessing readiness under Regulation (EU) 2023/2854 (the Data Act).

CURRENT-LAW STATUS (checked 2026-10-23 — re-check before relying on it)
- The Data Act has applied since 12 September 2025 [CONFIRMED].
- The duty to design connected products and related services so that data is accessible by default applies to products and services placed on the market after 12 September 2026; it is not retroactive [CONFIRMED].
- Cloud switching charges may not exceed costs directly incurred until 12 January 2027 and must be removed entirely from that date [CONFIRMED]. Whether ordinary subscription fees and early termination penalties are affected is a separate question [VERIFY].
- The unfair-terms rules for B2B data clauses extend to certain contracts concluded before 12 September 2025 from 12 September 2027 [VERIFY scope].
- A Commission Digital Omnibus proposal would amend parts of the Data Act, including cloud switching for some existing contracts. It is under negotiation and is NOT law [VERIFY status before advising].

INPUTS
- Products and services: <connected products, related services and data processing services offered in the EU, with Member States>
- Data inventory: <data generated by each product or service, where it flows, who can access it, whether personal>
- Contracts: <user terms, data-sharing agreements, cloud contracts, with conclusion dates and durations>
- Market dates: <when each model was or will be placed on the EU market>
- Size: <whether we or our counterparties are micro, small or medium-sized enterprises>

TASK
1. ROLE MAP. For each product and service, decide whether the business is a manufacturer of a connected product, a provider of a related service, a data holder, a data recipient, a user, or a provider of data processing services. A business can hold several roles. Explain each conclusion and flag borderline cases, such as whether a device is a connected product or an app is a related service.
2. USER ACCESS AND SHARING. For connected products and related services: pre-contract information to users; direct access by design for products placed on the market after 12 September 2026, or access on request otherwise; sharing with third parties at the user's request; limits on gatekeepers as recipients; and the data holder's own use of non-personal data under contract with the user.
3. MAKING DATA AVAILABLE. Fair, reasonable and non-discriminatory terms, compensation rules including for SMEs, dispute settlement, and technical protection measures.
4. TRADE SECRETS. The safeguards available before disclosure and the narrow grounds to withhold or suspend, with the evidence and notification each requires [VERIFY].
5. UNFAIR TERMS. Review B2B data access and use clauses against the unfairness test and the listed terms, and identify which contracts are in scope by date.
6. CLOUD SWITCHING. For data processing services: contractual switching rights, notice and transition periods, portability of data and exportable assets, switching charges by date, interoperability, and transparency about international access to data.
7. PUBLIC SECTOR AND INTERNATIONAL ACCESS. Readiness to handle exceptional-need requests, and safeguards against unlawful third-country governmental access to non-personal data.
8. GDPR INTERFACE. Where data is personal, the Data Act does not supply a GDPR legal basis. Flag where a separate lawful basis, transparency or data subject rights analysis is needed.
9. ACTION PLAN. Prioritised by date and exposure, with owners: product design, terms and notices, contract remediation, and request-handling processes.

RULES
- Keep personal-data analysis separate. Never treat a Data Act duty as a GDPR legal basis.
- Penalties and competent authorities are set nationally; do not state them from memory. Mark [VERIFY] and name the Member State to check.
- Do not treat the Digital Omnibus proposal as law. Give the current-law answer and, separately, what would change if it were adopted as proposed.
- Tie every obligation to the role that carries it.
- Mark any article reference, date or threshold you are not certain of [VERIFY].

OUTPUT FORMAT
Open with the role map as a table (Product/service | Roles | Key obligations | Applies from). Then the obligation register, timeline, contract gap list, GDPR interface notes and action plan. Close with: Assumptions; [VERIFY] points; Member State checks needed.`,
    example: {
      scenario:
        'A manufacturer of smart heat pumps sells in four Member States, runs a companion app and cloud platform, and offers the platform to installers on three-year contracts.',
      result:
        'A role map showing manufacturer, related-service provider, data holder and cloud provider roles; access-by-design gaps for models placed on the market after 12 September 2026; installer contract clauses flagged under the unfair-terms test; and a switching-charge plan for 12 January 2027.',
    },
  },
];
