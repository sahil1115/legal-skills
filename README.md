# Legal Skills

**A free, open-source catalogue of reusable legal AI skills — browse by jurisdiction, copy the prompt, run it in whatever model you already use.**

Legal Skills is a static web app. No backend, no account, no API key, and **zero third-party requests out of the box**. Optional free, privacy-friendly analytics can be switched on by a maintainer; it is off by default and never sees what you type. Every skill is a structured, provider-neutral prompt carrying its own sources, review date and legal-safety rules.

> **Not legal advice.** Every skill produces AI-assisted legal research and drafting support. It is not legal advice, it does not create a lawyer–client relationship, and it may be incomplete or out of date. Verify every citation, deadline and conclusion against primary sources, and have a qualified lawyer in the relevant jurisdiction review the output before you rely on it. See [DISCLAIMER.md](DISCLAIMER.md).

---

## Live demo

**<https://sahil1115.github.io/legal-skills/>**

Deep links work per skill — for example [`#eu-ai-act-classifier`](https://sahil1115.github.io/legal-skills/#eu-ai-act-classifier). Nothing you type is ever transmitted; search runs entirely in your browser.

> Pages must be enabled once on a fork: **Settings → Pages → Source: GitHub Actions**. After that, every push to `main` that passes CI deploys automatically.

---

## What's in it

**73 skills** across **8 jurisdictions**, **8 practice areas** and an optional **industry** dimension.

| Jurisdiction | Skills | Examples |
| --- | --- | --- |
| Global | 10 | Playbook Maker, Smart Redline, Contract Obligation Extraction, Data Rights Request Handler |
| United States | 27 | NDA Reviewer, Separation & Release Reviewer, Demand Letter Response Planner, Commercial Lease Reviewer, Litigation Hold Builder, HSR Threshold Tester |
| United Kingdom | 5 | Employment Tribunal Risk Assessor, TUPE Transfer Assessor, UK GDPR Breach & ICO Notification Assessor, Consumer Rights Act Terms Checker, Bribery Act Adequate Procedures Reviewer |
| European Union | 6 | AI Act Classifier, DPIA & ROPA Builder, NIS2 Scope Tester, DORA Third-Party Reviewer |
| Canada | 5 | Termination Entitlements Assessor, Privacy Breach & Reporting Assessor, CASL Compliance Checker, Quebec Law 25 & Language Compliance Checker, Advertising & Claims Reviewer |
| Australia | 10 | Unfair Dismissal Risk Assessor, Consumer Guarantees & Warranty Checker, Director Duties & Insolvent Trading Checker, Retail & Commercial Lease Reviewer, ACL Unfair Terms Screener |
| Singapore | 6 | PDPA Obligation Mapper, MAS Notice Checker, SIAC Clause Builder |
| Cross-jurisdiction | 4 | Contract Localizer, Four-Regime Gap Analyzer, Strictest-Rule Resolver |

Each skill carries what it does, when to use it, inputs, expected outputs, a full prompt, a worked example, **its legal sources with authority tiers**, a **last-reviewed date**, a **review status**, a **version**, and related skills.

### Features

- Instant client-side search across names, tags, descriptions and prompt bodies
- Filter by jurisdiction, practice area, industry and tag, with live counts
- Per-skill detail view with **Copy Prompt**, **Download SKILL.md** and **Download JSON**
- Deep links with working Back/Forward, and permanent redirects for renamed skills
- Light and dark themes, responsive from 320px
- No accounts, no cookies, no user-content collection; optional [privacy-friendly analytics](#analytics), off by default

---

## Legal verification philosophy

This is the part that matters most, and it drives the whole design.

**Language models state legal propositions confidently and wrongly, and they fabricate citations that do not exist.** A legal skills catalogue that ignores this is worse than useless, because a well-structured wrong answer reads as authoritative. Three mechanisms address it.

### 1. Every prompt carries standing safety rules

[`src/data/safety.ts`](src/data/safety.ts) defines one shared block, composed onto every skill by `composePrompt()` — never pasted into individual skills, so it cannot drift and cannot be forgotten. It requires the model to:

- **Never invent** statutes, cases, section numbers, deadlines, thresholds, figures or quotations
- **Label every proposition** `[CONFIRMED]` / `[INFERRED]` / `[UNKNOWN]` / `[VERIFY]`, and treat `[UNKNOWN]` as a valid, preferable answer
- **Prefer primary authority**, and say which tier it is relying on
- **Distinguish binding law from guidance**, and flag where a regulator's expectation exceeds the legal requirement
- **Fix jurisdiction and effective date** before answering, rather than assuming one
- **Never silently fill a missing fact** — name it or bracket it visibly
- **Flag conflicts** between sources or regimes rather than smoothing them over
- End with a **verification checklist**

The block is appended *after* the skill body deliberately: trailing instructions are less likely to be crowded out of a long task description.

### 2. Every skill declares its sources, with authority tiers

Each source is tagged `primary` (the law itself), `regulator` (binding instruments), `guidance` (persuasive, not binding) or `secondary` (commentary). That distinction is load-bearing: a jurisdiction-specific skill resting only on commentary is telling you something about its own reliability, and `npm run audit` warns when one does.

**Sources deliberately link to landing pages, never pinpoint deep links.** A fabricated or rotted deep link is worse than no link. Section numbers and pinpoint citations are absent from the metadata by design — they belong in verified content, not machine-generated provenance. The audit **fails the build** if any source URL contains a path.

### 3. Every skill states how far it has actually been checked

`reviewStatus` is one of `unverified`, `community-reviewed`, `practitioner-reviewed`, shown prominently above any legal content in the detail view.

**Every skill in this repository is currently `unverified`.** That is an honest statement, not a placeholder: the content was drafted against the named sources but has not been signed off by a practitioner in the relevant jurisdiction. Raising a skill's status is a human act and must never happen in a bulk edit — see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Quick start

Requires [Node.js](https://nodejs.org) 20.19+ or 22.12+ and npm.

```bash
git clone https://github.com/sahil1115/legal-skills.git
cd legal-skills
npm install
npm run dev
```

Open <http://localhost:5173>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck and build a production bundle into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run oxlint |
| `npm run typecheck` | Run `tsc -b --force` |
| `npm run audit` | Validate the skill registry (see below) |
| `npm run packs` | Generate distributable skill packs into `dist-packs/` |

---

## Downloads and Agent Skills

Every skill exports in two formats from its detail view, and in bulk via `npm run packs`.

### SKILL.md — Agent Skills-compatible

YAML frontmatter with `name` and `description` (the keys reusable Agent Skills conventions expect), followed by Markdown instructions. Additional keys — `version`, `jurisdiction`, `legal_area`, `last_reviewed`, `review_status`, `related_skills`, `industries` — are additive: a consumer that only understands `name` and `description` ignores them, so the file stays compatible while carrying the provenance a legal skill needs.

```yaml
---
name: "eu-ai-act-classifier"
description: "Classifies an AI system under the EU AI Act risk tiers and maps the resulting obligations."
version: "1.0.0"
license: "MIT"
jurisdiction: "European Union"
last_reviewed: "2026-08-26"
review_status: "unverified"
---
```

The body is the **composed** prompt, so an exported file carries its legal-safety rules with it and cannot be separated from them by accident.

### JSON — machine-readable

Full structured export. `prompt` is the composed prompt including safety rules; `promptBody` is the skill-specific half, so a consumer that wants to recompose with its own preamble can, without losing either piece.

### Bulk generation

```bash
npm run packs
# dist-packs/skills/<id>/SKILL.md
# dist-packs/skills/<id>/skill.json
# dist-packs/index.json        catalogue manifest
# dist-packs/LEGAL-SAFETY.md   the shared rules, for auditing in one place
```

`scripts/build-skill-packs.mjs` calls the same pure transforms in [`src/lib/export.ts`](src/lib/export.ts) that the browser uses — one registry, one set of transforms, no drift. **The project remains provider-neutral: no format targets a specific vendor's runtime.**

---

## Architecture

```
src/
├── types/skill.ts          # The data model — start here
├── data/
│   ├── skills/             # The registry, one file per jurisdiction
│   │   ├── index.ts        # Combines them, id aliases, dev-time checks
│   │   ├── global|uk|eu|ca|au|sg|cross.ts
│   │   └── us/             # The largest pack, split by practice area
│   ├── safety.ts           # Shared legal-safety block + composePrompt()
│   ├── jurisdictions.ts    # Jurisdiction registry
│   ├── categories.ts       # Practice-area registry
│   ├── industries.ts       # Optional industry dimension
│   ├── tags.ts             # Shared tag vocabulary
│   └── disclaimer.ts
├── lib/
│   ├── search.ts           # Scored client-side search, no index library
│   ├── export.ts           # SKILL.md / JSON transforms + download
│   └── analytics.ts        # Optional GoatCounter hits; no-ops when unconfigured
├── hooks/
│   ├── useSkillFilters.ts  # All filter state in one place
│   ├── useSkillRoute.ts    # Hash routing, Back/Forward correctness
│   └── useCopyToClipboard.ts
├── components/
├── index.css               # Design tokens and all styles
└── App.tsx

scripts/
├── audit-skills.mjs        # npm run audit
└── build-skill-packs.mjs   # npm run packs
```

**Stack:** Vite + React 19 + TypeScript (strict). React is the only runtime dependency — no CSS framework, no icon library, no search library, no state library.

**Data-driven:** no component references a specific skill. Adding one means appending an object to a data file; cards, filters, counts, tag chips, the search index, the detail view and both export formats all derive from the registry.

**Type-safe by construction:** `JurisdictionId`, `CategoryId` and `IndustryId` are string unions, so a typo fails the build rather than silently breaking a filter.

### Notable design decisions

- **Safety rules are composed, not copied.** One block in `safety.ts`, appended by `composePrompt()`. Updating it updates all 73 skills at once, and the audit fails if a skill inlines its own copy.
- **The URL owns modal state.** `useSkillRoute` derives React state from the hash and marks its own history entries in `history.state`, so Back/Forward stay synchronised. Closing pops our entry rather than pushing a new one. (A ref would desync on same-document fragment navigation, which does not remount React.)
- **Renamed skills keep working.** `ID_ALIASES` maps retired ids to current ones; `getSkill()` resolves both and the URL is rewritten to the live id. **Never delete an alias** — an id is a published deep link.
- **Industry is additive.** A skill with no `industries` is industry-agnostic and matches every industry filter, so the dimension works over a registry where most skills declare nothing.
- **Analytics is opt-in, typed and provider-isolated.** `analytics.ts` injects the GoatCounter script itself (no dependency added) and exposes helpers that accept `Skill` objects and closed label unions — a caller cannot casually pass free text into a hit. Pageviews are sent manually so the query string is always stripped. Every call site goes through the helpers, which is why changing provider touched exactly one file.

---

## Skill metadata requirements

Every skill must declare all of these. `npm run audit` enforces them.

| Field | Requirement |
| --- | --- |
| `id` | Unique, `<jurisdiction>-<slug>`. **Permanent once merged** — rename via `ID_ALIASES`. |
| `name` / `description` | Unique name; description a sentence, roughly ≤ 130 chars |
| `jurisdiction` / `category` | Must exist in their registries (enforced by TypeScript) |
| `tags` | ≥ 4, at least one from [`src/data/tags.ts`](src/data/tags.ts) |
| `whatItDoes` / `whenToUse` | Substantive, not a restatement of the description |
| `inputs` / `outputs` | ≥ 3 each, every one described, at least one input required |
| `prompt` | ≥ 900 chars, opens with a role, has `INPUTS` / `TASK` / `RULES` / `OUTPUT FORMAT`, names no LLM vendor, does **not** inline the safety block |
| `example` | Concrete scenario and result |
| **`sources`** | ≥ 1, each with `citation` and `authority`; URLs HTTPS **landing pages only** |
| **`lastReviewed`** | ISO `YYYY-MM-DD`, not in the future; warns after 365 days |
| **`reviewStatus`** | `unverified` / `community-reviewed` / `practitioner-reviewed` |
| **`version`** | Semver |
| `industries` | Optional; omit rather than passing an empty array |
| `relatedSkills` | Optional; every id must resolve, no self-references, no duplicates |

---

## How to add a skill

1. Open the file for the jurisdiction in [`src/data/skills/`](src/data/skills/).
2. Copy an existing entry and edit it. Keep `id` unique and in `<jurisdiction>-<slug>` form.
3. Fill in `sources`, `lastReviewed`, `reviewStatus` (`unverified` unless you are a qualified practitioner reviewing it) and `version: '1.0.0'`.
4. Add at least one tag from the shared vocabulary. Add `relatedSkills` where a genuine pairing exists.
5. **Do not paste the safety block into your prompt** — it is composed on automatically.
6. Run the checks:

```bash
npm run audit && npm run lint && npm run build
```

7. Run `npm run dev`, open your skill, and check Copy Prompt and both downloads.
8. Open a pull request.

Adding a **jurisdiction** takes three edits: add the id to `JurisdictionId`, add an entry to `jurisdictions.ts`, create `src/data/skills/<id>.ts` and register it in the index. Nothing in the UI changes.

A jurisdiction that outgrows one file becomes a directory with an `index.ts` re-exporting its parts — see [`src/data/skills/us/`](src/data/skills/us/). The registry import does not change.

### What `npm run audit` validates

Source metadata (presence, authority tiers, HTTPS, **no deep links**, no duplicates) · review dates (ISO format, not future, staleness warning) · semver · the legal-safety block's own integrity · required prompt sections · provider-neutrality · inlined-safety-block detection · thin content · malformed or duplicate ids, names, tags and sources · unknown jurisdictions, categories and industries · **broken, duplicate and self-referencing related-skill ids** · dangling `ID_ALIASES` · that both export formats round-trip and retain their safety block.

Errors exit non-zero and fail CI. Warnings report without blocking.

---

## Contributor workflow

1. **Fork and branch.** One skill or one focused change per PR.
2. **Check locally:** `npm run audit`, `npm run lint`, `npm run typecheck`, `npm run build`.
3. **Open a PR** describing what changed. For a legal change, say what the correct position is and why the previous one was wrong.
4. **CI runs** lint, typecheck, audit, build and pack generation on every push and PR.
5. **Merge to `main`** triggers deployment — but only after CI passes: the deploy workflow is gated on CI success and builds the exact commit CI validated.

Corrections from practising lawyers are the highest-value contribution this project can receive. If you spot an inaccuracy, open an issue naming the skill, the line and the correct position. Full guidance, including what makes a good prompt, is in [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Deploying

`dist/` is a plain static bundle; `vite.config.ts` sets `base: './'`, so it works from any subdirectory with no configuration.

- **GitHub Pages** — enable **Settings → Pages → Source: GitHub Actions** once. [`deploy.yml`](.github/workflows/deploy.yml) then runs on CI success on `main`, or on demand from the Actions tab.
- **Netlify / Vercel / Cloudflare Pages** — build `npm run build`, publish `dist`. No environment variables required.
- **Anywhere else** — `npm run build`, then serve `dist/` with any static file server.

---

## Analytics

The project can report **anonymous, aggregate** usage statistics through
[GoatCounter](https://www.goatcounter.com) — open source, cookieless, no
personal data, no IP storage, and **free on its hosted service for
non-commercial and open-source projects** (it can also be self-hosted).
**It is optional and off by default:** a fresh clone loads no analytics script
and makes no analytics request.

Enable it by setting `VITE_GOATCOUNTER_CODE` to your GoatCounter site code — the
subdomain of your dashboard, so `legal-skills` for
`https://legal-skills.goatcounter.com`. Unset, every tracking call is a no-op
and the app is otherwise identical. There is still no backend, no account needed
to run the site and no API key — the value is public build configuration, not a
secret.

**What is measured:** visitors and pageviews; which skills are opened (each
skill has its own URL, so it appears as its own path); which prompts are copied
(`copy/<skill-id>`); which skills are downloaded and in which format
(`download-skill-md/…`, `download-json/…`); and clicks to the repository and
cited-source links (`outbound/…`). Hit titles carry the skill's jurisdiction and
category — `AI Act Classifier (eu / regulatory)` — so "which jurisdictions and
practice areas do people care about" is readable straight from the dashboard.

**What is never sent:** search text or anything else you type, prompt content,
legal document content, query strings, names, email addresses, IP addresses,
cookies set by this app (it sets none), or any user, session or device
identifier. There is no fingerprinting and no `localStorage` tracking identity.
Pageview paths are built from pathname + hash with the query string stripped
unconditionally.

Full setup, hit reference, verification and how to turn it off:
**[docs/analytics.md](docs/analytics.md)**.

---

## Privacy and safety

A deliberate constraint, not an accident of the current version:

- **No backend, no accounts, no login, no cookies set by this app.**
- **No analytics by default.** Optional, self-configured GoatCounter only — off unless a maintainer sets `VITE_GOATCOUNTER_CODE`, and never collecting user-entered content. See [Analytics](#analytics).
- **No API keys.** The project does not call any LLM provider.
- **No LLM vendor dependency.** Prompts are plain text for any capable model.
- **Nothing you type is transmitted.** Search runs in your browser against a bundled registry. No input field sends a document anywhere.
- **Zero third-party requests with analytics disabled.** The Google Fonts dependency was removed in favour of a system font stack; with analytics off the page requests nothing beyond its own assets, verified by an automated test. With analytics on, the only third-party request is the GoatCounter script and its count endpoint.

The only stored value is your light/dark theme preference in `localStorage`.

---

## Roadmap

The **Agents** and **Connectors** tabs are placeholders. The model already reserves `connectors`, `authors` and `rating`, so they can land without a breaking migration. Planned: more jurisdictions, industry-specific packs, skill changelogs, agents that chain skills, opt-in connectors, and community ratings. Nothing on that list will change the privacy posture above without being clearly opt-in.

## Licence

[MIT](LICENSE). Use it, fork it, ship it commercially — attribution appreciated, not required.

The licence covers the software. It is not a warranty about the law: see [DISCLAIMER.md](DISCLAIMER.md).
