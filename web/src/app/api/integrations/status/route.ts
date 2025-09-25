import { NextResponse } from 'next/server';
import { integrations } from '@/integrations';
import { loadSecrets } from '@/integrations/secrets';

export async function GET() {
  // Não expõe segredos; apenas flags de disponibilidade
  const secrets = loadSecrets();
  const ga4Present = Boolean(
    integrations.has.ga4 || secrets.GA4_PROPERTY_ID
  );
  const openaiPresent = Boolean(
    integrations.has.openai || secrets.OPENAI_API_KEY
  );

  return NextResponse.json({
    ga4: ga4Present,
    openai: openaiPresent,
  });
}


