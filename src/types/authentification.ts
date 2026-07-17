export interface AuthRequest {
    email: string;
    motDePasse: string;
    recaptchaToken: string | null;
}
    
export interface User {
    email: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
  