# Contributing to Legal Skills

Thanks for considering it. The most valuable contribution to this project is **a good skill written by someone who actually does the work** — and the second most valuable is **telling us where an existing skill is wrong.**

You do not need to be a developer to contribute a skill. If you can edit a text file on GitHub, you can add one.

---

## Ways to help

| Contribution | Difficulty | Where |
| --- | --- | --- |
| Fix or improve an existing skill's prompt | Easy | `src/data/skills/*.ts` |
| Report that a skill gives bad output | Easy | [Open an issue](../../issues) |
| Add a new skill | Easy | `src/data/skills/*.ts` |
| Add a new jurisdiction | Medium | See below |
| UI, accessibility or performance work | Medium | `src/components/`, `src/index.css` |

---

## Adding a skill

### 1. Pick the right file

`src/data/skills/` holds one file per jurisdiction: `global.ts`, `us.ts`, `eu.ts`, `au.ts`, `sg.ts`, `cross.ts`. Put your skill in the file for the jurisdiction whose law it applies. Use `global.ts` only if the skill genuinely does not depend on any particular legal system.

### 2. Copy an existing entry and edit it

```ts
{
  id: 'eu-my-new-skill',
  name: 'My New Skill',
  description: 'One line, under about 110 characters, shown on the card.',
  jurisdiction: 'eu',
  category: 'privacy',
  tags: ['data-protection', 'assessment', 'something-specific'],
  whatItDoes: 'Two to four sentences of substance...',
  whenToUse: 'The situation that should make someone reach for this...',
  inputs: [
    { name: 'The thing', description: 'What to provide and in what shape.', required: true },
    { name: 'Optional context', description: 'Improves the output but is not needed.' },
  ],
  outputs: [
    { name: 'The deliverable', description: 'What comes back.' },
  ],
  prompt: `You are a ...`,
  example: {
    scenario: 'A concrete situation, in one or two sentences.',
    result: 'What the user actually gets back.',
  },
}
```

### 3. Rules that the build enforces

- **`id` must be unique** and follow `<jurisdiction>-<slug>`. It is the deep-link fragment, so treat it as permanent once merged.
- **`jurisdiction` and `category` must be valid.** TypeScript rejects a typo at build time. Valid categories are in `src/data/categories.ts`.
- **At least one tag from `src/data/tags.ts`.** `npm run audit` fails a skill whose tags are all words no other skill uses, and the dev server warns in the console. A tag used once is a name, not a filter.

### 4. Check it

```bash
npm install
npm run audit   # registry quality checks — run this first
npm run dev     # open the app, find your skill, open it, copy the prompt
npm run build   # must pass before you open a PR
```

`npm run audit` checks what TypeScript cannot: thin `whatItDoes` or examples, a prompt missing its `INPUTS` / `TASK` / `RULES` / `OUTPUT FORMAT` sections, malformed ids and tags, orphan tags, and provider names leaking into a prompt. It prints a per-jurisdiction and per-category count so you can see where the catalogue is thin.

---

## What makes a good skill

This is the part that matters. A skill is not a prompt with a job title glued on the front.

### Structure the prompt

Every prompt in the catalogue follows the same shape, and yours should too:

```
You are a <specific role>.

INPUTS
- <named input>: <what to paste, with an example in angle brackets>
- ...

TASK
1. <numbered step>
2. <numbered step>
...

RULES
- <constraint, especially about what NOT to do>
- ...

OUTPUT FORMAT
<what the output should look like>
```

Numbered tasks matter: they make the output checkable, and they let a user delete a step they do not need.

### Make it refuse to guess

The single most important thing a legal prompt can do is **be honest about its limits.** Legal answers are jurisdiction-specific, time-sensitive and fact-dependent, and models get them confidently wrong. Good prompts in this catalogue:

