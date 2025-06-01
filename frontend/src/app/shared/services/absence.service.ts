import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Absence } from '../models/absence.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AbsenceService {
  private apiUrl = 'http://localhost:8081/api/absences';

  constructor(private http: HttpClient) {}

getAbsencesDuJour(): Observable<Absence[]> {
  return this.http.get<Absence[]>('http://localhost:3000/absences');
}

getJustificationsEnAttente(): Observable<Absence[]> {
  return this.http.get<Absence[]>('http://localhost:3000/justifications?statut=EN_ATTENTE');
}

getAll(): Observable<Absence[]> {
  return this.http.get<Absence[]>('http://localhost:3000/absences');
}

getById(id: string): Observable<Absence> {
  return this.http.get<Absence>(`http://localhost:3000/absences/${id}`);
}

updateEtat(id: string, etat: 'justifiee' | 'non_justifiee'): Observable<any> {
  return this.http.patch(`http://localhost:3000/absences/${id}`, {
    etat,
    justifie: etat === 'justifiee'
  });
}



getStats(): Observable<{ absences: number, presences: number, justifications: number }> {
  return this.http.get<{ absences: number, presences: number, justifications: number }>(
    'http://localhost:3000/stats'
  );
}

}
