import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../../shared/shared.module';
import { DentalOfficesComponent } from './dental-offices.component';
import { OfficeComponent } from './office/office.component';
import { OfficeFormComponent } from './office-form/office-form.component';
import { OfficeService } from './office/office.service';

const dentalOfficesRoutes: Routes = [
  {
    path: '',
    component: DentalOfficesComponent
  }
]

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    RouterModule.forChild(dentalOfficesRoutes)
  ],
  declarations: [
    DentalOfficesComponent,
    OfficeComponent,
    OfficeFormComponent
  ],
  providers: [
    OfficeService
  ],
  entryComponents: [
    OfficeFormComponent
  ]
})
export class DentalOfficesModule { }
