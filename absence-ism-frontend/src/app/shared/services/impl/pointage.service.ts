import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { IPointageService } from '../IPointageService';
import { PointageModel } from '../../models/pointage.model';
@Injectable({
  providedIn: 'root' 
})
export class PointageService implements IPointageService{

  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/absences';

  
    getAllPointages(): Observable<any> {
      return this.httpClient.get<any>(this.apiUrl);
    } 
    getAllPointagesDuneSessionDuJour(sessionId: number): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/${sessionId}`);
    }
    getAllAbsences(): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/absences`);
    }
    getAllPointagesByEtudiantId(IdEtudiant: String): Observable<PointageModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${IdEtudiant}`);
    } 
    getById(Id: number): Observable<PointageModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${Id}`);
    }

  constructor(private httpClient: HttpClient) { }
 
}
