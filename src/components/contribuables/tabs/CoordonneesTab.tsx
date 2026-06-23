import DashboardCard from "../../ui/DashboardCard";
import InfoItem from "../sections/InfoItem";

export default function CoordonneesTab({ selected }: any) {
  return (
    <div className="space-y-6">

      <DashboardCard title="Adresses">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <InfoItem label="Adresse principale" value={selected.contacts.adresse}/>
          <InfoItem label="Adresse secondaire" value={selected.contacts.adresseSecondaire}/>
          <InfoItem label="Région" value={selected.contacts.region}/>
          <InfoItem label="Commune" value={selected.contacts.commune}/>
        </div>

      </DashboardCard>

      <DashboardCard title="Coordonnées">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoItem label="Téléphone" value={selected.contacts.telephone}/>
          <InfoItem label="Email" value={selected.contacts.email}/>
          <InfoItem label="Site web" value={selected.contacts.siteWeb}/>
        </div>
      </DashboardCard>

    </div>
  );
}