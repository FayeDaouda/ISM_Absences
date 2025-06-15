import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { PointageService } from '../../../shared/services/impl/pointage.service';
import { Absence } from '../../../shared/models/absence.model';

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

  constructor(
    private route: ActivatedRoute,
    private pointageService: PointageService
  ) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('id');
    if (sessionId) {
      this.pointageService.getAllPointagesDuneSessionDuJour(sessionId).subscribe({
        next: (data) => {
          this.absences.set(data);
        },
        error: (err) => {
          console.error('Erreur lors du chargement des absences :', err);
        }
      });
    }
  }

  paginatedAbsences = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.absences().slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.absences().length / this.pageSize);
  });

  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  trackById = (index: number, item: Absence) => item.id;
}
