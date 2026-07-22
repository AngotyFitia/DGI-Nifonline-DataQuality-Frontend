import { useState, useEffect } from "react";
import { getUtilisateurs, updateEtatUtilisateur, getUtilisateurKpi } from "../services/utilisateurService";
import type { Utilisateur, UtilisateurKpi } from "../types/utilisateur";

export function useUtilisateurs(
  token: string,
  profil: string,
  etat: string,
  email: string,
  page: number,
  size: number
) {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUtilisateurs(token, profil, etat, email, page, size);
        setUtilisateurs(data.content);
        setTotalPages(data.totalPages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, profil, etat, email, page, size]);

  const updateEtat = async (id: number, etat: number) => {
    try {
      const updated = await updateEtatUtilisateur(id, etat, token);
      setUtilisateurs(prev => prev.map(u => u.id === updated.id ? updated : u));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { utilisateurs, totalPages, loading, error, updateEtat };
}


export function useUtilisateurKpi(token: string) {
  const [kpi, setKpi] = useState<UtilisateurKpi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUtilisateurKpi(token);
        setKpi(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return { kpi, loading, error };
}

