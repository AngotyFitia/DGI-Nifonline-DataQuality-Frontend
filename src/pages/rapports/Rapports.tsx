import { useState } from "react";
import DashboardCard from "../../components/ui/DashboardCard";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import Toast from "../../components/ui/Toast";
import Alert from "../../components/ui/Alert";
import { rapports } from "../../data/rapportsData";
import {FileText, Eye, Download, Trash2, Plus} from "lucide-react";

export default function Rapports() {
  const [data, setData] = useState(rapports);

  const [selectedReport, setSelectedReport] = useState<any>(null);

  const [toast, setToast] = useState<{ message: string; type: "success" | "info";} | null>(null);
  const handleGenerate = () => {
    const newReport = {
      id: Date.now(),
      nom: "Nouveau rapport IA",
      type: "IA",
      date: new Date().toISOString().split("T")[0],
      auteur: "Administrateur",
      statut: "Disponible",
      enregistrements: 500,
      resume: "Rapport généré automatiquement depuis le module IA.",
    };

    setData((prev) => [newReport, ...prev]);
    setToast({
      type: "success",
      message: "Rapport généré avec succès",
    });
  };

  const handleDelete = (id: number) => {
    setData((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setToast({
      type: "info",
      message: "Rapport supprimé",
    });
  };

  const handleDownload = () => {
    setToast({
      type: "success",
      message: "Téléchargement démarré",
    });
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Rapports</h2>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)}/>
      )}

      <DashboardCard title="Informations">
        <div className="space-y-3">
          <Alert type="info" message="Les rapports permettent de suivre la qualité des données fiscales."/>
          <Alert type="warning" message="Pensez à générer régulièrement de nouveaux rapports."/>
        </div>
      </DashboardCard>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <DashboardCard title="Total rapports">
          <p className="text-3xl font-bold text-[var(--primary)]"> {data.length}</p>
        </DashboardCard>
        <DashboardCard title="Rapports qualité">
          <p className="text-3xl font-bold text-blue-500">
            {
              data.filter(
                (r) => r.type === "Qualité"
              ).length
            }
          </p>
        </DashboardCard>
        <DashboardCard title="Rapports IA">
          <p className="text-3xl font-bold text-green-500">
            {
              data.filter(
                (r) => r.type === "IA"
              ).length
            }
          </p>
        </DashboardCard>

        <DashboardCard title="Enregistrements">
          <p className="text-3xl font-bold text-orange-500">
            {data.reduce(
              (sum, r) => sum + r.enregistrements,0
            )}
          </p>
        </DashboardCard>
      </div>

      <DashboardCard title="Gestion des rapports">

        <div className="flex justify-end mb-6">
          <Button variant="primary" onClick={handleGenerate}>
            <Plus size={16} />
            Générer un rapport
          </Button>
        </div>

        <Table headers={[ { label: "Nom" }, { label: "Type" },{ label: "Date" },{ label: "Auteur" },{ label: "Statut" },{ label: "Actions", align: "right" },]}>
          {data.map((report) => (
            <tr key={report.id} className="hover:bg-[var(--surface)]">
              <td className="p-3 font-medium">{report.nom}</td>
              <td className="p-3">{report.type}</td>
              <td className="p-3">{report.date}</td>
              <td className="p-3">{report.auteur}</td>
              <td className="p-3">
                <Badge label={report.statut} color="green"/>
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setSelectedReport(report)}><Eye size={16} /></Button>
                  <Button variant="primary" onClick={handleDownload}><Download size={16} /></Button>
                  <Button variant="danger" onClick={() => handleDelete(report.id)}><Trash2 size={16} /></Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>

      </DashboardCard>

      <Modal open={selectedReport !== null} onClose={() =>setSelectedReport(null)}>
        {selectedReport && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <FileText className="text-[var(--primary)]"size={28}/>
              <h2 className="text-xl font-semibold">{selectedReport.nom}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <DashboardCard title="Type">
                {selectedReport.type}
              </DashboardCard>
              <DashboardCard title="Auteur">
                {selectedReport.auteur}
              </DashboardCard>
              <DashboardCard title="Date">
                {selectedReport.date}
              </DashboardCard>
              <DashboardCard title="Enregistrements">
                {selectedReport.enregistrements}
              </DashboardCard>
            </div>

            <DashboardCard title="Résumé">
              <p className="text-[var(--text-secondary)]"> {selectedReport.resume}</p>
            </DashboardCard>
            <div className="flex justify-end">
              <Button variant="primary" onClick={() => setSelectedReport(null)}>Fermer</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}