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

    constructor(
        private modalDialogRef: MdDialogRef<AppointmentFormComponent>,
        private snackBar: MdSnackBar,
        private appointmentService: AppointmentService,
        private doctorService: DoctorService,
        private manipulationService: ManipulationService,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.snackbarConfig = new SnackbarConfig();
        this.appointment = new Appointment(new Date, 8, 9, '', '', '', '', []);
        this.getAllDoctors();
        this.getAllManipulations();
        this.getHours();
        if (this.data.appointmentId) {
            this.getAppointment();
        }
    }

    getAppointment(): void {
        this.appointmentService.getAppointment(this.data.appointmentId)
        .subscribe(resolve => {
            console.log(typeof(resolve.date))
            this.appointment = resolve;
            
        });
    }

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

    changeDate(date): void{
        this.appointment.date = date;
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

    getHours() {
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
            },
            {
                name: '20:00',
                value: 20
            }
        ]
        return this.hours;
    }

}
