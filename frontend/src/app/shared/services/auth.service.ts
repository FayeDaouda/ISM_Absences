import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Base de données simulée des utilisateurs
  private users: User[] = [
    {
      id: 1,
      email: 'admin@ism.sn',
      nom: 'Admin',
      prenom: 'System',
      role: 'admin'
    },
    {
      id: 2,
      email: 'professeur@ism.edu.sn',
      nom: 'Diallo',
      prenom: 'Amadou',
      role: 'professeur'
    },
    {
      id: 3,
      email: 'etudiant@ism.edu.sn',
      nom: 'Ndiaye',
      prenom: 'Fatou',
      role: 'etudiant'
    }
  ];

  // Mots de passe simulés (en production, ils seraient hashés)
  private passwords: { [email: string]: string } = {
    'admin@ism.sn': 'admin',
  };

  constructor() {
    console.log('🔧 AuthService initialisé (mode local)');
    this.loadCurrentUser();
  }

  login(email: string, password: string): Observable<boolean> {
    console.log('🔐 Tentative de connexion pour:', email);

    return of(null).pipe(
      delay(800), // Simulation du délai réseau
      map(() => {
        const user = this.users.find(u => u.email === email);
        const validPassword = this.passwords[email] === password;

        if (user && validPassword) {
          console.log('✅ Connexion réussie');
          
          // Génération d'un token simulé
          const token = this.generateFakeToken(user);
          localStorage.setItem(this.tokenKey, token);
          
          this.currentUserSubject.next(user);
          return true;
        } else {
          console.log('❌ Échec de la connexion');
          throw new Error('Email ou mot de passe invalide');
        }
      })
    );
  }

  logout(): Observable<any> {
    console.log('🚪 Déconnexion');
    this.clearAuth();
    return of(null).pipe(delay(200));
  }

  private clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Vérification basique du token (en production, vérifier l'expiration)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): Observable<User | null> {
    if (this.currentUserSubject.value) {
      return of(this.currentUserSubject.value);
    }

    const token = this.getToken();
    if (token && this.isAuthenticated()) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const user = this.users.find(u => u.id === payload.userId);
        if (user) {
          this.currentUserSubject.next(user);
          return of(user);
        }
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
      }
    }

    this.clearAuth();
    return of(null);
  }

  private loadCurrentUser(): void {
    this.getCurrentUser().subscribe();
  }

  validateToken(): Observable<boolean> {
    return of(this.isAuthenticated()).pipe(delay(200));
  }

  // Utilitaires
  private generateFakeToken(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Date.now() / 1000,
      exp: (Date.now() / 1000) + (24 * 60 * 60) // 24h d'expiration
    }));
    const signature = btoa('fake-signature');
    
    return `${header}.${payload}.${signature}`;
  }

  // Méthodes additionnelles pour la gestion des utilisateurs
  getAllUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(300));
  }

  getUserByEmail(email: string): Observable<User | null> {
    const user = this.users.find(u => u.email === email);
    return of(user || null).pipe(delay(200));
  }

  updateUser(user: User): Observable<boolean> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = { ...user };
      if (this.currentUserSubject.value?.id === user.id) {
        this.currentUserSubject.next(user);
      }
      return of(true).pipe(delay(400));
    }
    return of(false).pipe(delay(400));
  }
}