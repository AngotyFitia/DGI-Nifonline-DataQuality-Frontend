export default function Table({
  headers,
  children,
}: {
  headers: { label: string; align?: "left" | "center" | "right" }[];
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[900px] w-full border border-[var(--border)] table-auto">
        <thead className="bg-[var(--surface)]">
          <tr>
            {headers.map((h) => (
              <th key={h.label} className={`text-sm p-3 whitespace-nowrap ${ h.align === "center" ? "text-center" : h.align === "right" ? "text-right" : "text-left" }`}>
                {h.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-[var(--border)]">
          {children}
        </tbody>
      </table>
    </div>
  );
}