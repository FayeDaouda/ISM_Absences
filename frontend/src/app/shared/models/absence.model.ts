export interface Absence {
  id: number;
  nom: string;
  prenom: string;
  date: string;
  etat: 'justifiee' | 'en_attente' | 'non_justifiee';
  description: string;
  justificatifUrl: string;
}
