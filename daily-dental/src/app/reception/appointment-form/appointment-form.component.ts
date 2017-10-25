import { 
    Component,
    OnInit,
    OnDestroy,
    Inject } from '@angular/core';
import {
    MdDialogRef,
    MD_DIALOG_DATA,
    MdSnackBar } from '@angular/material';

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
    receptionDataDay: number;

    constructor(
        private modalDialogRef: MdDialogRef<AppointmentFormComponent>,
        private snackBar: MdSnackBar,
        private appointmentService: AppointmentService,
        private appointmentStatusService: AppointmentStatusService,
        private appointmentHoursService: AppointmentHoursService,
        private doctorService: DoctorService,
        private manipulationService: ManipulationService,
        private patientService: PatientService,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.todayDate = 0;
        this.receptionDataDay = 0;
        this.snackbarConfig = new SnackbarConfig();
        this.appointment = new Appointment(new Date, 8, undefined, { firstName: '', lastName: '', phone: '' }, '', [{ name: '', price: undefined }], 'confirmed', '');
        this.getAllDoctors();
        this.getAllHours();
        this.getAllManipulations();
        this.getAllPatients();
        this.getAllStatuses();

        if (this.data.receptionData) {
            this.appointment.date = this.data.receptionData;
            this.todayDate = new Date().getDate();
            this.receptionDataDay = this.data.receptionData.getDate();
        }
        if (this.data.activeDoctor) {
            this.appointment.doctor = this.data.activeDoctor;
        }
        if (this.data.appointmentId) {
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
            this.getDuration();
        });
    }

    getAppointmentByDate(): void {
        this.appointmentService.getAppointmentByDate(this.appointment.date)
        .subscribe(response => {
            this.doctors = response;
        })
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
        });
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

    save(): void {
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

    selectPatient(optionValue, selectedValue) {
        return optionValue._id === selectedValue._id;
    }

    selectManipulation(optionValue, selectedValue) {
        return optionValue._id === selectedValue._id;
    }

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
