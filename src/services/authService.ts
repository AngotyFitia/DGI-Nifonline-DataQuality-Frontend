import type { AuthRequest, User } from "../types/authentification";

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

export async function login(data: AuthRequest) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let json: any = null;
  try {
    json = await res.json();
  } catch {}

  if (!res.ok) {
    const error: any = new Error("Erreur lors de la connexion");
    error.errors = json?.errors || {};
    throw error;
  }

  return json;
}


export async function register(data: AuthRequest) {
  console.log("Payload envoyé:", data);
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let json: any = null;
  try {
    json = await res.json();
  } catch {}

  if (!res.ok) {
    const error: any = new Error(json?.message || "Erreur lors de l'inscription");
    error.errors = json?.errors || { global: [json?.message] };
    throw error;
  }

  return json;
}

export async function logout(token: string) {
  await fetchWithAuth(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export async function getCurrentUser(token: string): Promise<User> {
  const res = await fetchWithAuth(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getSecuriteKpi(token: string) {
  const res = await fetchWithAuth(`${BASE_URL}/api/utilisateurs/kpi-securite`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getAlertesSecurite(token: string) {
  const res = await fetchWithAuth(`${BASE_URL}/api/utilisateurs/alertes-securite`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
