import { useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import Tabs from "../components/ui/Tabs";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Pagination from "../components/ui/Pagination";

export default function DesignSystemPlayground() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold"> Test des divers composants</h1>

      <Card>
        <h2 className="mb-2 font-semibold">Buttons</h2>
        <div className="flex gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-2 font-semibold">Input</h2>
        <Input placeholder="Nom contribuable..." />
      </Card>

      <Card>
        <h2 className="mb-2 font-semibold">Badges</h2>
        <div className="flex gap-2">
          <Badge label="Actif" color="green" />
          <Badge label="Inactif" color="red" />
          <Badge label="En attente" color="yellow" />
        </div>
      </Card>

      <Card>
        <h2 className="mb-2 font-semibold">Table</h2>
        <Table headers={[{label: "Nom", align: "left"}, {label: "Statut", align: "left"}, {label: "Montant", align: "left"}]}>
          <tr className="border-t border-[var(--border)]">
            <td className="p-3">Entreprise A</td>
            <td className="p-3">Actif</td>
            <td className="p-3">1 000 000 Ar</td>
          </tr>
        </Table>
      </Card>

      <Card>
        <h2 className="mb-2 font-semibold">Modal</h2>
        <Button onClick={() => setOpen(true)}>Ouvrir Modal</Button>

        <Modal open={open} onClose={() => setOpen(false)}>
          <h2 className="text-lg font-bold">Test Modal</h2>
          <p className="text-sm text-white/70 mt-2"> Ceci est un test du composant Modal</p>
        </Modal>
      </Card>

      <Card>
        <h2 className="mb-2 font-semibold">Tabs</h2>
        <Tabs tabs={[   { label: "Infos", content: <p>Contenu Infos</p>, },
                        { label: "Documents", content: <p>Contenu Documents</p>,},
                    ]}/>
      </Card>

      <Card>
        <h2 className="mb-2 font-semibold">Loader</h2>
        <Loader />
      </Card>

      <Card>
        <h2 className="mb-2 font-semibold">Empty State</h2>
        <EmptyState title="Aucune donnée disponible" children={""} />
      </Card>

      <Card>
        <h2 className="mb-2 font-semibold">Pagination</h2>
        <Pagination currentPage={0} totalPages={5} onPageChange={() => {}} />
      </Card>
    </div>
  );
}