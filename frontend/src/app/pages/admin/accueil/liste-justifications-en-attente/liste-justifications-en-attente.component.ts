import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-justifications-en-attente',
  imports: [CommonModule],
  templateUrl: './liste-justifications-en-attente.component.html',
  styleUrl: './liste-justifications-en-attente.component.css'
})
export class ListeJustificationsEnAttenteComponent {
justifications = [
  { nom: 'Adja', prenom: 'Ndour', matricule: 'Mat09134', classe: 'L3GLRS', motif: 'Maladie' },
  { nom: 'Sidy', prenom: 'Saizonou', matricule: 'Mat09450', classe: 'L3GLRS', motif: 'Faute de transport' },
  { nom: 'Awa Ba', prenom: 'Diarra', matricule: 'Mat16003', classe: 'L3ETSE', motif: 'Rendez-vous à l’hôpital' }
];
}
