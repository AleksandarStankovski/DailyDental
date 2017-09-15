import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PriceListComponent } from './price-list.component';

const priceListRoutes: Routes = [
    {
        path: '',
        component: PriceListComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(priceListRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class PriceListRoutingModule { }
