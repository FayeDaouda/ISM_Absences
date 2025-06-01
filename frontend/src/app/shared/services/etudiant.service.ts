import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Etudiant {
  nom: string;
  prenom: string;
  matricule: string;
  classe: string;
}

@Injectable({ providedIn: 'root' })
export class EtudiantService {
  private apiUrl = 'http://localhost:8081/api/etudiants'; 

  constructor(private http: HttpClient) {}

  getAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/light`);
  }
}

