import type { Skill } from '../../types/skill';

/**
 * United Kingdom skills — post-Brexit domestic law.
 *
 * Deliberately separate from the EU pack rather than folded into it. The UK
 * GDPR, the Consumer Rights Act and the Bribery Act are domestic instruments
 * with their own regulator and their own case law, and treating them as EU
 * law with a different name is the single most common error in this area.
 */
export const ukSkills: Skill[] = [
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
    id: 'uk-gdpr-breach-assessor',
    name: 'UK GDPR Breach & ICO Notification Assessor',
    description: 'Assesses a personal data breach against the UK GDPR thresholds and drafts the ICO and individual notifications.',
    jurisdiction: 'uk',
    category: 'privacy',
    tags: ['data-protection', 'incident-response', 'uk-gdpr', 'ico', 'breach-notification', 'personal-data', 'incident'],
    sources: [
      { citation: 'UK General Data Protection Regulation', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'The retained and amended domestic instrument. It is not the EU GDPR and diverges from it; both the text and the case law must be checked against the UK version.' },
      { citation: 'Data Protection Act 2018', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the domestic exemptions, the law enforcement regime and the penalty framework.' },
      { citation: 'ICO guidance on personal data breaches and reporting', authority: 'regulator', publisher: 'Information Commissioner’s Office', jurisdiction: 'uk', url: 'https://ico.org.uk' },
      { citation: 'Privacy and Electronic Communications Regulations 2003', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relevant where the entity is a communications service provider, which carries a separate and stricter notification regime.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['au-privacy-ndb-assessor', 'sg-pdpc-breach-notifier', 'global-data-rights-request-handler'],
    whatItDoes:
      'Runs an incident against the two separate notification thresholds the UK GDPR sets — risk to rights and freedoms for the regulator, and high risk for the individuals themselves — which are different tests producing different answers. It fixes the moment of awareness that starts the 72-hour clock, establishes whether the organisation is acting as controller or processor because that decides who notifies whom, drafts both notifications, and separates the underlying compliance failures the incident exposes from the notification question itself.',
    whenToUse:
      'Within hours of suspecting any loss, unauthorised access to or unauthorised disclosure of personal data, when a processor reports an incident to you, and when building the breach response plan before an incident happens.',
    inputs: [
      { name: 'Incident description', description: 'What happened, when it occurred, when it was discovered, and how it came to light.', required: true },
      { name: 'Data involved', description: 'Categories of personal data, whether special category or criminal offence data is included, and volume.', required: true },
      { name: 'Role', description: 'Whether you are controller, joint controller or processor for this data, and who the other parties are.', required: true },
      { name: 'Individuals affected', description: 'How many, who they are, whether children are involved, and any particular vulnerability.' },
      { name: 'Technical measures', description: 'Whether the data was encrypted or pseudonymised, and whether the protection is likely to have held.' },
      { name: 'Containment', description: 'What has been done, when, and whether it reduces the risk to individuals.' },
    ],
    outputs: [
      { name: 'Breach determination', description: 'Whether this is a personal data breach at all, and which of the three types it is.' },
      { name: 'Clock analysis', description: 'When awareness occurred, when the 72 hours expires, and what to do if the deadline cannot be met with full information.' },
      { name: 'Regulator threshold assessment', description: 'The risk test applied to the facts, with the reasoning recorded either way.' },
      { name: 'Individual threshold assessment', description: 'The separate high-risk test, and the exemptions that can remove the duty to tell individuals.' },
      { name: 'Draft ICO notification', description: 'A notification containing each element the regulation requires, with gaps flagged rather than filled.' },
      { name: 'Draft individual communication', description: 'Plain-language notification meeting the content requirements.' },
      { name: 'Underlying compliance review', description: 'The obligations the incident exposes independently of the breach, and the record that must be kept.' },
    ],
    prompt: `You are a UK data protection lawyer assessing a personal data breach under the UK GDPR and the Data Protection Act.

INPUTS
- Incident: <what happened, when it occurred, when it was discovered, how, and whether it is contained>
- Data involved: <categories of personal data; any special category data such as health, biometric, racial or ethnic origin, political opinions, religious beliefs, trade union membership, sex life or sexual orientation; any criminal offence data; credentials; financial data>
- Our role: <controller, joint controller or processor for this data; identify the other parties>
- Individuals affected: <number, who they are, whether any are children, any vulnerability>
- Technical measures: <was the data encrypted or pseudonymised? is the protection likely to have held? where are the keys?>
- Containment: <what has been done, when, and whether it reduces risk to individuals>

TASK
1. IS THIS A PERSONAL DATA BREACH? Apply the definition: a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data. Classify it as a confidentiality, integrity or availability breach, and note that a ransomware incident or an accidental deletion is a breach even where nobody outside has seen the data. If it is not a personal data breach, say so and stop the notification analysis — but continue with the compliance review at step 7.
2. ROLE AND WHO NOTIFIES. Establish whether the organisation is controller or processor for this data. A processor notifies the controller without undue delay and does not notify the regulator; a controller notifies the regulator and, where the threshold is met, the individuals. For joint controllers, identify who discharges the duty under the arrangement between them. Where a processor has reported to you, the clock analysis in step 3 runs from your awareness, not theirs.
3. THE CLOCK. Fix the moment of awareness — when the organisation had a reasonable degree of certainty that a security incident had occurred leading to personal data being compromised, which may be later than first suspicion but is not deferred by an unhurried investigation. State the date and time awareness occurred, the date and time 72 hours expires, and note that the period runs in clock hours including weekends. Where full information will not be available in time, state plainly that the notification must still be made within the deadline and may be provided in phases, and that a late notification must explain the delay.
4. REGULATOR THRESHOLD. Apply the test: is the breach likely to result in a risk to the rights and freedoms of natural persons? Assess against the factors — the type of breach, the nature, sensitivity and volume of the data, the ease of identifying individuals, the severity of consequences, any special characteristics of the individuals or of the controller, and the number of people affected. Address whether encryption or pseudonymisation removes the risk, and be specific about whether the protection actually held rather than whether it existed. Conclude NOTIFY or DO NOT NOTIFY. Where the conclusion is not to notify, state that the reasoning must be documented, because the record is what the regulator will examine.
5. INDIVIDUAL THRESHOLD. Apply the separate and higher test: is the breach likely to result in a HIGH risk to the rights and freedoms of individuals? This is a different question with a different answer, and conflating the two is the most common error in breach response. Where the threshold is met, communication must be without undue delay. Then consider the exemptions: appropriate technical and organisational protection rendering the data unintelligible, subsequent measures ensuring the high risk is no longer likely to materialise, and disproportionate effort — which requires a public communication instead rather than silence. Apply each to these facts rather than listing them.
6. DRAFT THE NOTIFICATIONS.
   a. ICO notification, containing: the nature of the breach including the categories and approximate numbers of individuals and records concerned; the name and contact details of the data protection officer or other contact point; the likely consequences; and the measures taken or proposed, including measures to mitigate adverse effects. Where a fact is not yet known, write it as not yet established with the date it is expected — do not fill a gap with an assumption.
   b. Individual communication, in clear and plain language, describing the nature of the breach and containing the contact point, the likely consequences, and the measures taken or proposed. Do not minimise. Say what the individual should do now and where to get help.
7. UNDERLYING COMPLIANCE REVIEW. Separately from notification, identify what the incident exposes: the security obligation and whether the measures were appropriate to the risk; storage limitation, where data that should have been deleted was involved; data minimisation; the lawful basis for the processing; the adequacy of the processor contract; whether a data protection impact assessment should have been carried out; and international transfers if data left the UK. A breach usually reveals a problem that outlives the incident — name it.
8. OTHER OBLIGATIONS AND RECORD KEEPING. Flag anything else the facts trigger: the separate and stricter regime for communications service providers; sector regulators; contractual notification duties to customers; obligations under other regimes if affected individuals are outside the UK, including the EU GDPR where it applies in parallel; law enforcement reporting; and insurance notification. Then state the internal record requirement: every breach must be documented whether or not it is notified, recording the facts, the effects and the remedial action.

RULES
- Keep the two thresholds separate and answer both. Risk to individuals triggers the regulator; high risk triggers the individuals.
- Do not treat encryption as an automatic answer. Ask whether the protection actually held, where the keys were, and whether the algorithm and implementation were sound.
- The UK GDPR is a domestic instrument that has diverged from the EU GDPR. Do not import EU guidance or thresholds without saying so, and mark anything that turns on the current UK text [VERIFY].
- Where facts are unknown, treat the gap as a reason for urgency rather than delay, and notify within the deadline with what is known.
- Never recommend delaying notification to complete an investigation. Phased notification exists for exactly this situation.

OUTPUT FORMAT
Open with the bottom line, the notification deadline as a date and time, and whether individuals must be told. Then the sections above, with the two draft notifications as separate ready-to-use blocks.`,
    example: {
      scenario:
        'A misdirected email sends a spreadsheet of employee absence records, including sickness reasons, to an external distribution list.',
      result:
        'Confirmed as a confidentiality breach involving special category data, awareness fixed at the point the sender reported it rather than when the investigation concluded, regulator threshold met and notification drafted with two facts marked as not yet established, the high-risk threshold also met so individual communication required, and a separate finding that the absence data had been retained well beyond the stated retention period independently of the incident.',
    },
  },
  {
    id: 'uk-consumer-rights-checker',
    name: 'Consumer Rights Act Terms Checker',
    description: 'Screens consumer contract terms and notices for fairness and transparency under UK consumer protection law.',
    jurisdiction: 'uk',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'consumer-rights-act', 'unfair-terms', 'consumer', 'transparency', 'refunds'],
    sources: [
      { citation: 'Consumer Rights Act 2015', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the statutory rights in goods, services and digital content, the fairness test, the grey list, and the terms that cannot be excluded.' },
      { citation: 'Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for pre-contract information and the cancellation right in distance and off-premises contracts.' },
      { citation: 'CMA guidance on unfair contract terms', authority: 'regulator', publisher: 'Competition and Markets Authority', jurisdiction: 'uk', url: 'https://www.gov.uk' },
      { citation: 'Digital Markets, Competition and Consumers Act 2024', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the reformed consumer enforcement regime, including direct enforcement powers and penalties. Commencement of individual provisions must be confirmed.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'technology'],
    relatedSkills: ['au-acl-unfair-terms', 'au-consumer-guarantees-checker', 'us-auto-renewal-auditor'],
    whatItDoes:
      'Screens consumer-facing terms against the two things that decide whether they hold: the statutory rights in goods, services and digital content that cannot be excluded at all, and the fairness test that applies to everything outside the core bargain. It works through the grey list of terms presumed suspect, applies the transparency requirement separately because an unclear term fails on that ground alone, checks the pre-contract information and cancellation rules that apply to distance selling, and rewrites the terms that fail so they keep their commercial purpose.',
    whenToUse:
      'Before publishing or revising consumer terms, a returns policy or a subscription flow, when entering the UK consumer market, when a regulator or consumer body queries a term, and as a periodic audit of terms written before the enforcement regime changed.',
    inputs: [
      { name: 'Terms and notices', description: 'The consumer terms, returns policy, cancellation terms and any notice or disclaimer shown to customers.', required: true },
      { name: 'What is supplied', description: 'Goods, services, digital content or a mixture, and whether the contract is a subscription.', required: true },
      { name: 'Sales channel', description: 'Online, in store, by phone or at the customer premises, since the cancellation rules turn on this.', required: true },
      { name: 'Presentation', description: 'How and when terms are shown, what the customer must do to accept, and what is disclosed before payment.' },
      { name: 'Pricing structure', description: 'Headline price, any additional charges, and how renewals or price changes are handled.' },
      { name: 'Commercial rationale', description: 'Why each protective term exists, which is what the fairness assessment weighs against the customer detriment.' },
    ],
    outputs: [
      { name: 'Statutory rights audit', description: 'Terms that exclude or restrict rights which cannot be excluded, flagged as void.' },
      { name: 'Fairness screen', description: 'Each remaining term assessed against the significant imbalance test, with a risk rating.' },
      { name: 'Grey list matches', description: 'Terms matching the indicative list of terms that may be regarded as unfair.' },
      { name: 'Transparency findings', description: 'Terms that fail on plain language or prominence regardless of their substance.' },
      { name: 'Information and cancellation compliance', description: 'Pre-contract information and cancellation rights checked against the sales channel.' },
      { name: 'Redrafted terms', description: 'Replacement wording for every failing term that preserves the commercial purpose.' },
      { name: 'Enforcement exposure', description: 'What a challenge would look like under the current enforcement regime.' },
    ],
    prompt: `You are a UK consumer law specialist auditing consumer contract terms and notices.

INPUTS
- Terms and notices: <paste the consumer terms, returns policy, cancellation terms, disclaimers and any notice shown to customers>
- What is supplied: <goods, services, digital content or a mixture; is it a subscription or a one-off?>
- Sales channel: <online, in store, by telephone, or at the customer's home or workplace>
- Presentation: <how and when terms are shown, what the customer must do to accept, what is disclosed before payment>
- Pricing: <headline price, additional charges, delivery, renewal and price change mechanics>
- Commercial rationale: <why each protective term exists>

TASK
1. SCOPE. Confirm the contracts are with consumers, meaning individuals acting wholly or mainly outside their trade, business, craft or profession. Address mixed-purpose purchases and any part of the customer base that is not consumer, since different rules apply to those and the same terms may need to work for both.
2. STATUTORY RIGHTS AUDIT. Identify the rights that apply to what is supplied and cannot be excluded or restricted:
   - Goods: satisfactory quality, fitness for a particular purpose made known, as described, matching a sample or model, and installation where the trader installs.
   - Services: performance with reasonable care and skill, information said or written about the trader or service being binding, a reasonable price where none is agreed, and performance within a reasonable time.
   - Digital content: satisfactory quality, fitness for purpose, as described, and the trader's liability for damage to a device or other digital content.
   Then find every term that purports to exclude or restrict them, directly or by structure — a returns window shorter than the statutory remedy period, a condition of unopened packaging, a requirement to claim only through a manufacturer, a term making a remedy discretionary. State that such terms are not binding on the consumer. Address separately the terms that can never be excluded, including liability for death or personal injury from negligence.
3. REMEDIES MAP. Set out the remedies the consumer actually has, since terms usually go wrong by understating them: the short-term right to reject and its time limit; the right to repair or replacement; the right to a price reduction or the final right to reject; the deduction for use and when it can be applied; and the different structure that applies to services and to digital content. Mark the periods [VERIFY]. Compare this against what the terms tell the customer they get, and list every discrepancy.
4. FAIRNESS SCREEN. For each term that is not part of the core bargain, apply the test: does it, contrary to the requirement of good faith, cause a significant imbalance in the parties' rights and obligations to the detriment of the consumer? Assess in the context of the contract as a whole, the circumstances at the time it was made, and all the other terms. Note that the exemption for terms specifying the main subject matter or the price applies only where the term is transparent and prominent — so an opaque core term is assessable on fairness like any other. Produce a table with columns Term, Clause, Imbalance, Good faith, Detriment, Rating and Reason.
5. GREY LIST. Flag terms matching the indicative list of terms that may be regarded as unfair, including: excluding or limiting liability for death or personal injury; inappropriately excluding or limiting the consumer's legal rights against the trader on total or partial non-performance; binding the consumer while the trader's performance is subject to a condition within the trader's own will; permitting the trader to retain sums paid where the consumer cancels without a comparable payment when the trader cancels; requiring a disproportionately high sum in compensation; permitting the trader to dissolve the contract on a discretionary basis where the consumer cannot; enabling the trader to terminate an indeterminate contract without reasonable notice; automatically extending a fixed-term contract where the deadline for the consumer to object is unreasonably early; irrevocably binding the consumer to terms they had no real opportunity to see; enabling the trader to alter terms or the characteristics of what is supplied unilaterally without a valid reason; giving the trader the right to determine whether what is supplied conforms, or to interpret the terms; excluding or hindering the consumer's right to take legal action; and altering the burden of proof. Matching the list is not automatically fatal but shifts the analysis and must be justified.
6. TRANSPARENCY AND PROMINENCE. Assess this separately from substance, because a term can fail on transparency alone. Check that terms are in plain and intelligible language, legible, and brought to the consumer's attention before they are bound. Flag terms buried in cross-referenced documents, presented after payment, hidden behind a link the customer need not open, or written in a register the audience will not follow. Note that ambiguity is resolved in the consumer's favour.
7. INFORMATION AND CANCELLATION. For the sales channel identified, set out the pre-contract information that must be given and whether it was, and the cancellation position: whether a cancellation right applies, its length, when it starts, how the information affects it and what happens if the information is not given, the model cancellation form, the exceptions including bespoke goods and digital content supplied with consent, who pays return costs, and the refund deadline. Then check the terms against each. Flag any additional charge that was not expressly agreed by the consumer through active choice, including pre-ticked boxes.
8. SUBSCRIPTIONS AND RENEWALS. Where the contract renews, assess the reminder and cancellation mechanics, the ease of exit compared with the ease of entry, and the treatment of a customer who cancels mid-term. Flag any automatic extension where the objection deadline is unreasonably early.
9. REDRAFT. For every term rated high or medium risk, give replacement wording that keeps the commercial purpose within the safe zone. Usually that means making a right mutual, tying a discretion to an objective standard with notice and a matching exit right, narrowing a term to the legitimate interest it actually protects, or moving it to a place the customer will see before they are bound.
10. ENFORCEMENT EXPOSURE. Describe what a challenge looks like: that an unfair term is simply not binding while the rest of the contract continues if it can, that a regulator can act on terms across a whole market without any individual complaint, and that the enforcement regime has been reformed to include direct enforcement powers and turnover-based penalties. Mark the penalty levels and the commencement position [VERIFY].

RULES
- Separate the two questions throughout: a term excluding a statutory right is void regardless of fairness, while other terms are tested for fairness. Do not run them together.
- Test transparency independently. A substantively reasonable term still fails if the consumer could not find or follow it.
- Do not treat a term as safe because it is common in the market. Widespread use has not protected these terms.
- Where a term is required by other law, say so — that is a strong argument on the fairness assessment.
- Mark periods, penalty levels and anything turning on recent commencement [VERIFY].

OUTPUT FORMAT
Open with the terms that are void or highest risk and why. Then the sections above, with tables for the fairness screen, the remedies discrepancies and the grey list matches, closing with the redrafted terms as usable text.`,
    example: {
      scenario:
        'A subscription box retailer selling online reviews its terms, returns policy and renewal flow before a growth campaign.',
      result:
        'A fourteen-day returns window found to understate the statutory remedies and a no-refunds-on-sale-items clause identified as not binding, a unilateral price variation term matched to the grey list with no notice or exit right, the cancellation information found not to have been given in durable form so the cancellation period was extended, a pre-ticked insurance add-on flagged as an additional charge not expressly agreed, and redrafted terms supplied for each.',
    },
  },
  {
    id: 'uk-bribery-act-reviewer',
    name: 'Bribery Act Adequate Procedures Reviewer',
    description: 'Reviews an anti-bribery programme against the six principles that make up the adequate procedures defence.',
    jurisdiction: 'uk',
    category: 'compliance',
    tags: ['programme-design', 'assessment', 'bribery-act', 'anti-corruption', 'adequate-procedures', 'third-party-risk', 'compliance'],
    sources: [
      { citation: 'Bribery Act 2010', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the general offences, the offence of bribing a foreign public official, the corporate failure to prevent offence and its adequate procedures defence.' },
      { citation: 'Ministry of Justice guidance on procedures to prevent bribery', authority: 'guidance', publisher: 'Ministry of Justice', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'The statutory guidance setting out the six principles. Persuasive rather than binding, and adequacy is ultimately decided by a court.' },
      { citation: 'Deferred Prosecution Agreement Code of Practice', authority: 'regulator', publisher: 'Serious Fraud Office; Crown Prosecution Service', jurisdiction: 'uk', url: 'https://www.sfo.gov.uk', note: 'Relied on for the weight given to self-reporting, cooperation and the state of the compliance programme.' },
      { citation: 'Economic Crime and Corporate Transparency Act 2023', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relevant for the failure to prevent fraud offence and the reformed identification doctrine, which sit alongside the bribery regime and should be assessed together.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['energy-infrastructure', 'financial-services', 'professional-services'],
    relatedSkills: ['us-ofac-export-screener', 'global-obligation-extraction', 'us-antitrust-interaction-checker'],
    whatItDoes:
      'Tests an anti-bribery programme against the six principles that constitute the only defence to the corporate failure to prevent offence, which is a strict liability offence with no requirement that anyone senior knew. It works out first whether the organisation is caught at all, since the jurisdictional reach extends to foreign companies carrying on business in the UK, then identifies who counts as an associated person, and grades each principle against what the programme actually does rather than what the policy says — because the defence turns on operation, not documentation.',
    whenToUse:
      'When building or auditing an anti-bribery programme, before entering a market or sector with elevated risk, when onboarding intermediaries or agents, during transaction diligence, and immediately on any allegation or red flag.',
    inputs: [
      { name: 'Programme documents', description: 'Anti-bribery policy, procedures, code of conduct, and any gifts and hospitality rules.', required: true },
      { name: 'Business profile', description: 'Sectors, countries of operation, public sector interaction, and use of agents or intermediaries.', required: true },
      { name: 'Corporate structure', description: 'Entities, where they are incorporated, and whether any part of the group carries on business in the UK.', required: true },
      { name: 'Third-party population', description: 'Agents, distributors, consultants, joint venture partners and their remuneration models.' },
      { name: 'Controls in operation', description: 'Diligence performed, training delivered, approvals required, and monitoring actually carried out.' },
      { name: 'Incidents and red flags', description: 'Any allegation, audit finding, refused payment or unexplained expense.' },
    ],
    outputs: [
      { name: 'Jurisdictional analysis', description: 'Whether the organisation is caught by the corporate offence, and which entities are in scope.' },
      { name: 'Associated persons map', description: 'Who performs services for or on behalf of the organisation, and the risk each population presents.' },
      { name: 'Principle-by-principle grading', description: 'Each of the six principles rated with the evidence supporting the rating.' },
      { name: 'Risk assessment review', description: 'Whether the underlying risk assessment is documented, current and actually drives the controls.' },
      { name: 'Gap register', description: 'Each gap with its exposure, the fix, an owner and a priority.' },
      { name: 'Hospitality and facilitation position', description: 'Where the current rules sit against the law, which recognises no facilitation payment exception.' },
      { name: 'Incident response readiness', description: 'What happens on an allegation, including the self-reporting decision framework.' },
    ],
    prompt: `You are a UK anti-corruption lawyer reviewing an anti-bribery compliance programme against the adequate procedures defence.

INPUTS
- Programme documents: <anti-bribery policy, procedures, code of conduct, gifts and hospitality rules, third-party onboarding process>
- Business profile: <sectors, countries of operation, extent of public sector interaction, licences and permits required, use of agents or intermediaries>
- Corporate structure: <entities, places of incorporation, and whether any part of the group carries on a business or part of a business in the UK>
- Third parties: <agents, distributors, consultants, joint venture partners, their remuneration models, and how they were appointed>
- Controls in operation: <diligence actually performed, training actually delivered and to whom, approvals required, monitoring and audit actually carried out>
- Incidents: <any allegation, audit finding, refused payment, unexplained expense or red flag>

TASK
1. JURISDICTION AND SCOPE. Determine whether the corporate failure to prevent offence applies. It catches a relevant commercial organisation, which includes a body incorporated or a partnership formed in the UK wherever it carries on business, and also a body incorporated anywhere that carries on a business or part of a business in the UK. State which group entities are in scope and note that the offence then reaches bribery committed anywhere in the world by an associated person. Separately note the reach of the general offences and the foreign public official offence, and that individuals face liability independently of the company. Explain that the corporate offence is strict liability: it is committed where an associated person bribes intending to obtain or retain business or an advantage for the organisation, whether or not anyone senior knew, and that adequate procedures is the only defence.
2. ASSOCIATED PERSONS. Map who performs services for or on behalf of the organisation. This is deliberately broad and is determined by the substance of the relationship, not its label: employees are presumed to be associated persons, and it extends to agents, distributors in some structures, consultants, contractors, joint venture partners and subsidiaries depending on how they operate. Produce the population and rate the bribery risk each presents. Flag any population currently outside the programme's scope.
3. PRINCIPLE-BY-PRINCIPLE GRADING. Grade each of the six principles as adequate, partial or inadequate, stating the evidence for the grade and what would move it up. Assess what the organisation actually does, not what the policy says it does — the distinction is the whole point of the review.
   a. PROPORTIONATE PROCEDURES: are procedures proportionate to the risk faced and to the scale and complexity of the business? Are they clear, practical, accessible and enforced? Is there a real difference in treatment between high and low risk activities, or is the same process applied to everything?
   b. TOP-LEVEL COMMITMENT: is top-level management genuinely engaged, and is that visible to staff and to third parties? Look for evidence beyond a signed foreword — board time, decisions actually taken, business declined, and consequences applied to senior people.
   c. RISK ASSESSMENT: is there a documented, periodic and informed assessment of external and internal risk? External risk covers country, sectoral, transaction, business opportunity and business partnership risk. Internal risk covers deficient training, a bonus culture rewarding excessive risk taking, a lack of clarity on hospitality, a lack of a clear reporting route, and no disciplinary follow-through. Check that the assessment is current, that it names specific risks rather than generic ones, and above all that the controls actually trace back to it.
   d. DUE DILIGENCE: is proportionate and risk-based diligence applied to those who perform services for or on behalf of the organisation? Check that it is done before appointment rather than after, that it is refreshed, that findings are escalated and can result in refusal, and that the remuneration model of intermediaries is examined — success fees and commissions that are out of line with the service performed are the classic red flag.
   e. COMMUNICATION AND TRAINING: are the procedures communicated and understood, internally and externally? Is training targeted by role and risk rather than uniform, does it reach third parties where warranted, and is completion tracked and enforced? Is there a confidential reporting route that people know about and believe in?
   f. MONITORING AND REVIEW: are the procedures monitored, tested and improved? Look for audit, financial controls that would actually detect an improper payment, review triggered by incidents and by changes in the business, and evidence that findings led to change.
4. HOSPITALITY, GIFTS AND FACILITATION. Assess the current rules. Reasonable and proportionate hospitality is not prohibited, but state where the line sits and how to evidence intention, since the offence turns on intending to induce improper performance. Then address facilitation payments directly: the law contains no exception for them however small and however customary, which frequently differs from the position staff assume and from other regimes the organisation may follow. Check the rules cover the practical cases — public officials, travel and accommodation, charitable and political donations, and payments demanded under duress, where the safety exception is about immediate threat to life or limb and must be reported and recorded.
5. GAP REGISTER. List each gap with the exposure it creates, the specific fix, an owner and a priority. Rank by the contribution each makes to the adequate procedures defence, not by ease.
6. INCIDENT READINESS AND SELF-REPORTING. Set out what happens on an allegation: how it is escalated, how privilege is established over the investigation and how easily it can be lost, how evidence is preserved, and who decides. Then set out the self-reporting decision framework and the factors that weigh on whether a deferred prosecution agreement is available, including the timing and genuineness of the report, the extent of cooperation, and the state of the compliance programme at the time of the conduct and now. Be clear that this is a decision requiring specialist advice at the time and that the analysis here is a framework, not a recommendation to report or not.
7. ADJACENT OFFENCES. Note that the failure to prevent fraud offence and the reformed approach to attributing criminal liability to companies sit alongside this regime, that the control frameworks overlap substantially, and that a programme built only around bribery may leave the adjacent exposure unaddressed. Mark scope and commencement [VERIFY].

RULES
- Grade what operates, not what is written. A comprehensive policy that nobody applies makes the position worse, not better, because it evidences awareness of the risk.
- Adequacy is proportionate to risk. Do not recommend uniform controls across populations with different risk profiles, and do not treat a small organisation as needing what a large one needs.
- Never suggest a facilitation payment is permissible because it is small, customary or expected locally.
- The guidance is persuasive, not binding, and adequacy is ultimately decided by a court on the facts. Do not state that following the six principles guarantees the defence.
- Mark penalty levels, commencement dates and anything turning on the newer offences [VERIFY].

OUTPUT FORMAT
Open with the overall adequacy position and the three gaps that most weaken the defence. Then the sections above, with a grading table for the six principles and the gap register as a prioritised table with owners.`,
    example: {
      scenario:
        'A UK-listed engineering group bidding for public infrastructure work in higher-risk markets audits its anti-bribery programme through local agents.',
      result:
        'Corporate offence confirmed to apply across the group including two foreign subsidiaries, agents mapped as associated persons with four appointed before any diligence process existed, risk assessment graded inadequate because it was three years old and generic so no control traced back to a named risk, commission structures on two agents flagged as disproportionate to the service performed, and a gap register ranked by contribution to the defence rather than by ease of fix.',
    },
  },
];
