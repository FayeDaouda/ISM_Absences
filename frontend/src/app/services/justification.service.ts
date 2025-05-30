// justification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Justification {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  email: string;
  matricule: string;
  motif: string;
  documentTexte: string;
  dateAbsence?: string;
  dateSoumission?: string;
  statut: 'en_attente' | 'validee' | 'invalidee';
  fichierJoint?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JustificationService {
  
  private apiUrl = 'http://localhost:8000/api'; // Remplacer par votre URL d'API
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Récupérer toutes les justifications
   */
  getJustifications(): Observable<Justification[]> {
    return this.http.get<Justification[]>(`${this.apiUrl}/justifications`)
      .pipe(
        catchError(this.handleError<Justification[]>('getJustifications', []))
      );
  }

  /**
   * Récupérer les justifications en attente
   */
  getJustificationsEnAttente(): Observable<Justification[]> {
    return this.http.get<Justification[]>(`${this.apiUrl}/justifications/en-attente`)
      .pipe(
        catchError(this.handleError<Justification[]>('getJustificationsEnAttente', []))
      );
  }

  /**
   * Récupérer une justification par ID
   */
  getJustificationById(id: number): Observable<Justification> {
    return this.http.get<Justification>(`${this.apiUrl}/justifications/${id}`)
      .pipe(
        catchError(this.handleError<Justification>('getJustificationById'))
      );
  }

  /**
   * Valider une justification
   */
  validerJustification(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/justifications/${id}/valider`, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('validerJustification'))
      );
  }

  /**
   * Invalider une justification
   */
  invaliderJustification(id: number, motifRefus?: string): Observable<any> {
    const body = motifRefus ? { motifRefus } : {};
    return this.http.put(`${this.apiUrl}/justifications/${id}/invalider`, body, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('invaliderJustification'))
      );
  }

  /**
   * Créer une nouvelle justification
   */
  creerJustification(justification: Partial<Justification>): Observable<Justification> {
    return this.http.post<Justification>(`${this.apiUrl}/justifications`, justification, this.httpOptions)
      .pipe(
        catchError(this.handleError<Justification>('creerJustification'))
      );
  }

  /**
   * Mettre à jour une justification
   */
  mettreAJourJustification(id: number, justification: Partial<Justification>): Observable<any> {
    return this.http.put(`${this.apiUrl}/justifications/${id}`, justification, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('mettreAJourJustification'))
      );
  }

  /**
   * Supprimer une justification
   */
  supprimerJustification(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/justifications/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('supprimerJustification'))
      );
  }

  /**
   * Récupérer les statistiques des justifications
   */
  getStatistiquesJustifications(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/justifications/statistiques`)
      .pipe(
        catchError(this.handleError<any>('getStatistiquesJustifications'))
      );
  }

  /**
   * Télécharger le document de justification
   */
  telechargerDocument(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/justifications/${id}/document`, { 
      responseType: 'blob' 
    }).pipe(
      catchError(this.handleError<Blob>('telechargerDocument'))
    );
  }

  /**
   * Gestion des erreurs HTTP
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      
      // Vous pouvez ajouter ici une notification à l'utilisateur
      // this.notificationService.showError(`Erreur lors de ${operation}`);
      
      // Retourner un résultat vide pour permettre à l'application de continuer
      return of(result as T);
    };
  }

  /**
   * Données fictives pour les tests (à supprimer en production)
   */
  getMockJustifications(): Justification[] {
    return [
      {
        id: 1,
        nom: 'Faye',
        prenom: 'Daouda',
        classe: 'L3CDSD',
        email: 'daouda.faye1@ism.edu.sn',
        matricule: 'Mat09462',
        motif: 'Absence',
        documentTexte: 'Je me suis cassé la jambe en m\'entrainant...........................',
        dateAbsence: '2024-01-15',
        dateSoumission: '2024-01-16',
        statut: 'en_attente'
      },
      {
        id: 2,
        nom: 'Diop',
        prenom: 'Aminata',
        classe: 'L2INFO',
        email: 'aminata.diop@ism.edu.sn',
        matricule: 'Mat08934',
        motif: 'Maladie',
        documentTexte: 'Certificat médical joint. Grippe sévère nécessitant repos.',
        dateAbsence: '2024-01-14',
        dateSoumission: '2024-01-15',
        statut: 'en_attente'
      },
      {
        id: 3,
        nom: 'Ba',
        prenom: 'Moussa',
        classe: 'M1MIAGE',
        email: 'moussa.ba@ism.edu.sn',
        matricule: 'Mat10123',
        motif: 'Rendez-vous médical',
        documentTexte: 'Rendez-vous chez le dentiste pour soins urgents.',
        dateAbsence: '2024-01-13',
        dateSoumission: '2024-01-14',
        statut: 'validee'
      }
    ];
  }
}