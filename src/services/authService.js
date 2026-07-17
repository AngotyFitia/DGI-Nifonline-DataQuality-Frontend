export async function register({ email, motDePasse, recaptchaToken }) {
  return fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, motDePasse, recaptchaToken })
  });
}
  
export async function login({ email, motDePasse, recaptchaToken }) {
  return fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, motDePasse, recaptchaToken })
  });
}

export async function logout(token) {
  const response = await fetch("http://localhost:8080/auth/logout", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la déconnexion");
  }
}

export async function getCurrentUser(token) {
  const response = await fetch("http://localhost:8080/auth/me", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Impossible de récupérer l'utilisateur");
  return response.json();
}

  