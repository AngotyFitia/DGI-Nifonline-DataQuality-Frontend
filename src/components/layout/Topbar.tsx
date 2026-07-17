import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToogle";
import { Menu, Search } from "lucide-react";
import { logout, getCurrentUser } from "../../services/authService";

export default function Topbar({ onMenu }: { onMenu?: () => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const token = localStorage.getItem("jwt");
    if (token) {
      getCurrentUser(token).then(setUser).catch(console.error);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = async () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        await logout(token);
      } catch (err) {
        console.error(err);
      }
    }
    localStorage.removeItem("jwt");
    navigate("/");
  };
  
  return (
    <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)]">
      <button className="lg:hidden" onClick={onMenu}><Menu /></button>
      <div className="hidden sm:block font-semibold"></div>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"/>
          <input placeholder="Rechercher..." className="pl-9 pr-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition"/>
        </div>
        <ThemeToggle />
        <div className="relative" ref={menuRef}>
          <div onClick={() => setOpen(!open)} className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-semibold cursor-pointer select-none">
            {user ? user.email.charAt(0).toUpperCase() : "?"}
          </div>
          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] shadow-lg overflow-hidden z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-[var(--bg-primary)] transition" onClick={() => { setOpen(false); navigate("/welcome/profile");}}>Profil</button>
              <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-[var(--bg-primary)] transition"onClick={handleLogout}>Déconnexion</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}