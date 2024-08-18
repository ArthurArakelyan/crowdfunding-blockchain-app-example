/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TEMPLATE_CLIENT_ID: string;
  readonly VITE_TEMPLATE_CONTRACT_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}