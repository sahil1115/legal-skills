# Analytics

Legal Skills can report **anonymous, aggregate** usage statistics through
[GoatCounter](https://www.goatcounter.com). Analytics is **optional and off by
default** — a fresh clone loads no analytics script and makes no analytics
request.

There is still no backend, no account required to run the site, no cookie set
by this application and no API key in the repository.

**Why GoatCounter:** it is open source, cookieless, stores no IP addresses, and
is **free on its hosted service for non-commercial and open-source projects**.
It can also be self-hosted. It is a single ~3KB script.

> Check that your use qualifies for free hosting — GoatCounter asks commercial
> users to pay. See its own [pricing page](https://www.goatcounter.com/help/pricing).
> If in doubt, self-host or leave analytics off.

---

## 1. Creating the GoatCounter site

1. Sign up at [goatcounter.com](https://www.goatcounter.com).
2. Choose a **site code**. This becomes your dashboard subdomain — code
   `legal-skills` gives you `https://legal-skills.goatcounter.com`.
3. That is the whole setup. GoatCounter shows you a `<script>` snippet; **you
   do not need it.** This project injects the script itself from
   `src/lib/analytics.ts` — you only need the code.

No API key is required. GoatCounter's API tokens are for reading stats
programmatically, which this project does not do.

## 2. What `VITE_GOATCOUNTER_CODE` means

A Vite environment variable, read at **build time** and baked into the static
bundle. It is the site code from step 1 — just the subdomain, not a URL.

```
https://legal-skills.goatcounter.com
        ^^^^^^^^^^^^
        this part
```

- **Set** → the GoatCounter script loads and hits are sent to
  `https://<code>.goatcounter.com/count`.
- **Unset or empty** → analytics is disabled entirely. No script tag, no
  network request, every tracking helper a no-op. The app is otherwise
  identical.

It is **public, not a secret**. It ends up in the client bundle and is visible
to anyone who views source. Never put it in a GitHub *secret* — use a
repository *variable*.

There is also an optional `VITE_GOATCOUNTER_ENDPOINT` for a self-hosted
instance, e.g. `https://stats.example.com/count`. It overrides the URL derived
from the code.

### Local development

```bash
# .env
VITE_GOATCOUNTER_CODE=your-site-code
```

Restart the dev server after changing it — Vite reads env vars at startup.

Prefer not to pollute real stats? Create a second GoatCounter site for local
testing, or leave the variable unset and confirm the app still works (it should,
identically).

### GitHub Pages

The build happens in CI, so the value must be available there.

1. **Settings → Secrets and variables → Actions → Variables → New repository
   variable**
2. Name: `VITE_GOATCOUNTER_CODE`
   Value: your site code
3. (Optional) `VITE_GOATCOUNTER_ENDPOINT` for self-hosted GoatCounter.

[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) already passes
these into the build step. If the variable does not exist the value is an empty
string and the deployed site simply has analytics disabled — the build does not
fail.

Push to `main`; once CI passes, the deploy workflow rebuilds with the variable
applied.

> **Use a variable, not a secret.** GitHub masks secrets in logs, which is
> pointless here and makes debugging harder — and the value is public anyway.

## 3. What the application sends

GoatCounter records a **path** and a **title** per hit, rather than structured
properties. So the machine-readable identifier goes in the path, and a
human-readable summary — including jurisdiction and category — goes in the
title, which means the dashboard is readable without joining anything back to
the registry.

Pageviews are sent **manually** (GoatCounter's automatic mode is switched off
with `no_onload`). Its default would record `pathname + search`, which would
transmit any query string and would miss the hash this app routes on.

| Hit | Path | Title | When |
| --- | --- | --- | --- |
| Pageview | `/legal-skills/` | — | First load, return to catalogue |
| Pageview | `/legal-skills/#eu-ai-act-classifier` | `AI Act Classifier (eu / regulatory)` | A skill is opened |
| Event | `copy/eu-ai-act-classifier` | `Copy: AI Act Classifier (eu / regulatory)` | Clipboard write **succeeded** |
| Event | `download-skill-md/eu-ai-act-classifier` | `Download skill-md: …` | SKILL.md download started |
| Event | `download-json/eu-ai-act-classifier` | `Download json: …` | JSON download started |
| Event | `outbound/github-repo` | `Outbound: github-repo` | Repository link clicked |
| Event | `outbound/legal-source/eur-lex.europa.eu` | `Outbound: eur-lex.europa.eu` | A cited source link clicked |

`destination` is a closed set: `github-repo`, `github-contributing`,
`github-issues`, `github-license`, `github-disclaimer`, `legal-source`. For
`legal-source` the appended value is the bare hostname of the cited publisher —
never a path or query string.

### Answering the questions you actually have

| Question | Where to look |
| --- | --- |
| How many people visit | **Dashboard → visitors** |
| How many pageviews | **Dashboard → pageviews** |
| Which skills people open | **Paths**, filter `#` — each skill is its own path |
| Which skills people copy | **Paths**, filter `copy/` |
| Which download SKILL.md | **Paths**, filter `download-skill-md/` |
| Which download JSON | **Paths**, filter `download-json/` |
| Which jurisdiction / category | Titles carry both, e.g. `(eu / regulatory)`. Jurisdiction is also the skill id prefix, so filtering `copy/eu-` gives EU copies |

There is deliberately **no separate "skill viewed" event**: each skill has its
own URL, so its pageview already records the open. A second hit would count the
same thing twice.

### What is never sent

- Search text, filter selections, or anything else typed into the app
- Prompt content, skill instructions, or any legal document content
- Query strings, or any URL parameter
- Names, email addresses, IP addresses (GoatCounter does not store them)
- Cookies set by this application — it sets none
- Any user, session or device identifier. There is no fingerprinting and no
  `localStorage` tracking identity. The only value this app stores locally is
  your light/dark theme preference.

The helpers are typed to accept `Skill` objects and fixed label unions, so a
future contributor cannot casually pass free text into a hit.

## 4. Verifying hits

1. Build or serve with the variable set, then open the site.
2. Your dashboard at `https://<code>.goatcounter.com` should show the visit
   within seconds.
3. Open a skill, copy the prompt, download both formats, click the GitHub link.
4. The skill path and the `copy/…`, `download-…/…` and `outbound/…` paths
   should all appear.

To watch the wire directly, open DevTools → Network and filter for `count`.
Each hit is a request to `https://<code>.goatcounter.com/count`; inspect the
query parameters to confirm exactly what is sent.

Not seeing anything?

- **A content blocker is blocking it.** Common, and expected — the app handles
  it silently. Test in a clean profile.
- **Wrong site code.** Confirm it matches your dashboard subdomain.
- **Variable not applied at build time.** Check the deploy run's build step; a
  `.env` change also needs a dev-server restart.
- **GoatCounter ignores repeat views.** It deduplicates a path per visitor per
  day, so reloading the same page will not keep incrementing.

## 5. Disabling analytics

Remove or empty `VITE_GOATCOUNTER_CODE` and rebuild.

- **Locally** — delete the line from `.env` and restart.
- **GitHub Pages** — delete the repository variable and re-run the deploy.

No code change is needed, and there is nothing to clean up: with the variable
unset the script is never loaded and no request is ever made. Visitors are also
protected by any standard content blocker without the app degrading.

## 6. Running locally without analytics

The default. Just:

```bash
npm install
npm run dev
```

With no `.env`, or with `VITE_GOATCOUNTER_CODE` unset, analytics is inert. To
confirm, open DevTools → Network and check for requests to `goatcounter.com` —
there will be none, and `document.getElementById('goatcounter-analytics')`
returns `null`.

---

## Implementation notes

All of it lives in [`src/lib/analytics.ts`](../src/lib/analytics.ts); components
call `trackSkillViewed`, `trackPromptCopied`, `trackSkillDownloaded` and
`trackOutboundLink` rather than touching GoatCounter directly. That indirection
is why swapping providers touched one file and left every call site alone.

- **No dependency.** The script is injected with a few lines of DOM code.
  Nothing is added to `package.json`.
- **Initialised once.** `initAnalytics()` guards on a module flag and on the
  script element, so React StrictMode's double-invoked effects in development
  cannot load two scripts or double-count.
- **No double counting.** The pageview effect is gated on a ref holding the last
  route key, so it fires once per actual navigation rather than once per render.
- **Success-gated.** Copy fires only when the clipboard promise resolves true;
  downloads fire only when the download was actually initiated.
- **Queued.** GoatCounter ships no queue stub, so this module keeps a small
  bounded one — without it the first pageview, fired immediately on mount,
  would be lost on a cold load. A blocked script discards the queue rather than
  growing it.
- **Build-safe.** Every entry point guards on `typeof window`, so the module is
  inert when the registry is loaded in Node by `npm run audit` and
  `npm run packs`.
- **Failure-safe.** Every send is wrapped in `try/catch`. A blocked script or an
  offline browser can never break the page.
