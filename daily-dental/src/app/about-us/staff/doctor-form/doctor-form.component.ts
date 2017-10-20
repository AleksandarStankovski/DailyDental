import {
    Component,
    OnInit,
    Inject } from '@angular/core';
import {
    MdDialogRef,
    MD_DIALOG_DATA,
    MdSnackBar } from '@angular/material';

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
    specialities: {type: string, name: string}[];
    showPassword: boolean;
    user: User;

    constructor(
        private modalDialogRef: MdDialogRef<DoctorFormComponent>,
        private snackBar: MdSnackBar,
        private doctorService: DoctorService,
        private specialityService: SpecialityService,
        private userService: UserService,
        @Inject(MD_DIALOG_DATA) public data: any) { }

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
        });
    }

    getAllSpecialities(): void {
        this.specialities = this.specialityService.getAllSpecialities();
    }

    save(): void {
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
