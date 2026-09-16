import type { Skill } from '../../../types/skill';

/**
 * UK corporate skills — company actions and national-security screening.
 */
export const ukCorporateSkills: Skill[] = [
  {
    id: 'uk-companies-act-corporate-actions',
    name: 'Companies Act Corporate Actions & Filings Planner',
    description: 'Maps approvals, capital rules, records and filings for a proposed UK company action.',
    jurisdiction: 'uk',
    category: 'corporate',
    tags: ['corporate-transactions', 'assessment', 'companies-act', 'corporate-governance', 'share-capital', 'board-approval', 'companies-house', 'statutory-filings'],
    sources: [
      { citation: 'Companies Act 2006', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'The principal framework for company constitution, directors, member decisions, share capital, distributions, buy-backs, records and filings. Use the current amended text and commencement position.' },
      { citation: 'Economic Crime and Corporate Transparency Act 2023 and commencement instruments', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Introduces material changes to Companies House powers, identity verification and company information. Provisions have been commenced in stages and must be checked as at the action date.' },
      { citation: 'Companies House company-law and filing guidance', authority: 'guidance', publisher: 'Companies House', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'Used for current forms, filing routes, identity-verification rollout and administrative practice. It does not replace the Act, articles or transaction-specific advice.' },
      { citation: 'Insolvency Act 1986', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relevant where a distribution, capital transaction or related-party step may later be examined in insolvency. It does not turn this workflow into an insolvency opinion.' },
    ],
    lastReviewed: '2026-09-13',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'technology', 'professional-services'],
    relatedSkills: ['uk-nsi-transaction-screener', 'uk-bribery-act-reviewer', 'global-draft-builder', 'uk-companies-house-idv-psc-tracker'],
    whatItDoes:
      'Turns a proposed action by a UK company into a sequenced authority, approval, capital-maintenance, documentation and filing plan. It reads the articles and shareholder arrangements alongside the Companies Act, tests director conflicts and member approvals, and covers the statutory books, Companies House filings, people with significant control and identity-verification steps that make an otherwise valid transaction operationally complete. It distinguishes public and private company rules and does not assume that filing cures a defective approval.',
    whenToUse:
      'Before issuing or transferring shares, granting options, declaring a dividend, buying back shares, reducing capital, changing directors or ownership, entering a related-party transaction, amending articles or completing a reorganisation or acquisition involving a UK company.',
    inputs: [
      { name: 'Company profile', description: 'Exact entity, jurisdiction within the UK, private or public status, listing status, group position and accounting reference date.', required: true },
      { name: 'Constitution and agreements', description: 'Current articles, resolutions, shareholder or investment agreements and any class-rights documents.', required: true },
      { name: 'Proposed action', description: 'Each transaction step, consideration, parties, timing, documents and intended legal and economic effect.', required: true },
      { name: 'Capital and ownership', description: 'Register of members, statement of capital, option and convertible schedule, PSC information and relevant Companies House record.' },
      { name: 'Financial information', description: 'Latest annual and management accounts, distributable-reserve analysis, solvency information and proposed funding source.' },
      { name: 'Decision-makers and interests', description: 'Directors, members, connected persons, interests, proposed appointments and identity-verification status.' },
    ],
    outputs: [
      { name: 'Corporate authority matrix', description: 'Articles, contractual and statutory authority for each step, including board, member and class approvals.' },
      { name: 'Capital-maintenance analysis', description: 'Allotment, pre-emption, distribution, buy-back or reduction rules engaged and the financial evidence required.' },
      { name: 'Conflict and related-party process', description: 'Director disclosures, participation restrictions and any member approval or listed-company overlay to verify.' },
      { name: 'Document set', description: 'Resolutions, notices, waivers, contracts, certificates, statements and minute requirements in execution order.' },
      { name: 'Registers and filing calendar', description: 'Companies House forms, deadlines, statutory-book updates, PSC steps and identity-verification dependencies.' },
      { name: 'Completion checklist', description: 'Pre-signing, signing, completion and post-completion actions with owners and evidence of completion.' },
      { name: 'Defect and escalation report', description: 'Missing authority, late filing, inaccurate register or prior defective action requiring specialist advice.' },
    ],
    prompt: `You are a UK corporate lawyer planning a proposed company action. Work from the company's current articles, shareholder arrangements, statutory books and Companies House record as well as the Companies Act 2006. Confirm whether the company is private or public and whether any listed-company, regulated-sector or insolvency overlay applies before giving a conclusion.

INPUTS
- Company: <exact name, registered number, UK jurisdiction, private or public, listed or unlisted, group role>
- Constitution: <current articles and relevant resolutions>
- Shareholder arrangements: <shareholders' agreement, investment agreement, voting or class-rights documents>
- Proposed action: <every transaction step, consideration, parties, timing and intended effect>
- Capital and holders: <register of members, statement of capital, classes, options, convertibles and PSC position>
- Financial information: <latest accounts, management accounts, reserves and solvency information>
- Decision-makers: <directors, members, connected persons, interests and identity-verification status>
- Existing record: <Companies House filings, statutory books, prior approvals and any step already taken>

TASK
1. SCOPE AND STATUS. Confirm the entity, UK jurisdiction, private or public status, listing and regulated-sector status. Identify the current statutory text and commencement position at the proposed action date. State which facts change the analysis for a public company, listed company, investment company, community interest company, regulated firm or company in financial difficulty. Do not apply a private-company procedure to a public company by analogy.
2. CHARACTERISE EACH ACTION. Split the proposal into its legal components: appointment or removal, contract entry, allotment, issue, transfer, option or convertible grant, variation of class rights, distribution, buy-back, redemption, capital reduction, amendment, reorganisation, acquisition or disposal, charge and filing. Identify the Companies Act Part and provision governing each component [VERIFY], and distinguish a share allotment from an issue or transfer.
3. AUTHORITY MATRIX. Read the articles and shareholder arrangements against the Act. For every component state the board power, any director allotment authority, statutory and contractual pre-emption, reserved matter, member resolution, class consent, notice, quorum, majority and written-resolution availability. Distinguish statutory validity from contractual breach. Verify whether an authority is current, capped or expired and calculate headroom from the actual capital records.
4. DIRECTORS AND CONFLICTS. Identify duties engaged, interests to disclose, authorisation available under the articles, restrictions on participation and any transaction with a director or connected person requiring member approval. Test whether the board is properly constituted and has adequate information. Do not assume declaration of an interest alone completes the process, and do not merge the general duties analysis with a separate statutory member-approval requirement.
5. SHARE CAPITAL AND PRE-EMPTION. For an allotment, option, convertible, rights change or transfer, show the authorised security, price and payment, allotment authority, statutory pre-emption, contractual pre-emption, disapplication, class rights, cap-table effect and return or register update. Identify any securities-law, financial-promotion, takeover or tax question without attempting to resolve it under company law. Mark every period, percentage and filing deadline [VERIFY].
6. CAPITAL MAINTENANCE. For a dividend or other distribution, identify the relevant accounts and evidence of distributable profits, apply any public-company net-assets test and assess whether solvency or creditor interests require separate attention. For a buy-back, redemption or reduction, map the permitted funding source, contract, director statement, auditor involvement, member approval, excluded voting, notice or creditor process, payment, cancellation and filing sequence. Do not treat cash availability as proof of lawfully distributable reserves.
7. OWNERSHIP, PSC AND IDENTITY VERIFICATION. Reconcile the legal register of members, beneficial ownership information, PSC analysis and Companies House record. Identify notifications and restrictions required by the PSC regime, and verify the identity-verification rules and transitional dates currently in force for directors, PSCs and presenters. Treat personal codes and identity documents as sensitive information and specify a secure handling process rather than reproducing them in the output.
8. DOCUMENT SET AND EXECUTION. List all board and member notices, written resolutions, minutes, waivers, consents, contracts, stock-transfer forms, certificates, statements, accounts and filing evidence. State who signs, whether electronic execution is appropriate, when originals or stamping may matter, and dependencies between documents. Identify what the minute must record about authority, interests, financial information and the board's reasoning.
9. FILINGS AND STATUTORY BOOKS. Produce a filing calendar giving the event, current form or online service [VERIFY], filer, deadline [VERIFY], attachments, fee and evidence of acceptance. Separately list updates to the register of members, directors, PSCs, charges, allotments and other statutory records. Explain that Companies House acceptance is not a legal opinion and does not cure missing authority or an unlawful capital step.
10. DEFECTS AND REMEDIATION. Identify discrepancies between the articles, statutory books, cap table and public register, expired authority, late filing, missing resolution, unlawful distribution risk or action already implemented out of sequence. State the remediation route to verify and whether court, tax, insolvency or specialist corporate advice is required. Never propose backdating or recreating a decision that did not occur.
11. CLOSING PLAN. Give a chronological plan divided into diligence, pre-signing, board action, member or class action, signing, completion and post-completion. Assign an owner and evidence of completion to every step, and list the unresolved legal conclusions that must be cleared before funds, shares or control move.

RULES
- Use the legislation and commencement position in force on the proposed action date. Company-law and Companies House reforms are being phased in.
- Read the articles and shareholder agreements. Do not substitute the model articles or statutory default without evidence that it applies.
- Distinguish private, public and listed-company rules throughout.
- Never equate cash with distributable profits, Companies House acceptance with validity, or a cap table with the legal register of members.
- Mark every majority, threshold, notice period, deadline, form and commencement date [VERIFY].
- Flag tax, stamp duty, insolvency, financial-services, takeover, employment and competition questions as separate workstreams.
- Do not expose personal identity codes or identity documents in the output.

OUTPUT FORMAT
Open with the required approving bodies, the capital-maintenance conclusion and the first filing deadline. Then provide the eleven sections above, with tables for the authority matrix, filings and closing plan and a final pre-completion stop list.`,
    example: {
      scenario:
        'A UK private technology company proposes a new preference-share round, a founder share buy-back and appointment of an investor director before its next confirmation statement.',
      result:
        'An authority matrix separating allotment authority, statutory and contractual pre-emption and class consent; the buy-back funding and approval sequence tested against current accounts rather than cash; the investor director conflict and appointment steps mapped; member, PSC and identity-verification records reconciled; and an ordered Companies House and statutory-book filing plan with every deadline marked for verification.',
    },
  },
  {
    id: 'uk-nsi-transaction-screener',
    name: 'NSI Act Transaction Screener & Notification Planner',
    description: 'Screens an acquisition under the UK national-security regime and plans any required notification.',
    jurisdiction: 'uk',
    category: 'corporate',
    tags: ['corporate-transactions', 'screening', 'national-security', 'foreign-investment', 'mergers-acquisitions', 'mandatory-notification', 'transaction-clearance'],
    sources: [
      { citation: 'National Security and Investment Act 2021', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Creates the trigger-event, mandatory-notification, call-in, review, enforcement and validation framework. Use the current amended text.' },
      { citation: 'National Security and Investment Act 2021 subordinate legislation', authority: 'regulator', publisher: 'UK Government', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Defines notifiable acquisitions, sensitive activities, procedure and prescribed information. The current regulations must be applied rather than a remembered sector label.' },
      { citation: 'National Security and Investment Act guidance and market guidance notes', authority: 'guidance', publisher: 'Investment Security Unit and Cabinet Office', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'Used for current notification practice, sector interpretation and the government’s stated approach to call-in. Guidance is not the statutory test.' },
    ],
    lastReviewed: '2026-09-13',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['technology', 'energy-infrastructure', 'public-sector'],
    relatedSkills: ['uk-companies-act-corporate-actions', 'au-firb-foreign-investment-planner', 'cross-four-regime-gap-analyzer'],
    whatItDoes:
      'Determines whether an acquisition engages the UK National Security and Investment Act, whether notification is mandatory or voluntary, and how the review affects signing and completion. It analyses the target activity rather than relying on its industry label, traces direct and indirect control changes, separates entity acquisitions from asset acquisitions, and produces a filing evidence pack and transaction timetable. It also flags call-in exposure where no mandatory filing is required.',
    whenToUse:
      'At the start of any acquisition, investment, internal reorganisation, joint venture, licence or control-rights change with a UK nexus, especially in technology, infrastructure, data, defence, energy or government-supply activities.',
    inputs: [
      { name: 'Transaction structure', description: 'Shares, voting rights, assets, contractual rights, stages, parties, signing and completion mechanics.', required: true },
      { name: 'Target activities', description: 'Detailed products, services, technology, R&D, customers, assets and locations rather than a broad sector label.', required: true },
      { name: 'Ownership and control', description: 'Pre- and post-transaction ownership, voting, veto, board and material-influence rights through every relevant entity.', required: true },
      { name: 'UK nexus', description: 'UK entities, activities, customers, supplies, assets and effects connected with the transaction.' },
      { name: 'Acquirer profile', description: 'Ownership chain, ultimate controllers, government links, prior acquisitions and relevant compliance history.' },
      { name: 'Deal timetable', description: 'Signing, long-stop and completion dates, other clearances, financing and proposed conditions precedent.' },
    ],
    outputs: [
      { name: 'Trigger-event map', description: 'Each direct or indirect acquisition of control over an entity or asset and its UK nexus.' },
      { name: 'Mandatory-notification analysis', description: 'Qualifying-entity, control and sensitive-activity tests applied with unresolved facts identified.' },
      { name: 'Call-in risk assessment', description: 'Target, control and acquirer risk factors for transactions outside mandatory notification.' },
      { name: 'Notification route', description: 'Mandatory, voluntary, retrospective validation or no filing, expressed as a counsel-verification recommendation.' },
      { name: 'Evidence and form pack', description: 'Ownership, activity, transaction and national-security information needed for a complete filing.' },
      { name: 'Transaction protection plan', description: 'Conditions precedent, covenants, information rights, long-stop and risk-allocation points.' },
      { name: 'Review timetable', description: 'Acceptance, review, assessment, information-request and clearance stages with dates marked for verification.' },
    ],
    prompt: `You are a UK national-security investment lawyer screening a transaction under the National Security and Investment Act 2021. Analyse each acquisition step and each target entity or asset separately. Do not infer sector coverage from a company description, and do not assume that a transaction outside mandatory notification is outside the call-in regime.

INPUTS
- Transaction: <shares, votes, assets, contractual rights, stages, consideration, signing and completion>
- Parties and ownership: <full pre- and post-transaction chains, ultimate controllers and government links>
- Control rights: <votes, board appointment, veto, policy influence and rights over assets>
- Target activities: <products, services, technology, R&D, supply chain, customers and contracts in operational detail>
- UK nexus: <UK entities, activities, supplies, customers, assets or effects>
- History: <prior connected acquisitions, reorganisations, notifications and government engagement>
- Timetable: <signing, completion, long-stop, financing and other regulatory clearances>

TASK
1. TRANSACTION MAP. Diagram every acquisition step, direct and indirect target, acquirer and ultimate controller. Identify options, staged investments, conversions, board or veto rights, joint ventures, internal reorganisations and connected acquisitions. Fix the date on which each right is acquired rather than assuming the economic closing date controls.
2. UK NEXUS AND QUALIFYING SUBJECT. Determine whether each subject is a qualifying entity or qualifying asset and identify the facts creating the UK nexus. Address non-UK entities that carry on activities in or supply goods or services to the UK, and assets used in connection with UK activities or supply. Mark the current territorial rules and guidance [VERIFY].
3. TRIGGER EVENTS. Test every current statutory control threshold and material-influence route for entities, and the control or use tests for assets [VERIFY]. Compare before and after rights and account for indirect holdings and agreements between parties. Do not collapse mandatory-notification control tests and broader call-in trigger events into one test.
4. SENSITIVE-ACTIVITY TEST. Apply the current notifiable-acquisition regulations line by line to the target's actual activities. For each potentially relevant mandatory area, identify the defined activity, the evidence for or against coverage, unresolved technical terms and the official source to verify. Do not decide coverage from a sector name, standard industrial code or marketing description.
5. MANDATORY NOTIFICATION. Determine structurally whether there is an acquisition of a qualifying entity, the relevant control threshold is crossed and the entity performs a currently specified activity. State the provisional result and every fact requiring specialist confirmation. Confirm whether a proposed reorganisation, insolvency step or intra-group transaction is within scope rather than assuming an exemption. Where mandatory notification appears engaged, state prominently that completion before clearance may be legally ineffective and carry serious consequences, subject to current-law verification.
6. VOLUNTARY NOTIFICATION AND CALL-IN. Where mandatory notification is not engaged, assess call-in risk using the current statutory statement and guidance: target risk, control risk and acquirer risk. Consider sensitive assets, early-stage or pre-revenue technology, proximity to sensitive sites, supply into government or critical infrastructure, cumulative acquisitions and the practical value of clearance. Give reasons for and against voluntary notification without presenting guidance factors as binding law.
7. ROUTE AND FORM. Recommend for counsel confirmation one of: mandatory notification, voluntary notification, retrospective validation application, no filing with documented rationale, or urgent specialist advice. Identify the correct current form and notifying party, and list the ownership, activity, transaction, history and national-security information needed. Flag classified or export-controlled information for an agreed secure handling route.
8. TRANSACTION DOCUMENTS. Draft an issues list for the condition precedent, conduct before clearance, information and cooperation covenants, control over submissions, remedies, risk allocation, long-stop date, termination and consequences of prohibition or conditions. Ensure interim covenants do not themselves transfer control before clearance. Coordinate, but do not merge, NSI analysis with merger control, sector approval, export control and foreign-investment regimes elsewhere.
9. REVIEW PROCESS AND TIMETABLE. Build a timetable from pre-notification preparation through acceptance, initial review, call-in, assessment, information or attendance notices, interim orders and final outcome. Mark every statutory period and suspension rule [VERIFY], allow for rejection of an incomplete or wrong form, and show the effect on the deal long-stop date.
10. OUTCOME AND COMPLIANCE. Explain the possible clearance, conditional clearance, interim order, prohibition or validation outcomes. For a conditional outcome, create an obligation register with owner, evidence, reporting date and access controls. Identify offences, civil exposure and personal exposure only by reference to current verified provisions; do not quote a penalty from memory.

RULES
- Apply the current Act, regulations, statutory statement and guidance as at the transaction date. Sector definitions and procedure can change.
- Mandatory notification applies through specified statutory tests; do not infer it from perceived sensitivity alone.
- Absence of mandatory notification does not remove voluntary-notification or call-in risk.
- Analyse entity and asset acquisitions separately and do not assume an asset acquisition is mandatorily notifiable.
- Mark every control threshold, sector definition, review period, look-back period and penalty [VERIFY].
- Do not promise clearance, predict political treatment or describe guidance as binding law.
- If the facts suggest a mandatorily notifiable acquisition may already have completed without approval, say so first and recommend urgent specialist advice on validation and transaction status.

OUTPUT FORMAT
Open with the provisional route, completion restriction and most important missing fact. Then provide the ten sections above, with a transaction map, sector-test table, evidence checklist and regulatory timetable.`,
    example: {
      scenario:
        'A foreign investor will acquire 30% of a UK artificial-intelligence company, appoint two of five directors and receive vetoes over its product roadmap and licensing of dual-use models.',
      result:
        'Each share, voting and governance trigger mapped; the target activity tested against the current technical definitions rather than its AI label; mandatory and wider call-in routes kept separate; the completion restriction and interim-control risk identified; a notification evidence pack prepared; and NSI conditions precedent, cooperation rights and long-stop assumptions added to the deal plan.',
    },
  },
  {
    id: 'uk-companies-house-idv-psc-tracker',
    name: 'Companies House IDV & PSC Tracker',
    description: 'Tracks identity verification status and deadlines for directors, PSCs and officers across a UK group.',
    jurisdiction: 'uk',
    category: 'corporate',
    tags: ['corporate-transactions', 'extraction', 'companies-house', 'statutory-filings', 'identity-verification', 'corporate-governance'],
    sources: [
      { citation: 'Economic Crime and Corporate Transparency Act 2023 and its commencement regulations', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Introduces identity verification for directors, people with significant control and others. Provisions commence in stages; several categories are not yet live.' },
      { citation: 'Companies Act 2006, as amended', authority: 'primary', publisher: 'UK Parliament', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Relied on for the confirmation statement, registers and PSC regime into which verification is integrated.' },
      { citation: 'Companies House guidance on verifying identity', authority: 'regulator', publisher: 'Companies House', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'Identity verification became a legal requirement from 18 November 2025, followed by a 12-month transition period for existing directors and PSCs. Corporate directors, corporate members of LLPs and officers of corporate PSCs are to follow later. Confirmed as at 2026-09-16.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    relatedSkills: ['uk-companies-act-corporate-actions', 'uk-nsi-transaction-screener', 'global-obligation-extraction'],
    whatItDoes:
      'Builds and maintains a group-wide register of every individual who must verify their identity with Companies House — directors, PSCs, LLP members and presenters — against each entity they are connected to, and calculates when each person’s verification is due. It separates obligations already live from categories scheduled to commence later, ties director deadlines to each company’s confirmation statement date and PSC deadlines to the rules for their appointed day, and flags people who are overdue, people connected to many entities, and appointments that cannot proceed without a verified identity.',
    whenToUse:
      'When mapping a group’s verification position for the first time, before each confirmation statement, when appointing directors or registering PSCs, after an acquisition brings in new entities, and when later commencement stages switch on new categories. Not for: planning the approvals and filings for a corporate transaction (use the corporate actions planner) or verifying anyone’s identity.',
    inputs: [
      { name: 'Entity list', description: 'Each company and LLP in the group with registered number and confirmation statement date.', required: true },
      { name: 'People list', description: 'Directors, PSCs, LLP members and regular presenters for each entity, with dates of birth month where relevant.', required: true },
      { name: 'Verification status', description: 'Who has verified and holds a personal code, and who has not.' },
      { name: 'Corporate officers', description: 'Corporate directors, corporate LLP members and corporate PSCs with their relevant officers.' },
      { name: 'Planned changes', description: 'Upcoming appointments, resignations and PSC changes.' },
    ],
    outputs: [
      { name: 'Obligation status map', description: 'Which verification obligations are live and which are scheduled, with sources checked.' },
      { name: 'Person-entity register', description: 'Every individual against every entity and role, with verification status.' },
      { name: 'Deadline calendar', description: 'Each person’s due date, how it was calculated, and the filing it is tied to.' },
      { name: 'Exceptions report', description: 'Overdue, unknown and high-connection individuals, and blocked appointments.' },
      { name: 'Communications plan', description: 'Messages to individuals explaining what they must do and by when.' },
      { name: 'Data handling note', description: 'How personal codes and identity details must be protected.' },
    ],
    prompt: `You are a UK company secretarial specialist tracking identity verification obligations across a corporate group.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
Live:
- Identity verification a legal requirement from 18 November 2025, followed by a 12-month transition period for existing directors and PSCs [CONFIRMED, gov.uk].
- Existing directors confirm verification when filing the company's next confirmation statement during the transition [CONFIRMED].
- PSCs have an appointed day followed by a 14-day period to verify. For PSCs who are also directors this is generally linked to the confirmation statement; for PSCs who are not directors the window starts from their birth month [CONFIRMED; VERIFY edge cases].
Scheduled, not yet live:
- Verification for corporate directors, corporate members of LLPs, officers of corporate PSCs and limited partnerships [CONFIRMED as later; VERIFY current commencement status].

INPUTS
- Entities: <each company or LLP, registered number, confirmation statement date>
- People: <directors, PSCs, LLP members, presenters, per entity; birth month for non-director PSCs>
- Verification status: <verified with personal code / not verified / unknown>
- Corporate officers: <corporate directors, corporate LLP members, corporate PSCs and their officers>
- Planned changes: <appointments, resignations, PSC changes>

TASK
1. SCOPE GATE. Confirm each entity is registered at Companies House and identify its type. Overseas entities and limited partnerships follow different or later rules; separate them.
2. STATUS CHECK. Before calculating any date, confirm on official Companies House guidance which categories are live and which are scheduled on the date of the review. Record the date checked. Never apply a scheduled obligation as if it were live.
3. MISSING INFORMATION. Identify missing confirmation statement dates, missing birth months for non-director PSCs, and unknown verification status. Treat unknown status as not verified for planning purposes.
4. PERSON-ENTITY REGISTER. Build a register with a row per person per entity and role. Consolidate each individual across entities, since one verification serves all their roles but each role may carry its own deadline.
5. DEADLINE CALENDAR. For each unverified person in a live category, calculate the due date and show the calculation: for existing directors, by reference to the entity's next confirmation statement within the transition period; for PSCs, from the appointed day plus the 14-day window under the applicable rule; for new appointments, whether verification is required before or at appointment [VERIFY current rules for new appointments]. Where a person has several roles, show the earliest deadline.
6. EXCEPTIONS REPORT. Flag overdue individuals, unknown status, people connected to many entities, corporate officers awaiting later commencement, and planned appointments that will be blocked or filings that will be rejected without verification.
7. COMMUNICATIONS PLAN. Draft short messages to individuals stating what they must do, by when, and how. Do not ask anyone to send identity documents or personal codes to the company by insecure means.
8. DATA HANDLING. Treat personal codes and identity information as sensitive. Specify that personal codes must not be circulated in spreadsheets or email, and define who may hold them.
9. LAWYER REVIEW TRIGGERS. Escalate: any individual refusing or unable to verify; overdue directors at entities with imminent filings; possible offences for acting without verification; PSC status disputes; and entities where the PSC position itself is uncertain.

RULES
- Separate live from scheduled obligations everywhere.
- Label each item LAW, COMPANIES HOUSE GUIDANCE or BEST PRACTICE.
- Never reproduce personal codes or identity documents in the output.
- Do not state an offence or penalty consequence without verifying it.

OUTPUT FORMAT
Open with overdue individuals and the next three deadlines. Then the sections above, with the register, calendar and exceptions as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A group company secretary maps verification for 40 UK subsidiaries with overlapping directors, several non-director PSCs, and two corporate directors.',
      result:
        'Live and scheduled categories separated with the corporate directors held on a watch list pending commencement, 23 individuals consolidated across 112 roles, each director’s deadline tied to the relevant confirmation statement with the earliest date shown for multi-entity directors, non-director PSC windows calculated from birth month, three overdue individuals flagged with a blocked appointment, and a communications plan that forbids circulating personal codes by email.',
    },
  },
];
