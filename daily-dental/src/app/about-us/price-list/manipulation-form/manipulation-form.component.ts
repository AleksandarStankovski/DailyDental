import {
    Component,
    OnInit,
    Inject } from '@angular/core';
import {
    MdDialogRef,
    MD_DIALOG_DATA,
    MdSnackBar } from '@angular/material';

import { SnackbarConfig } from '../../../shared/models/snackbar-config-model';
import { Manipulation } from '../../../shared/models/manipulation.model';
import { ManipulationService } from '../manipulation/manipulation.service';

@Component({
    selector: 'app-manipulation-form',
    templateUrl: './manipulation-form.component.html',
    styleUrls: ['./manipulation-form.component.css']
})
export class ManipulationFormComponent implements OnInit {

    manipulation: Manipulation;
    snackbarConfig: SnackbarConfig;
    loadingOverlay: boolean;

    constructor(
        private modalDialogRef: MdDialogRef<ManipulationFormComponent>,
        private manipulationService: ManipulationService,
        private snackBar: MdSnackBar,
        @Inject(MD_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        this.manipulation = new Manipulation('', '', undefined, '');
        this.snackbarConfig = new SnackbarConfig();
        if (this.data.manipulationId) {
            this.getManipulation();
        }
    }

    getManipulation(): void {
        this.manipulationService.getManipultion(this.data.manipulationId)
        .subscribe(response => {
            this.manipulation = response;
        })
    }

    save(): void {
        this.loadingOverlay = true;
        if (this.data.manipulationId) {
            this.manipulationService.editManipulation(this.manipulation)
            .subscribe(
                response => {
                    const snackBarRef = this.snackBar.open('Данните бяха запазени успешно', '', {
                        duration: this.snackbarConfig.duration
                    });
                    setTimeout(() => {
                        this.modalDialogRef.close('Edit');
                    }, this.snackbarConfig.duration);
                }, error => {
                    throw new Error(error);
                }
            );
        } else {
            this.manipulationService.createManipulation(this.manipulation)
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
            );
        }
    }

    delete(): void {
        this.loadingOverlay = true;
        this.manipulationService.deleteManipulation(this.manipulation._id)
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
                throw new Error(error);
            }
        );
    }
}
