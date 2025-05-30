// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
    data: { preload: true }
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard], // Protection par le guard
    data: { preload: true }
  },
  {
    path: 'absences',
    loadComponent: () =>
      import('./pages/absences/absences.component').then(m => m.AbsencesComponent),
    canActivate: [authGuard],
    data: { preload: true }
  },
  {
    path: 'etudiants',
    loadComponent: () =>
      import('./pages/etudiants/etudiant.component').then(m => m.EtudiantsComponent),
    canActivate: [authGuard],
    data: { preload: true }
  },
  {
    path: 'justifications',
    loadComponent: () =>
      import('./pages/justifications/justifications.component').then(m => m.JustificationsComponent),
    canActivate: [authGuard],
    data: { preload: true }
  },
  {
    path: 'justifications-list',
    loadComponent: () =>
      import('./pages/justifications/justifications-list.component').then(m => m.JustificationsListComponent),
    canActivate: [authGuard],
    data: { preload: true }
  },
  // Route pour les détails d'une justification avec paramètre ID
  {
    path: 'justification-detail/:id',
    loadComponent: () =>
      import('./pages/justifications/justifications.component').then(m => m.JustificationsComponent),
    canActivate: [authGuard],
    data: { preload: true }
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];