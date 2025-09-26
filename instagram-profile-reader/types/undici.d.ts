declare module "undici" {
  export const fetch: typeof globalThis.fetch;
}
