import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutUsComponent } from './about-us.component';

const aboutUsRoutes: Routes = [
    {
        path: '',
        component: AboutUsComponent,
        children: [
            {
                path: 'clinic-info',
                loadChildren: 'app/about-us/clinic-info/clinic-info.module#ClinicInfoModule'
            },
            {
                path: 'dental-offices',
                loadChildren: 'app/about-us/dental-offices/dental-offices.module#DentalOfficesModule'
            },
            {
                path: 'staff',
                loadChildren: 'app/about-us/staff/staff.module#StaffModule'
            },
            {
                path: 'price-list',
                loadChildren: 'app/about-us/price-list/price-list.module#PriceListModule'
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(aboutUsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AboutUsRoutingModule { }
