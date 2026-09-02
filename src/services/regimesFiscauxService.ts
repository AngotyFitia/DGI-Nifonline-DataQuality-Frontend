import type { RegimeFiscal, PageResponse, ImportReport } from "../types/import";

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



export async function getRegimesFiscaux(token: string | null,intitule: string,description: string,etat: string,page: number,size: number): Promise<PageResponse<RegimeFiscal>> {
  const res = await fetchWithAuth(
    `${BASE_URL}/import/liste/regimes-fiscaux?intitule=${intitule}&description=${description}&etat=${etat}&page=${page}&size=${size}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.json();
}

export async function importRegimesFiscaux(token: string | null,file: File): Promise<ImportReport> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchWithAuth(`${BASE_URL}/import/regimes-fiscaux`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  return res.json() as Promise<ImportReport>;
}
