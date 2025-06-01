// etudiant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface EtudiantResponse {
  id: string;
  nom: string;
  prenom: string;
  matricule: string;
  telephone: string;
  classeId: string;
}

export interface PagedResponse<T> {
  status: number;
  results: T[];
  pages: number[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  first: boolean;
  last: boolean;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = `${environment.apiUrl}/api/etudiants`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les étudiants avec pagination
   */
  getAllEtudiants(page: number = 0, size: number = 10): Observable<PagedResponse<EtudiantResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PagedResponse<EtudiantResponse>>(this.apiUrl, { params });
  }

  /**
   * Récupère un étudiant par son ID
   */
  getEtudiantById(id: string): Observable<EtudiantResponse> {
    return this.http.get<EtudiantResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Récupère un étudiant par son matricule
   */
  getEtudiantByMatricule(matricule: string): Observable<EtudiantResponse> {
    return this.http.get<EtudiantResponse>(`${this.apiUrl}/matricule/${matricule}`);
  }

  /**
   * Recherche des étudiants (si vous implémentez cette fonctionnalité côté backend)
   */
  searchEtudiants(searchTerm: string, page: number = 0, size: number = 10): Observable<PagedResponse<EtudiantResponse>> {
    const params = new HttpParams()
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PagedResponse<EtudiantResponse>>(`${this.apiUrl}/search`, { params });
  }
}

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EtudiantService {

//   constructor() { }
// }
