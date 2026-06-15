type StatCardProps = {
    value: string;
    label: string;
    color?: string;
};
  
export default function StatCard({ value, label, color = "text-blue-500",}: StatCardProps) {
    return (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl shadow-md p-5 transition-all hover:shadow-lg">
            <h3 className={`text-2xl font-semibold ${color}`}> {value}</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-snug">{label}</p>
        </div>
    );
}