import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { PatientsRoutingModule } from './patients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatientsComponent } from './patients.component';
import { PatientComponent } from './patient/patient.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ExaminationsComponent } from './patient-details/examinations/examinations.component';
import { ExaminationFormComponent } from './patient-details/examination-form/examination-form.component';
import { ExaminationService } from './patient-details/examinations/examination.service';

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
        PatientDetailsComponent,
        ExaminationFormComponent,
        ExaminationsComponent
    ],
    entryComponents: [
        PatientFormComponent,
        ExaminationFormComponent
    ],
    providers: [
        ExaminationService
    ]
})
export class PatientsModule { }
