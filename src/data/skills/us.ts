import type { Skill } from '../../types/skill';

/**
 * United States skills — federal law and the 50-state patchwork.
 */
export const usSkills: Skill[] = [
  {
    id: 'us-fifty-state-survey',
    name: '50-State Survey Builder',
    description: 'Frames a multi-state legal survey with per-state rules, outliers and a verification plan.',
    jurisdiction: 'us',
    category: 'research',
    tags: ['research', 'assessment', 'multi-state', 'survey', 'state-law', 'comparison'],
    whatItDoes:
      'Takes a legal question that varies by state and builds the survey scaffold: a normalised set of comparison dimensions, a per-state row for each, and — most usefully — a grouping of states into rule families so a 50-row table becomes four or five patterns plus a handful of outliers. Because state-by-state detail is exactly where an AI is most likely to be confidently wrong, every cell carries a confidence marker and the output ends with a verification plan ranked by how much a wrong answer would cost you.',
    whenToUse:
      'Before commissioning a full multi-state survey, when scoping the cost of a national rollout, or when you need to know quickly which states are the hard ones so outside counsel spend is targeted.',
    inputs: [
      { name: 'Legal question', description: 'The question to survey, e.g. "is a non-compete enforceable against an hourly worker?".', required: true },
      { name: 'States in scope', description: 'All 50, or a defined subset. Fewer states means deeper analysis.', required: true },
      { name: 'Comparison dimensions', description: 'What you want compared — thresholds, notice periods, exemptions, penalties.' },
      { name: 'Business context', description: 'Headcount by state, revenue exposure, or where the risk concentrates.' },
    ],
    outputs: [
      { name: 'Comparison table', description: 'One row per state across the agreed dimensions, each cell confidence-marked.' },
      { name: 'Rule families', description: 'States grouped into patterns, so the survey is readable rather than 50 unrelated facts.' },
      { name: 'Outlier states', description: 'The states whose rule does not fit any family, and why.' },
      { name: 'Verification plan', description: 'Which cells to check first, ranked by cost of error.' },
      { name: 'Practical summary', description: 'What a business could do that works in every state in scope.' },
    ],
    prompt: `You are a US research lawyer scoping a multi-state survey. Your job includes being explicit about where you may be wrong.

INPUTS
- Question: <the legal question that varies by state>
- States in scope: <all 50, or a list>
- Comparison dimensions: <e.g. threshold, notice period, exemptions, penalty, private right of action>
- Business context: <headcount by state, revenue exposure, operational footprint>

TASK
1. NORMALISE THE QUESTION: restate it so it can be answered identically for every state. Define each comparison dimension precisely enough that two researchers would fill the same cell the same way.
2. COMPARISON TABLE: one row per state, one column per dimension. Mark every cell:
   [HIGH] I am confident in this
   [MEDIUM] likely correct but verify
   [LOW] uncertain — do not rely on this without checking
   [UNKNOWN] I do not know; researching this is a task, not an answer
   Cite the statute or regulation by name and section where you can, and mark every citation [VERIFY].
3. RULE FAMILIES: group states into 3-6 patterns. Name each pattern by its rule, list its member states, and state the practical consequence of falling into it.
4. OUTLIERS: states that fit no family, with what makes them unusual.
5. VERIFICATION PLAN: which cells to check first, ranked by (business exposure x uncertainty). Say what source to check for each.
6. PRACTICAL SUMMARY: the position that would comply everywhere in scope ("the strictest common denominator"), and what it costs to adopt it.

RULES
- Never fabricate a statute section, effective date or dollar threshold. [UNKNOWN] is a valid and useful answer.
- State law changes frequently. Add a currency warning naming the areas most likely to have moved recently.
- Where a rule turns on a fact you were not given (worker's salary, company size, industry), say so instead of assuming.
- Do not let the table's neatness imply more confidence than the markers show.

OUTPUT FORMAT
Six sections matching the tasks above.`,
    example: {
      scenario:
        'A company with employees in 18 states wants to know where its standard non-solicit clause is unenforceable.',
      result:
        'Four rule families (near-total ban, income-threshold states, reasonableness-test states, notice-and-consideration states), three outliers, and a verification plan putting the two states holding 60% of headcount at the top of the checking list.',
    },
  },
  {
    id: 'us-worker-classification',
    name: 'Worker Classification Tester',
    description: 'Tests a working arrangement against federal and state contractor-classification standards.',
    jurisdiction: 'us',
    category: 'employment',
    tags: ['workforce', 'assessment', 'worker-classification', 'independent-contractor', 'abc-test', 'employment', 'misclassification'],
    whatItDoes:
      'Runs a described working arrangement through the classification tests that actually apply to it — the federal economic-reality analysis, the IRS common-law factors, and whichever state test governs where the worker sits, including the stricter ABC-style tests. It reports each test separately, because an arrangement can pass one and fail another, and identifies the specific facts that drive the risk so they can be changed rather than merely worried about.',
    whenToUse:
      'Before engaging a contractor, when a contractor relationship has quietly grown into something full-time, during an audit or a benefits claim, or when finance asks why a "vendor" has a company laptop and a manager.',
    inputs: [
      { name: 'Working arrangement', description: 'How the work is actually performed: control, schedule, tools, supervision, exclusivity, duration.', required: true },
      { name: 'Worker location', description: 'The state where the worker performs the work — this selects the applicable test.', required: true },
      { name: 'Business type', description: 'Your industry and what your usual course of business is.' },
      { name: 'Contract terms', description: 'The written agreement, if there is one.' },
      { name: 'Payment structure', description: 'Hourly, per project, retainer, expenses, benefits.' },
    ],
    outputs: [
      { name: 'Test-by-test analysis', description: 'Result under each applicable federal and state test, run separately.' },
      { name: 'Risk factors', description: 'The specific facts pushing toward employee status, ranked by weight.' },
      { name: 'Remediation options', description: 'Changes that would strengthen contractor status, and what each costs operationally.' },
      { name: 'Exposure estimate', description: 'The categories of liability that follow from misclassification.' },
      { name: 'Facts to confirm', description: 'Where the analysis depends on facts not supplied.' },
    ],
    prompt: `You are a US employment lawyer assessing worker classification risk.

INPUTS
- How the work is actually performed: <control over how/when work is done, schedule, location, tools and equipment, supervision, exclusivity, duration, integration into teams>
- Worker's state: <required — this selects the state test>
- Our industry and usual course of business: <required for ABC-style prong B>
- Written agreement: <paste, or "none">
- Payment structure: <hourly / project / retainer; expenses; benefits; other clients>

TASK
1. IDENTIFY THE TESTS that apply: the federal standard for wage-and-hour purposes, the IRS common-law analysis for tax purposes, and the test used by the worker's state. Name each and say what it governs — misclassification exposure is not a single question.
2. RUN EACH TEST SEPARATELY. For each factor or prong: the facts supplied, which way they point, and how much weight the factor carries. Conclude per test: likely employee / likely contractor / genuinely uncertain.
3. RISK FACTORS: rank the specific facts driving employee status. Be concrete — "the worker attends the daily standup and reports to a named manager" beats "there is some control".
4. REMEDIATION: for each risk factor, the change that would help, and the operational cost of making it. Distinguish changes to the paperwork from changes to how the work is actually done — and say plainly that only the latter changes the analysis.
5. EXPOSURE: the categories of liability if the classification is wrong (unpaid wages and overtime, employment taxes, benefits, penalties, and any state-specific consequences). Describe categories; do not invent penalty figures.
6. FACTS TO CONFIRM: what you would need to know to firm up an uncertain conclusion.

RULES
- Never state a state's test as settled unless you are confident; mark uncertain rules [VERIFY] and say what to check.
- Under ABC-style tests, treat prong B (outside the usual course of business) as usually decisive, and analyse it first.
- A written contract calling someone a contractor carries little weight; say so, and analyse the substance.
- Do not give a single overall verdict when the tests genuinely diverge. Report the divergence.

OUTPUT FORMAT
Six sections matching the tasks above, opening with a one-paragraph bottom line.`,
    example: {
      scenario:
        'A design agency has used the same "contractor" for two years, 35 hours a week, on client work, with an agency email address and a manager.',
      result:
        'Likely employee under every test run, with prong B identified as decisive because the work is the agency\'s core service — plus a remediation list separating cosmetic contract fixes from the substantive changes that would actually matter.',
    },
  },
  {
    id: 'us-privacy-request-router',
    name: 'State Privacy Request Router',
    description: 'Routes a consumer privacy request to the right state regime and response deadline.',
    jurisdiction: 'us',
    category: 'privacy',
    tags: ['data-protection', 'assessment', 'state-privacy', 'ccpa', 'consumer-rights', 'privacy-ops', 'routing'],
    whatItDoes:
      'Works out which of the growing set of US state consumer privacy laws applies to a given request, whether your business meets that state\'s applicability thresholds at all, and what the request actually obliges you to do. Because the state laws differ on deadlines, appeal rights, authorised-agent rules and sensitive-data handling, it produces a per-state answer and then a single operational plan built to the strictest applicable requirement.',
    whenToUse:
      'On every inbound consumer privacy request, and when designing the intake workflow that will handle them at volume.',
    inputs: [
      { name: 'The request', description: 'What was asked, when, and through which channel.', required: true },
      { name: 'Consumer state', description: 'The state of residence claimed or inferred.', required: true },
      { name: 'Business profile', description: 'Revenue, number of consumers whose data you process, and whether you sell or share data.', required: true },
      { name: 'Data categories', description: 'What you hold, including anything that counts as sensitive.' },
      { name: 'Agent status', description: 'Whether the request came from an authorised agent.' },
    ],
    outputs: [
      { name: 'Applicability check', description: 'Whether the state law applies to your business at all, with the thresholds tested.' },
      { name: 'Rights analysis', description: 'What the consumer is entitled to in that state, and what they are not.' },
      { name: 'Deadline and appeal path', description: 'Response window, extension conditions, and whether an appeal right exists.' },
      { name: 'Verification requirements', description: 'What identity proof the regime permits you to require.' },
      { name: 'Operational plan', description: 'A single workflow satisfying the strictest applicable requirement.' },
    ],
    prompt: `You are a US privacy operations specialist routing a consumer privacy request.

INPUTS
- The request: <what was asked, date received, channel>
- Consumer's state of residence: <claimed or inferred; say which>
- Our business: <annual revenue, number of state residents whose personal data we process, whether we sell or share personal data, whether we process sensitive data>
- Data we hold about this consumer: <categories, including sensitive categories>
- Authorised agent: <yes/no; if yes, what evidence of authority was provided>

TASK
1. APPLICABILITY: does the consumer's state have a comprehensive privacy law, and does our business meet its applicability thresholds? Walk through each threshold with the figures supplied. If we fall below every threshold, say so — and separately note any obligation that applies regardless (for example under a sector-specific or biometric statute).
2. RIGHT CLASSIFICATION: which right is being exercised (know/access, delete, correct, portability, opt out of sale or sharing, opt out of targeted advertising or profiling, limit use of sensitive data). Include rights implied by the wording.
3. ENTITLEMENT: what the consumer actually gets in that state, and what that state does NOT grant. Note any exemption that removes the data from scope entirely (employee data, B2B contact data, or data governed by a sector statute), and flag that these exemptions vary sharply by state — mark as [VERIFY].
4. DEADLINE: response window, when the clock starts, and the extension available with its conditions. Show the calculation from the date of receipt.
5. VERIFICATION AND AGENTS: what identity verification the regime permits, and what an authorised agent must provide.
6. APPEAL RIGHTS: whether the state requires an internal appeal mechanism, and what it must look like.
7. OPERATIONAL PLAN: one workflow that satisfies the strictest applicable requirement, plus the response template.

RULES
- The US state privacy landscape changes every legislative session. Mark every threshold, deadline and effective date [VERIFY] and name the source to check.
- Do not assume a state has a comprehensive law. If you are not confident, say so rather than guessing.
- Where residence is only inferred (from IP address or billing address), flag the risk of routing on a wrong inference.
- If the data is employee or B2B data, resolve the exemption question first — it may dispose of the request.

OUTPUT FORMAT
Seven sections matching the tasks above.`,
    example: {
      scenario:
        'A consumer emails asking the company to "stop selling my data and tell me everything you have", and their billing address is in a state with a comprehensive privacy law.',
      result:
        'An applicability walkthrough confirming the company crosses the processing threshold, a combined access plus opt-out classification, a calculated response date with the extension conditions, and a note that the appeal mechanism must be described in the response itself.',
    },
  },
  {
    id: 'us-ofac-export-screener',
    name: 'OFAC & Export Screener',
    description: 'Structures a sanctions and export-control screen for a counterparty or transaction.',
    jurisdiction: 'us',
    category: 'compliance',
    tags: ['screening', 'assessment', 'sanctions', 'ofac', 'export-control', 'trade-compliance'],
    whatItDoes:
      'Builds the screening analysis for a proposed transaction: who the real parties are once ownership is traced, which sanctions or export-control touchpoints the deal has, what the item or technology being transferred might be classified as, and which red flags in the fact pattern deserve escalation. It is explicitly a structuring tool — it tells you what to check and where the risk sits, and it never substitutes for running the actual government lists, which must be checked at source every time.',
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
      { name: 'Screening checklist', description: 'The specific lists and databases to run, with the identifiers to use for each.' },
      { name: 'Export classification questions', description: 'What must be determined about the item before it can move.' },
      { name: 'Red flag analysis', description: 'Indicators present in the fact pattern, with the escalation each warrants.' },
      { name: 'Licence trigger assessment', description: 'Whether an authorisation is likely required, and what to confirm.' },
      { name: 'Documentation pack', description: 'What to record so the screen is defensible later.' },
    ],
    prompt: `You are a US trade compliance analyst structuring a sanctions and export-control screen. You CANNOT check live government lists — your job is to build the analysis and tell the user exactly what to run.

INPUTS
- Counterparty: <legal name, aliases, trading names, addresses, country of incorporation>
- Ownership: <direct and indirect owners with percentages; note any unknown layers>
- Transaction: <what is being sold, licensed, shipped or transferred; origin and destination; value>
- Item or technology: <technical description; encryption, dual-use or defence characteristics>
- End use and end user: <stated purpose, ultimate user, any onward transfer or re-export>
- Payment path: <banks and countries involved>

TASK
1. PARTY MAP: list every party requiring screening — counterparty, parents, subsidiaries, beneficial owners, intermediaries, freight forwarders, banks, and the end user. Aggregate ownership: interests held by blocked persons aggregate across owners, and a majority aggregate interest is itself blocking. Flag any ownership layer you cannot see through as a HIGH-priority diligence gap.
2. SCREENING CHECKLIST: name the lists and databases to run and the identifiers to use for each (legal name, each alias, transliterations, address, registration number, vessel or aircraft identifiers). Include the denied-party and entity lists relevant to export control, not only the sanctions lists.
3. JURISDICTIONAL TOUCHPOINTS: identify every hook that could bring the transaction into US scope — US persons involved, US-origin goods or technology, US dollar clearing, US software or cloud infrastructure, and any re-export or de minimis US content issue.
4. EXPORT CLASSIFICATION: list the questions that must be answered to classify the item, and who can answer them (engineering, the manufacturer, or outside counsel). Do NOT assign a classification code yourself — say what to determine and why it matters.
5. RED FLAGS: go through the fact pattern and name every indicator present — mismatched end use, a customer with no relevant business, an unusually circuitous shipping route, reluctance to give end-use information, payment from an unrelated third country, requests to under-declare value. For each, state the escalation it warrants.
6. LICENCE TRIGGER: on the facts, is an authorisation likely required? State this as a question to resolve with the relevant agency or counsel, with the specific factors that drive it.
7. DOCUMENTATION: what to record — screening date, lists run, versions, results, who reviewed, and the basis for proceeding.

RULES
- State clearly at the top: sanctions and export lists change constantly and must be checked at source on the day of the transaction. This analysis structures the check; it does not perform it.
- Never assert that a party is or is not listed. You cannot know that.
- Never assign an export control classification number. Identify what needs classifying.
- Where the facts disclose a possible violation that has already occurred, say so plainly and recommend immediate specialist counsel before any further action, including before contacting the counterparty.

OUTPUT FORMAT
Seven sections matching the tasks above, opening with the currency warning.`,
    example: {
      scenario:
        'A hardware startup is asked to ship networking equipment to a new distributor in a third country, with payment coming from a fourth.',
      result:
        'A party map that surfaces two unseen ownership layers as high-priority gaps, a checklist naming every list and identifier to run, four red flags including the payment mismatch and the circuitous route, and a set of classification questions for the engineering team to answer before anything ships.',
    },
  },
  {
    id: 'us-privilege-log-builder',
    name: 'Privilege Log Builder',
    description: 'Turns a set of withheld documents into defensible privilege log entries.',
    jurisdiction: 'us',
    category: 'litigation',
    tags: ['disputes', 'drafting', 'privilege', 'discovery', 'litigation', 'work-product', 'privilege-log'],
    whatItDoes:
      'Converts document metadata and descriptions into privilege log entries that state a basis specific enough to survive a challenge, without disclosing the privileged content itself. It applies the distinction between attorney-client privilege and work product deliberately, flags the classic weak spots — documents copied to non-lawyers, business advice dressed as legal advice, communications that may have waived privilege — and refuses to assert a basis the supplied facts do not support.',
    whenToUse:
      'When producing documents in litigation or an investigation, when responding to a challenge to an existing log, or when auditing a log prepared under time pressure before it goes out.',
    inputs: [
      { name: 'Document metadata', description: 'Date, author, recipients, cc/bcc, subject, document type, and a content description.', required: true },
      { name: 'Privilege basis claimed', description: 'Attorney-client, work product, common interest, or unsure.' },
      { name: 'Legal personnel list', description: 'Who counts as a lawyer or a lawyer\'s agent — essential for the analysis.', required: true },
      { name: 'Litigation context', description: 'The matter, whether litigation was anticipated, and from what date.' },
      { name: 'Format requirements', description: 'Any log format required by the court, the rules, or the parties\' agreement.' },
    ],
    outputs: [
      { name: 'Privilege log', description: 'Formatted entries with a specific, non-disclosing basis for each document.' },
      { name: 'Weak entries', description: 'Documents whose claim is vulnerable, with the reason and a recommendation.' },
      { name: 'Waiver risks', description: 'Third-party recipients and other facts that may have destroyed privilege.' },
      { name: 'Redaction candidates', description: 'Documents better produced in redacted form than withheld entirely.' },
      { name: 'Categorical proposal', description: 'Where a categorical log entry may be available instead of document-by-document.' },
    ],
    prompt: `You are a litigation associate preparing a privilege log.

INPUTS
- Documents: <for each: date, author, recipients, cc, bcc, type, subject line, brief content description>
- Privilege basis claimed: <attorney-client / work product / common interest / unsure>
- Legal personnel: <names and roles of lawyers, in-house counsel, paralegals and agents of counsel>
- Litigation context: <matter, when litigation was first anticipated, jurisdiction>
- Required log format: <court rule, local rule, or agreed protocol; or "standard">

TASK
1. LOG ENTRIES. For each document produce: number, date, author (with role), recipients (with roles), document type, privilege asserted, and a description that states the basis specifically without revealing the privileged content. "Email reflecting legal advice regarding contract negotiation" is defensible; "email" is not, and quoting the advice defeats the purpose.
2. BASIS ANALYSIS. For each entry state which elements are satisfied:
   - Attorney-client: a communication, between privileged persons, made in confidence, for the purpose of obtaining or providing legal advice.
   - Work product: prepared in anticipation of litigation or for trial, by or for a party or its representative; note whether it is opinion or fact work product.
   Where an element is not supported by the supplied facts, say so — do not assert the privilege anyway.
3. WEAK ENTRIES: documents whose claim is vulnerable. Common patterns to check: business advice from a lawyer rather than legal advice; documents where the lawyer is only cc'd; documents circulated widely; documents that pre-date the anticipation of litigation; attachments assumed to inherit the parent's privilege.
4. WAIVER RISKS: non-privileged third-party recipients, forwarding outside the privileged group, and documents shared with a party whose common interest is not established.
5. REDACTION CANDIDATES: documents containing a privileged passage inside an otherwise producible document — usually better redacted than withheld.
6. CATEGORICAL PROPOSAL: where a large, homogeneous set could be logged categorically, propose the category description and the argument for it.

RULES
- Never write a description that discloses the substance of the advice. If you cannot describe a document without disclosing it, say so and flag it for counsel.
- Never assert a privilege the supplied facts do not support. An unsupported entry is worse than no entry — it puts the whole log in doubt.
- Treat every attachment as a separate document requiring its own basis.
- Flag any document where the author or recipient is not on the legal personnel list but the claim depends on them being counsel.
- Privilege law varies by jurisdiction and by state-versus-federal forum. Note where the applicable law could change the outcome.

OUTPUT FORMAT
Log table, then the five analysis sections.`,
    example: {
      scenario:
        'A team must log 400 withheld documents in a commercial dispute, many of them emails on which the general counsel was cc\'d.',
      result:
        'A formatted log plus 34 entries flagged weak — mostly cc-only emails on commercial terms where no legal advice is apparent — and eleven documents recommended for redaction and production rather than withholding.',
    },
  },
  {
    id: 'us-local-rules-formatter',
    name: 'Local Rules Formatter',
    description: 'Builds a court-specific formatting and filing checklist for a document before it goes out.',
    jurisdiction: 'us',
    category: 'litigation',
    tags: ['disputes', 'review', 'local-rules', 'court-filing', 'formatting', 'litigation', 'compliance'],
    whatItDoes:
      'Produces the pre-filing checklist for a specific court: the formatting, length, certificate, exhibit and service requirements that a filing must satisfy, drawn from the layers of rules that actually govern it — the national rules, the district or state-wide rules, the local rules, and the individual judge\'s standing order, which is the layer most often missed. It then reviews your draft against that checklist and flags what is wrong. Because these rules are hyper-local and change without much notice, every item is presented as something to verify against the court\'s own site, not as settled fact.',
    whenToUse:
      'Before any filing in an unfamiliar court, when filing before a judge you have not appeared before, or when a filing has already been rejected and you need to find out why.',
    inputs: [
      { name: 'Court', description: 'The specific court and division, e.g. "N.D. Cal., San Francisco Division".', required: true },
      { name: 'Judge', description: 'The assigned judge — standing orders are the most commonly missed rule layer.' },
      { name: 'Document type', description: 'Motion, brief, complaint, opposition, reply, declaration, and so on.', required: true },
      { name: 'The draft', description: 'Optional. Supplying it turns the checklist into a review.' },
      { name: 'Filing context', description: 'Deadline, whether it is under seal, and whether exhibits or a proposed order are attached.' },
    ],
    outputs: [
      { name: 'Rule-layer map', description: 'Every layer of rules that governs the filing, and where to find each.' },
      { name: 'Formatting checklist', description: 'Page limits, type size, spacing, margins, captions, numbering and citation format.' },
      { name: 'Required components', description: 'Certificates, tables, proposed orders, declarations and exhibit conventions.' },
      { name: 'Draft review', description: 'Where the supplied draft departs from the checklist.' },
      { name: 'Filing mechanics', description: 'Electronic filing, courtesy copies, sealing procedure and service.' },
      { name: 'Verification list', description: 'Every item to confirm on the court\'s own site before filing.' },
    ],
    prompt: `You are a litigation paralegal preparing a filing for a specific court. Local rules change frequently and vary by judge — treat everything you produce as a checklist to verify, not as authority.

INPUTS
- Court and division: <required, be specific>
- Assigned judge: <name, or "unassigned">
- Document type: <motion, opposition, reply, complaint, declaration, etc.>
- The draft (optional): <paste>
- Context: <filing deadline, under seal?, exhibits?, proposed order?, page count so far>

TASK
1. RULE-LAYER MAP: list every layer that governs this filing, from the national rules down to the judge's standing order and any case-specific scheduling order. For each layer, say where it is published and what it typically controls. Emphasise that the judge's standing order routinely overrides the local rules on page limits, courtesy copies and meet-and-confer requirements.
2. FORMATTING CHECKLIST: the items to confirm — page or word limits and whether the limit counts words or pages, typeface and size, line spacing, margins, line numbering, caption block format, footer requirements, citation format, and whether a certificate of compliance is required. Mark each [VERIFY AT SOURCE].
3. REQUIRED COMPONENTS: table of contents, table of authorities, certificate of service, certificate of compliance, proposed order, declarations, exhibit numbering and separators, and any statement of undisputed facts. Note which are required by rule and which are merely customary.
4. DRAFT REVIEW (if a draft was supplied): every departure from the checklist you can detect from the text, with the fix. Include structural problems — a missing table of authorities, an argument section exceeding a stated limit, exhibits referenced but not attached.
5. FILING MECHANICS: electronic filing conventions and file-naming, courtesy copy requirements, sealing procedure, service method, and the filing deadline including how the court treats after-hours filing.
6. VERIFICATION LIST: a numbered list of every item to confirm on the court's own website before filing, in priority order, naming the page or document to check.

RULES
- Never state a specific page limit, deadline or formatting rule as fact. Present each as "commonly X — verify". Getting this wrong gets filings struck.
- Always put the judge's standing order high in the verification list. It is the layer most often missed and the one most likely to differ.
- If you do not know a court's conventions, say so rather than generalising from other courts.
- Flag any deadline calculation as requiring independent confirmation, including how the court counts weekends and holidays.

OUTPUT FORMAT
Six sections matching the tasks above, opening with the verification warning.`,
    example: {
      scenario:
        'An associate must file an opposition brief in a federal district court where the firm has not appeared before, in front of a newly assigned judge.',
      result:
        'A rule-layer map putting the judge\'s standing order at the top of the verification list, a formatting checklist that catches the draft\'s missing certificate of compliance and over-length argument section, and a filing-mechanics section flagging the courtesy-copy question to confirm before the deadline.',
    },
  },
];
