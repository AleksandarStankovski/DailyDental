import {
    Component,
    OnInit,
    Inject } from '@angular/core';
import {
    MdDialogRef,
    MD_DIALOG_DATA,
    MdSnackBar } from '@angular/material';

import { SnackbarConfig } from '../../../shared/models/snackbar-config-model';
import { Clinic } from '../../../shared/models/clinic.model';
import { ClinicService } from '../clinic/clinic.service';

@Component({
    selector: 'app-clinic-form',
    templateUrl: './clinic-form.component.html',
    styleUrls: ['./clinic-form.component.scss']
})
export class ClinicFormComponent implements OnInit {

    clinic: Clinic;
    snackbarConfig: SnackbarConfig;
    loadingOverlay: boolean;

    constructor(
        private modalDialogRef: MdDialogRef<ClinicFormComponent>,
        private clinicService: ClinicService,
        private snackBar: MdSnackBar,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.clinic = new Clinic('', '', '', '', '');
        this.snackbarConfig = new SnackbarConfig();
        if (this.data.clinicId) {
            this.getClinic()
        }
    }

    getClinic(): void {
        this.clinicService.getClinic(this.data.clinicId)
        .subscribe(response => {
            this.clinic = response;
        })
    }

    save(): void {
        this.loadingOverlay = true;
        if (this.data.clinicId) {
            this.clinicService.editClinic(this.clinic)
            .subscribe(response => {
                const snackBarRef = this.snackBar.open('Данните бяха запазени успешно', '', {
                    duration: this.snackbarConfig.duration
                });
                setTimeout(() => {
                    this.modalDialogRef.close('Edit');
                }, this.snackbarConfig.duration);
            }, error => {
                throw new Error(error);
            })
        } else {
            this.clinicService.createClinic(this.clinic)
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
                    throw new Error(error);
                }
            )
        }
    }
}
