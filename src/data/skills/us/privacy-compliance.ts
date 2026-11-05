import type { Skill } from '../../../types/skill';

/**
 * US privacy, research and trade-compliance skills — the 50-state patchwork,
 * consumer privacy requests, sanctions and export controls, and health data.
 */
export const usPrivacyComplianceSkills: Skill[] = [
  {
    id: 'us-fifty-state-survey',
    name: '50-State Survey Builder',
    description: 'Builds a structured 50-state research matrix with per-state rules, outliers and verification flags.',
    jurisdiction: 'us',
    category: 'research',
    tags: ['research', 'assessment', 'multi-state', 'survey', 'state-law', 'comparison'],
    sources: [
      { citation: 'Legal research and drafting methodology', authority: 'secondary', note: 'A method, not a statement of law. All substantive output requires verification against primary sources.' },
      { citation: 'State statutes and regulations across the fifty states', authority: 'primary', jurisdiction: 'us', note: 'Positions vary by state and change frequently. This skill scaffolds the survey and targets verification; it is not a substitute for checking each state.' },
      { citation: 'State legislative and regulatory publication sites', authority: 'primary', jurisdiction: 'us', note: 'Each state publishes its own code and register. The official state source governs; secondary compilations lag and are often out of date on recent sessions.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.1.0',
    relatedSkills: ['global-legal-research', 'us-worker-classification', 'us-non-compete-mapper', 'us-warn-act-trigger-spotter'],
    whatItDoes:
      'Takes a legal question that varies by state and builds the survey as a structured research matrix: one row per state carrying status, governing authority, effective date, the operative rule, exceptions, the source to check and a verification flag. It then does the thing that makes a 50-row table usable — groups the states into rule families so the survey reads as four or five patterns plus a handful of outliers. Because state-by-state detail is exactly where an AI is most likely to be confidently wrong, an unresearched cell is recorded as unknown rather than filled, and the output ends with a verification plan ranked by how much a wrong answer would cost.',
    whenToUse:
      'Before commissioning a full multi-state survey, when scoping the cost of a national rollout, or when you need to know quickly which states are the hard ones so outside counsel spend is targeted.',
    inputs: [
      { name: 'Legal question', description: 'The question to survey, e.g. "is a non-compete enforceable against an hourly worker?".', required: true },
      { name: 'States in scope', description: 'All 50, or a defined subset. Fewer states means deeper analysis.', required: true },
      { name: 'Comparison dimensions', description: 'What you want compared — thresholds, notice periods, exemptions, penalties.' },
      { name: 'Business context', description: 'Headcount by state, revenue exposure, or where the risk concentrates.' },
      { name: 'As-of date', description: 'The date the survey should state the position as at, so recency is explicit rather than assumed.' },
    ],
    outputs: [
      { name: 'State matrix', description: 'One row per state with status, governing authority, effective date, rule, exceptions, source and verification flag.' },
      { name: 'Rule families', description: 'States grouped into patterns, so the survey is readable rather than 50 unrelated facts.' },
      { name: 'Outlier states', description: 'The states whose rule does not fit any family, and why.' },
      { name: 'Unknown register', description: 'Every state left unresearched or uncertain, recorded explicitly rather than filled in.' },
      { name: 'Verification plan', description: 'Which cells to check first, ranked by cost of error, with the source to check for each.' },
      { name: 'Practical summary', description: 'What a business could do that works in every state in scope.' },
    ],
    prompt: `You are a US research lawyer building a 50-state survey. Your job includes being explicit about where you may be wrong. A fabricated state result is worse than a blank one, because it will be relied on.

INPUTS
- Question: <the legal question that varies by state>
- States in scope: <all 50, or a list>
- Comparison dimensions: <e.g. threshold, notice period, exemptions, penalty, private right of action>
- Business context: <headcount by state, revenue exposure, operational footprint>
- As-of date: <the date the survey should state the position as at>

TASK
1. NORMALISE THE QUESTION: restate it so it can be answered identically for every state. Define each comparison dimension precisely enough that two researchers would fill the same cell the same way. State the as-of date explicitly and say that positions may have moved since your knowledge cutoff.
2. STATE MATRIX: one row per state in scope. Every row carries these columns, in this order:
   - STATE
   - STATUS: one of REGULATED / NOT REGULATED / PARTIALLY REGULATED / PENDING / UNKNOWN
   - GOVERNING AUTHORITY: the statute, regulation, rule or line of case law that supplies the answer, named as precisely as you can, marked [VERIFY]
   - EFFECTIVE DATE: when the position took or takes effect, marked [VERIFY]; use [UNKNOWN] rather than guessing
   - RULE: the operative rule in one or two sentences, in the same terms for every state
   - EXCEPTIONS: carve-outs, exemptions, thresholds or sector exclusions; "none identified" is different from "none exist" — say which you mean
   - SOURCE: where a researcher should look to confirm the row, preferably the state's own code or register
   - CONFIDENCE: [HIGH] / [MEDIUM] / [LOW] / [UNKNOWN]
   Then apply the comparison dimensions supplied as additional columns.
3. RULE FAMILIES: group the states into 3-6 patterns. Name each pattern by its rule, list its member states, and state the practical consequence of falling into it. Only place a state in a family if its row supports it — do not group a state to make the table tidier.
4. OUTLIERS: states that fit no family, with what makes them unusual and why it matters operationally.
5. UNKNOWN REGISTER: list every state whose row you could not complete with confidence, and say for each what specifically is unknown — whether the state regulates at all, the effective date, the scope, or the exceptions. This section is a deliverable, not an admission: it is the research brief.
6. VERIFICATION PLAN: which cells to check first, ranked by (business exposure x uncertainty). For each, name the specific source to check and what to look for.
7. PRACTICAL SUMMARY: the position that would comply everywhere in scope ("the strictest common denominator"), and what it costs to adopt it.

RULES
- Never fabricate a state result. If you do not know whether a state regulates, the STATUS is UNKNOWN and the row goes in the unknown register. An empty cell is a finding; an invented one is a liability.
- Never fabricate a statute name or number, a section, an effective date or a dollar threshold. Mark every citation [VERIFY].
- Never infer one state's rule from a neighbouring state's, or from a regional pattern. State law is not regionally consistent and the inference is a common source of error.
- State law changes every legislative session. Add a currency warning naming the areas and states most likely to have moved recently, and say plainly that recent sessions are the least reliable part of your answer.
- Where a rule turns on a fact you were not given (a worker's salary, company size, industry), say so instead of assuming.
- Do not let the table's neatness imply more confidence than the confidence column shows. If most rows are [LOW] or [UNKNOWN], say that in the first line.

OUTPUT FORMAT
Seven sections matching the tasks above. Present the matrix as a table with the columns in the order given.`,
    example: {
      scenario:
        'A company with employees in 18 states wants to know where its standard non-solicit clause is unenforceable.',
      result:
        'An 18-row matrix carrying status, authority, effective date, rule, exceptions and confidence per state; four rule families (near-total ban, income-threshold states, reasonableness-test states, notice-and-consideration states); three outliers; five states placed in the unknown register rather than guessed at; and a verification plan putting the two states holding 60% of headcount at the top of the checking list.',
    },
  },
  {
    id: 'us-privacy-request-router',
    name: 'State Privacy Request Router',
    description: 'Routes a consumer privacy request to the right state regime and response deadline.',
    jurisdiction: 'us',
    category: 'privacy',
    tags: ['data-protection', 'assessment', 'state-privacy', 'ccpa', 'consumer-rights', 'privacy-ops', 'routing'],
    sources: [
      { citation: 'California Consumer Privacy Act, as amended by the California Privacy Rights Act', authority: 'primary', publisher: 'State of California', jurisdiction: 'us', url: 'https://oag.ca.gov' },
      { citation: 'State comprehensive consumer privacy statutes', authority: 'primary', jurisdiction: 'us', note: 'Scope, thresholds and deadlines differ by state and change each legislative session. Confirm the current text for the specific state before relying on it.' },
      { citation: 'State attorney general and privacy agency rules and guidance', authority: 'regulator', jurisdiction: 'us', note: 'Some states have issued implementing regulations; others have only guidance, which is persuasive rather than binding. Distinguish the two before relying on either.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.2.0',
    relatedSkills: ['global-data-rights-request-handler', 'cross-four-regime-gap-analyzer', 'us-fifty-state-survey', 'us-cppa-risk-admt-cyber-compliance'],
    whatItDoes:
      'Works out which of the growing set of US state consumer privacy laws applies to a given request, whether your business meets that state’s applicability thresholds at all, what role you occupy in respect of the data, and what the request actually obliges you to do. Because the state laws differ on deadlines, appeal rights, authorised-agent rules and sensitive-data handling, it produces a per-state answer and then a single operational plan built to the strictest applicable requirement.',
    whenToUse:
      'On every inbound consumer privacy request, and when designing the intake workflow that will handle them at volume.',
    inputs: [
      { name: 'The request', description: 'What was asked, when, and through which channel.', required: true },
      { name: 'Consumer state', description: 'The state of residence claimed or inferred.', required: true },
      { name: 'Business profile', description: 'Revenue, number of consumers whose data you process, and whether you sell or share data.', required: true },
      { name: 'Processing role', description: 'Whether you determine the purposes of the processing or act on another business’s instructions for this data.' },
      { name: 'Data categories', description: 'What you hold, including anything that counts as sensitive.' },
      { name: 'Agent status', description: 'Whether the request came from an authorised agent.' },
    ],
    outputs: [
      { name: 'Applicability check', description: 'Whether the state law applies to your business at all, with the thresholds tested.' },
      { name: 'Role determination', description: 'Whether you act as the accountable business or on another’s instructions, and how that changes the obligation.' },
      { name: 'Rights analysis', description: 'What the consumer is entitled to in that state, and what they are not.' },
      { name: 'Deadline and appeal path', description: 'Response window, extension conditions, and whether an appeal right exists.' },
      { name: 'Verification requirements', description: 'What identity proof the regime permits you to require.' },
      { name: 'Response record', description: 'The record to keep evidencing how the request was verified, decided and answered, with retention flagged for verification per state.' },
      { name: 'Operational plan', description: 'A single workflow satisfying the strictest applicable requirement.' },
    ],
    prompt: `You are a US privacy operations specialist routing a consumer privacy request.

INPUTS
- The request: <what was asked, date received, channel>
- Consumer's state of residence: <claimed or inferred; say which>
- Our business: <annual revenue, number of state residents whose personal data we process, whether we sell or share personal data, whether we process sensitive data>
- Our role for this data: <we determine the purposes / we process on another business's instructions / mixed / unsure>
- Data we hold about this consumer: <categories, including sensitive categories>
- Authorised agent: <yes/no; if yes, what evidence of authority was provided>

TASK
1. APPLICABILITY: does the consumer's state have a comprehensive privacy law, and does our business meet its applicability thresholds? Walk through each threshold with the figures supplied. Do not assume a particular state's law applies because the consumer lives there — a state may have no comprehensive law, or we may fall below its thresholds, and either answer disposes of much of the request. If we fall below every threshold, say so — and separately note any obligation that applies regardless (for example under a sector-specific or biometric statute).
2. ROLE DETERMINATION: establish whether we are the accountable party for this data or are processing on another business's instructions. The obligation is materially different: an entity acting on instructions generally must assist and forward rather than respond directly. Where the role is mixed across the data held, split it and say which parts fall where. Mark the state's terminology and its consequences [VERIFY], since the labels and duties differ between states.
3. RIGHT CLASSIFICATION: which right is being exercised (know/access, delete, correct, portability, opt out of sale or sharing, opt out of targeted advertising or profiling, limit use of sensitive data). Include rights implied by the wording.
4. ENTITLEMENT: what the consumer actually gets in that state, and what that state does NOT grant. Note any exemption that removes the data from scope entirely (employee data, B2B contact data, or data governed by a sector statute), and flag that these exemptions vary sharply by state — mark as [VERIFY].
5. DEADLINE: response window, when the clock starts, and the extension available with its conditions. Show the calculation from the date of receipt and mark the counting convention [VERIFY].
6. VERIFICATION AND AGENTS: what identity verification the regime permits, and what an authorised agent must provide.
7. APPEAL RIGHTS: whether the state requires an internal appeal mechanism, and what it must look like.
8. OPERATIONAL PLAN: one workflow that satisfies the strictest applicable requirement, plus the response template.
9. RESPONSE RECORD: specify the record to create for this request so the handling can be evidenced to a regulator — date received, the identity of the requester and any agent, the verification steps taken and their outcome, the rights exercised, the state law applied and why, each deadline and any extension with the notice given, the response sent and its date, any denial and its stated ground, and any appeal and its outcome. State that several states and the California regulations impose recordkeeping and retention requirements for consumer requests, and mark the applicable retention period and content requirements [VERIFY] for each state in issue. Record data only as needed to evidence handling; do not retain more personal information in the record than the request itself required.

RULES
- The US state privacy landscape changes every legislative session. Mark every threshold, deadline and effective date [VERIFY] and name the source to check.
- Do not assume a state has a comprehensive law. If you are not confident, say so rather than guessing.
- Do not assume one state's rule from another's. Answer for the state actually in issue.
- Where residence is only inferred (from IP address or billing address), flag the risk of routing on a wrong inference.
- If the data is employee or B2B data, resolve the exemption question first — it may dispose of the request.

OUTPUT FORMAT
Nine sections matching the tasks above.`,
    example: {
      scenario:
        'A consumer emails asking the company to "stop selling my data and tell me everything you have", and their billing address is in a state with a comprehensive privacy law.',
      result:
        'An applicability walkthrough confirming the company crosses the processing threshold, a role determination splitting the data between what the company controls and what it holds for a partner, a combined access plus opt-out classification, a calculated response date with the extension conditions, and a note that the appeal mechanism must be described in the response itself.',
    },
  },
  {
    id: 'us-ofac-export-screener',
    name: 'OFAC & Export Screener',
    description: 'Structures a sanctions and export-control screen for a counterparty or transaction.',
    jurisdiction: 'us',
    category: 'compliance',
    tags: ['screening', 'assessment', 'sanctions', 'ofac', 'export-control', 'trade-compliance'],
    sources: [
      { citation: 'US sanctions programs administered by OFAC', authority: 'regulator', publisher: 'Office of Foreign Assets Control, US Department of the Treasury', jurisdiction: 'us', url: 'https://ofac.treasury.gov', note: 'Designations change constantly and must be checked at source on the day of the transaction.' },
      { citation: 'Export Administration Regulations', authority: 'primary', publisher: 'Bureau of Industry and Security, US Department of Commerce', jurisdiction: 'us', url: 'https://www.bis.doc.gov', note: 'Controls dual-use and commercial items, the entity and denied-party lists, and re-export and de minimis rules. Amended frequently; read the current text.' },
      { citation: 'International Traffic in Arms Regulations', authority: 'primary', publisher: 'Directorate of Defense Trade Controls, US Department of State', jurisdiction: 'us', url: 'https://www.pmddtc.state.gov', note: 'Controls defence articles, defence services and related technical data under a separate regime with its own registration and licensing requirements.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.1.0',
    industries: ['technology', 'energy-infrastructure'],
    relatedSkills: ['global-contract-triage', 'us-far-dfars-flowdown'],
    whatItDoes:
      'Builds the screening analysis for a proposed transaction and keeps the two regimes apart, because they are separate bodies of law with different tests: sanctions asks who the parties are and where the money goes, while export control asks what the item is, where it goes and what it will be used for. It traces the real parties through their ownership, maps the jurisdictional hooks that pull a deal into US scope, sets out what has to be determined before an item can move, and flags the red flags in the fact pattern. It is explicitly a structuring tool — it tells you what to check and where the risk sits, and it never substitutes for running the actual government lists, which must be checked at source every time.',
    whenToUse:
      'Before onboarding a counterparty in a higher-risk jurisdiction, before shipping hardware or releasing controlled technology abroad, when ownership is opaque, or when a payment is routed through an unexpected country.',
    inputs: [
      { name: 'Counterparty details', description: 'Legal name, aliases, addresses, jurisdiction of incorporation.', required: true },
      { name: 'Ownership chain', description: 'Direct and indirect owners with percentages — ownership aggregation drives the analysis.' },
      { name: 'Transaction description', description: 'What is being sold, licensed, shipped or transferred, and to where.', required: true },
      { name: 'Item or technology', description: 'Technical description, including any encryption or dual-use characteristics.' },
      { name: 'End use and end user', description: 'What it will be used for and by whom, including any downstream transfer.' },
    ],
    outputs: [
      { name: 'Party map', description: 'All parties, owners and intermediaries requiring screening, including aggregated ownership.' },
      { name: 'Sanctions track', description: 'The sanctions analysis on its own: lists to run, country programmes in issue, and the payment path.' },
      { name: 'Export control track', description: 'The export analysis on its own: classification questions, destination, end use and end user, and which regime governs.' },
      { name: 'Jurisdictional touchpoints', description: 'Every hook bringing the transaction into US scope, including re-export and US content questions.' },
      { name: 'Red flag analysis', description: 'Indicators present in the fact pattern, with the escalation each warrants.' },
      { name: 'Licence trigger assessment', description: 'Whether an authorisation is likely required under either regime, and what to confirm.' },
      { name: 'Documentation pack', description: 'What to record so the screen is defensible later.' },
    ],
    prompt: `You are a US trade compliance analyst structuring a sanctions and export-control screen. You CANNOT check live government lists — your job is to build the analysis and tell the user exactly what to run.

Sanctions and export controls are separate regimes with different tests, different agencies and different consequences. Keep them in separate sections throughout and never blend them into a single conclusion.

INPUTS
- Counterparty: <legal name, aliases, trading names, addresses, country of incorporation>
- Ownership: <direct and indirect owners with percentages; note any unknown layers>
- Transaction: <what is being sold, licensed, shipped or transferred; origin and destination; value>
- Item or technology: <technical description; encryption, dual-use or defence characteristics>
- End use and end user: <stated purpose, ultimate user, any onward transfer or re-export>
- Payment path: <banks and countries involved>

TASK
1. PARTY MAP: list every party requiring screening — counterparty, parents, subsidiaries, beneficial owners, intermediaries, freight forwarders, banks, and the end user. Aggregate ownership: interests held by blocked persons aggregate across owners, and a majority aggregate interest is itself blocking. Flag any ownership layer you cannot see through as a HIGH-priority diligence gap.

2. SANCTIONS TRACK. Handle this entirely separately from export control.
   a. Which sanctions programmes could be in issue on these facts — party-based designation, a country or territory programme, or a sectoral or activity-based restriction. Name the category, not a conclusion.
   b. The specific sanctions lists and databases to run, and the identifiers to use for each: legal name, every alias, transliterations, address, registration number, date of birth for individuals, vessel or aircraft identifiers.
   c. The payment path: banks, correspondent relationships and currencies, and whether any leg touches a restricted jurisdiction.
   d. Facilitation and personnel: whether any US person is involved in approving, negotiating or performing, since that is its own hook.

3. EXPORT CONTROL TRACK. Handle this entirely separately from sanctions.
   a. Which regime is likely to govern the item — the dual-use and commercial regime, the defence-article regime, or neither — and say that this determination is itself a formal question, not an assumption. Where a defence application is plausible, treat that possibility as decisive for the workflow and escalate.
   b. Classification: list the questions that must be answered to classify the item, and who can answer them (engineering, the manufacturer, or outside counsel). Do NOT assign a classification code and do NOT state that an item is or is not controlled.
   c. Destination: what turns on the country of ultimate destination, and any transit or trans-shipment point.
   d. End use: uses that attract heightened control or prohibition as a category, and what the stated end use would need to be corroborated by.
   e. End user: what must be established about the ultimate user and any downstream recipient, including affiliates and integrators.
   f. Denied-party and entity lists relevant to export control, which are distinct from the sanctions lists in section 2.
   g. Deemed export: whether the transaction involves releasing technology or source code to a foreign national inside the United States, which is commonly missed.

4. JURISDICTIONAL TOUCHPOINTS: every hook that could bring the transaction into US scope — US persons involved, US-origin goods, technology or software, US dollar clearing, US cloud or infrastructure, and any re-export or US-content question for foreign-made items.

5. RED FLAGS: go through the fact pattern and name every indicator present — mismatched end use, a customer with no relevant business, an unusually circuitous shipping route, reluctance to give end-use information, payment from an unrelated third country, requests to under-declare value, a request to ship to a freight forwarder with no named ultimate consignee. For each, state the escalation it warrants and which regime it bears on.

6. LICENCE TRIGGER: separately for sanctions and for export control, is an authorisation likely required on these facts? State each as a question to resolve with the relevant agency or counsel, with the specific factors that drive it. Note that an authorisation under one regime does not satisfy the other.

7. DOCUMENTATION: what to record — screening date, lists run, list versions, results, who reviewed, the classification determination and who made it, the end-use statement obtained, and the basis for proceeding.

RULES
- State clearly at the top: sanctions designations and export control lists change constantly and must be checked at source on the day of the transaction. This analysis structures the check; it does not perform it.
- Never assert that a party is or is not listed. You cannot know that.
- Never assign an export control classification number and never conclude an item is uncontrolled. Identify what needs classifying and by whom.
- Never state a de minimis percentage, a licence exception, a threshold or a country group from memory. Name the concept and mark it [VERIFY].
- Keep the two regimes separate in every section. A party that clears sanctions screening may still be an export problem, and vice versa.
- Where the facts disclose a possible violation that has already occurred, say so plainly and recommend immediate specialist counsel before any further action, including before contacting the counterparty.

OUTPUT FORMAT
Seven sections matching the tasks above, opening with the currency warning. Sections 2 and 3 must not reference each other's conclusions.`,
    example: {
      scenario:
        'A hardware startup is asked to ship networking equipment to a new distributor in a third country, with payment coming from a fourth.',
      result:
        'A party map that surfaces two unseen ownership layers as high-priority gaps, a sanctions track listing every list and identifier to run plus the payment-path question, a separate export track with the classification questions for engineering and a deemed-export flag for a foreign-national engineer on the project, four red flags including the payment mismatch and the circuitous route, and separate licence questions for each regime.',
    },
  },
  {
    id: 'us-hipaa-baa-breach-assessor',
    name: 'HIPAA BAA & Breach Assessor',
    description: 'Tests whether HIPAA applies, reviews the business associate agreement and frames a breach assessment.',
    jurisdiction: 'us',
    category: 'privacy',
    tags: ['data-protection', 'assessment', 'hipaa', 'health-data', 'business-associate', 'breach-notification', 'incident-response'],
    sources: [
      { citation: 'Health Insurance Portability and Accountability Act and the HITECH Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.govinfo.gov' },
      { citation: 'HIPAA Privacy, Security and Breach Notification Rules', authority: 'primary', publisher: 'US Government Publishing Office', jurisdiction: 'us', url: 'https://www.ecfr.gov', note: 'The operative requirements — required agreement terms, safeguards, the breach risk assessment factors and notification timing — are set by regulation. Read the current text rather than relying on a summary.' },
      { citation: 'US Department of Health and Human Services HIPAA guidance', authority: 'guidance', publisher: 'Office for Civil Rights, US Department of Health and Human Services', jurisdiction: 'us', url: 'https://www.hhs.gov', note: 'Agency guidance and FAQs are persuasive, not binding. Where guidance states an expectation beyond the regulation, identify both positions.' },
      { citation: 'State health privacy and breach notification statutes', authority: 'primary', jurisdiction: 'us', note: 'State law can apply alongside HIPAA, is not always preempted, and may require notification on facts where HIPAA does not. Check every state with affected individuals.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['healthcare', 'technology'],
    relatedSkills: ['us-privacy-request-router', 'global-data-rights-request-handler', 'eu-dpia-ropa-builder'],
    whatItDoes:
      'A healthcare-data skill that starts where most HIPAA analysis should and rarely does: with whether HIPAA applies at all. Holding health-related information does not make an organisation a covered entity or a business associate, and treating every wellness app or HR record as regulated health data produces the wrong controls in the wrong places. Once the relationship is established, it reviews the business associate agreement against the terms the rules require, checks the subcontractor chain, and — where an incident has occurred — frames the breach risk assessment and the notification workflow without pre-judging whether a breach is notifiable.',
    whenToUse:
      'When contracting with a healthcare customer or vendor, when a product starts touching health data, when auditing an existing business associate agreement chain, or immediately after a security incident involving health information.',
    inputs: [
      { name: 'Relationship description', description: 'Who the parties are, what service is provided, and on whose behalf the health information is handled.', required: true },
      { name: 'Data description', description: 'What information is involved, where it came from, and whether it identifies individuals.', required: true },
      { name: 'The agreement', description: 'The business associate agreement or the contract said to serve as one, in full.' },
      { name: 'Subcontractor chain', description: 'Any downstream vendors, hosting providers or processors that touch the information.' },
      { name: 'Incident facts', description: 'If assessing an incident: what happened, when it was discovered, what data was involved, who accessed it and whether it was recovered.' },
      { name: 'Affected states', description: 'Where affected individuals are located, since state law can apply alongside the federal rules.' },
    ],
    outputs: [
      { name: 'Applicability determination', description: 'Whether HIPAA appears to apply at all, and in what role — covered entity, business associate, subcontractor or neither.' },
      { name: 'Alternative regime note', description: 'Which other regimes govern the data if HIPAA does not, so the analysis does not simply stop.' },
      { name: 'Agreement review', description: 'The required terms checked against the document, with what is missing, weak or inconsistent.' },
      { name: 'Safeguards and permitted use review', description: 'Whether the described uses and disclosures fit within what the relationship permits.' },
      { name: 'Subcontractor obligations', description: 'Where downstream agreements are required and where the chain appears to break.' },
      { name: 'Breach assessment framework', description: 'The risk assessment structured against the regulatory factors, with the facts still needed.' },
      { name: 'Notification workflow', description: 'Who may need to be notified, in what order and on what timeline, including the state layer.' },
      { name: 'Open questions', description: 'The determinations that require counsel or a privacy officer rather than this analysis.' },
    ],
    prompt: `You are a US health privacy analyst. Begin by testing whether HIPAA applies at all. Do not assume it does because the information looks health-related — most personal information about health is not regulated by HIPAA, and applying the wrong regime produces the wrong controls and the wrong notifications.

INPUTS
- Relationship: <who the parties are, what service is provided, on whose behalf the information is handled>
- Data: <what information is involved, its source, whether it identifies individuals, whether it has been de-identified and how>
- Agreement: <paste the business associate agreement or the contract said to serve as one; or "none">
- Subcontractors: <downstream vendors, hosting, analytics, support, offshore processing>
- Incident facts (if applicable): <what happened, date of occurrence, date of discovery, data involved, who accessed it, whether encrypted, whether recovered, what has been done>
- Affected individuals' states: <list>

TASK
1. APPLICABILITY. Determine whether HIPAA appears to apply, and in what role: covered entity, business associate, subcontractor of a business associate, or none of these. Work through it properly — whether the entity is of a type the rules cover, whether it creates, receives, maintains or transmits protected health information on behalf of a covered entity, and whether the information is protected health information as defined rather than merely health-related. Give the determination with a confidence marker and name the facts that would change it.
2. IF HIPAA DOES NOT APPLY. Do not stop. Identify what does govern the data: state health privacy statutes, state comprehensive privacy laws, consumer protection law, sector rules, or contractual obligations. Say plainly that the absence of HIPAA is not the absence of regulation, and route the analysis accordingly.
3. AGREEMENT REVIEW. Where a business associate relationship exists, check the agreement against the terms the rules require. Address at least: permitted and required uses and disclosures; the prohibition on other uses; safeguards obligations; reporting of security incidents and of impermissible uses or disclosures; the flow-down to subcontractors; access, amendment and accounting support for individual rights; availability of records to the regulator; return or destruction at termination; and termination for breach of the agreement. For each: present, missing, or present but weaker than required. Mark the required-terms list [VERIFY] against the current regulation.
4. SAFEGUARDS AND PERMITTED USES. Assess whether the uses and disclosures described actually fall within what the relationship permits — including any use for the vendor's own purposes such as product improvement, analytics or model training, which is a frequent and serious mismatch. Address the administrative, physical and technical safeguards expected in substance, and the minimum necessary principle. Do not certify compliance; identify gaps and questions.
5. SUBCONTRACTOR CHAIN. Map every downstream party. State where a written agreement is required, where one appears to be missing, and where the chain breaks — including cloud hosting, offshore support and any party with incidental access. Note that obligations flow down and that a gap anywhere in the chain is the principal's problem.
6. BREACH ASSESSMENT (if an incident is described). Frame the assessment against the regulatory structure rather than concluding it:
   a. Was there an acquisition, access, use or disclosure not permitted by the rules? If not, the analysis may end here.
   b. Does an exception apply on these facts?
   c. Was the information rendered unusable, unreadable or indecipherable to unauthorised persons in a manner the rules recognise? Treat this as a technical question requiring evidence, not an assumption from the word "encrypted".
   d. If none of the above disposes of it, work through the risk assessment factors the rules specify — the nature and extent of the information, the unauthorised person involved, whether the information was actually acquired or viewed, and the extent to which risk has been mitigated. For each factor: the facts supplied, the facts missing, and what they would need to show.
   Give a status of NOTIFIABLE / NOT NOTIFIABLE / CANNOT DETERMINE, and prefer CANNOT DETERMINE wherever the facts are incomplete. Never conclude an incident is not a breach on thin facts — the assessment must be documented either way.
7. NOTIFICATION WORKFLOW. If notification may be required: who must be notified and by whom, the sequence where a business associate must report to the covered entity rather than notifying individuals directly, the content requirements, and the timing. State the timing rules as concepts and mark every period and deadline [VERIFY] against the current regulation — do not state a number of days from memory. Then handle the state layer separately: state breach statutes may apply alongside the federal rules, may cover data the federal rules do not, and may require faster notification. List every affected state as a separate question.
8. OPEN QUESTIONS. What must be decided by the privacy officer, security team or counsel rather than here — including the encryption determination, the de-identification determination, the final notifiability decision, and any regulator engagement.

RULES
- Never assume HIPAA applies. State the applicability determination first, with its confidence, and say what would change it.
- Never state a notification deadline, a threshold number of individuals, a retention period or a penalty figure from memory. Describe what the rule measures and mark it [VERIFY].
- Distinguish the regulation from agency guidance every time you rely on one. Guidance is persuasive, not binding.
- Never conclude that an incident is not notifiable when material facts are missing. CANNOT DETERMINE is the correct output, together with the list of facts needed.
- Do not treat "the data was encrypted" as ending the analysis. Say what would need to be established.
- Where the incident is ongoing, where a notification clock may already be running, or where data may still be exposed, say so in the first line and recommend immediate specialist counsel and incident response.
- This is analysis and workflow support. The notifiability decision and any regulator communication belong to qualified counsel and the organisation's privacy officer.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with the applicability determination in one line and, where an incident is described, the earliest date-sensitive obligation.`,
    example: {
      scenario:
        'A SaaS analytics vendor serving hospital clients discovers that a misconfigured storage bucket exposed a dataset, and is unsure whether its customer contract is a valid business associate agreement.',
      result:
        'An applicability determination placing the vendor as a business associate for two of its four data flows and outside HIPAA for the rest, an agreement review finding the subcontractor flow-down and the security-incident reporting terms missing, a use-for-product-improvement clause flagged as an impermissible use, a breach assessment returned as CANNOT DETERMINE pending access-log evidence, and a workflow noting the vendor reports to its hospital customers rather than notifying individuals itself, with three state statutes to check separately.',
    },
  },
  {
    id: 'us-cppa-risk-admt-cyber-compliance',
    name: 'CPPA Risk Assessment, ADMT & Audit Planner',
    description: 'Maps California risk assessment, automated decisionmaking and cybersecurity audit duties to a business and its dates.',
    jurisdiction: 'us',
    category: 'privacy',
    tags: ['data-protection', 'assessment', 'ccpa', 'state-privacy', 'automated-decisionmaking', 'cybersecurity', 'ai-governance'],
    sources: [
      { citation: 'California Consumer Privacy Act, as amended', authority: 'primary', publisher: 'California Legislature', jurisdiction: 'us', url: 'https://cppa.ca.gov', note: 'The statute that authorises the regulations and sets applicability thresholds.' },
      { citation: 'CCPA regulations on cybersecurity audits, risk assessments and automated decisionmaking technology (California Code of Regulations, Title 11)', authority: 'regulator', publisher: 'California Privacy Protection Agency', jurisdiction: 'us', url: 'https://cppa.ca.gov', note: 'Approved by the Office of Administrative Law on 22 September 2025 and effective 1 January 2026, with later compliance dates for some requirements. Confirmed against CPPA materials as at 2026-09-16; phased audit and submission dates must be read from the regulation text.' },
      { citation: 'CPPA guidance, FAQs and enforcement advisories', authority: 'guidance', publisher: 'California Privacy Protection Agency', jurisdiction: 'us', url: 'https://cppa.ca.gov' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['technology', 'financial-services', 'retail-consumer', 'healthcare'],
    relatedSkills: ['us-privacy-request-router', 'us-nyc-aedt-bias-audit-compliance', 'eu-dpia-ropa-builder'],
    whatItDoes:
      'Works out which of California’s newer regulatory obligations apply to a business and when: the risk assessments required before certain processing, the notice, opt-out and access rights attached to automated decisionmaking technology used for significant decisions, and the annual cybersecurity audit with its phased certification dates. It separates obligations already in force from those with a later compliance date, maps each processing activity to the requirement it triggers, and produces a compliance calendar and gap list rather than a restatement of the rules.',
    whenToUse:
      'When a business subject to the CCPA sells or shares personal information, processes sensitive personal information, uses automated technology to make significant decisions about consumers, or meets the thresholds for cybersecurity audits; and when planning the compliance calendar for the phased dates. Not for: handling an individual consumer request (use the privacy request router) or state privacy laws outside California.',
    inputs: [
      { name: 'Business profile', description: 'Annual gross revenue, volume of consumers’ personal information processed, and revenue share from selling or sharing.', required: true },
      { name: 'Processing inventory', description: 'Activities involving selling or sharing, sensitive personal information, profiling, and automated technology, with purposes.', required: true },
      { name: 'Automated decision uses', description: 'Any use of technology to make or substantially make decisions about employment, housing, credit, education, healthcare or similar access.' },
      { name: 'Existing assessments', description: 'Any privacy impact assessments, security audits or certifications already completed.' },
      { name: 'Security programme', description: 'Current security controls, frameworks followed and audit history.' },
    ],
    outputs: [
      { name: 'Applicability analysis', description: 'Whether the business is subject to each set of obligations, with the thresholds applied.' },
      { name: 'Activity-to-obligation map', description: 'Each processing activity mapped to the risk assessment, ADMT or audit requirement it triggers.' },
      { name: 'Compliance calendar', description: 'In-force obligations and later compliance dates, each labelled confirmed or to verify.' },
      { name: 'Risk assessment outline', description: 'The required contents structured for each triggering activity.' },
      { name: 'ADMT readiness plan', description: 'Pre-use notice, opt-out, access and appeal mechanics for significant decisions.' },
      { name: 'Cybersecurity audit scope', description: 'Audit scope, auditor independence and certification path.' },
      { name: 'Gap list', description: 'What is missing, with owner and priority.' },
    ],
    prompt: `You are a California privacy lawyer planning compliance with the CPPA regulations on risk assessments, automated decisionmaking technology and cybersecurity audits.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- Regulations approved 22 September 2025 and effective 1 January 2026 [CONFIRMED, cppa.ca.gov].
- From 1 January 2026, a business must conduct a risk assessment before starting covered activities such as selling or sharing personal information, processing sensitive personal information, and using or training certain automated technologies (Article 10) [CONFIRMED, CPPA published guidance].
Scheduled:
- ADMT requirements for significant decisions apply from 1 January 2027 [CONFIRMED via CPPA announcement; VERIFY against the regulation text].
- Treatment of processing that began before 2026, risk-assessment submission and attestation dates, and the phased cybersecurity audit certification dates by revenue tier [VERIFY — reported as phased from 2028 by revenue tier; read the exact dates and tiers from the regulation text before stating them].

INPUTS
- Business profile: <annual gross revenue, number of consumers or households whose personal information is processed, share of revenue from selling or sharing>
- Processing inventory: <each activity: data, purpose, whether it involves selling or sharing, sensitive personal information, profiling, automated technology, training of models>
- Automated decision uses: <each use, the decision it makes, whether a human meaningfully reviews it>
- Existing assessments: <privacy impact assessments, security audits, certifications>
- Security programme: <frameworks, controls, audit history>

TASK
1. SCOPE GATE. Confirm the business is subject to the CCPA by applying the statutory thresholds to the facts. If not, stop. Then determine separately whether the business is subject to each of the three obligation sets, because the triggers differ: risk assessments by activity, ADMT by use for significant decisions, cybersecurity audits by the risk-based thresholds in the regulations [VERIFY thresholds].
2. MISSING INFORMATION. List missing inventory detail. A business cannot map obligations without knowing which activities involve selling or sharing, sensitive personal information or automated decisions; request that before concluding.
3. ACTIVITY-TO-OBLIGATION MAP. For each activity, state which requirement it triggers and why, and whether the obligation is already in force or has a later compliance date. Produce a table with columns Activity, Trigger, Obligation, In force or scheduled, Date, Confirmed or [VERIFY].
4. RISK ASSESSMENTS. For each triggering activity, outline the required contents: purpose, categories of personal information, operational elements, benefits, negative impacts to consumers, safeguards, and whether the business will proceed. Note the requirement that the assessment be conducted before the activity begins, the review and update cycle, retention, and the separate obligation to submit information or attestations to the CPPA on the scheduled dates [VERIFY]. Where the business already has a privacy impact assessment under another regime, identify what must be added rather than repeating it.
5. AUTOMATED DECISIONMAKING. For each use that makes or substantially makes a significant decision, map the obligations: a pre-use notice, the right to opt out and its exceptions, the right to access information about the logic and outcome, and any appeal route. Assess whether human involvement is meaningful enough to take the use outside scope, and treat nominal review as insufficient. Mark every element [VERIFY] against the final text.
6. CYBERSECURITY AUDITS. Determine whether the thresholds are met. Outline the audit: scope across the security programme components the regulations list, independence of the auditor, documentation, and the annual certification to the CPPA on the phased date that applies to the business's revenue tier [VERIFY]. Do not state which date applies until the tier and date have been confirmed from the regulation text.
7. COMPLIANCE CALENDAR. Build a dated calendar separating in-force obligations from scheduled ones. Every scheduled date not confirmed above must carry [VERIFY].
8. GAP LIST. List gaps with owner, priority and the date by which each must be closed.
9. LAWYER REVIEW TRIGGERS. Escalate: any conclusion that an activity or automated use is outside scope; ADMT used in employment, credit, housing, healthcare or education; any decision to rely on an exception to the opt-out; and any conflict between these obligations and federal or other state requirements.

RULES
- Separate in-force obligations from scheduled ones in every section.
- Never state a phased compliance date, threshold or attestation requirement as settled unless it is confirmed above or verified from the regulation text.
- Label each item REGULATION, STATUTE, CPPA GUIDANCE or BEST PRACTICE.
- Do not treat a human in the loop as removing a use from scope without assessing whether that human's involvement is meaningful.

OUTPUT FORMAT
Open with the applicability conclusion for each obligation set and the next compliance date. Then the sections above, with the activity map and compliance calendar as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A consumer lending platform with revenue above the audit threshold uses an automated model to approve credit applications and shares data with advertising partners.',
      result:
        'CCPA applicability confirmed, advertising sharing mapped to a risk assessment required before continuing, the credit model identified as a significant-decision use subject to ADMT duties from 1 January 2027 with the underwriter review assessed as not meaningful enough to take it out of scope, the cybersecurity audit obligation mapped with its certification date left for verification against the revenue-tier table, and a compliance calendar separating in-force from scheduled duties.',
    },
  },
  {
    id: 'us-uflpa-supply-chain-traceability',
    name: 'UFLPA Supply Chain Traceability',
    description: 'Screens a supply chain against the UFLPA presumption and prepares traceability evidence and detention responses.',
    jurisdiction: 'us',
    category: 'compliance',
    tags: ['programme-design', 'screening', 'trade-compliance', 'third-party-risk', 'forced-labor', 'supply-chain', 'customs'],
    sources: [
      { citation: 'Uyghur Forced Labor Prevention Act (Pub. L. 117-78)', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.congress.gov', note: 'Creates a rebuttable presumption that goods mined, produced or manufactured wholly or in part in the Xinjiang Uyghur Autonomous Region, or by an entity on the UFLPA Entity List, are made with forced labor and barred from entry.' },
      { citation: 'Tariff Act of 1930, section 307', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.congress.gov', note: 'The underlying prohibition on importing goods made with forced labor.' },
      { citation: 'UFLPA Strategy and UFLPA Entity List', authority: 'regulator', publisher: 'Forced Labor Enforcement Task Force, Department of Homeland Security', jurisdiction: 'us', url: 'https://www.dhs.gov', note: 'The Entity List is updated by Federal Register notice; the presumption applies to a listed entity from the date of publication.' },
      { citation: 'CBP forced labor enforcement operational guidance for importers', authority: 'guidance', publisher: 'U.S. Customs and Border Protection', jurisdiction: 'us', url: 'https://www.cbp.gov', note: 'Updated guidance was published in June 2026. It sets out what CBP expects in applicability reviews and exception requests. Confirmed as at 2026-09-16.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'energy-infrastructure', 'technology'],
    relatedSkills: ['us-ofac-export-screener', 'global-obligation-extraction', 'us-contract-obligation-tracker'],
    whatItDoes:
      'Runs the two workflows an importer needs under the UFLPA: proactive traceability, which maps a product’s bill of materials and supplier tiers down to raw inputs and screens every node against the Xinjiang region and the Entity List; and detention readiness, which assembles the evidence package CBP expects when a shipment is detained. It identifies where traceability breaks down, separates evidence that the presumption does not apply from evidence supporting an exception, and generates supplier questionnaires that ask for documents rather than assurances.',
    whenToUse:
      'When onboarding suppliers for goods in higher-risk sectors, when the Entity List is updated, before shipping goods containing inputs such as cotton, polysilicon, aluminium, PVC, tomatoes or other materials CBP has identified as priorities, and immediately on receipt of a detention notice. Not for: sanctions or export-control screening (use the OFAC and export screener) or modern slavery reporting outside the US.',
    inputs: [
      { name: 'Product and bill of materials', description: 'The imported product, its components and raw material inputs with quantities.', required: true },
      { name: 'Supplier map', description: 'Each supplier by tier with names, addresses and the inputs they provide.', required: true },
      { name: 'Traceability documents', description: 'Purchase orders, invoices, production records, shipping documents, mill certificates and chain-of-custody records held.' },
      { name: 'Detention notice', description: 'Any CBP detention notice, with its date and the information requested.' },
      { name: 'Existing diligence', description: 'Audits, certifications, supplier codes and prior screening results.' },
    ],
    outputs: [
      { name: 'Traceability map', description: 'The supply chain from finished good to raw input, with each node’s evidence status.' },
      { name: 'Screening results', description: 'Each node screened against the Xinjiang region and the current Entity List, with the date checked.' },
      { name: 'Evidence gap analysis', description: 'Where the documentary chain breaks, and what would close each gap.' },
      { name: 'Supplier questionnaire', description: 'A document-request questionnaire for suppliers at each tier.' },
      { name: 'Detention response package', description: 'The applicability-review or exception evidence structure and the response timeline.' },
      { name: 'Lawyer review list', description: 'Decisions requiring customs counsel, including whether to seek an exception.' },
    ],
    prompt: `You are a US customs and trade compliance lawyer assessing a supply chain under the Uyghur Forced Labor Prevention Act.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- UFLPA rebuttable presumption covering goods made wholly or in part in the Xinjiang Uyghur Autonomous Region or by an entity on the UFLPA Entity List [CONFIRMED, dhs.gov and cbp.gov].
- An importer seeking an exception must fully comply with the UFLPA Strategy guidance, respond completely to CBP requests, and show by clear and convincing evidence that the goods were not made with forced labor [CONFIRMED].
- On detention, an initial 30-day period, with up to two extensions not exceeding 90 calendar days in total from the detention notice [CONFIRMED per CBP FAQ; VERIFY against the notice received].
Guidance:
- CBP forced labor enforcement operational guidance for importers, updated June 2026 [CONFIRMED that it was published; VERIFY its specific evidence expectations before relying on them].
- The Entity List changes by Federal Register notice. Always screen against the current version and record the date checked.

INPUTS
- Product and bill of materials: <finished good, components, raw inputs, quantities>
- Supplier map: <each supplier by tier: legal name, address, inputs supplied>
- Traceability documents: <what is held for each node>
- Detention notice: <date, entry number, information requested — or "none">
- Existing diligence: <audits, certifications, codes, prior screening>

TASK
1. SCOPE GATE. Confirm the goods are imported or intended for import into the United States. If the question is sanctions or export control, stop and redirect. If a detention notice has been received, move the detention workflow to the front and calculate its dates first.
2. MISSING INFORMATION. Identify missing tiers, missing supplier identities and missing documents. Treat an unknown upstream supplier for a higher-risk input as an open risk, not as a clean result.
3. TRACEABILITY MAP. Map the chain from the finished good down to raw inputs, one node per supplier and input. For each node, record the documentary evidence held: purchase orders, invoices, production and inventory records, transport documents, and chain-of-custody records showing that the specific input used came from the stated source. Distinguish documents that trace the specific goods from general supplier declarations.
4. SCREENING. Screen every node against the Xinjiang region and the current Entity List. Record the date and version of the list checked. Flag related entities and parent or subsidiary relationships that the list may capture. Flag inputs CBP has identified as enforcement priorities [VERIFY the current priority sectors].
5. EVIDENCE GAP ANALYSIS. Identify where the chain breaks — commingled inputs, missing mill-level records, traders or intermediaries who will not disclose sources, or a supplier's declaration unsupported by documents. For each gap, state what would close it and how realistic that is.
6. SUPPLIER QUESTIONNAIRE. Generate a questionnaire per tier that requests documents — source of each input, production records, transport records, and disclosure of sub-suppliers — rather than attestations of compliance. Note that an attestation alone does not meet the evidentiary standard.
7. DETENTION RESPONSE. If a shipment is detained:
   a. Calculate the response dates from the notice and record any extension requests.
   b. Decide which route the evidence supports. An applicability review argues that the goods are not subject to the presumption at all because they have no nexus to the region or to a listed entity. An exception request accepts that the presumption applies and seeks to rebut it by clear and convincing evidence that forced labor was not used. State that these are different arguments requiring different evidence, and that an exception also requires full compliance with the Strategy guidance and complete responses to CBP.
   c. Structure the evidence package in the order CBP expects [VERIFY against current operational guidance]: supply chain tracing, supplier information, due diligence system, and evidence addressing forced labor indicators.
8. DUE DILIGENCE SYSTEM. Assess whether the importer's system would support an exception: risk assessment, supplier mapping, training, monitoring, remediation and recordkeeping. Identify what is missing.
9. LAWYER REVIEW TRIGGERS. Escalate: any detention; any node with a nexus to the region or a listed entity; any decision between an applicability review and an exception request; any plan to re-export or abandon detained goods; and any supplier refusing to disclose sources.

RULES
- Never treat a supplier attestation as sufficient evidence.
- Record the date and version of every Entity List check.
- Label each item STATUTE, AGENCY LIST, CBP GUIDANCE or BEST PRACTICE.
- Do not describe a chain as clean where any tier for a higher-risk input is unknown.
- Keep the applicability review and exception routes distinct.

OUTPUT FORMAT
Open with any detention deadline, then the overall traceability conclusion and the highest-risk node. Then the sections above, with the traceability map and screening results as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'An apparel importer receives a detention notice for cotton garments sourced through a trading company that cannot name the spinning mill.',
      result:
        'Detention dates calculated with the extension limit noted, the chain mapped to the trading company with the spinning and ginning tiers unknown and flagged as an open risk rather than a clean result, the supplier declarations assessed as attestations insufficient for the evidentiary standard, the applicability-review route found unsupported without mill records, an exception request structured with the evidence gaps it would need to close, and document-request questionnaires generated for each missing tier.',
    },
  },
  {
    id: 'us-state-breach-notification-matrix',
    name: 'State Breach Notification Matrix',
    description: 'Builds a state-by-state matrix of who must be notified, by when and with what content after a data incident.',
    jurisdiction: 'us',
    category: 'privacy',
    tags: ['incident-response', 'assessment', 'data-protection', 'state-law', 'deadlines', 'notice'],
    sources: [
      { citation: 'State data breach notification statutes (each state, the District of Columbia and the US territories)', authority: 'primary', publisher: 'US states and territories', jurisdiction: 'us', note: 'There is no general federal breach notification statute. Each statute sets its own definition of personal information, trigger, deadline, regulator notice and content, and statutes are amended often. This skill states none of them as settled; supply the statute text where you can.' },
      { citation: 'Sector breach rules that may apply alongside or instead (for example HIPAA, rules under the Gramm-Leach-Bliley Act, and the FTC Health Breach Notification Rule)', authority: 'regulator', jurisdiction: 'us', note: 'Many state statutes deem compliance with a federal regime sufficient or exempt regulated entities. Whether that applies is a question to resolve per state and per regime.' },
      { citation: 'National Conference of State Legislatures — security breach notification law tracking', authority: 'secondary', publisher: 'National Conference of State Legislatures', jurisdiction: 'us', url: 'https://www.ncsl.org', note: 'A starting point for locating each statute. Not a substitute for reading the current statute text.' },
    ],
    lastReviewed: '2026-11-05',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-hipaa-baa-breach-assessor', 'us-sec-cyber-8k-materiality-triage', 'uk-gdpr-breach-assessor', 'us-cppa-risk-admt-cyber-compliance', 'au-privacy-ndb-assessor'],
    whatItDoes:
      'Takes the facts of a personal data incident and the states where affected individuals live, and builds a matrix of notification duties: whether each state’s trigger is met on these facts, who must be notified (individuals, a state regulator, consumer reporting agencies), by when and from which starting event, how, and with what content. It works from the data elements actually involved, encryption status, the harm threshold each state applies, and who owns the data. Because the statutes change and the model may misremember them, every cell is marked either as drawn from statute text you supplied or as from memory and to be verified, and the earliest hard deadline is surfaced first.',
    whenToUse:
      'When a security incident or misdirected disclosure may involve US residents’ personal information and counsel needs to plan notification across states quickly. Also for tabletop exercises and for refreshing a notification playbook. It supports the notification analysis; it does not decide whether an incident is a breach for other regimes, whether to pay a ransom, or whether securities disclosure is required.',
    inputs: [
      { name: 'Incident facts', description: 'What happened, dates of the incident, discovery and confirmation, systems and data involved, and whether the data was acquired or only accessible.', required: true },
      { name: 'Affected individuals by state', description: 'Counts of affected individuals by state or territory of residence, and the data elements involved for each group.', required: true },
      { name: 'Data ownership and role', description: 'Whether the organisation owns or licenses the data or only maintains it for another, and any contract duties to notify the owner.', required: true },
      { name: 'Encryption and mitigation', description: 'Whether the data was encrypted and whether the key or credentials were compromised; steps taken since.' },
      { name: 'Regulatory status', description: 'Whether the organisation is a HIPAA covered entity or business associate, a financial institution or otherwise subject to a federal or sector regime.' },
      { name: 'Statute extracts', description: 'Current statute text for any state in scope. The more supplied, the less is drawn from memory.' },
      { name: 'Law enforcement', description: 'Whether law enforcement has requested a delay in notification, and in writing.' },
    ],
    outputs: [
      { name: 'Trigger analysis', description: 'For each state, whether the data elements, access or acquisition standard and harm threshold are met on these facts, with the reason.' },
      { name: 'Notification matrix', description: 'Per state: individuals, regulators and consumer reporting agencies to notify, deadline, trigger event for the clock, method and content.' },
      { name: 'Deadline schedule', description: 'All notices ordered by earliest hard deadline, with the date calculated from the stated starting event.' },
      { name: 'Content checklist', description: 'The union of content each notice must or may contain, with state-specific additions.' },
      { name: 'Sequencing and ownership plan', description: 'Order of notices, who sends them, third-party-to-owner notices, and dependencies such as law-enforcement delay.' },
      { name: 'Lawyer review list', description: 'Points that need counsel before notices go out.' },
    ],
    prompt: `You are a US privacy and incident-response lawyer building a multi-state breach notification analysis.

CURRENT-LAW STATUS (as drafted 2026-11-05 — confirm each point before relying on it)
- Notification duties are state statutes with no federal general rule. Definitions, triggers, deadlines, regulator thresholds and content differ, and amendments are frequent [VERIFY every statute against its current text].
- Where the user supplies statute text, work from that text. Where they do not, anything stated about a state comes from general knowledge and must be marked FROM MEMORY — VERIFY.

INPUTS
- Incident: <what happened; incident, discovery and confirmation dates; systems and data; acquired or only accessible>
- Individuals by state: <counts by state or territory of residence; data elements involved per group>
- Data role: <owns or licenses the data, or maintains it for another; any contract notification duty>
- Encryption and mitigation: <encrypted or not; key or credentials compromised; steps taken>
- Regulatory status: <HIPAA, financial institution, other sector regime>
- Statute extracts: <current text for any state in scope>
- Law enforcement: <any request to delay, and whether in writing>

TASK
1. SCOPE GATE. Confirm this is a notification-duty analysis. If asked whether to notify when no statute is triggered, whether to pay a ransom, or whether securities disclosure is needed, state that these are separate questions and do not answer them.
2. MISSING INFORMATION. List the facts you need and cannot see, in order of how much they change the result: residency counts, data elements, acquisition versus access, encryption and key status, and the date of discovery. Do not assume any.
3. TRIGGER ANALYSIS. For each state with affected residents, test: (a) whether the data elements meet that state’s definition of personal information, including whether online account credentials, medical, biometric or other categories are covered; (b) the unauthorised access or acquisition standard; (c) any encryption exception and whether it is lost if the key was compromised; (d) any risk-of-harm threshold and who decides; (e) any exemption for entities complying with a federal or sector regime. Give the reason for each conclusion.
4. DATA OWNER AND SERVICE PROVIDER. If the organisation only maintains the data, identify the duty to notify the owner or licensee, the timing, and which party notifies individuals. Check contracts for earlier or stricter duties.
5. MATRIX. For each state where the trigger is met or may be met, state: individual notice required (yes, no, depends and why); deadline (a fixed number of days or a general standard such as without unreasonable delay) and the event that starts the clock (discovery, determination or notice to the owner); regulator notice (which office, whether a threshold of affected residents applies, and the deadline); consumer reporting agency notice (and its threshold); permitted methods including substitute notice; mandatory content; and any offer of credit monitoring or identity protection required. Mark the source of each cell: STATUTE SUPPLIED, or FROM MEMORY — VERIFY.
6. DEADLINES. Calculate each date from the stated starting event and show the arithmetic. Where a statute uses an indefinite standard, do not convert it into a number of days; state that the standard applies and recommend treating the shortest fixed deadline in any affected state as the practical planning date, labelled as a recommendation.
7. LAW ENFORCEMENT DELAY. Identify states that allow delay for a law enforcement request, what form the request must take, and that the clock resumes when the delay ends.
8. CONTENT. Build a content checklist from the union of requirements, marking state-specific additions, and note any state that prohibits including certain information.
9. SEQUENCING. Propose an order of notices, who sends each, and what must precede what, such as owner notice before individual notice and regulator notice at or before individual notice where a statute requires.
10. LAWYER REVIEW TRIGGERS. Escalate: any HIPAA or financial-sector overlap; incidents involving minors, health or biometric data; any state where fewer than the full facts are known; any deadline that has passed or falls within three business days; ransomware or extortion; and any contractual duty with a deadline shorter than the statutory one.

RULES
- Never state a state’s deadline, threshold or definition as fact unless it is quoted from supplied statute text. Otherwise mark it FROM MEMORY — VERIFY.
- Never treat a state as not triggered because you cannot recall its statute; mark it [UNKNOWN] and include it in the lawyer review list.
- Residency of the affected individual, not the organisation’s location, determines which statute applies.
- Do not draft any statement that downplays the incident or states a cause that the facts do not support.
- Do not advise delaying notice other than on a law enforcement request that meets the statute.

OUTPUT FORMAT
Open with the earliest hard deadline, the states where it applies, and any notice that may already be late. Then the missing-information list, the trigger analysis, the matrix as a table (State | Triggered | Individuals | Regulator | CRAs | Deadline and clock start | Method | Content | Source of cell), the deadline schedule, the content checklist, the sequencing plan and the lawyer review list. Close with: Assumptions made; [VERIFY] points.`,
    example: {
      scenario:
        'A retailer’s e-commerce vendor reports unauthorised access to a database holding names, email addresses and payment card numbers for 48,000 customers across 31 states, with no encryption of the card fields.',
      result:
        'A matrix covering all 31 states with the triggered ones identified, a deadline schedule led by the shortest fixed-day state, four states needing regulator notice at the stated counts, owner-notice steps because the vendor holds the data, a content checklist with the state-specific additions, and a lawyer review list that includes the payment card brand obligations as outside the matrix.',
    },
  },
  {
    id: 'us-fcpa-third-party-risk-reviewer',
    name: 'FCPA Third-Party Risk Reviewer',
    description: 'Rates the foreign bribery risk of an agent, distributor or partner, resolves red flags and drafts contract controls.',
    jurisdiction: 'us',
    category: 'compliance',
    tags: ['assessment', 'third-party-risk', 'due-diligence', 'anti-corruption', 'programme-design', 'fcpa'],
    sources: [
      { citation: 'Foreign Corrupt Practices Act of 1977', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.justice.gov', note: 'Anti-bribery provisions apply to issuers, domestic concerns and certain persons acting in the US; accounting provisions apply to issuers. Liability for payments through third parties turns on knowledge, which includes conscious disregard of obvious red flags.' },
      { citation: 'A Resource Guide to the U.S. Foreign Corrupt Practices Act', authority: 'guidance', publisher: 'US Department of Justice and Securities and Exchange Commission', jurisdiction: 'us', url: 'https://www.sec.gov', note: 'Joint agency guidance on the statute, third-party risk and compliance programme expectations. Non-binding.' },
      { citation: 'Evaluation of Corporate Compliance Programs', authority: 'guidance', publisher: 'US Department of Justice, Criminal Division', jurisdiction: 'us', url: 'https://www.justice.gov', note: 'The questions prosecutors ask about third-party management, including risk-based diligence, business rationale, contract controls and ongoing monitoring. Revised periodically.' },
      { citation: 'DOJ guidelines for FCPA investigations and enforcement (June 2025) and later enforcement policy', authority: 'guidance', publisher: 'US Department of Justice', jurisdiction: 'us', url: 'https://www.justice.gov', note: 'Narrowed enforcement priorities in 2025. The statute and its limitation periods are unchanged by policy; current enforcement posture and any later changes are [VERIFY].' },
    ],
    lastReviewed: '2026-11-05',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-bribery-act-reviewer', 'us-ofac-export-screener', 'global-due-diligence-review', 'uk-failure-to-prevent-fraud'],
    whatItDoes:
      'Takes a profile of a third party that will act for a US-nexus company abroad — a sales agent, distributor, customs broker, consultant, reseller or joint venture partner — and rates the corruption risk it presents. It identifies where the third party will touch foreign officials (including employees of state-owned enterprises), tests the engagement for red flags, tiers the due diligence required, logs how each red flag is resolved or left open, drafts contract protections and payment controls, and sets monitoring. Its core discipline is the knowledge standard: an unresolved red flag cannot be put aside, so the output separates flags resolved on evidence from flags merely explained.',
    whenToUse:
      'Before engaging or renewing an intermediary in a higher-risk market or one that will deal with customs, licensing, tax or government customers; when a distributor proposes a new territory or unusual commission; and when an acquisition brings in a portfolio of third parties. Not for investigating suspected payments, which should go to counsel immediately, and not a conclusion that any payment is lawful.',
    inputs: [
      { name: 'Third-party profile', description: 'Name, ownership, location, role, services, and how it was introduced or recommended.', required: true },
      { name: 'Engagement terms', description: 'Scope, compensation, commission or success fees, payment mechanics and bank details, and sub-agent use.', required: true },
      { name: 'Government touchpoints', description: 'Whether the third party will deal with officials, regulators, customs, licensing or state-owned customers, and for what.', required: true },
      { name: 'Country and sector context', description: 'Where the work happens and the sector, with any country risk rating your own programme uses.' },
      { name: 'Diligence collected', description: 'Questionnaire, ownership documents, references, media and litigation checks and interview notes.' },
      { name: 'Issuer status', description: 'Whether the company is an issuer, since accounting provisions apply to issuers.' },
    ],
    outputs: [
      { name: 'Risk rating and rationale', description: 'A tiered rating built from stated factors, with the working shown.' },
      { name: 'Red-flag resolution log', description: 'Each flag, the explanation sought, the evidence obtained and whether it is resolved, explained only or open.' },
      { name: 'Diligence plan', description: 'The steps required for the tier, what is done and what remains.' },
      { name: 'Contract controls', description: 'Drafted representations, audit and termination rights, payment terms and certification wording.' },
      { name: 'Payment and monitoring controls', description: 'Payment-approval conditions, books-and-records points and ongoing monitoring triggers.' },
      { name: 'Escalation list', description: 'Matters to put to counsel or compliance before proceeding.' },
    ],
    prompt: `You are a US anti-corruption compliance lawyer reviewing a third-party engagement under the Foreign Corrupt Practices Act.

CURRENT-LAW STATUS (as drafted 2026-11-05 — confirm each point before relying on it)
- The statute is unchanged. In 2025 the Department of Justice issued guidelines narrowing enforcement priorities after a pause in new investigations. Enforcement posture can change; the statute and its limitation periods continue to apply, and other authorities, including the SEC and foreign enforcers, may act [VERIFY the current posture; this draft did not confirm any 2026 development].
- Do not treat narrower enforcement priorities as a reason to loosen diligence.

INPUTS
- Third party: <name, ownership, location, role, how introduced>
- Engagement: <services, compensation, success fees, payment mechanics and accounts, sub-agents>
- Government touchpoints: <officials, customs, licensing, tax, state-owned customers; for what purpose>
- Country and sector: <where the work occurs; sector; the programme’s own country risk rating if any>
- Diligence collected: <questionnaire, ownership, references, checks, interview notes>
- Issuer status: <issuer or not>

TASK
1. SCOPE GATE. Confirm this is a pre-engagement or renewal risk review. If the user describes a payment already made or requested that may be improper, stop the analysis, say that the matter should go to counsel at once, and do not draft around it.
2. MISSING INFORMATION. List what you need and cannot see. Treat missing ownership information or an unexplained introduction as a finding, not a gap to fill.
3. TOUCHPOINTS. Identify each point where the third party will interact with a foreign official, defining official broadly: government employees, employees of state-owned or state-controlled enterprises, political party officials, candidates and public international organisation staff. State what the third party will ask the official to do.
4. RED FLAGS. Test the engagement against a comprehensive list: introduction or recommendation by an official or a customer; compensation above market or unusual success fees; vague scope; lack of relevant capability or staff; payment to a third country, a different entity or in cash; refusal to give compliance representations; opaque or nominee ownership; official ownership or family connections; requests for urgent or off-contract payments; a history of allegations; and use of sub-agents. For each flag present, say what evidence would resolve it.
5. KNOWLEDGE STANDARD. Explain, in the specific facts, why an unresolved flag cannot be ignored: knowledge includes awareness of a high probability, and deliberately avoiding confirmation. Mark each flag RESOLVED ON EVIDENCE, EXPLAINED ONLY (statement without evidence) or OPEN.
6. RISK RATING. Build a rating from stated factors — role, touchpoints, country and sector context, compensation structure, red flags, ownership transparency — and show the working. Do not invent a country score; use the user’s rating or mark it [UNKNOWN].
7. DILIGENCE PLAN. For the tier, list proportionate steps: questionnaire, ownership and beneficial owner verification, official-affiliation checks, references, adverse media and litigation searches, sanctions screening (refer to the sanctions skill), an interview, and a reasonableness benchmark for compensation. Show what is done, what is outstanding and what must be completed before signature.
8. CONTRACT CONTROLS. Draft: anti-corruption representations and covenants; compliance-programme and training undertakings; audit and books-and-records access; prior approval for sub-agents; payment only against documented services, to an account in the third party’s name in the country of performance or incorporation, without cash; notification duties; termination and withholding rights; and annual certification.
9. PAYMENT AND ACCOUNTING CONTROLS. List pre-payment checks, descriptions that must be specific rather than generic, and, if the company is an issuer, the books-and-records and internal-controls points to cover.
10. MONITORING. Set triggers for re-review: change of ownership or scope, payment anomalies, new government contact, adverse media, and a fixed recertification interval.
11. ESCALATION. List matters for counsel or the compliance function: any OPEN flag on a high-tier engagement, official ownership, requests for unusual payments, facilitation-payment questions, gifts and hospitality, parallel UK Bribery Act exposure (no facilitation exception and a commercial bribery offence), and local-law issues.

RULES
- Never conclude that a payment, engagement or arrangement is permitted under the statute. Identify the risk and the controls; route the legal conclusion to counsel.
- Never discount a flag because the third party offers an explanation. An explanation without evidence is EXPLAINED ONLY.
- Do not invent diligence results, ownership details or country ratings.
- The narrow exception for routine governmental action is not a safe route; treat any facilitation-payment question as an escalation.
- Mark any limitation period, penalty or enforcement statement [VERIFY].

OUTPUT FORMAT
Open with the risk tier, whether the engagement can proceed, and what must be completed first. Then missing information, touchpoints, the red-flag resolution log as a table (Flag | Present | Explanation sought | Evidence | Status), the rating working, the diligence plan, contract controls as draft clauses, payment controls, monitoring triggers and escalations. Close with: Assumptions made; [VERIFY] points; Items for counsel.`,
    example: {
      scenario:
        'A US medical device maker with an SEC listing wants to appoint a distributor in a market where hospitals are state-owned; the distributor was recommended by a hospital procurement director and asks for a 30 percent commission paid to an account in a third country.',
      result:
        'A high-risk rating with the working shown, three red flags (official recommendation, above-market commission, third-country account) logged as OPEN, a diligence plan that must be completed before signature, drafted contract controls and a payment-account condition, accounting provisions noted because the company is an issuer, and an escalation list that includes the official’s role in the introduction.',
    },
  },
  {
    id: 'us-health-kickback-stark-screener',
    name: 'Kickback and Stark Law Screener',
    description: 'Screens healthcare referral and compensation arrangements against the Anti-Kickback Statute and the Stark Law.',
    jurisdiction: 'us',
    category: 'regulatory',
    tags: ['screening', 'assessment', 'healthcare', 'fraud-and-abuse', 'referrals', 'remediation'],
    sources: [
      { citation: 'Federal Anti-Kickback Statute', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://oig.hhs.gov', note: 'Criminal prohibition on knowingly and willfully offering or paying remuneration to induce or reward referrals of federal health care programme business. Intent-based; a safe harbour is voluntary protection, and failing one does not make an arrangement unlawful.' },
      { citation: 'Physician Self-Referral Law (Stark Law)', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.cms.gov', note: 'Prohibits a physician’s referral of Medicare designated health services to an entity with which the physician or an immediate family member has a financial relationship, unless an exception is fully met, and prohibits billing for the referred services. Strict liability: intent is not an element.' },
      { citation: 'Anti-Kickback safe harbour regulations and Stark exceptions and definitions', authority: 'regulator', publisher: 'HHS Office of Inspector General and Centers for Medicare & Medicaid Services', jurisdiction: 'us', url: 'https://oig.hhs.gov', note: 'The operative conditions a compensation or space arrangement must meet. Amended periodically, including for value-based arrangements. Read the current text.' },
      { citation: 'False Claims Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.justice.gov', note: 'Claims tainted by a kickback violation can be false claims; this is the main route to large exposure. Not analysed here beyond flagging.' },
      { citation: 'OIG advisory opinions and CMS and OIG self-disclosure protocols', authority: 'guidance', publisher: 'HHS OIG and CMS', jurisdiction: 'us', url: 'https://oig.hhs.gov', note: 'Persuasive on how the agencies read specific arrangements and on remediation routes. Advisory opinions bind only the requesting parties.' },
    ],
    lastReviewed: '2026-11-05',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['healthcare'],
    relatedSkills: ['us-hipaa-baa-breach-assessor', 'us-regulatory-investigation-response', 'us-contract-obligation-tracker'],
    whatItDoes:
      'Takes an arrangement between a healthcare provider or supplier and a referral source — a medical director agreement, a lease, a physician employment or services contract, a joint venture, a free-goods or discount scheme — and screens it under the two statutes in the right order. It first maps who refers what to whom and what value flows each way, then tests the Stark Law as a strict-liability question with exceptions that must be met in full, then tests the Anti-Kickback Statute for intent indicators and safe-harbour fit. It lists the documentation gaps that decide the outcome, such as a missing signature or no fair-market-value support, and recommends remediation and escalation. It never concludes that an arrangement complies.',
    whenToUse:
      'Before signing or renewing any arrangement where a physician or other referral source is paid, rents space or equipment, holds an ownership interest or receives goods or services; during a contract inventory or compliance audit; and after an acquisition that brings in legacy arrangements. Not for deciding whether to self-disclose, which belongs to counsel.',
    inputs: [
      { name: 'Arrangement documents', description: 'The agreement, amendments, schedules, side letters and any expired or holdover terms.', required: true },
      { name: 'Parties and roles', description: 'Who the physicians and entities are, who refers to whom, and whether family members are involved.', required: true },
      { name: 'Services and billing', description: 'The services furnished, whether they are designated health services, and whether Medicare, Medicaid or other federal programmes are billed.', required: true },
      { name: 'Compensation and value flows', description: 'How compensation is set, any link to volume or value of referrals or other business, and non-cash benefits.' },
      { name: 'Valuation and need support', description: 'Fair-market-value opinions, comparables, time records and evidence of commercial need.' },
      { name: 'Execution history', description: 'Dates signed, term, renewal and any period of performance without a signed agreement.' },
    ],
    outputs: [
      { name: 'Value-flow and referral map', description: 'Who refers what to whom, and what of value passes in each direction.' },
      { name: 'Stark analysis', description: 'Threshold questions, financial relationship, and which exception is the candidate, with each element met, not met or unknown.' },
      { name: 'Anti-Kickback analysis', description: 'Remuneration, intent indicators and safe-harbour fit with each element assessed.' },
      { name: 'Documentation gap list', description: 'What is missing or defective and the effect of each gap.' },
      { name: 'Risk tier and remediation steps', description: 'A rating with reasoning and the steps to correct or restructure, in order.' },
      { name: 'Escalation list', description: 'Matters for health care counsel, including possible disclosure questions.' },
    ],
    prompt: `You are a US health care regulatory lawyer screening an arrangement under the Anti-Kickback Statute and the Stark Law.

CURRENT-LAW STATUS (as drafted 2026-11-05 — confirm each point before relying on it)
- Both statutes are federal, and regulators amend the safe harbours and exceptions, including for value-based arrangements. Read the current regulatory text for the date of the arrangement [VERIFY].
- State fraud-and-abuse and anti-kickback laws, which can reach non-federal payers, and special regimes such as the federal law on laboratory, recovery home and treatment facility referrals, are outside this screen and must be flagged.

INPUTS
- Arrangement: <agreement, amendments, schedules, side letters, expired or holdover terms>
- Parties and roles: <physicians, entities, who refers to whom, family relationships>
- Services and billing: <services furnished, designated health services, federal programme billing>
- Compensation and value flows: <how set; any link to referrals or other business; non-cash benefits>
- Support: <fair-market-value opinions, comparables, time records, commercial need>
- Execution history: <dates signed, term, renewals, any period without a signed agreement>

TASK
1. SCOPE GATE. Confirm this is a screening exercise. If asked whether an arrangement is lawful or whether to disclose to the government, say that these require counsel and provide only the screening below.
2. MISSING INFORMATION. List what you need and cannot see, in order of effect on the outcome: the signed agreement, how compensation is calculated, the identity of referral sources, and whether federal programme business is involved.
3. VALUE-FLOW MAP. Describe who can refer federal programme business to whom, and everything of value passing between the parties in both directions, including cash, space, equipment, staff, discounts, free items, loans and ownership returns. Include indirect flows through related entities.
4. STARK THRESHOLDS, IN ORDER. Ask: (a) is there a physician, or an immediate family member of a physician; (b) does the entity furnish designated health services payable by Medicare; (c) is there a financial relationship, whether ownership or investment or a compensation relationship, direct or indirect; (d) is there a referral. If any answer is no, say what that means and what remains uncertain. If all are yes, the arrangement is prohibited unless an exception is fully met; intent is irrelevant.
5. STARK EXCEPTION FIT. Identify the candidate exception, such as for employment, personal services, fair-market-value compensation or rental of office space or equipment, and test each element against the documents: writing, signature, duration, specification of the services or space, fair market value, compensation not determined by volume or value of referrals, and commercial reasonableness without regard to referrals. Mark each element MET, NOT MET or UNKNOWN. Note any special rule for expired or unsigned arrangements and mark it [VERIFY].
6. ANTI-KICKBACK ANALYSIS. Identify any remuneration, and indicators that one purpose may be to induce or reward referrals: pay varying with referrals or other business generated, payment above or below fair market value, payment for services not needed or not performed, free or discounted items to a referral source, and targeting of high referrers. Test the candidate safe harbour element by element and mark each MET, NOT MET or UNKNOWN. State plainly that failing a safe harbour is not itself a violation, and that the facts and intent decide.
7. DOCUMENTATION GAPS. List defects: unsigned or late-signed agreements, missing term, no fair-market-value support, payment without a record of services, compensation formulas not in writing, and agreements that lapsed while payments continued.
8. RISK TIER. Rate the arrangement and show the reasoning. Distinguish Stark exposure (strict liability) from Anti-Kickback exposure (intent) and from False Claims Act consequences, flagged but not analysed.
9. REMEDIATION. Order the steps: stop or suspend payments or referrals if counsel advises, correct documentation prospectively, obtain independent valuation, restructure compensation, and gather evidence of services. Do not advise backdating or back-filling documents. Note that correcting a past violation may require a disclosure decision, which belongs to counsel.
10. ESCALATION. List matters for health care counsel: any Stark threshold answered yes with an exception not clearly met, referral-linked pay, physician ownership, prior payments under a defective arrangement, family-member relationships, and questions about disclosure.

RULES
- Never conclude that an arrangement complies with either statute. State what is met, not met and unknown.
- Never opine on fair market value or compute it; identify what independent support is needed.
- Do not suggest altering, backdating or recreating documents. Recommend preserving all existing records.
- Do not treat a safe harbour or exception as optional detail; each element must be tested.
- Mark any statement about thresholds, special rules or penalties [VERIFY].

OUTPUT FORMAT
Open with the risk tier, the single most serious gap and whether payments or referrals should pause pending counsel. Then missing information, the value-flow map, the Stark analysis, the Anti-Kickback analysis, a table of elements (Element | Requirement | Status | Evidence), the documentation gap list, remediation steps and escalations. Close with: Assumptions made; [VERIFY] points; Items for health care counsel.`,
    example: {
      scenario:
        'A hospital pays a cardiologist a monthly medical director fee under an agreement that expired 14 months ago, with the fee recently increased after the cardiologist’s admissions to the hospital rose.',
      result:
        'A Stark analysis finding all thresholds met and the personal services exception not clearly met (term expired, no signed agreement, no fair-market-value support), an Anti-Kickback analysis flagging pay that rose with admissions as an intent indicator, a documentation gap list, remediation steps that preserve existing records and avoid backdating, and an escalation to counsel on the payments made during the lapse.',
    },
  },
];
