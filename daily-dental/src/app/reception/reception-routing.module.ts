import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReceptionComponent } from './reception.component';

const receptionRoutes: Routes = [
    {
        path: '',
        component: ReceptionComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(receptionRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ReceptionRoutingModule { }
