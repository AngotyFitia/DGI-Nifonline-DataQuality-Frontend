import type { TypeImpot, PageResponse, ImportReport } from "../types/import";

export async function getTypesImpots(token: string | null, code:string, intitule:string,etat:string, page: number,size: number): Promise<PageResponse<TypeImpot>> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/import/liste/types-impots?code=${code}&intitule=${intitule}&etat=${etat}&page=${page}&size=${size}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) throw new Error("Erreur API types impots");
  return response.json();
}

export async function importTypesImpots(token: string | null,file: File): Promise<ImportReport> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/import/types-impots`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Erreur import types impots");
  }
  return response.json() as Promise<ImportReport>;
}