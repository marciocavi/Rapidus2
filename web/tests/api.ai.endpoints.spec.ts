import { describe, it, expect, vi } from 'vitest';
import { GET as GET_plan, POST as POST_plan } from '@/app/api/ai/site/plan/route';
import { GET as GET_components } from '@/app/api/ai/site/components-map/route';
import { NextRequest } from 'next/server';

vi.mock('@/config/featureFlags', () => ({
  featureFlags: {
    AI_DRY_RUN: true,
    AI_ASSISTANT_ENABLED: true,
  },
  assertAssistantEnabled: () => {},
}));

describe('AI endpoints (dry-run)', () => {
  it('GET /api/ai/site/plan deve responder 200 e conter layout', async () => {
    const res = await GET_plan();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('plan.layout.sections');
    expect(typeof json.dryRun).toBe('boolean');
  });

  it('POST /api/ai/site/plan valida e retorna shape válido', async () => {
    const body = {
      layout: {
        sections: [{ componentKey: 'HeroBanner', props: {}, order: 0 }],
        theme: { useDark: true, tokensRef: 'default' },
        ctas: [{ text: 'OK', href: '/' }],
      },
    };
    const req = new NextRequest('http://localhost', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const res = await POST_plan(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(typeof json.dryRun).toBe('boolean');
    expect(json).toHaveProperty('plan.layout.sections');
  });

  it('GET /api/ai/site/components-map deve responder 200 e conter components', async () => {
    const res = await GET_components();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('components');
  });
});


