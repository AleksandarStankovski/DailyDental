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
    MatAutocompleteModule,
    MatExpansionModule } from '@angular/material';

import { SecondNavComponent } from './second-nav/second-nav.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ModalActionComponent } from './modal-action/modal-action.component';
import { PatientFormComponent } from '../patients/patient-form/patient-form.component';
import { TransitionElementDirective } from './transition-element.directive';
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
        MatAutocompleteModule,
        MatExpansionModule
    ],
    declarations: [
        SecondNavComponent,
        LoadingOverlayComponent,
        FloatingButtonComponent,
        AvatarComponent,
        PaginationComponent,
        SearchComponent,
        ModalActionComponent,
        PatientFormComponent,
        TransitionElementDirective,
        DoctorActiveConverterPipe
    ],
    entryComponents: [
        PatientFormComponent
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
        MatExpansionModule,
        SecondNavComponent,
        LoadingOverlayComponent,
        FloatingButtonComponent,
        AvatarComponent,
        PaginationComponent,
        SearchComponent,
        ModalActionComponent,
        PatientFormComponent,
        TransitionElementDirective,
        DoctorActiveConverterPipe
    ]
})
export class SharedModule { }
