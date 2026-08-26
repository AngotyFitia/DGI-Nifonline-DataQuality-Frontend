import { useEffect, useState } from "react";
import { uploadTerritoireFile, GEO_ENDPOINTS } from "../services/territoiresService";
import { getRegimesFiscaux } from "../services/regimesFiscauxService";
import { getFormesJuridiques } from "../services/formesJuridiquesService";
import type { RegimeFiscal, FormeJuridique, PageResponse } from "../types/import";
import { uploadActivitesFile, ACTIVITES_ENDPOINTS } from "../services/activitesServices";

export function useTerritoireImport() {
  const [loading, setLoading] = useState(false);

  const uploadAll = async (files: Record<string, File | null>, token?: string) => {
    setLoading(true);
    try {
      const results: Record<string, any> = {};
      if (files.provinces) results.provinces = await uploadTerritoireFile(GEO_ENDPOINTS.provinces, files.provinces, token);
      if (files.regions) results.regions = await uploadTerritoireFile(GEO_ENDPOINTS.regions, files.regions, token);
      if (files.districts) results.districts = await uploadTerritoireFile(GEO_ENDPOINTS.districts, files.districts, token);
      if (files.communes) results.communes = await uploadTerritoireFile(GEO_ENDPOINTS.communes, files.communes, token);
      return results;
    } finally {
      setLoading(false);
    }
  };

  return { uploadAll, loading };
}

export function useActivitesImport() {
  const [loading, setLoading] = useState(false);

  const uploadAll = async (files: Record<string, File | null>, token?: string) => {
    setLoading(true);
    try {
      const results: Record<string, any> = {};
      if (files.secteurs) results.secteurs = await uploadActivitesFile(ACTIVITES_ENDPOINTS.secteurs, files.secteurs, token);
      if (files.activites) results.activites = await uploadActivitesFile(ACTIVITES_ENDPOINTS.activites, files.activites, token);
      return results;
    } finally {
      setLoading(false);
    }
  };

  return { uploadAll, loading };
}

export function useRegimesFiscaux(intitule: string,description: string,etat: string,page: number,size: number) {
  const [data, setData] = useState<PageResponse<RegimeFiscal> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const result = await getRegimesFiscaux(token, intitule, description, etat, page, size);
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, [intitule, description, etat, page, size]);

  return { data, loading, error };
}

export function useFormesJuridiques(abreviation: string, intitule: string, description: string, etat: string,page: number,size: number) {
  const [data, setData] = useState<PageResponse<FormeJuridique> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const result = await getFormesJuridiques(token, abreviation, intitule, description, etat, page, size);
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, [abreviation, intitule, description, etat, page, size]);

  return { data, loading, error };
}

