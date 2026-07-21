import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthLayout from "../../components/auth/AuthLayout";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "../../context/ThemeContext";
import { useRegister } from "../../hooks/useRegister";

export default function Inscription() {
  const { theme } = useTheme();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { handleRegister, errors } = useRegister();

  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border)] shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center font-[Montserrat]">Inscription</h2>
        <p className="text-sm sm:text-base text-center text-[var(--text-secondary)] mb-8 font-[Montserrat]">
          Créez votre compte
        </p>
        <div className="mb-5">
          <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Adresse email</label>
          <Input type="email" placeholder="exemple@domaine.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && errors.email.map((err, i) => (
            <p key={i} className="text-red-500 text-sm">{err}</p>
          ))}
        </div>
        <div className="mb-5">
          <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Mot de passe</label>
          <Input type="password" placeholder="••••••••" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)}/>
          {errors.motDePasse && errors.motDePasse.map((err, i) => (
            <p key={i} className="text-red-500 text-sm">{err}</p>
          ))}
        </div>
        <div className="mb-5">
          <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Confirmer mot de passe</label>
          <Input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          {errors.confirmPassword && errors.confirmPassword.map((err, i) => (
            <p key={i} className="text-red-500 text-sm">{err}</p>
          ))}
        </div>

        {errors.global && errors.global.map((err, i) => (
          <p key={i} className="text-red-500 text-sm">{err}</p>
        ))}

        <div className="flex justify-center my-4">
          <ReCAPTCHA key={theme} sitekey={siteKey} onChange={(token) => setCaptchaToken(token)} theme={theme}/>
        </div>
        {errors.recaptchaToken && errors.recaptchaToken.map((err, i) => (
          <p key={i} className="text-red-500 text-sm text-center">{err}</p>
        ))}
        
        <Button variant="primary" className="w-full py-3 text-base font-[Montserrat]" onClick={() => handleRegister(email, motDePasse, confirmPassword, captchaToken)}>S'inscrire</Button>
        <p className="text-sm text-center text-[var(--text-secondary)] mt-4 font-[Montserrat]">Vous avez déjà un compte ?{" "}
          <span onClick={() => window.location.href = "/"} className="text-[var(--primary)] cursor-pointer hover:underline">Se connecter</span>
        </p>
      </div>
    </AuthLayout>
  );
}
