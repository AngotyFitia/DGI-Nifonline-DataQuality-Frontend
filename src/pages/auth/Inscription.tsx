import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthLayout from "../../components/auth/AuthLayout";
import ReCAPTCHA from "react-google-recaptcha";
import { register } from "../../services/authService";

export default function Inscription() {
  
  const siteKey = "6LddzFYtAAAAAAV3y0_2ojM8LxOANs5r8sHzYvxw"; 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string[]; motDePasse?: string[]; confirmPassword?: string[]; global?: string[] }>({});


  const handleSubmit = async () => {
    if (motDePasse !== confirmPassword) {
      setErrors({ confirmPassword: ["Les mots de passe ne correspondent pas"] });
      return;
    }
  
    const response = await register({ email, motDePasse, recaptchaToken: captchaToken });
    if (response.ok) {
      navigate("/");
    } else {
      try {
        const data = await response.json();
        // transformer les erreurs en tableaux
        const normalizedErrors: any = {};
        if (data.errors) {
          Object.keys(data.errors).forEach(key => {
            const val = data.errors[key];
            normalizedErrors[key] = Array.isArray(val) ? val : [val];
          });
        }
        setErrors(normalizedErrors || { global: ["Erreur lors de l'inscription"] });
      } catch {
        setErrors({ global: ["Erreur lors de l'inscription"] });
      }
    }
  };
  
  

  return (
    <AuthLayout>
      <div className="flex-1 flex items-center justify-center bg-[var(--bg-primary)] px-4 sm:px-6 lg:p-6 py-10">
        <div className="w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border)] shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-2 text-center font-[Montserrat]">Inscription</h2>
          <p className="text-sm text-center text-[var(--text-secondary)] mb-8 font-[Montserrat]">Créez votre compte</p>
          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Email</label>
            <Input placeholder="Entrez votre email" value={email} onChange={e => setEmail(e.target.value)} />
            {errors.email && errors.email.map((err, i) => (<p key={i} className="text-red-500 text-sm">{err}</p>))}          
          </div>
          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Mot de passe</label>
            <Input type="password" placeholder="Entrez votre mot de passe" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} />
            {errors.motDePasse && errors.motDePasse.map((err, i) => ( <p key={i} className="text-red-500 text-sm">{err}</p>))}
          </div>
          <div className="mb-5">
            <label className="text-sm text-[var(--text-secondary)] font-[Montserrat]">Confirmer mot de passe</label>
            <Input type="password" placeholder="Confirmez votre mot de passe" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            {errors.confirmPassword && errors.confirmPassword.map((err, i) => (<p key={i} className="text-red-500 text-sm">{err}</p>))}          
          </div>
          {errors.global && errors.global.map((err, i) => ( <p key={i} className="text-red-500 text-sm">{err}</p>))}
          <ReCAPTCHA sitekey={siteKey} onChange={(token) => setCaptchaToken(token)} />
          <Button variant="primary" className="w-full py-3 text-base font-[Montserrat]" onClick={handleSubmit}>S'inscrire</Button>
          <p className="text-sm text-center text-[var(--text-secondary)] mt-4 font-[Montserrat]">Vous avez déjà un compte?{" "}
            <span onClick={() => navigate("/")} className="text-[var(--primary)] cursor-pointer hover:underline">Se connecter</span>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
