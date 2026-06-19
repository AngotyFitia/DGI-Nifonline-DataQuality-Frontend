import { useState } from "react";
import DashboardCard from "../../components/ui/DashboardCard";
import Dropdown from "../../components/ui/DropDown";
import Input from "../../components/ui/Input";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";

import { Eye, CheckCircle, XCircle } from "lucide-react";

import { doublons } from "../../data/doublonsData";

export default function DoublonsPage() {
  const [scoreMin, setScoreMin] = useState("");
  const [centreFiscal, setCentreFiscal] = useState("");
  const [statut, setStatut] = useState("");
  const [selectedDoublon, setSelectedDoublon] = useState<any>(null);

  const filtered = doublons.filter((d) => {
    const scoreOk = !scoreMin || d.score >= Number(scoreMin);
    const centreOk = !centreFiscal || d.centreFiscal === centreFiscal;
    const statutOk = !statut || d.statut === statut;
    return scoreOk && centreOk && statutOk;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold"> Doublons potentiels</h2>
      </div>

      <DashboardCard title="">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

          <Input type="number" placeholder="Similarité minimale (%)" value={scoreMin} onChange={(e) => setScoreMin(e.target.value)}/>
          <Dropdown value={centreFiscal} onChange={setCentreFiscal} options={[{ label: "Centre fiscal", value: "" }, { label: "Antananarivo Centre", value: "Antananarivo Centre",}, { label: "Antananarivo Nord", value: "Antananarivo Nord",}, { label: "Antsirabe", value: "Antsirabe"}, { label: "Toamasina", value: "Toamasina",}, { label: "Fianarantsoa", value: "Fianarantsoa",}]}/>
          <Dropdown value={statut} onChange={setStatut} options={[{ label: "Statut", value: "" }, { label: "À vérifier", value: "À vérifier",}, { label: "Doublon confirmé", value: "Doublon confirmé", }, { label: "Rejeté", value: "Rejeté", }, ]}/>
          <Button variant="secondary"> Filtrer</Button>
        </div>
      </DashboardCard>

        <DashboardCard title="">
            <Table headers={[ { label: "Contribuable A", align: "left" }, { label: "Contribuable B", align: "left" }, { label: "Score de similarité", align: "center" }, { label: "Statut", align: "center" }, { label: "Actions", align: "center" }, ]}>
            {filtered.map((d) => (
                <tr key={d.id} className="border-t border-[var(--border)]">
                <td className="p-3"> {d.contribuableA}</td>
                <td className="p-3"> {d.contribuableB}</td>
                <td className="p-3 text-center">
                    <span className={ d.score >= 85 ? "text-green-600 font-semibold" : d.score >= 70 ? "text-orange-500 font-semibold" : "text-red-500 font-semibold" }> {d.score}%</span>
                </td>
                <td className="p-3 text-center">
                    <span className={ d.statut === "Doublon confirmé" ? "text-green-600" : d.statut === "Rejeté" ? "text-red-600" : "text-orange-500"}>{d.statut}</span>
                </td>
                <td className="p-3">
                    <div className="flex justify-center gap-2">
                        <Button variant="secondary" className="px-2 py-2" onClick={() => setSelectedDoublon(d)}> <Eye size={16} /></Button>
                    <Button variant="success" className="px-2 py-2" > <CheckCircle size={16} /></Button>
                    <Button variant="danger" className="px-2 py-2"> <XCircle size={16} /></Button>
                    </div>
                </td>
                </tr>
            ))}
            </Table>

            <div className="mt-4 text-sm text-[var(--text-secondary)]">{filtered.length} résultat(s)</div>
        </DashboardCard>
        <Modal open={selectedDoublon !== null} onClose={() => setSelectedDoublon(null)}>
            {selectedDoublon && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold"> Détail du doublon potentiel</h2>
                        <p className="text-sm text-[var(--text-secondary)]">Analyse de similarité entre deux contribuables</p>
                    </div>

                    <DashboardCard title="Résumé">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]"> Contribuable A </p>
                                <p className="font-medium"> {selectedDoublon.contribuableA}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]"> Contribuable B</p>
                                <p className="font-medium"> {selectedDoublon.contribuableB}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]"> Score de similarité</p>
                                <p className={`font-bold text-xl ${ selectedDoublon.score >= 85 ? "text-green-500" : selectedDoublon.score >= 70 ? "text-orange-500" : "text-red-500"}`}>{selectedDoublon.score}%</p>
                            </div>
                        </div>
                    </DashboardCard>

                    <DashboardCard title="Comparaison des informations">
                        <Table headers={[ { label: "Champ", align: "left" }, { label: "Contribuable A", align: "left" }, { label: "Contribuable B", align: "left" }, { label: "Résultat", align: "left" },]}>
                            <tr className="border-t border-[var(--border)]">
                                <td className="p-3">Nom</td>
                                <td className="p-3">{selectedDoublon.contribuableA}</td>
                                <td className="p-3">{selectedDoublon.contribuableB}</td>
                                <td className="p-3 text-orange-500"> Très similaire</td>
                            </tr>

                            <tr className="border-t border-[var(--border)]">
                                <td className="p-3">Centre fiscal</td>
                                <td className="p-3"> {selectedDoublon.centreFiscal} </td>
                                <td className="p-3"> {selectedDoublon.centreFiscal}</td>
                                <td className="p-3 text-green-500"> Identique</td>
                            </tr>

                            <tr className="border-t border-[var(--border)]">
                                <td className="p-3">Statut</td>
                                <td className="p-3">{selectedDoublon.statut}</td>
                                <td className="p-3"> {selectedDoublon.statut}</td>
                                <td className="p-3 text-green-500">Identique</td>
                            </tr>
                        </Table>
                    </DashboardCard>

                    <DashboardCard title="Analyse IA">
                        <p className="text-[var(--text-secondary)] leading-relaxed"> Les deux fiches présentent un niveau de similarité élevé. Une vérification manuelle est recommandée avant toutefusion ou suppression d'une fiche.</p>
                    </DashboardCard>

                    <div className="flex justify-end gap-3">
                        <Button variant="secondary"> Ignorer</Button>
                        <Button variant="success"> Marquer comme vérifié</Button>
                        <Button variant="primary">Fusionner les fiches</Button>
                    </div>
                </div>
            )}
        </Modal>
    </div>
  );
}