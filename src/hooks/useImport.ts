import { useQuery, useMutation } from "@tanstack/react-query";
import { uploadFile, GEO_ENDPOINTS } from "../services/territoiresService";
import { ACTIVITES_ENDPOINTS, uploadFile as uploadActivites } from "../services/activitesServices";
import { CENTRES_ENDPOINTS, uploadFile as uploadCentres } from "../services/centreService";
import { getRegimesFiscaux } from "../services/regimesFiscauxService";
import { getFormesJuridiques } from "../services/formesJuridiquesService";
import { getTypesImpots } from "../services/typesImpotsService";
import type { RegimeFiscal, FormeJuridique, TypeImpot, PageResponse } from "../types/import";

export function useUploadTerritoires(token?: string) {
  return useMutation({
    mutationFn: (vars: { type: keyof typeof GEO_ENDPOINTS; file: File }) =>
      uploadFile(GEO_ENDPOINTS[vars.type], vars.file, token),
      onError: (err: any) => {
        console.error("Erreur import:", err.errors || err.message);
      }
  });
}

export function useUploadActivites(token?: string) {
  return useMutation({
    mutationFn: (vars: { type: keyof typeof ACTIVITES_ENDPOINTS; file: File }) =>
      uploadActivites(ACTIVITES_ENDPOINTS[vars.type], vars.file, token),
    onError: (err: any) => {
      console.error("Erreur import:", err.errors || err.message);
    }
  });
}


export function useUploadCentres(token?: string) {
  return useMutation({
    mutationFn: (vars: { type: keyof typeof CENTRES_ENDPOINTS; file: File }) =>
      uploadCentres(CENTRES_ENDPOINTS[vars.type], vars.file, token),
    onError: (err: any) => {
      console.error("Erreur import:", err.errors || err.message);
    }
  });
}

export function useRegimesFiscaux( token: string, intitule: string, description: string, etat: string, page: number, size: number) {
  return useQuery<PageResponse<RegimeFiscal>>({
    queryKey: ["regimes-fiscaux", intitule, description, etat, page, size],
    queryFn: () => getRegimesFiscaux(token, intitule, description, etat, page, size),
    placeholderData: (prev) => prev,
  });
}

export function useFormesJuridiques( token: string, abreviation: string, intitule: string, description: string, etat: string, page: number, size: number) {
  return useQuery<PageResponse<FormeJuridique>>({
    queryKey: ["formes-juridiques", abreviation, intitule, description, etat, page, size],
    queryFn: () => getFormesJuridiques(token, abreviation, intitule, description, etat, page, size),
    placeholderData: (prev) => prev,
  });
}

export function useTypesImpots( token: string, code: string, intitule: string, etat: string, page: number, size: number) {
  return useQuery<PageResponse<TypeImpot>>({
    queryKey: ["types-impots", code, intitule, etat, page, size],
    queryFn: () => getTypesImpots(token, code, intitule, etat, page, size),
    placeholderData: (prev) => prev,
  });
}
