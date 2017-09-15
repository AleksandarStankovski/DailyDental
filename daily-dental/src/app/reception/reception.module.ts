import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ReceptionRoutingModule } from './reception-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReceptionComponent } from './reception.component';

@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        ReceptionRoutingModule
    ],
    declarations: [
        ReceptionComponent
    ]
})
export class ReceptionModule { }
