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
    MdSelectModule,
    MdDatepickerModule,
MdNativeDateModule } from '@angular/material';

import { SecondNavComponent } from './second-nav/second-nav.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { TransitionElementDirective } from './transition-element.directive';
import { SpecialityConverterPipe } from './speciality-converter.pipe';

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
        MdSelectModule,
        MdDatepickerModule,
        MdNativeDateModule
    ],
    declarations: [
        SecondNavComponent,
        LoadingOverlayComponent,
        FloatingButtonComponent,
        TransitionElementDirective,
        SpecialityConverterPipe
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
        MdDatepickerModule,
        SecondNavComponent,
        LoadingOverlayComponent,
        FloatingButtonComponent,
        TransitionElementDirective,
        SpecialityConverterPipe
    ]
})
export class SharedModule { }
