import { useState } from "react";
import DashboardCard from "../../components/ui/DashboardCard";
import Input from "../../components/ui/Input";
import Dropdown from "../../components/ui/DropDown";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { contribuables } from "../../data/contribuablesData";
import { Eye, Pencil, History,Brain } from "lucide-react";
import Modal from "../../components/ui/Modal";
import ContribuableTabs from "../../components/contribuables/ContribuableTabs";
import Pagination from "../../components/ui/Pagination";

export default function ContribuablesList() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [activite, setActivite] = useState("");
  const [centreFiscal, setCentreFiscal] = useState("");
  const [statut, setStatut] = useState("");
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [selected, setSelectedContribuables] = useState<any | null>(null);

  const filteredContribuables = contribuables.filter((c) => {
    const matchSearch = c.nif.toLowerCase().includes(search.toLowerCase()) ||c.nom.toLowerCase().includes(search.toLowerCase());
    const matchType = !type || c.type === type;
    const matchActivite = !activite || c.activitePrincipale.libelle === activite;
    const matchCentreFiscal = !centreFiscal || c.centreFiscal === centreFiscal;
    const matchStatut = !statut || c.statut === statut;
    const matchMinScore = !minScore || c.score >= Number(minScore);
    const matchMaxScore = !maxScore || c.score <= Number(maxScore);
    return (  matchSearch && matchType && matchActivite && matchCentreFiscal && matchStatut && matchMinScore && matchMaxScore);
  });

    

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]"> Liste des contribuables</h2>
        <Button> Nouveau contribuable</Button>
      </div>

      <DashboardCard title={""}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            <Input placeholder="Recherche par NIF, nom..." value={search} onChange={(e) => setSearch(e.target.value)}/>
            <Dropdown value={type} onChange={setType} options={[{ label: "Tous les types", value: "" }, { label: "Société", value: "Société" },{ label: "Particulier", value: "Particulier" },]}/>
            <Dropdown value={activite} onChange={setActivite} options={[ { label: "Toutes les activités", value: "" }, { label: "Commerce", value: "Commerce" }, { label: "Agriculture", value: "Agriculture" }, { label: "Industrie", value: "Industrie" }, { label: "Transport", value: "Transport" }, { label: "Technologie", value: "Technologie" }, ]}/>
            <Dropdown value={centreFiscal} onChange={setCentreFiscal} options={[{ label: "Tous les centres", value: "" }, { label: "Antananarivo Centre", value: "Antananarivo Centre"}, {label: "Antananarivo Nord", value: "Antananarivo Nord"}, { label: "Antsirabe", value: "Antsirabe" }, { label: "Toamasina", value: "Toamasina" }, { label: "Fianarantsoa", value: "Fianarantsoa" }, { label: "Mahajanga", value: "Mahajanga" }, ]}/>
            <Button variant="secondary"> Filtrer</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Dropdown value={statut} onChange={setStatut} options={[ { label: "Tous les statuts", value: "" }, { label: "Validé", value: "Validé" }, { label: "À vérifier", value: "À vérifier" }, { label: "À corriger", value: "À corriger" },]}/>
            <Input type="number" placeholder="Min score" value={minScore} onChange={(e) => setMinScore(e.target.value)}/>
            <Input type="number" placeholder="Max score" value={maxScore} onChange={(e) => setMaxScore(e.target.value)}/>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title={""}>
        <Table headers={[ { label: "NIF", align: "left" }, { label: "Nom", align: "left" }, { label: "Société", align: "left" }, { label: "Activités", align: "left" }, { label: "Centre", align: "left" }, { label: "Score", align: "center" }, { label: "Statut", align: "center" }, { label: "Actions", align: "center" }]}>
          {filteredContribuables.map((c) => (
            <tr key={c.nif} className="border-t border-[var(--border)]">
                <td className="p-3">{c.nif}</td>
                <td className="p-3">{c.nom}</td>
                <td className="p-3">{c.type}</td>
                <td className="p-3">{c.activitePrincipale.libelle}</td>
                <td className="p-3">{c.centreFiscal}</td>
                <td className="p-3">{c.score}%</td>

                <td className="p-3"> <span className={ c.statut === "Validé" ? "text-green-500" : c.statut === "À vérifier" ? "text-orange-500" : "text-red-500" }> {c.statut}</span></td>
                <td className="p-3">
                    <div className="flex gap-2">
                        <Button variant="primary" className="px-2 py-2" onClick={() => setSelectedContribuables(c)} > <Eye size={16} /></Button>
                        <Button variant="alert" className="px-2 py-2"> <Pencil size={16} /></Button>
                        <Button variant="analysis" className="px-2 py-2"> <Brain size={16} /></Button>
                        <Button variant="archive" className="px-2 py-2"><History size={16} /></Button>
                    </div>
                </td>
            </tr>
          ))}
        </Table>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-secondary)]"> Affichage de 1 à {filteredContribuables.length} sur 50 000 résultats</p>
          <div className="flex gap-2">
                <Pagination />
          </div>
        </div>
      </DashboardCard>
        <Modal open={!!selected} onClose={() => setSelectedContribuables(null)}>
            {selected && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold"> {selected.nom}</h2>
                        <p className="text-sm text-[var(--text-secondary)]"> NIF: {selected.nif}</p>
                    </div>
                    <ContribuableTabs selected={selected} />
                </div>
            )}
        </Modal>
    </div>
  );
}