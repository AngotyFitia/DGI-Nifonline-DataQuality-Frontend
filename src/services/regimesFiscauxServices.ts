import type { RegimeFiscal, PageResponse, ImportReport } from "../types/import";

export async function getRegimesFiscaux(token: string | null, intitule:string, description: string, etat:string, page: number,size: number): Promise<PageResponse<RegimeFiscal>> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/import/liste/regimes-fiscaux?intitule=${intitule}&description=${description}&etat=${etat}&page=${page}&size=${size}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) throw new Error("Erreur API régimes fiscaux");
  return response.json();
}

// export async function importRegimesFiscaux(token: string | null,file: File): Promise<string> {
//   const formData = new FormData();
//   formData.append("file", file);
//   const response = await fetch(`${import.meta.env.VITE_API_URL}/import/regimes-fiscaux`,{method: "POST", headers: { Authorization: `Bearer ${token}` },body: formData,});
//   if (!response.ok) throw new Error("Erreur import régimes fiscaux");
//   return response.text(); 
// }
export async function importRegimesFiscaux(token: string | null,file: File): Promise<ImportReport> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/import/regimes-fiscaux`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Erreur import régimes fiscaux");
  }
  return response.json() as Promise<ImportReport>;
}