import {
    Component,
    OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ModalConfig } from '../shared/models/modal-config.model';
import { Appointment } from '../shared/models/appointment.model';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentService } from './appointment/appointment.service';

@Component({
    selector: 'app-reception',
    templateUrl: './reception.component.html',
    styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

    modalConfig: ModalConfig;
    appointments: Appointment[];
    receptionData: Date;

    constructor(
        private modalDialog: MdDialog,
        private appointmentService: AppointmentService) { }

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.receptionData = new Date();
        this.getAllAppointments();
    }

    getAllAppointments(): void {
        this.appointmentService.getAllAppointments()
        .subscribe(response => {
            this.appointments = response;
        })
    }

    openModalDialog(appointmentId?: string): void {
        const id = appointmentId || undefined;
        const modalDialogRef = this.modalDialog.open(AppointmentFormComponent, {
            data: { appointmentId: id },
            width: this.modalConfig.width,
            panelClass: 'loading-overlay-container'
        });
        modalDialogRef.afterClosed()
        .subscribe(result => {
            this.getAllAppointments();
        })
    }

    addAppointment(): void {
        this.openModalDialog();
    }

    editAppointment(appointmentId): void {
        this.openModalDialog(appointmentId);
    }

    changeDate(value): void {
        this.receptionData = value;
    }

}
