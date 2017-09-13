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
        path: 'staff',
        loadChildren: 'app/clinic/staff/staff.module#StaffModule'
      },
      {
        path: 'price-list',
        loadChildren: 'app/clinic/price-list/price-list.module#PriceListModule'
      },
      {
        path: 'dental-offices',
        loadChildren: 'app/clinic/dental-offices/dental-offices.module#DentalOfficesModule'
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
