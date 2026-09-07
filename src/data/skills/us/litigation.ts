import type { Skill } from '../../../types/skill';

/**
 * US litigation and dispute skills — preservation, privilege, deadlines,
 * compulsory process and court practice.
 */
export const usLitigationSkills: Skill[] = [
  {
    id: 'us-litigation-hold-builder',
    name: 'Litigation Hold Builder',
    description: 'Scopes a preservation duty and drafts the hold notice, custodian list and data-source map.',
    jurisdiction: 'us',
    category: 'litigation',
    tags: ['disputes', 'drafting', 'litigation-hold', 'preservation', 'ediscovery', 'spoliation', 'custodians'],
    sources: [
      { citation: 'Federal Rules of Civil Procedure', authority: 'primary', publisher: 'United States Courts', jurisdiction: 'us', url: 'https://www.uscourts.gov', note: 'The federal rules address the discovery of electronically stored information and the consequences of failing to preserve it. Read the current text of the relevant rule before relying on any statement of the standard.' },
      { citation: 'Case law on the duty to preserve and on spoliation', authority: 'primary', jurisdiction: 'us', note: 'When the duty attaches, how far it reaches and what follows from a breach are largely judge-made and differ between circuits and between state courts. Confirm the standard in the actual forum.' },
      { citation: 'State rules of civil procedure and state preservation doctrine', authority: 'primary', jurisdiction: 'us', note: 'A matter in state court may be governed by a materially different preservation and sanctions regime. Identify the forum first.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-privilege-log-builder', 'global-obligation-extraction', 'us-subpoena-triage'],
    whatItDoes:
      'Turns "we think something is coming" into a defensible preservation position. It works out when the duty to preserve plausibly attached and on what facts, maps the custodians and the systems their data actually lives in — including the messaging apps, personal devices and auto-deleting channels that hold notices routinely miss — and drafts a notice in language a custodian will act on rather than skim. It also handles the half of the lifecycle that gets forgotten: reminders, new-custodian onboarding, departing-employee capture, and the release decision at the end.',
    whenToUse:
      'When litigation is filed or credibly threatened, when a regulator makes contact, when an internal complaint suggests a dispute is coming, or when an existing hold needs auditing, expanding or releasing.',
    inputs: [
      { name: 'Matter description', description: 'What the dispute or investigation is about, who the parties are, and the relevant time period.', required: true },
      { name: 'Trigger facts', description: 'What happened and when — the demand letter, complaint, regulator contact, internal report or other event, with dates.', required: true },
      { name: 'Forum', description: 'The court, agency or arbitral body, if known — this selects the governing preservation standard.' },
      { name: 'Custodian candidates', description: 'People and roles likely to hold relevant material, including those who have left.' },
      { name: 'Systems inventory', description: 'Email, chat, file shares, cloud apps, ticketing, phones, backups, and any retention or auto-deletion settings.' },
      { name: 'Existing hold status', description: 'Any hold already in place, when it issued, and to whom.' },
    ],
    outputs: [
      { name: 'Trigger analysis', description: 'When the duty to preserve plausibly attached, on which facts, and how confident that conclusion is.' },
      { name: 'Scope statement', description: 'Subject matter, date range and categories of material within the hold, with the boundaries stated explicitly.' },
      { name: 'Custodian list', description: 'Tiered custodians with the reason each is in scope and what they are likely to hold.' },
      { name: 'Data source map', description: 'Systems to preserve, who administers each, and the auto-deletion or retention setting that must be suspended.' },
      { name: 'Hold notice', description: 'A draft notice in plain language, with acknowledgement and escalation instructions.' },
      { name: 'Lifecycle plan', description: 'Reminder cadence, onboarding and offboarding steps, audit points, and the release criteria.' },
      { name: 'Spoliation risk register', description: 'Gaps, at-risk sources and prior deletions, each with the remediation and escalation it warrants.' },
    ],
    prompt: `You are a US litigation lawyer scoping a preservation obligation and drafting a litigation hold. Preservation failures are judged with hindsight, so your job is to be explicit about scope, gaps and what you were not told.

INPUTS
- Matter: <what the dispute or investigation concerns, parties, relevant period>
- Trigger facts: <demand letter, complaint, regulator contact, internal report or other event, with dates>
- Forum: <court, agency or arbitral body, if known>
- Custodian candidates: <names, roles, departments; include departed employees>
- Systems: <email, chat and messaging apps, file shares, cloud applications, ticketing, mobile devices, backups; note retention periods and auto-deletion settings>
- Existing hold: <in place since when, to whom; or "none">

TASK
1. GOVERNING STANDARD. Identify the forum and say which preservation and sanctions regime applies — federal, a named state, an agency process, or arbitration. If the forum has not been supplied, treat that as the threshold question and give the analysis for the most likely candidates rather than silently picking one. Mark the standard [VERIFY] and name what to read.
2. TRIGGER ANALYSIS. On the supplied facts, when did the duty to preserve plausibly attach, and why? Anticipation of litigation is a factual test, not a filing date. Give your best assessment with a confidence marker, identify the earliest arguable trigger as well as the most defensible one, and say which facts would move the date either way.
3. SCOPE. State the subject matter, the date range and the categories of material within scope — and state what is outside it, because an unbounded hold is not followed and a narrow one is attacked. Where scope depends on a fact you were not given, name the fact.
4. CUSTODIANS. Tier them:
   Tier 1 — near-certain to hold unique relevant material
   Tier 2 — likely, worth including
   Tier 3 — possible; decide after interviews
   For each, give the reason they are in scope and what they are likely to hold. Separately flag departed employees, contractors, and anyone whose device or account may already have been reclaimed or wiped.
5. DATA SOURCE MAP. For each system: what relevant material it holds, who administers it, and the specific retention or auto-deletion behaviour that must be suspended. Give particular attention to the sources holds routinely miss — ephemeral and auto-deleting messaging, collaboration tools, personal devices and personal accounts used for work, voicemail, shared drives with owner-controlled deletion, and third parties holding data on the organisation's behalf.
6. HOLD NOTICE. Draft it. Plain language, no legalese a custodian will ignore. It must cover: why they are receiving it, what to preserve in concrete terms, what to stop doing (including deleting, editing and "tidying up"), that it overrides normal retention practice, that it covers personal devices and accounts used for work, who to ask, the acknowledgement requirement, and that the hold continues until lifted in writing. Do not include the legal analysis in the notice itself.
7. LIFECYCLE PLAN. Reminder cadence; how new custodians are added; the departure process that captures a leaver's data before it is reclaimed; periodic audit of acknowledgements and of the suspended deletion settings; and the criteria for release, including who decides, whether any parallel matter or regulatory obligation keeps the data in scope, and how the release is documented.
8. SPOLIATION RISK REGISTER. Every gap you can see: sources that may already have auto-deleted, a trigger date earlier than the hold, custodians identified late, unacknowledged notices, devices already reissued. For each: the risk, the remediation available now, and whether it needs escalating to the general counsel or outside counsel immediately.

RULES
- Do not state a preservation standard, sanctions test or notice period as settled law. Describe it and mark it [VERIFY] against the forum's own rules and case law.
- Do not assume the forum. If it is unknown, say so and say why it matters.
- Never conclude that a deletion was or was not spoliation. Identify the facts, the risk and who must decide.
- Do not invent systems, custodians, retention periods or dates. Where you need one, name the missing fact.
- If the facts suggest relevant material may already have been destroyed, say so plainly at the top of your answer and recommend immediate specialist counsel before any further step, including before any further collection.
- A hold that is too broad to follow is a real risk, not a safe default. Say where you have deliberately drawn a boundary.

OUTPUT FORMAT
Eight sections matching the tasks above. Put the hold notice in a clearly delimited block so it can be lifted out and sent.`,
    example: {
      scenario:
        'A manufacturer receives a demand letter alleging a defective component, and the engineering team uses a chat tool with a 30-day auto-delete setting.',
      result:
        'A trigger analysis putting the duty months before the letter (at the first internal escalation about the defect), a three-tier custodian list including two departed engineers, a data-source map flagging the chat auto-delete as the top spoliation risk with same-day remediation, a drafted notice, and a release plan tied to the parallel regulatory reporting question.',
    },
  },
  {
    id: 'us-privilege-log-builder',
    name: 'Privilege Log Builder',
    description: 'Turns a set of withheld documents into defensible privilege log entries.',
    jurisdiction: 'us',
    category: 'litigation',
    tags: ['disputes', 'drafting', 'privilege', 'discovery', 'litigation', 'work-product', 'privilege-log', 'clawback'],
    sources: [
      { citation: 'Federal Rules of Civil Procedure', authority: 'primary', publisher: 'United States Courts', jurisdiction: 'us', url: 'https://www.uscourts.gov' },
      { citation: 'Federal Rules of Evidence', authority: 'primary', publisher: 'United States Courts', jurisdiction: 'us', url: 'https://www.uscourts.gov', note: 'The federal rules of evidence address the effect of disclosure on privilege and work-product protection, including inadvertent disclosure. Read the current text before relying on any statement of the standard.' },
      { citation: 'State privilege law and forum-specific practice', authority: 'primary', jurisdiction: 'us', note: 'Privilege doctrine differs between state and federal forums. Confirm which law governs.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.1.0',
    industries: ['professional-services'],
    relatedSkills: ['us-local-rules-formatter', 'us-litigation-hold-builder', 'us-regulatory-investigation-response'],
    whatItDoes:
      'Converts document metadata and descriptions into privilege log entries that state a basis specific enough to survive a challenge, without disclosing the privileged content itself. It applies the distinction between attorney-client privilege and work product deliberately, flags the classic weak spots — documents copied to non-lawyers, business advice dressed as legal advice, communications that may have waived privilege — and refuses to assert a basis the supplied facts do not support. It also covers the protective layer around the log: redaction rather than withholding, and the clawback position for anything produced by mistake.',
    whenToUse:
      'When producing documents in litigation or an investigation, when responding to a challenge to an existing log, or when auditing a log prepared under time pressure before it goes out.',
    inputs: [
      { name: 'Document metadata', description: 'Date, author, recipients, cc/bcc, subject, document type, and a content description.', required: true },
      { name: 'Privilege basis claimed', description: 'Attorney-client, work product, common interest, or unsure.' },
      { name: 'Legal personnel list', description: 'Who counts as a lawyer or a lawyer’s agent — essential for the analysis.', required: true },
      { name: 'Litigation context', description: 'The matter, whether litigation was anticipated, and from what date.' },
      { name: 'Format requirements', description: 'Any log format required by the court, the rules, or the parties’ agreement.' },
      { name: 'Clawback arrangement', description: 'Any protective order, agreed clawback protocol or non-waiver stipulation in the matter.' },
    ],
    outputs: [
      { name: 'Privilege log', description: 'Formatted entries with a specific, non-disclosing basis for each document.' },
      { name: 'Weak entries', description: 'Documents whose claim is vulnerable, with the reason and a recommendation.' },
      { name: 'Waiver risks', description: 'Third-party recipients and other facts that may have destroyed privilege.' },
      { name: 'Redaction candidates', description: 'Documents better produced in redacted form than withheld entirely.' },
      { name: 'Clawback position', description: 'The protective-order and inadvertent-production questions to settle before the log goes out.' },
      { name: 'Categorical proposal', description: 'Where a categorical log entry may be available instead of document-by-document.' },
    ],
    prompt: `You are a litigation associate preparing a privilege log.

INPUTS
- Documents: <for each: date, author, recipients, cc, bcc, type, subject line, brief content description>
- Privilege basis claimed: <attorney-client / work product / common interest / unsure>
- Legal personnel: <names and roles of lawyers, in-house counsel, paralegals and agents of counsel>
- Litigation context: <matter, when litigation was first anticipated, jurisdiction>
- Required log format: <court rule, local rule, or agreed protocol; or "standard">
- Clawback arrangement: <protective order, agreed non-waiver protocol, or "none">

TASK
1. LOG ENTRIES. For each document produce: number, date, author (with role), recipients (with roles), document type, privilege asserted, and a description that states the basis specifically without revealing the privileged content. "Email reflecting legal advice regarding contract negotiation" is defensible; "email" is not, and quoting the advice defeats the purpose.
2. BASIS ANALYSIS. For each entry state which elements are satisfied:
   - Attorney-client: a communication, between privileged persons, made in confidence, for the purpose of obtaining or providing legal advice.
   - Work product: prepared in anticipation of litigation or for trial, by or for a party or its representative; note whether it is opinion or fact work product.
   Where an element is not supported by the supplied facts, say so — do not assert the privilege anyway.
3. WEAK ENTRIES: documents whose claim is vulnerable. Common patterns to check: business advice from a lawyer rather than legal advice; documents where the lawyer is only cc'd; documents circulated widely; documents that pre-date the anticipation of litigation; attachments assumed to inherit the parent's privilege.
4. WAIVER RISKS: non-privileged third-party recipients, forwarding outside the privileged group, and documents shared with a party whose common interest is not established.
5. REDACTION CANDIDATES: documents containing a privileged passage inside an otherwise producible document — usually better redacted than withheld.
6. CLAWBACK AND INADVERTENT PRODUCTION: whether a protective order or non-waiver arrangement is in place and what it appears to cover; what should be agreed before production if there is none; the notice-and-return steps to follow if a privileged document is produced by mistake; and which entries in this set would be hardest to claw back if disclosed. Treat the governing standard for inadvertent disclosure as [VERIFY] against the forum's own rules — it differs between federal and state practice and can be varied by order.
7. CATEGORICAL PROPOSAL: where a large, homogeneous set could be logged categorically, propose the category description and the argument for it.

RULES
- Never write a description that discloses the substance of the advice. If you cannot describe a document without disclosing it, say so and flag it for counsel.
- Never assert a privilege the supplied facts do not support. An unsupported entry is worse than no entry — it puts the whole log in doubt.
- You are not the decision-maker on privilege. Produce the analysis and the draft entries; a lawyer with the underlying documents must confirm every claim before the log is served.
- Treat every attachment as a separate document requiring its own basis.
- Flag any document where the author or recipient is not on the legal personnel list but the claim depends on them being counsel.
- Privilege law varies by jurisdiction and by state-versus-federal forum. Note where the applicable law could change the outcome.

OUTPUT FORMAT
Log table, then the six analysis sections.`,
    example: {
      scenario:
        'A team must log 400 withheld documents in a commercial dispute, many of them emails on which the general counsel was cc’d.',
      result:
        'A formatted log plus 34 entries flagged weak — mostly cc-only emails on commercial terms where no legal advice is apparent — eleven documents recommended for redaction and production rather than withholding, and a clawback section noting that no non-waiver order is yet in place.',
    },
  },
  {
    id: 'us-claim-deadline-calculator',
    name: 'Claim Deadline Calculator',
    description: 'Works out the legal rule governing a limitation period before computing any date.',
    jurisdiction: 'us',
    category: 'litigation',
    tags: ['disputes', 'assessment', 'limitations', 'statute-of-limitations', 'deadlines', 'accrual', 'tolling'],
    sources: [
      { citation: 'State limitation statutes', authority: 'primary', jurisdiction: 'us', note: 'Limitation periods are principally state law and vary by state and by cause of action. Identify the governing state before applying any period.' },
      { citation: 'Federal limitation statutes and the Federal Rules of Civil Procedure', authority: 'primary', publisher: 'United States Courts', jurisdiction: 'us', url: 'https://www.uscourts.gov', note: 'Some federal claims carry their own period and some borrow one. Computation of time and service deadlines are separate questions from the limitation period itself.' },
      { citation: 'Case law on accrual, the discovery rule, tolling and equitable estoppel', authority: 'primary', jurisdiction: 'us', note: 'When a claim accrues, and what suspends the running of time, are heavily litigated and jurisdiction-specific. These doctrines routinely move the date by years.' },
      { citation: 'United States Code and the Code of Federal Regulations', authority: 'primary', publisher: 'US Government Publishing Office', jurisdiction: 'us', url: 'https://www.govinfo.gov', note: 'Official text of federal statutes and regulations. Check the current version — periods are amended.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-fifty-state-survey', 'us-local-rules-formatter'],
    whatItDoes:
      'Refuses to be a date calculator. A missed limitation period is one of the most common and least forgivable failures in practice, and almost every one of them comes from getting the legal question wrong rather than the arithmetic: the wrong state’s law, the wrong characterisation of the claim, an accrual date assumed rather than established, or an unnoticed pre-suit notice requirement that expires first. This skill works through jurisdiction, cause of action, governing provision, accrual, tolling and any procedural trigger, and only then computes a date — flagging every point where the answer turns on a fact or a rule that has not been confirmed.',
    whenToUse:
      'On intake of any potential claim, when an old matter resurfaces, when deciding whether a claim is already time-barred, or when a tolling agreement or pre-suit notice requirement is in play.',
    inputs: [
      { name: 'The facts', description: 'What happened, to whom, and the full chronology with dates — including when the harm was or could have been discovered.', required: true },
      { name: 'Potential claims', description: 'The causes of action being considered, or a description of the wrong if the characterisation is open.', required: true },
      { name: 'Jurisdiction', description: 'State and court where suit would be brought, plus any contractual choice-of-law or forum clause.', required: true },
      { name: 'Party details', description: 'Facts affecting time: minority, incapacity, a defendant outside the state, a government or public entity defendant.' },
      { name: 'Agreements', description: 'Any contractual limitation period, tolling agreement, or arbitration clause with its own deadline.' },
      { name: 'Steps already taken', description: 'Notices given, complaints filed, administrative charges lodged, and their dates.' },
    ],
    outputs: [
      { name: 'Jurisdiction analysis', description: 'Whose limitation law governs, and what would change it — including borrowing and choice-of-law issues.' },
      { name: 'Claim characterisation', description: 'How each claim is likely to be characterised, since the period follows the characterisation.' },
      { name: 'Governing provision', description: 'The statute or rule that supplies the period for each claim, marked for verification.' },
      { name: 'Accrual analysis', description: 'When each claim accrued, on what theory, and what facts would move that date.' },
      { name: 'Tolling and extension analysis', description: 'Every doctrine or agreement that may suspend or extend time, with its effect.' },
      { name: 'Procedural triggers', description: 'Pre-suit notices, administrative exhaustion and other steps that carry their own earlier deadline.' },
      { name: 'Computed dates', description: 'The resulting date for each claim, shown as a calculation, with a confidence marker and the assumptions used.' },
      { name: 'Uncertainty report', description: 'Every ambiguity in the rule or the facts, ranked by how much it moves the date.' },
    ],
    prompt: `You are a US litigator assessing whether a claim is still in time. Do NOT begin with arithmetic. A limitation period is a legal conclusion, and the arithmetic is the last and least important step. Work in the order below.

INPUTS
- Facts and chronology: <what happened, when; when the harm occurred; when it was discovered or reasonably discoverable; every relevant date>
- Claims under consideration: <causes of action, or a description of the wrong if characterisation is open>
- Jurisdiction: <state and court where suit would be brought; any choice-of-law or forum clause>
- Party facts: <minority, incapacity, defendant absent from the state, government or public-entity defendant, corporate successor issues>
- Agreements: <contractual limitation period, tolling agreement, arbitration clause with its own deadline>
- Steps already taken: <notices, filings, administrative charges, with dates>

TASK
1. JURISDICTION. Whose limitation law governs? Address the forum's own law, any contractual choice of law and whether it would be honoured for limitation purposes, and any borrowing rule that could import another state's shorter period. If the jurisdiction has not been supplied, stop and say the analysis cannot proceed without it — do not pick one.
2. CLAIM CHARACTERISATION. For each claim, how is it likely to be characterised, and what alternative characterisation is arguable? The period follows the characterisation, and the same facts pleaded as contract, tort, statutory claim or fraud can carry different periods. Where the characterisation is contestable, carry both forward.
3. GOVERNING PROVISION. For each characterised claim, identify the statute, rule or contractual term that supplies the period. Name it as precisely as you can and mark it [VERIFY]. If you are not confident the provision exists as you would describe it, say [UNKNOWN] and state what to search for. Never state a number of years you are not sure of.
4. ACCRUAL. When did each claim accrue? Address the default rule, and separately whether a discovery rule, continuing-violation theory, or a rule deferring accrual until damage is suffered applies. Give the accrual date as a conclusion with a confidence marker, and name the facts that would move it.
5. TOLLING AND EXTENSION. Work through everything that could suspend or extend time on these facts: minority or incapacity, the defendant's absence or concealment, equitable tolling or estoppel, a tolling agreement, bankruptcy or another statutory stay, class-action tolling, and any repose provision that caps the period regardless of tolling. For each: whether it applies, its effect on the date, and how confident you are.
6. PROCEDURAL TRIGGERS. Identify every step that must happen before or alongside suit and that carries its own, usually earlier, deadline — pre-suit notice (particularly against a government or public entity), administrative exhaustion, a contractual notice or demand requirement, mediation conditions precedent. These expire first and are missed most often. Treat each as a hard deadline in its own right.
7. COMPUTE. Only now produce dates. For each claim show the calculation as a line of working: accrual date + period +/- tolling = date. State the counting convention you used and mark it [VERIFY] — whether the period runs from the day of accrual or the day after, and how the jurisdiction treats a deadline falling on a weekend or holiday, are rules that must be checked, not assumed.
8. UNCERTAINTY REPORT. List every ambiguity — in the rule, in the characterisation, in the facts — ranked by how many days or years it moves the answer. State plainly which single unresolved question matters most.

RULES
- Never state a limitation period, accrual rule or tolling doctrine as settled unless you are confident. [UNKNOWN] is a correct answer and is far safer than a plausible number.
- Never produce a single confident date when the governing rule or the triggering facts are ambiguous. Produce a range with the assumptions that generate each end of it, and say which assumption is doing the work.
- Present the earliest arguable deadline as the operative one for planning purposes, and say so explicitly.
- Never advise that a claim is safely in time. Give the analysis and state that a qualified lawyer in the jurisdiction must confirm the period, the accrual date and any procedural trigger before anyone relies on it.
- If any date you compute is near, already passed, or cannot be determined on the facts given, say so in the first line of your answer and recommend immediate qualified counsel.
- Do not invent a section number, a period, or a date the facts do not supply.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with a one-paragraph bottom line that leads with the earliest deadline identified and its confidence marker.`,
    example: {
      scenario:
        'A company discovers in 2026 that a supplier concealed a defect in components delivered in 2021, and is considering contract, warranty and fraud claims in a state where it does not have its own operations.',
      result:
        'Three characterisations carried in parallel with different periods, an accrual analysis splitting the contract claim from the fraud claim, a discovery-rule argument marked as the pivotal open question, a pre-suit notice requirement in the supply agreement flagged as the earliest real deadline, and a date range rather than a single date because the discovery-rule question is unresolved.',
    },
  },
  {
    id: 'us-subpoena-triage',
    name: 'Regulatory Notice & Subpoena Triage',
    description: 'Triages a subpoena, CID or agency notice into authority, scope, deadlines and next actions.',
    jurisdiction: 'us',
    category: 'litigation',
    tags: ['disputes', 'extraction', 'subpoena', 'civil-investigative-demand', 'regulatory-notice', 'incident-response', 'escalation'],
    sources: [
      { citation: 'Federal Rules of Civil Procedure', authority: 'primary', publisher: 'United States Courts', jurisdiction: 'us', url: 'https://www.uscourts.gov', note: 'The federal rules govern subpoenas issued in federal civil litigation, including objections and protection of the recipient. Agency compulsory process is governed separately.' },
      { citation: 'Agency organic statutes conferring investigative and subpoena authority', authority: 'primary', jurisdiction: 'us', note: 'Each agency’s power, and the recipient’s options for objecting, come from its own statute and rules. Identify the issuing authority before assessing the response obligation.' },
      { citation: 'State rules of civil procedure and state agency process', authority: 'primary', jurisdiction: 'us', note: 'State subpoenas, state attorney general demands and out-of-state process each follow different rules. Confirm the issuing jurisdiction.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-litigation-hold-builder', 'us-regulatory-investigation-response', 'us-privilege-log-builder'],
    whatItDoes:
      'Reads a piece of compulsory process or regulatory correspondence and produces the operational picture in one pass: who issued it and under what authority, what is actually being demanded once the defined terms are unpacked, every date on the face of the document and every date implied by it, who holds the material, and what has to happen in the first 48 hours. It separates the deadline that is genuinely fixed from the one that is customarily negotiated, and it flags the escalation and preservation steps that must not wait for a considered legal response.',
    whenToUse:
      'The moment a subpoena, civil investigative demand, agency notice, inspection demand or similar regulatory correspondence arrives — before substantive analysis and before anyone replies.',
    inputs: [
      { name: 'The document', description: 'Full text of the subpoena, demand, notice or correspondence, including schedules, definitions and instructions.', required: true },
      { name: 'Receipt details', description: 'Date and method of receipt, who received it, and to which entity it is addressed.', required: true },
      { name: 'Business context', description: 'What the organisation does, and any known connection to the subject matter.' },
      { name: 'Related matters', description: 'Any existing litigation, hold, investigation or prior contact with the same authority.' },
      { name: 'Entity details', description: 'The legal entity named, and whether it is the right one — affiliates and predecessors matter.' },
    ],
    outputs: [
      { name: 'Authority analysis', description: 'Who issued it, under what claimed power, and whether the recipient is a target, subject or third party as far as the document reveals.' },
      { name: 'Reference details', description: 'Matter or file numbers, named contacts, case caption and any docket reference, extracted verbatim.' },
      { name: 'Request inventory', description: 'Every numbered request restated plainly, with defined terms unpacked and the real breadth exposed.' },
      { name: 'Deadline schedule', description: 'Every date on the face of the document and every implied one, with what is fixed and what is customarily extendable.' },
      { name: 'Custodian and source map', description: 'Who and which systems are likely to hold responsive material for each request.' },
      { name: 'Preservation actions', description: 'What must be preserved immediately, and whether a hold must issue or expand today.' },
      { name: 'Objection and protection checklist', description: 'Grounds worth assessing — scope, burden, privilege, confidentiality, jurisdiction — as questions for counsel, not conclusions.' },
      { name: 'First-48-hours plan', description: 'Ordered actions with owners, separating what cannot wait from what can.' },
      { name: 'Escalation memo', description: 'A short briefing for the general counsel or board covering what this is and what it may signify.' },
    ],
    prompt: `You are a US in-house litigation counsel triaging compulsory process on the day it arrives. Your job is accuracy and speed, not a considered legal opinion. Extract only what the document says, and be explicit about what it does not say.

INPUTS
- The document: <paste the full text, including schedules, definitions, instructions and any cover letter>
- Receipt: <date and method of service or delivery, who received it, entity addressed>
- Our business: <what we do, any known connection to the subject matter>
- Related matters: <existing litigation, holds, investigations, prior contact with this authority>
- Entity: <the legal entity named; note any affiliate, predecessor or misnomer issue>

TASK
1. AUTHORITY. Identify the issuing body, the instrument type (litigation subpoena, grand jury subpoena, civil investigative demand, administrative subpoena, inspection or examination notice, informal request letter, or other), the authority it claims on its face, and the signature block. State whether responding is compulsory, apparently voluntary, or unclear — this changes everything and is often misread. From the document alone, say whether the recipient appears to be a target, a subject or a third party, and mark that assessment with a confidence level. Where the document is a request rather than compulsory process, say so prominently.
2. REFERENCE DETAILS. Extract verbatim: matter, file, docket or reference numbers; case caption; issuing officer or attorney with contact details; the return or production address; and any portal or delivery instruction.
3. REQUEST INVENTORY. Restate every numbered request in plain language. Then unpack the definitions and instructions and say what each request actually reaches once those are applied — defined terms are where narrow-looking requests become enormous. For each request note: the date range, the subject matter, the apparent purpose, and any term that is ambiguous or undefined.
4. DEADLINE SCHEDULE. Every date on the face of the document — production, appearance, objection, meet-and-confer, certification — and every date implied by it. Show how each is computed from the receipt date and mark the counting convention [VERIFY]. Separate hard statutory or court-set deadlines from those customarily extended by agreement, and say plainly which category each falls in. Flag the earliest deadline first, and flag any deadline that is already close or passed at the top of your answer.
5. CUSTODIAN AND SOURCE MAP. For each request, who in the organisation is likely to hold responsive material and in which systems. Mark where you are inferring rather than being told.
6. PRESERVATION. State what must be preserved now. Say whether a litigation hold must be issued or an existing one expanded, who it must reach, and which auto-deleting or short-retention systems need attention today. Treat this as the single most time-critical item.
7. OBJECTION AND PROTECTION CHECKLIST. List the grounds a lawyer should assess — overbreadth, undue burden, relevance, privilege and work product, trade secrets and confidentiality, personal data and third-party rights, jurisdiction and service defects, and whether the instrument reaches this entity at all. Present each as a question to evaluate with the deadline for raising it, never as a conclusion that an objection is available.
8. RESPONSE REQUIREMENTS. What form the response must take on the face of the document — production format, certification or affidavit, privilege log, sworn testimony, appearance in person — and any instruction about the manner of production.
9. FIRST 48 HOURS. An ordered action list with an owner for each item, split into "cannot wait" and "this week". Include acknowledging receipt, docketing every deadline, contacting the issuing officer to confirm scope or seek an extension, and engaging outside counsel where warranted.
10. ESCALATION MEMO. Six to ten lines for the general counsel or the board: what arrived, from whom, what it appears to be about, what our exposure could be, what has been done, and what decision is needed from them.

RULES
- Extract; do not embellish. If the document does not say who the target is, what the investigation concerns, or what authority is relied on, say it does not say so.
- Never conclude that an objection will succeed, that the demand is invalid, or that the organisation is not a target.
- Never advise ignoring, narrowing unilaterally, or delaying a response.
- Where the instrument may carry non-disclosure or confidentiality obligations, or where notifying the subject could itself be a problem, flag that as a question for counsel before anyone tells anyone.
- If the document suggests a criminal investigation, or if any deadline is imminent or passed, say so in the first line and recommend immediate specialist counsel before any response, any collection and any internal communication about it.
- Do not invent a reference number, a deadline, a contact or an authority. If a field is absent, record it as absent.

OUTPUT FORMAT
Ten sections matching the tasks above. Open with a five-line summary: what it is, who issued it, the earliest deadline, whether preservation is already at risk, and whether this needs to go to the general counsel today.`,
    example: {
      scenario:
        'A civil investigative demand from a state attorney general arrives by mail addressed to a subsidiary, with 22 numbered requests and a production date three weeks out.',
      result:
        'An authority section identifying the demand as compulsory process against the wrong group entity, an inventory showing that the defined term for "communications" pulls in a decade of messaging data, a deadline schedule separating the fixed production date from the negotiable scope discussion, an immediate hold expansion covering two chat systems, and a ten-line escalation memo for the general counsel the same day.',
    },
  },
  {
    id: 'us-local-rules-formatter',
    name: 'Local Rules Formatter',
    description: 'Builds a court-specific formatting and filing checklist for a document before it goes out.',
    jurisdiction: 'us',
    category: 'litigation',
    tags: ['disputes', 'review', 'local-rules', 'court-filing', 'formatting', 'litigation', 'compliance'],
    sources: [
      { citation: 'Federal Rules of Civil Procedure', authority: 'primary', publisher: 'United States Courts', jurisdiction: 'us', url: 'https://www.uscourts.gov' },
      { citation: 'District local rules and individual judges’ standing orders', authority: 'regulator', jurisdiction: 'us', note: 'Hyper-local and amended without notice. The court’s own website governs; the standing order is the layer most often missed.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.1.0',
    industries: ['professional-services'],
    relatedSkills: ['us-privilege-log-builder', 'us-claim-deadline-calculator'],
    whatItDoes:
      'Produces the pre-filing checklist for a specific court: the formatting, length, certificate, exhibit and service requirements that a filing must satisfy, drawn from the layers of rules that actually govern it — the national rules, the district or state-wide rules, the local rules, and the individual judge’s standing order, which is the layer most often missed. It then reviews your draft against that checklist and flags what is wrong. Because these rules are hyper-local and change without much notice, every item is presented as something to verify against the court’s own site, not as settled fact.',
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
      { name: 'Verification list', description: 'Every item to confirm on the court’s own site before filing.' },
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
        'A rule-layer map putting the judge’s standing order at the top of the verification list, a formatting checklist that catches the draft’s missing certificate of compliance and over-length argument section, and a filing-mechanics section flagging the courtesy-copy question to confirm before the deadline.',
    },
  },
  {
    id: 'us-demand-letter-responder',
    name: 'Demand Letter Response Planner',
    description: 'Triages an inbound demand letter into a preservation, insurance and response plan with a drafted reply.',
    jurisdiction: 'us',
    category: 'litigation',
    tags: ['disputes', 'assessment', 'demand-letter', 'pre-litigation', 'cease-and-desist', 'settlement', 'insurance'],
    sources: [
      { citation: 'Federal Rules of Civil Procedure', authority: 'primary', publisher: 'Administrative Office of the United States Courts', jurisdiction: 'us', url: 'https://www.uscourts.gov', note: 'Relied on for the preservation duty that attaches once litigation is reasonably anticipated, and for the sanctions exposure when it is not met.' },
      { citation: 'Federal Rules of Evidence', authority: 'primary', publisher: 'Administrative Office of the United States Courts', jurisdiction: 'us', url: 'https://www.uscourts.gov', note: 'Relied on for the treatment of compromise offers and negotiations, and for the limits of that protection.' },
      { citation: 'State statutes of limitations and pre-suit notice requirements', authority: 'primary', publisher: 'State legislatures', jurisdiction: 'us', note: 'Limitation periods, tolling rules, and pre-suit notice or demand requirements vary by state and by claim, and some fee-shifting statutes turn on how a demand is answered.' },
      { citation: 'State rules of professional conduct', authority: 'regulator', publisher: 'State bar regulators', jurisdiction: 'us', note: 'Relevant to communications with a represented party and to threats made in correspondence.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-litigation-hold-builder', 'us-claim-deadline-calculator', 'us-subpoena-triage'],
    whatItDoes:
      'Takes an inbound demand letter or cease-and-desist and separates the three things that have to happen on different clocks: what must be preserved and notified immediately, what has to be answered by a stated deadline, and what the claim is actually worth once the elements are tested against the facts. It identifies the claims being asserted and those merely implied, finds the statutory or contractual deadlines that carry consequences for silence, checks whether the matter is covered by insurance or shiftable to a contractual indemnitor, and drafts a reply pitched to the strategy chosen rather than to the tone of the demand.',
    whenToUse:
      'On the day a demand letter, cease-and-desist, or pre-suit notice arrives, and again before any substantive response goes out or any settlement number is put in writing.',
    inputs: [
      { name: 'Demand letter', description: 'The letter as received, with its envelope or transmission date and any enclosures.', required: true },
      { name: 'Underlying facts', description: 'What actually happened, including the parts that are unhelpful.', required: true },
      { name: 'Relationship and documents', description: 'Any contract, order form, terms of service or policy governing the relationship with the sender.', required: true },
      { name: 'Insurance', description: 'Policies that might respond, their notice provisions, and whether any notice has been given.' },
      { name: 'Third parties', description: 'Vendors, contractors or partners who may owe indemnity or contribution, and their contract terms.' },
      { name: 'Commercial context', description: 'Whether the sender is a customer, employee, competitor or stranger, and what the ongoing relationship is worth.' },
    ],
    outputs: [
      { name: 'Immediate actions', description: 'What must happen within 24 to 72 hours regardless of the eventual strategy.' },
      { name: 'Claim breakdown', description: 'Each claim asserted or implied, its elements, and how the known facts map onto them.' },
      { name: 'Deadline map', description: 'Every date that matters, including the ones the letter does not mention.' },
      { name: 'Exposure assessment', description: 'A realistic range with the drivers named, including fee shifting and statutory multipliers where they apply.' },
      { name: 'Coverage and shift analysis', description: 'Insurance notice obligations and contractual indemnity or defence rights against third parties.' },
      { name: 'Strategy options', description: 'Two or three responses compared on cost, risk and effect on the relationship.' },
      { name: 'Draft response', description: 'A reply written to the chosen strategy, with the protective legends the situation calls for.' },
    ],
    prompt: `You are a US litigation counsel triaging an inbound demand letter and producing a response plan for the recipient.

INPUTS
- Demand letter: <paste; give the date it was sent and the date received>
- What actually happened: <the facts, including the unhelpful ones>
- Governing documents: <contract, order form, terms of service, policy, or "none — the relationship is not documented">
- Insurance: <policies that might respond, their notice provisions, whether notice has been given>
- Third parties: <vendors, contractors or partners who may owe indemnity or contribution, and the relevant contract terms>
- Context: <who the sender is, and what the ongoing relationship is worth>

TASK
1. IMMEDIATE ACTIONS. List what must happen in the first 24 to 72 hours, independently of the eventual strategy:
   - Whether litigation is now reasonably anticipated, which triggers the preservation duty. If it is, say so plainly, identify the custodians and systems in scope, and flag any automatic deletion that must be suspended today. Failure to preserve is one of the few pre-suit errors that cannot be undone later.
   - Insurance notice. Identify every policy that might respond and the notice provision in each. Note that late notice can forfeit coverage independently of the merits, and that a demand letter is often itself a claim under a claims-made policy.
   - Notice or tender to any third party owing indemnity or defence, on the terms that contract requires.
   - Whether the sender is represented by counsel, which governs who may communicate with whom.
   - Whether privilege is being properly established over the internal investigation that is about to start.
2. WHAT IS ACTUALLY BEING CLAIMED. Parse the letter into discrete claims. Separate what is expressly asserted from what is implied or held in reserve, and note where the letter is deliberately vague. For each claim, set out its elements and map the known facts onto each element, marking elements as supported, contested or unknown on the current record. Identify the facts you do not yet have that would change the assessment.
3. DEADLINE MAP. Build the full set of dates, not just the one the letter states:
   - The deadline the letter imposes, and whether it carries any legal consequence or is merely rhetorical.
   - Any statutory or contractual pre-suit notice or cure period, and whether responding or failing to respond affects rights — some regimes shift fees or bar claims based on how a demand is answered, and some cure periods run whether or not you engage.
   - The limitation period for each claim, when it began to run, and whether anything tolls it. Mark every period [VERIFY]: limitation periods vary by state and by claim and are not safely recalled.
   - Contractual notice, escalation, mediation or arbitration steps that must precede suit, and whether they bind the sender.
4. EXPOSURE. Give a realistic range rather than a single number, and name the drivers: compensatory measure and how it is calculated, statutory damages or multipliers, fee shifting and which way it runs, injunctive exposure, and the cost of defending even a weak claim through to disposition. Say which of these dominate. Separate the exposure on the claim from the cost of the fight, because they drive different decisions.
5. THE SENDER'S POSITION. Assess how strong the demand actually is: whether the letter shows real knowledge of the facts or is a form, whether it cites authority accurately, whether the demand is proportionate, whether counsel is experienced in this area, and what the sender appears to want that is not stated. A demand that asks for an apology and a policy change is a different problem from one that asks for money.
6. COVERAGE AND SHIFT. Set out whether an insurer is likely to defend, indemnify, both or neither, and any coverage defence to expect. Separately assess contractual indemnity, additional insured status and contribution against third parties, and what the tender letter has to say to preserve those rights.
7. STRATEGY OPTIONS. Present two or three genuinely different responses — for example: no response; a short holding acknowledgement; a substantive rejection; an early settlement approach; or a pre-emptive filing. Compare them on likely cost, likely outcome, effect on the relationship, and what each concedes. Recommend one and say what would change the recommendation.
8. DRAFT RESPONSE. Write the reply to the recommended strategy. Apply the correct protective legends: mark genuine settlement communications appropriately while noting that a label does not by itself make a communication protected, and that the protection has limits and does not shield facts from discovery. Do not admit facts that have not been verified, do not adopt the sender's characterisation of events, do not make threats that could not be carried out, and do not offer a number before the exposure analysis supports one. Where a deadline needs extending, ask for it explicitly rather than letting it pass.

RULES
- Deal with preservation and insurance notice before analysing the merits. Both are time-critical and both are independent of whether the claim has any value.
- Limitation periods, pre-suit notice requirements and fee-shifting rules are state and claim specific. State the structure, mark the figures [VERIFY], and never supply a period from memory as though it were settled.
- Do not tell the recipient the claim is meritless on facts you have not seen. Where the assessment depends on a document or a witness account not yet reviewed, say so and treat it as an open question.
- Never draft a response that threatens criminal or regulatory action to gain advantage in a civil dispute.
- Where the sender is represented, address the response to counsel and flag the restriction on contacting the sender directly.

OUTPUT FORMAT
Open with the immediate actions as a dated checklist. Then the claim breakdown table, the deadline map, exposure, coverage and shift, the strategy comparison, and the draft response as a separate final section.`,
    example: {
      scenario:
        'A company receives a lawyer letter from a former customer alleging breach of contract and misrepresentation, demanding payment within ten days.',
      result:
        'Preservation triggered the same day with three custodians and a messaging retention policy suspended, notice given under a claims-made policy that would have been forfeited by delay, the misrepresentation claim found to be pleaded without the reliance element and the contract claim narrowed by a limitation-of-liability clause the letter ignored, and a holding response drafted seeking an extension while the underlying records were reviewed.',
    },
  },
];
