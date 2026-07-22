import DashboardCard from "../../components/ui/DashboardCard";
import Card from "../../components/ui/Card";
import { useUtilisateurKpi } from "../../hooks/useUtilisateur";
import { useSecuriteKpi, useAlertesSecurite } from "../../hooks/useSecurite";

export default function DashboardUtilisateurs() {
  const token = localStorage.getItem("jwt") || "";
  const { kpi, loading, error } = useUtilisateurKpi(token);
  const { kpi: securiteKpi, loading: secLoading, error: secError } = useSecuriteKpi(token);
  const { alertes, loading: alertLoading, error: alertError } = useAlertesSecurite(token);

  if (loading || secLoading || alertLoading) return <p>Chargement...</p>;
  if (error || secError || alertError) return <p className="text-red-500">{error || secError || alertError}</p>;

  return (
    <div className="space-y-6">
      {kpi && (
        <DashboardCard title="Statistique des utilisateurs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card><p>Total utilisateurs</p><p>{kpi.total}</p></Card>
            <Card><p>Actifs</p><p>{kpi.actifs}</p></Card>
            <Card><p>Inactifs</p><p>{kpi.inactifs}</p></Card>
            <Card><p>Nouveaux (7 jours)</p><p>{kpi.nouveaux7Jours}</p></Card>
          </div>
        </DashboardCard>
      )}
  
      {securiteKpi && (
        <DashboardCard title="Sécurité">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <p>Tentatives échouées</p>
              <p className="text-2xl font-bold text-red-600">{securiteKpi.tentativesEchouees}</p>
            </Card>
            <Card>
              <p>Sessions actives</p>
              <p className="text-2xl font-bold text-green-600">{securiteKpi.sessionsActives}</p>
            </Card>
          </div>
        </DashboardCard>
      )}
  
      <DashboardCard title="Alertes de sécurité">
        {alertes.length === 0 ? (
          <p>Aucune alerte</p>
        ) : (
          <ul className="list-disc pl-6">
            {alertes.map((a) => (
              <li key={a.id}>{a.email} — {a.tentativesEchouees} tentatives échouées</li>
            ))}
          </ul>
        )}
      </DashboardCard>
    </div>
  );
  
}
