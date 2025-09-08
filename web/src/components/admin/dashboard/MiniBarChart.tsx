'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface MiniBarChartProps {
  data: { x: string | number; y: number }[];
}

export default function MiniBarChart({ data }: MiniBarChartProps) {
  return (
    <div style={{ height: 80 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
          <XAxis dataKey="x" hide />
          <YAxis hide />
          <Tooltip 
            contentStyle={{
              background: "#0f1320",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "8px",
              color: "#E6F0FF"
            }} 
          />
          <Bar 
            dataKey="y" 
            fill="#22d3ee"
            radius={[2, 2, 0, 0]}
            style={{ filter: "drop-shadow(0 0 8px rgba(168,85,247,.6))" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
