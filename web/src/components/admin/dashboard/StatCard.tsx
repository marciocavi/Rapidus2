import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  delta?: string;
  right?: ReactNode;
}

export default function StatCard({
  icon,
  label,
  value,
  delta,
  right,
}: StatCardProps) {
  return (
    <section 
      className="adm-panel adm-card--glass" 
      style={{ padding: 16, position: "relative" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="adm-badge">{icon}</div>
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
          <div className="adm-metric" style={{ fontSize: 28, fontWeight: 700 }}>
            {value}
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          {right || (delta && (
            <span style={{ fontSize: 12, opacity: 0.8 }}>{delta}</span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <div id="mini-chart-slot" />
      </div>
    </section>
  );
}




