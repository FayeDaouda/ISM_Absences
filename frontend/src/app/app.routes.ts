import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { EtudiantsComponent } from './pages/admin/etudiants/etudiants.component';
import { AbsencesComponent } from './pages/admin/absences/absences.component';
import { JustificationComponent } from './pages/admin/justifications/justifications.component';
import { SecurityComponent } from './pages/security/security.component';
import { LoginComponent } from './pages/security/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: "admin",
        component: AdminComponent,
        children: [
            {
                path: 'etudiants',
                component: EtudiantsComponent
            },
            {
                path: 'absences',
                component: AbsencesComponent
            },
            {
                path: 'justification/:id',
                component: JustificationComponent
            },
            {
                path: '',
                component: DashboardComponent
            },
        ]
    },
    {
        path: "security",
        component: SecurityComponent,
        children: [
            {
                path: '',
                component: LoginComponent
            }
        ]
    },
    {
        path:'',
        redirectTo: '/admin',
        pathMatch: 'full'
    },
];
