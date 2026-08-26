import type { Skill } from '../types/skill';

/**
 * Privacy-friendly analytics via Plausible.
 *
 * Design constraints, all deliberate:
 *
 * - **Optional.** With `VITE_PLAUSIBLE_DOMAIN` unset, `init()` does nothing,
 *   no script is loaded, no request is made, and every `track*` helper is a
 *   no-op. The app is fully functional with analytics disabled, which is the
 *   default for a fresh clone.
 * - **No identity.** Plausible is cookieless and stores no cross-site
 *   identifier. We add nothing of our own: no localStorage id, no
 *   fingerprint, no user id, no session id.
 * - **Manual pageviews.** We deliberately do NOT use Plausible's automatic
 *   script. The automatic and hash variants report `location.href`, which
 *   would include any query string that happened to be on the URL. We build
 *   the reported URL ourselves from origin + pathname + hash, so a query
 *   string can never be transmitted even if one appears.
 * - **No free text, ever.** Nothing derived from user input is sent. Search
 *   text, filter state, prompt content and document content are never passed
 *   to these helpers, and the helpers accept only `Skill` objects and fixed
 *   label unions so a caller cannot casually pass something sensitive.
 * - **Build-safe.** Every entry point guards on `typeof window`, so importing
 *   this module in Node (the audit and pack scripts SSR-load the registry)
 *   is inert.
 */

/** Plausible's queue stub signature. */
type PlausibleFn = {
  (event: string, options?: { props?: Record<string, string>; u?: string; callback?: () => void }): void;
  q?: unknown[];
};

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

/**
 * The site's domain as registered in Plausible, e.g.
 * `sahil1115.github.io/legal-skills`. Empty or absent disables analytics.
 */
const DOMAIN = (import.meta.env.VITE_PLAUSIBLE_DOMAIN ?? '').trim();

/**
 * Where the Plausible script and API live. Defaults to Plausible's hosted
 * service; override for a self-hosted instance. Not required.
 */
const HOST = (import.meta.env.VITE_PLAUSIBLE_HOST ?? 'https://plausible.io').trim().replace(/\/$/, '');

const SCRIPT_ID = 'plausible-analytics';

/** True when analytics is configured and we are running in a browser. */
export const analyticsEnabled = (): boolean => DOMAIN !== '' && typeof window !== 'undefined';

let initialised = false;

/**
 * Loads the Plausible script once.
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

  // Standard Plausible queue stub: calls made before the script finishes
  // loading are buffered rather than lost.
  if (!window.plausible) {
    const stub: PlausibleFn = function (...args: unknown[]) {
      (stub.q = stub.q ?? []).push(args);
    } as PlausibleFn;
    window.plausible = stub;
  }

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.defer = true;
  script.dataset.domain = DOMAIN;
  // `script.manual.js` disables automatic pageview tracking so we control the
  // URL that is reported. See the note on query strings above.
  script.src = `${HOST}/js/script.manual.js`;
  document.head.appendChild(script);
}

/**
 * The current URL, stripped to origin + pathname + hash.
 *
 * The query string is dropped unconditionally. This app never puts user input
 * in the URL, but stripping it here means that stays true even if a future
 * change adds a query parameter, and it protects against a shared link that
 * arrives with tracking or campaign junk attached.
 */
function safeUrl(): string {
  const { origin, pathname, hash } = window.location;
  return `${origin}${pathname}${hash}`;
}

function send(event: string, props?: Record<string, string>): void {
  if (!analyticsEnabled()) return;
  try {
    window.plausible?.(event, { u: safeUrl(), ...(props ? { props } : {}) });
  } catch {
    // Analytics must never break the app. A blocked script, an ad blocker or
    // an offline browser all land here and are correctly ignored.
  }
}

/**
 * The four properties every skill event carries, derived from the registry
 * rather than hardcoded at call sites.
 */
function skillProps(skill: Skill): Record<string, string> {
  return {
    skill_id: skill.id,
    skill_name: skill.name,
    jurisdiction: skill.jurisdiction,
    category: skill.category,
  };
}

/**
 * Reports a pageview for the current URL.
 *
 * Called on first load and whenever the skill route changes, so opening a
 * skill, moving between skills and returning to the catalogue each register
 * as navigation rather than the whole app counting as a single page.
 */
export function trackPageView(): void {
  send('pageview');
}

/** Fires when a skill detail view is opened. Once per opening, not per render. */
export function trackSkillViewed(skill: Skill): void {
  send('Skill Viewed', skillProps(skill));
}

/** Fires only after the clipboard write actually succeeded. */
export function trackPromptCopied(skill: Skill): void {
  send('Prompt Copied', skillProps(skill));
}

/** The export formats offered in the detail view. */
export type DownloadFormat = 'skill-md' | 'json';

/** Fires only once a download has actually been initiated. */
export function trackSkillDownloaded(skill: Skill, format: DownloadFormat): void {
  send('Skill Downloaded', { ...skillProps(skill), format });
}

/**
 * Outbound destinations we care about.
 *
 * A closed union rather than a free string: it keeps the Plausible property
 * to a handful of known values, and makes it impossible to accidentally send
 * a URL with a query string or user data in it.
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
  send('Outbound Link Click', {
    destination,
    ...(host ? { host } : {}),
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
