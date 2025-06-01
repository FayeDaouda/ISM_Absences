export interface UtilisateurCreateRequest {
  nom: string;
  prenom: string;
  login: string;
  motDePasse: string;
  role: string;
}

export interface LoginRequest {
  login: string;
  motDePasse: string;
}

export interface Utilisateur {
  id?: string;
  nom: string;
  prenom: string;
  login: string;
  role: string;
}