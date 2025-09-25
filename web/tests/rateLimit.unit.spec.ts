import { describe, it, expect } from 'vitest';
import { rateLimit } from '../src/lib/analytics/cache';

describe('rateLimit util', () => {
  it('bloqueia na 11ª chamada dentro de 60s', () => {
    const key = 'test:ratelimit';
    let allowed = true;
    for (let i = 0; i < 10; i++) {
      allowed = rateLimit(key, 10, 60_000);
      expect(allowed).toBe(true);
    }
    allowed = rateLimit(key, 10, 60_000);
    expect(allowed).toBe(false);
  });
});


