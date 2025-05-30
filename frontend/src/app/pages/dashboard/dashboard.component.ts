// dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
interface Absence {
  nom: string;
  prenom: string;
  classe: string;
  statut: 'present' | 'absent';
  motif?: string;
  heures?: any; // Propriété ajoutée qui était manquante
}

interface Justification {
  nom: string;
  prenom: string;
  classe: string;
  motif: string;
  dateAbsence: string;
  statut: 'en_attente' | 'valide' | 'invalide';
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  // Statistiques du tableau de bord
  stats = {
    presenceJour: 524,
    absenceJour: 268,
    justificationsJour: 124
  };

  // Liste des absences
  absences: Absence[] = [
    {
      nom: 'Sarr',
      prenom: 'Awa',
      classe: 'M2IT2510',
      statut: 'absent',
      heures: 90
    },
    {
      nom: 'Mbaye',
      prenom: 'Fatou',
      classe: 'M1RH2408',
      statut: 'absent',
      heures: 85
    },
    {
      nom: 'Dieng',
      prenom: 'Abdou',
      classe: 'L3GLOG',
      statut: 'absent',
      heures: 78
    }
  ];

  // Liste des justifications en attente
  justifications: Justification[] = [
    {
      nom: 'Gueye',
      prenom: 'Adja',
      classe: 'L3GLAS',
      motif: 'Maladie',
      dateAbsence: 'Samedi pour 3',
      statut: 'en_attente'
    },
    {
      nom: 'Sall',
      prenom: 'Aaly Mohamed',
      classe: 'M2IT2510',
      motif: 'En retard par faute de transport',
      dateAbsence: '',
      statut: 'en_attente'
    },
    {
      nom: 'Ba',
      prenom: 'Ana',
      classe: 'L2TREK',
      motif: 'Absence pour Rendez-vous à l\'hôpital',
      dateAbsence: '',
      statut: 'en_attente'
    }
  ];

  currentUser: User | null = null;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // S'abonner aux changements de l'utilisateur connecté
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

  // Méthodes pour récupérer les données limitées
  getRecentAbsences(limit: number): Absence[] {
    // Retourne les 'limit' premières absences du tableau
    return this.absences.slice(0, limit);
  }

  getRecentJustifications(limit: number): Justification[] {
    // Retourne les 'limit' premières justifications du tableau
    return this.justifications.slice(0, limit);
  }

  // Actions pour les justifications
  validerJustification(index: number): void {
    if (index >= 0 && index < this.justifications.length) {
      this.justifications[index].statut = 'valide';
      console.log('Justification validée:', this.justifications[index]);
    }
  }

  invaliderJustification(index: number): void {
    if (index >= 0 && index < this.justifications.length) {
      this.justifications[index].statut = 'invalide';
      console.log('Justification invalidée:', this.justifications[index]);
    }
  }

  voirDetails(index: number): void {
    if (index >= 0 && index < this.justifications.length) {
      console.log('Voir détails:', this.justifications[index]);
      // Ici vous pouvez ouvrir un modal ou naviguer vers une page de détails
    }
  }

  // Navigation vers les différentes pages
  navigateToAbsences(): void {
    this.router.navigate(['/absences']);
  }

  navigateToEtudiants(): void {
    this.router.navigate(['/etudiants']);
  }

  navigateToJustifications(): void {
    this.router.navigate(['/justifications']);
    // Si vous n'avez pas encore cette route, remplacez par :
    // console.log('Navigation vers justifications');
  }

  // Déconnexion
  deconnexion(): void {
    try {
      this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  }

  // Getters pour l'affichage des informations utilisateur
  get userDisplayName(): string {
    if (!this.currentUser) return 'Utilisateur';
    return `${this.currentUser.prenom || ''} ${this.currentUser.nom || ''}`.trim();
  }

  get userRole(): string {
    if (!this.currentUser) return 'Invité';
    return this.currentUser.role === 'admin' ? 'Administrateur' : 
           this.currentUser.role || 'Utilisateur';
  }

  get userInitials(): string {
    if (!this.currentUser) return 'UI';
    const prenom = this.currentUser.prenom || '';
    const nom = this.currentUser.nom || '';
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase() || 'UI';
  }
}