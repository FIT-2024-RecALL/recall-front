/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECALL_API_HOSTNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}