"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepReview() {
  const state = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Revisão</h2>
      <pre className="mt-4 rounded border p-4 text-xs overflow-auto bg-black/5">{JSON.stringify(state, null, 2)}</pre>
    </section>
  );
}



