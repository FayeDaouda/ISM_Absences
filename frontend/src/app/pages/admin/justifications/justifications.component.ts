import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbsenceService } from '../../../shared/services/absence.service';
import { Absence } from '../../../shared/models/absence.model';
import { NavebarComponent } from '../../../shared/components/navebar/navebar.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-justification',
  standalone: true,
  imports: [CommonModule, NavebarComponent, SidebarComponent],
  templateUrl: './justifications.component.html',
})
export class JustificationComponent {
  absence?: Absence;

  constructor(private route: ActivatedRoute, private service: AbsenceService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.absence = this.service.getById(id);
  }

  getEtatLabel(etat: Absence['etat']) {
    switch (etat) {
      case 'justifiee': return 'Justifiée';
      case 'en_attente': return 'En attente';
      case 'non_justifiee': return 'Non justifiée';
    }
  }

  getEtatColor(etat: Absence['etat']) {
    switch (etat) {
      case 'justifiee': return 'text-green-600';
      case 'en_attente': return 'text-yellow-600';
      case 'non_justifiee': return 'text-red-600';
    }
  }
}
