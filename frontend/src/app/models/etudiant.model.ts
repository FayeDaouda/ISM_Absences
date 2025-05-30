// models/etudiant.model.ts
export interface Etudiant {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateNaissance?: string;
  lieuNaissance?: string;
  adresse?: string;
  classe: string;
  niveau: string;
  filiere: string;
  anneeAcademique: string;
  statut: 'actif' | 'inactif' | 'suspendu' | 'diplome';
  dateInscription: string;
  dateCreation: string;
  dateModification?: string;
  photo?: string;
  cni?: string;
  nationalite?: string;
  sexe?: 'M' | 'F';
  tuteur?: {
    nom: string;
    prenom: string;
    telephone: string;
    email?: string;
    relation: string;
  };
}

export interface CreateEtudiantRequest {
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateNaissance?: string;
  lieuNaissance?: string;
  adresse?: string;
  classe: string;
  niveau: string;
  filiere: string;
  anneeAcademique: string;
  photo?: File;
  cni?: string;
  nationalite?: string;
  sexe?: 'M' | 'F';
  tuteur?: {
    nom: string;
    prenom: string;
    telephone: string;
    email?: string;
    relation: string;
  };
}

export interface UpdateEtudiantRequest {
  id: number;
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  classe?: string;
  statut?: 'actif' | 'inactif' | 'suspendu' | 'diplome';
  photo?: File;
  tuteur?: {
    nom: string;
    prenom: string;
    telephone: string;
    email?: string;
    relation: string;
  };
}

export interface EtudiantStats {
  totalEtudiants: number;
  etudiantsActifs: number;
  etudiantsInactifs: number;
  nouveauxEtudiants: number;
  repartitionParClasse: Array<{
    classe: string;
    effectif: number;
  }>;
  repartitionParFiliere: Array<{
    filiere: string;
    effectif: number;
  }>;
}