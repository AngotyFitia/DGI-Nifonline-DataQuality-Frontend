import { useState, useEffect } from "react";
import { getProfilKpi, getProfils } from "../services/profilService";

export function useProfils() {
  const [profils, setProfils] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfils();
        setProfils(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return profils;
}

export function useProfilKpi(token: string) {
  const [kpi, setKpi] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfilKpi(token)
      .then(setKpi)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return { kpi, loading, error };
}

