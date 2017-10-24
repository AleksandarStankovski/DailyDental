import {
    Component,
    OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { Doctor } from '../../shared/models/doctor.model';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { DoctorService } from './doctor/doctor.service';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

    doctors: Doctor[];
    modalConfig: ModalConfig;
    tutorialText: string;
    isRoleUser: boolean;

    constructor(
        private modalDialog: MdDialog,
        private doctorService: DoctorService,
        private userService: UserService) {}

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.isRoleUserCheck();
    }

    isRoleUserCheck(): void {
        this.userService.isRoleUser()
        .subscribe(response => {
            this.isRoleUser = response;
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
        const id = doctorId;
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
