import { useQuery } from "@tanstack/react-query";
import { getProfils, getProfilKpi } from "../services/profilService";

export function useProfils() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profils"],
    queryFn: getProfils,
    staleTime: 1000 * 60 * 10,
  });

  return { profils: data ?? [], loading: isLoading, error,};
}

export function useProfilKpi(token: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profil-kpi"],
    queryFn: () => getProfilKpi(token),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return { kpi: data ?? null, loading: isLoading,error,};
}
