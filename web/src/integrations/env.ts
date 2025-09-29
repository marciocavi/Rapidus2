import { z } from 'zod';

// Schema de variáveis de ambiente das integrações (somente server)
const EnvSchema = z.object({
  // IA
  OPENAI_API_KEY: z.string().min(1).optional(),
  AI_ASSISTANT_ENABLED: z.enum(['true', 'false']).optional(),
  AI_DRY_RUN: z.enum(['true', 'false']).optional(),

  // Analytics (GA4)
  GA4_PROPERTY_ID: z.string().optional(),
  GOOGLE_APPLICATION_CREDENTIALS_JSON: z.string().optional(),
  GA_OAUTH_CLIENT_ID: z.string().optional(),
  GA_OAUTH_CLIENT_SECRET: z.string().optional(),
  GA_OAUTH_REFRESH_TOKEN: z.string().optional(),
});

export type IntegrationsEnv = z.infer<typeof EnvSchema>;

function readEnv(): IntegrationsEnv {
  // Usa apenas process.env (server). Não exporte para cliente.
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    // Não lança erro duro — módulo é opt-in; logs ajudam diagnóstico.
    // eslint-disable-next-line no-console
    console.warn('[integrations/env] variáveis ausentes ou inválidas', parsed.error?.errors);
    return {} as IntegrationsEnv;
  }
  return parsed.data;
}

export const integrationsEnv = readEnv();

export function hasOpenAI(): boolean {
  return Boolean(integrationsEnv.OPENAI_API_KEY);
}

export type GA4ConfigInput = Partial<
  Pick<
    IntegrationsEnv,
    | 'GA4_PROPERTY_ID'
    | 'GOOGLE_APPLICATION_CREDENTIALS_JSON'
    | 'GA_OAUTH_CLIENT_ID'
    | 'GA_OAUTH_CLIENT_SECRET'
    | 'GA_OAUTH_REFRESH_TOKEN'
  >
>;

export function hasGA4Config(config: GA4ConfigInput): boolean {
  if (!config.GA4_PROPERTY_ID) {
    return false;
  }

  const hasServiceAccount = Boolean(config.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  const hasOAuthCredentials = Boolean(
    config.GA_OAUTH_CLIENT_ID &&
      config.GA_OAUTH_CLIENT_SECRET &&
      config.GA_OAUTH_REFRESH_TOKEN
  );

  return hasServiceAccount || hasOAuthCredentials;
}

export function hasGA4(): boolean {
  return hasGA4Config(integrationsEnv);
}



