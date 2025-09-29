import { NextResponse } from 'next/server';
import { integrations, type IntegrationsFacade } from '@/integrations';
import { loadSecrets, type StoredSecrets } from '@/integrations/secrets';

// Combina segredos e env vars para determinar a disponibilidade
function computeIntegrationsStatus(secrets: StoredSecrets) {
  const ga4FromSecrets = Boolean(
    secrets.GA4_PROPERTY_ID &&
      ((secrets.GA4_SA_EMAIL && secrets.GA4_SA_KEY_BASE64) ||
        (secrets.GA4_CLIENT_ID && secrets.GA4_CLIENT_SECRET && secrets.GA4_REFRESH_TOKEN)),
  );
  const ga4Present = Boolean(integrations.has.ga4 || ga4FromSecrets);
  const openaiPresent = Boolean(integrations.has.openai || secrets.OPENAI_API_KEY);

  return {
    ga4: ga4Present,
    openai: openaiPresent,
  } as const;
}

export async function GET() {
  // Não expõe segredos; apenas flags de disponibilidade
  const secrets = loadSecrets();
  const status = computeIntegrationsStatus(secrets);
  return NextResponse.json(status);
}


