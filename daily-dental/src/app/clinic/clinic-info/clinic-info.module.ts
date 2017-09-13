import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ClinicInfoComponent } from './clinic-info.component';
import { ClinicDetailsComponent } from './clinic-details/clinic-details.component';
import { ClinicDetailsService } from './clinic-details/clinic-details.service';

const clinicInfoRoutes: Routes = [
  {
    path: '',
    component: ClinicInfoComponent
  }
]

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    RouterModule.forChild(clinicInfoRoutes)
  ],
  declarations: [
    ClinicInfoComponent,
    ClinicDetailsComponent
  ],
  providers: [
    ClinicDetailsService
  ]
})
export class ClinicInfoModule { }
