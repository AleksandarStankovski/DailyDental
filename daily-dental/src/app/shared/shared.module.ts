import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import 'hammerjs';

import {
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSliderModule,
    MatTooltipModule,
    MatRadioModule,
    MatAutocompleteModule } from '@angular/material';

import { SecondNavComponent } from './second-nav/second-nav.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TransitionElementDirective } from './transition-element.directive';
import { SpecialityConverterPipe } from './speciality-converter.pipe';
import { TimeConverterPipe } from './time-converter.pipe';
import { StatusConverterPipe } from './status-converter.pipe';
import { DoctorActiveConverterPipe } from './doctor-active-converter.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatSliderModule,
        MatTooltipModule,
        MatRadioModule,
        MatAutocompleteModule
    ],
    declarations: [
        SecondNavComponent,
        LoadingOverlayComponent,
        FloatingButtonComponent,
        AvatarComponent,
        PaginationComponent,
        SearchComponent,
        TransitionElementDirective,
        SpecialityConverterPipe,
        TimeConverterPipe,
        StatusConverterPipe,
        DoctorActiveConverterPipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMenuModule,
        MatSliderModule,
        MatTooltipModule,
        MatRadioModule,
        MatAutocompleteModule,
        SecondNavComponent,
        LoadingOverlayComponent,
        FloatingButtonComponent,
        AvatarComponent,
        PaginationComponent,
        SearchComponent,
        TransitionElementDirective,
        SpecialityConverterPipe,
        TimeConverterPipe,
        StatusConverterPipe,
        DoctorActiveConverterPipe
    ]
})
export class SharedModule { }
