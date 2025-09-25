"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepPreview() {
  const { identity, brand } = useWizardStore();
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <h2 className="text-xl font-semibold">Preview</h2>
      <div className="mt-4 rounded border p-6" style={{ background: brand.palette.background }}>
        <div className="text-2xl" style={{ color: brand.palette.primary }}>{identity.name || 'Seu título aqui'}</div>
      </div>
    </section>
  );
}



