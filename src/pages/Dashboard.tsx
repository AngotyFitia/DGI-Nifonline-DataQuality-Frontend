export default function Dashboard() {
    return (
      <div>
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]"> Contribuables</div>
          <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]"> Revenus</div>
          <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]"> Alertes IA</div>
        </div>
      </div>
    );
  }