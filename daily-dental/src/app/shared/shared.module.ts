import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import 'hammerjs';

import {
  MdDialogModule,
  MdButtonModule,
  MdInputModule,
  MdSnackBarModule,
  MdProgressSpinnerModule,
  MdSlideToggleModule } from '@angular/material';

import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MdDialogModule,
        MdButtonModule,
        MdInputModule,
        MdSnackBarModule,
        MdProgressSpinnerModule,
        MdSlideToggleModule
    ],
    declarations: [
        SidebarComponent,
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
        MdSlideToggleModule,
        SidebarComponent,
        LoadingOverlayComponent
    ]
})
export class SharedModule { }
