import { NextResponse } from 'next/server';
import { integrations } from '@/integrations';
import { loadSecrets } from '@/integrations/secrets';

export async function GET() {
  // Não expõe segredos; apenas flags de disponibilidade
  const secrets = loadSecrets();
  const ga4FromSecrets = Boolean(
    secrets.GA4_PROPERTY_ID &&
      ((secrets.GA4_SA_EMAIL && secrets.GA4_SA_KEY_BASE64) ||
        (secrets.GA4_CLIENT_ID && secrets.GA4_CLIENT_SECRET && secrets.GA4_REFRESH_TOKEN))
  );
  const ga4Present = Boolean(integrations.has.ga4 || ga4FromSecrets);
  const openaiPresent = Boolean(
    integrations.has.openai || secrets.OPENAI_API_KEY
  );

  return NextResponse.json({
    ga4: ga4Present,
    openai: openaiPresent,
  });
}


