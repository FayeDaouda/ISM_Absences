import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../../models/session.model';
import { ISessionService } from '../ISessionService';

@Injectable({
  providedIn: 'root',
})
export class SessionService implements ISessionService{
  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/web/sessions/duJour';

  constructor(private http: HttpClient) {}

  getSessionsDuJour(): Observable<any> {
    const date = this.getDateDuJour();
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getDateDuJour(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`; 
  }
  getAllSessions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getById(Id: number): Observable<Session> {
    return this.http.get<any>(`${this.apiUrl}/${Id}`);
  }
  
}
