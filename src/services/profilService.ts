export async function getProfils(): Promise<{ label: string; value: number }[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profils`);
    if (!response.ok) {
      throw new Error("Impossible de récupérer les profils");
    }
    const data = await response.json();
    return data.map((p: any) => ({ label: p.intitule, value: p.id }));
}  