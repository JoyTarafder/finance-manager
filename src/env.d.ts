namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    readonly NEXT_PUBLIC_APP_URL: string;
  }
}

interface Window {
  localStorage: Storage;
}

declare const window: Window & typeof globalThis;
