/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY_PARAM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
