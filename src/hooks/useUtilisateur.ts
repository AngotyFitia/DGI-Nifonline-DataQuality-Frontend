import { useState, useEffect } from "react";
import { getUtilisateurs } from "../services/utilisateurService";
import type { Utilisateur } from "../types/utilisateur";

export function useUtilisateurs(token: string) {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUtilisateurs(token);
        setUtilisateurs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return { utilisateurs, loading, error };
}
