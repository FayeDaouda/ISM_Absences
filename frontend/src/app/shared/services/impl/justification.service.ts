import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { IJustificationService } from '../IJustificationService';
import { Justification } from '../../models/justification.model';
@Injectable({
  providedIn: 'root' 
})
export class JustificationService implements IJustificationService{
  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/web/justifications';

  constructor(private http: HttpClient) { }

  getAllJustifications(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  getById(absenceId: string): Observable<Justification> {
    return this.http.get<any>(`${this.apiUrl}/${absenceId}/justification`);
  }
  getByAbsenceId(absenceId: string): Observable<Justification> {
    return this.http.get<any>(`${this.apiUrl}/${absenceId}`);
  }

  traiterJustification(absenceId: string, statut: 'VALIDEE' | 'REFUSEE'): Observable<any> {
    return this.http.post(`https://gestion-absence-ism-dev.onrender.com/api/web/admin/${absenceId}/valider`, {
      statut
    });
  }

}
