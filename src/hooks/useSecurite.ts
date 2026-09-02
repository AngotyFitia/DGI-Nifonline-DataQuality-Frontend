import { useQuery } from "@tanstack/react-query";
import { getSecuriteKpi, getAlertesSecurite } from "../services/authService";

export function useSecuriteKpi(token: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["securite-kpi"],
    queryFn: () => getSecuriteKpi(token),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return { kpi: data ?? null, loading: isLoading, error };
}

export function useAlertesSecurite(token: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["alertes-securite"],
    queryFn: () => getAlertesSecurite(token),
    staleTime: 1000 * 60 * 2
  });

  return { alertes: data ?? [], loading: isLoading, error };
}
