import type { Skill } from '../types/skill';

/**
 * Privacy-friendly analytics via GoatCounter.
 *
 * GoatCounter is open source, cookieless, stores no IP addresses and is free
 * to use on its hosted service for non-commercial and open-source projects.
 * It can also be self-hosted — see `VITE_GOATCOUNTER_ENDPOINT`.
 *
 * Design constraints, all deliberate:
 *
 * - **Optional.** With `VITE_GOATCOUNTER_CODE` unset, `initAnalytics()` does
 *   nothing, no script is loaded, no request is made, and every `track*`
 *   helper is a no-op. That is the default for a fresh clone.
 * - **No identity.** No cookie, no localStorage id, no fingerprint, no user
 *   or session id. GoatCounter counts uniques with a salted daily hash it
 *   discards; we add nothing of our own.
 * - **Manual pageviews.** GoatCounter's default records `location.pathname +
 *   location.search` — which would transmit any query string, and would miss
 *   the hash this app routes on. We set `no_onload` and send the path
 *   ourselves: pathname + hash, with the query string always stripped.
 * - **No free text, ever.** Nothing derived from user input is sent. The
 *   helpers accept `Skill` objects and closed label unions, so a caller
 *   cannot casually pass search text, prompt content or document content.
 * - **Build-safe.** Every entry point guards on `typeof window`, so importing
 *   this module in Node (the audit and pack scripts SSR-load the registry)
 *   is inert.
 */

/** One hit. `event: true` records an event rather than a pageview. */
interface GoatCounterHit {
  path: string;
  title?: string;
  event?: boolean;
}

interface GoatCounterApi {
  /** Set before the script loads to suppress its automatic pageview. */
  no_onload?: boolean;
  count?: (hit: GoatCounterHit) => void;
}

declare global {
  interface Window {
    goatcounter?: GoatCounterApi;
  }
}

/**
 * The GoatCounter site code — the subdomain of your dashboard. For
 * `https://legal-skills.goatcounter.com` the code is `legal-skills`.
 * Empty or absent disables analytics.
 */
const CODE = (import.meta.env.VITE_GOATCOUNTER_CODE ?? '').trim();

/**
 * Full count endpoint. Defaults to the hosted service derived from `CODE`;
 * override for a self-hosted instance. Not required.
 */
const ENDPOINT =
  (import.meta.env.VITE_GOATCOUNTER_ENDPOINT ?? '').trim() ||
  (CODE ? `https://${CODE}.goatcounter.com/count` : '');

/** GoatCounter's CDN-hosted counter script (~3KB). */
const SCRIPT_SRC = 'https://gc.zgo.at/count.js';
const SCRIPT_ID = 'goatcounter-analytics';

/** True when analytics is configured and we are running in a browser. */
export const analyticsEnabled = (): boolean => ENDPOINT !== '' && typeof window !== 'undefined';

let initialised = false;

/**
 * Hits requested before the script finished loading.
 *
 * GoatCounter does not ship a queue stub the way some vendors do, so we keep
 * our own tiny one. Without it the first pageview — which is fired immediately
 * on mount — would be dropped on a cold load.
 */
let pending: GoatCounterHit[] = [];
let scriptReady = false;

function flush(): void {
  if (!scriptReady || !window.goatcounter?.count) return;
  const queued = pending;
  pending = [];
  for (const hit of queued) {
    try {
      window.goatcounter.count(hit);
    } catch {
      // A hit is never worth an exception.
    }
  }
}

/**
 * Loads the GoatCounter script once.
 *
 * Idempotent on two levels — a module-scope flag and a check for the script
 * element — so React StrictMode's double-invoked effects, or a stray second
 * call, cannot produce two script tags or two sets of pageviews.
 */
