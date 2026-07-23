import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", padding: "8px", borderRadius: "var(--radius-sm)", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", }}>
        <p style={{ margin: 0, fontWeight: "bold" }}>{name}</p>
        <p style={{ margin: 0 }}>{value} utilisateurs</p>
      </div>
    );
  }
  return null;
}

function CustomLegend({ payload }: any) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} style={{ color: "var(--text-secondary)" }}>
          <span style={{ display: "inline-block", width: 12, height: 12, backgroundColor: entry.color, marginRight: 8, borderRadius: 2, }}/>
          {entry.value}
        </li>
      ))}
    </ul>
  );
}


type PieData = { name: string; value: number };

export default function GenericPieChart({ data }: { data: PieData[] }) {
  const COLORS = [
    "var(--primary)",
    "var(--success)",
    "var(--warning)",
    "var(--danger)",
    "var(--primary-soft)",
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}label>
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
