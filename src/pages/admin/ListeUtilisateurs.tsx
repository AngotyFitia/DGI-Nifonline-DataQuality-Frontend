import { useState } from "react";
import DashboardCard from "../../components/ui/DashboardCard";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Tabs from "../../components/ui/Tabs";
import { Eye, Trash, Settings } from "lucide-react";

const utilisateurs = [
  { id: 1, email: "dgi-admin@nifonline.com", profil: "administrateur", etat: "actif" },
  { id: 2, email: "chef@test.com", profil: "chef", etat: "actif" },
  { id: 3, email: "agent@test.com", profil: "agent", etat: "inactif" },
  { id: 4, email: "agent2@test.com", profil: "agent", etat: "actif" },
];

export default function ListeUtilisateurs() {
  const [selected, setSelected] = useState<any | null>(null);
  const [filterProfil, setFilterProfil] = useState<string>("tous");
  const [filterEtat, setFilterEtat] = useState<string>("tous");

  const getEtatColor = (etat: string) => {
    switch (etat) {
      case "actif":
        return "text-green-600";
      case "inactif":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // Filtrage dynamique
  const filteredUsers = utilisateurs.filter((u) => {
    const profilOk = filterProfil === "tous" || u.profil === filterProfil;
    const etatOk = filterEtat === "tous" || u.etat === filterEtat;
    return profilOk && etatOk;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Liste des utilisateurs</h2>
        <Button variant="primary"><Settings size={16} /> Gérer rôles</Button>
      </div>

      {/* Filtres */}
      <div className="flex gap-4">
        <select
          value={filterProfil}
          onChange={(e) => setFilterProfil(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="tous">Tous les profils</option>
          <option value="administrateur">Administrateur</option>
          <option value="chef">Chef</option>
          <option value="agent">Agent</option>
        </select>

        <select
          value={filterEtat}
          onChange={(e) => setFilterEtat(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="tous">Tous les états</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
        </select>
      </div>

      {/* Cards */}
      <DashboardCard title="Utilisateurs enregistrés">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((u) => (
            <div key={u.id} className="border rounded-lg p-4 shadow-sm bg-[var(--bg-secondary)]">
              <p className="font-semibold text-[var(--text-primary)]">{u.email}</p>
              <p className="text-sm text-[var(--text-secondary)]">Profil : {u.profil}</p>
              <p className={`text-sm font-medium ${getEtatColor(u.etat)}`}>État : {u.etat}</p>
              <div className="flex gap-2 mt-3">
                <Button variant="primary" className="px-2 py-1" onClick={() => setSelected(u)}>
                  <Eye size={16} />
                </Button>
                <Button variant="danger" className="px-2 py-1">
                  <Trash size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Modal détail utilisateur */}
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <Tabs
            tabs={[
              {
                label: "Aperçu",
                content: (
                  <DashboardCard title="Informations utilisateur">
                    <p><b>Email :</b> {selected.email}</p>
                    <p><b>Profil :</b> {selected.profil}</p>
                    <p><b>État :</b> {selected.etat}</p>
                  </DashboardCard>
                ),
              },
              {
                label: "Actions",
                content: (
                  <div className="flex gap-2">
                    <Button variant="success">Activer</Button>
                    <Button variant="danger">Désactiver</Button>
                    <Button variant="archive">Archiver</Button>
                  </div>
                ),
              },
            ]}
          />
        )}
      </Modal>
    </div>
  );
}
