import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import utilisateurs from '../../../../db.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  utilisateurConnecte: any = null;

  login(login: string, motDePasse: string): boolean {
    const utilisateur = utilisateurs.utilisateurs.find(
      (u: { login: string; motDePasse: string; }) => u.login === login && u.motDePasse === motDePasse
    );

    if (utilisateur && utilisateur.role === 'ADMIN') {
      this.utilisateurConnecte = utilisateur;
      return true;
    }

    return false;
  }

  logout() {
    this.utilisateurConnecte = null;
  }

  getUtilisateurConnecte() {
    return this.utilisateurConnecte;
  }

  estConnecte(): boolean {
    return !!this.utilisateurConnecte;
  }

  estAdmin(): boolean {
    return this.utilisateurConnecte?.role === 'ADMIN';
  }
}
