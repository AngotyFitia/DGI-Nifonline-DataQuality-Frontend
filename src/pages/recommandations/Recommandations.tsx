import DashboardCard from "../../components/ui/DashboardCard";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

import { analysesIA } from "../../data/analysesData";
import { Eye, CheckCircle2 } from "lucide-react";
import { useState } from "react";

type FlatRecommendation = {
  id: string;
  entite: string;
  nif: string;
  score: number;
  centreFiscal: string;
  recommendation: string;
  statut: "OK" | "RISQUE" | "CRITIQUE";
};

export default function Recommendations() {
  const [data, setData] = useState<FlatRecommendation[]>(
    analysesIA.flatMap((item) =>
      (item.recommandations || []).map((rec, index) => ({
        id: `${item.id}-${index}`,
        entite: item.entite,
        nif: item.nif,
        score: item.score,
        centreFiscal: item.centreFiscal,
        recommendation: rec,
        statut: item.statut,
      }))
    )
  );

  const getBadge = (statut: string) => {
    switch (statut) {
      case "CRITIQUE":
        return <Badge label="Critique" color="red" />;
      case "RISQUE":
        return <Badge label="Risque" color="yellow" />;
      default:
        return <Badge label="OK" color="green" />;
    }
  };

  const markResolved = (id: string) => {
    setData((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="space-y-6">

      <DashboardCard title="Recommandations IA">
        <div className="space-y-3">
          <Alert type="info" message="Les recommandations sont générées automatiquement à partir de l’analyse des contribuables"/>
          <Alert type="warning" message="Les recommandations critiques doivent être traitées en priorité"/>
        </div>
      </DashboardCard>
      <DashboardCard title="Liste des recommandations IA">

        <Table headers={[ { label: "Entité" }, { label: "NIF" }, { label: "Recommandation" }, { label: "Score" }, { label: "Statut" }, { label: "Actions", align: "right" },]}>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-[var(--bg-primary)]">
              <td className="p-3 font-medium">{item.entite}</td>
              <td className="p-3 text-sm text-[var(--text-secondary)]"> {item.nif}</td>
              <td className="p-3 text-sm text-[var(--text-primary)]"> {item.recommendation}</td>
              <td className="p-3 font-semibold text-blue-500"> {item.score}</td>
              <td className="p-3">{getBadge(item.statut)}</td>
              <td className="p-3 flex justify-end gap-2">
                <Button variant="secondary"><Eye size={16} /></Button>
                <Button variant="success" onClick={() => markResolved(item.id)}><CheckCircle2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </Table>

      </DashboardCard>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Total recommandations">
          <p className="text-2xl font-bold text-blue-500">{data.length}</p>
        </DashboardCard>
        <DashboardCard title="Critiques">
          <p className="text-2xl font-bold text-red-500">{data.filter((d) => d.statut === "CRITIQUE").length}</p>
        </DashboardCard>
        <DashboardCard title="Résolues">
          <p className="text-2xl font-bold text-green-500">0</p>
        </DashboardCard>
      </div>
    </div>
  );
}