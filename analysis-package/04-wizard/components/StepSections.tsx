"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepSections() {
  const { sections, setState } = useWizardStore();
  function toggle(key: keyof typeof sections) {
    setState({ sections: { ...sections, [key]: { ...sections[key], enabled: !sections[key].enabled } } });
  }
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Seções</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {Object.keys(sections).map((k) => (
          <label key={k} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={(sections as any)[k].enabled} onChange={() => toggle(k as any)} />
            <span>{k}</span>
          </label>
        ))}
      </div>
    </section>
  );
}



