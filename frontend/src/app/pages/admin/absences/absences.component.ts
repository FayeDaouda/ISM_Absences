import { Component, OnInit, computed, signal } from '@angular/core';
import { Absence, AbsenceService } from '../../../shared/services/impl/absence.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './absences.component.html',
})
export class AbsencesComponent implements OnInit {
  absences = signal<Absence[]>([]);
  currentPage = signal(1);
  pageSize = 3;
  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  constructor(private absenceService: AbsenceService) {}

  ngOnInit(): void {
    this.absenceService.getAbsences().subscribe((data) => {
      this.absences.set(data);
    });
  }

  paginatedAbsences = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.absences().slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.absences().length / this.pageSize);
  });

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  trackById = (index: number, item: Absence) => item.id;
}
