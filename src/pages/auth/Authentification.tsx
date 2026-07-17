import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Checkbox from "../../components/ui/Checkbox";
import AuthLayout from "../../components/auth/AuthLayout";
import ReCAPTCHA from "react-google-recaptcha";
import { login } from "../../services/authService";
import type { AuthResponse } from "../../types/authentification";
import { useTheme } from "../../context/ThemeContext";

export default function Authentification() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const siteKey = "6LddzFYtAAAAAAV3y0_2ojM8LxOANs5r8sHzYvxw";
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string[]; motDePasse?: string[]; global?: string[] }>({});


  const handleSubmit = async () => {
    const response = await login({ email, motDePasse, recaptchaToken: captchaToken });
    if (response.ok) {
      const data: AuthResponse = await response.json();
      localStorage.setItem("jwt", data.token);
      navigate("/welcome/stat");
    } else {
      try {
        const data = await response.json();
        const normalizedErrors: any = {};
        if (data.errors) {
          Object.keys(data.errors).forEach(key => {
            const val = data.errors[key];
            normalizedErrors[key] = Array.isArray(val) ? val : [val];
          });
        }
        setErrors(normalizedErrors || { global: ["Erreur de connexion"] });
      } catch {
        setErrors({ global: ["Erreur de connexion"] });
      }
    }
  };
  

  return (
    <AuthLayout>
      <div className="flex-1 flex items-center justify-center bg-[var(--bg-primary)] px-4 sm:px-6 lg:p-6 py-10">
        <div className="w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border)] shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-2 text-center font-[Montserrat]">Connexion</h2>
          <p className="text-sm text-center text-[var(--text-secondary)] mb-8 font-[Montserrat]">Accédez à votre espace de gestion</p>
          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Nom d’utilisateur</label>
            <Input placeholder="Entrez votre nom d’utilisateur" value={email} onChange={e => setEmail(e.target.value)}/>
            {errors.email && errors.email.map((err, i) => (<p key={i} className="text-red-500 text-sm">{err}</p>))}
          </div>
          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Mot de passe</label>
            <Input type="password" placeholder="Entrez votre mot de passe" value={motDePasse} onChange={e => setMotDePasse(e.target.value)}/>
            {errors.motDePasse && errors.motDePasse.map((err, i) => (<p key={i} className="text-red-500 text-sm">{err}</p>))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm mb-6">
            <label className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Checkbox label="Se souvenir de moi" />
            </label>
            <a href="#" className="text-[var(--primary)] hover:underline font-[Montserrat]">Mot de passe oublié ?</a>
          </div>
          {errors.global && errors.global.map((err, i) => (<p key={i} className="text-red-500 text-sm">{err}</p>))}
          <div className="flex justify-center my-4">
            <ReCAPTCHA key={theme} sitekey={siteKey} onChange={(token) => setCaptchaToken(token)} theme={theme} />
          </div>
          <Button variant="primary" className="w-full py-3 text-base font-[Montserrat]to" onClick={handleSubmit}>Se connecter</Button>
        <p className="text-sm text-center text-[var(--text-secondary)] mt-4 font-[Montserrat]">Pas de compte ?{" "}
          <span onClick={() => navigate("/inscription")} className="text-[var(--primary)] cursor-pointer hover:underline">Créez-en un</span>
        </p>
        </div>
      </div>
    </AuthLayout>
  );
}