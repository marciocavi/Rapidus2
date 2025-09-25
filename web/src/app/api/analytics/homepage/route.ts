import { NextRequest, NextResponse } from 'next/server';
import { QuerySchema, HomepageAnalyticsResponseSchema } from '@/lib/analytics/schemas';
import { cacheGet, cacheSet, buildCacheKey, rateLimit } from '@/lib/analytics/cache';

function isFeatureEnabled() {
  return process.env.FEATURE_ANALYTICS_DASHBOARD === 'true';
}

function isAuthenticated(req: NextRequest): boolean {
  // Simple check: session cookie set by our existing session API
  const cookie = req.cookies.get('session');
  return Boolean(cookie && cookie.value);
}

function resolveDateRange(range: string, start?: string, end?: string) {
  const toISO = (d: Date) => d.toISOString().slice(0, 10);
  const today = new Date();
  switch (range) {
    case '7d': {
      const from = new Date(today); from.setDate(from.getDate() - 6);
      return { startDate: toISO(from), endDate: toISO(today) };
    }
    case '28d': {
      const from = new Date(today); from.setDate(from.getDate() - 27);
      return { startDate: toISO(from), endDate: toISO(today) };
    }
    case '90d': {
      const from = new Date(today); from.setDate(from.getDate() - 89);
      return { startDate: toISO(from), endDate: toISO(today) };
    }
    case 'custom': {
      if (!start || !end) throw new Error('startDate and endDate are required for custom range');
      return { startDate: start, endDate: end };
    }
    default:
      return { startDate: toISO(today), endDate: toISO(today) };
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!isFeatureEnabled()) {
      return NextResponse.json({ error: 'Feature disabled' }, { status: 404 });
    }
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const input = QuerySchema.parse({
      range: searchParams.get('range') ?? undefined,
      startDate: searchParams.get('startDate') ?? undefined,
      endDate: searchParams.get('endDate') ?? undefined,
    });

    // Rate limit per IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!rateLimit(`ga4:${ip}`, 30, 5 * 60_000)) {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
    }

    const { startDate, endDate } = resolveDateRange(input.range, input.startDate, input.endDate);
    const cacheKey = buildCacheKey(['ga4-home', startDate, endDate]);
    const cached = cacheGet<any>(cacheKey);
    if (cached) {
      return NextResponse.json(cached, { status: 200 });
    }

    // Fixture shortcut for development
    if (process.env.ANALYTICS_USE_FIXTURE === 'true') {
      const { default: fixture } = await import('@/fixtures/analytics/homepage.sample.json');
      const parsed = HomepageAnalyticsResponseSchema.parse(fixture);
      cacheSet(cacheKey, parsed, 5 * 60_000);
      return NextResponse.json(parsed, { status: 200 });
    }

    // Import dinâmico apenas quando necessário (evita resolver libs não instaladas)
    const { runReportHomepage } = await import('@/lib/analytics/ga4Client');
    const data = await runReportHomepage({ startDate, endDate });
    const parsed = HomepageAnalyticsResponseSchema.parse(data);
    cacheSet(cacheKey, parsed, 5 * 60_000);
    return NextResponse.json(parsed, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Internal Error' }, { status: 500 });
  }
}


