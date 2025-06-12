import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { EtudiantService } from '../../../shared/services/impl/etudiant.service';
import { Etudiant } from '../../../shared/models/etudiant.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
})
export class EtudiantsComponent implements OnInit {
  private etudiantsService: EtudiantService = inject(EtudiantService);
 
  etudiants: Etudiant[] = [];
  etudiantsPerPage: Etudiant[] = [];

  currentPage = 0;
  pageSize = 5
  pages: number[] = [];

  ngOnInit(): void {
    this.etudiantsService.getEtudiants()
      .pipe(map(res => res.results))
      .subscribe((data: Etudiant[]) => {
        this.etudiants = data;
        this.setupPagination();
        this.goToPage(0);
      });
  }


  setupPagination() {
    const totalPages = Math.ceil(this.etudiants.length / this.pageSize);
    this.pages = Array(totalPages).fill(0).map((_, i) => i);
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.pages.length) return;
    this.currentPage = page;
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    this.etudiantsPerPage = this.etudiants.slice(start, end);
  }

}
