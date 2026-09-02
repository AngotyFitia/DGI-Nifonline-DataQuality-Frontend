import { useState } from "react";
import DashboardCard from "../../../components/ui/DashboardCard";
import Table from "../../../components/ui/Table";
import Pagination from "../../../components/ui/Pagination";
import Input from "../../../components/ui/Input";
import Dropdown from "../../../components/ui/DropDown";
import Button from "../../../components/ui/Button";
import Alert from "../../../components/ui/Alert";
import { useFormesJuridiques } from "../../../hooks/useImport";
import { importFormesJuridiques } from "../../../services/formesJuridiquesService";
import { CheckCircle, XCircle, Upload } from "lucide-react";
import type { ImportReport } from "../../../types/import";

export default function ListeFormesJuridiques() {
    const [abreviation, setAbreviation] = useState("tous");
    const [intitule, setIntitule] = useState("tous");
    const [description, setDescription] = useState("tous");
    const [etat, setEtat] = useState("tous");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    
    const token = localStorage.getItem("jwt") || "";
    const { data, isLoading } = useFormesJuridiques(token, abreviation, intitule, description, etat, page, size);
    const [importReport, setImportReport] = useState<ImportReport | null>(null);

    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const token = localStorage.getItem("jwt");
        try {
        const report: ImportReport = await importFormesJuridiques(token, file);
        setImportReport(report);
        setPage(0);
        } catch (err: any) {
        setImportReport({ total: 0, success: 0, error: 0, message: err.message,status: "error", });
        }
    };

    if (isLoading) return <p>Chargement...</p>;
    if (!data) return <p>Aucune donnée</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Liste des formes juridiques</h2>
        <div>
        <input type="file" accept=".csv,.xlsx" id="file-upload" style={{ display: "none" }} onChange={handleImport}/>
          <Button variant="secondary" onClick={() => document.getElementById("file-upload")?.click()}>
            <Upload size={16} />
          </Button>
        </div>
      </div>

      {importReport && (
        <div className="mt-4">
          <Alert
            type={importReport.error > 0 ? "error" : "success"}
            message={
              <>
                <p>
                  {`Import formes juridiques : ${importReport.success}/${importReport.total} réussis, ${importReport.error} erreurs.`}
                </p>
                <ul className="list-disc ml-4">
                  {importReport.message.split("\n").filter(Boolean).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </>
            }
          />
        </div>
      )}

      <DashboardCard title="">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input placeholder="Abréviation..." value={abreviation === "tous" ? "" : abreviation}onChange={(e) => { setAbreviation(e.target.value || "tous"); setPage(0);}}/>
          <Input placeholder="Intitulé..." value={intitule === "tous" ? "" : intitule}onChange={(e) => { setIntitule(e.target.value || "tous"); setPage(0);}}/>
          <Input placeholder="Description..." value={description === "tous" ? "" : description} onChange={(e) => { setDescription(e.target.value || "tous");setPage(0);}}/>
          <Dropdown value={etat} onChange={(val) => { setEtat(val); setPage(0);}} options={[{ label: "Tous les états", value: "tous" },{ label: "Validé", value: "1" },{ label: "En attente", value: "0" }]}/>
        </div>
      </DashboardCard>

      <DashboardCard title="">
        <Table headers={[
          { label: "Abréviation", align: "left" },
          { label: "Intitulé", align: "left" },
          { label: "Description", align: "left" },
          { label: "État", align: "center" },
          { label: "Action", align: "center" }
        ]}>
          {data.content.map((r) => (
            <tr key={r.id} className="border-t border-[var(--border)]">
              <td className="p-3">{r.abreviation}</td>
              <td className="p-3">{r.intitule}</td>
              <td className="p-3">{r.description}</td>
              <td className="p-3"><span className={r.etatCouleur}>{r.etatIntitule}</span></td>
              <td className="p-3">
                <div className="flex gap-2">
                {Number(r.etat) == 0 && Number(r.etat) !== -1 && (
                  <>
                    <Button variant="danger" className="px-2 py-2" ><XCircle size={16} /></Button>
                    <Button variant="success" className="px-2 py-2"><CheckCircle size={16} /></Button>
                  </>
                )} 
                </div>
              </td>
            </tr>
          ))}
        </Table>

        <div className="flex justify-start items-center gap-4 mt-4">
          <label className="text-sm font-medium text-[var(--text-primary)]">Nombre par page :</label>
          <Input type="number" value={size} onChange={(e) => { const newSize = Number(e.target.value) || 10; setSize(newSize); setPage(0);}} className="w-auto text-center" style={{ maxWidth: "80px" }}/>
          <Pagination currentPage={data.number} totalPages={data.totalPages} onPageChange={setPage} />
        </div>
      </DashboardCard>
    </div>
  );
}
