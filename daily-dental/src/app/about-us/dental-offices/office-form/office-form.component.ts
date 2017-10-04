import {
    Component,
    OnInit,
    Inject } from '@angular/core';
import {
    MdDialogRef,
    MD_DIALOG_DATA,
    MdSnackBar } from '@angular/material';

import { SnackbarConfig } from '../../../shared/models/snackbar-config-model';
import { Office } from '../../../shared/models/office.model';
import { OfficeService } from '../office/office.service';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss']
})
export class OfficeFormComponent implements OnInit {

    office: Office;
    snackbarConfig: SnackbarConfig
    loadingOverlay: boolean;

    constructor(
        private modalDialogRef: MdDialogRef<OfficeFormComponent>,
        private officeService: OfficeService,
        private snackBar: MdSnackBar,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.office = new Office('', '', '');
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

    save(): void {
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
                const snackBarRef = this.snackBar.open('Моля, опитайте отново', '', {
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
                    const snackBarRef = this.snackBar.open('Моля, опитайте отново', '', {
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
