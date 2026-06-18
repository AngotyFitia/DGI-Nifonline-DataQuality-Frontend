import { useState } from "react";
import DashboardCard from "../../components/ui/DashboardCard";
import Input from "../../components/ui/Input";
import Dropdown from "../../components/ui/DropDown";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { contribuables } from "../../data/contribuablesData";
import { Eye, Pencil, History,Brain, Download, Trash } from "lucide-react";
import Modal from "../../components/ui/Modal";
import Tabs from "../../components/ui/Tabs";
import ScorePie from "../../components/ui/ScorePie";

export default function ContribuablesList() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [activite, setActivite] = useState("");
  const [centreFiscal, setCentreFiscal] = useState("");
  const [statut, setStatut] = useState("");
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [selected, setSelectedContribuables] = useState<any | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
                        <Button variant="secondary" className="px-2 py-2" onClick={() => setSelectedContribuables(c)} > <Eye size={16} /></Button>
                        <Button variant="alert" className="px-2 py-2"> <Pencil size={16} /></Button>
                        <Button variant="primary" className="px-2 py-2"> <Brain size={16} /></Button>
                        <Button variant="secondary" className="px-2 py-2"><History size={16} /></Button>
                    </div>
                </td>
            </tr>
          ))}
        </Table>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-secondary)]"> Affichage de 1 à {filteredContribuables.length} sur 50 000 résultats</p>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded bg-blue-600 text-white"> 1 </button>
            <button className="w-8 h-8 rounded border border-[var(--border)]"> 2 </button>
            <button className="w-8 h-8 rounded border border-[var(--border)]"> 3</button>
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
                    <Tabs
                        tabs={[
                            {
                                label: "Aperçu",
                                content: (
                                <div className="space-y-6">
                                    <DashboardCard title={""} >
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                            <p className="text-sm text-[var(--text-secondary)]">NIF</p>
                                            <p className="font-semibold">{selected.nif}</p>
                                            </div>

                                            <div>
                                            <p className="text-sm text-[var(--text-secondary)]">Nom / Raison sociale</p>
                                            <p className="font-semibold">{selected.nom}</p>
                                            </div>

                                            <div>
                                            <p className="text-sm text-[var(--text-secondary)]">Centre fiscal</p>
                                            <p className="font-semibold">{selected.centreFiscal}</p>
                                            </div>

                                            <div>
                                            <p className="text-sm text-[var(--text-secondary)]">Statut</p>
                                            <p className="font-semibold">{selected.statut}</p>
                                            </div>

                                            <div>
                                            <p className="text-sm text-[var(--text-secondary)]">Type</p>
                                            <p className="font-semibold">{selected.type}</p>
                                            </div>

                                            <div>
                                            <p className="text-sm text-[var(--text-secondary)]">Date création</p>
                                            <p className="font-semibold">{selected.dateCreation}</p>
                                            </div>

                                        </div>
                                    </DashboardCard>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DashboardCard title={""}>
                                        <p className="font-semibold mb-2">Informations clés</p>
                                        <p>Activité : {selected.activite}</p>
                                        <p>Forme juridique : {selected.formeJuridique}</p>
                                        <p>Capital : {selected.capital}</p>
                                        <p>Effectif : {selected.effectif}</p>
                                        <p>Numéro CNaPS : {selected.cnaps}</p>
                                        <p>Numéro STAT : {selected.stat}</p>
                                    </DashboardCard>                  
                                    <DashboardCard title={""}>
                                        <p className="font-semibold mb-2">Coordonnées</p>
                                        <p>Adresse: {selected.contacts.adresse}</p>
                                        <p>Téléphone: {selected.contacts.telephone}</p>
                                        <p>Email: {selected.contacts.email}</p>
                                        <p>Site web: {selected.contacts.site}</p>
                                    </DashboardCard>
                                    
                                    </div>
                            
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DashboardCard title={""}>
                                        <p className="font-semibold mb-3">Score de qualité</p>
                                        <div className="flex items-center justify-center">
                                        <ScorePie value={selected.score} />
                                        </div>
                                        <p className="text-center font-bold">{selected.score}%</p>
                                    </DashboardCard>
                                    <DashboardCard title={""}>
                                        <p className="font-semibold mb-3">Résumé des anomalies</p>
                                        <p>Données manquantes : {selected.analyseIA.anomalies.donneesManquantes}</p>
                                        <p>Incohérences : {selected.analyseIA.anomalies.incoherences}</p>
                                        <p>Doublons : {selected.analyseIA.anomalies.doublons}</p>
                                        <p>Autres : {selected.analyseIA.anomalies.autres}</p>
                                    </DashboardCard>
                                    </div>
                                </div>
                                )
                            },
                            {
                                label: "Informations",
                                content: (
                                <div className="space-y-6">
                            
                                    <DashboardCard title={""}>
                                    <div className="flex items-center gap-4">
                                        <img src={selected.image} alt="contribuable" className="w-16 h-16 rounded-full object-cover border border-[var(--border)]"/>
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Nom / Raison sociale</p>
                                        <p className="font-semibold">{selected.nom}</p>
                                        </div>
                            
                                    </div>
                                    </DashboardCard>
                            
                                    <DashboardCard title="Informations principales">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">NIF</p>
                                                <p className="font-medium">{selected.nif}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">Centre fiscal</p>
                                                <p className="font-medium">{selected.centreFiscal}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">Statut</p>
                                                <p className="font-medium">{selected.statut}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">Date de création</p>
                                                <p className="font-medium">{selected.dateCreation}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">Type</p>
                                                <p className="font-medium">{selected.type}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">Début d’activité</p>
                                                <p className="font-medium">{selected.debutActivite}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">Capital social</p>
                                                <p className="font-medium">{selected.capital}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">CNAPS</p>
                                                <p className="font-medium">{selected.cnaps}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">Effectif</p>
                                                <p className="font-medium">{selected.effectif}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">Num STAT</p>
                                                <p className="font-medium">{selected.stat}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">Forme juridique</p>
                                                <p className="font-medium">{selected.formeJuridique}</p>
                                            </div>

                                        </div>
                                    </DashboardCard>
                                </div>
                                ),
                            },
                            {
                                label: "Activités et Fiscalité",
                                content: (
                                <div className="space-y-6">
                                    <DashboardCard title="Activité principale">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Code</p>
                                        <p className="font-medium">{selected.activitePrincipale.code}</p>
                                        </div>
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Libellé</p>
                                        <p className="font-medium">{selected.activitePrincipale.libelle}</p>
                                        </div>
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Catégorie</p>
                                        <p className="font-medium">{selected.activitePrincipale.categorie}</p>
                                        </div>
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Date début</p>
                                        <p className="font-medium">{selected.activitePrincipale.dateDebut}</p>
                                        </div>
                                    </div>
                                    </DashboardCard>
                            
                                    <DashboardCard title="Activités secondaires">
                                    <Table headers={[ { label: "Code", align: "left" }, { label: "Libellé", align: "left" }, { label: "Date début", align: "left" }]}>
                                        {selected.activitesSecondaires.map((a: any, index: number) => (
                                        <tr key={index} className="border-t border-[var(--border)]">
                                            <td className="p-3">{a.code}</td>
                                            <td className="p-3">{a.libelle}</td>
                                            <td className="p-3">{a.dateDebut}</td>
                            
                                        </tr>
                                        ))}
                                    </Table>
                            
                                    </DashboardCard>
                                </div>
                                ),
                            },
                            {
                                label: "Coordonnées",
                                content: (
                                <div className="space-y-6">
                            
                                    <DashboardCard title="Adresses">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Adresse principale</p>
                                        <p className="font-medium">{selected.contacts.adresse}</p>
                                        </div>
                            
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Adresse secondaire</p>
                                        <p className="font-medium">{selected.contacts.adresseSecondaire}</p>
                                        </div>
                            
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Région</p>
                                        <p className="font-medium">{selected.contacts.region}</p>
                                        </div>
                            
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Commune</p>
                                        <p className="font-medium">{selected.contacts.commune}</p>
                                        </div>
                            
                                    </div>
                                    </DashboardCard>
                            
                                    <DashboardCard title="Coordonnées">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Téléphone</p>
                                        <p className="font-medium">{selected.contacts.telephone}</p>
                                        </div>
                            
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Email</p>
                                        <p className="font-medium">{selected.contacts.email}</p>
                                        </div>
                            
                                        <div>
                                        <p className="text-sm text-[var(--text-secondary)]">Site web</p>
                                        <p className="font-medium">{selected.contacts.siteWeb}</p>
                                        </div>
                            
                                    </div>
                                    </DashboardCard>
                            
                                </div>
                                ),
                            },
                            {
                                label: "Documents",
                                content: (
                                <div className="space-y-6">
                                    <DashboardCard title="">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <Input placeholder="Recherche par nom..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                                        <Dropdown value={type} onChange={setType} options={[ { label: "Tous les types", value: "" }, { label: "Statuts", value: "Statuts" }, { label: "Fiche d’identité", value: "Fiche d’identité" },]}/>
                                        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                                        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                                    </div>
                            
                                    <div className="flex justify-end mt-4">
                                        <Button variant="secondary">Filtrer</Button>
                                    </div>
                                    </DashboardCard>
                            
                                    <DashboardCard title="">
                                    <Table  headers={[ { label: "Nom", align: "left" }, { label: "Type", align: "left" }, { label: "Date", align: "left" }, { label: "Taille", align: "left" }, { label: "Actions", align: "center" }, ]}>
                                        {selected.documents
                                        ?.filter((doc: any) =>
                                            doc.nom.toLowerCase().includes(search.toLowerCase())
                                        )
                                        .map((doc: any, index: number) => (
                                            <tr key={index} className="border-t border-[var(--border)]">
                                                <td className="p-3">{doc.nom}</td>
                                                <td className="p-3">{doc.type}</td>
                                                <td className="p-3">{doc.date}</td>
                                                <td className="p-3">{doc.taille}</td>
                                                <td className="p-3">
                                                    <div className="flex gap-2 justify-center">
                                                    <Button variant="primary" className="px-2 py-1 text-sm"><Download size={16}/></Button>
                                                    <Button variant="secondary" className="px-2 py-1 text-sm"><Eye size={16}/></Button>
                                                    <Button variant="danger" className="px-2 py-1 text-sm"><Trash size={16}/></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </Table>
                                    </DashboardCard>
                                </div>
                                ),
                            },
                            {
                                label: "Analyse IA",
                                content: (
                                  <div className="space-y-6">
                                    <DashboardCard title="Analyse IA">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm text-[var(--text-secondary)]">Dernière analyse</p>
                                                <p className="font-semibold text-[var(--text-primary)]">{selected.date}</p>
                                                <span className={` inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${selected.analyseIA.dernierScore >= 85 ? "bg-green-100 text-green-700" : selected.analyseIA.dernierScore >= 70 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700" } `}>
                                                    {selected.analyseIA.dernierScore >= 85 ? "Données fiables" : selected.analyseIA.dernierScore >= 70 ? "À vérifier": "Critique"}
                                                </span>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-sm text-[var(--text-secondary)]">Score qualité</p>
                                                <p className={` text-3xl font-bold ${selected.score >= 85 ? "text-green-600" : selected.score >= 70 ? "text-yellow-600" : "text-red-600"}`}>{selected.score}%</p>
                                            </div>

                                        </div>
                                    </DashboardCard>
                              
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <DashboardCard title="Score IA">
                                            <p className={` text-2xl font-bold ${selected.analyseIA.dernierScore >= 85 ? "text-green-600" : selected.analyseIA.dernierScore >= 70 ? "text-yellow-600": "text-red-600" }`}> {selected.analyseIA.dernierScore}%</p>
                                        </DashboardCard>

                                        <DashboardCard title="Données manquantes">
                                            <p className={` text-2xl font-bold ${selected.analyseIA.anomalies.donneesManquantes === 0 ? "text-green-600" : selected.analyseIA.anomalies.donneesManquantes <= 2 ? "text-yellow-600" : "text-red-600"}`}>{selected.analyseIA.anomalies.donneesManquantes}</p>
                                        </DashboardCard>

                                        <DashboardCard title="Incohérences">
                                            <p className={`text-2xl font-bold${selected.analyseIA.anomalies.incoherences === 0 ? "text-green-600"  : selected.analyseIA.anomalies.incoherences <= 1 ? "text-yellow-600" : "text-red-600"}`}>{selected.analyseIA.anomalies.incoherences}</p>
                                        </DashboardCard>

                                        <DashboardCard title="Doublons">
                                            <p className={` text-2xl font-bold ${selected.analyseIA.anomalies.doublons === 0 ? "text-green-600" : "text-red-600"}`}> {selected.analyseIA.anomalies.doublons}</p>
                                        </DashboardCard>
                                    </div>
                                    <DashboardCard title="Recommandation générale">
                                      <div className="space-y-3">
                                        <p className="text-[var(--text-secondary)]">
                                          {selected.analyseIA.resume}
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                          {selected.analyseIA.recommandations.map((r: string, i: number) => (
                                            <li key={i}>{r}</li>
                                          ))}
                                        </ul>
                                        <Button variant="primary">
                                          Voir les recommandations détaillées
                                        </Button>
                                      </div>
                                    </DashboardCard>
                                  </div>
                                ),
                            }
                        ]}
                    />
                </div>
            )}
        </Modal>
    </div>
  );
}