import { useState, useEffect } from "react";
import { getProfils } from "../services/profilService";

export function useProfils() {
  const [profils, setProfils] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfils();
        setProfils(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return profils;
}
