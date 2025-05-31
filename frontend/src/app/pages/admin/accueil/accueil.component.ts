import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavebarComponent } from '../../../shared/components/navebar/navebar.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { ListeAbsenceDuJourComponent } from './liste-absence-du-jour/liste-absence-du-jour.component';
import { ListeJustificationsEnAttenteComponent } from './liste-justifications-en-attente/liste-justifications-en-attente.component';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule, SidebarComponent, NavebarComponent, ListeAbsenceDuJourComponent, ListeJustificationsEnAttenteComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
