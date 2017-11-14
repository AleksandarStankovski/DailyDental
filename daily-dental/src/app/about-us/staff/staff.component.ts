import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { Doctor } from '../../shared/models/doctor.model';
import { DoctorService } from './doctor/doctor.service';
import { UserService } from '../../core/user.service';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';

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
        private activatedRoute: ActivatedRoute,
        private modalDialog: MatDialog,
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
        this.getAllDoctorsFromResolve();
    }

    getAllDoctorsFromResolve(): void {
        this.doctors = this.activatedRoute.snapshot.data['doctors'];
        this.toggleTutorialText();
    }

    getAllDoctors(): void {
        this.doctorService.getAllDoctors()
        .subscribe(response => {
            this.doctors = response;
            this.toggleTutorialText();
        });
    }

    toggleTutorialText(): void {
        if (this.doctors.length === 0) {
            this.tutorialText = 'Кликнете тук за да създадете лекар';
        } else {
            this.tutorialText = undefined;
        }
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
