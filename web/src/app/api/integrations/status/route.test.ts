import { describe, expect, it } from 'vitest';

import type { IntegrationsEnv } from '../../../../integrations/env';
import type { StoredSecrets } from '../../../../integrations/secrets';

import { computeIntegrationsStatus } from './route';

describe('computeIntegrationsStatus', () => {
  const baseEnv: IntegrationsEnv = {};
  const baseHas = { ga4: false, openai: false } as const;
  const baseSecrets: StoredSecrets = {};

  it('returns ga4=false when property id lacks credentials', () => {
    const result = computeIntegrationsStatus({
      env: baseEnv,
      has: baseHas,
      secrets: { ...baseSecrets, GA4_PROPERTY_ID: 'prop' },
    });

    expect(result.ga4).toBe(false);
  });

  it('returns ga4=true when service account credentials exist', () => {
    const result = computeIntegrationsStatus({
      env: baseEnv,
      has: baseHas,
      secrets: {
        ...baseSecrets,
        GA4_PROPERTY_ID: 'prop',
        GOOGLE_APPLICATION_CREDENTIALS_JSON: '{"type":"service_account"}',
      },
    });

    expect(result.ga4).toBe(true);
  });

  it('merges env + secrets credentials for OAuth flow', () => {
    const result = computeIntegrationsStatus({
      env: {
        ...baseEnv,
        GA4_PROPERTY_ID: 'env-prop',
        GA_OAUTH_CLIENT_SECRET: 'secret',
      },
      has: baseHas,
      secrets: {
        ...baseSecrets,
        GA_OAUTH_CLIENT_ID: 'client',
        GA_OAUTH_REFRESH_TOKEN: 'refresh',
      },
    });

    expect(result.ga4).toBe(true);
  });

  it('considers OpenAI availability from has/openai or secrets', () => {
    const fromHas = computeIntegrationsStatus({
      env: baseEnv,
      has: { ...baseHas, openai: true },
      secrets: baseSecrets,
    });
    expect(fromHas.openai).toBe(true);

    const fromSecrets = computeIntegrationsStatus({
      env: baseEnv,
      has: baseHas,
      secrets: { ...baseSecrets, OPENAI_API_KEY: 'sk-xxx' },
    });
    expect(fromSecrets.openai).toBe(true);
  });
});
