import './server-only';
import { integrationsEnv, hasGA4, hasOpenAI } from './env';

export const integrations = {
  env: integrationsEnv,
  has: {
    ga4: hasGA4(),
    openai: hasOpenAI(),
  },
  // Pontos de entrada futuros; hoje apenas anunciam disponibilidade
  analytics: {
    enabled: () => hasGA4(),
  },
  ai: {
    textEnabled: () => hasOpenAI(),
  },
} as const;

export type IntegrationsFacade = typeof integrations;



