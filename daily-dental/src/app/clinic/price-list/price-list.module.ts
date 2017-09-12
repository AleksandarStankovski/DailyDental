import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../../shared/shared.module';
import { PriceListComponent } from './price-list.component';
import { ManipulationComponent } from './manipulation/manipulation.component';
import { ManipulationService } from './manipulation/manipulation.service';
import { ManipulationFormComponent } from './manipulation-form/manipulation-form.component';


const priceListRoutes: Routes = [
  {
    path: '',
    component: PriceListComponent
  }
]

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    RouterModule.forChild(priceListRoutes)
  ],
  declarations: [
    PriceListComponent,
    ManipulationComponent,
    ManipulationFormComponent
  ],
  providers: [
    ManipulationService
  ],
  entryComponents: [
    ManipulationFormComponent
  ]
})
export class PriceListModule { }
