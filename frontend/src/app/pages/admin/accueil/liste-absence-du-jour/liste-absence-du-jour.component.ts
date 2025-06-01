import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbsenceService } from '../../../../shared/services/absence.service';
import { Absence } from '../../../../shared/models/absence.model';

@Component({
  selector: 'app-liste-absence-du-jour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-absence-du-jour.component.html'
})
export class ListeAbsenceDuJourComponent {
  absences: Absence[] = [];
  absencesParPage: number = 3;
  currentPage: number = 1;
  totalPages: number = 0;
  pagesArray: number[] = [];

  constructor(private service: AbsenceService) {}

  ngOnInit() {
    this.service.getAbsencesDuJour().subscribe(data => {
      this.absences = data;
      this.totalPages = Math.ceil(this.absences.length / this.absencesParPage);
      this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
  }

  get absencesPagines(): Absence[] {
    const start = (this.currentPage - 1) * this.absencesParPage;
    return this.absences.slice(start, start + this.absencesParPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getJustificationLabel(abs: Absence) {
    return abs.justifie ? 'Justifiée' : 'Non justifiée';
  }
}
