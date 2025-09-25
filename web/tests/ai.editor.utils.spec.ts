import { describe, it, expect } from 'vitest';
import { addSection, moveSection, getSections, setSections, updateSectionProps } from '../src/components/ai-editor/planUtils';

describe('ai-editor utils', () => {
  const basePlan = { layout: { sections: [] } } as any;

  it('add and move sections', () => {
    const s1 = { componentKey: 'HeroBanner', order: 0 } as any;
    const s2 = { componentKey: 'FeaturesGrid', order: 1 } as any;
    const added = addSection([], s1);
    const added2 = addSection(added, s2);
    expect(added2[0].componentKey).toBe('HeroBanner');
    expect(added2[1].componentKey).toBe('FeaturesGrid');
    const moved = moveSection(added2, 1, 0);
    expect(moved[0].componentKey).toBe('FeaturesGrid');
  });

  it('update props', () => {
    const list = addSection([], { componentKey: 'HeroBanner', order: 0 } as any);
    const patched = updateSectionProps(list, 0, { title: 'Olá' });
    expect(patched[0].props?.title).toBe('Olá');
  });

  it('set/get sections roundtrip', () => {
    const list = addSection([], { componentKey: 'HeroBanner', order: 0 } as any);
    const p = setSections(basePlan, list);
    const round = getSections(p as any);
    expect(round.length).toBe(1);
  });
});


