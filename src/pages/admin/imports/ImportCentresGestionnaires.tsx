import Tabs from "../../../components/ui/Tabs";
import { FileSpreadsheet, CheckCircle2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import DashboardCard from "../../../components/ui/DashboardCard";
import Alert from "../../../components/ui/Alert";
import { useRef, useState } from "react";
import { useCentresImport } from "../../../hooks/useImport";
import type { ImportReport } from "../../../types/import";

type FileKey = "coordonnees" | "centres";
type FilesState = Record<FileKey, File | null>;

export default function ImportCentresGestionnaires() {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [files, setFiles] = useState<FilesState>({
    coordonnees: null,
    centres: null,
  });

  const { uploadAll, loading } = useCentresImport();
  const [reports, setReports] = useState<Record<FileKey, ImportReport | null>>({coordonnees: null, centres: null,});
  const handleFileChangeLocal = ( e: React.ChangeEvent<HTMLInputElement>,key: FileKey) => {
    const file = e.target.files?.[0] || null;
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const tabs = [
    { key: "coordonnees", label: "Coordonnnees" },
    { key: "centres", label: "Centres" },
  ] as const;

  const renderUpload = (key: FileKey, label: string) => {
    const file = files[key];
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        {file ? (
          <CheckCircle2 size={40} className="text-[var(--success)]" />
        ) : (
          <FileSpreadsheet size={40} className="text-[var(--primary)]" />
        )}
        <p className="text-sm text-[var(--text-secondary)]">Importer fichier {label.toUpperCase()}</p>
        <Button variant={file ? "success" : "secondary"} onClick={() => inputRefs.current[key]?.click()}>
          {file ? "Fichier importé" : "Choisir un fichier"}
        </Button>
        {file && <p className="text-xs text-[var(--success)]">{file.name}</p>}
        <input ref={(el) => { inputRefs.current[key] = el; }} type="file" accept=".csv,.xlsx" className="hidden" onChange={(e) => handleFileChangeLocal(e, key)}/>
      </div>
    );
  };

  const tabsContent = tabs.map((t) => ({
    label: t.label,
    content: renderUpload(t.key, t.label),
  }));

  const handleImport = async () => {
    try {
      const token = localStorage.getItem("jwt") || undefined;
      const results = await uploadAll(files, token);
  
      setReports(results);
      setFiles({ coordonnees: null, centres: null,});
      Object.keys(inputRefs.current).forEach((key) => {
        if (inputRefs.current[key]) {
          inputRefs.current[key]!.value = "";
        }
      });
  
    } catch (err: any) {
      console.error(err);
      setReports({coordonnees: null, centres: null,});
    }
  };
  

  return (
    <div className="space-y-6">
      <DashboardCard title="Import des centres gestionnaires">
        <Tabs tabs={tabsContent} />
        <div className="flex justify-end gap-3">
          <Button variant="secondary">Annuler</Button>
          <Button variant="primary" onClick={handleImport} disabled={ !files.coordonnees && !files.centres} >
            {loading ? "Import en cours..." : "Importer tout"}
          </Button>
        </div>
      <div className="mt-4 space-y-3">
        {tabs.map((t) => {
          const report = reports[t.key];
          if (!report) return null;
          const type = report.error > 0 ? "error" : "success";
          const msg = `Import ${t.label} : ${report.success}/${report.total} réussis, ${report.error} erreurs.
          Détails : ${report.message}`;
          return <Alert key={t.key} type={type} message={msg} />;
        })}
      </div>

      </DashboardCard>

      <DashboardCard title="Informations système">
        <Alert type="info" message="Chaque entité peut être importée via un fichier séparé"/>
        <Alert type="warning" message="Les données sont liées hiérarchiquement (Coordonnnees → Centres)"/>
      </DashboardCard>
    </div>
  );
}
