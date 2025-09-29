"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepIndustry() {
  const { industry, setIndustry } = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Área de atuação</h2>
      <div className="mt-4">
        <label htmlFor="industry-sector" className="text-sm block mb-1">Setor</label>
        <input
          id="industry-sector"
          className="w-full rounded border px-3 py-2 bg-white text-black placeholder-gray-600"
          value={industry || ''}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Ex.: Moda, Gastronomia, Serviços"
        />
      </div>
    </section>
  );
}
