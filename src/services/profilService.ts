const BASE_URL = import.meta.env.VITE_API_URL;

export async function getProfils(): Promise<{ label: string; value: number }[]> {
    const response = await fetch(`${BASE_URL}/auth/profils`);
    if (response.status === 401) {
      localStorage.removeItem("jwt");
      window.location.href = "/"; 
      throw new Error("Non autorisé : token invalide ou expiré");
    }
    const data = await response.json();
    return data.map((p: any) => ({ label: p.intitule, value: p.id }));
}  

export async function getProfilKpi(token: string) {
  const res = await fetch(`${BASE_URL}/api/utilisateurs/kpi-profil`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/"; 
    throw new Error("Non autorisé : token invalide ou expiré");
  }
  return res.json();
}
