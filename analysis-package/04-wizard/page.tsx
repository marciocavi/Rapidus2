"use client";
import dynamic from 'next/dynamic';

const WizardApp = dynamic(() => import('./WizardApp'), { ssr: false });

export default function WizardPage() {
  return <WizardApp />;
}


