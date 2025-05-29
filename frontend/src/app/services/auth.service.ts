// auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: 'admin' | 'professeur' | 'etudiant';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // Utilisateur mock pour la démo
  private mockUser: User = {
    id: '1',
    email: 'admin@ism.sn',
    nom: 'da Souza',
    prenom: 'Lucien',
    role: 'admin'
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        // En production, vous devriez valider le token avec votre backend
        this.currentUserSubject.next(this.mockUser);
        this.isLoggedInSubject.next(true);
      }
    }
  }

  login(email: string, password: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'admin@ism.sn' && password === 'admin') {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', 'fake-jwt-token');
          localStorage.setItem('user', JSON.stringify(this.mockUser));
        }

        this.currentUserSubject.next(this.mockUser);
        this.isLoggedInSubject.next(true);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000);
  });
}



  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
