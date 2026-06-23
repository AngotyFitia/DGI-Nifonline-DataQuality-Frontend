import DashboardCard from "../../ui/DashboardCard";
import ScorePie from "../../../components/ui/ScorePie";
import Info from "../sections/Info";

export default function ApercuTab({ selected }: any) {
  return (
    <div className="space-y-6">

      <DashboardCard title={""}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Info label="NIF" value={selected.nif} />
          <Info label="Nom / Raison sociale" value={selected.nom} />
          <Info label="Centre fiscal" value={selected.centreFiscal} />
          <Info label="Statut" value={selected.statut} />
          <Info label="Type" value={selected.type} />
          <Info label="Date création" value={selected.dateCreation} />

        </div>
      </DashboardCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardCard title={""}>
          <p className="font-semibold mb-3">Informations clés</p>
          <div className="space-y-1 text-sm">
            <p>Activité : {selected.activite}</p>
            <p>Forme juridique : {selected.formeJuridique}</p>
            <p>Capital : {selected.capital}</p>
            <p>Effectif : {selected.effectif}</p>
            <p>Numéro CNaPS : {selected.cnaps}</p>
            <p>Numéro STAT : {selected.stat}</p>
          </div>
        </DashboardCard>

        <DashboardCard title={""}>
          <p className="font-semibold mb-3">Coordonnées</p>
          <div className="space-y-1 text-sm">
            <p>Adresse : {selected.contacts.adresse}</p>
            <p>Téléphone : {selected.contacts.telephone}</p>
            <p>Email : {selected.contacts.email}</p>
            <p>Site web : {selected.contacts.siteWeb}</p>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardCard title={""}>
          <p className="font-semibold mb-3">Score de qualité</p>
          <div className="flex flex-col items-center justify-center space-y-2">
            <ScorePie value={selected.score} />
            <p className="text-center font-bold text-lg">{selected.score}%</p>
          </div>
        </DashboardCard>
        <DashboardCard title={""}>
          <p className="font-semibold mb-3">Résumé des anomalies</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Données manquantes</span>
              <span className="font-semibold"> {selected.analyseIA.anomalies.donneesManquantes}</span>
            </div>
            <div className="flex justify-between">
              <span>Incohérences</span>
              <span className="font-semibold">{selected.analyseIA.anomalies.incoherences}</span>
            </div>

            <div className="flex justify-between">
              <span>Doublons</span>
              <span className="font-semibold"> {selected.analyseIA.anomalies.doublons}</span>
            </div>

            <div className="flex justify-between">
              <span>Autres</span>
              <span className="font-semibold">{selected.analyseIA.anomalies.autres}</span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}