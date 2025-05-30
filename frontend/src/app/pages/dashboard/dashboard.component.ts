// dashboard.component.ts - Version corrigée avec navigation appropriée
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

  // Liste des absences avec IDs
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

  // Liste des justifications en attente avec IDs et données complètes
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
    return this.absences.slice(0, limit);
  }

  getRecentJustifications(limit: number): Justification[] {
    return this.justifications.slice(0, limit);
  }

  // CORRECTION: Méthode pour voir les détails d'une justification spécifique
  voirDetails(index: number): void {
    console.log('voirDetails appelé avec index:', index);
    
    if (index >= 0 && index < this.justifications.length) {
      const justification = this.justifications[index];
      console.log('Justification trouvée:', justification);
      
      if (justification && justification.id) {
        console.log('Navigation vers justification ID:', justification.id);
        this.router.navigate(['/justification-detail', justification.id]);
      } else {
        console.error('Justification ou ID manquant');
      }
    } else {
      console.error('Index invalide:', index);
    }
  }

  // CORRECTION: Nouvelle méthode pour "Voir tout" - Navigation vers la liste complète des justifications
  voirToutesJustifications(): void {
    console.log('Navigation vers toutes les justifications');
    this.router.navigate(['/justifications-list']);
  }

  // Actions pour les justifications - version rapide depuis le dashboard
  validerJustification(index: number): void {
    console.log('validerJustification appelé avec index:', index);
    
    if (index >= 0 && index < this.justifications.length) {
      this.justifications[index].statut = 'valide';
      console.log('Justification validée:', this.justifications[index]);
      
      // Afficher un message de succès
      alert('Justification validée avec succès !');
      
      // Optionnel: Appeler un service pour sauvegarder
      // this.justificationService.updateStatus(this.justifications[index].id, 'valide');
    } else {
      console.error('Index invalide pour validation:', index);
    }
  }

  invaliderJustification(index: number): void {
    console.log('invaliderJustification appelé avec index:', index);
    
    if (index >= 0 && index < this.justifications.length) {
      this.justifications[index].statut = 'invalide';
      console.log('Justification invalidée:', this.justifications[index]);
      
      // Afficher un message de succès
      alert('Justification rejetée !');
      
      // Optionnel: Appeler un service pour sauvegarder
      // this.justificationService.updateStatus(this.justifications[index].id, 'invalide');
    } else {
      console.error('Index invalide pour invalidation:', index);
    }
  }

  // Navigation vers les différentes pages
  navigateToAbsences(): void {
    console.log('Navigation vers absences');
    this.router.navigate(['/absences']);
  }

  navigateToEtudiants(): void {
    console.log('Navigation vers étudiants');
    this.router.navigate(['/etudiants']);
  }

  navigateToJustifications(): void {
    console.log('Navigation vers justifications');
    this.router.navigate(['/justifications-list']);
  }

  // Déconnexion
  deconnexion(): void {
    try {
      console.log('Déconnexion en cours...');
      // Supprimer le token du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Rediriger vers la page de login
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