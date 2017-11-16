import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { PagePresentationService } from './page-presentation.service';
import { SpecialityService } from './speciality.service';
import { ToothService } from './tooth.service';
import { UserService } from './user.service';
import { CudService } from './cud.service';
import { DoctorService } from '../about-us/staff/doctor/doctor.service';
import { ManipulationService } from '../about-us/price-list/manipulation/manipulation.service';
import { PatientService } from '../patients/patient/patient.service';
import { NavService } from './nav.service';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { ProfileFormComponent } from './profile/profile-form/profile-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ScrollPageTransitionDirective } from './scroll-page-transition.directive';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        HttpModule
    ],
    declarations: [
        HeaderComponent,
        NavComponent,
        ProfileFormComponent,
        ProfileComponent,
        ScrollPageTransitionDirective
    ],
    exports: [
        HeaderComponent,
        NavComponent
    ],
    providers: [
        PagePresentationService,
        SpecialityService,
        ToothService,
        UserService,
        CudService,
        DoctorService,
        ManipulationService,
        PatientService,
        NavService
    ],
    entryComponents: [
        ProfileFormComponent
    ]
})
export class CoreModule { }
