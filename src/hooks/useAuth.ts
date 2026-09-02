import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../services/authService";
import type { AuthResponse } from "../types/authentification";

type JwtPayload = { role: string; email: string };
type FieldErrors = Record<string, string[]>;
type GlobalError = { message: string; type?: "error" | "warning" };

function getRedirectPath(role: string): string {
  switch (role) {
    case "administrateur":
      return "/admin/statistique-utilisateurs";
    case "chef":
      return "/chef/tableau-de-bord";
    default:
      return "/agent/tableau-de-bord";
  }
}

export function useAuth() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FieldErrors | { global?: GlobalError[] }>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, motDePasse: string, captchaToken: string | null) => {
    setLoading(true);
    try {
      const data: AuthResponse = await login({email, motDePasse, recaptchaToken: captchaToken,idProfil: 0,});
      localStorage.setItem("jwt", data.token);
      const decoded = jwtDecode<JwtPayload>(data.token);
      navigate(getRedirectPath(decoded.role));
      setErrors({});
    } catch (err: any) {
      if (err?.errors) {
        const normalizedErrors: FieldErrors = {};
        Object.keys(err.errors).forEach((key) => {
          const val = err.errors[key];
          normalizedErrors[key] = Array.isArray(val) ? val : [val];
        });
        setErrors(normalizedErrors);
      } else {
        setErrors({ global: [{ message: err.message, type: "error" }] });
      }
      
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, errors, loading };
}
