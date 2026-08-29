import type { FormeJuridique, PageResponse, ImportReport } from "../types/import";

export async function getFormesJuridiques(token: string | null, abreviation: string,  intitule:string, description: string, etat:string, page: number,size: number): Promise<PageResponse<FormeJuridique>> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/import/liste/formes-juridiques?abreviation=${abreviation}&intitule=${intitule}&description=${description}&etat=${etat}&page=${page}&size=${size}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) throw new Error("Erreur API formes juridiques");
  return response.json();
}

export async function importFormesJuridiques(token: string | null,file: File): Promise<ImportReport> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/import/formes-juridiques`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Erreur import formes juridiques");
  }
  return response.json() as Promise<ImportReport>;
}