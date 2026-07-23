import type { AuthRequest, User } from "../types/authentification";

const BASE_URL = import.meta.env.VITE_API_URL;

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const res = await fetch(url, options);

  if (res.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/"; 
    throw new Error("Non autorisé : token invalide ou expiré");
  }

  return res;
}

export async function register(data: AuthRequest): Promise<Response> {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function login(data: AuthRequest): Promise<Response> {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function logout(token: string) {
  const res = await fetchWithAuth(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Erreur lors de la déconnexion");
}

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetchWithAuth(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/"; 
    throw new Error("Non autorisé : token invalide ou expiré");
  }
  return response.json();
}

export async function getSecuriteKpi(token: string) {
  const res = await fetchWithAuth(`${BASE_URL}/api/utilisateurs/kpi-securite`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/"; 
    throw new Error("Non autorisé : token invalide ou expiré");
  }
  return res.json();
}

export async function getAlertesSecurite(token: string) {
  const res = await fetchWithAuth(`${BASE_URL}/api/utilisateurs/alertes-securite`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/"; 
    throw new Error("Non autorisé : token invalide ou expiré");
  }
  if (!res.ok) throw new Error("Erreur serveur");
  return res.json();
}
