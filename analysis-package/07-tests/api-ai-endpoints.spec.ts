import { describe, it, expect } from 'vitest';

// Esses testes são brandos: apenas verificam que os endpoints respondem 200
// quando as flags estão habilitadas e que retornam o formato básico esperado.

const base = process.env.TEST_BASE_URL ?? 'http://localhost:3000';
const isReal = String(process.env.AI_DRY_RUN).toLowerCase() === 'false';
const WAIT = isReal ? 20000 : 5000;

describe('AI endpoints (dry-run)', () => {
  it('GET /api/ai/site/plan deve responder 200 e conter layout', async () => {
    const res = await fetch(`${base}/api/ai/site/plan`);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('plan.layout.sections');
    expect(typeof json.dryRun).toBe('boolean');
  }, WAIT);

  it('POST /api/ai/site/plan valida e retorna shape válido', async () => {
    const body = {
      layout: {
        sections: [{ componentKey: 'HeroBanner', props: {}, order: 0 }],
        theme: { useDark: true, tokensRef: 'default' },
        ctas: [{ text: 'OK', href: '/' }],
      },
    };
    const res = await fetch(`${base}/api/ai/site/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(typeof json.dryRun).toBe('boolean');
    expect(json).toHaveProperty('plan.layout.sections');
  }, WAIT);

  it('GET /api/ai/site/components-map deve responder 200 e conter components', async () => {
    const res = await fetch(`${base}/api/ai/site/components-map`);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('components');
  }, WAIT);
});


