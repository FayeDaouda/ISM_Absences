import { Routes } from '@angular/router';
import { AbsencesComponent } from './pages/admin/absences/absences.component';
import { JustificationComponent } from './pages/admin/justifications/justifications.component';


export const routes: Routes = [
  { path: '', redirectTo: 'absences', pathMatch: 'full' },
  { path: 'absences', component: AbsencesComponent },
  { path: 'justification/:id', component: JustificationComponent },
];
