import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Absence } from '../../../../shared/models/absence.model';
import { AbsenceService } from '../../../../shared/services/absence.service';

@Component({
  selector: 'app-liste-absence-du-jour',
  imports: [CommonModule],
  templateUrl: './liste-absence-du-jour.component.html',
  styleUrl: './liste-absence-du-jour.component.css'
})
export class ListeAbsenceDuJourComponent {
absences: Absence[] = [];

  constructor(private absenceService: AbsenceService) {}

  ngOnInit() {
    this.absenceService.getAbsencesDuJour().subscribe(data => {
      this.absences = data.map(abs => ({
        ...abs,
        heure: '8h / 12h' // valeur temporaire
      }));
    });
  }
}
