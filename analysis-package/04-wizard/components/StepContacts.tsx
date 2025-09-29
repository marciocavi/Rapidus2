"use client";
import { useWizardStore } from '../_state/wizardStore';

export function StepContacts() {
  const { contacts, setContacts } = useWizardStore();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-xl font-semibold">Contatos</h2>
      <div className="mt-4 grid grid-cols-1 gap-3">
        <label htmlFor="contacts-whatsapp" className="sr-only">WhatsApp</label>
        <input id="contacts-whatsapp" className="rounded border px-3 py-2 bg-white text-black placeholder-gray-600" placeholder="WhatsApp" value={contacts.whatsapp || ''} onChange={(e) => setContacts({ whatsapp: e.target.value })} />
        
        <label htmlFor="contacts-email" className="sr-only">E-mail</label>
        <input id="contacts-email" className="rounded border px-3 py-2 bg-white text-black placeholder-gray-600" placeholder="E-mail" value={contacts.email || ''} onChange={(e) => setContacts({ email: e.target.value })} />
        
        <label htmlFor="contacts-phone" className="sr-only">Telefone</label>
        <input id="contacts-phone" className="rounded border px-3 py-2 bg-white text-black placeholder-gray-600" placeholder="Telefone" value={contacts.phone || ''} onChange={(e) => setContacts({ phone: e.target.value })} />
      </div>
    </section>
  );
}
