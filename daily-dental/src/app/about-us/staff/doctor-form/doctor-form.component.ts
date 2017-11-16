import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { regex } from '../../../shared/const/regex.const';
import { Speciality } from '../../../shared/models/speciality.model';
import { SnackbarConfig } from '../../../shared/models/snackbar-config-model';
import { Doctor } from '../../../shared/models/doctor.model';
import { User } from '../../../shared/models/user.model';
import { DoctorService } from '../doctor/doctor.service';
import { SpecialityService } from '../../../core/speciality.service';
import { UserService } from '../../../core/user.service';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent implements OnInit {

    doctor: Doctor;
    snackbarConfig: SnackbarConfig;
    loadingOverlay: boolean;
    specialities: Speciality[];
    showPassword: boolean;
    showPasswordText: string;
    user: User;
    isRoleReception: boolean;
    regexEmail = regex.email;

    constructor(
        private modalDialogRef: MatDialogRef<DoctorFormComponent>,
        private snackBar: MatSnackBar,
        private doctorService: DoctorService,
        private specialityService: SpecialityService,
        private userService: UserService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.showPassword = true;
        this.doctor = new Doctor('', '', '', '', '', true, '', '' , '', '');
        this.snackbarConfig = new SnackbarConfig();
        this.getAllSpecialities();
        this.getUser();
        if (this.data.doctorId) {
            this.showPassword = false;
            this.getDoctor();
        }
        this.passwordTextToggle(this.showPassword);
    }

    getUser(): void {
        this.userService.getUser()
        .subscribe(response => {
            this.user = response;
        })
    }

    getDoctor(): void {
        this.doctorService.getDoctor(this.data.doctorId)
        .subscribe(response => {
            this.doctor = response;
            this.isRoleReception = this.doctor.role === 'reception';
        });
    }

    getAllSpecialities(): void {
        this.specialities = this.specialityService.getAllSpecialities();
    }

    slideToggle(event): void {
        this.doctor.active = event.checked;
    }

    passwordToggle(): void {
        this.showPassword = !this.showPassword;
        this.passwordTextToggle(this.showPassword);
    }

    passwordTextToggle(showPassword: boolean): void {
        if (this.showPassword) {
            this.showPasswordText = 'Скрий поле за парола';
        } else {
            this.showPasswordText = 'Покажи поле за парола';
        }
    }

    toggleLoadingOverlay(loadingOverlay: boolean): void {
        this.loadingOverlay = loadingOverlay;
    }

    modalClose(type: string): void {
        this.modalDialogRef.close(type);
        if (type === 'Edit') {
            if (this.user._id === this.doctor._id) {
                window.location.reload();
            }
        }
    }

}
