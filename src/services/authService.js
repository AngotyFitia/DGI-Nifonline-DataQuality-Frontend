export async function register({ email, motDePasse, recaptchaToken }) {
  return fetch("https://dgi-nifonline-dataquality-backend.onrender.com/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, motDePasse, recaptchaToken })
  });
}
  
export async function login({ email, motDePasse, recaptchaToken }) {
  return fetch("https://dgi-nifonline-dataquality-backend.onrender.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, motDePasse, recaptchaToken })
  });
}

export async function logout(token) {
  const response = await fetch("https://dgi-nifonline-dataquality-backend.onrender.com/auth/logout", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la déconnexion");
  }
}

export async function getCurrentUser(token) {
  const response = await fetch("https://dgi-nifonline-dataquality-backend.onrender.com/auth/me", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Impossible de récupérer l'utilisateur");
  return response.json();
}

  