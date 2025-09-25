'use client';

import { useEffect, useState } from 'react';

type Present = Record<string, boolean>;

export default function AdminIntegrationKeysPage() {
  const [present, setPresent] = useState<Present>({});
  const [form, setForm] = useState<Record<string, string>>({
    OPENAI_API_KEY: '',
    GA4_PROPERTY_ID: '',
    GOOGLE_APPLICATION_CREDENTIALS_JSON: '',
    GA_OAUTH_CLIENT_ID: '',
    GA_OAUTH_CLIENT_SECRET: '',
    GA_OAUTH_REFRESH_TOKEN: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'saved' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch('/api/integrations/secrets', { cache: 'no-store' });
      const json = await res.json();
      setPresent(json.present || {});
    } catch {}
  }
  useEffect(() => { load(); }, []);

  async function save() {
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch('/api/integrations/secrets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error((await res.json())?.error || String(res.status));
      setStatus('saved');
      load();
    } catch (e: any) {
      setStatus('error');
      setError(e?.message || 'Falha ao salvar');
    }
  }

  const fields: Array<{ key: string; label: string; textarea?: boolean }> = [
    { key: 'OPENAI_API_KEY', label: 'OpenAI API Key' },
    { key: 'GA4_PROPERTY_ID', label: 'GA4 Property ID' },
    { key: 'GOOGLE_APPLICATION_CREDENTIALS_JSON', label: 'Google Service Account JSON', textarea: true },
    { key: 'GA_OAUTH_CLIENT_ID', label: 'OAuth Client ID' },
    { key: 'GA_OAUTH_CLIENT_SECRET', label: 'OAuth Client Secret' },
    { key: 'GA_OAUTH_REFRESH_TOKEN', label: 'OAuth Refresh Token' },
  ];

  return (
    <div className="space-y-6" data-modern-admin="1">
      <div className="adm-panel p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Chaves das integrações (dev)</h1>
          <p className="text-sm opacity-70">Em produção este formulário fica desativado (usar Secret Manager/env).</p>
        </div>
        <button onClick={save} disabled={status === 'loading'} className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5 disabled:opacity-50">{status === 'loading' ? 'Salvando…' : 'Salvar'}</button>
      </div>

      {error && <div className="adm-panel p-4 text-sm text-red-400">{error}</div>}
      {status === 'saved' && <div className="adm-panel p-4 text-sm text-emerald-400">Salvo com sucesso.</div>}

      <div className="adm-panel p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1">
            <label className="text-sm opacity-70">{f.label}</label>
            {f.textarea ? (
              <textarea className="w-full h-28 p-2 rounded bg-black/30 border border-white/10 text-sm" placeholder={present[f.key] ? '•••••• (definido)' : ''} onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))} />
            ) : (
              <input className="w-full p-2 rounded bg-black/30 border border-white/10 text-sm" placeholder={present[f.key] ? '•••••• (definido)' : ''} onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



