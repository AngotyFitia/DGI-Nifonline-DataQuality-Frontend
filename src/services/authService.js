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
  