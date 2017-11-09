import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { StaffRoutingModule } from './staff-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CudService} from '../../core/cud.service';
import { StaffComponent } from './staff.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';


@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        StaffRoutingModule
    ],
    declarations: [
        StaffComponent,
        DoctorComponent,
        DoctorFormComponent
    ],
    providers: [
        CudService
    ],
    entryComponents: [
        DoctorFormComponent
    ]
})
export class StaffModule { }
