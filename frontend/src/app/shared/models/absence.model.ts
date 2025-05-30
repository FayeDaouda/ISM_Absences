export interface Absence {
  id: number;
  nom: string;
  prenom: string;
  date: string;
  matricule: string;
  classe: string;
  mail: string;
  justification: string
  etat: 'justifiée' | 'non justifiée' | 'en attente';
}
