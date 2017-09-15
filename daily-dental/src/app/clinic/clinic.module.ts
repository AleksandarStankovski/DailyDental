import { NgModule } from '@angular/core';

import { ClinicRoutingModule } from './clinic-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClinicComponent } from './clinic.component';

@NgModule({
    imports: [
        SharedModule,
        ClinicRoutingModule
    ],
    declarations: [
        ClinicComponent
    ]
})
export class ClinicModule { }