- **Ban fabricated citations explicitly.** `Never invent a case name, citation, section number or date.`
- **Mark uncertainty inline.** `[VERIFY]`, `[UNKNOWN]`, confidence markers — and say that `[UNKNOWN]` is a valid answer.
- **Refuse to state moving figures as fact.** Salary thresholds, penalty ceilings, filing deadlines and quota rates all change. Say `[VERIFY]` and name the source to check.
- **Route uncertainty somewhere useful.** A verification checklist or a set of closed questions for local counsel is far more useful than a hedge in the middle of a paragraph.
- **Name the missing fact.** If the question cannot be answered without something the user did not supply, the prompt should say which fact, not assume one.

### Make it produce something usable

- **Give replacement text, not observations.** "Consider narrowing this indemnity" is worthless; a drafted clause is not.
- **Show the working.** A risk score with no breakdown cannot be audited or tuned.
- **Separate the required from the advisable.** Conflating them wastes the user's negotiating capital.
- **Make thresholds operational.** "Increased complaints" is not a review trigger; a stated number is.

### Keep it provider-neutral

No model names, no vendor-specific syntax, no tool-calling assumptions, no system/user role markup. A prompt should paste cleanly into any chat box.

### Write for a practitioner

Assume the reader is a lawyer or legal ops professional who knows their area and is short of time. Do not explain what a contract is. Do explain the trap in the analysis that people usually miss — the best skills in this catalogue each name one.

---

## Accuracy and scope

**Do not submit a skill for an area you do not know.** A confident, well-structured prompt that misstates a legal test is worse than no skill at all, because it reads as authoritative.

If you know an area but are unsure about a detail, that is fine — write the uncertainty into the prompt. That is the house style.

If you spot an inaccuracy in an existing skill, please open an issue or a PR. Say which skill, which line, and what the correct position is. Corrections from practising lawyers are the highest-value contribution this project can receive.

### Out of scope

- Skills whose purpose is to evade a legal obligation, conceal a breach, or obstruct a regulator or a court
- Prompts that instruct a model to present output as legal advice or to omit the verification framing
- Anything requiring a paid API, a login, a backend, or the transmission of user documents to a third party
- Copyrighted precedent, forms or commentary reproduced without the right to do so

---

## Adding a jurisdiction

1. Add the id to the `JurisdictionId` union in `src/types/skill.ts`.
2. Add an entry to `src/data/jurisdictions.ts` — `id`, `name`, `short`, `blurb`, `color`. Use a distinct colour; it becomes the jurisdiction dot on every card.
3. Create `src/data/skills/<id>.ts` exporting an array of skills.
4. Register it in `src/data/skills/index.ts`.

That is all. The filters, counts, tabs and search pick it up automatically. Please open a jurisdiction PR with at least three skills so the filter lands on something worth reading.

---

## Code contributions

- **TypeScript, strict mode.** `npm run build` runs `tsc -b` and must pass.
- **No new runtime dependencies** without discussing it in an issue first. The app currently ships React and nothing else, and that is a feature.
- **Keep it data-driven.** No component should reference a specific skill, jurisdiction or category by name.
- **Styles live in `src/index.css`** using the tokens at the top. Do not introduce a CSS framework or a styling library.
- **Preserve the privacy posture.** No analytics, no telemetry, no outbound requests, no `localStorage` beyond the theme preference. A PR that adds tracking will be closed.
- **Match the surrounding style.** Comments explain why, not what.

### Accessibility

New UI must be keyboard-navigable, must not trap focus outside a dialog, must keep visible focus indicators, and must maintain contrast in both themes. The detail view is the reference implementation.

---

## Pull requests

- One skill or one focused change per PR.
- Say what you changed and why. For a legal change, say what the correct position is and why the previous one was wrong.
- If you are a practising lawyer in the relevant jurisdiction, mentioning that helps reviewers weigh the change — it is not required, and no credential is checked.
- Confirm `npm run audit`, `npm run lint` and `npm run build` all pass.

Contributions are accepted under the [MIT Licence](LICENSE).

## Code of conduct

Be straightforward and civil. Disagree about the law as much as you like — that is the point — but do it about the substance. Personal attacks, harassment, and bad-faith argument get the participant removed from the project.

Report a problem by opening an issue or contacting a maintainer privately.
