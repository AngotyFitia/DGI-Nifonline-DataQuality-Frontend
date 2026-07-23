import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../services/authService";
import type { AuthResponse } from "../types/authentification";

type JwtPayload = { role: string; email: string };

type GlobalError = { message: string; type?: "error" | "warning" };

export function useAuth() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: any[] }>({});

  const handleLogin = async (
    email: string,
    motDePasse: string,
    captchaToken: string | null
  ) => {
    const response = await login({
      email,
      motDePasse,
      recaptchaToken: captchaToken,
      idProfil: 0,
    });

    if (response.ok) {
      const data: AuthResponse = await response.json();
      localStorage.setItem("jwt", data.token);
      const decoded = jwtDecode<JwtPayload>(data.token);
      const role = decoded.role;
      if (role === "administrateur")
        navigate("/admin/statistique-utilisateurs");
      else if (role === "chef") navigate("/chef/tableau-de-bord");
      else navigate("/agent/tableau-de-bord");
    } else {
      try {
        const data = await response.json();

        if (data.errors) {
          const normalizedErrors: any = {};
          Object.keys(data.errors).forEach((key) => {
            const val = data.errors[key];
            normalizedErrors[key] = Array.isArray(val) ? val : [val];
          });
          setErrors(normalizedErrors);
        } else {
          const globalError: GlobalError = {
            message: data.message || "Erreur de connexion",
            type: data.type || "error",
          };
          setErrors({ global: [globalError] });
        }
      } catch {
        setErrors({ global: [{ message: "Erreur de connexion", type: "error" }] });
      }
    }
  };

  return { handleLogin, errors };
}
