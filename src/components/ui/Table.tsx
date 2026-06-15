export default function Table({
    headers,
    children,
  }: {
    headers: string[];
    children: React.ReactNode;
  }) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border border-[var(--border)]">
          <thead className="bg-white/5">
            <tr>
              {headers.map((h) => (
                <th key={h} className="text-left p-3 text-sm">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    );
  }