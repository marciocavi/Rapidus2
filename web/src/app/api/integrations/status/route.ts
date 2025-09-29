import { NextResponse } from 'next/server';
import { integrations, type IntegrationsFacade } from '@/integrations';
import { hasGA4Config, type IntegrationsEnv } from '@/integrations/env';
import { loadSecrets, type StoredSecrets } from '@/integrations/secrets';

type ComputeIntegrationsStatusInput = {
  env: IntegrationsEnv;
  has: IntegrationsFacade['has'];
  secrets: StoredSecrets;
};

export function computeIntegrationsStatus({
  env,
  has,
  secrets,
}: ComputeIntegrationsStatusInput) {
  const combinedGa4Config = {
    GA4_PROPERTY_ID: secrets.GA4_PROPERTY_ID ?? env.GA4_PROPERTY_ID,
    GOOGLE_APPLICATION_CREDENTIALS_JSON:
      secrets.GOOGLE_APPLICATION_CREDENTIALS_JSON ??
      env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
    GA_OAUTH_CLIENT_ID: secrets.GA_OAUTH_CLIENT_ID ?? env.GA_OAUTH_CLIENT_ID,
    GA_OAUTH_CLIENT_SECRET:
      secrets.GA_OAUTH_CLIENT_SECRET ?? env.GA_OAUTH_CLIENT_SECRET,
    GA_OAUTH_REFRESH_TOKEN:
      secrets.GA_OAUTH_REFRESH_TOKEN ?? env.GA_OAUTH_REFRESH_TOKEN,
  } satisfies Parameters<typeof hasGA4Config>[0];

  const ga4Present = hasGA4Config(combinedGa4Config);
  const openaiPresent = Boolean(has.openai || secrets.OPENAI_API_KEY);

  return {
    ga4: ga4Present,
    openai: openaiPresent,
  } as const;
}

export async function GET() {
  // Não expõe segredos; apenas flags de disponibilidade
  const secrets = loadSecrets();
  const status = computeIntegrationsStatus({
    env: integrations.env,
    has: integrations.has,
    secrets,
  });

  return NextResponse.json(status);
}


