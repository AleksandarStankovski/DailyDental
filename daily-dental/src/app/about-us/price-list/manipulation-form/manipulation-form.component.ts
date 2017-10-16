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
import { SpecialityService } from '../../../core/speciality.service';

@Component({
    selector: 'app-manipulation-form',
    templateUrl: './manipulation-form.component.html',
    styleUrls: ['./manipulation-form.component.scss']
})
export class ManipulationFormComponent implements OnInit {

    manipulation: Manipulation;
    snackbarConfig: SnackbarConfig;
    loadingOverlay: boolean;
    specialities: { type: string, name: string }[];

    constructor(
        private modalDialogRef: MdDialogRef<ManipulationFormComponent>,
        private snackBar: MdSnackBar,
        private manipulationService: ManipulationService,
        private specialityService: SpecialityService,
        @Inject(MD_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        this.manipulation = new Manipulation('', undefined, '');
        this.snackbarConfig = new SnackbarConfig();
        this.getAllSpecialities();
        if (this.data.manipulationId) {
            this.getManipulation();
        }
    }

    getManipulation(): void {
        this.manipulationService.getManipultion(this.data.manipulationId)
        .subscribe(response => {
            this.manipulation = response;
        });
    }

    getAllSpecialities(): void {
        this.specialities = this.specialityService.getAllSpecialities();
    }

    changePrice(value: number): void {
        this.manipulation.price = value;
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
                    const snackBarRef = this.snackBar.open('Моля, опитайте отново', '', {
                        duration: this.snackbarConfig.duration
                    });
                    setTimeout(() => {
                        this.loadingOverlay = false;
                    }, this.snackbarConfig.duration);
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
