import { useState } from "react";
import { Eye, CheckCircle2 } from "lucide-react";
import DashboardCard from "../../components/ui/DashboardCard";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Modal from "../../components/ui/Modal";
import Toast from "../../components/ui/Toast";

import { analysesIA } from "../../data/analysesData";

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

  const [selected, setSelected] =
    useState<FlatRecommendation | null>(null);

  const [resolvedCount, setResolvedCount] = useState(0);

  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning" | "info";
    message: string;
  } | null>(null);

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

    setResolvedCount((prev) => prev + 1);

    setToast({
      type: "success",
      message: "Recommandation marquée comme traitée",
    });
  };

  return (
    <div className="space-y-6">

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Recommandations</h2>
      </div>
      <DashboardCard title="Recommandations IA">
        <div className="space-y-3">
          <Alert type="info" message="Les recommandations sont générées automatiquement à partir des analyses IA."/>
          <Alert type="warning" message="Les recommandations critiques doivent être traitées en priorité."/>
        </div>
      </DashboardCard>

      <DashboardCard title="Liste des recommandations IA">
        <Table headers={[{ label: "Entité" }, { label: "NIF" }, { label: "Recommandation", align: "left" },{ label: "Score", align: "left" },{ label: "Statut", align: "left" },{ label: "Actions", align: "center" },]}>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-[var(--bg-primary)]">
              <td className="p-3 font-medium text-[var(--text-primary)]">{item.entite}</td>
              <td className="p-3 text-sm text-[var(--text-secondary)]">{item.nif}</td>
              <td className="p-3 text-sm text-[var(--text-primary)]">{item.recommendation}</td>
              <td className="p-3">
                <span className="font-semibold text-[var(--primary)]">{item.score}</span>
              </td>

              <td className="p-3">
                {getBadge(item.statut)}
              </td>

              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setSelected(item)}>
                    <Eye size={16} />
                  </Button>
                  <Button variant="success" onClick={() => markResolved(item.id)}>
                    <CheckCircle2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </DashboardCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Total recommandations">
          <p className="text-3xl font-bold text-[var(--primary)]">{data.length}</p>
        </DashboardCard>

        <DashboardCard title="Critiques">
          <p className="text-3xl font-bold text-red-500">
            {
              data.filter(
                (d) => d.statut === "CRITIQUE"
              ).length
            }
          </p>
        </DashboardCard>

        <DashboardCard title="Résolues">
          <p className="text-3xl font-bold text-green-500"> {resolvedCount}</p>
        </DashboardCard>
      </div>

      <Modal open={selected !== null} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Détail de la recommandation</h2>
            <div className="space-y-2">
              <p>
                <strong>Entité :</strong>{" "}
                {selected.entite}
              </p>
              <p>
                <strong>NIF :</strong>{" "}
                {selected.nif}
              </p>
              <p>
                <strong>Centre fiscal :</strong>{" "}
                {selected.centreFiscal}
              </p>
              <p>
                <strong>Score :</strong>{" "}
                {selected.score}
              </p>
              <p>
                <strong>Statut :</strong>{" "}
                {selected.statut}
              </p>
            </div>
            <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--surface)]">
              <p className="font-medium mb-2">Recommandation IA</p>
              <p className="text-[var(--text-secondary)]">
                {selected.recommendation}
              </p>
            </div>

            <div className="flex justify-end">
              <Button variant="primary" onClick={() => setSelected(null)}>Fermer</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}