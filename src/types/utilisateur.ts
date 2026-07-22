import type { Profil } from './profil';

export interface Utilisateur {
    id: number;
    email: string;
    profil: Profil;   
    etat: string;
    etatCouleur: string;
    etatIntitule: string;
}
  
export type UtilisateurKpi = {
    total: number;
    actifs: number;
    inactifs: number;
    nouveaux7Jours: number;
};