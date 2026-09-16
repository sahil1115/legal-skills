import type { Skill } from '../../../types/skill';

/**
 * UK employment skills — tribunal exposure, transfers and off-payroll working.
 */
export const ukEmploymentSkills: Skill[] = [
  {
    id: 'uk-employment-tribunal-risk',
    name: 'Employment Tribunal Risk Assessor',
    description: 'Assesses a UK dismissal against unfair dismissal and discrimination exposure before it is confirmed.',
    jurisdiction: 'uk',
    category: 'employment',
    tags: ['workforce', 'assessment', 'unfair-dismissal', 'employment-tribunal', 'discrimination', 'equality-act', 'termination'],
    sources: [
      { citation: 'Employment Rights Act 1996', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the qualifying period, the potentially fair reasons, the reasonableness test and the automatically unfair categories.' },
      { citation: 'Equality Act 2010', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the protected characteristics and the forms of discrimination, which carry no qualifying period and no compensation cap.' },
      { citation: 'Acas Code of Practice on Disciplinary and Grievance Procedures', authority: 'regulator', publisher: 'Advisory, Conciliation and Arbitration Service', jurisdiction: 'uk', url: 'https://www.acas.org.uk', note: 'Unreasonable failure to follow the Code allows a tribunal to adjust compensation. The Code is not itself law but the adjustment is statutory.' },
      { citation: 'Employment Tribunals Rules of Procedure', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the time limits and the early conciliation requirement.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-tupe-assessor', 'us-separation-agreement-reviewer', 'au-unfair-dismissal-assessor'],
    whatItDoes:
      'Runs a proposed or completed dismissal through the two regimes that operate on entirely different rules: ordinary unfair dismissal, which needs a qualifying period and is capped, and discrimination, which needs neither and is not. It settles eligibility, identifies the potentially fair reason relied on and tests whether the decision and the procedure fell within the band of reasonable responses, checks the automatically unfair categories that bypass the qualifying period altogether, and assesses Acas Code compliance because an unreasonable failure adjusts whatever the tribunal awards.',
    whenToUse:
      'Before a dismissal is confirmed, when a grievance or appeal has been received, when planning a redundancy exercise, and when an early conciliation notification or a claim has arrived and the response is being prepared.',
    inputs: [
      { name: 'Employment details', description: 'Start date, continuous service, role, and whether the person is an employee, worker or contractor.', required: true },
      { name: 'Reason for dismissal', description: 'The reason relied on, and any other reason that in fact influenced the decision.', required: true },
      { name: 'Procedure followed', description: 'Investigation, allegations put in writing, hearings, right to be accompanied, appeal, and the documents at each stage.', required: true },
      { name: 'Protected characteristics', description: 'Any characteristic in play, including disability, and whether any adjustment was requested or made.' },
      { name: 'Protected acts', description: 'Whistleblowing disclosures, health and safety concerns, statutory rights asserted, family leave, or a prior complaint.' },
      { name: 'Comparators and context', description: 'How comparable cases were handled, and any earlier warnings or performance record.' },
    ],
    outputs: [
      { name: 'Eligibility analysis', description: 'Whether an ordinary unfair dismissal claim can be brought at all, and which claims bypass that question.' },
      { name: 'Fair reason and reasonableness', description: 'The reason tested against the statutory categories and the band of reasonable responses.' },
      { name: 'Procedural audit', description: 'Each step against the Acas Code, with the compensation adjustment exposure quantified as a range.' },
      { name: 'Discrimination exposure', description: 'Each form of discrimination assessed separately, including the shifting burden of proof.' },
      { name: 'Automatic unfairness check', description: 'The categories that require no qualifying period, screened against the facts.' },
      { name: 'Remedy and value range', description: 'Basic and compensatory awards, the caps that apply, and the heads of loss that are uncapped.' },
      { name: 'Remediation plan', description: 'What to fix before dismissing, or what to document now if the dismissal has happened.' },
    ],
    prompt: `You are a UK employment lawyer assessing tribunal exposure arising from a dismissal.

INPUTS
- Employment: <start date, continuous service, role, employee or worker or contractor, part-time or fixed-term>
- Reason relied on: <the stated reason, and any other reason that in fact influenced the decision>
- Procedure: <investigation, allegations put in writing, hearing dates, right to be accompanied, decision maker, appeal and who heard it>
- Protected characteristics: <any in play; for disability, the impairment, its duration and effect, and any adjustment requested or made>
- Protected acts: <whistleblowing disclosure, health and safety concern, statutory right asserted, family leave, prior grievance or claim>
- Context: <comparable cases and how they were handled, prior warnings, performance record>

TASK
1. STATUS AND ELIGIBILITY. Establish employment status first, since worker and contractor status changes which claims exist. Then determine continuous service and whether the qualifying period for ordinary unfair dismissal is met. Mark the qualifying period [VERIFY] — it has been the subject of reform. State plainly that discrimination claims and the automatically unfair categories need no qualifying period, so a short-service dismissal is not a low-risk dismissal.
2. AUTOMATIC UNFAIRNESS SCREEN. Do this before the merits, because it disposes of the qualifying period. Screen the facts against the categories that make a dismissal automatically unfair, including dismissal for making a protected disclosure, for asserting a statutory right, for health and safety reasons, for pregnancy or family leave, for trade union membership or activities, and in connection with a relevant transfer. Where one is arguable, say so and note that some of these carry uncapped compensation.
3. FAIR REASON. Identify which potentially fair reason is relied on — capability or qualifications, conduct, redundancy, statutory restriction, or some other substantial reason — and test whether the evidence supports it. Note that the employer must show the reason, and that a reason constructed after the decision rarely survives. Where redundancy is relied on, test whether a genuine redundancy situation exists, whether the pool was defined defensibly, whether selection criteria were objective and fairly applied, whether individual consultation happened before the decision was settled, and whether alternative employment was properly considered. Where twenty or more redundancies are proposed at one establishment, address collective consultation obligations and the protective award separately.
4. REASONABLENESS. Apply the band of reasonable responses to both the decision and the procedure. For conduct dismissals, work through whether the employer genuinely believed in the misconduct, whether that belief rested on reasonable grounds, and whether a reasonable investigation preceded it. Assess consistency against how comparable cases were handled. Do not substitute your own view of what you would have decided — the test is whether the decision fell within the range a reasonable employer could have reached.
5. ACAS CODE AUDIT. Go through the Code step by step: whether the issue was investigated, whether the allegations were set out in writing, whether the employee was given the evidence in advance, whether a meeting was held before the decision, whether the right to be accompanied was offered, whether the decision was communicated in writing, and whether an appeal was offered and heard by someone not previously involved. For each failure, state whether it is a breach of the Code or merely of good practice, and quantify the compensation adjustment exposure as a range, marking the maximum percentage [VERIFY].
6. DISCRIMINATION. Assess each relevant form separately rather than as one claim: direct discrimination, indirect discrimination, harassment, victimisation, and for disability both discrimination arising from disability and the duty to make reasonable adjustments. For disability, address whether the definition is met and whether the employer knew or ought reasonably to have known. Explain the shifting burden of proof: once facts are shown from which a tribunal could conclude discrimination occurred, it is for the employer to show a non-discriminatory explanation. Note there is no qualifying period, no cap on compensation, and injury to feelings is recoverable in bands — mark the bands [VERIFY].
7. OTHER CLAIMS. Screen for wrongful dismissal and notice pay, unlawful deduction from wages, holiday pay, breach of contract, constructive dismissal where resignation is in play, and any contractual procedure that was not followed and may itself be actionable.
8. TIME LIMITS AND PROCESS. State the primary limitation period, that it runs from the effective date of termination, how early conciliation extends it, and the discretion available to extend. Mark the periods [VERIFY]. Note that the limitation rules differ between unfair dismissal and discrimination, including the treatment of continuing acts.
9. VALUE. Give a range rather than a figure. Cover the basic award and how it is calculated, the compensatory award and the cap that applies to it, the uncapped categories, notice, and discrimination compensation including injury to feelings. Identify the drivers: length of service, age, mitigation, contributory fault, the possibility that a fair procedure would have led to the same outcome, and the Acas adjustment. Mark every cap and figure [VERIFY].
10. RECOMMENDATION. If the dismissal has not happened, list what to do first, in order. If it has, list what to document now, what not to do, and whether a protected conversation or a settlement agreement should be considered — noting that the without prejudice rule requires an existing dispute and that the separate pre-termination negotiation protection does not apply to discrimination claims.

RULES
- Assess unfair dismissal and discrimination separately throughout. They have different eligibility rules, different burdens, different time limits and different caps, and merging them produces advice that is wrong about both.
- Never treat short service as low risk without running the automatic unfairness and discrimination screens.
- Apply the band of reasonable responses rather than your own judgement of the right outcome.
- Caps, bands, qualifying periods and time limits change and are uprated. Give the structure, mark every figure [VERIFY], and do not state one from memory as settled.
- Where the real reason differs from the stated reason, say so. That gap is where most of these cases are lost.

OUTPUT FORMAT
Open with a risk rating for each regime and the single most important next step. Then the sections above, with a table for the Acas audit and a dated list of time limits.`,
    example: {
      scenario:
        'An employer plans to dismiss an employee with fourteen months service for poor performance shortly after they disclosed a long-term health condition.',
      result:
        'Ordinary unfair dismissal available on the service position with the qualifying period flagged for verification, no written allegations or appeal offered so two Acas Code breaches identified with the adjustment exposure quantified, and a finding that the health disclosure raised a disability discrimination claim carrying no qualifying period and no cap — with a recommendation to pause, assess whether the definition is met, and consider adjustments before any decision.',
    },
  },
  {
    id: 'uk-tupe-assessor',
    name: 'TUPE Transfer Assessor',
    description: 'Tests whether TUPE applies to a transaction and maps the resulting information and consultation duties.',
    jurisdiction: 'uk',
    category: 'employment',
    tags: ['workforce', 'assessment', 'tupe', 'outsourcing', 'service-provision-change', 'consultation', 'transfer'],
    sources: [
      { citation: 'Transfer of Undertakings (Protection of Employment) Regulations 2006', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the two routes into a relevant transfer, the transfer of liabilities, the restrictions on dismissal and variation, and the information and consultation duties.' },
      { citation: 'Employment Rights Act 1996', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the underlying unfair dismissal framework that a transfer-connected dismissal is assessed against.' },
      { citation: 'Acas guidance on handling TUPE transfers', authority: 'guidance', publisher: 'Advisory, Conciliation and Arbitration Service', jurisdiction: 'uk', url: 'https://www.acas.org.uk' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['professional-services', 'public-sector', 'technology'],
    relatedSkills: ['uk-employment-tribunal-risk', 'global-obligation-extraction'],
    whatItDoes:
      'Answers the question the rest of a deal depends on: whether the transaction is a relevant transfer, by either the business transfer route or the service provision change route, which have different tests and are commonly confused. It then identifies which employees actually transfer, what liabilities move with them and what stays behind, what can and cannot be changed after the transfer, and what the information and consultation obligations require and by when — because the protective award for failing them is calculated per employee and is not compensatory.',
    whenToUse:
      'At the earliest stage of an outsourcing, insourcing, retender, service change or business sale, before employees are told anything, and when a client or incumbent supplier asserts that TUPE does or does not apply.',
    inputs: [
      { name: 'Transaction description', description: 'What is being bought, outsourced, insourced or retendered, and the intended structure and timing.', required: true },
      { name: 'Activities before and after', description: 'What work is done now, by whom, and how it will be done after the change.', required: true },
      { name: 'Workforce details', description: 'Who performs the activities, how much of their time is spent on them, and their contractual terms.', required: true },
      { name: 'Organised grouping', description: 'Whether there is a team deliberately organised around the client or activity, or work spread across many people.' },
      { name: 'Contract documents', description: 'The service contract, tender documents, and any TUPE indemnities or warranties.' },
      { name: 'Representative arrangements', description: 'Whether a recognised union or existing employee representatives are in place.' },
    ],
    outputs: [
      { name: 'Transfer determination', description: 'Whether TUPE applies, by which route, and the reasoning on each limb of the test.' },
      { name: 'In-scope employee list', description: 'Who transfers and who does not, with the assignment analysis for borderline cases.' },
      { name: 'Liability map', description: 'What passes to the transferee, what remains with the transferor, and what is excluded.' },
      { name: 'Consultation plan', description: 'The information and consultation duties, who they are owed to, and a dated timetable.' },
      { name: 'Measures schedule', description: 'The envisaged measures that must be notified, drafted in the form they will be given.' },
      { name: 'Variation and dismissal analysis', description: 'What can be changed or done after the transfer, and what is void or automatically unfair.' },
      { name: 'Indemnity checklist', description: 'The protections to negotiate into the transaction documents on each side.' },
    ],
    prompt: `You are a UK employment lawyer advising on whether a transaction is a relevant transfer under TUPE and what follows if it is.

INPUTS
- Transaction: <what is being bought, outsourced, insourced or retendered; intended structure and timing>
- Activities before: <what work is done now, by whom, using what assets>
- Activities after: <how the work will be done after the change; will it be fragmented across suppliers or sites?>
- Workforce: <who performs the activities, percentage of time each spends on them, contractual terms, any mobility clause>
- Organised grouping: <is there a team deliberately organised around this client or activity?>
- Documents: <service contract, tender documents, existing TUPE indemnities or warranties>
- Representatives: <recognised union, existing employee representatives, or none>

TASK
1. TRANSFER DETERMINATION. Test both routes separately and say which, if either, applies:
   a. BUSINESS TRANSFER: is there a transfer of an economic entity which retains its identity, meaning an organised grouping of resources with the objective of pursuing an economic activity? Address whether the entity is labour-intensive or asset-reliant, since that changes what matters — for a labour-intensive entity, whether a major part of the workforce is taken on is central, and for an asset-reliant one, whether the assets transfer.
   b. SERVICE PROVISION CHANGE: is there an outsourcing, a retender to a new supplier, or an insourcing? Work through each condition: that immediately before the change there was an organised grouping of employees whose principal purpose was carrying out the activities for that client; that the client intends the activities to continue; that the activities after the change are fundamentally the same; and that this is not a single specific event or task of short-term duration, nor a supply of goods for the client's use.
   State the conclusion as APPLIES, DOES NOT APPLY or UNCERTAIN. Where uncertain, identify the fact that would settle it and advise proceeding on the basis that it applies, since the cost of being wrong falls almost entirely on the party that assumed it did not.
2. FRAGMENTATION. Where the activities will be split between several suppliers or brought partly in house, address whether that defeats the service provision change or produces multiple transfers, and how employees would be apportioned. This is the most common way a transfer analysis goes wrong.
3. WHO TRANSFERS. Identify the employees assigned to the organised grouping immediately before the transfer. Assignment is not the same as spending time on the work: address permanence, proportion of time, contractual terms, cost allocation and how the parties themselves have treated the role. Deal with employees on long-term absence, maternity or other family leave, those on notice, agency workers, and genuinely self-employed contractors. Flag any employee whose assignment is arguable and say which way the argument runs.
4. LIABILITY MAP. Set out what passes to the transferee: contracts of employment and the terms in them, continuity of service, and liabilities connected with them including accrued holiday, unpaid wages, outstanding grievances, existing claims, and liability for acts done before the transfer including discrimination. Then set out what does not pass, addressing occupational pension rights and the narrower obligations that do transfer, and criminal liabilities. Identify the practical items that must be reconciled: benefits that cannot be replicated, share plans, and any collective agreement.
5. INFORMATION AND CONSULTATION. This is where the money is lost, because the award is per affected employee and is punitive rather than compensatory. Set out:
   - Who must be informed: representatives of affected employees, which can include employees of either party who are not transferring but are affected.
   - What must be provided: the fact of the transfer, when and why, the legal, economic and social implications, and the measures envisaged — or confirmation that none are.
   - When: long enough before the transfer to allow consultation to take place, which is a substantive requirement rather than a fixed period.
   - Who to consult with: a recognised union, existing representatives, or newly elected representatives, and the election requirements if none exist. Address the narrow exception permitting direct consultation with employees, and mark its conditions [VERIFY] since they have been amended.
   - The obligation to consult where measures are envisaged, with a view to seeking agreement.
   - Employee liability information from transferor to transferee, what it must contain, and the deadline before the transfer.
   Produce a dated timetable working backwards from the transfer date, and state the protective award exposure per employee, marked [VERIFY].
6. MEASURES. Draft the measures schedule in the form it will actually be given. A measure is any action, step or arrangement affecting employees — relocation, reporting line changes, payroll or benefit changes, harmonisation plans, redundancies. Saying no measures are envisaged when some are is a breach in itself.
7. VARIATION AND DISMISSAL. Explain what cannot be done: a variation is void where the sole or principal reason is the transfer, and a dismissal is automatically unfair on the same test. Then explain what can: variations where the reason is an economic, technical or organisational reason entailing changes in the workforce, variations permitted by the contract itself, and the position for a transferor in insolvency proceedings. Address harmonisation directly, since it is the change employers most want and the one most likely to be void even when employees agree and even long after the transfer. For any dismissal, work through whether an ETO reason genuinely exists and whether a fair procedure was followed on top of it.
8. INDEMNITIES. List the protections each side should negotiate: transferee indemnities for pre-transfer liabilities and for failures in information and consultation, transferor indemnities for post-transfer conduct, warranties on the accuracy of employee liability information and on the absence of undisclosed changes to terms in the run-up, conduct provisions, and a mechanism for objecting employees and unexpected transferees.

RULES
- Test both routes. A transaction that is not a business transfer may still be a service provision change, and the two tests share almost nothing.
- Never advise that TUPE does not apply without identifying which limb fails and why. An unreasoned negative is the highest-risk output in this area.
- Treat the consultation timetable as the binding constraint on the deal timetable, not the other way round.
- Do not describe harmonisation as achievable through employee consent. Consent does not cure a variation whose principal reason is the transfer.
- Mark periods, penalties and the direct-consultation exception [VERIFY]. This area has been amended and the details must be confirmed.

OUTPUT FORMAT
Open with the transfer determination and the date consultation must begin. Then the sections above, with a table for the in-scope employee analysis, the dated consultation timetable, and the measures schedule as usable text.`,
    example: {
      scenario:
        'A company plans to move its facilities management from an incumbent supplier to two new suppliers, splitting the work by site.',
      result:
        'Service provision change analysis run on each site separately, with one site found to be a clear transfer and the other at risk of defeating the test through fragmentation, eleven employees identified as assigned with three borderline cases reasoned both ways, a dated consultation timetable that moved the go-live back by three weeks, and a measures schedule covering the reporting line and payroll changes the client had not treated as measures.',
    },
  },
  {
    id: 'uk-ir35-status-assessor',
    name: 'IR35 Status Determination Builder',
    description: 'Assesses off-payroll working status and builds a defensible status determination statement.',
    jurisdiction: 'uk',
    category: 'employment',
    tags: ['workforce', 'assessment', 'worker-classification', 'independent-contractor', 'ir35', 'off-payroll', 'status-determination'],
    sources: [
      { citation: 'Income Tax (Earnings and Pensions) Act 2003, Part 2 Chapters 8 and 10', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Chapter 10 places the determination and, in most cases, the liability on the client for medium and large organisations and public authorities. Chapter 8 continues to apply where the client is small, leaving the intermediary responsible.' },
      { citation: 'Case law on employment status', authority: 'primary', publisher: 'UK courts and tribunals', jurisdiction: 'uk', note: 'Status is determined by the hypothetical contract and the whole picture, drawn from decided cases rather than from any statutory test. The tax and employment law tests are related but not identical, and a person can be a contractor for one and not the other.' },
      { citation: 'HMRC Employment Status Manual and off-payroll working guidance', authority: 'guidance', publisher: 'HM Revenue and Customs', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'Sets out HMRC practice, the status determination statement requirements and the client-led disagreement process. Guidance is persuasive, not binding, and the CEST tool output is not determinative.' },
      { citation: 'Companies Act 2006', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the definition of a small company, which determines whether the client or the intermediary carries the obligation.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'technology', 'professional-services', 'public-sector'],
    relatedSkills: ['eu-platform-work-status-assessor', 'us-worker-classification', 'uk-employment-tribunal-risk'],
    whatItDoes:
      'Works out who carries the off-payroll obligation before assessing anything, because that turns on the size of the client and determines whether the client or the intermediary bears the liability. It then constructs the hypothetical contract between the worker and the client — which is what the test actually applies to, not the contract anyone signed — assesses it against the status factors on the working practices rather than the paperwork, and produces a status determination statement with reasons capable of surviving challenge rather than a bare conclusion.',
    whenToUse:
      'Before engaging any contractor through an intermediary, when a role or working practice changes mid-engagement, when a contractor disputes a determination, when reviewing an existing contractor population, and on any HMRC compliance check.',
    inputs: [
      { name: 'Engagement structure', description: 'The chain from client to worker, including any agency, umbrella or personal service company.', required: true },
      { name: 'Client size', description: 'Turnover, balance sheet total and headcount, and whether the client is a public authority.', required: true },
      { name: 'Working practices', description: 'How the work is really carried out, as opposed to what the contract says.', required: true },
      { name: 'Contract documents', description: 'The upper and lower level contracts in the chain, and any statement of work.' },
      { name: 'Substitution and control', description: 'Whether a substitute has ever been used, who directs the work, and who decides how it is done.' },
      { name: 'Integration facts', description: 'Equipment, systems access, team position, financial risk borne, and other concurrent clients.' },
    ],
    outputs: [
      { name: 'Regime determination', description: 'Which chapter applies, who must determine status, and who bears the liability.' },
      { name: 'Hypothetical contract', description: 'The notional direct contract constructed from the chain and the actual practices.' },
      { name: 'Status factor analysis', description: 'Each factor weighed with the evidence, not asserted.' },
      { name: 'Status determination statement', description: 'A drafted statement giving the conclusion and the reasons for it.' },
      { name: 'Evidence file', description: 'What must be retained to support the determination if challenged.' },
      { name: 'Disagreement process', description: 'The client-led process, its deadline and the consequence of not operating it.' },
      { name: 'Exposure and adjacent risk', description: 'Tax and National Insurance exposure, and the separate employment rights claim the same facts can support.' },
    ],
    prompt: `You are a UK employment tax specialist producing an off-payroll working status assessment and determination.

INPUTS
- Chain: <client, any agency or managed service provider, umbrella, personal service company, and the worker; identify the fee-payer — the entity paying the worker's intermediary>
- Client size: <turnover, balance sheet total, employee numbers; is the client a public authority? is it part of a group?>
- The role: <what the worker does, the deliverable or the function, expected duration, and whether the role pre-existed>
- Working practices: <how work is allocated day to day, who says what to do and how, hours and location, whether the worker attends internal meetings or appraisals, how performance is addressed>
- Substitution: <does the contract permit a substitute? is it fettered by client approval? has one ever been used? who would pay them?>
- Financial and integration: <who provides equipment and systems, is the worker paid by time or by deliverable, do they correct defects at their own cost, do they carry insurance, do they work for other clients concurrently, do they appear in internal directories or manage staff>
- Contracts: <upper-level and lower-level contracts, statement of work>

TASK
1. REGIME AND RESPONSIBILITY. Settle this first, because it determines who is exposed. Apply the small company test to the client using turnover, balance sheet total and employee numbers, and address group aggregation and the rules for when a change in size takes effect. Mark the thresholds [VERIFY]. If the client is medium or large, or is a public authority, the client must determine status and the fee-payer generally accounts for tax and National Insurance, with liability able to transfer up the chain where a party fails in its obligations. If the client is small, the older regime continues to apply and responsibility stays with the intermediary. State plainly which applies, who must produce the determination, and who carries the liability, including the position of any offshore party in the chain.
2. THE HYPOTHETICAL CONTRACT. State the central point that most assessments get wrong: the test is not applied to the written contract between the client and the intermediary, nor to the contract between the intermediary and the worker. It is applied to a notional contract constructed as if the worker had contracted directly with the client, built from the terms across the whole chain and from what actually happens. Construct that hypothetical contract here, and identify any term in the written documents that the working practices contradict — where they conflict, the practices prevail.
3. STATUS FACTOR ANALYSIS. Weigh each factor with the evidence, and do not assert conclusions:
   - PERSONAL SERVICE AND SUBSTITUTION. Is there a genuine and unfettered right of substitution? A right subject to client approval may still count if approval cannot be unreasonably withheld, but a right that is fettered in practice, never exercised, or commercially unrealistic carries little weight. Ask who would pay the substitute — payment by the intermediary points away from employment. Treat a clause inserted solely to influence status as weak evidence.
   - CONTROL. Examine control over what, how, when and where. What matters most is control over the manner of performance. A highly skilled worker whom nobody could direct technically is not automatically outside the regime — look for the right of control rather than its exercise, and for control over hours, location, priorities and reallocation to other tasks.
   - MUTUALITY OF OBLIGATION. Is there an obligation to offer work and to accept it during the engagement? Address this carefully rather than mechanically: the irreducible minimum of obligation is usually present within any engagement where work is done for pay, so mutuality rarely decides the question on its own, and an assessment resting mainly on it is fragile.
   - OTHER FACTORS. Financial risk and the opportunity to profit from sound management, provision of equipment, whether defects are corrected at the worker's own cost and time, integration into the organisation, whether the worker is in effect part and parcel of it, exclusivity and concurrent engagements, length and pattern of engagement, employee-type benefits, and how the parties described the relationship — which carries weight only where the other factors are finely balanced.
   Produce a table with columns Factor, Evidence, Points toward, Weight.
4. OVERALL CONCLUSION. Stand back and assess the whole picture rather than counting factors. State the conclusion as inside or outside the off-payroll rules, and state the confidence level honestly. Where the position is borderline, say so and identify precisely which facts would move it either way. Do not present a borderline case as clear-cut in either direction.
5. USE OF THE CHECKING TOOL. Where HMRC's check employment status for tax tool has been used, treat it as an input rather than an answer. Note that its result is only as good as the inputs and that HMRC stands behind it only where the information given is accurate and the working practices match. Identify any question where the answer given does not match the facts established above, since a mismatch removes whatever comfort the output provided. Record that an undetermined output is not a conclusion and requires a reasoned assessment.
6. STATUS DETERMINATION STATEMENT. Draft the statement. It must state the conclusion and give the reasons for it, and it must be passed to the worker and to the next party in the chain. State plainly that a determination without reasons, or one issued without reasonable care, is treated as not having been made at all — with the consequence that liability stays with the client. Address blanket determinations directly: determining an entire population as inside without individual assessment fails the reasonable care requirement, and role-based determinations are defensible only where the working practices are genuinely uniform and that uniformity is evidenced.
7. DISAGREEMENT PROCESS. Set out the client-led disagreement process: the worker or fee-payer may make representations, the client must consider them and respond within the prescribed period with either a new determination or reasons for maintaining the existing one, and failing to respond within the period shifts liability to the client. Mark the period [VERIFY]. Confirm whether a process exists, who operates it, and whether it is genuinely capable of changing an outcome.
8. EVIDENCE FILE. Specify what to retain: the determination and its reasons, the completed assessment and its inputs, the contracts across the chain, the statement of work, evidence of the actual working practices, any substitution evidence, the tool output if used, records of representations and responses, and the date of each review. Recommend re-assessment when the role, the working practices or the chain changes, and note that a determination made at the outset and never revisited is weak evidence for a long engagement.
9. EXPOSURE AND ADJACENT RISK. Set out the tax exposure structurally — income tax, National Insurance for both parties, apprenticeship levy where relevant, interest and penalties, the behaviour-based penalty range, and the offset available for tax already paid by the worker or intermediary, which materially reduces but does not eliminate the liability. Mark figures [VERIFY]. Then flag the separate and commonly overlooked risk: the same working practices can support an employment tribunal claim for worker or employee status, which carries holiday pay, minimum wage, pension and unfair dismissal exposure and is decided under a related but distinct test by a different forum. A determination that the engagement is inside the rules for tax does not create employment rights, but the facts that produced it will be used to argue for them.

RULES
- Establish who carries the obligation before assessing status. The answer differs entirely depending on whether the client is small.
- Apply the test to the hypothetical contract, never to the written contract alone.
- Where the written terms and the working practices differ, the practices prevail. Say so explicitly whenever they diverge.
- Never treat the checking tool output as the determination, and never accept an input to it that contradicts the established facts.
- Blanket and unreasoned determinations fail the reasonable care requirement and leave liability with the client. Do not produce one.
- Do not treat a substitution clause as decisive where it has never been and realistically could not be used.
- Mark size thresholds, the disagreement response period and penalty levels [VERIFY].

OUTPUT FORMAT
Open with who must determine status, who bears liability, and the conclusion with its confidence level. Then the sections above, with the status factor table, the drafted determination statement as usable text, and the evidence file as a checklist.`,
    example: {
      scenario:
        'A financial services client reviews a long-running contractor engaged through a personal service company via an agency, relying on a substitution clause and an outside-scope tool result.',
      result:
        'Client confirmed medium-sized so the determination and fee-payer obligations applied, the hypothetical contract constructed across the agency chain showing control over hours and priorities inconsistent with the written terms, the substitution right assessed as weak because client approval was unfettered in the contract but absolute in practice and no substitute had ever been proposed, the tool result discounted because two inputs contradicted the established practices, the conclusion reached as inside the rules with a reasoned determination statement drafted, and the same facts flagged as supporting a separate worker-status claim for holiday pay.',
    },
  },
  {
    id: 'uk-worker-protection-harassment-audit',
    name: 'Sexual Harassment Prevention Duty Audit',
    description: 'Audits an employer against the UK duty to prevent sexual harassment, including the strengthened standard.',
    jurisdiction: 'uk',
    category: 'employment',
    tags: ['workforce', 'programme-design', 'sexual-harassment', 'equality-act', 'third-party-harassment', 'risk-assessment'],
    sources: [
      { citation: 'Equality Act 2010, section 40A as inserted by the Worker Protection (Amendment of Equality Act 2010) Act 2023', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'In force since 26 October 2024: a duty to take reasonable steps to prevent sexual harassment of employees, with an uplift of compensation where it is breached.' },
      { citation: 'Employment Rights Act 2025, provisions on harassment', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Strengthens the duty to all reasonable steps and adds a duty not to permit third-party harassment, from 30 October 2026 as stated in government guidance. Confirm the commencement regulations.' },
      { citation: 'EHRC technical guidance on sexual harassment and harassment at work', authority: 'regulator', publisher: 'Equality and Human Rights Commission', jurisdiction: 'uk', url: 'https://www.equalityhumanrights.com', note: 'The regulator’s guidance on what reasonable steps look like. The EHRC can take enforcement action on the preventative duty.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-employment-tribunal-risk', 'uk-fca-conduct-breach-notification-triage', 'eu-whistleblowing-channel-checker'],
    whatItDoes:
      'Audits an employer’s systems against the preventative duty as it stands today and as it will stand once the strengthened standard applies, side by side, because the test changes from reasonable steps to all reasonable steps and adds third-party harassment. It works from a documented risk assessment of the workplace, then tests policy, training, reporting routes, handling, third-party controls, leadership and monitoring against the regulator’s guidance, and produces a gap list ranked by the difference each fix makes to the defensibility of the employer’s position.',
    whenToUse:
      'Now, ahead of the strengthened duty; at annual review of harassment prevention; after a complaint or incident; when employees deal with customers, clients or the public; and when preparing for a regulator or tribunal scrutiny of prevention measures. Not for: deciding an individual grievance or disciplinary outcome, or regulated-firm conduct rules notifications (use the FCA conduct skill).',
    inputs: [
      { name: 'Organisation profile', description: 'Size, sectors, workforce composition, working patterns and locations.', required: true },
      { name: 'Risk factors', description: 'Customer-facing roles, lone or night working, alcohol at events, power imbalances and prior incidents.', required: true },
      { name: 'Current measures', description: 'Policy, training, reporting routes, investigation process, third-party controls and monitoring data.', required: true },
      { name: 'Incident data', description: 'Complaints, outcomes, exit interview themes and survey results.' },
      { name: 'Leadership and governance', description: 'Who owns the duty and what reaches the board.' },
    ],
    outputs: [
      { name: 'Standard map', description: 'The current standard and the strengthened standard with their dates, verified.' },
      { name: 'Workplace risk assessment', description: 'Sexual harassment risks by role, setting and third-party exposure.' },
      { name: 'Two-standard gap analysis', description: 'Each control assessed against reasonable steps and against all reasonable steps.' },
      { name: 'Third-party harassment plan', description: 'Controls for customers, clients, contractors and the public.' },
      { name: 'Remediation plan', description: 'Ranked actions with owners and dates before the strengthened duty applies.' },
      { name: 'Evidence file', description: 'What to keep to demonstrate the steps taken.' },
    ],
    prompt: `You are a UK employment lawyer auditing an employer's compliance with the preventative duty on sexual harassment.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- A duty on employers to take reasonable steps to prevent sexual harassment of their employees, in force since 26 October 2024, with a compensation uplift in successful harassment claims where the duty is breached and EHRC enforcement powers [CONFIRMED].
Scheduled:
- Under the Employment Rights Act 2025, the duty becomes all reasonable steps, and employers must not permit third parties to harass employees where they failed to take all reasonable steps to prevent it, from 30 October 2026 per government guidance [CONFIRMED as stated; VERIFY commencement regulations].
- Regulations may specify steps that are to be regarded as reasonable [VERIFY whether made and their content].

INPUTS
- Organisation: <size, sectors, workforce, working patterns, locations>
- Risk factors: <customer-facing roles, lone or night working, alcohol, power imbalances, prior incidents>
- Current measures: <policy, training, reporting, investigations, third-party controls, monitoring>
- Incident data: <complaints, outcomes, exit themes, surveys>
- Leadership: <owner and board reporting>

TASK
1. SCOPE GATE. Confirm the audit concerns employees of an employer in Great Britain under the Equality Act. For Northern Ireland, stop and apply its separate legislation.
2. STANDARD MAP. Confirm on official sources which standard applies on the audit date and the date the strengthened standard applies. Assess against both where the audit date precedes the change.
3. MISSING INFORMATION. Identify whether a risk assessment exists. Regulator guidance treats assessing risk as the starting point; a missing assessment is itself a gap.
4. WORKPLACE RISK ASSESSMENT. Assess risks by role, setting and relationship: power imbalances, lone and night working, social events and alcohol, remote and online contact, and exposure to customers, clients, patients and members of the public.
5. TWO-STANDARD GAP ANALYSIS. Test each area against the current reasonable steps standard and the all reasonable steps standard: policy content and communication; training suited to role and risk; accessible and confidential reporting routes including anonymous options; prompt and fair investigation; support for those reporting; protection against victimisation; leadership commitment and visible action; monitoring of data and trends; and review after incidents. Produce a table with columns Area, Current measure, Reasonable steps, All reasonable steps, Gap and Priority.
6. THIRD-PARTY HARASSMENT. For roles exposed to third parties, set out controls: terms and conditions for customers and clients, signage, ability to refuse service, reporting and escalation, staffing and lone-working measures, and a clear process when harassment occurs.
7. REMEDIATION PLAN. Rank actions by their contribution to demonstrating that all reasonable steps were taken, with owners and dates before the strengthened standard applies.
8. EVIDENCE FILE. List the records to keep: the risk assessment, policy versions, training records, communications, reports and outcomes, monitoring reviews and board reporting.
9. LAWYER REVIEW TRIGGERS. Escalate: open complaints; patterns in data; senior individuals involved; third-party harassment incidents; any EHRC contact; and settlement agreements with confidentiality terms affecting harassment disclosures.

RULES
- Assess against the standard in force on the audit date and, separately, the strengthened standard.
- Label each item LAW, EHRC GUIDANCE or BEST PRACTICE.
- A policy on paper is not a step taken; assess implementation and evidence.
- Do not decide individual complaints.

OUTPUT FORMAT
Open with the standard in force today, the date of the change, and the three most significant gaps. Then the sections above, with the gap analysis as a table and a dated remediation plan. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A hospitality group with late-night venues and staff serving intoxicated customers audits its prevention measures before the strengthened duty applies.',
      result:
        'Current and strengthened standards mapped with the commencement date flagged for verification, no workplace risk assessment found and recorded as the first gap, customer harassment identified as the highest risk with no refuse-service or escalation process, training assessed as generic and not role-specific, a two-standard gap table, and a remediation plan ranked to demonstrate all reasonable steps before the change.',
    },
  },
];
