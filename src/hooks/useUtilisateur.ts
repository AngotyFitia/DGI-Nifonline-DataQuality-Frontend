import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {getUtilisateurs, updateEtatUtilisateur, getUtilisateurKpi, getInscriptionsParMoisRange,} from "../services/utilisateurService";
import type { Utilisateur, UtilisateurKpi } from "../types/utilisateur";

export function useUtilisateurs(token: string, profil: string, etat: string, email: string, page: number, size: number) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["utilisateurs", profil, etat, email, page, size],
    queryFn: () => getUtilisateurs(token, profil, etat, email, page, size),
    placeholderData: (prev) => prev, 
  });

  const mutation = useMutation({
    mutationFn: (vars: { id: number; etat: number }) =>
      updateEtatUtilisateur(vars.id, vars.etat, token),
    onSuccess: (updated) => {
      queryClient.setQueryData(
        ["utilisateurs", profil, etat, email, page, size],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            content: oldData.content.map((u: Utilisateur) =>
              u.id === updated.id ? updated : u
            ),
          };
        }
      );
    },
  });

  return { utilisateurs: data?.content ?? [], totalPages: data?.totalPages ?? 0, loading: isLoading, error, updateEtat: mutation.mutate,};
}

export function useUtilisateurKpi(token: string) {
  const { data, isLoading, error } = useQuery<UtilisateurKpi>({
    queryKey: ["utilisateur-kpi"],
    queryFn: () => getUtilisateurKpi(token),
    staleTime: 1000 * 60 * 5, // cache 5 minutes
    retry: 1, // réessaye une fois si erreur
  });

  return { kpi: data ?? null, loading: isLoading, error };
}

export function useInscriptionsParMoisRange(token: string, start: string, end: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["inscriptions-range", start, end],
    queryFn: () => getInscriptionsParMoisRange(token, start, end),
    staleTime: 1000 * 60 * 2, 
  });

  return { data: data ?? [], loading: isLoading, error };
}
