/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GITHUB_PAGES_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Global window extensions for CrimsonRealm
interface Window {
  CRIMSONREALM_API_URL?: string;
  CRIMSONREALM_ROUTER_BASE?: string;
  navigateToCrimsonRoute?: (path: string) => void;
}