export default function EmptyState({
    title = "Aucune donnée",
  }: {
    title?: string;
  }) {
    return (
      <div className="text-center p-10 text-white/60">
        {title}
      </div>
    );
  }