import Tabs from "../../components/ui/Tabs";
import { Upload, FileText, FileSpreadsheet, FilePlus, FileCheck2, CheckCircle2 } from "lucide-react";
import Button from "../../components/ui/Button";
import DashboardCard from "../../components/ui/DashboardCard";
import Alert from "../../components/ui/Alert";
import { useRef, useState } from "react";

type FileKey = | "identity" | "activities" | "fiscality"| "contacts";

type FilesState = Record<FileKey, File | null>;
export default function ContribuablesImport({
  handleImport,
}: any) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [files, setFiles] = useState<FilesState>({ identity: null, activities: null, fiscality: null, contacts: null});

  const handleFileChangeLocal = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: FileKey
  ) => {
    const file = e.target.files?.[0] || null;

    setFiles((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  const getIcon = (key: FileKey, file: File | null) => {
    if (file)
      return <CheckCircle2 size={40} className="text-[var(--success)]" />;

    switch (key) {
      case "identity":
        return <FileText size={40} className="text-[var(--primary)]" />;
      case "activities":
        return <FileSpreadsheet size={40} className="text-[var(--primary)]" />;
      case "fiscality":
        return <FileCheck2 size={40} className="text-[var(--primary)]" />;
      case "contacts":
        return <FilePlus size={40} className="text-[var(--primary)]" />;
    }
  };

  const tabs = [
    { key: "identity", label: "Identité" },
    { key: "activities", label: "Activités" },
    { key: "fiscality", label: "Fiscalité" },
    { key: "contacts", label: "Contacts" },
  ] as const;

  const renderUpload = (key: FileKey, label: string) => {
    const file = files[key];

    return (
      <div className="flex flex-col items-center gap-3 py-6">
        {getIcon(key, file)}
        <p className="text-sm text-[var(--text-secondary)]">Importer fichier {label.toUpperCase()}</p>
        <Button variant={file ? "success" : "secondary"} onClick={() => inputRefs.current[key]?.click()}>
          {file ? "Fichier importé" : "Choisir un fichier"}
        </Button>
        {file && (
          <p className="text-xs text-[var(--success)]"> {file.name}</p>
        )}
        <input ref={(el) => { inputRefs.current[key] = el; }} type="file" accept=".csv,.xlsx,.pdf" className="hidden" onChange={(e) => handleFileChangeLocal(e, key)}/>
      </div>
    );
  };

  const tabsContent = tabs.map((t) => ({
    label: t.label,
    content: renderUpload(t.key, t.label),
  }));

  return (
    <div className="space-y-6">
      <DashboardCard title="Import multi-sources des contribuables">
        <div className="space-y-6">
          <Tabs tabs={tabsContent} />
          <div className="space-y-3 text-sm border border-[var(--border)] rounded-lg p-4 bg-[var(--bg-secondary)]">
            <p className="text-[var(--text-secondary)] font-medium">État des fichiers importés</p>
            {tabs.map((t) => {
              const file = files[t.key];
              return (
                <div key={t.key} className="flex items-center justify-between p-2 rounded-md hover:bg-[var(--primary)]/5 transition">
                  <div className="flex items-center gap-2">
                    <Upload size={16} className="text-[var(--primary)]" />
                    <span className="text-[var(--text-primary)]">
                      {t.label}
                    </span>
                  </div>

                  <div className="text-right">
                    {file ? (
                      <span className="text-[var(--success)] text-xs font-medium">
                        {file.name}
                      </span>
                    ) : (
                      <span className="text-[var(--text-secondary)] text-xs">
                        Non importé
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary">Annuler</Button>
            <Button variant="primary" onClick={() => handleImport(files)} disabled={!files.identity}>Importer tout</Button>
          </div>
        </div>
      </DashboardCard>
      <DashboardCard title="Informations système">
        <div className="space-y-3">
          <Alert type="info" message="Chaque contribuable peut être importé via plusieurs fichiers séparés"/>
          <Alert type="warning" message="Les données sont liées via le NIF"/>
        </div>
      </DashboardCard>
    </div>
  );
}

