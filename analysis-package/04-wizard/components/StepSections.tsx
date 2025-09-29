"use client";
import { useWizardStore, Sections } from '../_state/wizardStore';

export function StepSections() {
  const { sections, setSections } = useWizardStore();
  function toggle(key: keyof Sections) {
    setSections({ [key]: { ...sections[key], enabled: !sections[key].enabled } });
  }
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Seções</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {Object.keys(sections).map((k) => (
          <label key={k} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={sections[k as keyof Sections].enabled} onChange={() => toggle(k as keyof Sections)} />
            <span>{k}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
