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

export function hasGA4(): boolean {
  return Boolean(
    integrationsEnv.GA4_PROPERTY_ID &&
      (integrationsEnv.GOOGLE_APPLICATION_CREDENTIALS_JSON ||
        (integrationsEnv.GA_OAUTH_CLIENT_ID && integrationsEnv.GA_OAUTH_CLIENT_SECRET && integrationsEnv.GA_OAUTH_REFRESH_TOKEN))
  );
}



