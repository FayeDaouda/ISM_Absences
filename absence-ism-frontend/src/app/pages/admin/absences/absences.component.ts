import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PointageService } from '../../../shared/services/impl/pointage.service';
import { AbsenceComponent } from '../../../components/Absences/absence.component';



@Component({
  selector: 'app-absence',
  imports: [AbsenceComponent, CommonModule],
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.css'
})

export class AbsencesComponent implements OnInit {


  private absencesService: PointageService = inject(PointageService);
  absences$: Observable<any> = new Observable();

  ngOnInit(): void {

    this.absences$ = this.absencesService.getAllPointages()
    this.absences$.subscribe(data => console.log(data));

    console.log(this.absences$)

  }

}