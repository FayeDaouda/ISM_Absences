import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-absence-du-jour',
  imports: [CommonModule],
  templateUrl: './liste-absence-du-jour.component.html',
  styleUrl: './liste-absence-du-jour.component.css'
})
export class ListeAbsenceDuJourComponent {
absences = [
  { nom: 'Awa', prenom: 'Seyni', matricule: 'Mat09130', classe: 'L3 CSDD', heure: '8h / 12h' },
  { nom: 'Fatou', prenom: 'Mbaye', matricule: 'Mat04630', classe: 'L3 IAGE', heure: '8h / 12h' },
  { nom: 'Aissatou', prenom: 'Dione', matricule: 'Mat12345', classe: 'L3 GLRS', heure: '13h / 17h' }
];
}
