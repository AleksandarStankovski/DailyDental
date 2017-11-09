import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ClinicInfoRoutingModule } from './clinic-info-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CudService} from '../../core/cud.service';
import { ClinicService } from './clinic/clinic.service';
import { ClinicInfoComponent } from './clinic-info.component';
import { ClinicComponent } from './clinic/clinic.component';
import { ClinicFormComponent } from './clinic-form/clinic-form.component';

@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        ClinicInfoRoutingModule
    ],
    declarations: [
        ClinicInfoComponent,
        ClinicComponent,
        ClinicFormComponent
    ],
    providers: [
        CudService,
        ClinicService
    ],
    entryComponents: [
        ClinicFormComponent
    ]
})
export class ClinicInfoModule { }
