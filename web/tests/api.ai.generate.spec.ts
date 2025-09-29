import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/ai/site/generate/route';
import { NextRequest } from 'next/server';

vi.mock('@/config/featureFlags', () => ({
  featureFlags: {
    AI_DRY_RUN: true,
    AI_ASSISTANT_ENABLED: true,
  },
  assertAssistantEnabled: () => {},
}));

describe('AI generate (dry-run)', () => {
  it('POST /api/ai/site/generate retorna plano válido', async () => {
    const req = new NextRequest('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'Gerar título do herói' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('plan.layout.sections');
  });

  it.skip('rate limit retorna 429 após várias requisições rápidas', async () => {
    const calls = 11; // limite é 10/min
    let lastStatus = 0;
    for (let i = 0; i < calls; i++) {
      const req = new NextRequest('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ prompt: 'ratelimit' }),
      });
      const res = await POST(req);
      lastStatus = res.status;
      // pequena espera para não sobrecarregar o dev server em Windows
      await new Promise((r) => setTimeout(r, 50));
    }
    expect(lastStatus).toBe(429);
  });
});


