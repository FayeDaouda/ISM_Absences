import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { EtudiantService } from '../../../shared/services/impl/etudiant.service';
import { EtudiantModel } from '../../../shared/models/etudiant.model';

@Component({
  selector: 'app-etudiants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})
export class EtudiantsComponent implements OnInit {
  private etudiantsService: EtudiantService = inject(EtudiantService);
  etudiantsAll: EtudiantModel[] = [];
  etudiantsPerPage: EtudiantModel[] = [];

  currentPage = 0;
  pageSize = 5
  pages: number[] = [];

  ngOnInit(): void {
    this.etudiantsService.getAllEtudiants()
      .pipe(map(res => res.results))
      .subscribe((data: EtudiantModel[]) => {
        this.etudiantsAll = data;
        this.setupPagination();
        this.goToPage(0);
      });
  }

  setupPagination() {
    const totalPages = Math.ceil(this.etudiantsAll.length / this.pageSize);
    this.pages = Array(totalPages).fill(0).map((_, i) => i);
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.pages.length) return;
    this.currentPage = page;
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    this.etudiantsPerPage = this.etudiantsAll.slice(start, end);
  }
}
