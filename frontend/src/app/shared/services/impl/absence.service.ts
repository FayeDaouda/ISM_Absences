import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Absence {
  id: string;
  etudiantId: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  type: 'RETARD' | 'ABSENCE';
  nomEtudiant: string;
  prenomEtudiant: string;
  etat: 'JUSTIFIEE' | 'NON_JUSTIFIEE' | 'EN_ATTENTE',
  justification?: {
    id: String,
    commentaire: String,
    fichierUrl?: String
  };
}

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  private apiUrl = 'http://localhost:3000/absences';

  constructor(private http: HttpClient) {}

  getAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(this.apiUrl);
  }

  getAbsencesByEtudiant(etudiantId: string): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.apiUrl}?etudiantId=${etudiantId}`);
  }
}
