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
    MdNativeDateModule,
    MdMenuModule,
    MdSliderModule,
    MdTooltipModule,
    MdRadioModule } from '@angular/material';

import { SecondNavComponent } from './second-nav/second-nav.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { AvatarComponent } from './avatar/avatar.component';
import { TransitionElementDirective } from './transition-element.directive';
import { SpecialityConverterPipe } from './speciality-converter.pipe';
import { TimeConverterPipe } from './time-converter.pipe';
import { StatusConverterPipe } from './status-converter.pipe';

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
        MdNativeDateModule,
        MdMenuModule,
        MdSliderModule,
        MdTooltipModule,
        MdRadioModule
    ],
    declarations: [
        SecondNavComponent,
        LoadingOverlayComponent,
        FloatingButtonComponent,
        AvatarComponent,
        TransitionElementDirective,
        SpecialityConverterPipe,
        TimeConverterPipe,
        StatusConverterPipe
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
        MdMenuModule,
        MdSliderModule,
        MdTooltipModule,
        MdRadioModule,
        SecondNavComponent,
        LoadingOverlayComponent,
        FloatingButtonComponent,
        AvatarComponent,
        TransitionElementDirective,
        SpecialityConverterPipe,
        TimeConverterPipe,
        StatusConverterPipe
    ]
})
export class SharedModule { }
