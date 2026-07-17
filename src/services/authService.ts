import type { AuthRequest, User } from "../types/authentification";

const BASE_URL = "https://dgi-nifonline-dataquality-backend.onrender.com/auth";

export async function register(data: AuthRequest): Promise<Response> {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function login(data: AuthRequest): Promise<Response> {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}


export async function logout(token: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la déconnexion");
  }
}

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetch(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer l'utilisateur");
  }

  return response.json();
}
