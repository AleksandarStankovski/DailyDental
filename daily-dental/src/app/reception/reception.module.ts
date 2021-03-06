import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ReceptionRoutingModule } from './reception-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AppointmentService } from './appointment/appointment.service';
import { AppointmentStatusService } from './appointment-form/appointment-status.service';
import { AppointmentHourService } from './appointment-form/appointment-hour.service';
import { ReceptionComponent } from './reception.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ReceptionRoutingModule
    ],
    declarations: [
        ReceptionComponent,
        AppointmentFormComponent,
        AppointmentComponent
    ],
    providers: [
        AppointmentService,
        AppointmentStatusService,
        AppointmentHourService
    ],
    entryComponents: [
        AppointmentFormComponent
    ]
})
export class ReceptionModule { }
