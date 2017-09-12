import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../../shared/shared.module';
import { StaffComponent } from './staff.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorService } from './doctor/doctor.service';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';

const staffRoutes: Routes = [
  {
    path: '',
    component: StaffComponent
  }
]

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    RouterModule.forChild(staffRoutes)
  ],
  declarations: [
    StaffComponent,
    DoctorComponent,
    DoctorFormComponent
  ],
  providers: [
    DoctorService
  ],
  entryComponents: [
    DoctorFormComponent
  ]
})
export class StaffModule { }
