import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../../../shared/models/etudiant.model';
import { EtudiantService } from '../../../shared/services/etudiant.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
})
export class EtudiantsComponent implements OnInit {
  etudiants: Etudiant[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.etudiantService.getEtudiants().subscribe(data => {
      this.etudiants = data;
      console.log(this.etudiants);
    });
  }

  get paginatedEtudiants(): Etudiant[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.etudiants.slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.etudiants.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }
}
