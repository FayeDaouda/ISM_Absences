import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Etudiant {
  id: string;
  matricule: string;
  telephone: string;
  utilisateurcreate: {
    nom: string;
    prenom: string;
    login: string;
    motDePasse: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  private apiUrl = 'http://localhost:3000/etudiants';

  constructor(private http: HttpClient) {}

  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }

  getEtudiantById(id: string): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`);
  }
}
