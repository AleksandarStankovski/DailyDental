import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { PageNameService } from './page-name.service';
import { PageImageService } from './page-image.service';
import { SpecialityService } from './speciality.service';
import { ToothService } from './tooth.service';
import { UserService } from './user.service';
import { DoctorService } from '../about-us/staff/doctor/doctor.service';
import { ManipulationService } from '../about-us/price-list/manipulation/manipulation.service';
import { PatientService } from '../patients/patient/patient.service';
import { NavService } from './nav.service';
import { ScrollPageTransitionDirective } from './scroll-page-transition.directive';
import { UserFormComponent } from './user-form/user-form.component';

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
        FooterComponent,
        ScrollPageTransitionDirective,
        UserFormComponent
    ],
    exports: [
        HeaderComponent,
        NavComponent,
        FooterComponent
    ],
    providers: [
        PageNameService,
        PageImageService,
        SpecialityService,
        ToothService,
        UserService,
        DoctorService,
        ManipulationService,
        PatientService,
        NavService
    ],
    entryComponents: [
        UserFormComponent
    ]
})
export class CoreModule { }
