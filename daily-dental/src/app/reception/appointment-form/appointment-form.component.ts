import { 
    Component,
    OnInit,
    OnDestroy,
    Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatSnackBar } from '@angular/material';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { SnackbarConfig } from '../../shared/models/snackbar-config-model';
import { Appointment } from '../../shared/models/appointment.model';
import { AppointmentService } from '../appointment/appointment.service';
import { AppointmentStatusService } from './appointment-status.service';
import { AppointmentHoursService } from './appointment-hours.service';
import { Doctor } from '../../shared/models/doctor.model';
import { Manipulation } from '../../shared/models/manipulation.model';
import { Patient } from '../../shared/models/patient.model';
import { DoctorService } from '../../about-us/staff/doctor/doctor.service';
import { ManipulationService } from '../../about-us/price-list/manipulation/manipulation.service';
import { PatientService } from '../../patients/patient/patient.service';

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
    manipulations: Manipulation[];
    patients: Patient[];
    statuses: { type: string, name: string }[];
    hours: { name: string, value: number }[];
    durationHours;
    todayDate: number;
    appointmentDataDay: number;
    isValidPatient: boolean;

    myControl: FormControl = new FormControl();
    filteredPatients: Observable<any[]>;

    constructor(
        private modalDialogRef: MatDialogRef<AppointmentFormComponent>,
        private snackBar: MatSnackBar,
        private appointmentService: AppointmentService,
        private appointmentStatusService: AppointmentStatusService,
        private appointmentHoursService: AppointmentHoursService,
        private doctorService: DoctorService,
        private manipulationService: ManipulationService,
        private patientService: PatientService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.todayDate = 0;
        this.appointmentDataDay = 0;
        this.snackbarConfig = new SnackbarConfig();
        this.appointment = new Appointment(new Date, 8, undefined, {}, '', [], 'confirmed', '');
        this.getAllDoctors();
        this.getAllHours();
        this.getAllManipulations();
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

    getAllManipulations(): void {
        this.manipulationService.getAllManipulations()
        .subscribe(response => {
            this.manipulations = response;
            if (this.manipulations.length === 0) {
                const snackBarRef = this.snackBar.open('Моля, преди да запишете час, създайте манипулация и пациент');
            }
        });
    }

    getAllPatients(): void {
        this.patientService.getAllPatients()
        .subscribe(response => {
            this.patients = response;
            if (this.patients.length === 0) {
                const snackBarRef = this.snackBar.open('Моля, преди да запишете час, създайте пациент и манипулация');
            }
            this.filteredPatients = this.myControl.valueChanges
                .startWith(null)
                .map(patient => patient && typeof patient === 'object' ? patient.lastName : patient)
                .map(lastName => lastName ? this.filter(lastName) : this.patients.slice());
        });
    }

    filter(lastName: string): any[] {
        return this.patients.filter(patient => patient.lastName.toLowerCase().indexOf(lastName.toLowerCase()) === 0);
    }

    checkValidPatient(patient): void {
        this.isValidPatient = !!patient.firstName;
    }

    displayPatient(patient: Patient) {
        return patient ? patient.lastName : patient;
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

    selectManipulation(optionValue, selectedValue) {
        return optionValue._id === selectedValue._id;
    }

    save(): void {
        if (this.isValidPatient) {
            this.loadingOverlay = true;
            if (this.data.appointmentId) {
                this.appointmentService.editAppointment(this.appointment)
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
                this.appointmentService.createAppointment(this.appointment)
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
    }

    delete(): void {
        this.loadingOverlay = true;
        this.appointmentService.deleteAppointment(this.appointment._id)
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

    // selectPatient(optionValue, selectedValue) {
    //     return optionValue._id === selectedValue._id;
    // }

    // getAppointmentByDate(): void {
    //     this.appointmentService.getAppointmentByDate(this.appointment.date)
    //     .subscribe(response => {
    //         this.doctors = response;
    //     })
    // }

    // hoursFilter() {
    //     let selectedDoctor;
    //     let arr = [];
    //     let newHours = this.getHours();
        
    //     this.doctors.forEach(doctor => {
    //         if (doctor._id === this.appointment.doctor) {
    //             doctor.appointments.forEach((appointment:any) => {
    //                 let sum = appointment.startTime + appointment.duration;
    //                 for(let i = appointment.startTime; i <= sum; i++) {
    //                     arr.push(i);
    //                 }
    //             })
                
    //         }
    //     })
    //     if (arr.length > 0) {
    //         newHours.forEach((x, index) => {
    //             console.log(newHours)
    //             arr.forEach(y => {
    //                 if (x.value == y) {
    //                     this.hours.splice(index, 1)
    //                 }
    //             })
    //         })
    //     }
    // }

}
