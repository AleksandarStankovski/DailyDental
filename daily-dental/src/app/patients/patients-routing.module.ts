import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsComponent } from './patients.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

const patientsRoutes: Routes = [
    {
        path: '',
        component: PatientsComponent
    },
    {
        path: 'patient/:id',
        component: PatientDetailsComponent
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
