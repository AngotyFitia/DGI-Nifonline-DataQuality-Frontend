import { useState } from "react";
import { uploadGeoFile, GEO_ENDPOINTS } from "../services/importService";

export function useGeoImport() {
  const [loading, setLoading] = useState(false);

  const uploadAll = async (files: Record<string, File | null>, token?: string) => {
    setLoading(true);
    try {
      const results: Record<string, any> = {};
      if (files.provinces) results.provinces = await uploadGeoFile(GEO_ENDPOINTS.provinces, files.provinces, token);
      if (files.regions) results.regions = await uploadGeoFile(GEO_ENDPOINTS.regions, files.regions, token);
      if (files.districts) results.districts = await uploadGeoFile(GEO_ENDPOINTS.districts, files.districts, token);
      if (files.communes) results.communes = await uploadGeoFile(GEO_ENDPOINTS.communes, files.communes, token);
      return results;
    } finally {
      setLoading(false);
    }
  };

  return { uploadAll, loading };
}
