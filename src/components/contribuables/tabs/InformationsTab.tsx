import DashboardCard from "../../../components/ui/DashboardCard";
import InfoItem from "../sections/InfoItem";

export default function InformationsTab({ selected }: any) {
  return (
    <div className="space-y-6">
      <DashboardCard title={""} >
        <div className="flex items-center gap-4">
          <img src={selected.image} alt="contribuable" className="w-16 h-16 rounded-full object-cover border border-[var(--border)]"/>
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Nom / Raison sociale</p>
            <p className="font-semibold text-[var(--text-primary)]">{selected.nom}</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="Informations principales">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <InfoItem label="NIF" value={selected.nif} />
          <InfoItem label="Centre fiscal" value={selected.centreFiscal} />
          <InfoItem label="Statut" value={selected.statut} />
          <InfoItem label="Date de création" value={selected.dateCreation} />
          <InfoItem label="Type" value={selected.type} />
          <InfoItem label="Début d’activité" value={selected.debutActivite} />
          <InfoItem label="Capital social" value={selected.capital} />
          <InfoItem label="CNAPS" value={selected.cnaps} />
          <InfoItem label="Effectif" value={selected.effectif} />
          <InfoItem label="Num STAT" value={selected.stat} />
          <InfoItem label="Forme juridique" value={selected.formeJuridique} />
        </div>
      </DashboardCard>
    </div>
  );
}