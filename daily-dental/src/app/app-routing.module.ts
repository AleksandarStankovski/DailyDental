import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'home',
        loadChildren: 'app/home/home.module#HomeModule'
    },
    {
        path: 'about-us',
        loadChildren: 'app/about-us/about-us.module#AboutUsModule'
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
        redirectTo: '/home'
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
