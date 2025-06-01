import { Utilisateur, UtilisateurCreateRequest } from "./user.interface";

export interface EtudiantSimpleRequest {
  matricule: string;
  telephone: string;
  utilisateurcreate: UtilisateurCreateRequest;
}

export interface Etudiant {
  id?: string;
  matricule: string;
  telephone: string;
  utilisateur?: Utilisateur;
}