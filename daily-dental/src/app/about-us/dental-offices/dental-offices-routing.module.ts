import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DentalOfficesResolveService } from './dental-offices-resolve.service';
import { DentalOfficesComponent } from './dental-offices.component';

const dentalOfficesRoutes: Routes = [
    {
        path: '',
        component: DentalOfficesComponent,
        resolve: {
            offices: DentalOfficesResolveService
        }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(dentalOfficesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class DentalOfficesRoutingModule { }
