import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(clinicRoutes)
  ],
  declarations: [
    ClinicComponent
  ]
})
export class ClinicModule { }
