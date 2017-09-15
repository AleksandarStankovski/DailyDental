import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'home',
        loadChildren: 'app/home/home.module#HomeModule'
    },
    {
        path: 'clinic',
        loadChildren: 'app/clinic/clinic.module#ClinicModule'
    },
    {
        path: 'patients',
        loadChildren: 'app/patients/patients.module#PatientsModule'
    },
    {
        path: 'reception',
        loadChildren: 'app/reception/reception.module#ReceptionModule'
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/clinic'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
