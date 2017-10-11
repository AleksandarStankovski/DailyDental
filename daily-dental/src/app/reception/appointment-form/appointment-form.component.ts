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
    hours;
    durationHours;

    constructor(
        private modalDialogRef: MdDialogRef<AppointmentFormComponent>,
        private snackBar: MdSnackBar,
        private appointmentService: AppointmentService,
        private doctorService: DoctorService,
        private manipulationService: ManipulationService,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.snackbarConfig = new SnackbarConfig();
        this.appointment = new Appointment(new Date, 8, undefined, '', '', '', '', [], '');
        if (this.data.receptionData) {
            this.appointment.date = this.data.receptionData;
        }
        if (this.data.doctorId) {
            this.appointment.doctor = this.data.doctorId;
        }
        if (this.data.startTime) {
            this.appointment.startTime = this.data.startTime;
        }
        if (this.data.appointmentId) {
            this.getAppointment();
        } else {
            this.getDuration();
        }

        this.getAllDoctors();
        this.getAllManipulations();
        this.getHours();
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

    getAllDoctors(): void {
        this.doctorService.getAllDoctors()
        .subscribe(response => {
            this.doctors = response;
        });
    }

    getAllManipulations(): void {
        this.manipulationService.getAllManipulations()
        .subscribe(response => {
            this.manipulations = response;
        });
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

    getDuration(): number[]{
        let hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.durationHours = hours.filter(x => x <= (20 - this.appointment.startTime));
        return this.durationHours;
    }

    durationFilter(): void {
        this.appointment.duration = undefined;
        this.getDuration();
    }

    getHours(): [{}] {
        this.hours = [
            {
                name: '08:00',
                value: 8
            },
            {
                name: '09:00',
                value: 9
            },
            {
                name: '10:00',
                value: 10
            },
            {
                name: '11:00',
                value: 11
            },
            {
                name: '12:00',
                value: 12
            },
            {
                name: '13:00',
                value: 13
            },
            {
                name: '14:00',
                value: 14
            },
            {
                name: '15:00',
                value: 15
            },
            {
                name: '16:00',
                value: 16
            },
            {
                name: '17:00',
                value: 17
            },
            {
                name: '18:00',
                value: 18
            },
            {
                name: '19:00',
                value: 19
            }
        ]
        return this.hours;
    }

}
