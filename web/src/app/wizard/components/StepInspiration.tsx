"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepInspiration() {
  const { inspiration, setState } = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Inspiração</h2>
      <div className="mt-4">
        <label className="text-sm block mb-1">Instagram (opcional)</label>
        <input
          className="w-full rounded border px-3 py-2 bg-white text-black placeholder-gray-600"
          value={inspiration?.instagram || ''}
          onChange={(e) => setState({ inspiration: { ...(inspiration || {}), instagram: e.target.value } })}
          placeholder="@seu_perfil"
        />
      </div>
    </section>
  );
}


