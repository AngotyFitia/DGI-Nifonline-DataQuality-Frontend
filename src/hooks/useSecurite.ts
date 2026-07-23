import { useEffect, useState } from "react";
import { getSecuriteKpi, getAlertesSecurite } from "../services/authService";

export function useSecuriteKpi(token: string) {
  const [kpi, setKpi] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSecuriteKpi(token)
      .then(setKpi)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return { kpi, loading, error };
}

export function useAlertesSecurite(token: string) {
  const [alertes, setAlertes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAlertesSecurite(token)
      .then(setAlertes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return { alertes, loading, error };
}
