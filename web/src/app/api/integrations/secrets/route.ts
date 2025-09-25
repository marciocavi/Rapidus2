import { NextRequest, NextResponse } from 'next/server';
import { loadSecrets, saveSecretsLocal } from '@/integrations/secrets';

export async function GET() {
  const data = loadSecrets();
  // Nunca retornar valores completos: só flags de presença
  const safe = Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, Boolean(v)])
  );
  return NextResponse.json({ present: safe, mode: process.env.NODE_ENV });
}

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'disabled_in_production' }, { status: 403 });
  }
  try {
    const body = (await req.json()) as Record<string, string | undefined>;
    const current = loadSecrets();
    const merged = { ...current, ...body };
    saveSecretsLocal(merged);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'save_failed' }, { status: 400 });
  }
}



