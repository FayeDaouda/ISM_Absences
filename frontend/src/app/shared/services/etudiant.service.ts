import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  matricule: string;
  classe: string;
  telephone: string;
  utilisateurId?: string;
}

@Injectable({ providedIn: 'root' })
export class EtudiantService {
  private baseUrl = 'http://localhost:3000/etudiants'; // JSON Server

  constructor(private http: HttpClient) {}

  getAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.baseUrl);
  }
}

