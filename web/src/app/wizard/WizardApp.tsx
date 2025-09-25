"use client";
import { useWizardStore, WizardProvider } from './_state/wizardStore';
import { WizardHeader } from './components/WizardHeader';
import { WizardFooter } from './components/WizardFooter';
import { StepWelcome } from './components/StepWelcome';
import { StepIdentity } from './components/StepIdentity';
import { StepIndustry } from './components/StepIndustry';
import { StepBrand } from './components/StepBrand';
import { StepStyle } from './components/StepStyle';
import { StepInspiration } from './components/StepInspiration';
import { StepSections } from './components/StepSections';
import { StepContacts } from './components/StepContacts';
import { StepPreview } from './components/StepPreview';
import { StepReview } from './components/StepReview';

export default function WizardApp() {
  return (
    <WizardProvider>
      <Shell />
    </WizardProvider>
  );
}

function Shell() {
  const { stepIndex } = useWizardStore();
  return (
    <div className="min-h-screen flex flex-col">
      <WizardHeader />
      <main className="flex-1">
        {stepIndex === 0 && <StepWelcome />}
        {stepIndex === 1 && <StepIdentity />}
        {stepIndex === 2 && <StepIndustry />}
        {stepIndex === 3 && <StepBrand />}
        {stepIndex === 4 && <StepStyle />}
        {stepIndex === 5 && <StepInspiration />}
        {stepIndex === 6 && <StepSections />}
        {stepIndex === 7 && <StepContacts />}
        {stepIndex === 8 && <StepPreview />}
        {stepIndex === 9 && <StepReview />}
      </main>
      <WizardFooter />
    </div>
  );
}


