import DashboardCard from "../../ui/DashboardCard";
import Button from "../../../components/ui/Button";

export default function AnalyseIATab({ selected }: any) {

  const ia = selected.analyseIA;

  const getStatus = (score: number) => {
    if (score >= 85) return { label: "Données fiables", color: "bg-green-100 text-green-700" };
    if (score >= 70) return { label: "À vérifier", color: "bg-yellow-100 text-yellow-700" };
    return { label: "Critique", color: "bg-red-100 text-red-700" };
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const status = getStatus(ia.dernierScore);

  return (
    <div className="space-y-6">
      <DashboardCard title="Analyse IA">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--text-secondary)]"> Dernière analyse</p>
            <p className="font-semibold text-[var(--text-primary)]">{selected.date}</p>
            <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}> {status.label}</span>
          </div>

          <div className="text-left md:text-right">
            <p className="text-sm text-[var(--text-secondary)]"> Score qualité</p>
            <p className={`text-3xl font-bold ${getScoreColor(selected.score)}`}> {selected.score}%</p>
          </div>
        </div>
      </DashboardCard>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Score IA">
          <p className={`text-2xl font-bold ${getScoreColor(ia.dernierScore)}`}>{ia.dernierScore}%</p>
        </DashboardCard>
        <DashboardCard title="Données manquantes">
          <p className={`text-2xl font-bold ${ ia.anomalies.donneesManquantes === 0 ? "text-green-600": ia.anomalies.donneesManquantes <= 2 ? "text-yellow-600": "text-red-600"}`}> {ia.anomalies.donneesManquantes}</p>
        </DashboardCard>

        <DashboardCard title="Incohérences">
          <p className={`text-2xl font-bold ${ ia.anomalies.incoherences === 0 ? "text-green-600": ia.anomalies.incoherences <= 1 ? "text-yellow-600" : "text-red-600"}`}>{ia.anomalies.incoherences}</p>
        </DashboardCard>

        <DashboardCard title="Doublons">
          <p className={`text-2xl font-bold ${ ia.anomalies.doublons === 0 ? "text-green-600": "text-red-600"}`}>{ia.anomalies.doublons}</p>
        </DashboardCard>
      </div>

      <DashboardCard title="Recommandation générale">
        <div className="space-y-3">
          <p className="text-[var(--text-secondary)]">{ia.resume}</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {ia.recommandations.map((r: string, i: number) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
          <Button variant="primary">Voir les recommandations détaillées</Button>
        </div>
      </DashboardCard>
    </div>
  );
}