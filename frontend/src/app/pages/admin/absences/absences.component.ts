import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AbsenceService } from '../../../shared/services/absence.service';
import { Absence } from '../../../shared/models/absence.model';
import { NavebarComponent } from '../../../shared/components/navebar/navebar.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [CommonModule, RouterModule, NavebarComponent, SidebarComponent],
  templateUrl: './absences.component.html',
})
export class AbsencesComponent {
  absences: Absence[] = [];
  pageSize = 3;
  currentPage = 1;

  constructor(private absenceService: AbsenceService) {
    this.absences = this.absenceService.getAll();
  }

  get paginatedAbsences() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.absences.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.absences.length / this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getEtatLabel(etat: Absence['etat']) {
    switch (etat) {
      case 'justifiee': return 'Justifiée';
      case 'en_attente': return 'En attente';
      case 'non_justifiee': return 'Non justifiée';
    }
  }

  getEtatColor(etat: Absence['etat']) {
    switch (etat) {
      case 'justifiee': return 'text-[#2FE341]';
      case 'en_attente': return 'text-[#727070]';
      case 'non_justifiee': return 'text-[#FF0000]';
    }
  }
}
