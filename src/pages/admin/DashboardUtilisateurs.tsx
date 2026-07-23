import { useState } from "react";
import DashboardCard from "../../components/ui/DashboardCard";
import Card from "../../components/ui/Card";
import { useUtilisateurKpi, useInscriptionsParMoisRange } from "../../hooks/useUtilisateur";
import { useProfilKpi } from "../../hooks/useProfils";
import GenericPieChart from "../../components/ui/GenericPieChart";
import QualityChart from "../../components/ui/QualityChart";

export default function DashboardUtilisateurs() {
  const token = localStorage.getItem("jwt") || "";
  const { kpi, loading, error } = useUtilisateurKpi(token);
  const { kpi: profilKpi, loading: profilLoading, error: profilError } = useProfilKpi(token);

  const [year] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState(`${year}-01-01`);
  const [endDate, setEndDate] = useState(`${year}-12-31`);
  const { data: inscriptionsData, loading: insLoading, error: insError } =
    useInscriptionsParMoisRange(token, startDate, endDate);

  if (loading || profilLoading || insLoading)
    return <p>Chargement...</p>;
  if (error || profilError || insError)
    return <p className="text-red-500">{error || profilError || insError}</p>;

  const profilChartData = profilKpi
    ? Object.entries(profilKpi.repartition).map(([name, value]) => ({
        name,
        value: value as number,
      }))
    : [];

  const inscriptionsChartData = inscriptionsData.map((d) => ({
    month: d.month,
    score: d.count,
  }));

  return (
    <div className="space-y-6">
      {kpi && (
        <DashboardCard title="Statistique des utilisateurs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <p className="text-sm text-[var(--text-secondary)]">Total utilisateurs</p>
              <p className="text-2xl font-bold text-[var(--primary)]">{kpi.total}</p>
            </Card>
            <Card>
              <p className="text-sm text-[var(--text-secondary)]">Actifs</p>
              <p className="text-2xl font-bold text-[var(--success)]">{kpi.actifs}</p>
            </Card>
            <Card>
              <p className="text-sm text-[var(--text-secondary)]">Inactifs</p>
              <p className="text-2xl font-bold text-[var(--danger)]">{kpi.inactifs}</p>
            </Card>
            <Card>
              <p className="text-sm text-[var(--text-secondary)]">Nouveaux (7 jours)</p>
              <p className="text-2xl font-bold text-[var(--warning)]">{kpi.nouveaux7Jours}</p>
            </Card>
          </div>
        </DashboardCard>
      )}

      {/* Charts côte à côte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DashboardCard title="Évolution des inscriptions">
          <div className="flex gap-4 mb-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-primary)]"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-primary)]"
            />
          </div>

          {insLoading ? (
            <p>Chargement...</p>
          ) : insError ? (
            <p className="text-red-500">{insError}</p>
          ) : (
            <QualityChart data={inscriptionsChartData} />
          )}
        </DashboardCard>
        {profilKpi && (
          <DashboardCard title="Répartition par profil">
            <GenericPieChart data={profilChartData} />
          </DashboardCard>
        )}
      </div>
    </div>
  );
}
