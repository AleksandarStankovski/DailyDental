import {
    Component,
    OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { Doctor } from '../../shared/models/doctor.model';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { DoctorService } from './doctor/doctor.service';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

    doctors: Doctor[];
    modalConfig: ModalConfig;
    tutorialText: string;
    isAdmin: boolean;

    constructor(
        private modalDialog: MdDialog,
        private doctorService: DoctorService,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.isAdminCheck();
    }

    isAdminCheck(): void {
        this.authenticationService.isAdmin()
        .subscribe(response => {
            this.isAdmin = response;
        });
        this.getAllDoctors();
    }

    getAllDoctors(): void {
        this.doctorService.getAllDoctors()
        .subscribe(response => {
            this.doctors = response;
            if (this.doctors.length === 0) {
                this.tutorialText = 'Кликнете тук за да създадете лекар';
            } else {
                this.tutorialText = undefined;
            }
        });
    }

    openModalDialog(doctorId?: string): void {
        const id = doctorId || undefined;
        const modalDialogRef = this.modalDialog.open(DoctorFormComponent, {
            width: this.modalConfig.width,
            data: { doctorId: id },
            panelClass: 'loading-overlay-container'
        });
        modalDialogRef.afterClosed()
        .subscribe(result => {
            this.getAllDoctors();
        })
    }

    addDoctor(): void {
        this.openModalDialog();
    }

    editDoctor(doctorId: string): void {
        this.openModalDialog(doctorId);
    }
}
