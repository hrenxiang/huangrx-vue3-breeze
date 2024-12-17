/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_HOME_PAGE: string;
  readonly VITE_APP_CONSOLE_FLAG: string;
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_BASE_FILE_DOWNLOAD_URL: string;
  readonly VITE_APP_BASE_FILE_UPLOAD_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
