import type { WizardState } from '../_state/wizardStore';

export type StepValidation = { ok: boolean; message?: string };

export function validateStep(state: WizardState, stepIndex: number): StepValidation {
  // 0: Welcome — sempre válido
  if (stepIndex === 1) {
    if (!state.identity.name || state.identity.name.trim().length === 0) {
      return { ok: false, message: 'Informe o nome da empresa/projeto.' };
    }
  }
  if (stepIndex === 6) {
    const anyEnabled = Object.values(state.sections).some((s) => s.enabled);
    if (!anyEnabled) return { ok: false, message: 'Selecione ao menos uma seção.' };
  }
  return { ok: true };
}



