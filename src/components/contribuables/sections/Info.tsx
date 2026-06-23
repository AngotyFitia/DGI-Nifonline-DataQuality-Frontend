export default function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-sm text-[var(--text-secondary)]">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}