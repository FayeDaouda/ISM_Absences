export interface Justification {
  id: number;
  etudiantId: number;
  nom: string;
  prenom: string;
  classe: string;
  email: string;
  matricule: string;
  motif: string;
  document: string;
  dateAbsence: string;
  dateJustification: string;
  statut: 'en_attente' | 'valide' | 'invalide';
  commentaireAdmin?: string;
  dateTraitement?: string;
  traitePar?: string;
  pieceJointe?: string;
  heuresAbsence?: number;
  typeAbsence?: 'totale' | 'partielle';
}

export interface CreateJustificationRequest {
  etudiantId: number;
  motif: string;
  document: string;
  dateAbsence: string;
  pieceJointe?: File;
  typeAbsence?: 'totale' | 'partielle';
  heuresAbsence?: number;
}

export interface UpdateJustificationRequest {
  id: number;
  statut: 'valide' | 'invalide';
  commentaireAdmin?: string;
  traitePar: string;
}