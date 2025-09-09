// src/components/admin/SectionPreviewBar.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SectionKey } from "@/ui/sections/registry";

const HEADER_HEIGHT = 64; // ajuste para a altura real do header do Admin
const BASE_WIDTH = 300;   // largura ainda menor
const BASE_HEIGHT = 120;  // altura ajustada para o HeroStub menor

type Props = {
  activeSection: SectionKey;
  draftProps: Record<string, any>;
};

export default function SectionPreviewBar({ activeSection, draftProps }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [scale, setScale] = useState(1);

  const scaledHeight = useMemo(() => Math.round(BASE_HEIGHT * scale), [scale]);
  const src = useMemo(
    () => `/preview?section=${encodeURIComponent(activeSection)}`,
    [activeSection]
  );

  useEffect(() => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;

    const resize = () => {
      const w = el.clientWidth;
      const newScale = Math.max(0.25, Math.min(1, w / BASE_WIDTH));
      setScale(newScale);
    };

    resize();
    const ro = new (window as any).ResizeObserver(resize);
    ro.observe(el);
    window.addEventListener("orientationchange", resize);
    return () => {
      ro.disconnect?.();
      window.removeEventListener("orientationchange", resize);
    };
  }, []);

  // Envia updates debounced ao iframe (congelado visualmente, mas atualiza render)
  useEffect(() => {
    const id = setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: "SECTION_PREVIEW_UPDATE", section: activeSection, props: draftProps },
        "*" // em produção, substituir pela origin específica
      );
    }, 120);
    return () => clearTimeout(id);
  }, [activeSection, draftProps]);

  return (
    <div className="sticky z-30 border-b border-white/10 bg-slate-900" style={{ top: HEADER_HEIGHT }}>
      <div ref={wrapRef} className="mx-auto w-full max-w-[400px] px-2 py-0">
        <div className="mb-1">
          <h3 className="text-xs font-medium text-slate-300">Preview</h3>
        </div>
        <div
          className="relative overflow-hidden rounded-md shadow-lg ring-1 ring-white/10 bg-slate-800"
          style={{ height: scaledHeight }}
        >
          <div className="origin-top-left" style={{ width: BASE_WIDTH, height: BASE_HEIGHT, transform: `scale(${scale})` }}>
            <iframe
              ref={iframeRef}
              title="Preview da seção"
              src={src}
              className="block border-0"
              style={{ 
                pointerEvents: "none",
                width: BASE_WIDTH,
                height: BASE_HEIGHT
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
