import { useState } from "react";

export default function Tabs({
  tabs,
}: {
  tabs: { label: string; content: React.ReactNode }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActive(i)} className={`px-3 py-1 rounded ${ i === active ? "bg-blue-600 text-white" : "bg-white/10" }`}>
            {t.label}
          </button>
        ))}
      </div>

      <div>{tabs[active].content}</div>
    </div>
  );
}