/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GM_ADDRESS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
