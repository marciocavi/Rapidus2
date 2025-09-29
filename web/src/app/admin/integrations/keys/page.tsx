'use client';

import { useEffect, useState } from 'react';

type Present = Record<string, boolean>;

export default function AdminIntegrationKeysPage() {
  const [present, setPresent] = useState<Present>({});
  const [form, setForm] = useState<Record<string, string>>({
    OPENAI_API_KEY: '',
    GA4_PROPERTY_ID: '',
    GA4_SA_EMAIL: '',
    GA4_SA_KEY_BASE64: '',
    GA4_CLIENT_ID: '',
    GA4_CLIENT_SECRET: '',
    GA4_REFRESH_TOKEN: '',
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

  function extractServiceAccountEmail(raw: string): string | undefined {
    const value = raw.trim();
    if (!value) return undefined;
    const tryParse = (str: string): unknown => {
      try {
        return JSON.parse(str);
      } catch {
        return null;
      }
    };
    const fromJson = (jsonStr: string) => {
      const parsed = tryParse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        const record = parsed as Record<string, unknown>;
        const email = record.client_email;
        if (typeof email === 'string') {
          return email;
        }
      }
      return undefined;
    };
    if (value.startsWith('{')) {
      return fromJson(value);
    }
    const decodeBase64 = (str: string): string | null => {
      try {
        if (typeof atob === 'function') {
          return atob(str);
        }
      } catch {
        // ignore and fallback
      }
      try {
        const globalBuffer = (globalThis as any)?.Buffer as
          | { from(input: string, encoding: string): { toString(encoding: string): string } }
          | undefined;
        if (globalBuffer) {
          return globalBuffer.from(str, 'base64').toString('utf8');
        }
      } catch {
        // ignore
      }
      return null;
    };
    const decoded = decodeBase64(value);
    return decoded ? fromJson(decoded) ?? undefined : undefined;
  }

  function handleFieldChange(key: string, rawValue: string) {
    setForm((prev) => {
      const next = { ...prev, [key]: rawValue };
      if (key === 'GA4_SA_KEY_BASE64') {
        const currentEmail = next.GA4_SA_EMAIL?.trim();
        if (!currentEmail) {
          const email = extractServiceAccountEmail(rawValue);
          if (email) {
            next.GA4_SA_EMAIL = email;
          }
        }
      }
      return next;
    });
  }

  const fields: Array<{ key: string; label: string; textarea?: boolean; description?: string }> = [
    { key: 'OPENAI_API_KEY', label: 'OpenAI API Key' },
    { key: 'GA4_PROPERTY_ID', label: 'GA4 Property ID' },
    {
      key: 'GA4_SA_EMAIL',
      label: 'GA4 Service Account Email',
      description: 'Opcional se o JSON/base64 contiver client_email',
    },
    {
      key: 'GA4_SA_KEY_BASE64',
      label: 'GA4 Service Account Key (JSON ou Base64)',
      textarea: true,
      description: 'Aceita o conteúdo JSON completo ou o valor já em Base64',
    },
    { key: 'GA4_CLIENT_ID', label: 'OAuth Client ID' },
    { key: 'GA4_CLIENT_SECRET', label: 'OAuth Client Secret' },
    { key: 'GA4_REFRESH_TOKEN', label: 'OAuth Refresh Token' },
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
            {f.description && <p className="text-xs opacity-60">{f.description}</p>}
            {f.textarea ? (
              <textarea
                className="w-full h-28 p-2 rounded bg-black/30 border border-white/10 text-sm"
                placeholder={present[f.key] ? '•••••• (definido)' : ''}
                onChange={(e) => handleFieldChange(f.key, e.target.value)}
              />
            ) : (
              <input
                className="w-full p-2 rounded bg-black/30 border border-white/10 text-sm"
                placeholder={present[f.key] ? '•••••• (definido)' : ''}
                onChange={(e) => handleFieldChange(f.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



