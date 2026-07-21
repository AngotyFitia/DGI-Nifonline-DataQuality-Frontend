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

export async function updateEtatUtilisateur(id: number, etat: number, token: string): Promise<Utilisateur> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/utilisateurs/${id}/etat?etat=${etat}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Impossible de mettre à jour l'état de l'utilisateur");
  }

  return response.json();
}