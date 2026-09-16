import type { Skill } from '../../../types/skill';

/**
 * UK commercial skills — consumer contract terms.
 */
export const ukCommercialSkills: Skill[] = [
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
    relatedSkills: ['au-acl-unfair-terms', 'au-consumer-guarantees-checker', 'us-auto-renewal-auditor', 'uk-dmcca-subscription-readiness'],
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
    id: 'uk-dmcca-subscription-readiness',
    name: 'Subscription Contracts Readiness Tracker',
    description: 'Tracks readiness for the UK subscription contracts regime, which is not yet in force, and its secondary legislation.',
    jurisdiction: 'uk',
    category: 'contracts',
    tags: ['contract-lifecycle', 'programme-design', 'subscriptions', 'consumer-protection', 'renewals', 'cancellation'],
    sources: [
      { citation: 'Digital Markets, Competition and Consumers Act 2024, Part 4 Chapter 2 (subscription contracts)', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'Sets the framework for subscription contracts. Not yet in force; secondary legislation is required to implement it. Confirmed as at 2026-09-16.' },
      { citation: 'Government response to the consultation on implementing the subscription contracts regime', authority: 'guidance', publisher: 'Department for Business and Trade', jurisdiction: 'uk', url: 'https://www.gov.uk', note: 'Published April 2026. States the rules are expected to come into force in spring 2027. A policy statement, not law.' },
      { citation: 'Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 and Consumer Rights Act 2015', authority: 'primary', publisher: 'The National Archives', jurisdiction: 'uk', url: 'https://www.legislation.gov.uk', note: 'The rules that apply to subscriptions today, until the new regime commences.' },
    ],
    lastReviewed: '2026-09-16',
    reviewStatus: 'unverified',
    version: '1.0.0',
    industries: ['retail-consumer', 'technology'],
    relatedSkills: ['uk-consumer-rights-checker', 'us-auto-renewal-auditor', 'uk-fca-consumer-duty-outcome-assessment'],
    whatItDoes:
      'Tracks an organisation’s readiness for the UK subscription contracts regime as a readiness exercise, not a compliance audit, because the regime is not yet in force. It first confirms the current commencement status and the state of the secondary legislation, then maps the framework’s building blocks — pre-contract information, reminder and cooling-off notices, the end-of-contract and renewal notices, and straightforward exit — against the organisation’s current subscription journeys, and keeps each requirement labelled by status: enacted but not commenced, proposed in consultation, or confirmed in secondary legislation.',
    whenToUse:
      'When planning product, billing and engineering work for subscription journeys ahead of commencement, when secondary legislation or guidance is published, and when a subscription offer is being redesigned. Not for: auditing current compliance of subscription terms today (use the Consumer Rights Act checker) or US automatic renewal laws.',
    inputs: [
      { name: 'Subscription offers', description: 'Each subscription product, pricing, free or discounted trials, contract length and renewal pattern.', required: true },
      { name: 'Journeys', description: 'Sign-up, reminders, renewal, price change and cancellation journeys, with screenshots or descriptions.', required: true },
      { name: 'Current notices', description: 'Existing pre-contract information, renewal and cancellation communications.' },
      { name: 'Systems constraints', description: 'Billing, CRM and messaging systems and their lead times for change.' },
      { name: 'Latest official material', description: 'Any secondary legislation, draft regulations or guidance the organisation has seen.' },
    ],
    outputs: [
      { name: 'Status check', description: 'Commencement status and the state of secondary legislation on the review date, with sources.' },
      { name: 'Requirement register', description: 'Each requirement labelled enacted, proposed or confirmed, with its source.' },
      { name: 'Journey gap map', description: 'Each journey against each requirement, with the change needed.' },
      { name: 'Implementation checklist', description: 'Changes sequenced by system lead time and dependency.' },
      { name: 'Current-law compliance note', description: 'Obligations that already apply today under existing consumer law.' },
      { name: 'Monitoring triggers', description: 'Official publications that should prompt reassessment.' },
    ],
    prompt: `You are a UK consumer law specialist preparing an organisation for the subscription contracts regime under the Digital Markets, Competition and Consumers Act 2024.

CURRENT-LAW STATUS (verified 2026-09-16 — re-check before relying on it)
- NOT YET IN FORCE. The subscription contracts provisions are enacted but require secondary legislation, and are expected to come into force in spring 2027 according to the government's April 2026 consultation response [CONFIRMED, gov.uk]. That expected date is a policy statement, not law.
- Until commencement, subscriptions are governed by existing consumer law, including the Consumer Contracts Regulations 2013, the Consumer Rights Act 2015 and the unfair commercial practices provisions now in the 2024 Act [VERIFY which provisions apply to the facts].
- This skill is a readiness tool. Never describe a subscription regime obligation as currently enforceable unless re-verification shows commencement.

INPUTS
- Offers: <products, pricing, trials, contract length, renewal>
- Journeys: <sign-up, reminders, renewal, price change, cancellation>
- Current notices: <pre-contract information, renewal and cancellation communications>
- Systems: <billing, CRM, messaging, lead times>
- Latest official material: <regulations, drafts, guidance seen>

TASK
1. STATUS CHECK FIRST. Before anything else, check official sources for commencement regulations, made or draft secondary legislation, and guidance. Record the date checked and what was found. If the regime has commenced, say so prominently and treat this as a compliance audit, noting the commencement and transitional provisions.
2. SCOPE. Identify which offers are likely to be subscription contracts under the Act's definition, including contracts with automatic renewal, free or discounted trials that roll into paid terms, and contracts that continue until cancelled, and any exclusions [VERIFY definitions and exclusions against the enacted text and regulations].
3. MISSING INFORMATION. Identify journeys not described and systems constraints unknown. Lead times usually decide whether readiness is achievable.
4. REQUIREMENT REGISTER. Build a register of the regime's building blocks: pre-contract information; reminder notices before renewal or trial end; cooling-off rights and notices, including on renewal; end-of-contract or renewal notices; and the requirement that consumers can exit straightforwardly without unnecessary hurdles. For each, label the status as ENACTED NOT COMMENCED, PROPOSED IN CONSULTATION, or CONFIRMED IN SECONDARY LEGISLATION, with its source. Do not supply detailed timings, content or formats that have not been confirmed; mark them [VERIFY — awaiting secondary legislation].
5. JOURNEY GAP MAP. Map each journey against each requirement, describe the change needed and its dependency on unconfirmed detail.
6. IMPLEMENTATION CHECKLIST. Sequence changes by lead time, separating no-regret changes that are sensible under current law from changes that should wait for final regulations.
7. CURRENT-LAW COMPLIANCE NOTE. Separately, flag subscription practices that may already be problematic under current consumer law, such as hard-to-cancel journeys or unclear renewal terms.
8. MONITORING TRIGGERS. List the official publications that should trigger reassessment: commencement regulations, final secondary legislation, and regulator guidance.
9. LAWYER REVIEW TRIGGERS. Escalate: publication of secondary legislation; any practice that may already breach current law; uncertain scope for mixed or business-to-business offers; and cross-border offers.

RULES
- Label every obligation by status. Never present an uncommenced or proposed requirement as live law.
- Label each item ENACTED NOT COMMENCED, PROPOSED, CONFIRMED IN REGULATIONS, CURRENT LAW or BEST PRACTICE.
- Do not invent notice timings, content or penalties not yet confirmed.

OUTPUT FORMAT
Open with the status check result and the date checked. Then the sections above, with the requirement register and journey gap map as tables. Close with: Assumptions made; [VERIFY] points; Lawyer review items.`,
    example: {
      scenario:
        'A streaming service with monthly plans and a seven-day free trial plans its 2027 engineering roadmap for subscription changes.',
      result:
        'Status check recording that the regime is not in force and secondary legislation is pending, the trial-to-paid and monthly plans identified as likely subscription contracts, a requirement register labelling reminder and cooling-off notices as enacted but not commenced with detailed timings awaiting regulations, a journey gap map showing cancellation requires a phone call, that change sequenced as a no-regret fix because hard-to-cancel journeys already carry risk under current law, and monitoring triggers set for the regulations.',
    },
  },
];
