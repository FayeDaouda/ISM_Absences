import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavebarComponent } from '../../../shared/components/navebar/navebar.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Etudiant, EtudiantService } from '../../../shared/services/etudiant.service';

@Component({
  selector: 'app-etudiants',
  imports: [CommonModule, SidebarComponent, NavebarComponent],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})
export class EtudiantsComponent {
  etudiants: Etudiant[] = [];

  currentPage = 1;
  pageSize = 3;

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.etudiantService.getAllEtudiants().subscribe((data) => {
      this.etudiants = data;
    });
  }

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
