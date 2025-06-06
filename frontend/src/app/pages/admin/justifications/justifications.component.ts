import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Absence, AbsenceService } from '../../../shared/services/impl/absence.service';

@Component({
  selector: 'app-justification',
  templateUrl: './justifications.component.html',
})
export class JustificationComponent implements OnInit {
  absenceId!: string;
  absence!: Absence | undefined;

  constructor(
    private route: ActivatedRoute,
    private absenceService: AbsenceService
  ) {}

  ngOnInit(): void {
    this.absenceId = this.route.snapshot.paramMap.get('id')!;
    this.absenceService.getAbsences().subscribe((absences) => {
      this.absence = absences.find((a) => a.id === this.absenceId);
    });
  }
}
