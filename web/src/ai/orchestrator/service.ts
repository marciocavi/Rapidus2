import { SitePlanSchema, type SitePlan } from '@/ai/schemas/SitePlan.schema';
import { featureFlags } from '@/config/featureFlags';
import { moderateText } from '@/ai/moderation/content';
import { generateCopy } from '@/ai/providers/openaiText';

export type GenerateInput = {
  prompt?: string;
  seedPlan?: Partial<SitePlan>;
};

/**
 * Gera (ou completa) um SitePlan de forma determinística no modo dry‑run.
 * Em produção, este serviço orquestrará múltiplos adapters (texto, imagens, etc.).
 */
export async function generateSitePlan(input: GenerateInput = {}): Promise<SitePlan> {
  const base: SitePlan = {
    layout: {
      sections: [
        { componentKey: 'HeroBanner', props: { title: 'Bem-vindo' }, order: 0 },
        { componentKey: 'FeaturesGrid', props: { items: 3 }, order: 1 },
      ],
      theme: { useDark: true, tokensRef: 'default' },
      ctas: [{ text: 'Saiba mais', href: '/' }],
    },
  };

  const draft: SitePlan = {
    ...base,
    ...(input.seedPlan ?? {}),
  } as SitePlan;

  const prompt = input.prompt?.slice(0, 500) ?? 'Gere um plano de site com herói e grid de features.';
  await moderateText(prompt);

  // Usa adapter de texto para sintetizar pequenos trechos de cópia
  const heroTitle = await generateCopy({ prompt: `Título curto de herói. Contexto: ${prompt}` });
  if (draft.layout && draft.layout.sections?.[0]?.componentKey === 'HeroBanner') {
    // Ajuste da cópia apenas quando disponível
    (draft.layout.sections[0] as any).props = {
      ...(draft.layout.sections[0] as any).props,
      title: heroTitle || 'Bem-vindo',
    };
  }

  // Validação final com Zod
  const parsed = SitePlanSchema.parse(draft);
  // Se não estiver em dry-run, já retornamos o plano com cópia vinda do provider
  return parsed;
}


