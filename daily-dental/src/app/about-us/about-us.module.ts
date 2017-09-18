import { NgModule } from '@angular/core';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AboutUsComponent } from './about-us.component';

@NgModule({
    imports: [
        SharedModule,
        AboutUsRoutingModule
    ],
    declarations: [
        AboutUsComponent
    ]
})
export class AboutUsModule { }
