import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PatientsComponent } from './patients.component';
import { PatientComponent } from './patient/patient.component';
import { PatientService } from './patient/patient.service';
import { PatientFormComponent } from './patient-form/patient-form.component';

const patientsRoutes: Routes = [
  {
    path: '',
    component: PatientsComponent
  }
]

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    RouterModule.forChild(patientsRoutes)
  ],
  declarations: [
    PatientsComponent,
    PatientComponent,
    PatientFormComponent
  ],
  providers: [
    PatientService
  ],
  entryComponents: [
    PatientFormComponent
  ]
})
export class PatientsModule { }
