import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaffResolveService } from './staff-resolve.service';
import { StaffComponent } from './staff.component';

const staffRoutes: Routes = [
    {
        path: '',
        component: StaffComponent,
        resolve: {
            doctors: StaffResolveService
        }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(staffRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class StaffRoutingModule { }
