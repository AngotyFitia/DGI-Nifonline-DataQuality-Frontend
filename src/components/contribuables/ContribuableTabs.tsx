import ApercuTab from "./tabs/ApercuTab";
import InformationsTab from "./tabs/InformationsTab";
import ActivitesFiscaliteTab from "./tabs/ActivitesFiscaliteTab";
import CoordonneesTab from "./tabs/CoordonneesTab";
import AnalyseIATab from "./tabs/AnalyseIATab";
import Tabs from "../../components/ui/Tabs";

export default function ContribuableTabs({ selected }: any) {
  return (
    <Tabs
      tabs={[
        { label: "Aperçu", content: <ApercuTab selected={selected} /> },
        { label: "Informations", content: <InformationsTab selected={selected} /> },
        { label: "Activités", content: <ActivitesFiscaliteTab selected={selected} /> },
        { label: "Coordonnées", content: <CoordonneesTab selected={selected} /> },
        { label: "Analyse IA", content: <AnalyseIATab selected={selected} /> },
      ]}
    />
  );
}