# Legal Skills

**A free, open-source catalogue of reusable legal AI skills — browse by jurisdiction, copy the prompt, run it in whatever model you already use.**

Legal Skills is a static web app. There is no backend, no account, no API key and no tracking. Every skill is a structured, provider-neutral prompt that you copy into Claude, ChatGPT, Gemini, Cursor, a local model, or your own tooling.

> **Not legal advice.** Every skill here produces AI-assisted legal research and drafting support. It is not legal advice, it does not create a lawyer–client relationship, and it may be incomplete or out of date. Verify every citation, deadline and conclusion against primary sources, and have a qualified lawyer in the relevant jurisdiction review the output before you rely on it. See [DISCLAIMER.md](DISCLAIMER.md).

---

## What's in it

**38 skills** across **6 jurisdictions** and **7 practice areas.**

| Jurisdiction | Skills | Examples |
| --- | --- | --- |
| Global | 10 | Playbook Maker, Smart Redline, Contract Obligation Extraction, DSAR Request Handler |
| United States | 6 | 50-State Survey Builder, Worker Classification Tester, Privilege Log Builder |
| European Union | 6 | AI Act Classifier, DPIA & ROPA Builder, NIS2 Scope Tester, DORA Third-Party Reviewer |
| Australia | 6 | ACL Unfair Terms Screener, Modern Award Matcher, Privacy Act / NDB Assessor |
| Singapore | 6 | PDPA Obligation Mapper, MAS Notice Checker, SIAC Clause Builder |
| Cross-jurisdiction | 4 | Contract Localizer, Four-Regime Gap Analyzer, Strictest-Rule Resolver |

Each skill carries a description, what it does, when to use it, its inputs and expected outputs, a full prompt, a worked example, and a disclaimer.

## Features

- **Instant client-side search** across names, tags, descriptions and prompt bodies
- **Filter** by jurisdiction, practice area and tag, with live counts
- **Detail view** for every skill, with a one-click **Copy Prompt** button
- **Deep links** — every skill has its own URL fragment (`/#eu-ai-act-classifier`)
- **Light and dark themes**, responsive from 320px up
- **Zero data collection** — nothing you type leaves the browser

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

### Other commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build a production bundle into `dist/` |
| `npm run preview` | Serve the production build locally to check it |
| `npm run lint` | Run oxlint over the source |
| `npm run audit` | Check the skill registry for thin content, malformed ids and orphan tags |

`npm run build` runs `tsc -b` first, so a type error fails the build rather than shipping.

---

## Deploying

The build output in `dist/` is a plain static bundle — any static host will serve it. `vite.config.ts` sets `base: './'`, so the bundle works from a subdirectory without further configuration.

### GitHub Pages

The workflow ships in the repo at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), set to **manual** so a repo with Pages switched off doesn't collect a failed run on every push. To go live:

1. **Settings → Pages → Source: GitHub Actions**
2. Run **Deploy to GitHub Pages** once from the Actions tab — or uncomment the `push` trigger in the workflow to deploy automatically on every push to `main`.

There is no base path to configure: the build is already relative, so it works at `<user>.github.io/<repo>/` as-is.

[`ci.yml`](.github/workflows/ci.yml) lints and builds every push and pull request, and runs unconditionally.

### Netlify, Vercel, Cloudflare Pages

Build command `npm run build`, publish directory `dist`. No environment variables are required.

### Anywhere else

```bash
npm run build
# then serve dist/ with any static file server
npx serve dist
```

---

## Project structure

```
src/
├── types/skill.ts          # The data model — start here
├── data/
│   ├── skills/             # The skill registry, one file per jurisdiction
│   │   ├── index.ts        # Combines them, plus dev-time validation
│   │   ├── global.ts
│   │   ├── us.ts
│   │   ├── eu.ts
│   │   ├── au.ts
│   │   ├── sg.ts
│   │   └── cross.ts
│   ├── jurisdictions.ts    # Jurisdiction registry
│   ├── categories.ts       # Practice-area registry
│   ├── tags.ts             # Shared tag vocabulary
│   └── disclaimer.ts       # The default disclaimer
├── lib/search.ts           # Scored client-side search
├── hooks/
│   ├── useSkillFilters.ts  # All filter state, in one place
│   └── useCopyToClipboard.ts
├── components/             # Presentational components
├── index.css               # Design tokens and all styles
└── App.tsx                 # Layout, tabs, routing

scripts/audit-skills.mjs    # `npm run audit` — registry quality checks
```

