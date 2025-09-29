import { describe, expect, it } from 'vitest';

import { hasGA4Config } from './env';

describe('hasGA4Config', () => {
  it('returns false when GA4 property id is missing', () => {
    expect(
      hasGA4Config({
        GOOGLE_APPLICATION_CREDENTIALS_JSON: '{}',
      })
    ).toBe(false);
  });

  it('returns false when property id exists without credentials', () => {
    expect(
      hasGA4Config({
        GA4_PROPERTY_ID: 'prop',
      })
    ).toBe(false);
  });

  it('returns true when service account credentials are present', () => {
    expect(
      hasGA4Config({
        GA4_PROPERTY_ID: 'prop',
        GOOGLE_APPLICATION_CREDENTIALS_JSON: '{"type":"service_account"}',
      })
    ).toBe(true);
  });

  it('returns true when OAuth credentials are present', () => {
    expect(
      hasGA4Config({
        GA4_PROPERTY_ID: 'prop',
        GA_OAUTH_CLIENT_ID: 'client',
        GA_OAUTH_CLIENT_SECRET: 'secret',
        GA_OAUTH_REFRESH_TOKEN: 'refresh',
      })
    ).toBe(true);
  });
});
