import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClinicInfoComponent } from './clinic-info.component';

const clinicInfoRoutes: Routes = [
    {
        path: '',
        component: ClinicInfoComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(clinicInfoRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ClinicInfoRoutingModule { }
