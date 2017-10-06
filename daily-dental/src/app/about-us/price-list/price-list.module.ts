import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { PriceListRoutingModule } from './price-list-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PriceListComponent } from './price-list.component';
import { ManipulationComponent } from './manipulation/manipulation.component';
import { ManipulationFormComponent } from './manipulation-form/manipulation-form.component';

@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        PriceListRoutingModule
    ],
    declarations: [
        PriceListComponent,
        ManipulationComponent,
        ManipulationFormComponent
    ],
    entryComponents: [
        ManipulationFormComponent
    ]
})
export class PriceListModule { }
