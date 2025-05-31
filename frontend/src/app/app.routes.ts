import { Routes } from '@angular/router';
import { AbsencesComponent } from './pages/admin/absences/absences.component';
import { JustificationComponent } from './pages/admin/justifications/justifications.component';
import { EtudiantsComponent } from './pages/admin/etudiants/etudiants.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { AccueilComponent } from './pages/admin/accueil/accueil.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'absences', component: AbsencesComponent },
  { path: 'justification/:id', component: JustificationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'etudiants', component: EtudiantsComponent },
];
