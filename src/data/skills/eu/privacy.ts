import type { Skill } from '../../../types/skill';

/**
 * EU privacy skills — GDPR accountability documents and international transfers.
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
];