**The app is data-driven.** No component knows about any specific skill. Adding a skill means adding one object to a data file — the cards, filters, counts, tag chips, search index and detail view all derive from the registry.

### The skill model

```ts
interface Skill {
  id: string;               // `<jurisdiction>-<slug>`, unique, used as the deep link
  name: string;
  description: string;      // one line, shown on the card
  jurisdiction: JurisdictionId;
  category: CategoryId;
  tags: string[];
  whatItDoes: string;       // 2-4 sentences of substance
  whenToUse: string;        // the trigger situation
  inputs: SkillInput[];     // { name, description, required? }
  outputs: SkillOutput[];   // { name, description }
  prompt: string;           // the provider-neutral prompt users copy
  example: SkillExample;    // { scenario, result }
  disclaimer?: string;      // overrides the shared default

  // Reserved for planned features — safe to ignore today
  version?: string;
  authors?: string[];
  rating?: number;
  connectors?: string[];
  relatedSkills?: string[];
}
```

See [`src/types/skill.ts`](src/types/skill.ts) for the annotated source.

---

## Adding a skill

1. Open the file for the jurisdiction in `src/data/skills/`.
2. Copy an existing entry and edit it. Keep `id` unique and in `<jurisdiction>-<slug>` form.
3. Give it at least one tag from the shared vocabulary in [`src/data/tags.ts`](src/data/tags.ts) — a tag no other skill uses is a name, not a filter.
4. Run `npm run audit`. It checks for thin content, missing prompt sections, malformed ids, orphan tags and provider names leaking into prompts.
5. Run `npm run dev`, find your skill, open it and copy the prompt.
6. Open a pull request.

TypeScript catches an invalid `jurisdiction` or `category` at build time.

Full guidance, including what makes a good prompt, is in [CONTRIBUTING.md](CONTRIBUTING.md).

## Adding a jurisdiction

1. Add its id to `JurisdictionId` in `src/types/skill.ts`.
2. Add an entry to `src/data/jurisdictions.ts` (name, short label, blurb, colour).
3. Create `src/data/skills/<id>.ts` and register it in `src/data/skills/index.ts`.

Nothing in the UI needs to change — the filters, counts and tabs pick it up.

---

## Privacy and safety

This is a deliberate design constraint, not an accident of the current version:

- **No backend.** The app is a static bundle.
- **No accounts, no login, no cookies, no analytics, no telemetry.**
- **No API keys.** The project does not call any LLM provider.
- **Nothing you type is transmitted.** Search runs in your browser against a bundled JSON-shaped registry. There is no input field that sends a document anywhere.
- **No LLM lock-in.** Prompts are plain text designed to work in any capable model.

The only stored value is your light/dark theme preference in `localStorage`. The only outbound request the page makes is to Google Fonts for the Inter typeface; self-host it or drop the `<link>` in `index.html` if you would rather it made none.

### On using the output

Every prompt in this catalogue is written to be honest about its limits — marking uncertainty, flagging citations for verification, and refusing to assert thresholds or deadlines it cannot confirm. That is a design goal, not a guarantee. **Legal answers are jurisdiction-specific, time-sensitive and fact-dependent, and language models get them confidently wrong.** Treat every output as a first draft prepared by a capable but unsupervised junior: useful for structuring the work, never for concluding it.

---

## Roadmap

The **Agents** and **Connectors** tabs are placeholders. The data model already reserves the fields they need (`connectors`, `relatedSkills`, `version`, `authors`, `rating`), so they can be added without a breaking migration. Planned, in rough order:

- More jurisdictions (UK, Canada, India, UAE) and industry-specific skill packs
- Skill versioning and changelogs
- Downloadable skill packs (JSON export, agent-tool formats)
- Agents that chain skills into end-to-end workflows
- Optional, opt-in connectors for document sources
- Community ratings and usage notes

Nothing on this list will change the privacy posture above without being clearly opt-in.

## Contributing

New skills, corrections to existing ones, and jurisdiction expertise are all welcome — especially from practising lawyers who can tell us where a prompt is wrong. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

[MIT](LICENSE). Use it, fork it, ship it commercially — attribution appreciated, not required.

The licence covers the software. It is not a warranty about the law: see [DISCLAIMER.md](DISCLAIMER.md).
