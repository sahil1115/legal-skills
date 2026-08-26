import type { Skill } from '../../../types/skill';

/**
 * US corporate, M&A, securities and antitrust skills — transaction filings,
 * capital raising, disclosure triggers and competitor-contact triage.
 */
export const usCorporateSkills: Skill[] = [
  {
    id: 'us-hsr-threshold-tester',
    name: 'HSR Threshold Tester',
    description: 'Works through whether a transaction may require a premerger notification filing.',
    jurisdiction: 'us',
    category: 'corporate',
    tags: ['corporate-transactions', 'assessment', 'hsr', 'merger-control', 'antitrust', 'premerger-notification', 'mergers-acquisitions'],
    sources: [
      { citation: 'Hart-Scott-Rodino Antitrust Improvements Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.govinfo.gov', note: 'The statute requires notification and observance of a waiting period for transactions meeting its tests. The operative figures are adjusted periodically and are not in the statute itself.' },
      { citation: 'Premerger notification rules', authority: 'primary', publisher: 'US Government Publishing Office', jurisdiction: 'us', url: 'https://www.ecfr.gov', note: 'The rules define what is acquired, how to value it, who the acquiring person is, and every exemption. Read the current text — the rules and the forms have been revised.' },
      { citation: 'Federal Trade Commission Premerger Notification Office resources', authority: 'regulator', publisher: 'Federal Trade Commission', jurisdiction: 'us', url: 'https://www.ftc.gov', note: 'Publishes the current thresholds, filing fee tiers and their effective dates, which are revised on an annual cycle. This is the authoritative source for every figure and must be checked for each transaction.' },
      { citation: 'US Department of Justice Antitrust Division merger enforcement resources', authority: 'regulator', publisher: 'Antitrust Division, US Department of Justice', jurisdiction: 'us', url: 'https://www.justice.gov', note: 'Shares merger review authority. A filing obligation and a substantive antitrust risk are different questions.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-private-offering-exemption', 'us-antitrust-interaction-checker'],
    whatItDoes:
      'Runs the premerger notification question as the mechanical workflow it is: identify the acquiring and acquired persons properly (which is rarely the deal entities and is where most errors start), determine what is being acquired and how it is valued, test the size-of-transaction and any size-of-person requirement, work through the exemptions, and identify the filing mechanics and fee tier. Every figure is treated as a value to be read off the current official source on the day, because the thresholds and fee tiers are revised on an annual cycle and a remembered number is always a wrong number.',
    whenToUse:
      'As soon as a transaction structure is on the table — including asset deals, minority investments, joint ventures, option exercises and incremental purchases that cross a threshold on aggregation.',
    inputs: [
      { name: 'Transaction structure', description: 'What is being acquired — voting securities, assets, non-corporate interests — and by whom from whom.', required: true },
      { name: 'Consideration', description: 'Price and all components: cash, stock, assumed liabilities, earn-outs, and any non-cash consideration.', required: true },
      { name: 'Party structures', description: 'The ultimate parent entity of each side, control relationships, and any fund or portfolio structure.', required: true },
      { name: 'Party financials', description: 'Total assets and annual net sales for each side at the ultimate parent level.' },
      { name: 'Existing holdings', description: 'Any securities or interests already held in the target by the acquirer or its affiliates.' },
      { name: 'Deal context', description: 'Timing, signing and closing dates, and whether the transaction is competitively sensitive.' },
    ],
    outputs: [
      { name: 'Person identification', description: 'The acquiring and acquired persons at ultimate parent level, with the control analysis shown.' },
      { name: 'Acquisition analysis', description: 'What is being acquired and how the rules require it to be valued, including aggregation with existing holdings.' },
      { name: 'Size-of-transaction test', description: 'The test applied to the valuation, with every figure marked for verification against the current source.' },
      { name: 'Size-of-person test', description: 'Whether the test is engaged at all on the transaction value, and if so how the parties measure up.' },
      { name: 'Exemption analysis', description: 'Each potentially applicable exemption tested against the facts, with what would need to be established.' },
      { name: 'Filing plan', description: 'Who files, the fee tier to confirm, the waiting period mechanics, and the documents the form will demand.' },
      { name: 'Threshold verification list', description: 'Every figure to read off the current official source, with its effective date.' },
      { name: 'Substantive risk flag', description: 'Whether the deal warrants separate substantive antitrust analysis, which is a different question from filing.' },
    ],
    prompt: `You are a US antitrust lawyer testing whether a transaction requires premerger notification. This is a mechanical rules exercise, and the figures it turns on are revised periodically. You must NOT state, estimate or recall any threshold, fee amount or fee tier. Every figure is read off the current official source on the day the test is run.

INPUTS
- Transaction: <what is being acquired — voting securities, assets, non-corporate interests, a mix — and by whom from whom; structure and steps>
- Consideration: <cash, stock, assumed liabilities, earn-outs, contingent payments, non-cash items>
- Parties: <ultimate parent entity on each side; control relationships; fund, management company and portfolio structure>
- Financials: <total assets and annual net sales at ultimate parent level for each side>
- Existing holdings: <securities or interests already held in the target by the acquirer or any entity it controls>
- Context: <signing and closing timetable, competitive overlap, whether either party is a foreign person>

TASK
1. IDENTIFY THE PERSONS. Determine the acquiring person and the acquired person at ultimate parent entity level, applying the control tests the rules use. This is where most analyses go wrong: the filing party is the ultimate parent, not the deal entity, and fund structures, general partners and management companies frequently produce a different answer than the deal documents suggest. Show the control chain and flag any relationship you cannot resolve on the facts given.
2. WHAT IS BEING ACQUIRED. Characterise the acquisition — voting securities, assets, non-corporate interests, or a combination — because the rules value and test each differently. Address any step transaction, option, warrant, convertible instrument or contingent element, and say how the rules treat it. Where a transaction has multiple steps, say whether they are likely to be tested together.
3. VALUATION AND AGGREGATION. Explain how the rules require the transaction to be valued: what is included in the acquisition price, how contingent and non-cash consideration is treated, when a good-faith fair market value determination is required and who must make it, and how the holdings the acquirer already has must be aggregated with what it is acquiring. Produce a valuation with the components shown as working, and mark every judgement.
4. SIZE-OF-TRANSACTION TEST. Set out the test structurally and apply the valuation to it. Do not state the threshold figure. Write it as: "the transaction value of [X] must be compared against the current size-of-transaction threshold published by the Premerger Notification Office [VERIFY — read the current figure and its effective date]". State clearly what the answer would be above and below the threshold so the user can complete the test once they have the figure.
5. SIZE-OF-PERSON TEST. Explain that this test is engaged only in a band of transaction values and is disapplied above a higher value — again without stating either figure. Set out how each person's total assets and annual net sales are measured, from which financial statements, and at what date. Apply the supplied financials structurally and mark every threshold [VERIFY].
6. EXEMPTIONS. Work through the exemption categories that could plausibly apply on these facts — including acquisitions of certain assets, ordinary-course acquisitions, acquisitions made solely for the purpose of investment, foreign asset and foreign issuer exemptions, intraperson transactions, and any exemption specific to the asset class in question. For each: whether it is arguable, what would have to be established, and who must make that determination. Never conclude an exemption applies. Mark each [VERIFY] and note that exemptions are technical, heavily interpreted, and the area where informal agency interpretation matters most.
7. FILING PLAN. If a filing appears required: which party or parties file, what the form will demand (including the transaction documents and the internal documents analysing the deal, which parties routinely underestimate), the fee tier to confirm against the current published schedule and who pays, the waiting period and how it runs, what an early termination or a second request would mean for the timetable, and the closing restriction that applies until the waiting period expires. Do not state a fee amount, a tier boundary or a waiting period length from memory.
8. THRESHOLD VERIFICATION LIST. A numbered list of every figure the analysis depends on — size-of-transaction threshold, size-of-person thresholds, the upper value that disapplies the size-of-person test, fee tiers and amounts, and any exemption threshold — each with where to read it and the instruction to confirm its effective date. State that these are revised on an annual cycle and that a figure from a prior year is wrong, not merely stale.
9. SUBSTANTIVE RISK FLAG. Say plainly that whether a filing is required and whether the transaction raises substantive antitrust concern are separate questions, and note whether the facts suggest the second needs its own analysis — horizontal overlap, vertical relationship, a serial acquisition pattern, or a sensitive sector. Flag also that a transaction below the filing threshold is not immune from challenge.

RULES
- Never state, estimate or recall a threshold, a fee amount, a fee tier boundary, a waiting period length or an exemption figure. Name what the figure is, say where it is published, and mark it [VERIFY] with its effective date.
- Never conclude that a filing is or is not required. Produce the completed structural analysis with the figures left as verified inputs, and state that the determination requires antitrust counsel.
- Never conclude that an exemption applies.
- Failing to file when required, or closing before the waiting period expires, carries serious consequences. Say so, and never suggest proceeding on an unverified conclusion.
- If the facts suggest a transaction may already have closed without a filing, say so in the first line and recommend immediate antitrust counsel.
- Do not invent a rule number, a form item, or an interpretation. Where the position depends on informal agency interpretation, say so and route it to counsel.

OUTPUT FORMAT
Nine sections matching the tasks above, opening with a bottom line stating the identified persons, the computed transaction value, and the single figure that must be verified before the test can be completed.`,
    example: {
      scenario:
        'A private equity fund is acquiring a majority stake in a portfolio company through a new holding vehicle, with part of the consideration in rollover equity and an earn-out.',
      result:
        'A control analysis putting the fund’s management entity rather than the acquisition vehicle at the top of the acquiring person, a valuation showing how the rollover and earn-out components are treated, both size tests set out structurally with the thresholds left as verification items, two exemptions identified as arguable but not concluded, a filing plan flagging that the deal team’s internal analyses will be responsive documents, and a note that the serial-acquisition pattern warrants separate substantive review.',
    },
  },
  {
    id: 'us-private-offering-exemption',
    name: 'Private Offering Exemption Picker',
    description: 'Compares the exemptions that may be available for a securities offering on the given facts.',
    jurisdiction: 'us',
    category: 'corporate',
    tags: ['corporate-transactions', 'assessment', 'securities', 'private-placement', 'regulation-d', 'capital-raising', 'blue-sky'],
    sources: [
      { citation: 'Securities Act of 1933', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.govinfo.gov', note: 'Every offer and sale of a security must be registered or exempt. The exemption analysis starts from that premise, not from the assumption that a private sale is unregulated.' },
      { citation: 'Regulation D, Regulation A, Regulation Crowdfunding and Rule 701', authority: 'primary', publisher: 'US Government Publishing Office', jurisdiction: 'us', url: 'https://www.ecfr.gov', note: 'The conditions, offering limits, investor criteria, filing requirements and disqualification provisions are set by rule and have been amended. Read the current text — the limits in particular are periodically adjusted.' },
      { citation: 'Securities and Exchange Commission rules, forms and staff interpretations', authority: 'regulator', publisher: 'US Securities and Exchange Commission', jurisdiction: 'us', url: 'https://www.sec.gov', note: 'Staff compliance and disclosure interpretations are the agency’s view, not law, but they drive market practice. Distinguish the rule from the interpretation.' },
      { citation: 'State securities laws and notice filing requirements', authority: 'primary', jurisdiction: 'us', note: 'A federal exemption does not always displace state requirements. Notice filings, fees and deadlines vary by state and are frequently missed after closing.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'technology'],
    relatedSkills: ['us-hsr-threshold-tester', 'us-sec-disclosure-trigger'],
    whatItDoes:
      'Lays the candidate exemptions side by side against the actual facts of a raise rather than jumping to the familiar one. It works through what the issuer is, who the investors are, whether there has been or will be general solicitation, how large the offering is, what verification and disclosure each route demands, what has to be filed and when, and the disqualification and state-level questions that are routinely discovered after closing. Where the facts do not support a choice, it says so and identifies what must be established first, because an exemption that fails is a rescission problem rather than a paperwork problem.',
    whenToUse:
      'Before marketing a raise, when a term sheet arrives, when an issuer has already spoken publicly about a raise, when granting equity to employees or advisers, or when reviewing whether a completed round was properly exempt.',
    inputs: [
      { name: 'Issuer profile', description: 'Entity type, jurisdiction of organisation, reporting status, and operating history.', required: true },
      { name: 'Offering details', description: 'Amount sought, security type, use of proceeds, and the intended timetable.', required: true },
      { name: 'Investor profile', description: 'Who is being approached, how many, their likely status, and how they were identified.', required: true },
      { name: 'Solicitation activity', description: 'Any public statement, demo day, press coverage, website or social post about the raise — including anything already published.' },
      { name: 'Prior offerings', description: 'Any raise in the preceding months, since offerings can be integrated with each other.' },
      { name: 'Participant history', description: 'Anything in the background of the issuer, its directors, officers or significant holders that could engage a disqualification provision.' },
    ],
    outputs: [
      { name: 'Threshold analysis', description: 'Whether a security is being offered at all, and what has already happened that constrains the options.' },
      { name: 'Exemption comparison', description: 'Each candidate route compared on conditions, investors, solicitation, size, disclosure and filings.' },
      { name: 'Facts that decide it', description: 'The specific unresolved facts that select between routes, with what each answer implies.' },
      { name: 'Verification and disclosure duties', description: 'What each route requires the issuer to check and to provide, and the practical burden of each.' },
      { name: 'Filing calendar', description: 'Federal filings and state notice filings with their timing, presented as verification items.' },
      { name: 'Disqualification screen', description: 'The bad-actor questions to run and on whom, before anything is offered.' },
      { name: 'Integration analysis', description: 'How prior and planned offerings may be treated together, and the sequencing risk.' },
      { name: 'Escalation note', description: 'What must be settled by securities counsel before any offer is made.' },
    ],
    prompt: `You are a US securities lawyer comparing the exemptions potentially available for an offering. Do not recommend an exemption on incomplete facts. The premise is that every offer and sale of a security must be registered or exempt, and a failed exemption creates rescission rights and liability rather than a filing problem.

INPUTS
- Issuer: <entity type, jurisdiction of organisation, reporting status, operating history, prior financings>
- Offering: <amount sought, security type, use of proceeds, timetable, minimum and maximum>
- Investors: <who is being approached, how many, their likely status, how they were identified, existing relationship with the issuer>
- Solicitation: <every public statement, demo day, pitch event, press item, website page or social post about the raise, including anything already published>
- Prior offerings: <any raise in the preceding months, with dates, amounts and the exemption relied on>
- Participant history: <anything in the background of the issuer, its directors, officers, promoters or significant holders that could engage a disqualification provision>

TASK
1. THRESHOLD ANALYSIS. Confirm that what is being offered is a security, and identify anything that has already happened which constrains the available routes — most importantly whether there has already been general solicitation or public communication about the raise, which can foreclose options retrospectively. If solicitation has already occurred, say so at the top: it changes the analysis rather than merely complicating it.
2. EXEMPTION COMPARISON. Compare the candidate routes side by side. Cover at least Rule 506(b), Rule 506(c), Regulation A, Regulation Crowdfunding, and Rule 701 where equity is being issued as compensation. For each, address in the same order:
   - What kind of issuer may use it
   - Who may invest, and how investor status must be established
   - Whether general solicitation is permitted
   - The offering size limit, if any [VERIFY — periodically adjusted]
   - Disclosure the issuer must provide
   - Filings required, to whom and by when
   - Resale restrictions on the securities issued
   - State law treatment, including whether state registration is preempted and what notice filing survives
   Present this as a table followed by a short assessment of each route's fit on these facts. Do not state any dollar limit, investor cap or numerical criterion from memory: name it, mark it [VERIFY], and say where it is published.
3. FACTS THAT DECIDE IT. Identify the specific unresolved facts that select between the routes — the investors' status and how it can be established, whether solicitation is needed, the size of the raise, whether the issuer can produce the disclosure a route demands, and the timetable. For each, say what each possible answer would imply. If the facts supplied do not support choosing a route, say so plainly and stop short of a recommendation.
4. VERIFICATION AND DISCLOSURE DUTIES. For the routes that remain viable, set out what the issuer must actually do: how investor status must be established and the difference between accepting a representation and taking reasonable steps to verify it, what financial and business disclosure must be delivered, and who bears the cost and the timeline. This is where the practical choice is usually made.
5. FILING CALENDAR. The federal filing for each route and its deadline, and the state notice filings that may be required in each state where an investor is located, with fees and deadlines. Present every date and fee as [VERIFY]. Flag that state notice filings after closing are among the most commonly missed obligations and that missing one can have consequences beyond the fee.
6. DISQUALIFICATION SCREEN. Identify who must be screened — the issuer, its directors and executive officers, significant equity holders, promoters and any compensated solicitor — and what categories of event are relevant. Do not attempt to conclude whether a disqualification applies. State that this screen must be completed before any offer is made and that a late discovery can invalidate the exemption.
7. INTEGRATION. Assess whether prior or planned offerings may be treated as a single offering with this one, and what that would do to the analysis. Address the sequencing risk of running or following one route with another.
8. ESCALATION NOTE. What must be settled by securities counsel before any offer is made, and a plain statement that offers must not be made until the route is chosen and its conditions are in place.

RULES
- Never recommend an exemption without sufficient facts. "The facts do not yet support a choice; here is what must be established" is the correct output.
- Never state an offering limit, an investor number, an income or net worth criterion, a filing deadline or a fee from memory. Name it, mark it [VERIFY], and say where to read it.
- Never conclude that an investor qualifies, that a disqualification does not apply, or that an offering was properly exempt.
- Treat any solicitation that has already occurred as a fact with retrospective consequences, not as a detail to work around.
- A federal exemption does not necessarily displace state requirements. Address state law for every state with an investor.
- If an offering has already been made or closed and the exemption is uncertain, say so in the first line and recommend immediate securities counsel — rescission and liability questions are time-sensitive.
- Do not draft offering materials or investor communications in this analysis.

OUTPUT FORMAT
Eight sections matching the tasks above. Section 2 must be a comparison table with the routes as columns, followed by the per-route assessment.`,
    example: {
      scenario:
        'A startup that has already pitched at a public demo day and posted about "raising a round" wants to take money from a mix of known angels and investors it has not met.',
      result:
        'A threshold analysis flagging the public posts as likely general solicitation that constrains the options retrospectively, a comparison table across five routes with every limit left as a verification item, the investors’ status and the issuer’s ability to verify it identified as the deciding facts, a disqualification screen to run across four named categories of person before any offer, and an integration warning about a small friends-and-family round closed two months earlier.',
    },
  },
  {
    id: 'us-sec-disclosure-trigger',
    name: 'SEC Disclosure Trigger Checker',
    description: 'Assesses whether a corporate event may require disclosure consideration under SEC reporting rules.',
    jurisdiction: 'us',
    category: 'corporate',
    tags: ['corporate-transactions', 'assessment', 'securities', 'disclosure', 'reporting', 'materiality', 'public-company'],
    sources: [
      { citation: 'Securities Exchange Act of 1934', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.govinfo.gov', note: 'The reporting framework for public companies derives from the Exchange Act and the rules and forms adopted under it.' },
      { citation: 'SEC reporting forms and disclosure regulations', authority: 'primary', publisher: 'US Government Publishing Office', jurisdiction: 'us', url: 'https://www.ecfr.gov', note: 'The reportable event items, their triggers and their deadlines are set by rule and form instruction, and are amended. Read the current form and instructions rather than relying on a summary.' },
      { citation: 'Securities and Exchange Commission staff compliance and disclosure interpretations', authority: 'guidance', publisher: 'US Securities and Exchange Commission', jurisdiction: 'us', url: 'https://www.sec.gov', note: 'Staff interpretations are the agency’s view, not binding law, but they shape practice on the hardest questions. Distinguish them from the rule itself.' },
      { citation: 'National securities exchange listing standards', authority: 'regulator', jurisdiction: 'us', note: 'Exchange rules impose their own notification and disclosure obligations that run alongside the SEC rules and sometimes bite earlier. Check the applicable exchange manual.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-private-offering-exemption', 'us-hsr-threshold-tester', 'global-obligation-extraction'],
    whatItDoes:
      'Takes a corporate event and works out where it might land in the disclosure system: an item requiring a current report, something for the next periodic report, a material contract to be filed, a risk factor or other disclosure that has become inaccurate, or nothing at all. It handles the two questions that actually decide the answer — whether the event is material, and when the clock started — as questions rather than assumptions, and it deliberately stops short of a filing conclusion where the facts are incomplete, because the cost of a wrong "no" and a wrong "yes" are both high.',
    whenToUse:
      'When a significant event occurs or becomes probable — a transaction, a leadership change, a loss of a major customer, litigation, an impairment, a covenant breach, a cyber incident or a restatement question — and before anyone communicates about it externally.',
    inputs: [
      { name: 'The event', description: 'What happened or is expected to happen, with the full chronology and who knew what when.', required: true },
      { name: 'Registrant profile', description: 'Filer status, fiscal year end, exchange listing, and where the company sits in its reporting cycle.', required: true },
      { name: 'Financial context', description: 'Scale of the event against revenue, assets, earnings and any relevant segment.' },
      { name: 'Existing disclosure', description: 'What has already been said in prior filings, guidance or public statements about this subject.' },
      { name: 'Agreements involved', description: 'Any contract entered, amended or terminated, with the terms that matter.' },
      { name: 'Internal status', description: 'Whether the matter is still contingent, who has approved what, and any board or committee action taken or scheduled.' },
    ],
    outputs: [
      { name: 'Event characterisation', description: 'What the event is in disclosure terms, and the chronology that determines when any clock started.' },
      { name: 'Current report assessment', description: 'Which reportable event items may be engaged, each addressed separately rather than as a single yes or no.' },
      { name: 'Materiality analysis', description: 'The quantitative and qualitative materiality questions, framed as questions with the facts that would answer them.' },
      { name: 'Periodic report impact', description: 'What the event means for the next quarterly and annual reports, including MD&A and financial statement effects.' },
      { name: 'Contract filing analysis', description: 'Whether an agreement may need to be filed, and the confidential treatment question if so.' },
      { name: 'Existing disclosure review', description: 'Prior statements, guidance and risk factors that this event may have made inaccurate or incomplete.' },
      { name: 'Exchange and other obligations', description: 'Listing rule notifications and any other regime running alongside the SEC rules.' },
      { name: 'Timing and sequencing plan', description: 'The order of internal steps, with the trading and communications constraints flagged.' },
      { name: 'Open questions', description: 'What must be resolved by securities counsel and the disclosure committee before any conclusion.' },
    ],
    prompt: `You are a US securities lawyer supporting a public company's disclosure committee. Your job is to identify what may be triggered and what must be decided — not to conclude that a filing is or is not required.

INPUTS
- The event: <what happened or is expected; full chronology; who knew what and when; whether it is signed, probable or contingent>
- Registrant: <filer status, fiscal year end, exchange, position in the reporting cycle, any shelf or offering in progress>
- Financial context: <scale against revenue, total assets, earnings, cash flow, segment results>
- Existing disclosure: <what prior filings, guidance and public statements have said about this subject>
- Agreements: <any contract entered, amended or terminated; key terms; counterparty; whether it is outside the ordinary course>
- Internal status: <approvals given, board or committee action taken or scheduled, whether the matter remains contingent>

TASK
1. EVENT CHARACTERISATION. Describe the event in disclosure terms and establish the chronology precisely. Identify the moment that would start any reporting clock and say what it depends on — signing, board approval, a binding agreement, a determination by a specified officer or committee, or public disclosure. Where the trigger point is contestable, present both readings. Nothing else in the analysis is reliable if this is wrong.
2. CURRENT REPORT ASSESSMENT. Go through the reportable event categories a current report covers and address each that is plausibly engaged as its own question — entry into or termination of a material definitive agreement, completion of an acquisition or disposition, results of operations and financial condition, creation of a direct financial obligation, impairments, delisting or listing issues, non-reliance on previously issued financial statements, changes in control, departure or election of directors and officers, amendments to governing documents, and any other item the facts touch. For each: whether it appears engaged, what fact decides it, and what the deadline concept is. Do not state a number of business days from memory — mark every deadline [VERIFY] against the current form instructions.
3. MATERIALITY. Treat this as the central question, not a preliminary one. Address the quantitative comparison against the relevant financial measures, and separately the qualitative factors that can make a small number material — whether it changes a trend, affects a segment the market watches, concerns compliance or legal exposure, involves management integrity, affects covenant compliance, or would alter the total mix of information available. Present these as questions with the facts that would answer them. Never assert that something is or is not material; that determination belongs to the disclosure committee with counsel.
4. PERIODIC REPORT IMPACT. What this event means for the next quarterly and annual report regardless of whether a current report is filed: management's discussion and analysis, known trends and uncertainties, legal proceedings, risk factors, subsequent events, segment reporting, internal control implications, and any restatement or non-reliance question. Note that an event not requiring a current report can still require periodic disclosure.
5. CONTRACT FILING. If an agreement is involved, assess whether it may need to be filed as an exhibit — whether it is material, whether it is outside the ordinary course, and how the rules treat it. Address whether confidential treatment or redaction of competitively sensitive terms may be available and what that process requires. Mark the requirements [VERIFY].
6. EXISTING DISCLOSURE REVIEW. Compare the event against what the company has already said. Identify prior statements, earnings guidance, risk factors and forward-looking statements that this event may have rendered inaccurate, incomplete or misleading, and flag any duty-to-update or duty-to-correct question. This is frequently the greater exposure and is frequently missed.
7. EXCHANGE AND OTHER OBLIGATIONS. Listing rule notification and disclosure requirements that run alongside the SEC rules and may require earlier notice, plus any other regime the facts engage — sector regulators, contractual notice obligations, or a separate incident reporting duty.
8. TIMING AND SEQUENCING. The order of internal steps: disclosure committee, auditor and audit committee involvement where relevant, board approval, drafting and review, and filing. Flag the constraints that operate alongside: insider trading and window closures, selective disclosure risk in any investor or analyst contact before the filing, and the handling of leaks or media enquiries in the interim.
9. OPEN QUESTIONS. Everything that must be resolved before a conclusion, with who owns each.

RULES
- Do not make a definitive filing conclusion when the facts are incomplete. "Item X appears engaged if the board's approval on [date] is the trigger; that determination is required before the deadline can be fixed" is the correct form of answer.
- Never state a filing deadline, a materiality threshold, a percentage test or an exhibit requirement from memory. Name the concept, mark it [VERIFY], and say where to read it.
- Never conclude that an event is immaterial. Identify the analysis and route the determination to the disclosure committee and counsel.
- Distinguish the rule from staff interpretation every time you rely on one.
- Address each reportable event item separately. Bundling them into a single yes or no is how items get missed.
- Flag insider trading and selective disclosure exposure whenever the event is unannounced.
- If a deadline may already be running or may have passed, say so in the first line and recommend immediate securities counsel.

OUTPUT FORMAT
Nine sections matching the tasks above, opening with a bottom line naming the items that appear engaged, the trigger date question, and the earliest deadline concept in play.`,
    example: {
      scenario:
        'A listed company’s largest customer gives notice of termination on a Friday, the contract represents a meaningful share of segment revenue, and the board is not scheduled to meet for two weeks.',
      result:
        'A chronology identifying receipt of notice rather than the board meeting as the likely trigger, two reportable event items addressed separately, a materiality analysis framed around segment concentration and the effect on prior guidance rather than on a revenue percentage alone, a periodic-report section flagging risk-factor and known-trend updates, a review of prior guidance for a duty-to-correct question, and a sequencing plan closing the trading window immediately.',
    },
  },
  {
    id: 'us-antitrust-interaction-checker',
    name: 'Antitrust / Competitor Interaction Checker',
    description: 'Triages a proposed competitor contact or information exchange for antitrust risk.',
    jurisdiction: 'us',
    category: 'compliance',
    tags: ['corporate-transactions', 'screening', 'antitrust', 'competition', 'information-exchange', 'trade-association', 'compliance'],
    sources: [
      { citation: 'Sherman Act and Clayton Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.govinfo.gov', note: 'Agreements between competitors that restrain trade are the core prohibition. Some categories are treated as unlawful without inquiry into effects, and some conduct carries criminal exposure.' },
      { citation: 'Federal Trade Commission Act', authority: 'primary', publisher: 'Federal Trade Commission', jurisdiction: 'us', url: 'https://www.ftc.gov', note: 'Provides a separate route for the FTC to reach unfair methods of competition.' },
      { citation: 'Antitrust enforcement guidelines and policy statements issued by the FTC and the Department of Justice', authority: 'guidance', publisher: 'Antitrust Division, US Department of Justice', jurisdiction: 'us', url: 'https://www.justice.gov', note: 'Guidelines describe enforcement intentions and are not law. They have been withdrawn, replaced and reissued over time — confirm what is currently in force before relying on any safe harbour.' },
      { citation: 'State antitrust statutes', authority: 'primary', jurisdiction: 'us', note: 'States enforce their own antitrust laws, sometimes reaching conduct federal law does not and with their own remedies. Consider the states where the conduct occurs.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-hsr-threshold-tester', 'global-horizon-scanner'],
    whatItDoes:
      'A triage tool for the moment before a competitor interaction happens: a trade association meeting, a benchmarking exercise, a joint bid, a supplier discussion, a due diligence exchange, or a conversation someone is about to have at a conference. It sorts the proposed conduct into categories that behave very differently — conduct treated as unlawful without inquiry into its effects, conduct assessed on its competitive effects, and conduct that is ordinarily unproblematic — identifies the specific information or topic that creates the exposure, and gives concrete safeguards. It is deliberately conservative and routes anything near the line to counsel rather than clearing it.',
    whenToUse:
      'Before attending an industry meeting, before any benchmarking or wage or pricing data exchange, before a joint venture or joint bid discussion, before due diligence between competitors, and whenever someone asks whether they can talk to a competitor about something.',
    inputs: [
      { name: 'Proposed interaction', description: 'What is planned — the meeting, exchange, project or conversation — and its stated purpose.', required: true },
      { name: 'Participants', description: 'Who will be involved and their relationship to your business: competitors, customers, suppliers, or a mix.', required: true },
      { name: 'Information involved', description: 'What would be shared or discussed, in what form, how current it is, and how aggregated.', required: true },
      { name: 'Market context', description: 'The relevant market, roughly how concentrated it is, and the participants’ positions in it.' },
      { name: 'Format and safeguards', description: 'Who convenes it, whether counsel attends, whether there is an agenda, and any existing controls.' },
      { name: 'Business objective', description: 'What the business is actually trying to achieve, which usually points to a safer alternative.' },
    ],
    outputs: [
      { name: 'Risk categorisation', description: 'Where the proposed conduct sits — treated as unlawful without inquiry, effects-based, or ordinarily unproblematic.' },
      { name: 'Specific concerns', description: 'The particular topic, data field or dynamic creating the exposure, named concretely.' },
      { name: 'Information exchange analysis', description: 'How the data’s currency, granularity, aggregation and identifiability change the assessment.' },
      { name: 'Safeguards', description: 'Concrete controls — agenda, aggregation, third-party administration, counsel presence, minutes, walkout protocol.' },
      { name: 'Alternatives', description: 'Ways to achieve the business objective with materially less exposure.' },
      { name: 'Escalation decision', description: 'Proceed with safeguards, proceed only after counsel review, or do not proceed pending advice.' },
      { name: 'Participant briefing', description: 'A short brief for the people attending, covering what not to discuss and what to do if it comes up.' },
    ],
    prompt: `You are a competition compliance counsel triaging a proposed interaction with competitors. This is triage, not an antitrust opinion. Be conservative: the cost of wrongly clearing conduct in this area is severe and can be criminal, while the cost of routing something to counsel is a short delay.

INPUTS
- Proposed interaction: <the meeting, exchange, project, bid or conversation; stated purpose; when and where>
- Participants: <who will be involved; their relationship to us — competitor, customer, supplier, potential partner; seniority and function>
- Information involved: <what would be shared or discussed; form; how current; how aggregated; whether company-identifiable; direction of flow>
- Market context: <relevant product and geographic market; rough concentration; our position and theirs>
- Format and safeguards: <who convenes; agenda; whether counsel attends; minutes; existing controls>
- Business objective: <what we are actually trying to achieve>

TASK
1. RELATIONSHIP CHECK. Establish whether the counterparties are actual or potential competitors for the subject matter in question, including as buyers of labour or inputs. Competitor status is subject-specific: parties can be competitors for hiring and not for sales, or competitors in one geography only. Say which relationship applies to which topic, and flag where the answer is unclear.
2. RISK CATEGORISATION. Sort the proposed conduct:
   RED — conduct in categories treated as unlawful without inquiry into its effects, including agreements or understandings on price or pricing elements, allocation of customers, territories or markets, bid coordination, agreements on output or capacity, and agreements affecting the hiring or compensation of employees. Say plainly that conduct in this category can carry criminal exposure for individuals as well as the company, and that no business justification cures it.
   AMBER — conduct assessed on its competitive effects, including information exchanges, benchmarking, standard-setting, joint ventures, joint purchasing or selling, and trade association activity.
   GREEN — conduct that is ordinarily unproblematic, such as genuinely public information, general industry or technical discussion with no competitively sensitive content, or a genuine customer or supplier negotiation.
   Assign a category to each distinct element of the interaction rather than to the interaction as a whole, since a single meeting can contain all three.
3. SPECIFIC CONCERNS. Name the exact topic, data field, phrase or dynamic that creates the exposure. Be concrete: "the agenda item on regional capacity plans" is useful; "possible competitive concerns" is not. Include the risk of a discussion drifting into a RED topic, and the risk that mere presence while others discuss one creates exposure.
4. INFORMATION EXCHANGE ANALYSIS. Where information is being shared, work through the factors that change the assessment: whether it is historical or current or forward-looking; whether it is aggregated or company-identifiable; how granular it is; how many participants contribute; whether the exchange is reciprocal; whether the market is concentrated; and whether the data is already genuinely public. Say which of these factors makes this particular exchange safer or riskier. Treat forward-looking pricing, capacity, bidding and compensation information as the highest-risk categories.
5. SAFEGUARDS. Concrete, checkable controls proportionate to the risk: a written agenda circulated in advance and adhered to, counsel present or reviewing in advance, minutes taken, aggregation and anonymisation by an independent third party with a sufficient number of contributors, historical rather than current data, a documented walkout protocol with an instruction to state the objection audibly and follow up in writing, restrictions on side conversations and social sessions, and rules for follow-up communications. Say which safeguards are necessary rather than merely advisable.
6. ALTERNATIVES. Ways to achieve the stated business objective with materially less exposure — publicly available data, customer-sourced information, an independent consultant or survey provider, a properly administered benchmarking programme, or restructuring the arrangement so the sensitive exchange is unnecessary. Frequently the objective can be met without the interaction at all; say so where that is true.
7. ESCALATION DECISION. One of: PROCEED WITH THE SAFEGUARDS SET OUT / PROCEED ONLY AFTER ANTITRUST COUNSEL REVIEW / DO NOT PROCEED PENDING ADVICE. Choose the more cautious option wherever the categorisation is uncertain. Anything with a RED element goes to counsel before it happens, without exception.
8. PARTICIPANT BRIEFING. Six to twelve lines for the people attending, in plain language: what may be discussed, what may not, what to do if a prohibited topic arises, and who to call. Written so that a non-lawyer can follow it in the room.

RULES
- This is compliance triage, not a legal opinion or a clearance. Say so explicitly in your answer.
- Never clear conduct with any RED element. Never conclude that a business justification makes conduct in that category acceptable.
- Never state a market share safe harbour, a concentration threshold or a numerical screen from memory. Enforcement guidelines change and have been withdrawn and reissued; mark any such figure [VERIFY] and note that guidelines are not law.
- Assume documents and messages will be read later by an enforcer. Flag any proposal to communicate in a way intended to avoid a record, and treat that as an aggravating factor rather than a mitigation.
- Address labour-market conduct explicitly wherever hiring, wages or benefits are in scope — agreements between competitors on those topics have been treated as core violations.
- Where the facts suggest conduct of this kind may already have occurred, say so in the first line, recommend immediate antitrust counsel, and note that self-reporting and leniency considerations are time-critical and belong to counsel.
- Do not name a specific case or enforcement action unless you are confident it exists as you describe it.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with the escalation decision in a single line.`,
    example: {
      scenario:
        'A trade association proposes a members-only session on regional hiring difficulties, including a round-table where each member describes what they are paying for scarce technical roles.',
      result:
        'A relationship check establishing the members as competitors for labour even where they do not compete for customers, an amber categorisation for the general session with the compensation round-table placed in the red category, the round-table identified as the specific concern with criminal exposure noted, a DO NOT PROCEED PENDING ADVICE decision for that element, an alternative using an independently administered aggregated survey, and a short briefing telling attendees to object audibly and leave if the topic arises.',
    },
  },
];
