export interface RegisterRequest {
    email: string;
    motDePasse: string;
    recaptchaToken: string;
  }
  
  export interface LoginRequest {
    email: string;
    motDePasse: string;
    recaptchaToken: string;
  }
  
  export interface TokenResponse {
    token: string;
  }
  