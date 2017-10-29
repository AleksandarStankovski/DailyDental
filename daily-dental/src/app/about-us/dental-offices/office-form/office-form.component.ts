import {
    Component,
    OnInit,
    Inject } from '@angular/core';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatSnackBar } from '@angular/material';

import { SnackbarConfig } from '../../../shared/models/snackbar-config-model';
import { Office } from '../../../shared/models/office.model';
import { OfficeService } from '../office/office.service';
import { SpecialityService } from '../../../core/speciality.service';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss']
})
export class OfficeFormComponent implements OnInit {

    office: Office;
    snackbarConfig: SnackbarConfig
    loadingOverlay: boolean;
    specialities: { type: string, name: string }[];

    constructor(
        private modalDialogRef: MatDialogRef<OfficeFormComponent>,
        private snackBar: MatSnackBar,
        private officeService: OfficeService,
        private specialityService: SpecialityService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.office = new Office('', '', '');
        this.snackbarConfig = new SnackbarConfig();
        this.getAllSpecialities();
        if (this.data.officeId) {
            this.getOffice();
        }
    }

    getOffice(): void {
        this.officeService.getOffice(this.data.officeId)
        .subscribe(response => {
            this.office = response;
        });
    }

    getAllSpecialities(): void {
        this.specialities = this.specialityService.getAllSpecialities();
    }

    save(): void {
        let errorMsg = 'Моля, опитайте отново';
        this.loadingOverlay = true;
        if (this.data.officeId) {
            this.officeService.editOffice(this.office)
            .subscribe(response => {
                const snackBarRef = this.snackBar.open('Данните бяха запазени успешно', '', {
                    duration: this.snackbarConfig.duration
                });
                setTimeout(() => {
                    this.modalDialogRef.close('Edit');
                }, this.snackbarConfig.duration);
            }, error => {
                let errorObj = JSON.parse(error._body);
                if (errorObj.code === 11000) {
                    errorMsg = 'Моля, въведете различно име';
                }
                const snackBarRef = this.snackBar.open(errorMsg, '', {
                    duration: this.snackbarConfig.duration
                });
                setTimeout(() => {
                    this.loadingOverlay = false;
                }, this.snackbarConfig.duration);
                throw new Error(error);
            })
        } else {
            this.officeService.createOffice(this.office)
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
                        errorMsg = 'Моля, въведете различно име';
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
        }
    }

    delete(): void {
        this.loadingOverlay = true;
        this.officeService.deleteOffice(this.office._id)
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

}
