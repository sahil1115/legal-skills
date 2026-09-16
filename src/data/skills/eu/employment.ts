import type { Skill } from '../../../types/skill';

/**
 * EU employment skills — platform work and the national measures transposing it.
 */
export const euEmploymentSkills: Skill[] = [
  {
    id: 'eu-platform-work-status-assessor',
    name: 'Platform Work Status Assessor',
    description: 'Tests platform worker arrangements against the presumption of employment and the algorithmic management rules.',
    jurisdiction: 'eu',
    category: 'employment',
    tags: ['workforce', 'assessment', 'worker-classification', 'independent-contractor', 'platform-work', 'algorithmic-management', 'misclassification'],
    sources: [
      { citation: 'Directive (EU) 2024/2831 on improving working conditions in platform work', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'A directive, not a regulation. It binds Member States as to the result and takes effect through national transposition, so the operative rules are the national ones. The transposition deadline and each national text must be checked.' },
      { citation: 'National transposing measures of the Member States', authority: 'primary', publisher: 'Member State legislatures', jurisdiction: 'eu', note: 'Member States set the presumption mechanism and may go further than the directive. Classification consequences, procedure and remedies are national, and divergence here is expected to be wide.' },
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Relied on for automated decision-making, data subject rights and the assessment obligations that apply to algorithmic management independently of the platform work rules.' },
      { citation: 'Court of Justice case law on the concept of worker', authority: 'primary', publisher: 'Court of Justice of the European Union', jurisdiction: 'eu', url: 'https://curia.europa.eu', note: 'The autonomous EU concept of worker operates alongside national classification tests and is not displaced by a contractual label.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['technology', 'professional-services', 'retail-consumer'],
    relatedSkills: ['uk-ir35-status-assessor', 'us-worker-classification', 'eu-member-state-delta'],
    whatItDoes:
      'Assesses a platform arrangement against the two things the platform work regime changed: a rebuttable presumption of employment that shifts the burden of proof onto the platform, and a set of obligations on algorithmic management that apply whatever the classification turns out to be. It works from how control is actually exercised rather than from the contract, separates the classification question from the algorithmic transparency question because a platform can lose on the second while winning the first, and treats the national transposing measure as the operative law rather than the directive text.',
    whenToUse:
      'Before launching or restructuring a platform model in an EU market, when transposition lands in a Member State where you operate, when automated systems are used to allocate work or terminate access, and on any classification claim or labour inspectorate enquiry.',
    inputs: [
      { name: 'The arrangement', description: 'The contract with the person performing work, and how the relationship actually operates day to day.', required: true },
      { name: 'Member States', description: 'Which countries the work is performed in, since the operative rules are national.', required: true },
      { name: 'Control facts', description: 'How pay, hours, appearance, conduct and task allocation are set, restricted or supervised in practice.', required: true },
      { name: 'Automated systems', description: 'What monitoring or decision-making systems are used, what they decide, and what human involvement exists.' },
      { name: 'Substitution and multi-apping', description: 'Whether the person may use substitutes, work for competitors, and refuse tasks without consequence.' },
      { name: 'Scale and history', description: 'Numbers engaged, typical earnings and duration, and any prior classification challenge or inspection.' },
    ],
    outputs: [
      { name: 'Applicability analysis', description: 'Whether the arrangement is platform work in each relevant Member State, on the transposed definition.' },
      { name: 'Presumption assessment', description: 'Whether the presumption of employment is triggered and how strong any rebuttal is on the facts.' },
      { name: 'Control evidence map', description: 'Each control indicator matched to the evidence that would be produced against it.' },
      { name: 'Algorithmic management gaps', description: 'Transparency, human oversight and review obligations against what the platform currently does.' },
      { name: 'Data protection overlay', description: 'Automated decision-making and monitoring obligations that apply independently of classification.' },
      { name: 'Reclassification exposure', description: 'Retroactive tax, social security and entitlement cost if the presumption is not rebutted.' },
      { name: 'Restructuring options', description: 'Changes that genuinely reduce control, separated from cosmetic changes that do not.' },
    ],
    prompt: `You are an EU employment lawyer assessing a digital labour platform arrangement under the platform work regime as transposed in the relevant Member States.

INPUTS
- The arrangement: <the contract with the person performing the work, and a description of how the relationship actually works day to day>
- Member States: <where the work is performed; list each, since the operative law is the national transposing measure>
- Control in practice: <how pay is set, whether rates can be negotiated, whether hours or availability are required, whether appearance or conduct standards apply, how tasks are allocated and whether they can be declined>
- Automated systems: <what systems monitor or decide; what they determine — allocation, pricing, ranking, suspension, deactivation; what human involvement exists and at what point>
- Substitution and competition: <may the person send a substitute? work for competing platforms? is either restricted in practice or penalised by the algorithm?>
- Scale: <numbers engaged, typical earnings and duration, prior classification claims, inspections or collective action>

TASK
1. INSTRUMENT AND OPERATIVE LAW. State at the outset that this is a directive rather than a regulation: it binds Member States as to the result and operates through national transposition, so the rules that actually apply are the national ones. Identify for each relevant Member State whether transposition has occurred, what the national measure provides, and whether it goes beyond the minimum — several are expected to. Mark the transposition deadline and each national position [VERIFY]. Do not analyse against the directive text where a national measure exists.
2. SCOPE. Determine whether the arrangement is platform work on the transposed definition: work organised through a digital labour platform and performed in the Union, regardless of the contractual designation and regardless of whether the platform is established outside the Union. Address the boundary cases honestly — a platform that merely advertises or introduces without organising the work may be outside scope, while one that sets price, allocates and supervises is not. State the conclusion for each Member State separately.
3. THE PRESUMPTION. Identify the national mechanism, since the directive leaves the design of the presumption to Member States rather than fixing a common list of criteria. Explain the structural change plainly: where facts indicating direction and control are present, the relationship is presumed to be an employment relationship, and the burden of proving otherwise falls on the platform rather than on the person claiming employee status. That reversal is the substance of the reform. Identify who may invoke it — the person, their representatives, a labour authority — and in what proceedings.
4. CONTROL EVIDENCE MAP. Work through the indicators of direction and control on the actual facts, not the contract, and for each state what evidence the platform would have to produce against it:
   - Whether the platform sets or caps remuneration, or restricts the ability to negotiate it.
   - Whether it requires compliance with binding rules on appearance, conduct towards recipients, or performance of the work.
   - Whether it supervises performance, including electronically, or assesses the quality of results.
   - Whether it restricts freedom to organise work, including through choosing working hours or periods of absence, to accept or refuse tasks, or to use substitutes.
   - Whether it restricts the ability to build a client base or to work for third parties.
   Address the practical-restriction point directly: a contractual right to refuse work or to multi-app is worth little if the ranking or allocation algorithm penalises its exercise, and that penalty is itself evidence of control. Produce a table with columns Indicator, Contract position, Actual practice, Evidence available and Weight.
5. REBUTTAL ASSESSMENT. Assess how strong a rebuttal would be on these facts, and be candid. State what the platform would need to demonstrate under the national procedure, what documentation exists and what does not, and identify the facts that most undermine the position. Do not present a weak rebuttal as arguable, and do not treat contractual wording as capable of rebutting facts that contradict it.
6. ALGORITHMIC MANAGEMENT. Assess this separately, because these obligations apply irrespective of employment status and a platform can comply with the classification analysis while failing here. Cover: transparency about automated monitoring and decision-making systems and what must be disclosed and to whom; the restrictions on processing certain categories of data, including data on emotional or psychological state, private conversations, and data predicting exercise of fundamental rights such as collective action; the requirement for human oversight and regular monitoring of the impact of automated decisions; the right to obtain an explanation of a significant decision and to have it reviewed by a human; the specific treatment of restriction, suspension and termination of an account, which are treated as significant decisions; and information and consultation obligations toward workers representatives. Map each against what the platform currently does and mark the gaps.
7. DATA PROTECTION OVERLAY. Run the parallel obligations that apply independently: the rules on decisions based solely on automated processing producing legal or similarly significant effects, the lawful basis for monitoring where consent is generally not available in this context because of the imbalance, the assessment obligation for high-risk processing, transparency and access rights including access to the logic involved, and purpose limitation on data collected through the platform. Where the same practice is exposed under both regimes, say so — enforcement can come from either regulator and the remedies differ.
8. RECLASSIFICATION EXPOSURE. Quantify what losing looks like, by Member State and structurally rather than by inventing figures: retroactive social security contributions and the periods open to recovery, income tax and withholding exposure, minimum wage and working time entitlements including rest and paid leave, dismissal protection, collective agreement coverage, employer liability insurance, and penalties. Note that liability may extend to periods before transposition under pre-existing national tests and case law, since the autonomous EU concept of worker and national classification tests operated before this regime and were already being applied to platforms. Mark limitation periods [VERIFY].
9. RESTRUCTURING OPTIONS. Separate changes that genuinely reduce control from cosmetic ones. State plainly that rewriting the contract, relabelling the relationship, adding a substitution clause that nobody uses, or requiring the person to incorporate does not address facts about how the work is organised, and that such steps can worsen the position by evidencing awareness. Genuine options involve ceding real control: allowing rate negotiation, removing algorithmic penalties for refusal or multi-apping, and removing supervision of how the work is performed. For each option give the commercial consequence honestly, and where the business model depends on the control, say that the realistic choice is to accept employment status and price it rather than to engineer around it.

RULES
- Analyse against the national transposing measure, never the directive text alone, and run each Member State separately. Divergence here is expected to be wide.
- Work from how the relationship actually operates. A contractual label, a substitution clause or a self-employment declaration does not answer the question and never has.
- Treat the burden reversal as the central change. Frame the analysis as what the platform can prove, not what the worker must show.
- Keep classification and algorithmic management separate. The second applies regardless of the first.
- Do not present contract redrafting as a solution to facts about control.
- Mark transposition status, national criteria, limitation periods and penalty levels [VERIFY].

OUTPUT FORMAT
Open with the classification conclusion for each Member State and the strength of any rebuttal. Then the sections above, with the control evidence table and an algorithmic management gap table, closing with restructuring options and their commercial consequences.`,
    example: {
      scenario:
        'A delivery platform operating in three Member States reviews its courier model after transposition, relying on contractual terms permitting substitution and work for competitors.',
      result:
        'Scope confirmed in all three with two having transposed on broader criteria than the directive minimum, the presumption triggered on rate-setting and electronic supervision, the substitution and multi-apping clauses assessed as weak rebuttal evidence because the allocation algorithm demonstrably reduced offers after refusals, separate algorithmic management gaps identified on explanation and human review of deactivations irrespective of classification, retroactive social security exposure framed by Member State with limitation periods flagged, and contract redrafting rejected as a response to facts about control.',
    },
  },
];
