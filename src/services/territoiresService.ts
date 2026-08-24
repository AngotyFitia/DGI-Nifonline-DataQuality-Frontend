export async function uploadTerritoireFile( endpoint: string, file: File,token?: string): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, { method: "POST", headers: token ? { Authorization: `Bearer ${token}` } : undefined, body: formData,});
    if (res.status === 401) {
      localStorage.removeItem("jwt");
      window.location.href = "/";
      throw new Error("Non autorisé : token invalide ou expiré");
    }
    return res.json();
}
  
export const GEO_ENDPOINTS = { provinces: "/import/provinces", regions: "/import/regions", districts: "/import/districts", communes: "/import/communes",};


