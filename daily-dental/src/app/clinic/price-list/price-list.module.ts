import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MdDialogModule } from '@angular/material';

import { PriceListComponent } from './price-list.component';
import { ManipulationComponent } from './manipulation/manipulation.component';

import { ManipulationService } from './manipulation/manipulation.service';
import { AddManipulationComponent } from './add-manipulation/add-manipulation.component';
import { EditManipulationComponent } from './edit-manipulation/edit-manipulation.component';

const priceListRoutes: Routes = [
  {
    path: '',
    component: PriceListComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MdDialogModule,
    RouterModule.forChild(priceListRoutes)
  ],
  declarations: [
    PriceListComponent,
    ManipulationComponent,
    AddManipulationComponent,
    EditManipulationComponent
  ],
  providers: [
    ManipulationService
  ],
   entryComponents: [
     AddManipulationComponent,
     EditManipulationComponent
   ]
})
export class PriceListModule { }
