import { Component, OnInit } from '@angular/core';
import { Absence } from '../../../shared/models/absence.model';
import { AbsenceService } from '../../../shared/services/absence.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  imports: [RouterModule],
})
export class AbsencesComponent implements OnInit {
  absences: Absence[] = [];
  paginatedAbsences: Absence[] = [];
  currentPage = 1;
  pageSize = 3;

  constructor(private absenceService: AbsenceService) {}

  ngOnInit(): void {
    this.absences = this.absenceService.getAbsences();
    this.updatePagination();
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAbsences = this.absences.slice(start, end);
  }

  totalPages(): number {
    return Math.ceil(this.absences.length / this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}
