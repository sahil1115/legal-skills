import type { Skill } from '../../types/skill';

/**
 * Cross-jurisdiction skills — reconciling two or more regimes into one answer.
 */
export const crossSkills: Skill[] = [
  {
    id: 'cross-contract-localizer',
    name: 'Contract Localizer',
    description: 'Adapts a contract drafted for one jurisdiction to work in another.',
    jurisdiction: 'cross',
    category: 'contracts',
    tags: ['contract-lifecycle', 'drafting', 'localisation', 'multi-jurisdiction', 'contract-adaptation', 'expansion'],
    sources: [
      { citation: 'General commercial contracting and legal operations practice', authority: 'secondary', note: 'A workflow skill: no single binding instrument governs it. The output must still be checked against the law of the governing jurisdiction.' },
      { citation: 'Mandatory local rules and consumer protection regimes of the target jurisdiction', authority: 'primary', note: 'Which mandatory rules survive a foreign choice of law is jurisdiction specific and must be confirmed with local counsel.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['au-acl-unfair-terms', 'global-draft-builder'],
    whatItDoes:
      'Takes a contract written for one legal system and identifies what breaks when you use it in another: terms that are void or unenforceable in the target jurisdiction, mandatory local requirements the draft omits, concepts that have no local equivalent, and language whose meaning shifts. It separates changes that are legally required from those that are merely advisable, and rewrites the affected clauses rather than listing concerns.',
    whenToUse:
      'When expanding into a new market, when a counterparty insists on local law, when a group standardises paper across regions, or when an acquired business brings contracts drafted for a different system.',
    inputs: [
      { name: 'Source contract', description: 'The agreement as drafted, with its governing law.', required: true },
      { name: 'Source jurisdiction', description: 'The legal system the contract was written for.', required: true },
      { name: 'Target jurisdiction', description: 'Where it now needs to work.', required: true },
      { name: 'Counterparty type', description: 'Consumer, small business or enterprise — mandatory protections vary sharply by this.', required: true },
      { name: 'Commercial priorities', description: 'The positions that must survive localisation.' },
    ],
    outputs: [
      { name: 'Enforceability findings', description: 'Clauses void, unenforceable or materially weakened in the target jurisdiction.' },
      { name: 'Mandatory additions', description: 'Local requirements the draft is missing.' },
      { name: 'Concept translation', description: 'Source-law concepts with no local equivalent, and how to achieve the same effect.' },
      { name: 'Localised draft', description: 'The contract rewritten, with every change marked.' },
      { name: 'Change log', description: 'Each change classified as required, advisable or optional, with the reason.' },
      { name: 'Local counsel questions', description: 'The points that must be confirmed locally, phrased as closed questions.' },
    ],
    prompt: `You are a cross-border commercial lawyer localising a contract for a different jurisdiction.

INPUTS
- Source contract: <paste>
- Source jurisdiction and governing law: <required>
- Target jurisdiction: <required>
- Counterparty type in the target market: <consumer / small business / enterprise>
- Commercial priorities: <the positions that must survive>
- Governing law decision: <keeping source law, switching to target law, or undecided>

TASK
1. GOVERNING LAW ANALYSIS: can the parties keep the source governing law? Address the limits — mandatory local rules that apply regardless of the chosen law, consumer protections that cannot be contracted out of, and local rules on jurisdiction and enforcement. Say plainly that choosing a foreign law does not escape local mandatory rules, and identify which ones survive the choice here.
2. ENFORCEABILITY FINDINGS. Go clause by clause and flag every provision that is void, unenforceable, or materially weakened in the target jurisdiction. Give particular attention to the categories that most often break on localisation:
   - Limitation and exclusion of liability, and any local cap on excluding particular liabilities
   - Indemnities, and whether they operate the same way locally
   - Liquidated damages and penalty provisions, and any local doctrine that strikes them down
   - Restraint of trade, non-compete and non-solicit provisions
   - Automatic renewal and unilateral variation rights
   - Unfair terms regimes applying to standard-form contracts
   - Termination for convenience and termination on insolvency
   - Consumer protections and any local cooling-off or cancellation right
   - Employment-adjacent provisions where the counterparty may be reclassified locally
   - Data protection, and whether the local regime requires a separate instrument
   - Entire agreement, exclusion of pre-contractual representations, and how local law treats them
   For each: quote the clause, state the problem, and mark the confidence of the finding.
3. MANDATORY ADDITIONS: what the target jurisdiction requires that the draft omits — required disclosures, statutory notices, prescribed formalities, execution and signing requirements, language requirements, registration or stamping obligations, and any required local dispute or complaint mechanism.
4. CONCEPT TRANSLATION: source-law concepts that have no direct local equivalent. Typical examples include consideration, trust and equitable concepts, common-law implied terms, good faith and its differing content between systems, and remedies such as specific performance. For each, explain what the clause was trying to achieve and how to achieve the same commercial effect under the target system.
5. LOCALISED DRAFT: produce the rewritten contract. Mark every change [REQUIRED], [ADVISABLE] or [OPTIONAL], and keep the commercial priorities intact wherever the law allows.
6. CHANGE LOG: a table of every change — clause, what changed, classification, and the reason.
7. LOCAL COUNSEL QUESTIONS: for every finding you marked below high confidence, write a specific closed question for local counsel. Group them so a single instruction covers the lot, and order them by how much the answer changes the draft.

RULES
- Be explicit about confidence. Local mandatory rules are exactly where a confident-sounding but wrong answer causes damage — mark uncertain findings clearly and route them to question 7.
- Distinguish legally required changes from commercially advisable ones. Conflating them wastes negotiating capital.
- Do not silently drop a clause because it is problematic. Explain what it protected and offer the local route to the same protection.
- Where the counterparty is a consumer or small business, check the applicable unfair terms regime first — it usually drives the largest number of changes.

OUTPUT FORMAT
Seven sections matching the tasks above.`,
    example: {
      scenario:
        'A US software company takes its standard subscription terms into the Australian small-business market.',
      result:
        'A governing law analysis explaining which local protections survive the US law choice, eight clauses flagged under the unfair terms regime including unilateral variation and auto-renewal, a localised draft with each change classified, and six closed questions for Australian counsel.',
    },
  },
  {
    id: 'cross-four-regime-gap-analyzer',
    name: 'Four-Regime Gap Analyzer',
    description: 'Compares an obligation across four regimes and finds the gaps a single programme would leave.',
    jurisdiction: 'cross',
    category: 'compliance',
    tags: ['regulatory-change', 'assessment', 'multi-jurisdiction', 'gap-analysis', 'comparison', 'programme-design', 'compliance'],
    sources: [
      { citation: 'The regimes being compared, as supplied by the user', authority: 'secondary', note: 'This skill provides the comparison framework. It does not supply the current text of any regime and every cell it produces requires verification.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['cross-strictest-rule-resolver', 'global-horizon-scanner'],
    whatItDoes:
      'Takes one compliance topic — breach notification, data subject rights, consent, record-keeping — and compares how four regimes handle it along the dimensions that actually matter operationally: what triggers the obligation, what the deadline is, who must be told, what must be in the notice, and what the exceptions are. The point is the gap analysis: where a single global process quietly fails one regime, and whether the fix is to run the strictest rule everywhere or to branch.',
    whenToUse:
      'When designing a global compliance process, when assessing whether an existing programme actually covers a new market, or when deciding whether to standardise on the strictest standard or maintain regional variants.',
    inputs: [
      { name: 'Obligation topic', description: 'The single topic to compare, e.g. "breach notification to the regulator".', required: true },
      { name: 'Regimes', description: 'The four (or more) regimes to compare.', required: true },
      { name: 'Current process', description: 'What you do today — this is what the gaps are measured against.' },
      { name: 'Operational constraints', description: 'What your systems and teams can realistically do.' },
    ],
    outputs: [
      { name: 'Comparison grid', description: 'Regime by dimension, with each cell confidence-marked.' },
      { name: 'Strictest-rule map', description: 'Which regime sets the binding constraint on each dimension.' },
      { name: 'Gap analysis', description: 'Where the current process fails each regime, and how badly.' },
      { name: 'Unified process design', description: 'A single process meeting every requirement, with its cost.' },
      { name: 'Branch points', description: 'Where a single process cannot work and branching is unavoidable.' },
      { name: 'Verification list', description: 'The cells to confirm before the design is relied on.' },
    ],
    prompt: `You are a multi-jurisdiction compliance specialist comparing one obligation across several regimes.

INPUTS
- Obligation topic: <one topic only — e.g. "personal data breach notification to the regulator", "responding to a data subject access request", "obtaining valid consent for marketing">
- Regimes to compare: <four or more>
- Current process: <what we do today, step by step>
- Operational constraints: <systems, team size, coverage hours, what is realistically achievable>

TASK
1. NORMALISE THE OBLIGATION: define the topic precisely enough to compare like with like. If the regimes conceptualise it differently, say so and define the comparison dimensions carefully — this framing determines whether the comparison is meaningful.
2. COMPARISON GRID: regimes as rows, dimensions as columns. Use dimensions that matter operationally:
   - What triggers the obligation, and from what moment
   - Whether there is a materiality or harm threshold, and what it is
   - The deadline, and when the clock starts
   - Who must be notified or served
   - What the notice or response must contain
   - Whether a second or follow-up stage is required
   - Available exceptions and how hard they are to rely on
   - Consequences of getting it wrong
   Mark every cell:
   [HIGH] confident
   [MEDIUM] believed correct — verify
   [LOW] general impression only
   [UNKNOWN] researching this is a task, not an answer
3. STRICTEST-RULE MAP: for each dimension, which regime sets the binding constraint and what it is. The strictest rule is not always the same regime across dimensions — one may have the shortest deadline while another has the lowest threshold and a third demands the most content. Make that explicit, because it is what defeats the intuition that one regime is "the strictest".
4. GAP ANALYSIS: test the current process against each regime, dimension by dimension. For each gap: which regime, which dimension, the size of the gap, and the practical consequence. Rank by exposure.
5. UNIFIED PROCESS DESIGN: design one process that satisfies every regime by applying the strictest rule on each dimension. Set out the steps, timings, decision points, owners and templates. Then state honestly what this costs — the strictest-everywhere approach usually means acting faster and disclosing more than most regimes require, and that has a real operational and reputational price.
6. BRANCH POINTS: where a single process cannot work — because two regimes impose genuinely incompatible requirements, or because applying the strictest rule everywhere would be disproportionate. For each, define the branch condition precisely enough that an operator at 2am can route correctly without legal input.
7. VERIFICATION LIST: every cell marked MEDIUM, LOW or UNKNOWN, prioritised by how much the answer changes the design, with the source to check.

RULES
- Use [UNKNOWN] freely. A grid full of confident-looking cells that have not been verified is the failure mode of this exercise.
- Do not assume one regime is strictest overall. Compare dimension by dimension.
- Make branch conditions operational. A branch that requires legal judgement at the moment of the incident is not a working process.
- Where a regime's requirement depends on facts the business will not know quickly, flag it — that is a design constraint, not a detail.

OUTPUT FORMAT
Seven sections matching the tasks above.`,
    example: {
      scenario:
        'A company operating in four regions compares personal data breach notification obligations before rewriting its incident response plan.',
      result:
        'A grid showing the shortest clock in one regime, the lowest notification threshold in another and the most demanding notice content in a third, a current process failing two regimes on timing, a unified 24-hour internal escalation design, and one unavoidable branch where a scale-based threshold cannot be applied globally.',
    },
  },
  {
    id: 'cross-transfer-mechanism-picker',
    name: 'Transfer Mechanism Picker',
    description: 'Selects the right cross-border data transfer mechanism across multiple source regimes.',
    jurisdiction: 'cross',
    category: 'privacy',
    tags: ['data-protection', 'assessment', 'data-transfers', 'multi-jurisdiction', 'sccs', 'privacy', 'mechanism-selection'],
    sources: [
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu' },
      { citation: 'Personal Data Protection Act 2012 (Singapore)', authority: 'primary', publisher: 'Singapore Statutes Online', jurisdiction: 'sg', url: 'https://sso.agc.gov.sg' },
      { citation: 'Privacy Act 1988 (Cth) and the Australian Privacy Principles', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au' },
      { citation: 'Cross-border transfer rules of each exporting jurisdiction', authority: 'primary', note: 'Regimes differ in kind, not only in detail: some prescribe permitted mechanisms, others impose an outcome obligation on the exporter that no standard form fully discharges.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['eu-transfer-impact-assessor', 'sg-pdpa-obligation-mapper'],
    whatItDoes:
      'Handles the case where personal data moves out of several jurisdictions at once — an EU parent, an Australian subsidiary and a Singapore entity all sending data to one processor — and each source regime has its own transfer rules. It works out what each source requires, identifies whether one instrument can carry several regimes or whether separate paperwork is needed, and produces the document set with the assessment obligations each mechanism brings.',
    whenToUse:
      'When onboarding a global vendor, when consolidating processing into a shared service centre, when a group restructures data flows, or when an adequacy or transfer decision changes and existing arrangements need re-papering.',
    inputs: [
      { name: 'Data flows', description: 'Every source jurisdiction, the destination, and what data moves on each leg.', required: true },
      { name: 'Source regimes', description: 'The privacy laws applying to each exporting entity.', required: true },
      { name: 'Destination', description: 'Where data lands and every country it can be accessed from.', required: true },
      { name: 'Relationship', description: 'Controller to processor, controller to controller, or intra-group.', required: true },
      { name: 'Existing paperwork', description: 'Transfer agreements already in place.' },
    ],
    outputs: [
      { name: 'Flow map', description: 'Every transfer leg with its source regime and applicable rules.' },
      { name: 'Mechanism options', description: 'What each source regime permits, compared.' },
      { name: 'Recommended set', description: 'The instruments to put in place, and which flows each covers.' },
      { name: 'Consolidation analysis', description: 'Where one document can serve several regimes and where it cannot.' },
      { name: 'Assessment obligations', description: 'The impact assessments each mechanism requires alongside the paperwork.' },
      { name: 'Implementation plan', description: 'Signing sequence, annexes needed and review triggers.' },
    ],
    prompt: `You are a global privacy lawyer selecting cross-border data transfer mechanisms across multiple source regimes.

INPUTS
- Data flows: <for each leg: exporting entity and its jurisdiction, importing entity and its jurisdiction, data categories, purpose, volume>
- Source regimes: <the privacy laws applying to each exporting entity>
- Destination: <where data lands, and every country from which it can be accessed, including remote support>
- Relationship on each leg: <controller to processor, controller to controller, processor to sub-processor, intra-group>
- Existing paperwork: <transfer agreements, intra-group agreements, DPAs already in place>

TASK
1. FLOW MAP: enumerate every transfer leg, including onward transfers, sub-processors, and remote access from a third country. Remote access is a transfer — check for it explicitly on every leg, because it is the one most often missed. Note where a single vendor relationship generates several legs with different source regimes.
2. PER-REGIME REQUIREMENTS. For each source regime, set out how it regulates outbound transfers:
   - Does it operate an adequacy or whitelisting concept, and would the destination be covered? Mark [VERIFY] — these decisions change.
   - What contractual mechanisms does it recognise (standard clauses, binding corporate rules, certification, approved codes)?
   - Does it require a separate impact assessment, and of what?
   - Does it require consent, notification, or filing with a regulator?
   - Does it impose an accountability standard on the exporter that survives the contract (a duty to ensure comparable protection, for example)?
   Be explicit that regimes differ in kind here, not just in detail: some operate a permitted-mechanism model, others impose an outcome obligation on the exporter that no standard form fully discharges.
3. MECHANISM OPTIONS: compare the available options for each leg on effort to implement, ongoing burden, flexibility as flows change, and how well they are understood by counterparties.
4. CONSOLIDATION ANALYSIS: where can one instrument carry several regimes? A single agreement can often be structured with a core body plus regime-specific schedules, but say clearly where that does not work — where a regime demands its own prescribed form, its own signatories, or its own assessment. Do not over-consolidate to a document that satisfies nobody fully.
5. RECOMMENDED SET: the specific instruments to put in place, which flows and regimes each covers, who signs, and what annexes each needs (data categories, purposes, retention, technical and organisational measures, sub-processor lists). Flag where the correct module or variant matters and how to choose it.
6. ASSESSMENT OBLIGATIONS: the mechanism is only half the requirement. For each regime, state what assessment must accompany it — a transfer impact assessment, a risk assessment of the destination's law, or a documented conclusion that the recipient provides a comparable standard. Note that this is where most programmes are thin and where a regulator looks first.
7. IMPLEMENTATION PLAN: signing sequence, dependencies, what must be in place before data moves, and the review triggers — a change in adequacy status, a new sub-processor, a new destination country, a change in the data or purpose, or the periodic review date.
8. GAPS: flows you cannot paper adequately with the mechanisms available, and the options — restructure the flow, keep the data local, or apply technical measures that take the data out of scope.

RULES
- Never state a country's adequacy or whitelisting status as settled. Mark [VERIFY] with the source to check.
- Do not assume one regime's standard clauses satisfy another. They usually do not, even where the substance overlaps.
- Treat remote access, backups and disaster recovery as transfers.
- Where the flow is intra-group, still paper it — group membership is not a transfer mechanism.

OUTPUT FORMAT
Eight sections matching the tasks above.`,
    example: {
      scenario:
        'A group with entities in the EU, Australia and Singapore consolidates HR data into a single vendor platform hosted in one destination country.',
      result:
        'A flow map surfacing nine legs including two remote-access legs nobody had papered, a per-regime comparison showing one regime needs its own prescribed form while the other two can share a core agreement with schedules, a recommended instrument set, and a note that the exporter-side assessment obligations were the real gap rather than the contracts.',
    },
  },
  {
    id: 'cross-strictest-rule-resolver',
    name: 'Strictest-Rule Resolver',
    description: 'Resolves conflicting multi-jurisdiction requirements into one defensible operating standard.',
    jurisdiction: 'cross',
    category: 'compliance',
    tags: ['regulatory-change', 'programme-design', 'conflict-of-laws', 'multi-jurisdiction', 'standards', 'policy-design', 'compliance'],
    sources: [
      { citation: 'Conflict-of-laws and multi-jurisdiction compliance practice', authority: 'secondary', note: 'A decision framework. Whether two requirements genuinely conflict is a legal question for qualified counsel in each jurisdiction.' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['cross-four-regime-gap-analyzer', 'global-horizon-scanner'],
    whatItDoes:
      'Takes a set of requirements from different jurisdictions that point in different directions and produces a single operating standard, dimension by dimension. It handles the case people assume away — where requirements genuinely conflict rather than merely differ, so that complying with one means breaching another — and forces an explicit, documented decision with its reasoning, instead of a policy that silently picks one and hopes.',
    whenToUse:
      'When writing a global policy, when a "just apply the strictest rule" instruction turns out to be impossible, when two regulators want incompatible things, or when a group standard has to hold up in every market it covers.',
    inputs: [
      { name: 'The requirements', description: 'Each jurisdiction\'s requirement on the same topic, as specifically as possible.', required: true },
      { name: 'Topic', description: 'The single subject being standardised.', required: true },
      { name: 'Operating footprint', description: 'Where you operate and the relative exposure in each place.', required: true },
      { name: 'Operational constraints', description: 'What a single global process can realistically do.' },
      { name: 'Risk appetite', description: 'Where the organisation is willing to accept residual risk.' },
    ],
    outputs: [
      { name: 'Requirement decomposition', description: 'Each requirement broken into comparable dimensions.' },
      { name: 'Conflict classification', description: 'Which differences are stricter-versus-looser and which are true conflicts.' },
      { name: 'Resolved standard', description: 'The single operating standard, dimension by dimension, with the source of each choice.' },
      { name: 'True conflict decisions', description: 'Where a choice had to be made, the options, the recommendation and the residual risk.' },
      { name: 'Local carve-outs', description: 'Where a jurisdiction must be handled separately, with the trigger.' },
      { name: 'Decision record', description: 'The documented reasoning, in the form a regulator would want to see.' },
    ],
    prompt: `You are a global compliance lead resolving conflicting multi-jurisdiction requirements into a single operating standard.

INPUTS
- Topic: <the single subject being standardised — e.g. retention of employee records, incident notification, consent for marketing, monitoring of employee communications>
- Requirements: <for each jurisdiction, the requirement as specifically as you can state it>
- Operating footprint: <where we operate, headcount and revenue exposure in each, which regulators supervise us>
- Operational constraints: <what a single global process can realistically do>
- Risk appetite: <where the organisation will accept residual risk, and where it will not>

TASK
1. REQUIREMENT DECOMPOSITION: break each jurisdiction's requirement into comparable dimensions — scope of application, threshold, timing, content, process, evidence and record-keeping, and consequence of failure. Comparing whole requirements is what makes people miss conflicts; comparing dimensions is what surfaces them.
2. CONFLICT CLASSIFICATION. For each dimension, classify the relationship between the jurisdictions:
   - ALIGNED: they require the same thing.
   - STRICTER/LOOSER: one requires more than another, and satisfying the stricter satisfies both. Name which is stricter.
   - TRUE CONFLICT: complying with one means breaching the other. These are rare but real — a duty to retain data in one place against a duty to erase it in another; a duty to disclose against a prohibition on disclosure; a blocking rule against a production obligation; a local data residency rule against a centralisation requirement.
   - INDEPENDENT: they address different things and both apply cumulatively.
   Be rigorous about the difference between STRICTER/LOOSER and TRUE CONFLICT. Most apparent conflicts are the former, and treating one as the latter creates unnecessary carve-outs. But do not force a true conflict into the stricter/looser box for tidiness — that produces a standard that breaches a law.
3. RESOLVED STANDARD: build the single operating standard dimension by dimension. For each, state the rule adopted, which jurisdiction it comes from, and why. Where the strictest rule is adopted, note what it costs relative to the minimum — the strictest standard is not free, and pretending otherwise makes the decision look unconsidered.
4. TRUE CONFLICT DECISIONS: for each true conflict, set out:
   - What the conflict is, precisely
   - The options, including ones that avoid the conflict rather than resolving it — restructuring the data flow, localising the process, changing who holds what, seeking a regulator's view, or obtaining consent where that is available
   - The exposure under each option, weighted by the operating footprint: probability of the issue arising, likely regulator response, and severity
   - A RECOMMENDATION with the reasoning
   - The residual risk that remains and who should accept it
   Recommend that a true conflict decision is taken at an appropriate level and recorded — not made implicitly in a policy document.
5. LOCAL CARVE-OUTS: where a jurisdiction must be handled separately. For each, define the trigger condition precisely enough to be operational, and say what the local variant is. Keep carve-outs to the minimum that the conflicts actually require.
6. DECISION RECORD: produce the documented reasoning in the form a regulator or a court would want to see — what was considered, what alternatives were weighed, why the chosen approach was reasonable, and who decided. A defensible decision that was documented at the time is worth far more than a better decision reconstructed afterwards.
7. REVIEW TRIGGERS: what would require the standard to be revisited.

RULES
- Never resolve a true conflict by ignoring one requirement. Name it, decide it, and record the residual risk.
- Do not default to "apply the strictest rule everywhere" without pricing it. Sometimes it is right; sometimes it is disproportionate and a carve-out is better.
- Where you cannot state a jurisdiction's requirement confidently, mark it and route it to verification rather than resolving around a guess.
- Weight the analysis by actual exposure. A requirement in a jurisdiction with two employees and no revenue does not deserve the same weight as one in the main market — say so explicitly rather than treating all jurisdictions as equal.

OUTPUT FORMAT
Seven sections matching the tasks above, opening with the number of true conflicts found.`,
    example: {
      scenario:
        'A global employer writes a single employee-monitoring standard covering markets with very different consent, notification and works-council requirements.',
      result:
        'Fourteen dimensions decomposed, eleven resolved as stricter-versus-looser into one standard, two independent requirements applied cumulatively, and one true conflict — a consultation requirement that cannot be satisfied by a globally uniform rollout — escalated with three options priced and a recommendation to stage the rollout by market.',
    },
  },
];
