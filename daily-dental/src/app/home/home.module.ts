import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './home.component';
import { HomeNavComponent } from './home-nav/home-nav.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [HomeComponent, HomeNavComponent]
})
export class HomeModule { }
