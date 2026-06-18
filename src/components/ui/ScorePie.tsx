import { PieChart, Pie, Cell } from "recharts";

export default function ScorePie({ value }: { value: number }) {
  const data = [
    { name: "score", value },
    { name: "restant", value: 100 - value },
  ];

  return (
    <PieChart width={120} height={120}>
      <Pie
        data={data}
        innerRadius={35}
        outerRadius={55}
        dataKey="value"
      >
        <Cell fill="#22c55e" />
        <Cell fill="var(--surface-hover)" />
      </Pie>
    </PieChart>
  );
}