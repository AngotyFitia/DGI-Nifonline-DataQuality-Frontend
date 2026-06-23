import { NavLink, useLocation } from "react-router-dom";
import { Upload, Copy, ChevronDown, Users, LayoutDashboard, Lightbulb, Brain, FileText, Settings,X,} from "lucide-react";
import logo from "../../assets/images/logo.png";

export type SidebarNavId = | "stat" | "contribuables" | "analyses" | "doublons" | "recommandations"| "rapports"| "imports"| "setting";
type NavItem = {
  id: SidebarNavId;
  label: string;
  icon: React.ElementType;
  to: string;
};

const mainNav: NavItem[] = [
  { id: "stat", label: "Tableau de bord", icon: LayoutDashboard, to: "/welcome/stat" },
  { id: "contribuables", label: "Contribuables", icon: Users, to: "/welcome/contribuables" },
  { id: "analyses", label: "Analyses IA", icon: Brain, to: "/welcome/analyses" },
  { id: "doublons", label: "Doublons", icon: Copy, to: "/welcome/doublons" },
  { id: "recommandations", label: "Recommandations", icon: Lightbulb, to: "/welcome/recommandations" },
  { id: "rapports", label: "Rapports", icon: FileText, to: "/welcome/rapports" },
];

const secondaryNav: NavItem[] = [
  { id: "imports", label: "Import", icon: Upload, to: "/imports" },
  { id: "setting", label: "Paramètres", icon: Settings, to: "/settings" },
];

function NavIcon({ icon: Icon }: { icon: React.ElementType }) {
  return <Icon size={20} strokeWidth={2} />;
}

export default function Sidebar({
  userName = "Admin",
  onClose,
  open,
}: {
  userName?: string;
  onClose?: () => void;
  open: boolean;
}) {
  const location = useLocation();
  const isActive = (item: NavItem) => location.pathname === item.to;
  return (
    <aside className={`fixed left-0 top-0 h-screen w-[260px] flex flex-col z-50 bg-[var(--sidebar-bg)] text-[var(--text-primary)] shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
      <button onClick={onClose} className="absolute top-4 right-4 lg:hidden text-[var(--text-primary)]">
        <X size={22} />
      </button>
      <div className="h-[90px] flex items-center justify-center border-b border-[var(--border)] px-4">
        <img src={logo} className="h-14 sm:h-16 md:h-20 object-contain" />
      </div>
      <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        <div className="space-y-2">
          {mainNav.map((item) => {
            const active = isActive(item);

            return (
              <NavLink key={item.id} to={item.to} onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    active
                      ? "bg-[var(--primary)]/10 border-l-4 border-[var(--primary)] font-semibold text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                  }
                `}
              >
                <NavIcon icon={item.icon} />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
        <div className="h-px bg-[var(--border)] my-4" />
        <div className="space-y-2">
          {secondaryNav.map((item) => {
            const active = isActive(item);
            return (
              <NavLink key={item.id} to={item.to} onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    active
                      ? "bg-[var(--primary)]/10 border-l-4 border-[var(--primary)] font-semibold text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                  }
                `}
              >
                <NavIcon icon={item.icon} />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] transition p-3 rounded-xl cursor-pointer">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--text-primary)]"> {userName}</span>
            <span className="text-xs text-[var(--text-secondary)]"> Voir profil</span>
          </div>
          <ChevronDown size={14} className="text-[var(--text-secondary)]" />
        </div>
      </div>
    </aside>
  );
}