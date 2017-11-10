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
    receptionData: Date;
    todayDate: number;
    receptionDataDay: number;
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
        let newDate = new Date().setHours(13, 0, 0, 0);
        this.todayDate = new Date().getDate();
        this.receptionData = new Date(newDate);
        this.receptionDataDay = this.receptionData.getDate();
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
        this.appointmentService.getAppointmentByDate(this.receptionData)
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

    openModalDialog(appointmentId?: string, receptionData?: Date, activeDoctor?: string): void {
        const appointment = appointmentId;
        const date = receptionData;
        const doctor = activeDoctor;
        const modalDialogRef = this.modalDialog.open(AppointmentFormComponent, {
            data: { appointmentId: appointment, receptionData: date, activeDoctor: doctor },
            width: this.modalConfig.width,
            panelClass: 'loading-overlay-container'
        });
        modalDialogRef.afterClosed()
        .subscribe(result => {
            this.getAppointmentByDate();
        })
    }

    addAppointment(): void {
        this.openModalDialog(undefined, this.receptionData, this.activeDoctor);
    }

    editAppointment(appointmentId): void {
        this.openModalDialog(appointmentId);
    }

    changeDate(value): void {
        let newDate = new Date(value).setHours(13, 0, 0, 0);
        this.receptionData =  new Date(newDate);
        this.receptionDataDay = this.receptionData.getDate();
        this.getAppointmentByDate();
    }

}
