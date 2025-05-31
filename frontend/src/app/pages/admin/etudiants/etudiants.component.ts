import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavebarComponent } from '../../../shared/components/navebar/navebar.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-etudiants',
  imports: [CommonModule, SidebarComponent, NavebarComponent],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})
export class EtudiantsComponent {
etudiants = [
    { nom: 'Ndiaye', prenom: 'Abdoulaye', matricule: 'Mat23809', classe: 'L2MAIE' },
    { nom: 'Faye', prenom: 'Daouda', matricule: 'Mat09462', classe: 'L3CDSD' },
    { nom: 'Mbow', prenom: 'Fallou', matricule: 'Mat17234', classe: 'L2IAGE' },
    { nom: 'Diop', prenom: 'Pape Mbaye', matricule: 'Mat04972', classe: 'L3GLRS' },
    { nom: 'Camara', prenom: 'Fatou', matricule: 'Mat18273', classe: 'L1MAIE' },
    { nom: 'Fall', prenom: 'Abdoulaye', matricule: 'Mat29301', classe: 'M1CDSD' },
  ];

  currentPage = 1;
  pageSize = 3;

  get paginatedEtudiants() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.etudiants.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.etudiants.length / this.pageSize);
  }

  get totalPagesArray() {
    return Array(this.totalPages).fill(0);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
