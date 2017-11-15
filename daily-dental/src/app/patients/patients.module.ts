import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { PatientsRoutingModule } from './patients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatientGuardService } from './patient/patient-guard.service';
import { PatientDetailsResolveService } from './patient-details/patient-details-resolve.service';
import { ExaminationService } from './patient-details/examinations/examination.service';
import { PatientsComponent } from './patients.component';
import { PatientComponent } from './patient/patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ExaminationsComponent } from './patient-details/examinations/examinations.component';
import { ExaminationFormComponent } from './patient-details/examination-form/examination-form.component';

@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        PatientsRoutingModule
    ],
    declarations: [
        PatientsComponent,
        PatientComponent,
        PatientDetailsComponent,
        ExaminationFormComponent,
        ExaminationsComponent
    ],
    providers: [
        PatientGuardService,
        ExaminationService,
        PatientDetailsResolveService
    ],
    entryComponents: [
        ExaminationFormComponent
    ]
})
export class PatientsModule { }
