import { useState, useEffect } from "react";
import { getUtilisateurs, updateEtatUtilisateur } from "../services/utilisateurService";
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

  const updateEtat = async (id: number, etat: number) => {
    try {
      const updated = await updateEtatUtilisateur(id, etat, token);
      setUtilisateurs(prev =>
        prev.map(u => u.id === updated.id ? updated : u)
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { utilisateurs, loading, error, updateEtat };
}

