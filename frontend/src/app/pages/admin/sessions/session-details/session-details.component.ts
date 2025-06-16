import { Component, inject } from '@angular/core';
import { Pointage } from '../../../../shared/models/pointage.model';
import { Justification } from '../../../../shared/models/justification.model';
import { JustificationService } from '../../../../shared/services/impl/justification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PointageService } from '../../../../shared/services/impl/pointage.service';

@Component({
  selector: 'app-session-details',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.css'
})
export class SessionDetailsComponent {
  private pointageService = inject(PointageService);
  private justificationService = inject(JustificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pointagesAll: Pointage[] = [];
  justificationAll: Justification[] = [];
  sessionId!: string;
  justificationId!: string;

  filtre: 'TOUS' | 'ABSENCE' | 'RETARD' | 'PRESENT' = 'TOUS';

  pointagesFiltresParPage: Pointage[] = [];
  currentPage = 0;
  pageSize = 5;
  pages: number[] = [];

  ngOnInit(): void {
    this.sessionId = String(this.route.snapshot.paramMap.get('sessionId'));
    this.pointageService.getAllPointagesDuneSessionDuJour(this.sessionId)
      .subscribe((response: any) => {
        this.pointagesAll = response.results;
        console.log("Pointages récupérés :", this.pointagesAll);
        this.setupPagination();
        this.goToPage(0);
      });

    // this.justificationId = String(this.route.snapshot.paramMap.get('justificationId'));
    // this.justificationService.getAllJustifications()
    //   .subscribe((response: any) => {
    //     this.pointagesAll = response.results;
    //     console.log("Pointages récupérés :", this.pointagesAll);
    //     this.setupPagination();
    //     this.goToPage(0);
    //   });
  }
  

  voirDetails(absenceId: string,justificationId:string) {
    this.router.navigate([
      '/admin/sessions', this.sessionId, 
      'absence', absenceId, 
      'justification']);
  }

  filtrerEtPaginer() {
  this.currentPage = 0;
  this.pointagesFiltresParPage = this.getFilteredPointages().slice(0, this.pageSize);
  this.setupPagination();
}


  getFilteredPointages(): Pointage[] {
    if (this.filtre === 'TOUS') 
      return this.pointagesAll;
    return this.pointagesAll.filter(p => p.type === this.filtre);
  }

  setupPagination() {
    const totalPages = Math.ceil(this.getFilteredPointages().length / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i);
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.pages.length) return;
    this.currentPage = page;
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    this.pointagesFiltresParPage = this.getFilteredPointages().slice(start, end);
  }
}
