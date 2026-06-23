import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ThemeToggle from "../../components/layout/ThemeToogle";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/welcome/stat");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="relative flex w-full lg:w-1/2 bg-[var(--sidebar-bg)] text-white items-center justify-center px-6 sm:px-10 lg:p-12 min-h-[40vh] lg:min-h-screen">
        <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[var(--primary)]/20 blur-3xl rounded-full top-10 left-10" />
        <div className="relative text-center max-w-lg flex flex-col items-center">
          <img src={logo} className="h-14 sm:h-16 lg:h-20 mb-6" />
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold leading-snug mb-4 text-[var(--text-primary)]"> Plateforme intelligente d’aide au contrôle de qualité du registre des contribuables</h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">Direction Générale des Impôts - République de Madagascar</p>
        </div>
        <div className="absolute bottom-4 lg:bottom-6 text-[10px] sm:text-xs text-[var(--text-secondary)] text-center w-full px-4">© 2026 DGI - Tous droits réservés</div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-[var(--bg-primary)] px-4 sm:px-6 lg:p-6 py-10">
        <div className="w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border)] shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Connexion</h2>
          <p className="text-sm text-center text-[var(--text-secondary)] mb-8">Accédez à votre espace de gestion</p>

          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)]">Nom d’utilisateur</label>
            <Input placeholder="Entrez votre nom d’utilisateur" />
          </div>

          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)]">Mot de passe</label>
            <Input type="password" placeholder="Entrez votre mot de passe" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm mb-6">
            <label className="flex items-center gap-2 text-[var(--text-secondary)]">
              <input type="checkbox" />Se souvenir de moi
            </label>
            <a href="#" className="text-[var(--primary)] hover:underline">Mot de passe oublié ?</a>
          </div>
          <Button variant="primary" onClick={handleLogin} className="w-full py-3 text-base">Se connecter</Button>
        </div>
      </div>
    </div>
  );
}