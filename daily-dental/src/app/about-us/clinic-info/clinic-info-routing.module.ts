import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClinicInfoResolveService } from './clinic-info-resolve.service';
import { ClinicInfoComponent } from './clinic-info.component';

const clinicInfoRoutes: Routes = [
    {
        path: '',
        component: ClinicInfoComponent,
        resolve: {
            clinics: ClinicInfoResolveService
        }
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
