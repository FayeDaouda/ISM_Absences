import { Component, OnInit } from '@angular/core';
import { Etudiant, EtudiantService } from '../../../shared/services/impl/etudiant.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
})
export class EtudiantsComponent implements OnInit {
  etudiants: Etudiant[] = [];

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit() {
    this.etudiantService.getEtudiants().subscribe((data) => {
      this.etudiants = data;
    });
  }
}
