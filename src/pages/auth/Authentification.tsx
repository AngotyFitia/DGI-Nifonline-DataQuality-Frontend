import { useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Checkbox from "../../components/ui/Checkbox";
import AuthLayout from "../../components/auth/AuthLayout";

export default function Authentification() {
  const navigate = useNavigate();

  const handleAuthentification = () => {
    navigate("/welcome/stat");
  };

  return (
    <AuthLayout>
      <div className="flex-1 flex items-center justify-center bg-[var(--bg-primary)] px-4 sm:px-6 lg:p-6 py-10">
        <div className="w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border)] shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-2 text-center font-[Montserrat]">Connexion</h2>
          <p className="text-sm text-center text-[var(--text-secondary)] mb-8 font-[Montserrat]">Accédez à votre espace de gestion</p>
          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Nom d’utilisateur</label>
            <Input placeholder="Entrez votre nom d’utilisateur" />
          </div>
          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Mot de passe</label>
            <Input type="password" placeholder="Entrez votre mot de passe" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm mb-6">
            <label className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Checkbox label="Se souvenir de moi" />
            </label>
            <a href="#" className="text-[var(--primary)] hover:underline font-[Montserrat]">Mot de passe oublié ?</a>
          </div>
          <Button variant="primary" onClick={handleAuthentification} className="w-full py-3 text-base font-[Montserrat]to">Se connecter</Button>
        <p className="text-sm text-center text-[var(--text-secondary)] mt-4 font-[Montserrat]">Pas de compte ?{" "}
          <span onClick={() => navigate("/inscription")} className="text-[var(--primary)] cursor-pointer hover:underline">Créez-en un</span>
        </p>
        </div>
      </div>
    </AuthLayout>
  );
}