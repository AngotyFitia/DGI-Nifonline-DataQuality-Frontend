import { useState } from "react";
import DashboardCard from "../../components/ui/DashboardCard";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { Eye, Ban, Check } from "lucide-react";
import { useUtilisateurs } from "../../hooks/useUtilisateur";
import { useProfils } from "../../hooks/useProfils";
import Dropdown from "../../components/ui/DropDown";
import Input from "../../components/ui/Input";
import Pagination from "../../components/ui/Pagination";

export default function ListeUtilisateurs() {
  const token = localStorage.getItem("jwt") || ""; 
  const [filterProfil, setFilterProfil] = useState("tous");
  const [filterEtat, setFilterEtat] = useState("tous");
  const [filterEmail, setFilterEmail] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const profils = useProfils();
  const [selected, setSelected] = useState<any | null>(null);
  const [modalType, setModalType] = useState<"view" | "activate" | "deactivate" | null>(null);

  const { utilisateurs, totalPages, loading, error, updateEtat } = useUtilisateurs( token, filterProfil, filterEtat, filterEmail, page, size);
  const profilOptions = [
    { label: "Tous les profils", value: "tous" },
    ...profils.map((p) => ({ label: p.label, value: p.label }))
  ];

  const etatOptions = [
    { label: "Tous les états", value: "tous" },
    { label: "Actif", value: "actif" },
    { label: "Inactif", value: "inactif" },
    { label: "En attente", value: "en attente" }
  ];

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Liste des utilisateurs</h2>
      </div>
      <div className="flex gap-4 items-center">      
        <Input value={filterEmail} onChange={(e) => setFilterEmail(e.target.value)} placeholder="Rechercher par email..."className="w-64"/> 
        <Dropdown value={filterProfil} onChange={setFilterProfil} options={profilOptions} className="w-48"/>
        <Dropdown value={filterEtat} onChange={setFilterEtat} options={etatOptions} className="w-48"/>
      </div>

      <DashboardCard title="Utilisateurs enregistrés">
        {!utilisateurs || utilisateurs.length === 0 ? (
         <p className="text-center text-[var(--text-secondary)]">Aucun utilisateur</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {utilisateurs.map((u) => (
            <Card key={u.id}>
              <p className="font-semibold text-[var(--text-primary)]">{u.email}</p>
              <p className="text-sm text-[var(--text-secondary)]">Profil : {u.profil.intitule}</p>
              <p className="text-sm font-medium">
                État : <span className={u.etatCouleur}>{u.etatIntitule}</span>
              </p>
              <div className="flex justify-center gap-3 mt-3">
                <Button variant="primary" className="px-2 py-1" onClick={() => { setSelected(u); setModalType("view"); }}>
                  <Eye size={16} />
                </Button>
                {Number(u.etat) !== 10 && (
                  <Button variant="success" className="px-2 py-1" onClick={() => { setSelected(u); setModalType("activate"); }}>
                    <Check size={16} />
                  </Button>
                )}
                {Number(u.etat) !== 10 && Number(u.etat) !== 5 && (
                  <Button variant="danger" className="px-2 py-1" onClick={() => { setSelected(u); setModalType("deactivate"); }}>
                    <Ban size={16} />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
        <div className="flex justify-start items-center gap-4 mt-4">
          <label className="text-sm font-medium text-[var(--text-primary)]">Nombre par page :</label>
          <Input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-auto text-center" style={{ maxWidth: "60px" }}/>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </DashboardCard>

      <Modal open={!!selected} onClose={() => { setSelected(null); }} size={modalType === "view" ? "lg" : "sm"}>
        {selected && modalType === "view" && (
          <DashboardCard title="Informations utilisateur">
            <p><b>Email :</b> {selected.email}</p>
            <p><b>Profil :</b> {selected.profil.intitule}</p>
            <p><b>État :</b> <span className={selected.etatCouleur}>{selected.etatIntitule}</span></p>
          </DashboardCard>
        )}

        {selected && modalType === "activate" && (
          <DashboardCard title="Confirmer activation">
            <p>Voulez-vous activer l’utilisateur <b>{selected.email}</b> ?</p>
            <div className="flex gap-2 mt-4">
              <Button variant="success" onClick={async () => { await updateEtat(selected.id, 10);setSelected(null);}}>
                Oui, activer
              </Button>
              <Button variant="secondary" onClick={() => setSelected(null)}>Annuler</Button>
            </div>
          </DashboardCard>
        )}

        {selected && modalType === "deactivate" && (
          <DashboardCard title="Confirmer désactivation">
            <p>Voulez-vous désactiver l’utilisateur <b>{selected.email}</b> ?</p>
            <div className="flex gap-2 mt-4">
              <Button variant="danger" onClick={async () => { await updateEtat(selected.id, 5); setSelected(null);}}>
                Oui, désactiver
              </Button>
              <Button variant="secondary" onClick={() => setSelected(null)}>Annuler</Button>
            </div>
          </DashboardCard>
        )}
      </Modal>
    </div>
  );
}
