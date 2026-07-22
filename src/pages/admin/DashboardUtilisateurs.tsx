import DashboardCard from "../../components/ui/DashboardCard";
import Card from "../../components/ui/Card";
import { useUtilisateurKpi } from "../../hooks/useUtilisateur";

export default function DashboardUtilisateurs() {
  const token = localStorage.getItem("jwt") || "";
  const { kpi, loading, error } = useUtilisateurKpi(token);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!kpi) return null;

  return (
    <div className="space-y-6">
      <DashboardCard title="Statistique des utilisateurs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <p className="text-sm text-[var(--text-secondary)]">Total utilisateurs</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{kpi.total}</p>
          </Card>
          <Card>
            <p className="text-sm text-[var(--text-secondary)]">Actifs</p>
            <p className="text-2xl font-bold text-green-600">{kpi.actifs}</p>
          </Card>
          <Card>
            <p className="text-sm text-[var(--text-secondary)]">Inactifs</p>
            <p className="text-2xl font-bold text-red-600">{kpi.inactifs}</p>
          </Card>
          <Card>
            <p className="text-sm text-[var(--text-secondary)]">Nouveaux (7 jours)</p>
            <p className="text-2xl font-bold text-yellow-600">{kpi.nouveaux7Jours}</p>
          </Card>
        </div>
      </DashboardCard>
    </div>
  );
}
