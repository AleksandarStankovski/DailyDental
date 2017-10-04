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
    MdSlideToggleModule,
    MdIconModule,
    MdSelectModule } from '@angular/material';

import { SecondNavComponent } from './second-nav/second-nav.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { SpecialityConverterPipe } from './speciality-converter.pipe';
import { TransitionElementDirective } from './transition-element.directive';

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
        MdSlideToggleModule,
        MdIconModule,
        MdSelectModule
    ],
    declarations: [
        SecondNavComponent,
        LoadingOverlayComponent,
        SpecialityConverterPipe,
        FloatingButtonComponent,
        TransitionElementDirective
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
        MdIconModule,
        MdSelectModule,
        SecondNavComponent,
        LoadingOverlayComponent,
        FloatingButtonComponent,
        SpecialityConverterPipe,
        TransitionElementDirective
    ]
})
export class SharedModule { }
