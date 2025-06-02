export interface Absence {
  nonEtudiant: string;
  prenomEtudiant: string;
  classeEtudiant: string;
  sessionId: string;
  type: 'ABSENCE' | 'RETARD' | 'PRESENT';
  justifiee: boolean;
}
