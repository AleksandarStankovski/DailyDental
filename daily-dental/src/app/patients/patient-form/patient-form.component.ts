import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { regex } from '../../shared/const/regex.const'; 
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
    loadingOverlay: boolean;
    regexEmail = regex.email;

    constructor(
        private modalDialogRef: MatDialogRef<PatientFormComponent>,
        private patientService: PatientService,
        private doctorService: DoctorService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.patient = new Patient('', '', '', '', '', '', { _id: ''});
        this.getAllDoctors();
        if (this.data.patientId) {
            this.getPatient();
        }
    }

    getPatient(): void {
        this.patientService.getPatient(this.data.patientId)
        .subscribe(resolve => {
            this.patient = resolve;
            if (!this.patient.doctor) {
                this.patient.doctor = {
                    _id: ''
                }
            }
        });
    }

    getAllDoctors(): void {
        this.doctorService.getAllDoctors()
        .subscribe(response => {
            this.doctors = response;
        });
    }

    toggleLoadingOverlay(loadingOverlay: boolean): void {
        this.loadingOverlay = loadingOverlay;
    }

    modalClose(type: string): void {
        this.modalDialogRef.close(type);
    }

}
