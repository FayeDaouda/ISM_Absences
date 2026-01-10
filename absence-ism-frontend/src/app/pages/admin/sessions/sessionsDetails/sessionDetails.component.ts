import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../../../../shared/services/impl/session.service';
import { PointageModel } from '../../../../shared/models/pointage.model';
import { PointageService } from '../../../../shared/services/impl/pointage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-session-details',
  templateUrl: './sessionDetails.component.html',
  imports: [FormsModule,CommonModule],
})
export class SessionDetailsComponent implements OnInit {

  private pointageService = inject(PointageService);
  private route = inject(ActivatedRoute);

  pointages: PointageModel[] = [];

  filtre: 'TOUS' | 'ABSENCE' | 'RETARD' | 'PRESENT' = 'TOUS';

  ngOnInit(): void {
    const sessionId = Number(this.route.snapshot.paramMap.get('id'));

    this.pointageService.getAllPointagesDuneSessionDuJour(sessionId)
      .subscribe((response: any) => {
        this.pointages = response.results;
        console.log("Pointages récupérés :", this.pointages);
      });
  }

  getFilteredPointages(): PointageModel[] {
    if (this.filtre === 'TOUS') 
      return this.pointages;
    return this.pointages.filter(p => p.type === this.filtre);
  }
}
