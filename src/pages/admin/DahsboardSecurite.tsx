import DashboardCard from "../../components/ui/DashboardCard";
import Card from "../../components/ui/Card";
import { useSecuriteKpi, useAlertesSecurite } from "../../hooks/useSecurite";

export default function DahsboardSecurite() {
  const token = localStorage.getItem("jwt") || "";
  const { kpi: securiteKpi, loading: secLoading, error: secError } = useSecuriteKpi(token);
  const { alertes, loading: alertLoading, error: alertError } = useAlertesSecurite(token);

  if (secLoading || alertLoading)
    return <p>Chargement...</p>;
  if (secError || alertError )
    return <p className="text-red-500">{secError || alertError}</p>;

  return (
    <div className="space-y-6">
    {securiteKpi && (
        <DashboardCard title="Sécurité">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <p className="text-sm text-[var(--text-secondary)]">Tentatives échouées</p>
              <p className="text-2xl font-bold text-[var(--danger)]">{securiteKpi.tentativesEchouees}</p>
            </Card>
            <Card>
              <p className="text-sm text-[var(--text-secondary)]">Sessions actives</p>
              <p className="text-2xl font-bold text-[var(--success)]">{securiteKpi.sessionsActives}</p>
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
              <li key={a.id}>
                {a.email} — {a.tentativesEchouees} tentatives échouées
              </li>
            ))}
          </ul>
        )}
      </DashboardCard>
    </div>
  );
}