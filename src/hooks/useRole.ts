import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = { role: string; email: string };

export function useUserRole(): string | null {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setRole(decoded.role);
    } catch {
      setRole(null);
    }
  }, []);

  return role;
}
