// dashboard.component.ts - Version corrigée
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Subscription } from 'rxjs';

interface Absence {
  id?: number;
  nom: string;
  prenom: string;
  classe: string;
  statut: 'present' | 'absent';
  motif?: string;
  heures?: any;
}

interface Justification {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  motif: string;
  dateAbsence: string;
  statut: 'en_attente' | 'valide' | 'invalide';
  email?: string;
  matricule?: string;
  document?: string;
  dateJustification?: string;
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
      id: 1,
      nom: 'Sarr',
      prenom: 'Awa',
      classe: 'M2IT2510',
      statut: 'absent',
      heures: 90
    },
    {
      id: 2,
      nom: 'Mbaye',
      prenom: 'Fatou',
      classe: 'M1RH2408',
      statut: 'absent',
      heures: 85
    },
    {
      id: 3,
      nom: 'Dieng',
      prenom: 'Abdou',
      classe: 'L3GLOG',
      statut: 'absent',
      heures: 78
    }
  ];

  // Liste des justifications
  justifications: Justification[] = [
    {
      id: 1,
      nom: 'Gueye',
      prenom: 'Adja',
      classe: 'L3GLAS',
      motif: 'Maladie',
      dateAbsence: 'Samedi pour 3',
      statut: 'en_attente',
      email: 'adja.gueye@ism.edu.sn',
      matricule: 'Mat09460',
      document: 'Je suis tombé malade avec une forte fièvre...',
      dateJustification: '2024-01-15'
    },
    {
      id: 2,
      nom: 'Sall',
      prenom: 'Aaly Mohamed',
      classe: 'M2IT2510',
      motif: 'En retard par faute de transport',
      dateAbsence: 'Lundi 14 Janvier',
      statut: 'en_attente',
      email: 'aaly.sall@ism.edu.sn',
      matricule: 'Mat09461',
      document: 'Le transport en commun était en panne...',
      dateJustification: '2024-01-15'
    },
    {
      id: 3,
      nom: 'Ba',
      prenom: 'Ana',
      classe: 'L2TREK',
      motif: 'Absence pour Rendez-vous à l\'hôpital',
      dateAbsence: 'Vendredi 12 Janvier',
      statut: 'en_attente',
      email: 'ana.ba@ism.edu.sn',
      matricule: 'Mat09462',
      document: 'J\'avais un rendez-vous médical urgent...',
      dateJustification: '2024-01-13'
    }
  ];

  currentUser: User | null = null;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

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

  // Méthodes pour récupérer les données limitées
  getRecentAbsences(limit: number): Absence[] {
    return this.absences.slice(0, limit);
  }

  getRecentJustifications(limit: number): Justification[] {
    return this.justifications.filter(j => j.statut === 'en_attente').slice(0, limit);
  }

  // CORRECTION: Méthode pour voir les détails d'une justification
  voirDetails(index: number): void {
    console.log('voirDetails appelé avec index:', index);
    
    const justificationsEnAttente = this.justifications.filter(j => j.statut === 'en_attente');
    
    if (index >= 0 && index < justificationsEnAttente.length) {
      const justification = justificationsEnAttente[index];
      console.log('Justification trouvée:', justification);
      
      if (justification && justification.id) {
        console.log('Navigation vers justification ID:', justification.id);
        // CORRECTION: Utiliser la bonne route
        this.router.navigate(['/justification-detail', justification.id])
          .then(success => {
            if (success) {
              console.log('Navigation réussie');
            } else {
              console.error('Échec de la navigation');
            }
          })
          .catch(error => {
            console.error('Erreur de navigation:', error);
          });
      } else {
        console.error('Justification ou ID manquant');
      }
    } else {
      console.error('Index invalide:', index, 'Justifications en attente:', justificationsEnAttente.length);
    }
  }

  // CORRECTION: Actions pour les justifications
  validerJustification(index: number): void {
    console.log('validerJustification appelé avec index:', index);
    
    const justificationsEnAttente = this.justifications.filter(j => j.statut === 'en_attente');
    
    if (index >= 0 && index < justificationsEnAttente.length) {
      const justificationToValidate = justificationsEnAttente[index];
      const realIndex = this.justifications.findIndex(j => j.id === justificationToValidate.id);
      
      if (realIndex !== -1) {
        this.justifications[realIndex].statut = 'valide';
        console.log('Justification validée:', this.justifications[realIndex]);
        
        // Mise à jour des statistiques
        this.updateStats();
        
        alert(`Justification de ${justificationToValidate.prenom} ${justificationToValidate.nom} validée avec succès !`);
      }
    } else {
      console.error('Index invalide pour validation:', index);
    }
  }

  invaliderJustification(index: number): void {
    console.log('invaliderJustification appelé avec index:', index);
    
    const justificationsEnAttente = this.justifications.filter(j => j.statut === 'en_attente');
    
    if (index >= 0 && index < justificationsEnAttente.length) {
      const justificationToInvalidate = justificationsEnAttente[index];
      const realIndex = this.justifications.findIndex(j => j.id === justificationToInvalidate.id);
      
      if (realIndex !== -1) {
        this.justifications[realIndex].statut = 'invalide';
        console.log('Justification invalidée:', this.justifications[realIndex]);
        
        // Mise à jour des statistiques
        this.updateStats();
        
        alert(`Justification de ${justificationToInvalidate.prenom} ${justificationToInvalidate.nom} rejetée !`);
      }
    } else {
      console.error('Index invalide pour invalidation:', index);
    }
  }

  // Méthode pour mettre à jour les statistiques
  private updateStats(): void {
    const justificationsEnAttente = this.justifications.filter(j => j.statut === 'en_attente').length;
    this.stats.justificationsJour = justificationsEnAttente;
  }

  // Navigation vers les différentes pages
  navigateToJustifications(): void {
    console.log('Navigation vers toutes les justifications');
    this.router.navigate(['/justifications-list'])
      .then(success => {
        if (success) {
          console.log('Navigation vers justifications réussie');
        } else {
          console.error('Échec de la navigation vers justifications');
        }
      })
      .catch(error => {
        console.error('Erreur de navigation vers justifications:', error);
      });
  }

  navigateToAbsences(): void {
    console.log('Navigation vers absences');
    this.router.navigate(['/absences']);
  }

  navigateToEtudiants(): void {
    console.log('Navigation vers étudiants');
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

  // Méthodes utilitaires pour l'affichage
  getStatusBadgeClass(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'badge-warning';
      case 'valide': return 'badge-success';
      case 'invalide': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }

  getStatusText(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'valide': return 'Validé';
      case 'invalide': return 'Rejeté';
      default: return statut;
    }
  }
}