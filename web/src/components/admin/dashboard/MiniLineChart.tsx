'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface MiniLineChartProps {
  data: { x: string | number; y: number }[];
}

export default function MiniLineChart({ data }: MiniLineChartProps) {
  return (
    <div style={{ height: 80 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
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
          <Line 
            type="monotone" 
            dataKey="y" 
            stroke="#60a5fa" 
            strokeWidth={3} 
            dot={false}
            style={{ filter: "drop-shadow(0 0 8px rgba(168,85,247,.6))" }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
