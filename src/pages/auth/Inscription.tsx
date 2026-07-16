import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthLayout from "../../components/auth/AuthLayout";

export default function Inscription() {
  const navigate = useNavigate();

  const handleInscription = () => {
    navigate("/login"); 
  };

  return (
    <AuthLayout>
      <div className="flex-1 flex items-center justify-center bg-[var(--bg-primary)] px-4 sm:px-6 lg:p-6 py-10">
        <div className="w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border)] shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-2 text-center font-[Montserrat]">Inscription</h2>
          <p className="text-sm text-center text-[var(--text-secondary)] mb-8 font-[Montserrat]">Créez votre compte</p>
          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Email</label>
            <Input placeholder="Entrez votre email" />
          </div>
          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Mot de passe</label>
            <Input type="password" placeholder="Entrez votre mot de passe" />
          </div>
          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Confirmer mot de passe</label>
            <Input type="password" placeholder="Confirmez votre mot de passe" />
          </div>
          {/* Ici tu peux ajouter le widget reCAPTCHA */}
          <Button variant="primary" onClick={handleInscription} className="w-full py-3 text-base font-[Montserrat]">S'inscrire</Button>
          <p className="text-sm text-center text-[var(--text-secondary)] mt-4 font-[Montserrat]">Vous avez déjà un compte?{" "}
            <span onClick={() => navigate("/")} className="text-[var(--primary)] cursor-pointer hover:underline">Se connecter</span>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
