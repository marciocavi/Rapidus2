"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepIdentity() {
  const { identity, setState } = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Identidade</h2>
      <div className="mt-4">
        <label className="text-sm block mb-1">Nome da empresa/projeto</label>
        <input className="w-full rounded border px-3 py-2 bg-white text-black placeholder-gray-600" value={identity.name} onChange={(e) => setState({ identity: { ...identity, name: e.target.value } })} placeholder="Ex.: Rapidus" required />
      </div>
      <div className="mt-4">
        <label className="text-sm block mb-1">Slogan (opcional)</label>
        <input className="w-full rounded border px-3 py-2 bg-white text-black placeholder-gray-600" value={identity.slogan || ''} onChange={(e) => setState({ identity: { ...identity, slogan: e.target.value } })} placeholder="Ex.: Soluções digitais rápidas" />
      </div>
    </section>
  );
}


