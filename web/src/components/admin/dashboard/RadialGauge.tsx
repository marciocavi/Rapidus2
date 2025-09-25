'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface RadialGaugeProps {
  value: number; // 0-100
  label?: string;
  size?: number;
}

export default function RadialGauge({ value, label, size = 120 }: RadialGaugeProps) {
  const data = [
    { name: 'completed', value: value, fill: 'url(#gaugeGrad)' },
    { name: 'remaining', value: 100 - value, fill: 'rgba(255,255,255,0.1)' }
  ];

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--neonC)" />
              <stop offset="100%" stopColor="var(--neonB)" />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.3}
            outerRadius={size * 0.45}
            startAngle={90}
            endAngle={450}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill}
                style={{ 
                  filter: index === 0 ? "drop-shadow(0 0 8px rgba(168,85,247,.6))" : "none"
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center text */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'var(--textPrimary)'
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700 }}>
          {value}%
        </div>
        {label && (
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
}




