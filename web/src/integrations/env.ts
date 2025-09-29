import { z } from 'zod';

// Schema de variáveis de ambiente das integrações (somente server)
const EnvSchema = z.object({
  // IA
  OPENAI_API_KEY: z.string().min(1).optional(),
  AI_ASSISTANT_ENABLED: z.enum(['true', 'false']).optional(),
  AI_DRY_RUN: z.enum(['true', 'false']).optional(),

  // Analytics (GA4)
  GA4_PROPERTY_ID: z.string().optional(),
  GA4_SA_EMAIL: z.string().optional(),
  GA4_SA_KEY_BASE64: z.string().optional(),
  GA4_CLIENT_ID: z.string().optional(),
  GA4_CLIENT_SECRET: z.string().optional(),
  GA4_REFRESH_TOKEN: z.string().optional(),

  // Suporte legados
  GOOGLE_APPLICATION_CREDENTIALS_JSON: z.string().optional(),
  GA_OAUTH_CLIENT_ID: z.string().optional(),
  GA_OAUTH_CLIENT_SECRET: z.string().optional(),
  GA_OAUTH_REFRESH_TOKEN: z.string().optional(),
});

type RawIntegrationsEnv = z.infer<typeof EnvSchema>;

export type IntegrationsEnv = {
  OPENAI_API_KEY?: string;
  AI_ASSISTANT_ENABLED?: 'true' | 'false';
  AI_DRY_RUN?: 'true' | 'false';
  GA4_PROPERTY_ID?: string;
  GA4_SA_EMAIL?: string;
  GA4_SA_KEY_BASE64?: string;
  GA4_CLIENT_ID?: string;
  GA4_CLIENT_SECRET?: string;
  GA4_REFRESH_TOKEN?: string;
};

type ServiceAccountInfo = {
  email?: string;
  keyBase64?: string;
};

function parseServiceAccount(input?: string): ServiceAccountInfo {
  const value = input?.trim();
  if (!value) return {};

  const fromJson = (jsonStr: string): ServiceAccountInfo | null => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        return {
          email:
            typeof (parsed as { client_email?: unknown }).client_email === 'string'
              ? (parsed as { client_email?: string }).client_email
              : undefined,
          keyBase64: Buffer.from(jsonStr, 'utf8').toString('base64'),
        };
      }
    } catch {
      // ignore
    }
    return null;
  };

  if (value.startsWith('{')) {
    const info = fromJson(value);
    if (info) return info;
  }

  try {
    const decoded = Buffer.from(value, 'base64').toString('utf8');
    const info = fromJson(decoded);
    if (info) {
      return {
        email: info.email,
        keyBase64: Buffer.from(decoded, 'utf8').toString('base64'),
      };
    }
    if (decoded) {
      return { keyBase64: value };
    }
  } catch {
    // ignore
  }

  return { keyBase64: Buffer.from(value, 'utf8').toString('base64') };
}

function normalizeEnv(env: RawIntegrationsEnv): IntegrationsEnv {
  const saFromNew = parseServiceAccount(env.GA4_SA_KEY_BASE64);
  const saFromLegacy = parseServiceAccount(env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

  return {
    OPENAI_API_KEY: env.OPENAI_API_KEY?.trim() || undefined,
    AI_ASSISTANT_ENABLED: env.AI_ASSISTANT_ENABLED,
    AI_DRY_RUN: env.AI_DRY_RUN,
    GA4_PROPERTY_ID: env.GA4_PROPERTY_ID?.trim() || undefined,
    GA4_SA_EMAIL: env.GA4_SA_EMAIL?.trim() || saFromNew.email || saFromLegacy.email,
    GA4_SA_KEY_BASE64: saFromNew.keyBase64 || saFromLegacy.keyBase64,
    GA4_CLIENT_ID: env.GA4_CLIENT_ID?.trim() || env.GA_OAUTH_CLIENT_ID?.trim() || undefined,
    GA4_CLIENT_SECRET: env.GA4_CLIENT_SECRET?.trim() || env.GA_OAUTH_CLIENT_SECRET?.trim() || undefined,
    GA4_REFRESH_TOKEN: env.GA4_REFRESH_TOKEN?.trim() || env.GA_OAUTH_REFRESH_TOKEN?.trim() || undefined,
  };
}

function readEnv(): IntegrationsEnv {
  // Usa apenas process.env (server). Não exporte para cliente.
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    // Não lança erro duro — módulo é opt-in; logs ajudam diagnóstico.
    // eslint-disable-next-line no-console
    console.warn('[integrations/env] variáveis ausentes ou inválidas', parsed.error?.errors);
    return {} as IntegrationsEnv;
  }
  return normalizeEnv(parsed.data);
}

export const integrationsEnv = readEnv();

export function hasOpenAI(): boolean {
  return Boolean(integrationsEnv.OPENAI_API_KEY);
}

export type GA4ConfigInput = Partial<
  Pick<
    IntegrationsEnv,
    | 'GA4_PROPERTY_ID'
    | 'GA4_SA_EMAIL'
    | 'GA4_SA_KEY_BASE64'
    | 'GA4_CLIENT_ID'
    | 'GA4_CLIENT_SECRET'
    | 'GA4_REFRESH_TOKEN'
  >
>;

export function hasGA4Config(config: GA4ConfigInput): boolean {
  if (!config.GA4_PROPERTY_ID) {
    return false;
  }

  const hasServiceAccount = Boolean(config.GA4_SA_EMAIL && config.GA4_SA_KEY_BASE64);
  const hasOAuth = Boolean(
    config.GA4_CLIENT_ID && config.GA4_CLIENT_SECRET && config.GA4_REFRESH_TOKEN,
  );

  return hasServiceAccount || hasOAuth;
}

export function hasGA4(): boolean {
  return hasGA4Config(integrationsEnv);
}
