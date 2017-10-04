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
import { DoctorService } from '../about-us/staff/doctor/doctor.service';
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
        FooterComponent,
        ScrollPageTransitionDirective
    ],
    exports: [
        HeaderComponent,
        NavComponent,
        FooterComponent,
        ScrollPageTransitionDirective
    ],
    providers: [
        PageNameService,
        PageImageService,
        DoctorService
    ]
})
export class CoreModule { }
