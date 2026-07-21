export interface AuthRequest {
    email: string;
    motDePasse: string;
    recaptchaToken: string | null;
    idProfil: number;
}

    
export interface User {
    email: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
  