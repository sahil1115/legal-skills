import type { Skill } from '../../types/skill';

/**
 * Global everyday skills, part two — review, triage and planning.
 *
 * The recurring review requests a legal team receives. Each works from the
 * documents supplied, separates what the text says from what local law may
 * add, and routes jurisdiction-specific questions to a qualified lawyer.
 */
export const globalReviewSkills: Skill[] = [
  {
    id: 'global-legal-intake-triage',
    name: 'Legal Request Intake Triage',
    description: 'Classifies an incoming legal request, sets urgency and route, and lists the facts needed before work starts.',
    jurisdiction: 'global',
    category: 'compliance',
    tags: ['screening', 'assessment', 'legal-ops', 'intake', 'matter-management'],
    sources: [
      { citation: 'The organisation’s own intake rules, playbooks, delegations and escalation matrix, as supplied', authority: 'secondary', note: 'Routing follows the organisation’s rules. Without them the skill proposes a default and labels it as such.' },
      { citation: 'Legal operations practice on intake and triage', authority: 'secondary', note: 'A workflow method, not a statement of law. It decides who should look at a request, not what the legal answer is.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-contract-triage', 'global-plain-language-advice-drafter', 'us-subpoena-triage'],
    whatItDoes:
      'Reads a request sent to a legal team — an email, chat message or form — and turns it into a structured matter record: what is being asked, the type of work, the business owner, the deadline and what drives it, and the risk signals present. It then recommends a route (self-serve with an existing template or guidance, legal operations, a named practice area, or immediate escalation), drafts the clarifying questions that must be answered before a lawyer starts, and writes a holding reply. Certain signals — a court or regulator document, a threatened claim, a data incident, a whistleblowing report — always escalate, whatever the requester’s framing.',
    whenToUse:
      'At the front door of an in-house legal team or a firm’s new-enquiries inbox, to clear a backlog of unsorted requests, or to design intake categories from a sample of past requests. It does not answer the legal question and should not be used to tell a requester that no legal review is needed without a rule that says so.',
    inputs: [
      { name: 'Request text', description: 'The request as received, with attachments described or pasted.', required: true },
      { name: 'Requester context', description: 'Who is asking, their team and location, and the business activity involved.', required: true },
      { name: 'Routing rules', description: 'The team’s categories, self-serve resources, approval thresholds and escalation matrix.' },
      { name: 'Team capacity', description: 'Service levels and who covers which area.' },
    ],
    outputs: [
      { name: 'Matter record', description: 'A structured summary of the request with type, owner, deadline and value.' },
      { name: 'Risk signals', description: 'Signals found, each with the words that triggered it.' },
      { name: 'Route and priority', description: 'Recommended route and urgency with the rule or reason applied.' },
      { name: 'Clarifying questions', description: 'The minimum facts and documents needed before work starts.' },
      { name: 'Holding reply', description: 'A short reply to the requester setting expectations.' },
    ],
    prompt: `You are a legal operations manager triaging a request sent to the legal team.

INPUTS
- Request: <the message as received; attachments pasted or described>
- Requester: <name or role, team, location, business activity>
- Routing rules: <categories, self-serve resources, approval thresholds, escalation matrix; or "none">
- Capacity: <service levels and coverage, optional>

TASK
1. RESTATE. Say in two sentences what is actually being asked, which may differ from how it is phrased. Separate the request for legal help from background.
2. CLASSIFY. Assign a work type (for example contract review, contract drafting, NDA, dispute or threatened claim, regulatory query, employment matter, privacy or data, intellectual property, corporate or governance, marketing review, general question) and a jurisdiction if apparent. If it spans several, list each.
3. EXTRACT. Record the business owner, counterparty, value or scale, documents attached, the deadline and what drives it. Mark anything not stated as [NOT STATED]. Distinguish a real external deadline from a preferred date.
4. ALWAYS-ESCALATE SIGNALS. Check for and report each, quoting the trigger words: a document from a court, tribunal, regulator or law enforcement body; a threat of legal action or a letter from a lawyer; a possible personal data incident or security breach; a whistleblowing or misconduct allegation; a possible sanctions, bribery, competition or safety issue; a request to delete, alter or withhold documents; media or investor sensitivity; anything involving a senior executive personally. If any is present, the route is immediate escalation regardless of other factors.
5. OTHER RISK FACTORS. Note novelty, high value, non-standard paper, unfamiliar jurisdiction, regulated activity, personal data, exclusivity or long-term commitment, and a counterparty already in dispute.
6. ROUTE. Recommend one route: SELF-SERVE (name the template or guidance, only where the routing rules permit it); LEGAL OPERATIONS; PRACTICE AREA (name it); or ESCALATE NOW (to whom, under the matrix). State the rule applied. If no rules were supplied, give a default and label it DEFAULT — NOT AN APPROVED RULE.
7. PRIORITY. Set urgency from the deadline and the risk, not from the requester’s tone. Say what the priority is based on.
8. CLARIFYING QUESTIONS. List the fewest questions and documents needed for a lawyer to start, most important first.
9. HOLDING REPLY. Draft a short reply to the requester: what was understood, who will handle it, what is needed from them and when to expect a response. For an escalated matter, include an instruction to preserve relevant documents and not to respond to the third party.

RULES
- Do not answer the legal question, and do not tell the requester that something is permitted, low-risk or needs no review unless a supplied routing rule says so.
- When in doubt between two routes, choose the more cautious one and say why.
- Never infer facts about value, counterparty or deadline; mark them [NOT STATED] and ask.
- Treat anything from a court, regulator or opposing lawyer as time-critical even if the requester does not.
- Keep the holding reply free of legal conclusions.

OUTPUT FORMAT
Matter record as a table (Field | Value); always-escalate signals (Signal | Present | Trigger words); other risk factors; route and priority with the rule applied; clarifying questions; holding reply. Close with: Assumptions made; anything the triager could not classify.`,
    example: {
      scenario:
        'A sales manager messages legal: "Customer wants us to sign their paper today, it’s just a standard NDA, also they mentioned our last delivery breached the old contract but I think that’s fine."',
      result:
        'A matter record splitting the message into an NDA request and a possible breach allegation, the second flagged as an always-escalate signal with the trigger words quoted, the NDA routed to self-serve under the supplied rule and the allegation escalated to the disputes lawyer, four clarifying questions, and a holding reply asking the manager not to respond to the customer on the breach point.',
    },
  },
  {
    id: 'global-contract-key-terms-summary',
    name: 'Contract Key Terms Summary',
    description: 'Produces a one-page business summary of a contract: money, term, exit, risk and the dates that need a calendar entry.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['extraction', 'contract-lifecycle', 'review', 'summarisation', 'legal-ops'],
    sources: [
      { citation: 'The contract and its schedules, order forms and amendments', authority: 'primary', note: 'The summary reports what the documents say, with clause references. It is not an interpretation of legal effect.' },
      { citation: 'Contract management practice on term sheets and contract abstracts', authority: 'secondary', note: 'A method for abstracting commercial terms.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-obligation-extraction', 'global-legal-document-summary', 'global-contract-finder', 'global-liability-indemnity-analyser'],
    whatItDoes:
      'Abstracts a contract into the one page a business owner needs: who the parties are, what is being bought or sold, what it costs and when the price can change, how long it lasts and how it renews, how either side can get out and what that costs, the main risk allocation in a sentence, and any unusual or restrictive terms such as exclusivity, minimum commitments or non-compete wording. It ends with a list of dated actions — renewal notice windows, price review dates, reporting deadlines — written so they can go straight into a calendar. Every entry carries a clause reference and nothing is characterised beyond what the text says.',
    whenToUse:
      'When a contract is signed and needs handing to the business, when loading contracts into a register, before a renewal or renegotiation, and when an executive asks "what did we agree to?". For a full register of duties use the obligation extraction skill; for a first-pass risk review use triage.',
    inputs: [
      { name: 'Contract documents', description: 'The agreement with schedules, order forms and any amendments.', required: true },
      { name: 'Your party', description: 'Which party you are, so obligations and rights are stated from your side.', required: true },
      { name: 'Reader', description: 'Who the summary is for and what they care about most.' },
      { name: 'Fields required', description: 'Any fixed template or register fields to fill.' },
    ],
    outputs: [
      { name: 'One-page term summary', description: 'Parties, subject, price, term, renewal, exit and risk headline with clause references.' },
      { name: 'Restrictions and unusual terms', description: 'Exclusivity, minimums, most-favoured terms, non-compete, change-of-control and similar.' },
      { name: 'Key dates list', description: 'Calendar-ready entries with the date or the rule for calculating it.' },
      { name: 'Gaps and conflicts', description: 'Terms missing, blank or inconsistent between documents.' },
    ],
    prompt: `You are a contract manager preparing a business summary of a signed contract.

INPUTS
- Contract: <agreement, schedules, order forms, amendments>
- Your party: <which party you are>
- Reader: <role and what matters most to them>
- Fields required: <template or register fields, optional>

TASK
1. DOCUMENT SET. List the documents supplied, their dates and which prevails if they conflict (quote the order-of-precedence clause, or say there is none). Note anything referred to but not supplied.
2. BASICS. Parties with exact legal names, contract title, effective date, governing law and forum, each with a clause reference.
3. WHAT IS BEING PROVIDED. Two or three sentences on the goods, services or rights, including volumes, territories and service levels where stated.
4. MONEY. Price or fees, payment terms, what is included and excluded, minimum commitments, how and when the price can change (indexation, review, volume bands), late payment terms, and taxes. Quote figures exactly.
5. TERM AND RENEWAL. Start date, initial term, end date, whether it renews automatically, the renewal period, and the notice required to stop renewal, including the window and the form of notice.
6. EXIT. For each party: rights to terminate for convenience, for breach (with cure period), for insolvency, for change of control or other triggers; notice periods; and what termination costs (early termination fees, minimum payments, return or transition duties).
7. RISK HEADLINE. In two or three sentences from your party’s side: the liability cap and its main exceptions, key indemnities given and received, and insurance required. Give clause references and do not assess adequacy.
8. RESTRICTIONS AND UNUSUAL TERMS. Flag exclusivity, non-compete or non-solicit wording, most-favoured-customer terms, minimum purchase or take-or-pay, assignment and change-of-control restrictions, audit rights, data or intellectual-property ownership terms, and anything that departs from what the reader would likely expect.
9. KEY DATES. List each dated action for your party as a calendar entry: what, the date or the rule to calculate it, the clause, and the consequence of missing it. Calculate a date only when the documents give every input; otherwise state the rule and the missing input.
10. GAPS AND CONFLICTS. List blanks, missing schedules, undefined terms and inconsistencies between documents.

RULES
- Report, do not interpret. Use the contract’s words for anything precise and give a clause reference for every entry.
- Never fill a blank or guess a date, amount or party name. Write [BLANK IN CONTRACT] or [NOT STATED].
- Do not say whether a term is enforceable, standard or favourable.
- State rights and obligations from your party’s side and say which side each belongs to.
- Keep the main summary to one page; put overflow in the later sections.

OUTPUT FORMAT
Document set; the one-page summary as a table (Topic | Term | Clause); restrictions and unusual terms; key dates as a table (Action | Date or rule | Clause | If missed); gaps and conflicts. Close with: Items for legal to confirm.`,
    example: {
      scenario:
        'An operations director inherits a five-year logistics contract signed by a predecessor, with two order forms and one amendment, and asks what the company is committed to.',
      result:
        'A one-page table with fees, an annual indexation mechanism and a minimum monthly volume, an automatic renewal that needs written notice at least 180 days before expiry, an exclusivity clause for two regions flagged as a restriction, five calendar entries including the notice window, and a conflict between an order form and the amendment on payment terms.',
    },
  },
  {
    id: 'global-contract-version-comparison',
    name: 'Contract Version Comparison',
    description: 'Compares two versions of a contract and explains what each change means, including the ones not marked.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['review', 'contract-lifecycle', 'extraction', 'negotiation', 'redline'],
    sources: [
      { citation: 'The two document versions supplied', authority: 'primary', note: 'The comparison is drawn from these texts alone. A formal comparison tool should still be run on the final execution version.' },
      { citation: 'Contract negotiation practice on reviewing counterparty mark-ups', authority: 'secondary', note: 'A review method, not a statement of law.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-smart-redline', 'global-contract-amendment-drafter', 'global-playbook-maker', 'global-liability-indemnity-analyser'],
    whatItDoes:
      'Compares two versions of an agreement — your last draft against the counterparty’s return, or a template against a negotiated form — and reports every change with its practical effect on your party. It goes beyond a mechanical redline: it groups changes by significance, explains what each one does to risk, cost or flexibility, and looks specifically for the changes that are easy to miss, such as an altered definition that shifts meaning across many clauses, a deleted "not", a moved carve-out, a changed cross-reference or a revised schedule. It ends with an issues list ready for the next negotiation round.',
    whenToUse:
      'When a mark-up comes back from the other side, when checking that an execution version matches what was agreed, when comparing a signed contract to your standard template, and when two versions exist and nobody is sure which changes were intended. Run a document-comparison tool as well before signing.',
    inputs: [
      { name: 'Earlier version', description: 'The baseline text: your last draft, the template or the agreed form.', required: true },
      { name: 'Later version', description: 'The text to compare against the baseline.', required: true },
      { name: 'Your party and priorities', description: 'Which party you are and the points that matter most.', required: true },
      { name: 'Agreed points', description: 'What was agreed in the last round, to check the draft reflects it.' },
      { name: 'Playbook positions', description: 'Your standard positions and fallbacks, if any.' },
    ],
    outputs: [
      { name: 'Change register', description: 'Every change with location, old and new wording and a significance rating.' },
      { name: 'Effect analysis', description: 'What each material change does to your position, in plain terms.' },
      { name: 'Hidden-change check', description: 'Definitions, cross-references, numbering and schedules that changed meaning without an obvious edit.' },
      { name: 'Agreed-points reconciliation', description: 'Whether each agreed point is correctly reflected, missing or altered.' },
      { name: 'Issues list', description: 'Open points for the next round with a proposed response.' },
    ],
    prompt: `You are a commercial contracts lawyer comparing two versions of an agreement for the party named in the inputs.

INPUTS
- Earlier version: <baseline text>
- Later version: <text to compare>
- Your party and priorities: <party; points that matter most>
- Agreed points: <what was agreed in the last round, optional>
- Playbook positions: <standard positions and fallbacks, optional>

TASK
1. ALIGN. Confirm the two texts are versions of the same document and note any difference in structure, numbering or attached schedules. If either appears incomplete, say so before continuing.
2. CHANGE REGISTER. List every difference: clause reference in each version, the earlier wording, the later wording, and the type (insertion, deletion, replacement, move). Include changes in definitions, schedules, numbers, dates, party names and boilerplate.
3. RATE. Rate each change MATERIAL (shifts risk, cost, rights or flexibility), MODERATE (clarifies or adjusts without a major shift) or MINOR (formatting, typographical, conforming). Give a one-line reason for each MATERIAL rating.
4. EFFECT. For each material and moderate change, explain the practical effect on your party: who gains what, what could now happen that could not before, and which other clauses it interacts with.
5. HIDDEN CHANGES. Check specifically for: a changed definition and every clause that uses it; added or removed qualifiers such as "reasonable", "material", "sole", "including" or "not"; changed "and" to "or"; cross-references that now point to a different clause after renumbering; carve-outs moved in or out of a limitation; changes to numbers, percentages, periods or currencies; altered schedules, annexes or order-of-precedence wording; and deletions with no replacement.
6. AGREED-POINTS RECONCILIATION. If agreed points are supplied, check each: correctly reflected, reflected with different wording (say how), missing, or accompanied by a change that was not agreed.
7. PLAYBOOK CHECK. If positions are supplied, mark each material change as within the standard position, within a fallback, or outside it.
8. ISSUES LIST. For each open point, propose a response: accept, reject with reason, or counter-propose with wording. Order by importance to your party.

RULES
- Report every difference you can find; do not skip changes you consider harmless — rate them MINOR instead.
- Quote wording exactly from each version. Do not paraphrase the text being compared.
- Do not assume a change was intended or accidental; describe its effect and let the user ask the counterparty.
- State plainly that this comparison works on the text as pasted and may miss formatting, tracked-change metadata or content in images, and that a document-comparison tool should be run on the final files.
- Do not state whether a clause is enforceable; flag legal questions for a lawyer.

OUTPUT FORMAT
Alignment note; summary of the five most significant changes; change register as a table (Clause | Earlier | Later | Type | Rating); effect analysis; hidden-change check; agreed-points reconciliation (Point | Status | Note); issues list (Issue | Proposed response | Wording). Close with: Limits of this comparison; Questions for the counterparty.`,
    example: {
      scenario:
        'A supplier’s lawyers return a services agreement described as having "a few minor clarifications", with tracked changes switched off.',
      result:
        'A register of 31 differences of which six are material, including a redefinition of "Losses" that removes loss of profit from every indemnity and a liability carve-out moved inside the cap, a reconciliation showing one agreed point missing, and an issues list with proposed counter-wording for each material change.',
    },
  },
  {
    id: 'global-termination-notice-planner',
    name: 'Contract Termination Planner',
    description: 'Maps the rights to end a contract, checks the notice mechanics and drafts the notice for lawyer review.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['assessment', 'drafting', 'contract-lifecycle', 'termination', 'notice', 'disputes'],
    sources: [
      { citation: 'The contract, its amendments and the correspondence between the parties', authority: 'primary', note: 'Termination rights, cure periods, notice formalities and consequences are read from these.' },
      { citation: 'Governing law on termination, repudiation, waiver and good faith', authority: 'primary', note: 'Rights outside the contract, the effect of a defective notice, and limits on exercising termination rights differ between legal systems and can be decisive. Flagged for a qualified lawyer, not stated.' },
      { citation: 'Commercial disputes practice on termination', authority: 'secondary', note: 'A method for planning and sequencing.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-demand-letter-drafter', 'global-contract-key-terms-summary', 'global-chronology-builder', 'global-liability-indemnity-analyser'],
    whatItDoes:
      'Plans the ending of a contract before anything is sent. It maps every route out — expiry and non-renewal, termination for convenience, for breach, for insolvency or other triggers — with the conditions each requires, then tests the facts against the route you want to use. It checks the notice mechanics word by word (who, to whom, at what address, by what method, with what content and when it takes effect), because notices fail on formalities. It sets out the consequences of termination, warns about conduct that could waive the right or put your own side in breach, and drafts a breach or termination notice for lawyer review.',
    whenToUse:
      'When a business wants to exit a contract, has received a termination notice and needs to test it, or is approaching a renewal window. Termination is high-stakes: a wrongful termination can itself be a serious breach, so the plan and notice should be reviewed by a lawyer qualified in the governing law before any step is taken.',
    inputs: [
      { name: 'Contract documents', description: 'The agreement with schedules and all amendments.', required: true },
      { name: 'Facts and correspondence', description: 'What has happened, with dates, and relevant emails, notices and meeting notes.', required: true },
      { name: 'Objective', description: 'Whether you want to exit, renegotiate, or respond to the other side’s notice, and by when.', required: true },
      { name: 'Your own performance', description: 'Any respect in which your side may be in breach or late.' },
      { name: 'Commercial constraints', description: 'Dependency on the counterparty, transition needs and relationship considerations.' },
    ],
    outputs: [
      { name: 'Exit route map', description: 'Each route with its conditions, notice period and cost.' },
      { name: 'Facts-to-route test', description: 'Whether the conditions of the chosen route appear met, with evidence and gaps.' },
      { name: 'Notice mechanics checklist', description: 'Every formal requirement quoted from the contract and how it will be met.' },
      { name: 'Consequences and risks', description: 'What follows termination, and waiver, own-breach and wrongful-termination risks.' },
      { name: 'Draft notice and timeline', description: 'A breach or termination notice for review, and a dated sequence of steps.' },
    ],
    prompt: `You are a commercial disputes lawyer planning the termination of a contract for the party named in the inputs.

INPUTS
- Contract: <agreement, schedules, amendments>
- Facts and correspondence: <chronology with dates; relevant emails, notices, meeting notes>
- Objective: <exit, renegotiate, or respond to a notice received; target date>
- Your own performance: <any breach or delay on your side>
- Constraints: <dependency, transition needs, relationship>

TASK
1. MISSING INFORMATION. List what you need and do not have. Treat missing amendments, missing correspondence about the breach, or uncertainty about your own performance as serious gaps.
2. EXIT ROUTE MAP. Identify every way the contract can end and quote the clause: expiry and the notice to prevent renewal; termination for convenience; termination for material or specified breach, with any cure period and what counts as remedy; insolvency or financial triggers; change of control; force majeure or prolonged suspension; regulatory or other specified events. For each, state who holds the right, the conditions, the notice period and any fee or payment.
3. RIGHTS OUTSIDE THE CONTRACT. Note that the governing law may give or restrict rights to terminate apart from the contract, and that using a contractual right may affect them. Do not state the rule; flag it [VERIFY WITH LOCAL COUNSEL].
4. FACTS-TO-ROUTE TEST. For the route that fits the objective, test each condition against the facts: the obligation breached, the evidence, whether the breach meets the contractual standard as worded, whether a cure notice was or must be given and whether the cure period has run. Mark each condition MET ON EVIDENCE, ARGUABLE or NOT SHOWN.
5. NOTICE MECHANICS. Quote the notice clause and build a checklist: who must give notice and with what authority; the recipient and address, including any copy required; permitted methods and excluded ones such as email; required content, such as specifying the breach and the clause relied on; language; when notice is deemed received; and how periods are counted. State how each will be satisfied and what proof of delivery will be kept.
6. CONSEQUENCES. Set out what follows termination under the contract: payments due and refundable, accrued rights, return of property and data, transition or exit assistance, licences ending, surviving clauses, and any restriction that continues.
7. RISKS. Assess and explain: waiver or affirmation by continuing to perform, accept performance or delay; your own breaches and whether they affect the right; the risk that termination is wrongful if the breach is not serious enough or the notice is defective, and that the other side may then treat you as in breach; any good-faith or reasonableness limit [VERIFY]; and insolvency-related restrictions on termination that may apply [VERIFY].
8. SEQUENCE. Give a dated timeline of steps: preserve evidence, reserve rights, any cure notice, the termination notice, transition steps. Calculate dates only from dates supplied and show the arithmetic.
9. DRAFT NOTICE. Draft the appropriate notice (reservation of rights, notice of breach requiring remedy, or notice of termination) in neutral terms: the contract identified, the clause relied on, the facts, what is required or the termination date, and a reservation of all rights. Mark it DRAFT FOR LAWYER REVIEW.
10. IF RESPONDING. If the user has received a notice, test it against steps 4 and 5 and list defects, without advising whether to treat it as invalid.

RULES
- Never advise that the user is entitled to terminate. Report which conditions appear met and route the decision to a lawyer qualified in the governing law.
- Quote the clauses. Do not paraphrase a condition or a notice requirement.
- Do not convert indefinite wording ("material", "reasonable", "promptly") into certainty.
- Never suggest conduct that manufactures a breach or conceals your own.
- Do not send or finalise anything; every notice is a draft.

OUTPUT FORMAT
Missing information; exit route map as a table (Route | Clause | Holder | Conditions | Notice | Cost); facts-to-route test (Condition | Evidence | Status); notice mechanics checklist (Requirement | Clause wording | How met | Proof); consequences; risks; timeline; draft notice. Close with: Assumptions made; [VERIFY] points; Decisions for the lawyer.`,
    example: {
      scenario:
        'A retailer wants to end a software contract with two years left after eight months of missed service levels; it has kept paying and has complained only by phone and email.',
      result:
        'A route map showing no termination for convenience and a material-breach right needing a 30-day written cure notice sent by courier to a named address, a facts test marking the breach arguable and the cure notice not yet given, a waiver risk from continued payment without reservation, a timeline starting with a reservation-of-rights letter, and a draft breach notice for review.',
    },
  },
  {
    id: 'global-settlement-agreement-reviewer',
    name: 'Settlement Agreement Reviewer',
    description: 'Reviews a draft settlement: what is released, by whom, for what, and the gaps that reopen disputes later.',
    jurisdiction: 'global',
    category: 'litigation',
    tags: ['review', 'disputes', 'settlement', 'drafting', 'release'],
    sources: [
      { citation: 'The draft settlement agreement and the underlying claim documents', authority: 'primary', note: 'The scope of the release is tested against the actual claims and parties.' },
      { citation: 'Governing law and court rules on settlement, releases and approval', authority: 'primary', note: 'Some claims cannot be released without formalities, independent advice or court or regulator approval, and the treatment of unknown claims, tax and confidentiality limits varies by system. Flagged, not stated.' },
      { citation: 'Disputes practice on settlement drafting', authority: 'secondary', note: 'A review method.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-separation-agreement-reviewer', 'global-demand-letter-drafter', 'us-demand-letter-responder', 'global-smart-redline'],
    whatItDoes:
      'Reviews a draft settlement agreement from the side of the party you act for, concentrating on the terms that decide whether the dispute is actually over. It maps who releases whom from what, tests the release against the claims, parties and time period in the underlying dispute, and looks for mismatches: affiliates or individuals left outside, claims carved out or swept in unintentionally, unknown and future claims, and third-party or contribution claims. It checks the payment mechanics and what happens on default, the steps to end any proceedings, confidentiality and non-disparagement, and tax and cost allocation, then gives drafted fixes.',
    whenToUse:
      'When a settlement has been agreed in principle and the paper needs checking, when the other side sends its draft, and before signing heads of terms at a mediation. Employment, consumer, insolvency, class and minor’s settlements often need special formalities; a lawyer in the governing jurisdiction must confirm them.',
    inputs: [
      { name: 'Draft agreement', description: 'The settlement draft with any schedules, consent orders or releases attached.', required: true },
      { name: 'The dispute', description: 'The claims, counterclaims, parties, proceedings and the period they cover.', required: true },
      { name: 'Your party and deal terms', description: 'Which party you act for and what was agreed in principle.', required: true },
      { name: 'Related parties and claims', description: 'Affiliates, insurers, guarantors, employees and any other disputes between the parties.' },
      { name: 'Governing law and forum', description: 'Where the dispute is pending and what law governs the settlement.' },
    ],
    outputs: [
      { name: 'Release map', description: 'Who releases whom from what, with gaps and overreach identified.' },
      { name: 'Deal-terms reconciliation', description: 'Whether the draft matches what was agreed in principle.' },
      { name: 'Payment and default review', description: 'Mechanics, timing, security and the consequence of non-payment.' },
      { name: 'Clause-by-clause issues', description: 'Findings on proceedings, confidentiality, costs, tax and boilerplate.' },
      { name: 'Drafted fixes and formalities list', description: 'Replacement wording and the approval or formality points to confirm.' },
    ],
    prompt: `You are a disputes lawyer reviewing a draft settlement agreement for the party named in the inputs.

INPUTS
- Draft: <settlement agreement with schedules, consent orders, releases>
- Dispute: <claims, counterclaims, parties, proceedings, period covered>
- Your party and deal terms: <who you act for; what was agreed in principle>
- Related parties and claims: <affiliates, insurers, guarantors, employees; other disputes>
- Governing law and forum: <court or tribunal; law of the settlement>

TASK
1. MISSING INFORMATION. List what you need and do not have, especially the pleadings or claim letters and the terms agreed in principle.
2. RECONCILE THE DEAL. Compare the draft to the agreed terms point by point: reflected, altered, missing, or new term not agreed.
3. RELEASE MAP. Tabulate each release: releasing parties, released parties, the claims covered (by description, time period and whether known, unknown, future or contingent), and exclusions. Quote the operative words.
4. TEST THE RELEASE. Against the dispute and related parties, identify: (a) parties to the dispute, or their affiliates, officers, employees, insurers and successors, who are not bound or not protected; (b) claims in the dispute not clearly covered; (c) claims outside the dispute that the wording sweeps in, such as other contracts or ongoing dealings; (d) whether the releases are mutual and, if not, whether that is intended; (e) treatment of unknown claims and whether the governing law requires particular wording to release them [VERIFY]; (f) claims by or against third parties, including contribution and indemnity claims, and whether a covenant not to sue or an indemnity is needed; (g) claims that may not be releasable by agreement or without formalities [VERIFY].
5. PAYMENT. Review amount, currency, payer and payee, timing, instalments, method, interest, tax treatment and withholding, and who bears costs. Check what happens on late or non-payment: whether the release is conditional on payment, whether the original claim revives, acceleration, a consent judgment or security. Flag a release that takes effect before payment clears.
6. PROCEEDINGS. Check the steps to end any proceedings: the form (dismissal, discontinuance, stay, consent order), with or without the ability to restart, who files, when, costs orders, and whether the court keeps power to enforce the settlement [VERIFY].
7. CONDUCT TERMS. Review confidentiality (scope, permitted disclosures to advisers, insurers, auditors, regulators and as required by law), non-disparagement (mutuality, who is bound), no admission of liability, return or destruction of documents, and any future-dealings terms. Flag restrictions that may be unenforceable or unlawful in some settings, such as limits on reporting to authorities [VERIFY].
8. BOILERPLATE THAT MATTERS. Authority and capacity to settle, warranty that claims have not been assigned, entire agreement, governing law and jurisdiction for disputes about the settlement, counterparts and signature.
9. FORMALITIES AND APPROVALS. List points to confirm for the type of claim and party: court, tribunal or regulator approval; independent advice requirements; insurer consent; board or shareholder approval; insolvency-related approval; cooling-off or revocation periods [VERIFY each].
10. FIXES. For each issue give replacement wording, marked REQUIRED or ADVISABLE, most important first.

RULES
- Quote the draft’s operative words; the scope of a release turns on them.
- Never state that a release is effective, enforceable or sufficient under any law; identify the question and mark it [VERIFY].
- Do not advise on whether the settlement amount is adequate.
- Do not state tax consequences; flag that tax treatment and reporting need specialist advice.
- Do not draft any term intended to prevent a party from reporting to a regulator or law enforcement.

OUTPUT FORMAT
Missing information; deal reconciliation (Term | Agreed | Draft | Status); release map (Releasor | Releasee | Claims | Exclusions | Clause); release test findings; payment and default review; proceedings; conduct terms; boilerplate; formalities list; fixes with wording. Close with: Assumptions made; [VERIFY] points; Items for the responsible lawyer.`,
    example: {
      scenario:
        'After a mediation, a distributor receives the manufacturer’s draft settling a dispute over unpaid commission; the two companies will continue trading under a separate supply agreement.',
      result:
        'A release map showing the distributor releases "all claims of any kind" while the manufacturer releases only the commission claim, a finding that the wording would sweep in claims under the ongoing supply agreement, a release that takes effect on signature although payment is in three instalments, and required fixes making the releases mutual, limited to the dispute and conditional on payment.',
    },
  },
  {
    id: 'global-marketing-claims-reviewer',
    name: 'Marketing Claims Reviewer',
    description: 'Reviews marketing copy claim by claim: what it promises, what proof is needed and where the wording should change.',
    jurisdiction: 'global',
    category: 'compliance',
    tags: ['review', 'screening', 'consumer-protection', 'advertising', 'substantiation'],
    sources: [
      { citation: 'Consumer protection and advertising laws of each market where the material will run', authority: 'primary', note: 'Rules on misleading claims, comparative advertising, pricing, environmental and health claims, endorsements and promotions differ by market and sector. The skill identifies the claim type and the question; it does not state any market’s rule.' },
      { citation: 'Advertising self-regulatory codes and regulator guidance in the relevant markets', authority: 'guidance', note: 'Often the practical standard applied to an advertisement. Identify which code applies for each market.' },
      { citation: 'The substantiation held by the business', authority: 'secondary', note: 'A claim is only as good as the evidence held when it is made.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'technology'],
    relatedSkills: ['ca-advertising-claims-reviewer', 'uk-consumer-rights-checker', 'au-consumer-guarantees-checker', 'global-legal-intake-triage'],
    whatItDoes:
      'Breaks a piece of marketing — a web page, advertisement, email, social post, packaging or sales deck — into its individual claims, including the ones made by images, headlines and omissions, and assesses each as a consumer would take it. For every claim it identifies the type (factual, comparative, superlative, price, environmental, health, testimonial, guarantee, AI or performance), the evidence that would be needed to support it, whether the evidence you hold appears to match the claim as worded, and the qualification or rewording that would close the gap. Claims in categories that are tightly regulated in most markets are routed for specialist review.',
    whenToUse:
      'Before marketing material is published or a campaign is briefed, when a competitor or regulator challenges a claim, and when building a claims register for a product launch. It is a first-pass review: each market’s rules must be confirmed by someone who knows them, particularly for health, financial, environmental, children’s and price claims.',
    inputs: [
      { name: 'Marketing material', description: 'The copy in full, with a description of images, video, layout and any small print.', required: true },
      { name: 'Product facts and evidence', description: 'What the product does and the tests, data, certifications or sources held to support the claims.', required: true },
      { name: 'Markets and channels', description: 'Where the material will run, to whom, and through which channels.', required: true },
      { name: 'Sector and audience', description: 'Any regulated sector and whether the audience includes children or vulnerable groups.' },
      { name: 'Endorsements and offers', description: 'Influencers, testimonials, reviews, prices, discounts, prizes or subscriptions involved.' },
    ],
    outputs: [
      { name: 'Claims register', description: 'Each express and implied claim with its type and how a consumer would likely take it.' },
      { name: 'Substantiation assessment', description: 'Evidence needed, evidence held, and whether they match.' },
      { name: 'Risk rating and rewrites', description: 'A rating per claim with replacement wording or qualifications.' },
      { name: 'Disclosure and presentation points', description: 'Small print, endorsements, pricing and offer mechanics to fix.' },
      { name: 'Specialist review list', description: 'Claims and markets needing local or sector review.' },
    ],
    prompt: `You are an advertising and consumer-protection lawyer reviewing marketing material before publication.

INPUTS
- Material: <full copy; describe images, video, layout, footnotes and small print>
- Product facts and evidence: <what the product does; tests, data, certifications, sources held>
- Markets and channels: <countries; audience; channels>
- Sector and audience: <regulated sector; children or vulnerable groups>
- Endorsements and offers: <influencers, testimonials, reviews, prices, discounts, prizes, subscriptions>

TASK
1. MISSING INFORMATION. List what you need and do not have, in particular the evidence behind each factual claim and the markets.
2. CLAIMS REGISTER. Extract every claim, numbered. Include express claims; implied claims arising from wording, images, names, colours, logos or context; claims by omission; and the overall impression. For each, state how an ordinary member of the target audience would likely understand it.
3. CLASSIFY. Label each claim: FACTUAL (objective, testable); COMPARATIVE (against competitors or earlier versions); SUPERLATIVE or ABSOLUTE ("best", "only", "100%", "never"); PUFFERY (obvious exaggeration no one would rely on); PRICE or SAVING; ENVIRONMENTAL or SUSTAINABILITY; HEALTH, SAFETY or NUTRITION; TESTIMONIAL or ENDORSEMENT; GUARANTEE or WARRANTY; ORIGIN ("made in"); AI, AUTOMATION or PERFORMANCE; AVAILABILITY or URGENCY ("limited time", "only 3 left").
4. EVIDENCE NEEDED. For each claim other than puffery, state what evidence would support the claim as a consumer would understand it: its type, scope, recency and independence. A broad claim needs broad evidence.
5. EVIDENCE MATCH. Compare with the evidence held: SUPPORTED AS WORDED; SUPPORTED IF QUALIFIED (say how); EVIDENCE NARROWER THAN CLAIM; NO EVIDENCE SUPPLIED. Do not assess the scientific quality of a study; say what it appears to cover.
6. QUALIFICATIONS. Check whether any disclaimer or small print contradicts the headline rather than clarifying it, and whether it is prominent and close enough to the claim. A qualification cannot rescue a claim it contradicts.
7. PRESENTATION ISSUES. Review: price and discount references and their basis; "free" offers and conditions; subscription and renewal disclosures; urgency and scarcity statements; endorsements and whether paid or incentivised relationships are disclosed; use of reviews; comparisons that are selective or outdated; and use of third-party marks or certifications.
8. RISK AND REWRITE. Rate each claim LOW, MEDIUM or HIGH and give the reason. For each MEDIUM or HIGH, give replacement wording or a qualification that the evidence supports, keeping as much of the marketing intent as possible.
9. SPECIALIST REVIEW. List the claims that need review by local counsel or a sector specialist because they fall into tightly regulated categories (health, medicines, food, financial products, environmental claims, children, alcohol, gambling, pricing rules, prize promotions) or because the markets apply different standards [VERIFY per market].
10. RECORD. List the evidence that should be filed with the claim before publication.

RULES
- Never state that a claim is lawful or compliant in any market. Give the risk rating and the reason.
- Assess the claim as the audience would understand it, not as the business intended it.
- Do not treat a claim as puffery if it could be measured or if a consumer might rely on it.
- Do not invent evidence or assume a test exists. No evidence supplied means NO EVIDENCE SUPPLIED.
- Do not suggest smaller print, hidden qualifications or wording designed to mislead while being literally true.

OUTPUT FORMAT
Missing information; overall impression in two sentences; claims register as a table (No. | Claim | Express or implied | Type | Likely understanding); substantiation table (No. | Evidence needed | Evidence held | Match); presentation issues; risk and rewrite table (No. | Risk | Reason | Proposed wording); specialist review list; evidence file list. Close with: Assumptions made; [VERIFY] points by market.`,
    example: {
      scenario:
        'A skincare brand is launching in four countries with a landing page headed "Clinically proven to erase wrinkles — the planet-friendly choice", a before-and-after photo and "was 60, now 39" pricing.',
      result:
        'A register of eleven claims including an implied claim from the photo, the headline rated high because the supplied study measured appearance of fine lines in 30 people, an unqualified environmental claim with no evidence supplied, a price reference needing its basis, proposed rewrites for five claims, and health, environmental and pricing points listed for local review in each market.',
    },
  },
  {
    id: 'global-privacy-notice-reviewer',
    name: 'Privacy Notice Reviewer',
    description: 'Checks a privacy notice against how data is actually handled and a content checklist for the chosen regimes.',
    jurisdiction: 'global',
    category: 'privacy',
    tags: ['review', 'data-protection', 'assessment', 'transparency', 'privacy-notice'],
    sources: [
      { citation: 'Data protection and privacy laws of the markets where individuals are located', authority: 'primary', note: 'Mandatory notice content differs by regime. The checklist here is a union of commonly required elements; confirm each against the regime’s current text.' },
      { citation: 'Regulator guidance on transparency and privacy notices in the relevant markets', authority: 'guidance', note: 'Sets expectations on clarity, layering and timing.' },
      { citation: 'The organisation’s own records of processing, data map and vendor list', authority: 'secondary', note: 'The notice must describe what actually happens. These are the facts it is tested against.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['eu-dpia-ropa-builder', 'global-data-rights-request-handler', 'sg-pdpa-obligation-mapper', 'us-privacy-request-router', 'cross-four-regime-gap-analyzer'],
    whatItDoes:
      'Reviews a privacy notice in two directions. First against reality: it compares what the notice says with the description you give of what data is collected, why, who receives it, where it goes and how long it is kept, and lists every mismatch — processing that is not disclosed, and statements that are not true. Second against a content checklist built from the elements data protection regimes commonly require, marked for the regimes you select and flagged for confirmation. It also reviews readability, structure and promises the organisation may not be able to keep, and returns drafted text for the gaps.',
    whenToUse:
      'Before launching a product, website or app; after adding a vendor, a new purpose or a new market; during an annual privacy review; and when a regulator, customer or acquirer asks whether the notice is accurate. A notice that is well drafted but inaccurate is a liability, so supply an honest description of the processing.',
    inputs: [
      { name: 'Privacy notice', description: 'The current or draft notice in full, including any layered or just-in-time notices.', required: true },
      { name: 'Actual processing', description: 'What personal data is collected, from whom, for what purposes, shared with whom, stored where and for how long.', required: true },
      { name: 'Markets and regimes', description: 'Where the individuals are and which privacy regimes should be checked.', required: true },
      { name: 'Special cases', description: 'Children, sensitive data, profiling or automated decisions, advertising and tracking technologies, AI training.' },
      { name: 'Organisation details', description: 'Legal entity, contact points, representatives or privacy officers.' },
    ],
    outputs: [
      { name: 'Accuracy gap list', description: 'Undisclosed processing and statements that do not match practice.' },
      { name: 'Content checklist', description: 'Commonly required elements marked present, partial or missing per selected regime.' },
      { name: 'Clarity and structure review', description: 'Readability, layering and findability points.' },
      { name: 'Overpromise list', description: 'Commitments the organisation may not be able to keep.' },
      { name: 'Drafted additions', description: 'Replacement or new text for each gap.' },
    ],
    prompt: `You are a privacy lawyer reviewing a privacy notice for accuracy and completeness.

INPUTS
- Notice: <the notice in full, with any layered or just-in-time notices>
- Actual processing: <data collected, sources, purposes, recipients, locations, retention>
- Markets and regimes: <where individuals are; regimes to check>
- Special cases: <children, sensitive data, profiling or automated decisions, advertising and tracking, AI training>
- Organisation: <legal entity, contacts, representative or privacy officer>

TASK
1. MISSING INFORMATION. List what you need and do not have. If the description of actual processing is thin, say that the accuracy review will be limited and list the questions to ask the business.
2. ACCURACY — UNDISCLOSED PROCESSING. For each item of actual processing, check whether the notice discloses it: category of data, source, purpose, recipients or categories of recipient, international transfers and retention. List every item that is not disclosed or is disclosed too vaguely to be understood.
3. ACCURACY — UNTRUE OR STALE STATEMENTS. For each statement in the notice, check it against the described practice. List statements that are contradicted, unsupported, or refer to services, vendors or entities no longer used.
4. CONTENT CHECKLIST. Mark each commonly required element PRESENT, PARTIAL or MISSING, with the passage: identity and contact details of the responsible organisation and any representative or privacy officer; categories of personal data; sources where not collected from the individual; purposes; the legal basis or justification for each purpose where the regime uses that concept; legitimate interests relied on; recipients or categories of recipients; sale or sharing for advertising where the regime uses that concept; international transfers and safeguards; retention periods or criteria; individuals’ rights and how to exercise them; the right to withdraw consent; the right to complain to a regulator; whether providing data is required and the consequence of not doing so; automated decision-making and profiling; children’s data; sensitive data; cookies and tracking; how changes are notified; and the notice’s date. For each selected regime, flag which elements that regime is commonly understood to require and mark every such statement [VERIFY against the regime’s text].
5. SPECIAL CASES. For each special case in the inputs, check whether the notice addresses it with enough specificity, and flag where separate consent, a separate notice or an opt-out mechanism may be required [VERIFY].
6. CLARITY AND STRUCTURE. Review plain language, reading level, length, layering, headings, whether purposes are linked to data categories (not listed separately so the reader cannot tell what is used for what), and whether the notice is easy to find at the point of collection.
7. OVERPROMISES. List absolute or unqualified commitments ("we never share your data", "your data is completely secure", "we delete immediately") that practice may not support, and propose accurate wording.
8. DRAFTED ADDITIONS. For each gap, provide text to insert or replace, written in plain language, using only facts from the inputs and [TO COMPLETE] for anything unknown.
9. FOLLOW-UP. List internal actions the review reveals, such as processing with no stated purpose, missing retention periods or vendors without a described role.

RULES
- Never state that the notice complies with any law. Report presence, gaps and accuracy.
- Do not state what a regime requires as settled; mark it [VERIFY] and name the regime.
- Do not draft text describing processing that the inputs do not describe.
- Do not recommend vague catch-all wording ("including but not limited to", "for business purposes") to cover undisclosed processing; recommend disclosing it.
- Accuracy outranks elegance. Flag every mismatch even if minor.

OUTPUT FORMAT
Missing information; top five findings; accuracy gaps as two tables (Undisclosed processing | Where it should appear) and (Notice statement | Practice | Issue); content checklist (Element | Status | Passage | Regimes flagged); special cases; clarity review; overpromises; drafted additions; follow-up actions. Close with: Assumptions made; [VERIFY] points by regime.`,
    example: {
      scenario:
        'A mobile fitness app serving users in the EU, UK and California added an analytics SDK and a model-training feature last quarter; its privacy notice was last updated two years ago.',
      result:
        'An accuracy list showing the SDK vendor, device identifiers and use of workout data for model training are undisclosed, a statement that "we do not share data with third parties" contradicted by practice, a checklist with retention and transfer safeguards marked missing, health-related data flagged as a special case needing confirmation in each regime, and drafted paragraphs for the gaps.',
    },
  },
  {
    id: 'global-employment-contract-reviewer',
    name: 'Employment Contract Reviewer',
    description: 'Reviews an employment contract or offer letter for missing terms, one-sided clauses and points needing local-law checks.',
    jurisdiction: 'global',
    category: 'employment',
    tags: ['review', 'workforce', 'assessment', 'employment-contract', 'restrictive-covenants'],
    sources: [
      { citation: 'The employment contract, offer letter and incorporated policies supplied', authority: 'primary', note: 'What was offered and agreed. Handbooks and policies may or may not be contractual.' },
      { citation: 'Employment law of the place of work, including mandatory minimum terms', authority: 'primary', note: 'Minimum notice, pay, working time, leave, probation limits, termination protection and the enforceability of post-termination restrictions vary widely and often override the contract. The skill flags these points and does not state any country’s rule.' },
      { citation: 'Applicable collective agreements or awards', authority: 'regulator', note: 'May set terms that the individual contract cannot undercut.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-non-compete-mapper', 'us-worker-classification', 'uk-ir35-status-assessor', 'au-modern-award-matcher', 'ca-termination-entitlements'],
    whatItDoes:
      'Reviews an employment agreement or offer letter from the side you specify — employer or employee — and produces a term-by-term picture: what is promised on role, pay, bonus, equity, hours, place of work, leave, probation, notice and termination; what is discretionary or can be changed unilaterally; and what restricts the employee during and after employment. It flags terms that are missing, internally inconsistent or unusually one-sided, and separately lists every point where local mandatory law is likely to override or supplement the document, as specific questions for a local employment lawyer. It gives negotiation points or drafting fixes for your side.',
    whenToUse:
      'Before issuing an offer or contract, when a candidate or employee asks for changes, when an individual is deciding whether to sign, and when harmonising contracts across countries. It cannot tell you what a country’s law requires; treat the local-law list as the agenda for local advice.',
    inputs: [
      { name: 'Contract documents', description: 'The offer letter, employment agreement and any documents it incorporates (bonus plan, equity terms, policies).', required: true },
      { name: 'Your side and goals', description: 'Whether you act for employer or employee, and what matters most.', required: true },
      { name: 'Place of work and role', description: 'Country and region of work, seniority, sector, remote or hybrid arrangements.', required: true },
      { name: 'Deal discussed', description: 'What was agreed verbally or by email, to check against the paper.' },
      { name: 'Workforce context', description: 'Any collective agreement, visa dependency or prior service with the group.' },
    ],
    outputs: [
      { name: 'Terms summary', description: 'Each key term with clause reference, marked fixed, discretionary or changeable.' },
      { name: 'Gaps and inconsistencies', description: 'Missing terms and conflicts between documents or with the deal discussed.' },
      { name: 'One-sided and high-impact clauses', description: 'Terms that shift risk heavily, with their practical effect.' },
      { name: 'Local-law question list', description: 'Specific points where mandatory law may override or add to the contract.' },
      { name: 'Negotiation points or fixes', description: 'Proposed changes with wording for your side.' },
    ],
    prompt: `You are an employment lawyer reviewing an employment contract for the side named in the inputs.

INPUTS
- Documents: <offer letter, employment agreement, incorporated plans and policies>
- Your side and goals: <employer or employee; priorities>
- Place of work and role: <country and region; seniority; sector; remote or hybrid>
- Deal discussed: <what was agreed informally, optional>
- Workforce context: <collective agreement, visa, prior service>

TASK
1. MISSING INFORMATION. List what you need and do not have, especially incorporated documents that set bonus, equity or policies.
2. STATUS CHECK. Note whether the document describes employment or another relationship, the employing entity, and whether the place of work and the governing law clause point to the same country. Flag a mismatch.
3. TERMS SUMMARY. Tabulate with clause references: employer entity; job title, duties and reporting line; start date and any conditions (checks, references, right to work); recognition of prior service; probation; place of work and mobility; hours, overtime and flexibility; salary and review; bonus and commission; equity or long-term incentives and what happens to them on leaving; benefits; holiday and other leave; sickness; expenses; notice by each side; payment in place of notice; garden leave; grounds for summary termination; severance or redundancy terms; and retirement or pension. Mark each as FIXED, DISCRETIONARY (employer decides) or CHANGEABLE (employer may vary).
4. DURING-EMPLOYMENT OBLIGATIONS. Review exclusivity and outside activities, confidentiality, intellectual property and inventions (including work outside hours and pre-existing work), data and monitoring, conflicts of interest and compliance with policies.
5. POST-TERMINATION RESTRICTIONS. For each restriction (non-compete, non-solicitation of customers or staff, non-dealing, confidentiality), record its scope, territory, duration, trigger and any payment for it. Do not assess enforceability; state that it depends heavily on local law and the facts [VERIFY LOCALLY].
6. GAPS AND INCONSISTENCIES. Identify terms that are missing, blank, contradictory between documents, or different from the deal discussed. Note any term left to a policy that can be changed without agreement.
7. ONE-SIDED OR HIGH-IMPACT CLAUSES. Flag and explain the practical effect of: wide unilateral variation rights; discretionary pay elements described as if guaranteed; clawback and repayment clauses (training, relocation, sign-on); deductions from pay; forfeiture of bonus or equity on leaving; very short or asymmetric notice; broad definitions of cause or misconduct; mobility or duty changes without consent; mandatory arbitration or waiver of collective claims; and assignment of inventions beyond the job.
8. LOCAL-LAW QUESTION LIST. Write specific questions for a local employment lawyer on each area where mandatory law commonly overrides contracts: minimum pay and overtime; maximum hours and rest; minimum leave; probation limits; minimum notice and termination protection; required written particulars and language; restrictions on deductions and clawback; validity of post-termination restrictions and any required compensation; inventor rights; data and monitoring rules; applicable collective terms; and limits on arbitration or choice of foreign law.
9. PROPOSALS. For your side, list changes as REQUIRED or ADVISABLE with replacement wording, most important first. For an employee, include questions to ask the employer.

RULES
- Never state what the law of any country requires or whether a clause is enforceable. Put the point in the local-law question list.
- Do not assume policies or plans are favourable; if not supplied, mark the term [DOCUMENT NOT SUPPLIED].
- Quote the clause when a term is discretionary or changeable; the exact words matter.
- Do not advise on immigration or tax status; flag them.
- Keep the review balanced for the side stated; do not draft terms intended to deprive a worker of mandatory rights.

OUTPUT FORMAT
Missing information; status check; terms summary table (Term | What it says | Clause | Fixed, discretionary or changeable); obligations during employment; post-termination restrictions table (Restriction | Scope | Territory | Duration | Paid? | Clause); gaps and inconsistencies; one-sided clauses with effect; local-law question list; proposals with wording. Close with: Assumptions made; documents still needed.`,
    example: {
      scenario:
        'A senior engineer in Germany receives an English-language contract from a US parent company, governed by Delaware law, with a 12-month non-compete, a "discretionary" bonus described in the recruiter’s email as guaranteed, and a clause assigning all inventions.',
      result:
        'A terms table marking the bonus discretionary against the deal discussed, a status check flagging the mismatch between governing law and place of work, the non-compete recorded with no payment stated, a twelve-point local-law question list covering restriction compensation, inventor rights and notice, and three required changes with wording for the employee to propose.',
    },
  },
  {
    id: 'global-workplace-investigation-planner',
    name: 'Workplace Investigation Planner',
    description: 'Plans a workplace investigation and structures the report: scope, interviews, evidence, findings and fairness checks.',
    jurisdiction: 'global',
    category: 'employment',
    tags: ['programme-design', 'workforce', 'drafting', 'investigation', 'whistleblowing'],
    sources: [
      { citation: 'The organisation’s own policies: disciplinary, grievance, anti-harassment, whistleblowing and investigation procedures', authority: 'secondary', note: 'The investigation should follow the organisation’s published process; departing from it is a common ground of challenge.' },
      { citation: 'Employment, whistleblower-protection, data protection and privilege law of the place of work', authority: 'primary', note: 'Rights to be accompanied, time limits, confidentiality duties, retaliation protection, recording rules, employee-representative involvement and whether the investigation is privileged all vary by jurisdiction. Flagged, not stated.' },
      { citation: 'Workplace investigation practice guidance', authority: 'secondary', note: 'Method on impartiality, evidence handling and reasoned findings.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-acas-disciplinary-checker', 'eu-whistleblower-intake-triage', 'global-chronology-builder', 'us-litigation-hold-builder', 'global-transcript-summary'],
    whatItDoes:
      'Sets up a workplace investigation so that it is fair, proportionate and defensible. From the complaint or concern it frames the allegations as specific, answerable questions, defines scope and what is out of scope, tests the choice of investigator for independence, and plans evidence preservation, interviews in a sensible order with question outlines, and interim measures. It builds in the fairness checks that investigations are attacked on — the respondent knowing the case and having a real chance to answer, both sides’ evidence being weighed, and findings resting on evidence. It then provides a report skeleton that separates evidence, findings of fact and conclusions, and stops short of deciding sanction.',
    whenToUse:
      'When a complaint, grievance, whistleblowing report or suspected misconduct needs investigating; when taking over a stalled investigation; and when reviewing a draft report before it goes to a decision-maker. Serious matters — possible crimes, regulatory breaches, senior executives, safety risks — should be escalated to counsel before the plan is finalised.',
    inputs: [
      { name: 'Complaint or concern', description: 'What has been alleged, by whom, about whom, and when and how it was raised.', required: true },
      { name: 'People and context', description: 'Roles and reporting lines of those involved, and any relationships that matter.', required: true },
      { name: 'Applicable policies', description: 'The organisation’s relevant procedures and any timescales they set.', required: true },
      { name: 'Evidence known so far', description: 'Documents, messages, systems and witnesses already identified.' },
      { name: 'Jurisdiction and workforce', description: 'Place of work, any union, works council or employee representatives, and regulated status.' },
      { name: 'Draft findings', description: 'For a report review, the evidence gathered and the draft report.' },
    ],
    outputs: [
      { name: 'Terms of reference', description: 'Allegations framed as questions, scope, standard of proof and roles.' },
      { name: 'Investigation plan', description: 'Evidence preservation, interview order, timeline and interim measures.' },
      { name: 'Interview outlines', description: 'Open, non-leading question outlines per witness, with documents to put.' },
      { name: 'Fairness and risk checklist', description: 'Independence, confidentiality, retaliation, data and privilege points.' },
      { name: 'Report skeleton', description: 'A structure separating evidence, findings and conclusions, with an evidence matrix.' },
    ],
    prompt: `You are an employment lawyer and experienced workplace investigator planning an investigation.

INPUTS
- Complaint: <what is alleged, by whom, about whom, when and how raised>
- People and context: <roles, reporting lines, relevant relationships>
- Policies: <relevant procedures and their timescales>
- Evidence so far: <documents, messages, systems, witnesses identified>
- Jurisdiction and workforce: <place of work; union or works council; regulated status>
- Draft findings: <for a report review: evidence gathered and the draft report>

TASK
1. ESCALATION GATE. Check for matters that need counsel or senior escalation before planning continues: possible criminal conduct; risk to safety; a regulatory reporting duty; allegations against senior leadership or the people who would normally oversee the investigation; a protected whistleblowing disclosure; or likely litigation. If present, say so first and note that the structure of the investigation, including whether it should be conducted under legal privilege, is a decision for counsel [VERIFY].
2. MISSING INFORMATION. List what you need and do not have.
3. ALLEGATIONS. Reframe the complaint as numbered, specific allegations, each a factual question capable of being answered (who did what, to whom, when, where). Separate allegations of conduct from conclusions such as "bullying" or "fraud". Note which policy provision each relates to.
4. TERMS OF REFERENCE. Draft: the purpose; the allegations in scope; what is out of scope and how new issues will be handled; who commissions the investigation, who investigates, and who will decide any outcome (three different roles where possible); the standard to be applied to findings as the organisation’s policy states it; the timetable; and the form of the report.
5. INVESTIGATOR INDEPENDENCE. Test the proposed investigator for conflict: reporting lines, friendships, prior involvement, seniority relative to those involved, and competence for the subject matter. Recommend internal or external.
6. PRESERVE EVIDENCE. List the steps to preserve documents, messages, logs, CCTV and devices before those involved are alerted, respecting the organisation’s monitoring and data rules [VERIFY]. Refer to the litigation hold skill where disputes are likely.
7. INTERIM MEASURES. Consider what is needed to protect people and evidence during the investigation — changes to reporting lines, separation, leave — framed as neutral and no more than necessary, and flag that suspension or similar steps carry their own legal requirements [VERIFY].
8. INTERVIEW PLAN. Set the order (usually complainant, witnesses, then respondent, with follow-ups) and explain any departure. For each interviewee give an outline of open, non-leading questions by allegation, the documents to put to them, and standard opening and closing points: purpose, confidentiality expectations and their limits, no retaliation, the right to be accompanied where it applies [VERIFY], how notes will be taken and checked.
9. FAIRNESS CHECKLIST. Confirm the plan provides for: the respondent being told the allegations in enough detail to answer; access to the evidence they need to respond; a real opportunity to respond and to suggest witnesses; even-handed pursuit of evidence for and against; reasoned findings; reasonable speed; and support and protection from retaliation for the complainant and witnesses.
10. DATA, CONFIDENTIALITY AND REPRESENTATION. Flag points to confirm: handling of personal and sensitive data, access requests, recording interviews, confidentiality instructions and their lawful limits, and involvement of unions or employee representatives [VERIFY each].
11. REPORT SKELETON. Provide: summary; background; terms of reference; methodology; for each allegation — the evidence for and against, credibility observations tied to specific reasons, a finding of fact (substantiated, not substantiated, inconclusive) with reasons; overall conclusions against the policy; and matters for the decision-maker. Include an evidence matrix (Allegation | Evidence | Source | Supports or undermines).
12. REPORT REVIEW. If draft findings are supplied, test each finding against the evidence matrix and list findings not supported, evidence not addressed, and language that prejudges or strays into sanction.

RULES
- The investigator finds facts; they do not decide sanction. Keep recommendations on outcome out of the report unless the terms of reference ask for them.
- Never draft leading or accusatory questions, and never suggest tactics that mislead an interviewee.
- Do not assess whether a witness is truthful from demeanour; credibility observations must rest on consistency, corroboration and plausibility.
- Do not promise absolute confidentiality or anonymity; state the limits.
- Do not state what any country’s law requires; flag it [VERIFY].
- Never suggest accessing personal devices or accounts, or covert monitoring, without legal advice.

OUTPUT FORMAT
Escalation gate result; missing information; allegations list; terms of reference; independence check; evidence preservation steps; interim measures; interview plan with outlines; fairness checklist (Safeguard | How the plan provides it); data, confidentiality and representation points; report skeleton with evidence matrix; report review if applicable. Close with: Assumptions made; [VERIFY] points; Decisions for counsel or the commissioning manager.`,
    example: {
      scenario:
        'Two team members complain in writing that their manager makes demeaning comments in meetings and gave one of them a poor review after she objected; the HR partner who would normally investigate reports to that manager’s director.',
      result:
        'Five specific allegations separated from the label "bullying", terms of reference with the retaliation allegation in scope, an independence check recommending an investigator outside the reporting line, preservation of meeting chat logs and the review history before the manager is told, interview outlines for six people, a fairness checklist, and a report skeleton with an evidence matrix.',
    },
  },
  {
    id: 'global-regulation-obligation-mapper',
    name: 'Regulation Obligations Mapper',
    description: 'Turns the text of a law or regulation into a register of obligations: who must do what, by when, with what proof.',
    jurisdiction: 'global',
    category: 'regulatory',
    tags: ['extraction', 'assessment', 'regulatory-change', 'programme-design', 'obligations-register'],
    sources: [
      { citation: 'The legislative or regulatory text supplied by the user', authority: 'primary', note: 'The register is extracted from this text only. Supply the current consolidated version; the skill cannot tell whether the text has been amended.' },
      { citation: 'Related delegated acts, regulator rules and guidance supplied by the user', authority: 'guidance', note: 'Detail and interpretation often sit outside the main instrument. Guidance is recorded as guidance, not as an obligation.' },
      { citation: 'Compliance practice on obligations registers', authority: 'secondary', note: 'A method for turning legal text into owned, testable requirements.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-horizon-scanner', 'global-policy-drafter', 'cross-strictest-rule-resolver', 'eu-member-state-delta', 'global-legal-document-summary'],
    whatItDoes:
      'Reads a statute, regulation, rulebook chapter or licence condition that you paste in and converts it into an obligations register: each duty as a separate row stating who it binds, what must be done or not done, the trigger, the deadline or frequency, the exceptions, the evidence that would show compliance, and the provision it comes from. It first works out whether and in what capacity the instrument applies to your organisation from its scope and definitions, separates binding duties from powers, definitions and guidance, records application dates and transitional provisions, and flags ambiguous wording and cross-references to text you have not supplied.',
    whenToUse:
      'When a new or amended instrument needs to be turned into something a business can implement: after a horizon scan identifies a change, when building or refreshing a compliance register, when scoping a gap analysis, or when briefing control owners. It extracts from the text provided; it does not confirm that the text is current or complete.',
    inputs: [
      { name: 'Instrument text', description: 'The full text of the provisions to be mapped, with article or section numbering, and its version date.', required: true },
      { name: 'Organisation profile', description: 'What the organisation does, where, its size and regulated status, and the roles it might hold under the instrument.', required: true },
      { name: 'Related materials', description: 'Delegated acts, technical standards, regulator rules or guidance to be read alongside.' },
      { name: 'Existing controls', description: 'Current policies and controls, for an initial gap view.' },
      { name: 'Register format', description: 'Any fixed columns or taxonomy to use.' },
    ],
    outputs: [
      { name: 'Applicability analysis', description: 'Whether the instrument applies, in what role, with the scope provisions and definitions relied on.' },
      { name: 'Obligations register', description: 'One row per duty with subject, action, trigger, timing, exceptions, evidence and source provision.' },
      { name: 'Timeline', description: 'Application dates, transitional periods and recurring deadlines.' },
      { name: 'Ambiguities and dependencies', description: 'Unclear wording, undefined terms and cross-references to text not supplied.' },
      { name: 'Initial gap view', description: 'Obligations with no matching control, if controls were supplied.' },
    ],
    prompt: `You are a regulatory compliance lawyer converting legal text into an obligations register.

INPUTS
- Instrument text: <the provisions with numbering; title, issuing body and version date>
- Organisation profile: <activities, locations, size, regulated status, possible roles under the instrument>
- Related materials: <delegated acts, standards, regulator rules, guidance; optional>
- Existing controls: <policies and controls, optional>
- Register format: <fixed columns or taxonomy, optional>

TASK
1. IDENTIFY THE TEXT. State the instrument, issuing body, version date and which provisions were supplied. State clearly that you cannot confirm the text is current, complete or in force, and that this must be checked against the official source [VERIFY].
2. MISSING INFORMATION. List provisions referred to but not supplied (definitions, annexes, schedules, other instruments) and organisation facts needed to decide applicability.
3. APPLICABILITY. Using the scope, territorial and definitions provisions, analyse whether the instrument applies to the organisation and in which role or roles. Quote the provisions relied on. Identify thresholds and exemptions and the facts needed to apply them. Give the conclusion as APPLIES, DOES NOT APPEAR TO APPLY or DEPENDS ON (state the fact), and treat borderline cases as needing legal advice.
4. CLASSIFY PROVISIONS. Sort each provision as: OBLIGATION (binding duty on someone); PROHIBITION; CONDITIONAL OBLIGATION (applies only if a trigger occurs); RIGHT of another person that implies a duty; REGULATOR POWER; DEFINITION or SCOPE; PENALTY; TRANSITIONAL; or GUIDANCE (non-binding). Only the first four generate register rows.
5. EXTRACT OBLIGATIONS. For each duty relevant to the organisation’s role, create one row: a short title; who is bound; the action required or prohibited, in plain words faithful to the text; the trigger; the deadline, period or frequency; exceptions and conditions; the form required (written, notified to whom, published where); records to keep; and the exact provision reference. Split compound provisions so each row holds one testable duty. Quote the operative words where the modal verb or qualifier matters ("shall", "must", "may", "without undue delay", "appropriate").
6. EVIDENCE. For each row, suggest what evidence would demonstrate compliance, labelled as a suggestion.
7. DETAIL FROM RELATED MATERIALS. Where related materials add detail, attach it to the relevant row and label its status: binding secondary rule or non-binding guidance. Do not merge guidance into the obligation itself.
8. TIMELINE. List entry-into-force and application dates, transitional and grandfathering provisions, first deadlines and recurring cycles, exactly as the text states them. Do not calculate a date the text does not fix.
9. PENALTIES AND ENFORCEMENT. Record the consequences the text attaches to non-compliance, by reference, without commentary on likelihood.
10. AMBIGUITIES. List wording that is open-textured or unclear, undefined terms, apparent conflicts between provisions, and places where the duty depends on secondary rules not yet made. For each, state the competing readings.
11. GAP VIEW. If controls were supplied, mark each row COVERED, PARTLY COVERED or NO CONTROL IDENTIFIED, as an initial view for the control owner to confirm.

RULES
- Extract only from the supplied text. Never add an obligation, deadline, threshold or penalty from memory, even for a well-known instrument.
- Never state that the text is current or in force; mark [VERIFY] and name the official source to check.
- Keep the text’s own qualifiers. Do not turn "appropriate measures" into a specific measure, or "may" into "must".
- Guidance is not law. Label it and keep it separate.
- Where applicability turns on an interpretation, give both readings and do not choose for the user.
- One duty per row; if you cannot say who must do what, the row is not finished.

OUTPUT FORMAT
Text identification and currency warning; missing information; applicability analysis; the obligations register as a table (ID | Title | Who | Action | Trigger | Timing | Exceptions | Form and records | Provision | Suggested evidence | Status of any added detail); timeline; penalties by reference; ambiguities with competing readings; gap view. Close with: Assumptions made; [VERIFY] points; Questions for legal.`,
    example: {
      scenario:
        'A payments company’s compliance lead pastes in 40 articles of a new operational resilience regulation and its draft technical standard, and needs a register for control owners by the end of the week.',
      result:
        'An applicability analysis placing the company in scope as a regulated entity subject to a size threshold it must confirm, a register of 57 single-duty rows with provision references and quoted qualifiers, technical-standard detail attached and labelled as draft, a timeline of three application dates, nine ambiguities with competing readings, and fourteen rows with no control identified.',
    },
  },
];
