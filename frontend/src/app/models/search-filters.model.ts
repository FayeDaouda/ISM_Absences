// models/search-filters.model.ts (bonus)
export interface JustificationFilters {
  statut?: 'en_attente' | 'valide' | 'invalide';
  classe?: string;
  dateDebut?: string;
  dateFin?: string;
  nom?: string;
  page?: number;
  limit?: number;
}

export interface AbsenceFilters {
  statut?: 'present' | 'absent' | 'retard' | 'justifie';
  classe?: string;
  dateDebut?: string;
  dateFin?: string;
  nom?: string;
  coursId?: number;
  page?: number;
  limit?: number;
}

export interface EtudiantFilters {
  classe?: string;
  filiere?: string;
  niveau?: string;
  statut?: 'actif' | 'inactif' | 'suspendu' | 'diplome';
  nom?: string;
  anneeAcademique?: string;
  page?: number;
  limit?: number;
}