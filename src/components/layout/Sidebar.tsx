import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Upload, Copy, Users, LayoutDashboard, Lightbulb, Brain, FileText, Settings, X, LogOut, Shield, Map, Briefcase, Scale, ScrollText, Coins, Building, Landmark, User} from "lucide-react";
import logo from "../../assets/images/logo.png";
import Button from "../ui/Button";
import { useUserRole } from "../../hooks/useRole";
import { useState } from "react";
export type SidebarNavId =|"stat-utilisateurs"| "stat-securite"| "stat"| "contribuables"| "analyses"| "doublons"
                          | "recommandations"| "rapports"| "import-territoires"| "import-activites"
                          | "setting" | "utilisateurs"| "gestion-activite"| "imports"| "import-regimes-fiscaux"
                          | "import-formes-juridiques" | "import-types-impots"|"import-centres-gestionnaires"
                          | "import-personnes-physiques"| "import-personnes-morales";

type NavItem = {
  id: SidebarNavId;
  label: string;
  icon: React.ElementType;
  to?: string;
  children: NavItem[];
};

const adminNav: NavItem[] = [
  { id: "stat-utilisateurs", label: "Statistiques utilisateurs", icon: LayoutDashboard, to: "/admin/statistique-utilisateurs", children: [] },
  { id: "stat-securite", label: "Statistiques sécurité", icon: Shield, to: "/admin/statistique-securite", children: [] },
  { id: "utilisateurs", label: "Gestion des utilisateurs", icon: Users, to: "/admin/liste-utilisateurs", children: [] }, 
  { id: "imports", label: "Données de référence", icon: Upload ,
    children: [
      { id: "import-territoires", label: "Territoires", icon: Map, to: "/admin/territoire/import", children: [] },
      { id: "import-activites", label: "Activités", icon: Briefcase, to: "/admin/activites/import", children: [] },
      { id: "import-regimes-fiscaux", label: "Régimes Fiscaux", icon: Scale, to: "/admin/regimes-fiscaux/liste", children: [] },
      { id: "import-formes-juridiques", label: "Formes Juridiques", icon: ScrollText, to: "/admin/formes-juridiques/liste", children: [] },
      { id: "import-types-impots", label: "Types d'Impôts", icon: Coins, to: "/admin/types-impots/liste", children: [] },
      { id: "import-centres-gestionnaires", label: "Centres Gestionnaires", icon: Building, to: "/admin/centres-gestionnaires/import", children: [] },
    ],
  },
];

const chefNav: NavItem[] = [
  { id: "imports", label: "Données de référence", icon: Upload ,
    children: [
      { id: "import-personnes-physiques", label: "Personnes physiques", icon: User, to: "/chef/personnes-physiques/import", children: [] },
      { id: "import-personnes-morales", label: "Personnes morales", icon: Landmark, to: "/chef/personnes-morales/import", children: [] },
    ],
  },
  { id: "stat", label: "Tableau de bord", icon: LayoutDashboard, to: "/chef/chef/stat", children:[] },
  { id: "contribuables", label: "Contribuables", icon: Users, to: "/chef/contribuables?tab=list", children:[]  },
  { id: "analyses", label: "Analyses IA", icon: Brain, to: "/chef/analyses" , children:[] },
  { id: "doublons", label: "Doublons", icon: Copy, to: "/chef/doublons", children:[]  },
  { id: "recommandations", label: "Recommandations", icon: Lightbulb, to: "/chef/recommandations", children:[]  },
  { id: "rapports", label: "Rapports", icon: FileText, to: "/chef/rapports", children:[]  },
];

const agentNav: NavItem[] = [
  { id: "stat", label: "Tableau de bord", icon: LayoutDashboard, to: "/welcome/agent/stat" , children:[]  },
  { id: "contribuables", label: "Contribuables", icon: Users, to: "/welcome/contribuables?tab=list", children:[]  },
];

const secondaryNav: NavItem[] = [
  { id: "setting", label: "Paramètres", icon: Settings, to: "/welcome/profile", children:[]  },
];

function NavIcon({ icon: Icon }: { icon: React.ElementType }) {
  return <Icon size={20} strokeWidth={2} />;
}

export default function Sidebar({ onClose, open }: { onClose?: () => void; open: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const role = useUserRole();
  const navItems = role === "administrateur" ? adminNav : role === "chef" ? chefNav : agentNav;
  const [openParent, setOpenParent] = useState<string | null>(null);
  const toggleParent = (id: string) => {
    setOpenParent(openParent === id ? null : id);
  };
  const isActive = (item: NavItem) => location.pathname === item.to;

  return (
    <aside className={`fixed left-0 top-0 h-screen w-[260px] z-50 flex flex-col bg-[var(--sidebar-bg)] text-[var(--text-primary)] shadow-xl transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <button onClick={onClose} className="absolute top-4 right-4 lg:hidden text-[var(--text-primary)]"><X size={22} /></button>
      <div className="h-[90px] flex items-center justify-center border-b border-[var(--border)] px-4">
        <img src={logo} className="h-14 sm:h-16 md:h-20 object-contain" />
      </div>
      <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        <div className="space-y-2">
        {navItems.map((item) => {
            const active = isActive(item);
            if (item.children && item.children.length > 0) {
              return (
                <div key={item.id}>
                  <button onClick={() => toggleParent(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-[Montserrat]
                      ${openParent === item.id ? "bg-[var(--primary)]/10 border-l-4 border-[var(--primary)] font-semibold text-[var(--text-primary)]"
                                               : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"}`}
                  >
                    <NavIcon icon={item.icon} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                  {openParent === item.id && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <NavLink key={child.id} to={child.to!} onClick={onClose} className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]">
                          <NavIcon icon={child.icon} />
                          <span className="text-xs">{child.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink key={item.id} to={item.to!} onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-[Montserrat]
                  ${active ? "bg-[var(--primary)]/10 border-l-4 border-[var(--primary)] font-semibold text-[var(--text-primary)]"
                           : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"}`}
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
              <NavLink key={item.id} to={item.to!} onClick={onClose}
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
        <Button variant="cancel" className="w-full flex items-center justify-center gap-2 text-blue-500 hover:text-red-600" onClick={() => { localStorage.removeItem("token"); navigate("/");}}>
          <LogOut size={16} />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}
