/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Repository URL used by the header and footer links. */
  readonly VITE_REPO_URL?: string;
  /**
   * Site domain as registered in Plausible, e.g. `example.github.io/legal-skills`.
   * Unset or empty disables analytics entirely — no script, no requests.
   */
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  /**
   * Optional Plausible host, for a self-hosted instance.
   * Defaults to `https://plausible.io`.
   */
  readonly VITE_PLAUSIBLE_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
