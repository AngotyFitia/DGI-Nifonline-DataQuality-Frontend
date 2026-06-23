import DashboardCard from "../../ui/DashboardCard";
import Table from "../../../components/ui/Table";
import InfoItem from "../sections/InfoItem";

export default function ActivitesFiscaliteTab({ selected }: any) {
  return (
    <div className="space-y-6">
      <DashboardCard title="Activité principale">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <InfoItem label="Code" value={selected.activitePrincipale.code} />
          <InfoItem label="Libellé" value={selected.activitePrincipale.libelle} />
          <InfoItem label="Catégorie" value={selected.activitePrincipale.categorie} />
          <InfoItem label="Date début" value={selected.activitePrincipale.dateDebut} />
        </div>
      </DashboardCard>
      <DashboardCard title="Activités secondaires">
        <Table headers={[ { label: "Code", align: "left" }, { label: "Libellé", align: "left" }, { label: "Date début", align: "left" },]}>
          {selected.activitesSecondaires.map((a: any, i: number) => (
            <tr key={i} className="border-t border-[var(--border)]">
              <td className="p-3">{a.code}</td>
              <td className="p-3">{a.libelle}</td>
              <td className="p-3">{a.dateDebut}</td>
            </tr>
          ))}
        </Table>
      </DashboardCard>
    </div>
  );
}

