import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalConfig } from '../shared/models/modal-config.model';
import { Doctor } from '../shared/models/doctor.model';
import { User } from '../shared/models/user.model';
import { Appointment } from '../shared/models/appointment.model';
import { UserService } from '../core/user.service';
import { AppointmentService } from './appointment/appointment.service';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

@Component({
    selector: 'app-reception',
    templateUrl: './reception.component.html',
    styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

    modalConfig: ModalConfig;
    doctors: Doctor[];
    receptionDate: Date;
    todayDate: number;
    receptionDateDay: number;
    appointments: Appointment[];
    tutorialText: string;
    activeDoctor: string;
    user: User;

    constructor(
        private modalDialog: MatDialog,
        private appointmentService: AppointmentService,
        private userService: UserService) { }

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        const newDate = new Date().setHours(13, 0, 0, 0);
        this.todayDate = new Date().getDate();
        this.receptionDate = new Date(newDate);
        this.receptionDateDay = this.receptionDate.getDate();
        this.getUser();
    }

    getUser(): void {
        this.userService.getUser()
        .subscribe(response => {
            this.user = response;
            this.getAppointmentByDate();
        })
    }

    getAppointmentByDate(): void {
        this.appointmentService.getAppointmentByDate(this.receptionDate)
        .subscribe(response => {
            this.doctors = response;
            if (this.doctors.length > 1) {
                if (!this.activeDoctor) {
                    if (this.user.role === 'reception') {
                        this.activeDoctor = this.doctors[1]._id;
                    } else {
                        this.activeDoctor = this.user._id;
                    }
                }
                this.getAppointmentByDoctor(this.activeDoctor, true);
            }
        })
    }

    getAppointmentByDoctor(doctorId: string, reload: boolean): void {
        if ((this.activeDoctor !== doctorId) || ((this.activeDoctor === doctorId) && reload)) {
            this.activeDoctor = doctorId;
            this.doctors.forEach(doctor => {
                if (doctor._id === doctorId) {
                    this.appointments = doctor.appointments;
                    if (this.appointments.length === 0) {
                        this.tutorialText = 'Кликнете тук за да запишете час';
                    } else {
                        this.tutorialText = undefined;
                    }
                }
            })
        }
    }

    openModalDialog(appointmentId?: string, receptionDate?: Date, activeDoctor?: string): void {
        const appointment = appointmentId;
        const date = receptionDate;
        const doctor = activeDoctor;
        const modalDialogRef = this.modalDialog.open(AppointmentFormComponent, {
            data: { appointmentId: appointment, receptionDate: date, activeDoctor: doctor },
            width: this.modalConfig.width,
            panelClass: 'loading-overlay-container'
        });
        modalDialogRef.afterClosed()
        .subscribe(result => {
            this.getAppointmentByDate();
        })
    }

    addAppointment(): void {
        this.openModalDialog(undefined, this.receptionDate, this.activeDoctor);
    }

    editAppointment(appointmentId): void {
        this.openModalDialog(appointmentId);
    }

    changeDate(value): void {
        const newDate = new Date(value).setHours(13, 0, 0, 0);
        this.receptionDate =  new Date(newDate);
        this.receptionDateDay = this.receptionDate.getDate();
        this.getAppointmentByDate();
    }

}
