import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { PointageModel } from '../../models/pointage.model';
import { IJustificationService } from '../IJustificationService';
import { JustificationModel } from '../../models/Justification.model';
@Injectable({
  providedIn: 'root' 
})
export class JustificationService implements IJustificationService{

  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/justifications';

  
    getAllJustifications(): Observable<any> {
      return this.httpClient.get<any>(this.apiUrl);
    }
   
    getById(absenceId: number): Observable<JustificationModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${absenceId}`);
    }
    getByAbsenceId(absenceId: number): Observable<JustificationModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${absenceId}`);
  }
  constructor(private httpClient: HttpClient) { }
  
 
}
