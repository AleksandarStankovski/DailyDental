import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { SnackbarConfig } from '../../../shared/models/snackbar-config-model';
import { Examination } from '../../../shared/models/examination.model';
import { Manipulation } from '../../../shared/models/manipulation.model';
import { Tooth } from '../../../shared/models/tooth.model';
import { ExaminationService } from '../examinations/examination.service';
import { ManipulationService } from '../../../about-us/price-list/manipulation/manipulation.service';
import { ToothService } from '../../../core/tooth.service';

@Component({
    selector: 'app-examination-form',
    templateUrl: './examination-form.component.html',
    styleUrls: ['./examination-form.component.scss']
})
export class ExaminationFormComponent implements OnInit, OnDestroy {

    examination: Examination;
    manipulations: Manipulation[];
    snackbarConfig: SnackbarConfig;
    loadingOverlay: boolean;
    teeth: Tooth[];

    constructor(
        private modalDialogRef: MatDialogRef<ExaminationFormComponent>,
        private snackBar: MatSnackBar,
        private examinationService: ExaminationService,
        private manipulationService: ManipulationService,
        private toothService: ToothService,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        this.examination = new Examination(this.data.patientId, [{ tooth: '', manipulations: []}]);
        this.snackbarConfig = new SnackbarConfig();
        this.getAllManipulations();
        this.getAllTeeth();
        if (this.data.examinationId) {
            this.getExamination();
        }
    }

    ngOnDestroy() {
        this.snackBar.dismiss();
    }

    getExamination(): void {
        this.examinationService.getExamination(this.data.examinationId)
        .subscribe(response => {
            this.examination = response;
        });
    }

    getAllManipulations(): void {
        this.manipulationService.getAllManipulations()
        .subscribe(response => {
            this.manipulations = response;
            if (this.manipulations.length === 0) {
                const snackBarRef = this.snackBar.open('Моля, преди да запишете преглед, създайте манипулация');
            }
        });
    }

    getAllTeeth(): void {
         this.toothService.getAllTeeth()
        .subscribe(response => {
            this.teeth = response;
        });
    }

    selectManipulation(optionValue, selectedValue) {
        if (selectedValue) {
            return optionValue._id === selectedValue._id;
        }
        return false;
    }

    addProcedure(): void {
        this.examination.procedures.push({ tooth: '', manipulations: []});
    }

    removeProcedure(index: number): void {
        this.examination.procedures.splice(index, 1);
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }

    toggleLoadingOverlay(loadingOverlay: boolean): void {
        this.loadingOverlay = loadingOverlay;
    }

    modalClose(type: string): void {
        this.modalDialogRef.close(type);
    }

}
