import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { PatientsRoutingModule } from './patients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatientsComponent } from './patients.component';
import { PatientComponent } from './patient/patient.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientPageComponent } from './patient-page/patient-page.component';

@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        PatientsRoutingModule
    ],
    declarations: [
        PatientsComponent,
        PatientComponent,
        PatientFormComponent,
        PatientPageComponent
    ],
    entryComponents: [
        PatientFormComponent
    ]
})
export class PatientsModule { }
