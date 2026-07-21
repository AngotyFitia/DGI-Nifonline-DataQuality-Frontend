import type { Utilisateur } from "../types/utilisateur";

export async function getUtilisateurs(token: string): Promise<Utilisateur[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/utilisateurs`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les utilisateurs");
  }

  return response.json();
}
