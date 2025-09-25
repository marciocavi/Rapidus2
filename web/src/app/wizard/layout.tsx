import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { featureFlags } from '@/config/featureFlags';

export default function WizardLayout({ children }: { children: ReactNode }) {
  if (!featureFlags.WIZARD_IA_ONBOARDING) {
    redirect('/');
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}



