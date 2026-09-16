import type { Skill } from '../../../types/skill';

/**
 * Australian corporate skills — director duties, merger control and foreign investment.
 */
export const auCorporateSkills: Skill[] = [
  {
    id: 'au-director-duties-checker',
    name: 'Director Duties & Insolvent Trading Checker',
    description: 'Tests a board decision against Australian director duties, insolvent trading exposure and the safe harbour.',
    jurisdiction: 'au',
    category: 'corporate',
    tags: ['corporate-transactions', 'assessment', 'directors-duties', 'insolvent-trading', 'safe-harbour', 'corporations-act', 'governance'],
    sources: [
      { citation: 'Corporations Act 2001 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Relied on for the statutory duties of care and diligence, good faith and proper purpose, use of position and information, the business judgment rule, insolvent trading and its defences, the safe harbour, related party rules and continuous disclosure.' },
      { citation: 'ASIC regulatory guidance on directors, insolvency and disclosure', authority: 'guidance', publisher: 'Australian Securities and Investments Commission', jurisdiction: 'au', url: 'https://asic.gov.au' },
      { citation: 'ASX Listing Rules', authority: 'regulator', publisher: 'ASX Limited', jurisdiction: 'au', url: 'https://www.asx.com.au', note: 'Applies only to listed entities; relied on for the continuous disclosure obligation that sits alongside the statutory one.' },
      { citation: 'General law duties of directors', authority: 'primary', publisher: 'Australian courts', jurisdiction: 'au', note: 'The general law duties run in parallel with the statutory duties and are not displaced by them. Different consequences follow from each.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['us-sec-disclosure-trigger', 'au-soci-obligations-mapper'],
    whatItDoes:
      'Takes a specific board decision and tests it against each statutory and general law duty separately, because they have different elements, different defences and different consequences. It assesses whether the business judgment rule is actually available on the facts, works through solvency and the elements of insolvent trading including the defences and the safe harbour, identifies the conflicts, related party and financial assistance issues that need a process rather than a view, and states what the minute has to record for the reasoning to be defensible later rather than reconstructed.',
    whenToUse:
      'Before a board resolves on a transaction, a distribution, continued trading in financial difficulty, or a related party dealing, and when a director asks what their personal exposure is.',
    inputs: [
      { name: 'The decision', description: 'What the board is being asked to approve, and the alternatives considered.', required: true },
      { name: 'Company financial position', description: 'Current and forecast cash, debts falling due, facilities, covenants, and any arrears.', required: true },
      { name: 'Board composition and interests', description: 'Directors, their other roles, and any interest any of them has in the matter.', required: true },
      { name: 'Information before the board', description: 'The papers, advice and forecasts provided, and when directors received them.' },
      { name: 'Entity type', description: 'Proprietary or public, listed or unlisted, and whether the company is part of a group.' },
      { name: 'Process to date', description: 'Prior discussions, delegations, management recommendations and any advice obtained.' },
    ],
    outputs: [
      { name: 'Duty-by-duty analysis', description: 'Each statutory and general law duty applied to the decision, with the elements set out.' },
      { name: 'Business judgment rule assessment', description: 'Whether the protection is available here, tested against each of its conditions.' },
      { name: 'Solvency assessment', description: 'The solvency question addressed directly, with the indicators and the reasonable grounds test.' },
      { name: 'Insolvent trading exposure', description: 'Each element of the liability, the available defences, and whether the safe harbour applies.' },
      { name: 'Conflicts and approvals', description: 'Related party, financial assistance and interest disclosure issues, with the approval path for each.' },
      { name: 'Disclosure obligations', description: 'Whether the decision triggers continuous disclosure or other reporting.' },
      { name: 'Minute requirements', description: 'What the board paper and minute must record for the reasoning to stand up later.' },
    ],
    prompt: `You are an Australian corporate lawyer advising a board on directors duties and insolvent trading exposure under the Corporations Act in relation to a specific decision.

INPUTS
- The decision: <what the board is being asked to approve, and what alternatives were considered>
- Financial position: <current cash, forecast cash by month, debts falling due and when, facilities and headroom, covenant position, any arrears including tax and superannuation>
- Board: <directors, their other directorships and roles, and any interest any of them has in this matter>
- Information before the board: <papers, advice, forecasts, and when directors received them>
- Entity: <proprietary or public, listed or unlisted, position in any group structure>
- Process to date: <prior discussions, delegations, management recommendation, advice obtained>

TASK
1. DUTY-BY-DUTY ANALYSIS. Take each duty in turn, state its elements, and apply them to this decision:
   - Care and diligence: the standard of a reasonable person in that company's circumstances holding that office with those responsibilities. Address what enquiry a director should have made here, and note that the standard is objective and does not fall because a director is non-executive or was not given the papers in time.
   - Good faith in the best interests of the company, and for a proper purpose. Identify whose interests the company's interests refer to on these facts, and address the shift toward creditors interests as insolvency becomes a real possibility.
   - Use of position and use of information: whether any director stands to gain an advantage, or another person does, or the company could be harmed.
   - The equivalent general law duties, which run in parallel and are not displaced by the statutory provisions.
   For each, state whether the risk is low, moderate or high on the facts, and what would reduce it.
2. BUSINESS JUDGMENT RULE. Test whether the protection is actually available for the care and diligence duty here. Work through each condition: that the judgment was made in good faith for a proper purpose; that the director has no material personal interest in the subject matter; that they informed themselves about the subject matter to the extent they reasonably believed appropriate; and that they rationally believe the judgment is in the best interests of the company. Say plainly where the informed-decision condition is not met on the information actually before the board, and note that the rule does not protect a failure to make any decision at all.
3. SOLVENCY. Address solvency directly rather than assuming it. State the test — whether the company is able to pay all its debts as and when they become due and payable — and apply it. Work through the usual indicators: continuing losses, liquidity ratios, overdue tax and superannuation, no access to further finance, creditors unpaid outside terms, suppliers on cash-on-delivery, dishonoured payments, inability to produce timely financial records, and reliance on informal or unenforceable support. Reach a conclusion: solvent, doubtful, or insolvent, and say what evidence would change it. Note that support from a parent or shareholder counts only to the extent it is legally enforceable and the supporter is itself able to provide it.
4. INSOLVENT TRADING. Set out each element: that the person was a director at the time; that the company incurred a debt; that the company was insolvent at that time or became insolvent by incurring it; that there were reasonable grounds to suspect insolvency; and that the director was aware of grounds for suspecting, or a reasonable person in a like position would have been. Address when a debt is incurred for these purposes, which is not always when it is paid. Then work through the defences — reasonable grounds to expect solvency and an expectation based on reliance on a competent and reliable person providing adequate information, non-participation because of illness or other good reason, and reasonable steps to prevent the debt being incurred. Say which, if any, is realistically available here, and note that hope is not expectation and that a director who is simply absent is not excused. State that liability is personal, and identify the other personal exposures that travel with it, including director penalty notices for unpaid tax and superannuation.
5. SAFE HARBOUR. Assess whether the safe harbour from insolvent trading is available or could be established. It requires that the director start developing one or more courses of action reasonably likely to lead to a better outcome for the company than immediate administration or liquidation, and that the debt be incurred directly or indirectly in connection with that course. Work through the indicative factors: keeping properly informed of the company's financial position, taking steps to prevent misconduct by officers and employees, keeping appropriate financial records, obtaining advice from an appropriately qualified entity, and developing or implementing a restructuring plan. Then state the conditions that must be maintained for it to remain available, including payment of employee entitlements as they fall due and compliance with tax reporting obligations, and note that the burden of establishing it falls on the director and that the contemporaneous record is what discharges it.
6. CONFLICTS, RELATED PARTIES AND CAPITAL. Identify anything that requires a process rather than a judgment: disclosure of material personal interests and the restrictions on a conflicted director voting or being present, which differ for proprietary and public companies; the related party rules and whether an exception such as arm's length terms applies or member approval is required; financial assistance by a company for the acquisition of shares in itself or its holding company; the requirements for a dividend; any reduction of capital or buy-back; and any transaction that could be examined later as an unreasonable director-related transaction or a voidable transaction if the company fails. For each, give the approval path rather than a conclusion.
7. DISCLOSURE AND REPORTING. For a listed entity, assess continuous disclosure, including whether the decision or the underlying circumstances are market sensitive and whether an exception applies. For any entity, identify reporting obligations triggered — to financiers under covenants, to auditors, to insurers, to regulators, and to the members.
8. MINUTE REQUIREMENTS. Specify what the board paper and the minute must record for this reasoning to stand up when it is examined later, potentially by a liquidator with the benefit of hindsight: the alternatives considered and rejected with reasons, the information relied on and its source, the enquiries made and the answers received, the solvency assessment and its basis, any advice obtained and whether it was followed, interests disclosed and how they were handled, and any dissent. State that reconstructing this after the fact carries little weight and that the minute should be settled promptly.

RULES
- Analyse each duty separately. They have different elements, different defences and different consequences, and collapsing them produces advice that is wrong about all of them.
- Do not assume the business judgment rule protects the decision. Test its conditions, especially whether the board was adequately informed.
- Address solvency explicitly in every assessment where the financial position is anything short of comfortable. Not raising it is itself a failing.
- Distinguish what the company must do from what each director must do. Exposure under these provisions is personal and is not answered by a company-level conclusion.
- Mark thresholds, penalty levels and any procedural time limit [VERIFY]. Do not state them from memory.
- Where the facts suggest the company may already be insolvent, say so plainly and say that formal insolvency advice is required now rather than after the next decision.

OUTPUT FORMAT
Open with a risk rating for the decision and for the directors personally, and the single step that most reduces it. Then the eight sections above, with a table for the duty-by-duty analysis and a checklist for the minute requirements.`,
    example: {
      scenario:
        'The board of a private company with three months of cash and overdue superannuation is asked to approve a new supply contract and a loan from a director-related entity.',
      result:
        'Solvency assessed as doubtful with overdue superannuation and supplier arrears identified as indicators, insolvent trading exposure explained for each new debt with the reliance defence found unavailable on the information actually provided to the board, the safe harbour identified as potentially available but requiring adviser engagement and superannuation to be brought current first, the director loan flagged as a related party transaction needing an arms length assessment or member approval, and a list of what the minute had to record.',
    },
  },
  {
    id: 'au-accc-merger-notification-planner',
    name: 'ACCC Merger Notification & Waiver Planner',
    description: 'Tests an Australian acquisition under the mandatory merger regime and plans the clearance route.',
    jurisdiction: 'au',
    category: 'corporate',
    tags: ['corporate-transactions', 'assessment', 'merger-control', 'accc', 'mandatory-notification', 'notification-waiver', 'mergers-acquisitions', 'competition'],
    sources: [
      { citation: 'Competition and Consumer Act 2010 (Cth), including Part IVA and section 50', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Creates the mandatory notification and substantive competition framework. Use the current compilation and transitional provisions.' },
      { citation: 'Treasury Laws Amendment (Mergers and Acquisitions Reform) Act 2024', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Introduced the mandatory administrative merger-control regime and its application rules.' },
      { citation: 'Competition and Consumer (Notification of Acquisitions) Determination and amending instruments', authority: 'regulator', publisher: 'Australian Government', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Sets notification thresholds, targeted requirements and exemptions. Figures and commencement dates can change by instrument and must be read from the current version.' },
      { citation: 'ACCC merger process, notification, waiver and substantive assessment guidance', authority: 'guidance', publisher: 'Australian Competition and Consumer Commission', jurisdiction: 'au', url: 'https://www.accc.gov.au', note: 'Used for forms, process, evidence expectations and administrative practice. It does not replace the Act or legislative instruments.' },
    ],
    lastReviewed: '2026-09-13',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'technology', 'retail-consumer', 'energy-infrastructure'],
    relatedSkills: ['au-firb-foreign-investment-planner', 'au-director-duties-checker', 'us-hsr-threshold-tester'],
    whatItDoes:
      'Tests whether an acquisition must be notified under Australia’s mandatory merger-control regime, including ordinary, cumulative, voting-power, asset and targeted requirements. It defines the relevant parties and revenues, examines exemptions and notification waivers, and selects the appropriate notification form while keeping the filing test separate from substantive competition risk. It then builds the evidence pack, standstill controls and timetable needed to take the transaction through ACCC review.',
    whenToUse:
      'As soon as an acquisition of shares, assets, land, a business or control with an Australian connection is contemplated, including minority investments, serial acquisitions and internal steps that may affect voting power or control.',
    inputs: [
      { name: 'Acquisition structure', description: 'Shares, assets, land or rights acquired; transaction steps; consideration; control and voting changes; signing and completion.', required: true },
      { name: 'Party groups', description: 'Acquirer, target, connected entities, ultimate controllers and pre-existing interests.', required: true },
      { name: 'Revenue and value data', description: 'Australian revenue by relevant entity, group calculations, global transaction value and valuation support.', required: true },
      { name: 'Prior acquisitions', description: 'Relevant acquisitions during the current statutory look-back period, including products, services, revenue and notification status.' },
      { name: 'Competition facts', description: 'Overlaps, vertical relationships, market shares, competitors, customers, suppliers, entry and internal deal rationale.' },
      { name: 'Regulatory timetable', description: 'Proposed dates, other approvals, financing, long-stop date and any engagement with the ACCC or another regulator.' },
    ],
    outputs: [
      { name: 'Acquisition and party map', description: 'Transaction steps, relevant acquirer and target groups, voting and control changes and Australian connection.' },
      { name: 'Notification analysis', description: 'Each current threshold or targeted requirement applied with calculations and source dates.' },
      { name: 'Exemption analysis', description: 'Potential statutory and instrument exemptions, required evidence and unresolved interpretation.' },
      { name: 'Clearance route recommendation', description: 'Waiver, short notification, long notification or documented no-filing position for counsel confirmation.' },
      { name: 'Substantive risk screen', description: 'Horizontal, vertical, conglomerate and serial-acquisition issues independent of the filing result.' },
      { name: 'Evidence pack', description: 'Revenue workpapers, transaction materials, market data, contacts and declarations required for the selected route.' },
      { name: 'Standstill and timetable plan', description: 'Permitted pre-clearance conduct, filing and review stages, dependencies and long-stop implications.' },
    ],
    prompt: `You are an Australian competition lawyer assessing an acquisition under the current mandatory merger-control regime. Treat notification and substantive competition risk as separate questions. Read every threshold, exemption, fee and procedural period from the current Act, legislative instruments and ACCC materials rather than recalling a figure.

INPUTS
- Acquisition: <shares, assets, land, rights or business; steps; consideration; contract and completion dates>
- Parties: <acquirer, target, sellers, connected entities, ultimate controllers and existing holdings>
- Rights before and after: <voting power, board rights, vetoes, ownership and control>
- Financial data: <Australian revenue by entity and group, global transaction value and valuation basis>
- Prior acquisitions: <all potentially relevant acquisitions during the statutory look-back period, with dates, products, services, revenue and filing status>
- Competition facts: <overlaps, vertical or adjacent relationships, shares, competitors, customers, suppliers, entry and internal analyses>
- Timetable: <signing, completion, financing, long-stop and other regulatory approvals>

TASK
1. REGIME AND EFFECTIVE DATE. Confirm that the current mandatory regime applies at the proposed acquisition date and identify the current Act compilation, notification determination and amending instruments. Address transitional rules for agreements, steps or notifications spanning a commencement date. Mark the effective date [VERIFY].
2. MAP THE ACQUISITION. Characterise each acquisition of shares, assets, land or other property and identify the acquisition date the regime uses. Map the acquirer, target, connected entities and ultimate control before and after. Address staged acquisitions, options, conversions, joint ventures, partnerships, internal reorganisations and multiple interdependent steps separately before considering aggregation.
3. SCOPE AND AUSTRALIAN CONNECTION. Determine whether the transaction is an acquisition within the current statutory scope and whether the target or assets have the required Australian connection. Analyse carrying on business, local revenue, land, intellectual property and offshore acquisitions with Australian subsidiaries or operations. Do not assume an offshore agreement or foreign target falls outside the regime.
4. THRESHOLD CALCULATIONS. Apply every current general notification threshold using the definitions of Australian revenue, merger parties, acquirer group, target and global transaction value in force on the acquisition date. Show the calculation and entity perimeter for each input. Do not state any threshold from memory: quote it only after checking the current instrument, label it [CONFIRMED] with source and effective date, and otherwise leave it [VERIFY].
5. CUMULATIVE AND TARGETED REQUIREMENTS. Test prior acquisitions under every current serial or cumulative rule, including the statutory look-back period, substitutable or similar goods and services, exclusions and treatment of previously notified acquisitions [VERIFY]. Then test voting-power, asset, land, sector-specific and named-acquirer requirements currently in force. Explain when control is relevant and when a notification rule may apply despite the absence of a conventional control change.
6. EXEMPTIONS. Work through each plausible statutory or instrument exemption, including ordinary-course asset or land transactions, financial-market arrangements, financing and security interests, fundraising, buy-backs, internal reorganisations and acquisitions by operation of law where relevant. For each, state the elements, evidence and uncertainty. Do not conclude an exemption applies on incomplete facts.
7. ROUTE SELECTION. Compare a notification waiver, short-form notification and long-form notification against the transaction's complexity and competition risk. Explain that a waiver is a distinct route and not merely a preliminary step to every notification. Recommend a route for external counsel confirmation, identify the current form, declaration and fee [VERIFY], and state what would cause the route to change.
8. SUBSTANTIVE COMPETITION SCREEN. Independently assess whether the acquisition may substantially lessen competition. Cover horizontal unilateral and coordinated effects, vertical foreclosure, access to data or inputs, conglomerate effects, elimination of potential competition, barriers to entry, countervailing power and serial-acquisition strategy. Identify the relevant evidence and internal documents. Do not use a notification waiver or below-threshold status as substantive clearance.
9. EVIDENCE AND ENGAGEMENT. Build the filing workplan: revenue calculations and source records, transaction documents, board papers and internal analyses, prior-acquisition schedule, market definition, shares, competitors, customers, suppliers, entry evidence, efficiencies and public benefits if relevant. Identify third-party contacts and confidentiality issues. State when confidential pre-notification engagement is useful and who controls communications.
10. STANDSTILL AND DEAL PROTECTION. State whether the acquisition must wait for approval or a waiver and identify the consequence of implementing prematurely under current law [VERIFY]. Review conditions precedent, interim operating covenants, information exchange, clean-team controls, long-stop, cooperation, remedies and termination. Prevent contractual rights or operational integration from transferring control or implementing the transaction before clearance.
11. PROCESS AND TIMETABLE. Build a dated timetable covering waiver or notification preparation, acceptance, public register and consultation, each assessment phase, information requests, possible remedies, review rights and completion. Mark every statutory or indicative period [VERIFY] and show suspensions and dependencies. Coordinate separately with FIRB, sector approvals and foreign merger filings.

RULES
- Never recall or estimate a threshold, fee, statutory period or penalty. Read the current official source and record its effective date.
- Notification obligation, availability of an exemption or waiver, and substantive competition risk are separate conclusions.
- Define the relevant entities and revenue perimeter before calculating anything.
- Test serial acquisitions and current targeted requirements even where the immediate target is small.
- Do not treat ACCC guidance as legislation or an expected processing time as a statutory deadline.
- If a potentially notifiable acquisition may already have been implemented, say so first and recommend urgent Australian competition advice.
- Do not recommend closing, integration or transfer of control on an unverified filing conclusion.

OUTPUT FORMAT
Open with the provisional notification route, the standstill position and the single calculation most likely to change the result. Then provide the eleven sections above, with tables for thresholds, prior acquisitions, exemptions and the regulatory timetable.`,
    example: {
      scenario:
        'A large Australian services group proposes its fourth acquisition of a regional software provider in three years, using a share purchase followed by an asset transfer into an existing subsidiary.',
      result:
        'The share and asset steps mapped separately, acquirer-group and target Australian revenue calculated from source records, the current cumulative-acquisition rules applied across the earlier software deals, general and asset requirements tested without recalled figures, waiver and notification routes compared, potential-competition and serial-strategy risks identified, and a standstill and ACCC timetable integrated into the sale agreement.',
    },
  },
  {
    id: 'au-firb-foreign-investment-planner',
    name: 'FATA / FIRB Foreign Investment Approval Planner',
    description: 'Tests an Australian investment under the foreign-investment framework and plans approval and compliance.',
    jurisdiction: 'au',
    category: 'corporate',
    tags: ['corporate-transactions', 'screening', 'foreign-investment', 'firb', 'national-security', 'transaction-clearance', 'mergers-acquisitions', 'regulatory-approval'],
    sources: [
      { citation: 'Foreign Acquisitions and Takeovers Act 1975 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Creates the action classifications, notification, decision, enforcement and compliance framework. Use the current compilation.' },
      { citation: 'Foreign Acquisitions and Takeovers Regulation 2015 and fee legislation', authority: 'regulator', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Provides definitions, thresholds, exemptions and fee mechanics. Monetary figures are updated and must be checked against current instruments.' },
      { citation: 'Australia’s Foreign Investment Policy and official guidance notes', authority: 'guidance', publisher: 'Australian Treasury', jurisdiction: 'au', url: 'https://foreigninvestment.gov.au', note: 'Used for current policy, applications, conditions, compliance and administrative practice. FIRB is advisory; statutory decisions are made under the Treasurer’s powers.' },
      { citation: 'Register of Foreign Ownership of Australian Assets guidance', authority: 'guidance', publisher: 'Australian Taxation Office', jurisdiction: 'au', url: 'https://www.ato.gov.au', note: 'Used to identify current registration and post-acquisition reporting mechanics where the transaction creates a registrable interest.' },
    ],
    lastReviewed: '2026-09-13',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'technology', 'energy-infrastructure', 'public-sector'],
    relatedSkills: ['au-accc-merger-notification-planner', 'au-director-duties-checker', 'uk-nsi-transaction-screener'],
    whatItDoes:
      'Determines whether a proposed investment must or should be submitted under Australia’s foreign-investment framework and builds the application, transaction-protection and post-approval compliance plan. It traces foreign status and associates through funds and government ownership, classifies each action, applies current monetary and ownership thresholds, and separately assesses national-interest and national-security exposure. It preserves the legal distinction between the Treasurer’s statutory decision-making power and FIRB’s advisory role.',
    whenToUse:
      'Before a foreign-linked acquisition, financing, internal reorganisation, fund investment, business start-up, land transaction or interest increase involving an Australian entity, business, asset, tenement or national-security activity.',
    inputs: [
      { name: 'Investor structure', description: 'All direct and indirect investors, ownership, control, fund arrangements, government interests and associates.', required: true },
      { name: 'Proposed actions', description: 'Securities, assets, business, land or rights acquired; percentage and control changes; steps and consideration.', required: true },
      { name: 'Australian target', description: 'Entity, business, assets, land, tenements, activities, value, revenue and national-security connections.', required: true },
      { name: 'Jurisdictions and treaty status', description: 'Investor home jurisdictions and facts relevant to any current agreement-country threshold.' },
      { name: 'Transaction documents', description: 'Draft agreement, conditions precedent, financing, governance rights, long-stop date and implementation sequence.' },
      { name: 'Regulatory and compliance history', description: 'Prior approvals, exemption certificates, conditions, registrations and engagement with Treasury, ATO or other regulators.' },
    ],
    outputs: [
      { name: 'Foreign-person and associate map', description: 'Investor status, government-investor analysis, aggregation and unresolved ownership or control facts.' },
      { name: 'Action classification', description: 'Significant, notifiable, national-security and reviewable actions identified for each transaction step.' },
      { name: 'Threshold and exemption analysis', description: 'Current percentage, monetary, sector and land tests with treaty treatment and exemptions.' },
      { name: 'Submission recommendation', description: 'Mandatory notice, voluntary submission, exemption certificate, retrospective notice or documented no-filing route for counsel confirmation.' },
      { name: 'Application pack', description: 'Ownership, transaction, funding, national-interest, tax, competition and security information needed.' },
      { name: 'Deal protection plan', description: 'Approval condition, interim covenants, long-stop, information rights and allocation of condition risk.' },
      { name: 'Conditions and reporting register', description: 'Approval conditions, action notification, foreign-ownership registration and continuing compliance obligations.' },
    ],
    prompt: `You are an Australian foreign-investment lawyer assessing a proposed action under the current Foreign Acquisitions and Takeovers Act framework. Analyse the statutory position rather than using "FIRB approval" as a substitute for the legal tests: FIRB advises, while the Treasurer or delegate exercises the relevant statutory powers.

INPUTS
- Investors: <each direct and indirect holder, ownership, voting, control, fund and government links>
- Associates: <agreements, acting-together arrangements, general partners, managers, trustees and related entities>
- Proposed action: <shares, units, assets, business, land, tenements, rights, stages, percentage and control changes>
- Australian target: <activities, assets, land, revenue, value, sector, customers and national-security connections>
- Investor jurisdictions: <home jurisdictions and facts relevant to agreement-country treatment>
- Deal documents: <draft agreement, conditions, interim rights, funding, governance, long-stop and implementation>
- History: <prior investments, approvals, exemption certificates, conditions, registrations and compliance issues>

TASK
1. CURRENT FRAMEWORK. Identify the current Act compilation, regulations, monetary-threshold instrument, fee rules, policy and guidance at the proposed action date. Note any announced reform that is not yet commenced separately and do not apply it as law. Mark every commencement date [VERIFY].
2. INVESTOR AND ASSOCIATE MAP. Determine whether each participant is a foreign person and whether any entity is a foreign government investor under the current definitions. Trace ownership, voting power, potential voting power, control and government interests through every tier, including funds, trusts and limited partnerships. Apply the associate rules and show all aggregation. Do not infer independence merely from separate legal personality.
3. ACTION-BY-ACTION CLASSIFICATION. Characterise every step as a potential significant action, notifiable action, notifiable national-security action or reviewable national-security action under the current legislation. Address acquisitions of securities, assets, Australian businesses, land entities, agricultural interests, mining or exploration tenements, media, national-security businesses, starting a business, offshore acquisitions and passive percentage increases where relevant. A step may fall into more than one category; show each route.
4. INTEREST AND CONTROL TESTS. Calculate direct, substantial and aggregate substantial interests, control changes and any special test for a foreign government investor, land entity, agribusiness, media or national-security business. Include options, convertible interests, vetoes, board rights and interests held by associates. Quote percentages only after verifying the current provision and label them with source and effective date.
5. MONETARY AND TREATY THRESHOLDS. Identify the correct current threshold for each action based on investor type, investor jurisdiction, target type, sector, land category and value. Show the valuation method and currency conversion date. Do not state or estimate a figure from memory. Record the official source, effective date and whether agreement-country treatment has actually been established.
6. NATIONAL SECURITY. Determine whether the target carries on or will start a national-security business, whether land is national-security land, and whether data, defence, critical infrastructure, government supply or sensitive-site facts raise national-security risk. Then consider reviewable actions and the call-in exposure that may exist below monetary thresholds. Keep this analysis separate from the broader national-interest test.
7. EXEMPTIONS AND CERTIFICATES. Apply each plausible statutory or regulatory exemption, including moneylending, underwriting, custodian, internal reorganisation, passive investment or other transaction-specific routes where relevant [VERIFY]. Check any existing exemption certificate for holder, activity, value, duration, conditions and reporting. Do not conclude an exemption applies without facts satisfying every element.
8. SUBMISSION ROUTE. Recommend for specialist confirmation one of: mandatory pre-action notice, voluntary submission, exemption-certificate application, retrospective notice, no filing with a documented rationale, or urgent advice. Identify the legal action being notified, correct applicant, current portal, fee [VERIFY] and whether separate applications are needed. State prominently when the transaction must not be taken before a no-objection notification or exemption is obtained.
9. APPLICATION EVIDENCE. Build the information pack: ownership and control charts, government-interest analysis, transaction and implementation diagram, source and flow of funds, valuation, business and land description, national-interest submission, national-security analysis, tax position, competition overlaps, regulator engagement and post-acquisition plans. Identify inconsistencies or missing evidence likely to delay acceptance or decision.
10. CONTRACT AND TIMETABLE. Review the condition precedent, no-action-before-approval covenant, interim operating restrictions, access to information, cooperation and control of the application, conditions and remedies, long-stop, termination and allocation of fees and compliance costs. Ensure interim rights do not themselves amount to taking the action. Build the statutory and practical timetable with every period and extension power [VERIFY].
11. CONDITIONS AND POST-COMPLETION COMPLIANCE. Convert proposed or imposed conditions into a register with obligation, owner, evidence, due date, recurrence and escalation. Identify action-taken notification, Register of Foreign Ownership of Australian Assets requirements, tax conditions, recordkeeping, annual reporting, independent audit and disposal obligations as applicable. Do not assume approval ends the work.
12. PARALLEL REGIMES. Identify separate ACCC merger notification, sector licensing, critical-infrastructure, export-control, sanctions, tax and State or Territory land approvals. Coordinate their timing but do not treat a decision under one regime as satisfying another.

RULES
- Never state a monetary threshold, fee, ownership percentage, time period or penalty from memory. Verify it against the current official source and effective date.
- Distinguish the statutory role of the Treasurer or delegate from FIRB's advisory role.
- Foreign-person, foreign-government-investor and associate analysis must be completed before thresholds are selected.
- Analyse each transaction step and each action category; do not rely on the parties' label for the deal.
- Absence of a mandatory notice can coexist with call-in or voluntary-submission risk.
- Do not conclude an exemption or treaty-country threshold applies without evidence for every condition.
- If an action may already have been taken without a required approval, say so first and recommend urgent Australian foreign-investment advice.

OUTPUT FORMAT
Open with the provisional submission route, whether the action may be taken before approval and the ownership fact most likely to change the result. Then provide the twelve sections above, with tables for investor status, action classification, thresholds, conditions and the transaction timetable.`,
    example: {
      scenario:
        'A Cayman fund managed in Singapore, with several sovereign investors and an offshore portfolio company, proposes to acquire an Australian data-centre operator and adjacent land through two staged entities.',
      result:
        'The fund, manager, sovereign holdings and associates traced before investor status was decided; the share, business and land steps classified separately; current national-security and land tests applied without recalled thresholds; offshore and agreement-country assumptions challenged; a pre-action submission and evidence pack mapped; and approval conditions, ACCC clearance and foreign-ownership registration sequenced into the deal timetable.',
    },
  },
];
