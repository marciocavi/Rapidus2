import { NextRequest, NextResponse } from 'next/server';
import { assertAssistantEnabled } from '@/config/featureFlags';
import { generateSitePlan } from '@/ai/orchestrator/service';
import { buildCacheKey, cacheGet, cacheSet, rateLimit } from '@/lib/analytics/cache';

export async function POST(req: NextRequest) {
  try {
    assertAssistantEnabled();
    const startedAt = Date.now();
    const reqId = `${startedAt.toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const body = await req.json().catch(() => ({}));

    // Rate limit por IP e rota
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    const rlKey = `ai:generate:${ip}`;
    const allowed = rateLimit(rlKey, 10, 60_000); // 10 req/min por IP
    if (!allowed) {
      console.warn(JSON.stringify({ event: 'ai_generate', reqId, ip, status: 429, reason: 'rate_limited' }));
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
    }

    // Cache curto (30s) pelo corpo do pedido
    const cacheKey = buildCacheKey(['ai:generate', body?.prompt ?? '', JSON.stringify(body?.seedPlan ?? {})]);
    const cached = cacheGet<{ plan: unknown }>(cacheKey);
    if (cached) {
      const tookMs = Date.now() - startedAt;
      console.info(JSON.stringify({ event: 'ai_generate', reqId, ip, status: 200, cached: true, tookMs }));
      return NextResponse.json({ ...cached, cached: true, tookMs });
    }

    const plan = await generateSitePlan({ prompt: body?.prompt, seedPlan: body?.seedPlan });
    const response = { plan } as const;
    cacheSet(cacheKey, response, 30_000);
    const tookMs = Date.now() - startedAt;
    console.info(JSON.stringify({ event: 'ai_generate', reqId, ip, status: 200, cached: false, tookMs }));
    return NextResponse.json({ ...response, cached: false, tookMs });
  } catch (e: any) {
    const status = e?.statusCode ?? 400;
    const msg = e?.message ?? 'generation_failed';
    console.warn(JSON.stringify({ event: 'ai_generate', status, error: msg }));
    return NextResponse.json({ error: msg }, { status });
  }
}


