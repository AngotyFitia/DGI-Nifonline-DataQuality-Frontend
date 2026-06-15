export default function Card({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4 shadow-sm">
        {children}
      </div>
    );
  }