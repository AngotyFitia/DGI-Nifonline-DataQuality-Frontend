import { PieChart, Pie, Cell, ResponsiveContainer} from "recharts";
import { anomalyData } from "../../data/dashboardData";
  
export default function AnomalyChart() {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-[180px] h-[180px]">
                <ResponsiveContainer>
                <PieChart>
                    <Pie data={anomalyData} dataKey="value" innerRadius={50} outerRadius={75}>
                    {anomalyData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color}/>
                    ))}
                    </Pie>
                </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-2 w-full">
                {anomalyData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}/>
                        <span>{item.name}</span>
                    </div>
                    <span className="text-[var(--text-secondary)]">
                    {item.value} %
                    </span>
                </div>
                ))}
            </div>
        </div>
    );
}