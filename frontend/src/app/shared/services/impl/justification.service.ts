import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Justification {
  id: string;
  absenceId: string;
  commentaire: string;
  fichierUrl: string;
  statut: string;
  etudiantId: string;
}

@Injectable({
  providedIn: 'root',
})
export class JustificationService {
  private apiUrl = 'http://localhost:3000/justifications';

  constructor(private http: HttpClient) {}

  getJustifications(): Observable<Justification[]> {
    return this.http.get<Justification[]>(this.apiUrl);
  }

  createJustification(justification: Justification): Observable<Justification> {
    return this.http.post<Justification>(this.apiUrl, justification);
  }
}
