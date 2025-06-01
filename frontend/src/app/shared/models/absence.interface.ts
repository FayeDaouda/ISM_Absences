export interface AbsenceRequest {
  etudiantId: string;
  sessionId: string;
  type: string;
  justifiee: boolean;
}

export interface Absence {
  id?: string;
  etudiantId: string;
  sessionId: string;
  type: string;
  justifiee: boolean;
  dateCreation?: Date;
}