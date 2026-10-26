import type { Skill, SkillSource } from '../../../types/skill';

/**
 * UK tax disputes — HMRC enquiries, appeals, penalties, disclosure and
 * settlement, for individuals and companies.
 *
 * The UK penalty regime is mid-reform: a points-based late submission regime
 * and new late payment penalties apply to Making Tax Digital for income tax
 * from April 2026, alongside the older regimes for other taxes and periods.
 * Prompts therefore ask which regime applies before applying any rule.
 */

const TMA: SkillSource = { citation: 'Taxes Management Act 1970', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Enquiries into returns, closure notices, discovery assessments, appeals, statutory review and time limits for direct taxes.' };
const FA08: SkillSource = { citation: 'Finance Act 2008 (HMRC information and inspection powers; penalties for failure to notify)', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Information notices, inspection powers, and the extended time limits for assessments in cases of carelessness and deliberate behaviour.' };
const FA07: SkillSource = { citation: 'Finance Act 2007 (penalties for errors in documents)', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Inaccuracy penalties graded by behaviour (careless, deliberate, deliberate and concealed), with reductions for the quality of disclosure and special reduction.' };
const HMRC_MANUALS: SkillSource = { citation: 'HMRC internal manuals (including the Compliance Handbook and Enquiry Manual)', authority: 'guidance', publisher: 'HM Revenue & Customs', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'How HMRC officers apply the law. Not binding on the tribunal, but often decisive in practice. Check the current version.' };
const FTT: SkillSource = { citation: 'Tribunal Procedure (First-tier Tribunal) (Tax Chamber) Rules', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Notice of appeal, case categorisation, directions, costs and hearings in the First-tier Tribunal (Tax Chamber).' };

export const ukTaxSkills: Skill[] = [
  {
    id: 'uk-hmrc-enquiry-response',
    name: 'HMRC Enquiry & Information Notice Response',
    description: 'Manages an HMRC enquiry or compliance check, tests information notices, and plans the response.',
    jurisdiction: 'uk',
    category: 'tax',
    tags: ['review', 'tax-controversy', 'hmrc-enquiry', 'information-notices', 'disputes'],
    sources: [TMA, FA08, HMRC_MANUALS],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-hmrc-tax-appeal-planner', 'uk-hmrc-penalty-challenge', 'uk-hmrc-adr-settlement'],
    whatItDoes:
      'For an individual or company under an HMRC compliance check, it works out what HMRC is doing and under which power — an enquiry into a return, a discovery assessment, or a check before any return — and whether HMRC is in time. It tests each information request: whether it is an informal request or a formal information notice, whether the documents are reasonably required and in the taxpayer\'s possession or power, and what protections apply. It plans what to provide, in what form, and how to keep the enquiry focused, while recording behaviour points that will matter for any penalty later.',
    whenToUse:
      'On receipt of an enquiry opening letter, an informal information request, a formal information notice or an inspection request, and when an enquiry has drifted and the taxpayer wants it closed.',
    inputs: [
      { name: 'HMRC correspondence', description: 'Opening letter, information requests or notices, with dates.', required: true },
      { name: 'Return and period', description: 'The return or tax in question, when it was filed, and any amendments.', required: true },
      { name: 'Taxpayer', description: 'Individual, partnership or company; adviser involvement.' },
      { name: 'Records', description: 'What exists, where it is held, and anything sensitive or privileged.' },
    ],
    outputs: [
      { name: 'Power and time-limit check', description: 'The power HMRC is using and whether it is in time.' },
      { name: 'Request analysis', description: 'Each request tested for scope, reasonableness and protections.' },
      { name: 'Response plan', description: 'What to provide, when, and in what form, with a covering letter.' },
      { name: 'Penalty-position log', description: 'Behaviour and disclosure points to protect from the start.' },
      { name: 'Closure strategy', description: 'How to bring the enquiry to a close, including a tribunal closure application.' },
    ],
    prompt: `You are a UK tax disputes adviser managing an HMRC compliance check.

INPUTS
- Correspondence: <opening letter, requests, any formal information notice, with dates>
- Return: <tax, period, date filed, amendments>
- Taxpayer: <individual / partnership / company; adviser>
- Records: <what exists, where, anything privileged or relating to third parties>

TASK
1. POWER. Identify the power used: an enquiry into a return (and whether the notice of enquiry was given within the enquiry window [VERIFY]), a discovery assessment, or a check under information powers before a return is due. If HMRC may be out of time, say so first.
2. TIME LIMITS FOR ASSESSMENT. Note the ordinary time limit and the extended limits for careless and deliberate behaviour [VERIFY], and what HMRC would have to show to use them.
3. REQUESTS. For each request: informal or formal notice; whether the information is reasonably required to check the tax position; whether it is in the taxpayer's possession or power; exclusions (for example legally privileged material, certain auditor and adviser material, and older documents) [VERIFY]; and the right to appeal a formal notice and the deadline [VERIFY].
4. RESPONSE PLAN. What to provide, in what form, by when, and what to resist or narrow, with a draft covering letter. Keep explanations accurate and do not volunteer unrelated speculation.
5. PENALTY POSITION. From the outset, log the facts that will decide behaviour (careless or not, deliberate or not) and the quality of disclosure (telling, helping, giving access), since these determine any penalty and its reductions.
6. CLOSURE. Plan how to reach a closure notice: agreement, partial closure, or an application to the tribunal for a direction that HMRC close the enquiry where it has no reasonable grounds to continue [VERIFY].

RULES
- Never advise destroying, altering or withholding documents that are required by a valid notice. Obstruction carries its own penalties and can turn a civil enquiry criminal.
- Do not state time limits or penalty percentages from memory; mark [VERIFY].
- If HMRC's letter references Code of Practice 9 or criminal investigation, stop and say specialist advice is needed before any response.
- Distinguish the taxpayer's statements of fact from the adviser's technical arguments.

OUTPUT FORMAT
Open with: the power used, whether HMRC is in time, and the next deadline as a date. Then the request analysis table (Request | Formal? | Reasonably required? | Possession or power? | Protections | Action), the response plan with covering letter, the penalty-position log and the closure strategy.`,
    example: {
      scenario:
        'A landlord with six properties receives an enquiry letter into a self assessment return and, three months later, a formal information notice asking for ten years of bank statements.',
      result:
        'Confirms the enquiry was opened in time, identifies the notice as reaching beyond the enquiry period and arguably not reasonably required, drafts a response providing the relevant year\'s records with an offer to discuss scope, and notes the appeal deadline.',
    },
  },
  {
    id: 'uk-hmrc-tax-appeal-planner',
    name: 'Tax Appeal & Tribunal Route Planner',
    description: 'Plans an appeal against an HMRC decision: statutory review, tribunal notice, hardship and late appeals.',
    jurisdiction: 'uk',
    category: 'tax',
    tags: ['drafting', 'tax-controversy', 'disputes', 'tax-tribunal', 'appeals'],
    sources: [TMA, FTT, { citation: 'Value Added Tax Act 1994 (appeals)', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'For indirect taxes, an appeal may generally proceed only if the tax is paid or deposited, unless hardship is accepted.' }, { citation: 'Tribunal decisions on permission to appeal late', authority: 'primary', jurisdiction: 'uk', note: 'The tribunal applies a three-stage approach to late appeals considering the length of and reasons for the delay and all the circumstances. Verify current authority.' }],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-hmrc-enquiry-response', 'uk-hmrc-penalty-challenge', 'uk-hmrc-adr-settlement', 'global-tax-dispute-strategy'],
    whatItDoes:
      'Maps the routes after an appealable HMRC decision — a closure notice, assessment, penalty or other decision — for direct and indirect taxes: appeal to HMRC, then either a statutory review by an independent HMRC officer or notification straight to the First-tier Tribunal (Tax Chamber). It calculates every time limit, deals with paying or postponing the tax in dispute (including hardship for indirect taxes), predicts the tribunal\'s likely case category and costs exposure, drafts the notice of appeal with properly stated grounds, and handles applications for permission to appeal late.',
    whenToUse:
      'On receipt of an appealable decision, before the appeal window closes, after a statutory review conclusion, and when an appeal deadline has already been missed.',
    inputs: [
      { name: 'HMRC decision', description: 'The decision letter, assessment or penalty notice, with its date and the tax concerned.', required: true },
      { name: 'Grounds', description: 'Why the decision is wrong, factually and legally.', required: true },
      { name: 'Payment position', description: 'Whether the tax has been paid, and the taxpayer\'s ability to pay.' },
      { name: 'History', description: 'Any appeal already made, review offered or concluded, and dates.' },
    ],
    outputs: [
      { name: 'Route map', description: 'Appeal to HMRC, statutory review or direct notification to the tribunal.' },
      { name: 'Deadline table', description: 'Each time limit as a calendar date.' },
      { name: 'Payment and postponement plan', description: 'Postponement for direct taxes, hardship for indirect taxes.' },
      { name: 'Notice of appeal', description: 'Grounds stated clearly enough for the tribunal and HMRC.' },
      { name: 'Late appeal application', description: 'Where needed, an application addressing the tribunal\'s approach.' },
    ],
    prompt: `You are a UK tax disputes adviser planning an appeal against an HMRC decision.

INPUTS
- Decision: <closure notice / assessment / penalty / other decision; tax; date>
- Grounds: <why it is wrong>
- Payment: <paid or not; ability to pay>
- History: <appeal made? review offered, requested or concluded? dates>

TASK
1. APPEALABLE? Confirm the decision is appealable and identify the statutory appeal provision for the tax in words.
2. ROUTE. Explain the options after appealing to HMRC: accept HMRC's offer of a statutory review, require one, or notify the appeal to the tribunal directly — and the effect of each on time limits and on alternative dispute resolution. Recommend one.
3. DEADLINES. Calculate the appeal deadline from the decision date (generally 30 days [VERIFY for the tax]), the time to accept a review offer, the review period, and the time to notify the tribunal after a review conclusion [VERIFY]. Show calendar dates.
4. PAYMENT. For direct taxes, the application to postpone payment of disputed tax. For indirect taxes, the pay-or-deposit requirement and a hardship application [VERIFY]. Note interest running on unpaid tax.
5. TRIBUNAL. Predict the likely case category (for example default paper, basic, standard or complex) and what follows: directions, witness statements, documents, and the costs regime (generally no costs except unreasonable conduct, with complex cases able to opt into costs) [VERIFY].
6. NOTICE OF APPEAL. Draft the grounds: each issue, the facts relied on, and the legal argument, clearly enough to define the dispute. Include the remedy sought.
7. LATE APPEALS. If any deadline has passed, draft an application for permission to appeal late addressing the length of the delay, the reasons, and all the circumstances including the merits and prejudice, and explain why delay of more than a few days is treated seriously.

RULES
- Never let a deadline lapse while negotiating; protect the appeal first.
- Do not state time limits or case categories from memory as fact; mark [VERIFY].
- Grounds must be accurate and specific; vague grounds invite strike-out arguments and costs risk.
- If the decision is a penalty, route the behaviour analysis to the penalty challenge skill.

OUTPUT FORMAT
Open with the next deadline as a date and the recommended route in one sentence. Then the deadline table (Step | Time limit | Date | Status), the payment plan, the tribunal expectations, the draft notice of appeal and any late appeal application.`,
    example: {
      scenario:
        'A software company receives a closure notice denying research and development relief, with a statutory review offer; its finance director asks whether to accept review or go straight to tribunal.',
      result:
        'A route map recommending notification to the tribunal with a parallel ADR application, deadlines as dates, a postponement application for the disputed tax, and draft grounds challenging the competent-professional and uncertainty findings.',
    },
  },
  {
    id: 'uk-hmrc-penalty-challenge',
    name: 'HMRC Penalty Challenge',
    description: 'Challenges HMRC penalties by testing behaviour, disclosure reductions, reasonable excuse and the right regime.',
    jurisdiction: 'uk',
    category: 'tax',
    tags: ['review', 'tax-controversy', 'penalties', 'reasonable-excuse', 'disputes'],
    sources: [FA07, FA08, { citation: 'Finance Act 2021 (penalty reform: late submission points and late payment penalties)', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Points-based late submission penalties and late payment penalties, applied to VAT and, from April 2026, to Making Tax Digital for income tax, with transitional concessions in the first year. Confirmed as at 2026-10-26.' }, { citation: 'HMRC guidance on penalties for Making Tax Digital for Income Tax', authority: 'guidance', publisher: 'HM Revenue & Customs', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'Describes the points threshold, the fixed penalty at the threshold and first-year concessions. Check the current version.' }, HMRC_MANUALS],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-hmrc-tax-appeal-planner', 'uk-hmrc-disclosure-route-selector', 'us-penalty-abatement-request'],
    whatItDoes:
      'Identifies which penalty regime applies — inaccuracy, failure to notify, the older late filing and late payment regimes, or the newer points-based late submission and late payment penalties — and challenges the penalty on every available ground: whether a qualifying failure occurred at all, the behaviour category HMRC has chosen (careless, deliberate, deliberate and concealed), the reductions for the quality of disclosure, suspension of careless penalties, special reduction, and reasonable excuse where the regime allows it. It drafts the challenge or appeal with the facts that matter.',
    whenToUse:
      'On receipt of a penalty explanation letter or penalty assessment, when HMRC proposes a behaviour category during an enquiry, and when penalty points or late payment penalties start accruing under the new regime.',
    inputs: [
      { name: 'Penalty documents', description: 'Penalty explanation letter, assessment or points notice, with dates.', required: true },
      { name: 'Underlying facts', description: 'What went wrong, why, and what the taxpayer did when they found out.', required: true },
      { name: 'Disclosure history', description: 'Whether disclosure was unprompted or prompted, and how much help was given.' },
      { name: 'Taxpayer', description: 'Individual or company, the tax, and the period.' },
    ],
    outputs: [
      { name: 'Regime identification', description: 'Which penalty regime applies and its framework.' },
      { name: 'Behaviour analysis', description: 'Whether HMRC\'s behaviour category is supportable on the evidence.' },
      { name: 'Reduction calculation', description: 'Disclosure reductions recalculated, with the working.' },
      { name: 'Other grounds', description: 'Reasonable excuse, special reduction and suspension.' },
      { name: 'Draft challenge', description: 'Representations or grounds of appeal.' },
    ],
    prompt: `You are a UK tax disputes adviser challenging an HMRC penalty.

INPUTS
- Documents: <penalty explanation letter, assessment, or points notices, with dates>
- Facts: <what went wrong, why, and what was done on discovery>
- Disclosure: <unprompted or prompted; what help and access were given>
- Taxpayer: <individual or company; tax; period>

TASK
1. REGIME. Identify the regime: inaccuracy penalties; failure to notify; the legacy late filing and late payment penalties; or the points-based late submission and new late payment penalties (VAT, and Making Tax Digital for income tax from April 2026, which has first-year concessions) [VERIFY which periods and taxes are in which regime].
2. FAILURE. Confirm a penalisable failure actually occurred: an inaccuracy that led to a loss of tax, or a missed obligation that applied to this taxpayer for this period. Test HMRC's figures.
3. BEHAVIOUR (inaccuracy and failure-to-notify penalties). Test HMRC's category against the evidence: careless means failing to take reasonable care; deliberate requires a knowing inaccuracy; deliberate and concealed requires active concealment. HMRC bears the burden of proving behaviour [VERIFY]. Identify the facts that pull the case down a category.
4. REDUCTIONS. Recalculate the reduction for the quality of disclosure (telling, helping, giving access) within the range for prompted or unprompted disclosure [VERIFY ranges] and show the working.
5. OTHER GROUNDS. Reasonable excuse where the regime allows it (and whether it continued without unreasonable delay after it ended); special reduction for special circumstances; suspension of a careless inaccuracy penalty with conditions HMRC could set [VERIFY].
6. POINTS REGIME. For points-based penalties, check each point was correctly awarded, whether the threshold has been reached, and point expiry conditions [VERIFY].
7. CHALLENGE. Draft representations to HMRC or grounds of appeal, and note the appeal deadline [VERIFY].

RULES
- Do not state penalty percentages, ranges, point thresholds or fixed amounts from memory; mark [VERIFY] and name the source.
- Never recharacterise deliberate conduct as careless without evidence; the challenge must be truthful.
- Separate the challenge to the tax from the challenge to the penalty.
- If HMRC alleges deliberate and concealed behaviour or mentions criminal investigation, recommend specialist advice before responding.

OUTPUT FORMAT
Open with: the regime, the penalty amount, and the strongest ground. Then the behaviour analysis, the reduction recalculation table (Factor | HMRC view | Our view | Reduction), other grounds, and the draft challenge with the deadline.`,
    example: {
      scenario:
        'HMRC charges a company a deliberate inaccuracy penalty at the top of the range for overstated capital allowances after a prompted disclosure, citing the finance director\'s spreadsheet errors.',
      result:
        'An analysis that the evidence shows a failure to take reasonable care rather than a knowing inaccuracy, a recalculated disclosure reduction giving full credit for access provided, and draft grounds of appeal seeking recategorisation and suspension.',
    },
  },
  {
    id: 'uk-hmrc-disclosure-route-selector',
    name: 'HMRC Disclosure Route Selector',
    description: 'Chooses the right HMRC voluntary disclosure route for undeclared tax and plans the disclosure.',
    jurisdiction: 'uk',
    category: 'tax',
    tags: ['assessment', 'tax-controversy', 'voluntary-disclosure', 'offshore', 'disputes'],
    sources: [FA07, FA08, { citation: 'HMRC Digital Disclosure Service, Worldwide Disclosure Facility and Code of Practice 9 (Contractual Disclosure Facility)', authority: 'guidance', publisher: 'HM Revenue & Customs', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'Routes for voluntary disclosure. The Digital Disclosure Service runs on a notify-then-disclose timetable and offers no immunity from prosecution; Code of Practice 9 is for suspected fraud and involves a contractual disclosure. HMRC plans an extended disclosure service for all taxes. Check current scope.' }, HMRC_MANUALS],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-hmrc-penalty-challenge', 'us-international-information-penalties', 'uk-hmrc-enquiry-response'],
    whatItDoes:
      'For an individual or company that has discovered undeclared income, gains or errors, it selects the disclosure route that fits the facts: correction through a return or error-correction process, the Digital Disclosure Service, the Worldwide Disclosure Facility for offshore matters, a tax-specific route such as VAT error correction, or — where behaviour may be deliberate — the Contractual Disclosure Facility under Code of Practice 9. It sets the number of years to cover by behaviour, estimates tax, interest and penalties, and plans the disclosure so it qualifies as unprompted and earns the maximum reduction.',
    whenToUse:
      'When undeclared income or gains come to light, after receiving a nudge letter or common reporting standard data match from HMRC, before an adviser files corrective returns, and when a client fears the matter is deliberate.',
    inputs: [
      { name: 'What was undeclared', description: 'Income, gains or errors, taxes affected, amounts and years, onshore or offshore.', required: true },
      { name: 'How it happened', description: 'The reasons, awareness and any steps that might look like concealment.', required: true },
      { name: 'HMRC contact', description: 'Any letter, nudge, enquiry or investigation already received.', required: true },
      { name: 'Records', description: 'What records exist to quantify the liability.' },
    ],
    outputs: [
      { name: 'Behaviour assessment', description: 'Likely behaviour category and its effect on years and penalties.' },
      { name: 'Route recommendation', description: 'The disclosure route and why the others do not fit.' },
      { name: 'Liability estimate', description: 'Tax, interest and penalty range by year.' },
      { name: 'Disclosure plan', description: 'Timetable, quantification method and payment.' },
      { name: 'Risks', description: 'Criminal exposure, prompted status and third-party data HMRC may hold.' },
    ],
    prompt: `You are a UK tax disputes adviser selecting a voluntary disclosure route.

INPUTS
- Undeclared: <income, gains or errors; taxes; amounts; years; onshore or offshore; countries>
- How: <reasons, awareness, any concealment>
- HMRC contact: <letters, nudge or campaign letters, data-match letters, enquiries, investigations>
- Records: <available records>

TASK
1. PROMPTED OR UNPROMPTED. Assess whether a disclosure would still be unprompted, given any HMRC contact. This affects penalty reductions.
2. BEHAVIOUR AND YEARS. Assess the likely behaviour (reasonable care, careless, deliberate) and the resulting assessment time limits — how many years must be covered — including the longer limits for offshore matters [VERIFY].
3. ROUTE. Compare and choose: correction by amending returns within the window; the Digital Disclosure Service (notify, then disclose and pay within the stated period [VERIFY]); the Worldwide Disclosure Facility for offshore matters; tax-specific routes such as VAT error correction; and the Contractual Disclosure Facility under Code of Practice 9 where deliberate behaviour is involved. Explain why the alternatives do not fit. Note that the Digital Disclosure Service offers no immunity from prosecution and is unavailable once an investigation has opened [VERIFY].
4. QUANTIFY. Estimate tax, late payment interest [VERIFY current rate], and penalties within the range for the behaviour and prompted status [VERIFY ranges, and the higher offshore penalty categories by territory].
5. PLAN. Timetable, method of quantification (actual records or reasonable estimates explained), payment or time-to-pay, and the content of the disclosure.
6. RISKS. Criminal exposure, data HMRC may already hold (for example from automatic exchange of financial account information), and the consequences of an incomplete disclosure.

RULES
- If behaviour may be deliberate, put that in the first line and recommend specialist advice before any contact with HMRC; route choice then has criminal implications.
- A disclosure must be complete and accurate. Never advise disclosing part of a known liability.
- Do not state penalty percentages, time limits or interest rates from memory; mark [VERIFY].
- Keep advice on whether conduct was criminal for qualified criminal tax counsel.

OUTPUT FORMAT
Open with the recommended route and the behaviour risk rating. Then the years-in-scope table (Year | Tax | Amount | Behaviour | In time?), the liability estimate, the disclosure plan and risks.`,
    example: {
      scenario:
        'A UK resident discovers that rental income from a Spanish flat was never declared over nine years; HMRC has not been in contact, and the owner says they assumed Spanish tax covered it.',
      result:
        'A careless-behaviour assessment covering six years, a recommendation for the Worldwide Disclosure Facility via the Digital Disclosure Service with the notification timetable, a liability estimate with credit for Spanish tax, and the quantification approach.',
    },
  },
  {
    id: 'uk-hmrc-adr-settlement',
    name: 'HMRC ADR & Settlement Planner',
    description: 'Plans alternative dispute resolution and a settlement approach with HMRC within its settlement strategy.',
    jurisdiction: 'uk',
    category: 'tax',
    tags: ['assessment', 'tax-controversy', 'disputes', 'adr', 'settlement'],
    sources: [{ citation: 'HMRC Litigation and Settlement Strategy', authority: 'guidance', publisher: 'HM Revenue & Customs', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'HMRC\'s framework for resolving disputes, including that it will not split the difference and will settle only for the amount it believes would be achieved in litigation. Check the current version.' }, { citation: 'HMRC alternative dispute resolution guidance', authority: 'guidance', publisher: 'HM Revenue & Customs', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'How to apply for ADR, which cases are suitable, and how facilitators work.' }, TMA, HMRC_MANUALS],
    lastReviewed: '2026-10-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-hmrc-tax-appeal-planner', 'uk-hmrc-enquiry-response', 'global-tax-dispute-strategy'],
    whatItDoes:
      'Plans how to resolve a dispute with HMRC without a hearing, within the limits HMRC sets itself: its Litigation and Settlement Strategy, which rules out splitting the difference and requires settlement at the figure HMRC thinks it would win in litigation, and its alternative dispute resolution service with a trained facilitator. It separates factual disputes (where ADR helps most) from points of law, values each issue on a litigation-risk basis, designs a package the strategy allows, and prepares the ADR application and the meeting.',
    whenToUse:
      'When an enquiry or appeal has stalled, when facts are disputed or communication has broken down, before notifying an appeal to the tribunal, and when a settlement offer from HMRC needs evaluating.',
    inputs: [
      { name: 'Dispute summary', description: 'The issues, amounts, periods and current stage.', required: true },
      { name: 'Positions', description: 'HMRC\'s position and the taxpayer\'s, with the evidence on each side.', required: true },
      { name: 'Relationship history', description: 'How the case has gone, delays and points of friction.' },
      { name: 'Objectives', description: 'Certainty, speed, cost, reputation, and the years affected.' },
    ],
    outputs: [
      { name: 'Issue classification', description: 'Each issue as factual, legal or mixed, and its suitability for ADR.' },
      { name: 'Litigation valuation', description: 'Each issue valued on a litigation-risk basis.' },
      { name: 'Settlement design', description: 'A package consistent with HMRC\'s strategy.' },
      { name: 'ADR application', description: 'Draft application and the case for suitability.' },
      { name: 'Meeting plan', description: 'Agenda, attendees, concessions and walk-away points.' },
    ],
    prompt: `You are a UK tax disputes adviser planning alternative dispute resolution and settlement with HMRC.

INPUTS
- Dispute: <issues, amounts, periods, stage — enquiry, appeal, review>
- Positions: <HMRC's and the taxpayer's, with evidence>
- History: <delays, friction, previous meetings>
- Objectives: <certainty, speed, cost, reputation, future years>

TASK
1. CLASSIFY. For each issue: factual, legal, or mixed. ADR is most useful for disputed facts, unclear issues and breakdowns in communication, and less useful for pure points of law [VERIFY HMRC suitability criteria].
2. VALUE. For each issue, the likely tribunal outcome and the reasons, with a candid view of strengths and weaknesses on both sides.
3. STRATEGY LIMITS. Explain HMRC's Litigation and Settlement Strategy constraints: no splitting the difference; settlement only on terms HMRC believes reflect the likely litigation outcome; issues generally settled on their own merits, though a package can resolve several issues each on a supportable basis [VERIFY].
4. SETTLEMENT DESIGN. Build a package the strategy permits: issue-by-issue outcomes that each stand on their own, agreed facts, and treatment of penalties, interest and future years.
5. ADR APPLICATION. Draft the application: the issues, why ADR suits them, what the taxpayer wants from it, and who will attend with authority to settle.
6. MEETING PLAN. Agenda, facts to agree, documents to bring, concessions available, and walk-away points. Explain how an agreement is recorded, and its effect on appeal rights and time limits [VERIFY].

RULES
- Do not suggest a compromise HMRC's strategy forbids; it will waste the meeting.
- Protect appeal deadlines while ADR runs; ADR does not suspend every time limit [VERIFY].
- Never misstate facts to a facilitator or HMRC; settlements rest on agreed facts.
- Keep the valuation and walk-away points internal.

OUTPUT FORMAT
Open with whether ADR is recommended and the issue most likely to settle. Then the issue table (Issue | Type | Amount | Likely outcome | ADR suitable?), the settlement design, the draft ADR application, and the meeting plan.`,
    example: {
      scenario:
        'A construction group disputes HMRC\'s view that 40 workers were employees rather than subcontractors, alongside a technical point on termination payments, after two years of stalled enquiry.',
      result:
        'A classification treating employment status as fact-heavy and suitable for ADR and the termination payment point as legal, a valuation per worker category, a package that settles status by category on agreed facts while litigating the legal point, and a draft ADR application.',
    },
  },
];
