/**
 * Build-time configuration.
 *
 * There is no backend, no API key and no analytics — the only configurable
 * value is where the repository lives, so forks can point the UI at themselves.
 * Set VITE_REPO_URL in a .env file to override (see .env.example).
 */
export const REPO_URL =
  import.meta.env.VITE_REPO_URL ?? 'https://github.com/sahil1115/legal-skills';

/** Shown in the footer. Kept here so the version string has one home. */
export const APP_VERSION = '0.1.0';
