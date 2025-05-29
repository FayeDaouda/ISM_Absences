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
  
  // {
  //   path: 'etudiants',
  //   loadComponent: () =>
  //     import('./pages/etudiants/etudiants.component').then(m => m.EtudiantsComponent),
  //   canActivate: [authGuard],
  //   data: { preload: true }
  // },

  {
    path: '**',
    redirectTo: 'login'
  }
];

// import { Routes } from '@angular/router';

// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'login',
//     loadComponent: () =>
//       import('./pages/login/login.component').then(m => m.LoginComponent),
//     // Preload le composant pour éviter le délai de chargement
//     data: { preload: true }
//   },
//   {
//     path: 'dashboard',
//     loadComponent: () =>
//       import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
//     data: { preload: true }
//   },
//   {
//     path: '**',
//     redirectTo: 'login'
//   }
// ];