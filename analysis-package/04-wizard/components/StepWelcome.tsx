"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepWelcome() {
  const { nextStep } = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Boas-vindas</h2>
      <p className="mt-2 text-sm text-muted-foreground">Vamos criar seu site passo a passo.</p>
      <button className="mt-4 rounded border px-3 py-2" onClick={nextStep}>Começar</button>
    </section>
  );
}



