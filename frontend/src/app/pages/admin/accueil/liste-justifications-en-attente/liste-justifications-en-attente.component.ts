import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbsenceService } from '../../../../shared/services/absence.service';
import { Absence } from '../../../../shared/models/absence.model';

@Component({
  selector: 'app-liste-justifications-en-attente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-justifications-en-attente.component.html',
  styleUrl: './liste-justifications-en-attente.component.css'
})
export class ListeJustificationsEnAttenteComponent {
  justifications: Absence[] = [];
  pageSize = 2;
  currentPage = 1;

  constructor(private absenceService: AbsenceService) {}

  ngOnInit() {
    this.absenceService.getJustificationsEnAttente().subscribe(data => {
      this.justifications = data;
    });
  }

  get paginatedJustifications() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.justifications.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.justifications.length / this.pageSize);
  }

  get pagesArray() {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
