import { useState, useEffect } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthLayout from "../../components/auth/AuthLayout";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import Toast from "../../components/ui/Toast";
import Alert from "../../components/ui/Alert";

export default function Authentification() {
  const { theme } = useTheme();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const { handleLogin, errors } = useAuth();
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border)] shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center font-[Montserrat]">Connexion</h2>
        <p className="text-sm sm:text-base text-center text-[var(--text-secondary)] mb-8 font-[Montserrat]">Accédez à votre espace de gestion</p>
        <div className="mb-5">
          <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Adresse email</label>
          <Input placeholder="exemple@domaine.com"  value={email}onChange={(e) => setEmail(e.target.value)}/>
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
        {errors.global && errors.global.map((err, i) => (
          <Alert key={i} type="error" message={err} />
        ))}

        <div className="flex justify-center my-4">
          <ReCAPTCHA key={theme} sitekey={siteKey} onChange={(token) => setCaptchaToken(token)} theme={theme}/>
        </div>
        {errors.recaptchaToken && errors.recaptchaToken.map((err, i) => (
          <p key={i} className="text-red-500 text-sm text-center">{err}</p>
        ))}
        <Button variant="primary" className="w-full py-3 text-base font-[Montserrat]" onClick={() => handleLogin(email, motDePasse, captchaToken)}>Se connecter</Button>
        <p className="text-sm text-center text-[var(--text-secondary)] mt-4 font-[Montserrat]">Pas de compte ?{" "}
          <span onClick={() => navigate("/inscription")} className="text-[var(--primary)] cursor-pointer hover:underline"> Créez-en un</span>
        </p>
      </div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)}
        />
      )}
    </AuthLayout>
  );
}
