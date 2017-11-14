import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientGuardService } from './patient/patient-guard.service';
import { PatientDetailsResolveService } from './patient-details/patient-details-resolve.service';
import { PatientsComponent } from './patients.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

const patientsRoutes: Routes = [
    {
        path: '',
        component: PatientsComponent
    },
    {
        path: 'patient/:id',
        component: PatientDetailsComponent,
        canActivate: [ 
            PatientGuardService 
        ],
        resolve: {
            patient: PatientDetailsResolveService
        }
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
