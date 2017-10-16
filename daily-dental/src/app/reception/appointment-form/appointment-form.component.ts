import { 
    Component,
    OnInit,
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
import { DoctorService } from '../../about-us/staff/doctor/doctor.service';
import { ManipulationService } from '../../about-us/price-list/manipulation/manipulation.service';

@Component({
    selector: 'app-appointment-form',
    templateUrl: './appointment-form.component.html',
    styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

    snackbarConfig: SnackbarConfig
    loadingOverlay: boolean;
    appointment: Appointment;
    doctors: Doctor[];
    manipulations: Manipulation[];
    statuses: { type: string, name: string }[];
    hours: { name: string, value: number }[];
    durationHours;

    constructor(
        private modalDialogRef: MdDialogRef<AppointmentFormComponent>,
        private snackBar: MdSnackBar,
        private appointmentService: AppointmentService,
        private appointmentStatusService: AppointmentStatusService,
        private appointmentHoursService: AppointmentHoursService,
        private doctorService: DoctorService,
        private manipulationService: ManipulationService,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.snackbarConfig = new SnackbarConfig();
        this.appointment = new Appointment(new Date, 8, undefined, { firstName: '', lastName: '', phone: ''}, '', [], 'confirmed', '');
        this.getAllDoctors();
        this.getAllHours();
        this.getAllManipulations();
        this.getAllStatuses();

        if (this.data.receptionData) {
            this.appointment.date = this.data.receptionData;
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
