'use client';

import dynamic from 'next/dynamic';

const Wizard = dynamic(() => import('@/components/ai-wizard/Wizard'), { ssr: false });

export default function AIWizardPage() {
  return (
    <div className="space-y-6" data-modern-admin="1">
      <Wizard />
    </div>
  );
}



