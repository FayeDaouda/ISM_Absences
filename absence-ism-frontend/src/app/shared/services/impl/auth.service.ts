import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, User, Role } from '../../models/user.model';
import { IAuthService } from '../IAuthService';

@Injectable({ providedIn: 'root' })
export class AuthService implements IAuthService {
  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/utilisateurs'; 
    currentUserSignal = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  Login(username: string, password: string): Observable<LoginResponse> {
    return new Observable(observer => {
      this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
        .subscribe(response => {
          if (response.success) {
            this.currentUserSignal.set(response.data);
            // Optionnel : stocker le token JWT dans le localStorage
            // localStorage.setItem('token', response.token); hei adja coura ndour il faut remplir sa apres hihi
          }
          observer.next(response);
          observer.complete();
        }, err => {
          observer.error(err);
        });
    });
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSignal();
  }

  Logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('token');
  }

  isAdmin(): boolean {
    return this.currentUserSignal()?.role === 'ADMIN';
  }

  hasRole(role: Role): boolean {
    return this.currentUserSignal()?.role === role;
  }

  getAdminId(): number | null {
    return this.currentUserSignal()?.id ?? null;
  }
}