export function initAnalytics(): void {
  if (!analyticsEnabled() || initialised) return;
  if (document.getElementById(SCRIPT_ID)) {
    initialised = true;
    return;
  }
  initialised = true;

  // Must be set before the script evaluates, or it sends its own pageview
  // using the unsanitised URL.
  window.goatcounter = { ...(window.goatcounter ?? {}), no_onload: true };

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = SCRIPT_SRC;
  script.dataset.goatcounter = ENDPOINT;
  script.addEventListener('load', () => {
    scriptReady = true;
    flush();
  });
  // A blocked or failed script leaves the queue unflushed, which is correct:
  // the hits are simply discarded and nothing breaks.
  script.addEventListener('error', () => {
    pending = [];
  });
  document.head.appendChild(script);
}

/**
 * The current path, as pathname + hash with the query string dropped.
 *
 * This app never puts user input in the URL, but stripping the query
 * unconditionally means that stays true if a future change adds a parameter,
 * and it protects against a shared link arriving with campaign junk attached.
 */
function safePath(): string {
  const { pathname, hash } = window.location;
  return `${pathname}${hash}`;
}

function send(hit: GoatCounterHit): void {
  if (!analyticsEnabled()) return;
  try {
    if (scriptReady && window.goatcounter?.count) {
      window.goatcounter.count(hit);
    } else {
      // Bound the queue so a permanently blocked script cannot grow it.
      if (pending.length < 25) pending.push(hit);
    }
  } catch {
    // Analytics must never break the app. A blocked script, a content blocker
    // or an offline browser all land here and are correctly ignored.
  }
}

/**
 * A readable label carrying the skill's jurisdiction and category.
 *
 * GoatCounter records a path and a title rather than structured properties, so
 * the machine-readable id goes in the path and this human-readable summary in
 * the title. That makes the dashboard answer "which jurisdictions and practice
 * areas do people care about" without joining anything back to the registry.
 */
function skillLabel(skill: Skill): string {
  return `${skill.name} (${skill.jurisdiction} / ${skill.category})`;
}

/**
 * Reports a pageview for the current path.
 *
 * Called on first load and whenever the skill route changes. Because each
 * skill has its own hash URL, this is also what answers "which skills do
 * people open": they appear as distinct paths in GoatCounter's dashboard.
 * There is deliberately no separate skill-view event — it would be a second
 * hit recording exactly the same thing.
 */
export function trackPageView(title?: string): void {
  send({ path: safePath(), ...(title ? { title } : {}) });
}

/** Pageview for an opened skill, titled so the dashboard is readable. */
export function trackSkillViewed(skill: Skill): void {
  trackPageView(skillLabel(skill));
}

/** Fires only after the clipboard write actually succeeded. */
export function trackPromptCopied(skill: Skill): void {
  send({
    path: `copy/${skill.id}`,
    title: `Copy: ${skillLabel(skill)}`,
    event: true,
  });
}

/** The export formats offered in the detail view. */
export type DownloadFormat = 'skill-md' | 'json';

/** Fires only once a download has actually been initiated. */
export function trackSkillDownloaded(skill: Skill, format: DownloadFormat): void {
  send({
    path: `download-${format}/${skill.id}`,
    title: `Download ${format}: ${skillLabel(skill)}`,
    event: true,
  });
}

/**
 * Outbound destinations we care about.
 *
 * A closed union rather than a free string: it keeps the recorded values to a
 * handful of known labels, and makes it impossible to accidentally send a URL
 * with a query string or user data in it.
 */
export type OutboundDestination =
  | 'github-repo'
  | 'github-contributing'
  | 'github-issues'
  | 'github-license'
  | 'github-disclaimer'
  | 'legal-source';

/**
 * Fires on clicks to the repository, contribution and documentation links.
 *
 * For `legal-source` (an official publisher's landing page cited by a skill)
 * the optional `host` is the bare hostname — never a path or query string.
 * Those hostnames come from our own static registry, which the audit already
 * constrains to landing pages, so no user data can reach this.
 */
export function trackOutboundLink(destination: OutboundDestination, host?: string): void {
  send({
    path: host ? `outbound/${destination}/${host}` : `outbound/${destination}`,
    title: `Outbound: ${host ?? destination}`,
    event: true,
  });
}

/** Extracts a bare hostname for `legal-source` links. Never returns a path. */
export function hostOf(url: string): string | undefined {
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}
