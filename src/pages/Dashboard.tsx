import StatCard from "../components/ui/StatCard";
import DashboardCard from "../components/ui/DashboardCard";
import QualityChart from "../components/ui/QualityChart";
import AnomalyChart from "../components/ui/AnomalyChart";
import Table from "../components/ui/Table";
import { recentActivities, stats } from "../data/dashboardData";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          Bonjour, Agent Fiscal
        </h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          Voici un aperçu général de la qualité des données.
        </p>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} color={stat.color}/>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      <DashboardCard title="Evolution du score qualité" action={
          <select className=" text-sm bg-transparent border border-[var(--border)] rounded-mdpx-2 py-1">
            <option>6 derniers mois</option>
          </select>
        }
      >
      <QualityChart />
      </DashboardCard>

      <DashboardCard title="Répartition des anomalies">
        <AnomalyChart />
      </DashboardCard>
    </div>
    <DashboardCard title="Activités récentes">
        <Table headers={["Contribuable", "Action", "Statut", "Date"]}>
          {recentActivities.map((item) => (
            <tr key={item.id} className="border-t border-[var(--border)]">
              <td className="p-3">{item.contribuable}</td>
              <td className="p-3">{item.action}</td>
              <td className="p-3">
                <span className={ item.statut === "Succès" ? "text-green-500" : item.statut === "Anomalie" ? "text-red-500": "text-yellow-500"}>
                  {item.statut}
                </span>
              </td>
              <td className="p-3 text-[var(--text-secondary)]">
                {item.date}
              </td>
            </tr>
          ))}
        </Table>
      </DashboardCard>
    </div>
  );
}