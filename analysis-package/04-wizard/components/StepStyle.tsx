"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepStyle() {
  const { style, setStyle } = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Estilo & Tipografia</h2>
      <div className="mt-4">
        <label htmlFor="style-theme" className="text-sm block mb-1">Tema</label>
        <select
          id="style-theme"
          className="w-full rounded border px-3 py-2"
          value={style.theme}
          onChange={(e) => setStyle({ theme: e.target.value as any })}
        >
          <option value="minimal">Minimalista</option>
          <option value="modern">Moderno</option>
          <option value="classic">Clássico</option>
          <option value="neon">Neon</option>
        </select>
      </div>
    </section>
  );
}
