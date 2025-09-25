"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepContacts() {
  const { contacts, setState } = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Contatos</h2>
      <div className="mt-4 grid grid-cols-1 gap-3">
        <input className="rounded border px-3 py-2 bg-white text-black placeholder-gray-600" placeholder="WhatsApp" value={contacts.whatsapp || ''} onChange={(e) => setState({ contacts: { ...contacts, whatsapp: e.target.value } })} />
        <input className="rounded border px-3 py-2 bg-white text-black placeholder-gray-600" placeholder="E-mail" value={contacts.email || ''} onChange={(e) => setState({ contacts: { ...contacts, email: e.target.value } })} />
      </div>
    </section>
  );
}


