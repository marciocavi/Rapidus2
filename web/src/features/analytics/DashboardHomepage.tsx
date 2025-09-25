'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { HomepageAnalyticsResponse } from '@/types/analytics';
import '@/features/analytics/neonTheme.css';
import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';
// Carrega framer-motion de forma opcional (não quebra caso não esteja instalado)
let Motion: any = null;
async function loadMotion() {
  if (Motion) return Motion;
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function('m', 'return import(m)');
    Motion = await (fn as (m: string) => Promise<any>)('framer-motion');
  } catch {
    Motion = null;
  }
  return Motion;
}

function MotionDiv({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const M = Motion?.motion;
  if (M) {
    return (
      <M.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}>
        {children}
      </M.div>
    );
  }
  return <div>{children}</div>;
}

async function fetchData(range: string): Promise<HomepageAnalyticsResponse> {
  const params = new URLSearchParams({ range });
  // Se range=custom, anexaremos datas do estado (injeção externa via globals, ver abaixo)
  // @ts-expect-error - acessamos opcionalmente datas globais injetadas no window
  if (range === 'custom' && window?.__anaDates) {
    // @ts-expect-error - tipagem global não declarada neste escopo
    const { startDate, endDate } = window.__anaDates as { startDate?: string; endDate?: string };
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
  }
  const res = await fetch(`/api/analytics/homepage?${params.toString()}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function DashboardHomepage() {
  const enabled = typeof process.env.NEXT_PUBLIC_FEATURE_ANALYTICS_DASHBOARD !== 'undefined'
    ? process.env.NEXT_PUBLIC_FEATURE_ANALYTICS_DASHBOARD === 'true'
    : false;

  const [range, setRange] = useState('28d');
  const [data, setData] = useState<HomepageAnalyticsResponse | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>(() => new Date(Date.now() - 27 * 86400000).toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState<string>(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (!enabled) return;
    setStatus('loading');
    // expõe datas para o fetchData (evitar props threading mantendo API simples)
    // @ts-expect-error - injetamos window.__anaDates para compartilhar datas de filtro
    if (range === 'custom') window.__anaDates = { startDate, endDate };
    fetchData(range)
      .then((d) => { setData(d); setStatus('success'); })
      .catch((e) => { setError(String(e)); setStatus('error'); });
  }, [range, enabled, startDate, endDate]);

  useEffect(() => { loadMotion(); }, []);

  const fmt = new Intl.NumberFormat('pt-BR');
  const fmtPct = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 1 });

  const totalSessions = data?.topChannels?.reduce((s, c) => s + c.sessions, 0) ?? 0;

  const LineTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div style={{ background: '#0B1320', border: '1px solid rgba(255,255,255,.08)', padding: 8, borderRadius: 8 }}>
        <div style={{ color: '#94a3b8', fontSize: 12 }}>{label}</div>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ color: p.color }}>{p.name}: {fmt.format(p.value)}</div>
        ))}
      </div>
    );
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const p = payload[0];
    const v = p?.value ?? 0;
    const pc = totalSessions > 0 ? v / totalSessions : 0;
    return (
      <div style={{ background: '#0B1320', border: '1px solid rgba(255,255,255,.08)', padding: 8, borderRadius: 8 }}>
        <div style={{ color: '#94a3b8', fontSize: 12 }}>{p?.name}</div>
        <div style={{ color: p?.color }}>{fmt.format(v)} ({fmtPct.format(pc)})</div>
      </div>
    );
  };

  if (!enabled) {
    return (
      <div className="adm-panel p-4 ana-neon">
        <h3 className="text-white font-semibold mb-2">Analytics (Home)</h3>
        <p className="text-slate-400 text-sm">A dashboard está desabilitada. Defina FEATURE_ANALYTICS_DASHBOARD=true no .env.local para habilitar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 ana-neon">
      <div className="adm-panel p-3 flex items-center gap-2">
        <span className="text-white text-sm">Período:</span>
        <select
          className="adm-select"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="7d">7 dias</option>
          <option value="28d">28 dias</option>
          <option value="90d">90 dias</option>
          <option value="custom">Custom</option>
        </select>
        {range === 'custom' && (
          <div className="flex items-center gap-2">
            <input type="date" className="adm-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <span className="text-slate-500">→</span>
            <input type="date" className="adm-input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        )}
        <div className="ml-auto text-slate-400 text-xs">Somente path &quot;/&quot;</div>
      </div>

      {status === 'loading' && (
        <div className="adm-panel p-6 text-slate-300">Carregando…</div>
      )}
      {status === 'error' && (
        <div className="adm-panel p-6 text-red-400">Erro: {error}</div>
      )}
      {status === 'success' && data && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MotionDiv delay={0.05}><div className="adm-panel p-4 ana-card">
              <div className="text-slate-400 text-xs">Views</div>
              <div className="text-white text-2xl font-bold ana-text">{fmt.format(data.summary.views)}</div>
            </div></MotionDiv>
            <MotionDiv delay={0.1}><div className="adm-panel p-4 ana-card">
              <div className="text-slate-400 text-xs">Users</div>
              <div className="text-white text-2xl font-bold ana-text">{fmt.format(data.summary.users)}</div>
            </div></MotionDiv>
            <MotionDiv delay={0.15}><div className="adm-panel p-4 ana-card">
              <div className="text-slate-400 text-xs">Sessions</div>
              <div className="text-white text-2xl font-bold ana-text">{fmt.format(data.summary.sessions)}</div>
            </div></MotionDiv>
          </div>

          {/* Time series */}
          <MotionDiv delay={0.2}><div className="adm-panel p-4">
            <h3 className="text-white font-semibold mb-2">Evolução (Views, Users, Sessions)</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={data.timeSeries} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
                  <defs>
                    <linearGradient id="gradViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="gradSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a3e635" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#a3e635" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
                  <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip content={<LineTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#22d3ee" strokeWidth={2} dot={false} fill="url(#gradViews)" />
                  <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} dot={false} fill="url(#gradUsers)" />
                  <Line type="monotone" dataKey="sessions" stroke="#a3e635" strokeWidth={2} dot={false} fill="url(#gradSessions)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div></MotionDiv>

          {/* Top channels pie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MotionDiv delay={0.25}><div className="adm-panel p-4">
              <h3 className="text-white font-semibold mb-2">Canais (Sessions)</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie dataKey="sessions" data={data.topChannels} nameKey="channel" outerRadius={100} fill="#8884d8">
                      {data.topChannels.map((_, i) => (
                        <Cell key={`c-${i}`} fill={["#22d3ee","#8b5cf6","#a3e635","#f59e0b","#e879f9","#60a5fa"][i % 6]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div></MotionDiv>

            {/* Top events bar */}
            {data.topEvents && data.topEvents.length > 0 && (
              <MotionDiv delay={0.3}><div className="adm-panel p-4">
                <h3 className="text-white font-semibold mb-2">Eventos</h3>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={data.topEvents}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
                      <XAxis dataKey="eventName" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                      <Tooltip content={<LineTooltip />} />
                      <Bar dataKey="eventCount" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div></MotionDiv>
            )}
          </div>
        </>
      )}
    </div>
  );
}


