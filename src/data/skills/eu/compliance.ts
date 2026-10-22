import type { Skill } from '../../../types/skill';

/**
 * EU compliance skills — whistleblowing, supply chain due diligence, carbon border adjustment and sustainability reporting.
 */
export const euComplianceSkills: Skill[] = [
  {
    id: 'eu-whistleblowing-channel-checker',
    name: 'Whistleblowing Channel Checker',
    description: 'Audits internal reporting channels and case handling against the EU whistleblower protection rules.',
    jurisdiction: 'eu',
    category: 'compliance',
    tags: ['programme-design', 'review', 'whistleblowing', 'reporting-channels', 'retaliation', 'speak-up', 'case-management'],
    sources: [
      { citation: 'Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'A minimum-standards directive operating through national transposition. Several Member States have gone materially further, including on the scope of reportable breaches and on anonymous reporting.' },
      { citation: 'National transposing measures of the Member States', authority: 'primary', publisher: 'Member State legislatures', jurisdiction: 'eu', note: 'The operative rules. They differ on whether anonymous reports must be accepted, whether group-level shared channels are permitted, on sanctions, and on whether scope extends beyond Union law to national law.' },
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Governs the handling of reporter and subject personal data, including the rights of the person reported on and the limits on deferring them.' },
      { citation: 'National data protection authority guidance on whistleblowing schemes', authority: 'guidance', publisher: 'Member State supervisory authorities', jurisdiction: 'eu', note: 'Several authorities impose specific requirements on retention, notification of the accused person and cross-border transfer of case files. These are not uniform.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'professional-services', 'technology', 'public-sector'],
    relatedSkills: ['uk-failure-to-prevent-fraud', 'uk-bribery-act-reviewer', 'eu-member-state-delta', 'eu-whistleblower-intake-triage'],
    whatItDoes:
      'Audits a speak-up programme against the obligations that actually get enforced: whether the channel exists where it must, whether acknowledgement and feedback happen inside the deadlines, whether confidentiality is protected at the standard required, and whether the retaliation protections are understood by the people who make personnel decisions. It treats the national transposing measure as the operative law rather than the directive, which matters because Member States diverge sharply on anonymous reporting and on whether group-wide shared channels are permitted at all.',
    whenToUse:
      'When establishing or auditing a speak-up programme, when headcount in a Member State crosses the threshold, when centralising channels across a group, and after any report where the handling or the treatment of the reporter is questioned.',
    inputs: [
      { name: 'Entity and headcount map', description: 'Each legal entity, the Member State it operates in, and its headcount.', required: true },
      { name: 'Current channels', description: 'How reports can be made, who receives them, and whether the channel is internal or outsourced.', required: true },
      { name: 'Case handling process', description: 'Acknowledgement, triage, investigation, feedback and closure, with the timeframes actually achieved.', required: true },
      { name: 'Policy and communication', description: 'The policy, how it is published, and what reporters are told about external routes.' },
      { name: 'Data handling', description: 'Where case files are stored, who can access them, retention periods, and any cross-border transfer.' },
      { name: 'Case history', description: 'Report volumes, outcomes, and any allegation of retaliation or breach of confidentiality.' },
    ],
    outputs: [
      { name: 'Obligation map by entity', description: 'Which entities must have a channel, under which national measure, and by when.' },
      { name: 'Channel design assessment', description: 'Format, accessibility, independence and the personnel or function operating it.' },
      { name: 'Timeline compliance', description: 'Acknowledgement and feedback deadlines against what is actually achieved.' },
      { name: 'Confidentiality and anonymity review', description: 'Identity protection against the required standard, and the national position on anonymous reports.' },
      { name: 'Retaliation framework', description: 'The protections, the reversed burden of proof, and whether decision-makers understand them.' },
      { name: 'Data protection assessment', description: 'Lawful basis, the rights of the person reported on, retention and cross-border transfer of case files.' },
      { name: 'Remediation plan', description: 'Gaps with owners, dates and the sanctions exposure each one carries.' },
    ],
    prompt: `You are an EU compliance lawyer auditing an organisation's whistleblowing arrangements against the national measures transposing the whistleblower protection directive.

INPUTS
- Entities and headcount: <each legal entity, its Member State, and its headcount; note how headcount is counted locally and whether it fluctuates around the threshold>
- Current channels: <how reports can be made — portal, hotline, email, in person; who receives them; internal team or outsourced provider; languages offered>
- Case handling: <acknowledgement, triage, investigation, feedback and closure steps, and the timeframes actually achieved rather than those in the policy>
- Policy and communication: <the policy text, where it is published, whether it is given to staff and to third parties, and what it says about external reporting>
- Data handling: <where case files sit, who has access, retention periods, and any transfer outside the Member State or the Union>
- History: <report volumes, outcomes, and any allegation of retaliation, breach of confidentiality or reporter identification>

TASK
1. OPERATIVE LAW AND SCOPE. State that this is a minimum-standards directive operating through national transposition, and that Member States have gone further in several respects — some requiring anonymous reports to be accepted, some extending the material scope beyond breaches of Union law to national law generally, and some prohibiting or restricting shared group-level channels. Identify the applicable national measure for each entity and mark each divergence [VERIFY]. Do not audit against the directive text where a national measure exists.
2. OBLIGATION MAP. Determine which entities must establish an internal channel, applying the national headcount threshold and the way headcount is counted locally, which is not uniform. Address entities below the general threshold that are nonetheless caught regardless of size because of their sector, notably financial services, anti-money laundering, transport safety and environmental protection. Address public sector entities separately where relevant. Produce a table of entity, Member State, headcount, obligation, deadline and current status.
3. GROUP AND SHARING ARRANGEMENTS. Assess any centralised or group-wide channel carefully, since this is the most common structural defect in multinational programmes. Identify the national position on whether entities may share resources for receiving and investigating reports, the headcount band in which sharing is permitted where it is, and whether the local entity must in any event retain the ability to receive reports locally and to provide feedback locally. Note that several Member States have taken a restrictive position and that a single group hotline routed to headquarters may not discharge the local obligation. Where an outsourced provider is used, confirm the contractual terms meet the confidentiality and independence requirements.
4. CHANNEL DESIGN. Test the channel against the requirements: that it permits reporting in writing, orally, or both; that oral reporting is possible by telephone or other voice messaging and, on request, by physical meeting within a reasonable period; that any recording of an oral report is made lawfully and the reporter is given the opportunity to check, correct and sign the record; that the channel is secure so that confidentiality of the identity of the reporter and of any third party mentioned is protected; and that access is restricted to authorised staff. Check that an impartial person or function is designated to follow up, that they are genuinely independent of the areas they may investigate, and that conflicts are addressed where the report concerns senior management. Check accessibility for the people entitled to use it, which extends beyond employees to job applicants, former workers, shareholders, board members, contractors, subcontractors and suppliers — and confirm the channel is actually reachable by those groups and offered in the languages they use.
5. TIMELINE COMPLIANCE. Test the two deadlines against what the organisation actually achieves rather than what the policy states: acknowledgement of receipt within the prescribed period after the report, and feedback to the reporter within the prescribed maximum period. Mark both periods [VERIFY]. Set out what feedback must contain, which is information on the action envisaged or taken and the reasons for it, and note that the confidentiality of the investigation does not remove the feedback obligation. Identify whether the case management system measures and evidences these timings, because an organisation that cannot demonstrate them is treated as having missed them.
6. CONFIDENTIALITY AND ANONYMITY. Distinguish the two clearly, because they are routinely conflated. Confidentiality of the reporter's identity is required in all cases and may be disclosed only where that is a necessary and proportionate obligation imposed by Union or national law in the context of investigations or judicial proceedings — and the reporter must generally be informed before disclosure unless that would jeopardise the matter. Anonymity is different: whether anonymous reports must be accepted is left to Member States, and they have diverged. State the position for each relevant Member State. Then test the practical controls: access rights in the case system, whether identity is visible to line management, how reports about senior people are routed, and whether any prior case resulted in identification.
7. RETALIATION FRAMEWORK. Assess the protections and, more importantly, whether the people who make personnel decisions understand them. Cover the prohibited forms of retaliation, which extend well beyond dismissal to suspension, demotion, withheld promotion, duties transfer, reduced pay, changed hours, negative performance assessment, disciplinary measures, coercion, harassment, discrimination, non-conversion of a temporary contract, non-renewal, damage to reputation, blacklisting, early termination of a contract for goods or services, and withdrawal of a licence. Explain the reversal of the burden of proof: where a reporter shows they reported and suffered a detriment, it is for the organisation to prove the measure was based on duly justified grounds. Set out the practical consequence — that any adverse action affecting a known reporter requires a documented, independent and contemporaneous justification — and check whether decision-makers are told when someone is a reporter and whether there is a check before adverse action. Cover protection of facilitators and connected persons, and the prohibition on waiving these rights.
8. EXTERNAL AND PUBLIC REPORTING. Confirm the policy tells reporters clearly that they may report externally to the competent national authority, and that they are not required to report internally first. State the narrower conditions under which public disclosure attracts protection. Note that a policy discouraging external reporting, or implying internal reporting is mandatory, is itself a defect and undermines the organisation's position.
9. DATA PROTECTION. Assess the case handling against data protection obligations: the lawful basis, the prohibition on collecting data not relevant to handling the report and the requirement to delete it where inadvertently collected, retention periods for reports and for case files, security and access control, transfers of case files outside the Member State or outside the Union, and whether an impact assessment was carried out. Address the rights of the person reported on, including notification and access, and the limited and time-bound grounds for deferring them to protect the investigation — this is where national supervisory authorities have been most active. Confirm whether the record-keeping obligation for reports is met.
10. REMEDIATION. List each gap with an owner, a date and the sanctions exposure it carries, covering both penalties for failing to establish channels or for hindering reporting and the consequences of retaliation, which in several Member States include personal liability. Rank by exposure rather than by ease. Identify the cultural indicator worth tracking: a channel receiving no reports at all is more often evidence that people do not trust it than evidence that nothing is wrong.

RULES
- Audit against the national transposing measure for each entity, never the directive alone. Divergence on anonymous reporting and on group sharing is the point where multinational programmes most often fail.
- Keep confidentiality and anonymity separate throughout.
- Test the timelines against evidence of what actually happened, not against the policy.
- Never treat a single group-level hotline as automatically discharging local obligations.
- Treat the reversed burden of proof as the operative fact in any retaliation question, and check that decision-makers know who the reporters are before adverse action is taken.
- Mark acknowledgement and feedback periods, headcount thresholds, retention periods and penalty levels [VERIFY].

OUTPUT FORMAT
Open with which entities are non-compliant and the highest-exposure gap. Then the sections above, with the obligation map and timeline compliance as tables, closing with a ranked remediation plan showing owners, dates and sanctions exposure.`,
    example: {
      scenario:
        'A group with entities in five Member States routes all speak-up reports to a single headquarters hotline and reviews the arrangement after a reporter alleges they were identified.',
      result:
        'Three entities found obliged to maintain a locally reachable channel that the central hotline did not satisfy, with one Member State restricting group sharing outright, anonymous reporting mandatory in two of the five and unsupported by the current portal, acknowledgement met but feedback exceeding the maximum period in most cases with no system evidence of timing, the identification incident traced to case-system access granted to local line management, and the retaliation framework flagged because decision-makers were never told when an employee was a reporter before adverse action.',
    },
  },
  {
    id: 'eu-eudr-due-diligence-statement-builder',
    name: 'EUDR Due Diligence Statement Builder',
    description: 'Prepares EUDR due diligence and the due diligence statement for relevant commodities and products.',
    jurisdiction: 'eu',
    category: 'compliance',
    tags: ['programme-design', 'assessment', 'deforestation', 'supply-chain', 'due-diligence', 'geolocation', 'customs'],
    sources: [
      { citation: 'Regulation (EU) 2023/1115 on deforestation-free products, as amended in December 2025', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'The amendment published in the Official Journal on 23 December 2025 postpones application to 30 December 2026 for large and medium operators and traders and 30 June 2027 for micro and small operators, limits due diligence statements to the first operator placing a product on the market, provides a one-off simplified declaration for micro and small primary operators, and removes printed products. Confirmed as at 2026-09-16.' },
      { citation: 'Commission report on the EUDR simplification review (COM(2026) 191) and accompanying measures', authority: 'guidance', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://environment.ec.europa.eu', note: 'Published May 2026. Non-legislative measures that do not change the application dates. A July 2026 update revised product scope and tools.' },
      { citation: 'Commission country benchmarking implementing act and EUDR guidance and FAQs', authority: 'regulator', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://environment.ec.europa.eu', note: 'Country risk classifications determine whether simplified due diligence is available.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'energy-infrastructure'],
    relatedSkills: ['us-uflpa-supply-chain-traceability', 'eu-cbam-importer-compliance', 'eu-csrd-double-materiality-assessor'],
    whatItDoes:
      'Works out whether a product is in EUDR scope and what role the business plays, then builds the due diligence the regulation requires before a relevant product is placed on or made available on the EU market or exported: information collection including geolocation of every plot of production, verification that the commodity is deforestation-free and legally produced, risk assessment against the country benchmark and other criteria, risk mitigation, and the due diligence statement. It applies the December 2025 amendments, so only the first operator files a statement and micro and small primary operators use the simplified declaration.',
    whenToUse:
      'When placing cattle, cocoa, coffee, oil palm, rubber, soya, wood or derived products on the EU market or exporting them, when onboarding suppliers of those commodities, when country benchmarks change, and ahead of the application dates. Not for: US forced labour import controls (use the UFLPA skill), carbon border adjustment (use the CBAM skill) or sustainability reporting.',
    inputs: [
      { name: 'Products', description: 'Products with their CN codes, commodities contained and the proportion of each.', required: true },
      { name: 'Business role', description: 'Whether the business is first to place the product on the market, a downstream operator or a trader, and its size.', required: true },
      { name: 'Supply chain data', description: 'Suppliers, countries of production, plots of land with geolocation, and dates or ranges of production.', required: true },
      { name: 'Legality evidence', description: 'Evidence of compliance with relevant laws of the country of production.' },
      { name: 'Existing statements', description: 'Due diligence statement reference numbers received from upstream operators.' },
    ],
    outputs: [
      { name: 'Scope and role determination', description: 'Whether each product is in scope, which role applies, and the application date.' },
      { name: 'Information requirements checklist', description: 'Each required data element per product and whether it is held.' },
      { name: 'Geolocation validation', description: 'Plot data checked for completeness and format.' },
      { name: 'Risk assessment', description: 'Deforestation and legality risk against the regulation’s criteria and country benchmark.' },
      { name: 'Risk mitigation plan', description: 'Measures to reduce risk to negligible, where required.' },
      { name: 'Due diligence statement draft', description: 'The statement content, or the simplified declaration where applicable.' },
      { name: 'Record retention plan', description: 'What must be kept and for how long.' },
    ],
    prompt: `You are an EU trade and sustainability lawyer preparing due diligence under the EU Deforestation Regulation.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
Scheduled application:
- 30 December 2026 for large and medium operators and traders; 30 June 2027 for micro and small operators, as amended in December 2025 [CONFIRMED, Council and Commission].
Amendments in force:
- Only the operator first placing a relevant product on the EU market submits a due diligence statement; micro and small primary operators submit a one-off simplified declaration; printed products removed from scope [CONFIRMED].
Guidance:
- The Commission's May 2026 simplification review introduced non-legislative measures and did not change the application dates [CONFIRMED]. Product scope and tools were updated in July 2026 [CONFIRMED; VERIFY current annex and CN codes].
- Country benchmarking classifications [VERIFY current list].

INPUTS
- Products: <products, CN codes, commodities and proportions>
- Role: <first placer, downstream operator or trader; size>
- Supply chain: <suppliers, countries, plots with geolocation, production dates>
- Legality evidence: <documents for relevant laws of the country of production>
- Existing statements: <reference numbers from upstream>

TASK
1. SCOPE GATE. For each product, confirm whether its CN code is listed in the current annex and whether it contains a relevant commodity. Out-of-scope products stop here. Record the annex version checked.
2. ROLE AND DATE. Determine whether the business is the operator first placing the product on the market, a downstream operator, or a trader, and its size category. Apply the amended rules: only the first placer files a statement; downstream operators and traders keep reference numbers and have information obligations [VERIFY]; micro and small primary operators use the simplified declaration. Record which application date applies.
3. MISSING INFORMATION. List missing data per product. A statement cannot be submitted without geolocation for all plots of production.
4. INFORMATION COLLECTION. Check each required element: product description and quantity, country of production, geolocation of all plots, date or time range of production, supplier and customer details, adequately conclusive and verifiable information that products are deforestation-free, and that they were produced in accordance with relevant legislation of the country of production.
5. GEOLOCATION VALIDATION. Check that each plot has coordinates in the required format — points for smaller plots, polygons for larger ones [VERIFY size rule] — that coordinates fall in the stated country, and that plots are not implausible. Flag commingled supply where plots cannot be traced to the specific product.
6. RISK ASSESSMENT. Assess risk using the regulation's criteria: the country benchmark classification, presence of forests, indigenous peoples, prevalence of deforestation, source reliability, concerns about the country such as corruption and document falsification, supply chain complexity and risk of mixing, and substantiated concerns. Where the country is classified low risk, identify the simplified due diligence available and its conditions.
7. RISK MITIGATION. Where risk is not negligible, set out mitigation such as additional information, independent audits and supplier capacity building, and state that the product must not be placed on the market until risk is negligible.
8. STATEMENT. Draft the due diligence statement or simplified declaration with the required content, and the confirmation that due diligence was carried out and no or only negligible risk was found.
9. RECORD RETENTION. Set out records to keep, including statements and supporting information, for the required period [VERIFY — five years under the original text].
10. LAWYER REVIEW TRIGGERS. Escalate: commingled supply that cannot be traced to plots; high-risk countries; substantiated concerns from third parties; disagreement about role; and any competent authority check.

RULES
- Use the amended application dates and role rules confirmed above.
- Label each item REGULATION, AMENDING REGULATION, COMMISSION GUIDANCE or BEST PRACTICE.
- Never state that a product is deforestation-free without plot-level evidence.
- Do not place a product on the market where risk is more than negligible.

OUTPUT FORMAT
Open with the scope and role conclusion per product and the applicable date. Then the sections above, with the information checklist, geolocation validation and risk assessment as tables and the statement as a usable draft. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A mid-sized EU chocolate manufacturer imports cocoa beans from cooperatives in two countries and wants to be ready for 30 December 2026.',
      result:
        'Cocoa products confirmed in scope with the manufacturer as first placer filing statements, the large and medium date applied, plot geolocation complete for one country but missing polygons for larger plots in the other, commingling at a regional warehouse flagged as preventing plot-level traceability, risk assessed against the current benchmark with mitigation required for the second country, and a draft statement for the traceable supply only.',
    },
  },
  {
    id: 'eu-cbam-importer-compliance',
    name: 'CBAM Declarant Compliance Planner',
    description: 'Maps CBAM scope, declarant authorisation, embedded emissions data, certificates and deadlines for importers.',
    jurisdiction: 'eu',
    category: 'compliance',
    tags: ['programme-design', 'assessment', 'cbam', 'carbon', 'customs', 'emissions-data', 'supply-chain'],
    sources: [
      { citation: 'Regulation (EU) 2023/956 establishing a carbon border adjustment mechanism, as amended by Regulation (EU) 2025/2083', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Definitive period from 1 January 2026. The 2025 simplification introduced a 50-tonne annual net mass de minimis threshold, and moved the annual CBAM declaration to 30 September, first due 30 September 2027 for 2026 imports. Confirmed as at 2026-09-16.' },
      { citation: 'CBAM implementing and delegated acts on authorisation, calculation, verification and certificates', authority: 'regulator', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://taxation-customs.ec.europa.eu', note: 'Certificate sales on the common central platform start on 1 February 2027. Check the current acts for methodology and default values.' },
      { citation: 'Commission CBAM guidance and questions and answers', authority: 'guidance', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://taxation-customs.ec.europa.eu', note: 'Some older guidance documents predate the 2025 amendments and state superseded dates; use the amended Regulation.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['energy-infrastructure', 'retail-consumer'],
    relatedSkills: ['eu-eudr-due-diligence-statement-builder', 'eu-csrd-double-materiality-assessor', 'us-ofac-export-screener'],
    whatItDoes:
      'Plans CBAM compliance for an importer under the definitive regime rather than the transitional reporting rules that ended in 2025. It tests goods against the CBAM CN codes and the 50-tonne annual threshold, determines whether authorised declarant status is required and who holds it, builds the embedded emissions data request to producers with the verification it needs, and maps the certificate purchase, surrender and annual declaration deadlines, flagging where older guidance states dates the 2025 amendments superseded.',
    whenToUse:
      'When importing cement, iron and steel, aluminium, fertilisers, electricity or hydrogen and relevant downstream products into the EU, when planning the first annual declaration, when onboarding non-EU producers, and when import volumes approach the de minimis threshold. Not for: EU ETS obligations of EU installations, deforestation due diligence (use the EUDR skill) or corporate sustainability reporting.',
    inputs: [
      { name: 'Imports', description: 'Goods with CN codes, net mass, origin, and annual volumes for the year.', required: true },
      { name: 'Importer structure', description: 'Importer of record, customs representation, and group entities importing.', required: true },
      { name: 'Producer data', description: 'Non-EU installations, emissions data provided, and verification status.' },
      { name: 'Carbon price paid', description: 'Any carbon price paid in the country of origin with evidence.' },
      { name: 'Authorisation status', description: 'Whether an application for authorised declarant status has been made or granted.' },
    ],
    outputs: [
      { name: 'Scope and threshold analysis', description: 'Goods in scope and whether the 50-tonne annual threshold is exceeded.' },
      { name: 'Declarant status plan', description: 'Who must be authorised and the consequence of importing without authorisation.' },
      { name: 'Emissions data request', description: 'The data and verification needed from each producer.' },
      { name: 'Default values exposure', description: 'Where default values would apply and their cost implication drivers.' },
      { name: 'Certificate and declaration calendar', description: 'Purchase, holding, surrender and declaration dates.' },
      { name: 'Superseded-guidance check', description: 'Dates or rules in older materials that the amendments changed.' },
    ],
    prompt: `You are an EU customs and climate regulation lawyer planning compliance with the Carbon Border Adjustment Mechanism in the definitive period.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- Definitive CBAM regime since 1 January 2026 [CONFIRMED, Commission].
- Regulation (EU) 2025/2083 simplification: a 50-tonne annual net mass de minimis threshold; annual CBAM declaration due by 30 September each year, first by 30 September 2027 for 2026 imports [CONFIRMED].
Scheduled:
- Sale of CBAM certificates on the common central platform from 1 February 2027 [CONFIRMED].
Correction:
- Some older Commission materials describe a 31 May declaration deadline. That date predates the 2025 amendments and is superseded [CONFIRMED against the amended Regulation's summary]. Verify any date against the Regulation as amended.

INPUTS
- Imports: <goods, CN codes, net mass, origin, annual volumes>
- Structure: <importer of record, customs representative, group entities>
- Producer data: <installations, emissions data, verification>
- Carbon price paid: <amount and evidence>
- Authorisation: <applied, granted or not>

TASK
1. SCOPE GATE. Check each good's CN code against the current CBAM annex, including downstream products. Out-of-scope goods stop here. Record the annex version.
2. THRESHOLD. Calculate cumulative annual net mass of CBAM goods imported by the importer and apply the 50-tonne threshold as defined, including how it is counted and any exclusions [VERIFY counting rules]. Treat an importer near the threshold as needing authorisation planning.
3. DECLARANT STATUS. Determine who must hold authorised CBAM declarant status and whether goods may be imported before authorisation is granted [VERIFY]. Set out the application steps and the consequence of importing without authorisation.
4. MISSING INFORMATION. Identify producers without installation-level emissions data. Where actual data is not available, default values apply; flag this as a cost and accuracy risk rather than estimating certificate costs.
5. EMISSIONS DATA REQUEST. Draft a request to each producer for installation identification, production routes, direct and indirect embedded emissions calculated under the current methodology, precursors, and verification by an accredited verifier [VERIFY requirements].
6. CARBON PRICE PAID. Identify whether a carbon price was effectively paid in the country of origin and the evidence required to claim a reduction.
7. CERTIFICATE AND DECLARATION CALENDAR. Map: the start of certificate sales on 1 February 2027, any quarterly holding requirement [VERIFY], the annual declaration by 30 September, and surrender of certificates for the prior year's imports. Show each date and its source.
8. SUPERSEDED-GUIDANCE CHECK. List any date or rule in materials the business relies on that the 2025 amendments changed.
9. LAWYER REVIEW TRIGGERS. Escalate: unauthorised imports; disputed CN classification; reliance on default values for high volumes; carbon price paid claims; and indirect customs representation liability.

RULES
- Use the definitive-period rules and the amended Regulation. Do not apply transitional reporting assumptions.
- Label each item REGULATION, IMPLEMENTING ACT, COMMISSION GUIDANCE or BEST PRACTICE.
- Do not estimate certificate costs or prices; identify the drivers.
- Treat any date from pre-amendment guidance as superseded until checked.

OUTPUT FORMAT
Open with the threshold conclusion, whether authorisation is required, and the next deadline. Then the sections above, with scope analysis and the calendar as tables and the producer data request as usable text. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A German fastener distributor imports about 400 tonnes of steel screws a year from three Asian producers and had been relying on a Commission Q&A stating a 31 May declaration deadline.',
      result:
        'Goods confirmed in scope as downstream steel products, the 50-tonne threshold clearly exceeded so authorised declarant status required, the 31 May date identified as superseded with the first declaration due 30 September 2027 for 2026 imports, two producers without installation data flagged as defaulting to default values, a producer data request drafted, and a certificate calendar starting from the February 2027 sale opening.',
    },
  },
  {
    id: 'eu-csrd-double-materiality-assessor',
    name: 'CSRD Double Materiality Assessor',
    description: 'Tests CSRD scope under the Omnibus amendments and structures the double materiality assessment under the ESRS.',
    jurisdiction: 'eu',
    category: 'compliance',
    tags: ['regulatory-change', 'assessment', 'csrd', 'esrs', 'sustainability-reporting', 'materiality', 'transposition'],
    sources: [
      { citation: 'Directive 2013/34/EU as amended by the Corporate Sustainability Reporting Directive and by the Omnibus I simplification directive', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Omnibus I, published 26 February 2026 and in force 18 March 2026, limits mandatory sustainability reporting to undertakings with more than 1,000 employees on average and net turnover above €450 million. Confirmed as at 2026-09-16. Operates through national transposition.' },
      { citation: 'Commission delegated act revising the European Sustainability Reporting Standards', authority: 'regulator', publisher: 'European Commission', jurisdiction: 'eu', url: 'https://finance.ec.europa.eu', note: 'Adopted July 2026. Revised ESRS apply from financial year 2027, with early adoption for 2026 permitted once in force. Simplifies the materiality assessment and reduces datapoints. Confirmed as at 2026-09-16.' },
      { citation: 'Stop-the-clock directive postponing CSRD application for later waves', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu' },
      { citation: 'EFRAG implementation guidance on materiality assessment', authority: 'guidance', publisher: 'EFRAG', jurisdiction: 'eu', url: 'https://www.efrag.org', note: 'Non-authoritative guidance supporting the ESRS.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'energy-infrastructure', 'retail-consumer', 'technology'],
    relatedSkills: ['eu-eudr-due-diligence-statement-builder', 'eu-member-state-delta', 'global-horizon-scanner'],
    whatItDoes:
      'First decides whether an undertaking is still in scope after the Omnibus amendments and when it must report under national law — a question many prior assessments now answer differently — and only then structures the double materiality assessment under the revised ESRS: identifying impacts, risks and opportunities across the value chain, assessing impact materiality and financial materiality separately, engaging affected stakeholders, setting thresholds, and documenting the process so it can withstand assurance. It keeps the directive, national transposition, the revised standards and non-authoritative guidance clearly apart.',
    whenToUse:
      'When confirming whether a group remains within CSRD scope after the Omnibus changes, before the first reporting cycle, when preparing for limited assurance of the materiality process, and when refreshing an assessment built under the original ESRS. Not for: EU taxonomy alignment analysis, the CSDDD due diligence duty, or Australian climate disclosures.',
    inputs: [
      { name: 'Group profile', description: 'Entities, EU and non-EU parents, average employees, net turnover and listing status.', required: true },
      { name: 'Member States', description: 'Where in-scope entities are established and the status of national transposition.', required: true },
      { name: 'Value chain map', description: 'Upstream and downstream activities, business relationships and geographies.', required: true },
      { name: 'Existing work', description: 'Any prior materiality assessment, risk register and stakeholder engagement.' },
      { name: 'Financial data', description: 'Time horizons, risk appetite and financial thresholds used in enterprise risk management.' },
    ],
    outputs: [
      { name: 'Scope and timing determination', description: 'Whether each undertaking must report, under which national law and from which year.' },
      { name: 'Standards applicable', description: 'Which version of the ESRS applies and whether early adoption is available.' },
      { name: 'IRO inventory', description: 'Impacts, risks and opportunities across own operations and the value chain.' },
      { name: 'Impact materiality assessment', description: 'Severity and likelihood of actual and potential impacts.' },
      { name: 'Financial materiality assessment', description: 'Likelihood and magnitude of financial effects.' },
      { name: 'Stakeholder engagement record', description: 'Who was engaged, how, and how input was used.' },
      { name: 'Methodology and audit trail', description: 'Thresholds, judgments and evidence prepared for assurance.' },
    ],
    prompt: `You are an EU sustainability reporting lawyer determining CSRD scope and structuring a double materiality assessment under the revised ESRS.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
In force:
- Omnibus I, published 26 February 2026 and in force 18 March 2026: mandatory sustainability reporting limited to undertakings with more than 1,000 employees on average and net turnover above €450 million [CONFIRMED, Council]. Directive amendments operate through national transposition [VERIFY status per Member State].
- The stop-the-clock directive postponed reporting for later waves [CONFIRMED; VERIFY resulting first reporting years].
Adopted:
- Revised ESRS delegated act adopted July 2026. Revised ESRS apply from financial year 2027, with early adoption for financial year 2026 permitted once the act enters into force [CONFIRMED, EFRAG and Commission; VERIFY entry into force after scrutiny].

INPUTS
- Group: <entities, parents, average employees, net turnover, listing>
- Member States: <establishment and transposition status>
- Value chain: <activities, relationships, geographies>
- Existing work: <prior assessment, risk register, engagement>
- Financial data: <time horizons, risk appetite, thresholds>

TASK
1. SCOPE GATE. Apply the amended thresholds to each undertaking and the group, including how employees and turnover are measured and consolidated, and treatment of non-EU parents [VERIFY rules]. Conclude IN SCOPE, OUT OF SCOPE or UNCERTAIN per undertaking, and the first reporting year under the applicable national law. If out of scope, stop and note voluntary reporting options.
2. STANDARDS. Identify which ESRS version applies to the first reporting year and whether early adoption of the revised standards is available and advisable.
3. MISSING INFORMATION. Identify gaps in the value chain map and in stakeholder input. A materiality assessment without value chain and stakeholder evidence will not survive assurance.
4. IRO INVENTORY. Identify impacts, risks and opportunities across own operations and the upstream and downstream value chain, using sector context and the topical standards as a checklist rather than an exhaustive list.
5. IMPACT MATERIALITY. For actual and potential, negative and positive impacts, assess severity through scale, scope and irremediable character, and likelihood for potential impacts. Apply the revised standards' simplifications to the process [VERIFY].
6. FINANCIAL MATERIALITY. Assess whether sustainability matters trigger or could trigger material financial effects, considering likelihood and magnitude over short, medium and long-term horizons, linked to enterprise risk management.
7. THRESHOLDS AND JUDGMENTS. Set and justify thresholds for each dimension, and record every significant judgment.
8. STAKEHOLDER ENGAGEMENT. Record affected stakeholders and users engaged, the method, and how their input changed conclusions. Note the revised standards' position that undertakings need not meet each individual user's specific information needs.
9. OUTCOME AND AUDIT TRAIL. List material matters and the disclosures they trigger, with a documented methodology and evidence prepared for limited assurance.
10. LAWYER REVIEW TRIGGERS. Escalate: uncertain scope near the thresholds; non-EU parent structures; inconsistent national transposition; matters that may affect financial statements; and assurance provider challenges.

RULES
- Decide scope and timing under the amended law and national transposition before building the assessment.
- Label each item DIRECTIVE, NATIONAL LAW, ESRS, EFRAG GUIDANCE or BEST PRACTICE.
- Assess impact and financial materiality separately; a matter is material if it is material on either.
- Do not rely on scope conclusions reached before the Omnibus amendments.

OUTPUT FORMAT
Open with the scope conclusion per undertaking, the first reporting year and the ESRS version applicable. Then the sections above, with the IRO inventory and both materiality assessments as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A 1,300-employee manufacturing group with €600 million turnover built a double materiality assessment in 2024 under the original ESRS and wants to know whether it still has to report.',
      result:
        'Group confirmed above both amended thresholds so still in scope, two smaller subsidiaries confirmed out of scope individually, the first reporting year recalculated under the stop-the-clock postponement and national transposition with the date flagged for verification, early adoption of the revised ESRS assessed, the 2024 assessment refreshed with value chain impacts re-rated under the simplified process, and an audit trail prepared for limited assurance.',
    },
  },
  {
    id: 'eu-whistleblower-intake-triage',
    name: 'Whistleblowing Report Intake Triage',
    description: 'Triages a single whistleblowing report through protection, confidentiality, conflicts, deadlines and routing.',
    jurisdiction: 'eu',
    category: 'compliance',
    tags: ['programme-design', 'screening', 'whistleblowing', 'retaliation', 'case-management', 'transposition'],
    sources: [
      { citation: 'Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Internal channels must acknowledge receipt within seven days and provide feedback within three months. Confirmed as at 2026-09-16. Operates through national transposition.' },
      { citation: 'National measures transposing Directive (EU) 2019/1937', authority: 'primary', publisher: 'Member State legislatures', jurisdiction: 'eu', note: 'Member States differ on anonymous reports, the scope of reportable breaches beyond Union law, protected persons and sanctions.' },
      { citation: 'Regulation (EU) 2016/679 (General Data Protection Regulation)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'Governs processing of reporter, witness and subject data in the case file.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'professional-services', 'technology', 'public-sector'],
    relatedSkills: ['eu-whistleblowing-channel-checker', 'uk-failure-to-prevent-fraud', 'eu-member-state-delta'],
    whatItDoes:
      'Handles one incoming report on the day it arrives: whether the reporter and the subject matter are protected under the applicable national law, how to protect the reporter’s identity from the first step, who must not handle the case because of a conflict, the acknowledgement and feedback deadlines, and where the matter should be routed for investigation. It records retaliation safeguards before any adverse step can be taken against the reporter, and it assumes a compliant channel already exists rather than designing one.',
    whenToUse:
      'On receipt of each report through an internal whistleblowing channel in the EU, when a report is made to a manager outside the channel, and when a report concerns senior management or the people who operate the channel. Not for: auditing or designing the reporting programme (use the channel checker) or conducting the investigation itself.',
    inputs: [
      { name: 'The report', description: 'The report as received, the channel used, the date and time received, and whether it is anonymous.', required: true },
      { name: 'Reporter relationship', description: 'Employee, former employee, applicant, contractor, shareholder, board member or other.', required: true },
      { name: 'Member State', description: 'The entity receiving the report and the Member State whose law applies.', required: true },
      { name: 'People named', description: 'People implicated or mentioned, and their roles.' },
      { name: 'Case handlers', description: 'The designated recipients and investigators, and their reporting lines.' },
    ],
    outputs: [
      { name: 'Protection assessment', description: 'Whether the person and subject matter fall within protection under national law.' },
      { name: 'Confidentiality plan', description: 'Access restrictions and identity protection steps from intake onwards.' },
      { name: 'Conflict check', description: 'Who must be excluded from handling and why.' },
      { name: 'Deadline tracker', description: 'Acknowledgement and feedback dates.' },
      { name: 'Routing decision', description: 'Investigation route, owner and any external or regulatory referral considerations.' },
      { name: 'Retaliation safeguards', description: 'Controls on adverse action involving the reporter.' },
      { name: 'Acknowledgement draft', description: 'The acknowledgement message to the reporter.' },
    ],
    prompt: `You are an EU compliance lawyer triaging a single whistleblowing report received through an internal channel.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
Directive level:
- Acknowledge receipt within seven days of receipt; provide feedback within a reasonable timeframe not exceeding three months [CONFIRMED].
- Internal channels required for private sector entities with 50 or more workers; entities with 50 to 249 workers may share resources for receipt and investigation [CONFIRMED].
National:
- The operative law is the transposing measure, which differs on anonymous reports, the scope of reportable breaches, protected persons and sanctions [VERIFY for the Member State in issue].

INPUTS
- Report: <text, channel, date and time received, anonymous or not>
- Reporter relationship: <employee, former employee, applicant, contractor, shareholder, board member, other>
- Member State: <receiving entity and applicable law>
- People named: <implicated and mentioned, roles>
- Case handlers: <designated recipients and investigators, reporting lines>

TASK
1. SCOPE GATE. Identify the applicable national law. Confirm this is a report through an internal channel or one that should be treated as such, such as a report made to a manager.
2. PROTECTION ASSESSMENT. Assess whether the reporter is a protected person under the national law and whether the subject matter falls within its scope. Where national law extends beyond breaches of Union law, apply the wider scope. Where protection is uncertain, treat the reporter as protected pending review.
3. CONFIDENTIALITY FROM INTAKE. Restrict access to the case file immediately to authorised handlers. Do not forward the report to people named in it or to their managers. Record any identity disclosure only where legally required and note the obligation to inform the reporter beforehand where applicable.
4. ANONYMOUS REPORTS. If the report is anonymous, apply the national position on whether anonymous reports must be accepted and followed up. Set up a means to communicate with the reporter without identifying them where the channel supports it.
5. CONFLICT CHECK. Identify handlers who are named, who report to a named person, or who have another conflict. Exclude them and assign an independent handler. For reports about senior management or the channel operators, route to an alternative such as the audit committee or an external provider.
6. DEADLINES. Record the receipt date and time, the acknowledgement deadline of seven days, and the feedback deadline of three months, adjusting for any national rule [VERIFY]. Show the calculations.
7. ROUTING. Decide the investigation route and owner, and identify whether the matter may require regulatory reporting, law enforcement contact, legal privilege over the investigation, preservation steps, or referral to another channel.
8. RETALIATION SAFEGUARDS. Record that the reporter's identity must not be shared with decision-makers unnecessarily, and that any adverse action involving the reporter — discipline, performance management, reorganisation — must be checked against the report and supported by documented independent grounds, because protection laws generally place the burden on the organisation to show a measure was not linked to the report.
9. ACKNOWLEDGEMENT. Draft the acknowledgement: receipt confirmed, how confidentiality is protected, what happens next, the feedback timeframe, and how to provide further information.
10. DATA PROTECTION. Limit personal data collected to what is necessary, and flag rights of persons named and any national limits on informing them.
11. LAWYER REVIEW TRIGGERS. Escalate: reports about senior management; potential criminal conduct; reports that may require regulatory notification; any sign the reporter's identity has leaked; and any planned adverse action involving the reporter.

RULES
- Apply the national transposing law, not the directive alone.
- Label each item DIRECTIVE, NATIONAL LAW, DATA PROTECTION LAW or BEST PRACTICE.
- Protect the reporter's identity from the first step; never forward the report to people named in it.
- Do not investigate or decide the merits in this skill.

OUTPUT FORMAT
Open with the protection conclusion, the acknowledgement deadline and any immediate conflict. Then the sections above, with the deadline tracker and conflict check as tables and the acknowledgement as usable text. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'An employee of a French subsidiary anonymously reports that a regional sales director is inflating revenue figures, and the channel inbox is managed by the finance team that reports to that director.',
      result:
        'Reporter treated as protected with French transposition applied, the anonymous report accepted with a secure two-way messaging route set up, the finance team excluded as conflicted and the case routed to the group audit committee chair, acknowledgement and feedback deadlines calculated, preservation and possible regulatory reporting flagged, and a retaliation safeguard requiring documented independent grounds for any adverse action in the reporting team.',
    },
  },
  {
    id: 'eu-accessibility-act-readiness',
    name: 'Accessibility Act Readiness',
    description: 'Scopes European Accessibility Act duties for products and services and plans conformity and evidence.',
    jurisdiction: 'eu',
    category: 'compliance',
    tags: ['assessment', 'regulatory-change', 'accessibility', 'consumer-protection', 'product-compliance'],
    sources: [
      { citation: 'Directive (EU) 2019/882 (European Accessibility Act)', authority: 'primary', publisher: 'European Union', jurisdiction: 'eu', url: 'https://eur-lex.europa.eu', note: 'National measures apply from 28 June 2025, subject to transitional provisions. Microenterprises providing services are exempt from the service requirements; there is no equivalent exemption from product requirements. Confirmed as at 2026-10-23.' },
      { citation: 'National laws transposing the European Accessibility Act', authority: 'primary', jurisdiction: 'eu', note: 'Penalties, market surveillance authorities, complaint routes and some transitional choices are national. Check each Member State where the offering is sold.' },
      { citation: 'EN 301 549 (accessibility requirements for ICT products and services)', authority: 'guidance', publisher: 'ETSI, CEN and CENELEC', url: 'https://www.etsi.org', note: 'The European standard most commonly used to evidence ICT accessibility. Check which standards are currently cited as harmonised under the Act, since only those give a presumption of conformity.' },
    ],
    lastReviewed: '2026-10-23',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'technology', 'financial-services'],
    relatedSkills: ['eu-member-state-delta', 'eu-dsa-notice-action-triage', 'uk-consumer-rights-checker'],
    whatItDoes:
      'Determines whether products and services fall within the European Accessibility Act — e-commerce, consumer banking, e-books, electronic communications, elements of passenger transport services, and the consumer hardware and operating systems it lists — and what each economic operator must do. It separates product obligations (manufacturers, importers and distributors: conformity assessment, technical documentation, declaration of conformity, marking) from service obligations (meeting the accessibility requirements, publishing how the service meets them, keeping conformity as the service changes), tests the microenterprise and disproportionate-burden routes properly, and applies the transitional rules.',
    whenToUse:
      'When a business sells to EU consumers online, launches a product or service in scope, receives a complaint or a market surveillance enquiry, or wants to rely on the microenterprise exemption or a disproportionate burden or fundamental alteration assessment.',
    inputs: [
      { name: 'Offerings', description: 'Products and services offered to consumers in the EU, by Member State.', required: true },
      { name: 'Operator role', description: 'Manufacturer, importer, distributor or service provider, for each offering.', required: true },
      { name: 'Company size', description: 'Headcount, turnover and balance sheet total, including linked and partner enterprises.' },
      { name: 'Accessibility evidence', description: 'Audits, standards followed, accessibility statements and user testing.' },
      { name: 'Dates', description: 'When products were placed on the market and services launched or contracted.' },
    ],
    outputs: [
      { name: 'Scope determination', description: 'Each offering in or out of scope, with the reason.' },
      { name: 'Obligation map', description: 'What each operator role must do for each offering.' },
      { name: 'Exemption assessment', description: 'Microenterprise, disproportionate burden and fundamental alteration, tested against evidence.' },
      { name: 'Gap list', description: 'Current evidence against the requirements, offering by offering.' },
      { name: 'Documentation checklist', description: 'What must exist, where it is published and how long it is kept.' },
      { name: 'Remediation plan', description: 'Prioritised fixes, including supplier and procurement requirements.' },
    ],
    prompt: `You are an EU product and consumer regulatory lawyer assessing compliance with the European Accessibility Act (Directive (EU) 2019/882) and its national transpositions.

CURRENT-LAW STATUS (checked 2026-10-23 — re-check before relying on it)
- National measures apply from 28 June 2025 [CONFIRMED]. Member States could defer the requirements for answering emergency communications to no later than 28 June 2027 [CONFIRMED].
- Transitional provisions let service providers keep using products lawfully used before 28 June 2025 for a period, and let some service contracts agreed before that date continue, within outer limits set by the Directive and national law [VERIFY dates and national choices].
- Microenterprises providing services are exempt from the service accessibility requirements. There is no microenterprise exemption from product requirements [CONFIRMED].
- Penalties, market surveillance authorities and complaint routes are national [VERIFY per Member State].

INPUTS
- Offerings: <products and services offered to EU consumers, with Member States>
- Role: <manufacturer / importer / distributor / service provider, per offering>
- Size: <headcount, annual turnover and balance sheet total, including linked and partner enterprises>
- Evidence: <audits, standards followed, accessibility statements, user testing>
- Dates: <when products were placed on the market; when services launched; key contract dates>

TASK
1. SCOPE. For each offering, decide whether it is a listed product or service and whether it is offered to consumers. Explain borderline cases — a B2B platform also used by consumers, a website that sells as well as informs, a banking feature inside a wider app.
2. ROLE AND OBLIGATIONS. For products: manufacturer, importer and distributor obligations — conformity assessment, technical documentation, declaration of conformity, marking, identification, accessible instructions, corrective action and cooperation with authorities. For services: meeting the accessibility requirements, providing information on how the service meets them (typically in the general terms and conditions or an equivalent), and maintaining conformity as the service changes.
3. EXEMPTIONS. Microenterprise status for service providers, applying the headcount and financial thresholds with linked and partner enterprises included [VERIFY thresholds]. Disproportionate burden and fundamental alteration: the documented assessment the Directive requires, its criteria, its review and any notification to authorities. Reject an exemption that is asserted rather than evidenced.
4. GAP ANALYSIS. Map current evidence against the requirements for each offering. Conformity with a harmonised standard cited in the Official Journal gives a presumption of conformity; check what is currently cited [VERIFY].
5. TRANSITIONAL POSITION. Which offerings benefit from transitional rules, and until when.
6. DOCUMENTATION. What must exist, where it must be published, and how long it must be kept [VERIFY retention periods].
7. REMEDIATION PLAN. Prioritised by exposure and user impact: quick wins, structural fixes, and accessibility requirements to impose on suppliers.

RULES
- Accessibility is assessed against the requirements of the Act and the applicable standards, not a single automated scan. Never treat a scanner score as conformity.
- The microenterprise exemption applies to services only. Never extend it to products.
- Do not state penalty amounts or national authorities from memory.
- Separate what the Directive requires from national additions and from good practice.

OUTPUT FORMAT
Open with a scope table (Offering | In scope? | Role | Key obligations | Exemption claimed | Status). Then the sections above. Close with: Assumptions; [VERIFY] points; Member State checks needed.`,
    example: {
      scenario:
        'A non-EU online retailer with 40 staff sells consumer electronics to customers in France, Germany and Spain through its own website and app, and holds an automated accessibility scan report.',
      result:
        'A scope finding that the e-commerce service is in scope with no microenterprise exemption, a gap list noting the scan does not evidence conformity, draft accessibility information for the terms, and a check of importer obligations for listed hardware it sells.',
    },
  },
];
