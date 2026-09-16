import type { Skill } from '../../../types/skill';

/**
 * UK regulatory skills — financial conduct regulation and online safety.
 */
export const ukRegulatorySkills: Skill[] = [
  {
    id: 'uk-fca-consumer-duty-outcome-assessment',
    name: 'FCA Consumer Duty Outcome Assessor',
    description: 'Assesses a product or journey against the four Consumer Duty outcomes and builds monitoring and board report material.',
    jurisdiction: 'uk',
    category: 'regulatory',
    tags: ['financial-services', 'assessment', 'consumer-duty', 'fair-value', 'outcomes-monitoring', 'vulnerable-customers'],
    sources: [
      { citation: 'FCA Handbook, PRIN 2A (the Consumer Duty)', authority: 'regulator', publisher: 'Financial Conduct Authority', jurisdiction: 'uk', url: 'https://www.fca.org.uk', note: 'Binding rules: the Consumer Principle, the cross-cutting obligations, the four outcomes, monitoring under PRIN 2A.9 and the governing body report under PRIN 2A.8. Confirmed as at 2026-09-16.' },
      { citation: 'FCA finalised guidance on the Consumer Duty (FG22/5)', authority: 'guidance', publisher: 'Financial Conduct Authority', jurisdiction: 'uk', url: 'https://www.fca.org.uk' },
      { citation: 'FCA good and poor practice publications on board reports, fair value frameworks and outcomes', authority: 'guidance', publisher: 'Financial Conduct Authority', jurisdiction: 'uk', url: 'https://www.fca.org.uk', note: 'Supervisory observations, not rules, but a strong indication of what supervisors expect to see.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services'],
    relatedSkills: ['uk-fca-conduct-breach-notification-triage', 'au-ddo-tmd-builder', 'uk-consumer-rights-checker'],
    whatItDoes:
      'Assesses a retail financial product or customer journey against the four Consumer Duty outcomes — products and services, price and value, consumer understanding, and consumer support — and the cross-cutting obligations, using outcome evidence rather than process descriptions. It tests fair value for each customer group including those with characteristics of vulnerability, identifies the management information needed to show outcomes are good, and produces material for the governing body report the rules require.',
    whenToUse:
      'When launching or changing a retail product, during the periodic fair value review, when outcome data shows a group of customers doing worse than others, and when preparing the annual governing body report. Not for: conduct rules breach notifications (use the conduct breach skill), non-retail customers, or Australian product governance.',
    inputs: [
      { name: 'Product or journey', description: 'What it is, the target market, distribution chain and firm’s role as manufacturer or distributor.', required: true },
      { name: 'Price and value data', description: 'All charges, costs, benefits, and any cross-subsidies or differential pricing.', required: true },
      { name: 'Outcome data', description: 'Complaints, claims, cancellations, arrears, contact reasons, testing results and data by customer group.', required: true },
      { name: 'Communications', description: 'Key customer communications and any comprehension testing.' },
      { name: 'Support journeys', description: 'Servicing, switching, cancellation and complaints processes, with friction points.' },
    ],
    outputs: [
      { name: 'Scope and role check', description: 'Whether the Duty applies and the firm’s manufacturer or distributor responsibilities.' },
      { name: 'Outcome assessment', description: 'Each of the four outcomes assessed against evidence, with ratings.' },
      { name: 'Fair value analysis', description: 'Price and value by customer group, including customers with characteristics of vulnerability.' },
      { name: 'Foreseeable harm register', description: 'Harms identified and the actions to avoid them.' },
      { name: 'MI framework', description: 'Metrics that evidence each outcome, with thresholds and owners.' },
      { name: 'Board report material', description: 'Findings and actions in the form the governing body report needs.' },
    ],
    prompt: `You are a UK financial services regulatory lawyer assessing a retail product or customer journey under the FCA Consumer Duty.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
Rules in force:
- PRIN 2A: the Consumer Principle, the cross-cutting obligations to act in good faith, avoid causing foreseeable harm and enable and support customers to pursue their financial objectives, and the four outcomes [CONFIRMED, FCA Handbook].
- Monitoring of consumer outcomes under PRIN 2A.9 and a report to the governing body setting out monitoring results and actions under PRIN 2A.8 [CONFIRMED]. Report frequency [VERIFY — at least annually].
Guidance, not rules:
- Finalised guidance and published good and poor practice on board reports, fair value frameworks and outcomes.

INPUTS
- Product or journey: <description, target market, distribution chain, manufacturer or distributor>
- Price and value: <charges, costs, benefits, differential pricing, cross-subsidies>
- Outcome data: <complaints, claims, cancellations, arrears, contact reasons, testing, data by customer group>
- Communications: <key communications and testing>
- Support journeys: <servicing, switching, cancellation, complaints>

TASK
1. SCOPE GATE. Confirm the product or service is offered to retail customers within scope and identify the firm's role in the distribution chain. If the customers are not retail customers, stop.
2. MISSING INFORMATION. Identify outcome data that does not exist or is not broken down by customer group. The Duty is evidenced by outcomes; where outcome data is missing, record it as a gap rather than assessing from process descriptions.
3. PRODUCTS AND SERVICES. Test whether the product meets the needs, characteristics and objectives of the target market, whether the target market is correctly identified, and whether distribution matches it.
4. PRICE AND VALUE. Assess whether the price is reasonable relative to benefits for the target market as a whole and for each distinct customer group, including customers with characteristics of vulnerability, long-standing customers and those on legacy terms. Identify differential outcomes and any cross-subsidy that disadvantages a group.
5. CONSUMER UNDERSTANDING. Test whether communications equip customers to make effective, timely and properly informed decisions, using comprehension testing results where available.
6. CONSUMER SUPPORT. Test whether support meets customers' needs, including the ease of switching, cancelling, complaining and claiming compared with the ease of buying. Treat sludge practices as a finding.
7. CROSS-CUTTING OBLIGATIONS AND FORESEEABLE HARM. Record foreseeable harms and whether the firm acted to avoid them.
8. MI FRAMEWORK. For each outcome, define metrics that evidence good outcomes, the customer-group breakdowns, thresholds that trigger action, and owners. Separate activity metrics from outcome metrics.
9. BOARD REPORT MATERIAL. Produce findings, differential outcomes, actions taken and planned, and the evidence base in a form suitable for the governing body report, and state where the board needs to challenge or decide.
10. LAWYER AND COMPLIANCE REVIEW TRIGGERS. Escalate: poor outcomes for customers with characteristics of vulnerability; fair value failures; any potential need for redress; harm that may have occurred across a customer book; and issues that may require notification to the FCA.

RULES
- Assess outcomes on evidence, not on the existence of policies.
- Label each item RULE, FCA GUIDANCE, SUPERVISORY OBSERVATION or BEST PRACTICE.
- Assess each customer group separately; an average can hide poor outcomes.
- Do not conclude fair value without price and benefit data.

OUTPUT FORMAT
Open with an overall rating per outcome and the most serious finding. Then the sections above, with outcomes, fair value and the MI framework as tables. Close with: Assumptions made; [VERIFY] points; Lawyer and compliance review items.`,
    example: {
      scenario:
        'An insurer reviews a home insurance product where long-standing customers renew at higher prices and claims acceptance is lower for customers who call rather than use the app.',
      result:
        'Scope and manufacturer role confirmed, fair value assessed separately by tenure with long-standing customers identified as receiving poorer value, consumer support assessed as uneven between channels with claims acceptance data by channel requested where missing, foreseeable harm recorded for customers less able to use the app, an MI framework with outcome thresholds by customer group, and board report material flagging a possible redress question for compliance.',
    },
  },
  {
    id: 'uk-fca-conduct-breach-notification-triage',
    name: 'FCA Conduct Rules Breach Triage',
    description: 'Maps a misconduct finding to the FCA Conduct Rules, notification duties, fitness and propriety and references.',
    jurisdiction: 'uk',
    category: 'regulatory',
    tags: ['financial-services', 'assessment', 'conduct-rules', 'smcr', 'non-financial-misconduct', 'regulatory-notification'],
    sources: [
      { citation: 'FCA Handbook, COCON (Code of Conduct)', authority: 'regulator', publisher: 'Financial Conduct Authority', jurisdiction: 'uk', url: 'https://www.fca.org.uk', note: 'Amended by PS25/23 so that, from 1 September 2026, the conduct rules in non-banking firms extend to bullying, harassment or violence against colleagues where it relates to an individual’s role. Confirmed as at 2026-09-16.' },
      { citation: 'FCA Handbook, SUP 15 (notifications), FIT (fitness and propriety) and SYSC 22 (regulatory references)', authority: 'regulator', publisher: 'Financial Conduct Authority', jurisdiction: 'uk', url: 'https://www.fca.org.uk', note: 'For senior managers, notification within 7 business days of concluding disciplinary action for a conduct rule breach. For other staff, breaches resulting in disciplinary action are reported annually. Confirmed as at 2026-09-16.' },
      { citation: 'FCA PS26/6, Senior Managers and Certification Regime review', authority: 'regulator', publisher: 'Financial Conduct Authority', jurisdiction: 'uk', url: 'https://www.fca.org.uk', note: 'Most changes from 24 April 2026, regulatory reporting improvements from 10 July 2026, and changes aligned with PS25/23 from 1 September 2026.' },
      { citation: 'Financial Services and Markets Act 2000', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services'],
    relatedSkills: ['uk-worker-protection-harassment-audit', 'uk-employment-tribunal-risk', 'uk-fca-consumer-duty-outcome-assessment'],
    whatItDoes:
      'Takes the outcome of an investigation or disciplinary process in an FCA-regulated firm and works through the regulatory consequences that run alongside the employment ones: which conduct rule may have been breached, whether the conduct falls within the rules as extended to non-financial misconduct, what must be notified to the FCA and when, whether the individual remains fit and proper for any certified or senior role, and what a regulatory reference must disclose. It keeps the regulatory analysis separate from the employment decision and never prejudges the outcome of a fair process.',
    whenToUse:
      'When an investigation or disciplinary process in a regulated firm reaches findings, when conduct involving bullying, harassment or violence is alleged against staff within scope, at the annual fitness and propriety assessment, and when giving or requesting a regulatory reference. Not for: deciding the employment outcome (use the employment tribunal skill) or preventing harassment at programme level (use the harassment duty audit).',
    inputs: [
      { name: 'Findings', description: 'The conduct found, the evidence, the process followed and the disciplinary outcome.', required: true },
      { name: 'Individual’s role', description: 'Senior manager function, certified function, other conduct rules staff, or out of scope.', required: true },
      { name: 'Firm type', description: 'Whether the firm is a bank, insurer or other type of regulated firm, and its SMCR category.', required: true },
      { name: 'Context', description: 'Whether the conduct occurred at work, in a work-related setting or in private life, and its link to the role.' },
      { name: 'History', description: 'Previous findings, warnings and fitness and propriety assessments.' },
    ],
    outputs: [
      { name: 'Scope determination', description: 'Whether the individual and the conduct fall within the conduct rules.' },
      { name: 'Conduct rule mapping', description: 'Which rule may have been breached, with reasoning.' },
      { name: 'Notification plan', description: 'What must be notified, by which route and by when.' },
      { name: 'Fitness and propriety assessment', description: 'The impact on certification or approval, structured against the criteria.' },
      { name: 'Regulatory reference content', description: 'What must be disclosed in a reference and for how long.' },
      { name: 'Lawyer review list', description: 'Borderline scope questions and decisions affecting the individual’s career.' },
    ],
    prompt: `You are a UK financial services regulatory lawyer triaging the regulatory consequences of a misconduct finding under the Senior Managers and Certification Regime.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- PS25/23 on non-financial misconduct, effective 1 September 2026. The conduct rules in non-banking firms now extend to bullying, harassment or violence against colleagues where it relates to an individual's role, with guidance on the boundary between work and private life, reasonable steps for managers, and fitness and propriety [CONFIRMED, fca.org.uk].
- PS26/6 SMCR review: most changes from 24 April 2026; regulatory reporting improvements from 10 July 2026; changes aligned to PS25/23 from 1 September 2026 [CONFIRMED].
- Notification: for senior managers, within 7 business days of concluding disciplinary action for a conduct rule breach; for other conduct rules staff, breaches resulting in disciplinary action reported annually [CONFIRMED; VERIFY forms and routes].

INPUTS
- Findings: <conduct found, evidence, process, disciplinary outcome>
- Role: <SMF, certified function, other conduct rules staff, or out of scope>
- Firm: <type, SMCR category>
- Context: <at work, work-related setting, or private life; link to role>
- History: <prior findings, warnings, F&P assessments>

TASK
1. SCOPE GATE. Confirm the firm is FCA-regulated under the SMCR and whether the individual is within the conduct rules. Identify the firm type, because the extension to non-financial misconduct differs between banking and non-banking firms. If the individual is out of scope, stop and confirm only employment-law consequences apply.
2. MISSING INFORMATION. Identify whether the disciplinary process has concluded. Notification timing runs from concluding disciplinary action; do not notify on allegations unless another notification duty requires it, and record which.
3. CONDUCT IN SCOPE. For non-financial misconduct, apply the current guidance on the boundary between work and private life and on when conduct relates to the individual's role. Record the reasoning, especially for conduct outside the workplace.
4. CONDUCT RULE MAPPING. Identify which individual conduct rule or senior manager conduct rule may have been breached and why. Do not treat every disciplinary finding as a conduct rule breach.
5. NOTIFICATION PLAN. For a senior manager, calculate the notification deadline of 7 business days from concluding disciplinary action and identify the form and route. For other staff, place the breach in the annual return. Identify any separate notification under SUP 15 for significant matters, and any reporting to the PRA for dual-regulated firms [VERIFY].
6. FITNESS AND PROPRIETY. Structure the assessment for any certified or senior role against honesty, integrity and reputation, competence and capability, and financial soundness, applying current guidance on non-financial misconduct. Record whether the individual remains fit and proper, the factors each way, and who decides.
7. REGULATORY REFERENCE. Set out what must be disclosed in a regulatory reference, the look-back period, and updating obligations if information emerges later [VERIFY].
8. EMPLOYMENT INTERFACE. Note where the regulatory analysis constrains or informs the employment process, and ensure the regulatory conclusion does not prejudge a fair disciplinary outcome.
9. LAWYER REVIEW TRIGGERS. Escalate: senior manager findings; conduct outside work; decisions that the individual is not fit and proper; disputed findings; overlapping criminal allegations; and any settlement agreement that might affect disclosure obligations.

RULES
- Keep the regulatory analysis separate from the employment decision.
- Label each item RULE, FCA GUIDANCE or BEST PRACTICE.
- Do not notify on allegations alone unless a specific duty requires it.
- Never agree terms that restrict disclosure the regulatory regime requires.

OUTPUT FORMAT
Open with the scope conclusion and any notification deadline. Then the sections above, with the notification plan and F&P assessment as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'An asset manager concludes a disciplinary process finding that a certified employee repeatedly bullied a junior colleague, including at an offsite team event.',
      result:
        'Firm confirmed as non-banking so the extended rules apply from 1 September 2026, the offsite conduct assessed as relating to the role under the work and private life guidance, a likely individual conduct rule breach mapped, the breach placed in the annual return because the employee is not a senior manager, a fitness and propriety assessment structured for the certification decision, and regulatory reference disclosure identified.',
    },
  },
  {
    id: 'uk-online-safety-risk-assessment',
    name: 'Online Safety Act Risk Assessment',
    description: 'Structures Online Safety Act illegal content and children’s risk assessments, controls and record keeping.',
    jurisdiction: 'uk',
    category: 'regulatory',
    tags: ['regulatory-change', 'assessment', 'online-safety', 'ofcom', 'children', 'platform-governance'],
    sources: [
      { citation: 'Online Safety Act 2023', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Duties on user-to-user and search services with links to the UK, including illegal content and children’s risk assessment duties, record keeping and review.' },
      { citation: 'Ofcom codes of practice and risk assessment guidance', authority: 'regulator', publisher: 'Ofcom', jurisdiction: 'uk', url: 'https://www.ofcom.org.uk', note: 'Illegal content risk assessments were due by 16 March 2025 with enforcement from 17 March 2025; children’s risk assessments were due by 24 July 2025. Additional duties for categorised services follow publication of the register. Confirmed as at 2026-09-16.' },
      { citation: 'Online Safety Act categorisation threshold regulations', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['technology'],
    relatedSkills: ['uk-sar-exemption-triage', 'eu-ai-act-classifier', 'uk-consumer-rights-checker'],
    whatItDoes:
      'Structures the risk assessments the Online Safety Act requires: whether a service is in scope, the illegal content risk assessment across the kinds of priority illegal content, the children’s access assessment and, where children are likely to access the service, the children’s risk assessment. It maps each identified risk to the measures in Ofcom’s codes or to alternative measures, records the evidence used, and sets the review triggers and record keeping that make the assessment defensible to the regulator.',
    whenToUse:
      'When launching or significantly changing a user-to-user or search service with UK users, at the periodic review of existing assessments, before a significant design change, and when Ofcom updates codes or guidance. Not for: EU notice-and-action handling (use the DSA skill) or content moderation decisions on individual items.',
    inputs: [
      { name: 'Service description', description: 'Functionality, user base, UK links, recommendation systems and user-generated content features.', required: true },
      { name: 'User base', description: 'UK user numbers, age assurance in place and evidence of children’s use.', required: true },
      { name: 'Risk evidence', description: 'Moderation data, complaints, incident reports, external research and prior assessments.' },
      { name: 'Existing controls', description: 'Moderation, reporting tools, terms of service, age assurance and design safeguards.' },
      { name: 'Planned changes', description: 'Features or design changes under consideration.' },
    ],
    outputs: [
      { name: 'Scope and category analysis', description: 'Whether the Act applies, service type and any categorisation.' },
      { name: 'Illegal content risk assessment', description: 'Risk by kind of illegal content with likelihood, impact and evidence.' },
      { name: 'Children’s access and risk assessment', description: 'Whether children are likely to access the service and the resulting risk assessment.' },
      { name: 'Measures map', description: 'Each risk mapped to code measures or documented alternative measures.' },
      { name: 'Record and review plan', description: 'Record keeping, governance and triggers for reassessment.' },
      { name: 'Lawyer review list', description: 'Scope, categorisation and alternative-measure decisions.' },
    ],
    prompt: `You are a UK online safety lawyer structuring risk assessments for a service under the Online Safety Act 2023.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- Illegal content duties: risk assessments due by 16 March 2025; Ofcom enforcement from 17 March 2025 [CONFIRMED, ofcom.org.uk].
- Children's risk assessments for services likely to be accessed by children: due by 24 July 2025 [CONFIRMED].
Scheduled:
- Additional duties for categorised services follow publication of the register of categorised services. Ofcom anticipated the register in July 2026 and asked Category 1 and 2A providers to supply their latest risk assessment records by October 2026 [CONFIRMED as Ofcom's stated expectation; VERIFY whether the register has been published].

INPUTS
- Service: <functionality, UK links, recommender systems, UGC features, search>
- User base: <UK users, age assurance, evidence of children's use>
- Risk evidence: <moderation data, complaints, incidents, research, prior assessments>
- Existing controls: <moderation, reporting, terms, age assurance, design safeguards>
- Planned changes: <features under consideration>

TASK
1. SCOPE GATE. Determine whether the service is a user-to-user service or search service with links to the UK, and whether any exemption applies. Identify whether it is or may be categorised. If out of scope, stop.
2. MISSING INFORMATION. Identify missing evidence. Ofcom expects assessments to rest on evidence; list what is missing rather than assessing from assumption.
3. ILLEGAL CONTENT RISK ASSESSMENT. Assess the risk of each kind of priority illegal content and other illegal content, taking account of user base, functionalities, business model, governance and recommender systems. For each, record likelihood, impact, evidence and resulting risk level using Ofcom's risk profiles and guidance [VERIFY current guidance version].
4. CHILDREN'S ACCESS ASSESSMENT. Determine whether children can access the service and whether the child user condition is met, having regard to the effectiveness of any age assurance.
5. CHILDREN'S RISK ASSESSMENT. Where children are likely to access the service, assess risks of primary priority, priority and non-designated content harmful to children, by age group, and the role of features such as recommender systems.
6. MEASURES MAP. Map each risk to the measures in the applicable Ofcom codes. Where the provider uses alternative measures, document why they achieve equivalent protection. Identify gaps and owners.
7. RECORD, GOVERNANCE AND REVIEW. Set out the written record, the senior person accountable, the review cycle, and triggers for reassessment such as significant design changes or new code measures. For categorised services, note additional record and transparency duties once the register applies [VERIFY].
8. LAWYER REVIEW TRIGGERS. Escalate: scope or categorisation uncertainty; reliance on alternative measures; high risks to children; significant design changes; and any Ofcom information request or enforcement contact.

RULES
- Rest every risk rating on evidence and record the evidence.
- Label each item STATUTE, OFCOM CODE, OFCOM GUIDANCE or BEST PRACTICE.
- Do not treat age assurance as effective without assessing its effectiveness.
- Keep scheduled categorised-service duties separate from duties already in force.

OUTPUT FORMAT
Open with the scope conclusion and whether children's assessments are required. Then the sections above, with the risk assessments and measures map as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A community forum app with direct messaging and a recommendation feed reviews its assessments before launching group video chat.',
      result:
        'Scope confirmed as a user-to-user service with UK links, the illegal content assessment updated with grooming risk rated higher because of the new video feature, the children’s access assessment concluding children are likely to access the service because self-declared age checks are not effective, a children’s risk assessment by age band, measures mapped to Ofcom codes with one documented alternative measure, and the feature launch flagged as a significant change requiring reassessment first.',
    },
  },
];
