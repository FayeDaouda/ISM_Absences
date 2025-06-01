import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { NavebarComponent } from '../../../shared/components/navebar/navebar.component';
import { ListeAbsenceDuJourComponent } from './liste-absence-du-jour/liste-absence-du-jour.component';
import { ListeJustificationsEnAttenteComponent } from './liste-justifications-en-attente/liste-justifications-en-attente.component';
import { AbsenceService } from '../../../shared/services/absence.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NavebarComponent,
    ListeAbsenceDuJourComponent,
    ListeJustificationsEnAttenteComponent
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  stats = {
    absences: 0,
    presences: 0,
    justifications: 0
  };

  constructor(private absenceService: AbsenceService) {}

  ngOnInit() {
    this.absenceService.getStats().subscribe(data => {
      this.stats = data;
    });
  }
}
