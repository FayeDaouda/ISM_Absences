import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Absence } from '../models/absence.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AbsenceService {
  private apiUrl = 'http://localhost:8081/api/absences';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Absence[]> {
  return this.http.get<Absence[]>('http://localhost:8081/api/absences/details');
}


  updateEtat(id: string, newEtat: 'justifiee' | 'non_justifiee') {
  const url = newEtat === 'justifiee'
    ? `${this.apiUrl}/justifier/${id}`
    : `${this.apiUrl}/refuser/${id}`;
  return this.http.put<Absence>(url, {});
}

getById(id: string): Observable<Absence> {
  return this.http.get<Absence>(`${this.apiUrl}/${id}`);
}

}
