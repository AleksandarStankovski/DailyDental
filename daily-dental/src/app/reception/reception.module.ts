import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ReceptionRoutingModule } from './reception-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReceptionComponent } from './reception.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentService } from './appointment/appointment.service';

@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        ReceptionRoutingModule
    ],
    declarations: [
        ReceptionComponent,
        AppointmentFormComponent,
        AppointmentComponent
    ],
    providers: [
        AppointmentService
    ],
    entryComponents: [
        AppointmentFormComponent
    ]
})
export class ReceptionModule { }
