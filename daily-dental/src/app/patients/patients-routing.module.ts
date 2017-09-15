import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsComponent } from './patients.component';

const patientsRoutes: Routes = [
    {
        path: '',
        component: PatientsComponent
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
