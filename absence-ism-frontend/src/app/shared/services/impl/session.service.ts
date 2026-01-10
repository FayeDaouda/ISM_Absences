import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISessionService } from '../ISessionService';
import { SessionModel } from '../../models/session.model';

@Injectable({
  providedIn: 'root' 
})
export class SessionService implements ISessionService{

  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/sessions';
                    
  
    getSessionsDuJour(): Observable<any>  {
        const date = this.getDateDuJour();
        return this.httpClient.get<any[]>(`${this.apiUrl}/duJour?date=${encodeURIComponent(date)}`);
      }
    
      getDateDuJour(): string {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      return `${day}/${month}/${year}`; 
    }
    
    getAllSessions(): Observable<any> {
      return this.httpClient.get<any>(this.apiUrl);
    }
    getById(Id: number): Observable<SessionModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${Id}`);
    }
  constructor(private httpClient: HttpClient) { }
  getListeAbsences(IdSession: number): Observable<SessionModel> {
    throw new Error('Method not implemented.');
  }
 
 
}