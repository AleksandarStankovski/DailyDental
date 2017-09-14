import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import 'hammerjs';

import { MdDialogModule, MdButtonModule, MdInputModule, MdSnackBarModule, MdProgressSpinnerModule } from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdDialogModule,
    MdButtonModule,
    MdInputModule,
    MdSnackBarModule,
    MdProgressSpinnerModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    NavComponent,
    SidebarComponent,
    FooterComponent,
    LoadingOverlayComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MdDialogModule,
    MdButtonModule,
    MdInputModule,
    MdSnackBarModule,
    MdProgressSpinnerModule,
    HeaderComponent,
    NavComponent,
    SidebarComponent,
    FooterComponent,
    LoadingOverlayComponent
  ]
})
export class SharedModule { }
