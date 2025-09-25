// Tipagem e leitura centralizada de feature flags do Assistente IA
// Todas as flags têm valores padrão seguros (desabilitadas),
// exceto AI_DRY_RUN que fica true por padrão.

export type FeatureFlags = {
  AI_ASSISTANT_ENABLED: boolean;
  AI_IMAGE_EDIT_ENABLED: boolean;
  AI_DRY_RUN: boolean;
  WIZARD_IA_ONBOARDING: boolean;
};

function readBool(name: string, fallback: boolean, altNames: string[] = []): boolean {
  const keys = [name, ...altNames];
  for (const key of keys) {
    const v = process.env[key];
    if (v !== undefined) return v === 'true' || v === '1';
  }
  return fallback;
}

export const featureFlags: FeatureFlags = {
  AI_ASSISTANT_ENABLED: readBool('AI_ASSISTANT_ENABLED', false),
  AI_IMAGE_EDIT_ENABLED: readBool('AI_IMAGE_EDIT_ENABLED', false),
  AI_DRY_RUN: readBool('AI_DRY_RUN', true),
  WIZARD_IA_ONBOARDING: readBool('WIZARD_IA_ONBOARDING', false, ['NEXT_PUBLIC_WIZARD_IA_ONBOARDING']),
};

export function assertAssistantEnabled() {
  if (!featureFlags.AI_ASSISTANT_ENABLED) {
    const err = new Error('AI assistant feature disabled');
    // @ts-expect-error attach code for API layer
    err.statusCode = 404;
    throw err;
  }
}


