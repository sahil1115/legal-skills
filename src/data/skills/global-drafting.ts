import type { Skill } from '../../types/skill';

/**
 * Global everyday skills, part one — summarising and drafting.
 *
 * The highest-volume legal tasks: summaries, memos, correspondence, minutes
 * and routine documents. None states the law of any system; each works from
 * the material supplied and routes legal conclusions to a qualified lawyer.
 */
export const globalDraftingSkills: Skill[] = [
  {
    id: 'global-legal-document-summary',
    name: 'Legal Document Summary',
    description: 'Summarises a legal document for a stated reader, with every point tied to the passage it comes from.',
    jurisdiction: 'global',
    category: 'research',
    tags: ['extraction', 'review', 'legal-ops', 'summarisation', 'document-review'],
    sources: [
      { citation: 'The document under review', authority: 'primary', note: 'The only source of content. A summary that adds what the document does not say is an error, not a help.' },
      { citation: 'Legal document review and summarisation practice', authority: 'secondary', note: 'A method, not a statement of law. Whether a term is enforceable or what a judgment decides in law is for a qualified lawyer.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-chronology-builder', 'global-obligation-extraction', 'global-citation-verifier'],
    whatItDoes:
      'Produces a summary of a contract, judgment, pleading, regulator letter, policy or other legal document that is shaped by who will read it and why. Every statement carries a pinpoint to the clause, paragraph or page it rests on, so the reader can check it in seconds. It separates what the document says from what it implies and from what it does not address, lists defined terms that change the meaning of ordinary words, and flags the passages a summary cannot safely compress and that must be read in full.',
    whenToUse:
      'When a long document arrives and someone needs to know what it says before deciding what to do: a first read of a counterparty draft, a judgment for a client update, a regulator letter for management, or a bundle of documents for a handover. Not a substitute for reading the operative passages before relying on them.',
    inputs: [
      { name: 'Document text', description: 'The full document, with page, clause or paragraph numbering intact.', required: true },
      { name: 'Reader and purpose', description: 'Who the summary is for and the decision it supports.', required: true },
      { name: 'Length and format', description: 'For example one page, ten bullet points, or a table.' },
      { name: 'Questions to answer', description: 'Specific points the reader wants covered.' },
    ],
    outputs: [
      { name: 'Headline summary', description: 'Three to five sentences on what the document is and what it does.' },
      { name: 'Key points with pinpoints', description: 'Each point tied to its clause, paragraph or page.' },
      { name: 'Dates, amounts and parties', description: 'Extracted exactly as written, with their source.' },
      { name: 'Read-in-full list', description: 'Passages too important or too ambiguous to rely on in summary.' },
      { name: 'Silences and open questions', description: 'What the document does not address that the reader might assume it does.' },
    ],
    prompt: `You are a senior legal analyst summarising a document for a specific reader.

INPUTS
- Document: <paste the full text with its numbering>
- Reader and purpose: <who will read the summary and what they must decide>
- Length and format: <for example one page; bullets; table>
- Questions to answer: <specific points, if any>

TASK
1. IDENTIFY. State what the document is, its date, parties or author, status (draft, signed, sealed, final) and governing law or forum if stated. Mark anything not stated as [NOT STATED].
2. HEADLINE. In three to five sentences, say what the document does and what it requires of the reader or their organisation.
3. KEY POINTS. List the points that matter for the stated purpose, most important first. After each, give the pinpoint (clause, paragraph or page) in brackets. Quote the exact words where precision decides the meaning.
4. HARD DATA. Extract every date, deadline, amount, percentage, notice period and named party exactly as written, with its pinpoint. Do not calculate a deadline unless the document gives the starting date; otherwise state the rule and the missing date.
5. DEFINED TERMS. List defined terms whose definition differs from ordinary meaning or widens or narrows an obligation.
6. SAYS, IMPLIES, SILENT. Separate what the document says expressly, what it implies (label INFERRED and give the basis), and what it does not address although the reader might expect it to.
7. READ IN FULL. List the passages the reader must read in the original: operative clauses, anything ambiguous, internally inconsistent or unusual, and anything on which the decision turns.
8. ANSWER THE QUESTIONS. Answer each question supplied from the document alone, with pinpoints, or say that the document does not answer it.

RULES
- Use only the document. Do not add background law, market practice or assumptions about what such documents usually say.
- Every statement of content needs a pinpoint. If you cannot give one, delete the statement.
- Do not characterise legal effect, such as whether a clause is enforceable or what a judgment establishes as precedent; describe what the text says and flag the legal question for a lawyer.
- Preserve qualifications. Never turn "may" into "will" or drop words such as "reasonable", "material" or "subject to".
- If the text appears incomplete, truncated or badly scanned, say so first.

OUTPUT FORMAT
Document identification line; headline summary; key points with pinpoints; a table of hard data (Item | Value as written | Pinpoint); defined terms; says, implies and silent; the read-in-full list; answers to questions. Keep to the requested length, cutting lower-priority points rather than pinpoints. Close with: Assumptions made; Questions for a lawyer.`,
    example: {
      scenario:
        'A procurement lead receives a 46-page supplier master agreement on Friday afternoon and needs to know by Monday what it commits the company to.',
      result:
        'A one-page summary with twelve key points each tied to a clause, a table of the term, renewal and notice dates and fee figures, three defined terms that widen the supplier’s rights, a note that the agreement is silent on data return at exit, and five clauses to read in full before signing.',
    },
  },
  {
    id: 'global-legal-memo-builder',
    name: 'Legal Memo Builder',
    description: 'Structures supplied research and facts into a legal memorandum with question, short answer, analysis and gaps.',
    jurisdiction: 'global',
    category: 'research',
    tags: ['drafting', 'research', 'legal-ops', 'memorandum', 'analysis'],
    sources: [
      { citation: 'The authorities and facts supplied by the user', authority: 'primary', note: 'The memo is built only from these. The skill does not find law and must not supply authorities of its own.' },
      { citation: 'Legal memorandum conventions (question presented, short answer, facts, discussion, conclusion)', authority: 'secondary', note: 'A drafting structure. House styles differ; follow the format the supervising lawyer asks for.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['professional-services'],
    relatedSkills: ['global-legal-research', 'global-citation-verifier', 'global-case-brief-builder'],
    whatItDoes:
      'Turns a set of facts, a question and the authorities you have already gathered into a structured memorandum: question presented, short answer with a stated confidence, relevant facts, discussion organised by issue, counter-arguments and conclusion. It keeps a strict line between what the supplied authorities say and its own reasoning, shows where the analysis depends on a fact that has not been established, and lists what further research would change the answer. It will not add a case, statute or quotation that you did not provide.',
    whenToUse:
      'After research has been done and the material needs to be turned into a memo for a supervising lawyer or client file. Also for restructuring a rambling note into a disciplined analysis. Use the research skill first if you do not yet have authorities, and the citation worksheet before the memo is relied on.',
    inputs: [
      { name: 'Question', description: 'The legal question, the client’s objective and the jurisdiction and date that matter.', required: true },
      { name: 'Facts', description: 'The facts as known, with their source and anything disputed or assumed.', required: true },
      { name: 'Authorities', description: 'The statutes, cases, guidance and commentary gathered, with extracts of the passages relied on.', required: true },
      { name: 'Audience and format', description: 'Who will read the memo, the house style and the length.' },
    ],
    outputs: [
      { name: 'Question presented and short answer', description: 'A precise question and a direct answer with a stated confidence level.' },
      { name: 'Statement of facts', description: 'Facts relied on, marked as established, disputed or assumed.' },
      { name: 'Discussion by issue', description: 'Rule, application and counter-argument for each issue, tied to the supplied authorities.' },
      { name: 'Research gaps', description: 'Points with no supplied authority and what would need to be found.' },
      { name: 'Next steps', description: 'Further facts, research and decisions needed.' },
    ],
    prompt: `You are a legal research associate drafting a memorandum for a supervising lawyer from materials already gathered.

INPUTS
- Question: <the legal question, the client objective, jurisdiction and relevant date>
- Facts: <facts with their source; note anything disputed or assumed>
- Authorities: <statutes, cases, guidance and commentary, with the extracts relied on>
- Audience and format: <reader, house style, length>

TASK
1. QUESTION PRESENTED. Restate the question precisely, including the jurisdiction, the date and the decisive facts. If the question as asked is really several questions, split it.
2. MISSING MATERIAL. List facts and authorities you would need and do not have. Do not fill them.
3. SHORT ANSWER. Answer each question directly in two or three sentences, with a confidence level (high, moderate, low) and the single main reason for it.
4. FACTS. Set out the facts relied on, each marked ESTABLISHED, DISPUTED or ASSUMED, with its source.
5. DISCUSSION. For each issue: state the rule and identify which supplied authority it comes from; apply it to the facts; give the strongest counter-argument and say how it fares. Mark each proposition as drawn from a supplied authority (name it) or as your own reasoning.
6. AUTHORITY WEIGHT. For each authority used, say what kind it is (legislation, binding decision, persuasive decision, regulator guidance, commentary) as far as the supplied material shows, and flag where its status or currency is unknown.
7. SENSITIVITY. Identify the facts that, if different, would change the answer, and say how.
8. RESEARCH GAPS. List every point where the analysis rests on reasoning without supplied authority, and what should be looked for.
9. CONCLUSION AND NEXT STEPS. Conclude briefly and list the facts to confirm, research to run and decisions for the supervising lawyer.

RULES
- Use only the authorities supplied. Never introduce a case name, citation, section number or quotation that is not in the inputs. If a point needs authority and none is supplied, write [NO AUTHORITY SUPPLIED].
- Quote only from the extracts provided, exactly.
- Do not state that an authority is current, binding or good law unless the inputs establish it; mark it [VERIFY].
- Do not present the memo as advice to a client; it is internal analysis for a lawyer to review.
- Keep advocacy out. Give the answer the materials support, including an unwelcome one.

OUTPUT FORMAT
Heading block (to, from, date, matter, question); Question presented; Short answer; Facts; Discussion with a subheading per issue; Counter-arguments; Conclusion; Research gaps; Next steps. Close with: Assumptions made; [VERIFY] points; Authorities used (list exactly as supplied).`,
    example: {
      scenario:
        'An associate has four cases, a statutory extract and a page of client facts on whether a supplier can rely on an exclusion clause, and has two hours to produce a memo for the partner.',
      result:
        'A four-page memo with a moderate-confidence short answer, facts marked established or assumed, three issues analysed against the supplied cases, one counter-argument the materials do not answer flagged as a research gap, and a list of two facts the client must confirm.',
    },
  },
  {
    id: 'global-case-brief-builder',
    name: 'Case Brief Builder',
    description: 'Briefs a court decision from its text: facts, issues, holding, reasoning and what it does not decide.',
    jurisdiction: 'global',
    category: 'research',
    tags: ['extraction', 'research', 'disputes', 'case-law', 'summarisation'],
    sources: [
      { citation: 'The decision under review, in full', authority: 'primary', note: 'The brief is drawn only from the text supplied. Headnotes and summaries are not the decision.' },
      { citation: 'Case briefing conventions', authority: 'secondary', note: 'A method. Whether a statement is binding ratio or obiter, and the decision’s precedential weight, depend on the legal system and court hierarchy and are for a qualified lawyer.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-legal-research', 'global-legal-memo-builder', 'global-citation-verifier'],
    whatItDoes:
      'Reads the full text of a judgment and produces a structured brief: the court and procedural history, the material facts, the issues the court had to decide, what it decided on each and why, any concurring or dissenting reasoning, and the order made. It keeps the decision the court actually reached separate from remarks made along the way, quotes the passages where the test is stated, and lists what the case does not decide so that it is not cited for more than it holds. It does not report whether the decision has since been appealed or overruled.',
    whenToUse:
      'When a decision needs to be understood quickly and accurately: preparing a research memo, checking whether a case cited against you says what the other side claims, updating a client on a new judgment, or building a table of authorities. Supply the full judgment, not a headnote.',
    inputs: [
      { name: 'Judgment text', description: 'The full decision with paragraph or page numbers.', required: true },
      { name: 'Purpose', description: 'Why the case matters to you and the proposition you may cite it for.', required: true },
      { name: 'Your facts', description: 'A short description of your own matter, for comparison.' },
      { name: 'Format', description: 'Length and any house style for case briefs.' },
    ],
    outputs: [
      { name: 'Case identification', description: 'Court, date, parties, judges and procedural posture as stated in the text.' },
      { name: 'Facts, issues and holdings', description: 'Material facts, each issue and the decision on it, with paragraph references.' },
      { name: 'Reasoning and key passages', description: 'The steps of the reasoning and exact quotations of the tests applied.' },
      { name: 'Limits of the decision', description: 'What was not decided, assumed or left open.' },
      { name: 'Fit with your matter', description: 'Similarities and differences from your facts, if supplied.' },
    ],
    prompt: `You are a litigation lawyer briefing a court decision from its full text.

INPUTS
- Judgment: <paste the full decision with paragraph or page numbers>
- Purpose: <why the case matters; the proposition you may cite it for>
- Your facts: <a short description of your matter, optional>
- Format: <length and house style>

TASK
1. IDENTIFY. Court, date, parties, judges, citation and procedural posture, taken only from the text. If the text is an extract or a headnote, say so and stop treating it as the full decision.
2. MATERIAL FACTS. State the facts the court treated as mattering to the outcome, with references.
3. ISSUES. List each question the court had to decide.
4. HOLDINGS. For each issue, state what the court decided and the order made. Give the paragraph reference.
5. REASONING. Set out the steps of the reasoning for each holding. Quote exactly the passages where the court states the test or rule it applies.
6. NECESSARY OR NOT. Separate reasoning that the outcome depended on from remarks that were not needed for the result, and label the second group as likely non-binding remarks [VERIFY classification].
7. OTHER OPINIONS. Summarise any concurring or dissenting reasons and where they differ.
8. LIMITS. State what the court did not decide, what it assumed without deciding, and any point it expressly left open.
9. PROPOSITION CHECK. Say whether the text supports the proposition in the purpose: fully, partly or not, quoting the passage that decides it.
10. COMPARE. If your facts are supplied, list the material similarities and differences. Do not predict how a court would decide your matter.

RULES
- Work only from the judgment text. Do not add later history, commentary or related cases from memory.
- Never state whether the decision has been appealed, overruled, followed or distinguished; say that its current status must be checked [VERIFY].
- Quotations must be exact and carry a paragraph or page reference.
- Do not extend a holding beyond its facts. If the proposition goes further than the text, say so.
- If the judges were divided, never present one opinion as the decision of the court without saying so.

OUTPUT FORMAT
Case identification; one-paragraph summary; material facts; a table (Issue | Holding | Reference); reasoning with quoted tests; other opinions; limits of the decision; proposition check; comparison with your facts. Close with: [VERIFY] points including subsequent history and precedential weight.`,
    example: {
      scenario:
        'Opposing counsel cites an appellate decision for the proposition that notice by email is always sufficient under a contract requiring written notice, and the hearing is in two days.',
      result:
        'A two-page brief showing the court decided the point on the specific wording of that contract, a quoted passage in which it declined to state a general rule, a proposition check marked "partly — narrower than claimed", and a comparison highlighting that the present contract names a postal address.',
    },
  },
  {
    id: 'global-transcript-summary',
    name: 'Testimony Transcript Summary',
    description: 'Summarises a deposition, hearing or interview transcript by topic with page-line references and key admissions.',
    jurisdiction: 'global',
    category: 'litigation',
    tags: ['extraction', 'disputes', 'discovery', 'deposition', 'summarisation'],
    sources: [
      { citation: 'The transcript under review', authority: 'primary', note: 'The only source. Testimony is reported, never improved, and every entry is tied to a page and line.' },
      { citation: 'Litigation practice on testimony digests', authority: 'secondary', note: 'A method. Admissibility, use at trial and the rules for correcting a transcript depend on the forum.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-deposition-outline-builder', 'global-chronology-builder', 'us-privilege-log-builder'],
    whatItDoes:
      'Digests a transcript of a deposition, hearing, examination or recorded interview into a form a litigation team can use: a topic-by-topic summary with page and line references, the admissions and denials that matter to the issues in the case, exhibits referred to and what the witness said about each, and passages where the witness contradicted themselves or other evidence you supply. It reports what was said in the witness’s own terms, marks answers that were qualified or evasive, and never upgrades "I don’t recall" into a denial.',
    whenToUse:
      'After a deposition, hearing day or witness interview, when preparing for the next witness, drafting a motion or brief that relies on testimony, or bringing a new team member up to speed. Check any passage you intend to quote against the certified transcript.',
    inputs: [
      { name: 'Transcript', description: 'The full transcript with page and line numbers.', required: true },
      { name: 'Issues in the case', description: 'The claims, defences or questions the testimony matters to.', required: true },
      { name: 'Other evidence', description: 'Documents or earlier statements to compare the testimony against.' },
      { name: 'Format', description: 'Topic, chronological or page-order digest, and the length wanted.' },
    ],
    outputs: [
      { name: 'Witness overview', description: 'Who the witness is, the date, and a short overall account of the testimony.' },
      { name: 'Topical digest', description: 'Testimony by topic with page and line references.' },
      { name: 'Admissions and denials', description: 'Statements bearing on each issue, quoted or closely paraphrased with references.' },
      { name: 'Exhibit index', description: 'Each exhibit mentioned and what was said about it.' },
      { name: 'Inconsistencies and follow-up', description: 'Contradictions, evasions, undertakings given and questions left unanswered.' },
    ],
    prompt: `You are a litigation paralegal preparing a digest of a testimony transcript for the trial team.

INPUTS
- Transcript: <paste the full transcript with page and line numbers>
- Issues: <the claims, defences or questions the testimony matters to>
- Other evidence: <documents or earlier statements for comparison, optional>
- Format: <topical, chronological or page-order; length>

TASK
1. OVERVIEW. Identify the witness, their role, the date, who examined, and whether the transcript appears complete. Give a five-sentence account of the testimony.
2. TOPICAL DIGEST. Group the testimony by topic. Under each, summarise what the witness said in order, with a page:line reference for every entry.
3. ADMISSIONS AND DENIALS. For each issue supplied, list the statements that help or hurt, quoting the key words exactly with references. Label each as ADMISSION, DENIAL, QUALIFIED or NO RECOLLECTION.
4. EXHIBITS. List each exhibit referred to, where it was introduced, and what the witness said about it, including whether they recognised or authenticated it.
5. INCONSISTENCIES. Identify places where the witness contradicted an earlier answer, and, if other evidence is supplied, where the testimony conflicts with it. Give both references side by side. Describe, do not characterise as lying.
6. OBJECTIONS AND INSTRUCTIONS. Note objections, instructions not to answer and any claims of privilege, with references.
7. OPEN ITEMS. List undertakings or promises to provide information, questions the witness could not answer, and documents requested on the record.
8. FOLLOW-UP. Suggest follow-up questions or documents that the testimony makes relevant, tied to the passages that prompt them.

RULES
- Every entry needs a page:line reference. No reference, no entry.
- Use the witness’s own words for anything that matters. Never strengthen, soften or tidy an answer.
- Keep "I do not know", "I do not recall" and "I believe" exactly as given. They are not denials or admissions.
- Do not attribute a questioner’s words to the witness. An answer of "yes" to a leading question adopts only what the question said; quote the question too.
- Do not assess credibility or advise on admissibility. Flag the passage for the lawyer.
- If the transcript is rough, uncertified or has gaps, say so at the top.

OUTPUT FORMAT
Overview; topical digest as a table (Topic | Summary | Page:Line); admissions and denials by issue; exhibit index (Exhibit | First reference | Testimony); inconsistencies (Passage A | Passage B | Nature); objections and privilege; open items; follow-up. Close with: Passages to check against the certified transcript before quoting.`,
    example: {
      scenario:
        'The team took a seven-hour deposition of the defendant’s operations manager and needs a digest before deposing the finance director the following week.',
      result:
        'A twelve-page digest across nine topics with page-line references, fourteen statements classified by issue including three qualified answers, an index of 22 exhibits, two internal contradictions set side by side, four undertakings to chase, and six follow-up questions for the finance director.',
    },
  },
  {
    id: 'global-demand-letter-drafter',
    name: 'Demand Letter Drafter',
    description: 'Drafts a pre-action demand or cease-and-desist letter from supplied facts, with a risk check before sending.',
    jurisdiction: 'global',
    category: 'litigation',
    tags: ['drafting', 'disputes', 'demand-letter', 'pre-litigation', 'settlement'],
    sources: [
      { citation: 'The contract, correspondence and evidence supplied', authority: 'primary', note: 'The letter asserts only what these support.' },
      { citation: 'Pre-action rules, protocols and notice requirements of the governing law and forum', authority: 'primary', note: 'Some systems prescribe the content and timing of a letter before claim, restrict debt-collection communications, or penalise unjustified threats of intellectual-property proceedings. Which rules apply depends on the forum; this skill flags them and does not state them.' },
      { citation: 'Professional conduct rules on communications with opposing and represented parties', authority: 'regulator', note: 'Limits on threats, misleading statements and direct contact with a represented person bind the sending lawyer.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-demand-letter-responder', 'global-chronology-builder', 'global-settlement-agreement-reviewer'],
    whatItDoes:
      'Drafts a letter demanding payment, performance or that conduct stop, built only from the facts and documents you provide. It sets out the basis of the claim, the specific demand, a deadline and the consequence of non-compliance, in a tone you choose. Before the draft it runs a risk check: whether the letter could admit something, waive a right, trigger a limitation or notice clause, defame, amount to an unjustified threat, or prompt the recipient to sue first somewhere inconvenient. It marks which statements are supported by evidence and which are assertion.',
    whenToUse:
      'When a business or its lawyer needs to send a first formal demand: an unpaid invoice, a breach of contract, misuse of confidential information or intellectual property, or conduct that should stop. Have a lawyer in the relevant jurisdiction review before sending; a badly judged letter can damage the claim.',
    inputs: [
      { name: 'Facts and chronology', description: 'What happened, with dates and the documents that prove each point.', required: true },
      { name: 'Legal basis', description: 'The contract clause, right or duty relied on, with its text.', required: true },
      { name: 'Demand', description: 'What you want, by when, and what you will do otherwise.', required: true },
      { name: 'Relationship and tone', description: 'Whether the relationship should survive, and how firm the letter should be.' },
      { name: 'Jurisdiction and status', description: 'Governing law, forum, whether the recipient is represented, and any without-prejudice or settlement discussions.' },
    ],
    outputs: [
      { name: 'Pre-send risk check', description: 'Risks the letter could create and how the draft handles each.' },
      { name: 'Draft letter', description: 'A complete letter ready for lawyer review.' },
      { name: 'Evidence map', description: 'Each factual statement in the letter tied to its supporting document, or marked unsupported.' },
      { name: 'Alternative version', description: 'A softer or firmer variant of the key paragraphs.' },
      { name: 'Lawyer review points', description: 'Questions that must be answered before the letter goes.' },
    ],
    prompt: `You are a disputes lawyer drafting a pre-action demand letter for review by the responsible lawyer.

INPUTS
- Facts: <chronology with dates and supporting documents>
- Legal basis: <contract clause, right or duty relied on, with its text>
- Demand: <what is required, by when, and the consequence otherwise>
- Relationship and tone: <ongoing or ended; conciliatory, firm or final>
- Jurisdiction and status: <governing law, forum, whether the recipient is represented, any settlement discussions>

TASK
1. MISSING INFORMATION. List what you need and do not have, especially the contract text, proof of the key facts, and the governing law.
2. RISK CHECK BEFORE DRAFTING. Consider and report on each: (a) admissions or concessions the letter might make; (b) waiver or election, such as affirming a contract you may wish to terminate; (c) contractual notice or dispute-resolution clauses that prescribe form, address, timing or a step before proceedings; (d) limitation periods approaching; (e) rules on pre-action letters, consumer debt collection or unjustified threats that may apply in the forum [VERIFY]; (f) defamation or confidentiality risk if the letter is copied to others; (g) the chance the recipient responds by starting proceedings first; (h) whether the letter should be marked as an open letter or as a settlement communication, and the effect of each [VERIFY].
3. EVIDENCE MAP. List each factual statement the letter will make and the document supporting it. Mark any without support as UNSUPPORTED and either remove it or phrase it as the sender’s understanding.
4. DRAFT. Write the letter: heading and references; who the sender is; the facts in short numbered paragraphs; the basis of the claim, quoting the clause or right; the specific demand with amounts calculated and shown; a clear deadline as a calendar date; the consequence, limited to steps the sender is entitled and genuinely prepared to take; a reservation of rights; and how to respond. Request preservation of relevant documents where appropriate.
5. TONE. Match the requested tone. Firm does not mean abusive; remove adjectives and accusations of bad faith that the evidence does not support.
6. ALTERNATIVE. Provide a variant of the demand and consequence paragraphs one step softer and one step firmer.
7. REVIEW POINTS. List what the responsible lawyer must confirm before sending.

RULES
- Never assert a fact, amount or legal right that the inputs do not support. Use [CLIENT TO CONFIRM] for gaps.
- Never threaten criminal complaint, regulatory report or publicity to gain advantage in a civil claim, and never threaten a step the sender does not intend or is not entitled to take.
- Do not state interest rates, statutory rights or limitation periods as settled; mark them [VERIFY].
- If the recipient is represented, address the letter to their lawyer and say so.
- Do not include settlement offers in an open letter without flagging the consequence.

OUTPUT FORMAT
Missing information; risk check as a table (Risk | Present? | How handled); evidence map; the draft letter in full; alternative paragraphs; lawyer review points. Close with: Assumptions made; [VERIFY] points.`,
    example: {
      scenario:
        'A design agency is owed three invoices totalling 48,000 by a client who has stopped replying, and wants to keep the door open to future work.',
      result:
        'A risk check noting the contract requires notice to a named address and a 14-day cure period before suspension, an evidence map tying each invoice to its purchase order, a firm but courteous letter with a calendar deadline and a reservation of rights, softer and firmer variants of the closing paragraphs, and a flag that the contractual interest rate must be confirmed.',
    },
  },
  {
    id: 'global-board-minutes-drafter',
    name: 'Board Minutes Drafter',
    description: 'Drafts board or committee minutes and resolutions from an agenda and notes, flagging approvals that need checking.',
    jurisdiction: 'global',
    category: 'corporate',
    tags: ['drafting', 'corporate-governance', 'corporate-transactions', 'minutes', 'resolutions'],
    sources: [
      { citation: 'The company’s constitutional documents, board charter and delegations of authority', authority: 'primary', note: 'Quorum, notice, voting, conflicts and who may approve what are set here and by the applicable company law. Read them; do not assume.' },
      { citation: 'Applicable company law on directors’ meetings, records and conflicts of interest', authority: 'primary', note: 'Requirements differ by jurisdiction and entity type. This skill flags the questions and does not state the rules.' },
      { citation: 'Corporate secretarial practice on minute-taking', authority: 'secondary', note: 'Conventions on level of detail and style. House practice and counsel’s preferences on privilege and litigation risk prevail.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-delaware-corporate-approval-planner', 'uk-companies-act-corporate-actions', 'au-director-duties-checker'],
    whatItDoes:
      'Turns an agenda, papers list and meeting notes into draft minutes in a consistent house style: attendance and quorum, declarations of interest, each item with the decision reached and the basis for it, resolutions in operative wording, and an action list with owners and dates. It records decisions and the fact of deliberation without transcribing debate, keeps legally privileged advice out of the body except by reference, and flags every point where the constitution or the law may impose a requirement — quorum, notice, conflicts, reserved matters, shareholder approval — for the company secretary to confirm.',
    whenToUse:
      'After a board or committee meeting, when preparing written resolutions in place of a meeting, and when cleaning up a backlog of draft minutes. The chair and company secretary remain responsible for accuracy; nothing should be recorded that did not happen.',
    inputs: [
      { name: 'Meeting details', description: 'Entity, body, date, time, place or platform, chair, attendees, apologies and invitees.', required: true },
      { name: 'Agenda and papers', description: 'The agenda and a list of papers circulated.', required: true },
      { name: 'Notes of the meeting', description: 'What was discussed and decided on each item, votes and abstentions, and actions.', required: true },
      { name: 'Governance documents', description: 'Relevant extracts of the constitution, charter and delegations, including quorum and conflict rules.' },
      { name: 'House style', description: 'A previous set of minutes or a style guide.' },
    ],
    outputs: [
      { name: 'Draft minutes', description: 'Complete minutes in house style.' },
      { name: 'Resolutions', description: 'Each resolution in operative wording, numbered.' },
      { name: 'Action list', description: 'Actions with owner and due date.' },
      { name: 'Governance check', description: 'Quorum, notice, conflicts and approval-level points to confirm.' },
      { name: 'Queries for the chair', description: 'Gaps and ambiguities in the notes that must be resolved before signing.' },
    ],
    prompt: `You are a company secretary drafting minutes of a board or committee meeting for review by the chair.

INPUTS
- Meeting: <entity, body, date, time, place or platform, chair, attendees, apologies, invitees>
- Agenda and papers: <agenda items; papers circulated>
- Notes: <discussion and decision on each item; votes, abstentions, recusals; actions>
- Governance documents: <extracts on quorum, notice, voting, conflicts, reserved matters, delegations>
- House style: <a prior set of minutes or style notes>

TASK
1. QUERIES FIRST. List anything in the notes that is unclear, missing or inconsistent: who was present for which item, what exactly was approved, on what terms, who voted how. Do not resolve these by guessing.
2. OPENING. Record the entity and body, date, time and place, those present and in attendance and in what capacity, apologies, and who chaired. State that notice was given and a quorum was present only if the inputs show it; otherwise mark [CONFIRM].
3. INTERESTS. Record each declaration of interest, the item it relates to and how it was handled (noted, recusal, did not vote, left the meeting), from the notes only.
4. ITEMS. For each agenda item: the paper considered, who presented, the key points the body considered in neutral summary form, the decision, and any conditions. Record that the directors considered relevant matters where the notes show they did; do not invent deliberation.
5. RESOLUTIONS. Draft each decision as a numbered resolution in operative wording ("IT WAS RESOLVED THAT…"), stating what is approved, on what terms, any authority delegated and to whom, and any limit on that authority. Record votes against and abstentions by name if the notes give them.
6. PRIVILEGE AND SENSITIVITY. Where legal advice was given, record that advice was received and considered without setting out its content, and flag the passage for counsel. Flag any price-sensitive, personal or commercially sensitive content.
7. ACTIONS. List actions with owner and due date.
8. GOVERNANCE CHECK. From the governance extracts, list each point to confirm: quorum for each item given recusals, adequacy of notice, matters reserved to the board or needing shareholder or regulator approval, conflict procedures, and whether the decision is within delegated limits. If no extracts are supplied, list the questions to check.
9. CLOSE. Record the close of the meeting and a signature block for the chair.

RULES
- Record only what the notes support. Never add an attendee, a vote, a discussion point or an approval that is not in the inputs.
- Minutes record decisions and the fact of proper consideration; do not attribute remarks to individuals unless the notes ask for it or a director requested that their view be recorded.
- Do not state what company law requires; flag the question for the company secretary or counsel [VERIFY].
- Never backdate, and never describe a meeting as held if the notes describe a written or circular resolution; draft the correct form instead.
- Use past tense, neutral language and consistent defined terms.

OUTPUT FORMAT
Queries for the chair; draft minutes in full; numbered resolutions; action list as a table (Action | Owner | Due); governance check as a table (Point | Source | Status). Close with: Assumptions made; [CONFIRM] and [VERIFY] points.`,
    example: {
      scenario:
        'A private company’s board met by video to approve a new bank facility and the annual budget; one director is also a director of the lender, and the secretary has two pages of rough notes.',
      result:
        'Draft minutes recording the interest declaration and recusal, a governance check showing quorum must be confirmed for the facility item once the conflicted director is excluded, two operative resolutions with a delegation to sign limited to the approved terms, a note that legal advice was received without reciting it, and four queries for the chair.',
    },
  },
  {
    id: 'global-engagement-letter-builder',
    name: 'Engagement Letter Builder',
    description: 'Drafts a client engagement letter with clear scope, exclusions, fees and termination from intake notes.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['drafting', 'legal-ops', 'contract-lifecycle', 'client-intake', 'scope-of-work'],
    sources: [
      { citation: 'Professional conduct and client-care rules of the lawyer’s regulator', authority: 'regulator', note: 'Rules on fee information, conflicts, client money, complaints, limitation of liability and file retention differ by regulator and are often mandatory. The skill lists the points to check; it does not state the rules.' },
      { citation: 'The firm’s standard terms of business and insurer requirements', authority: 'secondary', note: 'The letter should sit on top of the firm’s approved terms, not replace them.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['professional-services'],
    relatedSkills: ['global-draft-builder', 'global-legal-intake-triage', 'global-liability-indemnity-analyser'],
    whatItDoes:
      'Drafts an engagement letter from intake notes, with its weight on the part that prevents most disputes with clients: a precise statement of what the firm will do, what it will not do, and what it assumes. It identifies exactly who the client is and is not, sets out the fee basis with what is included and what triggers a revised estimate, names the team, and covers communication, conflicts, termination and file handling. It lists the regulator-specific items that must be added or checked for the lawyer’s jurisdiction and marks them rather than inventing their content.',
    whenToUse:
      'When opening a new matter or taking on new work for an existing client, when the scope of a matter changes enough to need a variation letter, and when reviewing a template for gaps. The responsible lawyer must check the letter against their regulator’s current client-care rules before sending.',
    inputs: [
      { name: 'Client and matter', description: 'Who the client is (and related parties who are not), the matter and its objective.', required: true },
      { name: 'Scope', description: 'What the firm will do, the stages, and anything discussed as out of scope.', required: true },
      { name: 'Fees', description: 'Fee basis, rates or fixed amounts, estimates, expenses, billing and payment terms, any advance payment.', required: true },
      { name: 'Team and regulator', description: 'The responsible lawyer, team, and the jurisdiction and regulator that govern the engagement.' },
      { name: 'Standard terms', description: 'The firm’s terms of business, if the letter is to refer to them.' },
    ],
    outputs: [
      { name: 'Draft engagement letter', description: 'A complete letter in plain language.' },
      { name: 'Scope schedule', description: 'Included services, exclusions and assumptions in a form that can be varied later.' },
      { name: 'Regulatory checklist', description: 'Client-care items to confirm for the stated regulator.' },
      { name: 'Risk notes for the firm', description: 'Ambiguities in client identity, scope or fees that could cause a dispute.' },
    ],
    prompt: `You are a law firm risk and client-care lawyer drafting an engagement letter.

INPUTS
- Client and matter: <the client entity or person; related parties who are not clients; the matter and objective>
- Scope: <work to be done, stages, anything discussed as excluded>
- Fees: <basis, rates or fixed fee, estimate, expenses, billing frequency, payment terms, advance payment>
- Team and regulator: <responsible lawyer, team, jurisdiction and professional regulator>
- Standard terms: <the firm’s terms of business, if any>

TASK
1. MISSING INFORMATION. List what is needed to complete the letter. Do not invent fees, names or scope.
2. CLIENT IDENTITY. State exactly who the client is. Say expressly who is not a client where confusion is likely: affiliates, directors, shareholders, family members, a counterparty paying the fees. Flag any joint representation and the conflict and confidentiality consequences for the lawyer to address.
3. SCOPE. Write the scope as three lists: services included, by stage; services excluded, naming the adjacent work a client might assume is covered (tax, other jurisdictions, regulatory filings, appeals, enforcement, post-completion steps); and assumptions on which the scope and fee rest. State how changes to scope will be agreed.
4. FEES. Set out the fee basis clearly. For an estimate, say what it covers, that it is not a cap unless stated, and the events that will trigger a revised estimate. For a fixed fee, say what is inside and outside it. Cover expenses and third-party costs, taxes, billing frequency, payment terms, advance payments and how they are held, and consequences of non-payment. Use only the figures supplied.
5. SERVICE AND COMMUNICATION. Name the responsible lawyer and team, how and how often the client will be updated, the client’s responsibilities (instructions, documents, deadlines) and who may give instructions.
6. STANDARD PROVISIONS. Include, as short clauses or by reference to the standard terms: conflicts, confidentiality and data handling, use of technology and third-party providers if the firm’s policy requires disclosure, termination by either side and fees on termination, file retention and return, and governing law.
7. REGULATORY CHECKLIST. List the client-care items commonly mandated by legal regulators and mark each [CONFIRM AGAINST REGULATOR RULES]: fee and cost information, complaints procedure and external redress, client money, professional insurance details, limitation of liability and whether it is permitted, cancellation rights for consumers, anti-money laundering and identity checks, and conflict consents.
8. RISK NOTES. List ambiguities that could later cause a fee or negligence dispute.

RULES
- Do not state what any regulator requires; flag the item for confirmation.
- Do not draft a limitation or exclusion of the firm’s liability unless the inputs ask for it, and then flag it for regulatory and insurer approval.
- Never promise an outcome or a completion date as a commitment; state estimates as estimates.
- Write in plain language a non-lawyer client can follow.
- Use [TO COMPLETE] for anything not supplied.

OUTPUT FORMAT
Missing information; the letter in full with headed sections; the scope schedule as three lists; regulatory checklist as a table (Item | Included? | Confirm against); risk notes. Close with: Assumptions made; items [TO COMPLETE].`,
    example: {
      scenario:
        'A three-partner firm is taking on a founder for the sale of her company; the buyer’s parent may pay part of the fees, and tax advice will come from the client’s accountants.',
      result:
        'A letter naming the founder as the only client and stating the company and buyer are not, a scope schedule excluding tax and post-completion earn-out disputes, a staged estimate with three listed triggers for revision, a regulatory checklist with nine items to confirm, and a risk note on third-party payment of fees.',
    },
  },
  {
    id: 'global-contract-amendment-drafter',
    name: 'Contract Amendment Drafter',
    description: 'Drafts an amendment or variation to a signed contract and checks it against the contract’s own change rules.',
    jurisdiction: 'global',
    category: 'contracts',
    tags: ['drafting', 'contract-lifecycle', 'review', 'amendment', 'variation'],
    sources: [
      { citation: 'The existing contract and all prior amendments', authority: 'primary', note: 'The variation clause, notice provisions, order of precedence and signature requirements control how the contract may be changed.' },
      { citation: 'Governing law on variation of contracts', authority: 'primary', note: 'Requirements such as consideration, writing, formalities for deeds, and the effect of no-oral-modification clauses differ between legal systems. Flagged, not stated.' },
      { citation: 'Commercial drafting practice for amendments', authority: 'secondary', note: 'Conventions on amendment-by-replacement versus amendment-and-restatement.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-draft-builder', 'global-smart-redline', 'global-contract-version-comparison', 'global-obligation-extraction'],
    whatItDoes:
      'Drafts an amendment agreement, change order or variation letter that changes a signed contract precisely and nothing else. It first reads the contract’s own rules for change — who must sign, in what form, with what notice — and checks every earlier amendment so the new one amends the current text. It then drafts each change as an exact instruction (replace, insert, delete) with the full new wording, runs a knock-on check for clauses, definitions, schedules and cross-references the change disturbs, and adds effective date, no-other-changes and conflict wording. Third-party consents and governing-law formalities are flagged.',
    whenToUse:
      'When extending a term, changing price, scope, service levels, parties or notice details, adding a statement of work, or documenting a negotiated concession on a contract already in force. For wholesale changes, it will recommend an amended and restated agreement instead.',
    inputs: [
      { name: 'Existing contract', description: 'The signed agreement with all schedules.', required: true },
      { name: 'Prior amendments', description: 'Every earlier amendment, change order or side letter, or confirmation that there are none.', required: true },
      { name: 'Changes agreed', description: 'What is to change, in commercial terms, and from when.', required: true },
      { name: 'Parties and signatories', description: 'Current legal names, any change of party, and who will sign.' },
      { name: 'Governing law', description: 'The governing law of the contract if not clear from its text.' },
    ],
    outputs: [
      { name: 'Change-mechanics check', description: 'What the contract requires for a valid change, and whether the plan meets it.' },
      { name: 'Draft amendment', description: 'A complete amendment document with precise change instructions.' },
      { name: 'Knock-on register', description: 'Other clauses, definitions and schedules affected, with the fix for each.' },
      { name: 'Consents and formalities list', description: 'Third-party consents, notices and governing-law formalities to confirm.' },
      { name: 'Conformed extract', description: 'The amended clauses as they will read after the change.' },
    ],
    prompt: `You are a commercial contracts lawyer drafting an amendment to a signed agreement.

INPUTS
- Contract: <the signed agreement with schedules>
- Prior amendments: <all earlier amendments and side letters, or "none">
- Changes agreed: <each change in commercial terms and its effective date>
- Parties and signatories: <current legal names; any change of party; signatories>
- Governing law: <if not stated in the contract>

TASK
1. MISSING INFORMATION. List what you need and do not have. If prior amendments may exist but are not supplied, say that the draft may amend out-of-date text.
2. CHANGE MECHANICS. Find and quote the variation clause and any related provisions: writing and signature requirements, authorised signatories, change-control procedures, notice provisions, entire-agreement and order-of-precedence clauses. State what a valid change requires under the contract and whether the proposed approach meets it.
3. CURRENT TEXT. Establish the current wording of each clause to be changed by applying the prior amendments in order. Show any clause already amended.
4. FORM. Recommend amendment agreement, change order under an existing procedure, variation letter, or amended and restated agreement, with the reason. Recommend restatement where changes are extensive or earlier amendments have made the text hard to follow.
5. DRAFT. Produce the document: parties with current legal names; recitals identifying the original agreement by title and date and listing prior amendments; definitions and interpretation by reference to the original; the amendments as numbered instructions, each stating the clause, the action (delete and replace, insert after, delete) and the complete new text; effective date and whether any change applies to past periods; a statement that the agreement otherwise continues unchanged; a conflict clause; governing law and dispute resolution by reference; counterparts and signature blocks.
6. KNOCK-ON CHECK. For each change, check and list: definitions used or newly needed; cross-references; schedules, pricing tables and service levels; term, renewal and termination dates; payment mechanics; liability caps tied to fees; insurance and security; and any statement of work or order form that repeats the changed term.
7. CONSENTS AND FORMALITIES. Flag: guarantors or security providers whose consent may be needed and whether a change could release them; lenders, landlords, licensors or regulators with approval rights; whether the governing law requires consideration, a deed or other formality for the change to bind [VERIFY]; and any stamp, filing or registration point.
8. CONFORMED EXTRACT. Show each amended clause as it will read after the amendment.

RULES
- Change only what was agreed. Do not improve other clauses; list suggestions separately as optional.
- Quote the existing wording exactly when identifying text to be replaced.
- Never state that the amendment is valid or binding; say what the contract requires and flag governing-law formalities [VERIFY].
- Do not backdate. If the change is to apply from an earlier date, say so expressly in the drafting and flag it.
- Use [TO COMPLETE] for any figure, date or name not supplied.

OUTPUT FORMAT
Missing information; change-mechanics check; recommended form; the draft amendment in full; knock-on register as a table (Affected provision | Why | Fix); consents and formalities list; conformed extract. Close with: Assumptions made; [VERIFY] points; Optional improvements not included.`,
    example: {
      scenario:
        'A customer and supplier have agreed to extend a services agreement by two years with a 4 percent price increase; the agreement was amended once before and is guaranteed by the supplier’s parent.',
      result:
        'A mechanics check quoting a variation clause that requires signature by a director of each party, an amendment agreement with four precise instructions applied to the already-amended text, a knock-on register catching a liability cap tied to annual fees and a renewal notice date, and a flag that the guarantor’s confirmation should be obtained.',
    },
  },
  {
    id: 'global-policy-drafter',
    name: 'Internal Policy Drafter',
    description: 'Drafts or refreshes an internal policy with clear rules, owners and exceptions, mapped to its stated sources.',
    jurisdiction: 'global',
    category: 'compliance',
    tags: ['drafting', 'programme-design', 'regulatory-change', 'policy', 'governance'],
    sources: [
      { citation: 'The laws, regulations, licences and contracts the policy is meant to implement, as supplied by the user', authority: 'primary', note: 'The policy’s mandatory content comes from these. The skill maps to what is supplied and does not state legal requirements from memory.' },
      { citation: 'The organisation’s existing policies, standards and governance framework', authority: 'secondary', note: 'A new policy must fit the hierarchy and not contradict existing documents.' },
      { citation: 'Compliance programme practice on policy design', authority: 'secondary', note: 'Conventions on separating policy, standard and procedure and on making rules testable.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-employment-policy-checker', 'global-horizon-scanner', 'global-regulation-obligation-mapper'],
    whatItDoes:
      'Drafts an internal policy that people can follow and auditors can test. It separates the rules (what must and must not happen) from guidance and from procedure, gives each rule an owner and a way to evidence compliance, and defines who the policy applies to, how exceptions are approved and what happens on breach. Each mandatory rule is mapped to the law, regulation, contract or risk decision you supplied as its source, so nothing is presented as legally required without a basis, and rules that are the organisation’s own choice are labelled as such. When refreshing an existing policy it produces a change table.',
    whenToUse:
      'When a new policy is needed after a regulatory change, audit finding or incident; when an existing policy is long, vague or out of date; and when aligning group policies after an acquisition. Employment-related policies may need consultation or local-law review before adoption.',
    inputs: [
      { name: 'Topic and purpose', description: 'What the policy covers and the risk or requirement behind it.', required: true },
      { name: 'Source requirements', description: 'The legal, regulatory, contractual or internal requirements it must implement, with their text or a summary.', required: true },
      { name: 'Organisation context', description: 'Who it applies to, the jurisdictions, the functions involved and the existing policy framework.', required: true },
      { name: 'Existing policy', description: 'The current version, if this is a refresh.' },
      { name: 'Template and style', description: 'The house policy template and reading level.' },
    ],
    outputs: [
      { name: 'Draft policy', description: 'A complete policy in the house structure.' },
      { name: 'Requirements map', description: 'Each rule tied to its source, or marked as an internal choice.' },
      { name: 'Roles and controls table', description: 'Owner, control and evidence for each rule.' },
      { name: 'Change table', description: 'For a refresh, what changed and why.' },
      { name: 'Adoption notes', description: 'Approvals, consultation, training and local-law review points.' },
    ],
    prompt: `You are a compliance counsel drafting an internal policy for approval.

INPUTS
- Topic and purpose: <subject; the risk or requirement behind it>
- Source requirements: <laws, regulations, licences, contracts or internal decisions the policy implements, with text or summary>
- Context: <who it applies to; jurisdictions; functions; existing policies it must fit>
- Existing policy: <current version, if a refresh>
- Template and style: <house template; reading level>

TASK
1. MISSING INFORMATION. List what you need and do not have. If no source requirements are supplied, say that every rule will be labelled as an internal choice.
2. SCOPE. State who and what the policy applies to: entities, staff categories, contractors, locations, systems and activities. State what it does not cover and which other policy does.
3. PRINCIPLES. Give three to five short statements of what the policy is for.
4. RULES. Write the rules as short numbered statements using "must", "must not" and "may". Each rule should be testable: a reader should be able to tell whether it was followed. Include any thresholds or time limits only from the source requirements or the inputs; otherwise leave [TO SET].
5. REQUIREMENTS MAP. For each rule, cite the source requirement it implements, or label it INTERNAL CHOICE. Where a supplied requirement has no rule, flag the gap. Where a rule goes beyond its source, say so.
6. ROLES. Assign an owner for the policy and for each rule or group of rules, and state approval, oversight and review responsibilities by role, not by name.
7. CONTROLS AND EVIDENCE. For each rule, state the control that makes it happen and the record that shows it did.
8. EXCEPTIONS AND BREACH. Set out how exceptions are requested, who approves, how long they last and how they are recorded; how breaches are reported and escalated; and the consequences, in terms consistent with the organisation’s disciplinary framework.
9. SEPARATE PROCEDURE. Move step-by-step instructions out of the policy into a list of procedures to be written, with a one-line description of each.
10. CHANGE TABLE. For a refresh, list each change against the existing version with the reason.
11. ADOPTION. List approvals needed, any employee consultation or works-council step that may apply in the stated jurisdictions [VERIFY], translation, training, communication and the review date.

RULES
- Never present a rule as legally required unless a supplied source supports it. Label everything else INTERNAL CHOICE.
- Do not state the content of a law from memory; map to what was supplied and mark anything else [VERIFY].
- No aspirational language in the rules section. Remove "should endeavour", "where possible" and similar unless the rule is deliberately discretionary.
- Do not promise in a policy what the organisation cannot evidence.
- Keep to the reading level requested and define every term used.

OUTPUT FORMAT
Missing information; the draft policy (purpose, scope, principles, rules, roles, exceptions, breach, related documents, review); requirements map as a table (Rule | Source | Status); roles and controls table (Rule | Owner | Control | Evidence); procedures to write; change table; adoption notes. Close with: Assumptions made; [VERIFY] and [TO SET] points.`,
    example: {
      scenario:
        'After an audit finding, a 600-person software company needs a gifts and hospitality policy for five countries; it has supplied its anti-bribery obligations summary and a customer contract clause.',
      result:
        'A three-page policy with eleven testable rules, each mapped to the supplied obligations or labelled an internal choice, approval thresholds left to set by the compliance committee, a controls table naming the register as evidence, two procedures to be written separately, and a note that employee consultation may be needed in two of the countries.',
    },
  },
  {
    id: 'global-plain-language-advice-drafter',
    name: 'Plain-Language Advice Drafter',
    description: 'Turns a legal analysis into a clear email or note for a non-lawyer, keeping every qualification that matters.',
    jurisdiction: 'global',
    category: 'research',
    tags: ['drafting', 'legal-ops', 'review', 'client-communication', 'plain-language'],
    sources: [
      { citation: 'The analysis, advice or document supplied by the user', authority: 'primary', note: 'The only source of legal content. The skill rewrites; it does not add or change conclusions.' },
      { citation: 'Plain-language drafting practice for legal communication', authority: 'secondary', note: 'Conventions on structure and wording. Professional duties on the content of advice remain with the lawyer who sends it.' },
    ],
    lastReviewed: '2026-11-12',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-legal-memo-builder', 'global-legal-document-summary', 'global-legal-intake-triage'],
    whatItDoes:
      'Rewrites a legal memo, a lawyer’s notes or a technical analysis into an email or short note that a business reader will read and act on. It leads with the answer and what the reader needs to do, explains the reasoning in ordinary words, and states the risk in terms of what could actually happen. Its discipline is fidelity: it carries across every condition, assumption and caveat that changes the answer, removes only the ones that do not, and produces a check table showing where each statement in the plain version comes from in the original so the sending lawyer can confirm nothing shifted.',
    whenToUse:
      'When legal analysis is finished and needs to reach a non-lawyer: advice to a business team, a client update, a response to an intake request, or a management summary. Not for creating advice where none exists; supply the analysis first.',
    inputs: [
      { name: 'Source analysis', description: 'The memo, notes or document containing the legal conclusion and reasoning.', required: true },
      { name: 'Reader', description: 'Who they are, what they asked, what they already know and what they must decide.', required: true },
      { name: 'Channel and tone', description: 'Email, chat reply, briefing note; formal or informal; length limit.' },
      { name: 'Privilege and sensitivity', description: 'Whether the message is intended to be privileged and who may be copied.' },
    ],
    outputs: [
      { name: 'Plain-language message', description: 'The email or note, answer first.' },
      { name: 'Action list', description: 'What the reader must do, by when, and what to avoid.' },
      { name: 'Fidelity table', description: 'Each statement mapped to its source passage, with caveats kept or dropped and why.' },
      { name: 'Points for the lawyer', description: 'Ambiguities in the source that the rewrite had to resolve or flag.' },
    ],
    prompt: `You are a senior lawyer rewriting legal analysis for a non-lawyer reader without changing its meaning.

INPUTS
- Source analysis: <the memo, notes or document with the conclusion and reasoning>
- Reader: <role, the question they asked, what they know, the decision they face>
- Channel and tone: <email, chat reply or note; formality; length limit>
- Privilege and sensitivity: <whether intended to be privileged; who will be copied>

TASK
1. UNDERSTAND THE SOURCE. State in two sentences what the source concludes and how confident it is. If the source does not actually answer the reader’s question, say so and stop; do not supply an answer of your own.
2. ANSWER FIRST. Open the message with the direct answer to the reader’s question in one or two sentences, using the source’s level of confidence: yes, no, yes if, probably, or we do not yet know.
3. WHAT TO DO. List the actions for the reader: what to do, what not to do, by when, and when to come back to legal.
4. WHY. Explain the reasoning in ordinary words in a short paragraph. Replace terms of art with plain equivalents, or define them in a few words where the precise term matters.
5. RISK IN REAL TERMS. Describe the risk as what could happen, to whom, and how likely the source says it is. Do not add probability or amounts the source does not give.
6. CONDITIONS THAT CHANGE THE ANSWER. State the assumptions and conditions the answer depends on as plain "this changes if…" statements.
7. FIDELITY TABLE. For each sentence of legal content in the message, give the source passage it comes from. For each caveat in the source, say whether you kept it, merged it or dropped it, and why. Drop only caveats that could not change what the reader does.
8. PRIVILEGE AND DISTRIBUTION. If the message is intended to be privileged, add the marking the user’s organisation uses and note that wide copying may put it at risk, for the lawyer to decide [VERIFY for the jurisdiction].
9. POINTS FOR THE LAWYER. List any place where the source was ambiguous, internally inconsistent or silent and you had to choose a reading.

RULES
- Add no legal content. Every conclusion, condition and risk must come from the source.
- Never make the answer more certain than the source. "Likely" stays "likely".
- Never drop a deadline, a condition precedent or a "do not" instruction.
- No jargon, Latin or nested clauses. Short sentences, active voice, the reader as "you".
- Do not include citations unless the reader needs them; keep them in the fidelity table.
- The message is a draft for a lawyer to approve and send.

OUTPUT FORMAT
The message, ready to paste, within the length limit; the action list; the fidelity table (Message statement | Source passage | Caveat kept, merged or dropped); points for the lawyer.`,
    example: {
      scenario:
        'Legal has a six-page memo concluding that a marketing team can probably run a prize promotion in three countries if entry is free and winners are chosen by skill, and the marketing lead wants a yes or no by email.',
      result:
        'A 140-word email opening "Yes, if two conditions are met", a four-item action list with the launch deadline, the two conditions restated as "this changes if" lines, a fidelity table showing nine caveats of which six were kept, and one point for the lawyer where the memo was unclear about a third country.',
    },
  },
];
