import type { TypeImpot, PageResponse, ImportReport } from "../types/import";

const BASE_URL = import.meta.env.VITE_API_URL;

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const res = await fetch(url, options);
  if (res.status === 401) {
    localStorage.removeItem("jwt");
    window.location.href = "/";
    throw { total: 0, success: 0, error: 0, message: "Non autorisé : token invalide ou expiré", status: "error" };
  }

  let json: any = null;
  try {
    json = await res.json();
  } catch {  }

  if (!res.ok) {
    throw json || { total: 0, success: 0, error: 0, message: `Erreur serveur (${res.status})`, status: "error" };
  }
  return new Response(JSON.stringify(json), { status: res.status });
}

export async function getTypesImpots(token: string | null,code: string, intitule: string, etat: string, page: number, size: number): Promise<PageResponse<TypeImpot>> {
  const res = await fetchWithAuth(
    `${BASE_URL}/import/liste/types-impots?code=${code}&intitule=${intitule}&etat=${etat}&page=${page}&size=${size}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.json();
}

export async function importTypesImpots( token: string | null, file: File): Promise<ImportReport> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchWithAuth(`${BASE_URL}/import/types-impots`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  return res.json() as Promise<ImportReport>;
}
