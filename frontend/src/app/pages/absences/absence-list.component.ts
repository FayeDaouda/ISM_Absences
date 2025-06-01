import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AbsenceService, AbsenceAllResponse, PageResponse } from '../../shared/services/absence.service';

@Component({
  selector: 'app-absence-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './absence-list.component.html',
  styleUrls: ['./absence-list.component.css']
})
export class AbsenceListComponent implements OnInit {
  absences: AbsenceAllResponse[] = [];
  loading = false;
  error: string | null = null;
  
  // Recherche et filtres
  searchTerm = '';
  statusFilter = '';
  dateFilter = '';
  
  // Pagination
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;

  // Infos utilisateur
  userDisplayName = 'Administrateur';
  userRole = 'Système de gestion';

  constructor(
    private absenceService: AbsenceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAbsences();
  }

  loadAbsences() {
    this.loading = true;
    this.error = null;
    
    // Si on a des filtres actifs, utiliser la méthode de filtrage
    if (this.searchTerm || this.statusFilter || this.dateFilter) {
      this.applyFilters();
      return;
    }
    
    this.absenceService.getAllAbsences(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: PageResponse<AbsenceAllResponse>) => {
          this.absences = response.content;
          this.totalElements = response.totalElements;
          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement des absences';
          this.loading = false;
          console.error('Erreur:', error);
        }
      });
  }

  // Appliquer les filtres
  applyFilters() {
    this.loading = true;
    this.error = null;

    if (this.searchTerm) {
      // Recherche par terme
      this.absenceService.searchAbsences(this.searchTerm, this.currentPage, this.pageSize)
        .subscribe({
          next: (response: PageResponse<AbsenceAllResponse>) => {
            this.absences = response.content;
            this.totalElements = response.totalElements;
            this.totalPages = response.totalPages;
            this.loading = false;
          },
          error: (error: any) => {
            this.error = 'Erreur lors de la recherche';
            this.loading = false;
            console.error('Erreur:', error);
          }
        });
    } else {
      // Filtrage par statut et/ou date
      this.absenceService.filterAbsences(this.statusFilter, this.dateFilter, this.currentPage, this.pageSize)
        .subscribe({
          next: (response: PageResponse<AbsenceAllResponse>) => {
            this.absences = response.content;
            this.totalElements = response.totalElements;
            this.totalPages = response.totalPages;
            this.loading = false;
          },
          error: (error) => {
            this.error = 'Erreur lors du filtrage';
            this.loading = false;
            console.error('Erreur:', error);
          }
        });
    }
  }

  // Gestion de la recherche
  onSearchChange() {
    this.currentPage = 0;
    this.loadAbsences();
  }

  // Gestion des filtres
  onFilterChange() {
    this.currentPage = 0;
    this.loadAbsences();
  }

  // Effacer les filtres
  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.dateFilter = '';
    this.currentPage = 0;
    this.loadAbsences();
  }

  // Actualiser les données
  refreshData() {
    this.currentPage = 0;
    this.loadAbsences();
  }

  // Navigation pagination
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadAbsences();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadAbsences();
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadAbsences();
    }
  }

  // Actions sur les absences
  viewDetails(absence: AbsenceAllResponse) {
    console.log('Voir détails:', absence);
    // Naviguer vers la page de détails
    this.router.navigate(['/absence-detail'], { 
      queryParams: { 
        sessionId: absence.sessionId,
        etudiant: `${absence.nonEtudiant} ${absence.prenomEtudiant}` 
      } 
    });
  }

  editAbsence(absence: AbsenceAllResponse) {
    console.log('Modifier absence:', absence);
    // Naviguer vers la page d'édition
    this.router.navigate(['/absence-edit'], { 
      queryParams: { sessionId: absence.sessionId } 
    });
  }

  // Méthodes utilitaires
  getStatusClass(type: string): string {
    switch (type) {
      case 'PRESENT': return 'status-present';
      case 'ABSENCE': return 'status-absent';
      case 'RETARD': return 'status-retard';
      default: return '';
    }
  }

  getStatusText(type: string): string {
    switch (type) {
      case 'PRESENT': return 'Présent';
      case 'ABSENCE': return 'Absent';
      case 'RETARD': return 'En retard';
      default: return type || 'Non défini';
    }
  }

  getStudentInitials(nom: string, prenom: string): string {
    const nomInitial = nom ? nom.charAt(0).toUpperCase() : '';
    const prenomInitial = prenom ? prenom.charAt(0).toUpperCase() : '';
    return nomInitial + prenomInitial;
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  }

  formatTime(timeString: string): string {
    if (!timeString) return 'N/A';
    
    try {
      const time = new Date(`1970-01-01T${timeString}`);
      return time.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return timeString;
    }
  }

  // TrackBy functions pour optimiser ngFor
  trackByAbsence(index: number, absence: AbsenceAllResponse): string {
    return absence.sessionId + '_' + absence.nonEtudiant + '_' + absence.prenomEtudiant;
  }
}