import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../../models/etudiant.model';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/web/etudiants';

  constructor(private http: HttpClient) {}

  getEtudiants(page=0, size=3): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getEtudiantById(id: string): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`);
  }
}
