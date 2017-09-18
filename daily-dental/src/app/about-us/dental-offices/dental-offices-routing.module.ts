import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DentalOfficesComponent } from './dental-offices.component';

const dentalOfficesRoutes: Routes = [
    {
        path: '',
        component: DentalOfficesComponent
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
