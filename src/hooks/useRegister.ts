import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export function useRegister() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  
    const handleRegister = async (email: string, motDePasse: string, confirmPassword: string, captchaToken: string | null, idProfil: string) => {
        if (motDePasse !== confirmPassword) {
          setErrors({ confirmPassword: ["Les mots de passe ne correspondent pas."] });
          return;
        }
      
        const response = await register({ email, motDePasse, recaptchaToken: captchaToken, idProfil: idProfil ? Number(idProfil) : null,});
        const data = await response.json();
        if (response.ok && data.success) {
          navigate("/", { state: { toastMessage: data.message } });
        } else {
          if (data.errors) {
            const normalizedErrors: any = {};
            Object.keys(data.errors).forEach((key) => {
              const val = data.errors[key];
              normalizedErrors[key] = Array.isArray(val) ? val : [val];
            });
            setErrors(normalizedErrors);
          } else {
            setErrors({ global: [data.message || "Erreur lors de l'inscription"] });
          }
        }
      };
      
    return { handleRegister, errors };
  }
  
