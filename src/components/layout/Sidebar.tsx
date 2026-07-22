import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Upload, Copy, Users, LayoutDashboard, Lightbulb, Brain, FileText, Settings, X, LogOut } from "lucide-react";
import logo from "../../assets/images/logo.png";
import Button from "../ui/Button";
import { useUserRole } from "../../hooks/useRole";

export type SidebarNavId =| "stat"| "contribuables"| "analyses"| "doublons"| "recommandations"| "rapports"| "imports"| "setting"| "utilisateurs";

type NavItem = {
  id: SidebarNavId;
  label: string;
  icon: React.ElementType;
  to: string;
};

const adminNav: NavItem[] = [
  { id: "stat", label: "Tableau de bord", icon: LayoutDashboard, to: "/admin/tableau-de-bord" },
  { id: "utilisateurs", label: "Utilisateurs", icon: Users, to: "/admin/liste-utilisateurs" }, 
  { id: "rapports", label: "Rapports", icon: FileText, to: "/welcome/rapports" },
];

const chefNav: NavItem[] = [
  { id: "stat", label: "Tableau de bord", icon: LayoutDashboard, to: "/chef/chef/stat" },
  { id: "contribuables", label: "Contribuables", icon: Users, to: "/chef/contribuables?tab=list" },
  { id: "analyses", label: "Analyses IA", icon: Brain, to: "/chef/analyses" },
  { id: "doublons", label: "Doublons", icon: Copy, to: "/chef/doublons" },
  { id: "recommandations", label: "Recommandations", icon: Lightbulb, to: "/chef/recommandations" },
  { id: "rapports", label: "Rapports", icon: FileText, to: "/chef/rapports" },
];

const agentNav: NavItem[] = [
  { id: "stat", label: "Tableau de bord", icon: LayoutDashboard, to: "/welcome/agent/stat" },
  { id: "contribuables", label: "Contribuables", icon: Users, to: "/welcome/contribuables?tab=list" },
];

const secondaryNav: NavItem[] = [
  { id: "imports", label: "Import", icon: Upload, to: "/welcome/contribuables?tab=import" },
  { id: "setting", label: "Paramètres", icon: Settings, to: "/welcome/profile" },
];

function NavIcon({ icon: Icon }: { icon: React.ElementType }) {
  return <Icon size={20} strokeWidth={2} />;
}

export default function Sidebar({ onClose, open }: { onClose?: () => void; open: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const role = useUserRole();

  const navItems = role === "administrateur" ? adminNav : role === "chef" ? chefNav : agentNav;

  const isActive = (item: NavItem) => location.pathname === item.to;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-[260px] z-50 flex flex-col bg-[var(--sidebar-bg)] text-[var(--text-primary)] shadow-xl transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <button onClick={onClose} className="absolute top-4 right-4 lg:hidden text-[var(--text-primary)]">
        <X size={22} />
      </button>
      <div className="h-[90px] flex items-center justify-center border-b border-[var(--border)] px-4">
        <img src={logo} className="h-14 sm:h-16 md:h-20 object-contain" />
      </div>
      <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <NavLink
                key={item.id}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-[Montserrat]
                  ${
                    active
                      ? "bg-[var(--primary)]/10 border-l-4 border-[var(--primary)] font-semibold text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                  }`}
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
              <NavLink
                key={item.id}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    active
                      ? "bg-[var(--primary)]/10 border-l-4 border-[var(--primary)] font-semibold text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                  }`}
              >
                <NavIcon icon={item.icon} />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-[var(--border)]">
        <Button
          variant="cancel"
          className="w-full flex items-center justify-center gap-2 text-blue-500 hover:text-red-600"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          <LogOut size={16} />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}
