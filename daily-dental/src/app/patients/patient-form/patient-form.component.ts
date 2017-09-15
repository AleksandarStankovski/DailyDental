import {
    Component,
    OnInit,
    Inject } from '@angular/core';
import {
    MdDialogRef,
    MD_DIALOG_DATA,
    MdSnackBar } from '@angular/material';

import { SnackbarConfig } from '../../shared/models/snackbar-config-model';
import { Patient } from '../../shared/models/patient.model';
import { PatientService } from '../patient/patient.service';

@Component({
    selector: 'app-patient-form',
    templateUrl: './patient-form.component.html',
    styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

    patient: Patient;
    snackbarConfig: SnackbarConfig
    loadingOverlay: boolean;

    constructor(
        private modalDialogRef: MdDialogRef<PatientFormComponent>,
        private patientService: PatientService,
        private snackBar: MdSnackBar,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.snackbarConfig = new SnackbarConfig();
        this.patient = new Patient('', '', '', '', '', '');
        if (this.data.patientId) {
            this.getPatient();
        }
    }

    getPatient(): void {
        this.patientService.getPatient(this.data.patientId)
        .subscribe(resolve => {
            this.patient = resolve;
        })
    }

    save(): void {
        this.loadingOverlay = true;
        if (this.data.patientId) {
            this.patientService.editPatient(this.patient)
            .subscribe(resolve => {
                const snackBarRef = this.snackBar.open('Данниете бяха запазени успешно', '', {
                    duration: this.snackbarConfig.duration
                });
                setTimeout(() => {
                    this.modalDialogRef.close('Edit');
                }, this.snackbarConfig.duration);
            })
        } else {
            this.patientService.createPatient(this.patient)
            .subscribe(resolve => {
                this.modalDialogRef.close('Create');
            })
        }
    }

    delete(): void {
        this.patientService.editPatient(this.patient)
        .subscribe(resolve => {
            this.modalDialogRef.close('Delete');
        })
    }

}
