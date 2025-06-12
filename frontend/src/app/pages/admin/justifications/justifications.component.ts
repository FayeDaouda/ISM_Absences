import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Absence, AbsenceService } from '../../../shared/services/impl/absence.service';

@Component({
  selector: 'app-justification',
  templateUrl: './justifications.component.html',
})
export class JustificationComponent implements OnInit {
  absenceId!: string;
  absence?: Absence;

  constructor(
    private route: ActivatedRoute,
    private absenceService: AbsenceService
  ) {}

  ngOnInit(): void {
    this.absenceId = this.route.snapshot.paramMap.get('id') ?? '';

    this.absenceService.getAbsences().subscribe((absences) => {
      this.absence = absences.find((a) => a.id === this.absenceId);
    });
  }

  validerJustification(): void {
    if (!this.absence) return;

    const updatedAbsence: Partial<Absence> = {
      etat: 'JUSTIFIEE',
    };

    this.absenceService.updateAbsence(this.absence.id, updatedAbsence).subscribe((updated) => {
      this.absence = { ...this.absence!, ...updated };
    });
  }

  invaliderJustification(): void {
    if (!this.absence) return;

    const updatedAbsence: Partial<Absence> = {
      etat: 'NON_JUSTIFIEE',
    };

    this.absenceService.updateAbsence(this.absence.id, updatedAbsence).subscribe((updated) => {
      this.absence = { ...this.absence!, ...updated };
    });
  }
}
