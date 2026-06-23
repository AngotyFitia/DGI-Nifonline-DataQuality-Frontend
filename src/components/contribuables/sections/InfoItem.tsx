export default function InfoItem({ label, value, }: { label: string; value: any;}) {
    return (
      <div>
        <p className="text-sm text-[var(--text-secondary)]">{label}</p>
        <p className="font-medium text-[var(--text-primary)]">{value ?? "-"}</p>
      </div>
    );
}