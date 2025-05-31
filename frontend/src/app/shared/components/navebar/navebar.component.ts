import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navebar',
  imports: [],
  templateUrl: './navebar.component.html',
  styleUrl: './navebar.component.css'
})
export class NavebarComponent {
  pageTitle = 'Tableau de bord';

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const url = this.router.url;
      if (url.includes('/accueil')) this.pageTitle = 'Accueil';
      else if (url.includes('/absences')) this.pageTitle = 'Absences';
      else if (url.includes('/etudiants')) this.pageTitle = 'Étudiants';
      else if (url.includes('/justification')) this.pageTitle = 'Justification';
      else this.pageTitle = '';
    });
  }

}
