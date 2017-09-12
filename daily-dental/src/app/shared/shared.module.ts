import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import 'hammerjs';

import { MdDialogModule, MdButtonModule, MdInputModule } from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdDialogModule,
    MdButtonModule,
    MdInputModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    NavComponent,
    SidebarComponent,
    FooterComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MdDialogModule,
    MdButtonModule,
    MdInputModule,
    HeaderComponent,
    NavComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
