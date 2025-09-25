import { describe, it, expect } from 'vitest';

const base = process.env.TEST_BASE_URL ?? 'http://localhost:3000';

describe('AI generate (dry-run)', () => {
  it('POST /api/ai/site/generate retorna plano válido', async () => {
    const res = await fetch(`${base}/api/ai/site/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Gerar título do herói' }),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('plan.layout.sections');
  });

  it.skip('rate limit retorna 429 após várias requisições rápidas', async () => {
    const calls = 11; // limite é 10/min
    let lastStatus = 0;
    for (let i = 0; i < calls; i++) {
      const res = await fetch(`${base}/api/ai/site/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'ratelimit' }),
      });
      lastStatus = res.status;
      // pequena espera para não sobrecarregar o dev server em Windows
      await new Promise((r) => setTimeout(r, 50));
    }
    expect(lastStatus).toBe(429);
  });
});


