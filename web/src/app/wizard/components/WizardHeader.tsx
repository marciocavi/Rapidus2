"use client";
import { useWizardStore } from '../_state/wizardStore';

export function WizardHeader() {
  const { stepIndex } = useWizardStore();
  const total = 10;
  const progress = Math.min(100, Math.round(((stepIndex + 1) / total) * 100));
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold">Wizard IA</h1>
          <div className="text-xs text-muted-foreground">{progress}%</div>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded bg-muted">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </header>
  );
}


