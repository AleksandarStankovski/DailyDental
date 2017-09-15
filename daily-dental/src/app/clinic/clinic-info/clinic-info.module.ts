import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ClinicInfoRoutingModule } from './clinic-info-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ClinicInfoComponent } from './clinic-info.component';
import { ClinicDetailsComponent } from './clinic-details/clinic-details.component';
import { ClinicDetailsService } from './clinic-details/clinic-details.service';
import { ClinicDetailsFormComponent } from './clinic-details-form/clinic-details-form.component';

@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        ClinicInfoRoutingModule
    ],
    declarations: [
        ClinicInfoComponent,
        ClinicDetailsComponent,
        ClinicDetailsFormComponent
    ],
    providers: [
        ClinicDetailsService
    ],
    entryComponents: [
        ClinicDetailsFormComponent
    ]
})
export class ClinicInfoModule { }
