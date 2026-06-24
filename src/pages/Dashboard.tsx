import { useState } from "react";
import StatCard from "../components/ui/StatCard";
import DashboardCard from "../components/ui/DashboardCard";
import QualityChart from "../components/ui/QualityChart";
import AnomalyChart from "../components/ui/AnomalyChart";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Dropdown from "../components/ui/DropDown";
import { qualityData, recentActivities, stats } from "../data/dashboardData";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const now = new Date();
  const [qualityRange, setQualityRange] = useState("6m");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredActivities = recentActivities.filter((item) => {
    const matchSearch = item.contribuable.toLowerCase().includes(search.toLowerCase());
    const itemDate = new Date(item.date).getTime();
    const start = startDate ? new Date(startDate).getTime() : null;
    const end = endDate ? new Date(endDate).getTime() : null;
    const matchStart = start ? itemDate >= start : true;
    const matchEnd = end ? itemDate <= end : true;
    const matchStatus = statusFilter === "all" ? true : item.statut === statusFilter;
    return matchSearch && matchStart && matchEnd && matchStatus;
  });
  const filteredQualityData = qualityData.filter((item) => {
    const itemDate = new Date(item.date);
    const diffMonths = (now.getFullYear() - itemDate.getFullYear()) * 12 + (now.getMonth() - itemDate.getMonth());
    if (qualityRange === "3m") return diffMonths <= 3;
    if (qualityRange === "6m") return diffMonths <= 6;
    if (qualityRange === "1y") return diffMonths <= 12;
    return true;
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]"> Bonjour, Agent Fiscal</h1>
        <p className="mt-2 text-[var(--text-secondary)]"> Voici un aperçu général de la qualité des données.</p>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} color={stat.color}/>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardCard title="Evolution du score qualité" action={
          <Dropdown value={qualityRange} onChange={setQualityRange}
            options={[  { label: "3 derniers mois", value: "3m" }, 
                        { label: "6 derniers mois", value: "6m" }, 
                          { label: "1 an", value: "1y" },]}
          />}
        >
        <QualityChart data={filteredQualityData} />
        </DashboardCard>

        <DashboardCard title="Répartition des anomalies">
          <AnomalyChart />
        </DashboardCard>
      </div>
      <DashboardCard title="Activités récentes">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input type="text" placeholder="Rechercher un contribuable..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1"/>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full md:w-auto"/>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full md:w-auto"/>
          <Dropdown value={statusFilter} onChange={setStatusFilter} options={[
              { label: "Tous les statuts", value: "all" },
              { label: "Succès", value: "Succès" },
              { label: "Anomalie", value: "Anomalie" },
              { label: "En cours", value: "En cours" },
            ]}
            className="w-full md:w-auto"
          />
        </div>
        <Table headers={[{label:"Contribuable", align:"left"}, {label: "Action", align: "left"}, {label: "Statut", align: "left"}, {label: "Date", align: "left"}]}>
          {filteredActivities.map((item) => (
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