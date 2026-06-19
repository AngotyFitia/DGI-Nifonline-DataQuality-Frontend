import { useState } from "react";
import DashboardCard from "../../components/ui/DashboardCard";
import Button from "../../components/ui/Button";
import { Upload } from "lucide-react";
import Alert from "../../components/ui/Alert";
import Toast from "../../components/ui/Toast";

type ImportFiles = {
  identity?: File | null;
  activities?: File | null;
  fiscality?: File | null;
  contacts?: File | null;
  documents?: File | null;
};

export default function ContribuablesImport() {
  const [files, setFiles] = useState<ImportFiles>({});
  const [toast, setToast] = useState(false);
  const [step, setStep] = useState<number>(1);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof ImportFiles
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles({
        ...files,
        [type]: e.target.files[0],
      });
    }
  };

  const handleImport = () => {
    setToast(true);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <Toast type="success" message="Import des données terminé avec succès" onClose={() => setToast(false)}/>
      )}

      <DashboardCard title="Import multi-sources des contribuables">
        <div className="space-y-6">
          <div className="flex gap-2 text-sm">
            {["Identité", "Activités", "Fiscalité", "Contacts", "Documents"].map(
              (label, i) => (
                <button key={i} onClick={() => setStep(i + 1)} className={`px-3 py-1 rounded ${ step === i + 1 ? "bg-blue-600 text-white" : "bg-[var(--surface)]"}`}> {label}</button>
              )
            )}
          </div>

          <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-10 text-center bg-[var(--surface)]">
            {step === 1 && (
              <div className="flex flex-col items-center gap-3">
                <Upload size={40} />
                <p>Importer fichier IDENTITÉ</p>
                <label htmlFor="identity-upload">
                  <Button variant="secondary"> Choisir un fichier</Button>
                </label>
                <input id="identity-upload" type="file" accept=".csv,.xlsx" className="hidden" onChange={(e) => handleFileChange(e, "identity")}/>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center gap-3">
                <Upload size={40} />
                <p>Importer fichier ACTIVITÉS</p>
                <label htmlFor="activities-upload">
                  <Button variant="secondary"> Choisir un fichier</Button>
                </label>
                <input id="activities-upload" type="file" accept=".csv,.xlsx" className="hidden" onChange={(e) => handleFileChange(e, "activities")} />
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center gap-3">
                <Upload size={40} />
                <p>Importer fichier FISCALITÉ</p>
                <label htmlFor="fiscality-upload">
                  <Button variant="secondary"> Choisir un fichier</Button>
                </label>
                <input  id="fiscality-upload" type="file" accept=".csv,.xlsx" className="hidden" onChange={(e) => handleFileChange(e, "fiscality")}/>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center gap-3">
                <Upload size={40} />
                <p>Importer fichier CONTACTS</p>
                <label htmlFor="contacts-upload">
                  <Button variant="secondary"> Choisir un fichier</Button>
                </label>
                <input id="contacts-upload" type="file" accept=".csv,.xlsx" className="hidden" onChange={(e) => handleFileChange(e, "contacts")} />
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col items-center gap-3">
                <Upload size={40} />
                <p>Importer fichiers DOCUMENTS</p>

                <label htmlFor="documents-upload">
                  <Button variant="secondary">Choisir un fichier</Button>
                </label>
                <input id="documents-upload" type="file" accept=".csv,.pdf,.xlsx" className="hidden"onChange={(e) => handleFileChange(e, "documents")}/>
              </div>
            )}
          </div>

          <div className="space-y-2 text-sm">
            {Object.entries(files).map(([key, file]) =>
              file ? (
                <p key={key}>
                  ✔ {key} : <strong>{file.name}</strong>
                </p>
              ) : (
                <p key={key} className="text-gray-400">
                  ✖ {key} : non importé
                </p>
              )
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary">Annuler</Button>
            <Button variant="primary" onClick={handleImport} disabled={!files.identity}>Importer tout</Button>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="Informations système">
        <Alert type="info" message="Chaque contribuable peut être importé par plusieurs fichiers séparés"/>
        <Alert type="warning" message="Les données sont liées via le NIF"/>
      </DashboardCard>
    </div>
  );
}