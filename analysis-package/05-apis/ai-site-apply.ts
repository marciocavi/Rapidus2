import { NextRequest, NextResponse } from 'next/server';
import { SitePlanSchema } from '@/ai/schemas/SitePlan.schema';
import { assertAssistantEnabled } from '@/config/featureFlags';

export async function POST(req: NextRequest) {
  try {
    assertAssistantEnabled();

    const body = await req.json().catch(() => undefined);
    if (!body) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });

    // Aceita { plan } ou o plano direto
    const candidate = body?.plan ?? body;
    const plan = SitePlanSchema.parse(candidate);

    if (process.env.ALLOW_ADMIN_WRITE !== 'true') {
      return NextResponse.json(
        { applied: false, message: 'Server write disabled (set ALLOW_ADMIN_WRITE=true). Preview only.' },
        { status: 403 }
      );
    }

    const fs = await import('fs/promises');
    const path = await import('path');
    const dir = path.join(process.cwd(), 'data');
    const file = path.join(dir, 'site-plan.json');
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(file, JSON.stringify(plan, null, 2), 'utf-8');

    return NextResponse.json({ applied: true, file: 'data/site-plan.json' });
  } catch (e: any) {
    const status = e?.statusCode ?? 400;
    return NextResponse.json({ error: e?.message ?? 'apply failed' }, { status });
  }
}



