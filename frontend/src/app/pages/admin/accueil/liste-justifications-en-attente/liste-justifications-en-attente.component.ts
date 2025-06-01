import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Absence } from '../../../../shared/models/absence.model';
import { AbsenceService } from '../../../../shared/services/absence.service';

@Component({
  selector: 'app-liste-justifications-en-attente',
  imports: [CommonModule],
  templateUrl: './liste-justifications-en-attente.component.html',
  styleUrl: './liste-justifications-en-attente.component.css'
})
export class ListeJustificationsEnAttenteComponent {
 justifications: Absence[] = [];

  constructor(private absenceService: AbsenceService) {}

  ngOnInit() {
    this.absenceService.getJustificationsEnAttente().subscribe(data => {
      this.justifications = data.map(a => ({
        ...a,
        motif: a.motif || 'Motif inconnu'
      }));
    });
  }
}
