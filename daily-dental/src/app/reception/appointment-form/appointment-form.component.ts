import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { SnackbarConfig } from '../../shared/models/snackbar-config-model';
import { Appointment } from '../../shared/models/appointment.model';
import { Doctor } from '../../shared/models/doctor.model';
import { Patient } from '../../shared/models/patient.model';
import { AppointmentService } from '../appointment/appointment.service';
import { AppointmentStatusService } from './appointment-status.service';
import { AppointmentHoursService } from './appointment-hours.service';
import { PatientService } from '../../patients/patient/patient.service';
import { DoctorService } from '../../about-us/staff/doctor/doctor.service';
import { PatientFormComponent } from "../../patients/patient-form/patient-form.component";

@Component({
    selector: 'app-appointment-form',
    templateUrl: './appointment-form.component.html',
    styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit, OnDestroy {

    snackbarConfig: SnackbarConfig
    loadingOverlay: boolean;
    appointment: Appointment;
    doctors: Doctor[];
    patients: Patient[];
    statuses: { type: string, name: string }[];
    hours: { name: string, value: number }[];
    durationHours;
    todayDate: number;
    appointmentDataDay: number;
    isValidPatient: boolean;
    myControl: FormControl = new FormControl();
    filteredPatients: Observable<any[]>;
    modalConfig: ModalConfig;

    constructor(
        private modalDialog: MatDialog,
        private modalDialogRef: MatDialogRef<AppointmentFormComponent>,
        private snackBar: MatSnackBar,
        private appointmentService: AppointmentService,
        private appointmentStatusService: AppointmentStatusService,
        private appointmentHoursService: AppointmentHoursService,
        private doctorService: DoctorService,
        private patientService: PatientService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.todayDate = 0;
        this.appointmentDataDay = 0;
        this.modalConfig = new ModalConfig();
        this.snackbarConfig = new SnackbarConfig();
        this.appointment = new Appointment(new Date, 8, undefined, {}, '', [], 'confirmed', '');
        this.getAllDoctors();
        this.getAllHours();
        this.getAllPatients();
        this.getAllStatuses();

        if (this.data.receptionData) {
            this.appointment.date = this.data.receptionData; 
        }
        if (this.data.activeDoctor) {
            this.appointment.doctor = this.data.activeDoctor;
        }
        if (this.data.appointmentId) {
            this.todayDate = new Date().getDate();
            this.getAppointment();
        } else {
            this.getDuration();
        }   
    }

    ngOnDestroy() {
        this.snackBar.dismiss();
    }

    getAppointment(): void {
        this.appointmentService.getAppointment(this.data.appointmentId)
        .subscribe(resolve => {
            this.appointment = resolve;  
            this.appointmentDataDay = new Date(this.appointment.date).getDate();
            this.getDuration();
        });
    }

    getAllDoctors(): void {
        this.doctorService.getAllDoctors()
        .subscribe(response => {
            this.doctors = response;
        });
    }

    getAllHours(): void {
        this.hours = this.appointmentHoursService.getAllHours();
    }

    getAllPatients(): void {
        this.patientService.getAllPatients()
        .subscribe(response => {
            this.patients = response;
            if (this.patients.length === 0) {
                const snackBarRef = this.snackBar.open('Моля, преди да запишете час създайте пациент');
            }
            this.filteredPatients = this.myControl.valueChanges
                .startWith(null)
                .map(patient => patient && typeof patient === 'object' ? patient.firstName : patient)
                .map(firstName => firstName ? this.filter(firstName) : this.patients.slice());
        });
    }

    filter(firstName: string): any[] {
        return this.patients.filter(patient => patient.firstName.toLowerCase().indexOf(firstName.toLowerCase()) === 0);
    }

    displayPatient(patient: Patient) {
        let concatNames;
        if (patient && patient.firstName) {
            if (patient.middleName) {
                concatNames = patient.firstName + ' ' + patient.middleName + ' ' + patient.lastName;
            } else {
                concatNames = patient.firstName + ' ' + patient.lastName;
            }
            
        }
        return concatNames;
    }

    checkValidPatient(patient): void {
        this.isValidPatient = !!patient.firstName;
    }

    getAllStatuses(): void {
        this.statuses = this.appointmentStatusService.getAllStatuses();
    }

    getDuration(): number[]{
        let duration = [];
        let lastHour = this.hours[this.hours.length - 1].value + 1;
        for (let i = 1; i <= this.hours.length; i++) {
            duration.push(i);
        }
        this.durationHours = duration.filter(x => x <= (lastHour - this.appointment.startTime));
        return this.durationHours;
    }

    durationFilter(): void {
        this.appointment.duration = undefined;
        this.getDuration();
    }

    toggleLoadingOverlay(loadingOverlay: boolean): void {
        this.loadingOverlay = loadingOverlay;
    }

    modalClose(type: string): void {
        this.modalDialogRef.close(type);
    }

    openModalDialog(patientId?: string): void {
        const id = patientId;
        const modalDialogRefPatient = this.modalDialog.open(PatientFormComponent, {
            data: { patientId: id },
            width: this.modalConfig.width,
            panelClass: 'loading-overlay-container'
        });
        modalDialogRefPatient.afterClosed()
        .subscribe(result => {
            this.getAllPatients();
        })
    }

}
