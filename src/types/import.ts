export interface ImportReport {
    total: number;
    error: number;   
    success: number;
    message: string;
    status: "success" | "error" | "info" | "warning";
}

export interface PageResponse<T> { 
    content: T[];
    totalPages: number;
    number: number;
    size: number;
}

export type UploadResponse = {
    success: boolean;
    message: string;
    [key: string]: any;
};

export interface RegimeFiscal {
    id: number;
    intitule: string;
    description: string;
    etat: string;
    etatCouleur: string;
    etatIntitule: string;
}

export interface FormeJuridique {
    id: number;
    abreviation: string;
    intitule: string;
    description: string;
    etat: string;
    etatCouleur: string;
    etatIntitule: string;
}

export interface TypeImpot {
    id: number;
    code: string;
    intitule: string;
    etat: string;
    etatCouleur: string;
    etatIntitule: string;
}