import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/web/sessions/duJour';

  constructor(private http: HttpClient) {}

  getSessionsDuJour(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}`);
  }
}
