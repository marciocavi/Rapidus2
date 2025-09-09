// src/app/preview/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { SectionRegistry, SectionKey } from "@/ui/sections/registry";

type Payload = {
  section: SectionKey;
  props: Record<string, any>;
};

export default function PreviewPage() {
  const [payload, setPayload] = useState<Payload>(() => {
    const params = new URLSearchParams(window.location.search);
    const section = (params.get("section") || "hero") as SectionKey;
    return { section, props: {} };
  });

  // Recebe updates em tempo real vindos do Admin
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (!e.data || e.data.type !== "SECTION_PREVIEW_UPDATE") return;
      const { section, props } = e.data as Payload & { type: string };
      setPayload({ section, props });
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const SectionComp = useMemo(() => SectionRegistry[payload.section], [payload.section]);

  // Renderiza apenas a seção, sem nenhum layout adicional
  return (
    <div className="w-full h-full bg-slate-950">
      <SectionComp {...payload.props} />
    </div>
  );
}
