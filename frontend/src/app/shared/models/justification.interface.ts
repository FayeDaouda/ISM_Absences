export enum StatutJustification {
  EN_ATTENTE = 'EN_ATTENTE',
  ACCEPTEE = 'ACCEPTEE',
  REFUSEE = 'REFUSEE'
}

export interface JustificationRequest {
  commentaire: string;
  fichierUrl?: string;
  statut: StatutJustification;
}

export interface Justification {
  id?: string;
  commentaire: string;
  fichierUrl?: string;
  statut: StatutJustification;
  dateCreation?: Date;
}