// filieres.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Subscription } from 'rxjs';

interface Filiere {
  id: string;
  nom: string;
  description: string;
  nombreEtudiants: number;
  nombreModules: number;
  couleur: string;
}

@Component({
  standalone: true,
  selector: 'app-filieres',
  imports: [CommonModule],
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.css']
})
export class FilieresComponent implements OnInit, OnDestroy {

  // Liste des filières
  filieres: Filiere[] = [
    {
      id: 'informatique',
      nom: 'Informatique',
      description: 'Formation en développement et systèmes informatiques',
      nombreEtudiants: 145,
      nombreModules: 8,
      couleur: 'bg-blue-500'
    },
    {
      id: 'gestion',
      nom: 'Gestion',
      description: 'Management et administration des entreprises',
      nombreEtudiants: 98,
      nombreModules: 6,
      couleur: 'bg-green-500'
    },
    {
      id: 'marketing',
      nom: 'Marketing',
      description: 'Stratégies commerciales et communication',
      nombreEtudiants: 76,
      nombreModules: 7,
      couleur: 'bg-purple-500'
    },
    {
      id: 'ressources-humaines',
      nom: 'Ressources Humaines',
      description: 'Gestion du personnel et développement RH',
      nombreEtudiants: 54,
      nombreModules: 5,
      couleur: 'bg-pink-500'
    },
    {
      id: 'logistique',
      nom: 'Logistique',
      description: 'Transport et gestion de la chaîne logistique',
      nombreEtudiants: 67,
      nombreModules: 6,
      couleur: 'bg-yellow-500'
    },
    {
      id: 'maintenance',
      nom: 'Maintenance Industrielle',
      description: 'Maintenance et réparation des équipements',
      nombreEtudiants: 43,
      nombreModules: 7,
      couleur: 'bg-red-500'
    }
  ];

  currentUser: User | null = null;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser$.subscribe({
        next: (user) => {
          this.currentUser = user;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Navigation vers les modules d'une filière
  navigateToModules(filiere: Filiere): void {
    console.log('Navigation vers modules de la filière:', filiere.nom);
    this.router.navigate(['/modules', filiere.id], {
      state: { filiere: filiere }
    });
  }

  // Navigation vers les autres pages
  navigateToAccueil(): void {
    this.router.navigate(['/dashboard']);
  }

  navigateToAbsences(): void {
    this.router.navigate(['/absences']);
  }

  navigateToEtudiants(): void {
    this.router.navigate(['/etudiants']);
  }

  // Déconnexion
  deconnexion(): void {
    try {
      console.log('Déconnexion en cours...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  }

  // Getters pour l'affichage des informations utilisateur
  get userDisplayName(): string {
    if (!this.currentUser) return 'Lucien da Souza';
    return `${this.currentUser.prenom || ''} ${this.currentUser.nom || ''}`.trim();
  }

  get userRole(): string {
    if (!this.currentUser) return 'Administrateur';
    return this.currentUser.role === 'admin' ? 'Administrateur' : 
           this.currentUser.role || 'Utilisateur';
  }

  get userInitials(): string {
    if (!this.currentUser) return 'LS';
    const prenom = this.currentUser.prenom || '';
    const nom = this.currentUser.nom || '';
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase() || 'UI';
  }
}