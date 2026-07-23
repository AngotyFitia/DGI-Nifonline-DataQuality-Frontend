import type { Utilisateur, UtilisateurKpi } from "../types/utilisateur";

export async function getUtilisateurs(token: string, profil: string, etat: string, email: string, page: number,size: number): Promise<{ content: Utilisateur[]; totalPages: number; number: number; size: number }> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/utilisateurs?profil=${profil}&etat=${etat}&email=${email}&page=${page}&size=${size}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (response.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/"; 
    throw new Error("Non autorisé : token invalide ou expiré");
  }
  return response.json();
}


export async function updateEtatUtilisateur(id: number, etat: number, token: string): Promise<Utilisateur> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/utilisateurs/${id}/etat?etat=${etat}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/"; 
    throw new Error("Non autorisé : token invalide ou expiré");
  }
  return response.json();
}

export async function getUtilisateurKpi(token: string): Promise<UtilisateurKpi> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/utilisateurs/kpi`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/"; 
    throw new Error("Non autorisé : token invalide ou expiré");
  }

  return response.json();
}

export async function getInscriptionsParMoisRange(token: string, start: string, end: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/utilisateurs/kpi-inscriptions-range?startDate=${start}&endDate=${end}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (res.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/"; 
    throw new Error("Non autorisé : token invalide ou expiré");
  }
  if (!res.ok) throw new Error("Erreur lors du chargement des inscriptions");
  return res.json();
}

