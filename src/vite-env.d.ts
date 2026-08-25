/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Repository URL used by the header and footer links. */
  readonly VITE_REPO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
