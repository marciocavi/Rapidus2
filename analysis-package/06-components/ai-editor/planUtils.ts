import { z } from 'zod';

export type Section = {
  componentKey: string;
  props?: Record<string, any>;
  order: number;
};

export type Plan = {
  layout: {
    sections: Section[];
    theme?: { useDark?: boolean; tokensRef?: string };
    ctas?: Array<{ text: string; href: string }>
  }
};

export function getSections(plan: Plan): Section[] {
  return Array.isArray(plan?.layout?.sections) ? [...plan.layout.sections] : [];
}

export function setSections(plan: Plan, sections: Section[]): Plan {
  return {
    ...plan,
    layout: {
      ...plan.layout,
      sections: sections.map((s, idx) => ({ ...s, order: idx }))
    }
  };
}

export function moveSection(sections: Section[], from: number, to: number): Section[] {
  const next = [...sections];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next.map((s, idx) => ({ ...s, order: idx }));
}

export function addSection(sections: Section[], newSection: Section, at?: number): Section[] {
  const next = [...sections];
  const index = typeof at === 'number' ? Math.max(0, Math.min(at, next.length)) : next.length;
  next.splice(index, 0, { ...newSection, order: index });
  return next.map((s, idx) => ({ ...s, order: idx }));
}

export function updateSectionProps(sections: Section[], idx: number, patch: Record<string, any>): Section[] {
  const next = [...sections];
  const current = next[idx] || { componentKey: 'Unknown', order: idx };
  next[idx] = { ...current, props: { ...(current.props || {}), ...patch }, order: idx };
  return next;
}

export function serializePlan(plan: Plan): string {
  return JSON.stringify(plan, null, 2);
}

export const heroPropsSchema = z.object({
  title: z.string().min(1, 'Título obrigatório').optional(),
  subtitle: z.string().optional()
});

export const featuresGridPropsSchema = z.object({
  items: z.coerce.number().int().min(1).max(12).optional()
});

// ---------- Enriquecimento cliente (sem tocar no backend) ----------
function hasSection(sections: Section[], key: string): boolean {
  return sections.some(s => s.componentKey === key);
}

export function expandPlanFromContext(plan: Plan, ctx: { prompt?: string; palette?: { primary?: string; secondary?: string } | null; componentsMap?: Record<string, any> }): Plan {
  const current = getSections(plan);
  const map = ctx.componentsMap || {};
  const next: Section[] = [...current];

  // Helpers
  const findKey = (candidates: string[]) => candidates.find(k => map[k]);

  // Ordem sugerida abrangente (será filtrada pelos existentes no components-map)
  const orderKeys = [
    'Header', 'HeaderBar',
    'HeroBanner',
    'FeaturesGrid',
    'ServicesList', 'Services',
    'Carousel',
    'PartnersMarquee', 'Partners',
    'InstagramFeed', 'InstagramLinks', 'Instagram',
    'BlogList', 'BlogPosts', 'Blog',
    'Testimonials',
    'StatsGrid', 'Stats',
    'CTASection', 'CTA',
    'ContactForm',
    'Footer', 'FooterBar',
    'AdvancedSection'
  ];

  // Hero: ajusta título/subtítulo com base no prompt
  if (findKey(['HeroBanner']) && !hasSection(next, 'HeroBanner')) {
    const heroTitle = (ctx.prompt || '').slice(0, 60) || 'Bem-vindo';
    next.push({ componentKey: 'HeroBanner', props: { title: heroTitle }, order: next.length });
  }

  // FeaturesGrid padrão com 3 itens
  if (findKey(['FeaturesGrid']) && !hasSection(next, 'FeaturesGrid')) {
    next.push({ componentKey: 'FeaturesGrid', props: { items: 3 }, order: next.length });
  }

  // Carousel (ex.: logos ou destaques)
  if (findKey(['Carousel']) && !hasSection(next, 'Carousel')) {
    next.push({ componentKey: 'Carousel', props: { items: 5 }, order: next.length });
  }

  // Testimonials
  if (findKey(['Testimonials']) && !hasSection(next, 'Testimonials')) {
    next.push({ componentKey: 'Testimonials', props: { items: 3 }, order: next.length });
  }

  // ContactForm
  if (findKey(['ContactForm']) && !hasSection(next, 'ContactForm')) {
    next.push({ componentKey: 'ContactForm', props: { title: 'Fale Conosco' }, order: next.length });
  }

  // Services
  if (findKey(['ServicesList', 'Services']) && !hasSection(next, 'ServicesList') && !hasSection(next, 'Services')) {
    next.push({ componentKey: findKey(['ServicesList', 'Services']) as string, props: { items: 4 }, order: next.length });
  }

  // Partners
  if (findKey(['PartnersMarquee', 'Partners']) && !hasSection(next, 'PartnersMarquee') && !hasSection(next, 'Partners')) {
    next.push({ componentKey: findKey(['PartnersMarquee', 'Partners']) as string, props: { logos: 6 }, order: next.length });
  }

  // Instagram
  if (findKey(['InstagramFeed', 'InstagramLinks', 'Instagram']) && !hasSection(next, 'InstagramFeed') && !hasSection(next, 'InstagramLinks') && !hasSection(next, 'Instagram')) {
    next.push({ componentKey: findKey(['InstagramFeed', 'InstagramLinks', 'Instagram']) as string, props: { items: 6 }, order: next.length });
  }

  // Blog
  if (findKey(['BlogList', 'BlogPosts', 'Blog']) && !hasSection(next, 'BlogList') && !hasSection(next, 'BlogPosts') && !hasSection(next, 'Blog')) {
    next.push({ componentKey: findKey(['BlogList', 'BlogPosts', 'Blog']) as string, props: { items: 3 }, order: next.length });
  }

  // Stats
  if (findKey(['StatsGrid', 'Stats']) && !hasSection(next, 'StatsGrid') && !hasSection(next, 'Stats')) {
    next.push({ componentKey: findKey(['StatsGrid', 'Stats']) as string, props: { items: 4 }, order: next.length });
  }

  // CTA
  if (findKey(['CTASection', 'CTA']) && !hasSection(next, 'CTASection') && !hasSection(next, 'CTA')) {
    next.push({ componentKey: findKey(['CTASection', 'CTA']) as string, props: { title: 'Vamos conversar?', ctaText: 'Fale conosco', href: '/#contato' }, order: next.length });
  }

  // Header
  if (findKey(['Header', 'HeaderBar']) && !hasSection(next, 'Header') && !hasSection(next, 'HeaderBar')) {
    next.push({ componentKey: findKey(['Header', 'HeaderBar']) as string, props: {}, order: next.length });
  }

  // Footer
  if (findKey(['Footer', 'FooterBar']) && !hasSection(next, 'Footer') && !hasSection(next, 'FooterBar')) {
    next.push({ componentKey: findKey(['Footer', 'FooterBar']) as string, props: {}, order: next.length });
  }

  // Reordena conforme a ordem sugerida
  next.sort((a, b) => orderKeys.indexOf(a.componentKey) - orderKeys.indexOf(b.componentKey));
  return setSections(plan, next);
}


