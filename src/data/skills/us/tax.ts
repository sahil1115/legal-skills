import type { Skill, SkillSource } from '../../../types/skill';

/**
 * US tax controversy skills — audits, appeals, litigation, penalties and
 * collection for individuals and businesses, federal and state.
 *
 * Tax procedure turns on dates and amounts that are adjusted for inflation or
 * changed by legislation and case law, so every prompt here treats deadlines,
 * thresholds and penalty figures as [VERIFY] unless they are statutory and
 * stable, and even then names the source to read.
 */

const IRC: SkillSource = { citation: 'Internal Revenue Code (Title 26, United States Code)', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://uscode.house.gov', note: 'The substantive and procedural tax law, including assessment, limitations periods, penalties, interest and collection.' };
const REGS: SkillSource = { citation: 'Treasury Regulations (Title 26, Code of Federal Regulations)', authority: 'primary', publisher: 'US Department of the Treasury', jurisdiction: 'us', url: 'https://www.ecfr.gov', note: 'Binding interpretive and procedural regulations under the Code.' };
const IRM: SkillSource = { citation: 'Internal Revenue Manual', authority: 'guidance', publisher: 'Internal Revenue Service', jurisdiction: 'us', url: 'https://www.irs.gov', note: 'How the IRS administers the law. Not binding on courts, but it is what examiners, Appeals officers and collection staff follow, and it changes frequently.' };
const TAX_COURT: SkillSource = { citation: 'United States Tax Court Rules of Practice and Procedure', authority: 'primary', publisher: 'United States Tax Court', jurisdiction: 'us', url: 'https://www.ustaxcourt.gov', note: 'Petition content, small tax case procedure, pleadings, stipulations and trial practice.' };

export const usTaxSkills: Skill[] = [
  {
    id: 'us-irs-notice-triage',
    name: 'IRS Notice Triage & Deadlines',
    description: 'Identifies an IRS notice or letter, calculates every response deadline, and sets the right first move.',
    jurisdiction: 'us',
    category: 'tax',
    tags: ['screening', 'tax-controversy', 'irs-notices', 'deadlines', 'disputes'],
    sources: [IRC, IRM, { citation: 'IRS notice and letter descriptions', authority: 'guidance', publisher: 'Internal Revenue Service', jurisdiction: 'us', url: 'https://www.irs.gov', note: 'Explains common notices (for example automated underreporter proposals, balance due notices, 30-day letters and statutory notices of deficiency). Notice numbers and wording change; read the notice itself.' }],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-tax-court-petition-planner', 'us-irs-appeals-protest-builder', 'us-collection-alternatives-planner', 'us-penalty-abatement-request'],
    whatItDoes:
      'Takes a notice an individual or business has received from the IRS and works out what it actually is — a proposal, a bill, an examination letter, a 30-day letter, a statutory notice of deficiency, or a collection notice that carries hearing rights — because each one opens a different door and closes it on a different date. It calculates every deadline from the notice date rather than the date received, separates the deadline that cannot be missed from the ones that merely help, and recommends the first move: agree and pay, respond with documents, request Appeals, petition the Tax Court, or request a collection hearing.',
    whenToUse:
      'The day a notice arrives, when a client forwards a stack of unopened IRS mail, and whenever there is doubt about whether a deadline has already passed. Not for preparing the substantive response itself — route to the protest, petition, abatement or collection skills.',
    inputs: [
      { name: 'The notice', description: 'The full notice or letter, including the notice number, date, tax period and any enclosures.', required: true },
      { name: 'Taxpayer', description: 'Individual or entity type, and where the taxpayer lives or has its principal place of business.', required: true },
      { name: 'Date received', description: 'When it actually arrived, and how — relevant to arguments about mailing, not to the deadline itself.' },
      { name: 'History', description: 'Earlier notices for the same period, returns filed, payments and any representative already on file.' },
    ],
    outputs: [
      { name: 'Notice identification', description: 'What the notice is, what it proposes or demands, and which stage of the process it marks.' },
      { name: 'Deadline table', description: 'Every response date, which is critical, and the consequence of missing each.' },
      { name: 'Rights map', description: 'The appeal, Tax Court or collection hearing rights this notice opens or closes.' },
      { name: 'Recommended first move', description: 'The action to take now, with the reasoning.' },
      { name: 'Document request', description: 'What to gather before responding.' },
    ],
    prompt: `You are a US tax controversy lawyer triaging an IRS notice for a client.

INPUTS
- Notice: <full text: notice or letter number, notice date, tax form and period, amounts, enclosures>
- Taxpayer: <individual / C corporation / S corporation / partnership / trust / exempt organisation; state of residence or principal place of business>
- Date received (optional): <and how>
- History: <earlier notices for this period, returns filed, payments, any power of attorney on file>

TASK
1. IDENTIFY. Say what the notice is: an information request, a proposed adjustment (for example from document matching), an examination report or 30-day letter, a statutory notice of deficiency, a notice of claim disallowance, a bill, or a collection notice that carries a right to a hearing. Quote the words on the notice that establish this.
2. DEADLINES. Calculate every response deadline from the date printed on the notice, not the date received. Distinguish deadlines fixed by statute (for example the period to petition the Tax Court after a notice of deficiency, or to request a collection due process hearing) from deadlines set by the IRS as a matter of practice. For a notice of deficiency, check whether the notice states a last date to petition, and use the earlier of that date and the calculated date if they differ [VERIFY]. Note that whether some statutory deadlines can be equitably tolled depends on the circuit and is unsettled [VERIFY].
3. RIGHTS. Map what this notice opens: Appeals consideration, a Tax Court petition, a refund route, or a collection hearing. Say what is lost if the deadline passes and what fallback remains.
4. EXPOSURE. Summarise tax, penalties and interest claimed, and whether interest continues to run.
5. FIRST MOVE. Recommend one: agree and pay; respond with documents; request a conference or Appeals; petition the Tax Court; request a collection hearing; or request more time where the IRS permits it. Give the reasoning.
6. DOCUMENTS. List what to gather and any power of attorney to file.

RULES
- Never treat the date received as the start of a statutory period. If the notice date is missing or unclear, say so first and treat the deadline as urgent.
- Do not state a penalty rate, interest rate or dollar threshold from memory; mark [VERIFY].
- If the deadline to petition the Tax Court or request a collection hearing is within 14 days or has passed, put that in the first line.
- Never advise ignoring a notice because the taxpayer disagrees with it.

OUTPUT FORMAT
Open with: what the notice is, the critical deadline as a calendar date, and the recommended first move. Then the deadline table (Deadline | Date | Statutory or practice | Consequence of missing), the rights map, exposure and the document list.`,
    example: {
      scenario:
        'A consultant forwards a letter dated six weeks ago proposing $48,000 of additional tax for unreported 1099 income, plus a newer letter titled "Notice of Deficiency".',
      result:
        'Identifies the second letter as a statutory notice of deficiency, calculates the Tax Court petition deadline from its date with about six weeks remaining, notes the earlier proposal is superseded, and recommends a petition with a list of the 1099 records to gather.',
    },
  },
  {
    id: 'us-tax-court-petition-planner',
    name: 'Tax Court Petition & Forum Planner',
    description: 'Chooses between Tax Court and a refund suit and prepares a timely petition after a notice of deficiency.',
    jurisdiction: 'us',
    category: 'tax',
    tags: ['drafting', 'tax-controversy', 'disputes', 'tax-court', 'forum-selection'],
    sources: [IRC, TAX_COURT, { citation: 'Federal court decisions on whether Tax Court filing deadlines are jurisdictional', authority: 'primary', jurisdiction: 'us', note: 'The Supreme Court held a collection due process deadline non-jurisdictional in 2022. Circuits are divided on the deficiency petition deadline, and the Tax Court treats it as jurisdictional outside circuits that have held otherwise. Check the circuit to which the case would be appealed.' }],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-irs-notice-triage', 'us-irs-appeals-protest-builder', 'us-refund-claim-builder'],
    whatItDoes:
      'Compares the three federal forums for an income tax dispute — the Tax Court without paying first, or a refund suit in a federal district court or the Court of Federal Claims after paying — on cost, precedent, jury availability, discovery, settlement through Appeals and the risk of new issues being raised. It then prepares a Tax Court petition that meets the court\'s content requirements, assesses whether small tax case procedure is available and wise, and builds the filing timeline from the notice date, including how the circuit of appeal affects whether a late filing could ever be excused.',
    whenToUse:
      'On receipt of a statutory notice of deficiency, when deciding whether to pay and sue for a refund instead, and before filing any petition. Use the notice triage skill first if it is not yet clear what the notice is.',
    inputs: [
      { name: 'Notice of deficiency', description: 'The full notice, with its date, periods, adjustments and any stated last day to petition.', required: true },
      { name: 'Taxpayer facts', description: 'Residence or principal place of business, ability to pay the deficiency, and the issues in dispute.', required: true },
      { name: 'Evidence', description: 'What records support the taxpayer\'s position, and what is missing.' },
      { name: 'Objectives', description: 'Settle quickly, test a legal issue, avoid publicity, or preserve a jury trial.' },
    ],
    outputs: [
      { name: 'Forum comparison', description: 'Tax Court against refund suit, on the factors that matter for this case.' },
      { name: 'Timeline', description: 'The petition deadline as a calendar date and the steps before it.' },
      { name: 'Small case assessment', description: 'Whether small tax case procedure is available and its trade-offs.' },
      { name: 'Draft petition', description: 'Assignments of error and supporting facts in the form the rules require.' },
      { name: 'Next steps', description: 'Filing method, fee, Appeals referral and evidence to gather.' },
    ],
    prompt: `You are a US tax litigator advising on forum and preparing a Tax Court petition.

INPUTS
- Notice of deficiency: <date, periods, adjustments by issue, penalties, any stated last day to petition>
- Taxpayer: <individual or entity; residence or principal place of business; whether the deficiency could be paid now>
- Issues: <what the taxpayer disputes and why>
- Evidence: <records that support the position; gaps>
- Objectives: <speed, precedent, privacy, jury trial, cost>

TASK
1. DEADLINE FIRST. Calculate the last day to petition from the notice date. State the longer period that applies to notices addressed to a person outside the United States if relevant [VERIFY]. Identify the circuit to which the case would be appealed and state whether that circuit treats the deadline as jurisdictional or subject to equitable tolling [VERIFY current circuit law]. Treat the deadline as unforgiving regardless.
2. FORUM COMPARISON. Compare the Tax Court (no prepayment; specialist judges; case usually referred to Appeals for settlement first) with a refund suit in district court (jury available; full payment generally required first) and in the Court of Federal Claims (no jury; nationwide). Cover precedent in each forum, discovery, the risk of the government raising new issues, cost, time to trial and publicity.
3. SMALL TAX CASE. Assess eligibility under the amount-in-dispute limit [VERIFY] and the trade-offs: informality and speed against no appeal and no precedential value.
4. PETITION. Draft the petition: the notice it responds to, the periods and amounts in dispute, clear and concise assignments of error for each adjustment and penalty, and the facts on which each assignment relies. Raise burden of proof points and any statute of limitations defence expressly — an affirmative defence not pleaded may be lost.
5. AFTER FILING. Note the filing fee and electronic filing route [VERIFY], the request for place of trial, and how to use the Appeals referral and the stipulation process.

RULES
- Never invent a filing fee, dollar limit or deadline length; mark [VERIFY] and point to the Tax Court website and the Code.
- Do not concede any adjustment in the petition by omission. If in doubt, assign error.
- Payment to stop interest can be made without giving up Tax Court jurisdiction if handled correctly; flag the point rather than stating the mechanics from memory [VERIFY].
- If the deadline has passed, say so first and identify the remaining routes (pay and claim a refund; audit reconsideration; collection hearing rights) instead of drafting a petition.

OUTPUT FORMAT
Open with the last day to petition as a calendar date and the recommended forum in one sentence. Then the forum comparison table, small case assessment, the draft petition, and next steps.`,
    example: {
      scenario:
        'A small S corporation\'s owner receives a notice of deficiency disallowing $120,000 of business expense deductions for two years and adding accuracy-related penalties; the owner cannot pay the tax now.',
      result:
        'A recommendation to petition the Tax Court, the deadline as a date, an assessment that the amount exceeds the small case limit for one year, and a draft petition assigning error to each disallowance and to the penalties, pleading reasonable cause and supervisory approval points.',
    },
  },
  {
    id: 'us-irs-appeals-protest-builder',
    name: 'IRS Appeals Protest Builder',
    description: 'Drafts a formal written protest to the IRS Independent Office of Appeals after a 30-day letter.',
    jurisdiction: 'us',
    category: 'tax',
    tags: ['drafting', 'tax-controversy', 'disputes', 'irs-appeals', 'settlement'],
    sources: [IRC, IRM, { citation: 'IRS publications on the examination appeal rights and how to prepare a protest', authority: 'guidance', publisher: 'Internal Revenue Service', jurisdiction: 'us', url: 'https://www.irs.gov', note: 'Sets out what a formal protest must contain, when a small case request is enough, and the hazards-of-litigation settlement standard Appeals applies.' }],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-irs-notice-triage', 'us-tax-court-petition-planner', 'us-penalty-abatement-request', 'global-tax-dispute-strategy'],
    whatItDoes:
      'Turns an examination report and the taxpayer\'s position into a formal protest that Appeals will actually engage with: the required statements, each disputed adjustment set out with the facts, the law and the argument, and the penalties addressed separately. It is written for the way Appeals settles — on the hazards of litigation — so it also gives a candid view of where the taxpayer is weak, the settlement range each issue could support, and which issues to concede to make the others more credible.',
    whenToUse:
      'After a 30-day letter or examination report proposing adjustments, before the protest deadline, and when deciding whether to go to Appeals at all rather than wait for a notice of deficiency. Also for preparing an Appeals conference after a docketed Tax Court case is referred.',
    inputs: [
      { name: 'Examination report', description: 'The 30-day letter, the report and the examiner\'s explanation of each adjustment.', required: true },
      { name: 'Taxpayer position', description: 'Why each adjustment is wrong, with supporting facts.', required: true },
      { name: 'Evidence', description: 'Records, contracts, valuations and correspondence with the examiner.' },
      { name: 'Statute dates', description: 'The assessment statute expiry date and any extensions signed.' },
    ],
    outputs: [
      { name: 'Formal protest', description: 'A complete protest with the required statements and declaration.' },
      { name: 'Issue analysis', description: 'Facts, law and argument for each adjustment, and the penalties separately.' },
      { name: 'Hazards assessment', description: 'A candid litigation-risk view and settlement range per issue.' },
      { name: 'Concession strategy', description: 'What to concede, trade or hold firm on.' },
      { name: 'Conference preparation', description: 'Questions Appeals is likely to ask and the answers.' },
    ],
    prompt: `You are a US tax controversy lawyer drafting a protest to the IRS Independent Office of Appeals.

INPUTS
- Examination report: <30-day letter, report, examiner's explanation of each adjustment, penalties proposed>
- Taxpayer position: <why each adjustment is wrong>
- Evidence: <records and correspondence>
- Statute: <assessment statute expiry date; extensions signed>

TASK
1. ROUTE CHECK. Confirm the protest deadline from the letter, whether the amount allows a small case request instead of a formal protest [VERIFY threshold], and how long remains on the assessment statute. Appeals may decline a case with too little time left; flag whether an extension request is likely and the choice between a restricted and an open-ended extension.
2. REQUIRED CONTENTS. Include everything the IRS requires of a formal protest: taxpayer identification, a statement that the taxpayer wants to appeal, a copy or reference to the letter, the periods, a list of the adjustments disputed, the facts supporting the position, the law relied on, and the declaration under penalties of perjury (and the representative's declaration where applicable) [VERIFY current wording].
3. ISSUES. For each disputed adjustment: the examiner's position fairly stated, the facts, the law, the argument, and the evidence relied on. Distinguish factual disputes, which turn on substantiation, from legal disputes.
4. PENALTIES. Address each penalty separately: whether it applies at all, reasonable cause and good faith, and procedural defences such as written supervisory approval of the initial determination [VERIFY current case law].
5. HAZARDS. For each issue, give a candid estimate of litigation risk with reasons, and the settlement range a hazards-based settlement could support.
6. STRATEGY. Recommend concessions, issues to trade, and issues to hold. Note any issue better litigated than settled.
7. CONFERENCE. List likely Appeals questions and prepared answers, and new evidence that should be shown to Exam first if Appeals would return it.

RULES
- The protest must be accurate; it is signed under penalties of perjury. Never assert a fact the evidence does not support.
- State the examiner's position fairly. A protest that misstates it loses credibility with Appeals.
- Never invent a case citation or ruling. Describe the principle and mark [VERIFY].
- Keep the hazards assessment and concession strategy out of the protest itself; they are internal.

OUTPUT FORMAT
Part A (to file): the formal protest. Part B (internal, privileged): hazards assessment table (Issue | Amount | Strength | Settlement range | Recommendation), concession strategy, and conference preparation.`,
    example: {
      scenario:
        'A partnership-owned restaurant group receives a 30-day letter disallowing cost segregation depreciation and treating owner draws as wages, with negligence penalties.',
      result:
        'A formal protest addressing each adjustment and penalty, an internal hazards table rating the depreciation issue strong and the wage reclassification weak, a recommendation to concede part of the wage issue to settle depreciation, and a statute extension note.',
    },
  },
  {
    id: 'us-penalty-abatement-request',
    name: 'Penalty Abatement Request',
    description: 'Tests first-time abatement and reasonable cause for IRS penalties and drafts the abatement request.',
    jurisdiction: 'us',
    category: 'tax',
    tags: ['drafting', 'tax-controversy', 'penalty-abatement', 'reasonable-cause', 'disputes'],
    sources: [IRC, IRM, { citation: 'IRS penalty relief guidance, including first-time abatement', authority: 'guidance', publisher: 'Internal Revenue Service', jurisdiction: 'us', url: 'https://www.irs.gov', note: 'Administrative first-time abatement and reasonable cause standards. The IRS has moved to applying first-time abatement automatically for some recent periods; check which periods and penalties it covers and confirm on the account transcript.' }],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-irs-notice-triage', 'us-irs-appeals-protest-builder', 'us-international-information-penalties', 'uk-hmrc-penalty-challenge'],
    whatItDoes:
      'Works out which penalties on an individual or business account can be removed and on what basis: administrative first-time abatement where the compliance history qualifies, reasonable cause where the facts show ordinary business care and prudence, statutory exceptions, and IRS error. It sequences the requests so the strongest ground is used first and first-time abatement is not wasted on a small penalty when a larger one is coming, checks whether relief has already been applied automatically, and drafts the request with the evidence that reasonable cause actually requires.',
    whenToUse:
      'When a notice assesses failure-to-file, failure-to-pay, failure-to-deposit or information return penalties, before paying a penalty you think is unfair, and after a denial when deciding whether to appeal it.',
    inputs: [
      { name: 'Penalty notices', description: 'Each penalty: type, period, amount, and the notice that assessed it.', required: true },
      { name: 'Compliance history', description: 'Filing, payment and penalty history for the prior years, ideally from account transcripts.', required: true },
      { name: 'What happened', description: 'Why the return or payment was late or wrong, with dates and documents.' },
      { name: 'Prior requests', description: 'Any earlier abatement requests and their outcome.' },
    ],
    outputs: [
      { name: 'Penalty inventory', description: 'Each penalty, its amount and the grounds available for relief.' },
      { name: 'Sequencing plan', description: 'Which ground to use for which penalty, and in what order.' },
      { name: 'Draft request', description: 'A letter or form narrative tying the facts to the standard.' },
      { name: 'Evidence list', description: 'Documents that prove the facts asserted.' },
      { name: 'Fallback', description: 'Appeal route if the request is denied.' },
    ],
    prompt: `You are a US tax practitioner seeking abatement of IRS penalties.

INPUTS
- Penalties: <type, period, amount and notice for each>
- History: <filing, payment and penalty history for prior periods, ideally from transcripts>
- Facts: <why the failure happened, with dates and documents>
- Prior requests: <earlier requests and outcomes>

TASK
1. INVENTORY. List each penalty, the statutory basis described in words, the amount, and whether interest on it is also at stake.
2. AUTOMATIC RELIEF CHECK. Check whether first-time abatement may already have been applied automatically for the period [VERIFY which periods and penalties the IRS now covers] and how to confirm it on the transcript.
3. FIRST-TIME ABATEMENT. Test eligibility against the administrative criteria: clean compliance history for the look-back period, all required returns filed, and tax paid or arranged [VERIFY current criteria]. Note which penalty types it covers and which it does not.
4. REASONABLE CAUSE. Test the facts against ordinary business care and prudence: what happened, when, why it prevented compliance, and what the taxpayer did to comply once able. Common grounds include serious illness, death, casualty, inability to obtain records, and reliance on written advice — and each has limits, such as the general rule that reliance on an agent to file does not excuse lateness [VERIFY].
5. SEQUENCE. Recommend which ground to use for which penalty. Where reasonable cause is strong, use it and keep first-time abatement for later, unless the penalty is small and reasonable cause weak.
6. DRAFT. Write the request — letter or form narrative — stating the penalty, the ground, the facts with dates, and the documents enclosed.
7. FALLBACK. If denied, the route to Appeals and the deadline [VERIFY].

RULES
- Never overstate facts. A reasonable cause narrative is a representation to the IRS.
- Do not state penalty rates or look-back periods from memory; mark [VERIFY].
- Keep accuracy-related and fraud penalties separate; first-time abatement does not apply to them and they need a different analysis.
- If the facts suggest wilful conduct, stop and recommend specialist advice before any submission.

OUTPUT FORMAT
Open with a table (Penalty | Period | Amount | Best ground | Strength). Then the sequencing plan, the draft request, the evidence list and the fallback.`,
    example: {
      scenario:
        'A dental practice incurred failure-to-deposit penalties for two payroll quarters while its office manager was on extended medical leave, and has a clean history otherwise.',
      result:
        'A recommendation to seek reasonable cause for the larger quarter with medical evidence and a timeline of corrective steps, and first-time abatement for the smaller quarter, with a draft letter and a transcript check for automatic relief.',
    },
  },
  {
    id: 'us-collection-alternatives-planner',
    name: 'IRS Collection Alternatives Planner',
    description: 'Protects collection hearing rights and compares installment agreements, offers in compromise and hardship status.',
    jurisdiction: 'us',
    category: 'tax',
    tags: ['assessment', 'tax-controversy', 'tax-collection', 'offer-in-compromise', 'disputes'],
    sources: [IRC, REGS, IRM, { citation: 'IRS collection financial standards and offer in compromise guidance', authority: 'guidance', publisher: 'Internal Revenue Service', jurisdiction: 'us', url: 'https://www.irs.gov', note: 'Allowable living expense standards and the reasonable collection potential calculation. Updated periodically.' }],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-irs-notice-triage', 'us-trust-fund-recovery-penalty', 'us-penalty-abatement-request'],
    whatItDoes:
      'For an individual or business with an assessed balance it cannot pay in full, it first protects the rights that expire — a collection due process hearing after a lien or levy notice — and then compares the realistic options: full pay, the streamlined and non-streamlined installment agreements, partial pay, currently-not-collectible status and an offer in compromise. It estimates reasonable collection potential from the financial information against the IRS allowable expense standards, flags compliance prerequisites, and recommends the option the numbers support rather than the one the taxpayer hopes for.',
    whenToUse:
      'On receipt of a final notice of intent to levy or a notice of federal tax lien filing, when a balance is too large to pay, and before filing an offer in compromise that the numbers may not support.',
    inputs: [
      { name: 'Balances', description: 'Each period, tax type and balance, from notices or transcripts.', required: true },
      { name: 'Collection notices', description: 'Any lien or levy notices, with dates.', required: true },
      { name: 'Financial information', description: 'Income, expenses, assets with equity, and household or business details.', required: true },
      { name: 'Compliance status', description: 'Whether all required returns are filed and current-year payments are being made.' },
    ],
    outputs: [
      { name: 'Hearing rights check', description: 'Whether a collection due process or equivalent hearing is available and by when.' },
      { name: 'Collection potential estimate', description: 'Reasonable collection potential with the working shown.' },
      { name: 'Options comparison', description: 'Each alternative with eligibility, cost and consequences.' },
      { name: 'Recommendation', description: 'The option the numbers support.' },
      { name: 'Filing checklist', description: 'Forms, documents and compliance steps for the chosen route.' },
    ],
    prompt: `You are a US tax resolution lawyer planning collection alternatives for a taxpayer with an unpaid assessed balance.

INPUTS
- Balances: <period, tax type and balance for each>
- Notices: <lien and levy notices with dates>
- Finances: <monthly income and expenses; assets with fair market value and loans; household size and location; for a business, receivables and equipment>
- Compliance: <returns filed; current estimated tax or deposits being made>

TASK
1. PROTECT HEARING RIGHTS. From each lien or levy notice, calculate the deadline to request a collection due process hearing (a timely request suspends levy and preserves Tax Court review) and the later window for an equivalent hearing [VERIFY]. If a deadline is close, put it first.
2. COMPLIANCE GATE. Most alternatives require all returns to be filed and current-year obligations paid. Identify gaps.
3. COLLECTION POTENTIAL. Estimate monthly disposable income using the IRS allowable expense standards for the household size and location [VERIFY current tables], and net realisable equity in assets. Show the working. Calculate reasonable collection potential for an offer [VERIFY formula].
4. OPTIONS. Compare: full pay (including borrowing); streamlined installment agreement [VERIFY balance limits]; non-streamlined agreement with financial disclosure; partial pay agreement; currently-not-collectible status; offer in compromise (doubt as to collectibility, doubt as to liability, effective tax administration). For each: eligibility, monthly cost, effect on liens, effect on the collection statute, and fees.
5. RECOMMEND. Choose the option the numbers support. If an offer is unlikely to be accepted because collection potential exceeds the balance, say so plainly.
6. CHECKLIST. Forms, documents, and steps — including whether to raise the alternative inside a collection due process hearing.

RULES
- Never recommend an offer in compromise the numbers do not support; a rejected offer costs time and fees.
- Do not state expense standards, fees or balance limits from memory; mark [VERIFY].
- Note that pending offers and installment requests can suspend the collection statute, extending how long the IRS can collect [VERIFY].
- For trust fund taxes owed by a business, flag personal exposure of responsible persons and route to the trust fund recovery penalty skill.

OUTPUT FORMAT
Open with any hearing deadline and the recommended option in one line. Then the collection potential calculation, the options table (Option | Eligible? | Monthly cost | Liens | Statute effect | Notes), and the filing checklist.`,
    example: {
      scenario:
        'A self-employed contractor owes $85,000 across three years, has received a final notice of intent to levy dated last week, has no home equity and modest monthly surplus.',
      result:
        'A collection due process deadline as a date, a reasonable collection potential calculation below the balance, a comparison favouring an offer in compromise raised within the hearing, and a checklist including the missing current-year estimated payments.',
    },
  },
  {
    id: 'us-trust-fund-recovery-penalty',
    name: 'Trust Fund Recovery Penalty Defense',
    description: 'Assesses personal liability for a business\'s unpaid payroll taxes and prepares the responsible-person defense.',
    jurisdiction: 'us',
    category: 'tax',
    tags: ['assessment', 'tax-controversy', 'payroll-tax', 'personal-liability', 'disputes'],
    sources: [IRC, IRM, { citation: 'Federal court decisions on responsibility and willfulness for the trust fund recovery penalty', authority: 'primary', jurisdiction: 'us', note: 'Responsibility and willfulness are fact-intensive and the case law varies by circuit. Verify the governing circuit\'s tests.' }],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['professional-services', 'retail-consumer'],
    relatedSkills: ['us-collection-alternatives-planner', 'us-irs-appeals-protest-builder', 'us-irs-notice-triage'],
    whatItDoes:
      'When a business has failed to pay over withheld payroll taxes, the IRS can hold individuals personally liable for the trust fund portion. This skill tests each person\'s exposure against the two elements — responsibility (status, duty and authority over which creditors were paid) and willfulness (knowledge and a choice to pay others) — using the evidence that decides these cases, such as signature authority, bank records and who decided payments. It prepares for the interview the IRS conducts, drafts the response to a proposed assessment, and covers allocation of voluntary payments to trust fund amounts.',
    whenToUse:
      'When a business falls behind on payroll deposits, when an officer or bookkeeper is asked to attend an IRS interview about responsibility, on receipt of a letter proposing the penalty, and when a business in difficulty is deciding which creditors to pay.',
    inputs: [
      { name: 'Payroll tax delinquency', description: 'Periods, amounts and the trust fund portion, from notices or transcripts.', required: true },
      { name: 'People and roles', description: 'Each officer, owner, bookkeeper or lender involved, with title, duties and authority.', required: true },
      { name: 'Evidence', description: 'Bank signature cards, cheques signed, payment approvals, emails about which bills to pay.' },
      { name: 'Proposed assessment', description: 'Any letter proposing the penalty, with its date.' },
    ],
    outputs: [
      { name: 'Exposure by person', description: 'Responsibility and willfulness assessed for each individual.' },
      { name: 'Interview preparation', description: 'Topics, likely questions and documents for the IRS interview.' },
      { name: 'Protest draft', description: 'Response to a proposed assessment, with the appeal deadline.' },
      { name: 'Payment designation advice', description: 'How voluntary payments can be directed to trust fund amounts.' },
      { name: 'Going-forward controls', description: 'Steps to stop the exposure growing.' },
    ],
    prompt: `You are a US tax controversy lawyer assessing trust fund recovery penalty exposure for individuals connected to a business.

INPUTS
- Delinquency: <periods, amounts, trust fund portion (withheld income tax and the employee share of employment taxes)>
- People: <each individual: title, ownership, duties, signature authority, who decided which bills were paid>
- Evidence: <bank signature cards, cheques signed, payment approvals, emails, board minutes>
- Proposed assessment: <letter and date, if received>

TASK
1. AMOUNT. Separate the trust fund portion from the employer's own share, penalties and interest. Only the trust fund portion is at stake personally.
2. RESPONSIBILITY. For each person, assess status, duty and authority to decide which creditors are paid. Titles alone do not decide it; actual control does. Note the evidence pointing each way.
3. WILLFULNESS. For each person, assess knowledge that taxes were unpaid and any decision to pay other creditors after acquiring that knowledge, including reckless disregard [VERIFY circuit standard].
4. INTERVIEW. Prepare for the IRS interview on responsibility: topics, likely questions, documents to bring, and whether the individual should attend with a representative.
5. PROPOSED ASSESSMENT. If a letter proposing the penalty has been received, calculate the deadline to protest to Appeals [VERIFY], draft the protest, and note the limitations period for assessment.
6. PAYMENTS. Explain designation of voluntary payments by the business to the trust fund portion, and contribution rights between responsible persons [VERIFY].
7. CONTROLS. If the business is still operating, the steps to stop new liability accruing — paying current deposits before other creditors.

RULES
- Each person may need separate counsel; flag conflicts of interest between officers.
- Never advise a person to understate their role at the interview; statements are made to a federal agency.
- Do not state penalty amounts or deadlines from memory; mark [VERIFY].
- If records suggest funds were diverted, flag possible criminal exposure and recommend specialist counsel before any interview.

OUTPUT FORMAT
Open with a table (Person | Responsibility | Willfulness | Overall exposure | Key evidence). Then the amount analysis, interview preparation, protest draft if needed, payment designation and controls.`,
    example: {
      scenario:
        'A restaurant group missed four quarters of payroll deposits; the CEO, the CFO and an outside bookkeeper with online banking access are all being asked to attend IRS interviews.',
      result:
        'An exposure table rating the CFO high (approved vendor payments after the shortfall emails), the CEO medium, and the bookkeeper low (no authority to choose creditors), with interview preparation for each and a conflict warning about joint representation.',
    },
  },
  {
    id: 'us-bba-partnership-audit-navigator',
    name: 'BBA Partnership Audit Navigator',
    description: 'Navigates a centralized partnership audit: representative, imputed underpayment, modification and push-out.',
    jurisdiction: 'us',
    category: 'tax',
    tags: ['assessment', 'tax-controversy', 'partnership-audit', 'corporate-transactions', 'disputes'],
    sources: [IRC, REGS, IRM],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'professional-services'],
    relatedSkills: ['us-irs-appeals-protest-builder', 'us-tax-court-petition-planner', 'global-due-diligence-review'],
    whatItDoes:
      'Guides a partnership, its partnership representative and its partners through an audit under the centralized partnership audit regime, where tax is generally assessed and collected at the partnership level. It identifies who binds the partnership and how the designated individual is appointed, maps the stages from notice of administrative proceeding to final partnership adjustment, models the imputed underpayment and the modifications that can reduce it, compares paying at the partnership level with pushing adjustments out to reviewed-year partners, and flags the partnership agreement terms that decide who bears the cost.',
    whenToUse:
      'On receipt of a notice of administrative proceeding or proposed partnership adjustment, when appointing or replacing a partnership representative, when negotiating partnership agreement tax provisions, and in M&A diligence on a target partnership with open years.',
    inputs: [
      { name: 'Partnership facts', description: 'Entity, years under audit, whether it elected out, and the partnership representative and designated individual.', required: true },
      { name: 'IRS notices', description: 'Notice of administrative proceeding, proposed or final adjustment, with dates.', required: true },
      { name: 'Adjustments', description: 'Proposed adjustments by item and amount.' },
      { name: 'Partners', description: 'Reviewed-year and adjustment-year partners, their types and tax profiles.' },
      { name: 'Partnership agreement', description: 'Tax matters provisions, indemnities and representative duties.' },
    ],
    outputs: [
      { name: 'Regime and authority check', description: 'Whether the regime applies and who binds the partnership.' },
      { name: 'Stage timeline', description: 'Each procedural stage with its deadline.' },
      { name: 'Imputed underpayment model', description: 'The calculation and the modifications that could reduce it.' },
      { name: 'Pay or push-out analysis', description: 'Comparison of paying at entity level and pushing out to partners.' },
      { name: 'Agreement and partner issues', description: 'Cost allocation, indemnities and departed-partner exposure.' },
    ],
    prompt: `You are a US partnership tax controversy lawyer advising on an audit under the centralized partnership audit regime.

INPUTS
- Partnership: <entity, years under audit, whether it elected out of the regime for those years, partnership representative and designated individual>
- Notices: <notice of administrative proceeding, notice of proposed partnership adjustment, final adjustment — with dates>
- Adjustments: <items and amounts>
- Partners: <reviewed-year and current partners; individuals, corporations, tax-exempt, foreign, pass-throughs>
- Agreement: <tax matters provisions, representative duties, indemnities, clawbacks>

TASK
1. REGIME AND AUTHORITY. Confirm the regime applies (and that any election out was valid). Identify the partnership representative and, for an entity representative, the designated individual. Explain that the representative has sole authority to act and binds the partnership and all partners, and how resignation or revocation works [VERIFY].
2. TIMELINE. Map the stages and deadlines: notice of administrative proceeding, notice of proposed partnership adjustment, the window to request modification [VERIFY length], final partnership adjustment, the push-out election deadline, and the period to petition for judicial review [VERIFY].
3. IMPUTED UNDERPAYMENT. Explain how it is computed (netting and grouping of adjustments, generally at the highest rate) and model it from the adjustments.
4. MODIFICATION. Assess each modification route: amended returns or the alternative procedure by reviewed-year partners, tax-exempt partners, rate modifications for corporate or capital gain items, and others [VERIFY]. Estimate the reduction and the burden of each.
5. PAY OR PUSH OUT. Compare paying at partnership level (economic burden on current partners) with the push-out election (reviewed-year partners take the adjustments, at a higher interest rate) [VERIFY]. Consider departed partners and tiered structures.
6. AGREEMENT AND ALLOCATION. Review who bears the cost under the partnership agreement, representative duties and consent rights, and indemnity or clawback provisions; recommend drafting changes for future years.
7. DEFENCE. Note the substantive defence of the adjustments themselves and the forums for judicial review.

RULES
- Mark every deadline and rate [VERIFY]; the regime's periods are short and unforgiving.
- Never assume the partnership representative is acting in a particular partner's interest; flag conflicts.
- Distinguish partnership-related items from partner-level items.
- For a target in a transaction, flag open years and the buyer's exposure to an entity-level imputed underpayment.

OUTPUT FORMAT
Open with the next deadline as a date and the recommended path (contest, modify, pay, push out). Then the timeline table, the imputed underpayment model, the modification assessment, the pay-or-push-out comparison, and agreement issues.`,
    example: {
      scenario:
        'A real estate fund partnership receives a notice of proposed partnership adjustment of $6 million for a year in which a third of its partners have since redeemed, including a pension fund.',
      result:
        'A timeline with the modification deadline, an imputed underpayment model reduced by the tax-exempt partner modification, a comparison favouring push-out because departed partners would otherwise leave current investors bearing the cost, and agreement amendments for future years.',
    },
  },
  {
    id: 'us-refund-claim-builder',
    name: 'Tax Refund Claim & Suit Builder',
    description: 'Checks refund limitations periods, drafts a protective or full claim, and plans a refund suit.',
    jurisdiction: 'us',
    category: 'tax',
    tags: ['drafting', 'tax-controversy', 'refund-claims', 'statute-of-limitations', 'disputes'],
    sources: [IRC, REGS, IRM, { citation: 'Federal court decisions on refund claims, including the variance doctrine and full payment', authority: 'primary', jurisdiction: 'us', note: 'A refund suit is generally limited to grounds raised in the administrative claim, and generally requires full payment of the assessment. Verify current authority.' }],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-tax-court-petition-planner', 'us-irs-notice-triage', 'us-irs-appeals-protest-builder'],
    whatItDoes:
      'For an individual or corporation that has overpaid — or has paid a disputed assessment so it can sue — it works out whether a claim is still timely under both limitations periods and the look-back rules that cap the amount recoverable, and whether a protective claim is needed to preserve rights pending litigation or legislation. It drafts the claim with every ground and the facts behind it stated specifically, because a later refund suit is generally limited to what the claim said, then plans the suit: when it can be filed, in which court, and how long remains.',
    whenToUse:
      'When a taxpayer discovers an overpayment or a missed deduction or credit, when paying a disputed assessment to sue in district court or the Court of Federal Claims, when a court decision elsewhere may benefit the taxpayer, and after a claim is disallowed.',
    inputs: [
      { name: 'Return and payment history', description: 'Return filing dates, payment dates and amounts for the period, ideally from transcripts.', required: true },
      { name: 'Grounds', description: 'Why the tax was overpaid, with the facts and documents.', required: true },
      { name: 'Taxpayer', description: 'Individual or entity, and the return form used.' },
      { name: 'IRS action', description: 'Any notice of claim disallowance, with its date.' },
    ],
    outputs: [
      { name: 'Timeliness analysis', description: 'Both limitations periods and the look-back cap, with dates.' },
      { name: 'Claim strategy', description: 'Full, informal or protective claim, and the form to use.' },
      { name: 'Draft claim', description: 'Every ground stated with supporting facts, to avoid variance problems.' },
      { name: 'Suit plan', description: 'When and where a refund suit can be filed, and the deadline.' },
      { name: 'Risks', description: 'Offsets, new issues and interest considerations.' },
    ],
    prompt: `You are a US tax lawyer preparing a refund claim and, if needed, a refund suit.

INPUTS
- History: <return filing date, payments with dates and amounts, assessments, credits applied>
- Grounds: <why the tax was overpaid; facts; documents>
- Taxpayer: <individual or entity; return form>
- IRS action: <notice of claim disallowance and date, if any>

TASK
1. TIMELINESS. Apply both limitations periods for filing a claim — measured from the return filing date and from the payment date — and the look-back rule that caps the refundable amount to tax paid within the applicable window [VERIFY periods and special rules, for example for bad debts, worthless securities, foreign tax credits and net operating loss carrybacks]. Show the dates. If late, say so first.
2. CLAIM TYPE. Recommend a full claim, a protective claim (to preserve rights pending a contingency), or reliance on an informal claim (only as a fallback). Identify the right form for the tax and taxpayer type [VERIFY].
3. DRAFT. State every ground for the refund and the facts supporting each, with sufficient particularity to tell the IRS what is claimed and why. Include alternative grounds. Include the amount and the computation.
4. FULL PAYMENT. If the claim concerns an assessment the taxpayer intends to litigate, address the full payment requirement for a refund suit and divisible tax exceptions [VERIFY].
5. SUIT. Explain when suit may be filed (after disallowance or after the IRS fails to act within the waiting period), the deadline after a notice of disallowance [VERIFY], the choice between district court and the Court of Federal Claims, and the risk that the government asserts offsets.
6. RISKS. Note that a claim reopens scrutiny of the year, and interest on overpayments.

RULES
- Every ground must be in the claim. A ground omitted from the claim may be barred in later litigation.
- The claim is signed under penalties of perjury; never assert a fact the evidence does not support.
- Do not state limitations periods or special-period lengths from memory; mark [VERIFY].
- Keep the protective claim specific enough to identify the contingency and the periods.

OUTPUT FORMAT
Open with whether a claim is still timely and the last date to file. Then the timeliness table (Period | Return filed | Payments | Deadline | Look-back cap), the claim strategy, the draft claim, the suit plan and risks.`,
    example: {
      scenario:
        'A manufacturer realises it omitted a research credit for a tax year whose return was filed on extension, and separately paid a disputed penalty it wants to litigate.',
      result:
        'A timeliness table showing the credit claim open for five more months, a draft amended-return claim stating each qualified research activity, and a refund suit plan for the penalty with the full payment and waiting-period steps.',
    },
  },
  {
    id: 'us-state-residency-audit-defense',
    name: 'State Residency Audit Defense',
    description: 'Defends a state income tax residency or domicile audit with a day count and a change-of-domicile case.',
    jurisdiction: 'us',
    category: 'tax',
    tags: ['assessment', 'tax-controversy', 'state-tax', 'residency', 'disputes'],
    sources: [{ citation: 'State income tax statutes and regulations on residency and domicile', authority: 'primary', jurisdiction: 'us', note: 'Each state defines resident, domiciliary and statutory resident differently, and some apply a day-count test combined with maintaining a permanent place of abode. Check the specific state.' }, { citation: 'State tax department residency audit guidelines', authority: 'guidance', jurisdiction: 'us', note: 'Several states publish audit guidelines describing the factors auditors weigh. Non-binding but persuasive in practice.' }],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-fifty-state-survey', 'global-treaty-residence-tiebreaker', 'us-irs-notice-triage'],
    whatItDoes:
      'For an individual who moved out of a high-tax state, or who spends time in more than one, it separates the two questions a state residency audit usually asks — domicile (where the true, fixed home is) and statutory residency (days in the state plus a place to live there) — and builds the evidence for each. It reconstructs a defensible day count from objective records, weighs the domicile factors auditors use (home, active business ties, time, items near and dear, family), identifies the weak spots before the auditor does, and drafts the response to the information request.',
    whenToUse:
      'On receipt of a residency questionnaire or audit letter, before filing a part-year or non-resident return after a move, and when planning a move out of a state to make it stick.',
    inputs: [
      { name: 'States and years', description: 'The state auditing, the years, and the state the taxpayer says they moved to.', required: true },
      { name: 'Homes', description: 'Every residence owned or rented in each state, with dates and use.', required: true },
      { name: 'Day records', description: 'Calendars, phone location data, card statements, travel records, toll and badge records.' },
      { name: 'Ties', description: 'Business interests, employment, family, club memberships, doctors, voting, licences, and where valued possessions are kept.' },
      { name: 'Audit correspondence', description: 'The questionnaire or information document request.' },
    ],
    outputs: [
      { name: 'Test map', description: 'The state\'s domicile and statutory residency tests and how each applies.' },
      { name: 'Day count', description: 'A reconstructed calendar with sources for each day.' },
      { name: 'Domicile factor analysis', description: 'Each factor weighed, strengths and weak spots.' },
      { name: 'Response draft', description: 'A response to the information request with the evidence index.' },
      { name: 'Exposure estimate', description: 'Tax, interest and penalties at risk for each year.' },
    ],
    prompt: `You are a US state and local tax lawyer defending an individual in a state residency audit.

INPUTS
- States and years: <auditing state, years, claimed new state of domicile and move date>
- Homes: <every residence in each state: owned or rented, dates, who lived there, how often used>
- Day records: <calendars, phone location history, card and bank statements, travel bookings, toll, building access and badge records>
- Ties: <business and employment, family, schools, doctors, voting, driver's licence, clubs, where items of sentimental value are kept>
- Audit: <questionnaire or information request and date>

TASK
1. TESTS. State the auditing state's tests: domicile, and any statutory residency rule combining a day threshold with maintaining a permanent place of abode [VERIFY the state's day threshold, the definition of a day, and abode rules]. Note who bears the burden of proof and the standard (domicile change often requires clear and convincing evidence) [VERIFY].
2. STATUTORY RESIDENCY. Assess whether a permanent place of abode existed in the state each year, then reconstruct the day count from objective records. Classify every day: in-state, out-of-state, travel, and unknown. Treat unknown days as the auditor will [VERIFY state rule].
3. DOMICILE. Weigh the factors: home (size, value, use), active business involvement, time spent, items near and dear, and family. Show which way each points and the evidence.
4. WEAK SPOTS. Identify what the auditor will focus on — a retained larger home, continued business management from the old state, children's schools, medical care — and how to address each honestly.
5. RESPONSE. Draft the response to the information request, organised by factor, with an evidence index. Produce what is requested; do not volunteer analysis that is not asked for.
6. EXPOSURE. Estimate tax, interest and penalties at risk by year, and the settlement posture.
7. GOING FORWARD. Actions that strengthen the change of domicile for open and future years.

RULES
- Never fabricate or adjust day records. A reconstructed calendar must cite its source for every day.
- Do not state a state's day threshold or abode rule from memory; mark [VERIFY].
- Keep domicile and statutory residency analysis separate; a taxpayer can win one and lose the other.
- If the person may be resident in two states at once, flag credit-for-taxes-paid limits and double taxation risk.

OUTPUT FORMAT
Open with the likely outcome on each test and the years most at risk. Then the test map, the day count summary (State | In-state days | Out-of-state | Unknown | Source quality), the domicile factor table, weak spots, the response draft and exposure.`,
    example: {
      scenario:
        'An executive moved to Florida, kept a smaller apartment in New York, and still attends some board meetings there; the New York tax department has sent a residency questionnaire for two years.',
      result:
        'A test map separating domicile from statutory residency, a day count from phone and card records showing one year near the threshold with 19 unknown days, a domicile analysis flagging the retained apartment and board role, and a draft response with an evidence index.',
    },
  },
  {
    id: 'us-international-information-penalties',
    name: 'International Information Return Penalties',
    description: 'Assesses FBAR and foreign information return penalties and picks the right remediation or defense path.',
    jurisdiction: 'us',
    category: 'tax',
    tags: ['assessment', 'tax-controversy', 'fbar', 'international-tax', 'disputes'],
    sources: [IRC, { citation: 'Bank Secrecy Act foreign account reporting requirements (FBAR)', authority: 'primary', publisher: 'Financial Crimes Enforcement Network', jurisdiction: 'us', url: 'https://www.fincen.gov', note: 'Annual reporting of foreign financial accounts. The Supreme Court held in 2023 that the non-willful penalty applies per report, not per account. Penalty maximums are inflation-adjusted; check the amount in effect when assessed.' }, IRM, { citation: 'IRS streamlined filing compliance procedures, delinquent submission procedures and voluntary disclosure practice', authority: 'guidance', publisher: 'Internal Revenue Service', jurisdiction: 'us', url: 'https://www.irs.gov', note: 'Administrative remediation routes with different eligibility, certifications and penalty outcomes. Terms change; check the current versions.' }],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services'],
    relatedSkills: ['us-penalty-abatement-request', 'global-treaty-residence-tiebreaker', 'uk-hmrc-disclosure-route-selector'],
    whatItDoes:
      'For individuals and businesses that missed foreign reporting — FBARs, and information returns for foreign corporations, partnerships, trusts, gifts and specified assets — it maps every missed filing and the penalty regime behind each, separates non-willful from willful exposure (the line that decides everything), and compares the remediation routes: delinquent submissions with reasonable cause, the streamlined procedures, and voluntary disclosure where criminal exposure exists. For penalties already assessed, it prepares the reasonable cause and legal defences, including disputes over whether certain information return penalties can be assessed rather than sued for.',
    whenToUse:
      'When a US person discovers unreported foreign accounts or entities, when a foreign bank or adviser raises US reporting, on receipt of a penalty notice for a foreign information return, and before choosing a disclosure route.',
    inputs: [
      { name: 'Foreign assets', description: 'Accounts, entities, trusts, gifts and other assets by year, with maximum values.', required: true },
      { name: 'Filing history', description: 'Which US returns and foreign reports were filed, and whether foreign income was reported.', required: true },
      { name: 'State of mind', description: 'Why filings were missed: awareness, advice received, and any concealment.', required: true },
      { name: 'IRS contact', description: 'Any examination, letter or penalty notice already received.' },
    ],
    outputs: [
      { name: 'Missed filings map', description: 'Each missed report or return by year, with the penalty regime.' },
      { name: 'Willfulness assessment', description: 'Evidence pointing toward and away from willfulness.' },
      { name: 'Route comparison', description: 'Eligibility, cost and risk of each remediation route.' },
      { name: 'Penalty defence', description: 'Reasonable cause and legal defences to assessed penalties.' },
      { name: 'Action plan', description: 'Filings, certifications and sequence.' },
    ],
    prompt: `You are a US international tax controversy lawyer advising on missed foreign reporting.

INPUTS
- Foreign assets: <accounts, entities, trusts, gifts, other assets; countries; maximum values by year>
- Filing history: <US returns filed; foreign reports filed; whether foreign income was reported>
- State of mind: <knowledge of the requirements, advice received, any steps that look like concealment>
- IRS contact: <examination, letters, penalty notices>

TASK
1. MAP. For each year, list every report or information return that should have been filed: FBAR, and forms for specified foreign financial assets, foreign corporations, partnerships, disregarded entities, trusts and large foreign gifts [VERIFY thresholds and filer categories]. Note whether the related income was reported.
2. PENALTY REGIMES. Describe each regime in words: non-willful FBAR (per report after the 2023 Supreme Court decision), willful FBAR, and the information return penalties with any continuation penalties [VERIFY current amounts and inflation adjustments]. Note the separate limitations periods and that an unfiled information return can keep the whole return open [VERIFY].
3. WILLFULNESS. Weigh evidence for and against willfulness, including wilful blindness and recklessness standards [VERIFY circuit law]. This decides the route.
4. ROUTES. Compare: delinquent submissions with reasonable cause statements (no unreported income; no IRS contact); the streamlined procedures (non-willful; certification under penalties of perjury; domestic and foreign variants with different outcomes) [VERIFY]; and the criminal investigation voluntary disclosure practice where exposure is wilful. Explain that eligibility ends once the IRS has initiated contact or an examination.
5. ASSESSED PENALTIES. For assessed penalties: reasonable cause; whether the penalty can lawfully be assessed and collected administratively or must be pursued through a suit, which courts have decided differently for some information return penalties [VERIFY current law]; and statute of limitations defences.
6. PLAN. The sequence of filings and certifications, and who must sign.

RULES
- Never recommend a non-willful certification if the facts point to willfulness; a false certification creates new criminal exposure.
- If facts suggest wilful concealment, say so in the first line and recommend criminal tax counsel before any filing or contact with the IRS.
- Do not state penalty amounts or thresholds from memory; mark [VERIFY].
- Treat foreign entities' own local obligations as outside scope unless asked.

OUTPUT FORMAT
Open with the willfulness risk rating and the recommended route. Then the missed filings table (Year | Filing | Threshold met? | Income reported? | Regime), the route comparison, penalty defences, and the action plan.`,
    example: {
      scenario:
        'A US citizen living in Germany for eight years never filed FBARs or foreign asset forms but reported all wages on US returns, and only learned of the rules from a new bank.',
      result:
        'A missed-filings map across six years, a low willfulness rating with the evidence, a recommendation for the streamlined foreign procedures with the certification narrative outline, and a note that no information return penalties apply under that route if eligible.',
    },
  },
];
