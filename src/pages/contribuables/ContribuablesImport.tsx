import { useRef, useState } from "react";
import DashboardCard from "../../components/ui/DashboardCard";
import Button from "../../components/ui/Button";
import { Upload } from "lucide-react";
import Alert from "../../components/ui/Alert";
import Toast from "../../components/ui/Toast";

export default function ContribuablesImport() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [toast, setToast] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleClick = () => { fileInputRef.current?.click();};
  return (
    <div className="space-y-6">

      {toast && (
        <Toast type="success" message="Import simulé avec succès" onClose={() => setToast(false)}/>
      )}

      <DashboardCard title="Import des contribuables">
        <div className="space-y-6">
          <div onClick={handleClick} className="border-2 border-dashed border-[var(--border)] rounded-xl p-10 text-center cursor-pointer bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition">
            <input ref={fileInputRef} type="file" accept=".csv,.xlsx" className="hidden" onChange={handleFileChange}/>
            <div className="flex flex-col items-center gap-3">
              <Upload size={40} className="text-[var(--text-secondary)]" />
                <p className="text-[var(--text-primary)] font-medium"> Glissez-déposez votre fichier ici</p>
                <p className="text-sm text-[var(--text-secondary)]">ou cliquez pour sélectionner un fichier</p>
                <p className="text-xs text-[var(--text-secondary)]">Formats acceptés : CSV, XLSX</p>
            </div>
          </div>

          {file && (
            <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
              <p className="text-sm text-[var(--text-primary)]"> Fichier sélectionné : <strong>{file.name}</strong></p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="secondary">Annuler</Button>
            <Button variant="primary" onClick={() => setToast(true)} disabled={!file}>Importer</Button>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="Test des messages système">
        <div className="space-y-3">
          <Alert type="success" message="Import terminé avec succès" />
          <Alert type="warning" message="Attention : certaines lignes contiennent des anomalies" />
          <Alert type="error" message="Erreur : fichier invalide" />
          <Alert type="info" message="Info : format CSV recommandé pour de meilleures performances" />
        </div>
      </DashboardCard>

    </div>
  );
}