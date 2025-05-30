import { Injectable } from '@angular/core';
import { Absence } from '../models/absence.model';

@Injectable({ providedIn: 'root' })
export class AbsenceService {
  private absences: Absence[] = [
    { 
        id: 1, 
        nom: 'Ndiaye', 
        prenom: 'Fatou', 
        date: '2025/05/15', 
        matricule: 'Mat10293',
        classe: 'L2CPD',
        mail: 'fatou.ndiaye2@ism.edu.sn',
        justification: 'Urgence médicale',
        etat: 'justifiée' },
    { 
        id: 2, 
        nom: 'Diop', 
        prenom: 'Alioune', 
        date: '2025/05/12', 
        matricule: 'Mat09876',
        classe: 'L3MAIE',
        mail: 'alioune.diop2@ism.edu.sn',
        justification: '',
        etat: 'non justifiée' },
    { 
        id: 3, 
        nom: 'Ba', 
        prenom: 'Seynabou', 
        date: '2025/05/10', 
        matricule: 'Mat01239',
        classe: 'L2GLRS',
        mail: 'seynabou.ba1@ism.edu.sn',
        justification: 'Un rendez-vous au consulat',
        etat: 'en attente' },
  ];

  getAbsences(): Absence[] {
    return this.absences;
  }
}
