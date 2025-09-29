"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepInspiration() {
  const { inspiration, setInspiration } = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Inspiração</h2>
      <div className="mt-4">
        <label htmlFor="inspiration-instagram" className="text-sm block mb-1">Instagram (opcional)</label>
        <input
          id="inspiration-instagram"
          className="w-full rounded border px-3 py-2 bg-white text-black placeholder-gray-600"
          value={inspiration?.instagram || ''}
          onChange={(e) => setInspiration({ instagram: e.target.value })}
          placeholder="@seu_perfil"
        />
      </div>
    </section>
  );
}
