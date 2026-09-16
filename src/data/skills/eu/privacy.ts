import type { Skill } from '../../../types/skill';

/**
 * EU privacy skills — GDPR accountability, breaches, processor contracts and international transfers.
 */
export const euPrivacySkills: Skill[] = [
  {
    id: 'eu-dpia-ropa-builder',
    name: 'DPIA & ROPA Builder',
    description: 'Builds a data protection impact assessment and processing record from a described activity.',
    jurisdiction: 'eu',
    category: 'privacy',
    tags: ['data-protection', 'drafting', 'gdpr', 'dpia', 'ropa', 'privacy', 'documentation'],
    sources: [
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu' },
      { citation: 'European Data Protection Board guidelines and recommendations', authority: 'guidance', publisher: 'European Data Protection Board', jurisdiction: 'eu', url: 'https://www.edpb.europa.eu', note: 'Persuasive, not binding. Identify where it exceeds the strict legal requirement.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['eu-transfer-impact-assessor', 'global-data-rights-request-handler'],
    whatItDoes:
      'Takes a description of a processing activity and produces both of the documents the GDPR expects to see: the Article 30 record of processing, and — where the activity clears the threshold — a full impact assessment. It first tests whether a DPIA is actually required rather than assuming one is, then works through necessity and proportionality, risks to individuals, and mitigations, ending with an honest view on whether the residual risk would require consultation with the supervisory authority.',
    whenToUse:
      'Before launching a new processing activity, when materially changing an existing one, when building or refreshing your processing register, or when a customer\'s security review asks for your DPIA.',
    inputs: [
      { name: 'Processing description', description: 'What data, about whom, for what purpose, by what means.', required: true },
      { name: 'Legal basis', description: 'The Article 6 basis, plus an Article 9 condition if special category data is involved.' },
      { name: 'Data flows', description: 'Sources, systems, recipients, processors and any transfers outside the EEA.' },
      { name: 'Retention', description: 'How long each category is kept and why.' },
      { name: 'Safeguards', description: 'Technical and organisational measures already in place.' },
    ],
    outputs: [
      { name: 'DPIA threshold test', description: 'Whether an assessment is required, against the recognised criteria.' },
      { name: 'ROPA entry', description: 'A complete Article 30 record, field by field.' },
      { name: 'Necessity and proportionality', description: 'Whether the purpose could be achieved in a less intrusive way.' },
      { name: 'Risk register', description: 'Risks to individuals, scored by likelihood and severity, from their perspective.' },
      { name: 'Mitigation plan', description: 'Measures, residual risk after each, and owners.' },
      { name: 'Consultation view', description: 'Whether residual high risk would require prior consultation.' },
    ],
    prompt: `You are a data protection officer preparing GDPR documentation for a processing activity.

INPUTS
- Processing activity: <what personal data, about whom, for what purpose, by what means, at what scale>
- Legal basis: <Article 6 basis; plus Article 9 condition if special category data; plus any Article 10 criminal-offence data>
- Data flows: <sources, systems, internal recipients, processors and sub-processors, transfers outside the EEA>
- Retention: <per category, with the justification>
- Existing safeguards: <encryption, access control, pseudonymisation, minimisation, training, contracts>
- Controller/processor role: <are we controller, joint controller, or processor?>

TASK
1. ROLE CHECK: are we controller, joint controller or processor for this activity? The answer changes which documents are required and what they must contain. Where it is a joint controllership, flag the arrangement that must be in place.
2. DPIA THRESHOLD TEST: is a DPIA required? Work through the recognised criteria — evaluation or scoring, automated decision-making with legal or similarly significant effect, systematic monitoring, special category or highly personal data, data processed on a large scale, matched or combined datasets, vulnerable data subjects (including children and employees), innovative use of technology, and processing that prevents data subjects exercising a right or using a service. State how many criteria are met and conclude REQUIRED / NOT REQUIRED / ADVISABLE, noting that supervisory authorities publish their own mandatory lists which must be checked [VERIFY].
3. ROPA ENTRY: produce a complete Article 30 record — controller and DPO contact details, purposes, categories of data subject, categories of personal data, categories of recipient, third-country transfers with the mechanism relied on, retention periods, and a general description of the security measures. Mark any field you cannot complete as [TO BE COMPLETED BY THE BUSINESS] rather than inventing content.
4. If a DPIA is required or advisable, produce it:
   a. Systematic description of the processing, including a data flow narrative.
   b. NECESSITY AND PROPORTIONALITY: is each data element necessary for the stated purpose? Could the purpose be achieved with less data, less identifiability, or shorter retention? Assess the lawful basis, and if relying on legitimate interests include the three-part balancing test.
   c. RISKS TO INDIVIDUALS: build a register scored on likelihood and severity. Assess risk to the data subject, not risk to the business — this is the single most common error in DPIAs. Cover illegitimate access, unwanted modification, disappearance of data, discrimination, loss of control, reputational harm, financial loss, and chilling effects.
   d. MITIGATIONS: for each risk, the measure, the residual risk after it, and the owner.
   e. RESIDUAL RISK: is any risk still high after mitigation? If so, say that prior consultation with the supervisory authority is likely required before processing begins.
5. GAPS: everything you could not assess from the information supplied, phrased as questions for the business.

RULES
- Never assume a lawful basis. If one was not supplied, say the analysis cannot be completed and name the candidates with their consequences.
- Score risks from the individual's point of view.
- Do not mark a risk mitigated by a measure that is merely planned. Distinguish in place from planned.
- Where transfers outside the EEA occur, flag that a transfer mechanism and a transfer impact assessment are separate requirements.
- Where children's data is involved, flag the heightened expectations and any age-assurance question.

OUTPUT FORMAT
Five sections matching the tasks above.`,
    example: {
      scenario:
        'A retailer plans to introduce a loyalty programme that profiles purchase history to target offers, including inferred dietary and health preferences.',
      result:
        'A DPIA marked required on four criteria, a completed ROPA entry, a finding that inferred health preferences engage Article 9 and need a distinct condition, and a residual-risk conclusion that the profiling can proceed only with an opt-out and a shortened retention period.',
    },
  },
  {
    id: 'eu-transfer-impact-assessor',
    name: 'Transfer Impact Assessor',
    description: 'Assesses a personal data transfer out of the EEA and documents the safeguards relied on.',
    jurisdiction: 'eu',
    category: 'privacy',
    tags: ['data-protection', 'assessment', 'gdpr', 'international-transfers', 'sccs', 'tia', 'chapter-v'],
    sources: [
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu' },
      { citation: 'European Data Protection Board guidelines and recommendations', authority: 'guidance', publisher: 'European Data Protection Board', jurisdiction: 'eu', url: 'https://www.edpb.europa.eu', note: 'Persuasive, not binding. Identify where it exceeds the strict legal requirement.' },
      { citation: 'Court of Justice of the European Union judgment in Case C-311/18 (Schrems II)', authority: 'primary', publisher: 'Court of Justice of the European Union', jurisdiction: 'eu', url: 'https://curia.europa.eu' },
      { citation: 'European Commission adequacy decisions and standard contractual clauses', authority: 'regulator', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Adequacy decisions are added, amended and annulled. Confirm current status.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['cross-transfer-mechanism-picker', 'eu-dpia-ropa-builder'],
    whatItDoes:
      'Works through the Chapter V analysis for a specific transfer: whether an adequacy decision covers it, and if not which transfer tool applies, followed by the assessment of whether the destination country\'s law actually undermines that tool in practice. It focuses on the part teams usually skip — the concrete assessment of government access powers and available redress in the destination, and the supplementary measures that would genuinely address the gap rather than a generic list appended to the file.',
    whenToUse:
      'Before onboarding a processor outside the EEA, when a sub-processor changes location, when adequacy status for a country changes, and on the periodic review cycle for existing transfers.',
    inputs: [
      { name: 'Transfer description', description: 'What data, from whom, to whom, and for what purpose.', required: true },
      { name: 'Destination country', description: 'Where the data goes, and where it is accessible from — including remote support.', required: true },
      { name: 'Importer details', description: 'The recipient, its sector, and whether it is subject to particular access regimes.' },
      { name: 'Transfer tool', description: 'Adequacy, standard contractual clauses, binding corporate rules, or a derogation.' },
      { name: 'Technical measures', description: 'Encryption, key management, pseudonymisation and access controls in place.' },
    ],
    outputs: [
      { name: 'Transfer map', description: 'Every leg of the transfer, including onward transfers and remote access.' },
      { name: 'Tool selection', description: 'Which Chapter V mechanism applies, and why the alternatives do not.' },
      { name: 'Destination law assessment', description: 'Government access powers and redress in the destination, applied to this transfer.' },
      { name: 'Supplementary measures', description: 'Specific technical, contractual and organisational measures that address the identified gap.' },
      { name: 'Conclusion', description: 'Whether the transfer can proceed, and on what conditions.' },
      { name: 'Review triggers', description: 'The events that require the assessment to be redone.' },
    ],
    prompt: `You are a data protection lawyer conducting a transfer impact assessment for a transfer of personal data out of the EEA.

INPUTS
- Transfer: <what personal data, whose, from which entity to which entity, for what purpose, at what volume and frequency>
- Destination country: <and every country from which the data can be accessed, including remote support and follow-the-sun operations>
- Importer: <entity, sector, size, whether it is an electronic communications provider or otherwise subject to specific access regimes>
- Transfer tool in mind: <adequacy / SCCs / BCRs / derogation / not decided>
- Technical measures: <encryption in transit and at rest, who holds the keys, pseudonymisation, access controls>
- Onward transfers: <any sub-processors and their locations>

TASK
1. TRANSFER MAP: identify every leg, including onward transfers, remote access from a third country, and any support or backup arrangement. Remote access from a third country is a transfer — check for it explicitly, because it is the leg most often missed.
2. TOOL SELECTION:
   a. Is there an adequacy decision covering the destination and this recipient? Some adequacy decisions are partial or framework-dependent — say so and mark [VERIFY].
   b. If not, which Article 46 tool applies, and is it correctly implemented (right module, right annexes, right parties)?
   c. If a derogation is being considered, address that derogations are for occasional and non-repetitive transfers and are generally unavailable for systematic ones. Say plainly if the intended use does not fit.
3. DESTINATION LAW ASSESSMENT: this is the part that must be specific to this transfer.
   - What government access powers exist in the destination that could reach this data, and are they limited to what is necessary and proportionate?
   - Is the importer within scope of those powers, given its sector and activities?
   - What redress is available to an EEA data subject in practice?
   - Is there any evidence of how these powers are used in practice for data of this type?
   Mark this whole section [REQUIRES LOCAL LEGAL INPUT] — a defensible assessment needs a source on the destination country's law, not a general impression. Say what specifically must be sourced.
4. SUPPLEMENTARY MEASURES: for the gap identified, what would actually address it?
   - Technical: strong encryption with keys held only in the EEA, pseudonymisation where the additional information stays in the EEA, split processing. Be honest about which measures work where the importer needs the data in the clear to perform the service — in that case most technical measures do not help.
   - Contractual: notification of access requests, transparency reporting, challenge obligations, audit rights.
   - Organisational: access governance, internal policies, minimisation of what is sent at all.
   Do not produce a generic list. For each measure say whether it addresses THIS risk.
5. CONCLUSION: can the transfer proceed? One of: PROCEED, PROCEED WITH THE MEASURES LISTED, or SUSPEND / DO NOT START. If measures are required, say which are conditions precedent.
6. DOCUMENTATION AND REVIEW: what to record, and the events that trigger a fresh assessment — a change in the destination's law, a change of sub-processor or location, an access request received, or the scheduled periodic review.

RULES
- Never state that a country has or lacks an adequacy decision as settled fact — adequacy decisions are added, amended and annulled. Mark [VERIFY].
- Do not conclude that a transfer is fine because "everyone does it". Assess it.
- Where the importer must access data in the clear, say so and do not claim encryption solves the problem.
- Flag if the transfer involves special category data, since that raises the severity of every identified risk.

OUTPUT FORMAT
Six sections matching the tasks above.`,
    example: {
      scenario:
        'A European SaaS company moves customer support ticketing to a vendor whose support team works from three countries outside the EEA.',
      result:
        'A transfer map that surfaces two unnoticed remote-access legs, an SCC module check that finds the wrong module in use, a destination-law section listing exactly what local input must be sourced, and a conclusion allowing the transfer only once access is restricted and the correct module is executed.',
    },
  },
  {
    id: 'eu-gdpr-breach-notification',
    name: 'GDPR Breach Notification Workflow',
    description: 'Runs a GDPR personal data breach from discovery through lead-authority notification, communication and the register.',
    jurisdiction: 'eu',
    category: 'privacy',
    tags: ['data-protection', 'incident-response', 'gdpr', 'personal-data', 'one-stop-shop', 'supervisory-authority'],
    sources: [
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation), Articles 4(12), 33, 34, 56 and 60', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Defines a personal data breach and sets the 72-hour notification to the supervisory authority, communication to data subjects, the internal breach register, and the lead-authority mechanism for cross-border processing.' },
      { citation: 'EDPB Guidelines on examples regarding personal data breach notification and Guidelines on personal data breach notification', authority: 'guidance', publisher: 'European Data Protection Board', jurisdiction: 'eu', url: 'https://www.edpb.europa.eu', note: 'The EDPB’s position on awareness, risk assessment and notification, including that controllers without an EU establishment must notify every authority where affected individuals reside.' },
      { citation: 'Regulation (EU) 2025/2518 on procedural rules for GDPR enforcement in cross-border cases', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Published 12 December 2025 and applicable from 2 April 2027. Harmonises cross-border enforcement procedure; it does not change the Article 33 notification duty. Confirmed as at 2026-09-16.' },
      { citation: 'Member State data protection laws and supervisory authority notification forms', authority: 'regulator', publisher: 'Member State supervisory authorities', jurisdiction: 'eu', note: 'Notification portals, forms and some procedural expectations are national. Sector regimes may add parallel notifications.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-gdpr-breach-assessor', 'eu-nis2-incident-reporting', 'eu-dpia-ropa-builder'],
    whatItDoes:
      'Takes a suspected personal data breach under the GDPR and runs it on the clocks that apply: it fixes the moment of awareness, determines whether the organisation is controller or processor, and — the step that differs most from single-country regimes — identifies which supervisory authority must be notified through the one-stop-shop, or whether several must be notified because there is no EU main establishment. It applies the separate risk and high-risk thresholds, drafts the authority notification and data-subject communication, coordinates processor input, and produces the breach register entry that is required whether or not the breach is notified.',
    whenToUse:
      'Within hours of discovering any loss, alteration, unauthorised disclosure of or access to personal data subject to the GDPR, when a processor reports an incident, and when an incident affects individuals in more than one Member State. Not for: UK GDPR breaches (use the UK breach assessor) or NIS2 incident reporting, which runs in parallel (use the NIS2 incident skill).',
    inputs: [
      { name: 'Incident facts', description: 'What happened, when it began, when and how it was discovered, and containment status.', required: true },
      { name: 'Data and individuals', description: 'Categories of personal data, special category data, volume, and the countries where affected individuals reside.', required: true },
      { name: 'Establishment', description: 'EU establishments, where decisions about the processing are taken, and whether a main establishment exists.', required: true },
      { name: 'Role and processors', description: 'Controller, joint controller or processor, and the processors involved with their contract terms.' },
      { name: 'Safeguards', description: 'Encryption, pseudonymisation and whether protection held.' },
      { name: 'Other regimes', description: 'Whether NIS2, DORA, sector or contractual notifications may also apply.' },
    ],
    outputs: [
      { name: 'Breach determination', description: 'Whether a personal data breach occurred and its type.' },
      { name: 'Clock', description: 'Awareness time and the 72-hour deadline, with phased notification if facts are incomplete.' },
      { name: 'Lead authority routing', description: 'The competent supervisory authority or authorities and the reasoning.' },
      { name: 'Risk and high-risk assessments', description: 'Both thresholds applied separately, with reasoning recorded either way.' },
      { name: 'Draft authority notification', description: 'Notification containing each required element, with gaps marked.' },
      { name: 'Draft data-subject communication', description: 'Plain-language communication, or the reason it is not required.' },
      { name: 'Breach register entry', description: 'The internal record required for every breach.' },
    ],
    prompt: `You are an EU data protection lawyer running a personal data breach response under the GDPR.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- GDPR Articles 33 and 34: notification to the competent supervisory authority without undue delay and, where feasible, within 72 hours of becoming aware, unless the breach is unlikely to result in a risk; communication to data subjects without undue delay where a high risk is likely; documentation of every breach [CONFIRMED].
Scheduled:
- Regulation (EU) 2025/2518 on cross-border enforcement procedure applies from 2 April 2027 [CONFIRMED]. It changes enforcement procedure, not the Article 33 duty.
National:
- Notification portals, forms and parallel sector notifications are national [VERIFY per authority].

INPUTS
- Incident: <what happened, start, discovery, how discovered, containment>
- Data and individuals: <categories, special category data, volume, countries of residence>
- Establishment: <EU establishments, where decisions on this processing are taken, main establishment>
- Role and processors: <controller, joint controller or processor; processors and contract terms>
- Safeguards: <encryption, pseudonymisation, whether protection held>
- Other regimes: <NIS2, DORA, sector, contractual>

TASK
1. SCOPE GATE. Confirm the GDPR applies to this processing through establishment in the EU or targeting of individuals in the EU. If the processing is subject only to the UK GDPR, redirect.
2. BREACH DETERMINATION. Apply the definition: a breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to personal data. Classify it as a confidentiality, integrity or availability breach. If there is no personal data breach, say so and still record the security incident internally.
3. ROLE. A processor notifies the controller without undue delay after becoming aware; it does not notify the authority unless the contract assigns that task. Any fixed-hour processor deadline is a contractual term, not a GDPR requirement. A controller notifies the authority.
4. CLOCK. Fix the moment of awareness — when the controller has a reasonable degree of certainty that a security incident has compromised personal data — and state the date and time and the 72-hour deadline, running in clock hours including weekends. Where facts are incomplete, notify within the deadline and provide information in phases. Any notification after 72 hours must give reasons for the delay.
5. LEAD AUTHORITY ROUTING. For cross-border processing, identify the main establishment and its lead supervisory authority, and notify that authority. If the controller has no EU establishment, the one-stop-shop does not apply and each authority where affected individuals reside must be notified, per EDPB guidance. Record the reasoning. Flag where the main establishment is disputed or where decisions are in fact taken outside the establishment named.
6. RISK ASSESSMENT. Assess whether the breach is likely to result in a risk to rights and freedoms, considering type of breach, nature, sensitivity and volume of data, ease of identification, severity of consequences, special characteristics of individuals and of the controller, and number affected. Test whether encryption or pseudonymisation actually held. Record the reasoning if the conclusion is not to notify.
7. HIGH-RISK ASSESSMENT. Separately assess whether a high risk is likely. If so, data subjects must be told without undue delay unless an exception applies: effective protection rendering data unintelligible, subsequent measures making the high risk unlikely, or disproportionate effort, which requires a public communication instead.
8. DRAFT NOTIFICATION. Include the nature of the breach with categories and approximate numbers of data subjects and records, DPO or contact point, likely consequences, and measures taken or proposed. Mark unknown facts as not yet established with expected dates.
9. DRAFT COMMUNICATION. Plain language: nature of the breach, contact point, likely consequences, measures taken, and what individuals should do.
10. BREACH REGISTER. Draft the register entry: facts, effects and remedial action, as required for every breach whether notified or not.
11. PARALLEL REGIMES. Flag NIS2 incident reporting, DORA major incident reporting for financial entities, sector rules, contractual notices and insurers. These run on different clocks and are not satisfied by the GDPR notification.
12. LAWYER REVIEW TRIGGERS. Escalate: main establishment uncertainty; no EU establishment requiring several notifications; special category or children's data; notification later than 72 hours; decision not to notify; and any public communication.

RULES
- Keep the risk and high-risk thresholds separate.
- Label each item GDPR, EDPB GUIDANCE, NATIONAL LAW, CONTRACT or BEST PRACTICE.
- Never present a contractual processor deadline as a statutory one.
- Never recommend delaying notification to complete an investigation.

OUTPUT FORMAT
Open with the notification deadline as a date and time, the authority or authorities to notify, and whether data subjects must be told. Then the sections above, with the draft notification, communication and register entry as usable blocks. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A US-headquartered SaaS company with an Irish subsidiary discovers that a misconfigured storage bucket exposed customer support tickets from users in six Member States.',
      result:
        'Confidentiality breach confirmed, awareness fixed at the time engineering confirmed the exposure with the 72-hour deadline calculated, routing tested against whether decisions on the processing are actually taken in Ireland with the main establishment flagged for lawyer review, the risk threshold met but high risk not met on the data involved, a phased authority notification drafted with open facts marked, a register entry, and a parallel contractual notice to enterprise customers flagged.',
    },
  },
  {
    id: 'eu-gdpr-art28-dpa-auditor',
    name: 'Article 28 DPA Auditor',
    description: 'Audits a vendor data processing agreement against Article 28 GDPR and the applicable transfer provisions.',
    jurisdiction: 'eu',
    category: 'privacy',
    tags: ['data-protection', 'review', 'gdpr', 'processor', 'third-party-risk', 'international-transfers', 'sccs'],
    sources: [
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation), Articles 28, 32, 33(2) and Chapter V', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Article 28(3) lists the mandatory contents of a processor contract. Article 33(2) requires a processor to notify the controller without undue delay after becoming aware of a personal data breach; it sets no fixed number of hours.' },
      { citation: 'Commission Implementing Decision (EU) 2021/915 (standard contractual clauses between controllers and processors) and Implementing Decision (EU) 2021/914 (SCCs for international transfers)', authority: 'regulator', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://commission.europa.eu' },
      { citation: 'EDPB Guidelines on the concepts of controller and processor', authority: 'guidance', publisher: 'European Data Protection Board', jurisdiction: 'eu', url: 'https://www.edpb.europa.eu' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['technology', 'professional-services', 'financial-services'],
    relatedSkills: ['eu-transfer-impact-assessor', 'cross-transfer-mechanism-picker', 'eu-dora-third-party-reviewer'],
    whatItDoes:
      'Audits a data processing agreement clause by clause against the mandatory contents of Article 28(3), confirms the controller and processor roles are genuine rather than labelled, tests the sub-processor, audit, security and deletion terms, and checks that any transfer outside the EEA is covered by a valid transfer tool. It distinguishes what the GDPR requires from what is a sensible contractual preference, labelling each recommendation, so negotiations are not derailed by demands presented as legal requirements that are not.',
    whenToUse:
      'Before signing or renewing any vendor contract under which the vendor processes personal data on your behalf, when a vendor issues its own data processing terms, when adding a sub-processor, and in periodic vendor-contract reviews. Not for: the transfer impact assessment itself (use the transfer impact assessor) or DORA ICT contracts for financial entities (use the DORA reviewer).',
    inputs: [
      { name: 'Agreement', description: 'The DPA and the main agreement it attaches to, including annexes and sub-processor lists.', required: true },
      { name: 'Processing description', description: 'What the vendor does with the data, the data categories, data subjects and duration.', required: true },
      { name: 'Party roles', description: 'Which side is controller, processor or joint controller, and why.' },
      { name: 'Locations', description: 'Where data is stored and accessed, including support access and sub-processor locations.' },
      { name: 'Your positions', description: 'Any internal playbook positions on liability, audit, notification timing or deletion.' },
    ],
    outputs: [
      { name: 'Role check', description: 'Whether the roles described match the processing in fact.' },
      { name: 'Article 28(3) checklist', description: 'Each mandatory element marked present, deficient or missing, with clause references.' },
      { name: 'Transfer check', description: 'Whether any restricted transfer is covered by a valid tool and which module applies.' },
      { name: 'Recommended changes', description: 'Replacement wording, each labelled as legally required or contractual preference.' },
      { name: 'Sub-processor review', description: 'Authorisation mechanism, flow-down and objection rights.' },
      { name: 'Lawyer review list', description: 'Role disputes, liability questions and unusual terms.' },
    ],
    prompt: `You are an EU data protection lawyer auditing a data processing agreement against Article 28 GDPR.

CURRENT-LAW STATUS (as at 2026-09-16)
- Article 28(3) GDPR sets the mandatory contents of a controller-processor contract [CONFIRMED].
- Article 33(2): a processor must notify the controller without undue delay after becoming aware of a personal data breach. The GDPR sets no fixed number of hours [CONFIRMED]. Any 24, 48 or 72-hour processor notice period is a contractual preference, not a legal requirement.
- Commission standard contractual clauses exist for controller-processor contracts and for international transfers [CONFIRMED; VERIFY no replacement decision has been adopted].

INPUTS
- Agreement: <DPA, main agreement, annexes, sub-processor list>
- Processing: <what the vendor does, data categories, data subjects, duration>
- Roles: <controller, processor, joint controller, and why>
- Locations: <storage, access, support, sub-processors>
- Your positions: <playbook positions>

TASK
1. SCOPE GATE. Confirm the GDPR applies to the processing and that the vendor acts as processor. If the vendor determines purposes and means of its own, it may be a controller or joint controller; stop the Article 28 audit for that processing and flag the role question.
2. MISSING INFORMATION. Identify missing annexes, sub-processor lists and processing descriptions. A DPA without a description of the processing fails Article 28(3) on its face.
3. ROLE CHECK. Test the labels against the facts using EDPB guidance: who decides purposes and essential means, whether the vendor uses the data for its own purposes such as product improvement or analytics, and whether any such use makes it a controller for that part.
4. ARTICLE 28(3) CHECKLIST. For each mandatory element, mark PRESENT, DEFICIENT or MISSING with the clause reference: subject matter, duration, nature and purpose, types of personal data and categories of data subjects; obligations and rights of the controller; processing only on documented instructions, including on transfers, and informing the controller if an instruction infringes the law; confidentiality of authorised persons; security measures under Article 32; conditions for engaging sub-processors, prior authorisation and flow-down of equivalent obligations with the processor remaining liable; assistance with data subject rights; assistance with security, breach notification, DPIAs and prior consultation; deletion or return at the end and deletion of copies unless law requires storage; and making available information to demonstrate compliance and allowing and contributing to audits and inspections.
5. BREACH NOTICE TERM. Check the processor's breach notification duty. The legal floor is without undue delay. If recommending a fixed period, label it CONTRACTUAL PREFERENCE and explain the operational reason — typically that the controller's own 72-hour clock may run from the processor's awareness.
6. SUB-PROCESSORS. Review general or specific authorisation, the notice period for changes, the right to object and its consequence, flow-down terms and the current list.
7. TRANSFER CHECK. Identify any transfer or remote access outside the EEA, including by sub-processors and support staff. Check adequacy or a valid transfer tool, the correct SCC module, and whether a transfer impact assessment is needed. Route that assessment to the transfer impact assessor.
8. OTHER TERMS. Review liability and indemnity allocation, audit mechanics and costs, security annex specificity, data location commitments and government access requests. Label these as negotiated terms unless tied to a legal requirement.
9. RECOMMENDED CHANGES. Give replacement wording for each deficiency, labelled GDPR REQUIRED or CONTRACTUAL PREFERENCE.
10. LAWYER REVIEW TRIGGERS. Escalate: vendor use of data for its own purposes; missing transfer tools; unlimited liability disputes; refusal of audit rights; and special category data.

RULES
- Label every recommendation GDPR REQUIRED, SCC REQUIRED, EDPB GUIDANCE or CONTRACTUAL PREFERENCE.
- Never present a fixed-hour processor breach notice as a GDPR requirement.
- Test roles on facts, not labels.

OUTPUT FORMAT
Open with the role conclusion and the number of missing mandatory elements. Then the sections above, with the Article 28(3) checklist as a table and replacement wording as usable text. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A company reviews a CRM vendor’s standard data processing addendum that permits the vendor to use customer data to improve its products and lists sub-processors in three non-EEA countries.',
      result:
        'Product-improvement use flagged as making the vendor a controller for that purpose, the Article 28(3) checklist showing missing deletion-of-copies and instruction-infringement terms, the breach notice term already at without undue delay with a 48-hour period offered only as a labelled contractual preference, two non-EEA sub-processors found to lack a documented transfer tool, and replacement wording labelled by whether it is legally required.',
    },
  },
];
