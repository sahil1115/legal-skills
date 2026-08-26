import type { Skill } from '../../../types/skill';

/**
 * US enterprise legal operations skills — running a regulatory matter as a
 * workstream, and tracking contractual obligations once they are extracted.
 */
export const usLegalOpsSkills: Skill[] = [
  {
    id: 'us-regulatory-investigation-response',
    name: 'Regulatory Investigation Response Assistant',
    description: 'Turns regulatory correspondence into a scoped response workstream with owners and deadlines.',
    jurisdiction: 'us',
    category: 'regulatory',
    tags: ['regulatory-change', 'programme-design', 'investigations', 'enforcement', 'legal-ops', 'incident-response', 'escalation'],
    sources: [
      { citation: 'Agency organic statutes and rules conferring investigative authority', authority: 'primary', jurisdiction: 'us', note: 'Each agency’s power to demand information, the recipient’s options and the consequences of non-compliance come from that agency’s own statute and rules. Identify the authority before assessing any obligation.' },
      { citation: 'Federal agency enforcement and investigation procedures', authority: 'regulator', publisher: 'US Department of Justice', jurisdiction: 'us', url: 'https://www.justice.gov', note: 'Agencies publish their own investigation and enforcement procedures. These describe agency practice and expectations; they are not always binding law, and they change.' },
      { citation: 'Attorney-client privilege and work product doctrine as applied in investigations', authority: 'primary', jurisdiction: 'us', note: 'Privilege in an internal investigation depends on how it is structured from the first day. Doctrine differs between federal and state forums and between agencies’ expectations.' },
      { citation: 'State attorney general investigative authority', authority: 'primary', jurisdiction: 'us', note: 'State attorneys general investigate under their own statutes with their own process and timelines, often in parallel with federal agencies. Treat each as a separate matter.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-litigation-hold-builder', 'us-privilege-log-builder', 'us-subpoena-triage'],
    whatItDoes:
      'Takes regulatory correspondence — a competition or consumer agency enquiry, a securities enforcement letter, a prosecutor’s request, an employment agency charge, a state attorney general demand, or a sector regulator’s letter — and converts it into a managed workstream. It establishes the authority and the scope, builds the deadline map, identifies custodians and the preservation steps that cannot wait, sets the privilege architecture before anyone starts interviewing, and produces the workstream plan with owners. It deliberately does not draft a substantive response: the position on the merits comes after the authority and the facts are established, not before.',
    whenToUse:
      'When any regulatory enquiry, enforcement letter, charge or investigative demand arrives, when a matter escalates from informal contact to formal process, or when several agencies are looking at the same conduct.',
    inputs: [
      { name: 'The correspondence', description: 'The full text of the letter, demand, charge or notice, with all schedules and enclosures.', required: true },
      { name: 'Receipt and history', description: 'When it arrived, how, to whom, and every prior contact with this authority on this subject.', required: true },
      { name: 'Business context', description: 'What the organisation does, the products, markets or practices the enquiry appears to touch, and the entities involved.', required: true },
      { name: 'Known facts', description: 'What the organisation already knows about the underlying subject matter, including any internal review already done.' },
      { name: 'Parallel matters', description: 'Other regulators, litigation, holds, insurance notifications or press interest concerning the same subject.' },
      { name: 'Resources', description: 'Who is available internally, whether outside counsel is engaged, and any budget or timing constraint.' },
    ],
    outputs: [
      { name: 'Authority and posture assessment', description: 'Which authority, under what power, at what stage, and what the correspondence does and does not reveal.' },
      { name: 'Scope map', description: 'The subject matter, time period, entities and products in issue, with the boundaries and the ambiguities named.' },
      { name: 'Deadline map', description: 'Every stated and implied date, with what is fixed and what is customarily negotiated.' },
      { name: 'Request breakdown', description: 'Each request restated, with the effort, owner and difficulty of each.' },
      { name: 'Custodian and preservation plan', description: 'Who holds relevant material and what must be preserved today.' },
      { name: 'Privilege architecture', description: 'How the internal work is structured to protect privilege, decided before work begins.' },
      { name: 'Response workstream plan', description: 'Workstreams with owners, dependencies and a critical path to the deadline.' },
      { name: 'Escalation and notification map', description: 'Who inside and outside the organisation needs to know, and what other obligations are triggered.' },
      { name: 'Open questions', description: 'What must be decided by counsel or the board before the response takes shape.' },
    ],
    prompt: `You are an in-house counsel running the response to a regulatory investigation as a programme. Your output is the plan, not the answer to the regulator. Do not draft a substantive response, and do not characterise the organisation's position on the merits until the authority and the facts are established.

INPUTS
- The correspondence: <paste the full text, including schedules, definitions, instructions and any enclosures>
- Receipt and history: <date and method of receipt; who received it; every prior contact with this authority on this subject, formal or informal>
- Business context: <what we do; the products, markets, practices or conduct the enquiry appears to touch; the entities involved and their relationships>
- Known facts: <what we already know about the subject matter; any internal review already conducted and how it was structured>
- Parallel matters: <other regulators, litigation, holds, insurance notifications, press interest, whistleblower reports>
- Resources: <internal team available; outside counsel engaged or not; budget and timing constraints>

TASK
1. AUTHORITY AND POSTURE. Identify the issuing authority precisely, the statutory or regulatory power it invokes on the face of the document, and the stage the matter is at — informal enquiry, formal investigation, charge, or enforcement action. Say whether responding is compulsory or apparently voluntary, and what the consequences of each course appear to be. Assess from the document alone whether the organisation appears to be a target, a subject or a third party, with a confidence marker. State clearly what the correspondence does NOT reveal, because the unstated scope is usually the important part.
2. SCOPE MAP. From the document, establish the subject matter, the time period, the entities, the products or practices, and the geography in issue. Unpack every defined term and say what it actually reaches. Identify each place where the scope is ambiguous and could be read narrowly or broadly, and say which reading you have assumed and why. Flag any indication that the stated scope is narrower than the real interest.
3. DEADLINE MAP. Every date stated in the document and every date implied by it, with the calculation from the receipt date shown and the counting convention marked [VERIFY]. Separate deadlines that are fixed by statute or rule from those customarily extended by agreement, and say plainly which is which. Identify the earliest deadline and say what must start today to meet it.
4. REQUEST BREAKDOWN. Restate each request or allegation in plain terms. For each: what it is really asking for, which part of the business it touches, the estimated effort, the likely owner, and the principal difficulty (volume, age, systems no longer in use, third-party data, privilege, foreign data or blocking issues). Rank the requests by difficulty rather than by their order in the document.
5. CUSTODIAN AND PRESERVATION PLAN. Who is likely to hold relevant material and in which systems. State what must be preserved immediately, whether a hold must issue or expand today, and which short-retention or auto-deleting systems need attention now. This is the item that cannot wait for a considered response and cannot be remedied later.
6. PRIVILEGE ARCHITECTURE. Set this out before any fact-gathering begins, because it cannot be retrofitted. Address: who directs the internal review and in what capacity; how counsel's involvement is documented; how interviews are conducted and warnings given about who counsel represents; how findings and drafts are handled and labelled; the separation of legal advice from business analysis; the treatment of consultants and forensic providers and how they are engaged; and the risks around any material that may later be shared with the authority. State that privilege doctrine differs between forums and agencies and mark it [VERIFY]. Note that any decision to share privileged material has consequences beyond this matter and belongs to counsel and the board.
7. RESPONSE WORKSTREAM PLAN. Build the plan: workstreams (legal strategy, document collection and review, factual investigation, interviews, data and systems, external communications, regulator liaison), with an owner, a dependency and a delivery date for each, and a critical path to the earliest deadline. Include the engagement of outside counsel and any specialist provider as an early item where warranted. Identify the decision points and who makes each.
8. ESCALATION AND NOTIFICATION MAP. Who inside the organisation must be told and when — general counsel, chief executive, audit committee, board. Then the external obligations that may be triggered independently of this matter: insurance notification, auditor enquiries, public company disclosure considerations, contractual notification obligations to customers or lenders, other regulators, and any listing or reporting duty. Treat each as a separate obligation with its own timeline, and flag where a confidentiality or non-disclosure expectation in the correspondence may constrain who can be told.
9. OPEN QUESTIONS. What must be decided by counsel or the board before the response takes shape: whether to seek an extension or a scope narrowing, whether to engage with the authority informally, whether to conduct a privileged internal investigation, whether to self-report anything discovered, and whether any parallel matter changes the approach.

RULES
- Do not draft a substantive response, an admission, a denial or a characterisation of conduct. The plan comes first; the position comes after the facts.
- Do not conclude that the organisation is not a target, that the enquiry is routine, or that exposure is limited.
- Never state a deadline, a statutory power or an agency procedure from memory. Extract what the document says, describe the rest as concepts, and mark them [VERIFY].
- Extract only what the correspondence contains. Where it is silent on the scope, the theory or the target, say it is silent.
- Preservation and privilege architecture are the two items that cannot be fixed later. Put both in the first 48 hours regardless of the response deadline.
- Where the facts suggest a criminal dimension, a whistleblower, a personal exposure for individuals, or a possible ongoing violation, say so in the first line and recommend specialist outside counsel immediately — including before any internal interview.
- Where individuals may have personal exposure, flag that they may need separate representation and that this must be addressed before they are interviewed.
- Do not invent a reference number, a contact, a deadline or a legal authority.

OUTPUT FORMAT
Nine sections matching the tasks above. Open with a six-line executive summary: what arrived, from whom, apparent scope, earliest deadline, what starts today, and what the general counsel must decide this week.`,
    example: {
      scenario:
        'A consumer protection agency sends a letter requesting information about a marketing practice, and the company learns the same week that a state attorney general has opened a parallel enquiry into the same campaign.',
      result:
        'An authority assessment treating the two as separate matters with different powers and timelines, a scope map showing the agency’s defined terms reach two years of campaign material rather than the single campaign named, a deadline map separating the fixed date from the negotiable scope discussion, an immediate hold covering the marketing team and an analytics vendor, a privilege architecture settled before any interviews, a workstream plan with a critical path, and a notification map surfacing an insurance notice and a customer contract obligation nobody had considered.',
    },
  },
  {
    id: 'us-contract-obligation-tracker',
    name: 'Contract Compliance Obligation Tracker',
    description: 'Turns extracted contract obligations into a tracked register with owners, dates and priority.',
    jurisdiction: 'us',
    category: 'contracts',
    tags: ['contract-lifecycle', 'programme-design', 'obligations', 'compliance', 'legal-ops', 'renewals', 'notice-periods'],
    sources: [
      { citation: 'State contract law governing notice, waiver, conditions and time-of-the-essence provisions', authority: 'primary', jurisdiction: 'us', note: 'Whether a missed notice waives a right, whether a condition is strictly enforced, and how notice provisions are construed are matters of state law and vary. Identify the governing law of each contract.' },
      { citation: 'Uniform Commercial Code Article 2 as enacted in each state', authority: 'primary', jurisdiction: 'us', url: 'https://www.uniformlaws.org', note: 'For contracts for the sale of goods, notice of breach and related timing requirements have their own rules, enacted state by state.' },
      { citation: 'Contract lifecycle management and obligation management methodology', authority: 'secondary', note: 'A method for structuring and tracking obligations, not a statement of law. Every legal consequence stated in the output requires verification against the contract and its governing law.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-obligation-extraction', 'global-contract-triage', 'us-far-dfars-flowdown'],
    whatItDoes:
      'Picks up where extraction stops. Extraction tells you what a contract says; this turns that into something an organisation can actually run: each obligation given a responsible owner, a computed date rather than a described one, the notice period worked backwards so the real deadline is the notice date rather than the renewal date, the dependencies between obligations made visible, and a risk rating driven by consequence rather than by how the clause reads. It works across a portfolio as well as a single agreement, and it is explicit that a tracker built on extracted text inherits every error in the extraction.',
    whenToUse:
      'After obligations have been extracted from one or more contracts, when building or auditing an obligation register, before a renewal or notice window across a portfolio, at post-signature handover to the business, or during integration after an acquisition.',
    inputs: [
      { name: 'Extracted obligations', description: 'The obligations, with the source clause reference and the contract each came from.', required: true },
      { name: 'Contract metadata', description: 'Parties, effective date, term, renewal structure, governing law and notice provisions for each contract.', required: true },
      { name: 'Organisational owners', description: 'Functions or roles that could own each type of obligation, and who administers the contract.' },
      { name: 'Existing tracking', description: 'Any register, calendar or system already in use, and what it currently captures.' },
      { name: 'Risk context', description: 'Contract value, business criticality, and what a failure on each contract would actually cost.' },
      { name: 'Reporting requirements', description: 'Who needs to see what, how often, and in what form.' },
    ],
    outputs: [
      { name: 'Obligation register', description: 'One row per obligation with owner, trigger, date, notice date, source clause, dependency and priority.' },
      { name: 'Date calculation working', description: 'How each date was derived, with assumptions shown and ambiguity flagged rather than resolved.' },
      { name: 'Notice-period schedule', description: 'The backwards-worked deadlines, which are the dates that actually matter.' },
      { name: 'Ownership map', description: 'Obligations grouped by owning function, with unassignable ones surfaced rather than defaulted to legal.' },
      { name: 'Dependency chains', description: 'Obligations that depend on another obligation, an external event or a third party.' },
      { name: 'Risk and priority rating', description: 'Each obligation rated by consequence of failure and by likelihood of being missed.' },
      { name: 'Gaps and ambiguities', description: 'Obligations that cannot be tracked as written, and what must be clarified.' },
      { name: 'Operating cadence', description: 'Review rhythm, escalation path and reporting format for keeping the register alive.' },
    ],
    prompt: `You are a legal operations lead building an obligation register from obligations already extracted from contracts. Extraction has been done; your job is to make the obligations operable. Do not re-extract, and do not assume the extraction is complete or correct.

INPUTS
- Extracted obligations: <the obligations, each with its source clause reference and originating contract>
- Contract metadata: <for each contract: parties, effective date, initial term, renewal structure, governing law, notice provisions and their delivery requirements>
- Organisational owners: <functions or roles available to own obligations; who administers each contract>
- Existing tracking: <current register, calendar or system, and what it captures>
- Risk context: <contract value, business criticality, consequence of failure>
- Reporting requirements: <who needs to see what, how often, in what form>

TASK
1. NORMALISE. Restate each obligation in a consistent form: who must do what, by when, and on what trigger. Split any compound obligation into separate trackable items — a clause requiring notice, then remediation, then a report is three obligations with three dates. Classify each as recurring, one-time, conditional or continuous, because they are tracked differently. Where an obligation is drafted as a standard rather than an action ("maintain adequate insurance"), say so and convert it into a checkable item with a review cadence.
2. BUILD THE REGISTER. One row per obligation with these columns:
   - ID and source: contract, clause reference, and the obligation text or a faithful summary
   - Obligation: what must be done, in the active voice
   - Responsible party: us or the counterparty, and which internal function owns it
   - Trigger: what starts the clock — a date, an event, a notice received, a milestone
   - Deadline: the computed date, or the rule where it depends on an event that has not occurred
   - Notice period and notice date: the date action must begin, worked backwards
   - Delivery requirement: how notice must be given, to whom and at what address, where specified
   - Dependency: what must happen first
   - Priority: from the risk rating in task 6
   - Confidence: [HIGH] / [MEDIUM] / [LOW] / [UNKNOWN] in the date and the reading
3. DATE CALCULATION. For every computed date, show the working: start point, period, counting convention, and the resulting date. State the counting convention you applied — calendar days or business days, and whether the period is inclusive — and mark it [VERIFY] against the contract's own definitions. Where the contract is silent or ambiguous on the convention, flag it rather than choosing one silently; the difference routinely decides whether a notice was valid.
4. NOTICE-PERIOD SCHEDULE. Produce the backwards-worked schedule separately, because these are the dates that actually matter: for every renewal, termination right, option, price review or non-renewal window, the last date on which action can be taken and the date internal work must begin to meet it. Add a lead time for internal approval where the decision needs one. Flag every window that is already open, closing soon, or already missed at the top of the output.
5. OWNERSHIP MAP. Group obligations by owning function. Every obligation needs a named role, not a department. Surface explicitly any obligation that cannot be assigned from the information given, rather than defaulting it to legal — an unassigned obligation is the one that fails. Identify obligations that require action by someone with no visibility of the contract, which is the most common failure mode in a portfolio.
6. RISK AND PRIORITY. Rate each obligation on two axes: consequence of failure (termination right, loss of a renewal, penalty or liquidated sum, indemnity trigger, regulatory consequence, reputational harm) and likelihood of being missed (how far from the owner's normal work, whether it is a one-off, whether it depends on someone remembering). Priority is the combination. Say plainly which obligations would hurt most if missed, and note that a low-value contract can carry a high-consequence obligation.
7. DEPENDENCY CHAINS. Map obligations that depend on another obligation, on a counterparty act, or on an external event. Identify chains where a single delay cascades, and any obligation that is contingent on a trigger nobody is currently watching for.
8. GAPS AND AMBIGUITIES. List every obligation that cannot be tracked as written: no date, no ascertainable trigger, an undefined term, a cross-reference to a document not supplied, an inconsistency between clauses, or an obligation on a party that no longer exists. For each, say what must be clarified and by whom. Also identify the categories of obligation you would expect in contracts of this kind that are absent from the extraction — a prompt to check the extraction rather than a finding about the contract.
9. OPERATING CADENCE. How the register stays alive: review rhythm, who reviews, how completion is evidenced, the escalation path when a date is at risk, how amendments and renewals feed back in, and the reporting format for each audience. Include the handover step at signature that gets the obligations to the people who must perform them.

RULES
- Do not invent an obligation, a date, a notice period or an owner. Where the extraction does not supply it, record it as a gap.
- Never resolve an ambiguity by choosing the tidier reading. Flag it and carry both readings if they produce different dates.
- Every legal consequence you state — that a right is lost, that a notice is invalid, that a term is enforceable — is subject to the governing law of the contract and must be marked [VERIFY]. Notice and waiver rules differ between states.
- The register inherits every error in the extraction. Say so, and identify the rows most likely to be affected.
- Distinguish an obligation from a right. A right the organisation may exercise is tracked differently from a duty it must perform, and both belong in the register.
- Where a window is already open, closing shortly, or already missed, say so in the first line and recommend that counsel review before anyone acts or communicates with the counterparty.
- Do not draft the notices themselves here. Identify what is required and when.

OUTPUT FORMAT
Nine sections matching the tasks above. Section 2 is a table with the columns in the order given; section 4 is a separate dated schedule.`,
    example: {
      scenario:
        'A legal ops team has extracted obligations from 60 supplier contracts inherited in an acquisition and needs a register the business will actually use.',
      result:
        'A normalised register splitting 140 extracted clauses into 210 trackable obligations, a notice-period schedule surfacing four auto-renewal windows closing within six weeks and one already missed, an ownership map assigning 180 obligations to named roles and surfacing 30 that cannot be assigned from the material supplied, dependency chains around two contracts whose service credits depend on a reporting obligation nobody owns, and a gap list of eleven obligations whose dates cannot be computed because the referenced schedules were not in the data room.',
    },
  },
];
