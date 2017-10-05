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
import { DoctorService } from '../doctor/doctor.service';
import { SpecialityService } from '../../../core/speciality.service';

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

    constructor(
        private modalDialogRef: MdDialogRef<DoctorFormComponent>,
        private snackBar: MdSnackBar,
        private doctorService: DoctorService,
        private specialityService: SpecialityService,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.doctor = new Doctor('', '', '', '', '', '', '');
        this.snackbarConfig = new SnackbarConfig();
        this.getAllSpecialities();
        if (this.data.doctorId) {
            this.getDoctor();
        }
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
}
