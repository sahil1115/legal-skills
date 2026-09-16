import type { Skill } from '../../../types/skill';

/**
 * Australian commercial skills — consumer law, leasing and secured transactions.
 */
export const auCommercialSkills: Skill[] = [
  {
    id: 'au-acl-unfair-terms',
    name: 'ACL Unfair Terms Screener',
    description: 'Screens standard-form contract terms against the Australian unfair contract terms regime.',
    jurisdiction: 'au',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'australian-consumer-law', 'unfair-terms', 'standard-form', 'consumer', 'small-business'],
    sources: [
      { citation: 'Competition and Consumer Act 2010 (Cth), Schedule 2 (Australian Consumer Law)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au' },
      { citation: 'ACCC guidance on unfair contract terms', authority: 'guidance', publisher: 'Australian Competition and Consumer Commission', jurisdiction: 'au', url: 'https://www.accc.gov.au' },
    ],
    lastReviewed: '2026-08-26',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer'],
    relatedSkills: ['global-smart-redline', 'cross-contract-localizer'],
    whatItDoes:
      'Tests whether a contract is caught by the unfair contract terms regime at all — which turns on whether it is standard form and whether the counterparty is a consumer or a small business — and then screens each term against the statutory test: significant imbalance, not reasonably necessary to protect legitimate interests, and detriment if relied on. Since the regime moved to a civil penalty model, the analysis treats a problematic term as an exposure to be fixed rather than merely a clause that might be unenforceable, and proposes replacement wording for each.',
    whenToUse:
      'Before publishing or updating standard terms used in Australia, when expanding into the Australian market, when reviewing terms a small-business customer has queried, or as a periodic audit of terms drafted before the penalty regime changed.',
    inputs: [
      { name: 'Contract terms', description: 'The standard-form terms to screen.', required: true },
      { name: 'Counterparty profile', description: 'Whether customers are consumers, small businesses, or larger entities.', required: true },
      { name: 'Negotiation practice', description: 'Whether terms are ever actually negotiated in practice, and with whom.' },
      { name: 'Commercial rationale', description: 'Why each protective term exists — this is what the legitimate-interest limb turns on.' },
      { name: 'Contract value', description: 'Upfront price payable, relevant to the small-business threshold analysis.' },
    ],
    outputs: [
      { name: 'Applicability analysis', description: 'Whether the regime applies at all, tested against both the standard-form and counterparty limbs.' },
      { name: 'Term-by-term risk table', description: 'Each term rated high, medium or low risk against the three-part test.' },
      { name: 'Statutory examples matched', description: 'Terms matching the examples the legislation itself lists.' },
      { name: 'Proposed replacements', description: 'Redrafted wording that preserves the commercial purpose within the safe zone.' },
      { name: 'Legitimate-interest justifications', description: 'The argument to record for terms you decide to keep.' },
      { name: 'Penalty exposure note', description: 'What a contravention now means, per term and per contract.' },
    ],
    prompt: `You are an Australian consumer law specialist screening standard-form contract terms under the unfair contract terms regime in the Australian Consumer Law.

INPUTS
- Contract terms: <paste>
- Who we contract with: <consumers / small businesses / larger businesses; describe the typical counterparty>
- Negotiation practice: <are these terms ever actually negotiated? by whom? give examples>
- Commercial rationale: <why each protective term exists — what legitimate interest does it protect?>
- Upfront price payable: <typical contract value>

TASK
1. APPLICABILITY. Two limbs, both required:
   a. STANDARD FORM: is this a standard-form contract? Consider whether one party has all or most of the bargaining power, whether the contract was prepared before any discussion, whether the other party was effectively required to accept or reject, whether there was any real opportunity to negotiate, and whether the terms take account of the other party's specific circumstances. Note that the burden is on the party asserting the contract is not standard form, and that offering minor negotiation on price does not usually take a contract out of the definition.
   b. COUNTERPARTY: is the counterparty a consumer or a small business within the statutory thresholds? Apply the thresholds to the supplied facts and show the working. Mark the current thresholds [VERIFY] — they have been amended.
   Conclude: regime APPLIES / DOES NOT APPLY / APPLIES TO SOME COUNTERPARTIES. If it applies to only some, say the terms must be assessed on the basis that it does apply, unless you segregate contracts.
2. TERM-BY-TERM SCREEN. For each term apply the three-part test:
   - Would it cause a significant imbalance in the parties' rights and obligations?
   - Is it reasonably necessary to protect the legitimate interests of the party advantaged by it? (The party relying on the term bears this.)
   - Would it cause detriment — financial or otherwise — to the other party if applied or relied on?
   Remember the transparency and overall-context requirements: a term must be assessed in the context of the contract as a whole, and lack of transparency counts against it.
   Produce a table: | Term | Clause | Imbalance | Reasonably necessary? | Detriment | Risk rating | Reason |
3. STATUTORY EXAMPLES: flag terms matching the kinds of term the legislation itself lists as potentially unfair — including terms permitting one party but not the other to avoid or limit performance, to terminate, to vary the terms, to renew or not renew, to vary the price without a right to terminate, to unilaterally determine whether the contract has been breached or to interpret its meaning, and terms limiting one party's right to sue or the evidence it can adduce. Matching an example is not automatically fatal, but it shifts the analysis.
4. PROPOSED REPLACEMENTS: for every high and medium risk term, draft replacement wording that keeps the commercial purpose but survives the test. Usually this means making the right mutual, adding notice and a corresponding termination right, tying a discretion to an objective standard, or narrowing the term to what the legitimate interest actually requires.
5. LEGITIMATE-INTEREST JUSTIFICATIONS: for terms you recommend keeping, write the justification to record now — evidence of the interest protected and why a narrower term would not do. Contemporaneous reasoning is far more persuasive than reconstructed reasoning.
6. PENALTY EXPOSURE: explain that proposing, applying or relying on an unfair term is now itself a contravention attracting civil penalties, that each unfair term can be a separate contravention, and that a court can make orders including declaring the term void, injunctions and remedial orders. Do not state penalty figures as settled — mark [VERIFY].

RULES
- Apply the three limbs separately. Most analyses collapse them, and the legitimate-interest limb is where a term is usually saved or lost.
- Transparency is not a defence on its own, but opacity is an aggravating factor. Note terms buried, cross-referenced elsewhere, or written obscurely.
- Do not assume a term is safe because it is common in the market. Widespread use has not protected these terms.
- Where a term is required by other law, say so — that is a strong legitimate-interest argument.

OUTPUT FORMAT
Six sections matching the tasks above, opening with the applicability conclusion.`,
    example: {
      scenario:
        'A software company selling subscriptions to Australian small businesses reviews terms drafted for its home market.',
      result:
        'Regime confirmed to apply, four high-risk terms identified including a unilateral variation right and an auto-renewal with no exit window, redrafted wording for each that preserves the commercial intent, and recorded legitimate-interest reasoning for two terms retained unchanged.',
    },
  },
  {
    id: 'au-consumer-guarantees-checker',
    name: 'Consumer Guarantees & Warranty Checker',
    description: 'Checks product terms, warranties and refund policies against the Australian Consumer Law guarantee regime.',
    jurisdiction: 'au',
    category: 'compliance',
    tags: ['contract-lifecycle', 'review', 'australian-consumer-law', 'consumer-guarantees', 'warranty', 'refunds', 'accc'],
    sources: [
      { citation: 'Competition and Consumer Act 2010 (Cth), Schedule 2 (Australian Consumer Law)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Relied on for the consumer guarantees, the remedies for major and non-major failure, the prohibition on contracting out, and the prohibitions on misleading conduct and on misrepresenting consumer rights.' },
      { citation: 'Competition and Consumer Regulations 2010 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Relied on for the prescribed text a warranty against defects must contain.' },
      { citation: 'ACCC guidance on consumer guarantees, warranties and refunds', authority: 'guidance', publisher: 'Australian Competition and Consumer Commission', jurisdiction: 'au', url: 'https://www.accc.gov.au' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'technology'],
    relatedSkills: ['au-acl-unfair-terms', 'global-smart-redline'],
    whatItDoes:
      'Separates the two things suppliers routinely conflate: the consumer guarantees that attach by law and cannot be excluded, and the voluntary warranty the supplier chooses to offer on top. It tests who counts as a consumer for the goods or services in question, works out which guarantees apply, distinguishes a major failure from a non-major one because the remedy and who chooses it differ, checks any warranty against defects for the prescribed wording, and audits the customer-facing language — policies, signage, scripts and terms — for statements that misrepresent what the law already gives.',
    whenToUse:
      'Before publishing or revising a returns policy, warranty or terms of sale for the Australian market, when training or scripting a support team, when launching a product or extended warranty, and after a complaint about a refund refusal.',
    inputs: [
      { name: 'Customer-facing terms', description: 'Terms of sale, returns and refunds policy, warranty document, and any in-store or on-site signage.', required: true },
      { name: 'What is supplied', description: 'The goods or services, their price, and their expected life or duration.', required: true },
      { name: 'Customer type', description: 'Whether customers are individuals, businesses, or both, and whether goods are acquired for resale or for use in production.', required: true },
      { name: 'Support scripts', description: 'What staff or support agents are told to say about refunds, repairs and replacements.' },
      { name: 'Marketing claims', description: 'Representations about performance, durability, availability of parts or repair, and any express warranty given.' },
      { name: 'Supply chain position', description: 'Whether you are the manufacturer, importer, retailer or reseller, and what your supplier agreements say about recovery.' },
    ],
    outputs: [
      { name: 'Coverage analysis', description: 'Which supplies attract the guarantees, tested against the consumer definition and the exclusions.' },
      { name: 'Guarantee map', description: 'Each applicable guarantee for goods and for services, applied to what is actually supplied.' },
      { name: 'Remedy matrix', description: 'What the customer is entitled to for a major and a non-major failure, and who chooses.' },
      { name: 'Warranty document review', description: 'Whether a warranty against defects carries the prescribed text and is presented as required.' },
      { name: 'Misrepresentation findings', description: 'Statements in policies, signage or scripts that misstate or diminish consumer rights.' },
      { name: 'Corrected wording', description: 'Redrafted policy, warranty and script language that is accurate and still commercially usable.' },
      { name: 'Recovery position', description: 'What can be recovered up the supply chain, and what the supplier agreements need to say.' },
    ],
    prompt: `You are an Australian consumer law specialist auditing a supplier's terms, warranties and refund practices against the consumer guarantees in the Australian Consumer Law.

INPUTS
- Customer-facing terms: <terms of sale, returns and refunds policy, warranty document, signage>
- What is supplied: <goods or services, price point, expected life or duration>
- Customers: <individuals, businesses, or both; are goods ever acquired for resale or for use in production or repair?>
- Support scripts: <what staff are told to say about refunds, repairs and replacements>
- Marketing claims: <representations about performance, durability, spare parts, repair availability, and any express warranty>
- Our position: <manufacturer, importer, retailer or reseller; what supplier agreements say about recovery>

TASK
1. COVERAGE. Establish which supplies attract the guarantees. Apply the consumer definition: acquisition below the monetary threshold, or of a kind ordinarily acquired for personal, domestic or household use or consumption, or a vehicle or trailer used mainly to transport goods on public roads. Mark the threshold [VERIFY]. Address the exclusion for goods acquired for resupply or for use up or transformation in production or repair. State clearly that a business customer can still be a consumer, which is the point most often got wrong, and identify which parts of the customer base are covered.
2. GUARANTEE MAP. Set out the guarantees that apply to what is actually supplied, and apply each to the facts rather than listing them. For goods: clear title, undisturbed possession, no undisclosed securities, acceptable quality, fitness for any disclosed purpose, correspondence with description or sample, compliance with express warranties, and the availability of repair facilities and spare parts for a reasonable period unless that was disclosed otherwise before supply. For services: due care and skill, fitness for a particular purpose made known, and supply within a reasonable time where no time is fixed. For acceptable quality, work through the factors — fit for all purposes goods of that kind are commonly supplied for, acceptable in appearance and finish, free from defects, safe and durable — as a reasonable consumer fully acquainted with their condition would regard them, taking account of price and any statements on packaging or labelling.
3. NO CONTRACTING OUT. Identify every term in the documents that purports to exclude, restrict or modify a guarantee or a remedy, whether directly or by structure — a returns window shorter than the guarantee lasts, a condition of original packaging, a requirement to deal only with the manufacturer, an exclusion of consequential loss, a term making a remedy discretionary or conditional on proof of purchase in one specific form. State that such terms are void to that extent, and that including them can itself be a contravention. Address separately where liability may be limited for goods or services not of a kind ordinarily acquired for personal, domestic or household use, and the conditions on which that limitation is available.
4. MAJOR AND NON-MAJOR FAILURE. This drives everything customer-facing. Explain the distinction on the facts: a failure is major where the goods would not have been acquired by a reasonable consumer fully acquainted with the nature and extent of the failure, are substantially unfit for their common purpose and cannot easily be remedied within a reasonable time, do not match the description or sample, or are unsafe. For a major failure the consumer chooses between a refund and a replacement and may also recover damages for reasonably foreseeable loss. For a non-major failure the supplier may choose to repair, replace or refund, but must do so within a reasonable time, and if it does not the consumer can have it fixed elsewhere and recover the cost or reject the goods. Note that multiple non-major failures can together be major. Produce a remedy matrix showing the entitlement and who chooses.
5. WARRANTY AGAINST DEFECTS. If a warranty against defects is given, check it against the prescribed requirements: that it is in a document the consumer can understand, sets out what the warrantor will do and what the consumer must do to claim, gives the warrantor's contact details, states the claim period and who bears the expense of claiming, and includes the prescribed mandatory text stating that the benefits are in addition to other rights and remedies under the law. Mark the exact prescribed wording [VERIFY] and say it must be reproduced, not paraphrased. Flag any warranty presented in a way that implies it is the customer's only recourse.
6. MISREPRESENTING CONSUMER RIGHTS. Audit the policies, signage, scripts and marketing for statements that misstate rights. Common contraventions include no refunds statements, refunds only within a stated number of days, credit note only, no returns on sale items, referring a customer to the manufacturer as their only option, requiring the original packaging, and telling a customer a warranty has expired when the guarantees still apply. Treat each as a potential contravention of the prohibition on misleading representations concerning a guarantee, right or remedy, and note that this is enforced actively and attracts civil penalties. Assess the same material against the general prohibition on misleading or deceptive conduct.
7. MANUFACTURER AND SUPPLY CHAIN. Identify what a consumer can claim directly against a manufacturer or importer, and what a retailer who provides a remedy can recover from the manufacturer by way of indemnity. Then check whether the supplier agreements actually support that recovery, and say what they should say.
8. CORRECTED WORDING. Redraft the returns policy, the warranty statement and the key support script lines so that they are accurate, and keep them usable — an accurate policy can still set out the process, the evidence of purchase the supplier prefers, and what falls outside the guarantees, such as damage caused by misuse or ordinary wear.

RULES
- Keep the guarantees and any voluntary warranty separate throughout. Conflating them is the source of most contraventions in this area.
- Never state or imply that a guarantee has a fixed duration. Its duration depends on the nature of the goods, the price paid and what a reasonable consumer would expect, and it can outlast a voluntary warranty.
- Do not treat a business customer as automatically outside the regime. Apply the threshold and the kind-of-goods test to the facts.
- Where an exclusion of liability might be available for non-household supplies, state the conditions rather than assuming it applies.
- Mark monetary thresholds, prescribed wording and penalty levels [VERIFY]. They are amended and must be confirmed against the current instrument.

OUTPUT FORMAT
Open with the contraventions that most need fixing and why. Then the sections above, with tables for the guarantee map, the remedy matrix and the misrepresentation findings, closing with the corrected wording as ready-to-use text.`,
    example: {
      scenario:
        'An online retailer selling appliances to both households and small businesses reviews its returns policy and warranty card before a national campaign.',
      result:
        'A thirty-day returns window and a store-credit-only clause identified as void attempts to contract out of the guarantees and as misrepresentations of consumer rights, business customers buying single units found to be consumers despite a terms clause saying otherwise, the warranty card missing the prescribed mandatory text, and redrafted policy and warranty wording that keeps the proof-of-purchase process while stating the position accurately.',
    },
  },
  {
    id: 'au-retail-lease-reviewer',
    name: 'Retail & Commercial Lease Reviewer',
    description: 'Reviews an Australian retail or commercial lease against the retail leases legislation of the relevant State.',
    jurisdiction: 'au',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'retail-lease', 'commercial-lease', 'outgoings', 'make-good', 'property'],
    sources: [
      { citation: 'Retail leases legislation of the States and Territories', authority: 'primary', publisher: 'State and Territory legislatures', jurisdiction: 'au', note: 'Eight separate statutes with materially different coverage tests, disclosure regimes, minimum terms, prohibited terms and dispute procedures. The location of the premises determines which applies, and a lease drafted for one State frequently breaches another.' },
      { citation: 'Competition and Consumer Act 2010 (Cth), Schedule 2 (Australian Consumer Law)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Relied on for the unfair contract terms regime, which can apply to a standard-form lease with a small business tenant, and for misleading conduct in pre-lease representations.' },
      { citation: 'State small business commissioner guidance on retail leasing', authority: 'guidance', publisher: 'State small business commissioners', jurisdiction: 'au', note: 'Several States channel retail tenancy disputes through a commissioner before a tribunal. Guidance differs by State and is not binding.' },
    ],
    lastReviewed: '2026-09-08',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'professional-services'],
    relatedSkills: ['au-acl-unfair-terms', 'us-commercial-lease-reviewer'],
    whatItDoes:
      'Starts with the question that decides everything else: whether the premises are caught by the retail leases legislation of the State they sit in, because that legislation overrides the lease and voids terms the parties agreed. It then checks the disclosure statement and its timing, tests the rent review, outgoings and recovery terms against the prohibitions that apply in that State, and works through the terms that decide what the tenancy costs to hold and to leave — make good, assignment, relocation and demolition, security and any personal guarantee.',
    whenToUse:
      'Before signing a lease, an assignment or a renewal, when a landlord issues its form after heads of agreement, when an outgoings reconciliation or a rent review looks wrong, and before exercising or letting an option lapse.',
    inputs: [
      { name: 'Lease document', description: 'The lease with every annexure, plan and special condition, and any agreement for lease.', required: true },
      { name: 'Premises location', description: 'The State or Territory and the address, since the applicable Act turns on where the premises are.', required: true },
      { name: 'Premises use and setting', description: 'The permitted use, and whether the premises are in a shopping centre, a strip location or a standalone building.', required: true },
      { name: 'Disclosure statement', description: 'The disclosure statement given, and the date it was provided relative to signing.' },
      { name: 'Tenant profile', description: 'Entity, whether it is a small business, and whether a guarantee or bank guarantee is sought.' },
      { name: 'Commercial terms agreed', description: 'The heads of agreement, so the lease can be tested against what was negotiated, plus any fit-out contribution.' },
    ],
    outputs: [
      { name: 'Coverage determination', description: 'Whether the retail leases legislation of the relevant State applies, and what follows either way.' },
      { name: 'Disclosure compliance', description: 'Whether the disclosure statement was given, in time and complete, and the remedies where it was not.' },
      { name: 'Prohibited terms', description: 'Terms void or unenforceable under the applicable Act, including ratchet clauses and prohibited recoveries.' },
      { name: 'Occupancy cost analysis', description: 'Rent, reviews and outgoings as drafted, with the recovery mechanism tested against the estimates given.' },
      { name: 'Exit and end-of-term analysis', description: 'Assignment, options, relocation and demolition, make good and holding over.' },
      { name: 'Unfair terms overlay', description: 'Where the lease is standard form and the tenant a small business, terms exposed under the unfair contract terms regime.' },
      { name: 'Negotiation priorities', description: 'Proposed changes ranked by value, with replacement wording for the priorities.' },
    ],
    prompt: `You are an Australian property lawyer reviewing a retail or commercial lease for the tenant.

INPUTS
- Lease and annexures: <paste, including plans, special conditions and any agreement for lease>
- Premises: <State or Territory, address, lettable area, and whether in a shopping centre, a strip location or standalone>
- Use: <permitted use, and what the tenant will actually do>
- Disclosure statement: <paste, with the date given relative to the date of signing — or state that none was given>
- Tenant: <entity, whether a small business, turnover, whether a personal or bank guarantee is sought>
- Agreed terms: <heads of agreement, incentives, fit-out contribution>

TASK
1. COVERAGE. Determine whether the retail leases legislation of the State or Territory where the premises are located applies. Each jurisdiction has its own Act with its own test, turning on some combination of the use of the premises, their location in a retail shopping centre, the lettable area, the rent, and whether the tenant is a listed corporation or its subsidiary. Identify the applicable Act by name, apply its coverage test to these facts, and mark every threshold [VERIFY]. State the consequence plainly: where the Act applies it overrides inconsistent lease terms and cannot be contracted out of, so coverage is the first question and not a formality. If coverage is uncertain, advise proceeding as though the Act applies.
2. DISCLOSURE STATEMENT. Where the Act applies, check whether a disclosure statement was given, whether it was given within the required period before the lease was entered into, and whether it is complete and accurate. Identify the remedies available for a statement that was late, missing, incomplete or misleading — which vary by State and can include a right to terminate within a limited window, compensation, or the tenant being excused from certain payments. Compare the disclosure statement against the lease and list every inconsistency, since the tenant may be able to rely on the statement.
3. TERM AND MINIMUM TERM. State the term, the commencement mechanism and whether any minimum term applies in that jurisdiction, including how options count toward it and whether a waiver certified by a lawyer is available. Check registration requirements and who bears the cost.
4. RENT AND REVIEWS. Set out the base rent and every review mechanism. Test each against the applicable Act:
   - Whether a ratchet clause preventing rent falling on review is void in that jurisdiction.
   - Whether more than one review basis in the same period is prohibited.
   - Whether turnover rent is permitted, what turnover is defined to include and exclude, and what information the landlord may require.
   - How a market review is determined, the timing, whether a valuer determination is binding, who appoints and who pays, and whether the tenant can trigger the review or only respond.
   - Whether a review on the exercise of an option is permitted and how it interacts with the option notice dates.
5. OUTGOINGS AND RECOVERIES. This is where retail tenants are most often overcharged. Assess:
   - Whether outgoings are recoverable at all under the Act unless estimated and disclosed in advance, and the consequence where the estimate was not given.
   - The annual estimate, the audited statement, the reconciliation, and the tenant's rights when the actual figures exceed the estimate.
   - Prohibited recoveries in that jurisdiction, which commonly include land tax in some States but not others, capital costs, landlord contributions to a sinking fund in some jurisdictions, and the landlord's own finance or management costs. Do not assume a national position — state the rule for this State and mark it [VERIFY].
   - Whether the tenant is charged a proportion calculated on a stated and verifiable basis.
   - Legal and lease preparation costs, and whether the Act limits what the landlord can pass on.
   - Any promotion or marketing levy, what the landlord must account for, and whether an expenditure statement is required.
6. FIT-OUT, INCENTIVES AND MAKE GOOD. Check the fit-out obligation, the incentive or contribution and any clawback on early termination or default, and the make good obligation. Assess whether make good requires removal of the fit-out the landlord required and contributed to, whether the standard is defined or left open, whether it is limited to the condition at commencement fair wear and tear excepted, and whether a photographic condition report exists. Recommend agreeing the make good scope and any exclusions in writing now, since an open-ended obligation is priced by the landlord at the end of the term when the tenant has no leverage.
7. ASSIGNMENT, RELOCATION AND DEMOLITION. Assess the assignment procedure, the grounds on which consent may be withheld, and whether the Act limits them or releases the assignor and any guarantor on a compliant assignment. Then assess any relocation clause — the notice required, the alternative premises standard, the compensation payable and the tenant's right to terminate instead — and any demolition clause, including whether genuine demolition is required and what notice and compensation apply. These clauses are heavily regulated and the lease version is frequently narrower than the Act allows.
8. SECURITY, GUARANTEES AND INSURANCE. Bank guarantee or bond amount, when it must be returned and any statutory time limit on return, whether the amount ratchets with rent, and any personal guarantee — its cap, its duration, and whether it survives assignment. Then the insurance obligations, public liability limits, plate glass, and whether the tenant pays for the landlord's insurance.
9. THE REMAINING TERMS. Cover: permitted use and any exclusivity or restriction; trading hours and any obligation to trade; core trading hours costs; repair and maintenance and the split between structure and services; landlord access; damage and destruction and rent abatement; default, notice and cure; holding over and the rent that then applies; option exercise dates and the consequences of late notice; and dispute resolution, including any requirement to go through a small business commissioner or tribunal before a court.
10. UNFAIR TERMS OVERLAY. Where the lease is standard form and the tenant is a small business, assess the terms most exposed under the unfair contract terms regime — unilateral variation, one-sided termination, automatic renewal without an exit, unlimited indemnities and one-way liability caps — and note that this applies whether or not the retail leases Act does.
11. NEGOTIATION PRIORITIES. Rank the proposed changes by value, separating what the Act already gives the tenant, which need not be negotiated, from what must be won in the document. Give replacement wording for the priorities.

RULES
- Identify the applicable State Act by name before analysing anything else, and never state a national rule. The Acts differ on coverage, on prohibited recoveries, on minimum terms and on remedies, and applying the wrong one produces confidently wrong advice.
- Where the Act applies, say which lease terms it overrides. Do not negotiate for something the legislation already gives the tenant.
- Mark every threshold, time limit and prohibited recovery [VERIFY] against the current version of the applicable Act.
- Read the disclosure statement against the lease. Inconsistencies between them are among the most useful findings available to a tenant and are routinely overlooked.
- Where the premises fall outside the retail Act, say so and note that the tenant then has only the lease and the general law, plus the unfair terms regime if it is a small business on standard-form paper.

OUTPUT FORMAT
Open with the coverage determination and the five terms that most need to change. Then the sections above in order, with tables for the outgoings analysis, the disclosure comparison and the negotiation priorities.`,
    example: {
      scenario:
        'A hospitality operator is handed the landlord form for a shopping centre tenancy with a disclosure statement provided two days before signing.',
      result:
        'Applicable State Act identified and coverage confirmed, the disclosure statement found to have been given later than the applicable Act requires, with the remedy explained, a ratchet clause on the market review identified as void in that jurisdiction, land tax recovery flagged as prohibited there despite appearing in the outgoings schedule, and make good found to require removal of a fit-out the landlord had contributed to, with wording proposed to limit it.',
    },
  },
  {
    id: 'au-ppsr-priority-checker',
    name: 'PPSR Registration & Priority Checker',
    description: 'Tests whether a security interest is attached, perfected and correctly registered on the PPSR.',
    jurisdiction: 'au',
    category: 'contracts',
    tags: ['contract-lifecycle', 'review', 'secured-transactions', 'perfection', 'collateral', 'financing-statement', 'ppsr', 'retention-of-title'],
    sources: [
      { citation: 'Personal Property Securities Act 2009 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Governs attachment, perfection, registration, priority, vesting on insolvency and enforcement. Substance prevails over form, so an arrangement not called a security interest may still be one.' },
      { citation: 'Personal Property Securities Regulations 2010 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Prescribes collateral classes and the required content of a registration, including the serial-number rules that decide whether a defect is fatal.' },
      { citation: 'PPSR registration and search guidance', authority: 'regulator', publisher: 'Australian Financial Security Authority', jurisdiction: 'au', url: 'https://www.ppsr.gov.au', note: 'Used for registration mechanics, search practice and data requirements. It is administrative guidance and does not determine priority.' },
      { citation: 'Corporations Act 2001 (Cth)', authority: 'primary', publisher: 'Federal Register of Legislation', jurisdiction: 'au', url: 'https://www.legislation.gov.au', note: 'Relevant to administration and liquidation, and to the consequences when a security interest vests in the grantor on insolvency.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['financial-services', 'retail-consumer', 'energy-infrastructure'],
    relatedSkills: ['us-ucc9-filing-checker', 'au-director-duties-checker', 'au-acl-unfair-terms'],
    whatItDoes:
      'Checks the chain that decides whether a security interest survives the grantor becoming insolvent: whether it attached, whether it is perfected, whether it was registered correctly and in time, and where it sits in priority against competing interests. It works from substance rather than labels, so it catches the arrangements that are security interests without being called one — retention of title supply terms, consignments, and leases of equipment — and treats a registration defect as the potentially fatal event it is, because an interest that vests in the grantor is lost outright to the liquidator.',
    whenToUse:
      'Before supplying goods on retention of title terms, when onboarding a customer or registering against one, when auditing an existing registration portfolio, and immediately on any sign that a grantor is entering administration or liquidation.',
    inputs: [
      { name: 'The arrangement', description: 'The agreement and what it does in substance, whatever it is called.', required: true },
      { name: 'Grantor identity', description: 'The exact legal entity, its ACN and ABN, and whether it grants in its own right or as trustee.', required: true },
      { name: 'Collateral', description: 'What the interest covers, the collateral class, and whether any of it is serial-numbered property.', required: true },
      { name: 'Existing registration', description: 'The current financing statement details, including registration and end dates and whether PMSI is claimed.' },
      { name: 'Timing', description: 'When the agreement was made, when value was given, when possession passed and when registration occurred.' },
      { name: 'Competing interests', description: 'Other registrations against the grantor, any general security agreement, and any buyer or third party involved.' },
    ],
    outputs: [
      { name: 'Characterisation', description: 'Whether the arrangement is a security interest in substance, and whether a deemed security interest applies.' },
      { name: 'Attachment and perfection', description: 'Each element tested on the facts, with the method of perfection identified.' },
      { name: 'Registration defect review', description: 'Every required field checked, with each defect assessed as seriously misleading or not.' },
      { name: 'PMSI analysis', description: 'Whether super-priority is available, the deadline that applied and whether it was met.' },
      { name: 'Priority ranking', description: 'The order against each competing interest, with the rule that produces it.' },
      { name: 'Vesting risk', description: 'Whether the interest would vest in the grantor on insolvency, and what that costs.' },
      { name: 'Remediation plan', description: 'What can still be fixed, what cannot, and the order to do it in.' },
    ],
    prompt: `You are an Australian secured transactions lawyer testing a security interest under the Personal Property Securities Act.

INPUTS
- The arrangement: <paste the agreement or terms; describe what it does commercially whatever it is called>
- Grantor: <exact legal name, ACN, ABN; is it contracting in its own right or as trustee of a trust? is it an individual?>
- Collateral: <what the interest covers; collateral class; is any of it serial-numbered property such as motor vehicles, watercraft or aircraft?>
- Existing registration: <financing statement details, registration date, end date, collateral class selected, PMSI claimed or not, secured party details>
- Timing: <date of agreement, date value given, date possession passed to the grantor, date of registration>
- Competing interests: <other registrations against this grantor, any general security agreement, any buyer of the goods, any landlord or processor>

TASK
1. CHARACTERISATION. Determine whether this is a security interest, working from substance rather than the label the parties used. It is an interest in personal property provided for by a transaction that in substance secures payment or performance of an obligation. Then check the deemed security interests separately, because these catch parties who do not think of themselves as secured at all: retention of title supply terms, commercial consignments, and a PPS lease of goods. For a PPS lease, apply the current duration and regularity tests and mark them [VERIFY], since the thresholds have been amended. State plainly that a supplier trading on retention of title terms without registering is an unsecured creditor in substance, whatever the terms say.
2. GRANTOR IDENTITY. This is where registrations most often fail, and the failure is usually fatal. Establish the exact grantor and the correct identifier: the ACN or ABN for a company, the prescribed identifier taken from the required document for an individual, and — critically — the ABN of the trust rather than the trustee company's ACN where the grantor contracts as trustee. Check the identifier actually used in any existing registration against the correct one, character by character. Note that a registration against the wrong identifier is ineffective against that grantor and that searching under the wrong identifier will not reveal it.
3. ATTACHMENT. Test each element: the grantor has rights in the collateral or the power to transfer rights in it, and either value has been given or the grantor has done an act by which the interest arises. Identify the date attachment occurred, because the perfection and priority analysis runs from it.
4. PERFECTION. Identify the method relied on — registration, possession, or control for the classes where control is available — and confirm the interest has attached and the step has been taken. Where more than one method is available, say which gives the better priority, since control outranks other methods for the classes that allow it. Confirm perfection is continuous: an interest that lapses and is re-registered takes a new priority date, not the original one.
5. REGISTRATION DEFECT REVIEW. Go through every required element of the financing statement: grantor identifier, secured party details, collateral class, collateral description, serial number where the property is serial-numbered and where registration by serial number is required, PMSI flag, whether the collateral is inventory, subordination, and the end date. For each defect, apply the correct test — a defect invalidates the registration only if it is seriously misleading, or if it falls into the categories treated as fatal regardless. Be specific rather than general: an incorrect grantor identifier and a missing or wrong serial number for property required to be registered by serial number are the classic fatal errors, while a minor error in a collateral description often is not. Mark each defect as fatal, arguably seriously misleading, or immaterial, and state what turns on it.
6. PMSI. Determine whether a purchase money security interest is available — collateral supplied on credit to enable acquisition, or a PPS lease or consignment. Then apply the timing rule, which is the point of failure: registration must occur within the prescribed period, and the period differs for inventory, where it must be before the grantor obtains possession, from other collateral. Mark both periods [VERIFY]. Confirm the PMSI was actually claimed in the registration, since super-priority is lost if the flag was not set even where every other condition is met. Where the deadline was missed, say so plainly — the interest is not void, but it drops to ordinary priority behind any earlier general security agreement, which usually means behind everything.
7. PRIORITY. Rank this interest against each competing interest and name the rule producing each result: perfected beats unperfected; between perfected interests, priority runs by the earliest of registration, possession or control; control outranks other methods for the classes allowing it; a properly perfected PMSI takes super-priority over an earlier general security agreement. Then address the rules that defeat a perfected interest anyway: taking free by a buyer in the ordinary course of the seller's business, taking free of certain serial-numbered property where it was not registered by serial number, accessions, commingling and processing into a product, and proceeds. State whether proceeds are automatically perfected here or need their own registration.
8. VESTING ON INSOLVENCY. This is the consequence that makes the rest urgent. Where a security interest is unperfected immediately before the grantor enters administration or liquidation, or where registration occurred within the vulnerable period before it, the interest vests in the grantor — the secured party loses the collateral outright and ranks as an unsecured creditor. Apply this to the facts, state the vulnerable period and mark it [VERIFY], and quantify what is at stake in terms of the goods or value at risk. Where insolvency is in prospect, say that registering now may not save the interest and that the timing must be checked immediately.
9. REMEDIATION. Separate what can still be fixed from what cannot. Registering now fixes future priority but does not restore a lost priority date and does not cure the vulnerable-period exposure. Amending a defective registration may work for some defects and not for a wrong grantor identifier, which generally needs a fresh registration with a new priority date. Give the steps in order, with the deadline for each, and identify the portfolio-level fix — reconciling registrations against grantor identifiers at onboarding, diarising end dates, and registering before delivery rather than after.

RULES
- Substance governs. Never conclude there is no security interest because the document does not use the word, and always test the deemed categories.
- Check the grantor identifier first and character by character, including the trustee ABN point. It causes more total losses than every other defect combined.
- PMSI timing and the PMSI flag are separate requirements. Both must be satisfied; failing either loses super-priority.
- Do not describe an unperfected interest as merely lower in priority. On insolvency it vests in the grantor and is lost entirely.
- Mark PPS lease thresholds, PMSI registration periods and the vesting vulnerable period [VERIFY] against the current Act and Regulations.
- A PPSR search result and a registration are evidence of what was registered, not proof that the interest is valid or that it has priority.

OUTPUT FORMAT
Open with whether the interest is perfected, where it ranks, and whether it would survive the grantor's insolvency. Then the sections above, with a defect table and a priority ranking table, closing with dated remediation steps.`,
    example: {
      scenario:
        'An equipment supplier trading on retention of title terms discovers its customer has appointed administrators, and reviews its registrations across the customer group.',
      result:
        'Retention of title terms characterised as a deemed security interest, two registrations found to name the trustee company ACN where the grantor contracted as trustee so the correct identifier was the trust ABN, one serial-numbered item registered without its serial number and assessed as seriously misleading, the PMSI flag never set on any registration so super-priority was unavailable behind an earlier general security agreement, and the goods at risk of vesting in the grantor quantified with the vulnerable period flagged for immediate verification.',
    },
  },
];
