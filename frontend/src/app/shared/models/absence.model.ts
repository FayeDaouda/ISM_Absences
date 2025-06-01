export interface Absence {
  id: string;
  nom: string;
  prenom: string;
  matricule: string;
  classe: string;
  dateAbsence: string;
  description?: string;
  motif?: string;
  etat: 'justifiee' | 'non_justifiee' | 'en_attente';
  justifie: boolean;
  heure: string
}
