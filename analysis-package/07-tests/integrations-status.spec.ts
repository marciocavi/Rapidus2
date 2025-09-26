import { describe, it, expect } from 'vitest';

const base = process.env.TEST_BASE_URL ?? 'http://localhost:3000';
const WAIT = 10000;

describe('Integrations status', () => {
  it('GET /api/integrations/status retorna flags', async () => {
    const res = await fetch(`${base}/api/integrations/status`, { method: 'GET' });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('ga4');
    expect(json).toHaveProperty('openai');
    // não deve retornar segredos
    expect(Object.keys(json)).toEqual(['ga4', 'openai']);
  }, WAIT);
});


