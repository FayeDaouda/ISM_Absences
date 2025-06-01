// models/classe.model.ts (bonus)
export interface Classe {
  id: number;
  nom: string;
  niveau: string;
  filiere: string;
  anneeAcademique: string;
  effectif: number;
  responsableId?: number;
  responsableNom?: string;
  emploiDuTemps?: string;
  dateCreation: string;
  statut: 'active' | 'inactive';
}
