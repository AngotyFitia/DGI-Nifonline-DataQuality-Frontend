import type { UploadResponse } from '../types/import';

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

export async function uploadFile(endpoint: string, file: File, token?: string): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchWithAuth(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    throw json;
  }
  return json;
}


export const ACTIVITES_ENDPOINTS = {secteurs: "/import/secteurs",activites: "/import/activites",};
