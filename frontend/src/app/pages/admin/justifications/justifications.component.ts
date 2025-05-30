import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-justifications',
  templateUrl: './justifications.component.html',
})
export class JustificationComponent implements OnInit {
  absenceId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.absenceId = this.route.snapshot.paramMap.get('id')!;
    // Tu peux ici appeler un service pour charger les détails de l'absence
  }
}
