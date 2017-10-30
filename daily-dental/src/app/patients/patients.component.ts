import {
    Component,
    OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalConfig } from '../shared/models/modal-config.model';
import { Patient } from '../shared/models/patient.model';
import { PaginationConfig } from '../shared/models/pagination-config-model';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientService } from './patient/patient.service';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

    patients: Patient[];
    modalConfig: ModalConfig;
    tutorialText: string;
    paginationConfig: PaginationConfig;
    showPaginaion: boolean;

    constructor(
        private modalDialog: MatDialog,
        private patientService: PatientService) { }

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.paginationConfig = new PaginationConfig();
        this.getPatientsByPage();
    }

    getPatientsByPage(newPaginationConfig?: PaginationConfig) {
        if (newPaginationConfig) {
            this.paginationConfig = newPaginationConfig;
        } 
        this.patientService.getPatientsByPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage)
        .subscribe(response => {
            this.patients = response.patients;
            this.showPaginaion = response.patientsLength > this.paginationConfig.itemsPerPage
            this.paginationConfig.countPage = response.countPage;
            if (this.patients.length === 0) {
                this.tutorialText = 'Кликнете тук за да създадете манипулация';
            } else {
                this.tutorialText = undefined;
            }
        })
    }

    openModalDialog(patientId?: string): void {
        const id = patientId;
        const modalDialogRef = this.modalDialog.open(PatientFormComponent, {
            data: { patientId: id },
            width: this.modalConfig.width,
            panelClass: 'loading-overlay-container'
        });
        modalDialogRef.afterClosed()
        .subscribe(result => {
            this.getPatientsByPage();
        })
    }

    addPatient(): void {
        this.openModalDialog();
    }

    editPatient(patientId: string): void {
        this.openModalDialog(patientId);
    }

    search(searchText: string) {
        if (typeof searchText !== "undefined") {
            if (searchText.length === 0) {
                this.getPatientsByPage();
            } else {
                this.patientService.getFilteredPatients(searchText)
                .subscribe(response => {
                    this.patients = response;
                    this.showPaginaion = false;
                }) 
            }
        }
    }

}

    // getAllPatients(): void {
    //     this.patientService.getAllPatients()
    //     .subscribe(response => {
    //         this.patients = response;
    //         if (this.patients.length === 0) {
    //             this.tutorialText = 'Кликнете тук за да създадете пациент';
    //         } else {
    //             this.tutorialText = undefined;
    //         }
    //     })
    // }
