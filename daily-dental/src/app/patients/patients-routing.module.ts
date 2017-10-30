import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsComponent } from './patients.component';
import { PatientPageComponent } from './patient-page/patient-page.component';

const patientsRoutes: Routes = [
    {
        path: '',
        component: PatientsComponent
    },
    {
        path: 'patient/:id',
        component: PatientPageComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(patientsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class PatientsRoutingModule { }
