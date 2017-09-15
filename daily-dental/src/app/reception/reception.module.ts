import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ReceptionComponent } from './reception.component';

const receptionRoutes: Routes = [
    {
        path: '',
        component: ReceptionComponent
    }
]

@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        RouterModule.forChild(receptionRoutes)
    ],
    declarations: [
        ReceptionComponent
    ]
})
export class ReceptionModule { }
