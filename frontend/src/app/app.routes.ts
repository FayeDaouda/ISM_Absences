import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { EtudiantsComponent } from './pages/admin/etudiants/etudiants.component';
import { AbsencesComponent } from './pages/admin/absences/absences.component';
import { JustificationComponent } from './pages/admin/justifications/justifications.component';

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
        ]
    },
    {
        path:'',
        redirectTo: '/admin',
        pathMatch: 'full'
    },
];
