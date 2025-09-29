"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepBrand() {
  const { brand, setBrand } = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Marca</h2>
      <div className="mt-4">
        <label htmlFor="brand-logo-url" className="text-sm block mb-1">Logo URL (stub)</label>
        <input
          id="brand-logo-url"
          className="w-full rounded border px-3 py-2 bg-white text-black placeholder-gray-600"
          value={brand.logoUrl || ''}
          onChange={(e) => setBrand({ logoUrl: e.target.value })} 
          placeholder="https://.../logo.png"
        />
      </div>
    </section>
  );
}
