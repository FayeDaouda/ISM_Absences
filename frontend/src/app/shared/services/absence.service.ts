import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// Interfaces DTOs

export interface AbsenceRequest {
  etudiantId: string;
  sessionId: string;
  type: string;
  justifiee?: boolean;
}

export interface AbsenceAllResponse {
  heureArrivee: any;
  datePointage: string;
  matriculeEtudiant: any;
  situation: Situation;
  dateAbsence: string | number | Date;
  nomEtudiant: string;
  prenomEtudiant: string;
  classeEtudiant: string;
  sessionId: string;
  type: Situation;
  justifiee: boolean;
}

export interface AbsenceSimpleResponse {
  sessionId: string;
  classeEtudiant: string;
  type: Situation;
  justifiee: boolean;
  justificationId?: string;
  heurePointage?: string;
}

export enum Situation {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  RETARD = 'RETARD'
}

export interface AbsenceEntity {
  id?: string;
  etudiantId: string;
  sessionId: string;
  type: Situation;
  justifiee: boolean;
  justificationId?: string;
  heurePointage?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

export interface AbsenceStats {
  presenceJour: number;
  absenceJour: number;
  justificationsJour: number;
}

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  filterAbsences(statusFilter: string, dateFilter: string, currentPage: number, pageSize: number): Observable<PageResponse<AbsenceAllResponse>> {
    let params = new HttpParams()
      .set('page', currentPage.toString())
      .set('size', pageSize.toString());

    if (statusFilter) {
      params = params.set('type', statusFilter); // ex: "PRESENT", "ABSENT", etc.
    }

    if (dateFilter) {
      params = params.set('date', dateFilter); // ex: "2024-06-01"
    }

    return this.http.get<ApiResponse<PageResponse<AbsenceAllResponse>>>(`${this.baseUrl}/filter`, { params })
      .pipe(
        map(response => response.data || {
          content: [],
          totalElements: 0,
          totalPages: 0,
          size: pageSize,
          number: currentPage,
          first: true,
          last: true
        }),
        catchError(this.handleError)
      );
  }
  searchAbsences(searchTerm: string, currentPage: number, pageSize: number): Observable<PageResponse<AbsenceAllResponse>> {
  return this.getAllAbsences(0, 1000).pipe(
    map(page => {
      const filtered = page.content.filter(a =>
        a.nomEtudiant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.prenomEtudiant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.matriculeEtudiant?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const start = currentPage * pageSize;
      const end = start + pageSize;
      const pagedContent = filtered.slice(start, end);

      return {
        content: pagedContent,
        totalElements: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize),
        size: pageSize,
        number: currentPage,
        first: currentPage === 0,
        last: end >= filtered.length
      };
    }),
    catchError(this.handleError)
  );
}


  private readonly baseUrl = `${environment.apiUrl}/api/pointages`;

  constructor(private http: HttpClient) { }

  createAbsence(request: AbsenceRequest): Observable<ApiResponse<AbsenceEntity>> {
    return this.http.post<ApiResponse<AbsenceEntity>>(this.baseUrl, request)
      .pipe(catchError(this.handleError));
  }

  pointerEtudiantByQRCode(sessionId: string, etudiantId: string): Observable<ApiResponse<AbsenceEntity>> {
    const params = new HttpParams()
      .set('sessionId', sessionId)
      .set('etudiantId', etudiantId);
    return this.http.post<ApiResponse<AbsenceEntity>>(`${this.baseUrl}/pointer`, null, { params })
      .pipe(catchError(this.handleError));
  }

  pointerEtudiantByMatricule(sessionId: string, matricule: string): Observable<ApiResponse<AbsenceEntity>> {
    const params = new HttpParams()
      .set('sessionId', sessionId)
      .set('matricule', matricule);
    return this.http.post<ApiResponse<AbsenceEntity>>(`${this.baseUrl}/pointerByMatricule`, null, { params })
      .pipe(catchError(this.handleError));
  }

  getAllAbsences(page: number = 0, size: number = 10): Observable<PageResponse<AbsenceAllResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ApiResponse<PageResponse<AbsenceAllResponse>>>(this.baseUrl, { params })
      .pipe(
        map(response => response.data || { content: [], totalElements: 0, totalPages: 0, size: 0, number: 0, first: true, last: true }),
        catchError(this.handleError)
      );
  }

  getAbsencesByEtudiant(etudiantId: string, page: number = 0, size: number = 10): Observable<PageResponse<AbsenceAllResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ApiResponse<PageResponse<AbsenceAllResponse>>>(`${this.baseUrl}/${etudiantId}`, { params })
      .pipe(
        map(response => response.data || { content: [], totalElements: 0, totalPages: 0, size: 0, number: 0, first: true, last: true }),
        catchError(this.handleError)
      );
  }

  getAbsenceDetails(id: string): Observable<AbsenceSimpleResponse> {
    return this.http.get<ApiResponse<AbsenceSimpleResponse>>(`${this.baseUrl}/${id}/details`)
      .pipe(
        map(response => response.data!),
        catchError(this.handleError)
      );
  }

  getRecentAbsences(limit: number = 3): Observable<AbsenceAllResponse[]> {
    return this.getAllAbsences(0, limit).pipe(
      map(page => page.content)
    );
  }

  getAbsenceStats(): Observable<AbsenceStats> {
    return this.getAllAbsences(0, 1000).pipe(
      map((page: PageResponse<AbsenceAllResponse>) => {
        const absences = page.content;
        const presenceJour = absences.filter(a => a.type === Situation.PRESENT).length;
        const absenceJour = absences.filter(a => a.type === Situation.ABSENT).length;
        const justificationsJour = absences.filter(a => a.justifiee === true).length;
        return { presenceJour, absenceJour, justificationsJour };
      }),
      catchError((error) => {
        console.error('Erreur lors du calcul des statistiques:', error);
        return of({ presenceJour: 0, absenceJour: 0, justificationsJour: 0 });
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erreur dans AbsenceService:', error);
    let errorMessage = 'Une erreur est survenue';
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.status) {
      switch (error.status) {
        case 400: errorMessage = 'Données invalides'; break;
        case 401: errorMessage = 'Non autorisé'; break;
        case 403: errorMessage = 'Accès interdit'; break;
        case 404: errorMessage = 'Ressource introuvable'; break;
        case 500: errorMessage = 'Erreur serveur interne'; break;
        default: errorMessage = `Erreur ${error.status}: ${error.statusText}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
