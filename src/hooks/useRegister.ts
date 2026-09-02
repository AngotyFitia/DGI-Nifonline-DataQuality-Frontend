import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export function useRegister() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (vars: {email: string; motDePasse: string; confirmPassword: string; captchaToken: string | null; idProfil: string;}) => {
      if (vars.motDePasse !== vars.confirmPassword) {
        const error: any = new Error("Les mots de passe ne correspondent pas.");
        error.errors = { confirmPassword: ["Les mots de passe ne correspondent pas."] };
        throw error;
      }
      return register({
        email: vars.email,
        motDePasse: vars.motDePasse,
        recaptchaToken: vars.captchaToken,
        idProfil: vars.idProfil ? Number(vars.idProfil) : 0,
      });
    },
    onSuccess: (data) => {
      if (data.success) {
        navigate("/", { state: { toastMessage: data.message } });
      }
    },
  });

  // Normalisation des erreurs : toujours des tableaux
  const rawErrors = (mutation.error as any)?.errors || {};
  const normalizedErrors: Record<string, string[]> = {};
  for (const key in rawErrors) {
    const value = rawErrors[key];
    normalizedErrors[key] = Array.isArray(value) ? value : [value];
  }

  return {
    handleRegister: mutation.mutate,
    errors: normalizedErrors,
    loading: mutation.isPending,
  };
}


