import type { Skill } from '../../../types/skill';

/**
 * US commercial and finance skills — subscription compliance, secured
 * transactions and government-contract flowdowns.
 */
export const usCommercialSkills: Skill[] = [
  {
    id: 'us-auto-renewal-auditor',
    name: 'Auto-Renewal Auditor',
    description: 'Audits a subscription sign-up, renewal and cancellation flow against federal and state rules.',
    jurisdiction: 'us',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'auto-renewal', 'subscriptions', 'consumer-protection', 'cancellation', 'state-law'],
    sources: [
      { citation: 'Restore Online Shoppers’ Confidence Act', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.govinfo.gov', note: 'Federal requirements for negative option features in online transactions, including clear disclosure, informed consent and a simple cancellation mechanism.' },
      { citation: 'Federal Trade Commission Act and FTC negative option rulemaking and enforcement', authority: 'regulator', publisher: 'Federal Trade Commission', jurisdiction: 'us', url: 'https://www.ftc.gov', note: 'The FTC’s rulemaking in this area has been the subject of litigation and its status has changed. Confirm what is currently in force before relying on any specific rule requirement; enforcement under the general prohibition on deceptive practices is separate and continues regardless.' },
      { citation: 'State automatic renewal statutes', authority: 'primary', jurisdiction: 'us', note: 'Many states impose their own disclosure, affirmative consent, renewal reminder and cancellation requirements, and they differ on all four. Several have been amended recently. Identify every state where subscribers are located and check each separately.' },
      { citation: 'State consumer protection statutes and attorney general enforcement', authority: 'regulator', jurisdiction: 'us', note: 'State attorneys general enforce independently, and a private right of action may exist under state law. Non-compliance is rarely a single-jurisdiction problem.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'technology'],
    relatedSkills: ['us-fifty-state-survey', 'global-contract-triage', 'au-acl-unfair-terms'],
    whatItDoes:
      'Walks the whole subscription lifecycle as a consumer experiences it — the offer, the checkout screen, the consent action, the confirmation, the renewal reminder, the price change, and the attempt to cancel — and tests each stage against the federal baseline and the state layer. It is deliberately screen-by-screen rather than terms-by-terms, because the requirements attach to what is presented and how consent is obtained, not to what the terms of service say. Where a jurisdiction has not been identified, it insists on that first, since a flow that is compliant in one state can be unlawful in another.',
    whenToUse:
      'Before launching or redesigning a subscription flow, when introducing a free trial or a price increase, when expanding into new states, after a chargeback or complaint pattern emerges, or on receipt of a regulator or attorney general enquiry.',
    inputs: [
      { name: 'The offer and enrolment flow', description: 'Every screen a subscriber sees, in order: the offer, checkout, the consent mechanism and the confirmation.', required: true },
      { name: 'Subscriber locations', description: 'Every state where subscribers are located, since state requirements differ and the strictest usually governs the design.', required: true },
      { name: 'Renewal terms', description: 'Term length, renewal cadence, pricing and any change in price after an introductory or trial period.', required: true },
      { name: 'Cancellation mechanism', description: 'How a subscriber cancels, every step required, and whether the route differs from how they signed up.' },
      { name: 'Notice practice', description: 'What reminders or renewal notices are sent, when, by what channel and with what content.' },
      { name: 'Terms and receipts', description: 'The contractual terms, the confirmation message and any acknowledgement retained.' },
    ],
    outputs: [
      { name: 'Jurisdiction map', description: 'Every regime that may apply, with the state layer identified before any rule is applied.' },
      { name: 'Enrolment findings', description: 'Disclosure and consent issues at each screen, with the specific element at fault.' },
      { name: 'Notice findings', description: 'Renewal reminder, trial conversion and price-change notice gaps against each applicable regime.' },
      { name: 'Cancellation findings', description: 'Whether the cancellation route meets the simplicity and parity expectations of each regime.' },
      { name: 'Record-keeping review', description: 'Whether the evidence of consent retained would actually prove consent in a dispute.' },
      { name: 'Prioritised fix list', description: 'Findings ranked by exposure and by how many subscribers each touches.' },
      { name: 'Verification list', description: 'Every requirement to confirm against current federal and state sources, with what to read.' },
    ],
    prompt: `You are a US consumer protection lawyer auditing an automatic renewal or negative option programme. Requirements come from federal law and from a growing set of state statutes that differ from each other, so identify the jurisdictions in scope before applying any rule.

INPUTS
- Enrolment flow: <describe or paste every screen a subscriber sees in order: the offer, pricing, checkout, the consent mechanism, the confirmation>
- Subscriber locations: <every state where subscribers are located; note where the volume concentrates>
- Renewal terms: <initial term, renewal cadence, price, any change after a trial or introductory period, any term-length change on renewal>
- Cancellation: <every step required to cancel; the channels available; whether they mirror the sign-up channel; any retention flow or offer presented>
- Notices: <what is sent, when, by which channel, with what content — trial conversion, renewal reminders, price changes>
- Terms and records: <contractual terms, confirmation message, what evidence of consent is retained>

TASK
1. JURISDICTION MAP. List every regime that may apply: the federal requirements for online negative option transactions, general federal prohibitions on deceptive practices, and the automatic renewal statute of each state where subscribers are located. State explicitly that state requirements differ on disclosure content, consent, reminders and cancellation, and that the practical design must generally satisfy the strictest applicable requirement. Where the states in scope have not been supplied, treat that as the threshold question. Mark every state requirement [VERIFY] and name what to read.
2. ENROLMENT AND DISCLOSURE. Screen by screen, assess whether the automatic renewal terms are presented clearly and conspicuously before the subscriber commits, and in proximity to the consent action rather than buried in linked terms. Check specifically: that the offer discloses the recurring nature, the amount and the cadence; that any trial discloses what happens at conversion, when, and at what price; that the total cost is presented rather than only the introductory price; and that nothing about the presentation obscures the renewal. Name the specific element at fault for each finding rather than describing a general impression.
3. CONSENT. Assess how affirmative consent to the recurring charge is obtained, whether it is separate from consent to the rest of the transaction, and whether a pre-checked box, a bundled acceptance or an inferred consent is being relied on. Consider whether the consent action would be evidenced later.
4. CONFIRMATION AND ONGOING NOTICE. Whether a confirmation containing the renewal terms and the cancellation method is provided, in a form the subscriber retains. Then the ongoing notices: renewal reminders and their timing, trial conversion notices, notices before a price increase, and notices where a renewal term differs from the initial term. State the notice requirements as concepts and mark every period and content requirement [VERIFY] — do not state a number of days from memory, and do not assume a state requires a reminder or does not.
5. CANCELLATION. Assess the mechanism against the expectation that cancelling should be at least as easy as signing up and available through the medium used to sign up. Walk the steps and count them. Flag: a route that requires a phone call or a chat session where sign-up was self-service; retention flows that must be traversed rather than declined; a requirement to log in where sign-up did not require an account; delayed or conditional effect; and any charge or penalty for cancelling. Say plainly where a retention offer crosses from acceptable to obstructive.
6. RECORD-KEEPING. Assess whether what is retained would actually prove, for a specific subscriber on a specific date, what was displayed and what they agreed to. Screenshots of a current flow do not prove a historic one. Identify what should be retained and for how long, marked [VERIFY].
7. PRIORITISED FIX LIST. Rank every finding by exposure and by how many subscribers it touches. Separate what should change before the next billing cycle from what belongs in the next release. For each fix, say which requirement it addresses and in which jurisdictions.
8. VERIFICATION LIST. Every requirement the audit depends on, with the specific federal or state source to read and a note that this area has seen frequent legislative and rulemaking change.

RULES
- Identify the applicable jurisdictions before applying any rule, and answer per state rather than for "the states" collectively. Never generalise one state's requirement to another.
- Never state a notice period, a reminder window, a disclosure font requirement, a retention period or a penalty figure from memory. Name the requirement, mark it [VERIFY], and say where it is published.
- The federal rulemaking position in this area has been contested and has changed. Do not assert what is currently in force; describe the requirement, mark it [VERIFY], and note that enforcement under the general prohibition on deceptive practices operates independently of any specific rule.
- Rate each finding LIKELY NON-COMPLIANT / RISKY / UNCLEAR / ACCEPTABLE, and do not present a design preference as a legal violation.
- Where the audit discloses that subscribers may already have been charged under a non-compliant flow, say so in the first line and recommend qualified counsel before any remediation, because a change to the flow and any refund programme both have consequences.
- Assess what the subscriber actually experiences. What the terms of service say is a separate and usually less important question.

OUTPUT FORMAT
Eight sections matching the tasks above, opening with the three findings carrying the greatest exposure and the states that drive them.`,
    example: {
      scenario:
        'A consumer app converts a free trial to an annual plan, discloses the conversion only in the linked terms, and requires subscribers to call during business hours to cancel.',
      result:
        'A jurisdiction map covering the federal baseline plus six state statutes, the trial conversion disclosure and the pre-checked consent flagged as likely non-compliant, an absent renewal reminder identified as a gap in four of the six states subject to verification, the telephone-only cancellation route flagged as the highest-exposure finding given self-service sign-up, and a fix list separating the checkout change from the cancellation rebuild.',
    },
  },
  {
    id: 'us-ucc9-filing-checker',
    name: 'UCC-9 Filing Checker',
    description: 'Checks a secured-transaction filing for the errors that most often defeat perfection.',
    jurisdiction: 'us',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'ucc', 'secured-transactions', 'perfection', 'financing-statement', 'collateral'],
    sources: [
      { citation: 'Uniform Commercial Code Article 9 as enacted in each state', authority: 'primary', jurisdiction: 'us', note: 'Article 9 is a uniform text but it is state law, enacted state by state with variations and amended on different timetables. Identify the governing state and read that state’s enacted text — never the model text alone.' },
      { citation: 'Uniform Law Commission and the Permanent Editorial Board for the Uniform Commercial Code', authority: 'secondary', publisher: 'Uniform Law Commission', jurisdiction: 'us', url: 'https://www.uniformlaws.org', note: 'Publishes the model text, official comments and amendment status by state. The comments are persuasive, not enacted law.' },
      { citation: 'State filing office rules and administrative practice', authority: 'regulator', jurisdiction: 'us', note: 'Each filing office publishes its own rules on acceptable forms, name formats, indexing, search logic, fees and rejection. Practice differs between offices and matters as much as the statute.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services'],
    relatedSkills: ['us-fifty-state-survey', 'global-obligation-extraction'],
    whatItDoes:
      'Reviews a financing statement and its surrounding facts for the mistakes that actually defeat perfection, which are almost never exotic: the debtor name taken from a letterhead rather than the public organic record, the wrong filing office because the debtor’s location was assumed, a collateral description that is too narrow for the security agreement or too vague to be effective, and a continuation filed outside the window. It runs each element as a separate check, insists on identifying the governing state before applying any rule, and treats the filing office’s own published practice as part of the requirement rather than an afterthought.',
    whenToUse:
      'Before filing, when reviewing a portfolio of existing filings, when a debtor changes name, structure or state, ahead of a continuation deadline, or during diligence on a facility or a loan purchase.',
    inputs: [
      { name: 'Debtor details', description: 'Exact legal name, entity type, jurisdiction of organisation, organisational identification number, and address.', required: true },
      { name: 'Secured party details', description: 'Name and address of the secured party or its representative.', required: true },
      { name: 'Collateral', description: 'The collateral description in the security agreement and the description used or proposed in the financing statement.', required: true },
      { name: 'The filing', description: 'The existing or proposed financing statement, with its file number and filing date if already filed.' },
      { name: 'Filing office', description: 'Where the filing was or would be made.' },
      { name: 'Change history', description: 'Any debtor name change, merger, reorganisation, relocation or collateral transfer since the original filing.' },
    ],
    outputs: [
      { name: 'Governing law and office determination', description: 'Which state’s law governs perfection and which office is correct, with the reasoning shown.' },
      { name: 'Debtor name check', description: 'Whether the name matches the required source, and the seriously-misleading risk if it does not.' },
      { name: 'Secured party check', description: 'Whether the secured party is identified adequately, including representative capacity.' },
      { name: 'Collateral description review', description: 'Whether the description covers the security agreement and is effective, including any type requiring more.' },
      { name: 'Timing and lapse calendar', description: 'Effective period, the continuation window, and every date to diarise.' },
      { name: 'Amendment plan', description: 'What amendment, continuation or new filing each defect requires, and in what order.' },
      { name: 'Priority risk flags', description: 'Where a defect may have priority consequences that an amendment does not cure.' },
      { name: 'Verification list', description: 'Every point to confirm against the governing state’s enacted text and the filing office’s own rules.' },
    ],
    prompt: `You are a US secured transactions lawyer reviewing a financing statement. Article 9 is state law: it is a uniform text, but it is enacted state by state with variations and amended on different timetables, and the filing office's own published rules govern much of what actually happens. Identify the governing state and the office before applying any rule.

INPUTS
- Debtor: <exact legal name; entity type; jurisdiction of organisation; organisational ID number; chief executive office or principal residence; any trade names>
- Secured party: <name, address, and whether filing as a representative or agent>
- Collateral: <the description in the security agreement, and the description used or proposed in the financing statement>
- The filing: <the financing statement as filed or proposed; file number; filing date; any prior amendments or continuations>
- Filing office: <where filed or proposed>
- Changes: <any debtor name change, merger, conversion, reorganisation, relocation, or transfer of collateral since the original filing, with dates>

TASK
1. GOVERNING LAW AND FILING OFFICE. Determine which state's law governs perfection by filing and therefore which office is correct. Work from the debtor's location as Article 9 determines it — which for a registered organisation turns on its jurisdiction of organisation rather than on where it operates or where the collateral sits. Address separately any collateral type for which the rule differs. State the determination, show the reasoning, and mark the governing state's enacted text [VERIFY]. Flag that filing in the wrong office generally leaves the security interest unperfected and that the error is often invisible until it matters.
2. DEBTOR NAME. This is the most common and most serious defect. Assess whether the name used matches what the rules require: for a registered organisation, the name shown on the public organic record of its jurisdiction of organisation — not a trade name, not a letterhead, not a name from the loan documents, and not an abbreviation. Check punctuation, spacing, suffixes and any abbreviation. For an individual debtor, note that the governing state's enacted rule on which name is correct may differ between states and mark it [VERIFY]. Where the name may be wrong, address whether the filing would nonetheless be found by a search under the correct name using the office's own search logic, and state that this determination requires an actual search rather than an assumption.
3. SECURED PARTY. Whether the secured party or its representative is adequately identified, whether a representative capacity is properly reflected, and whether any assignment has been recorded.
4. COLLATERAL DESCRIPTION. Compare the security agreement's description with the financing statement's. Check that the financing statement is not narrower than the interest granted, that it is not so vague as to be ineffective, and that any collateral type requiring a more specific description or an additional step is handled. Flag separately any collateral for which filing alone does not perfect, or for which control, possession or a different regime applies — and say that these are separate determinations, not part of the filing check.
5. TIMING AND LAPSE. Set out the effective period of the filing and the window in which a continuation must be filed, as concepts, and mark both [VERIFY] against the governing state's text. Do not state a number of years or months from memory. Explain that a continuation filed outside the window is ineffective and cannot be cured, that lapse is retroactive in its effect on priority, and that a new filing after lapse takes a new priority date. Produce a calendar of every date to diarise from the facts given.
6. CHANGES SINCE FILING. Address each change supplied: a debtor name change, a merger or conversion, a relocation to another state, or a transfer of collateral to a new debtor. For each, state what the rules require, the period within which action must be taken where one applies, and what happens to collateral acquired after the change if nothing is done. Mark every period [VERIFY].
7. AMENDMENT PLAN. For each defect, the correct remedy — an amendment, a continuation, a new filing, or a filing in a different office — and the order in which to do them. State plainly which defects an amendment cures prospectively only, so that the original priority date is lost for some or all collateral.
8. PRIORITY RISK FLAGS. Where a defect may have consequences an amendment cannot cure: an intervening filing by another creditor, a lapse that has already occurred, a bankruptcy filing by the debtor, or a purchase-money position that depends on timing. Identify these as urgent and route them to counsel.
9. VERIFICATION LIST. Every point to confirm against the governing state's enacted Article 9 and against the filing office's own published rules — acceptable name formats, indexing and search logic, form requirements, fees and rejection practice.

RULES
- Identify the governing state before applying any rule, and read that state's enacted text rather than the model text. Never assume the uniform version is in force as you remember it.
- Never state a duration, a grace period, a continuation window or a fee from memory. Name the concept, mark it [VERIFY], and say where to read it.
- Never conclude that a filing is effective or that a security interest is perfected. Identify the defects and route the conclusion to counsel.
- Never conclude that a name is not seriously misleading without an actual search of the office's index using its own search logic. Say that the search is required.
- Treat the filing office's published rules and practice as part of the requirement, not as administrative detail.
- If a continuation window may be open now or about to close, if a lapse may already have occurred, or if the debtor may be insolvent, say so in the first line and recommend immediate counsel — these are not recoverable positions once missed.
- Perfection is only one question. Note where attachment, priority or a different perfection method needs separate analysis.

OUTPUT FORMAT
Nine sections matching the tasks above, opening with a bottom line naming the governing state, the most serious defect found, and any date that is imminent.`,
    example: {
      scenario:
        'A lender is diligencing a facility where the borrower reorganised into a different state two years ago and the original financing statement still shows the former name and the former state’s filing office.',
      result:
        'A governing-law determination placing perfection in the new state, the former name flagged as a likely seriously-misleading defect requiring an actual index search to confirm, the original filing identified as in the wrong office for collateral acquired after the reorganisation, a calendar showing the continuation window in the old office is nearly irrelevant to the real problem, an amendment plan that is a new filing in the correct office with a new priority date, and a priority flag for the two intervening filings found in diligence.',
    },
  },
  {
    id: 'us-far-dfars-flowdown',
    name: 'FAR/DFARS Flowdown Checker',
    description: 'Works out which prime contract clauses may need to flow down to a subcontractor.',
    jurisdiction: 'us',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'government-contracts', 'far', 'dfars', 'flowdown', 'subcontracts'],
    sources: [
      { citation: 'Federal Acquisition Regulation', authority: 'primary', publisher: 'US General Services Administration, Department of Defense and NASA', jurisdiction: 'us', url: 'https://www.acquisition.gov', note: 'The governmentwide procurement regulation. Whether a clause flows down, and on what conditions, is determined by the clause’s own prescription and text — not by a general list.' },
      { citation: 'Defense Federal Acquisition Regulation Supplement', authority: 'primary', publisher: 'US Department of Defense', jurisdiction: 'us', url: 'https://www.acquisition.gov', note: 'Applies to Department of Defense acquisitions in addition to the FAR, and contains its own flowdown requirements including in sensitive areas such as safeguarding information and supply chain.' },
      { citation: 'Agency FAR supplements', authority: 'primary', jurisdiction: 'us', url: 'https://www.acquisition.gov', note: 'Individual agencies maintain their own supplements with additional clauses and flowdowns. Identify the contracting agency before assuming only the FAR and DFARS apply.' },
      { citation: 'Contract-specific terms, incorporated documents and agency deviations', authority: 'primary', jurisdiction: 'us', note: 'A prime contract can incorporate clauses by reference, include agency deviations, or impose flowdowns by its own terms that no regulation requires. The actual contract text governs and must be read.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['public-sector'],
    relatedSkills: ['us-ofac-export-screener', 'global-obligation-extraction', 'global-contract-triage'],
    whatItDoes:
      'Takes the actual clause list from a prime contract and sorts it for a specific subcontract rather than applying a generic template. It separates clauses that must flow down as a matter of the clause’s own terms from those that flow down only if a condition is met — a dollar value, a type of work, a commercial item determination, a place of performance — and from those a prime is choosing to impose commercially. It also handles what template flowdowns routinely get wrong: clauses that must be modified to substitute the parties, clauses that make no sense below the prime, and obligations that need operational implementation rather than just contractual acceptance.',
    whenToUse:
      'When issuing or negotiating a subcontract, purchase order or teaming agreement under a government prime; when a subcontractor pushes back on a flowdown schedule; when a prime contract is modified; or when auditing an existing subcontract population.',
    inputs: [
      { name: 'Prime contract clause list', description: 'The clauses incorporated in the prime contract, by number and title, including anything incorporated by reference.', required: true },
      { name: 'Contract context', description: 'Contracting agency, contract type, total value, and whether it is a commercial acquisition.', required: true },
      { name: 'Subcontract scope', description: 'What the subcontractor will do or supply, and whether it is commercial, developmental or a service.', required: true },
      { name: 'Subcontract details', description: 'Value, duration, and whether it is a subcontract, purchase order or teaming arrangement.' },
      { name: 'Subcontractor profile', description: 'Size status, place of performance, whether foreign persons or locations are involved, and any prior government contracting experience.' },
      { name: 'Data and information involved', description: 'Whether the work involves controlled unclassified information, technical data, classified work or covered systems.' },
    ],
    outputs: [
      { name: 'Mandatory flowdown list', description: 'Clauses whose own terms require flowdown to this subcontract, with the basis for each.' },
      { name: 'Conditional flowdown list', description: 'Clauses that flow down only if a condition is met, with the condition and how it applies here.' },
      { name: 'Not-required list', description: 'Clauses that do not flow down, so the schedule is defensible rather than defensive.' },
      { name: 'Commercial-item analysis', description: 'How a commercial determination narrows the set, and what survives it regardless.' },
      { name: 'Modification requirements', description: 'Clauses needing party substitution or other adaptation, with what must change.' },
      { name: 'Operational obligations', description: 'Flowdowns that require the subcontractor to do something, not just to accept a clause.' },
      { name: 'Commercially imposed terms', description: 'Terms the prime is choosing to impose, separated from regulatory requirements.' },
      { name: 'Verification list', description: 'Every clause to read in its current text, with the prescription that determines its flowdown.' },
    ],
    prompt: `You are a US government contracts lawyer determining which prime contract clauses must flow down to a subcontract. Flowdown is determined by the individual clause's own prescription and text, read in its current version, together with the prime contract itself. There is no reliable general list, and template flowdown schedules are a frequent source of both over-inclusion and gaps.

INPUTS
- Prime contract clauses: <the full clause list by number and title, including clauses incorporated by reference and any agency supplement clauses and deviations>
- Contract context: <contracting agency; contract type; total value; whether a commercial acquisition; period of performance>
- Subcontract scope: <what the subcontractor will do or supply; whether commercial, developmental, services or construction>
- Subcontract details: <value; duration; whether a subcontract, purchase order or teaming agreement; tier>
- Subcontractor: <size and socioeconomic status; place of performance; whether foreign persons or locations are involved; government contracting experience>
- Information and systems: <controlled unclassified information, technical data, classified work, covered systems, or none>

TASK
1. FRAMEWORK. Identify which regulatory layers apply to this prime contract: the governmentwide regulation, the defence supplement if applicable, the contracting agency's own supplement, and any deviation. State that the applicable layers are determined by the contracting agency and the acquisition, and that missing the agency supplement is a common error. Then state the governing principle: each clause's own prescription and text determine whether it flows down, and the prime contract may impose more.
2. CATEGORISE EVERY CLAUSE. Work through the supplied clause list and place each clause in exactly one category, with a one-line basis:
   MANDATORY — the clause's own terms require it to be included in subcontracts.
   CONDITIONAL — the clause requires flowdown only where a condition is met. Name the condition (a value threshold, a type of work or supply, place of performance, a commercial determination, a tier, or the presence of particular information) and apply it to the facts given.
   NOT REQUIRED — the clause does not require flowdown. Say so explicitly; a defensible schedule needs the exclusions as much as the inclusions.
   CANNOT DETERMINE — you are not confident what the clause requires. Say so rather than guessing, and put it on the verification list.
   Do not state a clause's flowdown status from memory of a template. Where you are relying on recollection of a clause's terms, mark it [VERIFY] and say the current text must be read.
3. DEFENCE AND AGENCY LAYERS. Address separately the supplement clauses in the list, particularly those concerning safeguarding of information, cyber incident reporting, supply chain and sourcing restrictions, and specialty metals or item-specific requirements. These carry their own flowdown language and frequently apply to lower tiers than the general clauses. Mark each [VERIFY].
4. COMMERCIAL ANALYSIS. If the subcontract is for commercial items or services, explain how that narrows the required set, and identify the clauses that apply regardless of a commercial determination. Address who makes the commercial determination and what it must be based on. Flag that treating a subcontract as commercial without a supportable determination is itself a risk.
5. MODIFICATION REQUIREMENTS. Identify clauses that must be adapted rather than copied: those needing substitution of the parties so that obligations run to the prime rather than the government, those where the government's rights must be preserved rather than transferred, and those that make no sense at subcontract level. Say specifically what must change in each. Copying a clause unmodified is a common and consequential drafting error.
6. OPERATIONAL OBLIGATIONS. Separate the clauses that require the subcontractor to actually do something — implement safeguards, report incidents within a period, maintain records, permit audits or access, make certifications, post notices, comply with sourcing restrictions — from those that are contractual acceptance only. For each, state what the subcontractor must implement and what the prime must monitor. A flowdown accepted but not implemented is the failure mode that shows up in an audit.
7. COMMERCIALLY IMPOSED TERMS. Identify anything in the proposed schedule that is not required by any regulation or by the prime contract but is being imposed as a commercial matter. Say so plainly and separately, so the negotiation is honest and so the subcontractor's pushback can be assessed on the merits.
8. VERIFICATION LIST. Every clause whose current text must be read before the schedule is finalised, with what to check in each: the prescription that governs its use, the flowdown sentence itself, any threshold, and whether it has been amended. Note that clause text and prescriptions are amended regularly and that a schedule reused from a prior contract is likely to be wrong.

RULES
- Ask for the actual clause list and the actual prime contract text. Do not produce a generic flowdown schedule from the contract type alone; if the clause list has not been supplied, say the analysis cannot be completed and explain what is needed.
- Never state a clause number, title, threshold or flowdown requirement you are not confident about. Prefer CANNOT DETERMINE and a verification instruction.
- Do not invent a clause number. If you cannot recall a clause with confidence, describe the subject matter and say the number must be confirmed from the contract.
- Distinguish the governmentwide regulation, the defence supplement, the agency supplement and contract-specific terms explicitly throughout. They are different sources with different scopes.
- Never conclude that a subcontract is compliant. Produce the categorised schedule and route the determination to government contracts counsel.
- Flag any clause implicating export control, sourcing restrictions, safeguarding of information or incident reporting as requiring specialist review, since non-compliance there can carry consequences beyond the contract.
- Where the subcontractor is at a lower tier, note that some flowdowns must continue further down and that the prime remains responsible for the chain.

OUTPUT FORMAT
Eight sections matching the tasks above. Section 2 must be a table with columns: clause number, title, category, basis, and verification note.`,
    example: {
      scenario:
        'A prime on a defence services contract is issuing a purchase order to a commercial software vendor whose engineers include foreign nationals working outside the United States.',
      result:
        'A categorised table separating mandatory from conditional flowdowns with the value threshold applied, a defence-supplement section pulling out the safeguarding and cyber incident reporting clauses as applying despite the commercial nature of the purchase, four clauses flagged for party substitution, an operational list showing which obligations the vendor must actually implement rather than merely accept, three template clauses identified as commercially imposed rather than required, and an export-control referral triggered by the foreign national engineers.',
    },
  },
  {
    id: 'us-nda-reviewer',
    name: 'NDA Reviewer',
    description: 'Reviews a US confidentiality agreement clause by clause and redlines it against a standard position.',
    jurisdiction: 'us',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'nda', 'confidentiality', 'trade-secrets', 'redline', 'intake'],
    sources: [
      { citation: 'Defend Trade Secrets Act of 2016 (18 U.S.C. ch. 90)', authority: 'primary', publisher: 'United States Congress', jurisdiction: 'us', url: 'https://www.congress.gov', note: 'Relied on for the immunity notice an employer must include to preserve exemplary damages and fees against an employee or contractor.' },
      { citation: 'Uniform Trade Secrets Act, as enacted by the States', authority: 'primary', publisher: 'Uniform Law Commission', jurisdiction: 'us', url: 'https://www.uniformlaws.org', note: 'Enacted with variations in nearly every state. The definition of a trade secret and the reasonable-measures requirement are state law.' },
      { citation: 'Securities Exchange Act Rule 21F-17', authority: 'regulator', publisher: 'Securities and Exchange Commission', jurisdiction: 'us', url: 'https://www.sec.gov', note: 'Relied on for the limit on confidentiality terms that impede reporting possible violations of law to a regulator.' },
      { citation: 'Export Administration Regulations and International Traffic in Arms Regulations', authority: 'regulator', publisher: 'Bureau of Industry and Security; Directorate of Defense Trade Controls', jurisdiction: 'us', url: 'https://www.bis.gov', note: 'Relevant only where the information to be disclosed is itself controlled technology.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['global-smart-redline', 'global-contract-triage', 'global-playbook-maker'],
    whatItDoes:
      'Works through a confidentiality agreement in the order the risk actually sits: which direction information flows, how confidential information is defined and marked, what the standard exclusions leave out, how long the obligation runs and whether trade secrets are carved out of that clock, what residuals and feedback clauses quietly license, and whether the remedies and forum match. It separates terms that are genuinely negotiable from those not worth a round trip, drafts replacement language for each issue rather than describing the concern, and flags the statutory notices and carve-outs a US confidentiality agreement is expected to carry.',
    whenToUse:
      'On every inbound NDA before signature, when standardising a mutual template, when a counterparty rejects your form, and when an existing NDA is being reused for a purpose it was not drafted for.',
    inputs: [
      { name: 'Agreement text', description: 'The confidentiality agreement to review, in full.', required: true },
      { name: 'Direction of disclosure', description: 'Whether you are disclosing, receiving, or genuinely both, and in roughly what proportion.', required: true },
      { name: 'Purpose', description: 'The transaction or evaluation the information is being shared for.', required: true },
      { name: 'What will actually be shared', description: 'Categories of information, and whether any is source code, personal data, controlled technology or third-party confidential information.' },
      { name: 'Standard positions', description: 'Your playbook positions on term, residuals, injunctive relief, governing law and forum, if you have them.' },
      { name: 'Relationship context', description: 'Whether an employment, engagement or existing commercial agreement already governs the same information.' },
    ],
    outputs: [
      { name: 'Posture check', description: 'Whether the paper matches the real direction of disclosure, and what changes if it does not.' },
      { name: 'Clause-by-clause table', description: 'Each material term rated acceptable, negotiate or reject, with the reason.' },
      { name: 'Redline', description: 'Replacement wording for every issue rated negotiate or reject.' },
      { name: 'Missing terms', description: 'Protections and statutory notices the draft omits entirely.' },
      { name: 'Fallback positions', description: 'A second and third position for each point likely to draw pushback.' },
      { name: 'Signature checklist', description: 'What must be true before this is signed, including approvals outside legal.' },
    ],
    prompt: `You are a US commercial lawyer reviewing a confidentiality agreement and producing a redline in the reviewing side's interest.

INPUTS
- Agreement text: <paste in full>
- Direction: <are we the disclosing party, the receiving party, or both? in what proportion?>
- Purpose: <the transaction or evaluation this supports>
- What we will actually share: <categories; flag source code, personal data, health data, export-controlled technology, third-party confidential information>
- Our standard positions: <term, residuals, injunctive relief, governing law, forum — or "none">
- Existing relationship: <employment, engagement, master agreement or prior NDA covering the same information>

TASK
1. POSTURE CHECK. Establish who is really disclosing. A mutual NDA used where disclosure runs one way gives the light discloser the benefit of every receiving-party protection it conceded. State whether the paper matches the facts, and if it does not, say which side's protections to strengthen. Note where an existing agreement already covers this information and this NDA would create a second, inconsistent regime over it.
2. DEFINITION AND MARKING. Assess how confidential information is defined. Check whether disclosure must be marked or designated in writing to be protected, whether oral disclosure is covered and on what conditions, and whether a written-confirmation requirement is one the disclosing side will realistically honour. A marking requirement nobody follows is a trap for the party relying on it.
3. EXCLUSIONS. Test the standard exclusions — already public, already known without duty, independently developed, rightfully received from a third party. Check whether independent development requires documentary proof, whether "already known" is limited to information not received under a duty of confidence, and which party bears the burden of establishing an exclusion.
4. COMPELLED DISCLOSURE. Check for a carve-out permitting disclosure required by law, subpoena or regulator, and whether it requires notice to the disclosing party where legally permitted, cooperation in seeking a protective order, and disclosure limited to the part legally required.
5. PERMITTED RECIPIENTS. Who may receive the information — affiliates, employees, contractors, professional advisors, potential financing sources? Is need-to-know required, are recipients bound by equivalent terms, and does the receiving party remain liable for their breach? Flag an unbounded affiliate definition.
6. TERM AND SURVIVAL. Separate the term of the agreement from the duration of the confidentiality obligation. They are different clocks and are routinely conflated. Assess whether the obligation period fits the information's actual half-life, and check whether trade secrets are carved out of any fixed expiry: an obligation that simply expires converts a trade secret into ordinary information and can undercut the reasonable-measures element of a later trade secret claim.
7. RESIDUALS AND FEEDBACK. Identify any residuals clause permitting use of information retained in unaided memory, and any feedback or suggestions clause granting a licence. Both are licences written to look like housekeeping. Quantify what each gives away on these facts, and recommend deletion or narrowing.
8. RETURN AND DESTRUCTION. Check the obligation on termination, whether certification is required, and whether the carve-out for backup and archival copies keeps those copies subject to the confidentiality obligation for as long as they are retained.
9. THE REMAINING TERMS. Cover: no-licence and no-warranty language; any non-solicit, non-compete, standstill or exclusivity riding inside the NDA; injunctive relief and whether it concedes irreparable harm; fee shifting; assignment and change of control; governing law and forum, and whether the chosen forum will actually grant the interim relief the agreement contemplates; notice mechanics; counterparts and electronic signature.
10. MISSING TERMS AND REQUIRED NOTICES. List what is absent, including:
   - The trade secret immunity notice a US employer is expected to include in agreements with employees and contractors that govern the use of trade secrets. Omitting it does not void the agreement, but it forfeits exemplary damages and attorney fees in an action against that individual. Mark the current statutory wording [VERIFY].
   - A carve-out preserving the right to report possible violations of law to a government agency without notice to or approval from the other party. Confidentiality terms that impede protected reporting have drawn regulatory enforcement independently of any dispute between the parties.
   - Where personal data will be shared, a note that an NDA is not a data processing agreement and does not supply the contractual terms a privacy regime requires.
   - Where controlled technology will be shared, a note that a confidentiality obligation does not authorise a deemed export to a foreign person.
11. REDLINE. For every issue rated negotiate or reject, give replacement wording rather than a description of the concern. Then give a fallback and a walk-away position for each point the counterparty is likely to resist.

RULES
- Rate each term from the perspective established in step 1. Do not review a one-way disclosure as though it were mutual.
- Do not flag every deviation from a standard form. Separate what changes the risk from what merely changes the words, and say which is which.
- Where a term is unusual or unenforceable under the governing law chosen, say so rather than negotiating a term that will not hold. State-law variation on trade secret definitions and on injunctive relief is material — mark it [VERIFY] rather than asserting a uniform national rule.
- Never state that an NDA protects information the disclosing party has not otherwise taken reasonable measures to protect. Say what those measures need to be.

OUTPUT FORMAT
Open with a one-line recommendation: sign, sign with changes, or do not sign. Then a clause-by-clause table with columns Clause, Term, Rating, Risk and Proposed change. Then the redline, the missing terms, the fallback positions, and a signature checklist.`,
    example: {
      scenario:
        'A software company receives a customer NDA before a procurement evaluation, on customer paper, described as mutual.',
      result:
        'Flagged that disclosure runs almost entirely one way toward the customer while the agreement grants the customer every receiving-party protection, identified a residuals clause and a feedback licence that would cover the product roadmap being shown, redlined a three-year blanket expiry to carve out trade secrets, and added the protected-reporting carve-out the draft omitted.',
    },
  },
  {
    id: 'us-commercial-lease-reviewer',
    name: 'Commercial Lease Reviewer',
    description: 'Reviews a US commercial lease and surfaces the occupancy cost, exit and restoration terms that drive the deal.',
    jurisdiction: 'us',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'commercial-lease', 'real-estate', 'operating-expenses', 'landlord-tenant'],
    sources: [
      { citation: 'State real property, landlord and tenant statutes', authority: 'primary', publisher: 'State legislatures', jurisdiction: 'us', note: 'Commercial leasing is state law and varies materially on notice, remedies, mitigation, security deposits and guaranties. The state where the premises sit governs much of this whatever the lease says about choice of law.' },
      { citation: 'Americans with Disabilities Act (42 U.S.C. ch. 126) and the accessibility standards issued under it', authority: 'primary', publisher: 'United States Congress; Department of Justice', jurisdiction: 'us', url: 'https://www.ada.gov', note: 'Relied on for allocation of accessibility compliance between landlord and tenant, which the statute itself does not resolve.' },
      { citation: 'Uniform Commercial Code Article 9', authority: 'primary', publisher: 'Uniform Law Commission', jurisdiction: 'us', url: 'https://www.uniformlaws.org', note: 'Relevant where the lease grants a security interest in tenant property or contemplates a fixture filing.' },
      { citation: 'Institutional commercial leasing practice', authority: 'secondary', note: 'Market positions vary by asset class and submarket and are not law. Every market position in the output is a negotiating benchmark, not a legal requirement.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'professional-services'],
    relatedSkills: ['us-auto-renewal-auditor', 'us-contract-obligation-tracker', 'au-retail-lease-reviewer'],
    whatItDoes:
      'Reads a commercial lease the way the cost model reads it rather than the way the document is ordered: what the rent actually becomes across the term once escalations and expense pass-throughs apply, what the tenant can be charged beyond rent, what happens if the space has to be given up early, and what restoration will cost at the end. It builds a total occupancy cost view from the terms as drafted, identifies the clauses that convert a capped obligation into an open-ended one, and reconciles the lease against the letter of intent it was supposed to document.',
    whenToUse:
      'Before signing a new lease or a renewal, when a landlord issues its form after heads of terms are agreed, when an operating expense reconciliation looks wrong, and when planning an exit, sublease or assignment.',
    inputs: [
      { name: 'Lease document', description: 'The lease with every rider, exhibit, work letter and amendment. The exhibits carry most of the money terms.', required: true },
      { name: 'Letter of intent or term sheet', description: 'The agreed commercial terms, so the lease can be tested against what was actually negotiated.', required: true },
      { name: 'Premises and use', description: 'Location and state, rentable area, and what the tenant will actually do in the space.', required: true },
      { name: 'Tenant profile', description: 'Signing entity, credit, whether a guaranty or letter of credit is expected, and headcount plans over the term.' },
      { name: 'Build-out plans', description: 'Improvements contemplated, who performs them, and the allowance offered.' },
      { name: 'Exit expectations', description: 'Likelihood of growth, contraction, sublease or early termination during the term.' },
    ],
    outputs: [
      { name: 'Occupancy cost model', description: 'Year-by-year rent plus estimated pass-throughs as the lease is drafted, with every assumption named.' },
      { name: 'Term sheet reconciliation', description: 'Every place the lease departs from the letter of intent.' },
      { name: 'Open-ended cost clauses', description: 'Terms that turn a capped obligation into an uncapped one, ranked by exposure.' },
      { name: 'Exit and flexibility analysis', description: 'Assignment, sublease, change of control, termination options and holdover, assessed together.' },
      { name: 'End-of-term liability', description: 'Surrender, restoration and removal obligations, and what should be documented now rather than at surrender.' },
      { name: 'Redline priorities', description: 'Proposed changes ranked by value, separating must-have from nice-to-have.' },
      { name: 'Closing checklist', description: 'SNDA, estoppel, insurance certificates, approvals and deliveries required before or at signing.' },
    ],
    prompt: `You are a US commercial real estate lawyer reviewing a lease on behalf of the tenant.

INPUTS
- Lease and all exhibits: <paste, including the work letter, rules and regulations, and any rider>
- Letter of intent or term sheet: <the agreed commercial terms>
- Premises: <address, state, rentable square feet, floor, single or multi-tenant building>
- Use: <what the tenant will actually do in the space>
- Tenant: <signing entity, credit profile, guaranty or letter of credit expected, headcount plans>
- Build-out: <improvements, who performs them, allowance offered>
- Exit expectations: <growth, contraction, sublease or early exit likelihood>

TASK
1. TERM SHEET RECONCILIATION. Compare the lease against the letter of intent line by line and list every departure. Landlord forms routinely drop or narrow agreed concessions. Do this first: it is the highest-yield step and the easiest to win.
2. OCCUPANCY COST MODEL. Build the cost as drafted, year by year:
   - Base rent and every escalation, compounding or not, exactly as the clause reads.
   - Rent commencement against term commencement against delivery, and what happens if delivery is late.
   - Free rent: gross or net of pass-throughs, and whether it is subject to recapture on default.
   - Measurement: how rentable area is defined, whether a load factor applies, and whether remeasurement can raise rent mid-term.
   Mark every figure derived from an estimate as an estimate.
3. OPERATING EXPENSES AND PASS-THROUGHS. This is where the negotiation is won or lost. Assess:
   - The structure: gross, base year, expense stop or triple net. Identify what it actually is, whatever it is called.
   - The inclusion and exclusion lists. Note the exclusions commonly absent: capital expenditures, landlord financing and ground lease costs, leasing commissions and improvement costs for other tenants, marketing, costs reimbursed by insurance or by other tenants, landlord entity overhead, and costs arising from landlord negligence or from a defect the landlord is already obliged to fix.
   - Gross-up: whether expenses are grossed up to a stated occupancy, and why the absence of a gross-up provision harms a base-year tenant in a partly vacant building.
   - Capital expenditure treatment: excluded, amortised over useful life at a stated rate, or passed through in the year incurred.
   - Caps: controllable against uncontrollable expenses, cumulative against non-cumulative, and what sits outside any cap.
   - Audit rights: the window, who may audit, whether contingency-fee auditors are barred, and who pays when an overcharge is found.
   - Taxes: reassessment on a sale of the building, special assessments, and whether the tenant funds a contest it cannot control.
4. USE, EXCLUSIVITY AND OPERATING COVENANTS. Whether the permitted use is broad enough for the business as it will evolve, whether any exclusive is granted to this tenant or any other tenant's exclusive constrains it, and whether there is a continuous operation or co-tenancy provision.
5. CONDITION, MAINTENANCE AND COMPLIANCE. Who repairs and replaces structure, roof, foundation and building systems; whether the tenant can be charged for a replacement in the final years of the term; who bears compliance with laws generally and accessibility requirements specifically, and whether the tenant picks up alterations-triggered compliance for areas beyond its premises. Check for a delivery condition and a systems warranty period.
6. ASSIGNMENT, SUBLEASE AND CHANGE OF CONTROL. Consent standard and whether it is expressly reasonable; recapture rights; profit sharing on a sublease; whether an internal reorganisation, a financing or an equity sale is deemed an assignment; whether the original tenant stays liable after a permitted transfer; and whether transfers to affiliates or successors are permitted without consent.
7. EXIT AND FLEXIBILITY. Termination options and their fees; contraction and expansion rights; rights of first offer or refusal; renewal options and how renewal rent is set, including whether a fair market value mechanism has a workable determination backstop; and holdover — the multiplier, whether it applies to base rent alone or to gross rent, and whether consequential damages are recoverable. Holdover exposure is often the largest single number in the lease.
8. SECURITY AND GUARANTY. Deposit or letter of credit amount, burn-down schedule, draw conditions, and treatment on a sale of the building. Any parent or personal guaranty: its cap, its termination triggers, and whether it survives an assignment.
9. CASUALTY, CONDEMNATION AND SUBORDINATION. Termination thresholds and whose right they are, rent abatement, the landlord's restoration obligation, and whether the tenant may terminate if restoration runs long. Subordination: whether a subordination, non-disturbance and attornment agreement is required and from whom, and what happens on a foreclosure without one.
10. INSURANCE AND RISK ALLOCATION. Required coverages and limits against what the tenant carries today, additional insured requirements, waiver of subrogation, and the indemnity — whether it is mutual and whether it reaches the landlord's own negligence.
11. END OF TERM. Surrender condition, removal of alterations and cabling, whether the landlord must designate at approval time which improvements must come out, and restoration of any specialty installation. Recommend obtaining that designation in writing when each alteration is approved: deferring it to the end of the term is what makes restoration expensive.
12. DEFAULT AND REMEDIES. Notice and cure periods for monetary and non-monetary default, whether the tenant has any notice and cure right for landlord default, acceleration, mitigation obligations under the law of the state where the premises sit, late fees and default interest, and any waiver of jury trial or of the right to counterclaim.
13. REDLINE PRIORITIES. Rank the proposed changes by value, separating must-have from nice-to-have, and give replacement wording for the must-haves.

RULES
- Real property is governed by the law of the state where the premises are located. Where an issue turns on state law — notice, remedies, mitigation, deposit treatment, guaranty enforceability — say so and mark it [VERIFY] rather than stating a national rule.
- Market positions are benchmarks, not law, and vary by asset class and submarket. Label them as market commentary and never as legal requirements.
- Read the exhibits. The work letter, the rules and regulations and the expense exhibit carry terms that contradict the body of the lease. Where they conflict, say which controls under the order-of-precedence clause, or note that the lease has none.
- Do not present the occupancy cost model as a forecast. It is the lease applied to stated assumptions; name every assumption.

OUTPUT FORMAT
Open with the five terms that most need to change and why. Then the sections above in order, with tables for the cost model, the term sheet reconciliation and the redline priorities, closing with the closing checklist.`,
    example: {
      scenario:
        'A growing services firm receives the landlord form for a seven-year office lease after agreeing heads of terms.',
      result:
        'Four concessions from the letter of intent found to be missing or narrowed in the lease, a base-year structure identified as having no gross-up provision and no cap on controllable expenses, holdover priced at double gross rent plus consequential damages flagged as the largest single exposure, and a recommendation to fix restoration scope in writing at each alteration approval rather than at surrender.',
    },
  },
];
