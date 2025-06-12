import { Component, OnInit, signal } from '@angular/core';
import { Absence, AbsenceService } from '../../../shared/services/impl/absence.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  absences = signal<Absence[]>([]);
  justificationsEnAttente = signal<Absence[]>([]);
  absencesDuJour = signal<Absence[]>([]);
  presencesDuJour = signal<number>(0);
  totalJustifications = signal<number>(0);

  constructor(private absenceService: AbsenceService) {}

  ngOnInit(): void {
    this.absenceService.getAbsences().subscribe((data) => {
      const today = new Date().toISOString().split('T')[0];
      const todayAbsences = data.filter(a => a.date === today);

      this.absences.set(todayAbsences.filter(a => a.etat === 'NON_JUSTIFIEE'));
      this.justificationsEnAttente.set(todayAbsences.filter(a => a.etat === 'EN_ATTENTE'));
      this.absencesDuJour.set(todayAbsences);
      this.totalJustifications.set(todayAbsences.filter(a => a.etat === 'JUSTIFIEE').length);

      this.presencesDuJour.set(1000 - todayAbsences.length);
    });
  }

  trackById = (index: number, item: Absence) => item.id;
}
