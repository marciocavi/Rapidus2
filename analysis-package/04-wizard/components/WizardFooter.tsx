"use client";
import { useWizardStore } from '../_state/wizardStore';
import { validateStep } from '../_utils/validation';

export function WizardFooter() {
  const store = useWizardStore();
  const { nextStep, prevStep } = store;
  const validation = validateStep(store, store.stepIndex + 1);
  return (
    <footer className="sticky bottom-0 z-10 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <button className="px-3 py-2 rounded border" onClick={prevStep}>Voltar</button>
        <div className="flex gap-2 items-center">
          {validation.message && (
            <span className="text-xs text-red-500 mr-2">{validation.message}</span>
          )}
          <button className="px-3 py-2 rounded border disabled:opacity-50" onClick={nextStep} disabled={!validation.ok}>Próximo</button>
        </div>
      </div>
    </footer>
  );
}


