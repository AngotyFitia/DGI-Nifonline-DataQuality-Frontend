import ThemeToggle from "./ThemeToogle";
import { Menu, Search } from "lucide-react";

export default function Topbar({ onMenu }: { onMenu?: () => void }) {
  return (
    <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)]">
      <button className="lg:hidden text-[var(--text-primary)]" onClick={onMenu}>
        <Menu />
      </button>

      <div className="hidden sm:block font-semibold text-[var(--text-primary)]">
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"/>
          <input placeholder="Rechercher..." className="pl-9 pr-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition"/>
        </div>
        <ThemeToggle />
        <div className=" w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]font-semibold ">A</div>
      </div>
    </header>
  );
}