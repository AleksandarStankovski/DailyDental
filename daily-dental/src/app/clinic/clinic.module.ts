import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { ClinicComponent } from './clinic.component';
import { SharedModule } from '../shared/shared.module';

const clinicRoutes: Routes = [
    {
        path: '',
        component: ClinicComponent,
        children: [
            {
                path: 'clinic-info',
                loadChildren: 'app/clinic/clinic-info/clinic-info.module#ClinicInfoModule'
            },
            {
                path: 'dental-offices',
                loadChildren: 'app/clinic/dental-offices/dental-offices.module#DentalOfficesModule'
            },
            {
                path: 'staff',
                loadChildren: 'app/clinic/staff/staff.module#StaffModule'
            },
            {
                path: 'price-list',
                loadChildren: 'app/clinic/price-list/price-list.module#PriceListModule'
            }
        ]
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(clinicRoutes)
    ],
    declarations: [
        ClinicComponent
    ]
})
export class ClinicModule { }
