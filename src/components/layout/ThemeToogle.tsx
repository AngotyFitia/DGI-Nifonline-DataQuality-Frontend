import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="px-3 py-1 rounded-md border border-[var(--border)]">
      {theme === "light" ? "🌙 Sombre" : "☀️ Claire"}
    </button>
  );
}