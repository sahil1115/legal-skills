# Analytics

Legal Skills can report **anonymous, aggregate** usage statistics through
[Plausible Analytics](https://plausible.io). Analytics is **optional and off by
default** — a fresh clone loads no analytics script and makes no analytics
request.

There is still no backend, no account, no cookie set by this application and no
API key in the repository.

---

## 1. Creating the Plausible site

1. Sign in to Plausible (hosted at `plausible.io`, or your own self-hosted
   instance).
2. **Add a site**.
3. Enter the **domain** exactly as the site is served — see below.
4. Plausible shows you a `<script>` snippet. **You do not need it.** This
   project loads the script itself from `src/lib/analytics.ts`; you only need
   the domain string.

No API key is required. The Plausible API key is for reading stats
programmatically, which this project does not do.

## 2. What domain to configure

Plausible identifies a site by the domain string you registered, which must
match what you set in `VITE_PLAUSIBLE_DOMAIN`.

| Where the site is hosted | Domain to register |
| --- | --- |
| GitHub Pages project site | `yourname.github.io/legal-skills` |
| GitHub Pages user site | `yourname.github.io` |
| Custom domain | `legalskills.example.com` |

For a **project site the path is part of the domain string** — that is
Plausible's convention for sites sharing a hostname, and getting it wrong is the
usual reason events appear to vanish.

## 3. What `VITE_PLAUSIBLE_DOMAIN` means

A Vite environment variable, read at **build time** and baked into the static
bundle. It is the domain string from step 2.

- **Set** → the Plausible script loads and events are sent.
- **Unset or empty** → analytics is disabled entirely. No script tag, no
  network request, and every tracking helper is a no-op. The app is otherwise
  identical.

It is **public, not a secret**. It ends up in the client bundle and is visible
to anyone who views source. Never put it in a GitHub *secret* — use a
repository *variable*.

There is also an optional `VITE_PLAUSIBLE_HOST` for a self-hosted Plausible
instance. It defaults to `https://plausible.io`.

### Local development

```bash
# .env
VITE_PLAUSIBLE_DOMAIN=localhost:5173
```

Restart the dev server after changing it — Vite reads env vars at startup.

Prefer not to pollute real stats? Register a separate Plausible site for
local testing, or leave the variable unset and confirm the app still works
(it should, identically).

### GitHub Pages

The build happens in CI, so the value must be available there.

1. **Settings → Secrets and variables → Actions → Variables → New repository
   variable**
2. Name: `VITE_PLAUSIBLE_DOMAIN`
   Value: `yourname.github.io/legal-skills`
3. (Optional) `VITE_PLAUSIBLE_HOST` for self-hosted Plausible.

[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) already passes
these into the build step. If the variable does not exist, the value is an
empty string and the deployed site simply has analytics disabled — the build
does not fail.

Push to `main`; once CI passes, the deploy workflow rebuilds with the variable
applied.

> **Use a variable, not a secret.** GitHub masks secrets in logs, which is
> pointless here and makes debugging harder — and the value is public anyway.

## 4. Events the application sends

Pageviews are sent manually (not by Plausible's automatic script) so this app
controls the reported URL and can guarantee the query string is stripped.

| Event | When | Properties |
| --- | --- | --- |
| `pageview` | First load, and each skill route change | URL: origin + path + hash only |
| `Skill Viewed` | A skill detail view is opened | `skill_id`, `skill_name`, `jurisdiction`, `category` |
| `Prompt Copied` | The clipboard write **succeeded** | `skill_id`, `skill_name`, `jurisdiction`, `category` |
| `Skill Downloaded` | A download actually started | `skill_id`, `skill_name`, `jurisdiction`, `category`, `format` = `skill-md` \| `json` |
| `Outbound Link Click` | Repository / docs / cited-source link clicked | `destination`, plus `host` for `legal-source` |

`destination` is a closed set: `github-repo`, `github-contributing`,
`github-issues`, `github-license`, `github-disclaimer`, `legal-source`. For
`legal-source` the extra `host` is the bare hostname of the cited publisher
(for example `eur-lex.europa.eu`) — never a path or query string.

Jurisdiction and category come from the skill registry, so "which jurisdictions
and practice areas are people interested in" is answered by breaking any skill
event down by those properties.

### What is never sent

- Search text, filter selections, or anything else typed into the app
- Prompt content, skill instructions, or any legal document content
- Query strings, or any URL parameter
- Names, email addresses, IP addresses (we never set one; Plausible does not
  store them)
- Cookies set by this application — it sets none
- Any user, session or device identifier. There is no fingerprinting and no
  `localStorage` tracking identity. The only value this app stores locally is
  your light/dark theme preference.

The helpers are typed to accept `Skill` objects and fixed label unions, so a
future contributor cannot casually pass free text into an event.

### Custom properties in Plausible

Custom properties need enabling per-site before they appear in the dashboard:
**Site settings → Custom properties**, then add `skill_id`, `skill_name`,
`jurisdiction`, `category`, `format`, `destination`, `host`. Events are recorded
either way; this only controls the breakdown UI.

## 5. Verifying events

1. Build or serve with the variable set, then open the site.
2. **Plausible → Realtime** should show your visit within a few seconds.
3. Open a skill, copy the prompt, download both formats, click the GitHub link.
4. **Behaviours → Goals / Custom events** should list `Skill Viewed`,
   `Prompt Copied`, `Skill Downloaded` and `Outbound Link Click`.

To watch the wire directly, open DevTools → Network and filter for `event`.
Each request is a `POST` to `/api/event`; inspect the payload to confirm exactly
what is sent.

Not seeing anything?

- **An ad blocker is blocking it.** Very common, and expected — the app handles
  it silently. Test in a clean profile.
- **Domain mismatch.** The value must match the Plausible site exactly,
  including the `/legal-skills` path for a project site.
- **Variable not applied at build time.** Check the deploy run's build step; a
  `.env` change also needs a dev-server restart.
- **Realtime lag.** Custom event breakdowns can take a minute to appear.

## 6. Disabling analytics

Remove or empty `VITE_PLAUSIBLE_DOMAIN` and rebuild.

- **Locally** — delete the line from `.env` and restart.
- **GitHub Pages** — delete the repository variable and re-run the deploy.

No code change is needed, and there is nothing to clean up: with the variable
unset, the script is never loaded and no request is ever made. Visitors are also
protected by any standard content blocker without the app degrading.

## 7. Running locally without analytics

The default. Just:

```bash
npm install
npm run dev
```

With no `.env`, or with `VITE_PLAUSIBLE_DOMAIN` unset, analytics is inert. To
confirm, open DevTools → Network and check for requests to `plausible.io` —
there will be none, and `document.getElementById('plausible-analytics')` returns
`null`.

---

## Implementation notes

All of it lives in [`src/lib/analytics.ts`](../src/lib/analytics.ts); components
call `trackSkillViewed`, `trackPromptCopied`, `trackSkillDownloaded` and
`trackOutboundLink` rather than touching Plausible directly.

- **No dependency.** The Plausible script is injected with a few lines of DOM
  code. Nothing is added to `package.json`.
- **Initialised once.** `initAnalytics()` guards on a module flag and on the
  script element, so React StrictMode's double-invoked effects in development
  cannot load two scripts or double-count.
- **No double counting.** `Skill Viewed` is gated on a ref holding the last
  tracked skill id, so it fires once per actual opening rather than once per
  render.
- **Success-gated.** `Prompt Copied` fires only when the clipboard promise
  resolves true; downloads fire only when the download was actually initiated.
- **Build-safe.** Every entry point guards on `typeof window`, so the module is
  inert when the registry is loaded in Node by `npm run audit` and
  `npm run packs`.
- **Failure-safe.** Every send is wrapped in `try/catch`. A blocked script or
  an offline browser can never break the page.
