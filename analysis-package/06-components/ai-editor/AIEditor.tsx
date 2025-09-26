'use client';

import { useEffect, useMemo, useState } from 'react';
import { moveSection, addSection, getSections, setSections, updateSectionProps, type Plan } from './planUtils';
import { z } from 'zod';

type FetchState<T> = { status: 'idle' | 'loading' | 'success' | 'error'; data?: T; error?: string };

export default function AIEditor({ initialPlan }: { initialPlan: Plan }) {
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [status, setStatus] = useState<FetchState<any>>({ status: 'idle' });
  const [componentsMap, setComponentsMap] = useState<any>({});
  const [prompt, setPrompt] = useState('');

  const sections = useMemo(() => getSections(plan), [plan]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/ai/site/components-map', { cache: 'no-store' });
        const json = await res.json();
        setComponentsMap(json?.components || {});
      } catch (e: any) {
        console.error('[ai-editor] components-map error', e);
      }
    })();
  }, []);

  async function generate() {
    setStatus({ status: 'loading' });
    try {
      const res = await fetch('/api/ai/site/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
      if (!res.ok) throw new Error(String(res.status));
      const json = await res.json();
      setPlan(json.plan);
      setStatus({ status: 'success', data: { action: 'generate' } });
      console.log('[ai-editor] generate ok');
    } catch (e: any) {
      console.error('[ai-editor] generate error', e);
      setStatus({ status: 'error', error: e?.message || 'Falha ao gerar' });
    }
  }

  async function dryRun() {
    setStatus({ status: 'loading' });
    try {
      const res = await fetch('/api/ai/site/plan?dryRun=true', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(plan) });
      const ok = res.ok;
      const body = await res.text();
      setStatus({ status: ok ? 'success' : 'error', data: tryParse(body), error: ok ? undefined : body });
      console.log('[ai-editor] dry-run', ok ? 'ok' : 'error');
      return ok;
    } catch (e: any) {
      console.error('[ai-editor] dry-run error', e);
      setStatus({ status: 'error', error: e?.message || 'Erro no dry-run' });
      return false;
    }
  }

  async function applyPlan() {
    const ok = await dryRun();
    if (!ok) return;
    setStatus({ status: 'loading' });
    try {
      const res = await fetch('/api/ai/site/plan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(plan) });
      const txt = await res.text();
      setStatus({ status: res.ok ? 'success' : 'error', data: tryParse(txt), error: res.ok ? undefined : txt });
      console.log('[ai-editor] apply', res.ok ? 'ok' : 'error');
    } catch (e: any) {
      console.error('[ai-editor] apply error', e);
      setStatus({ status: 'error', error: e?.message || 'Falha ao aplicar plano' });
    }
  }

  function onAdd(key: string) {
    const example = componentsMap?.[key]?.example || {};
    const next = addSection(sections, { componentKey: key, props: example, order: sections.length });
    setPlan(setSections(plan, next));
  }

  function onMove(from: number, to: number) {
    const next = moveSection(sections, from, to);
    setPlan(setSections(plan, next));
  }

  function onPatch(idx: number, patch: Record<string, any>) {
    const next = updateSectionProps(sections, idx, patch);
    setPlan(setSections(plan, next));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <aside className="adm-panel p-3 lg:col-span-1">
        <h3 className="font-medium mb-2">Componentes</h3>
        <div className="space-y-2">
          {Object.keys(componentsMap || {}).map((k) => (
            <button key={k} onClick={() => onAdd(k)} className="w-full text-left px-2 py-1 text-xs rounded border border-white/20 hover:bg-white/5">+ {k}</button>
          ))}
        </div>
      </aside>
      <main className="lg:col-span-2 space-y-3">
        <div className="adm-panel p-3">
          <h3 className="font-medium mb-2">Descrição (IA)</h3>
          <div className="flex gap-2">
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} className="flex-1 px-2 py-1 text-sm rounded bg-black/40 border border-white/10" placeholder="Descreva como quer o site" />
            <button onClick={generate} className="px-3 py-1 text-sm rounded border border-white/20 hover:bg-white/5">Gerar</button>
          </div>
        </div>

        <div className="adm-panel p-3">
          <h3 className="font-medium mb-2">Layout</h3>
          <ul className="space-y-2">
            {sections.map((s, idx) => (
              <li key={idx} className="rounded border border-white/10 p-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">{idx + 1}. {s.componentKey}</div>
                  <div className="flex gap-1">
                    <button onClick={() => onMove(idx, Math.max(0, idx - 1))} className="px-2 py-1 text-xs rounded border border-white/20 hover:bg-white/5">↑</button>
                    <button onClick={() => onMove(idx, Math.min(sections.length - 1, idx + 1))} className="px-2 py-1 text-xs rounded border border-white/20 hover:bg-white/5">↓</button>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {s.componentKey === 'HeroBanner' && (
                    <>
                      <Field label="Título" value={(s.props?.title as string) || ''} onChange={(v) => onPatch(idx, { title: v })} />
                      <Field label="Subtítulo" value={(s.props?.subtitle as string) || ''} onChange={(v) => onPatch(idx, { subtitle: v })} />
                    </>
                  )}
                  {s.componentKey === 'FeaturesGrid' && (
                    <Field label="Itens" type="number" value={String(s.props?.items ?? 3)} onChange={(v) => onPatch(idx, { items: Number(v) || 3 })} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <button onClick={dryRun} className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5">Validar (dry‑run)</button>
          <button onClick={applyPlan} className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5">Aplicar ao site</button>
        </div>

        {status.status !== 'idle' && (
          <div className={`adm-panel p-3 ${status.status === 'error' ? 'border-red-500/40' : 'border-white/10'}`}>
            <div className={`text-sm ${status.status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
              {status.status === 'loading' ? 'Processando…' : status.status === 'error' ? 'Erro' : 'OK'}
            </div>
            {status.error && <pre className="text-xs mt-2 opacity-80 whitespace-pre-wrap break-words">{status.error}</pre>}
          </div>
        )}
      </main>
      <aside className="adm-panel p-3 lg:col-span-1">
        <h3 className="font-medium mb-2">Preview (simplificado)</h3>
        <pre className="text-xs max-h-[420px] overflow-auto bg-black/40 border border-white/10 p-2">{JSON.stringify(plan, null, 2)}</pre>
      </aside>
    </div>
  );
}

function tryParse(t: string) {
  try { return JSON.parse(t); } catch { return t; }
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="text-xs block">
      <span className="opacity-70">{label}</span>
      <input
        className="mt-1 w-full px-2 py-1 text-xs rounded bg-black/40 border border-white/10"
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}



