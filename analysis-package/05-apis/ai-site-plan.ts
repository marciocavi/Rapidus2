import { NextRequest, NextResponse } from 'next/server';
import { SitePlanSchema } from '@/ai/schemas/SitePlan.schema';
import { featureFlags, assertAssistantEnabled } from '@/config/featureFlags';

export async function GET() {
  try {
    assertAssistantEnabled();
    // mock simples
    const mock = {
      layout: {
        sections: [
          { componentKey: 'HeroBanner', props: { title: 'Bem-vindo' }, order: 0 },
          { componentKey: 'FeaturesGrid', props: { items: 3 }, order: 1 },
        ],
        theme: { useDark: true, tokensRef: 'default' },
        ctas: [{ text: 'Saiba mais', href: '/' }],
      },
    };
    const parsed = SitePlanSchema.parse(mock);
    return NextResponse.json({ dryRun: featureFlags.AI_DRY_RUN, plan: parsed });
  } catch (e: any) {
    const status = e?.statusCode ?? 400;
    return NextResponse.json({ error: e?.message ?? 'invalid' }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    assertAssistantEnabled();
    const body = await req.json().catch(() => undefined);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const parsed = SitePlanSchema.parse(body);
    return NextResponse.json({
      dryRun: featureFlags.AI_DRY_RUN,
      applied: false,
      plan: parsed,
    });
  } catch (e: any) {
    const status = e?.statusCode ?? 400;
    return NextResponse.json({ error: e?.message ?? 'invalid' }, { status });
  }
}


