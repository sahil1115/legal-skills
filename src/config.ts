/**
 * Build-time configuration.
 *
 * There is no backend and no API key. Everything here is public, non-secret
 * and baked in at build time. See .env.example.
 *
 * Analytics configuration lives in `src/lib/analytics.ts`, which reads
 * VITE_PLAUSIBLE_DOMAIN and disables itself entirely when it is unset.
 */
export const REPO_URL =
  import.meta.env.VITE_REPO_URL ?? 'https://github.com/sahil1115/legal-skills';

/** Shown in the footer. Kept here so the version string has one home. */
export const APP_VERSION = '0.1.0';
