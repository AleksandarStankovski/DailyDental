import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StaffComponent } from './staff.component';
import { DoctorComponent } from './doctor/doctor.component';

const staffRoutes: Routes = [
  {
    path: '',
    component: StaffComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(staffRoutes)
  ],
  declarations: [
    StaffComponent,
    DoctorComponent
  ]
})
export class StaffModule { }
