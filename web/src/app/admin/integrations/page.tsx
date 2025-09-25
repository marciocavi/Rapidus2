'use client';

import { useState } from 'react';

type Status = {
  ga4: boolean;
  openai: boolean;
};

export default function AdminIntegrationsPage() {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function testConnections() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/integrations/status', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const json = (await res.json()) as Status;
      setStatus(json);
    } catch (e: any) {
      setError(e?.message || 'Falha ao testar integrações');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6" data-modern-admin="1">
      <div className="adm-panel p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Integrações</h1>
          <p className="text-sm opacity-70">Status de provedores e teste rápido de conexão (server‑side).</p>
        </div>
        <button onClick={testConnections} disabled={loading} className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5 disabled:opacity-50">
          {loading ? 'Testando…' : 'Testar conexão'}
        </button>
      </div>

      <div className="adm-panel p-4">
        <h2 className="font-medium mb-2">Status atual</h2>
        {error && <div className="text-sm text-red-400 mb-2">{error}</div>}
        {!status && !error && <div className="text-sm opacity-70">Clique em “Testar conexão”.</div>}
        {status && (
          <ul className="text-sm grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="rounded border border-white/10 bg-black/30 p-3 flex items-center justify-between">
              <span>Google Analytics 4</span>
              <span className={`px-2 py-0.5 rounded text-xs ${status.ga4 ? 'bg-emerald-600/20 text-emerald-300' : 'bg-red-600/20 text-red-300'}`}>{status.ga4 ? 'habilitado' : 'desabilitado'}</span>
            </li>
            <li className="rounded border border-white/10 bg-black/30 p-3 flex items-center justify-between">
              <span>OpenAI (texto)</span>
              <span className={`px-2 py-0.5 rounded text-xs ${status.openai ? 'bg-emerald-600/20 text-emerald-300' : 'bg-red-600/20 text-red-300'}`}>{status.openai ? 'habilitado' : 'desabilitado'}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}



