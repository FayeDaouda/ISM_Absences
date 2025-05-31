import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private currentUser: User | null = null;

  constructor(private router: Router) {}

  login(user: User): boolean {
    // Simulation
    if (user.email === 'admin@ism.edu.sn' && user.password === 'admin123') {
      this.loggedIn = true;
      this.currentUser = {
        email: user.email,
        password: '',
        name: 'Lucien da Souza',
        role: 'Administrateur'
      };
      return true;
    }

    return false;
  }

  logout(): void {
    this.loggedIn = false;
    this.currentUser = null;
    this.router.navigate(['/security/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
