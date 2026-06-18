import Tabs from "../../components/ui/Tabs";
import ContribuablesList from "./ContribuablesList";
import ContribuablesImport from "./ContribuablesImport";

export default function ContribuablesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6"> Contribuables</h1>

      <Tabs
        tabs={[
          {
            label: "Liste des contribuables",
            content: <ContribuablesList />,
          },
          {
            label: "Import des contribuables",
            content: <ContribuablesImport />,
          },
        ]}
      />
    </div>
  );
}