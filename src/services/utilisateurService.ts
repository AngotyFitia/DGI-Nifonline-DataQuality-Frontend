import type { Utilisateur, UtilisateurKpi } from "../types/utilisateur";

const BASE_URL = import.meta.env.VITE_API_URL;

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const res = await fetch(url, options);
  if (res.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/";
    throw new Error("Non autorisé : token invalide ou expiré");
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erreur serveur (${res.status}): ${text}`);
  }
  return res;
}

export async function getUtilisateurs(token: string, profil: string, etat: string, email: string, page: number, size: number) {
  const res = await fetchWithAuth(
    `${BASE_URL}/api/utilisateurs?profil=${profil}&etat=${etat}&email=${email}&page=${page}&size=${size}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.json();
}

export async function updateEtatUtilisateur(id: number, etat: number, token: string): Promise<Utilisateur> {
  const res = await fetchWithAuth(`${BASE_URL}/api/utilisateurs/${id}/etat?etat=${etat}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getUtilisateurKpi(token: string): Promise<UtilisateurKpi> {
  const res = await fetchWithAuth(`${BASE_URL}/api/utilisateurs/kpi`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getInscriptionsParMoisRange(token: string, start: string, end: string) {
  const res = await fetchWithAuth(
    `${BASE_URL}/api/utilisateurs/kpi-inscriptions-range?startDate=${start}&endDate=${end}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.json();
}
