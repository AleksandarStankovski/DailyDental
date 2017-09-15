import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { DentalOfficesRoutingModule } from './dental-offices-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DentalOfficesComponent } from './dental-offices.component';
import { OfficeComponent } from './office/office.component';
import { OfficeFormComponent } from './office-form/office-form.component';
import { OfficeService } from './office/office.service';

@NgModule({
    imports: [
        HttpModule,
        SharedModule,
        DentalOfficesRoutingModule
    ],
    declarations: [
        DentalOfficesComponent,
        OfficeComponent,
        OfficeFormComponent
    ],
    providers: [
        OfficeService
    ],
    entryComponents: [
        OfficeFormComponent
    ]
})
export class DentalOfficesModule { }
