import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Pour ngClass, ngFor, ngIf
import { FormsModule } from '@angular/forms';   // Pour ngModel

interface Absence {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  date: string;
  etat: 'Justifié(e)' | 'En attente' | 'Non justifié(e)';
  motif?: string;
  dateAbsence?: string;
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
logout() {
throw new Error('Method not implemented.');
}
navigateToAbsences() {
throw new Error('Method not implemented.');
}

  // Infos utilisateur
  userDisplayName = 'Lucien da Souza';
  userRole = 'Administrateur';
  userInitials = 'LS';

  // Recherche et pagination
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
      dateAbsence: '25/03/2025'
    },
    {
      id: 2,
      nom: 'Faye',
      prenom: 'Daouda',
      classe: 'L2 GESTION',
      date: '22/03/2025',
      etat: 'En attente',
      motif: 'Rendez-vous médical',
      dateAbsence: '22/03/2025'
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
      dateAbsence: '02/02/2025'
    },
    {
      id: 5,
      nom: 'Sarr',
      prenom: 'Aminata',
      classe: 'L3 MARKETING',
      date: '15/04/2025',
      etat: 'Justifié(e)',
      motif: 'Certificat médical',
      dateAbsence: '15/04/2025'
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
    this.router.navigate(['/dashboard']);
  }

  navigateToEtudiants(): void {
    this.router.navigate(['/etudiants']);
  }

  deconnexion(): void {
    localStorage.removeItem('token');
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

  voirDetails(absence: Absence): void {
    this.router.navigate(['/absences/details', absence.id]);
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
