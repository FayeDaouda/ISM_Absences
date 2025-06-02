import { Component, OnInit, signal } from '@angular/core';
import { Absence, AbsenceService } from '../../../shared/services/impl/absence.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-absences',
  imports: [RouterLink],
  templateUrl: './absences.component.html',
})
export class AbsencesComponent implements OnInit {
  absences = signal<any[]>([]);

  constructor(private absenceService: AbsenceService) {}

  ngOnInit(): void {
    this.absenceService.getAbsences().subscribe((data) => {
      this.absences.set(data);
    });
  }

  trackById = (index: number, item: any) => item.id;
}
