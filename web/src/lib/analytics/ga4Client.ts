import { z } from 'zod';

const EnvSchema = z.object({
  FEATURE_ANALYTICS_DASHBOARD: z.string().optional(),
  ANALYTICS_USE_FIXTURE: z.string().optional(),
  GA4_PROPERTY_ID: z.string().optional(),
  GA4_SA_EMAIL: z.string().optional(),
  GA4_SA_KEY_BASE64: z.string().optional(),
  GA4_CLIENT_ID: z.string().optional(),
  GA4_CLIENT_SECRET: z.string().optional(),
  GA4_REFRESH_TOKEN: z.string().optional(),
});

const env = EnvSchema.parse(process.env);

export type ReportParams = {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  metrics?: string[];
};

type GA4Row = { dimensionValues?: { value?: string }[]; metricValues?: { value?: string }[] };

function decodeServiceAccountKey(): string | null {
  if (!env.GA4_SA_KEY_BASE64) return null;
  try {
    return Buffer.from(env.GA4_SA_KEY_BASE64, 'base64').toString('utf8');
  } catch {
    return null;
  }
}

function dynamicImport(moduleName: string): Promise<any> {
  // Avoid static analysis from bundlers; resolves only at runtime
  // eslint-disable-next-line no-new-func
  const fn = new Function('m', 'return import(m)');
  return (fn as (m: string) => Promise<any>)(moduleName);
}

async function getClient(): Promise<any> {
  const { BetaAnalyticsDataClient } = await dynamicImport('@google-analytics/data');
  // Prefer service account if available
  const saKey = decodeServiceAccountKey();
  if (env.GA4_PROPERTY_ID && env.GA4_SA_EMAIL && saKey) {
    const { GoogleAuth } = await dynamicImport('google-auth-library');
    const auth = new GoogleAuth({
      credentials: {
        client_email: env.GA4_SA_EMAIL,
        private_key: JSON.parse(saKey).private_key || saKey,
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });
    return new BetaAnalyticsDataClient({ auth });
  }
  // OAuth fallback
  if (env.GA4_CLIENT_ID && env.GA4_CLIENT_SECRET && env.GA4_REFRESH_TOKEN) {
    const { OAuth2Client } = await dynamicImport('google-auth-library');
    const oauth2Client = new OAuth2Client(env.GA4_CLIENT_ID, env.GA4_CLIENT_SECRET);
    oauth2Client.setCredentials({ refresh_token: env.GA4_REFRESH_TOKEN });
    return new BetaAnalyticsDataClient({ auth: oauth2Client });
  }
  throw new Error('GA4 credentials not configured.');
}

export async function runReportHomepage(params: ReportParams) {
  if (!env.GA4_PROPERTY_ID) {
    throw new Error('GA4_PROPERTY_ID missing.');
  }

  const metrics = params.metrics ?? [
    'screenPageViews', // views
    'activeUsers',     // users (fallback to totalUsers)
    'sessions',
    'engagementRate',
    'averageSessionDuration',
    'eventCount',
  ];

  const client = await getClient();

  const [response] = await client.runReport({
    property: `properties/${env.GA4_PROPERTY_ID}`,
    dateRanges: [{ startDate: params.startDate, endDate: params.endDate }],
    dimensions: [
      { name: 'date' },
      { name: 'pageTitle' },
      { name: 'pagePath' },
      { name: 'sessionDefaultChannelGroup' },
      { name: 'eventName' },
    ],
    metrics: metrics.map((m) => ({ name: m })),
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: { value: '/', matchType: 'EXACT' },
      },
    },
  });

  const rows: GA4Row[] = response.rows ?? [];

  let views = 0, users = 0, sessions = 0, engagementRate: number | undefined, avgSec: number | undefined;
  const tsMap: Record<string, { v: number; u: number; s: number }> = {};
  const channelMap: Record<string, number> = {};
  const eventMap: Record<string, number> = {};

  const headers = (response.metricHeaders ?? []).map((h: any) => h.name as string);

  function getMetricIndex(name: string): number {
    const idx = headers.indexOf(name);
    if (idx >= 0) return idx;
    // fallback mapping
    if (name === 'activeUsers') return headers.indexOf('totalUsers');
    return -1;
  }

  const iViews = getMetricIndex('screenPageViews');
  const iUsers = getMetricIndex('activeUsers');
  const iSessions = getMetricIndex('sessions');
  const iEng = getMetricIndex('engagementRate');
  const iAvg = getMetricIndex('averageSessionDuration');
  const iEvent = getMetricIndex('eventCount');

  for (const row of rows) {
    const dVals = row.dimensionValues?.map((d) => d.value ?? '') ?? [];
    const mVals = row.metricValues?.map((m) => Number(m.value ?? 0)) ?? [];
    const [date, _title, path, channel, eventName] = dVals;

    const v = iViews >= 0 ? mVals[iViews] : 0;
    const u = iUsers >= 0 ? mVals[iUsers] : 0;
    const s = iSessions >= 0 ? mVals[iSessions] : 0;
    views += v; users += u; sessions += s;

    if (iEng >= 0) engagementRate = (engagementRate ?? 0) + mVals[iEng];
    if (iAvg >= 0) avgSec = (avgSec ?? 0) + mVals[iAvg];

    if (date) {
      const o = tsMap[date] || { v: 0, u: 0, s: 0 };
      o.v += v; o.u += u; o.s += s; tsMap[date] = o;
    }
    if (channel) {
      channelMap[channel] = (channelMap[channel] ?? 0) + s;
    }
    if (eventName && iEvent >= 0) {
      eventMap[eventName] = (eventMap[eventName] ?? 0) + mVals[iEvent];
    }
  }

  const timeSeries = Object.entries(tsMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, o]) => ({ date, views: o.v, users: o.u, sessions: o.s }));

  const topChannels = Object.entries(channelMap)
    .map(([channel, s]) => ({ channel, sessions: s }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 6);

  const topEvents = Object.entries(eventMap)
    .map(([eventName, eventCount]) => ({ eventName, eventCount }))
    .sort((a, b) => b.eventCount - a.eventCount)
    .slice(0, 8);

  const days = Math.max(1, timeSeries.length);
  const summary = {
    views,
    users,
    sessions,
    engagementRate: engagementRate !== undefined ? engagementRate / days : undefined,
    avgSessionDurationSec: avgSec !== undefined ? avgSec / days : undefined,
  };

  return { summary, timeSeries, topChannels, topEvents };
}


