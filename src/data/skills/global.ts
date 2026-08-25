import type { Skill } from '../../types/skill';

/**
 * Global skills — jurisdiction-neutral workflows usable by any legal team.
 */
export const globalSkills: Skill[] = [
  {
    id: 'global-playbook-maker',
    name: 'Playbook Maker',
    description: 'Turns a set of signed contracts into a negotiation playbook with fallback positions.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['contract-lifecycle', 'programme-design', 'playbook', 'negotiation', 'contract-review', 'standards', 'legal-ops'],
    sources: [
      { citation: 'General commercial contracting and legal operations practice', authority: 'secondary', note: 'A workflow skill: no single binding instrument governs it. The output must still be checked against the law of the governing jurisdiction.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-playbook-cleaner', 'global-smart-redline', 'global-draft-builder'],
    whatItDoes:
      'Reads a sample of your executed agreements and reverse-engineers the positions your team actually accepts, rather than the ones your template asks for. For each key clause it derives a preferred position, one or two fallbacks, and a walk-away line, then records how often each position appeared in the sample so reviewers know which fallbacks are genuinely routine. The output is structured so it can be handed to a reviewer, pasted into a CLM tool, or used as the system prompt for a first-pass review agent.',
    whenToUse:
      'When contract review is inconsistent across reviewers, when onboarding new counsel or a managed-service provider, or when you need a defensible baseline before delegating first-pass review to a junior or an AI reviewer.',
    inputs: [
      { name: 'Executed agreements', description: 'Five to twenty signed contracts of the same type (e.g. customer MSAs), as text.', required: true },
      { name: 'Clause list', description: 'The clauses to cover — liability, indemnity, term, IP, data protection, and so on.', required: true },
      { name: 'Risk appetite', description: 'Any hard limits the business has already set, e.g. "never uncapped liability outside IP and confidentiality".' },
      { name: 'Deal tiers', description: 'Optional thresholds (contract value, strategic accounts) where different fallbacks apply.' },
    ],
    outputs: [
      { name: 'Clause-by-clause playbook', description: 'Preferred / fallback 1 / fallback 2 / walk-away for each clause, with model language.' },
      { name: 'Frequency evidence', description: 'How often each position appeared in the sample, so fallbacks are grounded in practice.' },
      { name: 'Escalation matrix', description: 'Which positions a reviewer can accept alone and which need legal or business sign-off.' },
      { name: 'Open questions', description: 'Clauses where the sample was too inconsistent to derive a position.' },
    ],
    prompt: `You are a senior commercial contracts lawyer building a negotiation playbook from precedent.

INPUTS
- Executed agreements: <paste 5-20 signed contracts of the same type>
- Clauses to cover: <list, e.g. limitation of liability, indemnity, IP, term & termination, data protection, insurance, assignment>
- Known risk limits: <e.g. no uncapped liability outside IP/confidentiality/data breach>
- Deal tiers (optional): <e.g. Standard under $100k, Strategic over $100k>

TASK
For each clause in the list:
1. Extract the position actually agreed in each contract in the sample. Quote the operative words.
2. Derive a PREFERRED position (the best outcome you actually achieved, not an aspiration).
3. Derive FALLBACK 1 and FALLBACK 2, each with model language a reviewer can paste.
4. State a WALK-AWAY line: the position below which the deal must be escalated or refused.
5. Report frequency: "N of M contracts in the sample landed at or better than fallback 1."
6. Note who must approve each fallback, given the risk limits supplied.

RULES
- Ground every position in the sample. If fewer than 3 contracts address a clause, mark it INSUFFICIENT EVIDENCE and list it under Open Questions instead of inventing a position.
- Do not import positions from your general training as if they came from the sample. Keep derived positions and suggested market practice in clearly separate sections.
- Flag any clause where the sample is internally contradictory, and say which contracts conflict.

OUTPUT FORMAT
A markdown table per clause (Position | Language | Frequency | Approver), followed by:
- Escalation matrix
- Open questions
- Assumptions you made`,
    example: {
      scenario:
        'A 40-person SaaS legal team has twelve signed enterprise MSAs and no written playbook. Every reviewer negotiates liability caps differently.',
      result:
        'A playbook showing that 9 of 12 deals landed at a 12-month-fees cap with a 2x super-cap for data breach, making that the preferred position and 2x / uncapped-for-breach the documented fallback — plus a flag that the indemnity clause was inconsistent across four deals and needs a policy decision.',
    },
  },
  {
    id: 'global-draft-builder',
    name: 'Draft Builder',
    description: 'Assembles a first-draft agreement from your playbook, deal terms and precedent language.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['contract-lifecycle', 'drafting', 'templates', 'playbook', 'first-draft', 'contract-generation'],
    sources: [
      { citation: 'General commercial contracting and legal operations practice', authority: 'secondary', note: 'A workflow skill: no single binding instrument governs it. The output must still be checked against the law of the governing jurisdiction.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-playbook-maker', 'cross-contract-localizer', 'global-smart-redline'],
    whatItDoes:
      'Takes a deal summary and produces a complete, internally consistent first draft rather than a fill-in-the-blanks template. It selects clause language from your playbook or precedent, resolves defined terms so they are used consistently throughout, wires cross-references correctly, and leaves explicit bracketed placeholders wherever a commercial decision has not yet been made. Every substantive choice is logged in a drafting note so the reviewing lawyer can see what was assumed.',
    whenToUse:
      'When you need a first draft in hours rather than days, when a deal is standard enough that starting from scratch is waste, or when a business team keeps asking for "just a simple agreement" and you want a controlled starting point.',
    inputs: [
      { name: 'Deal summary', description: 'Parties, subject matter, commercials, term, and any agreed heads of terms.', required: true },
      { name: 'Agreement type', description: 'MSA, DPA, NDA, SOW, reseller agreement, and so on.', required: true },
      { name: 'Playbook or precedent', description: 'Your preferred clause language. Without this the draft falls back to neutral market language.' },
      { name: 'Governing law and forum', description: 'Chosen law and dispute resolution mechanism.' },
    ],
    outputs: [
      { name: 'Complete first draft', description: 'Full agreement with numbered clauses, defined terms and schedules.' },
      { name: 'Drafting notes', description: 'Every assumption, selected fallback and deviation from the playbook, clause by clause.' },
      { name: 'Open decisions list', description: 'Bracketed items requiring a commercial or legal decision before sending.' },
      { name: 'Consistency check', description: 'Defined terms used but not defined, unused definitions, and broken cross-references.' },
    ],
    prompt: `You are a transactional lawyer producing a first draft for internal review.

INPUTS
- Agreement type: <e.g. Master Services Agreement>
- Deal summary: <parties, subject matter, pricing, term, key commercial points>
- Playbook / precedent language: <paste, or write "none — use neutral market-standard language">
- Governing law and forum: <e.g. laws of England and Wales, courts of England>
- Known constraints: <e.g. must incorporate a DPA by reference, insurance minimum $5m>

TASK
Produce a complete first draft with:
1. Parties and recitals.
2. A definitions section containing only terms actually used in the draft.
3. Numbered operative clauses covering the commercial deal and the standard protections appropriate to this agreement type.
4. Schedules for anything better placed outside the body (services, pricing, SLAs, security measures).
5. Signature block.

RULES
- Use the playbook language verbatim where it exists. Where you must deviate, mark the clause [DEVIATION] and explain why in the drafting notes.
- Put every unresolved commercial decision in [SQUARE BRACKETS WITH A QUESTION], never a silent guess.
- Keep defined terms consistent: capitalise on use, define once, delete unused definitions.
- Number clauses and cross-reference by number; verify each cross-reference points to the clause you intended.
- Do not invent facts about the parties or the deal. If a fact is missing, bracket it.

OUTPUT FORMAT
1. The draft agreement.
2. DRAFTING NOTES: clause number, what you chose, why, and confidence.
3. OPEN DECISIONS: numbered list of bracketed items with the question each poses.
4. CONSISTENCY CHECK: undefined terms, unused definitions, broken cross-references.`,
    example: {
      scenario:
        'Sales agrees heads of terms for a two-year data-analytics engagement with a mid-market customer and needs paper by Friday.',
      result:
        'A 24-clause MSA with services and pricing schedules, six bracketed open decisions (including whether the customer gets a benchmarking right), and a note that the liability cap deviates from the playbook because the deal exceeds the strategic-account threshold.',
    },
  },
  {
    id: 'global-obligation-extraction',
    name: 'Contract Obligation Extraction',
    description: 'Pulls every obligation, deadline and condition out of a contract into a trackable register.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['contract-lifecycle', 'extraction', 'obligations', 'contract-management', 'deadlines', 'post-signature', 'legal-ops'],
    sources: [
      { citation: 'General commercial contracting and legal operations practice', authority: 'secondary', note: 'A workflow skill: no single binding instrument governs it. The output must still be checked against the law of the governing jurisdiction.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-contract-finder', 'global-contract-triage'],
    whatItDoes:
      'Reads an executed contract and produces a structured obligation register: who owes what, to whom, by when, and what happens if it is missed. It distinguishes recurring obligations from one-off ones, converts relative deadlines ("within 30 days of the Effective Date") into absolute dates when the effective date is supplied, and separates true obligations from mere permissions and conditions precedent. Every row cites the clause it came from, so nothing in the register is unverifiable.',
    whenToUse:
      'Immediately after signature, during post-merger integration when you inherit an unfamiliar contract estate, or when preparing for an audit or renewal and you need to know what you actually promised.',
    inputs: [
      { name: 'Executed contract', description: 'Full text including schedules and any amendments or side letters.', required: true },
      { name: 'Effective date', description: 'Enables conversion of relative deadlines into calendar dates.' },
      { name: 'Our party name', description: 'So obligations can be split into ours and theirs.' },
      { name: 'Owner mapping', description: 'Optional map of obligation type to internal team, e.g. security to InfoSec.' },
    ],
    outputs: [
      { name: 'Obligation register', description: 'Table of obligation, obligor, obligee, trigger, deadline, clause reference and consequence.' },
      { name: 'Calendar of dates', description: 'Absolute dates for notices, renewals, reports and reviews.' },
      { name: 'Conditions and permissions', description: 'Items that look like obligations but are actually conditions or rights, kept separate.' },
      { name: 'Ambiguity log', description: 'Obligations whose scope, deadline or owner cannot be determined from the text.' },
    ],
    prompt: `You are a contract manager building an obligation register from an executed agreement.

INPUTS
- Contract text (including schedules, amendments, side letters): <paste>
- Effective date: <YYYY-MM-DD, or "unknown">
- Our party: <name as it appears in the contract>
- Owner mapping (optional): <e.g. security to InfoSec, invoicing to Finance>

TASK
Extract every obligation into a register with these columns:
| # | Obligation (verbatim or close paraphrase) | Obligor | Obligee | Trigger | Deadline | Recurring? | Clause | Consequence of breach | Suggested owner |

Then produce:
1. A DATE CALENDAR: every absolute date, sorted, derived from the effective date where deadlines are relative. Show your arithmetic.
2. NOT-OBLIGATIONS: rights, permissions ("may"), and conditions precedent, listed separately so they are not tracked as duties.
3. AMBIGUITY LOG: obligations where the deadline, scope or obligor is genuinely unclear, with the competing readings.

RULES
- Distinguish "shall" (obligation), "may" (right), and "will use reasonable endeavours" (qualified obligation) — and record the qualifier.
- Quote or tightly paraphrase; never summarise an obligation into something broader or narrower than the text.
- Every row must cite a clause number. If you cannot cite one, do not include the row.
- If the effective date is unknown, leave deadlines relative and say so — do not guess a date.
- Include obligations buried in schedules, SLAs and incorporated policies.

OUTPUT FORMAT
Markdown tables as above, in the order listed.`,
    example: {
      scenario:
        'A company acquires a competitor and inherits 60 customer contracts nobody on the current team negotiated.',
      result:
        'A register showing 23 obligations under one flagship contract, including a quarterly security-report duty nobody had been performing and a 90-day non-renewal notice falling due in six weeks.',
    },
  },
  {
    id: 'global-contract-finder',
    name: 'Contract Finder',
    description: 'Searches a contract set by meaning, not keywords, and returns clause-level citations.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['contract-lifecycle', 'extraction', 'search', 'due-diligence', 'clause-search', 'portfolio', 'legal-ops'],
    sources: [
      { citation: 'General commercial contracting and legal operations practice', authority: 'secondary', note: 'A workflow skill: no single binding instrument governs it. The output must still be checked against the law of the governing jurisdiction.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-obligation-extraction', 'global-smart-redline'],
    whatItDoes:
      'Answers questions across a set of agreements — "which contracts let the customer audit us?", "where did we agree to uncapped liability?" — by reasoning about what clauses mean rather than matching words. It returns the specific contracts and clause numbers that answer the question, quotes the operative language, and explicitly lists the contracts it examined and excluded, so a null result is trustworthy rather than merely empty.',
    whenToUse:
      'During due diligence, when a regulator or customer asks a portfolio-wide question, when assessing exposure to a new risk, or any time the honest answer to "do any of our contracts say X?" is currently "we would have to read them all".',
    inputs: [
      { name: 'Contract set', description: 'The agreements to search, each clearly labelled with a name or id.', required: true },
      { name: 'Question', description: 'What you need to find, in plain language.', required: true },
      { name: 'Scope filters', description: 'Optional limits by counterparty, date range, contract type or value.' },
    ],
    outputs: [
      { name: 'Ranked matches', description: 'Contract, clause number, quoted language and why it answers the question.' },
      { name: 'Near misses', description: 'Clauses that partly answer the question, with what is missing.' },
      { name: 'Excluded set', description: 'Contracts reviewed and ruled out, so a negative result is auditable.' },
      { name: 'Coverage note', description: 'Anything that could not be searched — missing schedules, unreadable text.' },
    ],
    prompt: `You are a legal analyst running a meaning-based search across a contract set.

INPUTS
- Contracts (each labelled with an id or name): <paste, or list of documents>
- Question: <plain-language question, e.g. "which contracts give the customer an on-site audit right?">
- Scope filters (optional): <counterparty, date range, contract type>

TASK
1. For each contract, decide whether it answers the question. Search by legal meaning, not keyword: an audit right may be phrased as "inspect", "examine records", or "appoint an independent reviewer".
2. Return MATCHES: contract id, clause number, verbatim quote of the operative words, and one sentence on why it answers the question.
3. Return NEAR MISSES: clauses that are adjacent but do not actually answer it, and what is missing.
4. Return EXCLUDED: every contract you reviewed and ruled out, with a short reason. This list must account for every contract supplied.
5. Return COVERAGE GAPS: contracts missing schedules, truncated text, or otherwise not fully searchable.

RULES
- Quote exactly. Never paraphrase inside quotation marks.
- Rank matches by how squarely they answer the question, not by document order.
- If nothing matches, say so plainly and rely on the EXCLUDED list to show the search was complete.
- Do not speculate about contracts not supplied.

OUTPUT FORMAT
Four markdown sections: MATCHES (table), NEAR MISSES, EXCLUDED, COVERAGE GAPS.`,
    example: {
      scenario:
        "A buyer's diligence request asks whether any customer contract contains a change-of-control termination right.",
      result:
        'Three contracts flagged with quoted change-of-control clauses, two near misses where the right is limited to acquisition by a competitor, and an auditable list of the other 41 contracts confirmed clean.',
    },
  },
  {
    id: 'global-smart-redline',
    name: 'Smart Redline',
    description: 'Reviews a counterparty draft against your playbook and proposes specific redlines with rationale.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'redline', 'contract-review', 'negotiation', 'playbook', 'markup'],
    sources: [
      { citation: 'General commercial contracting and legal operations practice', authority: 'secondary', note: 'A workflow skill: no single binding instrument governs it. The output must still be checked against the law of the governing jurisdiction.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-playbook-maker', 'global-contract-triage', 'au-acl-unfair-terms'],
    whatItDoes:
      'Compares an incoming third-party paper against your playbook positions and produces concrete edits — the exact replacement wording, not "consider narrowing this". Each proposed change is tagged by severity so a reviewer can triage: blockers that must change, negotiables worth trading, and acceptable-as-is clauses that need no time spent. It also drafts the covering note to the counterparty explaining the changes in business language.',
    whenToUse:
      'On every inbound third-party paper, especially when volume exceeds reviewer capacity or when you want junior reviewers working from a consistent standard.',
    inputs: [
      { name: 'Counterparty draft', description: 'The agreement you have been asked to sign, as text.', required: true },
      { name: 'Playbook', description: 'Your preferred and fallback positions. Without it, the review uses neutral market standards.' },
      { name: 'Deal context', description: 'Value, strategic importance and leverage — this changes what is worth fighting for.' },
      { name: 'Non-negotiables', description: 'Absolute limits, e.g. no uncapped liability, no unilateral amendment rights.' },
    ],
    outputs: [
      { name: 'Redline table', description: 'Clause, current text, proposed replacement text, severity and rationale.' },
      { name: 'Triage summary', description: 'Blockers, negotiables and accept-as-is, so review effort can be prioritised.' },
      { name: 'Covering note', description: 'A short message to the counterparty framing the changes commercially.' },
      { name: 'Missing clauses', description: 'Protections absent from the draft that should be added.' },
    ],
    prompt: `You are a commercial lawyer redlining a counterparty's draft.

INPUTS
- Counterparty draft: <paste>
- Our playbook: <paste, or "none — apply neutral market-standard positions">
- Deal context: <value, strategic importance, our leverage>
- Non-negotiables: <absolute limits>

TASK
Review every substantive clause and produce a redline table:
| Clause | Their text (quoted) | Our proposed text | Severity | Rationale |

Severity levels:
- BLOCKER — breaches a non-negotiable or creates unacceptable exposure; must change to sign.
- MATERIAL — meaningfully worse than our playbook; push, with a defined fallback.
- MINOR — worth raising if we are already negotiating, not worth a round trip on its own.
- ACCEPT — no change needed. Say so explicitly so reviewers skip it.

Then produce:
1. TRIAGE SUMMARY: counts by severity and the three changes that matter most.
2. MISSING CLAUSES: protections absent from the draft, with proposed language.
3. COVERING NOTE: 150-200 words to the counterparty, business tone, explaining the key asks and why they are reasonable.

RULES
- Proposed text must be complete, insertable clause language — never "consider adding a carve-out".
- Give a fallback for every MATERIAL item so the reviewer can concede in a controlled way.
- Quote their text exactly so the diff is verifiable.
- Do not redline for style. Only change what changes risk or commercial outcome.

OUTPUT FORMAT
Redline table, then the three sections above.`,
    example: {
      scenario:
        'A vendor sends its own MSA with uncapped customer indemnities and a unilateral right to amend the service description.',
      result:
        'Two blockers with replacement wording (mutual cap at 12 months fees; amendments only on 60 days notice with a termination right), five material items each with a fallback, eleven clauses marked accept-as-is, and a covering note ready to send.',
    },
  },
  {
    id: 'global-contract-triage',
    name: 'Contract Triage',
    description: 'Scores incoming contracts by risk and routes them to self-serve, quick review or full legal review.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['contract-lifecycle', 'assessment', 'triage', 'intake', 'risk-scoring', 'legal-ops', 'workflow'],
    sources: [
      { citation: 'General commercial contracting and legal operations practice', authority: 'secondary', note: 'A workflow skill: no single binding instrument governs it. The output must still be checked against the law of the governing jurisdiction.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-smart-redline', 'global-obligation-extraction'],
    whatItDoes:
      'Applies a transparent scoring rubric to an inbound contract — value, data sensitivity, liability exposure, term length, regulatory touchpoints, counterparty type — and recommends a review path. Crucially it shows the score breakdown, so the routing decision can be audited and the rubric tuned over time rather than remaining an opaque judgement call. Low-risk paper gets a green light with a short checklist; high-risk paper gets routed with a specific list of what the reviewer should look at first.',
    whenToUse:
      'At contract intake, when legal is a bottleneck and most requests are low-risk, or when you want to justify a self-serve lane to the business with evidence rather than instinct.',
    inputs: [
      { name: 'Contract or summary', description: 'Full text, or a structured intake summary if the text is not yet available.', required: true },
      { name: 'Routing rubric', description: 'Your thresholds for each risk factor. A default rubric is used if omitted.' },
      { name: 'Review lanes', description: 'The paths available, e.g. self-serve, paralegal, counsel, GC sign-off.' },
    ],
    outputs: [
      { name: 'Risk score', description: 'Total score with a per-factor breakdown showing how it was reached.' },
      { name: 'Recommended lane', description: 'The review path, with the single factor that drove the decision.' },
      { name: 'Reviewer briefing', description: 'The three to five things the assigned reviewer should look at first.' },
      { name: 'Escalation triggers', description: 'Facts that, if they turn out to be true, should bump the contract to a higher lane.' },
    ],
    prompt: `You are a legal operations lead triaging an inbound contract request.

INPUTS
- Contract or intake summary: <paste>
- Routing rubric: <paste, or "use defaults">
- Available review lanes: <e.g. self-serve, paralegal review, counsel review, GC sign-off>

DEFAULT RUBRIC (use if none supplied; score each factor 0-5, weight in brackets)
- Contract value / total exposure [x3]
- Personal or sensitive data involved [x3]
- Liability position: capped, super-capped, uncapped [x3]
- Term length and termination flexibility [x2]
- Regulated activity or regulated counterparty [x2]
- Deviation from our standard paper [x2]
- IP ownership or licence-out [x2]
- Counterparty leverage / non-negotiable paper [x1]

TASK
1. Score each factor, stating the evidence from the document for that score.
2. Total the weighted score and place it in a band: 0-20 self-serve, 21-45 quick review, 46+ full legal review.
3. Recommend a lane and name the single factor that drove it.
4. Write a REVIEWER BRIEFING: the 3-5 issues to look at first, in priority order.
5. List ESCALATION TRIGGERS: unverified facts that would raise the band if confirmed.

RULES
- Show the arithmetic. A score with no working is not auditable.
- Where the document is silent on a factor, score it as unknown and treat unknowns as escalation triggers rather than zeros.
- Never route to self-serve when personal data, uncapped liability, or a regulated activity is present, regardless of total score.

OUTPUT FORMAT
Score table, band and lane, reviewer briefing, escalation triggers.`,
    example: {
      scenario:
        'Marketing submits a one-year, $8,000 contract with a webinar platform that will process attendee email addresses.',
      result:
        'A score of 24 landing in quick review — low value, but the personal-data factor blocks the self-serve lane — with a briefing telling the reviewer to check the DPA, sub-processor list and retention period first.',
    },
  },
  {
    id: 'global-data-rights-request-handler',
    name: 'Data Rights Request Handler',
    description: 'Triages a data subject or consumer rights request, sets the response clock and drafts the reply.',
    jurisdiction: 'global',
    category: 'privacy',
    tags: ['data-protection', 'drafting', 'data-subject-rights', 'consumer-rights', 'dsar', 'privacy-ops', 'response-drafting'],
    sources: [
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu' },
      { citation: 'California Consumer Privacy Act, as amended by the California Privacy Rights Act', authority: 'primary', publisher: 'State of California', jurisdiction: 'us' },
      { citation: 'Personal Data Protection Act 2012 (Singapore)', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg' },
      { citation: 'Privacy Act 1988 (Cth) and the Australian Privacy Principles', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au' },
      { citation: 'Data subject and consumer rights regimes generally', authority: 'secondary', note: 'This skill spans several regimes. It identifies which apply and what each requires; it does not state the current text of any one of them.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-privacy-request-router', 'eu-dpia-ropa-builder', 'sg-pdpa-obligation-mapper', 'au-privacy-ndb-assessor'],
    whatItDoes:
      'Classifies an incoming data subject or consumer rights request by the right exercised (access, erasure, portability, objection, rectification, restriction), identifies which privacy regimes plausibly apply given the requester’s location and your operations, calculates the response deadline under each, and drafts both the acknowledgement and the substantive response. It also flags where an exemption may apply and what evidence you would need to rely on it, rather than assuming every request must be fulfilled in full.',
    whenToUse:
      'On receipt of any request that might engage an individual’s data or privacy rights under any regime — including one that arrives as an angry support ticket rather than a formal letter.',
    inputs: [
      { name: 'The request', description: 'The message as received, with its date and channel.', required: true },
      { name: 'Requester context', description: 'Location, relationship to you (customer, employee, applicant), and identity-verification status.' },
      { name: 'Data inventory', description: 'What categories of data you hold about this person and where.' },
      { name: 'Applicable regimes', description: 'The privacy laws you are subject to, if known.' },
    ],
    outputs: [
      { name: 'Classification', description: 'Which right or rights are being exercised, including implied ones.' },
      { name: 'Deadline calculation', description: 'Response due date under each applicable regime, with extension conditions.' },
      { name: 'Exemption analysis', description: 'Exemptions that may apply and the evidence needed to rely on each.' },
      { name: 'Draft correspondence', description: 'Acknowledgement letter and substantive response, ready to adapt.' },
      { name: 'Internal action list', description: 'Systems to search, teams to notify, and identity checks to complete.' },
    ],
    prompt: `You are a privacy operations specialist handling an inbound data subject or consumer rights request.

INPUTS
- The request as received: <paste, with date and channel>
- Requester: <location, relationship to us, identity verified yes/no>
- Data we hold about them: <categories and systems, if known>
- Regimes we are subject to: <e.g. GDPR, UK GDPR, CCPA/CPRA, PDPA, Privacy Act 1988>

TASK
1. CLASSIFY: which right(s) is the requester exercising? Include rights implied by the wording even if not named ("delete my account" may be erasure; "stop emailing me" may be objection plus a marketing opt-out).
2. REGIME ANALYSIS: which regimes plausibly apply and why. Where residence and processing location point to different regimes, address each.
3. DEADLINES: response due date under each regime from the date of receipt (or from identity verification where the regime allows). State the extension available and its conditions. Show the calculation.
4. EXEMPTIONS: which exemptions or refusal grounds might apply (third-party data, legal privilege, manifestly unfounded or excessive requests, ongoing legal claims, retention obligations). For each, state what evidence you would need.
5. DRAFT the acknowledgement letter and the substantive response, leaving [BRACKETS] for facts you do not have.
6. INTERNAL ACTIONS: systems to search, teams to involve, identity verification steps.

RULES
- Never assume identity is verified. If it is not, the first action is verification — and say how that affects the clock.
- Do not advise refusing a request on a bare assertion; tie every refusal ground to evidence.
- Where regimes give different deadlines, plan to the shortest.
- Flag if the request also looks like a complaint, a breach report, or a litigation trigger.

OUTPUT FORMAT
Six sections matching the tasks above.`,
    example: {
      scenario:
        'A former employee in Ireland emails "send me everything you have on me and delete my file" to a shared HR mailbox.',
      result:
        'Classified as a combined access and erasure request under the GDPR with a one-month clock from verified identity, a flag that erasure is likely restricted by statutory employment-record retention, and a draft acknowledgement plus a partial-refusal response explaining the retention basis.',
    },
  },
  {
    id: 'global-playbook-cleaner',
    name: 'Playbook Cleaner',
    description: 'Audits an existing playbook for contradictions, stale positions and gaps.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'playbook', 'audit', 'quality', 'maintenance', 'legal-ops'],
    sources: [
      { citation: 'General commercial contracting and legal operations practice', authority: 'secondary', note: 'A workflow skill: no single binding instrument governs it. The output must still be checked against the law of the governing jurisdiction.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-playbook-maker', 'global-smart-redline'],
    whatItDoes:
      'Reads a playbook that has accreted over years and finds the places it has quietly broken: positions that contradict each other, fallbacks stricter than the preferred position, references to superseded laws or repealed mechanisms, clauses covered twice with different answers, and gaps where a common negotiation point has no guidance at all. Each finding comes with a proposed fix, so the audit produces a corrected playbook rather than a list of complaints.',
    whenToUse:
      'Annually, after a regulatory change that touches your standard positions, after a merger that combines two playbooks, or when reviewers start ignoring the playbook because it no longer matches practice.',
    inputs: [
      { name: 'Current playbook', description: 'The full document, however messy.', required: true },
      { name: 'Recent executed deals', description: 'Optional. Lets the audit compare stated positions against actual practice.' },
      { name: 'Regulatory changes', description: 'Any laws or standards that have changed since the playbook was written.' },
    ],
    outputs: [
      { name: 'Findings register', description: 'Each issue classified as contradiction, stale, duplicate, gap or drift, with severity.' },
      { name: 'Proposed fixes', description: 'Replacement wording for each finding.' },
      { name: 'Practice drift report', description: 'Where signed deals systematically depart from the stated position.' },
      { name: 'Cleaned playbook', description: 'A revised version with fixes applied and changes marked.' },
    ],
    prompt: `You are auditing a contract negotiation playbook for internal consistency and currency.

INPUTS
- Current playbook: <paste>
- Recent executed deals (optional): <paste, for practice comparison>
- Regulatory or standards changes since it was written: <list, or "unknown">

TASK
Produce a findings register. Classify each finding as:
- CONTRADICTION — two parts of the playbook give incompatible guidance.
- INVERTED FALLBACK — a fallback is equal to or stricter than the preferred position.
- STALE — cites a superseded law, repealed standard, renamed regulator or obsolete mechanism.
- DUPLICATE — the same clause is addressed in two places with different answers.
- GAP — a clause commonly negotiated in this agreement type has no guidance.
- VAGUE — guidance that cannot be applied ("negotiate a reasonable cap") with no threshold.
- DRIFT — supplied deals show practice consistently departing from the stated position.

For each finding give: severity (high/medium/low), the quoted text, why it is a problem, and a PROPOSED FIX as replacement wording.

Then produce a CLEANED PLAYBOOK with fixes applied, marking every change [REVISED] and every new section [ADDED].

RULES
- Quote the problematic text so each finding is verifiable.
- Where two positions conflict, do not silently pick one — flag it, recommend one, and explain the trade-off.
- Flag anything you believe is stale but cannot confirm, rather than asserting a legal change you are not sure of.
- Only report DRIFT where at least three deals show the same departure.

OUTPUT FORMAT
Findings register (table), then the cleaned playbook.`,
    example: {
      scenario:
        'A playbook written in 2019 and amended twice now tells reviewers both to accept and to reject mutual liability caps, in different sections.',
      result:
        'Eleven findings including that contradiction, three references to a transfer mechanism that no longer exists, an inverted fallback on insurance minimums, and a gap on AI-usage clauses — with a revised playbook attached.',
    },
  },
  {
    id: 'global-horizon-scanner',
    name: 'Horizon Scanner',
    description: 'Turns a set of regulatory developments into a prioritised, owner-assigned action plan.',
    jurisdiction: 'global',
    category: 'compliance',
    tags: ['regulatory-change', 'assessment', 'horizon-scanning', 'monitoring', 'prioritisation', 'compliance'],
    sources: [
      { citation: 'Regulatory horizon-scanning and change-management practice', authority: 'secondary', note: 'A method for triaging developments. The developments themselves must be supplied by the user; this skill does not know what has been published.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['cross-four-regime-gap-analyzer', 'eu-member-state-delta'],
    whatItDoes:
      'Takes raw regulatory developments — consultations, new statutes, enforcement decisions, guidance updates — and filters them against your actual business footprint to separate what matters from what merely sounds important. Each relevant item gets an impact assessment, a compliance deadline, the internal owner best placed to act, and a first concrete step. Items judged irrelevant are listed with the reason, so the scan is defensible if a regulator later asks why you did nothing.',
    whenToUse:
      'On a monthly or quarterly compliance cycle, when entering a new market, or when the board asks what is coming and the honest current answer is a folder of unread newsletters.',
    inputs: [
      { name: 'Developments', description: 'Regulatory items to assess — titles, dates, summaries or full text.', required: true },
      { name: 'Business profile', description: 'Sectors, markets, products, data types, headcount and regulated activities.', required: true },
      { name: 'Existing controls', description: 'Optional. Lets the scan identify where you are already covered.' },
      { name: 'Reporting period', description: 'The window the scan covers.' },
    ],
    outputs: [
      { name: 'Prioritised register', description: 'Relevant developments ranked by impact and urgency.' },
      { name: 'Impact assessments', description: 'What each change requires, by when, and which part of the business it touches.' },
      { name: 'Action plan', description: 'First concrete step and suggested owner for each item.' },
      { name: 'Not-applicable log', description: 'Items screened out, with the reason, for audit purposes.' },
      { name: 'Board summary', description: 'A short non-technical brief on the top items.' },
    ],
    prompt: `You are a regulatory affairs analyst producing a horizon-scanning report.

INPUTS
- Developments to assess: <list or paste — consultations, statutes, guidance, enforcement actions>
- Our business profile: <sectors, markets, products, data types, headcount, regulated activities, licences held>
- Existing controls (optional): <policies, programmes, certifications>
- Period covered: <e.g. Q3 2026>

TASK
1. RELEVANCE SCREEN: for each development, decide APPLIES / MONITOR / NOT APPLICABLE against the business profile, with a one-line reason.
2. For each APPLIES or MONITOR item produce an assessment:
   - What changes, in plain language
   - Who it binds and from when (in-force date, transition period, first compliance deadline)
   - Impact on us: which processes, contracts, systems or teams
   - Effort: low / medium / high, with the reason
   - Gap: what our existing controls already cover and what they do not
3. PRIORITISE by deadline proximity, impact and effort, and explain the ranking.
4. ACTION PLAN: first concrete step and suggested owner for each APPLIES item.
5. NOT-APPLICABLE LOG: every screened-out item with its reason — this is the audit trail.
6. BOARD SUMMARY: 200 words, no jargon, on the three items that matter most.

RULES
- State dates precisely and mark any date you are not certain of as [VERIFY].
- Do not assert what a law requires beyond what the supplied material says; where you rely on general knowledge, label it and recommend verification.
- Resist inflating relevance. A clear NOT APPLICABLE with a reason is more useful than a hedge.

OUTPUT FORMAT
Six sections matching the tasks above.`,
    example: {
      scenario:
        'A 300-person B2B software company with EU and Australian customers reviews 40 developments from the last quarter.',
      result:
        'Six items marked applies — led by an AI transparency obligation with a 14-month runway — 31 screened out with reasons, and a board summary explaining why the AI item needs a product owner assigned this month rather than next year.',
    },
  },
  {
    id: 'global-legal-research',
    name: 'Legal Research Assistant',
    description: 'Structures a legal research question and produces a memo with an explicit confidence trail.',
    jurisdiction: 'global',
    category: 'research',
    tags: ['research', 'drafting', 'memo', 'analysis', 'citations', 'verification'],
    sources: [
      { citation: 'Legal research and drafting methodology', authority: 'secondary', note: 'A method, not a statement of law. All substantive output requires verification against primary sources.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-fifty-state-survey', 'eu-member-state-delta'],
    whatItDoes:
      'Converts a loose question into a properly framed legal issue, works through the analysis in IRAC structure, and returns a memo that separates what it is confident about from what must be verified. It is deliberately built to make its own limits visible: every proposition carries a confidence marker, every citation is flagged for checking against the primary source, and the counter-argument section is mandatory rather than optional.',
    whenToUse:
      'At the start of any research task, to frame the question and map the territory before you spend time in a paid research database — not as a substitute for one.',
    inputs: [
      { name: 'Research question', description: 'The question, however roughly phrased.', required: true },
      { name: 'Jurisdiction', description: 'The governing law. Materially changes the answer.', required: true },
      { name: 'Facts', description: 'The relevant facts, including the ones that seem unhelpful.' },
      { name: 'Source materials', description: 'Optional statutes, cases or guidance to reason from directly.' },
      { name: 'Audience', description: 'Partner, client, or business stakeholder — sets the register.' },
    ],
    outputs: [
      { name: 'Framed issue', description: 'The question restated precisely, with sub-issues.' },
      { name: 'IRAC analysis', description: 'Issue, rule, application and conclusion for each sub-issue.' },
      { name: 'Confidence trail', description: 'Every proposition marked high, medium or low confidence, with the reason.' },
      { name: 'Verification checklist', description: 'Each citation and proposition to confirm against primary sources.' },
      { name: 'Counter-arguments', description: 'The strongest case against the conclusion.' },
      { name: 'Next steps', description: 'What to research next and where to look.' },
    ],
    prompt: `You are a research lawyer preparing a memo. Accuracy about your own uncertainty matters more than sounding authoritative.

INPUTS
- Question: <as asked>
- Jurisdiction and governing law: <required>
- Facts: <include unhelpful facts too>
- Source materials (optional): <statutes, cases, guidance to reason from>
- Audience: <partner / client / business stakeholder>

TASK
1. FRAME THE ISSUE: restate the question precisely as a legal issue. Break it into sub-issues. Note any threshold question that could dispose of the matter.
2. ANALYSIS: for each sub-issue use IRAC — Issue, Rule, Application, Conclusion.
3. CONFIDENCE TRAIL: mark every substantive proposition:
   [HIGH] settled, and I can state it with confidence
   [MEDIUM] generally accepted but jurisdiction-sensitive or fact-sensitive
   [LOW] uncertain, contested, or possibly out of date — treat as a lead, not an answer
   [VERIFY] a specific citation, date, threshold or figure that must be checked at source
4. COUNTER-ARGUMENTS: the strongest argument against your conclusion, argued properly rather than as a strawman.
5. VERIFICATION CHECKLIST: every citation and [VERIFY] item, with what to check and where.
6. NEXT STEPS: what to research next, in priority order.

RULES
- Never invent a case name, citation, section number or date. If you are not confident a source exists as described, say "I believe there is authority on this point — verify" and describe what to look for instead of fabricating a reference.
- Prefer primary sources. Where you reason from general knowledge, say so.
- If the jurisdiction changes the answer materially, say which way and why.
- If the question cannot be answered without a fact you were not given, name that fact.

OUTPUT FORMAT
Six sections matching the tasks above. Open with a three-sentence bottom line, marked with its own confidence level.`,
    example: {
      scenario:
        "A GC asks whether a non-compete in a departing engineer's contract is enforceable, without saying which state or country the engineer works in.",
      result:
        'A memo that identifies jurisdiction as the threshold question, sets out the analysis under two plausible candidates, marks enforceability thresholds as [VERIFY], and returns a checklist of six items to confirm before advising.',
    },
  },
];
