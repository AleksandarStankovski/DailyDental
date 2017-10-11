import {
    Component,
    OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ModalConfig } from '../shared/models/modal-config.model';
import { Doctor } from '../shared/models/doctor.model';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentService } from './appointment/appointment.service';

@Component({
    selector: 'app-reception',
    templateUrl: './reception.component.html',
    styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

    modalConfig: ModalConfig;
    doctors: Doctor[];
    receptionData: Date;

    constructor(
        private modalDialog: MdDialog,
        private appointmentService: AppointmentService) { }

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        let newDate = new Date().setHours(13, 0, 0, 0);
        this.receptionData = new Date(newDate);
        this.getAppointmentByDate();
    }

    getAppointmentByDate(): void {
        this.appointmentService.getAppointmentByDate(this.receptionData)
        .subscribe(response => {
            this.doctors = response;
        })
    }

    openModalDialog(appointmentId?: string, receptionData?: Date, doctorId?: string, startTime?: number): void {
        const appointment = appointmentId;
        const date = receptionData;
        const doctor = doctorId;
        const start = startTime;
        const modalDialogRef = this.modalDialog.open(AppointmentFormComponent, {
            data: { appointmentId: appointment, receptionData: date, doctorId: doctor, startTime: start },
            width: this.modalConfig.width,
            panelClass: 'loading-overlay-container'
        });
        modalDialogRef.afterClosed()
        .subscribe(result => {
            this.getAppointmentByDate();
        })
    }

    addAppointment(doctorId?: string, startTime?: number): void {
        this.openModalDialog(undefined, this.receptionData, doctorId, startTime);
    }

    editAppointment(appointmentId): void {
        this.openModalDialog(appointmentId);
    }

    changeDate(value): void {
        let newDate = new Date(value).setHours(13, 0, 0, 0);
        this.receptionData =  new Date(newDate);
        this.getAppointmentByDate();
    }

}
