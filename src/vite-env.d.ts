/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Repository URL used by the header and footer links. */
  readonly VITE_REPO_URL?: string;
  /**
   * GoatCounter site code — the subdomain of your dashboard. For
   * `https://legal-skills.goatcounter.com` the code is `legal-skills`.
   * Unset or empty disables analytics entirely — no script, no requests.
   */
  readonly VITE_GOATCOUNTER_CODE?: string;
  /**
   * Optional full count endpoint, for a self-hosted GoatCounter.
   * Overrides the URL derived from VITE_GOATCOUNTER_CODE.
   */
  readonly VITE_GOATCOUNTER_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
