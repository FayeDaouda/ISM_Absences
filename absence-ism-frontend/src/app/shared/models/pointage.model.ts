export interface PointageModel {

  id: string;
  nonEtudiant: string;
  prenomEtudiant: string;
  classeEtudiant: string;
  sessionId: string;
  type: 'ABSENCE' | 'PRESENT' | 'RETARD';
  justifiee: boolean;
  
}
