"use client";
import { useState, useEffect } from 'react';
import { useWizardStore } from '../_state/wizardStore';
import { validateStep } from '../_utils/validation';

export function WizardFooter() {
  const store = useWizardStore();
  const { nextStep, prevStep, saveDraft, dirty } = store;
  const validation = validateStep(store, store.stepIndex + 1);
  const [showSaved, setShowSaved] = useState(false);

  const handleSaveDraft = () => {
    saveDraft();
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          if (validation.ok) {
            nextStep();
          }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevStep();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, prevStep, validation.ok]);

  return (
    <footer className="sticky bottom-0 z-10 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <button className="px-3 py-2 rounded border" onClick={prevStep}>Voltar</button>
        <div className="flex gap-2 items-center">
          {dirty && !showSaved && (
            <button className="px-3 py-2 rounded border border-blue-500 text-blue-500 text-sm" onClick={handleSaveDraft}>
              Salvar Rascunho
            </button>
          )}
          {showSaved && (
            <span className="text-sm text-green-600">Rascunho salvo!</span>
          )}
          {validation.message && (
            <span className="text-xs text-red-500 mr-2">{validation.message}</span>
          )}
          <button className="px-3 py-2 rounded border disabled:opacity-50" onClick={nextStep} disabled={!validation.ok}>Próximo</button>
        </div>
      </div>
    </footer>
  );
}
