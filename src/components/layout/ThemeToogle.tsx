import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} aria-label="Changer le thème" className=" px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] hover:opacity-80 transitionflex items-center justify-center">
      {theme === "light" ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>
  );
}