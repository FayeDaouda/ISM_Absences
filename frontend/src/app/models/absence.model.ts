// models/absence.model.ts
export interface Absence {
  id: number;
  etudiantId: number;
  nom: string;
  prenom: string;
  classe: string;
  email: string;
  matricule: string;
  dateAbsence: string;
  heureDebut: string;
  heureFin: string;
  statut: 'present' | 'absent' | 'retard' | 'justifie';
  motif?: string;
  typeAbsence: 'totale' | 'partielle';
  heuresAbsence: number;
  coursId?: number;
  nomCours?: string;
  professeurId?: number;
  nomProfesseur?: string;
  justificationId?: number;
  dateCreation: string;
  dateModification?: string;
  cree_par?: string;
  modifie_par?: string;
}

export interface CreateAbsenceRequest {
  etudiantId: number;
  dateAbsence: string;
  heureDebut: string;
  heureFin: string;
  typeAbsence: 'totale' | 'partielle';
  heuresAbsence: number;
  coursId?: number;
  motif?: string;
  cree_par: string;
}

export interface UpdateAbsenceRequest {
  id: number;
  statut?: 'present' | 'absent' | 'retard' | 'justifie';
  motif?: string;
  justificationId?: number;
  modifie_par: string;
}

export interface AbsenceStats {
  totalAbsences: number;
  absencesJustifiees: number;
  absencesNonJustifiees: number;
  heuresAbsence: number;
  tauxAbsence: number;
}
