export interface Absence {
date: any;
  id: string;
  nom: string;
  prenom: string;
  dateAbsence: string;
  etat: 'justifiee' | 'en_attente' | 'non_justifiee';
  description: string;
  justificatifUrl: string;
}
