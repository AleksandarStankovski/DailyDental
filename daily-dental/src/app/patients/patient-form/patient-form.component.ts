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
import { Doctor } from '../../shared/models/doctor.model';
import { DoctorService } from '../../about-us/staff/doctor/doctor.service';

@Component({
    selector: 'app-patient-form',
    templateUrl: './patient-form.component.html',
    styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

    patient: Patient;
    doctors: Doctor[];
    snackbarConfig: SnackbarConfig
    loadingOverlay: boolean;

    constructor(
        private modalDialogRef: MdDialogRef<PatientFormComponent>,
        private patientService: PatientService,
        private doctorService: DoctorService,
        private snackBar: MdSnackBar,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.patient = new Patient('', '', '', '', '', {});
        this.snackbarConfig = new SnackbarConfig();
        this.getAllDoctors();
        if (this.data.patientId) {
            this.getPatient();
        }
    }

    getPatient(): void {
        this.patientService.getPatient(this.data.patientId)
        .subscribe(resolve => {
            this.patient = resolve;
        });
    }

    getAllDoctors(): void {
        this.doctorService.getAllDoctors()
        .subscribe(response => {
            this.doctors = response;
        });
    }

    save(): void {
        this.loadingOverlay = true;
        if (this.data.patientId) {
            this.patientService.editPatient(this.patient)
            .subscribe(response => {
                const snackBarRef = this.snackBar.open('Данните бяха запазени успешно', '', {
                    duration: this.snackbarConfig.duration
                });
                setTimeout(() => {
                    this.modalDialogRef.close('Edit');
                }, this.snackbarConfig.duration);
            }, error => {
                const snackBarRef = this.snackBar.open('Моля, опитайте отново', '', {
                    duration: this.snackbarConfig.duration
                });
                setTimeout(() => {
                    this.loadingOverlay = false;
                }, this.snackbarConfig.duration);
                throw new Error(error);
            })
        } else {
            this.patientService.createPatient(this.patient)
            .subscribe(
                response => {
                    const snackBarRef = this.snackBar.open('Данните бяха запазени успешно', '', {
                        duration: this.snackbarConfig.duration
                    });
                    setTimeout(() => {
                        this.modalDialogRef.close('Create');
                    }, this.snackbarConfig.duration);
                }, 
                error => {
                    const snackBarRef = this.snackBar.open('Моля, опитайте отново', '', {
                        duration: this.snackbarConfig.duration
                    });
                    setTimeout(() => {
                        this.loadingOverlay = false;
                    }, this.snackbarConfig.duration);
                    throw new Error(error);
                }
            )
        }
    }

    delete(): void {
        this.loadingOverlay = true;
        this.patientService.deletePatient(this.patient._id)
        .subscribe(
            response => {
                const snackBarRef = this.snackBar.open('Данните бяха изтрити успешно', '', {
                    duration: this.snackbarConfig.duration
                });
                setTimeout(() => {
                    this.modalDialogRef.close('Delete');
                }, this.snackbarConfig.duration);
            },
            error => {
                const snackBarRef = this.snackBar.open('Моля, опитайте отново', '', {
                    duration: this.snackbarConfig.duration
                });
                setTimeout(() => {
                    this.loadingOverlay = false;
                }, this.snackbarConfig.duration);
                throw new Error(error);
            }
        );
    }

}
