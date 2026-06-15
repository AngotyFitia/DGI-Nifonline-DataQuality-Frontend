import ThemeToggle from "./ThemeToogle";
import { Menu } from "lucide-react";

export default function Topbar({ onMenu }: { onMenu?: () => void }) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <button className="lg:hidden" onClick={onMenu}><Menu /></button>
      <div className="font-semibold">Dashboard</div>
      <div className="flex items-center gap-4">
        <input placeholder="Recherchez..." className="px-3 py-1 rounded-md border border-[var(--border)] bg-transparent"/>
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-gray-400" />
      </div>
    </header>
  );
}