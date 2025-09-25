'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

type FetchState<T> = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: T;
  error?: string;
};

export default function AdminAIPage() {
  const [planState, setPlanState] = useState<FetchState<any>>({ status: 'idle' });
  const [mapState, setMapState] = useState<FetchState<any>>({ status: 'idle' });
  const [postState, setPostState] = useState<FetchState<any>>({ status: 'idle' });
  const [editor, setEditor] = useState<string>(
    JSON.stringify(
      {
        layout: {
          sections: [{ componentKey: 'HeroBanner', props: {}, order: 0 }],
          theme: { useDark: true, tokensRef: 'default' },
          ctas: [{ text: 'OK', href: '/' }],
        },
      },
      null,
      2
    )
  );

  async function loadAll() {
    setPlanState({ status: 'loading' });
    setMapState({ status: 'loading' });
    try {
      const [planRes, mapRes] = await Promise.all([
        fetch('/api/ai/site/plan', { cache: 'no-store' }),
        fetch('/api/ai/site/components-map', { cache: 'no-store' }),
      ]);

      if (!planRes.ok) {
        const msg = planRes.status === 404 ? 'IA desabilitada (AI_ASSISTANT_ENABLED=false)' : `Erro ${planRes.status}`;
        setPlanState({ status: 'error', error: msg });
      } else {
        setPlanState({ status: 'success', data: await planRes.json() });
      }

      if (!mapRes.ok) {
        const msg = mapRes.status === 404 ? 'IA desabilitada (AI_ASSISTANT_ENABLED=false)' : `Erro ${mapRes.status}`;
        setMapState({ status: 'error', error: msg });
      } else {
        setMapState({ status: 'success', data: await mapRes.json() });
      }
    } catch (e: any) {
      setPlanState({ status: 'error', error: e?.message || 'Erro' });
      setMapState({ status: 'error', error: e?.message || 'Erro' });
    }
  }

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ai-site-plan-draft');
      if (saved) setEditor(saved);
    } catch {}
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Pretty = ({ value }: { value: unknown }) => (
    <pre className="text-xs whitespace-pre-wrap break-words overflow-auto max-h-[480px] p-3 rounded bg-black/40 border border-white/10">{JSON.stringify(value, null, 2)}</pre>
  );

  async function submitDryRun() {
    // validação local do JSON
    try {
      JSON.parse(editor);
    } catch (e: any) {
      setPostState({ status: 'error', error: `JSON inválido: ${e?.message || ''}` });
      return;
    }

    setPostState({ status: 'loading' });
    try {
      const res = await fetch('/api/ai/site/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: editor,
      });
      if (!res.ok) {
        const err = await res.text();
        setPostState({ status: 'error', error: err || `Erro ${res.status}` });
        return;
      }
      const json = await res.json();
      setPostState({ status: 'success', data: json });
    } catch (e: any) {
      setPostState({ status: 'error', error: e?.message || 'Erro' });
    }
  }

  // util: exportar conteúdo do editor como arquivo JSON
  function exportJson() {
    try {
      const blob = new Blob([editor], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'site-plan.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {}
  }

  // import JSON a partir de arquivo
  const importInputRef = useRef<HTMLInputElement | null>(null);
  async function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      // validação básica
      JSON.parse(text);
      setEditor(text);
    } catch (err: any) {
      alert(`Arquivo inválido: ${err?.message || ''}`);
    } finally {
      // reset para permitir reimportar mesmo arquivo
      e.target.value = '';
    }
  }

  const AIEditor = dynamic(() => import('@/components/ai-editor/AIEditor'), { ssr: false });

  return (
    <div className="space-y-6" data-modern-admin="1">
      <div className="adm-panel p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Assistente de Site (dry‑run)</h1>
          <p className="text-sm opacity-70">Consome /api/ai/site/plan, /api/ai/site/components-map e /api/ai/site/generate</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadAll} className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5">Recarregar</button>
          <button
            onClick={async () => {
              try {
                const res = await fetch('/api/ai/site/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: 'Gerar plano de exemplo' }) });
                if (!res.ok) return alert(`Erro: ${res.status}`);
                const json = await res.json();
                setEditor(JSON.stringify(json.plan, null, 2));
              } catch (e: any) {
                alert(e?.message || 'Falha ao gerar');
              }
            }}
            className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5"
          >Gerar plano (POST /generate)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="adm-panel p-4">
          <h2 className="font-medium mb-2">Plano (GET /api/ai/site/plan)</h2>
          {planState.status === 'loading' && <div className="text-sm opacity-70">Carregando…</div>}
          {planState.status === 'error' && <div className="text-sm text-red-400">{planState.error}</div>}
          {planState.status === 'success' && <Pretty value={planState.data} />}
        </div>

        <div className="adm-panel p-4">
          <h2 className="font-medium mb-2">Components Map (GET /api/ai/site/components-map)</h2>
          {mapState.status === 'loading' && <div className="text-sm opacity-70">Carregando…</div>}
          {mapState.status === 'error' && <div className="text-sm text-red-400">{mapState.error}</div>}
          {mapState.status === 'success' && <Pretty value={mapState.data} />}
        </div>
      </div>

      <div className="adm-panel p-4">
        <h2 className="font-medium mb-2">Enviar plano (POST /api/ai/site/plan)</h2>
        <div className="mb-3 flex items-center gap-2 text-xs">
          <label className="opacity-70">Inserir exemplo:</label>
          <select
            className="adm-select px-2 py-1 rounded bg-black/40 border border-white/10"
            onChange={async (e) => {
              const key = e.target.value;
              if (!key) return;
              try {
                const res = await fetch('/api/ai/site/components-map');
                const json = await res.json();
                const ex = json?.components?.[key]?.example;
                if (ex) {
                  const plan = { layout: { sections: [{ componentKey: key, props: {}, order: 0 }], theme: { useDark: true, tokensRef: 'default' }, ctas: [{ text: 'OK', href: '/' }] } };
                  // se houver exemplo de props, aplica
                  (plan.layout.sections[0] as any).props = ex;
                  setEditor(JSON.stringify(plan, null, 2));
                }
              } catch {}
              e.currentTarget.selectedIndex = 0;
            }}
          >
            <option value="">Selecionar…</option>
            <option value="HeroBanner">HeroBanner</option>
            <option value="FeaturesGrid">FeaturesGrid</option>
            <option value="Carousel">Carousel</option>
            <option value="Testimonials">Testimonials</option>
            <option value="ContactForm">ContactForm</option>
          </select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <textarea
              className={`adm-textarea w-full h-64 p-3 rounded bg-black/40 font-mono text-xs border ${postState.status === 'error' && (postState.error || '').startsWith('JSON inválido') ? 'border-red-500/50' : 'border-white/10'}`}
              value={editor}
              onChange={(e) => setEditor(e.target.value)}
            />
            <div className="mt-2 flex gap-2 flex-wrap">
              <button onClick={submitDryRun} className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5">Validar (dry‑run)</button>
              <button
                onClick={async () => {
                  setPostState({ status: 'loading' });
                  try {
                    const res = await fetch('/api/ai/site/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: 'Gerar plano de exemplo' }) });
                    if (!res.ok) { setPostState({ status: 'error', error: `Erro: ${res.status}` }); return; }
                    const json = await res.json();
                    setEditor(JSON.stringify(json.plan, null, 2));
                    setPostState({ status: 'success', data: json });
                  } catch (e: any) {
                    setPostState({ status: 'error', error: e?.message || 'Falha ao gerar' });
                  }
                }}
                className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5"
              >Gerar com IA</button>
              <button
                onClick={async () => {
                  setPostState({ status: 'loading' });
                  try {
                    const toApply = JSON.parse(editor);
                    const res = await fetch('/api/ai/site/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan: toApply }) });
                    const txt = await res.text();
                    try { setPostState({ status: res.ok ? 'success' : 'error', data: JSON.parse(txt) }); } catch { setPostState({ status: res.ok ? 'success' : 'error', data: txt }); }
                  } catch (e: any) {
                    setPostState({ status: 'error', error: e?.message || 'Falha ao aplicar plano' });
                  }
                }}
                className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5"
              >Aplicar ao site</button>
              <button
                onClick={() => { try { localStorage.setItem('ai-site-plan-draft', editor); } catch {} }}
                className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5"
              >Salvar rascunho</button>
              <button
                onClick={() => { try { const s = localStorage.getItem('ai-site-plan-draft'); if (s) setEditor(s); } catch {} }}
                className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5"
              >Carregar rascunho</button>
              <button
                onClick={exportJson}
                className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5"
              >Exportar JSON</button>
              <input ref={importInputRef} onChange={onImportFile} type="file" accept="application/json" className="hidden" />
              <button
                onClick={() => importInputRef.current?.click()}
                className="px-3 py-2 text-sm rounded border border-white/20 hover:bg-white/5"
              >Importar JSON</button>
            </div>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-2">Resposta</h3>
            {postState.status === 'idle' && <div className="text-sm opacity-60">Sem requisição ainda.</div>}
            {postState.status === 'loading' && <div className="text-sm opacity-70">Enviando…</div>}
            {postState.status === 'error' && <div className="text-sm text-red-400 break-words">{postState.error}</div>}
            {postState.status === 'success' && (
              <div>
                <div className="mb-2 flex gap-2">
                  <button
                    onClick={() => {
                      try { navigator.clipboard.writeText(JSON.stringify(postState.data, null, 2)); } catch {}
                    }}
                    className="px-2 py-1 text-xs rounded border border-white/20 hover:bg-white/5"
                  >Copiar resposta</button>
                  <button
                    onClick={() => setPostState({ status: 'idle' })}
                    className="px-2 py-1 text-xs rounded border border-white/20 hover:bg-white/5"
                  >Limpar</button>
                </div>
                <Pretty value={postState.data} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor visual (seguro e incremental) */}
      <div className="adm-panel p-4">
        <h2 className="font-medium mb-2">Editor Visual (beta)</h2>
        {planState.status === 'success' && planState.data?.plan ? (
          <AIEditor initialPlan={planState.data.plan} />
        ) : (
          <div className="text-sm opacity-70">Carregando plano…</div>
        )}
      </div>

      {/* Preview simples das seções do plano atual (do editor) */}
      <div className="adm-panel p-4">
        <h2 className="font-medium mb-2">Preview das seções</h2>
        {(() => {
          try {
            const parsed = JSON.parse(editor);
            const sections = parsed?.layout?.sections ?? [];
            if (!Array.isArray(sections) || sections.length === 0) {
              return <div className="text-sm opacity-60">Nenhuma seção.</div>;
            }
            return (
              <ul className="text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                {sections.map((s: any, idx: number) => (
                  <li key={idx} className="rounded border border-white/10 bg-black/30 p-3">
                    <div className="font-medium">{s?.componentKey || 'Sem componente'}</div>
                    <div className="opacity-70">ordem: {s?.order ?? idx}</div>
                    {s?.props && <div className="mt-1 text-xs opacity-80">props: {Object.keys(s.props).slice(0, 5).join(', ')}</div>}
                  </li>
                ))}
              </ul>
            );
          } catch {
            return <div className="text-sm text-red-400">JSON inválido — corrija para ver o preview.</div>;
          }
        })()}
      </div>
    </div>
  );
}


