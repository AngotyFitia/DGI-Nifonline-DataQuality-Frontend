import type { Profil } from './profil';

export interface Utilisateur {
    id: number;
    email: string;
    profil: Profil;   
    etat: string;
    etatCouleur: string;
    etatIntitule: string;
}
  