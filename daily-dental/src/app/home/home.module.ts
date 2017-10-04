import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeNavComponent } from './home-nav/home-nav.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent, 
        HomeNavComponent
    ]
})
export class HomeModule { }
