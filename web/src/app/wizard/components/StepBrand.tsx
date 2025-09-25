"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepBrand() {
  const { brand, setState } = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Marca</h2>
      <div className="mt-4">
        <label className="text-sm block mb-1">Logo URL (stub)</label>
        <input
          className="w-full rounded border px-3 py-2 bg-white text-black placeholder-gray-600"
          value={brand.logoUrl || ''}
          onChange={(e) => setState({ brand: { ...brand, logoUrl: e.target.value } })}
          placeholder="https://.../logo.png"
        />
      </div>
    </section>
  );
}


