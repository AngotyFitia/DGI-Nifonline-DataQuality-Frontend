import Tabs from "../../../components/ui/Tabs";
import { FileSpreadsheet, CheckCircle2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import DashboardCard from "../../../components/ui/DashboardCard";
import Alert from "../../../components/ui/Alert";
import { useRef, useState } from "react";
import { useUploadActivites } from "../../../hooks/useImport";
import type { ImportReport } from "../../../types/import";

type FileKey = "secteurs" | "activites";
type FilesState = Record<FileKey, File | null>;

export default function ImportActivites() {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [files, setFiles] = useState<FilesState>({secteurs: null,activites: null,});
  
  const token = localStorage.getItem("jwt") || undefined;
  const uploadActivitesMutation = useUploadActivites(token);
  const { mutate: uploadAll, status } = uploadActivitesMutation;
  const loading = status === "pending";
  const [reports, setReports] = useState<Record<FileKey, ImportReport | null>>({secteurs: null, activites: null,});
  const handleFileChangeLocal = ( e: React.ChangeEvent<HTMLInputElement>,key: FileKey) => {
    const file = e.target.files?.[0] || null;
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const tabs = [
    { key: "secteurs", label: "Secteurs" },
    { key: "activites", label: "Activités" },
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

  const handleImport = () => {
    Object.entries(files)
      .filter(([_, file]) => file !== null)
      .forEach(([type, file]) => {
        uploadAll(
          { type: type as FileKey, file: file! },
          {
            onSuccess: (data) => {
              console.log("Réponse backend:", data);
              setReports((prev) => ({
                ...prev,
                [type]: data,
              }));
            },       
            onError: (err: any) => {
              setReports((prev) => ({
                ...prev,
                [type]: {
                  total: err.total ?? 0,
                  success: err.success ?? 0,
                  error: err.error ?? 0,
                  message: err.message ?? "Erreur inconnue",
                },
              }));
            },                      
          }
        );
      });
  
    setFiles({ secteurs: null, activites: null });
    Object.keys(inputRefs.current).forEach((key) => {
      if (inputRefs.current[key]) {
        inputRefs.current[key]!.value = "";
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <DashboardCard title="Import des activités économiques">
        <Tabs tabs={tabsContent} />
        <div className="flex justify-end gap-3">
          <Button variant="secondary">Annuler</Button>
          <Button variant="primary" onClick={handleImport} disabled={ !files.secteurs && !files.activites} >
            {loading ? "Import en cours..." : "Importer tout"}
          </Button>
        </div>
        <div className="mt-4 space-y-3">
          {tabs.map((t) => {
            const report = reports[t.key];
            if (!report) return null;
            console.log("Nombre d'erreur"+Number(report.error))
            const type = Number(report.error) > 0 ? "error" : "success";
            const lines = report.message.split("\n").filter(Boolean);

            return (
              <Alert key={t.key} type={type}
                message={
                  <>
                    <p>
                      {`Import ${t.label} : ${report.success}/${report.total} réussis, ${report.error} erreurs.`}
                    </p>
                    <ul className="list-disc ml-4">
                      {lines.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </>
                }
              />
            );
          })}
        </div>
      </DashboardCard>

      <DashboardCard title="Informations système">
        <Alert type="info" message="Chaque entité peut être importée via un fichier séparé"/>
        <Alert type="warning" message="Les données sont liées hiérarchiquement (Secteurs → Activités)"/>
      </DashboardCard>
    </div>
  );
}
