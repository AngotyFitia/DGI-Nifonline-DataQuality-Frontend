import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from "recharts";

export default function QualityChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--text-secondary)" interval={0} tick={{ fontSize: 13, fill: "var(--text-secondary)" }}/>
        <YAxis stroke="var(--text-secondary)" tick={{ fontSize: 12, fill: "var(--text-secondary)" }}/>
        <Tooltip contentStyle={{ backgroundColor: "var(--bg-secondary)", borderRadius: "6px", border: "1px solid var(--border)", color: "var(--text-primary)", }}/>
        <Legend verticalAlign="top" height={30} />
        <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, stroke: "var(--primary)", fill: "white" }} activeDot={{ r: 6, stroke: "var(--primary)", fill: "var(--primary)" }}/>
      </LineChart>
    </ResponsiveContainer>
  );
}
