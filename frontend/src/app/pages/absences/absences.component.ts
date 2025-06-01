// absences.component.ts - Version corrigée
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Absence {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  date: string;
  etat: 'Justifié(e)' | 'En attente' | 'Non justifié(e)';
  motif?: string;
  dateAbsence?: string;
  justificationId?: number;
}

interface AbsenceUpdateData {
  matricule: string;
  dateAbsence?: string;
  nouveauStatut: 'Justifiée' | 'Rejetée' | 'Non justifiée';
  justificationId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = 'http://votre-api-url/api';

  constructor(private http: HttpClient) {}

  updateAbsenceStatus(data: AbsenceUpdateData): Observable<any> {
    return this.http.put(`${this.apiUrl}/absences/update-status`, data);
  }

  getAbsenceByMatriculeAndDate(matricule: string, dateAbsence: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/absences/search`, {
      params: { matricule, dateAbsence }
    });
  }

  getAbsencesByMatricule(matricule: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/absences/etudiant/${matricule}`);
  }
}

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
export class AbsencesComponent implements OnInit {

  userDisplayName = 'Lucien da Souza';
  userRole = 'Administrateur';
  userInitials = 'LS';

  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  absences: Absence[] = [
    {
      id: 1,
      nom: 'Ndiaye',
      prenom: 'Abdoulaye',
      classe: 'L3 INFO',
      date: '25/03/2025',
      etat: 'Justifié(e)',
      motif: 'Maladie',
      dateAbsence: '25/03/2025',
      justificationId: 1
    },
    {
      id: 2,
      nom: 'Faye',
      prenom: 'Daouda',
      classe: 'L2 GESTION',
      date: '22/03/2025',
      etat: 'En attente',
      motif: 'Rendez-vous médical',
      dateAbsence: '22/03/2025',
      justificationId: 2
    },
    {
      id: 3,
      nom: 'Mbow',
      prenom: 'Fallou',
      classe: 'L1 COMMERCE',
      date: '18/04/2025',
      etat: 'Non justifié(e)',
      dateAbsence: '18/04/2025'
    },
    {
      id: 4,
      nom: 'Diop',
      prenom: 'Pape Mbaye',
      classe: 'M1 FINANCE',
      date: '02/02/2025',
      etat: 'En attente',
      motif: 'Problème familial',
      dateAbsence: '02/02/2025',
      justificationId: 3
    },
    {
      id: 5,
      nom: 'Sarr',
      prenom: 'Aminata',
      classe: 'L3 MARKETING',
      date: '15/04/2025',
      etat: 'Justifié(e)',
      motif: 'Certificat médical',
      dateAbsence: '15/04/2025',
      justificationId: 1
    },
    {
      id: 6,
      nom: 'Ba',
      prenom: 'Moussa',
      classe: 'L2 INFO',
      date: '10/04/2025',
      etat: 'Non justifié(e)',
      dateAbsence: '10/04/2025'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.calculatePagination();
  }

  // Navigation
  navigateToHome(): void {
    console.log('Navigation vers dashboard');
    this.router.navigate(['/dashboard']);
  }

  navigateToAbsences(): void {
    console.log('Déjà sur la page absences');
  }

  navigateToEtudiants(): void {
    console.log('Navigation vers étudiants');
    this.router.navigate(['/etudiants']);
  }

  deconnexion(): void {
    console.log('Déconnexion en cours...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Filtrage des absences
  get filteredAbsences(): Absence[] {
    const search = this.searchTerm.trim().toLowerCase();

    let result = this.absences;
    if (search) {
      result = this.absences.filter(abs =>
        abs.nom.toLowerCase().includes(search) ||
        abs.prenom.toLowerCase().includes(search) ||
        abs.classe.toLowerCase().includes(search) ||
        abs.etat.toLowerCase().includes(search)
      );
    }

    this.totalPages = Math.max(1, Math.ceil(result.length / this.itemsPerPage));
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return result.slice(startIndex, startIndex + this.itemsPerPage);
  }

  calculatePagination(): void {
    const search = this.searchTerm.trim().toLowerCase();
    const list = search ? this.absences.filter(abs =>
      abs.nom.toLowerCase().includes(search) ||
      abs.prenom.toLowerCase().includes(search) ||
      abs.classe.toLowerCase().includes(search) ||
      abs.etat.toLowerCase().includes(search)
    ) : this.absences;

    this.totalPages = Math.max(1, Math.ceil(list.length / this.itemsPerPage));
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // CORRECTION: Méthode pour voir les détails d'une absence
  voirDetails(absence: Absence): void {
    console.log('Voir détails absence:', absence);
    
    // CORRECTION: Si l'absence a une justification associée, naviguer vers celle-ci
    if (absence.justificationId) {
      console.log('Navigation vers justification ID:', absence.justificationId);
      this.router.navigate(['/justification-detail', absence.justificationId])
        .then(success => {
          if (success) {
            console.log('Navigation réussie vers justification');
          } else {
            console.error('Échec de la navigation vers justification');
            // Fallback: afficher les détails disponibles
            this.showAbsenceDetails(absence);
          }
        })
        .catch(error => {
          console.error('Erreur de navigation vers justification:', error);
          // Fallback: afficher les détails disponibles
          this.showAbsenceDetails(absence);
        });
    }
    // Si pas de justification, afficher les détails de l'absence
    else {
      console.log('Aucune justification disponible pour cette absence');
      this.showAbsenceDetails(absence);
    }
  }

  // Méthode pour afficher les détails d'une absence sans justification
  showAbsenceDetails(absence: Absence): void {
    const message = `Détails de l'absence:

Nom: ${absence.nom}
Prénom: ${absence.prenom}
Classe: ${absence.classe}
Date: ${absence.date}
État: ${absence.etat}
Motif: ${absence.motif || 'Non spécifié'}

${absence.etat === 'Non justifié(e)' ? 'Cette absence n\'a pas été justifiée.' : ''}
${absence.etat === 'En attente' ? 'Une justification a été soumise et est en attente de validation.' : ''}`;

    alert(message);
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.calculatePagination();
  }

  trackByAbsenceId(index: number, absence: Absence): number {
    return absence.id;
  }

  trackByPageNumber(index: number, page: number): number {
    return page;
  }
}