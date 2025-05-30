// etudiants.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

interface Etudiant {
  nom: string;
  prenom: string;
  matricule: string;
  classe: string;
}

@Component({
  standalone: true,
  selector: 'app-etudiants',
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantsComponent implements OnInit, OnDestroy {
navigateToEtudiants() {
throw new Error('Method not implemented.');
}
  
  // Liste des étudiants
  etudiants: Etudiant[] = [
    {
      nom: 'Ndiaye',
      prenom: 'Abdoulaye',
      matricule: 'Mat23809',
      classe: 'L2MAIE'
    },
    {
      nom: 'Faye',
      prenom: 'Daouda',
      matricule: 'Mat09462',
      classe: 'L3CDSD'
    },
    {
      nom: 'Mbow',
      prenom: 'Fallou',
      matricule: 'Mat17234',
      classe: 'L2IAGE'
    },
    {
      nom: 'Diop',
      prenom: 'Pape Mbaye',
      matricule: 'Mat04972',
      classe: 'L3GLRS'
    },
    {
      nom: 'Sarr',
      prenom: 'Awa',
      matricule: 'Mat15678',
      classe: 'M2IT2510'
    },
    {
      nom: 'Mbaye',
      prenom: 'Fatou',
      matricule: 'Mat23456',
      classe: 'M1RH2408'
    },
    {
      nom: 'Dieng',
      prenom: 'Abdou',
      matricule: 'Mat78901',
      classe: 'L3GLOG'
    },
    {
      nom: 'Ba',
      prenom: 'Ana',
      matricule: 'Mat34567',
      classe: 'L2TREK'
    }
  ];

  // Liste filtrée pour la recherche
  etudiantsFiltres: Etudiant[] = [];

  // Terme de recherche
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  currentUser: User | null = null;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.etudiantsFiltres = [...this.etudiants];
    this.calculateTotalPages();
  }

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

  // Méthode de recherche
  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.etudiantsFiltres = [...this.etudiants];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.etudiantsFiltres = this.etudiants.filter(etudiant =>
        etudiant.nom.toLowerCase().includes(term) ||
        etudiant.prenom.toLowerCase().includes(term) ||
        etudiant.matricule.toLowerCase().includes(term) ||
        etudiant.classe.toLowerCase().includes(term)
      );
    }
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  // Calcul du nombre total de pages
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.etudiantsFiltres.length / this.itemsPerPage);
  }

  // Obtenir les étudiants pour la page courante
  getCurrentPageEtudiants(): Etudiant[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.etudiantsFiltres.slice(startIndex, endIndex);
  }

  // Navigation de pagination
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Navigation vers les autres pages
  navigateToAccueil(): void {
    this.router.navigate(['/dashboard']);
  }

  navigateToAbsences(): void {
    this.router.navigate(['/absences']);
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