"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepIndustry() {
  const { industry, setState } = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Área de atuação</h2>
      <div className="mt-4">
        <label className="text-sm block mb-1">Setor</label>
        <input
          className="w-full rounded border px-3 py-2 bg-white text-black placeholder-gray-600"
          value={industry || ''}
          onChange={(e) => setState({ industry: e.target.value })}
          placeholder="Ex.: Moda, Gastronomia, Serviços"
        />
      </div>
    </section>
  );
}


