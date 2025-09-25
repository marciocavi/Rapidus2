'use client';

import { useRef, useState } from 'react';
import { extractPaletteFromImage, type BrandPalette } from './palette';
import { expandPlanFromContext } from '@/components/ai-editor/planUtils';
import { loadGlobalDesign } from '@/components/theme/globalDesign';

type Step = 'intent' | 'palette' | 'sources' | 'review';

export default function AIWizard() {
  const [step, setStep] = useState<Step>('intent');
  const [prompt, setPrompt] = useState('');
  const [url, setUrl] = useState('');
  const [instagram, setInstagram] = useState('');
  const [palette, setPalette] = useState<BrandPalette | null>(null);
  const [plan, setPlan] = useState<any | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  function next(s: Step) { setStep(s); }

  async function onGenerate() {
    setStatus('loading'); setMessage(null);
    try {
      const body: any = { prompt };
      // Sinalizamos ao backend via prompt; não alteramos endpoints existentes
      if (url) body.prompt += `\nReferência de site: ${url}`;
      if (instagram) body.prompt += `\nReferência Instagram: ${instagram}`;
      if (palette) body.prompt += `\nCores sugeridas: primary=${palette.primary}, secondary=${palette.secondary}`;
      const res = await fetch('/api/ai/site/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(String(res.status));
      const json = await res.json();
      // Enriquecimento cliente: expande para mais seções usando components-map
      let enriched = json.plan;
      try {
        const mapRes = await fetch('/api/ai/site/components-map', { cache: 'no-store' });
        const cmap = await mapRes.json();
        // Tokens globais (se existirem) influenciam a expansão
        const globalTokens = loadGlobalDesign();
        enriched = expandPlanFromContext(enriched, { prompt, palette: palette || (globalTokens ? { primary: globalTokens.colors.primary, secondary: globalTokens.colors.secondary } : null), componentsMap: cmap?.components || {} });
      } catch {}
      setPlan(enriched);
      setStatus('success'); setMessage('Plano gerado');
      next('review');
      console.log('[ai-wizard] generated');
    } catch (e: any) {
      console.error('[ai-wizard] generate error', e);
      setStatus('error'); setMessage(e?.message || 'Falha ao gerar');
    }
  }

  async function onValidate() {
    if (!plan) return;
    setStatus('loading'); setMessage(null);
    try {
      const res = await fetch('/api/ai/site/plan?dryRun=true', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(plan) });
      if (!res.ok) { setStatus('error'); setMessage(await res.text()); return; }
      setStatus('success'); setMessage('Plano validado');
    } catch (e: any) {
      setStatus('error'); setMessage(e?.message || 'Erro na validação');
    }
  }

  async function onApply() {
    if (!plan) return;
    const ok = await (async () => { await onValidate(); return status !== 'error'; })();
    if (!ok) return;
    setStatus('loading'); setMessage(null);
    try {
      const res = await fetch('/api/ai/site/plan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(plan) });
      const txt = await res.text();
      setStatus(res.ok ? 'success' : 'error'); setMessage(res.ok ? 'Plano aplicado' : txt);
    } catch (e: any) {
      setStatus('error'); setMessage(e?.message || 'Falha ao aplicar');
    }
  }

  async function onPickLogo(file: File) {
    try {
      const pal = await extractPaletteFromImage(file);
      setPalette(pal);
      setStep('palette');
    } catch (e) {
      console.error('[ai-wizard] logo parse error', e);
    }
  }

  return (
    <div className="space-y-4">
      <div className="adm-panel p-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Assistente IA — Novo Site</h2>
          <p className="text-xs opacity-70">Gere um site a partir de uma descrição, logo e referências públicas.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onValidate} className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5">Validar (dry‑run)</button>
          <button onClick={onApply} className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5">Aplicar</button>
        </div>
      </div>

      <div className="adm-panel p-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div>
            <label className="text-xs block mb-1 opacity-70">Descrição (linguagem natural)</label>
            <textarea className="w-full h-28 text-xs px-2 py-1 rounded bg-black/40 border border-white/10" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ex.: Quero um banner chamativo, grade com 3 produtos e um CTA de contato." />
          </div>
          <div>
            <label className="text-xs block mb-1 opacity-70">Logo (opcional)</label>
            <input ref={fileRef} type="file" accept="image/*" className="text-xs" onChange={(e) => { const f = e.target.files?.[0]; if (f) onPickLogo(f); }} />
            {palette && (
              <div className="mt-2 text-xs">
                <div className="opacity-70">Paleta sugerida</div>
                <div className="flex gap-2 mt-1">
                  {['primary','secondary','background','text'].map((k) => (
                    <div key={k} className="w-6 h-6 rounded" title={k} style={{ background: (palette as any)[k] }} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="text-xs block mb-1 opacity-70">Referências (opcional)</label>
            <input className="w-full mb-2 text-xs px-2 py-1 rounded bg-black/40 border border-white/10" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL de um site" />
            <input className="w-full text-xs px-2 py-1 rounded bg-black/40 border border-white/10" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@perfil do Instagram" />
          </div>
        </div>
        <div className="mt-3">
          <button onClick={onGenerate} className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5">Gerar com IA</button>
        </div>
      </div>

      <div className="adm-panel p-3">
        <h3 className="font-medium mb-2">Plano (preview)</h3>
        {!plan ? (
          <div className="text-sm opacity-70">Nenhum plano gerado ainda.</div>
        ) : (
          <pre className="text-xs max-h-[360px] overflow-auto bg-black/40 border border-white/10 p-2">{JSON.stringify(plan, null, 2)}</pre>
        )}
      </div>

      {status !== 'idle' && (
        <div className={`adm-panel p-3 ${status === 'error' ? 'border-red-500/40' : 'border-white/10'}`}>
          <div className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message || (status === 'loading' ? 'Processando…' : 'OK')}</div>
        </div>
      )}
    </div>
  );
}


