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
        this.doctor = new Doctor('', '', '', '', '', true, '', '' ,'', '');
        this.snackbarConfig = new SnackbarConfig();
        this.getAllSpecialities();
        this.getUser();
        if (this.data.doctorId) {
            this.showPassword = false;
            this.getDoctor();
        }
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

    save(): void {
        let errorMsg = 'Моля, опитайте отново';
        this.loadingOverlay = true;
        if (this.data.doctorId) {
            this.doctorService.editDoctor(this.doctor)
            .subscribe(
                response => {
                    const snackBarRef = this.snackBar.open('Данните бяха запазени успешно', '', {
                        duration: this.snackbarConfig.duration
                    });
                    setTimeout(() => {
                        this.modalDialogRef.close('Edit');
                        if (this.user._id === this.doctor._id) {
                            window.location.reload();
                        }
                    }, this.snackbarConfig.duration);
                }, 
                error => {
                    let errorObj = JSON.parse(error._body);
                    if (errorObj.code === 11000) {
                        errorMsg = 'Моля, въведете различен e-mail';
                    }
                    const snackBarRef = this.snackBar.open(errorMsg, '', {
                        duration: this.snackbarConfig.duration
                    });
                    setTimeout(() => {
                        this.loadingOverlay = false;
                    }, this.snackbarConfig.duration);
                    throw new Error(error);
                }
            )
        } else {
            this.doctorService.createDoctor(this.doctor)
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
                    let errorObj = JSON.parse(error._body);
                    if (errorObj.code === 11000) {
                        errorMsg = 'Моля, въведете различен e-mail';
                    }
                    const snackBarRef = this.snackBar.open(errorMsg, '', {
                        duration: this.snackbarConfig.duration
                    });
                    setTimeout(() => {
                        this.loadingOverlay = false;
                    }, this.snackbarConfig.duration);
                    throw new Error(error);
                }
            );
        }
    }

    delete(): void {
        this.loadingOverlay = true;
        this.doctorService.deleteDoctor(this.doctor._id)
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

    slideToggle(event): void {
        this.doctor.active = event.checked;
    }

    passwordToggle(): void {
        this.showPassword = !this.showPassword;
    }
}
