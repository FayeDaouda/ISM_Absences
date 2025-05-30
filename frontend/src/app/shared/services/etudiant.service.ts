import { Injectable } from '@angular/core';
import { Etudiant } from '../models/etudiant.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private etudiants: Etudiant[] = [
    { nom: 'Ndiaye', prenom: 'Abdoulaye', matricule: 'Mat23809', classe: 'L2MAIE' },
    { nom: 'Faye', prenom: 'Daouda', matricule: 'Mat09462', classe: 'L3CDSD' },
    { nom: 'Mbow', prenom: 'Fallou', matricule: 'Mat17234', classe: 'L2IAGE' },
    { nom: 'Diop', prenom: 'Pape Mbaye', matricule: 'Mat04972', classe: 'L3GLRS' },
    { nom: 'Bathily', prenom: 'Aboubacar', matricule: 'Mat29119', classe: 'L3GLRS' },
    { nom: 'Evarist', prenom: 'Samuel', matricule: 'Mat12097', classe: 'L2CDSD' },
    { nom: 'Niang', prenom: 'Mbaya', matricule: 'Mat01935', classe: 'L2ETSE' },
    { nom: 'Camara', prenom: 'Ramatoulaye', matricule: 'Mat11335', classe: 'L3CPD' }
  ];

  getEtudiants(): Observable<Etudiant[]> {
  return of(this.etudiants);
}

}
